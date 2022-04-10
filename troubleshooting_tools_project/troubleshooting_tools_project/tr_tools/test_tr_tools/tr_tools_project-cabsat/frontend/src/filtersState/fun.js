import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import LogsFilters from './LogsFilters'
// import { getUsersList } from '../reducers/users/actions';

const ChangeLogsFilters = (logsFilters, setLogsFilters, userAuth, deps) => {
	// const [users, setUsers] = React.useState([])
	// const [userGroupTeamFilters,setUserGroupTeam] = React.useState({});
	const [newLogsFilter, setNewLogsFilter] = React.useState({
		...logsFilters
	});
	const authUsers = useSelector(state => state.auth)
	React.useEffect(() => {
		if (userAuth.isAuthenticated && userAuth.groupTeam !== "thoot_analitics") {
			setLogsFilters(val => ({
				...val,
				userGroupTeam: {
					[userAuth.groupTeam]: userAuth.groupTeam
				}
			}))
			return setNewLogsFilter((val) => ({
				...val,
				userGroupTeam: {
					[userAuth.groupTeam]: userAuth.groupTeam
				}
			}))

		}
		console.log(userAuth, "authUser authUser authUser authUser")
	}, deps);
	console.log(logsFilters, "new HOOK")
	return {
		newLogsFilter
	};
}

export default ChangeLogsFilters;