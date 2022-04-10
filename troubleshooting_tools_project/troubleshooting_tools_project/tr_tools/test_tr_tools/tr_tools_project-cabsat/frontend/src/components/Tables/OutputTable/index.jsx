import React from 'react';


const OutputTable = () => {
    return (
        <>
            <table className={st.table}>
                <thead className={st.thead} >
                    <tr className={st.tr}>
                        <th className={st.th}>Session</th>
                        <th className={st.th}>User</th>
                        <th className={st.th}>Team</th>
                        <th className={st.th}>Customer</th>
                        <th className={st.th}>Mobile-number</th>
                        <th className={st.th}>Command</th>
                        <th className={st.th}>Technology</th>
                        <th className={st.th}>Vendor</th>
                        <th className={st.th}>Device</th>
                        <th className={st.th}>Device ip address</th>
                        <th className={st.th}>Position</th>
                        <th className={st.th} style={{ width: "300px" }}>Output</th>
                        <th className={st.th}>Date</th>
                        <th className={st.th}>Time</th>
                    </tr>
                </thead>
                <tbody className={st.tbody}>
                    {logData.length > 0 && logs.map(el => (
                        <tr className={st.tr} key={el.Id}>
                            <td className={st.td}>{el.sessionId}</td>
                            <td className={st.td}>{el.userName}</td>
                            <td className={st.td}>{el.groupTeam}</td>
                            <td className={st.td}>{el.customerId}</td>
                            <td className={st.td}>{el.mobNumber}</td>
                            <td className={st.td}>{el.command}</td>
                            <td className={st.td}>{el.technology}</td>
                            <td className={st.td}>{el.vendor}</td>
                            <td className={st.td}>{el.device}</td>
                            <td className={st.td}>{el.ipAddress}</td>
                            <td className={st.td}>{el.position}</td>
                            <td className={st.td} style={{ width: "300px" }}>{el.output}</td>
                            <td className={st.td}>{el.dateTime.split("T")[0]}</td>
                            <td className={st.td}>{el.dateTime.split("T")[1].split(".")[0]}</td>
                        </tr>))}
                </tbody>

            </table>
        </>
    )
}