import React from 'react';
import { useSelector } from 'react-redux';
const UsersFiltersState = () => {
  const [usersFilters, setUsersFilters] = React.useState({
    userName: "",
    userGroupTeam: {}
  });
  const authUsers = useSelector(state => state.auth)
  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      return setUsersFilters({
        userName: "",
        userGroupTeam: {}
      })
    }
  }, [authUsers.isLoading])
  return {
    usersFilters,
    setUsersFilters
  };
}

export default UsersFiltersState;