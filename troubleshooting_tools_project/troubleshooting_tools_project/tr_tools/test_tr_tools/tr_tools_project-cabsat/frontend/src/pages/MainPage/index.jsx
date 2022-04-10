import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames'
import st from './style.module.css';
import { Link } from 'react-router-dom'
// import { getOltList } from '../../reducers/olt/actions';

const tools = {
    "Commands Trigger Page": "/commandstrigger",
    "USER LOG HISTORY": "/userlogshistory",
}

const MainPage = () => {
    console.log(process.env.REACT_APP_SALT_ID, " #########  process.env.HASH_SALT")
    //const history = useHistory()
    const [disable, setDisable] = useState(false)
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        console.log(auth)
        if (!auth) {
            return setDisable(true)
        } else {
            return setDisable(false)
        }

    }, [auth])
    return (
        <>
            <div className={st.row}>
                <div className={st.wrapp}>
                    <div
                        className={cn(st.box, {
                            [st.disable]: disable
                        })}
                        key={'/logs'} >
                        <Link
                            to={'/logs'}
                            className={st.anchors} >
                            <h4>
                                LOGS History
                            </h4>
                        </Link>
                    </div>
                    {auth.isAuthenticated && (auth.role === "user" || auth.role === "admin") && <div
                        className={cn(st.box, {
                            [st.disable]: disable
                        })}
                        key={auth.role} >
                        <Link
                            to={'/commandstrigger'}
                            className={st.anchors} >
                            <h4>
                                COMMANDS
                            </h4>
                        </Link>
                    </div>}

                    {/* {auth.isAuthenticated&&auth.role === "user"&&Object.keys(tools).map((el,index)=>(
                        <div  
                            className={cn(st.box,{
                                [st.disable]:disable,
                                [st.hidefromguest]: el === "Commands Trigger Page"&&auth.role === "guest",
                            })}
                            key = {index} >
                                <Link 
                                    to = {auth.isAuthenticated&&auth.role ==="Admin" || auth.groupTeam !== "guest"?tools[el]:'/'}
                                    className = {st.anchors} >
                                    <h4>
                                        {el}
                                    </h4>  
                                </Link>
                        </div>))} */}

                    {/* {auth.isAuthenticated&&auth.role === "admin"&&<div  
                            className={cn(st.box,{
                                [st.disable]:disable
                            })} >
                                <Link 
                                    to = {'/commandstrigger'}
                                    className = {st.anchors} >
                                    <h4>
                                    commandstrigger for admin 1
                                    </h4>  
                                </Link>
                        </div>} */}
                    {/* {auth.isAuthenticated&&auth.role === "admin"&&<div  
                            className={cn(st.box,{
                                [st.disable]:disable
                            })}
                            key = {"/administratorpage/logshistory"} >
                                <Link 
                                    to = {'/administratorpage/logshistory'}
                                    className = {st.anchors} >
                                    <h4>
                                        LOGS for admin
                                    </h4>  
                                </Link>
                        </div>} */}
                </div>
            </div>


        </>
    )
}
export default MainPage;