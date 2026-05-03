import urllib.request
import json
url = "https://en.wikipedia.org/w/api.php?action=query&titles=Aman_Gupta&prop=pageimages&format=json&pithumbsize=500"
try:
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode())
        pages = data['query']['pages']
        for page_id in pages:
            if 'thumbnail' in pages[page_id]:
                print(pages[page_id]['thumbnail']['source'])
            else:
                print("No thumbnail found for Wikipedia page Aman Gupta")
except Exception as e:
    print(e)
