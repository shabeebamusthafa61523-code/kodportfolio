import re
import os
import base64

with open(r"d:\kodportfolio\client\public\extracted_mht\part_1.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Extract all .post elements
posts = re.findall(r'<a class="post" href="([^"]+)"[^>]*>(.*?)</a>', html, re.DOTALL)
print(f"Found {len(posts)} posts in HTML!")

out_reels_dir = r"d:\kodportfolio\client\public\reels"
os.makedirs(out_reels_dir, exist_ok=True)

reel_data = []

for i, (href, inner) in enumerate(posts):
    # Find base64 image
    img_match = re.search(r'data:image/jpeg;base64,([A-Za-z0-9+/=]+)', inner)
    filename = f"shiya-reel-{i+1}.jpg"
    if img_match:
        b64_data = img_match.group(1)
        with open(os.path.join(out_reels_dir, filename), "wb") as img_file:
            img_file.write(base64.b64decode(b64_data))
        print(f"Saved {filename} ({len(b64_data)} b64 chars)")
    
    # Extract header text
    h_match = re.search(r'<div class="ph-h">(.*?)</div>', inner)
    header = h_match.group(1) if h_match else ""
    # strip tags
    header_clean = re.sub(r'<[^>]+>', ' ', header).strip()
    
    reel_data.append({
        "index": i + 1,
        "href": href,
        "header": header_clean,
        "image": f"/reels/{filename}"
    })

print("\nReels summary:")
for r in reel_data:
    print(r)
