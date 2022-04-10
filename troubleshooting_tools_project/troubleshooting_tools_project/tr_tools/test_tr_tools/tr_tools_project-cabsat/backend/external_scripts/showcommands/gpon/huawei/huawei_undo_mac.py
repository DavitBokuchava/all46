import os, sys, time
from telnetlib import Telnet

# user = 'gtsitskishvili2'
# password = 'QNrdmW5J\r'
command_timeout = 5
output = ""
oltname= ""

# olt_ip = sys.argv[1]
# frame = sys.argv[2]
# slot = sys.argv[3]
# port = sys.argv[4]
# virt_port = sys.argv[5]

# olt_ip = '172.16.18.62' #OLT-31-5
# olt_ip = '172.16.13.86' #OLT-22-1

# olt_ip = '172.16.54.122' #OLT-LILO2-1
user = sys.argv[1]
password = sys.argv[2] +'\r'
olt_ip = sys.argv[3]
mac = sys.argv[4]
vlan = sys.argv[5]

# mac = "0c49-3376-6f38"
# vlan = "220"


def quit_func(i):
    for x in range(i):
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
       
       
    tn.write(b"quit\n")
    result = tn.expect([b":"], command_timeout)
    tn.write(b"y\n")



try:
    with Telnet(olt_ip, 23, 5) as tn:
        tn.expect([b">>User name:"], command_timeout)
        tn.write(user.encode('ascii') + b"\n")
        tn.expect([b">>User password:"], command_timeout)
        tn.write(password.encode('ascii') + b"\n")
        result = tn.expect([b">"], command_timeout)
                    
        oltname = (str(result[2]).split(str('ved.\\r\\n\\r\\n\\r\\n')))[1].split('>')[0]
        print("OLT Name: %s, IP: %s, Mac: %s, Vlan: %s" % (oltname, olt_ip, mac, vlan))
        
        tn.write(b'enable\n')
        tn.expect([b"#"], command_timeout)
        tn.write(b"config\n")
        tn.expect([b"#"], command_timeout)
        
        
        command_1 = "undo mac-address mac " + mac + " vlan " + vlan
#         print(command_1)
        
#         sys.exit()
            
        tn.write(command_1.encode('ascii') +  b"\n")            
        result = tn.expect([b"#"], command_timeout)
        output = result[2].decode('ascii')
                
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:            
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            quit_func(1)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            quit_func(1)
            sys.exit()

        if str(output).find("Failure: The MAC address is dynamically bound to a service flow") >= 0:
            print("Failure: The MAC address is dynamically bound to a service flow")
        else:
            print("Mac Address Was Deleted Successfuly")
            
        

        quit_func(1)



except SystemExit:
    print()
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)

