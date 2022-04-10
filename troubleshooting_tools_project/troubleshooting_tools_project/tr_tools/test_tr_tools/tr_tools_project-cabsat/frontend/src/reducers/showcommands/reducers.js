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
    // SHOW_SERVICE_PORT_BIND_CABSAT_REQUEST,
    // SHOW_SERVICE_PORT_BIND_CABSAT_SUCCESS,
    // SHOW_SERVICE_PORT_BIND_CABSAT_ERROR,
    // SET_SERVICE_PORT_BIND_CABSAT_REQUEST,
    // SET_SERVICE_PORT_BIND_CABSAT_SUCCESS,
    // SET_SERVICE_PORT_BIND_CABSAT_ERROR,
    SET_COMMANDS_GPON_ZTE_SERVICE_PORT_REQUEST,
    SET_COMMANDS_GPON_ZTE_SERVICE_PORT_SUCCESS,
    SET_COMMANDS_GPON_ZTE_SERVICE_PORT_ERROR,
    SET_COMMANDS_GPON_HUAWEI_SERVICE_PORT_REQUEST,
    SET_COMMANDS_GPON_HUAWEI_SERVICE_PORT_SUCCESS,
    SET_COMMANDS_GPON_HUAWEI_SERVICE_PORT_ERROR,
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
    SHOWCOMMAND_GPON_ERROR
} from '../constants.js';

const initialstate = {
    success: false,
    error: null,
    output: "",
    loader: false

}
export default function showCommand(state = initialstate, action) {
    console.log(action.type)
    switch (action.type) {
        case SHOWCOMMAND_GPON_REQUEST:
        case SHOWCOMMAND_DHCP_LOG_REQUEST:
        case SHOWCOMMAND_DSL_REQUEST:
        case SHOWCOMMAND_DHCP_COA_LOG_REQUEST:
        case SET_COMMANDS_GPON_HUAWEI_SERVICE_PORT_REQUEST:
        case SET_COMMANDS_GPON_ZTE_SERVICE_PORT_REQUEST:
        case AUTOFIND_SN_REQUEST:
        case MGC_REQUEST:
        case REMOVE_MAC_REQUEST:
            return {
                ...state,
                loader: true
            };
        case SHOWCOMMAND_GPON_SUCCESS:
        case SHOWCOMMAND_DHCP_LOG_SUCCESS:
        case SHOWCOMMAND_DSL_SUCCESS:
        case SHOWCOMMAND_DHCP_COA_LOG_SUCCESS:
        case SET_COMMANDS_GPON_HUAWEI_SERVICE_PORT_SUCCESS:
        case SET_COMMANDS_GPON_ZTE_SERVICE_PORT_SUCCESS:
        case AUTOFIND_SN_SUCCESS:
        case MGC_SUCCESS:
        case REMOVE_MAC_SUCCESS:
            return {
                ...state,
                success: action.payload.Success,
                output: action.payload.Output,
                error: action.payload.Err,
                loader: false,
            };
        case SHOWCOMMAND_GPON_ERROR:
        case SHOWCOMMAND_DHCP_LOG_ERROR:
        case SHOWCOMMAND_DSL_ERROR:
        case SHOWCOMMAND_DHCP_COA_LOG_ERROR:
        case SET_COMMANDS_GPON_HUAWEI_SERVICE_PORT_ERROR:
        case SET_COMMANDS_GPON_ZTE_SERVICE_PORT_ERROR:
        case AUTOFIND_SN_ERROR:
        case MGC_ERROR:
        case REMOVE_MAC_ERROR:
            return {
                ...state,
                success: action.payload.Success,
                output: "",
                error: action.payload.Err,
                loader: false,
            };
        default:
            return state;
    }
}

