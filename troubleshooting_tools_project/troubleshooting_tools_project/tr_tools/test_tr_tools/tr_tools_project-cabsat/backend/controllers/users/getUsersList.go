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

func GetUsersList(w http.ResponseWriter, r *http.Request) {
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
	if success == false {
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

	if user.Role == "admin" && user.GroupTeam != "tshoot_analitics" {
		user_group_team = user.GroupTeam
	}

	// getuserslist := " "
	filter := filtering.DefineUsersFilters(user_group_team, user_name)
	fmt.Println(filter, "=== in get userslst ===")

	db := database.OpenConnection()

	quering := "SELECT id,user_name,group_team FROM tr_tools_users where   role != 'guest' " + filter
	rows, err := db.Query(quering)
	if err != nil {
		log.Fatal(err)
		resp = structs.RespondUser{Success: false, Permission: true, Err: structs.ErrorMessage{DatabaseConnectionError: "Database Connection Error"}, Data: structs.GetUsersRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp.Err, "DATABASE PROBLEM")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	var people []structs.PersonDB
	for rows.Next() {
		var person structs.PersonDB
		rows.Scan(&person.Id, &person.Username, &person.GroupTeam)
		people = append(people, person)
	}

	fmt.Println(people, "people,people,people,people,people,")

	resp = structs.RespondUser{Success: true, Permission: true, Err: structs.ErrorMessage{}, Data: structs.GetUsersRespond{DataTable: people}}
	getdata, _ := json.MarshalIndent(resp, "", "\t")
	w.Header().Set("Content-Type", "application/json")
	w.Write(getdata)

	defer rows.Close()
	defer db.Close()
}
