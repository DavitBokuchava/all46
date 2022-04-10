import React from 'react';
import {
    useRouteMatch,
    Link,
    useHistory,
    useLocation
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pagination from '../../Pagination';
import Technology from '../../FilterAutocomplite/OtherFilters';
import Vendor from '../../FilterAutocomplite/OtherFilters';
import IpAddress from '../../FilterAutocomplite/KeyWordFilters';
import cn from 'classnames'
import st from '../style.module.css'

const DevicesTable = ({
    changeFilterState,
    devicesFilters,
    setDevicesFilters,
    devices,
    deviceData,
    hideDeviceFun,
    page,
    limit,
    setPage,
    vendors,
    technologies,
    handleSubmit,
    handleClear,
    vendorsSelection }) => {

    const permission = useSelector(state => state.auth)
    const history = useHistory();

    function clearCheckedFilterField(c, a) {
        if (c === "ipAddress") {
            return setDevicesFilters(val => ({
                ...val,
                [c]: ""
            }))
        }
        return setDevicesFilters(prv => {
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
            <div className={st.filtersWrapper}>
                <div className={st.filtersLine}>
                    <div className={st.filtersComponent} >
                        <Technology
                            name="technology"
                            placeholder={{ technology: "technology" }}
                            selectionItems={["gpon", "dsl"]}
                            handleClick={changeFilterState}
                            values={devicesFilters}
                            clearField={clearCheckedFilterField}
                        />
                    </div>
                    {Object.values(devicesFilters.technology).length > 0 && <div className={st.filtersComponent} >
                        <Vendor
                            name="vendor"
                            placeholder={{ vendor: "vendor" }}
                            selectionItems={Object.values(devicesFilters.technology).length > 1 ? getUniqItem(vendors) : vendors[Object.values(devicesFilters.technology)[0]]}
                            handleClick={changeFilterState}
                            values={devicesFilters}
                            clearField={clearCheckedFilterField}
                        />
                    </div>}
                    <div className={st.filtersComponent}>
                        <IpAddress
                            name="ipAddress"
                            placeholder={{ ipAddress: "ip-address" }}
                            handleChangeFilter={setDevicesFilters}
                            values={devicesFilters}
                            clearField={clearCheckedFilterField}
                        />
                    </div >
                </div>
                <div className={st.filtersLine}>
                    <div className={st.filtersComponent}>
                        <button onClick={() => handleSubmit && handleSubmit()}>
                            SUBMIT
                        </button>
                    </div>
                    <div className={st.filtersComponent}>
                        <button onClick={() => handleClear && handleClear()}>
                            Clear Filters
                        </button>
                    </div>
                    {permission.groupTeam === 'tshoot_analitics' && <div className={st.filtersComponent}>
                        <button onClick={() => history.push(`/administratorpage/adddevice`)}>ADD DEVICE</button>
                    </div>}

                </div>
            </div>

            {deviceData.isLoading && <div style={{ textAlign: 'center' }} >LOADING DEVICES...</div>}
            {!deviceData.isLoading && deviceData.items && <div className={st.wrap}>
                <h2> devices </h2>
                <div className={st.tableWrapper}>
                    <table className={st.table}>
                        <thead className={st.thead} >
                            <tr className={st.tr}>
                                <th className={st.th}>Device</th>
                                <th className={st.th}>Ip Address</th>
                                <th className={st.th}>Technology</th>
                                <th className={st.th}>Vendor</th>
                                <th className={st.th}>Zone</th>
                                {permission.groupTeam === 'tshoot_analitics' && <th className={st.th}>Hide</th>}
                                {permission.groupTeam === 'tshoot_analitics' && <th className={st.th}>Update</th>}
                            </tr>
                        </thead>
                        <tbody className={st.tbody}>
                            {deviceData.length > 0 && devices.map(el => (
                                <tr className={st.tr} key={el.id}>
                                    <td className={st.td}>{el.deviceName}</td>
                                    <td className={st.td}>{el.deviceIpaddress}</td>
                                    <td className={st.td}>{el.technology}</td>
                                    <td className={st.td}>{el.vendor}</td>
                                    <td className={st.td}>{el.zone}</td>
                                    {permission.groupTeam === 'tshoot_analitics' && <td className={st.td}>
                                        <span
                                            onClick={() => hideDeviceFun(el)}
                                            style={{ cursor: "pointer", color: "#2b75ae" }}
                                        >
                                            {el.hide ? "SHOW" : "HIDE"}
                                        </span>

                                    </td>}
                                    {permission.groupTeam === 'tshoot_analitics' && <td className={st.td}>
                                        <Link
                                            to={{
                                                pathname: `/administratorpage/updatedevice`,
                                                state: { ...el }
                                            }}>
                                            EDIT
                                        </Link>
                                    </td>}
                                </tr>))}

                        </tbody>
                        <tfoot colSpan="5" style={{ textAlign: "left" }} className={cn(st.tr)}>
                            <tr>
                                <td colSpan="10" >
                                    <Pagination
                                        // rowsPerPageOptions={[ 10,25,50,100]}
                                        from={(page * limit) + 1}
                                        to={parseInt(deviceData.items.length, 10) + ((page * limit))}
                                        all={parseInt(deviceData.length, 10)}
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

                </div>
                {/* {permission.groupTeam === 'tshoot_analitics' && <div className={st.buttonWrapp}>
                    <button onClick={() => history.push(`/administratorpage/adddevice`)}>ADD DEVICE</button>
                </div>} */}
            </div>}

        </>
    )
}
export default DevicesTable;
