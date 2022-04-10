import React from 'react';
import st from './style.module.css'

const DateTime = (props) => {
    const { handleClick, values, placeholder, name, clearField } = props;

    const handleChangeDateTime = (e) => {
        handleClick(e.target.name, `${e.target.value}:00.000Z`)
    }

    return (
        <div className={st.inputWrapp}>
            <input
                name={name}
                type="datetime-local"
                name={placeholder}
                value={values.filterDateTime[placeholder] && values.filterDateTime[placeholder].split(".")[0]}
                onChange={handleChangeDateTime}>
            </input>
            <span
                className={st.cleanup}
                onClick={() => clearField && clearField(name)}>
                x
            </span>
        </div>

    )
}

export default DateTime;