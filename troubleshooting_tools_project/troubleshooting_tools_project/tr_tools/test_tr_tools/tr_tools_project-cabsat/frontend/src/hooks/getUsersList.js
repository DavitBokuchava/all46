
import React from 'react';
import { useDispatch } from 'react-redux';
import { getUsersList } from '../reducers/users/actions';

const getUsersHook = (deviceFields, setDeviceFields, deps) => {

       React.useEffect(() => {

       }, deps)
       return err
}
export default getUsersHook;
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
        //     &&error === "WRONG BOARD"){
        //     let board = fspv[deviceFields.technology][deviceFields.vendor].board

        //     setDeviceFields(val=>({
        //         ...val,
        //         boardSlotPort:`${board}/${deviceFields.boardSlotPort.split("/")[1]}/${deviceFields.boardSlotPort.split("/")[2]}` 
        //     }))
        // }