import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import st from '../style.module.css';
import { commands } from '../../../commands'

const rolesList = ["admin", "user", "guest"]
const groupsList = ["troubleshooters", "offline_troubleshooters", "tshoot_analitics", "local_troubleshooters"];
const UpdateUserForm = ({ user, onClickSubmit, disable }) => {
    const match = useRouteMatch();
    const [roles, setRoles] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [usersField, setUsersFields] = React.useState({
        id: null,
        username: "",
        password: "",
        role: "",
        groupTeam: "",
        deviceUsername: "",
        devicePassword: "",
        commands: "",
        block: "",
    });
    const updatedUser = useSelector(state => state.users.updateUser);
    const auth = useSelector(state => state.auth);

    React.useEffect(() => {

        setRoles([...rolesList]);
        setGroups([...groupsList])

        if (user) {
            setUsersFields({
                id: user.id,
                username: user.username,
                password: user.password,
                role: user.role,
                groupTeam: user.groupTeam,
                deviceUsername: user.deviceUsername,
                devicePassword: user.devicePassword,
                commands: user.role !== "guest" ? commands : "",  // it is done temporally , it would be user.commands
                block: user.block,
            })
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onClickSubmit && onClickSubmit(usersField)
        console.log(match.state, "statestatestatev")
    }
    const handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        console.log(e.target.value, "e.target.value ,", name)
        setUsersFields(val => ({
            ...val,
            [name]: e.target.value,
            commands: e.target.value === "power_users" || e.target.value === "guest" || val.groupTeam === "power_users" || val.role === "guest" ? "" : commands,
            // role: e.target.value === "power_users" || val.groupTeam  === "power_users" ? "guest" : name === "role"?e.target.value:val.role,
            groupTeam: e.target.value === "guest" || val.role === "guest" ? "power_users" : name === "groupTeam" ? e.target.value : val.groupTeam,
        }))
        console.log(usersField, "usersFieldusersFieldusersField")

    }
    return (
        <>
            <div className={st.formsWrapper}>
                {user && user.id && <form onSubmit={handleSubmit}>
                    <label
                        htmlFor="username"
                        className={cn({
                            [st.errorLabels]: updatedUser.error && updatedUser.error.usernameError
                        })}
                    >{updatedUser.error ? updatedUser.error.usernameError : "Username"}</label>
                    <input
                        className={cn(st.input, {
                            [st.errorFields]: updatedUser.error && updatedUser.error.usernameError
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

                    {usersField.role !== "guest" && auth.groupTeam === "tshoot_analitics" && <label htmlFor="deviceUser">Username device</label>}
                    {usersField.role !== "guest" && auth.groupTeam === "tshoot_analitics" && <input
                        className={st.input}
                        type="text"
                        id="deviceUser"
                        name="deviceUsername"
                        placeholder="DeviceUsername"
                        value={usersField.deviceUsername}
                        onChange={handleChange} />}
                    {usersField.role !== "guest" && auth.groupTeam === "tshoot_analitics" && <label htmlFor="devicePassword">Password Device</label>}
                    {usersField.role !== "guest" && auth.groupTeam === "tshoot_analitics" && <input
                        className={st.input}
                        type="text"
                        id="devicePassword"
                        name="devicePassword"
                        placeholder="DevicePassword"
                        value={usersField.devicePassword}
                        onChange={handleChange} />}

                    <input className={st.submitInput} type="submit" value="Submit" disabled={disable} />
                </form>}
            </div>
        </>
    )
}

export default UpdateUserForm;
