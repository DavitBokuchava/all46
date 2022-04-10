import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import {
    showCommandGpon,
    showCommandDsl,
    setServicePortZteAction,
    setServiceProfileHuaweiAction,
    autofindSnAction,
    mgc,
} from '../../../reducers/showcommands/actions'
import cn from 'classnames';
import st from '../style.module.css';
import { splitFrameSlotPort } from '../../../helperFN/splitFrameSlotPort';



//"cabsat_set_ports", "huawei_set_ont_port(s)_to_vlan","zte_onu_reboot","huawei_ont_restart","zte_olt_set_ports_to_vlans"
const DeviceShowCommandsList = (props) => {
    const {
        disable,
        commandsList,
        deviceFields,
        setDisable,
        setCurrentCommand,
        fieldError, 
		setFieldError, } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    // const popsUp = ["cabsat_set_ports", "huawei_set_ont_port(s)_to_vlan","zte_onu_reboot","huawei_ont_restart","zte_olt_set_ports_to_vlans"]

    useEffect(()=>{
        console.log(fieldError,"fieldErrorfieldErrorfieldErrorfieldError")
    },[fieldError])
    // console.log(st.disabled)
    function mgcTrigger(obj){
        console.log("mgc OBJ", obj)
        return new Promise((rs,rj)=>{
            if(obj.mgc === 'mgc'){
                return rj({err:'მიუთითე ip მისამართი',fieldError:'mgc'})
            }
            if(window.confirm('დარწმუნებული ხარ?')){
                return dispatch(mgc(obj))
            }else{
                return rj({err:'',fieldError:'mgc'})
            }
            
        })
    }


    const tkn = useSelector(state => state.auth);
    const devices = useSelector(state => state.devices.getDeviceList.items);
    const dispatch = useDispatch();
    function makeJsonData(zone, arr){
        let obj= {}
        console.log(Object.values(arr),"arrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        Object.values(arr).map(el=>{
            console.log(el.deviceIpaddress,el)
          if(el.zone===zone){
            obj = {
              ...obj,
                [el.deviceIpaddress] : el.vendor
            }
          }
        });
        console.log(obj,"ooooooooooooooooooooooooooooooooooooooooo",zone)
        return JSON.stringify(obj);
      }
    //   function popUp(obj,dispatch,action,setDisable){
    //       if(window.confirm('დარწმუნებული ხარ?')){
    //         return new Promise((rs,rj)=>{
    //             return dispatch(action(obj))
    //         })
    //       }else{
    //           return setDisable(false);
    //       }
    //   }
    function changeFormat(str,vendor) {
        let newArray = str.toLowerCase().split("").filter(el => el !== "." && el !== "-" && el !== ":")
        let x = 3;
        // console.log(newArray.map((element, index) => {
        //     if (index === 3) {
        //         return `${element}${vendor === 'zte' ? '.':'-'}`
        //     }
        //     if (index === 7) {
        //         return `${element}${vendor === 'zte' ? '.':'-'}`
        //     }
        //     return element;

        // }).join(""), "new mac Address")
        return newArray.map((element, index) => {
            if (index === 3) {
                return `${element}${vendor === 'zte' ? '.':'-'}`
            }
            if (index === 7) {
                return `${element}${vendor === 'zte' ? '.':'-'}`
            }
            return element;

        }).join("");
    } 
    function removeMacAddress ({
        sessionId,
        customerId,
        mobNumber,
        device,
        ipAddress,
        technology,
        vendor,
        macAddress,
        command,
        frame,
        slot,
        port,
        vport,
        position,
        vlanId
    }){
        return new Promise((rs,rj)=>{
            const regexp = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/;
            if (!regexp.test(macAddress.trim())) {
                return rj({err:"მაკ მისამართი არ არის ვალიდური",fieldError:'macAddress'})
            }
            if(vlanId === '' || vlanId === '4000'){
                return rj({err:'მიუთითე vlan id',fieldError:'vlanId'});
            }
            macAddress = changeFormat(macAddress.trim(),vendor);
            if(window.confirm('დარწმუნებული ხარ?')){
                return rs({
                    sessionId,
                    customerId,
                    mobNumber,
                    device,
                    ipAddress,
                    technology,
                    vendor,
                    macAddress,
                    command,
                    frame,
                    slot,
                    port,
                    vport,
                    position,
                    vlanId
                });
            }else{
                return rj({err:'',fieldError:''})
            }
        })
    }
    function autofind (
        {sessionId,
        customerId,
        mobNumber,
        device,
        ipAddress,
        technology,
        vendor,
        command,
        frame,
        slot,
        port,
        vport,
        position,
        sn,
        zone}){
            return new Promise((rs,rj)=>{
                if(!sn ){
                    return rj({err:'მიუთითე ონტ/ონუ სერიული',fieldError:'sn'});
                }
                // if(sn.length )
                if(!zone){
                    // setFieldError('zone')
                    return rj({err:'მიუთითე ოლტს ზონა',fieldError:'zone'});
                }
                // if(window.confirm('Are sure?')){
                    
                
                // if(command === "find_by_sn_zte_hw"|| command === "autofind_zte_hw"){
                   const obj =  makeJsonData(zone,devices)
                    return rs({
                        sessionId,
                        customerId,
                        mobNumber,
                        device,
                        ipAddress,
                        technology,
                        vendor,
                        command,
                        frame,
                        slot,
                        port,
                        vport,
                        position,
                        sn,
                        zone: obj
                    })
                // }else{
                //     return rj({err:'მიუთითე ოლტს ზონა',fieldError:''})
                // }
                // }
            })
    }
    function setServiceProfileFun({
        sessionId,
        customerId,
        mobNumber,
        device,
        ipAddress,
        technology,
        vendor,
        command,
        frame,
        slot,
        port,
        vport,
        position,
        serviceProfileHuawei,
        serviceProfileZte,
        servicePortLanZte
        }) {
        return new Promise((rs, rj) => {
            if (vendor === "zte") {
                if (serviceProfileZte === "zte onu service") {
                    // setFieldError("serviceProfileZte")
                    return rj({err:"მიუთითე სერვისი",fieldError:'serviceProfileZte'})
                }
                if (servicePortLanZte === "zte onu lan") {
                    // setFieldError("servicePortLanZte")
                    return rj({err:"მიუთითე ლან პორტი",fieldError:'servicePortLanZte'})
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
                    frame,
                    slot,
                    port,
                    vport,
                    position,
                    serviceProfileZte,
                    servicePortLanZte,
                })
            }
            if (serviceProfileHuawei === "huawei service-profile") {
                // setFieldError("serviceProfileHuawei")
                return rj({err:"მიუთითე სერვის პროფაილი",fieldError:'serviceProfileHuawei'})
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
                frame,
                slot,
                port,
                vport,
                position,
                serviceProfileHuawei,
            })

        })
    }
    useEffect(() => {
        setDisable(!tkn.isAuthenticated)
    }, [tkn.isAuthenticated])
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
                macAddress,
                command,
                frame,
                slot,
                port,
                vport,
                position,
                serviceProfileHuawei,
                serviceProfileZte,
                servicePortLanZte,
                cabsatIpaddress,
                cabsatService,
                cabsatPort,
                sn,
                zone,
                mgc,
                vlanId }) => {
                // if(command === "huawei_display_mac_address"){
                //     if(window.confirm('დარწმუნებული ხარ?')){
                //         return dispatch(
                //             showCommandGpon(
                //                 sessionId,
                //                 customerId,
                //                 mobNumber,
                //                 device,
                //                 ipAddress,
                //                 technology,
                //                 vendor,
                //                 command,
                //                 frame,
                //                 slot,
                //                 port,
                //                 vport,
                //                 position))
                //     }else{
                //         return;
                //     }
                // }
                if (technology === "gpon") {
                    if(command === "zte_mac_delete" || command === "huawei_undo_mac" ){
                        return removeMacAddress({
                            sessionId,
                            customerId,
                            mobNumber,
                            device,
                            ipAddress,
                            technology,
                            vendor,
                            macAddress,
                            command,
                            frame,
                            slot,
                            port,
                            vport,
                            position,
                            vlanId
                        }).then((obj)=>console.log({...obj}," REMOVE MAC")).then(()=>setCurrentCommand(command))
                    }
                    if(command === 'zte_change_mgc_ip'){
                        return mgcTrigger({
                            sessionId,
                            customerId,
                            mobNumber,
                            device,
                            ipAddress,
                            technology,
                            vendor,
                            command,
                            frame,
                            slot,
                            port,
                            vport,
                            position,
                            mgc 
                        }).then(()=>setCurrentCommand(command))
                    }
                    if(command  === "autofind_zte_hw" || command === "find_by_sn_zte_hw"){
                        
                       return  autofind ({
                            sessionId,
                            customerId,
                            mobNumber,
                            device,
                            ipAddress,
                            technology,
                            vendor,
                            command,
                            frame,
                            slot,
                            port,
                            vport,
                            position,
                            sn,
                            zone },setFieldError).then((obj)=>dispatch(autofindSnAction({...obj}))).then(()=>setCurrentCommand(command))
                    }
                    // if(command === "Cabsat_set_ports"){
                    // }
                    // if(command === "Cabsat_show_bind_ports"){

                    // }
                    if (command === "zte_olt_set_ports_to_vlans" || command === "huawei_set_ont_port(s)_to_vlan") {
                        setCurrentCommand(command)
                        return setServiceProfileFun({
                            sessionId,
                            customerId,
                            mobNumber,
                            device,
                            ipAddress,
                            technology,
                            vendor,
                            command,
                            frame,
                            slot,
                            port,
                            vport,
                            position,
                            serviceProfileHuawei,
                            serviceProfileZte,
                            servicePortLanZte
                        },setFieldError)
                        .then((obj) => {
                            if (vendor === "zte") {
                                setCurrentCommand(command)
                                return dispatch(setServicePortZteAction(
                                    obj.sessionId,
                                    obj.customerId,
                                    obj.mobNumber,
                                    obj.device,
                                    obj.ipAddress,
                                    obj.technology,
                                    obj.vendor,
                                    obj.command,
                                    obj.frame,
                                    obj.slot,
                                    obj.port,
                                    obj.vport,
                                    obj.position,
                                    obj.serviceProfileZte,
                                    obj.servicePortLanZte
                                    ))
                                }
                                return dispatch(setServiceProfileHuaweiAction(
                                    obj.sessionId,
                                    obj.customerId,
                                    obj.mobNumber,
                                    obj.device,
                                    obj.ipAddress,
                                    obj.technology,
                                    obj.vendor,
                                    obj.command,
                                    obj.frame,
                                    obj.slot,
                                    obj.port,
                                    obj.vport,
                                    obj.position,
                                    obj.serviceProfileHuawei))
                            })
                        // .catch(err=>{
                        //     alert(err)
                        //     console.log(err,"OTHERT ERROR")
                        // })
                    }
                    setCurrentCommand(command)
                    return dispatch(
                        showCommandGpon(
                            sessionId,
                            customerId,
                            mobNumber,
                            device,
                            ipAddress,
                            technology,
                            vendor,
                            command,
                            frame,
                            slot,
                            port,
                            vport,
                            position))
                }
                if (technology === "dsl") {
                    setCurrentCommand(command)
                    return dispatch(
                        showCommandDsl(
                            sessionId,
                            customerId,
                            mobNumber,
                            device,
                            ipAddress,
                            technology,
                            vendor,
                            command,
                            frame,
                            slot,
                            port,
                            position))
                }
            })
            .then(() => setDisable(true))
            .then(()=>setFieldError(''))
            .catch(obj => {
                setFieldError(obj.fieldError)
                if(obj.err){
                   alert(obj.err) 
                }
                
                console.log(obj)
            })
    }

    return (
        <>
            <div className={st.buttonsList}>
                {/* <Popup
                isOpen = {isOpen}
                // content={
                // <>
                //     <p>are you sure? </p>
                //     <div className ={st.buttonsWrapp}>
                //     <button onClick = {triggerCommand}>trigger command</button>
                //     <button onClick={togglePopup}>cancel</button>
                //     </div>
                //     </> }
                /> */}
                {commandsList.map((el) => (
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
export default DeviceShowCommandsList;