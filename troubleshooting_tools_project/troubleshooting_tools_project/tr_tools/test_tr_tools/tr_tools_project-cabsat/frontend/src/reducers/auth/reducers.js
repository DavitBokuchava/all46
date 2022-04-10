import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    LOGOUT_SUCCESS,
    AUTH_REQUEST,
} from '../constants.js';
const token = localStorage.getItem('token')
const initialstate = {
    token: !!token,
    username: null,
    id: null,
    role: null,
    success: false,
    isAuthenticated: false,
    groupTeam: null,
    commands: null,
    error: null,
    isLoading: false,
}
export default function auth(state = initialstate, action) {
    console.log(action.type)
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                success: true,
                error: null,
                isLoading: false
            };
        case LOGIN_FAILURE:
        case AUTH_FAILURE:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                username: null,
                role: null,
                success: false,
                error: action.payload.Err,
                id: null,
                isLoading: false,
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                username: action.payload.Data.username,
                id: action.payload.Data.id,
                role: action.payload.Data.role,
                success: true,
                isLoading: false,
                groupTeam: action.payload.Data.groupTeam,
                commands: action.payload.Data.commands,
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                username: null,
                role: null,
                success: false,
                error: null,
                id: null,
                isLoading: false,
                groupTeam: null,
                commands: null,
            };
        default:
            return state;
    }
}


// {
//     "Success": false,
//     "Err": "WRONG username",
//     "Token": "",
//     "Data": {
//         "id": "",
//         "username": "",
//         "password": "",
//         "role": ""
//     }
// }