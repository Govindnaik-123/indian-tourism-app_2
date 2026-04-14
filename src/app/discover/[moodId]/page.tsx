'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StateRecommendations } from '@/components/dashboard/StateRecommendations';
import { TourismSpotGrid } from '@/components/dashboard/TourismSpotGrid';
import { MOODS, STATES, TOURISM_SPOTS, MoodId } from '@/data/tourismData';
import { useAuthStore } from '@/store/authStore';

export default function MoodDiscoveryPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [moodData, setMoodData] = useState<any>(null);

  const moodId = params.moodId as MoodId;

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }

    const mood = MOODS.find(m => m.id === moodId);
    if (!mood) {
      router.push('/');
      return;
    }

    setMoodData(mood);
  }, [moodId, user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm font-bold text-gray-500">Loading your mood discovery...</p>
        </div>
      </div>
    );
  }

  if (!user || !moodData) return null;

  // Filter states and spots for this mood
  const moodStates = STATES.filter(state => state.moods.includes(moodId));
  const moodSpots = TOURISM_SPOTS.filter(spot => spot.moods.includes(moodId));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="pt-20 pb-12">
        {/* Hero Section */}
        <section className="relative py-16 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="text-6xl">{moodData.emoji}</span>
                <div className={`px-6 py-2 rounded-full bg-gradient-to-r ${moodData.gradient} text-white font-bold text-lg shadow-lg`}>
                  {moodData.label} Mood
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Discover Your Perfect
                <span className={`block bg-gradient-to-r ${moodData.gradient} bg-clip-text text-transparent`}>
                  {moodData.label} Destinations
                </span>
              </h1>

              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                {moodData.description}. We've curated the best destinations in India that match your current mood and travel preferences.
              </p>
            </motion.div>
          </div>
        </section>

        {/* States Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                Best States for Your {moodData.label} Mood
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore these handpicked states that perfectly align with your {moodData.label.toLowerCase()} vibe
              </p>
            </motion.div>

            <StateRecommendations states={moodStates} />
          </div>
        </section>

        {/* Destinations Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                Curated {moodData.label} Destinations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Handpicked spots that will make your {moodData.label.toLowerCase()} journey unforgettable
              </p>
            </motion.div>

            <TourismSpotGrid spots={moodSpots} />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}