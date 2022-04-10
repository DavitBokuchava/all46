import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import st from "./style.module.css";
// import {commands} from '../../commands'
// import { MDBContainer, MDBAutocomplete } from "mdbreact";



const FilterUsersAutoCompletePage = (props) => {
  const { selectionItems, handleClick, values, placeholder, loadRefresh, name, clearField } = props;
  const [inputValue, setInputValue] = React.useState('')
  // const [items,setItems] = React.useState([])
  const [open, setOpen] = React.useState(false);

  const ref = React.useRef(null)
  const optionRef = React.useRef(null)
  console.log(placeholder, selectionItems)

  React.useEffect(() => {
    document.addEventListener('click', closeDropDownOptions);
    return () => document.removeEventListener('click', closeDropDownOptions)
  }, []);
  React.useEffect(() => {
    document.addEventListener('click', closeDropDownOptions);
    return () => document.removeEventListener('click', closeDropDownOptions)
  }, []);
  // React.useEffect(()=>{
  //   if(!selectionItems.isLoading){
  //     selectionItems.items.length>0&&setItems([...selectionItems.items])
  //   }
  // },[selectionItems.isLoading])
  function optionOnClick(field, name) {
    setOpen(true)
    return handleClick && handleClick(field, name)
  }
  function closeDropDownOptions(e) {
    return setOpen(e && e.target === ref.current)
  }
  function clear() {
    return setInputValue('')
  }

  function filtering(arr) {
    return arr && arr.filter(option => option["username"].toLowerCase().indexOf(inputValue) > -1)
  }
  const handleChange = (e) => {
    e.preventDefault();
    console.log(inputValue, "e.target.value ,")
    setInputValue(e.target.value)

  }


  return (
    <>
      <div
        className={st.dropdown}
      >
        <div
          className={cn(st.outputWrapp, {
            [st.exist]: Object.keys(values[name]).length > 0
          })}>
          {selectionItems.items&&selectionItems.items.filter(el => {
            return Object.values(values[name]).some(a => a === el.id)
          }).map(el => (
            <div
              className={cn(st.outputItem)}
              key={el}
              name={el}
              onClick={() => clearField(name, el.id)}>
              {el.username}
            </div>
          ))}
        </div>
        <div className={st.control}>
          <div
            className={st.selectedValue} >
            <div className={st.inputWrapp}>
              <input
                name={name}
                placeholder={loadRefresh ? "REFRESH...." : placeholder}
                type="text"
                ref={ref}
                value={inputValue}
                onChange={handleChange}
                onClick={() => setOpen(pr => !pr)} />
              <span
                className={st.cleanup}
                onClick={() => clear()}> x </span>
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
           selectionItems.items&&filtering(selectionItems.items).map((el, index) => (
              <div
                key={el.id}
                className={cn(st.option, {
                  [st.selected]: true
                })}
                ref={optionRef}
                name={el.username}
                onClick={() => optionOnClick("users", el.id)}
              >
                <div className={st.optionsBody}>
                  <span
                    className={cn(st.checkBoxSpan, {
                      [st.checkedSpan]: !!values.users[el.id]
                    })}></span>
                  <span>{el.username}</span>
                </div>
              </div>))}
        </div>
      </div>
    </>
  );
}

export default FilterUsersAutoCompletePage;
