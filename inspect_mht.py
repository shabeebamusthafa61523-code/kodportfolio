import re

with open(r"d:\kodportfolio\client\public\extracted_mht\index.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

print("Length:", len(text))
print("Images found:")
for match in re.findall(r'<img[^>]+>', text):
    print(match[:150])

print("\nSections / classes found:")
for match in re.findall(r'class="([^"]+)"', text):
    if any(k in match.lower() for k in ["reel", "video", "card", "phone", "cluster", "slide", "poster", "swiper"]):
        print(match)
