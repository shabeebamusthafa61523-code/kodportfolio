const path = require('path');
const sharp = require(path.join(__dirname, '../server/node_modules/sharp'));
const fs = require('fs');

async function createWhatsAppOGCard() {
  const width = 1200;
  const height = 630;

  // Background SVG with rich dark theme, gradient glows, and typography
  const svgBg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#08090e"/>
          <stop offset="50%" stop-color="#0f111a"/>
          <stop offset="100%" stop-color="#06070a"/>
        </linearGradient>
        <radialGradient id="purpleGlow" cx="20%" cy="30%" r="55%">
          <stop offset="0%" stop-color="#6c2bd9" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#6c2bd9" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="acidGlow" cx="85%" cy="65%" r="50%">
          <stop offset="0%" stop-color="#c4ec0d" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="#c4ec0d" stop-opacity="0"/>
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      <!-- Background Gradients -->
      <rect width="100%" height="100%" fill="url(#bgGrad)"/>
      <rect width="100%" height="100%" fill="url(#purpleGlow)"/>
      <rect width="100%" height="100%" fill="url(#acidGlow)"/>

      <!-- Tech border casing -->
      <rect x="28" y="28" width="1144" height="574" rx="20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>

      <!-- Category Tag Badge -->
      <g transform="translate(80, 75)">
        <rect width="320" height="38" rx="19" fill="rgba(196, 236, 13, 0.12)" stroke="rgba(196, 236, 13, 0.4)" stroke-width="1.5"/>
        <circle cx="20" cy="19" r="5" fill="#c4ec0d"/>
        <text x="36" y="24" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#c4ec0d" letter-spacing="2.2">CREATIVE ADVERTISING AGENCY</text>
      </g>

      <!-- Subtitle Tagline -->
      <g transform="translate(80, 470)">
        <text x="0" y="0" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#ffffff" letter-spacing="-0.02em">
          Creative Advertising &amp; Brand Solutions
        </text>
        <text x="0" y="42" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="20" font-weight="500" fill="rgba(245, 245, 240, 0.65)">
          Distinctive Brand Identities • Visual Campaigns • Dynamic Video Production
        </text>
      </g>

      <!-- WhatsApp / Website Footer Link Strip -->
      <g transform="translate(80, 565)">
        <text x="0" y="0" font-family="'Space Grotesk', system-ui, sans-serif" font-size="16" font-weight="700" fill="#c4ec0d" letter-spacing="1.5">
          KODBRAND.COM
        </text>
        <text x="170" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="500" fill="rgba(255, 255, 255, 0.4)">
          | Click to explore portfolio &amp; campaign showcases
        </text>
      </g>
    </svg>
  `);

  const logoPath = path.join(__dirname, '../client/public/kodbrand-logo-darkmode.png');
  const outJpgPath = path.join(__dirname, '../client/public/og-card.jpg');
  const outPngPath = path.join(__dirname, '../client/public/og-card.png');
  const outSquareJpg = path.join(__dirname, '../client/public/og-square.jpg');

  // Resize logo for 1200x630 banner
  const logoBuffer = await sharp(logoPath)
    .resize(560, null, { fit: 'inside' })
    .toBuffer();

  // 1. Generate 1200x630 Card (JPEG under 150KB for WhatsApp)
  await sharp(svgBg)
    .composite([
      {
        input: logoBuffer,
        top: 155,
        left: 80
      }
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outJpgPath);

  // 2. Generate 1200x630 Card (PNG for high-DPI displays)
  await sharp(svgBg)
    .composite([
      {
        input: logoBuffer,
        top: 155,
        left: 80
      }
    ])
    .png({ quality: 90, compressionLevel: 8 })
    .toFile(outPngPath);

  // 3. Generate 600x600 Square Card for compact WhatsApp preview icons
  const squareSvg = Buffer.from(`
    <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sqBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#08090e"/>
          <stop offset="100%" stop-color="#121420"/>
        </linearGradient>
        <radialGradient id="sqAcid" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#c4ec0d" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#c4ec0d" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#sqBg)"/>
      <rect width="100%" height="100%" fill="url(#sqAcid)"/>
      <rect x="18" y="18" width="564" height="564" rx="20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
      <g transform="translate(50, 480)">
        <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="800" fill="#ffffff">
          KODBRAND
        </text>
        <text x="0" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#c4ec0d">
          Creative Advertising &amp; Brand Solutions
        </text>
      </g>
    </svg>
  `);

  const squareLogo = await sharp(logoPath)
    .resize(480, null, { fit: 'inside' })
    .toBuffer();

  await sharp(squareSvg)
    .composite([
      {
        input: squareLogo,
        top: 150,
        left: 60
      }
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outSquareJpg);

  console.log('✅ Generated og-card.jpg, og-card.png, and og-square.jpg successfully!');
}

createWhatsAppOGCard().catch((err) => {
  console.error('Error generating OG cards:', err);
  process.exit(1);
});
