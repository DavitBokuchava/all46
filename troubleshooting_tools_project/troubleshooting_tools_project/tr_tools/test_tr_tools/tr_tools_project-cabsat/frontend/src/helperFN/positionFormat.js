export const positionFormat = (technology, vendor, frame, slot, port, vport) => {
    let position = ""
    if (technology === "gpon") {
        if (vendor === 'zte')
            position = `gpon-onu_${frame}/${slot}/${port}/${vport}`;
        if (vendor === 'huawei') {
            position = `gpon ${frame}/${slot}/${port} ${vport}`;
        }
    }
    if (technology === "dsl") {
        if (vendor === 'alcatel')
            position = `adsl${frame}/${slot}/${port}`;
        if (vendor === 'huawei') {
            position = `dsl${frame}/${slot}/${port}`;
        }
    }
    return {
        position
    };
}