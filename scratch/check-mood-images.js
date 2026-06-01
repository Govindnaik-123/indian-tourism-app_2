const { MOODS } = require('../src/data/destinations.ts');

// Since destinations.ts is in TypeScript, let's just copy the URLs to check them easily in JS
const urls = [
  { name: 'Happy', url: 'https://www.koimoi.com/wp-content/new-galleries/2024/08/did-you-know-that-rashmika-mandanna-broke-into-tears-while-shooting-for-geetha-govindam-opposite-rumoured-boyfriend-vijay-deverakonda-001.jpg' },
  { name: 'Sad', url: 'https://media.istockphoto.com/id/491841296/photo/relaxing-view.jpg?s=612x612&w=0&k=20&c=BF3qjutD9yQDhHcNy8fNDD4Jr79-SCR3-fITyA9rzL0=' },
  { name: 'Lonely', url: 'https://imgcdn.stablediffusionweb.com/2024/9/10/e2bc53bd-55f7-4e2a-aa31-625e6cae13f9.jpg' },
  { name: 'Romantic', url: 'https://tracktollywood.com/wp-content/uploads/2022/07/antenetflix.webp' },
  { name: 'Adventurous', url: 'https://images3.alphacoders.com/969/969585.jpg' },
  { name: 'Stressed', url: 'https://staticdelivery.nexusmods.com/mods/6082/images/thumbnails/79/79-1738430461-1938135481.png' },
  { name: 'Calm', url: 'https://images.pexels.com/photos/1181571/pexels-photo-1181571.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
  { name: 'Excited', url: 'https://2.bp.blogspot.com/-aXnET9inT_0/UnTJ6dVaBVI/AAAAAAADpjo/gldA55HQDhA/s1600/Uyyala-Jampala-Heroine-Anandi-Avika-Gor-Stills+%25285%2529.jpg' },
  { name: 'Spiritual', url: 'https://www.travelescape.in/wp-content/uploads/2021/07/Rishikesh-aarti.jpg' }
];

async function checkUrl(item) {
  try {
    const res = await fetch(item.url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    console.log(`${item.name}: Status ${res.status}`);
  } catch (err) {
    console.log(`${item.name}: Error ${err.message}`);
  }
}

(async () => {
  for (const item of urls) {
    await checkUrl(item);
  }
})();
