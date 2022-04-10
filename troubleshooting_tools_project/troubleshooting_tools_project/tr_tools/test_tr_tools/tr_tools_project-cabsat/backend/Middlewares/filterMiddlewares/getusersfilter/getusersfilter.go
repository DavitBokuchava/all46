package getusersfilter

import (
	"fmt"
)

//  id | user_id | session_id | customer_id | customer_mob_number | command | technology | vendor | device | ipaddress | position | output | date_time
func DefineUsersFilters(group_team string, user_name string) string {
	filterQuery := ""

	// if tech != "null" { //++
	// 	//txt := makeValues(user)
	// 	filterQuery += " AND techology IN (" + user + ")"
	// }
	if group_team != "null" { //++
		txt := makeValues(group_team)
		fmt.Println(txt, "== ==  user_id txt")
		filterQuery += " AND group_team IN (" + txt + ")"
	}
	if user_name != "null" { //++
		filterQuery += " AND user_name ILIKE '%" + user_name + "%'"
	}
	// if filterQuery != "" {
	// 	filterQuery += getusers + filterQuery
	// }

	fmt.Println(filterQuery, " ===  ===  === filterQueryfilterQueryfilterQuery  in midd of getusers ")
	return filterQuery
}
