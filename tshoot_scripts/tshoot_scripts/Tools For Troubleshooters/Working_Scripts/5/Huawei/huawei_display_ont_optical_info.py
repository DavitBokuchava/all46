import os, sys, time
from telnetlib import Telnet

user = 'gtsitskishvili2'
password = 'QNrdmW5J\r'
command_timeout = 5
output = ""
oltname= ""

# olt_ip = sys.argv[1]
# frame = sys.argv[2]
# slot = sys.argv[3]
# port = sys.argv[4]
# virt_port = sys.argv[5]

olt_ip = '172.16.13.86'
frame = '0'
slot = '12'
port = '0'
virt_port = '0'


try:
    with Telnet(olt_ip, 23, 5) as tn:
        tn.expect([b">>User name:"], command_timeout)
        tn.write(user.encode('ascii') + b"\n")
        tn.expect([b">>User password:"], command_timeout)
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b">"], command_timeout)
                    
        oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]        

        tn.write(b'enable\n')
        tn.expect([b"#"], command_timeout)
        tn.write(b"config\n")
        tn.expect([b"#"], command_timeout)
        
        
        command_1 = "interface gpon " + frame + "/" + slot 
        command_2 = "display ont optical-info " + port + " " + virt_port
        #print(command_2)
            
        tn.write(command_1.encode('ascii') +  b"\n")            
        result = tn.expect([b"#"], command_timeout)
        output = result[2].decode('ascii')
                
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
            
        
        tn.write(command_2.encode('ascii') +  b"\n")            
        result = tn.expect([b"\) ----", b"#"], command_timeout)
        output = result[2].decode('ascii')
        
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        
        

        for x in range(1):            
            tn.write(b" ")
            result = tn.expect([b"\) ----", b"#"], command_timeout)
            output += result[2].decode('ascii')

            if str(output).find("busy") >= 0:
                print("System Is Busy, Try After A While")
                sys.exit()
                        
#         print(output)
        
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
        
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
        #print(result[2].decode('ascii'))    
        tn.write(b"quit\n")
        result = tn.expect([b"Are you sure to log out"], command_timeout)
        #print(result[2].decode('ascii'))
        tn.write(b"y\n")
        result = tn.expect([b"#"], command_timeout)
        #print(result[2].decode('ascii'))
        
#         print("\n")
#         
        print("OLT Name: %s, IP: %s, F/S/P/VP: %s/%s/%s/%s" % (oltname, olt_ip, frame, slot, port, virt_port))
        print("\n")
        rx_optical_power_dbm_output = (output.split('Rx optical power(dBm)                  : '))[1].split(str('Rx power current warning threshold'))[0]
        print("Rx optical power(dBm):", rx_optical_power_dbm_output)    
        olt_rx_ont_optical_power_dBm =  (output.split(' OLT Rx ONT optical power(dBm)          : '))[1].split('CATV Rx optical power')[0]
        print("OLT Rx ONT optical power(dBm):", olt_rx_ont_optical_power_dBm)
#         line_profile_id_output = (output.split('Line profile ID      : '))[1].split('Line profile name')[0]
#         print("Line profile ID:", line_profile_id_output)
#         line_profile_name_output = (output.split('Line profile name    : '))[1].split('--')[0]
#         print("Line profile name:", line_profile_name_output)
#         service_profile_id_output = (output.split('Service profile ID   : '))[1].split('Service profile name :')[0]
#         print("Service profile ID:", service_profile_id_output)
#         service_profile_id_output = (output.split('Service profile name : '))[1].split('--')[0]
#         print("Service profile name:", service_profile_id_output)
                
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
