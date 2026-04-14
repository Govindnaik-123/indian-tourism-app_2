import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    state: String,
    region: String,
    latitude: Number,
    longitude: Number,
    description: String,
    longDescription: String,
    heroImage: String,
    gallery: [String],
    bestTimeToVisit: [String], // e.g., ['October', 'November', 'December']
    season: {
      type: [String],
      enum: ['Summer', 'Monsoon', 'Winter', 'Spring'],
    },
    moodMatch: {
      type: [String],
      enum: ['Happy', 'Sad', 'Lonely', 'Romantic', 'Adventurous', 'Stressed', 'Calm', 'Excited', 'Spiritual'],
    },
    landscape: {
      type: [String],
      enum: ['Beach', 'Mountains', 'Desert', 'Forest', 'Hill Station', 'City', 'Backwaters'],
    },
    budget: {
      low: {
        daily: Number,
        description: String,
      },
      medium: {
        daily: Number,
        description: String,
      },
      luxury: {
        daily: Number,
        description: String,
      },
    },
    itinerary: {
      day1: String,
      day2: String,
      day3: String,
    },
    nearbyAttractions: [
      {
        name: String,
        distance: String,
        description: String,
      },
    ],
    localFood: [
      {
        name: String,
        description: String,
        whereToTry: String,
      },
    ],
    culturalHighlights: [String],
    weatherInfo: {
      summer: String,
      monsoon: String,
      winter: String,
      spring: String,
    },
    safetyRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    sustainabilityScore: {
      type: Number,
      min: 1,
      max: 5,
    },
    crowdLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
    },
    localLanguages: [String],
    travelTips: [String],
    mapsUrl: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        userName: String,
        rating: Number,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true, bufferCommands: true }
);

export default mongoose.models.Destination || mongoose.model('Destination', destinationSchema);
