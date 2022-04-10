import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DevicesTable from '../../../components/Tables/DevacesTable';
import { AdminFiltersState } from '../../../context/adminFiltersContext';
import { FiltersState } from '../../../context/filtersState';
import { getDevices, hideDevice } from '../../../reducers/devices/actions';

const Devices = () => {
    // technologies_admin,
    // vendors_admin,
    // devicesFilters_admin, 
    // setDevicesFilters_admin,
    // usersFilters, 
    // setUsersFilters
    // const usersDevicesFiltersState = React.useContext(AdminFiltersState);
    const usersDevicesFiltersState = React.useContext(FiltersState);
    const { devicesFilters_admin, setDevicesFilters_admin, vendors_admin, technologies_admin } = usersDevicesFiltersState.usersDevicesFilters;

    const [devices, setDevices] = React.useState([]);
    const [vendorsSelection, setVendorsSelection] = React.useState([])
    const [changeItemsBool, setChangeItemsBool] = React.useState(false)
    const [bool, setBool] = React.useState(false);

    const dispatch = useDispatch();
    const deviceData = useSelector(state => state.devices.getDevices)
    const auth = useSelector(state => state.auth)


    React.useEffect(() => {
        dispatch(getDevices(devicesFilters_admin))
        return setBool(true)
    }, [])
    React.useEffect(() => {
        if (bool) {
            bool && dispatch(getDevices(devicesFilters_admin))
            return setBool(false)
        }
    }, [bool])
    React.useEffect(() => {
        if (!deviceData.isLoading) {
            deviceData.items && setDevices([...deviceData.items])
        }
    }, [deviceData.isLoading])
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
        return clearPage(setDevicesFilters_admin)
            .then(() => dispatch(getDevices(devicesFilters_admin)))
            .then(() => setBool(true))
            .catch(err => {
                console.log(err, "errorr in users action trigger")
            })

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
        return clearPage(setDevicesFilters_admin)
            .then(() => dispatch(getDevices(devicesFilters_admin)))
            .then(() => setBool(true))
            .catch(err => {
                console.log(err, "errorr in users action trigger")
            })
    }
    React.useEffect(() => {
        return setBool(true)
    }, [devicesFilters_admin.page])

    React.useEffect(() => {
        if (changeItemsBool) {
            changeLogsCheckedDeviceFilter(devicesFilters_admin)
            console.log(devicesFilters_admin, "devicesFilters_admindevicesFilters_admin")
            return setChangeItemsBool(false)
        }
    }, [changeItemsBool])


    React.useEffect(() => {
        return setChangeItemsBool(true)
    }, [devicesFilters_admin.technology && Object.keys(devicesFilters_admin.technology).length])
    function changeLogsCheckedDeviceFilter(obj) {
        let newObj = {}
        let newArr = []

        Object.keys(obj.vendor).map(el => {
            Object.keys(obj.technology).map(a => {
                if (vendors_admin[a]) {
                    return newArr = [...newArr, ...vendors_admin[a].filter(b => b == el)]
                }
            })
        })
        newArr.map(el => {
            return newObj = {
                ...newObj,
                [el]: el
            }
        })
        return setDevicesFilters_admin(val => ({
            ...val,
            vendor: newObj
        }))
    }
    function handleClear() {
        return setDevicesFilters_admin({
            technology: {},
            vendor: {},
            ipAddress: "",
            page: 0,
            limit: 10
        })
    }
    function changeFilterState(c, a) {
        return setDevicesFilters_admin(prv => {
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
    function hideDeviceFun(a) {
        return dispatch(hideDevice(a, devicesFilters_admin))
    }

    return (
        <>
            <DevicesTable
                devices={devices}
                deviceData={deviceData}
                hideDeviceFun={hideDeviceFun}
                page={devicesFilters_admin.page}
                limit={devicesFilters_admin.limit}
                setPage={setDevicesFilters_admin}
                changeFilterState={changeFilterState}
                vendors={vendors_admin}
                technologies={technologies_admin}
                devicesFilters={devicesFilters_admin}
                setDevicesFilters={setDevicesFilters_admin}
                handleSubmit={handleSubmit}
                handleClear={handleClear}
                vendorsSelection={vendorsSelection}

            />
        </>
    )
}
export default Devices;

  // React.useEffect(()=>{
    //     // setvendorsSelection([...getVendorsSelection()])
    //     return console.log(changeLogsCheckedDeviceFilter(devicesFilters_admin),"changeLogsCheckedDeviceFilter(devicesFilters_admin.technology)")
    // },[devicesFilters_admin.technology&&Object.keys(devicesFilters_admin.technology).length])
    // // function getVendorsSelection(){

    //     return [...Object.values(devicesFilters_admin.technology).length>1?getUniqItem(vendors_admin):devicesFilters_admin.technology&&vendors_admin[Object.values(devicesFilters_admin.technology)[0]]]
    // }