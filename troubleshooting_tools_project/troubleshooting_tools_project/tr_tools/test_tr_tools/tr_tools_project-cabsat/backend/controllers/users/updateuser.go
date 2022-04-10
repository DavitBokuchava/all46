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

func Updateuser(w http.ResponseWriter, r *http.Request) {
	var updateperson structs.PersonDB
	var person structs.PersonDB
	var resp structs.RespondUser
	if r.Method != "POST" {
		resp = structs.RespondUser{Success: false, Permission: false, Err: structs.ErrorMessage{FatalError: "FATAL ERROR UpdateUser"}, Data: structs.GetUsersRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "UpdateUser")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	auth := r.Header.Get("Authorization")
	fmt.Println(auth, "authfggsdsdgsgsg")
	if auth == "" || len(strings.Split(auth, " ")) < 1 || strings.Split(auth, " ")[1] == "null" {
		resp = structs.RespondUser{Success: false, Permission: false, Err: structs.ErrorMessage{AuthError: "Invalid Auth"}, Data: structs.GetUsersRespond{}}
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
		resp = structs.RespondUser{Success: false, Permission: false, Err: structs.ErrorMessage{AuthError: "Invalid Auth time"}, Data: structs.GetUsersRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in token problem showcommands")
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
	decoder := json.NewDecoder(r.Body)
	//
	fmt.Println(decoder, r.Body, "decoderdecoderdecoderdecoderdecoderdecoderdecoder")
	err1 := decoder.Decode(&updateperson)
	if err1 != nil {
		fmt.Println("Error")
		return
	}
	if updateperson.Id == "" || updateperson.Username == "" || updateperson.Password == "" || updateperson.Role == "" {
		fmt.Println("err PERSON")
		return
	}
	status := middlewares.Checkusertoupdate(updateperson.Id, updateperson.Username)
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

	err2 := db.QueryRow("UPDATE tr_tools_users set user_name = $1, pass_word = $2 , role = $3,group_team = $4, device_username = $5, device_password =$6, commands = $7 WHERE id = $8 RETURNING *", &updateperson.Username, &updateperson.Password, &updateperson.Role, &updateperson.GroupTeam, &updateperson.DeviceUsername, &updateperson.DevicePassword, &updateperson.Commands, &updateperson.Id).Scan(&person.Id, &person.Username, &person.Password, &person.Role, &person.GroupTeam, &person.DeviceUsername, &person.DevicePassword, &person.Block, &person.Commands)

	if err2 != nil {
		//log.Fatal(err, "asfasf")
		fmt.Println(err2, "err log")
		return
	}
	var data []structs.PersonDB
	data = append(data, person)
	resp = structs.RespondUser{Success: true, Permission: true, Err: structs.ErrorMessage{}, Data: structs.GetUsersRespond{DataTable: data}}
	result, _ := json.MarshalIndent(resp, "", "\t")
	fmt.Println(result, person, "updatedUser")
	w.Header().Set("Content-Type", "application/json")
	w.Write(result)

	//defer update.Close()
	defer db.Close()

}

// func UpdateUser(w http.ResponseWriter, r *http.Request) {

// 	// var person structs.Person

// 	// query := r.URL.Query()
// 	// roleId := query.Get("roleId")
// 	fmt.Println(person, err)
// 	// id := query.Get("id")
// 	// username := query.Get("username")
// 	// password := query.Get("password")
// 	// role := query.Get("role")
// 	// println(roleId, "roleId")
// 	db := database.OpenConnection()
// 	update := "UPDATE testusers set username = $1, password = $2 , role = $3 WHERE id = $4 RETURNING *"

//	err := db.QueryRow(update, &person.Username, &person.Password, &person.Role, &person.Id)

// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	updatedUser, _ := json.MarshalIndent(person, "", "\t")
// 	fmt.Println(updatedUser, person, "updatedUser")
// 	w.Header().Set("Content-Type", "application/json")
// 	w.Write(updatedUser)

// 	//defer update.Close()
// 	defer db.Close()

// }

// func updateUserTest(w http.ResponseWriter, r *http.Request) {
// 	if r.Method == "POST" {
// 		var u Person
// 		if r.Body == nil {
// 			http.Error(w, "Please send a request body", 400)
// 			return
// 		}
// 		err := json.NewDecoder(r.Body).Decode(&u)
// 		if err != nil {
// 			http.Error(w, err.Error(), 400)
// 			return
// 		}
// 		fmt.Println(u)
// 		uuu, _ := json.MarshalIndent(u, "", "\t")
// 		fmt.Println(u, "updatedUser")
// 		w.Header().Set("Content-Type", "application/json")
// 		w.Write(uuu)

// 	}
// }
