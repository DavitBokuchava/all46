package devices

import (
	"backend/Middlewares/decodeToken"
	tkn "backend/Middlewares/jwtverify"
	"backend/controllers/middlewares"
	"backend/database"
	"backend/structs"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func UpdateDevice(w http.ResponseWriter, r *http.Request) {
	var resp structs.RespondDevice
	var device structs.Devicestruct
	if r.Method != "POST" {
		resp = structs.RespondDevice{Success: false, Err: structs.ErrorMessage{FatalError: "FATAL ERROR Updatedevice http wrong response"}, Data: structs.GetDevicesRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "UpdateUser")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	auth := r.Header.Get("Authorization")
	// fmt.Println(auth, "authfggsdsdgsgsg")
	if auth == "" || len(strings.Split(auth, " ")) < 1 || strings.Split(auth, " ")[1] == "null" {
		resp = structs.RespondDevice{Success: false, Permission: false, Err: structs.ErrorMessage{AuthError: " Auth Problem in update Device"}, Data: structs.GetDevicesRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in Shocommands")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	tokenString := strings.Split(auth, " ")[1]
	fmt.Println(auth, "#### tokenString")
	checktoken := tkn.JwtVerify(tokenString)
	if checktoken == false {
		resp = structs.RespondDevice{Success: false, Permission: false, Err: structs.ErrorMessage{AuthError: "Auth error in device update"}, Data: structs.GetDevicesRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in token problem showcommands")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	success, user := decodeToken.DecodeToken(tokenString)
	if success == false || user.Role != "admin" {
		resp = structs.RespondDevice{Success: false, Permission: false, Err: structs.ErrorMessage{PermissionError: " you have not admin  PERMISSION in device update"}, Data: structs.GetDevicesRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	fmt.Println(success, user, " success, user")
	fmt.Println(tokenString, checktoken, " tokenString")
	decoder := json.NewDecoder(r.Body)
	//
	err1 := decoder.Decode(&device)
	if err1 != nil {
		fmt.Println("Error")
		return
	}

	if device.Id == "" || device.DeviceName == "" || device.DeviceIpaddress == "" || device.Technology == "" || device.Vendor == "" {
		fmt.Println("err device to UPDATE")
		return
	}
	deviceNameStatus := middlewares.CheckDeviceName(device.Id, device.DeviceName)
	if deviceNameStatus == false {
		//errors := "There is such user"
		resp = structs.RespondDevice{Success: false, Permission: true, Err: structs.ErrorMessage{DeviceNameError: "There is such device"}, Data: structs.GetDevicesRespond{}}
		errors, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(deviceNameStatus, "there is such device or ipaddress")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errors)
		return
	}
	deviceIpaddressStatus := middlewares.CheckDeviceIpaddress(device.Id, device.DeviceIpaddress)
	if deviceIpaddressStatus == false {
		//errors := "There is such user"
		resp = structs.RespondDevice{Success: false, Permission: true, Err: structs.ErrorMessage{DeviceIpAddressError: "There is such device Ipaddress "}, Data: structs.GetDevicesRespond{}}
		errors, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(deviceIpaddressStatus, "there is such device or ipaddress")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errors)
		return
	}
	db := database.OpenConnection()

	err2 := db.QueryRow("UPDATE device set device_name = $1, device_ipaddress = $2, technology = $3,vendor = $4, zone = $5 WHERE id = $6 RETURNING *", &device.DeviceName, &device.DeviceIpaddress, &device.Technology, &device.Vendor, &device.Zone, &device.Id).Scan(&device.Id, &device.DeviceName, &device.DeviceIpaddress, &device.Technology, &device.Vendor, &device.Hide, &device.Zone)

	if err2 != nil {
		//log.Fatal(err, "asfasf")
		fmt.Println(err2, "err log")
		return
	}
	var data []structs.Devicestruct
	data = append(data, device)
	resp = structs.RespondDevice{Success: true, Permission: true, Err: structs.ErrorMessage{}, Data: structs.GetDevicesRespond{DataTable: data}}
	result, _ := json.MarshalIndent(resp, "", "\t")
	fmt.Println(result, device, "updated device")
	w.Header().Set("Content-Type", "application/json")
	w.Write(result)

	//defer update.Close()
	defer db.Close()

}

// type devicestruct struct {
// 	Id           string
// 	deviceName      string
// 	deviceIpaddress string
// 	Vendor       string
// 	Hide         bool
// }
