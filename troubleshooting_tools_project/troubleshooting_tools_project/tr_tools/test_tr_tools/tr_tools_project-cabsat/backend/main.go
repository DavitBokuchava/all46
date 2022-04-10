package main

import (
	"backend/routes"
	"net/http"
	"os"
	"path"
	"strings"
)

const FSPATH = "../frontend/build/"

func main() {

	fs := http.FileServer(http.Dir(FSPATH))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// If the requested file exists then return if; otherwise return index.html (fileserver default page)
		println(r.URL.Path, "  ====  r.URL.Path")
		if r.URL.Path != "/" {
			fullPath := FSPATH + strings.TrimPrefix(path.Clean(r.URL.Path), "/")
			_, err := os.Stat(fullPath)
			//println(r.URL.Path, fullPath, " === fullPath ====", strings.TrimPrefix(path.Clean(r.URL.Path), "/"), url, " ==== url ====")
			if err != nil {
				if !os.IsNotExist(err) {
					panic(err)
				}
				//http.Error(w, "404 not found.", http.StatusNotFound)
				// Requested file does not exist so we return the default (resolves to index.html)
				r.URL.Path = "/"
			}
		}
		fs.ServeHTTP(w, r)
	})

	routes.Auth()
	routes.Login()
	routes.Getusers()
	routes.AddUser()
	routes.Updateuser()
	routes.Getuserslist()
	routes.Blockuser()
	routes.Adddevice()
	routes.Getdevicelist()
	routes.Updatedevice()
	routes.Hidedevice()
	routes.ShowcommandsGpon()
	routes.ShowcommandsDsl()
	routes.DhcpLog()
	routes.Getlogs()
	routes.Getdevices()
	routes.CoadhcpLog()
	routes.Setontportsuhaweigpon()
	routes.Setportsztegpon()
	routes.AutofindSn()
	routes.Mgc()
	// routes.RemoveMacAddress()

	// http.HandleFunc("/getping", getPing)
	// http.HandleFunc("/ptd_mobile_lte", mobile)

	http.ListenAndServe(":8080", nil)
}
