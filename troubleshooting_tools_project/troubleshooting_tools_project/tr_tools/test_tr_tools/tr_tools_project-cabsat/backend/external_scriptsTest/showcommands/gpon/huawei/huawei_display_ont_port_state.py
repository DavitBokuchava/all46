import os, sys, time
import re
from telnetlib import Telnet

# user = 'gtsitskishvili2'
# password = 'QNrdmW5J\r'
command_timeout = 10
output = ""
oltname= ""

user = sys.argv[1]
password = sys.argv[2] +'\r'
olt_ip = sys.argv[3]
frame = sys.argv[4]
slot = sys.argv[5]
port = sys.argv[6]
virt_port = sys.argv[7]

# olt_ip = '172.16.13.86'
# olt_ip = '172.16.27.178'
# olt_ip = '172.16.18.62'
# frame = '0'
# slot = '1'
# port = '4'
# virt_port = '6'


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
        print("OLT Name: %s, IP: %s, F/S/P/VP: %s/%s/%s/%s" % (oltname, olt_ip, frame, slot, port, virt_port))
        print()
        command_1 = "interface gpon " + frame + "/" + slot
        command_2 = "display ont port state " + port + " " + virt_port + " eth-port all"
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
        tn.write(command_2.encode('ascii') +  b"\n")
        result = tn.expect([b"#", b"<K>"], command_timeout)
        output = result[2].decode('ascii')
        tn.write(b"\n")
        result = tn.expect([b"#"], command_timeout)
        output += result[2].decode('ascii')
        if str(output).find("Failure: The ONT does not exist") >= 0:
            print("Failure: The ONT does not exist")
            quit_func(2)
            sys.exit()
        if str(output).find("The ONT is not online") >= 0:
            print("The ONT is not online")
            quit_func(2)
            sys.exit()
        if not ((str(output).find("GE") >= 0 or str(output).find("FE") >= 0) and (str(output).find("up") >= 0 or str(output).find("down") >= 0)):
            print("The ONT is not online")
            quit_func(2)
            sys.exit()
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            quit_func(2)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            quit_func(2)
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
        quit_func(2)
except SystemExit:
    print()
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)