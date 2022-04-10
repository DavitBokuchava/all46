import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { FiltersState } from '../../context/filtersState';
import { getUsersList } from '../../reducers/users/actions';
import { getDeviceList } from '../../reducers/devices/actions';
import { getLogs } from '../../reducers/logs/action';
import LogsTable from '../../components/Tables/LogsTable';

const Users = ()=>{
    const filtersState = React.useContext(FiltersState);
    const { logsFilters,setLogsFilters } = filtersState.logsFilters;
    const [team,setTeam] = React.useState("");
    const [usersBoolean,setUsersBoolean] = React.useState(false)
    const [logs,setLogs] = React.useState([])
    const [filtrs,setFiltrs] = React.useState({})
    const dispatch = useDispatch();
    const userAuth = useSelector(state=>state.auth)
    const logData = useSelector(state=>state.logs);
	const usersList = useSelector(state=>state.users.getUsersList);
    const deviceList = useSelector(state=>state.devices.getDeviceList);
    // React.useEffect(()=>{
    //     if(!logData.isLoading){
    //         logData.length&&logData.items&&setLogs([...logData.items])
    //     }
    // },[logData.isLoading,logData.items])
    console.log(userAuth,team,"tshoot_analitics");
 
    React.useEffect(()=>{
       
        console.log(userAuth,"userAuth userAuth")
        // if(userAuth.role ==="user"){
            setLogsFilters((val)=>({
                ...val,
                users:{
                    [userAuth.id]:userAuth.id
                },
            }))
            return setUsersBoolean(true)
        // }
        
      },[])
    React.useEffect(()=>{
        if(usersBoolean){
            usersBoolean&&dispatch(getLogs(logsFilters));
            dispatch(getDeviceList({technology:{}, vendor:{}, ipAddress:null}));
            return setUsersBoolean(false)
        }
        
        
    },[usersBoolean])
      
      React.useEffect(()=>{
          if(logData.isLoading){
              return (<div>LOADING LOGS...sdgsdg</div>)
          }else{
              logData.items&&setLogs([...logData.items])
          }
          console.log(logsFilters,"vlogsFilterslogsFilterslogsFiltersggggggggggggggggg")
      },[logData.isLoading])
    function handleClear (){
        return setLogsFilters(val=>({
            ...val,
                session_id:"",
                customer_id:"",
                customer_number:"",
                commands:{},
                technology:{},
                vendor:{},
                device:{},
                ipaddress:{},
                filterDateTime:{
                    from:"",
                    to:""
                },
                limit:20,
                page:0,
            }));
    }
    function changeFilterState (c,a){
        if(c === "from" || c === "to"){
            return setLogsFilters(val=>({
                ...val,
                filterDateTime:{
                    ...val.filterDateTime,
                    [c]:a
                }
            }))
        }
        return setLogsFilters(prv=>{
            if(prv[c][a]){
                    const copyState = {...prv};
                    delete copyState[c][a]
                    return copyState;
                }
                return {
                    ...prv,
                    [c]:{
                        ...prv[c],
                        [a]:a
                    }
                }
            })
 
        
    }
    function handleSubmit(){
        return dispatch(getLogs(logsFilters))
    }
    function getLogsFun(obj){
        console.log( userAuth.groupTeam !== "tshoot_analitics",userAuth.groupTeam !=="userAuth.groupTeam !== tshoot_analitics")
        return new Promise((rs,rj)=>{
            
            if(userAuth.isAuthenticated&&userAuth.groupTeam !== "tshoot_analitics"){
                setLogsFilters(val=>({
                    ...val,
                    userGroupTeam:{
                        ...val.userGroupTeam,
                        [userAuth.groupTeam]:userAuth.groupTeam,
                    }
                }))
            }
            const delay = setTimeout(()=>{
                console.log("1")
                 rs(logsFilters)
            },1000)
            console.log("2")
            return clearTimeout(delay)
        })
    }
    return (
        <>
            {userAuth.isAuthenticated&&userAuth.groupTeam&&userAuth.id&&<LogsTable
                logsFilters = {logsFilters}
                setLogsFilters = {setLogsFilters}
                getLogsFun = {getLogsFun}
                handleSubmit = {handleSubmit}
                handleClear = {handleClear}
                userAuth ={userAuth}
                logData = {logData}
                usersList = {usersList}
                deviceList = {deviceList}
                changeFilterState = {changeFilterState}
                setLogs = {setLogs}
                logs= {logs}
            />}
        </>
    )
}

