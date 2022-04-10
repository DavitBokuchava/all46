import os, sys, time
import re
from telnetlib import Telnet
from datetime import datetime

command_timeout = 5

# soft_switch_ip = sys.argv[1]
# number = sys.argv[2]
# lp = sys.argv[3]
soft_switch_ip ="172.16.34.160"
number = "221186"
lp = "67"





try:
    now = datetime.now()
    current_time = now.strftime("%Y%m")
#     print("Current Time = " + current_time)
    
    with Telnet(soft_switch_ip, 6000, 5) as tn:
        tn.write(("LGI:op=\"trouble\",PWD =\"Silknet" + current_time + "\",SER=\"172.16.50.230---O&M System\";").encode('ascii') +  b"\n")
        result = tn.expect([b"END"], command_timeout)
#         print(result[2].decode('ascii'))
    
        tn.write(("DSP EPST: IEF=DOMAIN1, QUERYBY=METHOD0, D=K'" + number + "," + " LP=" + lp + ";").encode('ascii') +  b"\n")
        result = tn.expect([b"END"], command_timeout)
        print(result[2].decode('ascii'))
        
        

        
        
        
        
                
except:
    print("Communication error occured with Device: " + soft_switch_ip)
