package middlewares

import (
	"backend/database"
	"backend/structs"
	"fmt"
)

func IsUser(username string) (bool, structs.PersonDB) {
	var u structs.PersonDB
	var isuser bool
	isuser = false
	db := database.OpenConnection()

	rows, err := db.Query("SELECT * FROM tr_tools_users where user_name = $1 AND block=false", username)
	fmt.Println(rows, "ROWSSSS", err, "err")
	var people []structs.PersonDB
	if err != nil {
		fmt.Println(err)
		return isuser, u
	}

	for rows.Next() {
		var person structs.PersonDB
		rows.Scan(&person.Id, &person.Username, &person.Password, &person.Role, &person.GroupTeam, &person.DeviceUsername, &person.DevicePassword, &person.Block, &person.Commands)
		people = append(people, person)
	}
	if len(people) == 0 {
		fmt.Println(err)
		return isuser, u
	}
	fmt.Println(people, " jhfjhv people")
	isuser = true
	user := people[0]
	defer rows.Close()
	defer db.Close()
	return isuser, user
}
