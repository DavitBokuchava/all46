
import {
  // GET_DEVICE_SELECTION_REQUEST,
  // GET_DEVICE_SELECTION_SUCCESS,
  // GET_DEVICE_SELECTION_ERROR,
  GET_DEVICE_REQUEST,
  GET_DEVICE_SUCCESS,
  GET_DEVICE_ERROR,
  GET_DEVICE_LIST_REQUEST,
  GET_DEVICE_LIST_SUCCESS,
  GET_DEVICE_LIST_ERROR,
  // GET_DEVICE_EXCEL_EXPORT_REQUEST,
  // GET_DEVICE_EXCEL_EXPORT_SUCCESS,
  // GET_DEVICE_EXCEL_EXPORT_ERROR,
  ADD_DEVICE_REQUEST,
  ADD_DEVICE_SUCCESS,
  ADD_DEVICE_ERROR,
  UPDATE_DEVICE_REQUEST,
  UPDATE_DEVICE_SUCCESS,
  UPDATE_DEVICE_ERROR,
  HIDE_DEVICE_REQUEST,
  HIDE_DEVICE_SUCCESS,
  HIDE_DEVICE_ERROR,
  // ALERT 
    } from '../constants.js';
  import axios from 'axios';
  import {logout} from '../auth/action'
  import { makeObject } from '../../helperFN/deviceObject'
  //import generateExcel from '../generateExcel/generateDeviceProblemsExcel.js';
  export const getDeviceList  = (obj)=>{
    const { technology, vendor } = obj;
    console.log(obj,"=== objobjobj in getdeviceList action")
    const token  = localStorage.getItem('token')&&JSON.parse(localStorage.getItem('token')).token;
    return (dispatch) => {
      dispatch({ 
        type:GET_DEVICE_LIST_REQUEST,
        payload:true  });
      async function getData() {
        try {
          const response = await axios.get(`/devices/getdevicelist?technology=${Object.values(technology).length>0?Object.values(technology).join(','):null}&vendor=${Object.values(vendor).length>0?Object.values(vendor).join(','):null}&ipaddress=null`,{ 
            headers:{  
              'Content-Type': 'application/json',
              'Token':token
            }
          });
          if(!response.data.Permission){
            return dispatch(logout())
          }
          console.log()
          if(response.data.Success){
             response.data = await {
              ...response.data,
              Data:makeObject(response.data.Data.data),
            }
              
            return dispatch({
              type:GET_DEVICE_LIST_SUCCESS,
              payload:response.data })
            }else {
              return dispatch({
              type: GET_DEVICE_LIST_ERROR,
              payload:response.data
            });
          }
        } catch (error) {
              console.error(error.stack," ===  TO GET_DEVICE_LIST ===");
          }
      }
      getData()
    }
  };


export const getDevices  = (obj)=>{
  const { technology, vendor, ipAddress,page,limit } = obj;
  //DEVICENameFilter = null,DEVICEIpaddressFilter = null,vendor = null,hide=null,limit,offset
  // console.log(DEVICENameFilter,DEVICEIpaddressFilter,limit,offset)
  // it needes to add params of filter LATER !!!!!!!!!!!!!!!!!!
  const token  = localStorage.getItem('token')&&JSON.parse(localStorage.getItem('token')).token;
  return (dispatch) => {
    dispatch({ type:GET_DEVICE_REQUEST, payload:true });
    async function getData() {
      try {
        const response = await axios.get(`/devices/getdevices?technology=${Object.values(technology).length>0&&Object.values(technology).length<2?Object.values(technology).join(','):null}&vendor=${Object.values(vendor).length>0&&Object.values(vendor).length<2?Object.values(vendor).join(','):null}&ipaddress=${ipAddress?ipAddress:null}&offset=${parseInt(limit,10)*parseInt(page,10)}&limit=${limit}`,{ headers: 
          {  'Content-Type': 'application/json',
            'Token':token
          }
        }); //=${DEVICENameFilter}&ipaddress=${DEVICEIpaddressFilter}&vendor=${vendor}&hide=${hide}&limit=${limit}&offset=${offset}
        console.log(response.data," getdevices  response.data")
        if(!response.data.Permission){
          return dispatch(logout())
        }
        if(response.data.Success){
          return dispatch({
            type:GET_DEVICE_SUCCESS,
            payload:response.data
          })
        }else{
          return dispatch({
            type: GET_DEVICE_ERROR,
            payload:response.data
          })
        }
        
      } catch (error) {
            console.error(error.stack," ===  TO GET_DEVICE ===");
        }
    }
    getData()
  }
};
  

