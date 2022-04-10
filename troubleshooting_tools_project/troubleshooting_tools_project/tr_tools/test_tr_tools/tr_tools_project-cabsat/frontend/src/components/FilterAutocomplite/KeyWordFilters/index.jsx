import React from 'react';
import st from './style.module.css'

const KeyWordFilter = (props) => {
    const { placeholder, handleChangeFilter, values, name, clearField } = props;

    function handleChange(e) {
        e.preventDefault();
        handleChangeFilter(val => ({
            ...val,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <div className={st.inputWrapp}>
                <input
                    name={name}
                    type="text"
                    placeholder={Object.values(placeholder)[0]}
                    onChange={handleChange}
                    // name ={ Object.keys(placeholder)[0]}
                    value={values[Object.keys(placeholder)[0]]}
                />
                <span
                    className={st.cleanup}
                    onClick={() => clearField && clearField(name)} >
                    x
                </span>
            </div>

        </>
    )
}
export default KeyWordFilter