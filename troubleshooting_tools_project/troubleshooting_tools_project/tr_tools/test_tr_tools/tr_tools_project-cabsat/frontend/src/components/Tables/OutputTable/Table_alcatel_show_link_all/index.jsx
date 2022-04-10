import React from 'react';
import st from '../style.module.css'


const TableAlcatelShowLinkAll = (props) => {
    const { output, command } = props;
    const [data, setData] = React.useState([]);
    const [err, setErr] = React.useState(null)
    console.log(command, output, " command in CLI");

    React.useEffect(() => {
        if (output.indexOf('Communication error occured with OLT(IP)') === -1 && output.indexOf('Incorrect') === -1 && output.indexOf('Failure') === -1 && output.indexOf('Invalid Frame Or Board Or Slot') === -1 && output.indexOf('Invalid') === -1) {
            setData([])
            setErr(null)
            output && output.split("\n").map((line, index) => {
                if (index > 1 && index < output.split("\n").length - 1) {
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
    // if-index adm-state opr-state/tx-rate-ds tx-rate/us tx-rate/ds cur-op-mode
    return (
        <>

            {output.indexOf('Communication error occured with OLT(IP)') === -1 && output.indexOf('Incorrect') === -1 && output.indexOf('Failure') === -1 && output.indexOf('Invalid Frame Or Board Or Slot') === -1 && output.indexOf('Invalid') === -1 ? <div>
                {/* <div>
                    {command}
                </div> */}
                
                <table className={st.table}>

                    <thead >
                        <tr className={st.tr}>
                            <th className={st.th}>frame</th>
                            <th className={st.th}>board</th>
                            <th className={st.th}>slot</th>
                            <th className={st.th}>port</th>
                            <th className={st.th}>adm-state</th>
                            <th className={st.th}>opr-state/tx-rate-ds</th>
                            <th className={st.th}>tx-rate/us</th>
                            <th className={st.th}>tx-rate/ds</th>
                            <th className={st.th}>cur-op-mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 && data.map(el => {
                            return el.split(" ").filter(el => !!el)
                        }).map((el, index) => (
                            <tr className={st.tr} key={index}>
                                <td className={st.td}>{el[0].split('/')[0]}</td>
                                <td className={st.td}>{el[0].split('/')[1]}</td>
                                <td className={st.td}>{el[0].split('/')[2]}</td>
                                <td className={st.td}>{el[0].split('/')[3]}</td>
                                <td className={st.td}>{el[1]}</td>
                                <td className={st.td}>{el[2].indexOf('down') !== -1 ? el[2] : `${el[2]} ${el[3]}`}</td>
                                <td className={st.td}>{el[2].indexOf('down') !== -1 ? el[3] : el[4]}</td>
                                <td className={st.td}>{el[2].indexOf('down') !== -1 ? el[4] : el[5]}</td>
                                <td className={st.td}>{el[2].indexOf('down') !== -1 ? el[5] : el[6]}</td>
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
export default TableAlcatelShowLinkAll;
