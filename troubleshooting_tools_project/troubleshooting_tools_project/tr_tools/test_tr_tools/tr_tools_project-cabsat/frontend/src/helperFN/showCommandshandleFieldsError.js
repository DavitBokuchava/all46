import { fspv } from '../frameSlotPortVport';
//  import {setFieldError} from '../filtersState/CommandstriggerState.js'

function showCommandsHandleFieldsError(fields) {
    const {
        vendor,
        customerId,
        mobNumber,
        device,
        frameSlotPort,
        vport,
        technology,
        macAddress,
        dhcpLogIpAddress } = fields;
    let frame = frameSlotPort.split("/")[0];
    let slot = frameSlotPort.split("/")[1];
    let port = frameSlotPort.split("/")[2];
    let err = "";
    if (!customerId) {
        err = "კლიენტის ID არ არის მითითებული"
        // "customerId")
        return {
            err,
            errorField:customerId
        }
    }

    if (!frame === true || isNaN(Number(frame)) || parseInt(frame, 10) != fspv[technology][vendor].frame) {
        err = technology === "gpon" ? "ფრეიმი არ არის ვალიდური" : "ბორდი არ არის ვალიდური"
        // callbackError("frameSlotPort")
        return {
            err,
            errorField:frameSlotPort
        }
    }
    if (!slot === true || isNaN(Number(slot)) || parseInt(slot, 10) < fspv[technology][vendor].slot[0] || parseInt(slot, 10) > fspv[technology][vendor].slot[1]) {
        err = "სლოტი არ არის ვალიდური";
        // callbackError("frameSlotPort")
        return {
            err,
            errorField:frameSlotPort
        }
    }
    if (!port === true || isNaN(Number(port)) || parseInt(port, 10) < fspv[technology][vendor].port[0] || parseInt(port, 10) > fspv[technology][vendor].port[1]) {
        err = "პორტი არ არის ვალიდური";
        // callbackError("frameSlotPort")
        return {
            err,
            errorField:frameSlotPort
        }
    }
    if (technology === "gpon") {

        if (!vport === true || isNaN(Number(vport)) || parseInt(vport, 10) < fspv[technology][vendor].vport[0] || parseInt(vport, 10) > fspv[technology][vendor].vport[1]) {
            err = "ვირტუალური პორტი არ არის ვალიდური";
            // callbackError("vport")
            return {
                err,
                errorField:vport
            }
        }
    }

   return {
        err,
        errorField:''
    }
}
export default showCommandsHandleFieldsError;

