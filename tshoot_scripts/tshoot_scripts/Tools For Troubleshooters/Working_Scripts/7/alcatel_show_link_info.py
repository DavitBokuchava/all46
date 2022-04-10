import os, sys, time
import re
from telnetlib import Telnet

user = 'bridge'
password = 'bridge#328'
command_timeout = 5
output = ""
oltname= ""

# olt_ip = sys.argv[1]
# frame = sys.argv[2]
# board = sys.argv[3]
# slot = sys.argv[4]
# port = sys.argv[5]

olt_ip = '172.16.20.70'
frame = '1'
board = '1'
slot = '4'
port = '31'


try:
    with Telnet(olt_ip, 23, 5) as tn:
        result = tn.expect([b"login:"], command_timeout)
        tn.write(user.encode('ascii') + b"\n")        
        result = tn.expect([b"password:"], command_timeout)
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b"#"], command_timeout)
                            
#         oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]        
      
        command = "show xdsl operational-data line " + frame  + "/" +  board + "/" + slot + "/" + port + " detail"
        
        tn.write(command.encode('ascii') +  b"\n")            
        result = tn.expect([b"#"], command_timeout)
        output = result[2].decode('ascii')        
        print(output)
        
        tn.write(b"logout\n")
        
                     
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
