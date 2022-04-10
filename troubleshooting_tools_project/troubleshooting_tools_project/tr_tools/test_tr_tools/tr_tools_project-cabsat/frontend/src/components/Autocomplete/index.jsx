import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import st from "./style.module.css";



const AutoCompletePage = (props) => {
  const { deviceNames, devices, values, setValues, placeholder, setCommandsList, commandsList } = props;
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null)
  const commandsData = useSelector(state => state.auth.commands)

  React.useEffect(() => {
    document.addEventListener('click', closeDropDownOptions);
    return () => document.removeEventListener('click', closeDropDownOptions)
  }, []);
  React.useEffect(()=>{
    if(values.device){
      return setOpen(true)
    }else {
      return setOpen(false)
    }
  },[values.device]); // It was added in 13/09/2021
  function optionOnClick(name) {
    const { technology, vendor } = devices[name];
    let commands = JSON.parse(commandsData)
    const vendors = commands.showCommands[technology];
    // if(techology === "dsl"){
    //   setValues(val=>({
    //     ...val, 
    //     device : name, 
    //     boardSlotPort:))
    // }
    
    // React.useEffect(()=>{
    //   console.log(devices[name].technology === 'gpon'? vendors[vendor] : [...vendors[vendor],...commands['showCommands'].cabsat],"devices[name].technology === 'gpon'? vendors[vendor] : [...vendors[vendor],...commands['showCommands'].cabsat]")
    // },[])
    setValues(val => ({
      ...val,
      device: name,
      technology: devices[name].technology,
      vendor: devices[name].vendor,
      // ipAddress:devices[name]&&devices[name].ipAddress,
      // boardSlotPort:devices[e.target.value] ? val.boardSlotPort : "",
      // frameSlotPort:devices[e.target.value] ? val.frameSlotPort : "",
    }))
    // console.log(commands.showCommands[olts[name].technology][olts[name].vendor],olts[name],olts[name].vendor,olts[name].technology,"###### AUTOCOMPLITE olts[name].technology")
    // ...commands['showCommands'].cabsat
    setCommandsList(val => ({
      ...val,
      ["showCommands"]: devices[name].technology === 'gpon'? [...vendors[vendor], ...commands['showCommands'].autofind] : vendors[vendor], 
      ["dhcpLogs"]: devices[name].technology === "gpon" ? vendors[vendor] && commands.dhcpLogs : vendors[vendor] && commands.dhcpLogs.filter(el => el !== "voip_dhcp_log"),
    }))
    return console.log(commandsList)
  }
  function closeDropDownOptions(e) {
    console.log(ref, "ref")
    return setOpen(e && e.target === ref.current)
  }
  function filtering(arr) {
    return arr.filter(option => option.toLowerCase().indexOf(values[placeholder.toLowerCase()].toLowerCase()) > -1)
  }


  return (
    <>
      <div
        className={st.dropdown} >
        <div className={st.control}
        >
          <div
            className={st.selectedValue} >
            <input
              placeholder={placeholder}
              type="text"
              ref={ref}
              value={values[placeholder.toLowerCase()]}
              onChange={(e) => setValues(val => ({
                ...val,
                [placeholder.toLowerCase()]: e.target.value,
                technology: devices[e.target.value] ? devices[e.target.value].technology : null,
                // boardSlotPort:devices[e.target.value] ? val.boardSlotPort : "",
                frameSlotPort: devices[e.target.value] ? val.frameSlotPort : "",
                vport: devices[e.target.value] ? val.frameSlotPort : "",
              }))}
              onClick={() => setOpen(pr => !pr)} />

          </div>
          <div className={cn(st.arrow, {
            [st.open]: open
          })} />
          <span
            className={cn(st.cleanup)}
            onClick={() => setValues(val => ({
              ...val,
              [placeholder.toLowerCase()]: ""
            }))}
          >
            x
          </span>

        </div>
        <div className={cn(st.options, {
          [st.open]: open
        })}>
          {
            filtering(deviceNames).map((el, i) => (
              <div
                key={i.toString()}
                className={cn(st.option, {
                  [st.selected]: values[placeholder.toLowerCase()] === el
                })}
                onClick={() => optionOnClick(el)}> {el} </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default AutoCompletePage;
