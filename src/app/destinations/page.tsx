'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { STATES } from '@/data/statesData';
import { MOODS } from '@/data/destinations';
import StateJourneyLayout from '@/components/destinations/StateJourneyLayout';
import StateNetworkGraph from '@/components/destinations/StateNetworkGraph';
import MoodExplanation from '@/components/destinations/MoodExplanation';

export default function DestinationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, isInitialized } = useAuthStore();
  const mood = searchParams.get('mood');
  
  // Find mood details for the explanation card
  const moodDetail = MOODS.find(m => m.type === mood);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace(`/login?redirect=/destinations${mood ? `?mood=${mood}` : ''}`);
    }
  }, [isAuthenticated, isInitialized, router, mood]);

  // If still loading, not initialized, or not authenticated, show a loader
  if (isLoading || !isInitialized || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#364d59] font-bold tracking-widest animate-pulse">VERIFYING ACCESS...</p>
        </div>
      </div>
    );
  }

  // Filter states based on mood if present
  const filteredStates = mood
    ? STATES.filter((state) => state.moods?.includes(mood))
    : STATES;
  
  // We use the full set of states for the journey
  const journeyStates = [...filteredStates];
  
  // Custom sorting to ensure a specific journey flow if needed
  // For now, we'll follow the order in statesData.ts which is alphabetical
  // but the walkthrough mentions West Bengal at the end.
  const wbIndex = journeyStates.findIndex(s => s.name === "West Bengal");
  if (wbIndex !== -1) {
    const [wb] = journeyStates.splice(wbIndex, 1);
    journeyStates.push(wb);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Back to Mood Selection Button */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.button
            onClick={() => router.push('/')}
            whileTap={{ scale: 0.98 }}
            className="relative group flex items-center justify-center gap-3 px-8 py-3 border border-[#1f3340] bg-white text-[#1f3340] font-semibold overflow-hidden transition-all duration-300 hover:border-transparent"
            style={{
              minWidth: '160px',
              letterSpacing: '0.05em',
            }}
          >
            {/* Hover fill effect */}
            <div className="absolute inset-0 bg-[#1f3340] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></div>
            
            {/* Content wrapper for z-index */}
            <div className="relative flex items-center justify-center gap-3 z-10 text-base group-hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span>BACK</span>
            </div>
          </motion.button>
          
          {mood && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-gray-600 font-medium"
            >
              Currently filtering: <span className="text-gray-900 font-bold text-base">{mood}</span>
            </motion.p>
          )}
        </div>
      </section>

      {/* Mood Explanation Section */}
      {mood && moodDetail && (
        <MoodExplanation 
          mood={mood}
          explanation={moodDetail.explanation || ''}
          benefits={moodDetail.benefits || []}
          color={moodDetail.color}
        />
      )}

      {/* Journey Section */}
      <section className="bg-white">
        <StateJourneyLayout states={journeyStates as any} mood={mood} />
      </section>

      <Footer />
    </main>
  );
}
