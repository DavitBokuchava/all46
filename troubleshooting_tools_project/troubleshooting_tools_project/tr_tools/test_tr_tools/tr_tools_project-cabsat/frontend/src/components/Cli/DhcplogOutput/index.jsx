import React from 'react';
// import st from '../style.module.css'


const DhcplogParsingFun = (props) => {
    const { output} = props;
    const [data, setData] = React.useState([]);
    let result = output.split("\n").filter(el => {
        return el !== "Return code: 0" && el !== "STDERR: " && el !== "Return code: 0" && el !== "<class 'paramiko.channel.ChannelStdinFile'>" && el !== "<class 'paramiko.channel.ChannelFile'>" && el !== "<class 'paramiko.channel.ChannelStderrFile'>"
    }).map(el => {
        if (el.indexOf('STDOUT:') !== -1) {
            return el.replace(/STDOUT:/g, "");
        }
        return el
    })
    console.log(result,"resultresult")
    
    return (
        <>
        {!result.join('\n').replace(/\s/g, "") ?  <p>there is no log</p> : result.map((line,index)=><p key={index}>{line}</p>)}
        </>
        
        )
}
export default DhcplogParsingFun;




