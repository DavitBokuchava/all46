import { LOADER } from '../constants.js';
export const isLoading = (msg) => {
    return {
        type: LOADER,
        payload: msg
    }
};
