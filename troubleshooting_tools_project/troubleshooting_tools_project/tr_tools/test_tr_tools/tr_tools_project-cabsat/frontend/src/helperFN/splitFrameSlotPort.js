import handleErr from './showCommandshandleFieldsError';
import { positionFormat } from './positionFormat';
export const splitFrameSlotPort = (fields, devices, command) => {
    return new Promise((rs, rj) => {

        console.log(fields, " #### fields ####")
        const {
            customerId,
            mobNumber,
            device,
            frameSlotPort,
            vport,
            technology,
            sessionId,
            vendor,
            macAddress,
            dhcpLogIpAddress,
            serviceProfileHuawei,
            serviceProfileZte,
            servicePortLanZte,
            cabsatIpaddress,
            cabsatService,
            cabsatPort,
            sn,
            zone,
            mgc,
            vlanId } = fields;
        console.log(fields, "fieldsfieldsfieldsfields")
        let ipAddress = devices[device].deviceIpaddress;
        let frame = frameSlotPort.split("/")[0];
        let slot = frameSlotPort.split("/")[1];
        let port = frameSlotPort.split("/")[2];
        // console.log(setFieldError,"setFieldErrosetFieldErrosetFieldErro")
        const objss= handleErr(fields)

        console.log(objss,"objssobjssobjssobjss")
        if (objss.err !== "") {
            return rj(objss);
        }
        const { position } = positionFormat(technology, vendor, frame, slot, port, vport)
        return rs({
            sessionId,
            customerId,
            mobNumber,
            device,
            ipAddress,
            technology,
            vendor,
            command,
            frame: parseInt(frame, 10).toString(),
            slot: parseInt(slot, 10).toString(),
            port: parseInt(port, 10).toString(),
            vport: parseInt(vport, 10).toString(),
            position,
            macAddress,
            dhcpLogIpAddress,
            serviceProfileHuawei,
            serviceProfileZte,
            servicePortLanZte,
            cabsatIpaddress,
            cabsatService,
            cabsatPort,
            sn,
            zone,
            mgc,
            vlanId,
        })
    })
}