import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector} from 'react-redux';

const PrivateRoute = ({component:Component,...rest})=>{
    const auth = useSelector(state=>state.auth)
    console.log(rest,"restrestrestrestrestrestrest")
    return (
        <>
            {/* {auth.isLoading&&auth.isAuthenticated ===false&&<div style={{textAlign:"center",marginTop:"200px"}}>REFRESH...</div>} */}
            {/* {!auth.isLoading&&auth.isAuthenticated&& */}
            <Route
                {...rest}
                render={ props=>
                    localStorage.getItem('token')?
                        <Component 
                            {...props} /> : <Redirect to = '/'/>
                    }
                
            />
            {/* } */}
        </>
    )
}
export default PrivateRoute;
// import { getOltList } from '../../reducers/olt/actions';
// useEffect(()=>{
    //     if(location.pathname === '/showcommands'){
    //         dispatch(getOltList())
    //         console.log("avoeee")
    //     }
        
    // },[location.pathname])
    // useEffect(()=>{
        
    //         dispatch(getOltList())
    //         console.log("avoeee")
       
        
    // },[])