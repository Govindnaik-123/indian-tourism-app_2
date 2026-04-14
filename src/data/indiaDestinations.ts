export interface Destination {
  id: string;
  name: string;
  state: string;
  type: string[]; // beach, hill, spiritual, etc.
  popularity: "Popular" | "Hidden";
  moods: string[]; // Happy, Calm, Romantic, etc.
  seasons: string[]; // Summer, Winter, Monsoon
  budget: "Low" | "Medium" | "High";
  description: string;
  image: string;
}

export const extendedDestinations: Destination[] = [
  {
    "id": "ext-and-0",
    "name": "Tirupati",
    "state": "Andhra Pradesh",
    "type": [
      "spiritual"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Tirupati in Andhra Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-and-1",
    "name": "Visakhapatnam",
    "state": "Andhra Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Visakhapatnam in Andhra Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-and-2",
    "name": "Araku Valley",
    "state": "Andhra Pradesh",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Araku Valley in Andhra Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-and-3",
    "name": "Gandikota",
    "state": "Andhra Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Gandikota in Andhra Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-and-4",
    "name": "Horsley Hills",
    "state": "Andhra Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Horsley Hills in Andhra Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-and-5",
    "name": "Belum Caves",
    "state": "Andhra Pradesh",
    "type": [
      "heritage"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Belum Caves in Andhra Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-and-6",
    "name": "Havelock Island",
    "state": "Andaman & Nicobar Islands",
    "type": [
      "beach"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Havelock Island in Andaman & Nicobar Islands.",
    "image": "https://tse3.mm.bing.net/th/id/OIP.PBDTOMpNcdQNPSx-G4ZvYwHaFb?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    "id": "ext-and-7",
    "name": "Neil Island",
    "state": "Andaman & Nicobar Islands",
    "type": [
      "beach"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Neil Island in Andaman & Nicobar Islands.",
    "image": "https://cdn.experienceandamans.com/images/rock-bridge-neil.jpg"
  },
  {
    "id": "ext-and-8",
    "name": "Ross Island",
    "state": "Andaman & Nicobar Islands",
    "type": [
      "beach"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Ross Island in Andaman & Nicobar Islands.",
    "image": "https://andamantourism.org.in/images/places-to-visit/header/ross-island-andaman-tourism-entry-fee-timings-holidays-reviews-header.jpg"
  },
  {
    "id": "ext-and-9",
    "name": "Baratang Island",
    "state": "Andaman & Nicobar Islands",
    "type": [
      "beach"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Baratang Island in Andaman & Nicobar Islands.",
    "image": "https://www.andamanisland.in/assets/site1/theme3/images/andaman-tour-package/Baratang-Island-Image-4-1024x767.jpg"
  },
  {
    "id": "ext-and-10",
    "name": "Cellular Jail",
    "state": "Andaman & Nicobar Islands",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Cellular Jail in Andaman & Nicobar Islands.",
    "image": "https://andamantourism.org.in/images/places-to-visit/header/cellular-jail-andaman-tourism-entry-fee-timings-holidays-reviews-header.jpg"
  },
  {
    "id": "ext-aru-11",
    "name": "Tawang",
    "state": "Arunachal Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Tawang in Arunachal Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-aru-12",
    "name": "Ziro Valley",
    "state": "Arunachal Pradesh",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Ziro Valley in Arunachal Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-aru-13",
    "name": "Dirang",
    "state": "Arunachal Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Dirang in Arunachal Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-aru-14",
    "name": "Bomdila",
    "state": "Arunachal Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Bomdila in Arunachal Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-aru-15",
    "name": "Mechuka",
    "state": "Arunachal Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Mechuka in Arunachal Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-ass-16",
    "name": "Kaziranga National Park",
    "state": "Assam",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Kaziranga National Park in Assam.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-ass-17",
    "name": "Majuli Island",
    "state": "Assam",
    "type": [
      "beach"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Majuli Island in Assam.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-ass-18",
    "name": "Guwahati",
    "state": "Assam",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Guwahati in Assam.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-ass-19",
    "name": "Haflong",
    "state": "Assam",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Haflong in Assam.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-ass-20",
    "name": "Sualkuchi",
    "state": "Assam",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Sualkuchi in Assam.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-bih-21",
    "name": "Bodh Gaya",
    "state": "Bihar",
    "type": [
      "spiritual"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Bodh Gaya in Bihar.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-bih-22",
    "name": "Nalanda",
    "state": "Bihar",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Nalanda in Bihar.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-bih-23",
    "name": "Rajgir",
    "state": "Bihar",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Rajgir in Bihar.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-bih-24",
    "name": "Vaishali",
    "state": "Bihar",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Vaishali in Bihar.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-bih-25",
    "name": "Valmiki National Park",
    "state": "Bihar",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Valmiki National Park in Bihar.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-chh-26",
    "name": "Chitrakote Falls",
    "state": "Chhattisgarh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Chitrakote Falls in Chhattisgarh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-chh-27",
    "name": "Tirathgarh Falls",
    "state": "Chhattisgarh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Tirathgarh Falls in Chhattisgarh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-chh-28",
    "name": "Jagdalpur",
    "state": "Chhattisgarh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Jagdalpur in Chhattisgarh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-chh-29",
    "name": "Mainpat",
    "state": "Chhattisgarh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Mainpat in Chhattisgarh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-chh-30",
    "name": "Kanger Valley",
    "state": "Chhattisgarh",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Kanger Valley in Chhattisgarh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-del-31",
    "name": "Red Fort",
    "state": "Delhi",
    "type": [
      "heritage"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Red Fort in Delhi.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-del-32",
    "name": "India Gate",
    "state": "Delhi",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of India Gate in Delhi.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-del-33",
    "name": "Qutub Minar",
    "state": "Delhi",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Qutub Minar in Delhi.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-del-34",
    "name": "Humayun's Tomb",
    "state": "Delhi",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Humayun's Tomb in Delhi.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-del-35",
    "name": "Hauz Khas Village",
    "state": "Delhi",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Hauz Khas Village in Delhi.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-goa-36",
    "name": "Baga Beach",
    "state": "Goa",
    "type": [
      "beach"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Baga Beach in Goa.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-goa-37",
    "name": "Calangute Beach",
    "state": "Goa",
    "type": [
      "beach"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Calangute Beach in Goa.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-goa-38",
    "name": "Anjuna Beach",
    "state": "Goa",
    "type": [
      "beach"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Anjuna Beach in Goa.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-goa-39",
    "name": "Butterfly Beach",
    "state": "Goa",
    "type": [
      "beach"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Butterfly Beach in Goa.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-goa-40",
    "name": "Dudhsagar Falls",
    "state": "Goa",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Dudhsagar Falls in Goa.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-guj-41",
    "name": "Rann of Kutch",
    "state": "Gujarat",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Rann of Kutch in Gujarat.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-guj-42",
    "name": "Gir National Park",
    "state": "Gujarat",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Gir National Park in Gujarat.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-guj-43",
    "name": "Dwarka",
    "state": "Gujarat",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Dwarka in Gujarat.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-guj-44",
    "name": "Somnath",
    "state": "Gujarat",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Somnath in Gujarat.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-guj-45",
    "name": "Saputara",
    "state": "Gujarat",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Saputara in Gujarat.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-him-46",
    "name": "Manali",
    "state": "Himachal Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Manali in Himachal Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-him-47",
    "name": "Shimla",
    "state": "Himachal Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Shimla in Himachal Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-him-48",
    "name": "Dharamshala",
    "state": "Himachal Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Dharamshala in Himachal Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-him-49",
    "name": "Spiti Valley",
    "state": "Himachal Pradesh",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Spiti Valley in Himachal Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-him-50",
    "name": "Kasol",
    "state": "Himachal Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Kasol in Himachal Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-him-51",
    "name": "Tirthan Valley",
    "state": "Himachal Pradesh",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Tirthan Valley in Himachal Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-jam-52",
    "name": "Srinagar",
    "state": "Jammu & Kashmir",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Srinagar in Jammu & Kashmir.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-jam-53",
    "name": "Gulmarg",
    "state": "Jammu & Kashmir",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Gulmarg in Jammu & Kashmir.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-jam-54",
    "name": "Pahalgam",
    "state": "Jammu & Kashmir",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Pahalgam in Jammu & Kashmir.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-jam-55",
    "name": "Sonmarg",
    "state": "Jammu & Kashmir",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Sonmarg in Jammu & Kashmir.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-jam-56",
    "name": "Gurez Valley",
    "state": "Jammu & Kashmir",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Gurez Valley in Jammu & Kashmir.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-jha-57",
    "name": "Netarhat",
    "state": "Jharkhand",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Netarhat in Jharkhand.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-jha-58",
    "name": "Betla National Park",
    "state": "Jharkhand",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Betla National Park in Jharkhand.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-jha-59",
    "name": "Dassam Falls",
    "state": "Jharkhand",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Dassam Falls in Jharkhand.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-jha-60",
    "name": "Ranchi",
    "state": "Jharkhand",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Ranchi in Jharkhand.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-jha-61",
    "name": "Patratu Valley",
    "state": "Jharkhand",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Patratu Valley in Jharkhand.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-kar-62",
    "name": "Bangalore",
    "state": "Karnataka",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Bangalore in Karnataka.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-kar-63",
    "name": "Coorg",
    "state": "Karnataka",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Coorg in Karnataka.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-kar-64",
    "name": "Hampi",
    "state": "Karnataka",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Hampi in Karnataka.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-kar-65",
    "name": "Gokarna",
    "state": "Karnataka",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Gokarna in Karnataka.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-kar-66",
    "name": "Chikmagalur",
    "state": "Karnataka",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Chikmagalur in Karnataka.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-kar-67",
    "name": "Mysore",
    "state": "Karnataka",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Mysore in Karnataka.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-ker-68",
    "name": "Munnar",
    "state": "Kerala",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Munnar in Kerala.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-ker-69",
    "name": "Alleppey",
    "state": "Kerala",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Alleppey in Kerala.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-ker-70",
    "name": "Kochi",
    "state": "Kerala",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Kochi in Kerala.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-ker-71",
    "name": "Wayanad",
    "state": "Kerala",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Wayanad in Kerala.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-ker-72",
    "name": "Varkala",
    "state": "Kerala",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Varkala in Kerala.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-ker-73",
    "name": "Thekkady",
    "state": "Kerala",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Thekkady in Kerala.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-mad-74",
    "name": "Khajuraho",
    "state": "Madhya Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Khajuraho in Madhya Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-mad-75",
    "name": "Bandhavgarh",
    "state": "Madhya Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Bandhavgarh in Madhya Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-mad-76",
    "name": "Kanha National Park",
    "state": "Madhya Pradesh",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Kanha National Park in Madhya Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-mad-77",
    "name": "Pachmarhi",
    "state": "Madhya Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Pachmarhi in Madhya Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-mad-78",
    "name": "Mandu",
    "state": "Madhya Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Mandu in Madhya Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-mah-79",
    "name": "Mumbai",
    "state": "Maharashtra",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Mumbai in Maharashtra.",
    "image": "https://media.istockphoto.com/photos/vada-pav-or-vada-pav-picture-id538172420?k=6&m=538172420&s=612x612&w=0&h=7koumGadG8WCLsa8XefUK6oFWAgxfZ-PYew_5MhGPJ8="
  },
  {
    "id": "ext-mah-80",
    "name": "Pune",
    "state": "Maharashtra",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Pune in Maharashtra.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-mah-81",
    "name": "Lonavala",
    "state": "Maharashtra",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Lonavala in Maharashtra.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-mah-82",
    "name": "Mahabaleshwar",
    "state": "Maharashtra",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Mahabaleshwar in Maharashtra.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-mah-83",
    "name": "Ajanta & Ellora Caves",
    "state": "Maharashtra",
    "type": [
      "heritage"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Ajanta & Ellora Caves in Maharashtra.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-mah-84",
    "name": "Tarkarli",
    "state": "Maharashtra",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Tarkarli in Maharashtra.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-meg-85",
    "name": "Shillong",
    "state": "Meghalaya",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Shillong in Meghalaya.",
    "image": "https://www.oddessemania.in/wp-content/uploads/2023/09/krang-suri-falls-1024x678.jpg"
  },
  {
    "id": "ext-meg-86",
    "name": "Cherrapunji",
    "state": "Meghalaya",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Cherrapunji in Meghalaya.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-meg-87",
    "name": "Dawki",
    "state": "Meghalaya",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Dawki in Meghalaya.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-meg-88",
    "name": "Mawlynnong",
    "state": "Meghalaya",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Mawlynnong in Meghalaya.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-meg-89",
    "name": "Nongriat",
    "state": "Meghalaya",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Nongriat in Meghalaya.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-miz-90",
    "name": "Aizawl",
    "state": "Mizoram",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Aizawl in Mizoram.",
    "image": "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/12/07113458/Aizawl.jpg"
  },
  {
    "id": "ext-miz-91",
    "name": "Reiek",
    "state": "Mizoram",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Reiek in Mizoram.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-miz-92",
    "name": "Lunglei",
    "state": "Mizoram",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Lunglei in Mizoram.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-miz-93",
    "name": "Champhai",
    "state": "Mizoram",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Champhai in Mizoram.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-nag-94",
    "name": "Kohima",
    "state": "Nagaland",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Kohima in Nagaland.",
    "image": "https://static.tripzilla.in/media/54514/conversions/2cb34c6c-4002-44af-a4fd-f7f948e58237-w768.webp"
  },
  {
    "id": "ext-nag-95",
    "name": "Dimapur",
    "state": "Nagaland",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Dimapur in Nagaland.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-nag-96",
    "name": "Dzukou Valley",
    "state": "Nagaland",
    "type": [
      "nature",
      "wildlife"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Dzukou Valley in Nagaland.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-nag-97",
    "name": "Mon",
    "state": "Nagaland",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Mon in Nagaland.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-odi-98",
    "name": "Puri",
    "state": "Odisha",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Puri in Odisha.",
    "image": "https://www.swantour.com/blogs/wp-content/uploads/2018/03/Bhubaneswar-odisha.jpg"
  },
  {
    "id": "ext-odi-99",
    "name": "Konark",
    "state": "Odisha",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Konark in Odisha.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-odi-100",
    "name": "Bhubaneswar",
    "state": "Odisha",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Bhubaneswar in Odisha.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-odi-101",
    "name": "Chilika Lake",
    "state": "Odisha",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Chilika Lake in Odisha.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-odi-102",
    "name": "Daringbadi",
    "state": "Odisha",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Daringbadi in Odisha.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-pun-103",
    "name": "Amritsar",
    "state": "Punjab",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Amritsar in Punjab.",
    "image": "https://png.pngtree.com/thumb_back/fh260/background/20230308/pngtree-golden-temple--harmandir-sahib--in-amritsar-photo-image_1860603.jpg"
  },
  {
    "id": "ext-pun-104",
    "name": "Ludhiana",
    "state": "Punjab",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Ludhiana in Punjab.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-pun-105",
    "name": "Patiala",
    "state": "Punjab",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Patiala in Punjab.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-pun-106",
    "name": "Anandpur Sahib",
    "state": "Punjab",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Anandpur Sahib in Punjab.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-raj-107",
    "name": "Jaipur",
    "state": "Rajasthan",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Jaipur in Rajasthan.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-raj-108",
    "name": "Udaipur",
    "state": "Rajasthan",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Udaipur in Rajasthan.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-raj-109",
    "name": "Jaisalmer",
    "state": "Rajasthan",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Jaisalmer in Rajasthan.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-raj-110",
    "name": "Jodhpur",
    "state": "Rajasthan",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Jodhpur in Rajasthan.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-raj-111",
    "name": "Pushkar",
    "state": "Rajasthan",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Pushkar in Rajasthan.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-raj-112",
    "name": "Bundi",
    "state": "Rajasthan",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Bundi in Rajasthan.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-sik-113",
    "name": "Gangtok",
    "state": "Sikkim",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Gangtok in Sikkim.",
    "image": "https://pci.gov.in/media/original_images/Sikkim.jpg"
  },
  {
    "id": "ext-sik-114",
    "name": "Tsomgo Lake",
    "state": "Sikkim",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Tsomgo Lake in Sikkim.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-sik-115",
    "name": "Pelling",
    "state": "Sikkim",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Pelling in Sikkim.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-sik-116",
    "name": "Lachung",
    "state": "Sikkim",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Lachung in Sikkim.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-sik-117",
    "name": "Zuluk",
    "state": "Sikkim",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Zuluk in Sikkim.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-tam-118",
    "name": "Chennai",
    "state": "Tamil Nadu",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Chennai in Tamil Nadu.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-tam-119",
    "name": "Ooty",
    "state": "Tamil Nadu",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Ooty in Tamil Nadu.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-tam-120",
    "name": "Kodaikanal",
    "state": "Tamil Nadu",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Kodaikanal in Tamil Nadu.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-tam-121",
    "name": "Rameswaram",
    "state": "Tamil Nadu",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Rameswaram in Tamil Nadu.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-tam-122",
    "name": "Madurai",
    "state": "Tamil Nadu",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Madurai in Tamil Nadu.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-tam-123",
    "name": "Yercaud",
    "state": "Tamil Nadu",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Yercaud in Tamil Nadu.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-tel-124",
    "name": "Hyderabad",
    "state": "Telangana",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Hyderabad in Telangana.",
    "image": "https://img.freepik.com/premium-photo/firefly-air-flying-chicken-biryani-spicy-indian-hyderabadi-biryani-isolated-background_463801-1963.jpg?w=900"
  },
  {
    "id": "ext-tel-125",
    "name": "Warangal",
    "state": "Telangana",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Warangal in Telangana.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-tel-126",
    "name": "Nagarjuna Sagar",
    "state": "Telangana",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Nagarjuna Sagar in Telangana.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-tel-127",
    "name": "Ananthagiri Hills",
    "state": "Telangana",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Ananthagiri Hills in Telangana.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-tri-128",
    "name": "Agartala",
    "state": "Tripura",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Agartala in Tripura.",
    "image": "https://www.indiatravel.app/wp-content/uploads/2024/03/Neermahal-Palace-1024x585.jpg"
  },
  {
    "id": "ext-tri-129",
    "name": "Ujjayanta Palace",
    "state": "Tripura",
    "type": [
      "heritage"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Ujjayanta Palace in Tripura.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-tri-130",
    "name": "Neermahal",
    "state": "Tripura",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Neermahal in Tripura.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-tri-131",
    "name": "Unakoti",
    "state": "Tripura",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Unakoti in Tripura.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-utt-132",
    "name": "Agra",
    "state": "Uttar Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Agra in Uttar Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-utt-133",
    "name": "Varanasi",
    "state": "Uttar Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Varanasi in Uttar Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-utt-134",
    "name": "Ayodhya",
    "state": "Uttar Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Ayodhya in Uttar Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-utt-135",
    "name": "Lucknow",
    "state": "Uttar Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Lucknow in Uttar Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-utt-136",
    "name": "Prayagraj",
    "state": "Uttar Pradesh",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Prayagraj in Uttar Pradesh.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-utt-137",
    "name": "Nainital",
    "state": "Uttarakhand",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Nainital in Uttarakhand.",
    "image": "https://t3.ftcdn.net/jpg/08/41/49/72/360_F_841497224_Rt7XyrNl6o5o6J7wcA1W4yR5kmKPRm9I.jpg"
  },
  {
    "id": "ext-utt-138",
    "name": "Mussoorie",
    "state": "Uttarakhand",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Mussoorie in Uttarakhand.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-utt-139",
    "name": "Rishikesh",
    "state": "Uttarakhand",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Rishikesh in Uttarakhand.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-utt-140",
    "name": "Haridwar",
    "state": "Uttarakhand",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Haridwar in Uttarakhand.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-utt-141",
    "name": "Chopta",
    "state": "Uttarakhand",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Chopta in Uttarakhand.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-utt-142",
    "name": "Auli",
    "state": "Uttarakhand",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Auli in Uttarakhand.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-wes-143",
    "name": "Kolkata",
    "state": "West Bengal",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Kolkata in West Bengal.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-wes-144",
    "name": "Darjeeling",
    "state": "West Bengal",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Darjeeling in West Bengal.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-wes-145",
    "name": "Kalimpong",
    "state": "West Bengal",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Kalimpong in West Bengal.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-wes-146",
    "name": "Sundarbans",
    "state": "West Bengal",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Popular",
    "moods": [
      "Adventurous",
      "Romantic"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Sundarbans in West Bengal.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  },
  {
    "id": "ext-wes-147",
    "name": "Dooars",
    "state": "West Bengal",
    "type": [
      "city",
      "nature"
    ],
    "popularity": "Hidden",
    "moods": [
      "Happy",
      "Calm"
    ],
    "seasons": [
      "Winter",
      "Summer"
    ],
    "budget": "Medium",
    "description": "Experience the incredible beauty and culture of Dooars in West Bengal.",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
  }
];
