import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as LoginSVG } from '../assets/enter.svg'
import { ReactComponent as LogoutSVG } from '../assets/logout.svg'
import cn from 'classnames';
import st from './style.module.css';

const menu = {
    'Devices': '/administratorpage/devices',
    'Users': '/administratorpage/',
    'History': '/history',
}
const HISTORY = {
    "History": "/history"
}

const Navbar = ({ onClickLogin, handleClickLogout }) => {
    const location = useLocation()
    const auth = useSelector(state => state.auth)
    const handleClick = () => {
        onClickLogin && onClickLogin(false)
    }
    const logout = () => {
        handleClickLogout && handleClickLogout()
    }

    return (
        <>
            <nav className={
                cn(st.root, {
                    [st.bgActive]: true
                })}>
                <div className={st.navWrapper}>
                    <div
                        className={st.brand}

                    >
                        <Link className={cn(st.menuLink, {
                            [st.activeLink]: location.pathname === '/',
                        })} to='/'> TOOLS</Link>
                    </div>
                    {/*   {auth.role ==="admin"&&<div className={st.menuWrap}>
                        {Object.keys(menu).filter(a=> a === 'Devices'?auth.groupTeam ==="tshoot_analitics"&&a:a).map((el,index) => (
                            <Link
                            to = {menu[el]}
                            key={index}
                            className={cn(st.menuLink, {
                                [st.activeLink]: menu[el] === location.pathname,
                            })}>
                            {el}
                            </Link>
                        ))}
                    </div>}
                    {(auth.role === "user" || auth.role === "guest") && (<div className={st.menuWrap}>
                            <Link
                            to = {"/history"}
                            key={"index"}
                            className={cn(st.menuLink, {
                                [st.activeLink]: menu["History"] === location.pathname,
                            })}>
                            History
                            </Link>
                    </div>)}
                     */}
                    <div className={st.menuWrap}>
                        <Link
                            to='/logs'
                            key={'/logs'}
                            className={cn(st.menuLink, {
                                [st.activeLink]: '/logs' === location.pathname,
                            })}>
                            History
                        </Link>
                        {auth.role === "admin" && <Link
                            to='/administratorpage/devices'
                            key={'/administratorpage/devices'}
                            className={cn(st.menuLink, {
                                [st.activeLink]: '/administratorpage/devices' === location.pathname,
                            })}>
                            Devices
                        </Link>}
                        {auth.role === "admin" && <Link
                            to='/administratorpage/'
                            key={'/administratorpage/'}
                            className={cn(st.menuLink, {
                                [st.activeLink]: '/administratorpage/' === location.pathname,
                            })}>
                            Users
                        </Link>}
                    </div>
                    <div className={st.rightSide}>
                        {auth.isAuthenticated && <div className={st.loginAndMenu}>
                            <div className={st.chipWrapper}>
                                <div className={st.chipWrap} >
                                    <div className={st.avatar}>
                                        {auth.role && auth.role[0].toUpperCase()}
                                    </div>
                                    <span className={st.userNameSpan}>
                                        {auth.username}
                                    </span>
                                </div>
                            </div>

                        </div>}
                        <div className={st.loginAndMenu}>
                            {!auth.isAuthenticated && <div className={st.loginWrap}
                                onClick={handleClick} >
                                <LoginSVG />
                            </div>}

                            {auth.isAuthenticated && <div className={st.loginWrap}
                                onClick={logout} >
                                <LogoutSVG />
                            </div>}


                        </div>
                    </div>

                </div>
            </nav>
        </>
    )
}
export default Navbar;
