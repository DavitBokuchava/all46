
import {
  REMOVE_MAC_REQUEST,
  REMOVE_MAC_SUCCESS,
  REMOVE_MAC_ERROR,
  MGC_REQUEST,
  MGC_SUCCESS,
  MGC_ERROR,
  AUTOFIND_SN_REQUEST,
  AUTOFIND_SN_SUCCESS,
  AUTOFIND_SN_ERROR,
  // AUTOFIND_REQUEST,
  // AUTOFIND_SUCCESS,
  // AUTOFIND_ERROR,  
  SET_COMMANDS_GPON_HUAWEI_SERVICE_PORT_REQUEST,
  SET_COMMANDS_GPON_HUAWEI_SERVICE_PORT_SUCCESS,
  SET_COMMANDS_GPON_HUAWEI_SERVICE_PORT_ERROR,
  SET_COMMANDS_GPON_ZTE_SERVICE_PORT_REQUEST,
  SET_COMMANDS_GPON_ZTE_SERVICE_PORT_SUCCESS,
  SET_COMMANDS_GPON_ZTE_SERVICE_PORT_ERROR,
  SHOWCOMMAND_DHCP_COA_LOG_REQUEST,
  SHOWCOMMAND_DHCP_COA_LOG_SUCCESS,
  SHOWCOMMAND_DHCP_COA_LOG_ERROR,
  SHOWCOMMAND_DHCP_LOG_REQUEST,
  SHOWCOMMAND_DHCP_LOG_SUCCESS,
  SHOWCOMMAND_DHCP_LOG_ERROR,
  SHOWCOMMAND_DSL_REQUEST,
  SHOWCOMMAND_DSL_SUCCESS,
  SHOWCOMMAND_DSL_ERROR,
  SHOWCOMMAND_GPON_REQUEST,
  SHOWCOMMAND_GPON_SUCCESS,
  SHOWCOMMAND_GPON_ERROR,
  LOADER_SUCCESS,
  LOADER_REQUEST,
  SHOW_SERVICE_PORT_BIND_CABSAT_REQUEST,
  // SHOW_SERVICE_PORT_BIND_CABSAT_SUCCESS,
  SHOW_SERVICE_PORT_BIND_CABSAT_ERROR,
  SET_SERVICE_PORT_BIND_CABSAT_REQUEST,
  SET_SERVICE_PORT_BIND_CABSAT_SUCCESS,
  // SET_SERVICE_PORT_BIND_CABSAT_ERROR,
} from '../constants.js';
import axios from 'axios';
import { logout } from '../auth/action';

