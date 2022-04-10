import os, sys, time
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
                    
        result = tn.expect([b"More--", b"#"], command_timeout)
        output = result[2]
#         print(output.decode('ascii'))
        
        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        
        
        command_2 = "reboot"
        tn.write(command_2.encode('ascii') +  b"\n")
        
        result = tn.expect([b"#"], command_timeout)        
        output = output + result[2]
        
        
        if str(output).find("Code 33987-GPONRM : ONU is unavailable") >= 0:
            print("Can Not Reboot ONT, Because It Is Offline")
            sys.exit()
        else:
            print("ONT Rebooted")
            sys.exit()
            
        
        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        
        
        tn.write("exit".encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
        
        tn.write("exit".encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
        
        tn.write("exit".encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout) 


except SystemExit:
    print()    
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
