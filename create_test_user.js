const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function createKnownUser() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not found');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true, lowercase: true },
      password: { type: String, required: true }
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    const email = 'testfix@gmail.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await User.findOne({ email });
    if (existing) {
      existing.password = hashedPassword;
      await existing.save();
      console.log('User password updated');
    } else {
      const user = new User({
        name: 'Test Fix',
        email,
        password: hashedPassword
      });
      await user.save();
      console.log('User created');
    }

    console.log('Email: testfix@gmail.com');
    console.log('Password: password123');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
  }
}

createKnownUser();
