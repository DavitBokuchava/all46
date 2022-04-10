module backend/commands/mgc

go 1.16

replace backend/structs => ../../structs

replace backend/Middlewares/jwtverify => ../../Middlewares/jwtverify

replace backend/controllers/middlewares => ../../controllers/middlewares

replace backend/database => ../../database

replace backend/Middlewares/decodeToken => ../../Middlewares/decodeToken

replace backend/controllers/logs => ../../controllers/logs

replace backend/Middlewares/filterMiddlewares/getlogsfilter => ../../Middlewares/filterMiddlewares/getlogsfilter

require (
	backend/Middlewares/decodeToken v0.0.0-00010101000000-000000000000
	backend/Middlewares/jwtverify v0.0.0-00010101000000-000000000000
	backend/controllers/logs v0.0.0-00010101000000-000000000000
	backend/controllers/middlewares v0.0.0-00010101000000-000000000000
	backend/structs v0.0.0-00010101000000-000000000000
)