// function makeJsonData(zone, arr){
//   if(!zone) {
//     return new Error("error")
//   };
//   let obj= {}
//   arr.map(el=>{
//     if(el.zone===zone){
//       obj = {
//         ...obj,
//           [el.deviceIpaddres] : el.vendor
//       }
//     }
//   });
//   return JSON.stringify(obj);
// }
// 
export const removeMacAddress = ({sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position, vlanId}) => {
  const token = JSON.parse(localStorage.getItem('token')).token;
  console.log(mgc,"mgcmgcmgcmgcmgc")
  // console.log(sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position, "sessionnId,customerId,mobNumber,device,ipAddress,technology,vendor,command,frame,slot,port,vport,position")
  // console.log(typeof zone,zone,"typeof zonetypeof zonetypeof zone" )
  return (dispatch, getState) => {
    
    dispatch({ type: REMOVE_MAC_REQUEST, payload: true });
    async function getOutput() {
      try {
        const response = await axios.post('/showcommand/remove-mac-address', {
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
          vlanId
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().auth.isAuthenticated && token}`
          }
        });

        if (response.data.Success) {
          console.log(response.data)
          return dispatch({
            type: REMOVE_MAC_SUCCESS,
            payload: response.data
          });

        } else if (!response.data.Permission) {
          dispatch({
            type: REMOVE_MAC_ERROR,
            payload: response.data
          })
          return dispatch(logout())
        } else {
          return dispatch({
            type:REMOVE_MAC_ERROR,
            payload: response.data
          });
        }
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO REMOVE MAC ADDRESS === ");
      }
    }
    getOutput()
  }
};
export const mgc = ({sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position, mgc}) => {
  const token = JSON.parse(localStorage.getItem('token')).token;
  console.log(mgc,"mgcmgcmgcmgcmgc")
  // console.log(sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position, "sessionnId,customerId,mobNumber,device,ipAddress,technology,vendor,command,frame,slot,port,vport,position")
  // console.log(typeof zone,zone,"typeof zonetypeof zonetypeof zone" )
  return (dispatch, getState) => {
    
    dispatch({ type: MGC_REQUEST, payload: true });
    async function getOutput() {
      try {
        const response = await axios.post('/showcommand/mgc', {
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
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().auth.isAuthenticated && token}`
          }
        });

        if (response.data.Success) {
          console.log(response.data)
          return dispatch({
            type: MGC_SUCCESS,
            payload: response.data
          });

        } else if (!response.data.Permission) {
          dispatch({
            type: MGC_ERROR,
            payload: response.data
          })
          return dispatch(logout())
        } else {
          return dispatch({
            type: MGC_ERROR,
            payload: response.data
          });
        }
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO SHOW COMMANDS MGC === ");
      }
    }
    getOutput()
  }
};
export const autofindSnAction = ({sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position, sn, zone}) => {
  const token = JSON.parse(localStorage.getItem('token')).token;
  // console.log(sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position, "sessionnId,customerId,mobNumber,device,ipAddress,technology,vendor,command,frame,slot,port,vport,position")
  console.log(typeof zone,zone,"typeof zonetypeof zonetypeof zone" )
  return (dispatch, getState) => {
    
    dispatch({ type: AUTOFIND_SN_REQUEST, payload: true });
    async function getOutput() {
      try {
        const response = await axios.post('/showcommand/autofind-sn', {
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
          zoneDeviceList:zone
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().auth.isAuthenticated && token}`
          }
        });

        if (response.data.Success) {
          console.log(response.data)
          return dispatch({
            type: AUTOFIND_SN_SUCCESS,
            payload: response.data
          });

        } else if (!response.data.Permission) {
          dispatch({
            type: AUTOFIND_SN_SUCCESS,
            payload: response.data
          })
          return dispatch(logout())
        } else {
          return dispatch({
            type: AUTOFIND_SN_ERROR,
            payload: response.data
          });
        }
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO SHOW COMMANDS === ");
      }
    }
    getOutput()
  }
};

export const cabsatSetPortBind = (sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position) => {
  const token = JSON.parse(localStorage.getItem('token')).token;
  console.log(sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position, "sessionnId,customerId,mobNumber,device,ipAddress,technology,vendor,command,frame,slot,port,vport,position")
  console.log(token)
  return (dispatch, getState) => {
    dispatch({ type: SET_SERVICE_PORT_BIND_CABSAT_REQUEST, payload: true });
    async function getOutput() {
      try {
        // const response = await axios.post('/showcommand/gpon', {
        //   sessionId,
        //   customerId,
        //   mobNumber,
        //   device,
        //   ipAddress,
        //   technology,
        //   vendor,
        //   command,
        //   frame,
        //   slot,
        //   port,
        //   vport,
        //   position,
        // }, {
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${getState().auth.isAuthenticated && token}`
        //   }
        // });

        // if (response.data.Success) {
        //   console.log(response.data)
        //   return dispatch({
        //     type: SET_SERVICE_PORT_BIND_CABSAT_SUCCESS,
        //     payload: response.data
        //   });

        // } else if (!response.data.Permission) {
        //   dispatch({
        //     type: SET_SERVICE_PORT_BIND_CABSAT_ERROR,
        //     payload: response.data
        //   })
        //   return dispatch(logout())
        // } else {
        //   return dispatch({
        //     type: SET_SERVICE_PORT_BIND_CABSAT_ERROR,
        //     payload: response.data
        //   });
        // }
        dispatch({
          type: SET_SERVICE_PORT_BIND_CABSAT_SUCCESS,
          payload: "SET_SERVICE_PORT_BIND_CABSAT_SUCCESS"
        })
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO SHOW COMMANDS === ");
      }
    }
    getOutput()
  }
};

export const cabsatShowPortBind = (sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position) => {
  const token = JSON.parse(localStorage.getItem('token')).token;
  console.log(sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position, "sessionnId,customerId,mobNumber,device,ipAddress,technology,vendor,command,frame,slot,port,vport,position")
  console.log(token)
  return (dispatch, getState) => {
    dispatch({ type:SHOW_SERVICE_PORT_BIND_CABSAT_REQUEST, payload: true });
    async function getOutput() {
      try {
        // const response = await axios.post('/showcommand/gpon', {
        //   sessionId,
        //   customerId,
        //   mobNumber,
        //   device,
        //   ipAddress,
        //   technology,
        //   vendor,
        //   command,
        //   frame,
        //   slot,
        //   port,
        //   vport,
        //   position,
        // }, {
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${getState().auth.isAuthenticated && token}`
        //   }
        // });

        // if (response.data.Success) {
        //   console.log(response.data)
        //   return dispatch({
        //     type: SHOW_SERVICE_PORT_BIND_CABSAT_SUCCESS,
        //     payload: response.data
        //   });

        // } else if (!response.data.Permission) {
        //   dispatch({
        //     type: SHOW_SERVICE_PORT_BIND_CABSAT_ERROR,
        //     payload: response.data
        //   })
        //   return dispatch(logout())
        // } else {
        //   return dispatch({
        //     type: SHOW_SERVICE_PORT_BIND_CABSAT_ERROR,
        //     payload: response.data
        //   });
        // }
        dispatch({
              type: SHOW_SERVICE_PORT_BIND_CABSAT_ERROR,
              payload: "SHOW_SERVICE_PORT_BIND_CABSAT_ERROR"
            })
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO SHOW COMMANDS === ");
      }
    }
    getOutput()
  }
};
export const showCommandGpon = (sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position) => {
  const token = JSON.parse(localStorage.getItem('token')).token;
  console.log(sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position, "sessionnId,customerId,mobNumber,device,ipAddress,technology,vendor,command,frame,slot,port,vport,position")
  console.log(token)
  return (dispatch, getState) => {
    dispatch({ type: SHOWCOMMAND_GPON_REQUEST, payload: true });
    async function getOutput() {
      try {
        const response = await axios.post('/showcommand/gpon', {
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
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().auth.isAuthenticated && token}`
          }
        });

        if (response.data.Success) {
          console.log(response.data)
          return dispatch({
            type: SHOWCOMMAND_GPON_SUCCESS,
            payload: response.data
          });

        } else if (!response.data.Permission) {
          dispatch({
            type: SHOWCOMMAND_GPON_ERROR,
            payload: response.data
          })
          return dispatch(logout())
        } else {
          return dispatch({
            type: SHOWCOMMAND_GPON_ERROR,
            payload: response.data
          });
        }
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO SHOW COMMANDS === ");
      }
    }
    getOutput()
  }
};
export const showCommandDsl = (sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, position) => {
  const token = JSON.parse(localStorage.getItem('token')).token;
  console.log(sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, position, "sessionnId,customerId,mobNumber,device,ipAddress,technology,vendor,command,frame,slot,port,vport,position")
  console.log(token)
  return (dispatch, getState) => {
    dispatch({ type: SHOWCOMMAND_DSL_REQUEST, payload: true });
    async function getOutput() {
      try {
        const response = await axios.post('/showcommand/dsl', {
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
          position,
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().auth.isAuthenticated && token}`
          }
        });

        if (response.data.Success) {
          console.log(response.data)
          return dispatch({
            type: SHOWCOMMAND_DSL_SUCCESS,
            payload: response.data
          });

        } else if (!response.data.Permission) {
          dispatch({
            type: SHOWCOMMAND_DSL_ERROR,
            payload: response.data
          })
          return dispatch(logout())
        } else {
          return dispatch({
            type: SHOWCOMMAND_DSL_ERROR,
            payload: response.data
          });
        }
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO SHOW COMMANDS === ");
      }
    }
    getOutput()
  }
};
export const showDhcpLogs = (
  sessionId,
  customerId,
  mobNumber,
  device,
  ipAddress,
  technology,
  vendor,
  command,
  position,
  macAddress,
  dhcpLogIpAddress) => {

  const token = JSON.parse(localStorage.getItem('token')).token;
  console.log(sessionId,
    customerId,
    mobNumber,
    device,
    ipAddress,
    technology,
    vendor,
    command,
    position,
    macAddress, "sessionnId,customerId,mobNumber,device,ipAddress,technology,vendor,command,frame,slot,port,vport,position")
  console.log(token)
  return (dispatch, getState) => {
    console.log({
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
    dispatch({ type: SHOWCOMMAND_DHCP_LOG_REQUEST, payload: true });
    async function getOutput() {
      try {
        const response = await axios.post('/showcommand/dhcplog', {
          sessionId,
          customerId,
          mobNumber,
          device,
          ipAddress,
          technology,
          vendor,
          command,
          position,
          macAddress,
          dhcpLogIpAddress
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().auth.isAuthenticated && token}`
          }
        });
        if (!response.data.Permission) {
          dispatch({
            type: SHOWCOMMAND_DHCP_LOG_ERROR,
            payload: response.data
          })
          return dispatch(logout())
        }
        if (response.data.Success) {
          console.log(response.data)
          return dispatch({
            type: SHOWCOMMAND_DHCP_LOG_SUCCESS,
            payload: response.data
          });

        } else {
          return dispatch({
            type: SHOWCOMMAND_DHCP_LOG_ERROR,
            payload: response.data
          });
        }
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO DHCP LOGS === ");
      }
    }
    getOutput()
  }
};

