module backend/controllers/users

go 1.16

replace backend/structs => ../../structs

replace backend/database => ../../database

replace backend/controllers/middlewares => ../middlewares

replace backend/Middlewares/jwtverify => ../../Middlewares/jwtverify

replace backend/Middlewares/decodeToken => ../../Middlewares/decodeToken

// replace backend/Middlewares/bcrypting => ../../Middlewares/bcrypting

replace backend/Middlewares/filterMiddlewares/getusersfilter => ../../Middlewares/filterMiddlewares/getusersfilter

require (
	// backend/Middlewares/bcrypting v0.0.0-00010101000000-000000000000 // indirect
	backend/Middlewares/decodeToken v0.0.0-00010101000000-000000000000 // indirect
	backend/Middlewares/filterMiddlewares/getusersfilter v0.0.0-00010101000000-000000000000 // indirect
	backend/Middlewares/jwtverify v0.0.0-00010101000000-000000000000 // indirect
	backend/controllers/middlewares v0.0.0-00010101000000-000000000000 // indirect
	backend/database v0.0.0-00010101000000-000000000000 // indirect
	backend/structs v0.0.0-00010101000000-000000000000 // indirect
	github.com/dgrijalva/jwt-go v3.2.0+incompatible // indirect
// golang.org/x/crypto v0.0.0-20210616213533-5ff15b29337e // indirect
)
