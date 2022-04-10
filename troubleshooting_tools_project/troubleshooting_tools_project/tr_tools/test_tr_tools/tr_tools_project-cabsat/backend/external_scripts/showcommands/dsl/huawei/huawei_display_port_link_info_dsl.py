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
        
        command = "interface adsl " + board + "/" + slot
        # print(command)
        command1 = "display line operation " + port
        
            
        tn.write(command.encode('ascii') +  b"\n")            
        result = tn.expect([b"#"], command_timeout)
        output = result[2].decode('ascii')
        
        if str(output).find("% Unknown command, the error locates at '^'") >= 0:

            quit_func(1)
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            sys.exit()
            
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:

            quit_func(1)            
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            sys.exit()
            
        if str(output).find("busy") >= 0:

            quit_func(1)
            
            print("System Is Busy, Try After A While")
            sys.exit()
            
        tn.write(command1.encode('ascii') +  b"\n")
        result = tn.expect([b" Are you sure to continue"], command_timeout)
        output = result[2].decode('ascii')
#         print(output)
        
        
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:

            quit_func(2)            
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            sys.exit()
            
        if str(output).find("busy") >= 0:

            quit_func(2)            
            print("System Is Busy, Try After A While")
            sys.exit()
            
        tn.write(b"y\n")
#         result = tn.expect([re.compile(b'/)#$')], command_timeout)
        result = tn.expect([b'##'], 0.7)
        
#         print(result[2])
        
        if str(result[2]).find("is not active") >= 0:

            quit_func(2)            
            print(board + "/" + slot + "/" + port + ": Port is not active")
            sys.exit()
                
                
        result = str(result[2]).split("----------------------------------------------------------\\r\\n")
        print(result[1].replace("\\r\\n", "\n"))
        
        for i in str(result[2]).split("\\r\\n"):
            if i.find(" : ") >= 0:
                print(i)
#         print(result[2].replace("\\r\\n", "\n"))


        quit_func(2)
        
        
        
except SystemExit:
    print() 
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
