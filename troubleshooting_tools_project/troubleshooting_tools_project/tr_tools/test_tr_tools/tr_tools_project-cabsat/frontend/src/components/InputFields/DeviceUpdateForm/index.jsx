import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import st from '../style.module.css';

const technologiesList = ["gpon", "dsl"]
const vendorsList = ["huawei", "alcatel", "zte"];
const zonesList = ['22','31/38','34','36','31/38','51','51D','60','63','67','71','73/78','74','73/78','93','95','akhalkalaki','akhaltsikhe','akhmeta','avchala','bakuriani','batumi','bolnisi','borjomi','ckneti','dusheti','gardabani','gori','gurjaani','kabali','kaspi','kazreti','khashuri','khelvachauri','kobuleti','kojori','kutaisi','lilo','marneuli','mtckheta','ninocminda','ponichala','poti','qareli','qvishkheti','rustavi','sachkhere','sagarejo','samtredia','senaki','surami','telavi','tserovani','tskaltubo','tsnori','veliscixe','zestaphoni','zugdidi']
const UpdateUserForm = ({ device, onClickSubmit, disable }) => {
    const [technologies, setTechnologies] = React.useState([]);
    const [vendors, setVendors] = React.useState([]);
    const [zones, setZones] = React.useState([])
    const [deviceFields, setDeviceFields] = React.useState({
        id: null,
        deviceName: "",
        deviceIpaddress: "",
        technology: "",
        vendor: "",
        zone:""
    });
    const updateDeviceItemError = useSelector(state => state.devices.updateDevice.error)
    React.useEffect(() => {
        console.log(device)
        setTechnologies([...technologiesList]);
        // setVendors([...vendorsList])
        if (device) {
            if (device.technology === "gpon") {
                setVendors([...vendorsList.filter(el => el === "huawei" || el === "zte")])
            }
            if (device.technology === "dsl") {
                setVendors([...vendorsList.filter(el => el === "huawei" || el === "alcatel")])
            }
            setDeviceFields({
                id: device.id,
                deviceName: device.deviceName,
                deviceIpaddress: device.deviceIpaddress,
                technology: device.technology,
                vendor: device.vendor,
                zone:device.zone
            })
            // setZones([...zonesList])
        }
    }, []);
    React.useEffect(() => {
        if (deviceFields.technology === "gpon") {
            setVendors([...vendorsList.filter(el => el === "huawei" || el === "zte")])
            setZones([...zonesList])
        }
        if (deviceFields.technology === "dsl") {
            setVendors([...vendorsList.filter(el => el === "huawei" || el === "alcatel")])
        }

    }, [deviceFields.technology]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onClickSubmit && onClickSubmit(deviceFields, { technology: {}, vendor: {}, ipAddress: null, limit: 20, offset: 0 });
        console.log(updateDeviceItemError)
    }
    const handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        console.log(e.target.value, "e.target.value ,", name)
        setDeviceFields(val => ({
            ...val,
            [name]: e.target.value,
        }))
        console.log(deviceFields, "deviceFields deviceFields deviceFields")

    }
    return (
        <>
            <div className={st.formsWrapper}>
                <form onSubmit={handleSubmit}>
                    <label
                        htmlFor="deviceName"
                        className={cn({
                            [st.errorLabels]: updateDeviceItemError && updateDeviceItemError.deviceNameError
                        })}>
                        {updateDeviceItemError && updateDeviceItemError.deviceNameError ? updateDeviceItemError.deviceNameError : "Device Name"}
                    </label>
                    <input
                        className={cn(st.input, {
                            [st.errorFields]: updateDeviceItemError && updateDeviceItemError.deviceNameError
                        })}
                        type="text"
                        id="deviceName"
                        name="deviceName"
                        value={deviceFields.deviceName}
                        onChange={handleChange}
                        placeholder="Device Name" />

                    <label htmlFor="deviceIpAddress"
                        className={cn({
                            [st.errorLabels]: updateDeviceItemError && updateDeviceItemError.deviceIpAddressError
                        })}>I{updateDeviceItemError && updateDeviceItemError.deviceIpAddressError ? updateDeviceItemError.deviceIpAddressError : "Ip Address"}</label>
                    <input
                        className={cn(st.input, {
                            [st.errorFields]: updateDeviceItemError && updateDeviceItemError.deviceIpAddressError
                        })}
                        type="text"
                        id="deviceIpaddress"
                        name="deviceIpaddress"
                        placeholder="Ip Address"
                        value={deviceFields.deviceIpaddress}
                        onChange={handleChange} />

                    <label htmlFor="role">TECHNOLOGY</label>
                    <select className={st.select}
                        name="technology"
                        value={deviceFields.technology}
                        onChange={handleChange}>
                        {technologies && technologies.map(el => (
                            <option
                                key={el}
                                value={el}>
                                {el}
                            </option>))}
                    </select>
                    <label htmlFor="vendor">VENDOR</label>
                    <select
                        className={st.select}
                        id="vendor"
                        name="vendor"
                        value={deviceFields.vendor}
                        onChange={handleChange} >
                        {vendors && vendors.map(el => (
                            <option
                                key={el}
                                value={el}>
                                {el}
                            </option>))}
                    </select>
                   {deviceFields.technology === 'gpon' && <label htmlFor="vendor">ZONE</label>}
                   { deviceFields.technology === 'gpon' && <select
                        className={st.select}
                        id='zone'
                        name='zone'
                        value={deviceFields.zone}
                        onChange={handleChange} >
                        {zones && zones.map(el => (
                            <option
                                key={el}
                                value={el}>
                                {el}
                            </option>))}
                    </select>}

                    <input className={st.submitInput} type="submit" value="Submit" disabled={disable} />
                </form>
            </div>
        </>
    )
}

export default UpdateUserForm;
