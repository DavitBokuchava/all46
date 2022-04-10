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

# olt_ip = '172.16.13.86'
# olt_ip = '172.16.27.178'
# olt_ip = '172.16.18.62'
# frame = '0'
# slot = '1'
# port = '0'
# virt_port = '9'


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
        print("\n")
        oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]
        print("OLT Name: %s, IP: %s, F/S/P/VP: %s/%s/%s/%s" % (oltname, olt_ip, frame, slot, port, virt_port))
        tn.write(b'enable\n')
        tn.expect([b"#"], command_timeout)
        tn.write(b"config\n")
        tn.expect([b"#"], command_timeout)
        command_1 = "display mac-address port " + frame + "/" + slot + "/" + port + " ont " + virt_port
        tn.write(command_1.encode('ascii') +  b"\n")
        result = tn.expect([b"#", b"<K>"], command_timeout)
        output = result[2]
        tn.write(b"\n")
        result = tn.expect([b"#"], command_timeout)
        output += result[2]
        if str(output).find("Failure: Does not support this operation") >= 0:
            print("Failure: Does not support this operation")
            quit_func(1)
            sys.exit()
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            quit_func(1)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            quit_func(1)
            sys.exit()
        if str(output).find("Failure: There is not any MAC address record") > 0:
            print("There is not any MAC address record")
            quit_func(1)
            sys.exit()
        if str(output).find("Failure: This board does not exist") > 0:
            print("Slot: " + slot + ", Failure: This board does not exist")
            quit_func(1)
            sys.exit()            
        if str(output).find("Failure: Port does not exist") > 0:
            print("Port: " + port + ", Failure: Port does not exist")
            quit_func(1)
            sys.exit()
        mac_total_number = (str(output).split('Total: '))[1].split(str('\\r\\n'))[0]
        mac_total_number = int(mac_total_number)
        if mac_total_number >= 20:
            print("More Than 20 Mac Addresses")
            sys.exit("More Than 20 Mac Addresses")
        else:
            mac_row = []
            for x in range(int(mac_total_number)):
                temp = (str(output).split('gpon '))[x + 1].split('\\r\\n')[0]
                temp = "Mac: " + temp.split()[0] + "  Vlan: " + temp.split()[-1]
                mac_row.append(temp)
                print(mac_row[x])
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
        tn.write(b"quit\n")
        result = tn.expect([b"Are you sure to log out"], command_timeout)
        tn.write(b"y\n")
except SystemExit:
    print()
except:
    print("\n\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
