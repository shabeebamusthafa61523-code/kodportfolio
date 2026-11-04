const express = require('express');
const router = express.Router();
const Showcase = require('../models/Showcase');

// GET /api/showcases
router.get('/', async (req, res) => {
  try {
    const showcases = await Showcase.find().sort({ order: 1, createdAt: 1 });
    res.json(showcases);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch showcases', details: err.message });
  }
});

// PUT /api/showcases/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, sector, desc, images, order, isActive } = req.body;
    const showcase = await Showcase.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name: name.trim() }),
        ...(sector && { sector: sector.trim() }),
        ...(desc && { desc: desc.trim() }),
        ...(images && { images }),
        ...(order !== undefined && { order: Number(order) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) })
      },
      { new: true }
    );

    if (!showcase) {
      return res.status(404).json({ error: 'Showcase not found' });
    }

    res.json(showcase);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update showcase', details: err.message });
  }
});

module.exports = router;
