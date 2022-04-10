import React from 'react';
import {
    useRouteMatch,
    Link,
    useHistory,
    useLocation
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames'
import Pagination from '../../Pagination';
import GroupTeam from '../../FilterAutocomplite/OtherFilters';
import Username from '../../FilterAutocomplite/KeyWordFilters';
import st from '../style.module.css'

const Userstable = ({
    setPage,
    usersData,
    users,
    blockUserFun,
    limit,
    page,
    handleSubmit,
    userAuth,
    changeFilterState,
    setUsersFilters,
    usersFilters, }) => {

    const match = useRouteMatch();
    const history = useHistory()
    const location = useLocation();

    const permission = useSelector(state => state.auth)

    function clearCheckedFilterField(c, a) {

        if (c === "userName") {
            return setUsersFilters(val => ({
                ...val,
                [c]: ""
            }))
        }
        return setUsersFilters(prv => {
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
            <div className={st.filtersWrapper}>
                <div className={st.filtersLine}>
                    {userAuth.groupTeam && userAuth.groupTeam === "tshoot_analitics" && <div
                        className={st.filtersComponent} >
                        <GroupTeam
                            name="userGroupTeam"
                            loadRefresh={false}
                            placeholder={{ userGroupTeam: "group_team" }}
                            selectionItems={["troubleshooters", "offline_troubleshooters", "tshoot_analitics", "local_troubleshooters"]}
                            handleClick={changeFilterState}
                            values={usersFilters}
                            clearField={clearCheckedFilterField} />
                    </div>}
                    <div
                        className={st.filtersComponent} >
                        <Username
                            name="userName"
                            placeholder={{ userName: "username" }}
                            handleChangeFilter={setUsersFilters}
                            values={usersFilters}
                            clearField={clearCheckedFilterField} />
                    </div>

                </div>
                <div className={st.filtersLine}>
                    <div className={st.filtersComponent}>
                        <button onClick={() => handleSubmit && handleSubmit()}>
                            SUBMIT
                        </button>
                    </div>
                    {permission.groupTeam === 'tshoot_analitics' && <div className={st.filtersComponent}>

                        <button onClick={() => history.push(`${location.pathname}users/adduser`)}>ADD USER</button>
                    </div>}

                </div>
            </div>

            {usersData.isLoading && <div style={{ textAlign: 'center' }}>LOADING USERS...</div>}
            <div className={st.wrap}>

                {!usersData.isLoading && usersData.items && <div className={st.tableWrapper}>
                    <table className={st.table}>

                        <thead className={st.thead}>
                            <tr className={st.tr} >
                                {/* {hide&&<th className={st.th} style={{width:"50px"}}></th>} */}
                                <th className={st.th}>Username</th>
                                <th className={st.th}>Password</th>
                                <th className={st.th}>Role</th>
                                <th className={st.th}>TEAM</th>
                                <th className={st.th}>Block</th>
                                <th className={st.th}>Edit</th>
                            </tr>

                        </thead>
                        <tbody >
                            {usersData && usersData.items.map(el => (
                                <tr className={st.tr} key={el.id} >
                                    {/* {hide&&<td  className={st.td} style={{width:"50px"}}><input type="checkbox" /></td>} */}
                                    <td className={st.td}>
                                        {el.username}
                                    </td>
                                    <td className={st.td}>
                                        {el.password}
                                    </td>
                                    <td className={st.td}>
                                        {el.role}
                                    </td>
                                    <td className={st.td}>
                                        {el.groupTeam}
                                    </td>
                                    <td className={st.td}>
                                        <span
                                            onClick={() => blockUserFun && blockUserFun(el)}
                                            style={{ cursor: "pointer", color: "#2b75ae" }}
                                        >
                                            {el.block ? "DENIED" : "ALLOWED"}
                                        </span>

                                    </td>
                                    <td className={st.td}>
                                        <Link
                                            to={{
                                                pathname: `${match.path}users/updateuser`,
                                                state: { ...el }
                                            }}>
                                            EDIT
                                        </Link>
                                    </td>

                                </tr >))}
                        </tbody>
                        <tfoot colSpan="5" style={{ textAlign: "left" }} className={cn(st.tr)}>
                            <tr>
                                <td colSpan="5" >
                                    <Pagination
                                        // rowsPerPageOptions={[ 10,25,50,100]}
                                        from={(page * limit) + 1}
                                        to={parseInt(usersData.items.length, 10) + ((page * limit))}
                                        all={parseInt(usersData.length, 10)}
                                        rowsPerPage={limit}
                                        page={page}
                                        // ActionsComponent={TablePaginationActions}
                                        // onChangePage={handleChangePage}
                                        // onChangeRowsPerPage={handleChangeRowsPerPage}
                                        setPage={setPage}
                                    />
                                </td>
                            </tr>
                        </tfoot>

                    </table>

                </div>}
                {users.length < 1 && <div style={{ textAlign: "center", color: '#2b75ae' }}>
                    THERE IS NOT DATA
                </div>}
                {/* {permission.groupTeam === 'tshoot_analitics' && <div className={cn(st.buttonWrapp, {
                    [st.makeCentered]: users.length < 1
                })}>
                    <button onClick={() => history.push(`${location.pathname}users/adduser`)}>ADD USER</button>
                </div>} */}

            </div>

        </>
    )
}
export default Userstable;
