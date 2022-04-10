package devices

import (
	"backend/Middlewares/decodeToken"
	"backend/Middlewares/filterMiddlewares/getdevicesfilter"
	tkn "backend/Middlewares/jwtverify"
	"backend/database"
	"backend/structs"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func GetDevices(w http.ResponseWriter, r *http.Request) {
	var resp structs.RespondDevice
	// query := r.URL.Query()
	// &ipaddress=${DeviceIpaddressFilter}&vendor=${vendor}&hide=${hide}&limit=${limit}&offset=${offset}
	// Devicename := query.Get("Devicename")
	// Deviceipaddress := query.Get("ipaddress")
	// vendor := query.Get("vendor")
	// hide := query.Get("hide")
	// limit := query.Get("limit")
	// offset := query.Get("offset")

	// var Device structs.Devicestruct
	if r.Method != "GET" {
		resp = structs.RespondDevice{Success: false, Err: structs.ErrorMessage{FatalError: "FATAL ERROR getusers"}, Data: structs.GetDevicesRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Gettig DeviceList to search")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	tokenString := r.Header.Get("Token")
	checktoken := tkn.JwtVerify(tokenString)
	if checktoken == false {
		resp = structs.RespondDevice{Success: false, Permission: false, Err: structs.ErrorMessage{AuthError: "Auth problem in Getting Devices for adminpanel"}, Data: structs.GetDevicesRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	success, user := decodeToken.DecodeToken(tokenString)
	if success == false || user.Role != "admin" {
		resp = structs.RespondDevice{Success: false, Permission: false, Err: structs.ErrorMessage{PermissionError: "You have not administator permision"}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	query := r.URL.Query()
	technology := query.Get("technology")
	vendor := query.Get("vendor")
	ipaddress := query.Get("ipaddress")
	limit := query.Get("limit")
	offset := query.Get("offset")

	filter := getdevicesfilter.DefineDeviceFilters(technology, vendor, ipaddress)
	db := database.OpenConnection()
	// txt := ""
	getDevicesLength := "SELECT count(*) FROM device where 1=1  " + filter
	var length int
	err1 := db.QueryRow(getDevicesLength).Scan(&length)
	fmt.Println(length, "lengthlengthlength  length")
	if err1 != nil {
		log.Fatal(err1)
		resp = structs.RespondDevice{Success: false, Permission: true, Err: structs.ErrorMessage{DatabaseConnectionError: "DATABASE CONNECTION PROBLEM"}, Data: structs.GetDevicesRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp.Err, "get Length devices")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	queryText := "SELECT * FROM device where 1=1 " + filter + "ORDER BY id DESC  limit " + limit + " offset " + offset
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

	resp = structs.RespondDevice{Success: true, Permission: true, Err: structs.ErrorMessage{}, Data: structs.GetDevicesRespond{DataTable: devices, LengthData: length}}
	getdata, _ := json.MarshalIndent(resp, "", "\t")
	w.Header().Set("Content-Type", "application/json")
	w.Write(getdata)

	defer rows.Close()
	defer db.Close()
}

// if len(people) == 0 {
// 	resp = structs.RespondDevice{Success: false, Perrmision: true, Err: "There are not Device"}

// 	errorss, _ := json.MarshalIndent(resp, "", "\t")
// 	fmt.Println(resp.Err, "WRONG username")
// 	w.Header().Set("Content-Type", "application/json")
// 	w.Write(errorss)
// 	return
// }
