package middlewares

import (
	"backend/database"
	"backend/structs"
	"fmt"
	"log"
)

func CheckDeviceIpaddress(id string, deviceipaddress string) bool {
	fmt.Println(deviceipaddress, id, " devicipaddress  === ID")
	db := database.OpenConnection()

	rows, err := db.Query("SELECT * FROM device where  device_ipaddress=$1 AND id != $2", deviceipaddress, id)
	var status bool
	status = true
	if err != nil {
		log.Fatal(err)
		status = false
		return status
	}
	var deviceipaddressResult []structs.Devicestruct
	for rows.Next() {
		var device structs.Devicestruct
		rows.Scan(&device.Id, &device.DeviceName, &device.DeviceIpaddress, &device.Technology, &device.Vendor, &device.Hide, &device.Zone)
		deviceipaddressResult = append(deviceipaddressResult, device)
	}
	if len(deviceipaddressResult) > 0 {
		status = false
	}

	defer rows.Close()
	defer db.Close()
	return status
}
