import os, sys, time
import re
from telnetlib import Telnet

user = 'bridge'
password = 'bridge#328'
command_timeout = 5
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
                            
#         oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]        
      
        command = "show xdsl operational-data line " + frame  + "/" +  board + "/" + slot + "/" + port + " detail"
        
        tn.write(command.encode('ascii') +  b"\n")            
        result = tn.expect([b"#"], command_timeout)
        output = result[2]
        
        

            
        
        output = str(output).split("---------\\r\\n")
        output = output[len(output) - 1]
#         print(output)

        output = output.split("\\r\\n=========")[0]
#         print(output)
        
        for i in str(output).split("\\r\\n"):
            print(i)
        
        
        
        
#         if str(output).find("Board is not planned") >= 0:
#             print("Wrong Board - " + board + "/" + slot + "/" + port)
#         else:
#             print(output)
        
        tn.write(b"logout\n")
        
except SystemExit:
    print()                     
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
