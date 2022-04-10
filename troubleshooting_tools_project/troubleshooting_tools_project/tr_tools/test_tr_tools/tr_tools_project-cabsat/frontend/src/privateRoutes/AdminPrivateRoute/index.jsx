import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
    const { isLoading } = useSelector(state => state.auth.isLoading)

    return (
        <>
            {isLoading && <div style={{ textAlign: "center", marginTop: "200px" }}>REFRESH...</div>}
            {!isLoading && <Route
                {...rest}
                render={props =>
                    localStorage.getItem('token') && JSON.parse(localStorage.getItem('token')).role ?
                        <Component
                            {...props} /> : <Redirect to='/' />
                }

            />}
        </>
    )
}
export default PrivateRouteAdmin;
// const [bool,setBool] =React.useState(false)
      // React.useEffect(()=>{
    //    // console.log(history,"  #################################   history ")
    //     if(!isAuthenticated){
    //        dispatch(auth());
    //     }

    //     // return refresh&&history.push(path)
    //  },[isAuthenticated])

/*
import { auth } from '../../reducers/auth/action'
const location = useLocation()
  const dispatch = useDispatch()
*/