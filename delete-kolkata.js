const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://tourism_user:Govind%40123@cluster0.8ctcmrf.mongodb.net/indian-tourism?retryWrites=true&w=majority';
const destinationSchema = new mongoose.Schema({ name: String, slug: String });
const Destination = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

async function run() {
    try {
        await mongoose.connect(MONGODB_URI);
        const res = await Destination.deleteOne({ name: 'Kolkata', slug: { $ne: 'kolkata' } });
        console.log('Deleted legacy Kolkata:', res);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
run();
