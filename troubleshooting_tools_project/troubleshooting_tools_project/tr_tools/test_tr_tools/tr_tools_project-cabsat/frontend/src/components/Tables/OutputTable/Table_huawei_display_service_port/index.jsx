import React from 'react';
import st from '../style.module.css'


const TableHuaweiDisplayServicePort = (props) => {
    const { output, command } = props;
    const [data, setData] = React.useState([]);
    const [err, setErr] = React.useState(null)
    console.log(command, output, " command in CLI");

    React.useEffect(() => {
        if (output.indexOf('Communication error occured with OLT(IP)') === -1 && output.indexOf('Incorrect') === -1 && output.indexOf('Failure') === -1 && output.indexOf('The ONT is not online') === -1) {
            setData([])
            setErr(null)
            output && output.split("\n").map((line, index) => {
                if (index > 6 && index < output.split("\n").length - 1) {
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
    return (
        <>
            {output.indexOf('Communication error occured with OLT(IP)') === -1 && output.indexOf('Incorrect') === -1 && output.indexOf('Failure') === -1 && output.indexOf('The ONT is not online') === -1 ? <div>
                {/* <div>
                    {command}
                </div> */}
                <div>
                    {output && output.split("\n")[2]}

                </div>
                <table className={st.table}>

                    <thead >
                        <tr className={st.tr}>
                            <th className={st.th}>INDEX</th>
                            <th className={st.th}>VLAN ID</th>
                            <th className={st.th}>VLAN ATTR</th>
                            <th className={st.th}>PORT TYPE</th>
                            <th className={st.th}>FRAME</th>
                            <th className={st.th}>SLOT</th>
                            <th className={st.th}>PORT</th>
                            <th className={st.th}>VPI</th>
                            <th className={st.th}>VCI</th>
                            <th className={st.th}>FLOW TYPE</th>
                            <th className={st.th}>FLOW PARA</th>
                            <th className={st.th}>RX</th>
                            <th className={st.th}>TX</th>
                            <th className={st.th}>STATE</th>
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
                                <td className={st.td}>{el[4].split('/')[0]}</td>
                                <td className={st.td}>{el[4].split('/')[1]}</td>
                                <td className={st.td}>{el[5].split('/')[1] || el[4].split('/')[2]}</td>
                                <td className={st.td}>{el[6]}</td>
                                <td className={st.td}>{el[7]}</td>
                                <td className={st.td}>{el[8]}</td>
                                <td className={st.td}>{el[9]}</td>
                                <td className={st.td}>{el[10]}</td>
                                <td className={st.td}>{el[11]}</td>
                                <td className={st.td}>{el[12]}</td>
                            </tr>))}
                    </tbody>

                </table>
            </div> : <div>
                {/* <div>
                    {command}
                </div> */}
                {err&&err.split("\n").map((line, index) => <p key={index}>{line}</p>)}
            </div>}


        </>
    )
}
export default TableHuaweiDisplayServicePort;
