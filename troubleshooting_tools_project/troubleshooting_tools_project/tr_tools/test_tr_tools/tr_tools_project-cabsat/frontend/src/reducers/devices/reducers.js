import {
    GET_DEVICE_REQUEST,
    GET_DEVICE_SUCCESS,
    GET_DEVICE_ERROR,
    GET_DEVICE_LIST_REQUEST,
    GET_DEVICE_LIST_SUCCESS,
    GET_DEVICE_LIST_ERROR,
    // GET_DEVICE_EXCEL_EXPORT_SUCCESS,
    // GET_DEVICE_EXCEL_EXPORT_ERROR,
    ADD_DEVICE_REQUEST,
    ADD_DEVICE_SUCCESS,
    ADD_DEVICE_ERROR,
    UPDATE_DEVICE_REQUEST,
    UPDATE_DEVICE_SUCCESS,
    UPDATE_DEVICE_ERROR,
    // DELETE_DEVICE_SUCCESS,
    // DELETE_DEVICE_ERROR,
    HIDE_DEVICE_REQUEST,
    HIDE_DEVICE_SUCCESS,
    HIDE_DEVICE_ERROR,
    // // GET_DEVICE_SELECTION_SUCCESS,
    // // GET_DEVICE_SELECTION_ERROR, 
} from '../constants.js';
// import { makeObject } from '../../helperFN/oltObject'

const initialstate = {
    // getDeviceExcelExport:{
    //     excel:null,
    //     success:false,
    //     error:null,
    //     isLoading:false,
    // },
    getDeviceList: {
        isLoading: false,
        items: null,
        length: 0,
        error: null,
        success: false,
        deviceNames: null
    },
    getDevices: {
        isLoading: false,
        items: [],
        length: 0,
        error: null,
        success: false,
    },
    addDevice: {
        isLoading: false,
        item: null,
        error: null,
        success: false
    },
    // deleteDevice:{
    //     isLoading:false,
    //     item:null,
    //     error:null,
    //     success:false
    // },
    updateDevice: {
        isLoading: false,
        item: null,
        error: null,
        success: false
    },
    hideDevice: {
        isLoading: false,
        item: null,
        error: null,
        success: false
    }

}
export default function device(state = initialstate, action) {
    console.log(action.type)
    switch (action.type) {
        // case      GET_DEVICE_EXCEL_EXPORT_SUCCESS:
        //     return {
        //         ...state,
        //         getDeviceExcelExport: {
        //             ... state.getDeviceExcelExport,
        //             excel: action.payload.msg,
        //             success: action.payload.success,
        //             error:null,
        //         },

        //     };
        // case GET_DEVICE_EXCEL_EXPORT_ERROR:
        //     return {
        //         ...state,
        //         getDeviceExcelExport: {
        //             ...state.getDeviceExcelExport,
        //             error:action.payload.error,
        //             success: action.payload.success,
        //             excel:null
        //         },

        //     };
        case HIDE_DEVICE_REQUEST:
            return {
                ...state,
                hideDevice: {
                    ...state.hideDevices,
                    isLoading: action.payload
                },

            };
        case GET_DEVICE_REQUEST:
            return {
                ...state,
                getDevices: {
                    ...state.getDevices,
                    isLoading: action.payload
                },

            };
        case GET_DEVICE_LIST_REQUEST:
            return {
                ...state,
                getDeviceList: {
                    ...state.getDeviceList,
                    isLoading: action.payload
                },

            };
        case ADD_DEVICE_REQUEST:
            return {
                ...state,
                addDevices: {
                    ...state.addDevices,
                    isLoading: action.payload
                },
            };
        case UPDATE_DEVICE_REQUEST:
            return {
                ...state,
                updateDevice: {
                    ...state.updateDevice,
                    isLoading: action.payload
                },
            };
        case GET_DEVICE_LIST_SUCCESS:
            return {
                ...state,
                getDeviceList: {
                    ...state.getDeviceList,
                    length: parseInt(action.payload.Data.length, 10),
                    items: action.payload.Data,
                    success: action.payload.Success,
                    error: null,
                    isLoading: false,
                    deviceNames: Object.keys(action.payload.Data),
                },
            };
        case GET_DEVICE_LIST_ERROR:
            return {
                ...state,
                getDeviceList: {
                    ...state.getDeviceList,
                    error: action.payload.Err,
                    success: action.payload.Success,
                    isLoading: false,
                    deviceNames: null,
                },
            };
        case UPDATE_DEVICE_SUCCESS:
            return {
                ...state,
                updateDevice: {
                    ...state.updateDevice,
                    items: action.payload.Data.data,
                    success: action.payload.Success,
                    error: null,
                }
            };
        case UPDATE_DEVICE_ERROR:
            return {
                ...state,
                updateDevice: {
                    ...state.updateDevice,
                    items: null,
                    success: action.payload.Success,
                    error: action.payload.Err,
                },
            };
        case GET_DEVICE_SUCCESS:
            return {
                ...state,
                getDevices: {
                    ...state.getDevices,
                    length: parseInt(action.payload.Data.length, 10),
                    items: action.payload.Data.data,
                    success: action.payload.Success,
                    isLoading: false,
                },
            };
        case GET_DEVICE_ERROR:
            return {
                ...state,
                getDevices: {
                    ...state.getDevices,
                    error: action.payload.Err,
                    success: action.payload.Success,
                    length: 0,
                    isLoading: false,
                },
            };
        case ADD_DEVICE_SUCCESS:
            return {
                ...state,
                addDevice: {
                    ...state.addDevice,
                    item: action.payload.Data.data,
                    success: action.payload.Success,
                    error: null,
                },
            };

        case ADD_DEVICE_ERROR:
            return {
                ...state,
                addDevice: {
                    ...state.addDevice,
                    item: null,
                    error: action.payload.Err,
                    success: action.payload.Success,
                    isLoading: false
                },
            };
        // case DELETE_DEVICE_SUCCESS:
        //     return {
        //         ...state,
        //         deleteDevice: {
        //             ...state.deleteDevice,
        //             item:action.payload.msg,
        //             success: action.payload.success
        //         },

        //     };
        // case DELETE_DEVICE_ERROR:
        //     return {
        //         ...state,
        //         deleteDevice: {
        //             ...state.deleteDevice,
        //             error:action.payload.error,
        //             success: action.payload.success
        //         },

        //     };
        case HIDE_DEVICE_SUCCESS:
            return {
                ...state,
                hideDevice: {
                    ...state.hideDevice,
                    item: action.payload.Data,
                    success: action.payload.Success,
                    error: null,
                    isLoading: false
                },
            };
        case HIDE_DEVICE_ERROR:
            return {
                ...state,
                hideDevice: {
                    ...state.hideDevice,
                    error: action.payload.Err,
                    success: action.payload.Success,
                    item: null,
                    isLoading: false
                },
            };
        default:
            return state;
    }
}

