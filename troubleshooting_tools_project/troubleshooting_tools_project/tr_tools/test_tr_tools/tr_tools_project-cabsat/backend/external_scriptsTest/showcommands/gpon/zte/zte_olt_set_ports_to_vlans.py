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
service = sys.argv[8]
lan_port = sys.argv[9]


# olt_ip = '172.16.51.34'
# frame = '1'
# slot = '2'
# port = '7'
# virt_port = '5'

# # unda iyos argumenti
# service = "internet"

# # unda iyos argumenti
# lan_port = "eth_0/3"



ont_int_set = "vlan-filter-mode ethuni " + lan_port + " tag-filter discard untag-filter transparent"
ont_int_rem = "no vlan-filter-mode ethuni " + lan_port


ont_tv_set1 = "vlan port " + lan_port + " mode tag vlan 300"
ont_tv_set2 = "dhcp-ip ethuni " + lan_port + " from-internet"
ont_tv_rem1 = "no vlan port " + lan_port + " mode"
ont_tv_rem2 = "dhcp-ip ethuni " + lan_port + " no-ctrl"


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
        output = str(result[2])
        
        
        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
            
            
        tn.write(ont_int_rem.encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
        output = str(result[2])
        
        
        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        
        
        tn.write(ont_tv_rem1.encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
        output = str(result[2])
                
        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
            
        
        tn.write(ont_tv_rem2.encode('ascii') +  b"\n")
        result = tn.expect([b"#"], command_timeout)
        output = str(result[2])
        
        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        
                
        if service == "internet":
            tn.write(ont_int_set.encode('ascii') +  b"\n")
            result = tn.expect([b"#"], command_timeout)
            output = str(result[2])
        
            if str(output).find("% Invalid input detected at '^'") >= 0:
                print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
                sys.exit()
            if str(output).find("busy") >= 0:
                print("System Is Busy, Try After A While")
                sys.exit()
        else:
            tn.write(ont_tv_set1.encode('ascii') +  b"\n")
            result = tn.expect([b"#"], command_timeout)
            output = str(result[2])
        
            if str(output).find("% Invalid input detected at '^'") >= 0:
                print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
                sys.exit()
            if str(output).find("busy") >= 0:
                print("System Is Busy, Try After A While")
                sys.exit()
            
            
            tn.write(ont_tv_set2.encode('ascii') +  b"\n")
            result = tn.expect([b"#"], command_timeout)
            output = str(result[2])
        
            if str(output).find("% Invalid input detected at '^'") >= 0:
                print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
                sys.exit()
            if str(output).find("busy") >= 0:
                print("System Is Busy, Try After A While")
                sys.exit()
            
        
        
        
        
except SystemExit:
    print()        

except:
    print("Communication error occured with OLT(IP): ", olt_ip, oltname)
