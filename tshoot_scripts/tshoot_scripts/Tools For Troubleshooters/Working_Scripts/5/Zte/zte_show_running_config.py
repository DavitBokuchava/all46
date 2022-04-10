import os, sys, time
from telnetlib import Telnet

user = 'gtsitskishvili2'
password = 'QNrdmW5J\r'
command_timeout = 5
output = ""
oltname= ""

# olt_ip = sys.argv[1]
# frame = sys.argv[2]
# slot = sys.argv[3]
# port = sys.argv[4]
# virt_port = sys.argv[5]

olt_ip = '172.16.51.34'
frame = '1'
slot = '2'
port = '7'
virt_port = '22'


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
        command_1 = "show running-config interface gpon-onu_" + frame + "/" + slot + "/" + port + ":" + virt_port
        tn.write(command_1.encode('ascii') +  b"\n")
                    
        result = tn.expect([b"More--", b"#"], command_timeout)
        output = result[2]
        print(output.decode('ascii'))
        
        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        
        
        
        tn.write(b" ")
        result = tn.expect([b"#"], command_timeout)        
        output = output + result[2]
        
        
        if str(output).find("% Invalid input detected at '^'") >= 0:
            print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " " + virt_port)
            sys.exit()
        if str(output).find("busy") >= 0:
            print("System Is Busy, Try After A While")
            sys.exit()
        
        if str(output).find("deactive") >= 0:
            print("Internet Is Deactive")
        else:
            (output.decode('ascii'))        
        

        
        print()
        
        max_mac_Learn = (str(output).split('max-mac-learn '))
        
        max_mac_Learn_vp1 = max_mac_Learn[1].split('\\r\\n')[0]
        print("max-mac-learn", max_mac_Learn_vp1)
        
        max_mac_Learn_vp2 = max_mac_Learn[2].split('\\r\\n')[0]
        print("max-mac-learn",max_mac_Learn_vp2)
        
        max_mac_Learn_vp3 = ((max_mac_Learn[3].split('switchport mode'))[0]).split('\\r\\n')[0]
        print("max-mac-learn",max_mac_Learn_vp3)
        
  
  
        service_port = (str(output).split('service-port '))
        
        service_port1 = service_port[1].split('\\r\\n')[0]
        print("service-port",service_port1)
        
        service_port2 = service_port[2].split('\\r\\n')[0]
        print("service-port",service_port2)
        
        service_port3 = (service_port[3].split('port-location')[0]).split('\\r\\n')[0]
        print("service-port",service_port3)
                

      
except:
    print("Communication error occured with OLT(IP): ", olt_ip, oltname)
