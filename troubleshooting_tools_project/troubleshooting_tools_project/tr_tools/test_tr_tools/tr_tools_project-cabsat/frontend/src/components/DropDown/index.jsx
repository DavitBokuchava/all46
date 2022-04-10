import React from "react";
import cn from "classnames"
import st from "./style.module.css"



const DropDown = (props) => {
  const { commandsList, values, setValues } = props;
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null)

  React.useEffect(() => {
    document.addEventListener('click', closeDropDownOptions);
    return () => document.removeEventListener('click', closeDropDownOptions)
  }, []);
  React.useEffect(() => {
    console.log(commandsList)
  }, []);

  function closeDropDownOptions(e) {
    console.log(ref)
    return setOpen(e && e.target === ref.current)

  }


  return (
    <>
      <div className={st.dropdown} >
        <div className={st.control}
        >
          <div
            className={st.selectedValue}
            ref={ref}
            onClick={() => setOpen(pr => !pr)}
          >
            {values.command ? values.command : "Commands"}
          </div>
          <div className={cn(st.arrow, {
            [st.open]: open
          })} />
        </div>
        <div className={cn(st.options, {
          [st.open]: open
        })}>
          {
            commandsList.map((el, i) => (
              <div
                key={i.toString()}
                className={cn(st.option, {
                  [st.selected]: values["command"] === el
                })}
                onClick={() => setValues(val => ({ ...val, command: el }))}> {el}  </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default DropDown;