package users

import (
	"backend/Middlewares/decodeToken"
	filtering "backend/Middlewares/filterMiddlewares/getusersfilter"
	tkn "backend/Middlewares/jwtverify"
	"backend/database"
	"backend/structs"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var resp structs.RespondUser
	if r.Method != "GET" {
		resp = structs.RespondUser{Success: false, Err: structs.ErrorMessage{FatalError: "Fatal Error"}, Data: structs.GetUsersRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	tokenString := r.Header.Get("Token")
	// fmt.Println(tokenString, "   @#$%@#$%#@$^%@#$^#@$^#@$^  tokenString")
	checktoken := tkn.JwtVerify(tokenString)
	if checktoken == false {
		resp = structs.RespondUser{Success: false, Permission: false, Err: structs.ErrorMessage{AuthError: "Ivalid Auth"}, Data: structs.GetUsersRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	success, user := decodeToken.DecodeToken(tokenString)
	if success == false || user.Role != "admin" {
		resp = structs.RespondUser{Success: false, Permission: false, Err: structs.ErrorMessage{PermissionError: "You have not administator permision"}, Data: structs.GetUsersRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	query := r.URL.Query()
	user_group_team := query.Get("user_group_team")
	user_name := query.Get("user_name")
	limit := query.Get("limit")
	offset := query.Get("offset")

	if user.Role == "admin" && user.GroupTeam != "tshoot_analitics" {
		user_group_team = user.GroupTeam
	}

	fmt.Println(user_group_team, user_name, " ==== user_group_team,user_name, user_group_team,user_name, ===")
	filter := filtering.DefineUsersFilters(user_group_team, user_name)
	db := database.OpenConnection()
	getUsersLengthQuery := "SELECT count(*) from tr_tools_users WHERE 1=1 " + filter
	var length int
	err1 := db.QueryRow(getUsersLengthQuery).Scan(&length)
	fmt.Println(length, "lengthlengthlength  length")
	if err1 != nil {
		//og.Fatal(err, "asfasf")
		fmt.Println(err1, "err log")
		resp = structs.RespondUser{Success: false, Err: structs.ErrorMessage{DatabaseConnectionError: "DATABASE QUERING OR CONNECTION ERROR"}, Data: structs.GetUsersRespond{}}
		getdata, _ := json.MarshalIndent(resp, "", "\t")
		w.Header().Set("Content-Type", "application/json")
		w.Write(getdata)
		return
	}

	getUserQuery := "SELECT * FROM tr_tools_users where 1=1 " + filter + " ORDER BY id DESC  limit " + limit + " offset " + offset
	rows, err := db.Query(getUserQuery)
	if err != nil {
		log.Fatal(err)
		resp = structs.RespondUser{Success: false, Permission: true, Err: structs.ErrorMessage{DatabaseConnectionError: "Database Connection Error"}, Data: structs.GetUsersRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp.Err, "DATA BASE PROBLEM")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	var people []structs.PersonDB
	for rows.Next() {
		var person structs.PersonDB
		rows.Scan(&person.Id, &person.Username, &person.Password, &person.Role, &person.GroupTeam, &person.DeviceUsername, &person.DevicePassword, &person.Block, &person.Commands)
		people = append(people, person)
	}

	// fmt.Println(people.length, "people,people,people,people,people,")
	// if len(people) == 0 {
	// 	resp = structs.TestRespondUser{Success: false, Err: "There are not users"}

	// 	errorss, _ := json.MarshalIndent(resp, "", "\t")
	// 	fmt.Println(resp.Err, "WRONG username")
	// 	w.Header().Set("Content-Type", "application/json")
	// 	w.Write(errorss)
	// 	return
	// }
	resp = structs.RespondUser{Success: true, Permission: true, Err: structs.ErrorMessage{}, Data: structs.GetUsersRespond{DataTable: people, LengthData: length}}
	getdata, _ := json.MarshalIndent(resp, "", "\t")
	w.Header().Set("Content-Type", "application/json")
	w.Write(getdata)

	defer rows.Close()
	defer db.Close()
}

// package users

// import (
// 	"backend/Middlewares/decodeToken"
// 	tkn "backend/Middlewares/jwtverify"
// 	"backend/database"
// 	"backend/structs"
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"net/http"
// )

// func GetTestusers(w http.ResponseWriter, r *http.Request) {
// 	var resp structs.RespondUserTest
// 	if r.Method != "GET" {
// 		resp = structs.RespondUserTest{Success: false, Err: "FATAL ERROR getusers"}
// 		errorss, _ := json.MarshalIndent(resp, "", "\t")
// 		fmt.Println(resp, "Log in")
// 		w.Header().Set("Content-Type", "application/json")
// 		w.Write(errorss)
// 		return
// 	}
// 	tokenString := r.Header.Get("Token")
// 	fmt.Println(tokenString, "   @#$%@#$%#@$^%@#$^#@$^#@$^  tokenString")
// 	checktoken := tkn.JwtVerify(tokenString)
// 	if checktoken == false {
// 		resp = structs.RespondUserTest{Success: false, Permission: false, Err: "Log in"}
// 		errorss, _ := json.MarshalIndent(resp, "", "\t")
// 		fmt.Println(resp, "Log in")
// 		w.Header().Set("Content-Type", "application/json")
// 		w.Write(errorss)
// 		return
// 	}
// 	success, user := decodeToken.DecodeToken(tokenString)
// 	if success == false || user.Role != "admin" {
// 		resp = structs.RespondUserTest{Success: false, Permission: false, Err: "You have not administator permision"}
// 		errorss, _ := json.MarshalIndent(resp, "", "\t")
// 		fmt.Println(resp, "Log in")
// 		w.Header().Set("Content-Type", "application/json")
// 		w.Write(errorss)
// 		return
// 	}
// 	db := database.OpenConnection()
// 	// txt := ""
// 	// var arr []string
// 	// arr = append(arr, "53", "52")
// 	// for i := 0; i < len(arr); i++ {
// 	// 	if i == len(arr)-1 {
// 	// 		txt += arr[i]
// 	// 	} else {
// 	// 		txt += arr[i] + ","
// 	// 	}

// 	// }
// 	// id := " WHERE id IN (" + txt + ")"
// 	// fmt.Println(id, " %#@$%@#% filter")
// 	rows, err := db.Query("SELECT * FROM testusers")
// 	if err != nil {
// 		log.Fatal(err)
// 		resp = structs.RespondUserTest{Success: false, Permission: true, Err: "DATABASE CONNECTION PROBLEM"}
// 		errorss, _ := json.MarshalIndent(resp, "", "\t")
// 		fmt.Println(resp.Err, "DATA BASE PROBLEM")
// 		w.Header().Set("Content-Type", "application/json")
// 		w.Write(errorss)
// 		return
// 	}
// 	var people []structs.PersonTest
// 	for rows.Next() {
// 		var person structs.PersonTest
// 		// str, err := bcrypting.HashItem(&person.Password)
// 		// fmt.Println(str, err, "@#$%@#^##   str,err")
// 		rows.Scan(&person.Id, &person.Username, &person.Password, &person.Role)
// 		people = append(people, person)
// 	}
// 	// if len(people) == 0 {
// 	// 	resp = structs.TestRespondUser{Success: false, Err: "There are not users"}

// 	// 	errorss, _ := json.MarshalIndent(resp, "", "\t")
// 	// 	fmt.Println(resp.Err, "WRONG username")
// 	// 	w.Header().Set("Content-Type", "application/json")
// 	// 	w.Write(errorss)
// 	// 	return
// 	// }
// 	resp = structs.RespondUserTest{Success: true, Permission: true, Err: "", Data: people}
// 	getdata, _ := json.MarshalIndent(resp, "", "\t")
// 	w.Header().Set("Content-Type", "application/json")
// 	w.Write(getdata)

// 	defer rows.Close()
// 	defer db.Close()
// }
