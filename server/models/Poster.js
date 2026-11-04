const mongoose = require('mongoose');

const PosterSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    alt: { type: String, default: '' },
    src: { type: String, required: true },
    campaignTag: { type: String, default: 'Visual Campaign' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Poster', PosterSchema);
