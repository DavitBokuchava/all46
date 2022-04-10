import React from 'react';
import st from '../style.module.css'


const TableHuaweiDisplayOntPortState = (props) => {
    const { output, command } = props;
    const [data, setData] = React.useState([]);
    const [err,setErr] = React.useState(null)
    const [onts, setOntsSum] = React.useState(0);
    console.log(command, output, " command in CLI");

    React.useEffect(() => {
        
        if (output.indexOf('Communication error occured with OLT(IP)') === -1 && output.indexOf('Incorrect') === -1 && output.indexOf('Failure') === -1 && output.indexOf('The ONT is not online') === -1) {
            setData([])
            output && output.split("\n").map((line, index) => {
                if (index > 7 && index <  output.split("\n").length - 1) {
                    return setData(val => ([...val, line]))
                }
            })
             setErr(null)
        }else{
           setErr(output)
            
        }
    }, [output]);

    // React.useEffect(() => {
    //     console.log(output && output.split("\n")[4], parseInt(output.split("\n")[4].split(' ')[6], 10), ": Online ", output && output.split("\n")[2], "command, output")
    // }, [])
    React.useEffect(() => {
        // console.log(output && output.split("\n")[4], parseInt(output.split("\n")[4].split(' ')[6], 10), ": Online ", output && output.split("\n")[2], "command, output")
        console.log(output, "outputoutputoutputoutputoutput")
    }, [])
    return (
        <>
            {output&&output.indexOf('Communication error occured with OLT(IP)') === -1 && output.indexOf('Incorrect') === -1 && output.indexOf('Failure') === -1 && output.indexOf('The ONT is not online') === -1 ? <div>
                <div>
                    {/* {command} */}
                </div>
                <div>
                    {output && output.split("\n")[2]}

                </div>
                <div>
                    {output && output.split("\n")[4]}
                </div>
                <table className={st.table}>

                    <thead >
                        <tr className={st.tr}>
                            <th className={st.th}>ONT-ID</th>
                            <th className={st.th}>ONT port-ID</th>
                            <th className={st.th}>ONT Port-type</th>
                            <th className={st.th}>Speed (Mbps)</th>
                            <th className={st.th}>Duplex</th>
                            <th className={st.th}>LinkState</th>
                            <th className={st.th}>RingStatus</th>
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
export default TableHuaweiDisplayOntPortState;




