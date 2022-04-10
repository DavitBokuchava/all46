import React from 'react';
import st from '../style.module.css'


const TableHuaweiDisplayOntPortAttribute = (props) => {
    const { output, command } = props;
    const [data, setData] = React.useState([]);
    const [err, setErr] = React.useState(null)
    const [onts, setOntsSum] = React.useState(0);
    console.log(command, output, " command in CLI");

    React.useEffect(() => {
        // (command === 'huawei_display_ont_port_attribute' ? 1 : 4)

        if (output.indexOf('Communication error occured with OLT(IP)') === -1 && output.indexOf('Incorrect') === -1 && output.indexOf('Failure') === -1) {
            setData([])
            // const from =  command === 'huawei_display_ont_port_attribute' ? 4 : 5
            console.log(output, output.split('\n')[3],"outputoutputoutputoutputoutputoutputoutput ATTR")
            output && output.split("\n").filter(el => el && el.indexOf('----------------------------------------------------------------------------') === -1).filter(a => !!a.replace(/\s/g, "")).map((line, index) => {
                if (index > 2 && index <  output.split("\n").length - 1) {
                    return setData(val => ([...val, line]))
                }
                return setErr(null)
            })
        } else {
            setErr(output)
            return setData([])
        }
    }, [output]);

    React.useEffect(() => {
        // console.log(output && output.split("\n")[4], parseInt(output.split("\n")[4].split(' ')[6], 10), ": Online ", output && output.split("\n")[2], "command, output")
        console.log(output, "outputoutputoutputoutputoutput")
    }, [])
    // Communication error occured with OLT(IP)
    return (
        <>
            {output && output.indexOf('Communication error occured with OLT(IP):') === -1 && output.indexOf('Incorrect') === -1 && output.indexOf('Failure') === -1 && output.indexOf('The ONT is not online') === -1 ? (<div>
                {/* <div>
                    {command}
                </div> */}
                <div>
                    {output && output.split("\n")[2]}
                </div>
                <div>
                    {output && output.split("\n")[4]}
                </div>
                <table className={st.table}>

                    <thead >
                        <tr className={st.tr}>
                            <th className={st.th}>ONT</th>
                            <th className={st.th}>ONT port</th>
                            <th className={st.th}>ONT port-type</th>
                            <th className={st.th}>Auto-neg</th>
                            <th className={st.th}>Speed (Mbps)</th>
                            <th className={st.th}>Duplex</th>
                            <th className={st.th}>Port Switch</th>
                            <th className={st.th}>FLOW control</th>
                            <th className={st.th}>Native VLAN</th>
                            <th className={st.th}>Priority</th>
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
                                <td className={st.td}>{el[6]}</td>
                                <td className={st.td}>{el[7]}</td>
                                <td className={st.td}>{el[8]}</td>
                                <td className={st.td}>{el[9]}</td>
                            </tr>))}
                    </tbody>

                </table>
            </div>) : (<div>
                {/* <div>
                    {command}
                </div> */}
                {err && err.split("\n").map((line, index) => <p key={index}>{line}</p>)}
            </div>)}


        </>
    )
}
export default TableHuaweiDisplayOntPortAttribute;




