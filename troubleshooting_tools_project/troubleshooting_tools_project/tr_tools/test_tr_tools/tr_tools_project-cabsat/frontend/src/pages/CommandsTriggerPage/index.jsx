import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames'
import { NotificationManager } from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';
import { FiltersState } from '../../context/filtersState';
import AutoCompliteTest from '../../components/Autocomplete';
import Cli from '../../components/Cli';
import ShowDeviceCommandsList from '../../components/CommandsList/ShowCommandsList';
import DhcpLogCommandsList from '../../components/CommandsList/DhcpLogCommandsList';
import { getDeviceList } from '../../reducers/devices/actions';
import CheckInputFields from '../../hooks/checkIputFields'
import st from "./style.module.css";

const CommandsTriggerComponent = () => {
    const fieldsState = React.useContext(FiltersState);
    const {
        selectionOptions,
        selectionCabsatOptions,
        deviceFields,
        setDeviceFields,
        currentCommand,
        setCurrentCommand,
        commandsList,
        setCommandsList,
        zonesList,
        fieldError, 
		setFieldError,
    } = fieldsState.commandstriggerState; // it was added in 13/09/2021
    const [isLoading, setLoading] = React.useState(false)
    const [disable, setDisable] = React.useState(false);
    // const [commandsList, setCommandsList] = React.useState({})  // it was added in 13/09/2021
    // const [currentCommand, setCurrentCommand] = React.useState('')  // it was added in 13/09/2021
    const [open, setOpen] = React.useState({
        commands: true,
        dhcplog: true
    })
    const [showCommand, setShowCommand] = React.useState("");
    // const [deviceList, setdeviceeList] = React.useState([]); // it was added in 13/09/2021
    const [outputText, setOutputText] = React.useState('');


    const err = CheckInputFields(deviceFields, setDeviceFields, [deviceFields.frameSlotPort, deviceFields.vport, deviceFields.boardSlotPort, deviceFields.macAddress, deviceFields.cabsatIpaddress, deviceFields.cabsatService, deviceFields.cabsatService]);
    const dispatch = useDispatch()
    const devices = useSelector(state => state.devices.getDeviceList.items);

    const deviceNames = useSelector(state => state.devices.getDeviceList.deviceNames)
    const isLoadingDeviceList = useSelector(state => state.devices.getDeviceList.isLoading)
    const output = useSelector(state => state.showCommand);

    useEffect(() => {
        dispatch(getDeviceList({ technology: {}, vendor: {}, ipAddress: null }))
        // dispatch(getDeviceList({ technology: deviceFields.technology, vendor: deviceFields.vendor, ipAddress: deviceFields.ipAddress }))
        //  setCommandsList(val=>({...val,dhcpLogs:commands["dhcpLogs"]}))
        console.log(commandsList, "commandsListcommandsList", deviceFields.vendor, " == vendor ==", zonesList," &%^&%&%^& ZONESLIST")
    }, [])
    useEffect(()=>{
        console.log(fieldError, " fieldError #######")
    },[fieldError])
    React.useEffect(() => {
        if (output.loader) {
            console.log(output, "############## output.output");
            setOutputText('waiting log ...')
            console.log(deviceFields, "eviceFields", 'waiting log ...')
        } else {
            setOutputText(output.output)
            setDisable(false)
            console.log(deviceFields, "eviceFields")
        }
        console.log(output, "############## output.output none true")
    }, [output.loader])
    const handleClear = () => {
        setDeviceFields({
            customerId: "",
            mobNumber: "",
            command: "",
            device: "",
            frameSlotPort: "",
            vport: "",
            technology: "",
            sessionId: uuidv4(),
            macAddress: "",
            position: "",
            dhcpLogIpAddress: "",
            serviceProfileHuawei: "huawei service-profile",
            serviceProfileZte: "zte onu service",
            servicePortLanZte: "zte onu lan",
            cabsatIpaddress: "",
            cabsatService: "cabsat port service",
            cabsatPort: "cabsat lan",
            zones:"",
            sn:'',
            mgc:'mgc',
            vlanId:''
        })
        setOutputText("");
        return setShowCommand("");
    }
    return (
        <>
            <div className={st.root}>
                {isLoading && <div style={{ textAlign: "center", marginTop: "300px" }}>LOADING....</div>}
                {!isLoading && <div >
                    <div className={st.row}>
                        <div className={`${st.column} ${st.left}`}>
                            <div
                                className={st.sessionWrapp}>
                                <div className={st.sessioId} >{deviceFields.sessionId}</div>
                                <div className={st.clearSession}>
                                    <button onClick={() => handleClear()}> CLEAR</button>
                                </div>
                            </div>
                            <div>
                                <div className={st.formContainer}>
                                    {/* <div className = {st.inputField}>
                                        <input
                                            name = "sessionId" 
                                            type="text" 
                                            placeholder="sessionId" 
                                            value = {deviceFields.sessionId} 
                                            style = {{width:"90%"}}
                                            onChange = {(e)=>setDeviceFields(val=>({
                                                ...val,
                                                [e.target.name]:e.target.value
                                        }))}/> 
                                        <input type="checkbox" />
                                    </div> */}

                                    <div className={st.inputFields}>
                                        <div className={st.inputField}>
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        customerId: ""
                                                    }))}
                                                >
                                                    x
                                                </span>
                                                <input
                                                    className = {cn({[st.inputErr]:fieldError === "customerId"})}
                                                    name="customerId"
                                                    type="text"
                                                    placeholder="customer"
                                                    value={deviceFields.customerId}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))} />
                                            </div>


                                        </div>
                                        <div className={st.inputField}>
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        mobNumber: ""
                                                    }))}>
                                                        x
                                                </span>
                                                <input
                                                    name="mobNumber"
                                                    type="text"
                                                    placeholder="number"
                                                    value={deviceFields.mobNumber}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))} />
                                            </div>
                                        </div>
                                        {deviceFields.customerId && <div className={st.inputField}>
                                            <div className={st.inputWrapp}>
                                                <AutoCompliteTest
                                                    commandsList={commandsList}
                                                    setCommandsList={setCommandsList}
                                                    placeholder="device"
                                                    type="text"
                                                    deviceNames={deviceNames}
                                                    values={deviceFields}
                                                    setValues={setDeviceFields}
                                                    devices={devices} />
                                            </div>
                                        </div>}

                                        {deviceFields.customerId && !!deviceFields.device && deviceFields.technology && <div className={st.inputField}>
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        frameSlotPort: ""
                                                    }))}>
                                                    x
                                                </span>
                                                <input
                                                    className = {cn({[st.inputErr]: fieldError === "frameSlotPort"})}
                                                    name="frameSlotPort"
                                                    type="text"
                                                    placeholder={deviceFields.technology === "gpon" ? "Frame/Slot/Port" : "Board/Slot/Port"}
                                                    value={deviceFields.frameSlotPort}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))} />
                                            </div>
                                        </div>}

                                        {deviceFields.customerId && deviceFields.technology === "gpon" && deviceFields.device && <div className={st.inputField}>
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        vport: ""
                                                    }))}>
                                                    x
                                                </span>
                                                <input
                                                className = {cn({[st.inputErr]: fieldError === "vport"})}
                                                    name="vport"
                                                    type="text"
                                                    placeholder="Vport"
                                                    value={deviceFields.vport}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))} />
                                            </div>
                                        </div>}


                                    </div>
                                    {/* style = {{width: deviceFields.technology === "dsl" ?  "410px" : "330px", height: "55px"}} */}
                                    {/* //!err &&  */}
                                    {(deviceFields.technology === "dsl" ? deviceFields.frameSlotPort : deviceFields.frameSlotPort && deviceFields.vport) && <div className={st.inputFields}>
                                        <div className={st.inputField} >
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        macAddress: ""
                                                    }))}>
                                                    x
                                                </span>
                                                <input
                                                className = {cn({[st.inputErr]:fieldError === "macAddress"})}
                                                    name="macAddress"
                                                    type="text"
                                                    placeholder="mac-address"
                                                    value={deviceFields.macAddress}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))} />
                                            </div>
                                        </div>
                                        <div className={st.inputField} >
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        vlanId: ""
                                                    }))}
                                                >
                                                    x
                                                </span>
                                                <input
                                                className = {cn({[st.inputErr]:fieldError === "vlanId"})}
                                                    name="vlanId"
                                                    type="text"
                                                    placeholder="vlan id"
                                                    value={deviceFields.vlanId}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))} />
                                            </div>
                                        </div>
                                        <div className={st.inputField} >
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        dhcpLogIpAddress: ""
                                                    }))}
                                                >
                                                    x
                                                </span>
                                                <input
                                                className = {cn({[st.inputErr]:fieldError === "dhcpLogIpAddress"})}
                                                    name="dhcpLogIpAddress"
                                                    type="text"
                                                    placeholder="dhcplog by ip"
                                                    value={deviceFields.dhcpLogIpAddress}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))} />
                                            </div>
                                        </div>
                                        <div className={st.inputField}>
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        sn: ""
                                                    }))}
                                                >
                                                    x
                                                </span>
                                                <input
                                                    className = {cn({[st.inputErr]:fieldError === "sn"})}
                                                    name="sn"
                                                    type="text"
                                                    placeholder="serian number"
                                                    value={deviceFields.sn}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))} />
                                            </div>
                                        </div>
                                        <div className={st.inputField}>
                                            <div className={st.inputWrapp}>
                                                
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        zone: ""
                                                    }))}
                                                >
                                                    x
                                                </span>
                                                <select
                                                    // className = {cn({[st.inputErr]:"sn" === fieldError})}
                                                    className={cn(st.selection,{
                                                        [st.inputErr]:fieldError === "zone"
                                                    })}
                                                    id="zone"
                                                    name="zone"
                                                    value={deviceFields.zone}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))}
                                                >
                                                    {zonesList&&zonesList.map(el => (
                                                        <option
                                                            key={el}
                                                            value={el}>
                                                            {el}
                                                        </option>))}
                                                </select>
                                            </div>
                                        </div>
                                        {/* <div className={st.inputField}>
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        removeMac: ""
                                                    }))}
                                                >
                                                    x
                                                </span>
                                                <input
                                                    name="removeMac"
                                                    type="text"
                                                    placeholder="Remove Mac-Address"
                                                    value={deviceFields.removeMac}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))} />
                                            </div>
                                        </div> */}
                                        {/* cabsat */}

                                    </div>}

                                    {deviceFields.technology === "gpon" && deviceFields.vendor === "huawei" && <div className={st.inputFields}>
                                        <div className={st.inputField}>
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        serviceProfileHuawei: ""
                                                    }))}
                                                >
                                                    x
                                                </span>
                                                {deviceFields.technology === "gpon" && deviceFields.vendor === "huawei" && <select
                                                    className={cn(st.selection, {
                                                        [st.inputErr]:fieldError === "serviceProfileHuawei"
                                                    })}
                                                    id="serviceProfileHuawei"
                                                    name="serviceProfileHuawei"
                                                    value={deviceFields.serviceProfileHuawei}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))}
                                                // style = {{color:"#848897"}} 
                                                >
                                                    {/* <option selected="selected">service profile</option> */}

                                                    {selectionOptions[deviceFields.vendor].map(el => (
                                                        <option
                                                            key={el}
                                                            value={el}>
                                                            {el}
                                                        </option>))}
                                                </select>}
                                            </div>
                                        </div>

                                    </div>}
                                    {deviceFields.technology === "gpon" && deviceFields.vendor === "zte" && <div className={st.inputFields}>
                                        <div className={st.inputField}>
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        serviceProfileZte: "zte onu service"
                                                    }))}
                                                >
                                                    x
                                                </span>
                                                {deviceFields.technology === "gpon" && deviceFields.vendor === "zte" && <select
                                                    className={cn(st.selection, {
                                                        // [st.placeholderColor] : deviceFields.serviceProfileHuawei ==="huawei service-profile"
                                                        [st.inputErr]:fieldError === "serviceProfileZte"
                                                    })}
                                                    id="serviceProfileZte"
                                                    name="serviceProfileZte"
                                                    value={deviceFields.serviceProfileZte}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))}
                                                >
                                                    {selectionOptions[deviceFields.vendor].service.map(el => (
                                                        <option
                                                            key={el}
                                                            value={el}>
                                                            {el}
                                                        </option>))}
                                                </select>}
                                            </div>
                                        </div>
                                        <div className={st.inputField}>
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        servicePortLanZte: "zte onu lan"
                                                    }))}
                                                >
                                                    x
                                                </span>
                                                {deviceFields.technology === "gpon" && deviceFields.vendor === "zte" && <select
                                                    className={cn(st.selection,{
                                                        [st.inputErr]:fieldError === "servicePortLanZte"
                                                    })}
                                                    id="servicePortLanZte"
                                                    name="servicePortLanZte"
                                                    value={deviceFields.servicePortLanZte}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))}
                                                >
                                                    {selectionOptions[deviceFields.vendor].ports.map(el => (
                                                        <option
                                                            key={el}
                                                            value={el}>
                                                            {el}
                                                        </option>))}
                                                </select>}
                                            </div>
                                        </div>
                                        <div className={st.inputField}>
                                            <div className={st.inputWrapp}>
                                                <span
                                                    className={st.cleanup}
                                                    onClick={() => setDeviceFields(val => ({
                                                        ...val,
                                                        mgc: "mgc"
                                                    }))}
                                                >
                                                    x
                                                </span>
                                                {deviceFields.technology === "gpon" && deviceFields.vendor === "zte" && <select
                                                    className={cn(st.selection,{
                                                        [st.inputErr]:fieldError === "mgc"
                                                    })}
                                                    id="mgc"
                                                    name="mgc"
                                                    value={deviceFields.mgc}
                                                    onChange={(e) => setDeviceFields(val => ({
                                                        ...val,
                                                        [e.target.name]: e.target.value
                                                    }))}
                                                >
                                                    {['mgc','10.10.2.4','10.10.3.4'].map(el => (
                                                        <option
                                                            key={el}
                                                            value={el}>
                                                            {el}
                                                        </option>))}
                                                </select>}
                                            </div>
                                        </div>
                                        {/* voip */}
                                    </div>}
                                    {deviceFields.technology === "gpon" && <div className={st.inputFields}>
                                        
                                    </div>}
                                </div>
                                <div className={st.inputFields}>
                                    <Cli
                                        output={output.output}
                                        command={currentCommand}
                                        isLoading={output.loader} />
                                </div>

                            </div>
                        </div>
                        <div className={`${st.column} ${st.right}`} >
                            <div className={st.container}>
                                {commandsList.showCommands && devices && devices[deviceFields.device] && <button
                                    className={st.accordion}
                                    onClick={() => setOpen(val => ({
                                        commands: !val.commands,
                                        dhcplog: true
                                    }))}
                                >
                                    Commands
                                </button>}
                                <div className={cn({
                                    [st.panel]: open.commands
                                })}>
                                    {commandsList.showCommands && devices && devices[deviceFields.device] && <ShowDeviceCommandsList
                                        setCurrentCommand={setCurrentCommand}
                                        setShowCommand={setShowCommand}
                                        disable={disable}
                                        commandsList={commandsList.showCommands && commandsList.showCommands}
                                        vendor={deviceFields.vendor}
                                        // splitFrameSlotPort = {splitFrameSlotPort}
                                        deviceFields={deviceFields}
                                        setDisable={setDisable} 
                                        fieldError = {fieldError} 
                                        setFieldError = {setFieldError}/>}

                                </div>
                                {/* !err && */}
                                {commandsList.dhcpLogs && (deviceFields.technology === "dsl" && deviceFields.frameSlotPort && deviceFields.device || deviceFields.technology === "gpon" && deviceFields.frameSlotPort && deviceFields.vport && deviceFields.device) && <button // && deviceFields.device aris damatebuli
                                    className={st.accordion}
                                    onClick={() => setOpen(val => ({
                                        dhcplog: !val.dhcplog,
                                        commands: true
                                    }))}
                                >
                                    Dhcplogs
                                </button>}
                                {/* !err &&  */}
                                {commandsList.dhcpLogs && (deviceFields.technology === "dsl" && deviceFields.frameSlotPort && deviceFields.device || deviceFields.technology === "gpon" && deviceFields.frameSlotPort && deviceFields.vport && deviceFields.device) && <div className={cn({  // && deviceFields.device aris damatebuli
                                    [st.panel]: open.dhcplog
                                })}>
                                    <DhcpLogCommandsList
                                        setCurrentCommand={setCurrentCommand}
                                        setShowCommand={setShowCommand}
                                        disable={disable}
                                        dhcpCommandsList={commandsList.dhcpLogs && commandsList.dhcpLogs}
                                        vendor={deviceFields.vendor}
                                        // splitFrameSlotPort = {splitFrameSlotPort}
                                        deviceFields={deviceFields}
                                        setDisable={setDisable}
                                        fieldError = {fieldError} 
                                        setFieldError = {setFieldError} />

                                </div>}
                            </div>


                        </div>
                    </div>
                </div>}
            </div>

        </>
    )
}
export default CommandsTriggerComponent;

    // ServiceProfileZte    string `json:"serviceProfileZte"`
    // ServiceProfileHuawei string `json:"serviceProfileHuawei"`
    // ServicePortLanZte    string `json:"servicePortLanZte"
    // console.log(selectionOptions[deviceFields.vendor]&&selectionOptions[deviceFields.vendor].ports.map(el=>el))
    // const deviceListObject = useSelector(state=>state.device.getDeviceList);


    //  let reg = /[^A-Za-z0-9]+/
    // var s = "-12345.50 €".replace(/[^\d.-]/g, '');
    //  str.replace(/[^a-zA-Z0-9]/g, "");
                                        // {/* {deviceFields.customerId&&deviceFields.technology === "dsl"&&deviceFields.device&&<div className = {st.inputField}>
                                        // <input
                                        //     name = "boardSlotPort" 
                                        //     type="text" 
                                        //     placeholder="Board/Slot/Port" 
                                        //     value = {deviceFields.boardSlotPort} 
                                        //     onChange = {(e)=>setDeviceFields(val=>({
                                        //         ...val,
                                        //         [e.target.name]:e.target.value,
                                        //         }))}/> 
                                        // </div>} */}
    // let error = handleErr(deviceFields);
        // const [err,setErr] = React.useState(true)
    // const err = handleErr(deviceFields)
