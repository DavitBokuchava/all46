
import React, { useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import LoginForm from '../LoginForm'
import Navbar from './Navbar';
import { login, auth, logout } from '../../reducers/auth/action'


const MenuHeader = ({ path }) => {
    const [isOpenModal, setOpenModal] = React.useState(null);
    const [sendRequest, setSendRequest] = React.useState(null);
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)
    // const {isAuthenticated} = useSelector(state=>state.auth.isAuthenticated)
    const { isAuthenticated, isLoading } = useSelector(state => state.auth)

    const history = useHistory();

    useEffect(() => {
        console.log(history, "  #################################   history ")
        if (!isAuthenticated) {
            dispatch(auth());
            return setSendRequest(true)
        } else {
            return history.push(path)
        }
    }, [isAuthenticated])
    const handleClickLogin = () => {
        return setOpenModal(prv => !prv);
    }
    const handleClickLogout = () => {
        setOpenModal(prv => !prv);
        return dispatch(logout());
    }
    // console.log(user)
    // React.useEffect(()=>{
    //   if(!isAuthenticated && !isLoading){
    //    setOpenModal(prv=> !prv);
    //   }
    // },[isAuthenticated,isLoading]) 
    /// I need LOADER COMPONENT !!!!!!!!!!!!!!
    // React.useEffect(()=>{
    //     if(!user.success){
    //         console.log(user.error,"user.erroruser.erroruser.error")
    //         user.error&&NotificationManager.error(user.error&&user.error.usernameErr)
    //      }
    // },[user.error])
    // if(!user.success&&){
    //     NotificationManager.error(user.error&&user.error.usernameErr,"Error")
    //  }
    console.log(user, isOpenModal, "useruseruser  isOpenModal")
    const handleSubmitValue = ({ username, password }) => {
        dispatch(login(username, password));
        setSendRequest(true)
        setOpenModal(false)
    }

    function getErrorMessage(obj) {
        let newObj = null;
        if (obj) {
            Object.keys(obj).map(el => {
                if (obj[el]) {
                    return newObj = {
                        [el]: obj[el]
                    }
                }
            })
        }
        return newObj

    }
    // React.useEffect(()=>{
    //     if(user.error){
    //         if(user.error&&user.error.usernameError){
    //             NotificationManager.error(user.error.usernameError)
    //         }
    //         if(user.error&&user.error.passwordError){
    //             NotificationManager.error(user.error.passwordError)
    //         }

    //     }
    //     if(user.isAuthenticated){
    //         NotificationManager.success('Successsfully Authenticated')
    //     }
    //     return setSendRequest(false)
    // },[user])
    React.useEffect(() => {
        let error = getErrorMessage(user.error)
        if (sendRequest&&!user.isLoading) {
            
            if (error) {
                console.log("avoeee")
                NotificationManager.error(Object.values(error)[0])
            }
            if(user.success){
                NotificationManager.success('Successsfully Authenticated')
            }
            // if (user.success) {
            //     NotificationManager.success('Successsfully Authenticated')
            // }
            return setSendRequest(false)
        }
        
    }, [user])


    return (
        <>

            <Navbar
                isOpenModal={isOpenModal}
                onClickLogin={handleClickLogin}
                handleClickLogout={handleClickLogout} />
            <Modal
                onClickLogin={handleClickLogin}
                isOpenModal={isOpenModal}
                setOpenModal={setOpenModal} >
                <LoginForm
                    onSubmit={handleSubmitValue}
                    auth={user}
                />
            </Modal>
            {/* <div className={st.menuWrap}>
                        <Link
                            to = '/logs'
                            key={'/logs'}
                            className={cn(st.menuLink, {
                                [st.activeLink]: '/logs' === location.pathname,
                            })}>
                            History
                        </Link>
                        {auth.role ==="admin"&&<Link
                            to = '/administratorpage/devices'
                            key={'/administratorpage/devices'}
                            className={cn(st.menuLink, {
                                [st.activeLink]: '/administratorpage/devices' === location.pathname,
                            })}>
                            Devices
                        </Link>}
                        {auth.role ==="admin"&&<Link
                            to = '/administratorpage/'
                            key={'/administratorpage/'}
                            className={cn(st.menuLink, {
                                [st.activeLink]: '/administratorpage/' === location.pathname,
                            })}>
                            Users
                        </Link>}
                    </div> */}

        </>
    )
}

export default MenuHeader;


// async function handleDispatch(callback,login,...arg){
//    return new Promise((rj,rs)=>{
//       rs(callback(login(...arg)))
//    });
// } 
// console.log(user,isOpenModal,"useruseruser  isOpenModal beforerrerere")
// const handleSubmitValue = async({username,password})=>{
//   try{ 
//      await handleDispatch(dispatch,login,username,password);
//       await user.isAuthenticated&&setOpenModal(false)
//       console.log(isOpenModal)
//    }catch(err){
//       console.log(err,"AUTH ERRORR")
//    };
// }