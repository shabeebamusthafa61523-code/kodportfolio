const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'davmqgfsq',
  api_key: process.env.CLOUDINARY_API_KEY || '976849719864154',
  api_secret: process.env.CLOUDINARY_API_SECRET || '4y5gt48K8Sibcxc2upURnenrst0'
});

async function processImageToTransparentBW(inputBufferOrPath) {
  const img = sharp(inputBufferOrPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  const threshold = 210;
  let topY = info.height, botY = 0, leftX = info.width, rightX = 0;
  const outData = Buffer.alloc(data.length);

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Determine alpha: transparent for light/white background
      let newAlpha = 0;
      if (a > 10) {
        if (lum < 200) {
          newAlpha = a;
        } else if (lum < 225) {
          newAlpha = Math.round(a * (225 - lum) / 25);
        }
      }

      if (newAlpha > 15) {
        if (y < topY) topY = y;
        if (y > botY) botY = y;
        if (x < leftX) leftX = x;
        if (x > rightX) rightX = x;

        // Foreground: crisp pure black (monochrome) with anti-aliased alpha
        outData[i] = 0;
        outData[i + 1] = 0;
        outData[i + 2] = 0;
        outData[i + 3] = newAlpha;
      } else {
        outData[i] = 0;
        outData[i + 1] = 0;
        outData[i + 2] = 0;
        outData[i + 3] = 0;
      }
    }
  }

  // Ensure valid crop coordinates
  if (leftX >= rightX || topY >= botY) {
    topY = 0; botY = info.height - 1; leftX = 0; rightX = info.width - 1;
  }

  const pad = 24;
  const cropX = Math.max(0, leftX - pad);
  const cropY = Math.max(0, topY - pad);
  const cropW = Math.min(info.width - cropX, (rightX - leftX) + pad * 2);
  const cropH = Math.min(info.height - cropY, (botY - topY) + pad * 2);

  return sharp(outData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toBuffer();
}

async function run() {
  console.log('--- Processing All Client Logos: Remove Background & Make B&W ---');

  // 1. Process uploaded Razain and Redpex
  const uploadsDir = path.join(__dirname, '../uploads');
  const tempRazain = path.join(uploadsDir, 'temp_razain.jpg');
  const tempRedpex = path.join(uploadsDir, 'temp_redpex.png');

  let razainCloudUrl = null;
  let redpexCloudUrl = null;

  if (fs.existsSync(tempRazain)) {
    console.log('Processing Razain upload...');
    const buf = await processImageToTransparentBW(tempRazain);
    const outPath = path.join(uploadsDir, 'razain_nobg.png');
    fs.writeFileSync(outPath, buf);

    console.log('Uploading processed Razain to Cloudinary...');
    const res = await cloudinary.uploader.upload(outPath, {
      folder: 'kodbrand/logos',
      format: 'png'
    });
    razainCloudUrl = res.secure_url;
    console.log('Razain uploaded:', razainCloudUrl);
  }

  if (fs.existsSync(tempRedpex)) {
    console.log('Processing Redpex upload...');
    const buf = await processImageToTransparentBW(tempRedpex);
    const outPath = path.join(uploadsDir, 'redpex_nobg.png');
    fs.writeFileSync(outPath, buf);

    console.log('Uploading processed Redpex to Cloudinary...');
    const res = await cloudinary.uploader.upload(outPath, {
      folder: 'kodbrand/logos',
      format: 'png'
    });
    redpexCloudUrl = res.secure_url;
    console.log('Redpex uploaded:', redpexCloudUrl);
  }

  // 2. Process all seeded logos in client/public
  const publicDir = path.join(__dirname, '../../client/public');
  const seededFiles = [
    'horizone.png',
    'inkspire.png',
    'paris cafe.png',
    'ipas-logo.png',
    'brownie-bakes.png',
    'LOGO 1.png',
    'LOGO 2.png',
    'LOGO 4.png',
    'LOGO 5.png',
    'redpex.png',
    'razain.png'
  ];

  for (const file of seededFiles) {
    const fullPath = path.join(publicDir, file);
    if (fs.existsSync(fullPath)) {
      console.log(`Processing seeded logo: ${file}`);
      const processedBuf = await processImageToTransparentBW(fullPath);
      fs.writeFileSync(fullPath, processedBuf);
    }
  }

  // 3. Update MongoDB Atlas
  console.log('Connecting to MongoDB Atlas...');
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (mongoUri) {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');
    const ClientLogo = require('../models/ClientLogo');

    if (razainCloudUrl) {
      await ClientLogo.updateOne({ name: /razain/i }, { src: razainCloudUrl });
      console.log('Updated Razain in MongoDB Atlas.');
    }

    if (redpexCloudUrl) {
      await ClientLogo.updateOne({ name: /redpex/i }, { src: redpexCloudUrl });
      console.log('Updated Redpex in MongoDB Atlas.');
    }

    await mongoose.disconnect();
  }

  console.log('--- ALL LOGOS PROCESSED SUCCESSFULLY ---');
}

run().catch((err) => {
  console.error('Error processing logos:', err);
  process.exit(1);
});
