import os, sys, time
import re
from telnetlib import Telnet

user = 'bridge'
password = 'bridge#328'
command_timeout = 100
output = ""
oltname= ""

olt_ip = sys.argv[1]
# frame = sys.argv[2]
board = sys.argv[2]
slot = sys.argv[3]
port = sys.argv[4]

# olt_ip = '172.16.20.70'
frame = '1'
# board = '1'
# slot = '4'
# port = '11'


try:
    with Telnet(olt_ip, 23, 5) as tn:
        result = tn.expect([b"login:"], command_timeout)
        tn.write(user.encode('ascii') + b"\n")        
        result = tn.expect([b"password:"], command_timeout)
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b"#"], command_timeout)
                            
        output = result[2] 

        for i in range(1, 49, 1):
            command = "show xdsl operational-data line " + frame  + "/" +  board + "/" + slot + "/" + str(i)
            tn.write(command.encode('ascii') +  b"\n")
            result = tn.expect([b"#"], command_timeout)
            output += result[2]
        
        
        if str(output).find("invalid token") >= 0 :            
            print("Invalid Frame Or Board Or Slot")
            print("Frame/Board/Slot: " + frame  + "/" +  board + "/" + slot)
            tn.write(b"logout\n")
            sys.exit()
            
        
        print("if-index  adm-state opr-state/tx-rate-ds tx-rate/us tx-rate/ds cur-op-mode")
        print("--------------------------------------------------------------------------")
        for i in str(output).split("\\r\\n"):
            if i.find(frame  + "/" +  board + "/" + slot) >= 0 and i.find("show xdsl operational-data") < 0:
                print(i)
                
        tn.write(b"logout\n")
        
except SystemExit:
    print()                     
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
