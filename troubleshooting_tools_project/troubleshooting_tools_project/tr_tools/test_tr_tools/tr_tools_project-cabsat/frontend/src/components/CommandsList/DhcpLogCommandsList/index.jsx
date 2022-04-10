import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import cn from 'classnames';
import st from '../style.module.css';
import { showDhcpLogs, showCoaDhcpLogs } from '../../../reducers/showcommands/actions'
import { splitFrameSlotPort } from '../../../helperFN/splitFrameSlotPort'


const DhcpLogCommandsList = (props) => {
    const {
        disable,
        dhcpCommandsList,
        deviceFields,
        setDisable,
        setCurrentCommand,
        fieldError, 
		setFieldError, } = props;

    const tkn = useSelector(state => state.auth);
    const devices = useSelector(state => state.devices.getDeviceList.items);
    console.log(tkn, tkn.token, "############ tkn TOKEN ")
    const dispatch = useDispatch();
    useEffect(() => {
        setDisable(!tkn.isAuthenticated)
    }, [tkn.isAuthenticated])
    function changeFormat(str) {
        let newArray = str.toLowerCase().split("").filter(el => el !== "." && el !== "-" && el !== ":")
        let x = 3;
        console.log(newArray.map((element, index) => {
            if (index === 3) {
                return element + "."
            }
            if (index === 7) {
                return element + "."
            }
            return element;

        }).join(""), "new mac Address")
        return newArray.map((element, index) => {
            if (index === 3) {
                return element + "."
            }
            if (index === 7) {
                return element + "."
            }
            return element;

        }).join("");
    }
    function macAddressValidation({ sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, frame, slot, port, vport, command, position, macAddress, dhcpLogIpAddress }) {

        //  const {sessionId,customerId,mobNumber,device,ipAddress,technology,vendor,command,position,macAddress} = obj;
        console.log(macAddress, "macAddressmacAddressmacAddress")
        return new Promise((rs, rj) => {
            const regexp = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/;
            const ipRegexp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

            if (command.indexOf("opt82_dhcp_coalog") !== -1) {
                return rs({
                    sessionId,
                    customerId,
                    mobNumber,
                    device,
                    ipAddress,
                    technology,
                    vendor,
                    frame,
                    slot,
                    port,
                    vport,
                    command,
                    position,
                    macAddress
                })
            }

            if (command.indexOf("_ip_") === -1) {
                if (!regexp.test(macAddress)) {
                    return rj({err:"მაკ მისამართი არ არის ვალიდური",fieldError:'macAddress'})
                }
                console.log(command, command.indexOf("mac") !== -1, changeFormat(macAddress), "changeFormat(macAddress)changeFormat(macAddress)")
                if (command.indexOf("mac") !== -1) {
                    console.log(changeFormat(macAddress), "changeFormat(macAddress)changeFormat(macAddress)")
                    macAddress = changeFormat(macAddress);
                }

            } else {
                if (!ipRegexp.test(dhcpLogIpAddress.trim())) {
                    console.log(dhcpLogIpAddress, "dhcpLogIpAddressdhcpLogIpAddress")
                    return rj({err:"IP მისამართი არ არის ვალიდური",fieldError:"dhcpLogIpAddress"})
                }
                macAddress = dhcpLogIpAddress.trim()

            }

            return rs({
                sessionId,
                customerId,
                mobNumber,
                device,
                ipAddress,
                technology,
                vendor,
                command,
                position,
                macAddress
            })
        })
    }

    const handleOutputFn = async (e) => {
        
        splitFrameSlotPort(deviceFields, devices, e.target.value)
            .then(({
                sessionId,
                customerId,
                mobNumber,
                device,
                ipAddress,
                technology,
                vendor,
                frame,
                slot,
                port,
                vport,
                command,
                position,
                macAddress,
                dhcpLogIpAddress }) => {
                console.log(macAddress, dhcpLogIpAddress, "sessionId,customerId,mobNumber,device,ipAddress,technology,vendor,command,position,macAddress")
                return macAddressValidation({
                    sessionId,
                    customerId,
                    mobNumber,
                    device,
                    ipAddress,
                    technology,
                    vendor,
                    frame,
                    slot,
                    port,
                    vport,
                    command,
                    position,
                    macAddress,
                    dhcpLogIpAddress
                })
            })
            .then(({
                sessionId,
                customerId,
                mobNumber,
                device,
                ipAddress,
                technology,
                vendor,
                frame,
                slot,
                port,
                vport,
                command,
                position,
                macAddress }) => {
                if (command === "opt82_dhcp_coalog") {
                    setCurrentCommand(command)
                    return dispatch(showCoaDhcpLogs(
                        sessionId,
                        customerId,
                        mobNumber,
                        device,
                        ipAddress,
                        technology,
                        vendor,
                        frame,
                        slot,
                        port,
                        vport,
                        command,
                        position))
                }
                setCurrentCommand(command)
                return dispatch(showDhcpLogs(
                    sessionId,
                    customerId,
                    mobNumber,
                    device,
                    ipAddress,
                    technology,
                    vendor,
                    command,
                    position,
                    macAddress))
            })
            .then(() => setDisable(true))
            .then(()=>setFieldError(''))
            .catch(({err,fieldError}) => {
                alert(err);
                setFieldError(fieldError)
                console.log(err)
            })
    }

    return (
        <>
            <div className={st.buttonsList}>
                {dhcpCommandsList.map((el) => (
                    <div
                        className={cn(st.input, {
                            [st.hov]: !disable,
                            [st.disabled]: disable
                        })}
                        key={el}>
                        <input
                            className={cn({
                                [st.hov]: !disable,
                                [st.disabled]: disable
                            })}
                            role="tabpanel"
                            name={el}
                            style={{ textAlign: "center" }}
                            type="submit"
                            value={el}
                            disabled={disable}
                            onClick={(e) => handleOutputFn(e)} />
                    </div>))}
            </div>
        </>
    )
}
export default DhcpLogCommandsList;

    // function dispatchAction(sessionId,customerId,mobNumber,device,ipAddress,technology,vendor,command,position,macAddress){
    //     return new Promise((rs,rj)=>{
    //         rs({sessionId,customerId,mobNumber,device,ipAddress,technology,vendor,command,position,macAddress})
    //     })
    // }


    // React.useEffect(()=>{
    //     console.log(deviceFields.frameSlotPort, commandsList, " === (oltFields.frameSlotPort, commandsList")
    // },[deviceFields.frameSlotPort])

