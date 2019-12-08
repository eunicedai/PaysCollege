import pandas as pd
import requests,json
import re

data_degree = pd.read_csv("degrees-that-pay-back.csv",index_col ="Undergraduate Major")
degree_d = data_degree.to_dict(orient='index')

for degree in list(degree_d.values()):
    for k,v in list(degree.items()):
        try: degree[k] = v[:-3]
        except: continue

url1 = 'https://inf551-f307e.firebaseio.com/degrees.json'
degree_d_json = json.dumps(degree_d)
requests.patch(url1, degree_d_json)

data_region = pd.read_csv("salaries-by-region.csv", index_col ="School Name")
data_region = data_region.fillna('null')
region_d = data_region.to_dict(orient='index')
for school in list(region_d.keys()):
    region_d[re.sub(r"\.", '' , school)] = region_d.pop(school)
    
for region in list(region_d.values()):
    for k,v in list(region.items()):
        try:
            if v[0] == '$': region[k] = v[:-3]
        except: continue    
    
url2 = 'https://inf551-f307e.firebaseio.com/regions.json'
region_d_json = json.dumps(region_d)
requests.patch(url2, region_d_json)