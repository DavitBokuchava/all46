import sys
from telnetlib import Telnet
import time
command_timeout = 5

olt_ip = '172.16.13.86'
frame = '0'
slot = '12'
port = '0'
virt_port = '0'
output = ""


user = 'gtsitskishvili2'
password = 'QNrdmW5J\r'


def olt_busy_fun(x):
    if (str(x).find("busy") >= 0) or (str(x).find("It will take several minutes to save configuration file") >= 0):
        print("System Busy")
        quit()
    
def too_many_users_fun(x):
    if (str(x).find("many user") >= 0):
        print("Too Many Users")
        quit()



try:
    with Telnet(olt_ip, 23, 5) as tn:
        result = tn.expect([b">>User name:"], command_timeout)
        too_many_users_fun(result[2])
                
        tn.write(user.encode('ascii') + b"\n")
        result = tn.expect([b">>User password:"], command_timeout)
        too_many_users_fun(result[2])
        
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b">"], command_timeout)
        too_many_users_fun(result[2])
            
        oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]        
        
        
        tn.write(b'enable\n')
        tn.expect([b"#"], command_timeout)
        olt_busy_fun(result[2])
        
        tn.write(b"config\n")
        tn.expect([b"#"], command_timeout)
        olt_busy_fun(result[2])
        
        
      
        command = "display ont info " + frame + " " + slot + " " + port + " " + virt_port
        print(command)
        
        result = ""
            
        tn.write(command.encode('ascii') +  b"\n")            
        result = tn.expect([b"\) ----"], command_timeout)
        output = result[2].decode('ascii')
        
        olt_busy_fun(result[2])

        for x in range(6):
            
            tn.write(b" ")
            result = tn.expect([b"\) ----", b"#"], command_timeout)
            output += result[2].decode('ascii')
            
            olt_busy_fun(result[2])
            
            
        #print(output)
        

            

 
 

        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
        #print(result[2].decode('ascii'))
        olt_busy_fun(result[2])
        
        tn.write(b"quit\n")
        result = tn.expect([b"Are you sure to log out"], command_timeout)
        #print(result[2].decode('ascii'))
        olt_busy_fun(result[2])
        
        tn.write(b"y\n")
        result = tn.expect([b"#"], command_timeout)
        olt_busy_fun(result[2])
        #print(result[2].decode('ascii'))
        #print("Log Out From OLT "+ oltname)
        
        print("\n")
        print("\n")
        
        run_state_output = (output.split('Run state               :'))[1].split('Config state')[0]
        print("Run state: ",run_state_output)
        config_state_output =  (output.split('Config state            :'))[1].split('Match state')[0]
        print("Config state: ",config_state_output)
        line_profile_id_output = (output.split('Line profile ID      :'))[1].split('Line profile name')[0]
        print("Line profile ID:",line_profile_id_output)
        line_profile_name_output = (output.split('Line profile name    :'))[1].split('--')[0]
        print("Line profile name:",line_profile_name_output)
        service_profile_id_output = (output.split('Service profile ID   :'))[1].split('Service profile name :')[0]
        print("Service profile ID:",service_profile_id_output)
        service_profile_id_output = (output.split('Service profile name :'))[1].split('--')[0]
        print("Service profile name:",service_profile_id_output)
        
        
        
except:
    print("error ecured on ip - ")
