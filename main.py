import requests
import json
import wget

link = 'https://powerofdark.space/api/status'

print ('Making GET request...')
data = requests.get(link).text

print ('\nParse to json object...')
data = json.loads(data)
print (data)

print ('\nGet latest .cli version...')
ver = data['Versions']['cli']
print ('Latest .cli version: ' + ver)

print ('\nCreate URL...')
createURL = 'https://powerofdark.space/downloads/DOPE/'+ ver +'/DOPE.cli'
print (createURL)


print ('\nDownloading latest DOPE.cli...')
wget.download(createURL, './DOPE/DOPE.cli')