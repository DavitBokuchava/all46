
import {
  GET_LOGS_REQUEST,
  GET_LOGS_SUCCESS,
  GET_LOGS_ERROR,
} from '../constants.js';
import axios from 'axios';
// import { logout } from '../auth/action'
export const getLogs = (filters) => {
  const { users, filterDateTime, usersGroupTeam, session_id, customer_id, device, technology, vendor, limit, page } = filters;
  console.log(filters, "userGroupTeamuserGroupTeamuserGroupTeamuserGroupTeam  in acTion")
  const token = JSON.parse(localStorage.getItem('token')).token;
  return (dispatch) => {
    dispatch({
      type: GET_LOGS_REQUEST,
      payload: true
    });
    async function getData() {
      try {
        const response = await axios.get(`/logs/getlogs?user_id=${Object.values(users).length > 0 ? Object.values(users).join(",") : null}&user_group_team=${Object.values(usersGroupTeam).length > 0 ? Object.values(usersGroupTeam).join(",") : null}&session_id=${session_id ? session_id : null}&customer_id=${customer_id ? customer_id : null}&customer_mob_number=null&command=null&technology=${Object.values(technology).length > 0 ? Object.values(technology) : null}&vendor=${Object.values(vendor).length > 0 ? Object.values(vendor) : null}&device=${Object.values(device).length > 0 ? Object.values(device).join(",") : null}&ipaddress=null&date=${filterDateTime.from && filterDateTime.to ? Object.values(filterDateTime).join(",") : null}&limit=${limit}&offset=${limit * page}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Token': token
            }
          });
        console.log(response.data, "    response.dataresponse.data response.dataresponse.data")
        if (response.data.Success) {
          return dispatch({
            type: GET_LOGS_SUCCESS,
            payload: response.data
          })
        } else {
          return dispatch({
            type: GET_LOGS_ERROR,
            payload: response.data
          });
        }
      } catch (error) {
        console.error(error.stack, " ===  TO GET_LOGS ===");
      }
    }
    getData()
  }
};