from telnetlib import Telnet
import time, re, sys
import pandas as pd
from datetime import datetime


now = datetime.now()
now1 = time.time()

output_file = str(now.strftime("%Y-%m-%d.%H-%M"))
output_file = output_file + "_HW" + ".xlsx"
log_file = output_file + "_HW" + ".log"

data = pd.read_excel (r'bolt.xlsx')

data_dict = data.to_dict(orient = 'record')


command_timeout = 20
sys_busy_sleep = 3

ont_sn = "3043343933C36550"

# ont_sn = "AAAAAAAAAAAAAAAA"

user = 'gtsitskishvili2'
password = 'QNrdmW5J\r'



data_dict_len = len(data_dict)
# print(data_dict_len)


def my_func(olt_ip, olt_name):
    
    f = open("Result_HW_OLT.log", "a")
    
    print(olt_ip, olt_name)

    try:
        with Telnet(olt_ip, 23, 7) as tn:
            tn.expect([b">>User name:"], command_timeout)        
            tn.write(user.encode('ascii') + b"\n")
            tn.expect([b">>User password:"], command_timeout) 
            tn.write(password.encode('ascii') + b"\n")
            
            tn.write(b'enable\n')
            tn.expect([b"#"], command_timeout)
            
            tn.write(b"config\n")
            tn.expect([b"#"], command_timeout)
            
            command = "display ont info by-sn " + ont_sn
            tn.write(command.encode('ascii') +  b"\n")
   
            result = tn.expect([b"\) ----", b" }:", b"#"], command_timeout)
            output_registered = result[2]
            
            if str(result[2]).find(" }:") >= 0:
                tn.write(b"\n")
                result = tn.expect([b"\) ----", b"#"], command_timeout)
                output_registered = result[2]
                            
            if str(result[2]).find(") ----") >= 0:
                tn.write(b"q")
                

            output_registered = str(output_registered)    
                
                
                
            command = "display  ont autofind  all"
            
            tn.write(command.encode('ascii') +  b"\n")
            result = tn.expect([b"\) ----", b" }:", b"#"], command_timeout)
            output_autofind = str(result[2])            
            tn.write(b"\n")
            
            while True:                    
                result = tn.expect([b"\) ----", b"#"], command_timeout)
                output_autofind += str(result[2])
                
                if str(result[2]).find("#") >= 0:
                    break
                    
                tn.write(b" ")
                time.sleep(0.5)
                
            
            

            
            
                
            quit_command = "quit"
            tn.write(quit_command.encode('ascii') +  b"\n")
            yy = tn.expect([b"#"], command_timeout)
            
            tn.write(b"quit\n")
            yy=tn.expect([b"log out?"], command_timeout)
            tn.write(b"y\n")
            
            
            if output_registered.find("F/S/P                   : ") >= 0:
                fsp = output_registered.split("F/S/P                   : ")[1].split("\\r\\n")[0]
                ont_id = output_registered.split("ONT-ID                  : ")[1].split("\\r\\n")[0]
                print("Registered On: " + olt_name + " F/S/P/VP: " + fsp + "/" + ont_id + ", OLT IP: " + olt_ip)
                return "true"
            
            
            
            
            if output_autofind.find(ont_sn) >= 0:
                fsp = output_autofind.split(ont_sn)[0]
                fsp = fsp.split(" : ")
                fsp = fsp[len(fsp) - 2]
                fsp = fsp.split("\\r\\n")
                fsp= fsp[0]
                print("Autofind On: " + olt_name + " " + fsp + ", OLT IP: "+olt_ip )
                return "true"
        
        
            return "false"

            
       
            
            
            
    except:
        print("================================Error Ocurred On OLT: - ", olt_ip, olt_name,", Time: ", datetime.now().strftime("%Y-%m-%d.%H-%M")  )
 
    



for dict_row in data_dict:
    
    if dict_row['vendor'] == "huawei":
        temp = my_func(dict_row['oltip'],dict_row['oltname'])
        if str(temp).find("true") >= 0:
            break
        

later = time.time()
print("Time: " + str(float(later - now1)))
    
    