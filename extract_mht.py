import email
from email import policy
import os

with open(r"C:\Users\Lenovo L460\Downloads\Portfolio_FSH.mht", "rb") as f:
    msg = email.message_from_binary_file(f, policy=policy.default)

out_dir = r"d:\kodportfolio\client\public\extracted_mht"
os.makedirs(out_dir, exist_ok=True)

print("Subject:", msg.get("Subject"))
idx = 0
for part in msg.walk():
    ctype = part.get_content_type()
    loc = part.get("Content-Location")
    fname = part.get_filename()
    print(f"[{idx}] {ctype} - {fname} - {loc}")
    payload = part.get_payload(decode=True)
    if payload:
        if ctype.startswith("text/html"):
            with open(os.path.join(out_dir, "index.html"), "wb") as out:
                out.write(payload)
        elif ctype.startswith("image/"):
            ext = ctype.split("/")[1].replace("jpeg", "jpg")
            name = fname or f"image_{idx}.{ext}"
            with open(os.path.join(out_dir, name), "wb") as out:
                out.write(payload)
    idx += 1
print("Done extracting!")
