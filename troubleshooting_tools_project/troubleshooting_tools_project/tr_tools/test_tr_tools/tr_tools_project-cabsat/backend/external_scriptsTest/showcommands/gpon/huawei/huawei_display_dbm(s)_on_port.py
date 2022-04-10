import os, sys, time
import re
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

# olt_ip = '172.16.18.62'
# OLT-31-5
# olt_ip = '172.16.13.86' #OLT-22-1
# olt_ip = '172.16.27.178' #test_huawei

# frame = "0"
# slot = "1"
# port = "1"
# virt_port ="2"

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
                    
        oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]        
        
        tn.write(b'enable\n')
        tn.expect([b"#"], command_timeout)
        tn.write(b"config\n")
        tn.expect([b"#"], command_timeout)
        print("\n")
        print("OLT Name: %s, IP: %s, F/S/P/: %s/%s/%s/%s" % (oltname, olt_ip, frame, slot, port, virt_port))
        print()
        
        
        command_1 = "interface gpon " + frame + "/" + slot
        command_1_2 = "display ont info " + port + " all"
        command_2 = "display ont optical-info " + port + " all"
                    
        tn.write(command_1.encode('ascii') +  b"\n")            
        result = tn.expect([b"#"], command_timeout)
        output = result[2].decode('ascii')
        
        if str(output).find("Failure: This board does not exist") >= 0:
            print("Incorrect Board: " + slot + ", Failure: This board does not exist")
            quit_func(1)
            sys.exit()
        if str(output).find("Failure: Board type is invalid") >= 0:
            print("Invalid Board: " + slot + ", Failure: Board type is invalid")
            quit_func(1)
            sys.exit()    
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame/Slot: " + frame + "/" + slot)
            quit_func(1)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            quit_func(1)
            sys.exit()
        
        tn.write(command_1_2.encode('ascii') +  b"\n")            
        result = tn.expect([b"#", b"\) ----", b"}:"], command_timeout)
        output = result[2]
        
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Port: " + port)
            quit_func(2)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            quit_func(2)
            sys.exit()
        
        
        tn.write(b"\n")
        result = tn.expect([b"#", b"\) ----", b"}:"], command_timeout)
        output += result[2]
        
        
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            quit_func(2)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            quit_func(2)
            sys.exit()
        
        
                
        while True:
            if str(output).find("#") >= 0:
                break
                
            tn.write(b" ")
            result = tn.expect([b"#", b"\) ----"], command_timeout)
            output += result[2]
            
            if str(output).find("% Parameter error, the error locates at '^'") >= 0:
                print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
                quit_func(2)
                sys.exit()
            if str(output).find("busy") >= 0:
                print("System Is Busy, Try After A While")
                quit_func(2)
                sys.exit()


            
        online_ont = str(output).split("online: ")[1].split("\\r\\n\\r\\n")[0]
        
        
        if int(online_ont) == 0:
            print("Online ONTs On Port " + frame + "/" + slot + "/" + port + " Are: 0")
            quit_func(2)
            sys.exit()
        
        
            
        for n in str(output).split("\\r\\n"):
            if n.find("online: ") >= 0:
                print("Online ONTs On Port " + frame + "/" + slot + "/" + port + " Are: " + n.split("online: ")[1])
                print()
 
 
        tn.write(command_2.encode('ascii') +  b"\n")     
        result = tn.expect([b"}:", b"#", b"\) ----"], 30)
        output = result[2]
        
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            quit_func(2)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            quit_func(2)
            sys.exit()
        
        
        
        tn.write(b"\n")
        result = tn.expect([b"#", b"\) ----"], command_timeout)
        output += result[2]
        
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            quit_func(2)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            quit_func(2)
            sys.exit()
        
        cnt = 0
        
        while True:
            if str(output).find("#") >= 0:
                break
                
            tn.write(b" ")
            result = tn.expect([b"#", b"\) ----"], 100)
            output += result[2]
            if str(output).find("% Parameter error, the error locates at '^'") >= 0:
                print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
                quit_func(2)
                sys.exit()
            if str(output).find("busy") >= 0:
                print("System Is Busy, Try After A While")
                quit_func(2)
                sys.exit()





            
        for n in str(output).split("\\r\\n"):
            if n.find("---- More") >= 0 :
                n = n.replace("---- More ( Press 'Q' to break ) ----\\x1b[37D                                     \\x1b[37D","")
            if n.find("display ont optical-info") >= 0 or n.find("config-if-gpon") >= 0 or n.find("{ <cr>||<K> }:") >=0 or n.find("Command") >=0:
                continue
            
            print(n)

        
        
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            quit_func(2)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            quit_func(2)
            sys.exit()
            
            
        
        quit_func(2)
        
        
except SystemExit:
    print()
    
except:
    print("Communication error occured with OLT(IP): ", olt_ip, oltname)
