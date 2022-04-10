package jwtverify

import (
	jwt "github.com/dgrijalva/jwt-go"
)

func JwtVerify(tokenString string) bool {

	result, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte("sekretKey"), nil
	})
	var status bool
	status = false
	if err == nil && result.Valid {
		status = true
	}

	return status
}
