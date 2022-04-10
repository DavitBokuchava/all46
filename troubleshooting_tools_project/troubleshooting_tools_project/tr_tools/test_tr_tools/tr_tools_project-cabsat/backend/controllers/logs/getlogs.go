package logs

import (
	"backend/Middlewares/decodeToken"
	filtering "backend/Middlewares/filterMiddlewares/getlogsfilter"
	tkn "backend/Middlewares/jwtverify"
	"backend/database"
	"backend/structs"
	"encoding/json"
	"fmt"
	"net/http"
)

func GetLogs(w http.ResponseWriter, r *http.Request) {
	var resp structs.RespondLog

	if r.Method != "GET" {
		resp = structs.RespondLog{Success: false, Err: structs.ErrorMessage{FatalError: "FATAL ERROR getusers"}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Gettig DeviceList to search")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	tokenString := r.Header.Get("Token")
	checktoken := tkn.JwtVerify(tokenString)
	if checktoken == false {
		resp = structs.RespondLog{Success: false, Err: structs.ErrorMessage{AuthError: "Auth problem in Getting LOGS"}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	success, userProfile := decodeToken.DecodeToken(tokenString)
	if success == false {
		resp = structs.RespondLog{Success: false, Err: structs.ErrorMessage{PermissionError: "You have not  permision"}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}

	query := r.URL.Query()

	user := query.Get("user_id")
	user_group_team := query.Get("user_group_team")
	session_id := query.Get("session_id")
	customer_id := query.Get("customer_id")
	customer_mob_number := query.Get("customer_mob_number")
	command := query.Get("command")
	technology := query.Get("technology")
	vendor := query.Get("vendor")
	device := query.Get("device")
	ipaddress := query.Get("ipaddress")
	trigger_date := query.Get("date")
	limit := query.Get("limit")
	offset := query.Get("offset")

	if userProfile.Role == "admin" && userProfile.GroupTeam != "tshoot_analitics" {
		user_group_team = userProfile.GroupTeam
	}
	if userProfile.Role == "user" {
		user = userProfile.Id
	}

	filter := filtering.DefineFilters(user, user_group_team, session_id, customer_id, customer_mob_number, command, technology, vendor, device, ipaddress, trigger_date)
	fmt.Println(filter, " ========= filter filter filterfilter ingetlog")
	db := database.OpenConnection()
	// getLengthLogs := "SELECT count(*) from logs_history LEFT OUTER JOIN testtestusers as t1 ON (logs_history.user_id = t1.id) " + filter
	getLengthLogs := "SELECT count(*) from logs_history" + filter
	var length int
	err1 := db.QueryRow(getLengthLogs).Scan(&length)
	fmt.Println(length, "lengthlengthlength  length")
	if err1 != nil {
		//og.Fatal(err, "asfasf")
		fmt.Println(err1, "err log")
		resp = structs.RespondLog{Success: false, Err: structs.ErrorMessage{DatabaseConnectionError: "DATABASE QUERING OR CONNECTION ERROR"}, Data: structs.GetlogRespond{}}
		getdata, _ := json.MarshalIndent(resp, "", "\t")
		w.Header().Set("Content-Type", "application/json")
		w.Write(getdata)
		return
	}
	getlog := "SELECT logs_history.id,  logs_history.user_id, t1.user_name as username,logs_history.group_team, logs_history.session_id, logs_history.customer_id, logs_history.customer_mob_number, logs_history.command, logs_history.technology,logs_history.vendor, logs_history.device, logs_history.ipaddress, logs_history.position, logs_history.output, logs_history.date_time from logs_history LEFT OUTER JOIN tr_tools_users as t1 ON (logs_history.user_id = t1.id)" + filter + "ORDER BY date_time DESC  limit " + limit + " offset " + offset
	// getlog := "SELECT logs_history.id,logs_history.user_id from logs_history"

	rows, err := db.Query(getlog)
	if err != nil {
		//og.Fatal(err, "asfasf")
		fmt.Println(err, "err log")
		resp = structs.RespondLog{Success: false, Err: structs.ErrorMessage{DatabaseConnectionError: "DATABASE QUERING OR CONNECTION ERROR"}, Data: structs.GetlogRespond{}}
		getdata, _ := json.MarshalIndent(resp, "", "\t")
		w.Header().Set("Content-Type", "application/json")
		w.Write(getdata)
		return
	}
	var rws []structs.Getlogs
	for rows.Next() {
		var clmns structs.Getlogs
		// id | user_id | group_team | session_id | customer_id | customer_mob_number | command | technology | vendor | device | ipaddress | position | output | date_time
		rows.Scan(&clmns.Id, &clmns.UserId, &clmns.UserName, &clmns.GroupTeam, &clmns.SessionId, &clmns.CustomerId, &clmns.CustomerMobNumber, &clmns.Command, &clmns.Technology, &clmns.Vendor, &clmns.Device, &clmns.Ipaddress, &clmns.Position, &clmns.Output, &clmns.DateTime)
		// rows.Scan(&clmns.Id, &clmns.UserId)
		rws = append(rws, clmns)
	}
	fmt.Println(length, "errerrerrerrerrerrerrerrerrrwsrwrsrwrsrwrs  in getlogs")
	resp = structs.RespondLog{Success: true, Err: structs.ErrorMessage{}, Data: structs.GetlogRespond{DataTable: rws, LengthData: length}}
	getdata, _ := json.MarshalIndent(resp, "", "\t")
	w.Header().Set("Content-Type", "application/json")
	w.Write(getdata)
	defer rows.Close()
	defer db.Close()

}

// type GetlogRespond struct {
// 	DataTable  []Getlogs
// 	LengthData int
// }
// type RespondLog struct { //structs.RespondLog
// 	Success bool
// 	Err     ErrorMessage
// 	Data    GetlogRespond
// }
// type Getlogs struct {
// 	Id                string `json:"id"`
// 	SessionId         string `json:"sessionId"`
// 	UserId            string `json:"userId"`
// 	UserName          string `json:"userName"`
// 	GroupTeam         string `json:"groupTeam"`
// 	CustomerId        string `json:"customerId"`
// 	CustomerMobNumber string `json:"mobNumber"`
// 	Command           string `json:"command"`
// 	Technology        string `json:"technology"`
// 	Device            string `json:"device"`
// 	Vendor            string `json:"vendor"`
// 	Ipaddress         string `json:"ipAddress"`
// 	Position          string `json:"position"`
// 	Output            string `json:"output"`
// 	DateTime          string `json:"dateTime"`
// }
///////////////length \\\\\\\\\\\\\\\\
// getLengthLogs := "SELECT count(*) from logs_history LEFT OUTER JOIN testtestusers as t1 ON (logs_history.user_id = t1.id) " + filter
// var length int
// err1 := db.QueryRow(getLengthLogs).Scan(&length)
// fmt.Println(length, "lengthlengthlength  length")
// if err1 != nil {
// 	//og.Fatal(err, "asfasf")
// 	fmt.Println(err1, "err log")
// 	resp = structs.RespondLog{Success: false, Err: structs.ErrorMessage{DatabaseConnectionError: "DATABASE QUERING OR CONNECTION ERROR"}}
// 	getdata, _ := json.MarshalIndent(resp, "", "\t")
// 	w.Header().Set("Content-Type", "application/json")
// 	w.Write(getdata)
// 	return
// }
