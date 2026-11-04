import email
from email import policy
import os

with open(r"C:\Users\Lenovo L460\Downloads\Portfolio_FSH.mht", "rb") as f:
    msg = email.message_from_binary_file(f, policy=policy.default)

out_dir = r"d:\kodportfolio\client\public\extracted_mht"
os.makedirs(out_dir, exist_ok=True)

idx = 0
for part in msg.walk():
    ctype = part.get_content_type()
    loc = part.get("Content-Location")
    payload = part.get_payload(decode=True)
    if payload:
        ext = "txt"
        if "html" in ctype:
            ext = "html"
        elif "css" in ctype:
            ext = "css"
        elif "image" in ctype:
            ext = ctype.split("/")[-1].replace("jpeg", "jpg")
        fname = f"part_{idx}.{ext}"
        filepath = os.path.join(out_dir, fname)
        with open(filepath, "wb") as out:
            out.write(payload)
        print(f"Saved {fname} ({len(payload)} bytes) - ctype: {ctype} - loc: {loc}")
    idx += 1