export const updateDevice  = (obj,filter)=>{
    //console.log(otherObject, " in actionlhglihjgjs;lgihj;oilheg" );
  //id,deviceProblems,ipAddress,technology,otherObject
  const {
    id,
    deviceName,
    deviceIpaddress,
    technology,
    vendor,
    zone } = obj;
    console.log(obj)
  const token  = localStorage.getItem('token')&&JSON.parse(localStorage.getItem('token')).token;
  return (dispatch) => {
    dispatch({
     type:UPDATE_DEVICE_REQUEST
    });
    async function updateData() {
      try {
        const response = await axios.post('/devices/updatedevice',{
          id,
          deviceName,
          deviceIpaddress,
          technology,
          vendor,
          zone,
        },{ headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`} 
      });
      if(!response.data.Permission){
        return dispatch(logout())
      }
      if(response.data.Success){
        dispatch({
          type:UPDATE_DEVICE_SUCCESS,
          payload:response.data
        })
        return dispatch(getDevices(filter))
      }else{
        return dispatch({
          type: UPDATE_DEVICE_ERROR,
          payload:response.data
        })
      }
      }catch (error) {
        console.error(error.stack," ===  TO UPDATE_DEVICE ===");
      }
   }
    updateData()
   }
   
 };

export const addDevice  = (obj)=>{
    // console.log(deviceProblems,ipAddress,technology,otherObject);
  const {
    deviceName,
    deviceIpaddress,
    technology,
    vendor,
    zone } = obj;
    console.log(obj,"#### obj in add device action")
  const token  = localStorage.getItem('token')&&JSON.parse(localStorage.getItem('token')).token;
    
  return (dispatch) => {
    dispatch({
      type: ADD_DEVICE_REQUEST
      });
    async function addData() {
      try {
        const response = await axios.post('/devices/adddevice',{
          deviceName,
          deviceIpaddress,
          technology,
          vendor,
          zone, },{ headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`} 
          });
          if(!response.data.Permission){
            return dispatch(logout())
          }
          if(response.data.Success){
            return dispatch({
              type:ADD_DEVICE_SUCCESS,
              payload:response.data
            });
          }else{
            return dispatch({
              type: ADD_DEVICE_ERROR,
              payload:response.data
            })
          }
        } catch (error) {
          console.error(error.stack," === THE PROBLEMS TO ADD_DEVICE === ");
        }
      }
      addData()
    }
  };
 

