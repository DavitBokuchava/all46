import os, sys, time
import re
from telnetlib import Telnet

user = 'bridge'
password = 'bridge#328'
command_timeout = 5
output = ""
oltname= ""

int_service_port = ""
tv_service_port = ""

olt_ip = sys.argv[1]
# frame = sys.argv[2]
board = sys.argv[2]
slot = sys.argv[3]
port = sys.argv[4]

# olt_ip = '172.16.20.70'
frame = '1'
# board = '1'
# slot = '4'
# port = '30'


try:
    with Telnet(olt_ip, 23, 5) as tn:
        result = tn.expect([b"login:"], command_timeout)
        tn.write(user.encode('ascii') + b"\n")        
        result = tn.expect([b"password:"], command_timeout)
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b"#"], command_timeout)
                            
#         oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]        
      
        command = "info configure bridge port " + frame  + "/" +  board + "/" + slot + "/" + port + ":0:35"
        
        tn.write(command.encode('ascii') +  b"\n")            
        result = tn.expect([b"bridge>#"], command_timeout)
        output = result[2]
        
        if str(output).find("instance does not exist") >= 0:
            int_service_port = "No Serive Port On  Internet: S/F/P: " + frame + "/" + board + "/" + slot + "/" + port
 

        for i in str(output).split("\\r\\n"):
            
            if (i.find("port") >= 0 or i.find("vlan-id") >= 0  or i.find("pvid") >= 0) and i.find("info configure") < 0 :
                int_service_port += i.strip() + "\n"



        command = "info configure bridge port " + frame  + "/" +  board + "/" + slot + "/" + port + ":0:40"
        
        tn.write(command.encode('ascii') +  b"\n")            
        result = tn.expect([b"bridge>#"], command_timeout)
        output = result[2]
        
        
               
        if str(output).find("instance does not exist") >= 0:
            tv_service_port = "No Serive Port On  TV: S/F/P: " + frame + "/" + board + "/" + slot + "/" + port
 
 

        for i in str(output).split("\\r\\n"):
            
            if (i.find("port") >=0 or i.find("vlan-id") >= 0  or i.find("pvid") >= 0) and i.find("info configure") < 0 :
                tv_service_port += i.strip() + "\n"
            
 

        print(int_service_port + "\n" + tv_service_port)








        
        tn.write(b"logout\n")
        
except SystemExit:
    print()                     
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
