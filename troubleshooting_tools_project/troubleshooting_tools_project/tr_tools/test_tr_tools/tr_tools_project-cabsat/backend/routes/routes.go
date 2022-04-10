package routes

import (
	// "backend/commands/removemacaddress"
	"backend/commands/autofind"
	"backend/commands/coadhcplog"
	"backend/commands/dhcplog"
	"backend/commands/mgc"
	"backend/commands/setontportshuawei"
	"backend/commands/setportszte"
	"backend/commands/showcommands"
	"backend/controllers/auth"
	"backend/controllers/devices"
	"backend/controllers/login"
	"backend/controllers/logs"
	"backend/controllers/users"
	"fmt"
	"net/http"
)

//getusers := http.HandleFunc("/getuser", getusers.Getusers)

// type Routes struct {
// 	Route tring
// }
func Getlogs() {
	fmt.Println("getlogsroute > route")
	http.HandleFunc("/logs/getlogs", logs.GetLogs)
	return
}

func Blockuser() {
	fmt.Println("blockuser  /users/blockuser > route")
	http.HandleFunc("/users/blockuser", users.BlockUser)
	return
}
func Getusers() {
	fmt.Println("testgetusers > route")
	http.HandleFunc("/users/getusers", users.GetUsers) //  GetTestusers
	return
}

// fun GetUsersList

func Getuserslist() {
	fmt.Println("testgetusers > route")
	http.HandleFunc("/users/getuserslist", users.GetUsersList) //  GetTestusers
	return
}

func Updateuser() {
	fmt.Println("updateuser > route")
	http.HandleFunc("/users/updateuser", users.Updateuser)
	return
}

func AddUser() {
	fmt.Println("adduser > route")
	http.HandleFunc("/users/adduser", users.Adduser)
	return
}

func Getdevices() {
	fmt.Println("getdevice > route")
	http.HandleFunc("/devices/getdevices", devices.GetDevices)
	return
}

//Updatedevice
func Updatedevice() {
	fmt.Println("update device > route")
	http.HandleFunc("/devices/updatedevice", devices.UpdateDevice)
	return
}

//AddDevice
func Adddevice() {
	fmt.Println("adddevice > route")
	http.HandleFunc("/devices/adddevice", devices.AddDevice)
	return
}
func Hidedevice() {
	fmt.Println("Hide device > route")
	http.HandleFunc("/devices/hidedevice", devices.HideDevice)
	return
}
func Getdevicelist() {
	fmt.Println("getdevice list to check > route")
	http.HandleFunc("/devices/getdevicelist", devices.GetDeviceList)
	return
}
func ShowcommandsGpon() {
	fmt.Println("Showcommands GPON > route")
	http.HandleFunc("/showcommand/gpon", showcommands.ShowCommandsGPON)
	return
}
func Setontportsuhaweigpon() {
	fmt.Println("set_ont_Ports_huawei_gpon GPON > route")
	http.HandleFunc("/showcommand/gpon/set_ont_ports_huawei_gpon", setontportshuawei.SetOntPortsHuaweiGPON)
	return
}
func Setportsztegpon() {
	fmt.Println("set_ports_zte_gpon  > route")
	http.HandleFunc("/showcommand/gpon/set_ports_zte_gpon", setportszte.SetPortsZteGPON)
	return
}

// ShowCommandsDSL
func ShowcommandsDsl() {
	fmt.Println("Showcommands DSL > route")
	http.HandleFunc("/showcommand/dsl", showcommands.ShowCommandsDSL)
	return
}
// func RemoveMacAddress() {
// 	fmt.Println("Showcommands remove mac address > route")
// 	http.HandleFunc("/showcommand/remove-mac-address", removemacaddress.Removemacaddress)
// 	return
// }
func DhcpLog() {
	fmt.Println("Dhcplog > route")
	http.HandleFunc("/showcommand/dhcplog", dhcplog.DhcpLog)
	return
}
func CoadhcpLog() {
	fmt.Println("DhcpCoaLog > route")
	http.HandleFunc("/showcommand/coadhcplog", coadhcplog.DhcpCoaLog)
	return
}

// backend/commands/mgc
func Mgc() {
	fmt.Println("Mgc > route")
	http.HandleFunc("/showcommand/mgc", mgc.Mgc)
	return
}

func AutofindSn() {
	fmt.Println("Autofind > route")
	http.HandleFunc("/showcommand/autofind-sn", autofind.Autofind_sn)
	return
}

func Login() {
	fmt.Println("login > route")
	http.HandleFunc("/login", login.Login)
	return
}
func Auth() {
	fmt.Println("Auth > route")
	http.HandleFunc("/auth", auth.Auth)
	return
}
