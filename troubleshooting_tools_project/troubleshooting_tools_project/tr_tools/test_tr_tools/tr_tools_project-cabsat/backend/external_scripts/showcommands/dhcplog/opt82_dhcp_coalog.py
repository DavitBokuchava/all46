import sys
import paramiko
from paramiko import SSHClient
# Connect
client = SSHClient()
client.load_system_host_keys()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

olt_name = sys.argv[1]
vendor =sys.argv[2]
frame = sys.argv[3]
slot = sys.argv[4]
port = sys.argv[5]
vport = sys.argv[6]



# frame = "1"
# slot = "2"
# port = "8"
# vport = "4"

# olt_name = "OLT-63-1"
# vendor ="zte"

line_numb = "-5"


if vendor == "huawei":
    opt82 = olt_name + " xpon " + frame + "/" + slot + "/0/" + port + ":" + vport + ".1.100"
#     print(opt82)
else:
    opt82 = olt_name + " xpon " + frame + "/" + slot + "/0/" + port + "." + vport + ".1.100"
#     print(opt82)
try:

    # client.connect('31.146.112.170', username='admin', password='Silknet@dmin')
    client.connect('10.240.0.8', username='zebra', password='1234')

    # Run a command (execute PHP interpreter)
    # stdin, stdout, stderr = client.exec_command('ip address print')
    
    stdin, stdout, stderr = client.exec_command('grep -i "' + opt82 + '" radiuscoa.log | tail ' + line_numb)


    print(type(stdin))  # <class 'paramiko.channel.ChannelStdinFile'>
    print(type(stdout))  # <class 'paramiko.channel.ChannelFile'>
    print(type(stderr))  # <class 'paramiko.channel.ChannelStderrFile'>


    print(f'STDOUT: {stdout.read().decode("utf8")}')
    print(f'STDERR: {stderr.read().decode("utf8")}')


    # stdin, stdout, stderr = client.exec_command('system clock print')
#     stdin, stdout, stderr = client.exec_command('ManagedElement=1,  Epg=1, Pgw=1')



    # stdin.write('ManagedElement=1,  Epg=1, Pgw=1')

#     print(f'STDOUT: {stdout.read().decode("utf8")}')
#     print(f'STDERR: {stderr.read().decode("utf8")}')


    # stdin, stdout, stderr = client.exec_command('interface print')
#     stdin, stdout, stderr = client.exec_command('userInfo msisdn 995593780218')
#     print(stdout.read().decode("utf8"))
#     print(stderr.read().decode("utf8"))
# 
#     stdin, stdout, stderr = client.exec_command('exit')
#     stdin, stdout, stderr = client.exec_command('exit')
#     stdin, stdout, stderr = client.exec_command('exit')

    # Optionally, send data via STDIN, and shutdown when done
    # stdin.write('exit')

    # stdin.channel.shutdown_write()

    # Print output of command. Will wait for command to finish.
    # print(f'STDOUT: {stdout.read().decode("utf8")}')
    # print(f'STDERR: {stderr.read().decode("utf8")}')

    # Get return code from command (0 is default for success)
    print(f'Return code: {stdout.channel.recv_exit_status()}')

    # Because they are file objects, they need to be closed
    stdin.close()
    stdout.close()
    stderr.close()

    # Close the client itself
    client.close()
except:
    print("Communication error occured")

