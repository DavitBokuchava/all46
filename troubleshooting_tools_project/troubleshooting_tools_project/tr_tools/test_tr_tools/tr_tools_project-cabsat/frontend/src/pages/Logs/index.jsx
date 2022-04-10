import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiltersState } from '../../context/filtersState';
// import { AdminFiltersState }   from '../../context/adminFiltersContext';
import { getUsersList } from '../../reducers/users/actions';
import { getDeviceList } from '../../reducers/devices/actions';
import { getLogs } from '../../reducers/logs/action';
import LogsTable from '../../components/Tables/LogsTable';

let count = 0
const LogsHistory = () => {

    // const deviceUsersFilters = React.useContext(AdminFiltersState);
    const logsfiltersState = React.useContext(FiltersState);

    const { logsFilters, setLogsFilters } = logsfiltersState.logsFilters;
    const { vendors, technologies } = logsfiltersState.vendorTechnologiesFilterState;
    const { devicesFilters, setDevicesFilters } = logsfiltersState.devicesFiltersState;
    const { setUsersFilters, usersFilters } = logsfiltersState.usersFiltersState;

    // const [team,setTeam] = React.useState("");
    // const [bool, setBool] = React.useState(false);
    const [renderPage, setRenderPage] = React.useState(false)
    const [changeLogsFilterBoolean, setChangeLogsFilterBoolean] = React.useState(false)
    const [userBoolean, setUserBoolean] = React.useState(false);
    const [logs, setLogs] = React.useState([])
    // const [filtrs,setFiltrs] = React.useState({})

    const dispatch = useDispatch();
    const userAuth = useSelector(state => state.auth)
    const logData = useSelector(state => state.logs);
    // const usersListIsloading = useSelector(state => state.users.getUsersList.isLoading);
    // const deviceListIsLoading = useSelector(state => state.devices.getDeviceList.isLoading);
    const usersList = useSelector(state => state.users.getUsersList);
    const deviceList = useSelector(state => state.devices.getDeviceList);

    console.log(userAuth, "tshoot_analitics");
    React.useEffect(() => {
        count += 1
        console.log("rednered []")
        return setRenderPage(true)
    }, [])

    function asyncGetData(logsState, usersState,devicesState, auth_properties) {
        return new Promise((rs, rj) => {
            console.log(logsState, usersState, auth_properties, "user")
            if (auth_properties.role === "admin" && auth_properties.groupTeam !== 'tshoot_analitics') {
                // let group = auth_properties.groupTeam
                logsState = {
                    ...logsState,
                    usersGroupTeam: {
                        [auth_properties.groupTeam]: auth_properties.groupTeam
                    }
                }
                usersState = {
                    ...usersState,
                    userGroupTeam: {
                        [auth_properties.groupTeam]: auth_properties.groupTeam
                    }
                }

            }
            if (auth_properties.role === "user") {
                let user_id = auth_properties.id
                logsState = {
                    ...logsState,
                    users: {
                        [auth_properties.id]: auth_properties.id
                    }
                }
                usersState = {
                    ...usersState,
                    userGroupTeam: {
                        [auth_properties.groupTeam]: auth_properties.groupTeam
                    },
                    userName: auth_properties.username
                }
            }
            return rs({ logsState, usersState,devicesState })
        })
    }

    React.useEffect(async () => {
        console.log(userAuth, "userAuth userAuth")
        if (renderPage && userAuth.isAuthenticated) {
            return asyncGetData(logsFilters, usersFilters,devicesFilters, userAuth)
                .then(({ logsState, usersState,devicesState }) => {
                    count += 1;
                    console.log(count, "count")
                    setLogsFilters({ ...logsState })
                    setUsersFilters({ ...usersState })
                    userAuth.role !== "user" && dispatch(getUsersList(usersState))
                    dispatch(getDeviceList(devicesState))
                    return dispatch(getLogs(logsState))
                })
                .then(() => setRenderPage(false))
                // .then(()=>setBool(true))
                .catch(err => console.log(err, "first render []"))
        }
    }, [renderPage, userAuth.isAuthenticated])


    React.useEffect(() => {
        setUsersFilters(val => ({
            ...val,
            userGroupTeam: {
                ...logsFilters.usersGroupTeam
            },
        }));
        setDevicesFilters(val => ({
            ...val,
            technology: {
                ...logsFilters.technology
            },
            vendor: changeLogsAfterChangeSelections(logsFilters),
        }))

        return setUserBoolean(true)
    }, [logsFilters.usersGroupTeam && Object.values(logsFilters.usersGroupTeam).length, logsFilters.technology && Object.values(logsFilters.technology).length, logsFilters.vendor && Object.values(logsFilters.vendor).length]);

    React.useEffect(() => {
        if (changeLogsFilterBoolean && !usersList.isLoading && !deviceList.isLoading) {
            changeLogsCheckedDeviceFilter(logsFilters)
            changeLogsUsersCheckedFilter(logsFilters)
            return setChangeLogsFilterBoolean(false)
        }
    }, [changeLogsFilterBoolean, usersList, deviceList])
    React.useEffect(() => {
        userAuth.role !== "user" && userBoolean && dispatch(getUsersList(usersFilters));
        userBoolean && dispatch(getDeviceList(devicesFilters));
        setUserBoolean(false)
        return setChangeLogsFilterBoolean(true)
    }, [userBoolean])

    React.useEffect(() => {
        return dispatch(getLogs(logsFilters))
    }, [logsFilters.page])
    React.useEffect(() => {
        if (logData.isLoading) {
            return (<div style={{ textAlign: "center", color: "red" }} > <h1>LOADING LOGS TEST TEST...</h1></div>)
        } else {
            return logData.items && setLogs([...logData.items])
        }

    }, [logData.isLoading]);
    function changeLogsCheckedDeviceFilter(obj) {
        let newObj = {}

        Object.keys(logsFilters.device).filter(el => {
            return deviceList.items[el]
        }).map(u => {
            return newObj = {
                ...newObj,
                [u]: u
            }
        })
        return setLogsFilters(val => ({
            ...val,
            device: {
                ...newObj
            }
        }))
        // console.log(newObj)
        //  newObj;
    }
    function changeLogsUsersCheckedFilter(obj) {
        let newObj = {}

        Object.keys(obj.users).length>0&&Object.keys(obj.users).filter(el => { // there was logsFilters insted of obj
            return usersList.items&&usersList.items.some(b => b.id == el)
        }).map(u => {
            return newObj = {
                ...newObj,
                [u]: u
            }
        })
        return setLogsFilters(val => ({
            ...val,
            users: {
                ...newObj
            }
        }))
    }

    function handleClear() {
        if ((userAuth.role === "user" || userAuth.role === "admin") && userAuth.groupTeam !== 'tshoot_analitics') {
            return setLogsFilters(val => ({
                ...val,
                session_id: "",
                customer_id: "",
                customer_number: "",
                commands: {},
                technology: {},
                vendor: {},
                device: {},
                ipaddress: {},
                filterDateTime: {
                    from: "",
                    to: ""
                },
                limit: 20,
                page: 0,
            }));
        }
        return setLogsFilters({
            users: {},
            usersGroupTeam: {},
            session_id: "",
            customer_id: "",
            customer_number: "",
            commands: {},
            technology: {},
            vendor: {},
            device: {},
            ipaddress: {},
            filterDateTime: {
                from: "",
                to: ""
            },
            limit: 20,
            page: 0,
        })

    }
    function changeFilterState(c, a) {
        if (c === "from" || c === "to") {
            return setLogsFilters(val => ({
                ...val,
                filterDateTime: {
                    ...val.filterDateTime,
                    [c]: a
                }
            }))
        }
        return setLogsFilters(prv => {
            if (prv[c][a]) {
                const copyState = { ...prv };
                delete copyState[c][a]
                return copyState;
            }
            return {
                ...prv,
                [c]: {
                    ...prv[c],
                    [a]: a
                }
            }
        })


    }
    function clearPage(a) {
        return new Promise((rs, rj) => {
            return rs(a(val => ({
                ...val,
                page: 0,
                limit: 10
            })))
        })
    }
    async function handleSubmit() {
        return clearPage(setLogsFilters)
            .then(() => dispatch(getLogs(logsFilters)))
            .catch(err => {
                return console.log(err, "errorr in logs action trigger")
            })
    }

    function changeLogsAfterChangeSelections(obj) {
        let newObj = {}
        if (Object.keys(obj.technology).length == 0) {
            console.log(newObj, " in if statement")
            setLogsFilters(val => ({
                ...val,
                vendor: {}
            }))
            return newObj
        }
        Object.keys(obj.vendor).filter(el => {
            return Object.keys(obj.technology).some(a => {
                return vendors[a][0] === el || vendors[a][1] === el
            })
        }).map(u => {
            return newObj = {
                ...newObj,
                [u]: u
            }
        })
        setLogsFilters(val => ({
            ...val,
            vendor: {
                ...newObj
            }
        }))
        console.log(newObj)
        return newObj;
    }
    return (
        <>
            {userAuth.isAuthenticated && <LogsTable
                logsFilters={logsFilters}
                setLogsFilters={setLogsFilters}
                handleSubmit={handleSubmit}
                handleClear={handleClear}
                userAuth={userAuth}
                logData={logData}
                usersList={usersList}
                deviceList={deviceList}
                vendor={vendors}
                technology={technologies}
                changeFilterState={changeFilterState}
                setLogs={setLogs}
                logs={logs}
                setPage={setLogsFilters}
                page={logsFilters.page}
                limit={logsFilters.limit}
            />}
        </>
    )
}

