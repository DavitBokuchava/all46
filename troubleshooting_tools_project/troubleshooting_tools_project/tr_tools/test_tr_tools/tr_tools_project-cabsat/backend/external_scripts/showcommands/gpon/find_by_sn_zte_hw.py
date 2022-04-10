from telnetlib import Telnet
import time, sys
import codecs
import json

command_timeout = 20
sys_busy_sleep = 3



def quit_func(i):
    for x in range(i):
        tn.write(b"quit\n")
        result = tn.expect([b"#"], command_timeout)
#         print(result[2].decode('ascii'))

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
            
            command = "display ont info by-sn " + hont_sn
            tn.write(command.encode('ascii') +  b"\n")
            
            result = tn.expect([b"\) ----", b" }:", b"#"], command_timeout)
            output_registered = result[2]
            tn.write(b"\n")
            result = tn.expect([b"\) ----", b"#"], command_timeout)
            output_registered += result[2]
            
            
            while True:
                if str(output_registered).find("#") >= 0:
                    break
                
                tn.write(b" ")
                result = tn.expect([b"#", b"\) ----"], command_timeout)
                output_registered += result[2]
                
                if str(output_registered).find("% Parameter error, the error locates at '^'") >= 0:
                    print("Incorrect Frame or Slot or Port or Vport: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
                    quit_func(2)
                    sys.exit()
                if str(output_registered).find("busy") >= 0:
                    print("System Is Busy, Try After A While")
                    quit_func(2)
                    sys.exit()
                
            
            for_print = output_registered

                    
            
                
            tn.write(b"quit\n")
            result = tn.expect([b"#"], command_timeout)
            
            tn.write(b"quit\n")
            result = tn.expect([b"\[n\]:"], command_timeout)
            tn.write(b"y\n")
                
            output_registered = str(output_registered)
            
            if output_registered.find("F/S/P                   : ") >= 0:
                fsp = output_registered.split("F/S/P                   : ")[1].split("\\r\\n")[0]
                ont_id = output_registered.split("ONT-ID                  : ")[1].split("\\r\\n")[0]
                print("SN: " + hont_sn + ", Registered On: " + olt_name + " F/S/P/VP: " + fsp + "/" + ont_id + ", OLT IP: " + olt_ip)
                print()
                for j in str(for_print).split("\\r\\n"):
                    j = j.replace("---- More ( Press 'Q' to break ) ----\\x1b[37D                                     \\x1b[37D","")
                    if (j.find("Run state               : ") >= 0 or
                   j.find("Config state            : ") >= 0 or
                   j.find("Line profile ID      : ") >= 0 or
                   j.find("Line profile name    : ") >= 0 or
                   j.find("Service profile ID   : ") >= 0 or
                   j.find("Service profile name : ") >= 0 or
                   j.find("ONT online duration     : ") >= 0
                   ):
                        print(j.replace("\\r\\n",""))
                
                
                
                return "true"
            
            
            return "false"
            
            
            
                
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
            
            command = "show gpon onu by sn " + zont_sn
            tn.write(command.encode('ascii') +  b"\n")
   
            result = tn.expect([b"#"], command_timeout)
            output_registered = str(result[2])
            
            
            
#             for_command = output_registered.replace(":"," ")
#             command = "show gpon onu by sn " + for_command
#             print(command)
#             sys.exit()
#             tn.write(command.encode('ascii') +  b"\n")
#             result = tn.expect([b"#"], command_timeout)
#             print(result[2])
             
            
                        
            if output_registered.find("gpon-onu_") >= 0 and output_registered.find("No related information to show") < 0:
                output_registered = str(output_registered)
                output_registered = output_registered.split("\\r\\n")            
                output_registered = output_registered[len(output_registered)-2]                
                print("SN: " + zont_sn + ", Registered On: " + olt_name + " " + output_registered + ", OLT IP: " + olt_ip)
                
                for_link_command = output_registered.replace("onu", "olt")
                for_link_command = for_link_command.replace(":"," ")
                
                for_link_command = "show gpon onu state " + for_link_command
                tn.write(for_link_command.encode('ascii') +  b"\n")
                result = tn.expect([b"#"], command_timeout)
                
                for k in str(result).split("\\r\\n"):
                    if k.find("gpon-onu") >= 0:
                        print(k)
                
                
                tn.write(b"exit\n")
                yy=tn.expect([b"#"], command_timeout)
                tn.write(b"exit\n")
                sys.exit()
                
                
                return "true"
            

            
            
            tn.write(b"exit\n")
            yy=tn.expect([b"#"], command_timeout)
            tn.write(b"exit\n")
            
            
            
            return "false"
            
            
            

      


    except SystemExit:
        print()
    except:
        print("\nError Ocurred On OLT: - ", olt_ip + "\n")
 







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
    status = "false"
    if vendor == "huawei":
        status = my_func_huawei(ip, hw_ont_sn)
        
    else:
        status = my_func_zte(ip, zte_ont_sn)
    if status == "true":
        break
