import React from 'react';
import st from '../style.module.css'


const TableHuaweiDisplayDbmsOnPort = (props) => {
    const { output, command } = props;
    const [data, seData] = React.useState([]);
    const [err,setErr] = React.useState(null)
    const [onts, setOntsSum] = React.useState(0);
    console.log(command, output, " command in CLI");
    function removeDesh(a) {
        if (a === '  -----------------------------------------------------------------------------') {
            console.log("IT WAS DEFIENED DESHES")
            return 10;
        }
        console.log("IT WAS not DEFIENED DESHES",a)
        return 9;
    }
    function defineOnts(a) {
        return parseInt(a.split("\n")[4].split(' ')[6], 10);
    }
    
    React.useEffect(() => {
        
        if (output.indexOf('Communication error occured with OLT(IP)') === -1 && output.indexOf('Incorrect') === -1 && output.indexOf('Failure') === -1&& output.indexOf('The ONT is not online') === -1) {
            seData([])
            let indexFrom = removeDesh(output && output.split("\n")[10]);
            // let sumOfOnts = output&&defineOnts(output.split("\n")[4].split(' ')[6]);
            output&&output.split("\n").map((line, index) => {
                if (index > indexFrom && index < (parseInt(output.split("\n")[4].split(' ')[6], 10) + indexFrom + 1)) {
                    return seData(val => ([...val, line]))
                }
            })
        } else {
             setErr(output)
        }
    }, [output]);
    React.useEffect(() => {
        // console.log(output && output.split("\n")[4], parseInt(output.split("\n")[4].split(' ')[6], 10), ": Online ", output && output.split("\n")[2], "command, output")
        console.log(data, "daaaaaaaaaataaaaaaaaaaaaaaaaaaa")
    }, [data])
    // React.useEffect(() => {
    //     console.log(output && output.split("\n")[4], parseInt(output.split("\n")[4].split(' ')[6], 10), ": Online ", output && output.split("\n")[2], "command, output")
    // }, [])
    return (
        <>
            {output.indexOf('Communication error occured with OLT(IP)') === -1 && output.indexOf('Incorrect') === -1 && output.indexOf('Failure') === -1 && output.indexOf('The ONT is not online') === -1? (<div>
                {/* <div>
                    {command}
                </div> */}
                <div>
                    {output && output.split("\n")[2]}

                </div>
                <div>
                    {output && output.split("\n")[4]}
                </div>
                {!!output && parseInt(output.split("\n")[4].split(' ')[6], 10) && output.indexOf('The ONT is not online') === -1 && <table className={st.table}>

                    <thead >

                        <tr className={st.tr}>
                            <th className={st.th}>ONT ID</th>
                            <th className={st.th}>Rx power</th>
                            <th className={st.th}>Tx power</th>
                            <th className={st.th}>OLT Rx ONT</th>
                            <th className={st.th}>Temperature(c)</th>
                            <th className={st.th}>Voltage (V)</th>
                            <th className={st.th}>Current (mA)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(el => {
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

                </table>}
            </div>) : (<div>
                {/* <div>
                    {command}
                </div> */}
                {err&&err.split("\n").map((line, index) => <p key={index}>{line}</p>)}
            </div>)}


        </>
    )
}
export default TableHuaweiDisplayDbmsOnPort;