export default LogsHistory;

    //   React.useEffect(()=>{
    //       count +=1
    //     console.log(count,"count",logData,logsFilters)

    //   },[logData]);
    //   function asyncGetData(state,user_group,auth_group_user_id) {
    //     return new Promise((rs,rj)=>{
    //         console.log(auth_group_user_id,user_group,"userlkhkkkkkkkkkkkkkkkkkkkkkk")

    //       state = {
    //           ...state,
    //           [user_group]:{
    //               [auth_group_user_id]:auth_group_user_id
    //           }
    //       }
    //       setLogsFilters(val=>({
    //           ...val,
    //           [user_group]:{
    //               [auth_group_user_id]:auth_group_user_id
    //           }
    //       }))
    //       console.log(state,"statestate")
    //       return rs(state)
    //     })
    // }
    // React.useEffect(()=>{
    //     if(bool){
    //         console.log(logsFilters," === Logs FIlters", usersFilters," ===  users filter")
    //         bool&&dispatch(getUsersList(usersFilters))
    //         bool&&dispatch(getDeviceList(devicesFilters));
    //         // bool&&dispatch(getLogs(logsFilters));
    //          return setBool(false)
    //     }
    // },[bool])
    // React.useEffect(()=>{
    //     console.log(userAuth,"userAuth userAuth")
    //     if(renderPage&&userAuth.isAuthenticated){
    //         console.log(userAuth.role === "admin"&&userAuth.groupTeam !== 'tshoot_analitics',"true or false")
    //         if(userAuth.role === "admin"&&userAuth.groupTeam !== 'tshoot_analitics'){
    //             // setLogsFilters((val)=>({
    //             //     ...val,
    //             //     usersGroupTeam:{
    //             //         [userAuth.groupTeam]:userAuth.groupTeam
    //             //     },
    //             // }))
    //             return asyncGetData(logsFilters,"usersGroupTeam",userAuth.groupTeam)    
    //                 .then((obj)=>{
    //                     console.log(obj,"obj =======")
    //                     dispatch(getLogs(obj))
    //                     return setLogsFilters({...obj})})    
    //                 .then(()=>setRenderPage(false))
    //                 .then(()=>setBool(true))
    //                 .catch((err)=>console.log(err,"err in change logsfilters in role admin"))

    //         }
    //         if(userAuth.role === "user"){
    //             // setLogsFilters((val)=>({
    //             //     ...val,
    //             //     users:{
    //             //         [userAuth.id]:userAuth.id
    //             //     }
    //             // }))
    //             console.log("user,user" ,logsFilters)
    //             return asyncGetData(logsFilters,`${userAuth.role}s`,userAuth.id)
    //                 .then((obj)=>{
    //                     console.log(obj,"obj =======")
    //                     dispatch(getLogs(obj))
    //                     return setLogsFilters({...obj})})
    //                 .then(()=>console.log(logsFilters,"logsFilters in promise")) 
    //                 .then(()=>setRenderPage(false))
    //                 .then(()=>setBool(true))
    //                 .catch((err)=>console.log(err,"err in change logsfilters in role admin"))
    //         }
    //         setRenderPage(false);
    //         dispatch(getLogs(logsFilters))
    //         return setBool(true)
    //     }

    //   },[renderPage,userAuth.isAuthenticated])



    // React.useEffect(()=>{
    //     if(changeLogsFilterBoolean&&!usersListIsloading&&!usersListIsloading){


    //     }
    //     console.log(deviceList.items&&deviceList.items["DSL_KHASHURI-SURAMI-UA5000-0-1"])
    //     console.log({...Object.keys(logsFilters["device"]).filter(el=>{
    //         return deviceList.items[el]
    //     })},"DEVIIIIIIIIIIIIIIISWFLJKLHGJKL")
    //     // console.log(Object.keys(logsFilters[vendor]).filter(el=>{
    //     //     deviceList[el]
    //     // }))
    //     //     console.log(logsFilters)
    //     // return setChangeLogsFilterBoolean(false)

    //   },[deviceList,usersList])
    //   React.useEffect(()=>{
    //     if(Object.keys(logsFilters.technology).length === 1&&logsFilters.technology["gpon"]){
    //         Object.keys(logsFilters.vendor).filter(a=>vendors["gpon"].some(el=>el !== a)).map(el=>{
    //             return setLogsFilters(prv=>{
    //                 if(prv["vendor"][el]){
    //                         const copyState = {...prv};
    //                         delete copyState["vendor"][el]
    //                         return copyState;
    //                     }
    //                 })
    //         })
    //     }
    //     if(Object.keys(logsFilters.technology).length === 1&&logsFilters.technology["dsl"]){
    //         Object.keys(logsFilters.vendor).filter(a=>vendors["dsl"].some(el=>el !== a)).map(el=>{
    //             return setLogsFilters(prv=>{
    //                 if(prv["vendor"][el]){
    //                         const copyState = {...prv};
    //                         delete copyState["vendor"][el]
    //                         return copyState;
    //                     }
    //                 })
    //         })
    //     }

    //     // console.log(logsFilters, " logsFilterslogsFilters  logsFilterslogsFilterslogsFilters logsFilterslogsFilters")


    //   },[logsFilters.technology&&Object.keys(logsFilters.technology).length])
    // function getLogsFun(obj){
    //     console.log( userAuth.groupTeam !== "tshoot_analitics",userAuth.groupTeam !=="userAuth.groupTeam !== tshoot_analitics")
    //     return new Promise((rs,rj)=>{

    //         if(userAuth.isAuthenticated&&userAuth.groupTeam !== "tshoot_analitics"){
    //             setLogsFilters(val=>({
    //                 ...val,
    //                 userGroupTeam:{
    //                     ...val.userGroupTeam,
    //                     [userAuth.groupTeam]:userAuth.groupTeam,
    //                 }
    //             }))
    //         }
    //         const delay = setTimeout(()=>{
    //             console.log("1")
    //              rs(logsFilters)
    //         },1000)
    //         console.log("2")
    //         return clearTimeout(delay)
    //     })
    // }
          // React.useEffect(()=>{
    //     if(!logData.isLoading){
    //         logData.length&&logData.items&&setLogs([...logData.items])
    //     }
    // },[logData.isLoading,logData.items])
    //   React.useEffect(()=>{
    //     console.log(userAuth,"userAuth userAuth")
    //     if((userAuth.role === "user"||userAuth.role === "admin")&&userAuth.groupTeam !== 'tshoot_analitics'){
    //         setLogsFilters((val)=>({
    //             ...val,
    //             vendor:{},
    //         }))
    //     }
    //   },[Object.values(logsFilters.technology).length])
