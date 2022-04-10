module backend

go 1.16

replace backend/Middlewares/bcrypting => ./Middlewares/bcrypting

replace backend/controllers/users => ./controllers/users

replace backend/controllers/middlewares => ./controllers/middlewares

replace backend/controllers/login => ./controllers/login

replace backend/controllers/auth => ./controllers/auth

replace backend/controllers/logs => ./controllers/logs

replace backend/controllers/devices => ./controllers/devices

replace backend/Middlewares/getJWTToken => ./Middlewares/getJWTToken

replace backend/Middlewares/jwtverify => ./Middlewares/jwtverify

replace backend/Middlewares/decodeToken => ./Middlewares/decodeToken

replace backend/database => ./database

replace backend/structs => ./structs

replace backend/routes => ./routes

replace backend/commands/showcommands => ./commands/showcommands

// replace backend/commands/backend/commands/removemacaddress => ./commands/removemacaddress

replace backend/commands/setontportshuawei => ./commands/setontportshuawei

replace backend/commands/setportszte => ./commands/setportszte

replace backend/commands/dhcplog => ./commands/dhcplog

replace backend/commands/coadhcplog => ./commands/coadhcplog

replace backend/commands/autofind => ./commands/autofind

replace backend/commands/mgc => ./commands/mgc

replace backend/Middlewares/filterMiddlewares/getlogsfilter => ./Middlewares/filterMiddlewares/getlogsfilter

replace backend/Middlewares/filterMiddlewares/getusersfilter => ./Middlewares/filterMiddlewares/getusersfilter

replace backend/Middlewares/filterMiddlewares/getdevicesfilter => ./Middlewares/filterMiddlewares/getdevicesfilter

require (
	backend/database v0.0.0-00010101000000-000000000000 // indirect
	backend/routes v0.0.0-00010101000000-000000000000 // indirect
	github.com/dgrijalva/jwt-go v3.2.0+incompatible // indirect
	github.com/lib/pq v1.10.3 // indirect
	golang.org/x/crypto v0.0.0-20210616213533-5ff15b29337e // indirect
)