// import React, { useEffect } from 'react';
// import { useDispatch,useSelector } from "react-redux"
// import cn from 'classnames';
// import st from '../style.module.css';
// import { showDhcpLogs,loader } from '../../../reducers/showcommands/actions'
// import { splitFrameSlotPort } from '../../../helperFN/splitFrameSlotPort'


// const DhcpLogCommandsList = (props)=>{
//     const  {
//         disable,
//         dhcpCommandsList,
//         deviceFields,
//         setDisable, }  = props;

//     const tkn = useSelector(state=>state.auth);
//     const devices = useSelector(state=>state.devices.getDeviceList.items);
//     console.log(tkn,tkn.token, "############ tkn TOKEN ")
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         setDisable(!tkn.isAuthenticated)
//     },[tkn.isAuthenticated])
//     function macAddressValidation({sessionId,customerId,mobNumber,device,ipAddress,technology,vendor,command,position,macAddress}){

//         //  const {sessionId,customerId,mobNumber,device,ipAddress,technology,vendor,command,position,macAddress} = obj;
//         console.log(macAddress,"macAddressmacAddressmacAddress")
//         return new Promise((rs,rj)=>{
//             let  regexp = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/;
//             if(!regexp.test(macAddress)){
//                  return rj("MAC ADDRESS IS NOT VALID")
//             }
//             return rs({
//                 sessionId,
//                 customerId,
//                 mobNumber,
//                 device,
//                 ipAddress,
//                 technology,
//                 vendor,
//                 command,
//                 position,
//                 macAddress })
//         })
//     }
//     // function dispatchAction(sessionId,customerId,mobNumber,device,ipAddress,technology,vendor,command,position,macAddress){
//     //     return new Promise((rs,rj)=>{
//     //         rs({sessionId,customerId,mobNumber,device,ipAddress,technology,vendor,command,position,macAddress})
//     //     })
//     // }
//     const handleOutputFn = async(e)=>{
//         splitFrameSlotPort(deviceFields,devices,e.target.value)
//         .then(({
//             sessionId,
//             customerId,
//             mobNumber,
//             device,
//             ipAddress,
//             technology,
//             vendor,
//             command,
//             position,
//             macAddress})=>{
//             console.log(macAddress,"sessionId,customerId,mobNumber,device,ipAddress,technology,vendor,command,position,macAddress")
//             return macAddressValidation({
//                 sessionId,
//                 customerId,
//                 mobNumber,
//                 device,
//                 ipAddress,
//                 technology,
//                 vendor,
//                 command,
//                 position,
//                 macAddress})
//         })
//         .then(({
//             sessionId,
//             customerId,
//             mobNumber,
//             device,
//             ipAddress,
//             technology,
//             vendor,
//             command,
//             position,
//             macAddress })=>{
//             return dispatch(showDhcpLogs(
//                 sessionId,
//                 customerId,
//                 mobNumber,
//                 device,
//                 ipAddress,
//                 technology,
//                 vendor,
//                 command,
//                 position,
//                 macAddress))
//         })
//         .then(()=>setDisable(true))
//         .catch(err=>{
//             alert(err)
//             console.log(err)
//         })
//     }

//     // React.useEffect(()=>{
//     //     console.log(deviceFields.frameSlotPort, commandsList, " === (oltFields.frameSlotPort, commandsList")
//     // },[deviceFields.frameSlotPort])
//     return (
//         <>
//             <div className = {st.buttonsList}>
//                 {dhcpCommandsList.map((el)=>(
//                 <div
//                     className = {cn(st.input,{
//                         [st.hov]:!disable,
//                         [st.disabled]:disable
//                     })}
//                     key = {el}>
//                 <input 
//                     className ={cn({
//                         [st.hov]:!disable,
//                         [st.disabled]: disable
//                     })}
//                     role="tabpanel" 
//                     name = {el} 
//                     style={{textAlign:"center"}} 
//                     type="submit" 
//                     value = {el} 
//                     disabled = {disable}
//                     onClick = {(e)=>handleOutputFn(e)} /> 
//                 </div>))}
//             </div>
//         </>
//     )
// }
// export default DhcpLogCommandsList;