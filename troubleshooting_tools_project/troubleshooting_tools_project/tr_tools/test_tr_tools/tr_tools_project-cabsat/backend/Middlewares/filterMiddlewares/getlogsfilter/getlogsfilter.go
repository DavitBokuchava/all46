package getlogsfilter

import (
	"fmt"
)

//  id | user_id | session_id | customer_id | customer_mob_number | command | technology | vendor | device | ipaddress | position | output | date_time
func DefineFilters(
	user_id string,
	user_group_team string,
	session_id string,
	customer_id string,
	customer_mob_number string,
	command string,
	technology string,
	vendor string,
	device string,
	ipaddress string,
	date string) string {
	filterQuery := ""

	// if tech != "null" { //++
	// 	//txt := makeValues(user)
	// 	filterQuery += " AND techology IN (" + user + ")"
	// }
	if user_id != "null" { //++
		txt := makeValues(user_id)
		fmt.Println(txt, "== ==  user_id txt")
		filterQuery += " AND logs_history.user_id IN (" + txt + ")"
	}
	if user_group_team != "null" { //++
		txt := makeValues(user_group_team)
		filterQuery += " AND logs_history.group_team IN (" + txt + ")"
	}
	if session_id != "null" { //++
		filterQuery += " AND logs_history.session_id ILIKE '%" + session_id + "%'"
	}

	if customer_id != "null" { //++
		filterQuery += " AND logs_history.customer_id ILIKE '%" + customer_id + "%'"
	}
	if customer_mob_number != "null" { //++
		filterQuery += " AND logs_history.customer_mob_number ILIKE '%" + customer_mob_number + "%'"
	}
	if command != "null" {
		txt := makeValues(command)
		filterQuery += " AND logs_history.command IN (" + txt + ")"
	}
	if technology != "null" { //++
		txt := makeValues(technology)
		filterQuery += " AND logs_history.technology IN (" + txt + ")"
	}
	if vendor != "null" { //++
		txt := makeValues(vendor)
		filterQuery += " AND logs_history.vendor IN (" + txt + ")"
	}
	if device != "null" { //++
		txt := makeValues(device)
		filterQuery += " AND logs_history.device IN (" + txt + ")"
	}
	if ipaddress != "null" {
		txt := makeValues(ipaddress)
		filterQuery += " And logs_history.ipaddress IN (" + txt + ")"
	}
	if date != "null" { //++
		txt := makeDateValues(date)
		filterQuery += txt
	}

	if filterQuery != "" {
		filterQuery = " WHERE 1=1 " + filterQuery
	}
	fmt.Println(filterQuery, " ===  ===  === filterQueryfilterQueryfilterQuery in midddd")
	return filterQuery
}
