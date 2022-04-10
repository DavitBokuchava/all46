module backend/commands/removemacaddress

go 1.16


replace backend/structs => ../../structs

replace backend/Middlewares/jwtverify => ../../Middlewares/jwtverify

replace backend/controllers/middlewares => ../../controllers/middlewares

replace backend/database => ../../database

replace backend/Middlewares/decodeToken => ../../Middlewares/decodeToken

replace backend/controllers/logs => ../../controllers/logs

replace backend/Middlewares/filterMiddlewares/getlogsfilter => ../../Middlewares/filterMiddlewares/getlogsfilter
