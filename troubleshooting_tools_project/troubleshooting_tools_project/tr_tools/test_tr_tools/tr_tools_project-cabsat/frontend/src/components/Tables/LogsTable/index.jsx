import React from 'react';
import cn from 'classnames'
import st from '../style.module.css'
import Pagination from '../../Pagination';
import UsersFilter from '../../FilterAutocomplite/UsersFilter';
import DeviceFilter from '../../FilterAutocomplite/OtherFilters';
import Technology from '../../FilterAutocomplite/OtherFilters';
import Vendor from '../../FilterAutocomplite/OtherFilters';
import GroupTeam from '../../FilterAutocomplite/OtherFilters';
import CustomeIdFilter from '../../FilterAutocomplite/KeyWordFilters';
import SessionIdFilter from '../../FilterAutocomplite/KeyWordFilters';
import DateTimeInputField from '../../../components/DateTimeInput';

const LogsTable = (props) => {
    const {
        page,
        limit,
        setPage,
        changeFilterState,
        logsFilters,
        setLogsFilters,
        handleSubmit,
        handleClear,
        userAuth,
        logData,
        usersList,
        deviceList,
        setLogs,
        logs,
        vendor,
        technology } = props


    function clearCheckedFilterField(c, a) {
        if (c === "from" || c === "to") {
            return setLogsFilters(val => ({
                ...val,
                filterDateTime: {
                    ...val.filterDateTime,
                    [c]: ""
                }
            }))
        }
        if (c === "session_id" || c === "customer_id" || c === "customer_number") {
            return setLogsFilters(val => ({
                ...val,
                [c]: ""
            }))
        }
        return setLogsFilters(prv => {
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

    function getUniqItem(objArr) {
        let arr = []
        let obj = {}
        Object.keys(objArr).map(el => {
            return arr = [...arr, ...objArr[el]]
        })
        arr.map(el => {
            if (!obj[el]) {
                return obj = {
                    ...obj,
                    [el]: el
                }
            }
        })
        return Object.values(obj)
    }
    return (
        <>
            <div className={st.container}>
                <div className={st.filtersWrapper}>
                    <div className={st.filtersLine}>
                        <div className={st.filtersComponent}>
                            <DateTimeInputField
                                name="from"
                                placeholder={"from"}
                                handleClick={changeFilterState}
                                values={logsFilters}
                                clearField={clearCheckedFilterField} />
                        </div>
                        <div className={st.filtersComponent}>
                            <DateTimeInputField
                                name="to"
                                placeholder={"to"}
                                handleClick={changeFilterState}
                                values={logsFilters}
                                clearField={clearCheckedFilterField} />
                        </div>
                        <div className={st.filtersComponent}>

                            <SessionIdFilter
                                name="session_id"
                                placeholder={{ session_id: "session_id" }}
                                handleChangeFilter={setLogsFilters}
                                values={logsFilters}
                                clearField={clearCheckedFilterField}
                            />
                        </div>
                        <div className={st.filtersComponent}>
                            <CustomeIdFilter
                                name="customer_id"
                                placeholder={{ customer_id: "customer_id" }}
                                handleChangeFilter={setLogsFilters}
                                values={logsFilters}
                                clearField={clearCheckedFilterField}
                            />
                        </div >

                    </div>
                    <div className={st.filtersLine}>
                        <div className={st.filtersComponent} >
                            <Technology
                                name="technology"
                                placeholder={{ technology: "technology" }}
                                selectionItems={["gpon", "dsl"]}
                                handleClick={changeFilterState}
                                values={logsFilters}
                                clearField={clearCheckedFilterField} />
                        </div>
                        {Object.values(logsFilters.technology).length > 0 && <div className={st.filtersComponent} >
                            <Vendor
                                name="vendor"
                                placeholder={{ vendor: "vendor" }}
                                selectionItems={Object.values(logsFilters.technology).length > 1 ? getUniqItem(vendor) : vendor[Object.values(logsFilters.technology)[0]]}
                                handleClick={changeFilterState}
                                values={logsFilters}
                                clearField={clearCheckedFilterField} />
                        </div>}
                        {<div className={st.filtersComponentWrap} >
                            <div className={st.filtersComponent}>
                                <DeviceFilter
                                    name="device"
                                    loadRefresh={deviceList.isLoading}
                                    placeholder={{ device: "device" }}
                                    selectionItems={deviceList.deviceNames}
                                    handleClick={changeFilterState}
                                    values={logsFilters}
                                    clearField={clearCheckedFilterField} />
                            </div>

                        </div>}
                    </div>
                    <div className={st.filtersLine}>
                        {userAuth.groupTeam && userAuth.groupTeam === "tshoot_analitics" && <div
                            className={st.filtersComponent} >
                            <GroupTeam
                                name="usersGroupTeam"
                                loadRefresh={false}
                                placeholder={{ usersGroupTeam: "group_team" }}
                                selectionItems={["troubleshooters", "offline_troubleshooters", "tshoot_analitics", "local_troubleshooters"]}
                                handleClick={changeFilterState}
                                values={logsFilters}
                                clearField={clearCheckedFilterField} />
                        </div>}
                        {userAuth.role !== "user" && <div className={st.filtersComponentWrap}>
                            <div className={st.filtersComponent}>
                                <UsersFilter
                                    name="users"
                                    loadRefresh={usersList.isLoading}
                                    placeholder={"users"}
                                    selectionItems={usersList}
                                    handleClick={changeFilterState}
                                    values={logsFilters}
                                    clearField={clearCheckedFilterField} />

                            </div>
                        </div>}
                    </div>
                    <div className={st.filtersLine}>
                        <div className={st.filtersComponent}>
                            <button onClick={() => handleSubmit && handleSubmit()}>
                                SUBMIT
                            </button>
                        </div>
                        <div className={st.filtersComponent}>
                            <button onClick={() => handleClear()}>
                                Clear Filters
                            </button>
                        </div>
                    </div>


                </div>
                {/* <button onClick = {()=>setLogsFilters(val=>({...val,avoe:"avoe"}))}></button> */}
                {logData.isLoading && <div style={{ textAlign: "center" }}>LOADING LOGS HISTORY...</div>}
                {!logData.isLoading && logData.items && logData.items.length > 0 ? <div className={st.wrap}>
                    <div className={st.tableWrapper}>
                        <table className={st.table}>
                            <thead className={st.thead} >
                                <tr className={st.tr}>
                                    <th className={st.th}>Session</th>
                                    <th className={st.th}>User</th>
                                    <th className={st.th}>Team</th>
                                    <th className={st.th}>Customer</th>
                                    <th className={st.th}>Mobile-number</th>
                                    <th className={st.th}>Command</th>
                                    <th className={st.th}>Technology</th>
                                    <th className={st.th}>Vendor</th>
                                    <th className={st.th}>Device</th>
                                    <th className={st.th}>Device ip address</th>
                                    <th className={st.th}>Position</th>
                                    <th className={st.th} style={{ width: "300px" }}>Output</th>
                                    <th className={st.th}>Date</th>
                                    <th className={st.th}>Time</th>
                                </tr>
                            </thead>
                            <tbody className={st.tbody}>
                                {logData.length > 0 && logData.items.map(el => (
                                    <tr className={st.tr} key={el.id}>
                                        <td className={st.td}>{el.sessionId}</td>
                                        <td className={st.td}>{el.userName}</td>
                                        <td className={st.td}>{el.groupTeam}</td>
                                        <td className={st.td}>{el.customerId}</td>
                                        <td className={st.td}>{el.mobNumber}</td>
                                        <td className={st.td}>{el.command}</td>
                                        <td className={st.td}>{el.technology}</td>
                                        <td className={st.td}>{el.vendor}</td>
                                        <td className={st.td}>{el.device}</td>
                                        <td className={st.td}>{el.ipAddress}</td>
                                        <td className={st.td}>{el.position}</td>
                                        <td className={st.td} style={{ width: "300px" }}>{el.output}</td>
                                        <td className={st.td}>{el.dateTime.split("T")[0]}</td>
                                        <td className={st.td}>{el.dateTime.split("T")[1].split(".")[0]}</td>
                                    </tr>))}
                            </tbody>
                            <tfoot colSpan="12" style={{ textAlign: "left" }} className={cn(st.tr)}>
                                <tr>
                                    <td colSpan="12" style={{ marginRight: "30px" }} >
                                        <Pagination
                                            // rowsPerPageOptions={[ 10,25,50,100]}
                                            from={(page * limit) + 1}
                                            to={parseInt(logData.items.length, 10) + ((page * limit))}
                                            all={parseInt(logData.length, 10)}
                                            rowsPerPage={limit}
                                            page={page}
                                            // ActionsComponent={TablePaginationActions}
                                            // onChangePage={handleChangePage}
                                            // onChangeRowsPerPage={handleChangeRowsPerPage}
                                            setPage={setPage} />
                                    </td>
                                </tr>
                            </tfoot>

                        </table>

                    </div>
                </div> : <div style={{ textAlign: 'center' }}>There is no data </div>}
            </div>
        </>
    )
}
export default LogsTable;

     // return setLogsFilters(prv=>{
        //     if(prv[c][a]){
        //             const copyState = {...prv};
        //             delete copyState[c][a]
        //             return copyState;
        //         }
        //         return {
        //             ...prv,
        //             [c]:{
        //                 ...prv[c],
        //                 [a]:a
        //             }
        //         }
        //     })