export const showCoaDhcpLogs = (
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
  position) => {

  const token = JSON.parse(localStorage.getItem('token')).token;
  console.log(sessionId,
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
    position, "sessionnId,customerId,mobNumber,device,ipAddress,technology,vendor,command,frame,slot,port,vport,position")
  console.log(token)
  return (dispatch, getState) => {
    console.log({
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
      position
    })
    dispatch({ type: SHOWCOMMAND_DHCP_COA_LOG_REQUEST, payload: true });
    async function getOutput() {
      try {
        const response = await axios.post('/showcommand/coadhcplog', {
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
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().auth.isAuthenticated && token}`
          }
        });

        if (!response.data.Permission) {
          dispatch({
            type: SHOWCOMMAND_DHCP_COA_LOG_ERROR,
            payload: response.data
          })
          return dispatch(logout())
        }

        if (response.data.Success) {
          console.log(response.data)
          return dispatch({
            type: SHOWCOMMAND_DHCP_COA_LOG_SUCCESS,
            payload: response.data
          });

        } else {
          return dispatch({
            type: SHOWCOMMAND_DHCP_COA_LOG_ERROR,
            payload: response.data
          });
        }
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO DHCP LOGS === ");
      }
    }
    getOutput()
  }
};
export const loader = (arg) => {
  return (dispatch) => {
    dispatch({ type: LOADER_REQUEST });
    dispatch({
      type: LOADER_SUCCESS,
      payload: arg
    })
  }
}
export const setServicePortZteAction = (
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
  servicePortLanZte) => {
  const token = JSON.parse(localStorage.getItem('token')).token;

  console.log(token)
  return (dispatch, getState) => {
    dispatch({ type: SET_COMMANDS_GPON_ZTE_SERVICE_PORT_REQUEST, payload: true });
    console.log(sessionId,
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
      servicePortLanZte, "sessionId,customerId,mobNumber,device,ipAddress,technology,vendor,command,frame,slot,port,vport,position,serviceProfileZte,servicePortLanZte")
    async function getOutput() {
      try {
        const response = await axios.post('/showcommand/gpon/set_ports_zte_gpon', {
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
          servicePortLanZte
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().auth.isAuthenticated && token}`
          }
        });
        if (!response.data.Permission) {
          dispatch({
            type: SET_COMMANDS_GPON_ZTE_SERVICE_PORT_ERROR,
            payload: response.data
          })
          return dispatch(logout())
        }

        if (response.data.Success) {
          console.log(response.data)
          return dispatch({
            type: SET_COMMANDS_GPON_ZTE_SERVICE_PORT_SUCCESS,
            payload: response.data
          });

        } else {
          return dispatch({
            type: SHOWCOMMAND_GPON_ERROR,
            payload: response.data
          });
        }
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO SHOW COMMANDS === ");
      }
    }
    getOutput()
  }
};
export const setServiceProfileHuaweiAction = (
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
  serviceProfileHuawei) => {
  const token = JSON.parse(localStorage.getItem('token')).token;

  console.log(token)
  return (dispatch, getState) => {
    dispatch({ type: SET_COMMANDS_GPON_HUAWEI_SERVICE_PORT_REQUEST, payload: true });
    console.log(
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
      serviceProfileHuawei, " arguments in setServiceProfileHuaweyAction")
    async function getOutput() {
      try {
        const response = await axios.post('/showcommand/gpon/set_ont_ports_huawei_gpon', {
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
          serviceProfileHuawei
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().auth.isAuthenticated && token}`
          }
        });

        if (!response.data.Permission) {
          dispatch({
            type: SET_COMMANDS_GPON_HUAWEI_SERVICE_PORT_ERROR,
            payload: response.data
          })
          return dispatch(logout())
        }

        if (response.data.Success) {
          console.log(response.data)
          return dispatch({
            type: SET_COMMANDS_GPON_HUAWEI_SERVICE_PORT_SUCCESS,
            payload: response.data
          });

        } else {
          return dispatch({
            type: SHOWCOMMAND_GPON_ERROR,
            payload: response.data
          });
        }
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO SHOW COMMANDS === ");
      }
    }
    getOutput()
  }
};
// setServicePortZteAction,
// setServiceProfileHuaweyAction 
// export const  logout = ()=> {
//   return (dispatch)=>{
//     dispatch({type:LOGOUT_REQUEST});
//     try{
//       localStorage.removeItem('token')
//       dispatch({type:LOGOUT_SUCCESS})
//     }catch(err){
//       console.log(err.stack, "=== LOGOUT ERROR ===")
//     }
//   }
// }


