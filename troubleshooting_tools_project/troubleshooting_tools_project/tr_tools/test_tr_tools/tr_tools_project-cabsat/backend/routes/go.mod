module backend/routes

go 1.16

replace backend/Middlewares/bcrypting => ../Middlewares/bcrypting

replace backend/Middlewares/getJWTToken => ../Middlewares/getJWTToken

replace backend/Middlewares/jwtverify => ../Middlewares/jwtverify

replace backend/Middlewares/decodeToken => ../Middlewares/decodeToken

replace backend/controllers/middlewares => ../controllers/middlewares

replace backend/controllers/logs => ../controllers/logs

replace backend/controllers/devices => ../controllers/devices

replace backend/controllers/users => ../controllers/users

replace backend/controllers/login => ../controllers/login

replace backend/controllers/auth => ../controllers/auth

replace backend/database => ../database

replace backend/structs => ../structs

replace backend/commands/showcommands => ../commands/showcommands

replace backend/commands/removemacaddress => ../commands/removemacaddress

replace backend/commands/setontportshuawei => ../commands/setontportshuawei

replace backend/commands/setportszte => ../commands/setportszte

replace backend/commands/dhcplog => ../commands/dhcplog

replace backend/commands/autofind => ../commands/autofind

replace backend/commands/mgc => ../commands/mgc

replace backend/commands/coadhcplog => ../commands/coadhcplog

replace backend/Middlewares/filterMiddlewares/getlogsfilter => ../Middlewares/filterMiddlewares/getlogsfilter

replace backend/Middlewares/filterMiddlewares/getusersfilter => ../Middlewares/filterMiddlewares/getusersfilter

replace backend/Middlewares/filterMiddlewares/getdevicesfilter => ../Middlewares/filterMiddlewares/getdevicesfilter

// require (
// 	backend/commands/coadhcplog v0.0.0-00010101000000-000000000000 // indirect
// 	backend/commands/dhcplog v0.0.0-00010101000000-000000000000 // indirect
// 	backend/commands/setontportshuawei v0.0.0-00010101000000-000000000000 // indirect
// 	backend/commands/setportszte v0.0.0-00010101000000-000000000000 // indirect
// 	backend/commands/showcommands v0.0.0-00010101000000-000000000000
// 	backend/controllers/auth v0.0.0-00010101000000-000000000000 // indirect
// 	backend/controllers/devices v0.0.0-00010101000000-000000000000 // indirect
// 	backend/controllers/login v0.0.0-00010101000000-000000000000 // indirect
// 	backend/controllers/logs v0.0.0-00010101000000-000000000000 // indirect
// 	backend/controllers/users v0.0.0-00010101000000-000000000000 // indirect
// 	backend/database v0.0.0-00010101000000-000000000000 // indirect
// 	backend/structs v0.0.0-00010101000000-000000000000 // indirect
// )

require (
	backend/Middlewares/filterMiddlewares/getlogsfilter v0.0.0-00010101000000-000000000000 // indirect
	backend/commands/autofind v0.0.0-00010101000000-000000000000 // indirect
	backend/commands/coadhcplog v0.0.0-00010101000000-000000000000 // indirect
	backend/commands/dhcplog v0.0.0-00010101000000-000000000000 // indirect
	backend/commands/mgc v0.0.0-00010101000000-000000000000 // indirect
	backend/commands/setontportshuawei v0.0.0-00010101000000-000000000000 // indirect
	backend/commands/setportszte v0.0.0-00010101000000-000000000000 // indirect
	backend/commands/showcommands v0.0.0-00010101000000-000000000000 // indirect
	backend/controllers/auth v0.0.0-00010101000000-000000000000 // indirect
	backend/controllers/devices v0.0.0-00010101000000-000000000000 // indirect
	backend/controllers/login v0.0.0-00010101000000-000000000000 // indirect
	backend/controllers/logs v0.0.0-00010101000000-000000000000 // indirect
	backend/controllers/users v0.0.0-00010101000000-000000000000 // indirect
	backend/database v0.0.0-00010101000000-000000000000 // indirect
	backend/structs v0.0.0-00010101000000-000000000000 // indirect
)
