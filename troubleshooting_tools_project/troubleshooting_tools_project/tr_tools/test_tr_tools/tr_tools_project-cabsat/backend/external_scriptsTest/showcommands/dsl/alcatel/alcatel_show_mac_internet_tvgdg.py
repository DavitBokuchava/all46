import os, sys, time
import re
from telnetlib import Telnet

user = 'bridge'
password = 'bridge#328'
command_timeout = 5
output = ""
oltname= ""

int_mac = ""
tv_mac = ""

olt_ip = sys.argv[1]
# frame = sys.argv[2]
board = sys.argv[2]
slot = sys.argv[3]
port = sys.argv[4]

# olt_ip = '172.16.20.70'
frame = '1'
# board = '1'
# slot = '4'
# port = '39'


try:
    with Telnet(olt_ip, 23, 5) as tn:
        result = tn.expect([b"login:"], command_timeout)
        tn.write(user.encode('ascii') + b"\n")        
        result = tn.expect([b"password:"], command_timeout)
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b"#"], command_timeout)
                            
#         oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]        
      
        command = "show vlan bridge-port-fdb " + frame  + "/" +  board + "/" + slot + "/" + port + ":0:35"
        
        tn.write(command.encode('ascii') +  b"\n")            
        result = tn.expect([b"#"], command_timeout)
        output = result[2]
        
        if str(output).find("bridge-port-fdb count : 0") >= 0:
            int_mac = "No Mac Address For Internet " + board + "/" + slot + "/" + port
#             print("No Mac Address " + board + "/" + slot + "/" + port)
#             tn.write(b"logout\n")
#             sys.exit()
            
            
        
#         print(output)
        for i in str(output).split("\\r\\n"):
            splited_i = i.split()
            if i.find("learned") >=0 and i.find(frame  + "/" +  board + "/" + slot + "/" + port) >= 0 :
                int_mac += "F/S/P: " + splited_i[0] + ", Vlan: " + splited_i[1] + ", Mac: " + splited_i[2]
#                 print("F/S/P: " + splited_i[0] + ", Vlan: " + splited_i[1] + ", Mac: " + splited_i[1])



        command = "show vlan bridge-port-fdb " + frame  + "/" +  board + "/" + slot + "/" + port + ":0:40"
        
        tn.write(command.encode('ascii') +  b"\n")            
        result = tn.expect([b"#"], command_timeout)
        output = result[2]
        
        if str(output).find("bridge-port-fdb count : 0") >= 0:
            tv_mac = "No Mac Address For TV " + board + "/" + slot + "/" + port
#             print("No Mac Address " + board + "/" + slot + "/" + port)
#             tn.write(b"logout\n")
#             sys.exit()
            
            
        
#         print(output)
        for i in str(output).split("\\r\\n"):
            splited_i = i.split()
            if i.find("learned") >=0 and i.find(frame  + "/" +  board + "/" + slot + "/" + port) >= 0 :
                tv_mac += "F/S/P: " + splited_i[0] + ", Vlan: " + splited_i[1] + ", Mac: " + splited_i[2]
#                 print("F/S/P: " + splited_i[0] + ", Vlan: " + splited_i[1] + ", Mac: " + splited_i[1])


        print(int_mac + "\n" + tv_mac)








        
        tn.write(b"logout\n")
        
except SystemExit:
    print()                     
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
