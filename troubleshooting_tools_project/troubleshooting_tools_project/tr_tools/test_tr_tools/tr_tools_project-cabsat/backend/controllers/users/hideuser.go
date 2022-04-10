package users

import (
	"backend/Middlewares/decodeToken"
	tkn "backend/Middlewares/jwtverify"
	"backend/database"
	"backend/structs"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func BlockUser(w http.ResponseWriter, r *http.Request) {
	var blockperson structs.PersonDB
	var person structs.PersonDB
	var resp structs.RespondUser
	if r.Method != "POST" {
		resp = structs.RespondUser{Success: false, Permission: false, Err: structs.ErrorMessage{FatalError: "Http  Response ERROR"}, Data: structs.GetUsersRespond{}}
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
	//
	blk := decoder.Decode(&blockperson)
	fmt.Println(blockperson, "blockpersonblockpersonblockperson")
	if blk != nil {
		// resp = structs.RespondUser{Success: false, Permission: true, Err: structs.ErrorMessage{BlockUserError: "There is Post response Body Problem"}}
		// errorss, _ := json.MarshalIndent(resp, "", "\t")
		// fmt.Println(resp, "There is Post response Body Problem")
		// w.Header().Set("Content-Type", "application/json")
		// w.Write(errorss)
		fmt.Println(blk, "body data receives")
		return
	}

	if blockperson.Id == "" {
		resp = structs.RespondUser{Success: false, Permission: true, Err: structs.ErrorMessage{BlockUserError: "There is enough fields"}, Data: structs.GetUsersRespond{}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "empty fields")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	db := database.OpenConnection()

	err2 := db.QueryRow("UPDATE tr_tools_users set block = $1 WHERE id = $2 RETURNING *", &blockperson.Block, &blockperson.Id).Scan(&person.Id, &person.Username, &person.Password, &person.Role, &person.GroupTeam, &person.DeviceUsername, &person.DevicePassword, &person.Block, &person.Commands)

	if err2 != nil {
		//log.Fatal(err, "asfasf")
		fmt.Println(err2, "err log")
		db.Close() 
		return
	}
	var data []structs.PersonDB
	data = append(data, person)
	resp = structs.RespondUser{Success: true, Permission: true, Err: structs.ErrorMessage{}, Data: structs.GetUsersRespond{DataTable: data}}
	result, _ := json.MarshalIndent(resp, "", "\t")
	fmt.Println(result, person, "updated OLT")
	w.Header().Set("Content-Type", "application/json")
	w.Write(result)

	//defer update.Close()
	defer db.Close()
}
