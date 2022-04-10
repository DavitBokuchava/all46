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
        command_1 = "show gpon onu detail-info gpon-onu_" + frame + "/" + slot + "/" + port + ":" + virt_port
        
        
        tn.write(command_1.encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
        output = result[2]


        if str(result[2]).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + ":" + virt_port)
            sys.exit()
        if str(result[2]).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
            
        while True:
            if str(output).find("#") >= 0:
                break
            tn.write(b" ")
            result = tn.expect([b"More--", b"#"], command_timeout)
            output = output + result[2]
        
        
        output1 = str(output).replace("--More--\\x08 \\x08\\x08 \\x08\\x08 \\x08\\x08 \\x08\\x08 \\x08\\x08 \\x08\\x08 \\x08\\x08 \\x08\\x08 \\x08 ","")


        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + ":" + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        

#         output = output.decode("ascii")
#         print(output)

        print()
        for n in output1.split("\\r\\r\\n"):
            if n.find("Phase state:         ") >= 0 or n.find("Serial number:       ") >= 0 or n.find("ONU Distance:        ") >= 0  or n.find("Online Duration:     ") >= 0 :
                print(" " + n)
                
        
        output2 = output.decode("ascii")
        
        print(str(output2).split("------------------------------------------")[1].split("OLT")[0])
        

        


except SystemExit:
    print()                   
except:
    print("Communication error occured with OLT(IP): ", olt_ip, oltname)

