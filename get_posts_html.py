with open(r"d:\kodportfolio\client\public\extracted_mht\part_1.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

import re
match = re.search(r'(<div class="posts">.*?</div>\s*</div>)', html, re.DOTALL)
if match:
    # sanitize characters that cannot be printed
    s = match.group(1).encode("ascii", "replace").decode("ascii")
    with open(r"d:\kodportfolio\posts_html.txt", "w", encoding="utf-8") as out:
        out.write(s)
    print("Saved posts HTML! Length:", len(s))
else:
    print("Not found")
