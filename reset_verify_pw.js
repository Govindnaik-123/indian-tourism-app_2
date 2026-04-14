const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function resetUserPassword() {
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URI);
    const userSchema = new mongoose.Schema({
      email: { type: String, lowercase: true },
      password: String
    });
    const User = mongoose.models.User || mongoose.model('User', userSchema);

    const email = 'govindnaik123@gmail.com';
    const newPassword = 'password123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await User.updateOne({ email }, { $set: { password: hashedPassword } });
    if (result.matchedCount > 0) {
      console.log(`Password reset successfully for ${email}`);
    } else {
      console.log(`User ${email} not found`);
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
  }
}

resetUserPassword();