/////////// checkfields useEffect \\\\\\\\\
    //  useEffect(()=>{

    // const [deviceFields, setDeviceFields] = React.useState({ // it was added in 13/09/2021
    //     customerId: "",
    //     mobNumber: "",
    //     command: "",
    //     device: "",
    //     frameSlotPort: "",
    //     boardSlotPort: "",
    //     vport: "",
    //     technology: "",
    //     sessionId: uuidv4(),
    //     macAddress: "",
    //     voip: "",
    //     position: "",
    //     dhcpLogIpAddress: "",
    //     serviceProfileHuawei: "huawei service-profile",
    //     serviceProfileZte: "zte onu service",
    //     servicePortLanZte: "zte onu lan",
    // });

    // const selectionOptions = { // it was added in 13/09/2021
    //     "zte": {
    //         "service": ["zte onu service", "internet", "iptv"],
    //         "ports": ["zte onu lan", "eth_0/1", "eth_0/2", "eth_0/3", "eth_0/4"]
    //     },
    //     "huawei": ["huawei service-profile", "10", "11", "12", "13", "14"]
    // }

        // useEffect(() => {
    //     console.log(deviceFields)
    // }, [deviceFields])

    // useEffect(() => {
    //     console.log(selectionOptions,
    //         selectionCabsatOptions,
    //         deviceFields,
    //         setDeviceFields,
    //         currentCommand,
    //         setCurrentCommand,
    //         commandsList,
    //         setCommandsList)
    // }, [])

