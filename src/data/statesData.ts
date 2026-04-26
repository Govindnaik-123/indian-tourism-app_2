export interface StateInfo {
  name: string;
  slug: string;
  image: string;
  description: string;
  highlights: string[];
  emoji: string;
  bestTime: string;
  itinerary: {
    day1: string;
    day2: string;
    day3: string;
  };
  culture: string;
  culturalImages: { url: string; name: string }[];
  moods?: string[];
  packageAmount: string;
}

export const STATES: StateInfo[] = [
  {
    name: "Andaman & Nicobar Islands",
    slug: "andaman",
    image: "/images/andaman.jpg",
    description: "Tropical paradise with turquoise waters and pristine coral reefs.",
    highlights: ["Havelock Island", "Radhanagar Beach", "Cellular Jail"],
    emoji: "🏝️",
    bestTime: "October to May",
    itinerary: {
      day1: "Arrive at Port Blair, visit the historic Cellular Jail and watch the evening Light and Sound show.",
      day2: "Take a ferry to Havelock Island and spend the afternoon at the world-famous Radhanagar Beach.",
      day3: "Explore Elephant Beach for water sports like snorkeling and sea walk before returning to Port Blair."
    },
    culture: `Life in the Andaman & Nicobar Islands is peaceful and deeply connected to nature, with people living a slow, relaxed lifestyle surrounded by turquoise waters and lush greenery. The culture is influenced by indigenous tribes and coastal traditions, creating a unique blend of simplicity and natural harmony.Festivals are modest yet vibrant, often centered around local traditions and community gatherings. The food mainly includes fresh seafood, coconut-based dishes, and tropical fruits. It’s a perfect destination for travelers seeking calmness, adventure, and a close connection to nature.`,
    culturalImages: [
      { url: "https://www.felixferiatravel.com/images/1751524271blog_image__%282%29.jpg", name: "Cellular Jail" },
      { url: "https://www.andamanisland.in/storage/blogs/61c972aca2dd9174_g.jpg", name: "Havelock Island" },
      { url: "https://cdn.prod.website-files.com/5b56319971ac8c7475a9d877/5ee481817da4561eb9621b3e_Radhanagar-.JPG", name: "Radhanagar Beach" },
      { url: "https://www.andamanisland.in/assets/site1/theme3/images/overview-of-andaman-islands/Neil-Island-3.png", name: "Neil Island" }
    ],
    moods: ["Lonely"],
    packageAmount: "₹35,000 - ₹55,000"
  },
  {
    name: "Andhra Pradesh",
    slug: "andhra-pradesh",
    image: "/images/andhra-pradesh.png",
    description: "Land of temples, beaches, and the famous Tirupati shrine.",
    highlights: ["Tirupati", "Araku Valley", "Vizag Beach"],
    emoji: "🏛️",
    bestTime: "October to March",
    itinerary: {
      day1: "Visit the sacred Tirumala Venkateswara Temple and explore the surrounding spiritual hills.",
      day2: "Take the scenic train journey to Araku Valley, visiting the Borra Caves and coffee plantations.",
      day3: "Relax at Visakhapatnam's RK Beach and visit the INS Kursura Submarine Museum."
    },
    culture: `Andhra Pradesh offers a lifestyle that blends deep spirituality with modern living. Daily life revolves around temples, traditions, and agriculture, while cities are rapidly growing with urban culture. People here value family, rituals, and cultural heritage.

Festivals like Ugadi and Sankranti are celebrated with great enthusiasm. The cuisine is bold and spicy, featuring dishes like Andhra meals, Gongura, and biryani. Visitors can experience a strong cultural identity filled with devotion and flavor.`,
    culturalImages: [
      { url: "https://static.toiimg.com/thumb/msid-107275633%2Cwidth-1280%2Cheight-720%2Cimgsize-232878%2Cresizemode-72%2Coverlay-toi_sw%2Cpt-32%2Cy_pad-40/photo.jpg", name: "Tirupati Balaji" },
      { url: "https://blog.redbus.in/wp-content/uploads/2021/11/shutterstock_1559121689.jpg", name: "Araku Valley" },
      { url: "https://rest.techbehemoths.com/storage/images/countries/india/visakhapatnam/603f779e133af.jpg", name: "Vizag Port" },
      { url: "https://www.iasgyan.in/ig-uploads/images/MAKAR_SAKRANTI,_LOHRI,_BIHU_AND_PONGAL.jpg", name: "Sankranti Festival" }
    ],
    moods: ["Excited"],
    packageAmount: "₹15,000 - ₹25,000"
  },
  {
    name: "Arunachal Pradesh",
    slug: "arunachal-pradesh",
    image: "https://gumlet.assettype.com/newslaundry/2022-05/74179e10-1269-4b6f-9201-21f506b9151a/AI___Arunachal_Pradesh_Ad.jpg?auto=format%2Ccompress&fit=max",
    description: "The land of the rising sun — breathtaking hills and Buddhist monasteries.",
    highlights: ["Tawang", "Ziro Valley", "Namdapha"],
    emoji: "🌄",
    bestTime: "October to April",
    itinerary: {
      day1: "Explore the majestic Tawang Monastery, the second largest in the world, and the War Memorial.",
      day2: "Drive through the snow-capped Sela Pass and visit the serene Madhuri Lake.",
      day3: "Experience the unique culture of the Apatani tribe in the beautiful Ziro Valley."
    },
    culture: `Arunachal Pradesh is known for its peaceful tribal lifestyle where people live in harmony with nature and mountains. The influence of Buddhism and indigenous traditions shapes daily life, creating a calm and spiritual environment.

Festivals like Losar and tribal celebrations bring color and unity. The food is simple, often including rice, meat, and bamboo shoot dishes. It’s an ideal place for travelers seeking serenity and cultural authenticity.`,
    culturalImages: [
      { url: "https://static.toiimg.com/photo/112410346.cms", name: "Tawang Monastery" },
      { url: "https://media.assettype.com/outlooktraveller/2025-02-15/xdcjayae/shutterstock1849504990_1.jpg?auto=format%2Ccompress&enlarge=true&fit=max&h=675&w=1200", name: "Sela Pass" },
      { url: "https://img.veenaworld.com/wp-content/uploads/2021/05/Famous-Festivals-of-Arunachal-Pradesh-Culture-Tradition-Arts.jpg", name: "Ziro Valley Festival" },
      { url: "https://tripoventure.com/wp-content/uploads/2021/06/xv92369ajqb0jt4dmcpwye1b17bt_1539063182_taktsang.jpg", name: "Taktsang Monastery" }
    ],
    moods: ["Calm"],
    packageAmount: "₹25,000 - ₹45,000"
  },
  {
    name: "Assam",
    slug: "assam",
    image: "/images/assam.jpg",
    description: "Home to Kaziranga, one-horned rhinos and the mighty Brahmaputra.",
    highlights: ["Kaziranga", "Majuli", "Kamakhya Temple"],
    emoji: "🦏",
    bestTime: "November to April",
    itinerary: {
      day1: "Early morning jeep safari in Kaziranga National Park to spot the Great Indian One-Horned Rhino.",
      day2: "Take a ferry to Majuli, the world's largest river island, and explore the Neo-Vaishnavite Satras.",
      day3: "Visit the powerful Kamakhya Temple in Guwahati and enjoy a sunset cruise on the Brahmaputra."
    },
    culture: `Assam’s lifestyle is closely tied to its rivers and tea gardens, offering a peaceful yet vibrant way of life. People are deeply connected to nature and traditions, especially in rural areas.

Bihu is the most important festival, celebrated with dance and music. Assamese cuisine includes rice-based dishes, fish, and unique flavors. The state offers a refreshing blend of culture, greenery, and simplicity.`,
    culturalImages: [
      { url: "https://media.savetherhino.org/prod/uploads/2018/05/GuestBlogGreaterOneHornedRhinoJessicaFrei.jpg", name: "One-Horned Rhino" },
      { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80", name: "Brahmaputra River" },
      { url: "https://files.prokerala.com/news/photos/imgs/1200/a-woman-performs-bihu-dance-ahead-of-the-rongali-527309.jpg", name: "Bihu Dance" },
      { url: "https://img.freepik.com/premium-photo/tea-plantations-are-must-see-first-time_1130573-45753.jpg", name: "Assam Tea Gardens" }
    ],
    moods: ["Calm"],
    packageAmount: "₹18,000 - ₹30,000"
  },
  {
    name: "Bihar",
    slug: "bihar",
    image: "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/bodh-gaya.jpg",
    description: "Ancient cradle of Buddhism and the Mauryan Empire.",
    highlights: ["Bodh Gaya", "Nalanda", "Rajgir"],
    emoji: "🕉️",
    bestTime: "October to March",
    itinerary: {
      day1: "Visit the Mahabodhi Temple complex in Bodh Gaya, where Lord Buddha attained enlightenment.",
      day2: "Explore the ruins of the ancient Nalanda University, a global center for learning in antiquity.",
      day3: "Ride the ropeway at Rajgir to the Vishwa Shanti Stupa and visit the ancient Bimbisara Jail."
    },
    culture: `Bihar has a deeply spiritual and historical lifestyle rooted in ancient traditions. It is a center of Buddhist heritage and learning, where culture revolves around religion and history.

Festivals like Chhath Puja are celebrated with immense devotion. The food is simple and earthy, with dishes like Litti Chokha. Bihar offers a meaningful cultural experience connected to India’s roots.`,
    culturalImages: [
      { url: "https://chalbanjare.com/crmnew/img_master/package/TheGreatBuddhaStatue_17715663580.webp", name: "Great Buddha Statue" },
      { url: "https://i.pinimg.com/originals/c6/bf/3a/c6bf3a7a4344c7c95f136b002cc2c20e.jpg", name: "Nalanda Ruins" },
      { url: "https://stylesatlife.com/wp-content/uploads/2018/02/Mahabodhi-Temple-in-Bodh-Gaya.jpg", name: "Mahabodhi Temple" },
      { url: "https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/patna/buddha_smriti_park/buddha-samiti-park.jpg/jcr:content/renditions/cq5dam.web.480.480.jpeg", name: "Buddha Smriti Park" }
    ],
    moods: ["Sad"],
    packageAmount: "₹12,000 - ₹20,000"
  },
  {
    name: "Chhattisgarh",
    slug: "chhattisgarh",
    image: "https://chhattisgarhtourism.co.in/photo_gallery/tirathgarh_waterfall/01.jpg",
    description: "The rice bowl of India with dense forests and tribal culture.",
    highlights: ["Chitrakote Falls", "Bastar", "Bhoramdeo"],
    emoji: "🌿",
    bestTime: "October to March",
    itinerary: {
      day1: "Witness the magnificent Chitrakote Falls, known as the 'Niagara of India', near Jagdalpur.",
      day2: "Explore the tribal heartland of Bastar and learn about the unique traditional Bell Metal craft.",
      day3: "Visit the exquisitely carved Bhoramdeo Temple, often called the 'Khajuraho of Chhattisgarh'."
    },
    culture: `Chhattisgarh reflects a tribal lifestyle where people live close to forests and nature. Traditional practices and community living play a major role in daily life.

Festivals like Bastar Dussehra showcase rich tribal culture. The food includes local grains and forest produce. It’s a destination for exploring raw and authentic traditions.`,
    culturalImages: [
      { url: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/11/05163955/Chitrakote-Waterfalls.jpg", name: "Chitrakote Falls" },
      { url: "https://assets-news.housing.com/news/wp-content/uploads/2022/08/03162226/chhattisgarh-tourist-places-FEATURE-compressed-686x400.jpg", name: "Bastar Tribal Art" },
      { url: "https://i.pinimg.com/736x/8e/b5/af/8eb5af5a6906555184bb4ffb941ce01f.jpg", name: "Bhoramdeo Temple" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bastar_Dusshera_Unexplored_Bastar.jpg/1280px-Bastar_Dusshera_Unexplored_Bastar.jpg", name: "Bastar Dussehra" }
    ],
    moods: ["Sad"],
    packageAmount: "₹15,000 - ₹25,000"
  },
  {
    name: "Delhi",
    slug: "delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&h=500&q=80",
    description: "The heart of India — a blend of ancient history and modern energy.",
    highlights: ["Qutub Minar", "Red Fort", "India Gate"],
    emoji: "🏛️",
    bestTime: "October to March",
    itinerary: {
      day1: "Tour Old Delhi: Red Fort, Jama Masjid, and a rickshaw ride through the narrow lanes of Chandni Chowk.",
      day2: "Visit South Delhi's UNESCO sites: Qutub Minar, Humayun's Tomb, and the serene Lotus Temple.",
      day3: "Pay respects at India Gate, drive past Rashtrapati Bhavan, and shop at the vibrant Connaught Place."
    },
    culture: `Delhi offers a fast-paced urban lifestyle combined with deep historical roots. It is a melting pot of cultures, where modern life meets centuries-old monuments.

Festivals from all religions are celebrated grandly. The food scene is diverse, from street food like chaat to Mughlai cuisine. Delhi is vibrant, busy, and culturally rich.`,
    culturalImages: [
      { url: "https://cdn.britannica.com/20/189820-050-D650A54D/Red-Fort-Old-Delhi-India.jpg", name: "Red Fort" },
      { url: "https://i.pinimg.com/736x/1f/b4/10/1fb41076b41960c1a89017dcca96d55d.jpg", name: "Qutub Minar" },
      { url: "https://i.pinimg.com/originals/15/b1/1a/15b11aef5488925439d17f0c23e1d1a5.jpg", name: "India Gate" },
      { url: "https://incredibleasia.org/wp-content/uploads/2024/01/Lotus-Tmple-Photo.jpg", name: "Lotus Temple" }
    ],
    moods: ["Excited"],
    packageAmount: "₹10,000 - ₹20,000"
  },
  {
    name: "Goa",
    slug: "goa",
    image: "https://www.thegoavilla.com/static/pub/image/CID_0538_540e2897a539b33077f2dad6a65623de.jpg",
    description: "India's premier beach destination with Portuguese heritage.",
    highlights: ["Baga Beach", "Old Goa", "Dudhsagar Falls"],
    emoji: "🏖️",
    bestTime: "February to May",
    itinerary: {
      day1: "Unwind at North Goa's popular beaches—Baga, Calangute, and Anjuna—and visit Chapora Fort.",
      day2: "Discover 'Rome of the East' in Old Goa (Basilica of Bom Jesus) and the colorful Fontainhas quarter.",
      day3: "Embark on an adventurous trip to the spectacular Dudhsagar Waterfalls and a spice plantation."
    },
    culture: `Goa’s lifestyle is relaxed and centered around beaches, music, and social life. The Portuguese influence adds a unique charm to its culture.

Festivals like Carnival and Christmas are celebrated with energy. Seafood and local drinks dominate the cuisine. Goa is perfect for fun, relaxation, and coastal vibes.`,
    culturalImages: [
      { url: "https://travel.4kerala.in/wp-content/uploads/2024/02/Puris-Golden-Beach-Set-For-A-Glimmering-Makeover.jpeg", name: "Candolim Beach" },
      { url: "https://wallpapers.com/images/hd/goa-beach-pictures-bhq7l82yir5f5mvt.jpg", name: "Coastal View" },
      { url: "https://tse1.mm.bing.net/th/id/OIP.fZ0bJcZA1aWproQRCSCjsQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3", name: "Old Goa Church" },
      { url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/bc/b1/3a/15-candolim-8-largejpg.jpg", name: "Goa Scenic Beach" }
    ],
    moods: ["Happy","Romantic"],
    packageAmount: "₹25,000 - ₹45,000"
  },
  {
    name: "Gujarat",
    slug: "gujarat",
    image: "https://files.prokerala.com/news/photos/imgs/1024/traditional-attire-garba-folk-dance-1645453.jpg",
    description: "Birthplace of Gandhi and home to the Great Rann of Kutch.",
    highlights: ["Rann of Kutch", "Gir Forest", "Dwarka"],
    emoji: "🦁",
    bestTime: "November to February",
    itinerary: {
      day1: "Experience the ethereal White Desert of the Great Rann of Kutch and its vibrant 'Rann Utsav'.",
      day2: "Go on a safari in Gir National Park, the last home of the majestic Asiatic Lions.",
      day3: "Visit the holy Dwarkadhish Temple and explore the coastal charm of Somnath."
    },
    culture: `Gujarat’s lifestyle is vibrant and business-oriented, with strong cultural traditions. People are known for their entrepreneurial spirit and festive enthusiasm.

Navratri is celebrated with Garba dance across the state. The food is mostly vegetarian, featuring dishes like Dhokla and Thepla. Gujarat is colorful, energetic, and culturally rich.`,
    culturalImages: [
      { url: "https://cdn.shopify.com/s/files/1/0597/5592/1540/files/Navratri_festive_1024x1024.jpg?v=1757930115", name: "Garba Dance" },
      { url: "https://puretravel.com/wp-content/uploads/2012/07/Follow-our-etiqutte-and-cultural-guide-to-India.jpg", name: "Kutch Handicrafts" },
      { url: "https://tohrabazarbusiness.com/wp-content/uploads/2023/09/Gir-national-park.jpg", name: "Gir Lion Safari" },
      { url: "https://s7ap1.scene7.com/is/image/incredibleindia/dwarkadish-temple-01-attr-hero?qlt=82&ts=1726734784547", name: "Dwarkadhish Temple" }
    ],
    moods: ["Happy"],
    packageAmount: "₹20,000 - ₹35,000"
  },
  {
    name: "Haryana",
    slug: "haryana",
    image: "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?auto=format&fit=crop&w=800&h=500&q=80",
    description: "Land of the Kurukshetra battlefield and rich cultural heritage.",
    highlights: ["Kurukshetra", "Sultanpur Bird Sanctuary", "Pinjore Garden"],
    emoji: "⚔️",
    bestTime: "October to March",
    itinerary: {
      day1: "Spend the day birdwatching at the Sultanpur National Park, home to several migratory species.",
      day2: "Explore the historic site of Kurukshetra, visit the Brahma Sarovar and the Krishna Museum.",
      day3: "Relax in the beautiful Mughal-style Pinjore Gardens and visit the nearby Morni Hills."
    },
    culture: `Haryana has a strong rural lifestyle centered around agriculture and tradition. People live simple yet disciplined lives with a focus on community and strength.

Festivals like Teej and harvest celebrations are important. The food is hearty, including roti, dairy, and local dishes. Haryana reflects strength, simplicity, and heritage.`,
    culturalImages: [
      { url: "https://magarticles.magzter.com/articles/245/254738/5a25105737c7c/Kurukshetra.jpg", name: "Kurukshetra Site" },
      { url: "https://media.istockphoto.com/id/1223368332/photo/yadavindra-gardens-also-known-as-pinjore-gardens.jpg?s=170667a&w=0&k=20&c=cc9_DQzLNBlDrBrCmerzfao2k9yULE_s3Y01IFBlDqM=", name: "Pinjore Garden" },
      { url: "https://www.holidify.com/images/cmsuploads/articles/239.jpg", name: "Surajkund Fair" },
      { url: "https://www.japjitravel.com/blog/wp-content/uploads/2024/04/Besan-Masala-Roti-Haryana.webp", name: "BesanMasala Roti" }
    ],
    moods: ["Spiritual"],
    packageAmount: "₹10,000 - ₹18,000"
  },
  {
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    image: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=800&h=500&q=80",
    description: "Majestic Himalayan peaks, valleys and the apple orchards of Shimla.",
    highlights: ["Shimla", "Manali", "Dharamsala"],
    emoji: "🏔️",
    bestTime: "March to June, September to November",
    itinerary: {
      day1: "Walk along the historic Mall Road in Shimla and visit the Viceregal Lodge.",
      day2: "Experience adventure in Manali's Solang Valley and visit the ancient Hadimba Devi Temple.",
      day3: "Explore the Tibetan culture of McLeod Ganj in Dharamsala and visit the Tsuglagkhang Complex."
    },
    culture: `Himachal Pradesh offers a peaceful mountain lifestyle surrounded by nature. Life is slow, calm, and connected to traditions.

Festivals like Kullu Dussehra bring communities together. The food is simple and nutritious. It’s ideal for relaxation and natural beauty.`,
    culturalImages: [
      { url: "https://tse4.mm.bing.net/th/id/OIP.gX8VkKGNP14kp-k4jlMrTAHaE7?pid=ImgDet&w=474&h=315&rs=1&o=7&rm=3", name: "Snowy Peaks" },
      { url: "https://www.holidify.com/images/bgImages/HIMACHAL-PRADESH.jpg", name: "Manali Valley" },
      { url: "https://media.istockphoto.com/id/471545029/photo/devotees-at-buddhist-monastery-tawang-arunachal-pradesh-india.jpg?s=612x612&w=0&k=20&c=VymgITArvm8CG6ESfv6xyydg2pdn5LORgK4FQFUDngI=", name: "Tibetan Monks" },
      { url: "https://uttarakhandtravelagency.com/images/shimla_1753022198.jpg", name: "Shimla Landscape" }
    ],
    moods: ["Sad","Adventurous","Stressed"],
    packageAmount: "₹20,000 - ₹40,000"
  },
  {
    name: "Jammu & Kashmir",
    slug: "jammu-kashmir",
    image: "https://png.pngtree.com/thumb_back/fh260/background/20250228/pngtree-an-apple-tree-with-red-apples-covered-in-snow-image_17023699.jpg",
    description: "Heaven on Earth — Dal Lake, snow peaks and saffron fields.",
    highlights: ["Srinagar", "Gulmarg", "Pahalgam"],
    emoji: "🏔️",
    bestTime: "March to October",
    itinerary: {
      day1: "Enjoy a tranquil Shikara ride on Dal Lake in Srinagar and visit the Mughal Gardens.",
      day2: "Take the world's second-highest Gondola ride in Gulmarg for stunning views of the Himalayas.",
      day3: "Explore the scenic Aru and Betaab Valleys in Pahalgam and relax by the Lidder River."
    },
    culture: `Jammu & Kashmir is known for its serene lifestyle and breathtaking landscapes. People live a calm life surrounded by nature and craftsmanship.

Festivals and cultural traditions reflect both Islamic and local influences. The cuisine includes Wazwan dishes and Kahwa. It’s a place of beauty and peace.`,
    culturalImages: [
      { url: "https://www.grasshopperyatra.com/assets/images/main/1711627155789.jpg", name: "Tulip Fields Valley" },
      { url: "https://images.news18.com/ibnlive/uploads/2018/09/Floating-Vegetable-Market-in-Dal-Lake-5.jpg", name: "Floating Market" },
      { url: "https://shikaraboatalleppey.com/wp-content/uploads/2024/07/p3.jpg", name: "Kashmiri Boat House" },
      { url: "https://media.cnn.com/api/v1/images/stellar/prod/240112092102-01-gulmarg-snow.jpg?q=w_1110,c_fill", name: "Gulmarg Snow" }
    ],
    moods: ["Romantic"],
    packageAmount: "₹25,000 - ₹50,000"
  },
  {
    name: "Jharkhand",
    slug: "jharkhand",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&h=500&q=80",
    description: "The abode of forests with stunning waterfalls and tribal art.",
    highlights: ["Hundru Falls", "Betla National Park", "Deoghar"],
    emoji: "🌲",
    bestTime: "October to March",
    itinerary: {
      day1: "Visit the spectacular Hundru and Johna Waterfalls near Ranchi for a refreshing nature break.",
      day2: "Explore the ancient Baidyanath Jyotirlinga temple in Deoghar, a significant spiritual site.",
      day3: "Discover the wildlife and palamau fort at Betla National Park in Latehar district."
    },
    culture: `Jharkhand has a tribal lifestyle deeply connected to forests and natural resources. Community living and traditions are central to life.

Festivals like Sarhul celebrate nature. The food is simple and organic. The state offers raw natural beauty and cultural richness.`,
    culturalImages: [
      { url: "https://img1.picmix.com/output/stamp/normal/9/0/8/8/268809_840ec.gif", name: "Fantasy Waterfall" },
      { url: "https://i0.wp.com/wordzz.com/wp-content/uploads/2023/04/Betla-National-Park-Elephant.jpeg?resize=1536%2C975&ssl=1", name: "Wild Elephant" },
      { url: "/images/dhuska.png", name: "Local Cuisine (Dhuska)" },
      { url: "https://www.namasteindiatrip.org/wp-content/uploads/2022/12/Karam-Dance.jpg", name: "Karam Dance" }
    ],
    moods: ["Sad"],
    packageAmount: "₹12,000 - ₹22,000"
  },
  {
    name: "Karnataka",
    slug: "karnataka",
    image: "/images/karnataka.jpg",
    description: "Silk, sandalwood, and magnificent palaces of Mysore.",
    highlights: ["Mysore Palace", "Coorg", "Hampi"],
    emoji: "🏰",
    bestTime: "October to February",
    itinerary: {
      day1: "Tour the grand Mysore Palace and climb the Chamundi Hills for a panoramic city view.",
      day2: "Explore the ruins of the Vijayanagara Empire in Hampi, a UNESCO World Heritage site.",
      day3: "Enjoy the misty landscapes and coffee estates of Coorg, visiting Abbey Falls and Raja's Seat."
    },
    culture: `Karnataka blends modern urban life with rich historical traditions. Cities like Bangalore are tech hubs, while regions like Mysore preserve royal culture.

Festivals like Dasara are grandly celebrated. The food includes dosa, idli, and regional specialties. Karnataka offers diversity in culture and lifestyle.`,
    culturalImages: [
      { url: "https://media.tripinvites.com/places/mysore/mysore-palace/mysore-palace-in-lights-featured.jpg", name: "Mysore Palace" },
      { url: "https://im.hunt.in/cg/Mysure/City-Guide/mysoresilkweaving.jpg", name: "Mysore Silk" },
      { url: "https://media.istockphoto.com/id/519406045/photo/bangalore-skyline-india.jpg?b=1&s=170667a&w=0&k=20&c=hJL5CjKW2TIECR_D_Kyf1XURn7RokoTCBQi3AByf0PQ=", name: "Bangalore Skyline" },
      { url: "https://s7ap1.scene7.com/is/image/incredibleindia/vittala-temple-hampi-karnataka-3-attr-hero?qlt=82&ts=1726721364446", name: "Vittala Temple Hampi" }
    ],
    moods: ["Excited"],
    packageAmount: "₹18,000 - ₹35,000"
  },
  {
    name: "Kerala",
    slug: "kerala",
    image: "https://htoindia.com/wp-content/uploads/2017/02/kerala-houseboat.jpg",
    description: "God's own country — backwaters, tea hills, and Kathakali.",
    highlights: ["Alleppey", "Munnar", "Wayanad"],
    emoji: "🌴",
    bestTime: "September to March",
    itinerary: {
      day1: "Experience a magical overnight stay on a traditional houseboat in the backwaters of Alleppey.",
      day2: "Visit the sprawling tea plantations and Eravikulam National Park in the hills of Munnar.",
      day3: "Explore the ancient Edakkal Caves and scenic Banasura Sagar Dam in Wayanad."
    },
    culture: `Kerala promotes a calm, eco-friendly lifestyle with a focus on health and nature. Backwaters and greenery define daily life.

Onam is the biggest festival celebrated with feasts and traditions. The food is rich and served on banana leaves. Kerala offers peace and cultural beauty.`,
    culturalImages: [
      { url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7ff421166298261.6415d2fa6ad4e.jpg", name: "Kathakali Performance" },
      { url: "https://cdn.dribbble.com/userupload/16588398/file/original-5643e1db56e96791a6762c31cf1272f0.png?format=webp&resize=800x600&vertical=center", name: "Onam" },
      { url: "https://kerala.me/wp-content/uploads/2015/12/Coconut-Tress.jpg", name: "Backwater Palms" },
      { url: "https://media.newindianexpress.com/TNIE%2Fimport%2F2015%2F9%2F18%2F23%2Foriginal%2Fkerala.jpg?auto=format%2Ccompress&fit=max&w=480", name: "Kerala Banana Leaf Rice" }
    ],
    moods: ["Sad","Calm","Stressed"],
    packageAmount: "₹25,000 - ₹45,000"
  },
  {
    name: "Madhya Pradesh",
    slug: "madhya-pradesh",
    image: "/images/madhya-pradesh.jpg",
    description: "Heart of India with magnificent temples and tiger reserves.",
    highlights: ["Khajuraho", "Bandhavgarh", "Orchha"],
    emoji: "🐯",
    bestTime: "October to March",
    itinerary: {
      day1: "Marvel at the intricate erotic and divine sculptures of the Khajuraho Group of Temples.",
      day2: "Embark on a tiger safari in Bandhavgarh or Kanha National Park to see Indian wildlife.",
      day3: "Step back in time at the medieval town of Orchha with its grand palaces and cenotaphs."
    },
    culture: `Madhya Pradesh combines heritage with wildlife and tribal culture. Life here reflects history and natural diversity.

Festivals and traditions vary across regions. The food is simple yet flavorful. It’s perfect for cultural and wildlife exploration.`,
    culturalImages: [
      { url: "https://media.timeout.com/images/106015895/1536/1152/image.jpg", name: "Khajuraho Art" },
      { url: "https://indiaholidaymall.com/images/blog/Gwalior-Fort.jpg", name: "Gwalior Fort" },
      { url: "https://images.slurrp.com/prod/articles/hfcq8gy17p5.webp", name: "Poha Jalebi Breakfast" },
      { url: "https://www.kanhanationalparkonline.in/uploads/kanha-safari-ticket.jpg", name: "Tiger Safari" }
    ],
    moods: ["Stressed"],
    packageAmount: "₹18,000 - ₹30,000"
  },
  {
    name: "Maharashtra",
    slug: "maharashtra",
    image: "/images/vadapav.png",
    description: "Bollywood, Ajanta-Ellora caves, and vibrant Mumbai.",
    highlights: ["Mumbai", "Ajanta & Ellora", "Lonavala"],
    emoji: "🎬",
    bestTime: "October to March",
    itinerary: {
      day1: "Experience Mumbai: Gateway of India, Marine Drive, and a tour of the bustling Crawford Market.",
      day2: "Explore the rock-cut architectural marvels of the Ajanta and Ellora Caves near Aurangabad.",
      day3: "Relax in the hill stations of Lonavala and Khandala, visiting Bhushi Dam and Tiger's Leap."
    },
    culture: `Maharashtra offers a mix of fast city life and traditional values. Mumbai represents ambition and energy, while rural areas preserve culture.

Ganesh Chaturthi is celebrated with great enthusiasm. The food ranges from street snacks to traditional meals. It’s lively and diverse.`,
    culturalImages: [
      { url: "https://spn-sta.spinny.com/blog/20231027223721/Lonavala-1160x653.webp", name: "Matheran Toy Train" },
      { url: "https://www.delhitourism.com/images/destination/5e5f4de2ac157banner-maharashtra.jpg", name: "Gateway of India" },
      { url: "https://static.toiimg.com/photo/msid-103770399,width-96,height-65.cms", name: "Ganesh Chaturthi" },
      { url: "https://res.cloudinary.com/kmadmin/image/upload/v1743244200/kiomoi/marine-drive-2_3907.webp", name: "Marine Drive Night" }
    ],
    moods: ["Excited"],
    packageAmount: "₹15,000 - ₹30,000"
  },
  {
    name: "Manipur",
    slug: "manipur",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&h=500&q=80",
    description: "The Switzerland of India with Loktak Lake and vibrant dance.",
    highlights: ["Loktak Lake", "Kangla Fort", "Keibul Lamjao"],
    emoji: "💃",
    bestTime: "October to March",
    itinerary: {
      day1: "Visit the floating islands (Phumdis) of Loktak Lake and the world's only floating national park.",
      day2: "Explore the historic Kangla Fort in Imphal and pay respects at the INA War Museum.",
      day3: "Experience the vibrant Ima Keithel, the largest market in Asia run entirely by women."
    },
    culture: `Manipur offers a peaceful and nature-connected lifestyle, where people live close to lakes, hills, and traditions. The state is known for its graceful culture and disciplined way of life, deeply influenced by classical arts and community values.

Festivals like Yaoshang and Lai Haraoba are celebrated with dance and rituals. The cuisine includes rice-based dishes, fish, and local herbs. Manipur provides a calm and culturally rich experience for travelers.`,
    culturalImages: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/3/3c/CervusEldiAMNH.jpg", name: "Keibul Lamjao Deer" },
      { url: "https://imphalreviews.in/wp-content/uploads/2021/11/Ras-Lila-768x487.jpg", name: "Raas Leela Dance" },
      { url: "https://2.bp.blogspot.com/-0LIysDYY7hg/Va3c4Ezb9pI/AAAAAAAASyE/vcuN9dIj-0M/s640/bahay%2Bkubo%2B3.jpg", name: "Tribal Villages" },
      { url: "https://s7ap1.scene7.com/is/image/incredibleindia/sanamahi-kiyong-temple-imphal-manipur-1-attr-hero?qlt=82&ts=1727354935401", name: "Sanamahi Temple" }
    ],
    moods: ["Lonely"],
    packageAmount: "₹20,000 - ₹35,000"
  },
  {
    name: "Meghalaya",
    slug: "meghalaya",
    image: "https://www.oddessemania.in/wp-content/uploads/2023/09/krang-suri-falls-1024x678.jpg",
    description: "The abode of clouds — the wettest place on Earth with living root bridges.",
    highlights: ["Cherrapunji", "Living Root Bridges", "Mawlynnong"],
    emoji: "☁️",
    bestTime: "October to April",
    itinerary: {
      day1: "Trek to the amazing Double Decker Living Root Bridges in the rainforests of Nongriat.",
      day2: "Explore the waterfalls and caves of Cherrapunji, one of the wettest places on Earth.",
      day3: "Visit the crystalline Umngot River in Dawki and 'Asia's Cleanest Village', Mawlynnong."
    },
    culture: `Meghalaya has a refreshing lifestyle shaped by heavy rainfall, green landscapes, and tribal traditions. People live in harmony with nature, and the environment plays a key role in daily life.

Festivals like Wangala bring communities together with music and dance. The food includes dishes like Jadoh made with rice and meat. Meghalaya offers a pure and nature-driven cultural experience.`,
    culturalImages: [
      { url: "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/nohkalikai-falls.jpg", name: "Nohkalikai Falls" },
      { url: "https://wanderon-images.gumlet.io/gallery/new/2026/02/14/1771058457564-double-decker-root-bridge.jpg", name: "Double Decker Root Bridge" },
      { url: "https://www.oddessemania.in/wp-content/uploads/2024/04/Wangala-dances-of-meghalaya-1024x682.jpg", name: "Wangala Dance" },
      { url: "https://ak0.picdn.net/shutterstock/videos/9863990/thumb/1.jpg?i10c=img.resize(height:160)", name: "Khasi Lifestyle" }
    ],
    moods: ["Lonely","Adventurous"],
    packageAmount: "₹18,000 - ₹35,000"
  },
  {
    name: "Mizoram",
    slug: "mizoram",
    image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/12/07113458/Aizawl.jpg",
    description: "The land of the blue mountain, known for scenic landscapes.",
    highlights: ["Aizawl", "Phawngpui", "Vantawng Falls"],
    emoji: "💙",
    bestTime: "October to March",
    itinerary: {
      day1: "Explore the capital city Aizawl, visit the Mizoram State Museum and the Solomon's Temple.",
      day2: "Admire the height of Vantawng Falls and explore the bamboo forests of Thenzawl.",
      day3: "Trek up the Reiek Tlang for a breathtaking 360-degree view of the Mizo hills."
    },
    culture: `Mizoram reflects a simple and community-oriented lifestyle where people value discipline, respect, and togetherness. Life here is peaceful and closely tied to the hills and nature.

Festivals like Chapchar Kut are celebrated with traditional bamboo dances. The food includes rice, meat, and bamboo shoot dishes. Mizoram offers a calm and culturally unique environment.`,
    culturalImages: [
      { url: "https://s7ap1.scene7.com/is/image/incredibleindia/solomons-temple-aizawl-mizoram-1-attr-hero?qlt=82&ts=1726665869426", name: "Solomon's Temple" },
      { url: "https://theultimateindia.com/wp-content/uploads/2023/04/best-places-to-see-in-mizoram-2.jpg", name: "Aizawl Peaks" },
      { url: "https://tse3.mm.bing.net/th/id/OIP.2t0Qw7rKHE4NeWTvjif3fAHaFU?rs=1&pid=ImgDetMain&o=7&rm=3", name: "Bamboo Food" },
      { url: "https://editorial01.shutterstock.com/preview-440/7955599h/c327f285/Shutterstock_7955599h.jpg", name: "Traditional Mizo Village" }
    ],
    moods: ["Adventurous"],
    packageAmount: "₹20,000 - ₹40,000"
  },
  {
    name: "Nagaland",
    slug: "nagaland",
    image: "https://static.tripzilla.in/media/54514/conversions/2cb34c6c-4002-44af-a4fd-f7f948e58237-w768.webp",
    description: "Land of festivals and warrior tribes with rich cultural traditions.",
    highlights: ["Kohima", "Hornbill Festival", "Dzukou Valley"],
    emoji: "🎭",
    bestTime: "December to February",
    itinerary: {
      day1: "Visit the Kohima War Cemetery and the Naga Heritage Village at Kisama.",
      day2: "Experience the vibrant Hornbill Festival (in December) or explore the Khonoma Green Village.",
      day3: "Trek to the stunning Dzukou Valley, known for its seasonal flowers and pristine beauty."
    },
    culture: `Nagaland is known for its vibrant tribal lifestyle where traditions, community, and festivals play a central role. People maintain strong cultural identities and live in close-knit communities.

The Hornbill Festival is the biggest celebration, showcasing dance, music, and traditions. The cuisine includes smoked meat and bamboo-based dishes. Nagaland is bold, colorful, and culturally rich.`,
    culturalImages: [
      { url: "https://www.exploreouting.com/images/m_images/KOHI_1505376650_1.jpg", name: "Naga Warrior Village" },
      { url: "https://static2.tripoto.com/media/filter/nl/img/371044/TripDocument/1505033855_mg_3439.jpg", name: "Hornbill Performance" },
      { url: "https://www.solitarytraveller.com/wp-content/uploads/2020/02/web_hornbill_celeberation-min-1536x1152.jpg", name: "Konyak Tribe" },
      { url: "https://th.bing.com/th/id/R.4f37851c7f76df26920d23be17c703fb?rik=gXOczmRCo4NoBA&riu=http%3a%2f%2fwww.lostwithpurpose.com%2fwp-content%2fuploads%2f2017%2f06%2fDSC06845.jpg&ehk=UIHGnSA%2f6xVqeuqtlkKioAf1AXTWBvOjDvDpihD7hGk%3d&risl=&pid=ImgRaw&r=0", name: "Dzüko Valley" }
    ],
    moods: ["Adventurous"],
    packageAmount: "₹20,000 - ₹40,000"
  },
  {
    name: "Odisha",
    slug: "odisha",
    image: "https://www.swantour.com/blogs/wp-content/uploads/2018/03/Bhubaneswar-odisha.jpg",
    description: "Ancient temples, pristine beaches and the famous Jagannath Puri.",
    highlights: ["Puri", "Konark Sun Temple", "Chilika Lake"],
    emoji: "🌊",
    bestTime: "October to March",
    itinerary: {
      day1: "Seek blessings at the Jagannath Temple in Puri and relax at the Blue Flag beach.",
      day2: "Visit the Konark Sun Temple, a masterpiece of ancient architecture, and wait for the light show.",
      day3: "Go boating on Chilika Lake to spot Irrawaddy dolphins and visit the Kalijai Temple island."
    },
    culture: `Odisha offers a lifestyle deeply rooted in spirituality and temple traditions. Daily life is influenced by rituals, art, and coastal living.

Festivals like Rath Yatra attract millions of devotees. The food includes rice-based meals, seafood, and sweets like Rasgulla. Odisha is a blend of devotion, art, and heritage.`,
    culturalImages: [
      { url: "https://imvoyager.com/wp-content/uploads/2017/10/Jagannath-Temple-Puri.jpg", name: "Jagannath Temple" },
      { url: "https://purimarkets.com/images/slide40.JPG", name: "Chilika Lake" },
      { url: "/images/rath_yatra.png", name: "Rath Yatra" },
      { url: "https://shreejagannathapuri.com/wp-content/uploads/2025/05/ChatGPT-Image-May-27-2025-07_23_00-PM-1.png", name: "shreejagannathapuri Temple" }
    ],
    moods: [],
    packageAmount: "₹12,000 - ₹22,000"
  },
  {
    name: "Punjab",
    slug: "punjab",
    image: "https://png.pngtree.com/thumb_back/fh260/background/20230308/pngtree-golden-temple--harmandir-sahib--in-amritsar-photo-image_1860603.jpg",
    description: "The land of five rivers — Golden Temple and vibrant Bhangra culture.",
    highlights: ["Golden Temple", "Wagah Border", "Jallianwala Bagh"],
    emoji: "🙏",
    bestTime: "October to March",
    itinerary: {
      day1: "Visit the spiritual Golden Temple and the historic Jallianwala Bagh in Amritsar.",
      day2: "Experience the patriotic Wagah Border beating retreat ceremony near Amritsar.",
      day3: "Explore the modern city of Chandigarh, visiting the Rock Garden and Sukhna Lake."
    },
    culture: `Punjab is full of energy and warmth, where people live life with enthusiasm and strong community bonds. Agriculture plays a major role in shaping the lifestyle.

Festivals like Baisakhi and Lohri are celebrated with dance and music. The food is rich and flavorful, including Butter Chicken and Lassi. Punjab offers joy, hospitality, and vibrant culture.`,
    culturalImages: [
      { url: "https://aniportalimages.s3.amazonaws.com/media/details/ANI-20230419114915.jpeg", name: "Bhangra Dance" },
      { url: "https://images.alphacoders.com/541/thumb-1920-541010.jpg", name: "Golden Temple" },
      { url: "https://cdn1.goibibo.com/voy_ing/t_fs/amritsar-jallianwala-bagh-148316572461o.jpeg", name: "Jallianwala Bagh" },
      { url: "https://st1.latestly.com/wp-content/uploads/2022/08/97-784x441.jpg", name: "Wagah Border" }
    ],
    moods: ["Happy"],
    packageAmount: "₹12,000 - ₹22,000"
  },
  {
    name: "Rajasthan",
    slug: "rajasthan",
    image: "https://alumni.harvard.edu/sites/default/files/styles/trip_photo/public/trip/main_photo/Adobe_Hawa_Mahal_Palace_960x640.jpeg?itok=dOQi6Bqz",
    description: "The Land of Kings — grand palaces, golden deserts, and rich heritage.",
    highlights: ["Jaipur", "Udaipur", "Jaisalmer"],
    emoji: "🏜️",
    bestTime: "October to March",
    itinerary: {
      day1: "Discover the 'Pink City' Jaipur: Amer Fort, Hawa Mahal, and the City Palace.",
      day2: "Enjoy a royal experience in Udaipur with a boat ride on Lake Pichola and a palace tour.",
      day3: "Witness the golden sand dunes of Jaisalmer and take a camel safari at sunset."
    },
    culture: `Rajasthan showcases a royal lifestyle influenced by its rich history of kings and palaces. Despite the desert climate, life is colorful and full of tradition.

Festivals like Teej and Pushkar Fair bring vibrancy and celebration. The cuisine includes Dal Baati Churma and spicy curries. Rajasthan offers a majestic cultural experience`,
    culturalImages: [
      { url: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/11/d7/cf/f4.jpg", name: "Camel Safari" },
      { url: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/city-palace.jpg", name: "City Palace" },
      { url: "https://www.shutterstock.com/preview-440/14160842d/5ec5acfb/Shutterstock_14160842d.jpg", name: "Ghoomar Dance" },
      { url: "https://cdn.cdnparenting.com/articles/2020/04/07213905/780441559.jpg", name: "Dal Baati" }
    ],
    moods: ["Romantic"],
    packageAmount: "₹20,000 - ₹40,000"
  },
  {
    name: "Sikkim",
    slug: "sikkim",
    image: "https://pci.gov.in/media/original_images/Sikkim.jpg",
    description: "Tiny Himalayan state with Kanchenjunga and Buddhist monasteries.",
    highlights: ["Gangtok", "Tsomgo Lake", "Pelling"],
    emoji: "⛰️",
    bestTime: "March to June, September to November",
    itinerary: {
      day1: "Explore Gangtok: Enchey Monastery, Do Drul Chorten, and shopping at MG Marg.",
      day2: "Take a day trip to the high-altitude Tsomgo Lake and the holy Baba Mandir.",
      day3: "Visit Pelling to see the Pemayangtse Monastery and enjoy views of Kanchenjunga."
    },
    culture: `Sikkim offers a peaceful and eco-friendly lifestyle surrounded by the Himalayas. People live with simplicity and respect for nature.

Festivals like Losar reflect Buddhist traditions. The food includes Momos, Thukpa, and organic produce. Sikkim is calm, clean, and spiritually uplifting.`,
    culturalImages: [
      { url: "https://www.tallengestore.com/cdn/shop/products/KanchenjungaSunrise-DigitalArt_5d18928b-b736-4038-8aaa-ebdd07b83154.jpg?v=1675749368", name: "Kanchenjunga Peak" },
      { url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/c8/da/23/gangtok-ropeway.jpg?h=1200&s=1&w=1200", name: "Gangtok Ropeway" },
      { url: "https://www.esikkimtourism.in/wp-content/uploads/2019/04/topmarch.jpg", name: "Frozen Lake" },
      { url: "https://www.bhutanrentalandtravel.com/images/thumb/bhutan-culture.jpg", name: "Bhutan Cultural Link" }
    ],
    moods: ["Sad","Calm"],
    packageAmount: "₹20,000 - ₹40,000"
  },
  {
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    image: "https://tse4.mm.bing.net/th/id/OIP.7PDZCQ-UV050BoBJOkJDWgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Dravidian temples, classical music, and the serene Marina Beach.",
    highlights: ["Madurai", "Ooty", "Mahabalipuram"],
    emoji: "🎵",
    bestTime: "November to March",
    itinerary: {
      day1: "Marvel at the architectural splendor of the Meenakshi Temple in Madurai.",
      day2: "Ride the Nilgiri Mountain Railway to Ooty and visit the Botanical Gardens.",
      day3: "Explore the UNESCO-listed shore temples and stone carvings of Mahabalipuram."
    },
    culture: `Tamil Nadu is deeply traditional, where temples, art, and culture define everyday life. The lifestyle reflects discipline, spirituality, and strong cultural values.

Pongal is the main festival celebrating harvest and gratitude. The cuisine includes Idli, Dosa, and Filter Coffee. Tamil Nadu offers a timeless cultural experience.`,
    culturalImages: [
      { url: "https://i0.wp.com/www.inde-en-liberte.com/uploads/sites/73/2020/10/madurai-temple-photlook.jpeg", name: "Meenakshi Temple" },
      { url: "https://s01.sgp1.digitaloceanspaces.com/facebook/804709-facebook-qkbkdrnrpn-1457282502.jpeg", name: "Kanyakumari" },
      { url: "https://webneel.com/wnet/file/images/3-17/3-dosa-idlis-india-food-photography-by-nitin-rai.preview.jpg", name: "South Indian Food" },
      { url: "https://d26dp53kz39178.cloudfront.net/media/uploads/products/image12_result-2-1675320531314.webp", name: "Mahabalipuram" }
    ],
    moods: ["Spiritual","Stressed"],
    packageAmount: "₹15,000 - ₹30,000"
  },
  {
    name: "Telangana",
    slug: "telangana",
    image: "https://img.freepik.com/premium-photo/firefly-air-flying-chicken-biryani-spicy-indian-hyderabadi-biryani-isolated-background_463801-1963.jpg?w=900",
    description: "City of Nizams, Charminar, and world-famous Hyderabadi biryani.",
    highlights: ["Charminar", "Golconda Fort", "Ramoji Film City"],
    emoji: " Curry",
    bestTime: "October to February",
    itinerary: {
      day1: "Visit the iconic Charminar, Chowmahalla Palace, and the Salar Jung Museum in Hyderabad.",
      day2: "Explore the majestic Golconda Fort and its incredible acoustic signaling system.",
      day3: "Spend a fun-filled day at Ramoji Film City, the world's largest film studio complex."
    },
    culture: `Telangana combines modern urban life with royal Nizam heritage. Hyderabad reflects a fast-growing city culture with historical roots.

Festivals like Bonalu and Bathukamma are unique to the region. The cuisine is famous for Hyderabadi Biryani and rich flavors. Telangana offers heritage with modern energy.`,
    culturalImages: [
      { url: "https://media.istockphoto.com/id/1215274990/photo/high-wide-angle-view-of-charminar-in-the-night.jpg?b=1&s=170667a&w=0&k=20&c=RoEHn64U7IVbkjUI0daEX0EPsCtJxvg3CKCI04WnIs0=", name: "Charminar Night" },
      { url: "https://warangaltourism.in/images/places-to-visit-warangal/thousand-1000-pillar-temple-warangal-hanamkonda/thousand-1000-pillar-temple-warangal-hanamkonda-india-tourism-history.jpg", name: "Warangal Temple" },
      { url: "https://images.pexels.com/photos/34217667/pexels-photo-34217667/free-photo-of-women-celebrating-bathukamma-festival-in-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", name: "Bathukamma Festival" },
      { url: "https://manahyderabadguru.com/wp-content/uploads/2024/06/ramoji-film-city-hyderabad.jpg", name: "Ramoji Film City" }
    ],
    moods: ["Excited"],
    packageAmount: "₹15,000 - ₹28,000"
  },
  {
    name: "Tripura",
    slug: "tripura",
    image: "https://www.indiatravel.app/wp-content/uploads/2024/03/Neermahal-Palace-1024x585.jpg",
    description: "A hidden gem with palaces, wetlands and bamboo art.",
    highlights: ["Ujjayanta Palace", "Neermahal", "Unakoti"],
    emoji: "🎋",
    bestTime: "October to March",
    itinerary: {
      day1: "Visit the white-marbled Ujjayanta Palace and the state museum in Agartala.",
      day2: "Admire the Neermahal, a stunning water palace situated in the middle of Rudrasagar Lake.",
      day3: "See the ancient rock sculptures at Unakoti, a Shaivite pilgrimage site deep in the forest."
    },
    culture: `Tripura has a quiet and traditional lifestyle with strong tribal influences. People live simply, surrounded by forests and cultural heritage.

Festivals like Kharchi Puja reflect local traditions. The food includes rice, fish, and bamboo shoot dishes. Tripura is peaceful and culturally rich.`,
    culturalImages: [
      { url: "https://3.bp.blogspot.com/-EbpkTaI0N2E/WdkEbFx8pDI/AAAAAAAAV04/SvHySIlQlbM9_8l3Fv2T4qb45iSuDvkNgCLcBGAs/s1600/Ujjayanta-Palace-3.jpg", name: "Ujjayanta Palace" },
      { url: "https://thumbs.dreamstime.com/b/agartala-picturesque-capital-tripura-renowned-its-stunning-ujjayanta-palace-serene-landscapes-rich-cultural-349033084.jpg", name: "Neermahal Palace" },
      { url: "https://img1.exportersindia.com/product_images/bc-full/2018/7/5632933/bamboo-handicrafts-1531714725-4104928.jpeg", name: "Bamboo Handicraft" },
      { url: "https://tse1.mm.bing.net/th/id/OIP.w8CKbkkfnLl7QHyv5RTOswHaEd?rs=1&pid=ImgDetMain&o=7&rm=3", name: "Gumti Sanctuary" }
    ],
    moods: ["Lonely"],
    packageAmount: "₹15,000 - ₹25,000"
  },
  {
    name: "Uttar Pradesh",
    slug: "uttar-pradesh",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&h=500&q=80",
    description: "Home to the Taj Mahal and the holy ghats of Varanasi.",
    highlights: ["Taj Mahal", "Varanasi", "Agra Fort"],
    emoji: "🕌",
    bestTime: "October to March",
    itinerary: {
      day1: "Witness the sunrise at the Taj Mahal and explore the nearby Agra Fort.",
      day2: "Experience the spiritual Ganga Aarti at the Varanasi Ghats in the evening.",
      day3: "Visit the historic Bara Imambara and Bhul Bhulaiya in the city of Lucknow."
    },
    culture: `Uttar Pradesh is a center of spirituality and history, where ancient traditions continue to shape daily life. Cities like Varanasi reflect deep religious practices.

Festivals like Diwali and Holi are celebrated grandly. The food includes kebabs, biryani, and sweets. The state offers a powerful cultural and spiritual journey.`,
    culturalImages: [
      { url: "https://i.timesnowhindi.com/stories/ganga_aarti_0.jpg", name: "Ganga Aarti Varanasi" },
      { url: "https://asi.nic.in/images/agrafort1.jpg", name: "Agra Fort Tower" },
      { url: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2025/01/kumbh-mela-1-1736745715.jpg", name: "Kumbh Mela" },
      { url: "https://images.news18.com/kannada/uploads/2022/10/AYODHYE-RAMA-MANDIR-new-1.jpg", name: "Ayodhya Temple" }
    ],
    moods: ["Spiritual"],
    packageAmount: "₹10,000 - ₹20,000"
  },
  {
    name: "Uttarakhand",
    slug: "uttarakhand",
    image: "https://t3.ftcdn.net/jpg/08/41/49/72/360_F_841497224_Rt7XyrNl6o5o6J7wcA1W4yR5kmKPRm9I.jpg",
    description: "The Devbhoomi — land of gods with Kedarnath and Jim Corbett.",
    highlights: ["Rishikesh", "Kedarnath", "Jim Corbett"],
    emoji: "🙏",
    bestTime: "March to June, September to November",
    itinerary: {
      day1: "Go river rafting in Rishikesh and attend the evening Ganga Aarti at Triveni Ghat.",
      day2: "Visit Nainital, take a boat ride on Naini Lake and visit the Naina Devi Temple.",
      day3: "Explore the Mussoorie Mall Road and enjoy the views from Gun Hill."
    },
    culture: `Uttarakhand offers a spiritual and nature-filled lifestyle, with people living close to mountains and holy rivers. It is known as the land of gods.

Festivals and pilgrimages like Char Dham Yatra are important. The food is simple and healthy. Uttarakhand provides peace, adventure, and spirituality.`,
    culturalImages: [
      { url: "https://uttarakhand.in/images/river-rafting.jpg", name: "Rishikesh Rafting" },
      { url: "https://media.istockphoto.com/id/1128927445/photo/village-of-wodden-house-in-himalayas-himachal-pradesh.jpg?s=612x612&w=0&k=20&c=JE6jfr7yRu9La-x6isfTzMmbZN0-2RDTsqN7j5wm6uU=", name: "Hill Village" },
      { url: "https://campgangavatika.com/imgart/bungee-jump-rishikesh.jpg", name: "Bungee Jumping" },
      { url: "https://travelfoodatlas.com/wp-content/uploads/2023/11/Moloykhia.jpg.webp", name: "Local Food" }
    ],
    moods: ["Lonely","Spiritual","Adventurous"],
    packageAmount: "₹15,000 - ₹30,000"
  },
  {
    name: "West Bengal",
    slug: "west-bengal",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Sundarban_Tiger.jpg",
    description: "Darjeeling tea, Sundarbans tigers, and the cultural soul of Kolkata.",
    highlights: ["Kolkata", "Darjeeling", "Sundarbans"],
    emoji: "🍵",
    bestTime: "October to March",
    itinerary: {
      day1: "Tour Kolkata: Victoria Memorial, Howrah Bridge, and sample famous Bengali sweets.",
      day2: "Ride the Toy Train in Darjeeling and visit the beautiful Tiger Hill for sunrise.",
      day3: "Explore the mangrove forests of Sundarbans and go on a boat safari to spot tigers."
    },
    culture: `West Bengal has a rich artistic and intellectual lifestyle where literature, music, and traditions play a major role. Kolkata is known for its cultural depth and creativity.

Durga Puja is the biggest festival, celebrated with grand decorations and joy. The food includes sweets like Rasgulla and fish-based dishes. West Bengal offers a vibrant and artistic cultural experience.`,
    culturalImages: [
      { url: "https://www.trawell.in/admin/images/upload/564578191Howrah_%20bridge.jpg", name: "Howrah Bridge" },
      { url: "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2017/09/21152821/princep-ghat-boat-%5E.jpg", name: "Princep Ghat Boating" },
      { url: "https://hindutone.com/wp-content/uploads/2025/09/Durga-Puja-in-West-Bengal.jpg", name: "Durga Puja Celebration" },
      { url: "https://lp-cms-production.imgix.net/2019-06/9579893.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4", name: "Kolkata Tramway" }
    ],
    moods: ["Happy"],
    packageAmount: "₹12,000 - ₹25,000"
  },
];

