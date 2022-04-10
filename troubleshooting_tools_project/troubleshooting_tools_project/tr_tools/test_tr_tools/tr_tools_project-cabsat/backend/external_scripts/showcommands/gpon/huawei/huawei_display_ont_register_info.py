import os, sys, time
from telnetlib import Telnet

user = 'gtsitskishvili2'
password = 'QNrdmW5J\r'
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



# olt_ip = '172.16.18.62'  #31-5
# olt_ip = '172.16.27.178' #test huawei
# frame = '0'
# slot = '1'
# port = '2'
# virt_port = '0'


def quit_func(i):
    for x in range(i):
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
#         print(result[2].decode('ascii'))
    tn.write(b"quit\n")
    result = tn.expect([b":"], command_timeout)
    tn.write(b"y\n")
#     print(result[2].decode('ascii'))


def check_error(x):
    if str(x).find("The ONT does not exist") >= 0:
        print("The ONT does not exist")
        quit_func(1)
        sys.exit()
    if str(x).find("This board does not exist") >= 0:
        print("This board does not exist: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
        quit_func(1)
        sys.exit()
    if str(x).find("% Parameter error, the error locates at '^'") >= 0:
        print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
        quit_func(1)
        sys.exit()
    if str(x).find("busy") >= 0:
        print("System Is Busy, Try After A While")
        quit_func(1)
        sys.exit()


try:
    with Telnet(olt_ip, 23, 5) as tn:
        tn.expect([b">>User name:"], command_timeout)
        tn.write(user.encode('ascii') + b"\n")
        tn.expect([b">>User password:"], command_timeout)
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b">"], command_timeout)
        oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]
#         print(oltname)
        print("OLT Name: %s, IP: %s, F/S/P/VP: %s/%s/%s/%s" % (oltname, olt_ip, frame, slot, port, virt_port) + "\n")
        tn.write(b'enable\n')
        tn.expect([b"#"], command_timeout)
        tn.write(b"config\n")
        tn.expect([b"#"], command_timeout)
        
        command = "display ont info " + frame + " " + slot + " " + port + " " + virt_port
        tn.write(command.encode('ascii') +  b"\n")
        result = tn.expect([b"\) ----", b"#", b"<K> "], command_timeout)
        output = result[2]
        tn.write(b"\n")
        result = tn.expect([b"\) ----", b"#", b"<K> "], command_timeout)
        output += result[2]
        
        

        
        while True:
            tn.write(b" ")
            result = tn.expect([b"\) ----", b"#"], command_timeout)
            output += result[2]
            if str(output).find("#") >= 0:
                break

            if str(output).find("busy") >= 0:
                print("System Is Busy, Try After A While")
                quit_func(1)
                sys.exit()
                
        output = str(output).replace("---- More ( Press 'Q' to break ) ----\\x1b[37D                                     \\x1b[37D","")
     
        for n in output.split("\\r\\n"):
            if n.find("ONT distance(m)         :") >= 0 or n.find("SN                      :") >= 0 or n.find("ONT online duration     :") >= 0 :
                print(n)
        
        
        command = "interface gpon " + frame + "/" + slot
        
        tn.write(command.encode('ascii') +  b"\n")
        result = tn.expect([b"\) ----", b"#", b"<K> "], command_timeout)
        output = result[2]
        
        check_error(output)
        
        tn.write(b"\n")
        result = tn.expect([b"\) ----", b"#", b"<K> "], command_timeout)
        output += result[2]        
        check_error(output)
        
        
        command = "display ont register-info " + port + " " + virt_port
        tn.write(command.encode('ascii') +  b"\n")
        result = tn.expect([b"\) ----", b"#", b"<K> "], command_timeout)
        output = result[2]
        check_error(output)
        
        
        tn.write(b"\n")
        result = tn.expect([b"\) ----", b"#", b"<K> "], command_timeout)
        output += result[2]
        check_error(output)
        
        
        
        while True:
            tn.write(b" ")
            result = tn.expect([b"\) ----", b"#"], command_timeout)
            output += result[2]
            if str(output).find("#") >= 0:
                break

            if str(output).find("busy") >= 0:
                print("System Is Busy, Try After A While")
                quit_func(2)
                sys.exit()
                
        output = str(output).replace("---- More ( Press 'Q' to break ) ----\\x1b[37D                                     \\x1b[37D","")
     
        print()
        for n in output.split("\\r\\n"):
            
            if (n.find("Index               :") >= 0
                or n.find("Auth-type           :") >= 0
                or n.find("SN                  :") >= 0
                or n.find("TYPE                :") >= 0
                or n.find("UpTime              :") >= 0
                or n.find("DownTime            :") >= 0
                or n.find("DownCause           :") >= 0
                or n.find("------------------------") >= 0
                or n.find("Total :") >= 0):
                print(n)
            
            
            
#             if n.find(a) >= 0 or n.find(b) >= 0 or n.find(c) >= 0 or n.find(d) >= 0 or n.find(e) >= 0 or n.find(f) >= 0 or n.find(g) >= 0 or n.find(h) >= 0:
#                 print(n)
        
        
        
        quit_func(2)
        sys.exit()
        
        
 
except SystemExit:
    print()
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)

