package getJWTToken

import (
	"backend/structs"
	"fmt"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

var secretKey = "sekretKey"

func CreateJWTToken(user structs.PersonDB) (string, bool) {
	var token structs.TokenJWT
	var status bool
	status = true
	// t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
	// 	"id":       user.Id,
	// 	"username": user.Username,
	// 	"password": user.Password,
	// 	"role":     user.Role,
	// 	"exp":      time.Now().Add(time.Minute * 60).Unix(),
	// })
	fmt.Println(user, " in create jwt UserClaimsUserClaimsUserClaims")
	claims := structs.UserClaims{
		Id:             user.Id,
		Username:       user.Username,
		Role:           user.Role,
		GroupTeam:      user.GroupTeam,
		DeviceUsername: user.DeviceUsername,
		DevicePassword: user.DevicePassword,
		Commands:       user.Commands,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Minute * 120).Unix(),
			Issuer:    "nameOfWebsiteHere",
		},
	}
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := t.SignedString([]byte(secretKey))
	if err != nil {
		status = false
	} else {
		token = structs.TokenJWT{Token: tokenString}
	}
	// fmt.Println(token, t, "tokentokentoken")

	return token.Token, status

}

//////////////////////////////////////////  decode JWT TOKEN
// claims := jwt.MapClaims{}           ///
// t, r := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
// 	return []byte("sekretKey"), nil    ///
// })                                  ///
// // ... error handling               ///
// if r != nil {                       ///
// 	fmt.Println(r, "errrorrorororo")
// }
// // do something with decoded claims
// fmt.Println(claims["role"])
// for key, val := range claims {
// 	fmt.Printf("Key: %v, value: %v\n", key, val, "asfasfasf")
// }
//////////////////////////////////////////