////// VOIP  \\\\\\\\\\\\

// {/* <div className={st.inputField} >
//                                             <div className={st.inputWrapp}>
//                                                 <span
//                                                     className={st.cleanup}
//                                                     onClick={() => setDeviceFields(val => ({
//                                                         ...val,
//                                                         dhcpLogIpAddress: ""
//                                                     }))}
//                                                 >
//                                                     x
//                                                 </span>
//                                                 <input
//                                                     name="dhcpLogIpAddress"
//                                                     type="text"
//                                                     placeholder="ip address"
//                                                     value={deviceFields.dhcpLogIpAddress}
//                                                     onChange={(e) => setDeviceFields(val => ({
//                                                         ...val,
//                                                         [e.target.name]: e.target.value
//                                                     }))} />
//                                             </div>
//                                         </div> */}
//                                         {/* style = {{width: deviceFields.technology === "dsl" ?  "410px" : "330px", height: "55px"}} */}
//                                         {/* {(deviceFields)&&(deviceFields.technology === "gpon"&&deviceFields.frameSlotPort&&deviceFields.vport)&&<div className = {st.inputField} >
//                                             <div className = {st.inputWrapp}>
//                                                 <span 
//                                                     className = {st.cleanup} 
//                                                     onClick = {()=>setDeviceFields(val=>({
//                                                     ...val,
//                                                     voip:""
//                                                     }))}>
//                                                         x
//                                                     </span>
//                                                 <input
//                                                     name = "voip" 
//                                                     type="text" 
//                                                     placeholder="voip" 
//                                                     value = {deviceFields.voip} 
//                                                     onChange = {(e)=>setDeviceFields(val=>({
//                                                         ...val,
//                                                         [e.target.name]:e.target.value
//                                                 }))}/> 
//                                             </div>
//                                         </div>} 


