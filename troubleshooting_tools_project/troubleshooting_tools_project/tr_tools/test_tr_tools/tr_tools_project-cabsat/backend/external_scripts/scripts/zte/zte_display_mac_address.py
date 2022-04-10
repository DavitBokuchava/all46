import os, sys, time, re
from telnetlib import Telnet

user = 'gtsitskishvili2'
password = 'QNrdmW5J\r'
command_timeout = 5
output = ""
oltname= ""

# olt_ip = sys.argv[1]
# frame = sys.argv[2]
# slot = sys.argv[3]
# port = sys.argv[4]
# virt_port = sys.argv[5]

olt_ip = '172.16.51.34'
frame = '1'
slot = '2'
port = '2'
virt_port = '1'


try:
    with Telnet(olt_ip, 23, 5) as tn:
        tn.expect([b"Username:"], command_timeout)
        tn.write(user.encode('ascii') + b"\n")
        tn.expect([b"Password:"], command_timeout)
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b"#"], command_timeout)
        print("\n")
                    
        oltname = (str(result[2]).split(str('\\r\\n')))[1].split('#')[0]
        print("OLT Name: %s, IP: %s, F/S/P/VP: %s/%s/%s/%s" % (oltname, olt_ip, frame, slot, port, virt_port))
        

        tn.write(b"configure terminal\n")
        result = tn.expect([b"#"], command_timeout)
        command_1 = "show mac gpon onu gpon-onu_" + frame + "/" + slot + "/" + port + ":" + virt_port
        
        tn.write(command_1.encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)        
        
        mac_total_number = (str(result[2]).split('Total mac address : '))[1].split(str('\\r\\n\\r\\nMac address'))[0]
        mac_total_number = int(mac_total_number)
        
#         output = result[2].decode('ascii')
        output = str(result[2])
        print(output)
        print("\n")
        print("\n")
        print("\n")
        
        if mac_total_number == 0:
            print("No Mac Addres Found")
            sys.exit("No Mac Addres Found")            
        elif mac_total_number >= 20:
            print("More Than 20 Mac Addresses")
            sys.exit("More Than 20 Mac Addresses")
        else:
            temp = (re.split('--+', output))
#             print(temp[1])
            
            mac_row = []
            tmp = (str(temp[1]).split('\\r\\n'))
            
#             print(tmp[0])
#             print(tmp[1])
#             print(tmp[2])
                
            for x in range(mac_total_number):
#                 temp = (str(output).split('\\r\\n'))  
#                 temp = "Mac: " + temp.split()[0] + "  Vlan: " + temp.split()[-1]
#                 mac_row.append(temp)
#                 print(mac_row[x])
                print(tmp[x + 1].split( )[1])
# 
#         
#         tn.write(b"quit\n")
#         result = tn.expect([b"#"], command_timeout)
#         #print(result[2].decode('ascii'))    
#         tn.write(b"quit\n")
#         result = tn.expect([b"Are you sure to log out"], command_timeout)
#         #print(result[2].decode('ascii'))
#         tn.write(b"y\n")
#         result = tn.expect([b"#"], command_timeout)
#                     
                
except:
    print("Communication error occured with OLT(IP): ", olt_ip, oltname)