// import React from 'react';
// import { useDispatch,useSelector } from 'react-redux';
// import { FiltersState } from '../../../context/filtersState';
// import {getUsersList} from '../../../reducers/users/actions';
// import {getDeviceList} from '../../../reducers/devices/actions';
// import { getLogs } from '../../../reducers/logs/action';
// import LogsTable from '../../../components/Tables/LogsTable';
// import st from '../style.module.css'
// const SuperAdminLogsHistory =()=>{

//     const filtersState = React.useContext(FiltersState);
//     const { logsFilters,setLogsFilters } = filtersState.logsFilters;
//     const [team,setTeam] = React.useState("");
//     const [usersBoolean,setUsersBoolean] = React.useState(false)
//     const [logs,setLogs] = React.useState([])
//     const [filtrs,setFiltrs] = React.useState({})
//     const dispatch = useDispatch();
//     const userAuth = useSelector(state=>state.auth)
//     const logData = useSelector(state=>state.logs);
// 	const usersList = useSelector(state=>state.users.getUsersList);
//     const deviceList = useSelector(state=>state.devices.getDeviceList);
//     // React.useEffect(()=>{
//     //     if(!logData.isLoading){
//     //         logData.length&&logData.items&&setLogs([...logData.items])
//     //     }
//     // },[logData.isLoading,logData.items])
//     console.log(userAuth,team,"tshoot_analitics");

