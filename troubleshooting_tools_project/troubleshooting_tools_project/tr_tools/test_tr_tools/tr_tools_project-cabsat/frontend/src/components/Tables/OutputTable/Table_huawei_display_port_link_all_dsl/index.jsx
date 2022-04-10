import React from 'react';
import st from '../style.module.css'


const TableHuaweiDisplayPortLinkAllDsl = (props) => {
    const { output, command } = props;
    const [data, setData] = React.useState([]);
    const [err, setErr] = React.useState(null)
    console.log(command, output, " command in CLI");

    React.useEffect(() => {
        if (output.indexOf('Communication error occured with OLT(IP)') === -1 && output.indexOf('Incorrect') === -1 && output.indexOf('Failure') === -1 && output.indexOf('Invalid Frame Or Board Or Slot') === -1 && output.indexOf('Invalid') === -1) {
            setData([])
            setErr(null)
            output && output.split("\n").map((line, index) => {
                if (index > 4 && index < 37) {
                    return setData(val => ([...val, line]))
                }
            })
        } else {
            setErr(output)
        }
    }, [output]);
    React.useEffect(() => {
        // console.log(output && output.split("\n")[4], parseInt(output.split("\n")[4].split(' ')[6], 10), ": Online ", output && output.split("\n")[2], "command, output")
        console.log(output, "outputoutputoutputoutputoutput")
    }, [])

    // React.useEffect(() => {
    //     console.log(output && output.split("\n")[4], parseInt(output.split("\n")[4].split(' ')[6], 10), ": Online ", output && output.split("\n")[2], "command, output")
    // }, [])
    // Port Status Line_Profile Alm_Profile Ext_Profile Power_Mode
    return (
        <>

            {output.indexOf('Communication error occured with OLT(IP)') === -1 && output.indexOf('Incorrect') === -1 && output.indexOf('Failure') === -1 && output.indexOf('Invalid Frame Or Board Or Slot') === -1 && output.indexOf('Invalid') === -1 ? <div>
                {/* <div>
                    {command}
                </div> */}
                <div>
                    {output && output.split("\n")[1]}

                </div>
                <div>
                    {output && output.split("\n")[2]}

                </div>
                <div>
                    {output && output.split("\n")[38]}

                </div>
                <div>
                    {output && output.split("\n")[39]}

                </div>
                <table className={st.table}>

                    <thead >
                        <tr className={st.tr}>
                            <th className={st.th}>Port</th>
                            <th className={st.th}>Status</th>
                            <th className={st.th}>Line_Profile</th>
                            <th className={st.th}>Alm_Profile</th>
                            <th className={st.th}>Ext_Profile</th>
                            <th className={st.th}>Power_Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 && data.map(el => {
                            return el.split(" ").filter(el => !!el)
                        }).map((el, index) => (
                            <tr className={st.tr} key={index}>
                                <td className={st.td}>{el[0]}</td>
                                <td className={st.td}>{el[1]}</td>
                                <td className={st.td}>{el[2]}</td>
                                <td className={st.td}>{el[3]}</td>
                                <td className={st.td}>{el[4]}</td>
                                <td className={st.td}>{el[5]}</td>
                            </tr>))}
                    </tbody>

                </table>

            </div> : <div>
                {/* <div>
                    {command}
                </div> */}
                {err && err.split("\n").map((line, index) => <p key={index}>{line}</p>)}
            </div>}


        </>
    )
}
export default TableHuaweiDisplayPortLinkAllDsl;
