import os, sys, time
import re
from telnetlib import Telnet

user = 'operator'
password = '$olaris#1'
command_timeout = 5
output = ""
oltname= ""


olt_ip = sys.argv[1]
board = sys.argv[2]
slot = sys.argv[3]
port = sys.argv[4]

# olt_ip = '172.16.50.114'
# board = '0'
# slot = '6'
# port = '1'




def quit_func(i):
    for x in range(i):
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
#         print(result[2].decode('ascii'))
       
       
    tn.write(b"quit\n")
    result = tn.expect([b":"], command_timeout)
    tn.write(b"y\n")
#     print(result[2].decode('ascii'))


try:
    with Telnet(olt_ip, 23, 5) as tn:
        tn.expect([b">>User name:"], command_timeout)
        tn.write(user.encode('ascii') + b"\n")
        tn.expect([b">>User password:"], command_timeout)
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b">"], command_timeout)
        
                    
#         oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]        

        tn.write(b'enable\n')
        result = tn.expect([b"#"], command_timeout)
        
        tn.write(b"config\n")
        result = tn.expect([b"#"], command_timeout)
        
        
        dslam_name = ""
        for i in str(result[2]).split("\\r\\n"):
            if i.find("config") >= 0:
                dslam_name = i
        
        
        dslam_name = dslam_name.split("(config)")[0]
        
        
        command = "display adsl port state " + board + "/" + slot
        
        tn.write(command.encode('ascii') +  b"\n")            
        result = tn.expect([b"#", b"}:"], command_timeout)
        tn.write(b"\n")
        result = tn.expect([b"#", b"\) ----"], command_timeout)
        output = result[2]
        
        while True:
            if str(output).find("#") >= 0:
                break
            tn.write(b" ")
            result = tn.expect([b"#", b"\) ----"], command_timeout)
            output += result[2]
        
        
        
        splited_output = str(output).split("----------------------------------------------------------------------")[1] + "----------------------------------------------------------------------"        
        splited_output += str(output).split("----------------------------------------------------------------------")[2] + "----------------------------------------------------------------------"
        splited_output += str(output).split("----------------------------------------------------------------------")[3]
        
        
        print("DSLAM: " + dslam_name + "\nBoard/SLOT: " + board + "/" + slot)
        
        for n in str(splited_output).split("\\r\\n"):
            if n.find("Press 'Q'") >= 0 or n.find("config") >= 0:
                continue
            print(n)
        
        

        
        if str(output).find("% Unknown command, the error locates at '^'") >= 0:
            quit_func(1)
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            quit_func(1)
            sys.exit()            
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            quit_func(1)
            sys.exit()
        if str(output).find("busy") >= 0:            
            print("System Is Busy, Try After A While")
            quit_func(1)
            sys.exit()
            



        quit_func(1)
        
        
        
except SystemExit:
    print() 
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
