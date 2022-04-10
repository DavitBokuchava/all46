import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import st from "./style.module.css";
// import {commands} from '../../commands'
// import { MDBContainer, MDBAutocomplete } from "mdbreact";



const OtherFiltersAutoCompletePage = (props) => {
  const { selectionItems, handleClick, values, placeholder, loadRefresh = false, name, clearField } = props;
  const [inputValue, setInputValue] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null)

  React.useEffect(() => {
    document.addEventListener('click', closeDropDownOptions);
    return () => document.removeEventListener('click', closeDropDownOptions)
  }, []);
  function optionOnClick(field, name) {
    console.log(field, name, " === field,namefield,name === ")
    return handleClick && handleClick(field, name)
  }
  function closeDropDownOptions(e) {
    return setOpen((e && e.target === ref.current))
  }

  function filtering(arr) {
    return arr && arr.filter(option => option.toLowerCase().indexOf(inputValue) > -1)
  }
  const handleChange = (e) => {
    e.preventDefault();
    console.log(inputValue, "=== inputValue ==")
    setInputValue(e.target.value)
  }
  function clear() {
    return setInputValue('')
  }

  return (
    <>
      <div
        className={st.dropdown}
      // ref = {ref} 
      >
        <div
          className={cn(st.outputWrapp, {
            // [st.exist]:Object.keys(values[name]).length>0
          })}>
          {Object.values(values[name]).map(el => (
            <div
              className={cn(st.outputItem)}
              key={el}
              name={el}
              onClick={() => clearField(name, el)}>
              {el}
            </div>
          ))}
        </div>
        <div className={st.control}>


          <div
            className={st.selectedValue} >
            <div className={st.inputWrapp}>
              <input
                name={name}
                placeholder={loadRefresh ? "REFRESH...." : Object.values(placeholder)[0]}
                type="text"
                ref={ref}
                value={inputValue}
                onChange={handleChange}
                onClick={() => setOpen(pr => !pr)} />
              <span
                className={st.cleanup}
                onClick={() => clear()}>
                x
              </span>
              <div className={cn(st.arrow, {
                [st.open]: open
              })} />
            </div>

          </div>


        </div>
        <div className={cn(st.options, {
          [st.open]: open
        })}
          onClick={() => setOpen(true)}
        >
          {
            selectionItems && filtering(selectionItems).map((el, index) => (
              <div
                key={el}
                className={cn(st.option, {
                  [st.selected]: true
                })}

                onClick={() => optionOnClick(Object.keys(placeholder)[0], el)}
              >
                <div className={st.optionsBody}>
                  <div
                    className={cn(st.checkBoxSpan, {
                      [st.checkedSpan]: !!values[Object.keys(placeholder)[0]][el]
                    })}
                  ></div>
                  <span>
                    {el}</span>
                </div>
              </div>

            ))
          }
        </div>
      </div>
    </>
  );
}

export default OtherFiltersAutoCompletePage;

// {/* <input 
//                             // type = "checkbox"

//                             // checked = { !!values[Object.keys(placeholder)[0]][el]}
//                             // // onChange = {()=>handleChecked(index)}
//                             // value = {el}
//                             // // onClick = { optionOnClick}
//                             // defaultChecked = { !!values[Object.keys(placeholder)[0]][el]} 
//                             >  */}
// onChange = {(e)=> setValues(val=>({
                    //   ...val, 
                    //   [placeholder.toLowerCase()] : e.target.value,
                    //   technology:devices[e.target.value]?devices[e.target.value].technology:null,
                    //   // boardSlotPort:devices[e.target.value] ? val.boardSlotPort : "",
                    //   frameSlotPort:devices[e.target.value] ? val.frameSlotPort : "",
                    //   vport:devices[e.target.value] ? val.frameSlotPort : "",
                    // }))}
/////////////////////////////////////////


      // const { technology,vendor } = devices[name];
      // let commands = JSON.parse(commandsData)
      // console.log(commands,"commandscommandscommandscommandscommandscommands")
      // const vendors = commands.showCommands[technology];
      // if(techology === "dsl"){
      //   setValues(val=>({
      //     ...val, 
      //     device : name, 
      //     boardSlotPort:))
      // }

      // setValues(val=>({
      //   ...val, 
      //   device : name, 
      //   technology:devices[name].technology,
      //   vendor:devices[name].vendor,
      //   // ipAddress:devices[name]&&devices[name].ipAddress,
      //   // boardSlotPort:devices[e.target.value] ? val.boardSlotPort : "",
      //   // frameSlotPort:devices[e.target.value] ? val.frameSlotPort : "",
      // }))
      // // console.log(commands.showCommands[olts[name].technology][olts[name].vendor],olts[name],olts[name].vendor,olts[name].technology,"###### AUTOCOMPLITE olts[name].technology")
      // setCommandsList(val=>({
      //   ...val,
      //   ["showCommands"]: vendors[vendor], //commands.showCommands[olts[name].technology][olts[name].vendor]
      //   ["dhcpLogs"]:devices[name].technology === "gpon" ? vendors[vendor]&&commands.dhcpLogs:vendors[vendor]&&commands.dhcpLogs.filter(el=>el !== "voip_dhcp_log"), 
      // }))
      //  return console.log(commandsList)


//////////////////////////////////////

//   <MDBContainer>
    //     <MDBAutocomplete
    //       data={states}
    //       label="Choose your favorite state"
    //       icon="heart"
    //       clear
    //       id="input"
    //       getValue={this.logValue}
    //     />
    //   </MDBContainer>


//   logValue = value => {
//     console.log(value);
//   };

/*
<div className={st.dropdown}>
            <span>Mouse over me</span>
            <div className={st.dropdownContent}>
                <p>Hello World!</p>
            </div>
    </div>

*/
// React.useEffect(()=>{
    //   setData(oltNames)
    // },[])
    // const handleValue = (e)=>{
    //   e.persist();
    //   setInputValue(e.target.value);
    //   console.log(inputValue)
    // }
    //return console.log(placeholder)