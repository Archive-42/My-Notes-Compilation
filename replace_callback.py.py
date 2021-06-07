import re

def callback(match):
  return str(int(match.group(0))+1)

print(re.sub('\d+', callback, '134')) #135
