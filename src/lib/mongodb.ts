import mongoose from 'mongoose';
import { setDefaultResultOrder } from 'dns';

// Force DNS to prefer IPv4 (fixes many Atlas connection issues on Node 18+)
try {
  setDefaultResultOrder('ipv4first');
} catch (e) {
  // Ignore if not supported
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('CRITICAL ERROR: MONGODB_URI is NOT defined in the environment.');
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Singleton pattern for Mongoose connection in Next.js
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // If we have a connection and it is actually open (readyState 1), return it
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If we don't have a promise, or the existing promise failed/disconnected, start over
  if (!cached.promise || mongoose.connection.readyState === 0) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    };

    console.log('Initiating fresh MongoDB Atlas connection...');
    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongooseInstance) => {
      console.log('MongoDB connected successfully');
      return mongooseInstance;
    }).catch((err) => {
      console.error('MongoDB connection failed:', err.message);
      cached.promise = null; // Clear failing promise to allow retry
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    
    // Final safety check: if for some reason we are still not connected, throw
    if (mongoose.connection.readyState !== 1) {
      console.error('Mongoose connection promise resolved but readyState is not 1');
      cached.promise = null;
      throw new Error('Database connection failed to open');
    }
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export { connectDB };
