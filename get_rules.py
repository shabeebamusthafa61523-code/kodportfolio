with open(r"d:\kodportfolio\client\public\extracted_mht\part_3.css", "r", encoding="utf-8", errors="ignore") as f:
    css = f.read()

import re
matches = re.findall(r'(\.[^{]+{[^}]+})', css)
with open(r"d:\kodportfolio\reels_css_rules.txt", "w", encoding="utf-8") as out:
    for m in matches:
        if any(k in m for k in [".posts", ".post", ".ph-h", ".ph-f", ".vid"]):
            out.write(m + "\n\n")

print("Wrote rules!")
