package coadhcplog

import (
	"backend/Middlewares/decodeToken"
	tkn "backend/Middlewares/jwtverify"
	"backend/controllers/logs"
	"backend/controllers/middlewares"
	"backend/structs"
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os/exec"
	"regexp"
	"strings"
)

func DhcpCoaLog(w http.ResponseWriter, r *http.Request) {
	var resp structs.SendCommandOutput
	var out bytes.Buffer
	var stderr bytes.Buffer
	var commands structs.Showcommandsstruct
	//var userCredintals structs.PersonAuth

	middlewares.SetupResponse(&w, r)

	fmt.Println(r.Method, "################## r.Method")
	if r.Method != "POST" {
		resp = structs.SendCommandOutput{Success: false, Permission: true, Err: "FATAL ERROR showcommands"}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in Shocommands")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	auth := r.Header.Get("Authorization")
	fmt.Println(auth, "auth")
	if auth == "" || len(strings.Split(auth, " ")) < 1 || strings.Split(auth, " ")[1] == "null" {
		resp = structs.SendCommandOutput{Success: false, Permission: false, Err: "no token"}
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
		resp = structs.SendCommandOutput{Success: false, Permission: false, Err: "Sign in"}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in token problem showcommands")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}

	decoder := json.NewDecoder(r.Body)
	fmt.Println(decoder, "#### decoder")
	err1 := decoder.Decode(&commands)
	if err1 != nil {
		resp = structs.SendCommandOutput{Success: false, Permission: true, Err: "FATAL ERROR showcommands 2"}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Log in Shocommands")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}

	fmt.Println(err1, commands, "#### err1 commands")
	if commands.Vendor == "" || commands.Command == "" || commands.Position == "" || commands.CustomerId == "" {
		resp = structs.SendCommandOutput{Success: false, Permission: true, Err: "invalid fields"}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "Fields problem MacAddress internet dhcp ")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}

	fmt.Println(commands.Device, commands.Vendor, commands.Frame, commands.Slot, commands.Port, commands.Vport, "#### commands.Device, commands.Vendor, commands.Frame, commands.Slot, commands.Port, commands.Vport, in cola log dhcp")
	fmt.Println("external_scripts/showcommands/dhcplog/" + commands.Command)

	cmd := exec.Command("python3", "external_scripts/showcommands/dhcplog/"+commands.Command+".py", commands.Device, commands.Vendor, commands.Frame, commands.Slot, commands.Port, commands.Vport)
	// fmt.Println("external_scripts/showcommands/" + commands.Vendor + "/" + commands.Command + ".py")

	cmd.Stdout = &out
	cmd.Stderr = &stderr

	err := cmd.Run()
	if err != nil {
		resp = structs.SendCommandOutput{Success: false, Permission: true, Err: "cmd Error", Output: "Fatal cmd ERROR"}
		errorss, _ := json.MarshalIndent(resp, "", "\t")
		fmt.Println(resp, "MacAddress internet dhcp CMD ERROR")
		w.Header().Set("Content-Type", "application/json")
		w.Write(errorss)
		return
	}
	suc, user := decodeToken.DecodeToken(tokenString)
	if suc != true {
		fmt.Println("error in PRE ADDLOG")
	}
	fmt.Println(user, " ######################  user from token")
	var input string
	input = out.String()
	re := regexp.MustCompile(`\r\n*`)
	input = re.ReplaceAllString(input, " ")
	fmt.Println(input, "############  input")
	logs.AddLog(
		user.Id,
		user.GroupTeam,
		commands.SessionId,
		commands.CustomerId,
		commands.MobileNumber,
		commands.Command,
		commands.Technology,
		commands.Vendor,
		commands.Device,
		commands.IpAddress,
		commands.Position,
		input)
	resp = structs.SendCommandOutput{Success: true, Permission: true, Output: out.String()}
	output, _ := json.MarshalIndent(resp, "", "\t")
	fmt.Println(out.String(), " ==== IPPPPPP")
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(output)

}
