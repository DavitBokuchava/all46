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




# olt_ip = '172.16.27.178'
# frame = '0'
# slot = '1'
# port = '2'
# virt_port = '20'


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
#         print(oltname)
        print("OLT Name: %s, IP: %s, F/S/P/VP: %s/%s/%s/%s" % (oltname, olt_ip, frame, slot, port, virt_port) + "\n")
        tn.write(b'enable\n')
        tn.expect([b"#"], command_timeout)
        tn.write(b"config\n")
        tn.expect([b"#"], command_timeout)
        command = "display ont info " + frame + " " + slot + " " + port + " " + virt_port
#         print(command)
        tn.write(command.encode('ascii') +  b"\n")
        result = tn.expect([b"\) ----", b"#", b"<K> "], command_timeout)
        output = result[2].decode('ascii')
        tn.write(b"\n")
        result = tn.expect([b"\) ----", b"#", b"<K> "], command_timeout)
        output += result[2].decode('ascii')
        if str(output).find("The ONT does not exist") >= 0:
            print("The ONT does not exist")
            quit_func(1)
            sys.exit()
        if str(output).find("This board does not exist") >= 0:
            print("This board does not exist: " + frame + "/" + slot + "/" + port + " ont " + virt_port)
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
        while True:
            tn.write(b" ")
            result = tn.expect([b"\) ----", b"#"], command_timeout)
            output += result[2].decode('ascii')
            if str(output).find("#") >= 0:
                break

            if str(output).find("busy") >= 0:
                print("System Is Busy, Try After A While")
                quit_func(1)
                sys.exit()
#         print(output)
        quit_func(1)
        # print("OLT Name: %s, IP: %s, F/S/P/VP: %s/%s/%s/%s" % (oltname, olt_ip, frame, slot, port, virt_port))
        print("\n")
        run_state_output = (output.split('Run state               : '))[1].split(str('Config state'))[0]
        run_state_output = (output.split('Run state               : '))[1].split(str('Config state'))[0]   # 'Config state'
        print("Run state: ", run_state_output)
        config_state_output =  (output.split('Config state            : '))[1].split('Match state')[0]
        print("Config state: ", config_state_output)
        if output.find('Line profile ID      : ') >= 0:            
            line_profile_id_output = (output.split('Line profile ID      : '))[1].split('Line profile name')[0]
            if int(line_profile_id_output) != 10:
                print("************************************")
                print(">>>>Problem With Line Profile ID<<<<")
                print("Line profile ID:", line_profile_id_output)
                line_profile_name_output = (output.split('Line profile name    : '))[1].split('--')[0]
                print("Line profile name:", line_profile_name_output)
                print("************************************")
            else:
                print("Line profile ID:", line_profile_id_output)
                line_profile_name_output = (output.split('Line profile name    : '))[1].split('--')[0]
                print("Line profile name:", line_profile_name_output)

        if output.find('Service profile name : ') >= 0:
            service_profile_id_output = (output.split('Service profile ID   : '))[1].split('Service profile name :')[0]
            print("Service profile ID:", service_profile_id_output)
            service_profile_id_output = (output.split('Service profile name : '))[1].split('--')[0]
            print("Service profile name:", service_profile_id_output)
except SystemExit:
    print()
except:
    print("\nCommunication error occured with OLT(IP): ", olt_ip, oltname)
