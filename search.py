import requests,json

headers = { 'Accept': 'application/vnd.api+json',
'Content-Type': 'application/vnd.api+json'}

def search_anime(type,key):
  response = requests.get('https://kitsu.io/api/edge/'+type+'?filter[text]='+key,headers=headers)
  result = json.loads(response.text)
  if result["meta"]["count"]!=0:
    return result["data"][0]
  else:
    return 0