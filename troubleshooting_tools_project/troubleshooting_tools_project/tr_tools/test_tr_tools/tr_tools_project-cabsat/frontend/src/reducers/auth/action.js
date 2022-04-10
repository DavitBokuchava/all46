import axios from 'axios';
import bcrypt from 'bcryptjs';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    AUTH_SUCCESS,
    AUTH_REQUEST,
    AUTH_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_REQUEST
} from '../constants.js';
// function hashItem(item){
//   let hashed
//   bcrypt.genSalt(14, function(err, salt) {
//       bcrypt.hash(item, salt, function(err, hash) {
//           // Store hash in your password DB.
//           hashed= hash
//       });
//   });
//   return hashed
// }

export const login = (username, password) => {
    console.log(username, password, "username,password")
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });
        async function loginUser() {
            try {
                const response = await axios.post('/login', {
                    username,
                    password
                });
                console.log(response.data, "response.dataresponse.dataresponse.dataresponse.data")
                if (response.data.Token && response.data.Success) {
                    localStorage.setItem('token', JSON.stringify({ token: response.data.Token, role: false }))

                    //localStorage.setItem('token',response.data.Token)
                    console.log(response.data, "############ response.data")
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: response.data
                    });
                    dispatch(auth());
                } else {
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: response.data
                    })
                }

            } catch (error) {
                return console.error(error, "THE PROBLEMS TO AUTh");
            }
        }

        loginUser()
    }



};



export const logout = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT_REQUEST });
        try {
            localStorage.removeItem('token')
            dispatch({ type: LOGOUT_SUCCESS })
        } catch (err) {
            console.log(err.stack, "=== LOGOUT ERROR ===")
        }
    }
}
export const auth = () => {
    //console.log(username,password,role)
    const token = localStorage.getItem('token') && JSON.parse(localStorage.getItem('token')).token;
    console.log(token, "shemodis tu araaaaaa!!!")
    return (dispatch) => {
        console.log(token, "shemodis tu araaaaaa!!!")
        dispatch({
            type: AUTH_REQUEST,
            payload: true
        });
        async function authUser() {
            try {
                const response = await axios.get('/auth', {
                    headers: {
                        'get': {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                });
                console.log(response.data, "######### response.data in AUTHHHHHHHHHHHHH")
                if (response.data.Success) {
                    localStorage.setItem('token', JSON.stringify({ token: token, role: response.data.Data.role === "admin" }))
                    console.log(localStorage.getItem('token'), response.data.Data.role === "admin", "localStorage.getItem('token'), response.data.Role===admin")
                        //localStorage.getItem('token');
                    return dispatch({
                            type: AUTH_SUCCESS,
                            payload: response.data
                        })
                        // return dispatch(getOltList())
                } else {
                    dispatch({
                        type: AUTH_FAILURE,
                        payload: response.data
                    })
                    return dispatch(logout())
                }

            } catch (error) {
                return console.error(error, "THE PROBLEMS TO AUTh");
            }
        }

        authUser()
    }



};

/*  ({type:LOGOUT_SUCCESS})
// import { getOltList } from '../olt/actions';
// {
//   "Success": false,
//   "Err": "WRONG username",
//   "Token": "",
//   "Data": {
//       "id": "",
//       "username": "",
//       "password": "",
//       "role": ""
//   }
// }
export const logIn = (username, password)=>{
  console.log(username,password)
  return (dispatch) => {
      dispatch({
          type:types.LOGIN_REQUEST
      });
       async function userLogIn() {
    try {
      const response = await axios.post('', {
        username,
        email,
        password
      },
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'}
        });

        if(response.data.token){
          const token = response.data.token;
          localStorage.setItem("jwt",token)
        }

       response.data.success ?  dispatch({
        type:types.LOGIN_SUCCESS,
        payload:response.data
    }) : dispatch({
      type: LOGIN_FAILURE,
      payload:response.data

    })

    } catch (error) {
        return console.error(error,"THE PROBLEMS TO LOGIN");
    }
  }
    userLogIn()
  }


};
export const logOut = ()=>{
  return (dispatch,geState) => {
    dispatch({
        type:types.LOGOUT_REQUEST
    });
    if(geState().auth){
      dispatch({
        type: LOGOUT_SUCCESS

      })
    }
  }
}

export const logIn1 = ()=>{
    return (dispatch,geState) => {
      dispatch({
          type:LOGIN_SUCCESS
      });
      if(geState().auth){
        dispatch({
          type: LOGOUT_SUCCESS

        })
      }
    }
  }
  */