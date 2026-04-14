import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    image: {
      type: String,
      default: null,
    },
    preferredMood: {
      type: String,
      enum: ['Happy', 'Sad', 'Lonely', 'Romantic', 'Adventurous', 'Stressed', 'Calm', 'Excited', 'Spiritual'],
      default: null,
    },
    preferredSeason: {
      type: String,
      enum: ['Summer', 'Monsoon', 'Winter', 'Spring'],
      default: null,
    },
    preferredBudget: {
      type: String,
      enum: ['Low', 'Medium', 'Luxury'],
      default: 'Medium',
    },
    preferredTravelType: {
      type: String,
      enum: ['Solo', 'Couple', 'Friends', 'Family'],
      default: null,
    },
    preferredLandscape: {
      type: String,
      enum: ['Beach', 'Mountains', 'Desert', 'Forest', 'Hill Station', 'City', 'Backwaters'],
      default: null,
    },
    favoriteDestinations: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    moodHistory: [
      {
        mood: String,
        season: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    travelJournal: [
      {
        destination: String,
        entry: String,
        visitDate: Date,
        images: [String],
        rating: Number,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    plannedTrips: [
      {
        title: String,
        startDate: Date,
        endDate: Date,
        destinations: [String],
        notes: String,
      }
    ],
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, bufferCommands: false }
);

// Export the model, using existing one if available (common pattern in Next.js)
export default mongoose.models.User || mongoose.model('User', userSchema);