export const hideDevice = (obj,filter)=>{
    // console.log(id,hide,otherObject, " in actionsss");
    //aq sehsacvleli iqneba filtris damatebis SemTxvevashi
    const {id,hide,} = obj;
    const {technology,vndor,ipAddress,limit,offset} = filter
    const token  = localStorage.getItem('token')&&JSON.parse(localStorage.getItem('token')).token;
  return (dispatch) => {
      dispatch({
        type: HIDE_DEVICE_REQUEST
      });
    async function hideData() {
      try {
        const response = await axios.post('/devices/hidedevice',{
          id,
          hide:!hide
        },{ headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`} 
        });
        if(!response.data.Permission){
          return dispatch(logout())
        }
        if(response.data.Success){
          dispatch({
            type:HIDE_DEVICE_SUCCESS,
            payload:response.data
          })
          return dispatch(getDevices(filter))
        }else{
          return dispatch({
            type: HIDE_DEVICE_ERROR,
            payload:response.data
          })
        }
        
      } catch (error) {
        console.error(error.stack," === THE PROBLEMS TO HIDE_DEVICE ===");
      }
    }
    hideData()
  }
};
    


//////////////////////////\\\\\\\\\\\\\\\\\\\\////////////////\\\\\\\\\\\\\


    /*
    HIDE_DEVICE_REQUEST,
    HIDE_DEVICE_SUCCESS,
    HIDE_DEVICE_ERROR
     DELETE_DEVICE_REQUEST,
    DELETE_DEVICE_SUCCESS,
    DELETE_DEVICE_ERROR,
    
  export const getDeviceProblemsExcelExport  = ()=>{
    //let arr = [];
    return (dispatch) => {
      dispatch({
        type: GET_DEVICE_EXCEL_EXPORT_REQUEST
      });
    async function getData() {
      try {
        const response = await axios.get(`http://10.240.0.64:7777/deviceProblems/getDeviceProblemsExcelExport`);
            
        if(response.data.success){
          
          //console.log(generateExcel(arr), "in action"); userclosed_user_name, t8.role as roleclosed_role
          const buffer = await generateExcel([...response.data.msg]);
          return await dispatch({
          type: GET_DEVICE_EXCEL_EXPORT_SUCCESS,
          payload:{
            msg: buffer,
            success:true,
          }
        })
        } else{
         return  dispatch({
              type: GET_DEVICE_EXCEL_EXPORT_ERROR,
              payload:response.data
            });
        }
         
      } catch (error) {
          console.error(error.stack," === THE PROBLEMS TO GET_OPEN_DAMAGESS ===");
        }
      }
      getData()
      }
    };

  export const getDeviceProblemsSelection  = ()=>{
    return (dispatch) => {
        dispatch({
            type:GET_DEVICE_SELECTION_REQUEST
        });
         async function getData() {
      try {
        const response = await axios.get(`http://10.240.0.64:7777/deviceProblems/getDeviceProblemsSelection`);
          console.log(response.data)
        response.data.success ?
        dispatch({
            type:GET_DEVICE_SELECTION_SUCCESS,
            payload:response.data
        }): dispatch({
          type: GET_DEVICE_SELECTION_ERROR,
          payload:response.data
        });
      } catch (error) {
          console.error(error.stack," ===  TO GET_DEVICE_SELECTION ===");

      }
    }
      
    getData()
    }
    
};
   
    export const deleteDeviceProblems = (id,otherObject)=>{
      console.log(id,otherObject, " in actionsss");
      //aq sehsacvleli iqneba filtris damatebis SemTxvevashi
      return (dispatch) => {
        dispatch({
          type: DELETE_DEVICE_REQUEST
        });
      async function deleteData() {
        try {
          const response = await axios.post('http://10.240.0.64:7777/deviceProblems/deleteDeviceProblems',{
          id,
        },{
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'} 
      });
  
        if(response.data.success) {
          dispatch({
            type: DELETE_DEVICE_SUCCESS,
            payload:response.data
          });
          dispatch({
            type:ALERT,
              payload:{
              message:" Removed successfully",
              success:true,
              error:false
            }
          });
          dispatch(getDeviceProblemsSelection())
        return dispatch(getDeviceProblems(otherObject.deviceProblemsFilter,otherObject.ipAddressFilter,otherObject.limit,otherObject.offset));
        }else {
          dispatch({
              type: DELETE_DEVICE_ERROR,
              payload: response.data
            });
          return dispatch({
              type:ALERT,
                payload:{
                message:" ERROR",
                success:true,
                error:true
              }
            });
  
        }
          
        } catch (error) {
            console.error(error.stack," === THE PROBLEMS TO DELETE_DEVICE ===");
          }
        }
        deleteData()
        }
      };
      */