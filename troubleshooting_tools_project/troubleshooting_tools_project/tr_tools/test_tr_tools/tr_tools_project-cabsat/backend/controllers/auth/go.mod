module backend/controllers/auth

go 1.16

replace backend/Middlewares/decodeToken => ../../Middlewares/decodeToken

replace backend/Middlewares/bcrypting => ../../Middlewares/bcrypting

replace backend/Middlewares/jwtverify => ../../Middlewares/jwtverify

replace backend/controllers/middlewares => ../middlewares

replace backend/database => ../../database

replace backend/structs => ../../structs

require (
	backend/Middlewares/bcrypting v0.0.0-00010101000000-000000000000 // indirect
	backend/Middlewares/decodeToken v0.0.0-00010101000000-000000000000 // indirect
	backend/Middlewares/jwtverify v0.0.0-00010101000000-000000000000 // indirect
	backend/controllers/middlewares v0.0.0-00010101000000-000000000000 // indirect
	backend/database v0.0.0-00010101000000-000000000000 // indirect
	backend/structs v0.0.0-00010101000000-000000000000 // indirect
)
