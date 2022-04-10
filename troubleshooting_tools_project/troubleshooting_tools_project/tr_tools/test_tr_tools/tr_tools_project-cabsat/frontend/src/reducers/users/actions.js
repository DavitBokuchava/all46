
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_USERS_LIST_REQUEST,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  BLOCK_USER_REQUEST,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_ERORR
} from '../constants.js';
import axios from 'axios';
import { logout } from '../auth/action';
// function removeAnalitics(a,b){
//     if(b === )
// }
export const getUsersList = (filterObject) => {
  const { userGroupTeam } = filterObject;
  // userGroupTeam = 
  console.log(userGroupTeam, filterObject, "=== userGroupTeam, filterObjectuserGroupTeam, filterObject")
  console.log(filterObject.userGroupTeam, "filterObjectfilterObjectfilterObject  IN ACTION")
  const token = localStorage.getItem('token') && JSON.parse(localStorage.getItem('token')).token;
  return (dispatch) => {
    dispatch({ type: GET_USERS_LIST_REQUEST, payload: true });
    async function getData() {
      /// /users/getuser
      try {
        const response = await axios.get(`/users/getuserslist?user_group_team=${Object.values(userGroupTeam).length > 0 ? Object.values(userGroupTeam).join(",") : null}&user_name=null`, {
          headers:
          {
            'Content-Type': 'application/json',
            'Token': token
          }
        })
        // console.log(typeof JSON.parse(response.data.Data[0].commands),"###########  response.data USERS GET")
        console.log(response.data, "response.dataresponse.dataresponse.dataresponse.data")
        if (response.data.Success) {
          return dispatch({
            type: GET_USERS_LIST_SUCCESS,
            payload: response.data
          })
        } else {
          return dispatch({
            type: GET_USERS_LIST_ERROR,
            payload: response.data
          });
        }

      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO GET_USERS ===");
      }
    }
    getData()
  }
};
export const getUsers = (obj) => {

  const { userGroupTeam, userName, limit, page } = obj
  console.log(obj, userGroupTeam, userName, limit, page, "--- usersFiltersStateusersFiltersStateusersFiltersState")
  const token = localStorage.getItem('token') && JSON.parse(localStorage.getItem('token')).token;
  return (dispatch) => {
    dispatch({ type: GET_USERS_REQUEST, payload: true });
    async function getData() {
      /// /users/getuser
      try {
        const response = await axios.get(`/users/getusers?user_group_team=${Object.values(userGroupTeam).length > 0 ? Object.values(userGroupTeam).join(",") : null}&user_name=${userName ? userName : null}&limit=${limit}&offset=${parseInt(limit, 10) * parseInt(page, 10)}`, {
          headers:
          {
            'Content-Type': 'application/json',
            'Token': token
          }
        })
        // console.log(typeof JSON.parse(response.data.Data[0].commands),"###########  response.data USERS GET")
        console.log(response.data, "response.dataresponse.dataresponse.dataresponse.data")
        if (response.data.Success) {
          return dispatch({
            type: GET_USERS_SUCCESS,
            payload: response.data
          })
        }
        if (!response.data.Permission) {
          console.log(response.data.Err.fatalError, "   response.data.Err.fatalError")
          return dispatch(logout())
        }
        if (response.data.Error.getUsersError) {
          return dispatch({
            type: GET_USERS_ERROR,
            payload: response.data
          });
        }

      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO GET_USERS ===");
      }
    }
    getData()
  }
};

export const updateUser = (usersFields) => {
  const token = localStorage.getItem('token') && JSON.parse(localStorage.getItem('token')).token;
  const { id, username, password, role, groupTeam, deviceUsername, devicePassword, commands } = usersFields;
  console.log(token, id, username, password, role, groupTeam, deviceUsername, devicePassword, commands, "token, id,username, password,role,groupTeam,deviceUsername,devicePassword,commands")
  return (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST, payload: true });
    async function updateData() {
      try {
        const response = await axios.post('/users/updateuser', {
          id,
          username,
          password,
          role,
          groupTeam,
          deviceUsername,
          devicePassword,
          commands: JSON.stringify(commands)
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.data.Permission) {
          console.log(response.data.Err.fatalError, "   response.data.Err.fatalError")
          return dispatch(logout())
        }
        if (response.data.Success) {
          return dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: response.data
          })
        } else {
          return dispatch({
            type: UPDATE_USER_ERORR,
            payload: response.data
          });
        }
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO UPDATE_PROBLEM_REASONS ===");
      }
    }
    updateData()
  }
};


export const addUser = (usersFields) => {
  const token = localStorage.getItem('token') && JSON.parse(localStorage.getItem('token')).token;
  console.log(token, "asfasg token", usersFields, "usersFieldsusersFieldsusersFieldsusersFields")
  const { username, password, role, groupTeam, deviceUsername, devicePassword, commands } = usersFields;
  return (dispatch) => {
    dispatch({ type: ADD_USER_REQUEST, payload: true });
    console.log(JSON.stringify(commands), "  JSON.stringify(commands)JSON.stringify(commands)")
    async function addData() {
      try {
        const response = await axios.post('/users/adduser', {
          username,
          password,
          role,
          groupTeam,
          deviceUsername,
          devicePassword,
          commands: JSON.stringify(commands)
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.data.Permission) {
          return dispatch(logout())
        }
        if (response.data.Success) {
          return dispatch({
            type: ADD_USER_SUCCESS,
            payload: response.data
          })
        } else {
          return dispatch({
            type: ADD_USER_ERROR,
            payload: response.data
          })
        }
      } catch (error) {
        console.error(error.stack, " === THE PROBLEMS TO ADD_USER === ");
      }
    }
    addData()
  }
};



export const blockUser = (user, filter) => {
  const token = localStorage.getItem('token') && JSON.parse(localStorage.getItem('token')).token;
  return (dispatch) => {
    dispatch({ type: BLOCK_USER_REQUEST, payload: true });
    async function blockData() {
      try {
        const response = await axios.post('/users/blockuser', {
          id: user.id,
          username: user.username,
          password: user.password,
          role: user.role,
          groupTeam: user.groupTeam,
          deviceUsername: user.deviceUsername,
          devicePassword: user.devicePassword,
          commands: user.commands,
          block: !user.block,
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        );
        if (!response.data.Permission) {
          return dispatch(logout())
        }
        if (response.data.Success) {
          dispatch({
            type: BLOCK_USER_SUCCESS,
            payload: response.data
          })
        } else {
          return dispatch({
            type: BLOCK_USER_ERROR,
            payload: response.data
          })
        }
        return dispatch(getUsers(filter))

      } catch (error) {
        console.error(error.stack, " == THE PROBLEMS TO BLOCK  user == ");
      }
    }
    blockData()
  }
};
