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

# olt_ip = '172.16.18.62' #OLT-31-5
# olt_ip = '172.16.13.86' #OLT-22-1
# frame = '0'
# slot = '5'
# port = '1'
# virt_port = '15'


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
        command_2 = "ont reset " + port + " " + virt_port
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
        result = tn.expect([b"Are you sure to reset the ONT", b"#"], command_timeout)
        output = result[2].decode('ascii')
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Port/Vport: " + port + "/" + virt_port)
            quit_func(2)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            quit_func(2)
            sys.exit()
        tn.write(b"y\n")
        result = tn.expect([b"#"], command_timeout)
        output += result[2].decode('ascii')
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            quit_func(2)
            sys.exit()
        if str(output).find("Failure: The ONT is not online") >= 0:
            print("Can Not Reboot ONT, Because It Is Offline")
            quit_func(2)
            sys.exit()
        else:
            print("ONT Rebooted")
            quit_func(2)
except SystemExit:
    print()
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)