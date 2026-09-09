# 🇮🇳 IndianTravel - AI-Powered Tourism Recommendation Platform

An emotion-driven, AI-powered web application that recommends Indian tourism destinations based on user's emotional mood, current season, budget preferences, and travel style.

## 🌟 Key Features

### 1. **Emotion-Based Recommendations**
- 9 mood categories: Happy, Sad, Lonely, Romantic, Adventurous, Stressed, Calm, Excited, Spiritual
- AI algorithm matches moods with perfect destinations
- Dynamic UI that changes colors based on selected mood

### 2. **Season-Aware Travel Planning**
- Intelligent seasonal recommendations
- Beautiful animations: Rain (Monsoon), Snow (Winter), Sunny glow (Summer), Flowers (Spring)
- Best visit months for each destination

### 3. **Comprehensive Destination Information**
- 14 handpicked Indian destinations
- 3-day itineraries for each location
- Detailed budget breakdowns (Low/Medium/Luxury)
- Local food recommendations
- Safety ratings & sustainability scores
- Nearby attractions, cultural highlights
- Weather information & local travel tips

### 4. **Secure Authentication**
- Email/Password registration and login
- JWT-based session management
- Bcrypt password hashing
- User profile management
- Saved favorites & travel history

### 5. **Interactive User Dashboard**
- Personalized welcome message
- User preferences at a glance
- Favorite destinations tracking
- Quick access to recommendations

### 6. **Responsive Design**
- Mobile-first approach
- Glassmorphism UI components
- Smooth Framer Motion animations
- Dark/Light mode toggle
- PWA-ready (installable as app)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB

### Installations

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   # .env.local
   MONGODB_URI=mongodb://localhost:27017/indian-tourism
   JWT_SECRET=your_secret_key
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages & API routes
├── components/            # React components
├── lib/                   # Utility functions
├── models/                # MongoDB schemas
├── store/                 # Zustand state management
├── data/                  # Static destination data
└── middleware/            # API middleware
```

## 🌍 Featured Destinations

- **Beaches:** Goa, Andaman & Nicobar Islands, Gokarna
- **Mountains:** Manali, Leh Ladakh, Auli
- **Hill Stations:** Munnar, Ooty, Coorg
- **Spiritual:** Varanasi, Rishikesh
- **Desert:** Jaisalmer
- **Backwaters:** Alleppey
- **Cities:** Jaipur

## 🛠️ Tech Stack

- **Frontend:** Next.js 14+, React 18+, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Next.js API Routes
- **Database:** MongoDB
- **Authentication:** JWT, Bcrypt
- **State Management:** Zustand

## 📖 Documentation

Full documentation available in [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🚀 Deployment

Deploy on Vercel with one click:
- Connect GitHub repo
- Set environment variables
- Deploy!

## 📞 Support

For issues and questions, please open an issue on GitHub.

**Made with ❤️ to explore incredible India! 🇮🇳✈️**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
