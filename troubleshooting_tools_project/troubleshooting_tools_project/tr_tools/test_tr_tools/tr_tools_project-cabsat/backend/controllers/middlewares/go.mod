module backend/controllers/middlewares

go 1.16

replace backend/database => ../../database

replace backend/structs => ../../structs

require (
	backend/database v0.0.0-00010101000000-000000000000 // indirect
	backend/structs v0.0.0-00010101000000-000000000000 // indirect
	github.com/dgrijalva/jwt-go v3.2.0+incompatible // indirect
)
