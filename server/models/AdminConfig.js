const mongoose = require('mongoose');

const AdminConfigSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'admin_config', unique: true },
    pin: { type: String, default: '12345' },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminConfig', AdminConfigSchema);
