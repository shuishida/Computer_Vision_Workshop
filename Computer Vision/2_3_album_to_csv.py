import sys, os, requests, asyncio, csv

async def image_CV(filename, data):
    subscription_key = "cfa2ac95fcf04101b79b8398378*****"
    vision_base_url = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/"
    vision_analyze_url = vision_base_url + "analyze"

    headers  = {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': subscription_key, 
    }
    params   = {'visualFeatures': 'Categories,Description,Color'}
    response = requests.post(vision_analyze_url, headers=headers, params=params, data=data)
    response.raise_for_status()
    analysis = response.json()
    result = {'filename': filename, 'analysis': analysis}
    print(result)
    return result

try:
    loop = asyncio.get_event_loop()
    tasks = []

    root = sys.argv[1]
    for root, dirs, files in os.walk(root):
        for name in files:
            if(name[len(name)-3:].lower()=='jpg'):
                fname = os.path.join(root, name)
                with open(fname, "rb") as f:
                    data = f.read()
                    tasks.append(image_CV(fname, data))

    results = loop.run_until_complete(asyncio.wait(tasks))
    loop.close()

    with open('album.csv', 'w') as f:
        writer = csv.writer(f, lineterminator='\n')
        writer.writerow(['file_path', 'captions', 'tags'])
        for result in results[0]:
            res = result.result()
            fname = res['filename']
            res = res['analysis']['description']
            writer.writerow([fname]+[res['captions'][0]['text']]+res['tags'])
            
except Exception as e:
    print(e)
