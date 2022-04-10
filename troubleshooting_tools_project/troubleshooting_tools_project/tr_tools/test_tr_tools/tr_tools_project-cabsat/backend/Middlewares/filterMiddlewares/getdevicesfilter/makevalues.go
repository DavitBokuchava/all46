package getdevicesfilter

import (
	"fmt"
	"strings"
)

func makeValues(f string) string {
	txt := ""
	filter := strings.Split(f, ",")
	fmt.Println(filter, "SHERJEJEJDFHNSADFN filterfilterfilterfilterfilter")
	for i := 0; i < len(filter); i++ {
		if i < len(filter)-1 {
			txt += "'" + filter[i] + "'" + ","
			fmt.Println(txt)
		} else {
			txt += "'" + filter[i] + "'"
		}

	}

	return txt
}

// func makeDateValues(f string) string {
// 	txt := ""
// 	filter := strings.Split(f, ",")
// 	txt = " AND ( date_time BETWEEN " + "'" + filter[0] + "'" + " AND " + "'" + filter[1] + "'" + ")"
// 	return txt
// }
