// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { showCommandGpon, } from '../../reducers/showcommands/actions';
// import cn from 'classnames';
// import st from './style.module.css';


// const CommandsList = (props) => {
//     const {
//         disable,
//         commandsList,
//         splitFrameSlotPort,
//         deviceFields,
//         vendor,
//         setDisable, } = props;

//     const tkn = useSelector(state => state.auth);
//     console.log(tkn, tkn.token, "############ tkn TOKEN ")
//     const dispatch = useDispatch();
//     useEffect(() => {
//         setDisable(!tkn.isAuthenticated)
//     }, [tkn.isAuthenticated])
//     const handleOutputFn = async (e) => {
//         splitFrameSlotPort && splitFrameSlotPort(deviceFields, vendor, e.target.value)
//             .then(({ sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position }) => {
//                 dispatch(showCommandGpon(sessionId, customerId, mobNumber, device, ipAddress, technology, vendor, command, frame, slot, port, vport, position))
//             })
//             .then(() => setDisable(true))
//             .catch(err => {
//                 alert(err)
//                 console.log(err)
//             })
//     }
//     React.useEffect(() => {
//         console.log(deviceFields.frameSlotPort, commandsList, " === deviceFields.frameSlotPort, commandsList")
//     }, [deviceFields.frameSlotPort])
//     return (
//         <>
//             <div className={st.buttonsList}>
//                 {commandsList.map((el) => (
//                     <div
//                         className={cn(st.input, {
//                             [st.hov]: !disable,
//                             [st.disabled]: disable
//                         })}
//                         key={el}>
//                         <input
//                             className={cn({
//                                 [st.hov]: !disable,
//                                 [st.disabled]: disable
//                             })}
//                             role="tabpanel"
//                             name={el}
//                             style={{ textAlign: "center" }}
//                             type="submit"
//                             value={el}
//                             disabled={disable}
//                             onClick={(e) => handleOutputFn(e)} />
//                     </div>))}
//             </div>
//         </>
//     )
// }
// export default CommandsList;