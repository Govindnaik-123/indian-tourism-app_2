const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://tourism_user:Govind%40123@cluster0.8ctcmrf.mongodb.net/indian-tourism?retryWrites=true&w=majority';
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    
    const db = client.db('indian-tourism');
    const usersCollection = db.collection('users');
    
    const count = await usersCollection.countDocuments();
    console.log(`\nTotal Registered Users: ${count}`);
    
    const users = await usersCollection.find({}, { projection: { email: 1, name: 1, _id: 0 } }).toArray();
    
    console.log('\n--- User Emails ---');
    users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name || 'No Name'} - ${user.email}`);
    });

  } catch (err) {
    console.error('Error fetching users:', err.message);
  } finally {
    await client.close();
  }
}

main();
