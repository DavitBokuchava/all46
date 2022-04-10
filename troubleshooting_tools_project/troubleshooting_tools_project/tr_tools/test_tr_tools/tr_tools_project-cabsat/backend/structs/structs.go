package structs

import (
	jwt "github.com/dgrijalva/jwt-go"
)

type PersonDB struct {
	Id             string `json:"id"`
	Username       string `json:"username"`
	Password       string `json:"password"`
	Role           string `json:"role"`
	GroupTeam      string `json:"groupTeam"`
	DeviceUsername string `json:"deviceUsername"`
	DevicePassword string `json:"devicePassword"`
	Commands       string `json:"commands"`
	Block          bool   `json:"block"`
}
type GetUsersRespond struct {
	DataTable  []PersonDB `json:"data"`
	LengthData int        `json:"length"`
}
type RespondUser struct { //structs.RespondUser
	Success    bool
	Permission bool
	Err        ErrorMessage
	Data       GetUsersRespond
}
type Person struct {
	Id             string `json:"id"`
	Username       string `json:"username"`
	Password       string `json:"password"`
	Role           string `json:"role"`
	GroupTeam      string `json:"groupTeam"`
	DeviceUsername string `json:"deviceUsername"`
	DevicePassword string `json:"devicePassword"`
	Commands       string `json:"commands"`
	Block          string `json:"block"`
}
type ErrorMessage struct {
	PasswordError           string `json:"passwordError"`
	UsernameError           string `json:"usernameError"`        //1
	DeviceIpAddressError    string `json:"deviceIpAddressError"` //2
	DeviceNameError         string `json:"deviceNameError"`      // 3
	UpdateUserError         string `json:"updateUserError"`
	AddUserError            string `json:"addUserError"`
	BlockUserError          string `json:"blockUserError"`
	GetUsersError           string `json:"getUsersError"` //4
	GetDeviceError          string `json:"getDeviceError"`
	AddDeviceError          string `json:"addDeviceError"`
	UpdateDeviceError       string `json:"updateDeviceError"`
	HideDeviceError         string `json:"hideDeviceError"`
	GetDeviceListError      string `json:"getDeviceListError"`
	GeLogsError             string `json:"getLogsError"`            //5
	FatalError              string `json:"fatalError"`              //6
	PermissionError         string `json:"permissionError"`         //7
	AuthError               string `json:"authError"`               //8
	DatabaseConnectionError string `json:"databaseConnectionError"` //9
}

type PersonAuth struct {
	Id             string
	Username       string
	Role           string
	GroupTeam      string
	DeviceUsername string
	DevicePassword string
	Commands       string
}

type Showcommandsstruct struct {
	SessionId            string `json:"sessionId"`
	CustomerId           string `json:"customerId"`
	MobileNumber         string `json:"mobNumber"`
	Device               string `json:"device"`
	IpAddress            string `json:"ipAddress"`
	Command              string `json:"command"`
	Technology           string `json:"technology"`
	Vendor               string `json:"vendor"`
	Frame                string `json:"frame"`
	Slot                 string `json:"slot"`
	Port                 string `json:"port"`
	Vport                string `json:"vport"`
	Position             string `json:"position"`
	MacAddress           string `json:"macAddress"`
	ServiceProfileZte    string `json:"serviceProfileZte"`
	ServiceProfileHuawei string `json:"serviceProfileHuawei"`
	ServicePortLanZte    string `json:"servicePortLanZte"`
	CabsatIp             string `json:"cabsatIp"`
	CabsatService        string `json:"cabsatService"`
	CabstaPort           string `json:"cabsatPort"`
	Sn                   string `json:"sn"`
	ZoneDeviceList       string `json:"zoneDeviceList"`
	Mgc                  string `json:"mgc"`
	VlanId               string `json:"vlanId"`
}

type GetlogRespond struct {
	DataTable  []Getlogs `json:"data"`
	LengthData int       `json:"length"`
}
type RespondLog struct { //structs.RespondLog
	Success bool
	Err     ErrorMessage
	Data    GetlogRespond
}
type Getlogs struct {
	Id                string `json:"id"`
	SessionId         string `json:"sessionId"`
	UserId            string `json:"userId"`
	UserName          string `json:"userName"`
	GroupTeam         string `json:"groupTeam"`
	CustomerId        string `json:"customerId"`
	CustomerMobNumber string `json:"mobNumber"`
	Command           string `json:"command"`
	Technology        string `json:"technology"`
	Device            string `json:"device"`
	Vendor            string `json:"vendor"`
	Ipaddress         string `json:"ipAddress"`
	Position          string `json:"position"`
	Output            string `json:"output"`
	DateTime          string `json:"dateTime"`
}

// sessionId,customerId,mobNumber,device,ipAddress,technology,vendor,command,frame,slot,port,vport,position
type Devicestruct struct {
	Id              string `json:"id"`
	DeviceName      string `json:"deviceName"`
	DeviceIpaddress string `json:"deviceIpaddress"`
	Technology      string `json:"technology"`
	Vendor          string `json:"vendor"`
	Hide            bool   `json:"hide"`
	Zone            string `json:"zone"`
}
type GetDevicesRespond struct {
	DataTable  []Devicestruct `json:"data"`
	LengthData int            `json:"length"`
}
type RespondDevice struct { //structs.RespondLog
	Success    bool
	Permission bool
	Err        ErrorMessage
	Data       GetDevicesRespond
}

type Addperson struct { //structs.Addperson
	Username string `json:"username"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type TokenJWT struct {
	Token string
}

type RespondUserLogin struct { //structs.RespondUserLogin
	Success bool
	Err     ErrorMessage
	Token   string
	Data    PersonDB
}
type UserClaims struct { // structs.UserClaims
	Id             string `json:"id"`
	Username       string `json:"username"`
	Password       string `json:"password"`
	Role           string `json:"role"`
	GroupTeam      string `json:"groupTeam"`
	DeviceUsername string `json:"deviceUsername"`
	DevicePassword string `json:"devicePassword"`
	Commands       string `json:"commands"`
	jwt.StandardClaims
}
type SendCommandOutput struct { // structs.SendCommandOutput
	Success    bool
	Permission bool
	Err        string
	Output     string
}

// type AddLogs struct {
// 	SessionId  string
// 	UserId     string
// 	GroupTeam  string
// 	CustomerId string
// 	MobNumber  string
// 	Command    string
// 	Technology string
// 	Vendor     string
// 	Device     string
// 	Ipaddress  string
// 	Position   string
// 	Output     string
// }

// type Getlogs struct {
// 	Id         string
// 	SessionId  string
// 	User       string
// 	UserGroup  string
// 	Customer   string
// 	Number     string
// 	Command    string
// 	Technology string
// 	Olt        string
// 	Vendor     string
// 	Ipaddress  string
// 	Position   string
// 	Output     string
// 	Date       string
// }
