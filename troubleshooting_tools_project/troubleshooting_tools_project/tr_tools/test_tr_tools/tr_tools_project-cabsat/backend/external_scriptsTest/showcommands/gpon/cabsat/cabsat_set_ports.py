import os, sys, time
import re
from telnetlib import Telnet

user = 'Silknet'
password = 'Silknet@dmin'
command_timeout = 5

ont_ip = sys.argv[1]
service = sys.argv[2]
port = sys.argv[3]

ont_int = " PortBind_Entry0 "
ont_tv = " PortBind_Entry1 "

lan1 = "e1"
lan2 = "e2"
lan3 = "e3"
lan4 = "e4"
wifi = "w0"

# ont_ip = "31.146.239.237"
# service = "PortBind_Entry0"
# port = "e2"








try:
    with Telnet(ont_ip, 23, 5) as tn:
        result = tn.expect([b"tc login:"], command_timeout)
#         print(result[2].decode('ascii'))
        tn.write(user.encode('ascii') + b"\n")
        result = tn.expect([b"Password:"], command_timeout)
#         print(result[2].decode('ascii'))
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b"#"], command_timeout)
#         print(result[2].decode('ascii'))
        
        command_off_int = "/userfs/bin/tcapi set PortBind_Entry0 " + port + " No"
        command_off_tv = "/userfs/bin/tcapi set PortBind_Entry1 " + port + " No"
        
        command_set_port = "/userfs/bin/tcapi set " + service + " " + port + " Yes"
        
        command_save1 = "/userfs/bin/tcapi commit PortBind"
        command_save2 = "/userfs/bin/tcapi save"
        
        
        tn.write(command_off_int.encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
#         print(result[2].decode('ascii'))        
        
        tn.write(command_off_tv.encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
#         print(result[2].decode('ascii'))
        
        
#         Set Service and Port
        tn.write(command_set_port.encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
#         print(result[2].decode('ascii'))
        
        
#         SAVE                
        tn.write(command_save1.encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
#         print(result[2].decode('ascii'))
                
        tn.write(command_save2.encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
#         print(result[2].decode('ascii'))
        
        
        
        
        
        
        
#         
#                 
#         
#         tn.write("/userfs/bin/tcapi commit PortBind".encode('ascii') +  b"\n")
#         result = tn.expect([b"#"], command_timeout)
#         print(str(result))
#         
#         tn.write("/userfs/bin/tcapi save".encode('ascii') +  b"\n")
#         result = tn.expect([b"#"], command_timeout)
        
        
        tn.close()
        
#         oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]        
#         
#         tn.write(b'enable\n')
#         tn.expect([b"#"], command_timeout)
#         tn.write(b"config\n")
#         tn.expect([b"#"], command_timeout)
#         print("\n")
#         print("OLT Name: %s, IP: %s, F/S/P/VP: %s/%s/%s/%s" % (oltname, ont_ip, frame, slot, port, virt_port))
#         print()
#         command_1 = "interface gpon " + frame + "/" + slot 
#         command_2 = "display ont port state " + port + " " + virt_port + " eth-port all"
#                     
#         tn.write(command_1.encode('ascii') +  b"\n")            
#         tn.expect([b"#"], command_timeout)
#             
#         
#         tn.write(command_2.encode('ascii') +  b"\n")            
#         result = tn.expect([b"#"], command_timeout)
#         output = result[2].decode('ascii')
#         
#         temp = (re.split('--+', output))
# #         print(temp)
#         print(temp[1])
# #         print(temp[2])
#         print((temp[2]).split("\r\n")[1])
# #         print((temp[2]).split("\r\n")[1].split( ))
#         print((temp[2]).split("\r\n")[2])
#         print((temp[2]).split("\r\n")[3])
#         print((temp[2]).split("\r\n")[4])
# 
# 
# #         temp = str(output).split("    " + virt_port + "        ")
# # 
# #         print("ONT Lan Port States")
# #         for x in range(len(temp)):
# #             if x == 0:
# #                 continue
# #                      
# #             if x == (len(temp) - 1):
# #                 tmp_row = temp[x].split("--------------------")[0]
# #             else:
# #                 tmp_row = temp[x]
# #             
# #             print("Lan" + tmp_row[4:len(tmp_row) - 20].replace("          ","   "))
#             
#         
#         
#         
#         tn.write(b"quit\n")
#         result = tn.expect([b"#"], command_timeout)
#         
#         tn.write(b"quit\n")
#         result = tn.expect([b"#"], command_timeout)
#         #print(result[2].decode('ascii'))    
#         tn.write(b"quit\n")
#         result = tn.expect([b"Are you sure to log out"], command_timeout)
#         #print(result[2].decode('ascii'))
#         tn.write(b"y\n")
#         result = tn.expect([b"#"], command_timeout)
#         #print(result[2].decode('ascii'))
        
                
except:
    print("Communication error occured with OLT(IP): ", ont_ip, oltname)
