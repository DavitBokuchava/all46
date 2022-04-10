import React from 'react';
import TableHuaweiDisplayDbmsOnPort from '../Tables/OutputTable/Table_huawei_display_dbms_on_port';
import TableHuaweiDisplayServicePort from '../Tables/OutputTable/Table_huawei_display_service_port';
import TableHuaweiDisplayOntPortAttribute from '../Tables/OutputTable/Table_huawei_display_ont_port_attribute'
import TableHuaweiDisplayOntPortState from '../Tables/OutputTable/Table_huawei_display_ont_port_state';
import TableAlcatelShowLinkAll from '../Tables/OutputTable/Table_alcatel_show_link_all';
import TableHuaweiDisplayPortLinkAllDsl from '../Tables/OutputTable/Table_huawei_display_port_link_all_dsl';
import DhcplogParsingFun from './DhcplogOutput';
import st from './style.module.css';

const Cli = (props) => {
    const { output, command, isLoading } = props;
    const [getComponent, setComponents] = React.useState(false);
    const [gotCommand, setCommand] = React.useState(null)
    // console.log(output.split('\n')[2], output.split('\n')[7], "output, command, isLoading")
    React.useEffect(() => {
        output && console.log(output.split('\n')[2], "output, command, isLoading")
    }, [output])
    function waitingFor() {
        return (
            <>
                <div id={st.container}>
                    <div id={st.content}>
                        waiting ...

                    </div>
                </div>
            </>
        )
    }
    React.useEffect(() => {
        console.log(output && output.split("\n"), "output.split DSCPLOG", output && output.split("\n")[0], output && output.split("\n")[1], output && output.split("\n")[2])
    }, [output]);

    React.useEffect(() => {
        setCommand(command)
        console.log(command, "commandcommandcommandcommandcommand")
        if (command === 'huawei_display_ont_port_state') {
            return setComponents(true)
        } else {
            return setComponents(false)
        }
        //    return  
        // output && console.log(output.split('\n')[2], "output, command, isLoading") "autofind_zte_hw","find_by_sn_zte_hw"
    }, [isLoading]);

    function defineCliOutput(x, y) {
        console.log(x, y, "output, commandoutput, commandoutput, command")
        switch (y) {
            case 'autofind_zte_hw':
            case 'find_by_sn_zte_hw':
                return (

                    <div id={st.container}>
                        <div id={st.content}>
                        {x ? <DhcplogParsingFun
                            output={x}

                            /> : <DhcplogParsingFun
                            output={' აღნიშნული ont_ის სერიული ვერ მოიძებნა '}

                            />}

                        </div>
                    </div>
                )
            case 'huawei_display_dbm(s)_on_port':
                return (

                    <div id={st.container}>
                        <div id={st.content}>
                            <TableHuaweiDisplayDbmsOnPort
                                output={x}
                                command={y}
                            />

                        </div>
                    </div>
                )
            case 'huawei_display_port_link_all':
                return (

                    <div id={st.container}>
                        <div id={st.content}>
                            <TableHuaweiDisplayPortLinkAllDsl
                                output={x}
                                command={y}
                            />

                        </div>
                    </div>
                )
            case 'alcatel_show_link_all':
                return (

                    <div id={st.container}>
                        <div id={st.content}>
                            <TableAlcatelShowLinkAll
                                output={x}
                                command={y}
                            />

                        </div>
                    </div>
                )
            case 'huawei_display_service_port':
                return (

                    <div id={st.container}>
                        <div id={st.content}>
                            <TableHuaweiDisplayServicePort
                                output={x}
                                command={y}
                            />

                        </div>
                    </div>
                )
            case 'huawei_display_ont_port_state':
                return (

                    <div id={st.container}>
                        <div id={st.content}>
                            <TableHuaweiDisplayOntPortState
                                output={x}
                                command={y}
                            />

                        </div>
                    </div>
                )
            case 'huawei_display_ont_port_attribute':
            case 'huawei_set_ont_port(s)_to_vlan':
                return (

                    <div id={st.container}>
                        <div id={st.content}>
                            <TableHuaweiDisplayOntPortAttribute
                                output={x}
                                command={y}
                            />

                        </div>
                    </div>
                )
            case 'internet_dhcp_log':
            case 'iptv_dhcp_log':
            case 'opt82_dhcp_coalog':
            case 'voip_dhcp_log':
            case 'internet_dhcp_ip_log':
            case 'iptv_dhcp_ip_log':
            case 'radius_dhcp_ip_log':
            case 'radius_dhcp_log_mac_format':
            case 'voip_dhcp_ip_log':
                return (
                    <div id={st.container}>
                        <div id={st.content}>
                            {/* <div>
                                {command}
                            </div> */}
                            <DhcplogParsingFun
                                output={x}

                            />
                        </div>
                    </div>
                )
            default:
                return (
                    <div id={st.container}>
                        <div id={st.content}>

                            <div>
                                {/* {command} */}
                            </div>
                            {x && x.split("\n").map((line, index) => <p key={index}>{line}</p>)}
                            {/* avoe */}
                        </div>
                    </div>
                )
        }
    }

    // return isLoading ? waitingFor() : output && defineCliOutput(output, command)
    return isLoading ? (
        <div id={st.container}>
            <div id={st.content}>
                wait ...
            </div>
        </div>
    ) : defineCliOutput(output, command)
}
export default Cli;


// <div id={st.container}>
//     <div id={st.content}>
//         {command}
//         {x && x.split("\n").filter(el => {
//             return el !== "Return code: 0" && el !== "STDERR: " && el !== "Return code: 0" && el !== "<class 'paramiko.channel.ChannelStdinFile'>" && el !== "<class 'paramiko.channel.ChannelFile'>" && el !== "<class 'paramiko.channel.ChannelStderrFile'>"
//         }).map(el => {
//             if (el.indexOf('STDOUT:') !== -1) {
//                 return el.replace(/STDOUT:/g, "");
//             }
//             return el
//         }).map((line, index) => <p key={index}>{line}</p>)}
//     </div>
// </div>
