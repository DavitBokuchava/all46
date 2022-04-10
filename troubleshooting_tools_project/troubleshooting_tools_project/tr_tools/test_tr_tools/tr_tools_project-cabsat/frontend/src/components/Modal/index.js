import React from 'react'
import { useSelector } from 'react-redux';
import cn from 'classnames';
import st from './style.module.css';

const Modal = ({ children, onClickLogin, isOpenModal, setOpenModal }) => {
    const auth = useSelector(state => state.auth)
    const modalEL = React.useRef();
    const handleCloseModal = () => {
        onClickLogin && onClickLogin(false)
    }
    const handleElement = (e) => {
        if (!modalEL.current.contains(e.target)) {
            return handleCloseModal(false)
        }
    }
    // React.useEffect(()=>{
    //     if(!auth.isAuthenticated){
    //         console.log(isOpenModal,"############  isOpenModal",auth.isAuthenticated)
    //         setOpenModal(false)
    //     }
    // },[auth.isAuthenticated])
    // React.useEffect(()=>{
    //     return isOpenModal ? "hidden" : null
    // },[isOpenModal])
    React.useEffect(() => {
        return document.querySelector('body').style.overflow = isOpenModal ? "hidden" : null
    }, [isOpenModal])
    //onClick = {handleElement}
    return (
        <div className={cn(st.root, { [st.open]: isOpenModal })}
            onClick={handleElement}>
            <div
                className={st.modal}
                ref={modalEL}
            >
                <div
                    className={st.head} >
                    Login
                    <span
                        className={st.btnClose}
                        onClick={handleCloseModal}>

                    </span>
                </div>
                <div
                    className={st.content}
                    auth={auth} >
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Modal;