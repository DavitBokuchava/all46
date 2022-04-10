package middlewares

import (
	"backend/database"
	"backend/structs"
	"fmt"
	"log"
)

func Checkusertoupdate(id string, username string) bool {
	fmt.Println(username, " username")
	db := database.OpenConnection()
	rows, err := db.Query("SELECT * FROM tr_tools_users where user_name=$1 AND id != $2", username, id)
	var status bool
	if err != nil {
		log.Fatal(err)
		status = false
		db.Close()
		return status
	}
	var people []structs.Person
	for rows.Next() {
		var person structs.Person
		rows.Scan(&person.Id, &person.Username, &person.Password, &person.Role)
		people = append(people, person)
	}
	fmt.Println(len(people), " people.length")
	if len(people) < 1 {
		status = true
	} else {
		status = false
	}
	defer rows.Close()
	defer db.Close()
	return status
}
