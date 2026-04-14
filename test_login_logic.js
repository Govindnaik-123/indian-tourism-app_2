const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function testLoginLogic() {
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const userSchema = new mongoose.Schema({
      email: { type: String, lowercase: true },
      password: String
    });
    const User = mongoose.models.User || mongoose.model('User', userSchema);

    const email = 'testfix@gmail.com';
    const password = 'password123';

    console.log(`Testing login for ${email} with password ${password}`);
    
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log('User not found');
      return;
    }

    console.log('User found, comparing passwords...');
    console.log('User password in DB:', user.password);
    
    const isValid = await bcrypt.compare(password, user.password);
    console.log('Is password valid?', isValid);

    if (isValid) {
      console.log('SUCCESS: Logic works');
    } else {
      console.log('FAILURE: Password comparison failed');
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
  }
}

testLoginLogic();
