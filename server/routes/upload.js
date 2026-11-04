const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;

// Background removal and monochrome conversion for logo uploads
async function processLogoToTransparentBW(filePath) {
  try {
    const img = sharp(filePath).ensureAlpha();
    const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

    let topY = info.height, botY = 0, leftX = info.width, rightX = 0;
    const outData = Buffer.alloc(data.length);

    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const i = (y * info.width + x) * 4;
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

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

    if (leftX >= rightX || topY >= botY) {
      topY = 0; botY = info.height - 1; leftX = 0; rightX = info.width - 1;
    }

    const pad = 24;
    const cropX = Math.max(0, leftX - pad);
    const cropY = Math.max(0, topY - pad);
    const cropW = Math.min(info.width - cropX, (rightX - leftX) + pad * 2);
    const cropH = Math.min(info.height - cropY, (botY - topY) + pad * 2);

    const processedPath = filePath.replace(/\.[^/.]+$/, '_nobg.png');
    await sharp(outData, { raw: { width: info.width, height: info.height, channels: 4 } })
      .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
      .png()
      .toFile(processedPath);

    return processedPath;
  } catch (err) {
    console.warn('Logo B&W processing skipped, using original:', err.message);
    return filePath;
  }
}

// Configure Cloudinary if credentials are present
const isCloudinaryConfigured = Boolean(
  (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) ||
  process.env.CLOUDINARY_URL
);

if (isCloudinaryConfigured) {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
  }
}

// Local storage fallback directory
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Memory storage for fast streaming to Cloudinary or disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${cleanBase}_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|svg|gif|mp4|webm|mov/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (allowed.test(ext) || allowed.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are supported.'));
    }
  }
});

// POST /api/upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let uploadFilePath = req.file.path;
    const isLogo = req.body.type === 'logo' || req.query.type === 'logo';
    if (isLogo && !req.file.mimetype.startsWith('video')) {
      uploadFilePath = await processLogoToTransparentBW(req.file.path);
    }

    // 1. If Cloudinary is configured with all keys, upload directly to Cloudinary
    if (
      (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) ||
      process.env.CLOUDINARY_URL
    ) {
      try {
        const isVideo = req.file.mimetype.startsWith('video');
        const uploadResult = await cloudinary.uploader.upload(uploadFilePath, {
          folder: isLogo ? 'kodbrand/logos' : 'kodbrand',
          resource_type: isVideo ? 'video' : 'auto',
          format: isLogo ? 'png' : undefined
        });

        // Optionally remove local temp files after cloud upload
        try {
          if (fs.existsSync(uploadFilePath)) fs.unlinkSync(uploadFilePath);
          if (uploadFilePath !== req.file.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        } catch {
          // ignore cleanup error
        }

        return res.json({
          success: true,
          provider: 'cloudinary',
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
          format: uploadResult.format,
          size: uploadResult.bytes || req.file.size
        });
      } catch (cloudErr) {
        console.warn('⚠️ Cloudinary upload failed, falling back to local storage:', cloudErr.message);
      }
    }

    // 2. Fallback to local disk storage
    const finalFilename = path.basename(uploadFilePath);
    const publicUrl = `/uploads/${finalFilename}`;
    res.json({
      success: true,
      provider: 'local',
      filename: req.file.filename,
      url: publicUrl,
      size: req.file.size
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'File upload processing failed', message: err.message });
  }
});

module.exports = router;