//     React.useEffect(()=>{

//             return setUsersBoolean(true)
//         // }

//       },[])
//     React.useEffect(()=>{
//         if(usersBoolean){
//             usersBoolean&&dispatch(getLogs(logsFilters));
//             dispatch(getDeviceList());
//             return setUsersBoolean(false)
//         }


//     },[usersBoolean])

//       React.useEffect(()=>{
//           if(logData.isLoading){
//               return (<div>LOADING LOGS...sdgsdg</div>)
//           }else{
//               logData.items&&setLogs([...logData.items])
//           }
//           console.log(logsFilters,"vlogsFilterslogsFilterslogsFiltersggggggggggggggggg")
//       },[logData.isLoading])
//     function handleClear (){
//         return setLogsFilters(val=>({
//             ...val,
//                 session_id:"",
//                 customer_id:"",
//                 customer_number:"",
//                 commands:{},
//                 technology:{},
//                 vendor:{},
//                 device:{},
//                 ipaddress:{},
//                 filterDateTime:{
//                     from:"",
//                     to:""
//                 },
//                 limit:20,
//                 page:0,
//             }));
//     }
//     function changeFilterState (c,a){
//         if(c === "from" || c === "to"){
//             return setLogsFilters(val=>({
//                 ...val,
//                 filterDateTime:{
//                     ...val.filterDateTime,
//                     [c]:a
//                 }
//             }))
//         }
//         return setLogsFilters(prv=>{
//             if(prv[c][a]){
//                     const copyState = {...prv};
//                     delete copyState[c][a]
//                     return copyState;
//                 }
//                 return {
//                     ...prv,
//                     [c]:{
//                         ...prv[c],
//                         [a]:a
//                     }
//                 }
//             })