export default Users;
   // function changeGroup (logsFilters,setLogsFilters){
    //     // let newObj= {...obj}
        
    //     return new Promise((rs,rj)=>{
    //         if(!userAuth.id&&userAuth.groupTeam&&userAuth.isAuthenticated){
    //             return rj("AUTH PROBLEM")
    //         }
    //         setLogsFilters(val=>({
    //             ...val,
    //             users:{
    //                 ...val.users,
    //                 [userAuth.id]:userAuth.id
    //             },
    //             userGroupTeam:{
    //                 ...val.userGroupTeam,
    //                 [userAuth.groupTeam]:userAuth.groupTeam
    //             },
    //         }))

    //     //    new Promise((s,j)=>{ 
    //     //        setLogsFilters(val=>({
    //     //         ...val,
    //     //         users:{
    //     //             ...val.users,
    //     //             [userAuth.id]:userAuth.id
    //     //         },
    //     //         userGroupTeam:{
    //     //             ...val.userGroupTeam,
    //     //             [userAuth.groupTeam]:userAuth.groupTeam
    //     //         },
    //     //     }))}).then((logsFilters)=>logsFilters)
    //         // newObj = {
    //         //     ...newObj,
    //         //     [users]:{
    //         //         ...val.users,
    //         //         [userAuth.id]:userAuth.id
    //         //     },
    //         //     userGroupTeam:{
    //         //         ...userGroupTeam,
    //         //         [userAuth.groupTeam]:userAuth.groupTeam
    //         //     },
    //         // }
    //         // return new Promise((res,rej)=>{
    //         //     return res(logsFilters)
    //         // })
            
    //     })
    // }

    // React.useEffect(()=>{
    //     if(userAuth.isAuthenticated&&userAuth.groupTeam !== "tshoot_analitics"){
    //         setLogsFilters(val=>({
    //             ...val,
    //             userGroupTeam:{
    //                 ...val.userGroupTeam,
    //                 [userAuth.groupTeam]:userAuth.groupTeam,
    //             }
    //         }))
    //     }
    //     console.log(newLogsFilter,userAuth.groupTeam !== "tshoot_analitics","newLogsFilter newLogsFilter")
    //     dispatch(getUsersList());
    //     dispatch(getDeviceList());
    //     const delay = setTimeout(()=>{
    //         return dispatch(getLogs(newLogsFilter))
    //     },1000)
    //     return clearTimeout(delay)
    // },[userAuth.isAuthenticated])
       // if(c === "users"){
        //     return setLogsFilters(prv=>{
        //         if(prv.users[a]){
        //             const copyState = {...prv};
        //             delete copyState[c][a]
        //             return copyState;
        //         }
        //         return {
        //             ...prv,
        //             [c]:{
        //                 ...prv[c],
        //                 [a]:a
        //             }
        //         }
        //     })
        // }
        // if(c === "userGroupTeam"){
        //     return setLogsFilters(prv=>{
        //         if(prv[c][a]){
        //             const copyState = {...prv};
        //             delete copyState[c][a]
        //             return copyState;
        //         }
        //         return {
        //             ...prv,
        //             [c]:{
        //                 ...prv[c],
        //                 [a]:a
        //             }
        //         }
        //     })
        // }
        // if(c === "device"){
        //     return setLogsFilters(prv=>{
        //         if(prv[c][a]){
        //             const copyState = {...prv};
        //             delete copyState[c][a]
        //             return copyState;
        //         }
        //         return {
        //             ...prv,
        //             [c]:{
        //                 ...prv[c],
        //                 [a]:a
        //             }
        //         }
        //     })
        // }
        

    
    // const filtersState = React.useContext(FiltersState);
    // const { logsFilters,setLogsFilters,users } = filtersState.logsFilters;
    // const {page,limit} = logsFilters
    // console.log(filtersState.logsFilters,"logsFilters,alogsFilters,alogsFilters,a")