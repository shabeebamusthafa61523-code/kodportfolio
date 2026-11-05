const express = require('express');
const router = express.Router();
const ReelCategory = require('../models/ReelCategory');
const Reel = require('../models/Reel');

const defaultCategories = [
  'Commercial Ads',
  'Short-Form Reels',
  'Product Showcase',
  'Brand Story',
  'Behind The Scenes'
];

// Seed helper if collection is empty
async function ensureSeedCategories() {
  try {
    const count = await ReelCategory.countDocuments();
    if (count === 0) {
      const docs = defaultCategories.map((name, idx) => ({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        order: idx + 1
      }));
      await ReelCategory.insertMany(docs);
      console.log('⚡ Seeded default Reel Categories');
    }
  } catch (err) {
    console.warn('ReelCategory seed check error:', err.message);
  }
}

// GET /api/reel-categories
router.get('/', async (req, res) => {
  try {
    await ensureSeedCategories();

    // Auto-sync: ensure any category currently assigned to an existing reel is registered and manageable
    const distinctOnReels = await Reel.distinct('category');
    const existingCats = await ReelCategory.find();
    const existingNames = new Set(existingCats.map((c) => c.name.toLowerCase()));

    for (const catName of distinctOnReels) {
      if (catName && !existingNames.has(catName.trim().toLowerCase())) {
        await ReelCategory.create({
          name: catName.trim(),
          slug: catName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          order: existingCats.length + 1
        });
        existingNames.add(catName.trim().toLowerCase());
      }
    }

    const categories = await ReelCategory.find().sort({ order: 1, createdAt: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reel categories', details: err.message });
  }
});

// POST /api/reel-categories
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const trimmed = name.trim();
    const existing = await ReelCategory.findOne({ name: { $regex: new RegExp(`^${trimmed}$`, 'i') } });
    if (existing) {
      return res.status(400).json({ error: `Category "${trimmed}" already exists` });
    }

    const count = await ReelCategory.countDocuments();
    const newCategory = await ReelCategory.create({
      name: trimmed,
      slug: trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      order: count + 1
    });

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create reel category', details: err.message });
  }
});

// PUT /api/reel-categories/:id
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'New category name is required' });
    }

    const trimmed = name.trim();
    const oldCat = await ReelCategory.findById(req.params.id);
    if (!oldCat) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const oldName = oldCat.name;
    oldCat.name = trimmed;
    oldCat.slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await oldCat.save();

    // Cascade update: update any reels that used the old category name
    if (oldName !== trimmed) {
      await Reel.updateMany({ category: oldName }, { $set: { category: trimmed } });
    }

    res.json(oldCat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update category', details: err.message });
  }
});

// DELETE /api/reel-categories/:id
router.delete('/:id', async (req, res) => {
  try {
    const cat = await ReelCategory.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const catName = cat.name;
    await ReelCategory.findByIdAndDelete(req.params.id);

    // Fallback any reels using this deleted category to a remaining category or 'General'
    const fallback = await ReelCategory.findOne().sort({ order: 1 });
    const fallbackName = fallback ? fallback.name : 'General';
    await Reel.updateMany({ category: catName }, { $set: { category: fallbackName } });

    res.json({
      success: true,
      message: `Deleted category "${catName}"`,
      deletedId: req.params.id,
      reassignedTo: fallbackName
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category', details: err.message });
  }
});

module.exports = router;
