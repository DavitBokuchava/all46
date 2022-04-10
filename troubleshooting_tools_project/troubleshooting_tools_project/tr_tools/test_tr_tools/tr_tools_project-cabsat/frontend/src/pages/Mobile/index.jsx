import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import st from "./style.module.css";
// import {NotificationManager} from 'react-notifications';
// import AutoCompliteTest  from '../Autocomplete';
import Cli from '../../components/Cli'
// import { commands }from '../../commands';
import axios from 'axios';


const keyWord = {
    "msisdn": "number",
    "imsi": "imsi"
}


const Mobile = () => {
    const [disable, setDisable] = React.useState(false);
    // const [commandsList,setCommandsList] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false);
    const [outputText, setOutputText] = React.useState('');
    const [values, setValues] = React.useState({
        type: "msisdn",
        valueType: "",
        command: "mobile"
    });
    const olts = useSelector(state => state.olt.getOltList.items)
    // const isLoading = useSelector(state=>state.olt.getOltList.isLoading)
    console.log(olts, isLoading, "#$#$############  olts, isLoading ")
    // useEffect(()=>{
    //     if (!isLoading){
    //     return <div>LOADING....</div>
    // }},[isLoading])
    React.useEffect(() => {
        isLoading && console.log(isLoading, " (isLoading(isLoading (isLoading")
    }, [isLoading])
    async function getData({ type, value, command }) {
        setDisable(true);
        try {
            const response = await axios.post(`/ptd_mobile_lte?type=${type}&command=${command}&value=${value}`);
            console.log(JSON.stringify(response.data), " ============  ")
            !!response.data ? setOutputText(response.data) : setOutputText("Script Error")
            setIsLoading(false)
            setDisable(false)
        } catch (error) {
            console.error(error);
        }
    }
    console.log("kjglkfkajsgfkljasgfklajsljawe ")
    const checkValues = (a) => {
        let error = ""

        return new Promise((rs, rj) => {
            if (!a.valueType) {
                console.log("THE FIELD IS EMPTY")
                return rj("THE FIELD IS EMPTY");
            }
            let val = parseInt(a.valueType, 10).toString()
            console.log(parseInt(val, 10), isNaN(parseInt(val, 10)))
            if (isNaN(Number(a.valueType))) {
                error = "Enter Number"
                return rj("Enter Number")
            }
            if ((a.type === "msisdn" && val.length != 9) || (a.type === "imsi" && a.valueType.length != 15)) {
                error = "The Summary of Symbols is not Correct"
                return rj("The Summary of Symbols is not Correct")
            }

            return rs({
                type: a.type,
                value: a.valueType,
                command: a.command
            })
        })
    }
    React.useEffect(() => {
        if (isLoading) {
            setOutputText("Waiting...")
        }
    }, [isLoading])
    const trigger = async () => {
        checkValues(values)
            .then(({ type, value, command }) => {
                getData({ type, value, command })
                setIsLoading(true)
            })
            .catch(err => {
                alert(err)
                return console.log(err)
            })

    }
    return (
        <>
            {/* {isLoading&&<div style={{textAlign:"center",marginTop:"300px"}}>LOADING....</div>} */}
            <div style={{ marginTop: "15px" }}>
                <div style={{ textAlign: "center", color: "#2b75ae" }}>
                    <h3>  ჯეოსელი</h3>
                </div>
                <div className={st.row}>
                    <div className={`${st.column} ${st.left}`}>
                        <div>
                            <div className={st.formContainer}>
                                <div className={st.inputFields}>
                                    <div className={st.inputField}>
                                        <input
                                            name="valueType"
                                            type="text"
                                            placeholder={keyWord[values.type]}
                                            value={values.valueType}
                                            onChange={(e) => setValues(val => ({
                                                ...val,
                                                [e.target.name]: e.target.value
                                            }))} />
                                    </div>
                                    <input
                                        className={st.checkbox}
                                        name="type"
                                        type="checkbox"
                                        value={values.type}
                                        checked={values.type === "msisdn"}
                                        onChange={(e) => setValues(val => ({
                                            ...val,
                                            [e.target.name]: values.type === "imsi" ? "msisdn" : "imsi",
                                            valueType: ""
                                        }))} />


                                    <div className={st.inputField}>
                                        <button
                                            onClick={trigger}
                                            disabled={disable}
                                        > TRIGGER</button>
                                    </div>
                                </div>

                                {/* <div className = {st.commandOutput}>{showCommand}</div> */}
                            </div>
                            <Cli output={outputText} />
                        </div>
                    </div>
                    <div className={`${st.column} ${st.right}`} >

                    </div>
                </div>
            </div>
        </>
    )
}
export default Mobile;

//    async function getData({ipAddress,vendor,command,frame,slot,port,vport}) {
//     setDisable(true);
//     try {
//       const response = await axios.post(`/mobile?ipAddress=${ipAddress}&vendor=${vendor}&command=${command}&frame=${frame}&slot=${slot}&port=${port}&vport=${vport}`);
//       console.log(JSON.stringify(response.data), " ============  ")
//       setOutputText(response.data)
//       setDisable(false)
//     } catch (error) {
//         console.error(error);
//     }
//   }
    // const  splitFrameSlotPort = (fields,vendor,command)=>{

    //   return new Promise((rs,rj)=>{
    //        if(!vendor){
    //         NotificationManager.error("WRONG OLT","Error")
    //             return rj("WRONG OLT");
    //         }
    //         console.log(fields, " #### fields ####")

    //         let ipAddress = olt[fields.olt].ip_address;
    //         let frame = fields.frameSlotPort.split("/")[0];
    //         let slot = fields.frameSlotPort.split("/")[1];
    //         let port = fields.frameSlotPort.split("/")[2];
    //         let vport = fields.vport;


    //         console.log(vport, "=== frame,slot,port" , fspv[vendor].slot[0], fspv[vendor].port[0],fspv[vendor].port[1] )
    //         if(Number.isNaN(parseInt(frame,10)) || parseInt(frame,10) != fspv[vendor].frame ){
    //            alert("WRONG FRAME")
    //             return rj("WRONG FRAME");
    //         }
    //         if(Number.isNaN(parseInt(slot,10)) || parseInt(slot,10) < fspv[vendor].slot[0] || parseInt(slot,10)>fspv[vendor].slot[1]){
    //             //NotificationManager.error("WRONG SLOT","Error")
    //             alert("WRONG SLOT")
    //             return rj("WRONG SLOT");
    //         }
    //         if( Number.isNaN(parseInt(port,10)) || parseInt(port,10) < fspv[vendor].port[0] || parseInt(port,10)>fspv[vendor].port[1]){
    //             //NotificationManager.error("WRONG PORT","Error")
    //             alert("WRONG PORT")
    //             return rj("WRONG PORT");
    //         }
    //         if( Number.isNaN(parseInt(vport,10)) || parseInt(vport,10) < fspv[vendor].vport[0] || parseInt(port,10)>fspv[vendor].vport[1]  ){
    //             //NotificationManager.error("WRONG VPORT","Error")
    //             alert("WRONG VPORT")
    //             return rj("WRONG VPORT");
    //         }
    //         return rs({
    //             ipAddress,
    //             vendor,
    //             command,
    //             frame,
    //             slot,
    //             port,
    //             vport
    //         })
    //     })
    // }

//    React.useEffect(()=>{
//     console.log(oltFields.frameSlotPort," ==== oltFields.frameSlotPort")
//    },[oltFields])