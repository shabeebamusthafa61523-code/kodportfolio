import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('d:/kodportfolio/assets/works', exist_ok=True)

items = [
    {
        'file': 'work-1-ad-film.jpg',
        'title': 'Scripted Advertising Films',
        'subtitle': 'The Unseen Horizon - Cinematic Brand Narrative',
        'tag': 'FILM & NARRATIVE',
        'c1': (15, 10, 30),
        'c2': (96, 56, 153),
        'accent': (198, 231, 36),
        'motif': 'film'
    },
    {
        'file': 'work-2-commercial.jpg',
        'title': 'Commercial & Promotional Videos',
        'subtitle': 'Volt Motion - High-Impact Product Launch',
        'tag': 'COMMERCIAL VIDEO',
        'c1': (10, 20, 40),
        'c2': (40, 80, 160),
        'accent': (198, 231, 36),
        'motif': 'play'
    },
    {
        'file': 'work-3-branding.jpg',
        'title': 'Brand Campaigns',
        'subtitle': 'Nordic Roasters - 360 Degree Identity & Strategy',
        'tag': 'BRAND IDENTITY',
        'c1': (20, 15, 35),
        'c2': (120, 40, 140),
        'accent': (198, 231, 36),
        'motif': 'brand'
    },
    {
        'file': 'work-4-social-media.jpg',
        'title': 'Social Media Creatives',
        'subtitle': 'Urban Vibe - Kinetic Social Grid & Visuals',
        'tag': 'SOCIAL MARKETING',
        'c1': (10, 30, 30),
        'c2': (20, 120, 110),
        'accent': (198, 231, 36),
        'motif': 'grid'
    },
    {
        'file': 'work-5-reels.jpg',
        'title': 'Reels & Short-form Content',
        'subtitle': 'Pulse Beats - 9:16 Viral Kinetic Storytelling',
        'tag': 'REELS & TIKTOK',
        'c1': (35, 10, 30),
        'c2': (160, 30, 90),
        'accent': (198, 231, 36),
        'motif': 'phone'
    },
    {
        'file': 'work-6-photo-video.jpg',
        'title': 'Photography & Videography',
        'subtitle': 'Lumina Jewels - Editorial Studio & Lighting',
        'tag': 'PHOTO & STUDIO',
        'c1': (25, 20, 15),
        'c2': (140, 90, 40),
        'accent': (198, 231, 36),
        'motif': 'camera'
    },
    {
        'file': 'work-7-drone.jpg',
        'title': 'Drone Cinematography',
        'subtitle': 'Skyline Horizon - 4K Aerial Landscape Vision',
        'tag': 'AERIAL CINEMATOGRAPHY',
        'c1': (10, 25, 45),
        'c2': (30, 110, 180),
        'accent': (198, 231, 36),
        'motif': 'drone'
    },
    {
        'file': 'work-8-web-dev.jpg',
        'title': 'Website Design & Development',
        'subtitle': 'Nexus Digital - Bespoke Web Platform & UI/UX',
        'tag': 'WEB EXPERIENCE',
        'c1': (12, 16, 32),
        'c2': (70, 45, 170),
        'accent': (198, 231, 36),
        'motif': 'web'
    },
    {
        'file': 'work-9-digital-ads.jpg',
        'title': 'Digital Campaign Creatives',
        'subtitle': 'Aura Growth - High-Conversion Meta & Google Ads',
        'tag': 'PERFORMANCE MARKETING',
        'c1': (20, 10, 35),
        'c2': (100, 25, 120),
        'accent': (198, 231, 36),
        'motif': 'target'
    },
    {
        'file': 'work-10-corporate.jpg',
        'title': 'Corporate Presentations',
        'subtitle': 'Apex Global - Keynote & Series Pitch Decks',
        'tag': 'PRESENTATION DESIGN',
        'c1': (15, 20, 30),
        'c2': (50, 70, 120),
        'accent': (198, 231, 36),
        'motif': 'deck'
    }
]

W, H = 900, 600

for item in items:
    img = Image.new('RGB', (W, H), item['c1'])
    draw = ImageDraw.Draw(img)
    
    # Draw smooth gradient
    c1 = item['c1']
    c2 = item['c2']
    for y in range(H):
        t = y / float(H)
        r = int(c1[0] * (1.0 - t) + c2[0] * t)
        g = int(c1[1] * (1.0 - t) + c2[1] * t)
        b = int(c1[2] * (1.0 - t) + c2[2] * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
        
    # Draw tech grid pattern
    for gx in range(0, W, 40):
        draw.line([(gx, 0), (gx, H)], fill=(255, 255, 255, 15))
    for gy in range(0, H, 40):
        draw.line([(0, gy), (W, gy)], fill=(255, 255, 255, 15))
        
    # Outer decorative geometric rings
    acc = item['accent']
    draw.ellipse([W - 320, 80, W - 40, 360], outline=acc, width=2)
    draw.ellipse([W - 270, 130, W - 90, 310], outline=(255, 255, 255), width=1)
    
    # Motif shapes in top right
    cx, cy = W - 180, 220
    if item['motif'] == 'film':
        draw.rectangle([cx - 45, cy - 35, cx + 45, cy + 35], outline=acc, width=3)
        draw.polygon([(cx - 15, cy - 20), (cx + 20, cy), (cx - 15, cy + 20)], fill=acc)
    elif item['motif'] == 'drone':
        draw.ellipse([cx - 35, cy - 35, cx + 35, cy + 35], outline=acc, width=2)
        draw.line([(cx - 45, cy - 45), (cx + 45, cy + 45)], fill=acc, width=2)
        draw.line([(cx - 45, cy + 45), (cx + 45, cy - 45)], fill=acc, width=2)
        draw.ellipse([cx - 12, cy - 12, cx + 12, cy + 12], fill=acc)
    elif item['motif'] == 'web':
        draw.rectangle([cx - 50, cy - 35, cx + 50, cy + 35], outline=acc, width=2)
        draw.line([(cx - 50, cy - 20), (cx + 50, cy - 20)], fill=acc, width=2)
        draw.ellipse([cx - 40, cy - 28, cx - 34, cy - 22], fill=acc)
        draw.ellipse([cx - 30, cy - 28, cx - 24, cy - 22], fill=acc)
    else:
        draw.polygon([(cx - 20, cy - 30), (cx + 30, cy), (cx - 20, cy + 30)], fill=acc)
        
    # Star sparkle accent (from Kodbrand logo)
    sx, sy = 60, 70
    draw.polygon([(sx, sy-16), (sx+5, sy-5), (sx+16, sy), (sx+5, sy+5), (sx, sy+16), (sx-5, sy+5), (sx-16, sy), (sx-5, sy-5)], fill=acc)
    
    # Save image
    fname = item['file']
    outpath = os.path.join('d:/kodportfolio/assets/works', fname)
    img.save(outpath, quality=92)

print('All 10 project visual assets generated successfully!')
