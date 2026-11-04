const mongoose = require('mongoose');

const ClientLogoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    src: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClientLogo', ClientLogoSchema);
