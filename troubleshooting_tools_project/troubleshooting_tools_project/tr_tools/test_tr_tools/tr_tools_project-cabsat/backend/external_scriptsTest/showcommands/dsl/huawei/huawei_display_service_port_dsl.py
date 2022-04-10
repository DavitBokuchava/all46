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
# port = '2'


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
        
        
      
        command = "display service-port port " + board + "/" + slot + "/"+ port
#         print(command)
        
        tn.write(command.encode('ascii') +  b"\n")        
        result = tn.expect([b"#", b"<K> "], command_timeout)
        output = result[2]
        tn.write(b"\n")
        result = tn.expect([b"#"], command_timeout)
        output += result[2]
#         print(output.decode('ascii'))
       
       
       
        if str(output).find("No service virtual port can be operated") >= 0:
            quit_func(1)
            print("No service virtual port can be operated " + board + "/" + slot + "/" + port)
            sys.exit()
        if str(output).find("MAC address does not exist") >= 0:
            quit_func(1)
            print("MAC address does not exist: " + board + "/" + slot + "/" + port)
            sys.exit()
        if str(output).find("Board does not exist") >= 0:
            quit_func(1)
            print("Board does not exist: " + board + "/" + slot + "/" + port)
            sys.exit()
        if str(output).find("The port does not exist") >= 0:
            quit_func(1)
            print("The port does not exist: " + board + "/" + slot + "/" + port)
            sys.exit()
        if str(output).find("% Unknown command, the error locates at '^'") >= 0:
            quit_func(1)
            print("Incorrect Frame or Slot or Port or Vport: " + board + "/" + slot + "/" + port)
            sys.exit()            
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            quit_func(1)
            print("Incorrect Frame or Slot or Port or Vport: " + board + "/" + slot + "/" + port)
            sys.exit()
        if str(output).find("busy") >= 0:
            quit_func(1)
            print("System Is Busy, Try After A While")
            sys.exit()
            
        
#         print(output)
        output = str(output).split("------------------------------------------------------------------------------")[2]
#         print(output)
        for i in output.split("\\r\\n"):
            
            if len(i) > 2:
                splited_i = i.split()
                print("Vlan: " + splited_i[0] + ", F/S/P: " + splited_i[3] + splited_i[4] + splited_i[5] + ", VPI: " + splited_i[6] + ", VCI: " + splited_i[7] + ", RX: " + splited_i[10] + ", TX: " + splited_i[11])
        

        quit_func(1)
#         tn.write(b"quit\n")
#         result = tn.expect([b"#"], command_timeout)
#         
#         tn.write(b"quit\n")
#         result = tn.expect([b":"], command_timeout)
#         tn.write(b"y\n")
        
        
except SystemExit:
    print()                     
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)

