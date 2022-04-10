import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UTable from '../../../components/Tables/UsersTable';
import { FiltersState } from '../../../context/filtersState';
import { AdminFiltersState } from '../../../context/adminFiltersContext';
import { getUsers, blockUser } from '../../../reducers/users/actions';

const Users = () => {
    // const test = React.useContext(FiltersState);
    const usersDevicesFiltersState = React.useContext(FiltersState);
    // const usersDevicesFiltersState = React.useContext(AdminFiltersState);

    const { setUsersFilters_admin, usersFilters_admin } = usersDevicesFiltersState.usersDevicesFilters;

    // console.log(usersDevicesFiltersState.devicesFiltersState,test,"test      usersFilters_adminState.deviceFiltersStateusersFilters_adminState.deviceFiltersStateusersFilters_adminState.deviceFiltersStateusersFilters_adminState.deviceFiltersStateusersFilters_adminState.deviceFiltersState")
    const [renderPage, setRenderPage] = React.useState(false)
    const [users, setUsers] = React.useState([]);
    const [bool, setBool] = React.useState(false);
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.users.getUsers)
    const auth = useSelector(state => state.auth)

    React.useEffect(() => {
        console.log(auth.isAuthenticated, "auth.isAuthenticated")
        return setRenderPage(true)
    }, [])
    function asyncGetData(changeFun, state, user_group, auth_group_user_id) {
        return new Promise((rs, rj) => {

            state = {
                ...state,
                [user_group]: {
                    [auth_group_user_id]: auth_group_user_id
                }
            }
            return rs(state)
        })
    }
    React.useEffect(() => {
        if (renderPage && auth.isAuthenticated) {
            console.log(auth.isAuthenticated, auth.groupTeam, "auth.isAuthenticated  in if")
            if (auth.role === "admin" && auth.groupTeam !== 'tshoot_analitics') {
                setUsersFilters_admin(val => ({
                    ...val,
                    userGroupTeam: {
                        [auth.groupTeam]: auth.groupTeam
                    }

                }))
                return asyncGetData(setUsersFilters_admin, usersFilters_admin, "userGroupTeam", auth.groupTeam)
                    .then((obj) => {
                        dispatch(getUsers(obj))
                        return setUsers({ ...obj })
                    })
                    .then(() => setRenderPage(false))
                    .catch(err => console.log(err, "err in get users in admin page"))
            }
            setRenderPage(false)
            return setBool(true)
        }
    }, [renderPage, auth.isAuthenticated])
    React.useEffect(() => {
        if (bool) {
            console.log(usersFilters_admin, "usersFilters_adminusersFilters_adminusersFilters_adminusersFilters_adminusersFilters_adminusersFilters_adminusersFilters_admin")
            bool && dispatch(getUsers(usersFilters_admin))
            return setBool(false)
        }
    }, [bool])
    React.useEffect(() => {
        if (!usersData.isLoading) {
            usersData.items && setUsers([...usersData.items])
        }
        return (<div>TEST LOADING...</div>)

    }, [usersData.isLoading, usersData.items,usersData.items&&usersData.items.length])
    React.useEffect(() => {
        return setBool(true)
    }, [usersFilters_admin.page])

    function blockUserFun(a) {
        return dispatch(blockUser(a, usersFilters_admin))
    }
    function clearPage(a) {
        return new Promise((rs, rj) => {
            return rs(a(val => ({
                ...val,
                page: 0,
                limit: 10
            })))
        })
    }
    async function handleSubmit() {
        return clearPage(setUsersFilters_admin)
            .then(() => dispatch(getUsers(usersFilters_admin)))
            .then(() => setBool(true))
            .catch(err => {
                console.log(err, "errorr in users action trigger")
            })

    }
    function handleClear() {
        return setUsersFilters_admin(val => ({
            ...val,
            userName: "",
            userGroupTeam: {},
        }))
    }
    function changeFilterState(c, a) {
        return setUsersFilters_admin(prv => {
            if (prv[c][a]) {
                const copyState = { ...prv };
                delete copyState[c][a]
                return copyState;
            }
            return {
                ...prv,
                [c]: {
                    ...prv[c],
                    [a]: a
                }
            }
        })
    }
    return (
        <>
            {!usersData.isLoading && <UTable
                usersData={usersData}
                users={users}
                blockUserFun={blockUserFun}
                page={usersFilters_admin.page}
                limit={usersFilters_admin.limit}
                setPage={setUsersFilters_admin}
                handleSubmit={handleSubmit}
                handleClear={handleClear}
                setUsersFilters={setUsersFilters_admin}
                usersFilters={usersFilters_admin}
                userAuth={auth}
                changeFilterState={changeFilterState}
            />}
        </>
    )
}
export default Users;