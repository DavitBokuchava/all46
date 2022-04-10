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
        command_1 = "pon-onu-mng gpon-onu_" + frame + "/" + slot + "/" + port + ":" + virt_port
        tn.write(command_1.encode('ascii') +  b"\n")
                    
        result = tn.expect([b"#"], command_timeout)
        output = result[2]
        
        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        
        command_1 = "me-access 1 72 158 0 40,00,52,65,6d,6f,74,65,5f,52,65,73,74,6f,72,65,44,65,66,61,75,6c,74"
        tn.write(command_1.encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
        output = result[2]
        
        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        
        print("Reset Command Was Sent")

        
        
        
 
except SystemExit:
    print()

except:
    print("Communication error occured with OLT(IP): ", olt_ip, oltname)

