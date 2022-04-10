
import React from 'react';
import { fspv } from '../frameSlotPortVport';
import showCommandsHandleFieldsError from '../helperFN/showCommandshandleFieldsError';

const CheckInputFields = (deviceFields, setDeviceFields, deps) => {
    const delay = 100;
    const [err, setErr] = React.useState(false)
    function test(str) {
        let newArray = str.trim().toLowerCase().split("").filter(el => el !== "." && el !== "-" && el !== ":")
        return newArray.map((element, index) => {
            return index % 2 !== 0 ? `${element}${index < newArray.length - 1 ? ':' : ''}` : element
        }).join("");
    }
    React.useEffect(() => {
        let {err} = showCommandsHandleFieldsError(deviceFields);
        if (!!deviceFields.frameSlotPort
            && !!deviceFields.frameSlotPort.split("/")[0]
            && !!deviceFields.frameSlotPort.split("/")[1]
            && !!deviceFields.frameSlotPort.split("/")[2]
            && (err === "WRONG FRAME" || "WRONG BOARD")) {
            let frame = fspv[deviceFields.technology][deviceFields.vendor].frame
            console.log(frame)
            setDeviceFields(val => ({
                ...val,
                frameSlotPort: `${frame}/${deviceFields.frameSlotPort.split("/")[1]}/${deviceFields.frameSlotPort.split("/")[2]}`
            }))
        }
        if (deviceFields.macAddress) {
            const timeout = setTimeout(() => {
                setDeviceFields(val => ({
                    ...val,
                    macAddress: test(val.macAddress)
                }))
            }, delay);
            return () => clearTimeout(timeout);
        }
        if (!!err) {
            setErr(true)
        } else {
            setErr(false)
        }

    }, deps)
    return err
}
export default CheckInputFields;
/////  mac validation \\\\\

        // if(!!deviceFields.macAddress
        //     &&/^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i.test(deviceFields.macAddress)){
        //     let regexp = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;           
        //     setDeviceFields(val=>({
        //         ...val,
        //         macAdress:`aa:dd:12:12:dd:aa` 
        //     }))
        // }
        // deviceFields.macAddress.replace(/[^a-zA-Z0-9]/g, "")
 /////////////////////////////      

        // if(!!deviceFields.boardSlotPort
        //     &&!!deviceFields.boardSlotPort.split("/")[0]
        //     &&!!deviceFields.boardSlotPort.split("/")[1]
        //     &&!!deviceFields.boardSlotPort.split("/")[2]
        //     &&err === "WRONG BOARD"){
        //     let board = fspv[deviceFields.technology][deviceFields.vendor].board

        //     setDeviceFields(val=>({
        //         ...val,
        //         boardSlotPort:`${board}/${deviceFields.boardSlotPort.split("/")[1]}/${deviceFields.boardSlotPort.split("/")[2]}` 
        //     }))
        // }