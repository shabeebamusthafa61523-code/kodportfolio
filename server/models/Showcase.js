const mongoose = require('mongoose');

const ShowcaseImageSchema = new mongoose.Schema({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  label: { type: String, default: '' }
});

const ShowcaseSchema = new mongoose.Schema(
  {
    showcaseId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    sector: { type: String, default: '' },
    desc: { type: String, default: '' },
    images: [ShowcaseImageSchema],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Showcase', ShowcaseSchema);
