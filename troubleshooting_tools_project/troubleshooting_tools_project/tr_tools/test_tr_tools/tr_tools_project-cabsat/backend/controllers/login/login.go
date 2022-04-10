package login

import (
	"backend/Middlewares/getJWTToken"
	"backend/controllers/middlewares"
	"backend/structs"
	"encoding/json"
	"fmt"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
	var person structs.PersonDB
	var resp structs.RespondUserLogin
	middlewares.SetupResponse(&w, r)
	if r.Method != "POST" {
		resp = structs.RespondUserLogin{Success: false, Err: structs.ErrorMessage{FatalError: "Http response ERROR"}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		// fmt.Println("WRONG username")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	//ip := r.Header.Get("X-FORWARDED-FOR")
	//fmt.Println(ip, "########ip")
	decoder := json.NewDecoder(r.Body)
	err1 := decoder.Decode(&person)
	if err1 != nil {
		// fmt.Println("Error")
		return
	}
	if person.Username == "" || person.Password == "" {
		fmt.Println("err PERSON")
		return
	}
	// fmt.Println(person.Username, person.Password, "err PERSON")
	isuser, user := middlewares.IsUser(person.Username)
	// fmt.Println(user, "user")

	if isuser == false {
		resp = structs.RespondUserLogin{Success: false, Err: structs.ErrorMessage{UsernameError: "WRONG USERNAME"}}
		//, structs.RespondUserLogin.Date: {structs.Person.Id: user[0].Id, structs.Person.Username: user[0].Username, structs.Person.Parrword: user[0].Password, structs.Person.Role: user[0].Role}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		// fmt.Println("WRONG username")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}

	if person.Password != user.Password {
		resp = structs.RespondUserLogin{Success: false, Err: structs.ErrorMessage{PasswordError: "WRONG PASSWORD"}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		// fmt.Println("WRONG password")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	// fmt.Println(user, " in login from dbbbbbbbbbbbbb")
	token, b := getJWTToken.CreateJWTToken(user)
	if b != true {
		resp = structs.RespondUserLogin{Success: false, Err: structs.ErrorMessage{FatalError: "get token Problem"}}
		u, _ := json.MarshalIndent(resp, "", "\t")
		w.Header().Set("Content-Type", "application/json")
		w.Write(u)
	}
	resp = structs.RespondUserLogin{Success: true, Err: structs.ErrorMessage{}, Token: token}
	u, _ := json.MarshalIndent(resp, "", "\t")
	w.Header().Set("Content-Type", "application/json")
	w.Write(u)

	//return
	// db := database.OpenConnection()

	// err2 := db.QueryRow("UPDATE testusers set username = $1, password = $2 , role = $3 WHERE id = $4 RETURNING *", &person.Username, &person.Password, &person.Role, &person.Id).Scan(&person.Id, &person.Username, &person.Password, &person.Role)

	// if err2 != nil {
	// 	fmt.Println(err2, "err log")
	// 	return
	// }
	// updatedUser, _ := json.MarshalIndent(person, "", "\t")
	// fmt.Println(updatedUser, person, "updatedUser")
	// w.Header().Set("Content-Type", "application/json")
	// w.Write(updatedUser)

	//defer update.Close()
	//defer db.Close()

}
