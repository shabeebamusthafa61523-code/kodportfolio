const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['video', 'brand', 'social', 'web'],
      index: true 
    },
    filterTag: { type: String, default: 'general' },
    client: { type: String, default: 'Undisclosed Client' },
    year: { type: String, default: '2026' },
    role: { type: String, default: 'Creative & Execution' },
    image: { type: String, required: true },
    overview: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    deliverables: [{ type: String }],
    tools: [{ type: String }],
    metrics: { type: String, default: '' },
    isFeatured: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
