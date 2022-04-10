import paramiko

nbytes = 65535
hostname = '31.146.112.170'
port = 22
# username = 'tshoot' 
# password = 'Agam3mn0n'
username = 'admin' 
password = 'Silknet@dmin'
command = 'ip address print'

paramiko.util.log_to_file('stuckoverflow.log')

client = paramiko.Transport((hostname, port))
# client = paramiko.SSHClient()
# client.load_system_host_keys()
# client.set_missing_host_key_policy(paramiko.AutoAddPolicy()) 

client.connect(username=username, password=password)

stdout_data = []
stderr_data = []
session = client.open_channel(kind='session')
session.exec_command(command)
while True:
    if session.recv_ready():
        stdout_data.append(session.recv(nbytes))
    if session.recv_stderr_ready():
        stderr_data.append(session.recv_stderr(nbytes))
    if session.exit_status_ready():
        break

# print 'exit status: ', session.recv_exit_status()
# print ''.join(stdout_data)
# print ''.join(stderr_data)
print(stdout_data)
print(stderr_data)


session.close()
client.close()