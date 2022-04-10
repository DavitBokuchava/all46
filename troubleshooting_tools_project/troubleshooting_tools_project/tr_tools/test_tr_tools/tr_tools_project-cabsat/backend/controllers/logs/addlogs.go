package logs

import (
	"backend/database"
	"fmt"
)

func AddLog(
	userId string,
	groupTeam string,
	sessionId string,
	customerId string,
	customerMobNumber string,
	command string,
	technology string,
	vendor string,
	device string,
	ipAddress string,
	position string,
	output string) {
	fmt.Println(userId,
		groupTeam,
		sessionId,
		customerId,
		customerMobNumber,
		command,
		technology,
		vendor,
		device,
		ipAddress,
		position,
		output, "IN ADD LOGS")
	db := database.OpenConnection()
	// id | user_id | group_team | session_id | customer_id | customer_mob_number | command | technology | vendor | device | ipaddress | position | output | date_time
	addlog := "INSERT INTO logs_history (user_id, group_team, session_id, customer_id, customer_mob_number, command, technology, vendor, device, ipaddress, position, output,date_time) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,now()) RETURNING id"

	row := db.QueryRow(addlog, userId, groupTeam, sessionId, customerId, customerMobNumber, command, technology, vendor, device, ipAddress, position, output)
	fmt.Println(addlog, " #$#$#$#$#$#$#$#  addlog, columns")
	var id string
	err := row.Scan(&id)
	if err != nil {
		fmt.Println(err, "err log")
		panic(err)
		db.Close()
		// return
	}
	fmt.Println(err, "errerrerrerrerrerrerrerrerr  in ADDLOGS")
	// defer row.Close()
	defer db.Close()

}

// var columns structs.AddLogs
// columns = structs.AddLogs{
// 	SessionId:  sessionId,
// 	UserId:     userId,
// 	GroupTeam:  groupTeam,
// 	CustomerId: customerId,
// 	MobNumber:  mobileNumber,
// 	Technology: technology,
// 	Vendor:     vendor,
// 	Device:     device,
// 	Ipaddress:  ipAddress,
// 	Command:    command,
// 	Position:   position,
// 	Output:     output}
