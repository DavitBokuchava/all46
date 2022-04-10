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

# ont_sn = "0C49338143D6"


ont_sn = "ZTEGC8208488"

user = 'gtsitskishvili2'
password = 'QNrdmW5J\r'



data_dict_len = len(data_dict)
# print(data_dict_len)


def my_func(olt_ip, olt_name):
    
    f = open("Result_ZTE_OLT.log", "a")
    
    print(olt_ip, olt_name)

    try:
        with Telnet(olt_ip, 23, 20) as tn:
            tn.write(user.encode('ascii') + b"\n")
            tn.expect([b"Password:"], command_timeout)
            tn.write(password.encode('ascii') + b"\n")
            tn.expect([b"#"], command_timeout)
            tn.write(b"conf t\n")
            tn.expect([b"#"], command_timeout)
            
            command = "show gpon onu by sn " + ont_sn
            tn.write(command.encode('ascii') +  b"\n")
   
            result = tn.expect([b"#"], command_timeout)
            output_registered = str(result[2])
            
            

            
            
            command = "show gpon onu uncfg"
            tn.write(command.encode('ascii') +  b"\n")
            result = tn.expect([b"--More--",b"#"], command_timeout)
            output_autofind = str(result[2])            
            tn.write(b"\n")
            
            while True:                    
                result = tn.expect([b"--More--", b"#"], command_timeout)
                output_autofind += str(result[2])
                
                if str(result[2]).find("#") >= 0:
                    break
                    
                tn.write(b" ")
                time.sleep(0.5)
                

            
            
            
            
            tn.write(b"exit\n")
            yy=tn.expect([b"#"], command_timeout)
            tn.write(b"exit\n")
            
            
            
            if output_registered.find("gpon-onu_") >= 0 and output_registered.find("No related information to show") < 0:
                output_registered = str(output_registered)
                output_registered = output_registered.split("\\r\\n")            
                output_registered = output_registered[len(output_registered)-2]
                print("Registered On: " + olt_name + " " + output_registered + ", OLT IP: " + olt_ip)
                return "true"
            
            
            
            for n in output_autofind.split("\\r\\n"):
                if n.find(ont_sn) >= 0:
                    print("Autofind On: " + olt_name + " " + n.split()[0] + ", OLT IP: "+ olt_ip )
                    return "true"
            
            return "false"
            
 
            
    except:
        print("================================Error Ocurred On OLT: - ", olt_ip, olt_name,", Time: ", datetime.now().strftime("%Y-%m-%d.%H-%M")  )
 
    



for dict_row in data_dict:
    
    if dict_row['vendor'] == "zte":
        temp = my_func(dict_row['oltip'],dict_row['oltname'])
        if str(temp).find("true") >= 0:
            break
        

later = time.time()
print("Time: " + str(float(later - now1)))