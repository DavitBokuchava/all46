import os, sys, time
import re
from telnetlib import Telnet

user = 'gtsitskishvili2'
password = 'QNrdmW5J\r'
command_timeout = 10
output = ""
oltname= ""

# olt_ip = sys.argv[1]
# frame = sys.argv[2]
# slot = sys.argv[3]
# port = sys.argv[4]
# virt_port = sys.argv[5]

olt_ip = '172.16.26.230'
frame = '0'
slot = '1'
port = '13'
virt_port = '0'

# unda iyos argumenti
srv_prof_id = "10"



def port_to_vlan(port_num, vlan_num):
    print("ont port native-vlan " + port + " " + virt_port + " eth " + str(port_num) + " vlan " + str(vlan_num) + "\n")
    port_to_vlan = "ont port native-vlan " + port + " " + virt_port + " eth " + str(port_num) + " vlan " + str(vlan_num) + "\n"
    
    tn.write(port_to_vlan.encode('ascii') +  b"\n")
    result = tn.expect([b"y<K> }:"], command_timeout)
    tn.write(b"\n")
    result = tn.expect([b"#"], command_timeout)
    
#     output = result[2]
#     print(output.decode('ascii'))

#     tn.write(b"\n")
#     result = tn.expect([b"#"], command_timeout)
#     output = result[2]
#     print(output.decode('ascii'))
#     if str(output).find("% Parameter error, the error locates at '^'") >= 0:
#         print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
#         sys.exit()
#     if str(output).find("busy") >= 0:
#         print("System Is Busy, Try After A While")
#         sys.exit()
   



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
        command_2 = "ont modify " + port + " " + virt_port + " ont-srvprofile-id " + srv_prof_id
                    
        tn.write(command_1.encode('ascii') +  b"\n")            
        result = tn.expect([b"#"], command_timeout)
        output = result[2].decode('ascii')
        
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
            
            
        tn.write(command_2.encode('ascii') +  b"\n")            
        result = tn.expect([b"name<K> }:"], command_timeout)
        output = result[2].decode('ascii')
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        tn.write(b"\n")
        result = tn.expect([b"#"], command_timeout)
        output = result[2]
        print(output.decode('ascii'))
        if str(output).find("% Parameter error, the error locates at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
      

        
        
        if srv_prof_id == "10":
            port_to_vlan(1,100)
            port_to_vlan(2,100)
            port_to_vlan(3,100)
            port_to_vlan(4,300)
            
        if srv_prof_id == "11":
            port_to_vlan(1,100)
            port_to_vlan(2,100)
            port_to_vlan(3,300)
            port_to_vlan(4,300)
            
                        
        if srv_prof_id == "12":
            port_to_vlan(1,100)
            port_to_vlan(2,300)
            port_to_vlan(3,300)
            port_to_vlan(4,300)
            
        if srv_prof_id == "13":
            port_to_vlan(1,300)
            port_to_vlan(2,300)
            port_to_vlan(3,300)
            port_to_vlan(4,300)
            
                    
        if srv_prof_id == "14":
            port_to_vlan(1,100)
            port_to_vlan(2,100)
            port_to_vlan(3,100)
            port_to_vlan(4,100)

        
        
 
        
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
        #print(result[2].decode('ascii'))    
        tn.write(b"quit\n")
        result = tn.expect([b"Are you sure to log out"], command_timeout)
        #print(result[2].decode('ascii'))
        tn.write(b"y\n")


except SystemExit:
    print()
except:
    print("Communication error occured with OLT(IP): ", olt_ip, oltname)


 
