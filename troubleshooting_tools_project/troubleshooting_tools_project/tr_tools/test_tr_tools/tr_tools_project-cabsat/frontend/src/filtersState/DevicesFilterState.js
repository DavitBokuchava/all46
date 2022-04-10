import React from 'react';
import { useSelector } from 'react-redux';
const DevicesFiltersState = () => {
  const [devicesFilters, setDevicesFilters] = React.useState({
    technology: {},
    vendor: {},
    ipAddress: "",
    page: 0,
    limit: 10
  });
  const authUsers = useSelector(state => state.auth)
  React.useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem('token')).token,"JSON.parse(localStorage.getItem")
    if (!localStorage.getItem('token')) {
      // console.log(JSON.parse(localStorage.getItem('token')).token,"JSON.parse(localStorage.getItem INNNN")
      return setDevicesFilters({
        technology: {},
        vendor: {},
        ipAddress: "",
        page: 0,
        limit: 10
      })
      
    }
  }, [authUsers.isLoading])

  return {
    devicesFilters,
    setDevicesFilters
  };
}

export default DevicesFiltersState;