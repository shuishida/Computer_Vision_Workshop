import sys, os, requests, asyncio

async def image_CV(data):
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
    print(analysis)
    return analysis

try:
    loop = asyncio.get_event_loop()
    tasks = []
    
    dirname = os.path.dirname(os.path.abspath(__file__))
    root = sys.argv[1]
    for root, dirs, files in os.walk(root):
        for name in files:
            if(name[len(name)-3:].lower()=='jpg'):
                fname = os.path.join(root, name)
                with open(fname, "rb") as f:
                    data = f.read()
                    print(fname)
                    tasks.append(image_CV(data))

    res = loop.run_until_complete(asyncio.wait(tasks))
    loop.close()
except Exception as e:
    print(e)
