import mongoose from 'mongoose';

export const slugify = (value) =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const WorkSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, default: 'Other', index: true },
    description: { type: String, trim: true, default: '' },
    overview: { type: String, trim: true, default: '' },
    features: { type: [String], default: [] },
    live_link: { type: String, trim: true, default: '' },
    bgImage: { type: String, trim: true, default: '' },
    blobUrl: { type: String, default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Work = mongoose.models.Work || mongoose.model('Work', WorkSchema);

export default Work;