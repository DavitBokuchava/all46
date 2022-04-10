package devices

import (
	"backend/Middlewares/filterMiddlewares/getdevicesfilter"
	tkn "backend/Middlewares/jwtverify"
	"backend/database"
	"backend/structs"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func GetDeviceList(w http.ResponseWriter, r *http.Request) {
	var resp structs.RespondDevice
	if r.Method != "GET" {
		resp = structs.RespondDevice{Success: false, Err: structs.ErrorMessage{FatalError: "FATAL ERROR getDevices list"}, Data: structs.GetDevicesRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	tokenString := r.Header.Get("Token")
	checktoken := tkn.JwtVerify(tokenString)
	if checktoken == false {
		resp = structs.RespondDevice{Success: false, Permission: false, Err: structs.ErrorMessage{AuthError: "Auth Error in device LIST"}, Data: structs.GetDevicesRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "devicelkdhglkahslkh deviceLIST")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	// success, user := decodeToken.DecodeToken(tokenString)
	// if success == false || user.Role == "guest" {
	// 	resp = structs.RespondDevice{Success: false, Permission: false, Err: structs.ErrorMessage{PermissionError: "there is not permission to guests"}, Data: structs.GetDevicesRespond{}}
	// 	errorss, _ := json.MarshalIndent(resp, "", "\t")
	// 	fmt.Println(resp, "Log in")
	// 	w.Header().Set("Content-Type", "application/json")
	// 	w.Write(errorss)
	// 	return
	// }
	query := r.URL.Query()
	technology := query.Get("technology")
	vendor := query.Get("vendor")
	ipaddress := query.Get("ipaddress")

	filter := getdevicesfilter.DefineDeviceFilters(technology, vendor, ipaddress)
	db := database.OpenConnection()
	// txt := ""
	queryText := "SELECT * FROM device WHERE hide=false" + filter
	rows, err := db.Query(queryText)
	if err != nil {
		log.Fatal(err)
		resp = structs.RespondDevice{Success: false, Permission: true, Err: structs.ErrorMessage{DatabaseConnectionError: "DATABASE CONNECTION PROBLEM"}, Data: structs.GetDevicesRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp.Err, "WRONG username")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	var devices []structs.Devicestruct
	for rows.Next() {
		var device structs.Devicestruct
		rows.Scan(&device.Id, &device.DeviceName, &device.DeviceIpaddress, &device.Technology, &device.Vendor, &device.Hide, &device.Zone)
		devices = append(devices, device)
	}

	resp = structs.RespondDevice{Success: true, Permission: true, Err: structs.ErrorMessage{}, Data: structs.GetDevicesRespond{DataTable: devices}}
	getdata, _ := json.MarshalIndent(resp, "", "\t")
	w.Header().Set("Content-Type", "application/json")
	w.Write(getdata)

	defer rows.Close()
	defer db.Close()
}

// if len(people) == 0 {
// 	resp = structs.RespondDevice{Success: false, Perrmision: true, Err: "There are not device"}

// 	errorss, _ := json.MarshalIndent(resp, "", "\t")
// 	fmt.Println(resp.Err, "WRONG username")
// 	w.Header().Set("Content-Type", "application/json")
// 	w.Write(errorss)
// 	return
// }
