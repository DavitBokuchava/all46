import React from 'react';
import {
    useRouteMatch,
    Route,
    Switch,
    Redirect, useLocation
} from 'react-router-dom';
import Users from './Users';
import Devices from './Devices';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import AddDevice from './AddDevice';
import UpdateDevice from './UpdateDevice';

const AdminPage = () => {
    const match = useRouteMatch();
    

    console.log(match.path, " match.path match.path match.path ", useLocation().pathname, "useLocation().pathnameuseLocation().pathname")
    return (
        <>
            <Switch>
                <Route path={`${match.path}/`} exact component={Users} />
                <Route path={`${match.path}/devices`} component={Devices} />
                <Route path={`${match.path}/adddevice`} component={AddDevice} />
                <Route path={`${match.path}/updatedevice`} component={UpdateDevice} />
                <Route path={`${match.path}/users/adduser`} component={AddUser} />
                <Route path={`${match.path}/users/updateuser`} component={UpdateUser} />
                <Route render={() => (
                    <Redirect to='/administratorpage' />)} />
            </Switch>
        </>
    );
};
export default AdminPage;