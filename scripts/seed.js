import 'dotenv/config';
import mongoose from 'mongoose';
import { seedWorks } from '../lib/seed-works.js';

const WorkSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true, default: 'Other' },
    description: { type: String, default: '' },
    overview: { type: String, default: '' },
    features: { type: [String], default: [] },
    live_link: { type: String, default: '' },
    bgImage: { type: String, default: '' },
    blobUrl: { type: String, default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Work = mongoose.models.Work || mongoose.model('Work', WorkSchema);

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is not set.');

  await mongoose.connect(uri);
  console.log('Connected to MongoDB.');

  const existing = await Work.countDocuments();
  if (existing > 0) {
    console.log(`Collection already has ${existing} document(s) — skipping seed.`);
    await mongoose.disconnect();
    return;
  }

  const docs = seedWorks.map((item, index) => ({
    // Preserve the original id verbatim so existing /works/<id> links keep working.
    id: item.id,
    title: item.title,
    category: item.category || 'Other',
    description: item.description || '',
    overview: item.overview || '',
    features: item.features || [],
    live_link: item.live_link || '',
    bgImage: item.bgImage || '',
    blobUrl: null,
    order: index,
  }));

  await Work.insertMany(docs);
  console.log(`Seeded ${docs.length} works:`);
  docs.forEach((doc) => console.log(`  - ${doc.id}`));

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});