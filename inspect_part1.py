import re
import sys

with open(r"d:\kodportfolio\client\public\extracted_mht\part_1.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

matches = [m.start() for m in re.finditer(r"(?i)(matglober|phone|reel)", text)]
print(f"Found {len(matches)} occurrences")
for m in matches[:10]:
    print("--- SNIPPET ---")
    start = max(0, m - 100)
    end = min(len(text), m + 300)
    snippet = text[start:end].encode("ascii", "replace").decode("ascii")
    print(snippet)
    print()
