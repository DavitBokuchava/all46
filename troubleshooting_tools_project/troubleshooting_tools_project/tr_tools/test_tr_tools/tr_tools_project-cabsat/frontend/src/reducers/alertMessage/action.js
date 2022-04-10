import { ALERT } from '../constants.js';
export const alert = (msg) => {
    return {
        type: ALERT,
        payload: msg
    }
};




