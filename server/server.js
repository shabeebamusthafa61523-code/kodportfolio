require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Existing routes & models
const projectsRouter = require('./routes/projects');
const leadsRouter = require('./routes/leads');
const Project = require('./models/Project');
const seedData = require('./data/seedData');

// New Admin & Content routes & models
const adminAuthRouter = require('./routes/adminAuth');
const clientLogosRouter = require('./routes/clientLogos');
const reelsRouter = require('./routes/reels');
const postersRouter = require('./routes/posters');
const showcasesRouter = require('./routes/showcases');
const uploadRouter = require('./routes/upload');

const AdminConfig = require('./models/AdminConfig');
const ClientLogo = require('./models/ClientLogo');
const Reel = require('./models/Reel');
const Poster = require('./models/Poster');
const Showcase = require('./models/Showcase');
const { defaultLogos, defaultReels, defaultPosters, defaultShowcases } = require('./data/adminSeedData');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://athirarun219_db_user:KjidkWRLYfH11c8w@cluster0.uufsiic.mongodb.net/kodbrand?retryWrites=true&w=majority';

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middlewares
// Dynamic CORS reflection allows Vercel production + preview deployment URLs with full credentials support
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);
app.use(express.json());

// Serve uploaded media statically
app.use('/uploads', express.static(uploadsDir));

// Auto-seed function when DB connects
async function autoSeedIfEmpty() {
  try {
    // 1. Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('⚡ Seeding initial portfolio projects...');
      await Project.insertMany(seedData);
    }

    // 2. Admin Config & Default PIN 12345
    let config = await AdminConfig.findOne({ key: 'admin_config' });
    if (!config) {
      console.log('⚡ Initializing Admin Config with default PIN: 12345...');
      await AdminConfig.create({ key: 'admin_config', pin: '12345' });
    }

    // 3. Client Logos (Trusted by Global Leaders)
    const logoCount = await ClientLogo.countDocuments();
    if (logoCount === 0) {
      console.log('⚡ Seeding default Trusted by Global Leaders logos...');
      await ClientLogo.insertMany(defaultLogos);
      console.log(`✅ Seeded ${defaultLogos.length} partner logos.`);
    }

    // 4. Reels & Short-Form Videos
    const reelCount = await Reel.countDocuments();
    if (reelCount === 0) {
      console.log('⚡ Seeding default short-form video reels...');
      await Reel.insertMany(defaultReels);
      console.log(`✅ Seeded ${defaultReels.length} video reels.`);
    }

    // 5. Campaign Posters
    const posterCount = await Poster.countDocuments();
    if (posterCount === 0) {
      console.log('⚡ Seeding default visual campaign posters...');
      await Poster.insertMany(defaultPosters);
      console.log(`✅ Seeded ${defaultPosters.length} campaign posters.`);
    }

    // 6. Featured Showcases
    const showcaseCount = await Showcase.countDocuments();
    if (showcaseCount === 0) {
      console.log('⚡ Seeding default featured showcases...');
      await Showcase.insertMany(defaultShowcases);
      console.log(`✅ Seeded ${defaultShowcases.length} sliding showcases.`);
    }

    console.log('📦 Database initialized and ready with all content modules.');
  } catch (err) {
    console.warn('⚠️ Seeding check error:', err.message);
  }
}

// Connect to MongoDB
let isDbConnected = false;
mongoose
  .connect(MONGODB_URI, { dbName: 'kodbrand' })
  .then(() => {
    isDbConnected = true;
    console.log(`🌿 Connected to MongoDB Atlas at kodbrand`);
    autoSeedIfEmpty();
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection failed, running in fallback mode:', err.message);
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    agency: 'KODBRAND Creative Advertising & Brand Solutions',
    stack: 'MERN (MongoDB, Express, React, Node.js)',
    dbConnected: isDbConnected,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/projects', projectsRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/admin/auth', adminAuthRouter);
app.use('/api/client-logos', clientLogosRouter);
app.use('/api/reels', reelsRouter);
app.use('/api/posters', postersRouter);
app.use('/api/showcases', showcasesRouter);
app.use('/api/upload', uploadRouter);

// Serve static frontend in production if built
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 KODBRAND MERN Server running at http://localhost:${PORT}`);
});
