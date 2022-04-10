import os, sys, time
import re
from telnetlib import Telnet

# user = 'gtsitskishvili2'
# password = 'QNrdmW5J\r'
command_timeout = 10
output = ""
oltname= ""

user = sys.argv[1]
password = sys.argv[2] +'\r'
olt_ip = sys.argv[3]
frame = sys.argv[4]
slot = sys.argv[5]
port = sys.argv[6]
virt_port = sys.argv[7]

# olt_ip = '172.16.51.34'
# frame = '1'
# slot = '2'
# port = '7'
# virt_port = '22'


try:
    with Telnet(olt_ip, 23, 5) as tn:
        tn.expect([b"Username:"], command_timeout)
        tn.write(user.encode('ascii') + b"\n")
        tn.expect([b"Password:"], command_timeout)
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b"#"], command_timeout)
        print("\n")
                    
        oltname = (str(result[2]).split(str('\\r\\n')))[1].split('#')[0]
        print("OLT Name: %s, IP: %s, F/S/P/VP: %s/%s/%s/%s" % (oltname, olt_ip, frame, slot, port, virt_port))
        

        tn.write(b"configure terminal\n")
        result = tn.expect([b"#"], command_timeout)
        command_1 = "show gpon remote-onu interface eth gpon-onu_" + frame + "/" + slot + "/" + port + ":" + virt_port
        tn.write(command_1.encode('ascii') +  b"\n")
                    
        result = tn.expect([b"More--", b"#"], command_timeout)
        output = result[2].decode('ascii')
        
        
        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
            
        
        for x in range(2):            
            tn.write(b" ")
            result = tn.expect([b"More--", b"#"], command_timeout)
            output += result[2].decode('ascii')
        
#         print(output)
#         splited_eth = output.split("Interface:     eth_0")
#         print(splited_eth[2])
        print("\n\n")
        interface_eth = str(output).split('Interface:     ')
        
        interface_eth1 = interface_eth[1].split('Arc:')[0]
        print(interface_eth1)
        
        interface_eth2 = interface_eth[2].split('Arc:')[0]
        print(interface_eth2)
        
        interface_eth3 = interface_eth[3].split('Arc:')[0]
        print(interface_eth3)
        
        interface_eth4 = interface_eth[4].split('Arc:')[0]
        print(interface_eth4)


except SystemExit:
    print()                   
except:
    print("Communication error occured with OLT(IP): ", olt_ip, oltname)
