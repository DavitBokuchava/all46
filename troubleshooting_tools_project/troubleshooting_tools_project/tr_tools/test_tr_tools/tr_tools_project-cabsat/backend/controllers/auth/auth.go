package auth

// "backend/Middlewares/decodeToken"
// "backend/Middlewares/jwtverify"
// "backend/structs"
import (
	"backend/Middlewares/decodeToken"
	tkn "backend/Middlewares/jwtverify"
	"backend/controllers/middlewares"
	"backend/structs"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

// type RespondUserLogin struct {
// 	Success bool
// 	Err     string
// 	Token   string
// 	Data    Person
// }

func Auth(w http.ResponseWriter, r *http.Request) {
	var resp structs.RespondUserLogin
	middlewares.SetupResponse(&w, r)
	if r.Method != "GET" {
		resp = structs.RespondUserLogin{Success: false, Err: structs.ErrorMessage{FatalError: "FATAL ERROR AUTH Http response problem"}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	auth := r.Header.Get("Authorization")
	// fmt.Println(auth, "auth")
	if auth == "" || len(strings.Split(auth, " ")) < 1 {
		resp = structs.RespondUserLogin{Success: false, Err: structs.ErrorMessage{AuthError: "Auth Error no token"}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		// fmt.Println(resp, "Auth Error")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	tokenString := strings.Split(auth, " ")[1]
	// fmt.Println(tokenString, "     tokenString")
	checktoken := tkn.JwtVerify(tokenString)
	if checktoken == false {
		resp = structs.RespondUserLogin{Success: false, Err: structs.ErrorMessage{AuthError: "Auth Error 1 invalid token dateless"}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		// fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	success, u := decodeToken.DecodeToken(tokenString)
	if success == false {
		resp = structs.RespondUserLogin{Success: false, Err: structs.ErrorMessage{AuthError: "Auth Error2 Invalid Token cant get info of user"}}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	// fmt.Println(u, "UUUUUUUUUUUUUUUUUUU")
	resp = structs.RespondUserLogin{Success: true, Token: tokenString, Err: structs.ErrorMessage{}, Data: structs.PersonDB{Id: u.Id, Username: u.Username, Role: u.Role, GroupTeam: u.GroupTeam, Commands: u.Commands}}
	errorss, _ := json.MarshalIndent(resp, "", "\t")
	// fmt.Println(resp, "Auth")
	w.Header().Set("Content-Type", "application/json")
	w.Write(errorss)
	return

}
