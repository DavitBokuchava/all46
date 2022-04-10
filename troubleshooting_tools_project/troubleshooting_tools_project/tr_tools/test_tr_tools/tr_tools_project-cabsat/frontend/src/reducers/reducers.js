import { combineReducers } from 'redux';
import auth from './auth/reducers';
import users from './users/reducers';
import showCommand from './showcommands/reducers'
import devices from './devices/reducers'
import loader from './loader/reducers'
import logs from './logs/reducers'

export default combineReducers({
    auth,
    users,
    showCommand,
    devices,
    loader,
    logs,
});
