
export const commands = {
    "showCommands": {
        // "cabsat":["cabsat_set_ports","cabsat_show_bind_ports"],zte_mac_delete huawei_undo_mac
        "gpon": {
            "huawei": ["huawei_display_service_port", "huawei_display_mac_address", "huawei_display_ont_info", "huawei_display_ont_optical_info", "huawei_display_ont_port_attribute", "huawei_display_ont_port_state","huawei_display_traffic","huawei_display_ont_register_info","huawei_display_dbm(s)_on_port","huawei_dispay_serialnums_on_port", "huawei_ont_restart", "huawei_set_ont_port(s)_to_vlan","huawei_undo_mac"],
            "zte": ["zte_onu_running_config", "zte_show_running_config", "zte_show_onu_link_state", "zte_show_onu_mac_address", "zte_show_onu_optical_info", "zte_show_onu_port_state", "zte_show_detail_info", "zte_show_serialnums_onport","zte_show_dbm(s)_on_port","zte_olt_set_ports_to_vlans",  "zte_change_mgc_ip","zte_reset_onu","zte_onu_reboot","zte_mac_delete"],
        },
        "dsl": {
            "alcatel": ["alcatel_show_link_info", "alcatel_show_mac_internet_tv", "alcatel_show_service_port_internet_tv", "alcatel_show_link_all"],
            "huawei": ["huawei_display_port_link_info_dsl", "huawei_display_mac_address_dsl", "huawei_display_service_port_dsl", "huawei_display_port_link_all"]
        },
        "autofind" : ["autofind_zte_hw","find_by_sn_zte_hw"],
    },
    "dhcpLogs": ["internet_dhcp_log", "iptv_dhcp_log", "opt82_dhcp_coalog", "voip_dhcp_log", "internet_dhcp_ip_log", "iptv_dhcp_ip_log", "radius_dhcp_ip_log", "radius_dhcp_log_mac_format", "voip_dhcp_ip_log"],
    "mobile": "pdn_lte_mobile"
}
export const local_troubleshooters_commands = {
    "showCommands": {
        "cabsat":["Cabsat_set_ports","Cabsat_show_bind_ports"],
        "gpon": {
            "huawei": ["huawei_display_service_port", "huawei_display_mac_address", "huawei_display_ont_info", "huawei_display_ont_optical_info", "huawei_display_ont_port_attribute", "huawei_display_ont_port_state", "huawei_ont_restart", "huawei_set_ont_port(s)_to_vlan", "huawei_display_dbm(s)_on_port"],
            "zte": ["zte_olt_set_ports_to_vlans", "zte_onu_reboot", "zte_onu_running_config", "zte_show_onu_link_state", "zte_show_onu_mac_address", "zte_show_onu_optical_info", "zte_show_onu_port_state", "zte_show_running_config", "zte_show_dbm(s)_on_port"],
        },
        "dsl": {
            "alcatel": ["alcatel_show_link_info", "alcatel_show_mac_internet_tv", "alcatel_show_service_port_internet_tv", "alcatel_show_link_all"],
            "huawei": ["huawei_display_port_link_info_dsl", "huawei_display_mac_address_dsl", "huawei_display_service_port_dsl", "huawei_display_port_link_all"]
        }
    },
    "dhcpLogs": ["internet_dhcp_log", "iptv_dhcp_log", "opt82_dhcp_coalog", "voip_dhcp_log", "internet_dhcp_ip_log", "iptv_dhcp_ip_log", "radius_dhcp_ip_log", "radius_dhcp_log_mac_format", "voip_dhcp_ip_log"],
    "mobile": "pdn_lte_mobile"
}
export const offline_troubleshooters_commands = {
    "showCommands": {
        "cabsat":["Cabsat_set_ports","Cabsat_show_bind_ports"],
        "gpon": {
            "huawei": ["huawei_display_service_port", "huawei_display_mac_address", "huawei_display_ont_info", "huawei_display_ont_optical_info", "huawei_display_ont_port_attribute", "huawei_display_ont_port_state", "huawei_ont_restart", "huawei_set_ont_port(s)_to_vlan", "huawei_display_dbm(s)_on_port"],
            "zte": ["zte_olt_set_ports_to_vlans", "zte_onu_reboot", "zte_onu_running_config", "zte_show_onu_link_state", "zte_show_onu_mac_address", "zte_show_onu_optical_info", "zte_show_onu_port_state", "zte_show_running_config", "zte_show_dbm(s)_on_port"],
        },
        "dsl": {
            "alcatel": ["alcatel_show_link_info", "alcatel_show_mac_internet_tv", "alcatel_show_service_port_internet_tv", "alcatel_show_link_all"],
            "huawei": ["huawei_display_port_link_info_dsl", "huawei_display_mac_address_dsl", "huawei_display_service_port_dsl", "huawei_display_port_link_all"]
        }
    },
    "dhcpLogs": ["internet_dhcp_log", "iptv_dhcp_log", "opt82_dhcp_coalog", "voip_dhcp_log", "internet_dhcp_ip_log", "iptv_dhcp_ip_log", "radius_dhcp_ip_log", "radius_dhcp_log_mac_format", "voip_dhcp_ip_log"],
    "mobile": "pdn_lte_mobile"
}
export const troubleshooters_commands = {
    "showCommands": {
        "cabsat":["Cabsat_set_ports","Cabsat_show_bind_ports"],
        "gpon": {
            "huawei": ["huawei_display_service_port", "huawei_display_mac_address", "huawei_display_ont_info", "huawei_display_ont_optical_info", "huawei_display_ont_port_attribute", "huawei_display_ont_port_state", "huawei_ont_restart", "huawei_set_ont_port(s)_to_vlan", "huawei_display_dbm(s)_on_port"],
            "zte": ["zte_olt_set_ports_to_vlans", "zte_onu_reboot", "zte_onu_running_config", "zte_show_onu_link_state", "zte_show_onu_mac_address", "zte_show_onu_optical_info", "zte_show_onu_port_state", "zte_show_running_config", "zte_show_dbm(s)_on_port"],
        },
        "dsl": {
            "alcatel": ["alcatel_show_link_info", "alcatel_show_mac_internet_tv", "alcatel_show_service_port_internet_tv", "alcatel_show_link_all"],
            "huawei": ["huawei_display_port_link_info_dsl", "huawei_display_mac_address_dsl", "huawei_display_service_port_dsl", "huawei_display_port_link_all"]
        }
    },
    "dhcpLogs": ["internet_dhcp_log", "iptv_dhcp_log", "opt82_dhcp_coalog", "voip_dhcp_log", "internet_dhcp_ip_log", "iptv_dhcp_ip_log", "radius_dhcp_ip_log", "radius_dhcp_log_mac_format", "voip_dhcp_ip_log"],
    "mobile": "pdn_lte_mobile"
}
