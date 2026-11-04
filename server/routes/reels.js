const express = require('express');
const router = express.Router();
const Reel = require('../models/Reel');

// GET /api/reels
router.get('/', async (req, res) => {
  try {
    const reels = await Reel.find().sort({ order: 1, createdAt: 1 });
    res.json(reels);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reels', details: err.message });
  }
});

// POST /api/reels
router.post('/', async (req, res) => {
  try {
    const { creator, avatar, title, thumb, url, rotation, marginTop, order } = req.body;
    if (!title || !thumb || !url) {
      return res.status(400).json({ error: 'Title, thumbnail URL, and video/reel URL are required' });
    }

    const count = await Reel.countDocuments();
    const defaultTilts = ['-3.5deg', '2.5deg', '-2deg', '3deg'];
    const defaultMargins = ['0px', '26px'];

    const newReel = await Reel.create({
      creator: creator ? creator.trim() : 'Fathima Shiya Hamza',
      avatar: avatar ? avatar.trim() : 'FS',
      title: title.trim(),
      thumb: thumb.trim(),
      url: url.trim(),
      rotation: rotation || defaultTilts[count % defaultTilts.length],
      marginTop: marginTop || defaultMargins[count % defaultMargins.length],
      order: order !== undefined ? Number(order) : count + 1,
      isActive: true
    });

    res.status(201).json(newReel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create reel', details: err.message });
  }
});

// PUT /api/reels/:id
router.put('/:id', async (req, res) => {
  try {
    const { creator, avatar, title, thumb, url, rotation, marginTop, order, isActive } = req.body;
    const reel = await Reel.findByIdAndUpdate(
      req.params.id,
      {
        ...(creator && { creator: creator.trim() }),
        ...(avatar && { avatar: avatar.trim() }),
        ...(title && { title: title.trim() }),
        ...(thumb && { thumb: thumb.trim() }),
        ...(url && { url: url.trim() }),
        ...(rotation && { rotation: rotation.trim() }),
        ...(marginTop && { marginTop: marginTop.trim() }),
        ...(order !== undefined && { order: Number(order) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) })
      },
      { new: true }
    );

    if (!reel) {
      return res.status(404).json({ error: 'Reel not found' });
    }

    res.json(reel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update reel', details: err.message });
  }
});

// DELETE /api/reels/:id
router.delete('/:id', async (req, res) => {
  try {
    const reel = await Reel.findByIdAndDelete(req.params.id);
    if (!reel) {
      return res.status(404).json({ error: 'Reel not found' });
    }
    res.json({ success: true, message: 'Reel deleted successfully', deletedId: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete reel', details: err.message });
  }
});

module.exports = router;
