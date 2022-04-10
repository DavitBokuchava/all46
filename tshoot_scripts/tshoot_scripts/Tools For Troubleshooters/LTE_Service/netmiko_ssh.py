import netmiko
from netmiko import ConnectHandler

import os, sys

code_type = sys.argv[1]
code = sys.argv[2]

ip="10.11.3.3"

username = 'tshoot'
password="Agam3mn0n"


# username = 'admin'
# password="Silknet@dmin"


# try:
net_connect = ConnectHandler(device_type='ericsson_ipos',ip = ip, username = username, password = password)
# net_connect = ConnectHandler(device_type='lix',ip = ip, username = username, password = password)

# net_connect.enable()
print("1")
# output = net_connect.send_command("?")
output = net_connect.send_command("start oam-cli", expect_string = "tshoot@EPG01>", delay_factor = 3)
print(output)


print("2")
output = net_connect.send_command("ManagedElement=1,  Epg=1, Pgw=1", expect_string = "tshoot@EPG01>")
print(output)

print("3")
if code_type == "msisdn":
    output = net_connect.send_command("userInfo msisdn 995" + code, expect_string = "tshoot@EPG01>")
    print(output)
else:
    output = net_connect.send_command("userInfo imsi " + code)
    print(output)



output = net_connect.send_command("exit", expect_string = "EPG01>")
print(output)
# output = net_connect.send_command("exit", delay_factor = 0)
# print(output)

net_connect.disconnect()
# output = device.send_command("start oam")
#output = net_connect.send_command("/ip address print")
# except:
#     print("Communication error occured ")
# output=output.split(" ")
# hostname=output[1]

# generatedconfig=template.replace("{rtr}",hostname)

#step 2
#push the generated config on router
#create a list for generateconfig
#         generatedconfig=generatedconfig.split("\n")
#         device.send_config_set(generatedconfig)
# 
#         #step 3:
#         #perform validations
#         print ("********")
#         print ("Performing validation for :",hostname+"\n")
#         output=device.send_command("show logging")
#         if ("encryption disabled, link up"):
#         print ("Syslog is configured and reachable")
#         else:
#         print ("Syslog is NOT configured and NOT reachable")
#         if ("Trap logging: level informational" in output):
#         print ("Logging set for informational logs")
#         else:
#         print ("Logging not set for informational logs")
# 
#         print ("\nLoopback interface status:")
#         output=device.send_command("show interfaces description | in loopback interface")
#         print (output)
#         print ("************\n")
