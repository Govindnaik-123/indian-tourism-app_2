const mongoose = require('mongoose');
const { setDefaultResultOrder } = require('dns');

try {
  setDefaultResultOrder('ipv4first');
} catch (e) {}
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

async function testMongooseConnect() {
  console.log('Testing Mongoose connection with URI:', MONGODB_URI);
  try {
    const opts = {
      serverSelectionTimeoutMS: 5000,
    };
    await mongoose.connect(MONGODB_URI, opts);
    console.log('Mongoose connected successfully!');
    
    // Check if we can access the User model
    const userSchema = new mongoose.Schema({
      email: String,
      password: { type: String, select: false } // Mimic some schema complexity
    });
    
    // We use a different name to avoid model overwrite errors in this script
    const TestUser = mongoose.models.TestUser_Debug || mongoose.model('TestUser_Debug', userSchema, 'users');
    
    const user = await TestUser.findOne({ email: 'govindnaik123@gmail.com' });
    console.log('Query result:', user ? 'User found' : 'User not found');
    
  } catch (err) {
    console.error('Mongoose connection or query failed:');
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

testMongooseConnect();
