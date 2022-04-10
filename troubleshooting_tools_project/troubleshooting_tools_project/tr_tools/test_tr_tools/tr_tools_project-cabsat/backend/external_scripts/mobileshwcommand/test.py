import netmiko 
from netmiko import ConnectHandler
import os,sys

code_type = "msisdn"
code = "514191001"
ip="10.11.3.3"

username = 'tshoot'
password="Agam3mn0n"


net_connect = ConnectHandler(device_type='ericsson_ipos',ip = ip, username = username, password = password)
​
​
output = net_connect.send_command("start oam-cli", expect_string = "tshoot@EPG01>", delay_factor = 3)
print(output)
​
​
output = net_connect.send_command("ManagedElement=1,  Epg=1, Pgw=1", expect_string = "tshoot@EPG01>")
print(output)
​
​
if code_type == "msisdn":
    output = net_connect.send_command("userInfo msisdn 995" + code, expect_string = "tshoot@EPG01>")
    print(output)
else:
    output = net_connect.send_command("userInfo imsi " + code)
    print(output)
​
​
output = net_connect.send_command("exit", expect_string = "EPG01>")
print(output)
output = net_connect.send_command("exit", expect_string = "")
​
net_connect.disconnect()