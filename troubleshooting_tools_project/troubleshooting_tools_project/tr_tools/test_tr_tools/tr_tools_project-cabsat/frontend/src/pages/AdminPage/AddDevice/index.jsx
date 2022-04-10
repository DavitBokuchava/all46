import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDevice } from '../../../reducers/devices/actions';
import AddDeviceFields from '../../../components/InputFields/DeviceAddForm';
import handleErrorFields from '../../../helperFN/deviceAddUpdateCheckFields'
import st from '../style.module.css'

const AddDevices = () => {
    const [disable, setDisable] = React.useState(false);
    const permission = useSelector(state => state.auth)
    const dispatch = useDispatch();
    function triggerAction(obj, dispatch, callback) {
        return new Promise((rs, rj) => {
            return rs(dispatch(callback(obj)))
        })
    }

    const addDeviceToDb = async (deviceFields) => {
        try {
            const obj = await handleErrorFields(deviceFields)
            // console.log(obj, "objobjobjobjobj")
            await triggerAction(obj, dispatch, addDevice)
                .then(() => setDisable(true))
        } catch (error) {
            console.log(error)
            // setDisable(false)
            alert(error)
        } finally {
            setDisable(false)
        }
    }
    return (
        <>
            <div className={st.root}>
                {permission.groupTeam === 'tshoot_analitics' && <AddDeviceFields
                    onClickSubmit={addDeviceToDb}
                    disable={disable}
                />}
            </div>

        </>
    )
}
export default AddDevices;