// {deviceFields.technology === "gpon" && <div className={st.inputField} >
//                                             <div className={st.inputWrapp}>
//                                                 <span
//                                                     className={st.cleanup}
//                                                     onClick={() => setDeviceFields(val => ({
//                                                         ...val,
//                                                         cabsatIpaddress: ""
//                                                     }))}>
//                                                     x
//                                                 </span>
//                                                 <input
//                                                     name="cabsatIpaddress"
//                                                     type="text"
//                                                     placeholder="cabsat_ip_address"
//                                                     value={deviceFields.cabsatIpaddress}
//                                                     onChange={(e) => setDeviceFields(val => ({
//                                                         ...val,
//                                                         [e.target.name]: e.target.value
//                                                     }))} />
//                                             </div>
//                                         </div>}
//                                         {deviceFields.technology === "gpon" && <div className={st.inputField}>
//                                             <div className={st.inputWrapp}>
//                                                 <span
//                                                     className={st.cleanup}
//                                                     onClick={() => setDeviceFields(val => ({
//                                                         ...val,
//                                                         cabsatService: ""
//                                                     }))}
//                                                 >
//                                                     x
//                                                 </span>
//                                                 {deviceFields.technology === "gpon" && <select
//                                                     className={cn(st.selection, {
//                                                         // [st.placeholderColor] : deviceFields.serviceProfileHuawei ==="huawei service-profile"
//                                                     })}
//                                                     id="cabsatService"
//                                                     name="cabsatService"
//                                                     value={deviceFields.cabsatService}
//                                                     onChange={(e) => setDeviceFields(val => ({
//                                                         ...val,
//                                                         [e.target.name]: e.target.value
//                                                     }))}
//                                                 // style = {{color:"#848897"}} 
//                                                 >
//                                                     {/* <option selected="selected">service profile</option> */}

