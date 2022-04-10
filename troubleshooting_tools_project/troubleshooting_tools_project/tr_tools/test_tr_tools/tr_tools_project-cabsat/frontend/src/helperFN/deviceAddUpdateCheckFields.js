

function deviceAddUpdateErrorHandler(obj) {
    return new Promise((rs, rj) => {
        const { deviceName, deviceIpaddress, technology, vendor } = obj
        let err = "";
        if (!deviceName) {
            err = "დივაისის სახელი მიუთითე";
            return rj(err)
        }
        if (!deviceIpaddress) {
            err = "მიუთითე ip მისამართი";
            return rj(err)
        }
        if (!technology) {
            err = "";
            return rj(err)
        }
        if (!vendor) {
            err = "დივასის ვენდორი მიუთითე";
            return rj(err)
        }
        // if(role !== "guest"){
        //     if(!deviceUsername){
        //         err = " device username Field is empty";
        //         console.log(deviceUsername,"deviceUsername")
        //         return rj(err)
        //     }
        //     if(!devicePassword){
        //         err = " device password FIELD is empty";
        //         return rj(err)
        //     }
        //     if(!commands){
        //         err = " Error to commands for user Perrmissions";
        //         return rj(err)
        //     }
        // }
        console.log(obj, "##%#%##%#% obj", err);
        return rs(obj)
    })
}
export default deviceAddUpdateErrorHandler;