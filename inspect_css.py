import re

with open(r"d:\kodportfolio\client\public\extracted_mht\part_1.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

# Let's see style tags in part_1.html
styles = re.findall(r'<style[^>]*>(.*?)</style>', text, re.DOTALL)
print(f"Found {len(styles)} style tags in part_1.html")
for i, s in enumerate(styles):
    print(f"--- Style {i} ---")
    for line in s.splitlines():
        if any(k in line for k in ["posts", "post", "ph-h", "ph-f", "vid"]):
            print(line)

# Let's also check part_3.css
with open(r"d:\kodportfolio\client\public\extracted_mht\part_3.css", "r", encoding="utf-8", errors="ignore") as f:
    css = f.read()

print("\n--- In part_3.css ---")
for line in css.splitlines():
    if any(k in line for k in [".posts", ".post", ".ph-h", ".ph-f", ".vid"]):
        print(line[:120])
