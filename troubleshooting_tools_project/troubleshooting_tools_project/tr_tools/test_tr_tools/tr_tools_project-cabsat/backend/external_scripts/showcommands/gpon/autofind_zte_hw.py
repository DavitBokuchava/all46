from telnetlib import Telnet
import time, sys
import codecs
import json

command_timeout = 20
sys_busy_sleep = 3

user = sys.argv[1]
password = sys.argv[2] +'\r'
data = sys.argv[3]
ont_sn = sys.argv[4]

data_str = json.loads(data)

zte_ont_sn = ""
hw_ont_sn = ""

# ont_sn = "48575443D7A0A286"

# user = 'gtsitskishvili2'
# password = 'QNrdmW5J\r'


def my_func_huawei(olt_ip, hont_sn):
    

    try:
        with Telnet(olt_ip, 23, 7) as tn:
            tn.expect([b">>User name:"], command_timeout)        
            tn.write(user.encode('ascii') + b"\n")
            tn.expect([b">>User password:"], command_timeout) 
            tn.write(password.encode('ascii') + b"\n")
            
            tn.write(b'enable\n')
            tn.expect([b"#"], command_timeout)
            
            tn.write(b"config\n")
            result = tn.expect([b"#"], command_timeout)
            
            olt_name = str(result[2]).split("(config)#")[0]
            olt_name = olt_name.split("OLT-")[1]
            olt_name = ("OLT-" + olt_name)
            
                
            command = "display  ont autofind  all"
            
            tn.write(command.encode('ascii') +  b"\n")
            result = tn.expect([b"\) ----", b" }:", b"#"], command_timeout)
            output_autofind = str(result[2])            
            tn.write(b"\n")
            
            while True:                    
                result = tn.expect([b"\) ----", b"#"], command_timeout)
                output_autofind += str(result[2])
                
                if str(result[2]).find("#") >= 0:
                    break
                    
                tn.write(b" ")
                time.sleep(0.5)
                
            
            quit_command = "quit"
            tn.write(quit_command.encode('ascii') +  b"\n")
            yy = tn.expect([b"#"], command_timeout)
            
            tn.write(b"quit\n")
            yy=tn.expect([b"log out?"], command_timeout)
            tn.write(b"y\n")
            
            
            if output_autofind.find(hont_sn) >= 0:
                fsp = output_autofind.split(hont_sn)[0]
                fsp = fsp.split(" : ")
                fsp = fsp[len(fsp) - 2]
                fsp = fsp.split("\\r\\n")
                fsp= fsp[0]
                print("SN: " + hont_sn + ", Autofind On: " + olt_name + " " + fsp + ", OLT IP: "+olt_ip )
                sys.exit()
                
    except SystemExit:
        print()
    except:
        print("\nError Ocurred On OLT: - ", olt_ip + "\n")
        

def my_func_zte(olt_ip, zont_sn):
    

    try:
        with Telnet(olt_ip, 23, 7) as tn:
            tn.write(user.encode('ascii') + b"\n")
            tn.expect([b"Password:"], command_timeout)
            tn.write(password.encode('ascii') + b"\n")
            tn.expect([b"#"], command_timeout)
            tn.write(b"conf t\n")
            result = tn.expect([b"#"], command_timeout)
            
            olt_name = str(result[2]).split("(config)#")[0]
            olt_name = olt_name.split("OLT-")[1]
            olt_name = ("OLT-" + olt_name)
            
 
            command = "show gpon onu uncfg"
            tn.write(command.encode('ascii') +  b"\n")
            result = tn.expect([b"--More--",b"#"], command_timeout)
            output_autofind = str(result[2])            
            tn.write(b"\n")
            
            while True:                    
                result = tn.expect([b"--More--", b"#"], command_timeout)
                output_autofind += str(result[2])
                
                if str(result[2]).find("#") >= 0:
                    break
                    
                tn.write(b" ")
                time.sleep(0.5)
            
            
            tn.write(b"exit\n")
            yy=tn.expect([b"#"], command_timeout)
            tn.write(b"exit\n")

            
            for n in output_autofind.split("\\r\\n"):
                if n.find(zont_sn) >= 0:
                    print("SN: " + zont_sn + ", Autofind On: " + olt_name + " " + n.split()[0] + ", OLT IP: "+ olt_ip )
                    sys.exit()

    except SystemExit:
        print()
    except:
        print("Error Ocurred On OLT: - ", olt_ip)
 






if len(ont_sn) == 16:
    hw_ont_sn = ont_sn
    
    zte_ont_sn_pref = ont_sn[0:8]
    zte_ont_sn = ont_sn[8:16]
    
    zte_ont_sn_pref_hex = bytes.fromhex(zte_ont_sn_pref)
    zte_ont_sn_pref = zte_ont_sn_pref_hex.decode("ascii")            
    zte_ont_sn = zte_ont_sn_pref + zte_ont_sn
    
elif len(ont_sn) == 12:
    zte_ont_sn = ont_sn
    
    pref_sn = ont_sn[0:4]
    b_pref_sn = bytes(pref_sn,'UTF-8')
    sn_last = ont_sn[4:12]

    encoded_b_pref_sn = (codecs.encode(b_pref_sn, "hex"))
    string_encoded_b_pref_sn = encoded_b_pref_sn.decode("ascii")

    hw_ont_sn = string_encoded_b_pref_sn + sn_last
    

# print("For Huawei: " + hw_ont_sn)
# print("For ZTE: " + zte_ont_sn)





for ip, vendor in data_str.items():
    if vendor == "huawei":
        my_func_huawei(ip, hw_ont_sn)
        
    else:
        my_func_zte(ip, zte_ont_sn)