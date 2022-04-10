package middlewares

import (
	"backend/database"
	"backend/structs"
	"fmt"
	"log"
)

type strctr struct {
	username string
}

func Checkusertoadduser(username string) bool {
	var user strctr
	user.username = username
	fmt.Println(user)
	fmt.Println(username, " username")
	db := database.OpenConnection()

	qr := "SELECT * FROM tr_tools_users where user_name=$1"
	fmt.Println(qr)
	rows, err := db.Query(qr, username)
	var status bool
	status = true
	if err != nil {
		log.Fatal(err)
		db.Close()
		status = false
		return status
	}
	var people []structs.Person
	for rows.Next() {
		var person structs.Person
		rows.Scan(&person.Id, &person.Username, &person.Password, &person.Role)
		people = append(people, person)
	}
	fmt.Println(len(people), " people.length")
	if len(people) > 0 {
		status = false
	}
	defer rows.Close()
	defer db.Close()
	return status
}
