import os, sys, time, re
from telnetlib import Telnet

# user = 'gtsitskishvili2'
# password = 'QNrdmW5J\r'
command_timeout = 5
output = ""
oltname= ""

user = sys.argv[1]
password = sys.argv[2] +'\r'
olt_ip = sys.argv[3]
frame = sys.argv[4]
slot = sys.argv[5]
port = sys.argv[6]
virt_port = sys.argv[7]

# olt_ip = '172.16.51.34'
# frame = '1'
# slot = '2'
# port = '7'
# virt_port = '22'


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
#         print(result[2])

        if str(result[2]).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + ":" + virt_port)
            sys.exit()
        if str(result[2]).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()

        
#         mac_total_number = (str(result[2]).split('Total mac address : '))
        
#         mac_total_number = (str(result[2]).split('Total mac address : '))[1].split(str('\\r\\n\\r\\nMac address'))[0]
#         print(result[2])
        mac_total_number = (str(result[2]).split('Total mac address : '))[1].split(str('\\r\\n'))[0]
        mac_total_number = int(mac_total_number)
#         print("Total mac address :" , mac_total_number)
#         output = result[2].decode('ascii')
        output = result[2]
#         print(output)
#         print(output)
#         print("\n")
#         print("\n")
#         print("\n")
        
        if mac_total_number == 0:
            print("No Mac Addres Found")
#             sys.exit("No Mac Addres Found")            
        elif mac_total_number >= 20:
            print("More Than 20 Mac Addresses")
#             sys.exit("More Than 20 Mac Addresses")
        else:
            tmp = (str(output).split('\\r\\n'))
            for x in range(mac_total_number):
#                 print((str(tmp[x + 5])))
                filtered_tmp = re.sub(' +', ' ', str(tmp[x + 5])).split()
                print(filtered_tmp[0], filtered_tmp[1], filtered_tmp[4], filtered_tmp[5])
                
        tn.write("exit".encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
        tn.write("exit".encode('ascii') +  b"\n")

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
except SystemExit:
    print()                   
except:
    print("Communication error occured with OLT(IP): ", olt_ip, oltname)
