with open(r"d:\kodportfolio\client\public\extracted_mht\part_1.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

import re
# replace data:image/... with [BASE64_IMAGE]
cleaned = re.sub(r'data:image/[^;]+;base64,[A-Za-z0-9+/=]+', '[BASE64_IMAGE]', html)
match = re.search(r'(<div class="posts">.*?</div>\s*</div>)', cleaned, re.DOTALL)
if match:
    with open(r"d:\kodportfolio\posts_structure.txt", "w", encoding="utf-8") as out:
        out.write(match.group(1))
    print("Saved posts structure!")
