const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://tourism_user:Govind%40123@cluster0.8ctcmrf.mongodb.net/indian-tourism?retryWrites=true&w=majority';

const destinationSchema = new mongoose.Schema({
  name: String,
  state: String,
  heroImage: String,
});

const Destination = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

async function updateStateImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const updates = [
      {
        state: 'Andaman & Nicobar Islands',
        image: '/images/andaman.jpg'
      },
      {
        state: 'Andhra Pradesh',
        image: '/images/andhra-pradesh.png'
      },
      {
        state: 'Assam',
        image: '/images/assam.jpg'
      },
      {
        state: 'Madhya Pradesh',
        image: '/images/madhya-pradesh.jpg'
      },
      {
        state: 'Karnataka',
        image: '/images/karnataka.jpg'
      },
      {
        state: 'Meghalaya',
        image: 'https://www.oddessemania.in/wp-content/uploads/2023/09/krang-suri-falls-1024x678.jpg'
      },
      {
        state: 'Mizoram',
        image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/12/07113458/Aizawl.jpg'
      },
      {
        state: 'Nagaland',
        image: 'https://static.tripzilla.in/media/54514/conversions/2cb34c6c-4002-44af-a4fd-f7f948e58237-w768.webp'
      },
      {
        state: 'Odisha',
        image: 'https://www.swantour.com/blogs/wp-content/uploads/2018/03/Bhubaneswar-odisha.jpg'
      },
      {
        state: 'Sikkim',
        image: 'https://pci.gov.in/media/original_images/Sikkim.jpg'
      },
      {
        state: 'Punjab',
        image: 'https://png.pngtree.com/thumb_back/fh260/background/20230308/pngtree-golden-temple--harmandir-sahib--in-amritsar-photo-image_1860603.jpg'
      },
      {
        state: 'Telangana',
        image: 'https://img.freepik.com/premium-photo/firefly-air-flying-chicken-biryani-spicy-indian-hyderabadi-biryani-isolated-background_463801-1963.jpg?w=900'
      },
      {
        state: 'Tripura',
        image: 'https://www.indiatravel.app/wp-content/uploads/2024/03/Neermahal-Palace-1024x585.jpg'
      },
      {
        state: 'Uttarakhand',
        image: 'https://t3.ftcdn.net/jpg/08/41/49/72/360_F_841497224_Rt7XyrNl6o5o6J7wcA1W4yR5kmKPRm9I.jpg'
      },
      {
        state: 'Maharashtra',
        image: 'https://media.istockphoto.com/photos/vada-pav-or-vada-pav-picture-id538172420?k=6&m=538172420&s=612x612&w=0&h=7koumGadG8WCLsa8XefUK6oFWAgxfZ-PYew_5MhGPJ8='
      }
    ];

    for (const update of updates) {
      const result = await Destination.updateMany(
        { state: update.state },
        { $set: { heroImage: update.image } }
      );
      console.log(`Updated ${update.state}: ${result.modifiedCount} documents modified`);
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error updating state images:', error);
  }
}

updateStateImages();
