import React from 'react';
import { useSelector } from 'react-redux';
const UsersDevicesFiltersState = () => {
  const [usersFilters_admin, setUsersFilters_admin] = React.useState({
    userName: "",
    userGroupTeam: {},
    limit: 10,
    page: 0,
  });
  const [devicesFilters_admin, setDevicesFilters_admin] = React.useState({
    technology: {},
    vendor: {},
    ipAddress: "",
    page: 0,
    limit: 10
  });
  const vendors_admin = {
    gpon: ["huawei", "zte"],
    dsl: ["huawei", "alcatel"]
  }
  const technologies_admin = ["gpon", "dsl"]
  const authUsers = useSelector(state => state.auth)
  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      setDevicesFilters_admin(val => ({
        ...val,
        technology: {},
        vendor: {},
        ipAddress: "",
      }))
      return setUsersFilters_admin(val => ({
        ...val,
        userName: "",
        userGroupTeam: {},
      }))
    }
  }, [authUsers.isAuthenticated])
  return {
    technologies_admin,
    vendors_admin,
    devicesFilters_admin,
    setDevicesFilters_admin,
    usersFilters_admin,
    setUsersFilters_admin
  };
}

export default UsersDevicesFiltersState;