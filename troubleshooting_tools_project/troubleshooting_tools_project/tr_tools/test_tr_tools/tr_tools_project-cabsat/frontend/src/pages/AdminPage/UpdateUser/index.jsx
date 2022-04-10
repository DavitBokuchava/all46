import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import UpdateUserForm from '../../../components/InputFields/UserUpdateForm';
import st from '../style.module.css';
import { updateUser } from '../../../reducers/users/actions';
import handleErrorFields from '../../../helperFN/userAddCheckFields';

const UpdateUser = (props) => {
    const [disable, setDisable] = React.useState(false);
    // const history = useHistory();
    const isLoading = useSelector(state => state.users.updateUser.isLoading)
    const permission = useSelector(state => state.auth)

    const dispatch = useDispatch();
    function triggerAction(obj, dispatch, callback) {
        return new Promise((rs, rj) => {
            return rs(dispatch(callback(obj)))
        })
    }
    React.useEffect(() => {
        console.log(props.location.state, "  props.location.stateprops.location.stateprops.location.stateprops.location.state")
    }, [])
    console.log(props.location.state)
    const updateToDB = async (usersField) => {
        try {
            const obj = await handleErrorFields(usersField)
            console.log(obj, "objobjobjobjobj")
            await triggerAction(obj, dispatch, updateUser)
                .then(() => setDisable(true))
        } catch (error) {
            console.log(error)
            setDisable(false)
            alert(error)
        }
    }
    React.useEffect(() => {
        if (!isLoading) {
            setDisable(false)
        }
        console.log(isLoading, disable, "############## output.output none true")
    }, [isLoading])
    return (
        <>  <div className={st.root} >
            <div>
                <UpdateUserForm
                    user={props.location.state}
                    onClickSubmit={updateToDB}
                    disable={disable}
                />
            </div>
        </div>


        </>
    )
}
export default UpdateUser;
