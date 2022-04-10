import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDevice } from '../../../reducers/devices/actions';
import handleErrorFields from '../../../helperFN/deviceAddUpdateCheckFields'
import DeviceUpdateForm from '../../../components/InputFields/DeviceUpdateForm';
import st from '../style.module.css'

const UpdateDevice = (props) => {
    const [disable, setDisable] = React.useState(false);
    const permission = useSelector(state => state.auth)
    const dispatch = useDispatch();
    function triggerAction(obj, dispatch, callback) {
        return new Promise((rs, rj) => {
            return rs(dispatch(callback(obj)))
        })
    }

    const updateDeviceToDb = async (deviceFields) => {
        try {
            const obj = await handleErrorFields(deviceFields)
            console.log(obj, "objobjobjobjobj")
            await triggerAction(obj, dispatch, updateDevice)
                .then(() => setDisable(true))
        } catch (error) {
            console.log(error)
            setDisable(false)
            alert(error)
        } finally {
            setDisable(false)
        }
    }
    return (
        <>
            <div className={st.root}>
                {permission.groupTeam === 'tshoot_analitics' && <DeviceUpdateForm
                    device={props.location.state}
                    onClickSubmit={updateDeviceToDb}
                    disable={disable}
                />}
            </div>


        </>
    )
}
export default UpdateDevice;