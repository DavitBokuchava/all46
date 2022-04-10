import { ALERT } from '../constants.js'



const initialstate = {
    message: null,
    success: false,
    error: false
}
export default function alertMessage(state = initialstate, action) {
    switch (action.type) {
        case ALERT:
            return {
                ...state,
                message: action.payload.message,
                success: action.payload.success,
                error: action.payload.error
            };
        default:
            return state;
    }
}
