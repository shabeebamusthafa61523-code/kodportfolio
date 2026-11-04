const express = require('express');
const router = express.Router();
const Poster = require('../models/Poster');

// GET /api/posters
router.get('/', async (req, res) => {
  try {
    const posters = await Poster.find().sort({ order: 1, createdAt: 1 });
    res.json(posters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posters', details: err.message });
  }
});

// POST /api/posters
router.post('/', async (req, res) => {
  try {
    const { title, alt, src, campaignTag, order } = req.body;
    if (!src) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const count = await Poster.countDocuments();
    const poster = await Poster.create({
      title: title ? title.trim() : `Poster ${count + 1}`,
      alt: alt ? alt.trim() : title || `Campaign Poster ${count + 1}`,
      src: src.trim(),
      campaignTag: campaignTag ? campaignTag.trim() : 'Visual Campaign',
      order: order !== undefined ? Number(order) : count + 1,
      isActive: true
    });

    res.status(201).json(poster);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add poster', details: err.message });
  }
});

// PUT /api/posters/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, alt, src, campaignTag, order, isActive } = req.body;
    const poster = await Poster.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title: title.trim() }),
        ...(alt && { alt: alt.trim() }),
        ...(src && { src: src.trim() }),
        ...(campaignTag && { campaignTag: campaignTag.trim() }),
        ...(order !== undefined && { order: Number(order) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) })
      },
      { new: true }
    );

    if (!poster) {
      return res.status(404).json({ error: 'Poster not found' });
    }

    res.json(poster);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update poster', details: err.message });
  }
});

// DELETE /api/posters/:id
router.delete('/:id', async (req, res) => {
  try {
    const poster = await Poster.findByIdAndDelete(req.params.id);
    if (!poster) {
      return res.status(404).json({ error: 'Poster not found' });
    }
    res.json({ success: true, message: 'Poster deleted', deletedId: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete poster', details: err.message });
  }
});

module.exports = router;
