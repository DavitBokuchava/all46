# Aucilebelia, file-shi unda iyos mititebuli oltip, oltname, pos


import datetime
from telnetlib import Telnet
import pandas as pd
import time
command_timeout = 10
sys_busy_sleep = 3

data = pd.read_excel (r'OLT-BAT-1.xlsx')
data_dict = data.to_dict(orient='record')

user = 'gtsitskishvili2'
password = 'QNrdmW5J\r'
row1 = data_dict[1]
oltip = str(row1['oltip'])
print()
print()
print("=========================")
print("OLT IP: " + oltip)
oltname = str(row1['oltname'])
print(oltname)
print("ToTal Positions: "+str(len(data_dict)))
print("=========================")
print()
print()
time.sleep(3)

try:
    with Telnet(oltip, 23, 5) as tn:
        tn.expect([b">>User name:"], command_timeout)        
        tn.write(user.encode('ascii') + b"\n")
        tn.expect([b">>User password:"], command_timeout) 
        tn.write(password.encode('ascii') + b"\n")
            
        #tn.read_until(b">")
        tn.write(b'enable\n')
        tn.expect([b"#"], command_timeout)
        
        tn.write(b"config\n")
        tn.expect([b"#"], command_timeout)
        
        count = 0
        x_man = 0
        for x in data_dict:
            count +=1
            print(oltname)
            print("Positions Left: " + str(len(data_dict)-count))
                        
            pos = x['pos'].split('GPON')[1].split('/')
            slot_port = str(pos[0]) + "/" + str(pos[1])
            vpi_vci = str(pos[2]) + " " + str(pos[3])         
            print("GPON" + slot_port + " " +vpi_vci)
            
            yy = ""
            while True:
                print("Count: ", x_man)
                print(datetime.datetime.now().strftime("%H:%M:%S"), "Command Send##      interface gpon " + slot_port)
                tn.write(b'interface gpon ' + slot_port.encode('ascii') +  b"\n")
                
                yy = tn.expect([b"#"], command_timeout)
                
                print(datetime.datetime.now().strftime("%H:%M:%S"))
                print(yy[2].decode('ascii'))
                
                if (str(yy[2]).find("busy") < 0) and (str(yy[2]).find("It will take several minutes to save configuration file") < 0):
                    x_man = 0
                    break
                print("*******************************Found BUSY Or Configuration Save")
                x_man = x_man + 1
                time.sleep(sys_busy_sleep)
 
                
                
            
            if (str(yy[2]).find(" Parameter error, the error locates at") >= 0) or (str(yy[2]).find("Failure: This board does not exist") >= 0):
                print("**********" + slot_port + " " +vpi_vci + " skipped")
                print("------------------------------------------------")
                continue
            
            
            while True:                
                print("Count: ", x_man)
                print(datetime.datetime.now().strftime("%H:%M:%S"), "----------------------")
                tn.write(b'ont reset ' + vpi_vci.encode('ascii') +  b"\n")
                yy = tn.expect([b"Are you sure to reset the ONT"], command_timeout)
                print(datetime.datetime.now().strftime("%H:%M:%S"), "----------------------")
                print(yy[2].decode('ascii'))
                if (str(yy[2]).find("busy") < 0) and (str(yy[2]).find("It will take several minutes to save configuration file") < 0):
                    x_man = 0
                    break
                print("*******************************Found BUSY Or Configuration Save")
                x_man = x_man + 1
                #tn.write(b"\n")
                time.sleep(sys_busy_sleep)
                
                
            while True:
                tn.write(b"y\n")
                yy = tn.expect([b"#"], command_timeout)
                print(yy[2].decode('ascii'))
                if (str(yy[2]).find("busy") < 0) and (str(yy[2]).find("It will take several minutes to save configuration file") < 0):                    
                    break
                print("*******************************Found BUSY Or Configuration Save")
                time.sleep(sys_busy_sleep)
            
#            while True:
#                tn.write(b"quit\n")
 #               yy = tn.expect([b"#"], command_timeout)
  #              print(yy[2].decode('ascii'))
   #             if (str(yy[2]).find("busy") < 0) or (str(yy[2]).find("It will take several minutes to save configuration file") < 0):
    #                break
     #           time.sleep(sys_busy_sleep)
            
            print("done - " + str(count))
            print("------------------------------------------------")
            time.sleep(0.5)



        tn.write(b"quit\n")
        tn.expect([b"#"], command_timeout)
        output=tn.read_until(b'#').decode('ascii')
        print(output)
        tn.write(b"quit\n")
        tn.expect([b"#"], command_timeout)
        output=tn.read_until(b'#').decode('ascii')
        print(output)
        tn.write(b"quit\n")
        yy = tn.expect([b"Are you sure to log out"], command_timeout)
        print(yy[2].decode('ascii'))
        tn.write(b"y\n")
        output=tn.read_until(b'#').decode('ascii')
        print(output)
        print("Log Out From " + str(oltname))
        
        
except:
    print("error ecured on ip - ", oltip)
