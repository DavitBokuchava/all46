import React from 'react';
import { v4 as uuidv4 } from 'uuid';
// import { useSelector } from 'react-redux';
// it was added in 13/09/2021

// CabsatIp             string `json:"cabsatIp"`
// CabsatService        string `json:"cabsatService"`
// CabstaPort           string `json:"cabsatPort"`
const CommandstriggerState = () => {
	const [currentCommand, setCurrentCommand] = React.useState('');
	const [fieldError, setFieldError] = React.useState('')
	const [commandsList, setCommandsList] = React.useState({})
	const [deviceFields, setDeviceFields] = React.useState({
        customerId: "",
        mobNumber: "",
        command: "",
        device: "",
        frameSlotPort: "",
        boardSlotPort: "",
        vport: "",
        technology: "",
		vendor:'',
        sessionId: uuidv4(),
        macAddress: "",
        voip: "",
        position: "",
        dhcpLogIpAddress: "",
        serviceProfileHuawei: "huawei service-profile",
        serviceProfileZte: "zte onu service",
        servicePortLanZte: "zte onu lan",
		cabsatIpaddress:"",
		cabsatService:"",
		cabsatPort:"",
		zones:"",
		sn:'',
		mgc:'mgc',
		vlanId:''
    });
	const selectionOptions = {
        "zte": {
            "service": ["zte onu service", "internet", "iptv"],
            "ports": ["zte onu lan", "eth_0/1", "eth_0/2", "eth_0/3", "eth_0/4"]
        },
        "huawei": ["huawei service-profile", "10", "11", "12", "13", "14"]
    };
	const selectionCabsatOptions = {
		"ports":["cabsat lan","e1","e2","e3","e4","w0"],
		"service":["cabsat port service"," PortBind_Entry0 "," PortBind_Entry1 "],
    }
	const zonesList = ['','22','31/38','34','36','51','51D','60','63','67','71','73/78','74','93','95','akhalkalaki','akhaltsikhe','akhmeta','avchala','bakuriani','batumi','bolnisi','borjomi','ckneti','dusheti','gardabani','gori','gurjaani','kabali','kaspi','kazreti','khashuri','khelvachauri','kobuleti','kojori','kutaisi','lilo','marneuli','mtckheta','ninocminda','ponichala','poti','qareli','qvishkheti','rustavi','sachkhere','sagarejo','samtredia','senaki','surami','telavi','tserovani','tskaltubo','tsnori','veliscixe','zestaphoni','zugdidi'];

	return {
		selectionCabsatOptions,
		selectionOptions,
		deviceFields, 
		setDeviceFields,
		currentCommand, 
		setCurrentCommand,
		commandsList, 
		setCommandsList,
		zonesList,
		fieldError, 
		setFieldError,
	};
}

export default CommandstriggerState;


	// cabsat_internet:
	// cabsat_tv
	// const authUsers = useSelector(state => state.auth)
	// React.useEffect(() => {
	// 	if (!localStorage.getItem('token')) {
	// 		return setLogsFilters(val => ({
	// 			...val,
	// 			users: {},
	// 			usersGroupTeam: {},
	// 			session_id: "",
	// 			customer_id: "",
	// 			customer_number: "",
	// 			commands: {},
	// 			technology: {},
	// 			vendor: {},
	// 			device: {},
	// 			ipaddress: {},
	// 			filterDateTime: {
	// 				from: "",
	// 				to: ""
	// 			}
	// 		}))
	// 	}
	// }, [authUsers.isAuthenticated])