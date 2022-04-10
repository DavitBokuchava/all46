package decodeToken

import (
	"backend/structs"
	"fmt"

	jwt "github.com/dgrijalva/jwt-go"
)

// type UserClaim struct {
// 	Id       string `json:"id"`
// 	Username string `json:"username"`
// 	Password string `json:"password"`
// 	Role     string `json:"role"`
// 	jwt.StandardClaims
// }

func DecodeToken(gettoken string) (bool, structs.PersonAuth) {
	var user structs.PersonAuth
	var success bool
	success = true
	var claims structs.UserClaims

	token, err := jwt.ParseWithClaims(gettoken, &claims, func(t *jwt.Token) (interface{}, error) {
		return []byte("sekretKey"), nil
	})
	if err != nil {
		fmt.Println(err, token, "errrorrorororo")
		success = false
		return success, user
	}
	//cl, _ := json.Marshal(claims)
	user = structs.PersonAuth{Id: claims.Id, Username: claims.Username, Role: claims.Role, GroupTeam: claims.GroupTeam, DeviceUsername: claims.DeviceUsername, DevicePassword: claims.DevicePassword, Commands: claims.Commands}
	// fmt.Println(claims, user, "ROLEROEROEROEOELEEEEEEEEEEEEEEE")

	return success, user
}
