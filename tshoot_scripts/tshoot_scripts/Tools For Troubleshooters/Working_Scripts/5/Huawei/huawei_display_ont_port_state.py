import os, sys, time
import re
from telnetlib import Telnet

user = 'gtsitskishvili2'
password = 'QNrdmW5J\r'
command_timeout = 10
output = ""
oltname= ""

# olt_ip = sys.argv[1]
# frame = sys.argv[2]
# slot = sys.argv[3]
# port = sys.argv[4]
# virt_port = sys.argv[5]

olt_ip = '172.16.13.86'
frame = '0'
slot = '12'
port = '0'
virt_port = '0'


try:
    with Telnet(olt_ip, 23, 5) as tn:
        tn.expect([b">>User name:"], command_timeout)
        tn.write(user.encode('ascii') + b"\n")
        tn.expect([b">>User password:"], command_timeout)
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b">"], command_timeout)
                    
        oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]        
        
        tn.write(b'enable\n')
        tn.expect([b"#"], command_timeout)
        tn.write(b"config\n")
        tn.expect([b"#"], command_timeout)
        print("\n")
        print("OLT Name: %s, IP: %s, F/S/P/VP: %s/%s/%s/%s" % (oltname, olt_ip, frame, slot, port, virt_port))
        print()
        command_1 = "interface gpon " + frame + "/" + slot 
        command_2 = "display ont port state " + port + " " + virt_port + " eth-port all"
                    
        tn.write(command_1.encode('ascii') +  b"\n")            
        result = tn.expect([b"#"], command_timeout)
        output = result[2].decode('ascii')
        
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
            
        
        tn.write(command_2.encode('ascii') +  b"\n")            
        result = tn.expect([b"#"], command_timeout)
        output = result[2].decode('ascii')
        
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        
        temp = (re.split('--+', output))
#         print(temp)
        print(temp[1])
#         print(temp[2])
        print((temp[2]).split("\r\n")[1])
#         print((temp[2]).split("\r\n")[1].split( ))
        print((temp[2]).split("\r\n")[2])
        print((temp[2]).split("\r\n")[3])
        print((temp[2]).split("\r\n")[4])


#         temp = str(output).split("    " + virt_port + "        ")
# 
#         print("ONT Lan Port States")
#         for x in range(len(temp)):
#             if x == 0:
#                 continue
#                      
#             if x == (len(temp) - 1):
#                 tmp_row = temp[x].split("--------------------")[0]
#             else:
#                 tmp_row = temp[x]
#             
#             print("Lan" + tmp_row[4:len(tmp_row) - 20].replace("          ","   "))
            
        
        
        
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
        
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
        #print(result[2].decode('ascii'))    
        tn.write(b"quit\n")
        result = tn.expect([b"Are you sure to log out"], command_timeout)
        #print(result[2].decode('ascii'))
        tn.write(b"y\n")
        result = tn.expect([b"#"], command_timeout)
        #print(result[2].decode('ascii'))
        
                
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
