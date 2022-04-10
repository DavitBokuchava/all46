import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AddUserForm from '../../../components/InputFields/UserAddForm';
import { addUser } from '../../../reducers/users/actions';
import handleErrorFields from '../../../helperFN/userAddCheckFields';
import st from './style.module.css';

const AddUsers = () => {
    const [disable, setDisable] = React.useState(false);
    const isLoading = useSelector(state => state.users.addUser.isLoading)
    const permission = useSelector(state => state.auth)
    const dispatch = useDispatch();
    function triggerAction(obj, dispatch, callback) {
        return new Promise((rs, rj) => {
            return rs(dispatch(callback(obj)))
        })
    }

    const addUserToDB = async (usersField) => {
        try {
            const obj = await handleErrorFields(usersField)
            console.log(obj, "objobjobjobjobj")
            await triggerAction(obj, dispatch, addUser)
                .then(() => setDisable(true))
        } catch (error) {
            console.log(error)
            setDisable(false)
            alert(error)
        } finally {
            setDisable(false)
        }
    }
    React.useEffect(() => {
        if (!isLoading) {
            setDisable(false)
        }
        console.log(isLoading, disable, "############## output.output none true")
    }, [isLoading])
    return (
        <>
            <div className={st.root} >
                {permission.groupTeam === 'tshoot_analitics' && <AddUserForm
                    onClickSubmit={addUserToDB}
                    disable={disable}
                />}
            </div>


        </>
    )
}
export default AddUsers;
