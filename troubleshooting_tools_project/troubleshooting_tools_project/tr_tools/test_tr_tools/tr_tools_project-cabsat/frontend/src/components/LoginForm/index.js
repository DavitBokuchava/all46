import React from 'react';

import {NotificationManager} from 'react-notifications';
import cn from 'classnames';
import st from './style.module.css';


const LoginForm = ({ onSubmit, auth }) => {
    const [login, setLogin] = React.useState({
        username: "",
        password: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            username: login.username,
            password: login.password
        });
        setLogin({
            username: "",
            password: "",
        })
    }
    function alertError(message) {
        alert(message)
    }
    React.useEffect(()=>{
        if(auth.error&&auth.error.usernameError){
            // console.log(auth.error,"user.erroruser.erroruser.error")
            auth.isLoading&&auth.error&&NotificationManager.error(auth.error.usernameError)
         }
    },[])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={st.root}>
                    <input value={login.username} type="username" className={st.input} required onChange={(e) => setLogin(val => ({ ...val, username: e.target.value }))} />
                    <span className={cn(st.highlight)}></span>
                    <span className={cn(st.bar)}></span>
                    <label className={cn(st.label)}>
                        User
                    </label>
                </div>
                <div className={st.root}>
                    <input value={login.password} type="password" className={st.input} required onChange={(e) => setLogin(val => ({ ...val, password: e.target.value }))} />
                    <span className={cn(st.highlight)}></span>
                    <span className={cn(st.bar)}></span>
                    <label
                        className={cn(st.label)}>
                        Password</label>
                </div>
                <button
                    className={st.button}
                    type='onsubmit'>
                    Login
                </button>

            </form>
        </>
    )
}

export default LoginForm;