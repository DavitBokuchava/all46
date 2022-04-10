

function userAddErrorHandler(obj) {
    return new Promise((rs, rj) => {
        const { username, password, role, groupTeam, deviceUsername, devicePassword, commands } = obj
        let err = "";
        if (!username) {
            err = "მიუთითე მომხმარებლის სახელი";
            return rj(err)
        }
        if (!password) {
            err = "მომხმარებლის პაროლი მიუთითე";
            return rj(err)
        }
        if (!role) {
            err = "მიუთითე როლი";
            return rj(err)
        }
        if (!groupTeam) {
            err = "მიუთითე ჯგუფი";
            return rj(err)
        }
        if (role !== "guest") {
            if (!deviceUsername) {
                err = " device username Field is empty";
                console.log(deviceUsername, "deviceUsername")
                return rj(err)
            }
            if (!devicePassword) {
                err = " device password FIELD is empty";
                return rj(err)
            }
            if (!commands) {
                err = " Error to commands for user Perrmissions";
                return rj(err)
            }
        }
        console.log(obj, "##%#%##%#% obj", err);
        return rs(obj)
    })
}
export default userAddErrorHandler;