//                                                     {selectionCabsatOptions['service'].map(el => (
//                                                         <option
//                                                             key={el}
//                                                             value={el}>
//                                                             {el}
//                                                         </option>))}
//                                                 </select>}
//                                             </div>
//                                         </div>}
//                                         {deviceFields.technology === "gpon" && <div className={st.inputField}>
//                                             <div className={st.inputWrapp}>
//                                                 <span
//                                                     className={st.cleanup}
//                                                     onClick={() => setDeviceFields(val => ({
//                                                         ...val,
//                                                         cabsatPort: ""
//                                                     }))}
//                                                 >
//                                                     x
//                                                 </span>
//                                                 {deviceFields.technology === "gpon" && <select
//                                                     className={cn(st.selection, {
//                                                         // [st.placeholderColor] : deviceFields.serviceProfileHuawei ==="huawei service-profile"
//                                                     })}
//                                                     id="cabsatPort"
//                                                     name="cabsatPort"
//                                                     value={deviceFields.cabsatPort}
//                                                     onChange={(e) => setDeviceFields(val => ({
//                                                         ...val,
//                                                         [e.target.name]: e.target.value
//                                                     }))}
//                                                 // style = {{color:"#848897"}} 
//                                                 >
//                                                     {/* <option selected="selected">service profile</option> */}

//                                                     {selectionCabsatOptions['ports'].map(el => (
//                                                         <option
//                                                             key={el}
//                                                             value={el}>
//                                                             {el}
//                                                         </option>))}
//                                                 </select>}
//                                             </div>
//                                         </div>}