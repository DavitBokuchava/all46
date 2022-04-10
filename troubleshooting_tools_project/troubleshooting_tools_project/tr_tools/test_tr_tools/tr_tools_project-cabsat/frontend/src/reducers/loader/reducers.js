import { LOADER } from '../constants.js';

const initialstate = {
    isloading: false
}
export default function loader(state = initialstate, action) {
    console.log(action.type)
    switch (action.type) {
        case LOADER:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
}

