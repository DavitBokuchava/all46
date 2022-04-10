import os, sys, time
import re
from telnetlib import Telnet

user = 'gtsitskishvili2'
password = 'QNrdmW5J\r'
command_timeout = 10
output = ""
oltname= ""

# olt_ip = sys.argv[1]
# frame = sys.argv[2]
# slot = sys.argv[3]
# port = sys.argv[4]
# virt_port = sys.argv[5]

olt_ip = '172.16.4.74'
frame = '0'
slot = '1'
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
        print("\n")
        print("OLT Name: %s, IP: %s, F/S/P/VP: %s/%s/%s/%s" % (oltname, olt_ip, frame, slot, port, virt_port))
        print()
        command_1 = "interface gpon " + frame + "/" + slot 
        command_2 = "ont reset " + port + " " + virt_port
        
        
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
        result = tn.expect([b"Are you sure to reset the ONT"], command_timeout)
        output = result[2].decode('ascii')
#         print(output)
        
        
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        
        
        tn.write(b"y\n")
        result = tn.expect([b"#"], command_timeout)
        output = result[2].decode('ascii')
              
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
            
        if str(output).find("Failure: The ONT is not online") >= 0:
            print("Can Not Reboot ONT, Because It Is Offline")
            sys.exit()
        else:
            print("ONT Rebooted")
            sys.exit()
            
#         print(output)            

        
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
        
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)        
#         print(result[2].decode('ascii'))    
        tn.write(b"quit\n")
        result = tn.expect([b"Are you sure to log out"], command_timeout)
#         print(result[2].decode('ascii'))
        tn.write(b"y\n")
#         result = tn.expect([b"#"], command_timeout)
        #print(result[2].decode('ascii'))
        
                
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
