import {
    GET_USERS_LIST_REQUEST,
    GET_USERS_LIST_SUCCESS,
    GET_USERS_LIST_ERROR,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    BLOCK_USER_REQUEST,
    BLOCK_USER_SUCCESS,
    BLOCK_USER_ERROR,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERORR
} from '../constants.js';

const initialstate = {
    getUsersList: {
        items: [],
        error: null,
        success: false,
        isLoading: false
    },
    getUsers: {
        items: [],
        error: null,
        success: false,
        isLoading: false,
        length: 0
    },
    addUser: {
        item: null,
        error: null,
        success: false,
        isLoading: false
    },
    blockUser: {
        item: null,
        error: null,
        success: false,
        isLoading: false
    },
    updateUser: {
        item: null,
        error: null,
        success: false,
        isLoading: false
    },
    isLoading: false,

}
export default function users(state = initialstate, action) {
    console.log(action.type)
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                getUsers: {
                    ...state.getUsers,
                    isLoading: true
                }
            }
        case GET_USERS_LIST_REQUEST:
            return {
                ...state,
                getUsersList: {
                    ...state.getUsersList,
                    isLoading: true
                }
            }
        case ADD_USER_REQUEST:
            return {
                ...state,
                addUser: {
                    ...state.addUser,
                    isLoading: true
                }
            }
        case BLOCK_USER_REQUEST:
            return {
                ...state,
                blockUser: {
                    ...state.blockUser,
                    isLoading: true
                }
            }
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                updateUser: {
                    ...state.updateUser,
                    isLoading: true
                }
            }
        case GET_USERS_LIST_SUCCESS:
            return {
                ...state,
                getUsersList: {
                    ...state.getUsersList,
                    items: action.payload.Data.data,
                    success: action.payload.Success,
                    isLoading: false,
                },
            };
        case GET_USERS_LIST_ERROR:
            return {
                ...state,
                getUsersList: {
                    ...state.getUsersList,
                    error: action.payload.Err,
                    success: action.payload.Success,
                    items: null,
                    isLoading: false,
                },
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                updateUser: {
                    ...state.updateUser,
                    items: action.payload.Data.data,
                    error: null,
                    success: action.payload.Success,
                    isLoading: false,
                },
            };
        case UPDATE_USER_ERORR:
            return {
                ...state,
                updateUser: {
                    ...state.updateUser,
                    success: action.payload.Success,
                    error: action.payload.Err,
                    isLoading: false,
                    items: null,
                },
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                getUsers: {
                    ...state.getUsers,
                    items: action.payload.Data.data,
                    success: action.payload.Success,
                    isLoading: false,
                    length: action.payload.Data.length
                },
            };
        case GET_USERS_ERROR:
            return {
                ...state,
                getUsers: {
                    ...state.getUsers,
                    error: action.payload.Err,
                    success: action.payload.Success,
                    items: null,
                    isLoading: false,
                    length: 0,
                },
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                addUser: {
                    ...state.addUser,
                    item: action.payload.Data.data,
                    error: null,
                    success: action.payload.Success,
                    isLoading: false,
                },
            };

        case ADD_USER_ERROR:
            return {
                ...state,
                addUser: {
                    ...state.addUser,
                    error: action.payload.Err,
                    success: action.payload.Success,
                    item: null,
                    isLoading: false,
                },
            };
        case BLOCK_USER_SUCCESS:
            return {
                ...state,
                blockUser: {
                    ...state.blockUser,
                    item: action.payload.Data.data,
                    success: action.payload.Success,
                    error: null,
                    isLoading: false,
                },
            };
        case BLOCK_USER_ERROR:
            return {
                ...state,
                blockUser: {
                    ...state.blockUser,
                    error: action.payload.Err,
                    success: action.payload.Success,
                    item: null,
                    isLoading: false,
                },
            };
        default:
            return state;
    }
}

        // case  GET_USERS_REQUEST:
        //     return {
        //         ...state,
        //         updateUser: {
        //             ... state.updateUser,
        //             isLoading:true
        //         }
        //     };
        // case  ADD_USER_REQUEST:
        //     return {
        //         ...state,
        //         updateUser: {
        //             ... state.updateUser,
        //                 isLoading:true
        //             }
        //     };
        // case  BLOCK_USER_REQUEST:
        //     return {
        //         ...state,
        //         updateUser: {
        //             ... state.updateUser,
        //             isLoading:true
        //             }
        //         };  