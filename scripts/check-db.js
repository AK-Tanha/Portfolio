import 'dotenv/config';
import mongoose from 'mongoose';

const RETRIES = Number(process.env.CHECK_RETRIES || 5);
const WAIT_MS = Number(process.env.CHECK_WAIT_MS || 8000);

async function connect() {
  for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
    const started = Date.now();
    try {
      await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 12000 });
      console.log(`  connect     OK (${Date.now() - started}ms, attempt ${attempt})`);
      return true;
    } catch (error) {
      const cause = error.cause?.message || '';
      const reason = /TLS alert|internal error/i.test(`${error.message} ${cause}`)
        ? 'TLS handshake rejected by Atlas (IP access list?)'
        : error.message.split('\n')[0].slice(0, 80);
      console.log(`  attempt ${attempt}   ${reason} (${Date.now() - started}ms)`);
      if (attempt < RETRIES) await new Promise((r) => setTimeout(r, WAIT_MS));
    }
  }
  return false;
}

async function main() {
  const uri = new URL(process.env.MONGO_URI);

  console.log('Connection string');
  console.log(`  host        ${uri.host}`);
  console.log(`  database    ${uri.pathname.slice(1) || '(none -> "test")'}`);
  console.log(`  user        ${decodeURIComponent(uri.username)}`);
  console.log('');

  console.log('Connecting');
  if (!(await connect())) {
    console.log('\nFAILED - cluster unreachable. Check the IP Access List in Atlas.');
    process.exit(1);
  }

  const db = mongoose.connection.db;
  const status = await db.admin().serverStatus();

  console.log('');
  console.log('Server');
  console.log(`  version     ${status.version}`);
  console.log(`  uptime      ${Math.round(status.uptime / 60)} min`);
  console.log(`  active db   ${db.databaseName}`);

  const dbs = await db.admin().listDatabases();
  console.log('');
  console.log('Databases visible to this user');
  dbs.databases.forEach((d) => console.log(`  ${d.name.padEnd(14)} ${d.sizeOnDisk} bytes`));

  const collections = await db.listCollections().toArray();
  console.log('');
  console.log(`Collections in "${db.databaseName}"`);
  if (collections.length === 0) console.log('  (none)');
  collections.forEach((c) => console.log(`  ${c.name}`));

  if (collections.some((c) => c.name === 'works')) {
    const works = db.collection('works');
    const total = await works.countDocuments();
    const withBlobs = await works.countDocuments({ blobUrl: { $ne: null } });
    console.log('');
    console.log('works collection');
    console.log(`  documents   ${total}`);
    console.log(`  w/ blob img ${withBlobs}`);
    console.log('  indexes');
    const indexes = await works.indexes();
    indexes.forEach((i) =>
      console.log(`    ${i.name.padEnd(14)} ${JSON.stringify(i.key)}${i.unique ? ' UNIQUE' : ''}`)
    );
  }

  await mongoose.disconnect();
  console.log('');
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});