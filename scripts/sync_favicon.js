const fs = require('fs');
const path = require('path');

const icoPath = path.join(__dirname, '../client/public/favicon.ico');
const svgPath = path.join(__dirname, '../client/public/favicon.svg');
const pngPath = path.join(__dirname, '../client/public/favicon.png');

if (fs.existsSync(icoPath)) {
  const icoBuf = fs.readFileSync(icoPath);
  // Ensure favicon.png is also identical
  fs.writeFileSync(pngPath, icoBuf);

  // Convert to embedded SVG
  const b64 = icoBuf.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
  <image width="1024" height="1024" href="data:image/png;base64,${b64}"/>
</svg>`;
  fs.writeFileSync(svgPath, svg, 'utf8');
  console.log('Successfully synced favicon.ico to favicon.svg and favicon.png');
} else {
  console.error('favicon.ico not found at', icoPath);
}
