import requests,json

headers = { 'Accept': 'application/vnd.api+json',
'Content-Type': 'application/vnd.api+json'}

def search_anime(type,key):
  try:
    response = requests.get('https://kitsu.io/api/edge/'+type+'?filter[text]='+key,headers=headers)
    result = json.loads(response.text)
    if result["meta"]["count"]!=0:
      return result["data"][0]
    else:
      return 0
  except requests.exceptions.ConnectionError as errc:
    print("Connection Error :",errc)
    return 1
  except requests.exceptions.Timeout as errt:
    print ("Connection Timed Out :",errt)
    return 1
  except requests.exceptions.RequestException as err:
    print("Oops , Something Went Wrong :",err)
    return 1
