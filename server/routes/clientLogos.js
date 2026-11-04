const express = require('express');
const router = express.Router();
const ClientLogo = require('../models/ClientLogo');

// GET /api/client-logos (Get all partner logos)
router.get('/', async (req, res) => {
  try {
    const logos = await ClientLogo.find().sort({ order: 1, createdAt: 1 });
    res.json(logos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch partner logos', details: err.message });
  }
});

// POST /api/client-logos (Add new partner logo)
router.post('/', async (req, res) => {
  try {
    const { name, src, order } = req.body;
    if (!name || !src) {
      return res.status(400).json({ error: 'Logo name and image URL are required' });
    }

    const maxOrderDoc = await ClientLogo.findOne().sort({ order: -1 });
    const nextOrder = order !== undefined ? Number(order) : (maxOrderDoc ? maxOrderDoc.order + 1 : 1);

    const logo = await ClientLogo.create({
      name: name.trim(),
      src: src.trim(),
      order: nextOrder,
      isActive: true
    });

    res.status(201).json(logo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add partner logo', details: err.message });
  }
});

// PUT /api/client-logos/:id (Edit partner logo)
router.put('/:id', async (req, res) => {
  try {
    const { name, src, order, isActive } = req.body;
    const logo = await ClientLogo.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name: name.trim() }),
        ...(src && { src: src.trim() }),
        ...(order !== undefined && { order: Number(order) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) })
      },
      { new: true }
    );

    if (!logo) {
      return res.status(404).json({ error: 'Logo not found' });
    }

    res.json(logo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update partner logo', details: err.message });
  }
});

// DELETE /api/client-logos/:id (Delete partner logo)
router.delete('/:id', async (req, res) => {
  try {
    const logo = await ClientLogo.findByIdAndDelete(req.params.id);
    if (!logo) {
      return res.status(404).json({ error: 'Logo not found' });
    }
    res.json({ success: true, message: 'Partner logo deleted', deletedId: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete partner logo', details: err.message });
  }
});

module.exports = router;
