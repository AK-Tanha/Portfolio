import 'server-only';
import { connectToDatabase } from './mongodb';
import Work, { slugify } from './models/Work';
import { seedWorks } from './seed-works';

export const serializeWork = (doc) =>
  doc && {
    id: doc.id,
    title: doc.title,
    category: doc.category || 'Other',
    description: doc.description || '',
    overview: doc.overview || '',
    features: Array.isArray(doc.features) ? doc.features : [],
    live_link: doc.live_link || '',
    bgImage: doc.bgImage || '',
    // `order` must survive serialization or `sortWorks` below compares
    // `undefined ?? 0` for every item and quietly becomes a no-op.
    order: doc.order ?? 0,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };

const sortWorks = (list) =>
  [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export async function getAllWorks() {
  try {
    await connectToDatabase();
    const docs = await Work.find({}).sort({ order: 1, createdAt: -1 }).lean();
    if (docs.length === 0) return seedWorks;
    return sortWorks(docs.map(serializeWork));
  } catch (error) {
    console.error('[works] falling back to static data:', error.message);
    return seedWorks;
  }
}

/**
 * DB-backed works with NO seed fallback — returns `[]` when the collection is
 * empty or the cluster is unreachable. The dashboard must use this rather than
 * `getAllWorks()`: seed entries aren't persisted, so offering Edit/Delete for
 * them would always 404. The public site keeps the seed fallback.
 */
export async function getStoredWorks() {
  try {
    await connectToDatabase();
    const docs = await Work.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return sortWorks(docs.map(serializeWork));
  } catch (error) {
    console.error('[works] stored works unavailable:', error.message);
    return [];
  }
}

export async function getWorkBySlug(slug) {
  const fallback = seedWorks.find((item) => item.id === slug) || null;
  try {
    await connectToDatabase();
    const doc = await Work.findOne({ id: slug }).lean();
    if (!doc) return fallback;
    return serializeWork(doc);
  } catch (error) {
    console.error('[works] falling back to static data:', error.message);
    return fallback;
  }
}

export async function getWorksSlugs() {
  try {
    await connectToDatabase();
    const docs = await Work.find({}).select('id').sort({ order: 1 }).lean();
    if (docs.length === 0) return seedWorks.map((item) => item.id);
    return docs.map((doc) => doc.id);
  } catch (error) {
    console.error('[works] falling back to static data:', error.message);
    return seedWorks.map((item) => item.id);
  }
}

export async function getWorksCount() {
  try {
    await connectToDatabase();
    return await Work.countDocuments();
  } catch {
    return seedWorks.length;
  }
}

export async function getCategorySummary() {
  const works = await getStoredWorks();
  return works.reduce((acc, item) => {
    const key = item.category || 'Other';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

export async function createWork(payload) {
  await connectToDatabase();
  const base = slugify(payload.id || payload.title);
  let slug = base;
  let suffix = 2;
  while (await Work.exists({ id: slug })) {
    slug = `${base}-${suffix++}`;
  }
  const count = await Work.countDocuments();
  return serializeWork(await Work.create({ ...payload, id: slug, order: count }));
}

export async function updateWork(slug, payload) {
  await connectToDatabase();
  const doc = await Work.findOneAndUpdate({ id: slug }, { $set: payload }, { new: true });
  return doc ? serializeWork(doc) : null;
}

export async function deleteWork(slug) {
  await connectToDatabase();
  const doc = await Work.findOneAndDelete({ id: slug });
  return doc ? serializeWork(doc) : null;
}

export async function findWorkById(slug) {
  await connectToDatabase();
  const doc = await Work.findOne({ id: slug }).lean();
  return doc ? { ...serializeWork(doc), blobUrl: doc.blobUrl ?? null } : null;
}