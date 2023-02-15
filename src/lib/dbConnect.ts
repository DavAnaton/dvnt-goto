// /lib/dbConnect.js
import mongoose from 'mongoose'

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/


const {
  DB_HOST,
  DB_PASS,
  DB_USER,
} = process.env;

const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the required variables in .env.local'
  )
}

type MongooseConnection = typeof mongoose;
declare global {
  var mongoose: {conn: MongooseConnection|null, promise: Promise<MongooseConnection>|null}; // This must be a `var` and not a `let / const`
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect () {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: true,
      useCreateIndex: true
    };

    cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => {
      return mongoose;
    })
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
