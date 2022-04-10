module backend/controllers/login

go 1.16

replace backend/database => ../../database

replace backend/structs => ../../structs

replace backend/controllers/middlewares => ../middlewares

replace backend/Middlewares/getJWTToken => ../../Middlewares/getJWTToken

require (
	backend/Middlewares/getJWTToken v0.0.0-00010101000000-000000000000 // indirect
	backend/controllers/middlewares v0.0.0-00010101000000-000000000000 // indirect
	backend/database v0.0.0-00010101000000-000000000000 // indirect
	backend/structs v0.0.0-00010101000000-000000000000 // indirect
	github.com/dgrijalva/jwt-go v3.2.0+incompatible // indirect
)
