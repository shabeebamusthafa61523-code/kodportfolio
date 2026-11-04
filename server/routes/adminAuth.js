const express = require('express');
const router = express.Router();
const AdminConfig = require('../models/AdminConfig');
const ClientLogo = require('../models/ClientLogo');
const Reel = require('../models/Reel');
const Poster = require('../models/Poster');
const Showcase = require('../models/Showcase');
const { defaultLogos, defaultReels, defaultPosters, defaultShowcases } = require('../data/adminSeedData');

// POST /api/admin/verify-pin
router.post('/verify-pin', async (req, res) => {
  try {
    const { pin } = req.body;
    if (!pin) {
      return res.status(400).json({ error: 'PIN is required' });
    }

    let config = await AdminConfig.findOne({ key: 'admin_config' });
    if (!config) {
      config = await AdminConfig.create({ key: 'admin_config', pin: '12345' });
    }

    if (config.pin === String(pin).trim()) {
      config.lastLoginAt = new Date();
      await config.save();
      return res.json({
        success: true,
        message: 'Admin authentication successful',
        token: `kod-admin-token-${Date.now()}`
      });
    }

    return res.status(401).json({ success: false, error: 'Invalid PIN. Access denied.' });
  } catch (err) {
    res.status(500).json({ error: 'Authentication failed', details: err.message });
  }
});

// POST /api/admin/change-pin
router.post('/change-pin', async (req, res) => {
  try {
    const { currentPin, newPin } = req.body;
    if (!newPin || newPin.length < 4) {
      return res.status(400).json({ error: 'New PIN must be at least 4 digits' });
    }

    let config = await AdminConfig.findOne({ key: 'admin_config' });
    if (!config) {
      config = await AdminConfig.create({ key: 'admin_config', pin: '12345' });
    }

    if (config.pin !== String(currentPin).trim()) {
      return res.status(401).json({ error: 'Current PIN is incorrect' });
    }

    config.pin = String(newPin).trim();
    await config.save();
    res.json({ success: true, message: 'Admin PIN updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update PIN', details: err.message });
  }
});

// POST /api/admin/reset-defaults (Restores all original portfolio content)
router.post('/reset-defaults', async (req, res) => {
  try {
    await ClientLogo.deleteMany({});
    await ClientLogo.insertMany(defaultLogos);

    await Reel.deleteMany({});
    await Reel.insertMany(defaultReels);

    await Poster.deleteMany({});
    await Poster.insertMany(defaultPosters);

    await Showcase.deleteMany({});
    await Showcase.insertMany(defaultShowcases);

    let config = await AdminConfig.findOne({ key: 'admin_config' });
    if (config) {
      config.pin = '12345';
      await config.save();
    }

    res.json({ success: true, message: 'All portfolio data restored to factory defaults (PIN reset to 12345).' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset defaults', details: err.message });
  }
});

module.exports = router;
