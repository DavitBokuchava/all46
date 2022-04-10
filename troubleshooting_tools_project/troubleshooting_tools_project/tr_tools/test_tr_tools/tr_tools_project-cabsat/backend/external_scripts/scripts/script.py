import os,sys,subprocess
ol = sys.argv[1]
#print("Output from external script: ", ol)
# from pythonping import ping
# response_list = ping('8.8.8.8', size=40, count=10)

# def pingHost(a):
#      #sys.argv[2]
#     return os.system('ping ' + a)
    

print(os.system('ping ' + ol))
#     return s + " " + b
# arguments = len(sys.argv)-1
# print(sys.argv[1],sys.argv[2])

# def ping_test (host):

#     reached = []                           #Empty list to collect reachable hosts
#     not_reached = []                          #Empty list to collect unreachable hosts

#     for ip in host:
#         ping_test = subprocess.call('ping %s -n 2' % ip)        #Ping host n times
#         if ping_test == 0:                    #If ping test is 0, it' reachable
#             reached.append(ip)

#         else:
#             not_reached.append(ip)                              #Else, it's not reachable

#     print("{} is reachable".format(reached))
#     print("{} not reachable".format(not_reached))
# # //hosts = ["192.168.1.1","123.214.2.2","www.google.com",]         #Hosts list
# return print(ping_test (hosts))