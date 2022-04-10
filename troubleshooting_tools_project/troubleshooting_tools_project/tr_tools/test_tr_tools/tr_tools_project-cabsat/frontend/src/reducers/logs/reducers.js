import {
    GET_LOGS_REQUEST,
    GET_LOGS_SUCCESS,
    GET_LOGS_ERROR,
} from '../constants.js';
// import { makeObject } from '../../helperFN/oltObject'

const initialstate = {
    isLoading: false,
    items: null,
    length: null,
    error: null,
    success: false,
}
export default function logs(state = initialstate, action) {
    console.log(action.type)
    switch (action.type) {
        case GET_LOGS_REQUEST:
            return {
                ...state,
                items: null,
                isLoading: true
            };
        case GET_LOGS_SUCCESS:
            return {
                ...state,
                length: action.payload.Data.length,
                items: action.payload.Data.data,
                success: action.payload.Success,
                error: null,
                isLoading: false,
            };
        case GET_LOGS_ERROR:
            return {
                ...state,
                // length:parseInt(action.payload.Data.length,10),
                length: null,
                items: null,
                success: action.payload.Success,
                error: action.payload.Err,
                isLoading: false,
            };
        default:
            return state;
    }
}

