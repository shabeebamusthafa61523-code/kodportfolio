const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// POST new lead / inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, services, scopeTag, message } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required fields.' });
    }

    const lead = new Lead({
      name,
      email,
      phone,
      services: services || [],
      scopeTag: scopeTag || 'Custom Scope',
      message: message || ''
    });

    await lead.save();
    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully. Our creative team will reach out promptly.',
      leadId: lead._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all leads (ordered by latest)
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH lead status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
