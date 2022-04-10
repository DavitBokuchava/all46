package users

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

func Adduser(w http.ResponseWriter, r *http.Request) {
	var addperson structs.PersonDB
	var getperson structs.PersonDB
	var resp structs.RespondUser
	// var errormessage structs.ErrorMessage
	//var success structs.SuccessResult
	middlewares.SetupResponse(&w, r)
	fmt.Println(r.Method, "################## r.Method")
	if r.Method != "POST" {
		resp = structs.RespondUser{Success: false, Err: structs.ErrorMessage{FatalError: "Fatal Error"}, Data: structs.GetUsersRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}

	auth := r.Header.Get("Authorization")
	fmt.Println(auth, "authfggsdsdgsgsg")
	if auth == "" || len(strings.Split(auth, " ")) < 1 || strings.Split(auth, " ")[1] == "null" {
		resp = structs.RespondUser{Success: false, Permission: false, Err: structs.ErrorMessage{AuthError: " Auth Problem"}, Data: structs.GetUsersRespond{}}
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
		resp = structs.RespondUser{Success: false, Permission: false, Err: structs.ErrorMessage{AuthError: "Sign in"}, Data: structs.GetUsersRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in token problem showcommands")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	success, user := decodeToken.DecodeToken(tokenString)
	if success == false || user.Role != "admin" {
		resp = structs.RespondUser{Success: false, Permission: false, Err: structs.ErrorMessage{PermissionError: " you have not PERMISSION"}, Data: structs.GetUsersRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	fmt.Println(success, user, " success, user")
	fmt.Println(tokenString, checktoken, " tokenString")
	decoder := json.NewDecoder(r.Body)
	err1 := decoder.Decode(&addperson)
	if err1 != nil {
		fmt.Println("Error")
		return
	}

	if addperson.Username == "" || addperson.Password == "" || addperson.Role == "" {
		resp = structs.RespondUser{Success: false, Permission: true, Err: structs.ErrorMessage{AddUserError: "There is enough fields"}, Data: structs.GetUsersRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "There is such user")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	status := middlewares.Checkusertoadduser(addperson.Username)
	// if status == false {
	// 	//success = structs.SuccessResult{success: false, err: "There is such user"}
	// 	resp = structs.RespondUser{Success: false, Permission: true, Err: structs.ErrorMessage{UsernameError: "There is such user"}, Data: structs.GetUsersRespond{}}
	// 	errorss, _ := json.MarshalIndent(resp, "", "\t")
	// 	fmt.Println(resp, "There is such user")
	// 	w.Header().Set("Content-Type", "application/json")
	// 	w.Write(errorss)
	// 	return
	// }
	if status == false {
		//errors := "There is such user"
		resp = structs.RespondUser{Success: false, Permission: true, Err: structs.ErrorMessage{UsernameError: "There is such user"}, Data: structs.GetUsersRespond{}}
		errors, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(status, resp, "there is such username")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errors)
		return
	}
	db := database.OpenConnection()
	adduser := "INSERT INTO tr_tools_users (user_name,pass_word,role,group_team,device_username,device_password,commands) values($1,$2,$3,$4,$5,$6,$7) RETURNING *"
	fmt.Println(adduser, err1, addperson)
	err := db.QueryRow(adduser, &addperson.Username, &addperson.Password, &addperson.Role, &addperson.GroupTeam, &addperson.DeviceUsername, &addperson.DevicePassword, &addperson.Commands).Scan(&getperson.Id, &getperson.Username, &getperson.Password, &getperson.Role, &getperson.GroupTeam, &getperson.DeviceUsername, &getperson.DevicePassword, &getperson.Block, &getperson.Commands)

	if err != nil {
		fmt.Println(err, "err log")
		panic(err)
		db.Close()
		// return
	}
	//user, _ := json.MarshalIndent(getperson, "", "\t")
	var data []structs.PersonDB
	data = append(data, getperson)
	resp = structs.RespondUser{Success: true, Permission: true, Err: structs.ErrorMessage{}, Data: structs.GetUsersRespond{DataTable: data}}

	errorss, _ := json.MarshalIndent(resp, "", "\t")
	fmt.Println(resp, "There is such user")
	w.Header().Set("Content-Type", "application/json")
	w.Write(errorss)

	//defer adduser.Close()
	defer db.Close()

}
