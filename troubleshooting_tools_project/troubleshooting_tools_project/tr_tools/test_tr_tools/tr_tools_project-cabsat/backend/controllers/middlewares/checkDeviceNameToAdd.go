package middlewares

import (
	"backend/database"
	"backend/structs"
	"fmt"
	"log"
)

func CheckDeviceNameToAdd(devicename string) bool {
	fmt.Println(devicename, " devicename")
	db := database.OpenConnection()
	rows, err := db.Query("SELECT * FROM device where device_name=$1", devicename)
	var status bool
	status = true
	if err != nil {
		log.Fatal(err)
		status = false
		return status
	}
	var devicenamesResult []structs.Devicestruct
	for rows.Next() {
		var device structs.Devicestruct
		rows.Scan(&device.Id, &device.DeviceName, &device.DeviceIpaddress, &device.Technology, &device.Vendor, &device.Hide, &device.Zone)
		devicenamesResult = append(devicenamesResult, device)
	}
	if len(devicenamesResult) > 0 {
		status = false

	}

	defer rows.Close()
	defer db.Close()
	return status
}
