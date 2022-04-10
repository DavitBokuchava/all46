module backend/controllers/logs

go 1.16

replace backend/database => ../../database

replace backend/structs => ../../structs

replace backend/Middlewares/decodeToken => ../../Middlewares/decodeToken

replace backend/Middlewares/jwtverify => ../../Middlewares/jwtverify

replace backend/Middlewares/filterMiddlewares/getlogsfilter => ../../Middlewares/filterMiddlewares/getlogsFilter

require (
	backend/Middlewares/decodeToken v0.0.0-00010101000000-000000000000 // indirect
	backend/Middlewares/filterMiddlewares/getlogsfilter v0.0.0-00010101000000-000000000000 // indirect
	backend/Middlewares/jwtverify v0.0.0-00010101000000-000000000000 // indirect
	backend/database v0.0.0-00010101000000-000000000000 // indirect
	backend/structs v0.0.0-00010101000000-000000000000 // indirect
	github.com/dgrijalva/jwt-go v3.2.0+incompatible // indirect
)
