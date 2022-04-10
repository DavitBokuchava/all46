import os, sys, time
import re
from telnetlib import Telnet

# user = 'gtsitskishvili2'
# password = 'QNrdmW5J\r'
command_timeout = 10
output = ""
oltname= ""

# olt_ip = "172.16.4.190" #OLT 34-1

# olt_ip = "172.16.51.34" #OLT-KABALI-1
user = sys.argv[1]
password = sys.argv[2] +'\r'
olt_ip = sys.argv[3]
mac = sys.argv[4]
vlan = sys.argv[5]

# vlan = "220"
# mac = "0c49.33a2.c3f8"



try:
    with Telnet(olt_ip, 23, 5) as tn:
        tn.expect([b"Username:"], command_timeout)
        tn.write(user.encode('ascii') + b"\n")
        tn.expect([b"Password:"], command_timeout)
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b"#"], command_timeout)
#         print("\n")
                    
        oltname = (str(result[2]).split(str('\\r\\n')))[1].split('#')[0]
        print("OLT Name: %s, IP: %s, Mac: %s, Vlan: %s" % (oltname, olt_ip, mac, vlan))
        

        tn.write(b"configure terminal\n")
        result = tn.expect([b"#"], command_timeout)
        command_1 = "mac delete " + mac + " vlan " + vlan
        
        tn.write(command_1.encode('ascii') +  b"\n")
                    
        result = tn.expect([b"#"], command_timeout)
        output = result[2].decode('ascii')
#         print(output)
#         sys.exit()
        
        

        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Mac Address")
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
            
        print("Mac Address Was Deleted Successfully")
        


except SystemExit:
    print()                   
except:
    print("Communication error occured with OLT(IP): ", olt_ip, oltname)

