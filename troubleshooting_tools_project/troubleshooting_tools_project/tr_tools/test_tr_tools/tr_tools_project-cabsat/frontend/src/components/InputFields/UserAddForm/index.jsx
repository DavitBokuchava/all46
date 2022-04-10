import React from 'react';
import { useSelector } from 'react-redux';
import { commands } from '../../../commands';
import cn from 'classnames';
import st from '../style.module.css';

const rolesList = ["admin", "user", "guest"]
const groupsList = ["troubleshooters", "offline_troubleshooters", "tshoot_analitics", "local_troubleshooters"]

const AddUserForm = ({ onClickSubmit, disable }) => {
    const [roles, setRoles] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [usersField, setUsersFields] = React.useState({
        username: "",
        password: "",
        role: "user",
        groupTeam: "troubleshooters",
        deviceUsername: "",
        devicePassword: "",
        commands: null,
    });
    const addUserItemError = useSelector(state => state.users.addUser.error)
    const auth = useSelector(state => state.auth)
    React.useEffect(() => {
        if (auth.groupTeam !== 'thoot_analitics') {
            setUsersFields(val => ({
                ...val,
                groupTeam: auth.groupTeam,
                role: "user"
            }))
        }
        setRoles([...rolesList]);
        setGroups([...groupsList])
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onClickSubmit && onClickSubmit(usersField);
        console.log(commands)
    }
    const handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        console.log(e.target.value, "e.target.value ,", name)
        setUsersFields(val => ({
            ...val,
            [name]: e.target.value,
            commands: e.target.value === "guest" || val.role === "guest" ? "" : commands,
            // role: e.target.value === "power_users" || val.groupTeam  === "power_users" ? "guest" : name === "role"?e.target.value:val.role,
            groupTeam: e.target.value === "guest" || val.role === "guest" ? "power_users" : name === "groupTeam" ? e.target.value : val.groupTeam,
        }))
        console.log(usersField, "usersFieldusersFieldusersField")

    }


    return (
        <>
            <div className={st.formsWrapper}>
                <form onSubmit={handleSubmit}>
                    <label
                        htmlFor="username"
                        className={cn({
                            [st.errorLabels]: addUserItemError && addUserItemError.usernameError
                        })}>
                        {addUserItemError && addUserItemError.usernameError ? addUserItemError.usernameError : "Username"}
                    </label>
                    <input
                        className={cn(st.input, {
                            [st.errorFields]: addUserItemError && addUserItemError.usernameError
                        })}
                        type="text"
                        id="username"
                        name="username"
                        value={usersField.username}
                        onChange={handleChange}
                        placeholder="Username" />

                    <label htmlFor="password">Password</label>
                    <input
                        className={st.input}
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={usersField.password}
                        onChange={handleChange} />

                    {auth.groupTeam === "tshoot_analitics" && <label htmlFor="role">ROLE</label>}
                    {auth.groupTeam === "tshoot_analitics" && <select className={st.select}
                        name="role"
                        value={usersField.role}
                        onChange={handleChange}>
                        {roles && roles.map(el => (
                            <option
                                key={el}
                                value={el}>
                                {el}
                            </option>))}
                    </select>}
                    {auth.groupTeam === "tshoot_analitics" && <label htmlFor="groupTeam">GROUP</label>}
                    {auth.groupTeam === "tshoot_analitics" && usersField.role !== "guest" && <select
                        className={st.select}
                        id="groupTeam"
                        name="groupTeam"
                        value={usersField.groupTeam}
                        onChange={handleChange} >
                        {groups && groups.map(el => (
                            <option
                                key={el}
                                value={el}
                                onChange={handleChange}>
                                {el}
                            </option>))}
                    </select>}

                    {usersField.role !== "guest" && <label htmlFor="deviceUser">Password</label>}
                    {usersField.role !== "guest" && <input
                        className={st.input}
                        type="text"
                        id="deviceUser"
                        name="deviceUsername"
                        placeholder="DeviceUsername"
                        value={usersField.deviceUsername}
                        onChange={handleChange} />}
                    {usersField.role !== "guest" && <label htmlFor="devicePassword">Password</label>}
                    {usersField.role !== "guest" && <input
                        className={st.input}
                        type="text"
                        id="devicePassword"
                        name="devicePassword"
                        placeholder="DevicePassword"
                        value={usersField.devicePassword}
                        onChange={handleChange} />}

                    <input className={st.submitInput} type="submit" value="Submit" disabled={disable} />
                </form>
            </div>
        </>
    )
}

export default AddUserForm;
