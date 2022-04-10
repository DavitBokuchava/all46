package getdevicesfilter

import (
	"fmt"
)

//  id | user_id | session_id | customer_id | customer_mob_number | command | technology | vendor | device | ipaddress | position | output | date_time
func DefineDeviceFilters(technology string, vendor string, ipaddress string) string {
	filterQuery := ""

	if technology != "null" { //++
		txt := makeValues(technology)
		filterQuery += " AND technology IN (" + txt + ")"
	}
	if vendor != "null" { //++
		txt := makeValues(vendor)
		filterQuery += " AND vendor IN (" + txt + ")"
	}
	if ipaddress != "null" { //++
		filterQuery += " AND device_ipaddress ILIKE '%" + ipaddress + "%'"
	}

	fmt.Println(filterQuery, " ===  ===  === filterQueryfilterQueryfilterQuery")
	return filterQuery
}
