const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function listAllUsers() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    
    // The database name is usually at the end of the MONGODB_URI
    const db = client.db();
    const usersCollection = db.collection('users');
    
    // Fetch all users, excluding the password field
    const users = await usersCollection.find({}, { projection: { password: 0 } }).toArray();

    if (users.length === 0) {
      console.log('No users found in the database.');
    } else {
      console.log(`\n--- Found ${users.length} Total Users ---\n`);
      users.forEach((user, index) => {
        console.log(`[${index + 1}] User Details:`);
        console.log(`    Name:  ${user.name}`);
        console.log(`    Email: ${user.email}`);
        console.log(`    ID:    ${user._id}`);
        console.log(`    Created At: ${user.createdAt || 'N/A'}`);
        console.log('    ---------------------------');
      });
    }
  } catch (err) {
    console.error('Error connecting to database:', err.message);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed.');
  }
}

listAllUsers();
