import React from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { FiltersState } from './context/filtersState';
import Filters from './filtersState/LogsFilters';
import VendorTechnologiesFilterState from './filtersState/VendorsTechnologiesFilterState';
import CommandsTriggerPage from './pages/CommandsTriggerPage';
import MainPage from './pages/MainPage';
// import Mobile from './pages/Mobile';
import UsersDevicesFiltersState from './filtersState/AdminFilters';
import Menu from './components/MenuHeader';
import PrivateRoute from './privateRoutes/UserPrivateRoute';
import AdminPrivateRoute from './privateRoutes/AdminPrivateRoute';
import Logs from './pages/Logs'
import AdminPage from './pages/AdminPage'
import UsersFilters from './filtersState/UsersFilters';
import DevicesFilters from './filtersState/DevicesFilterState';
import CommandstriggerState from './filtersState/CommandstriggerState'; // it was added in 13/09/2021

function App() {
  // const history = useHistory()
  const location = useLocation();
  const {
    technologies_admin,
    vendors_admin,
    devicesFilters_admin,
    setDevicesFilters_admin,
    usersFilters_admin,
    setUsersFilters_admin, } = UsersDevicesFiltersState();
  const {
    selectionOptions,
    deviceFields,
    setDeviceFields,
    currentCommand,
    setCurrentCommand,
    commandsList,
    setCommandsList,
    selectionCabsatOptions,
    zonesList,
    fieldError, 
		setFieldError,
  } = CommandstriggerState(); // it was added in 13/09/2021
  const { logsFilters, setLogsFilters } = Filters();
  const { vendors, technologies } = VendorTechnologiesFilterState()
  const { usersFilters, setUsersFilters } = UsersFilters()
  const { devicesFilters, setDevicesFilters } = DevicesFilters()
  console.log(logsFilters, " ========== FiltersFiltersFilters in APP.js")
  console.log(location, "location")
  return (
    <>
      <FiltersState.Provider
        value={
          {
            logsFilters: { logsFilters, setLogsFilters },
            usersFiltersState: { usersFilters, setUsersFilters },
            devicesFiltersState: { devicesFilters, setDevicesFilters },
            vendorTechnologiesFilterState: { vendors, technologies },
            usersDevicesFilters: {
              technologies_admin,
              vendors_admin,
              devicesFilters_admin,
              setDevicesFilters_admin,
              usersFilters_admin,
              setUsersFilters_admin
            },
            commandstriggerState: { // it was added in 13/09/2021
              selectionOptions,
              deviceFields,
              setDeviceFields,
              currentCommand,
              setCurrentCommand,
              commandsList,
              setCommandsList,
              selectionCabsatOptions,
              zonesList,
              fieldError, 
              setFieldError,
            }
          }}>
        <Menu path={location.pathname} />
        <Switch>
          <Route path='/' exact component={MainPage} />
          <PrivateRoute path='/commandstrigger' component={CommandsTriggerPage} />
          <PrivateRoute path='/logs' component={Logs} />
          <AdminPrivateRoute path='/administratorpage' component={AdminPage} />
          <Route render={() => (
            <Redirect to='/' />)} />
        </Switch>
        <NotificationContainer />
      </FiltersState.Provider>
    </>
  )
}

export default App;
