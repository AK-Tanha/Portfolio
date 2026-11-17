import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error('MONGO_URI is not defined. Add it to .env or the deployment environment.');
}

// A URI without a database path silently targets "test". Catch that early.
function getDatabaseName() {
  try {
    const path = new URL(MONGODB_URI).pathname.replace(/^\//, '');
    return path || 'test';
  } catch {
    return null;
  }
}

let cached = global.__mongoose;
if (!cached) {
  cached = global.__mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        // Fail fast rather than hanging a request if the cluster is unreachable.
        serverSelectionTimeoutMS: 10000,
        bufferCommands: false,
        // Serverless-friendly: each Vercel function is short-lived, and an
        // unbounded pool would quickly exhaust Atlas' connection limit.
        maxPoolSize: 5,
        minPoolSize: 0,
        maxIdleTimeMS: 30000,
        socketTimeoutMS: 45000,
        retryWrites: true,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export function getConfiguredDatabaseName() {
  return getDatabaseName();
}

export default connectToDatabase;