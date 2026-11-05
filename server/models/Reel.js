const mongoose = require('mongoose');

const ReelSchema = new mongoose.Schema(
  {
    creator: { type: String, default: 'Fathima Shiya Hamza' },
    avatar: { type: String, default: 'FS' },
    title: { type: String, required: true },
    thumb: { type: String, required: true },
    url: { type: String, required: true },
    rotation: { type: String, default: '0deg' },
    marginTop: { type: String, default: '0px' },
    category: { type: String, default: 'Short-Form Reels', trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reel', ReelSchema);