//     }
//     function handleSubmit(){
//         return dispatch(getLogs(logsFilters))
//     }
//     function getLogsFun(obj){
//         console.log( userAuth.groupTeam !== "tshoot_analitics",userAuth.groupTeam !=="userAuth.groupTeam !== tshoot_analitics")
//         return new Promise((rs,rj)=>{

//             if(userAuth.isAuthenticated&&userAuth.groupTeam !== "tshoot_analitics"){
//                 setLogsFilters(val=>({
//                     ...val,
//                     userGroupTeam:{
//                         ...val.userGroupTeam,
//                         [userAuth.groupTeam]:userAuth.groupTeam,
//                     }
//                 }))
//             }
//             const delay = setTimeout(()=>{
//                 console.log("1")
//                  rs(logsFilters)
//             },1000)
//             console.log("2")
//             return clearTimeout(delay)
//         })
//     }
//     return (
//         <>
//             {userAuth.isAuthenticated&&userAuth.groupTeam&&userAuth.id&&<LogsTable
//                 logsFilters = {logsFilters}
//                 setLogsFilters = {setLogsFilters}
//                 getLogsFun = {getLogsFun}
//                 handleSubmit = {handleSubmit}
//                 handleClear = {handleClear}
//                 userAuth ={userAuth}
//                 logData = {logData}
//                 usersList = {usersList}
//                 deviceList = {deviceList}
//                 changeFilterState = {changeFilterState}
//                 setLogs = {setLogs}
//                 logs= {logs}
//             />}
//         </>
//     )
// }
// export default SuperAdminLogsHistory ;