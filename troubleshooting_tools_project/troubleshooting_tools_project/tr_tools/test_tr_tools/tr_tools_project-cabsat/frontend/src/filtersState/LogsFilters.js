import React from 'react';
import { useSelector } from 'react-redux';

const LogsFiltersState = () => {

	const [logsFilters, setLogsFilters] = React.useState({
		users: {},
		usersGroupTeam: {},
		session_id: "",
		customer_id: "",
		customer_number: "",
		commands: {},
		technology: {},
		vendor: {},
		device: {},
		ipaddress: {},
		filterDateTime: {
			from: "",
			to: ""
		},
		limit: 20,
		page: 0,
	});
	const authUsers = useSelector(state => state.auth)
	React.useEffect(() => {
		if (!localStorage.getItem('token')) {
			return setLogsFilters(val => ({
				...val,
				users: {},
				usersGroupTeam: {},
				session_id: "",
				customer_id: "",
				customer_number: "",
				commands: {},
				technology: {},
				vendor: {},
				device: {},
				ipaddress: {},
				filterDateTime: {
					from: "",
					to: ""
				}
			}))
		}
	}, [authUsers.isAuthenticated])
	return {
		logsFilters,
		setLogsFilters,
	};
}

export default LogsFiltersState;