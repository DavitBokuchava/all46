import paramiko
from time import sleep

hostname = '10.11.3.3'
port = 22
username = 'tshoot'
password = 'Agam3mn0n'

paramiko.util.log_to_file('paramiko.log')
s = paramiko.SSHClient()
s.load_system_host_keys()
s.set_missing_host_key_policy(paramiko.AutoAddPolicy())
s.connect(hostname = '10.11.3.3', username = 'tshoot', password = 'Agam3mn0n')
stdin, stdout, stderr = s.exec_command('>')
print(stdout.read())
s.close()
