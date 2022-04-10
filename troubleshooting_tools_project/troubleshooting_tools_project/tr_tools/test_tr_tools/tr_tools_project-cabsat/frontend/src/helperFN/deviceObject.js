export const makeObject = (arr) => {
    let obj = {}
    if (arr === null || arr.length < 1) {
        // obj = null;
        return null;
    }

    arr.map(el => {
        obj = {
            ...obj,
            [el.deviceName]: {
                ["deviceIpaddress"]: el.deviceIpaddress,
                ["technology"]: el.technology,
                ["vendor"]: el.vendor,
                ["zone"]: el.zone,
            }
        }
    })
    return obj
}