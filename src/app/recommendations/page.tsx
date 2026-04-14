'use client';

import React, { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { extendedDestinations } from '@/data/indiaDestinations';
import { motion } from 'framer-motion';
import { MOODS } from '@/data/tourismData';

function RecommendationsContent() {
  const searchParams = useSearchParams();
  const moodId = searchParams.get('mood');

  // Find the mood config for styling and labels
  const moodConfig = useMemo(() => 
    MOODS.find(m => m.id === moodId), 
    [moodId]
  );

  // Filter destinations by mood
  const filteredDestinations = useMemo(() => {
    if (!moodId) return [];
    return extendedDestinations.filter(d => 
      d.moods?.some(m => m.toLowerCase() === moodId.toLowerCase())
    );
  }, [moodId]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {moodConfig && (
              <span className="inline-block text-5xl mb-4">{moodConfig.emoji}</span>
            )}
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 capitalize">
              {moodId ? `${moodId} Escapes` : 'Your Recommendations'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {moodConfig 
                ? `We've handpicked these destinations because they perfectly match your ${moodId} mood.`
                : "Discover the best of India based on your current state of mind."}
            </p>
          </motion.div>
        </section>

        {/* Results Grid */}
        <section className="max-w-7xl mx-auto px-6">
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDestinations.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <span className="text-6xl mb-4 block">🔍</span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No matches found</h2>
              <p className="text-gray-500">Try selecting a different mood to discover more places.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function RecommendationsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    }>
      <RecommendationsContent />
    </Suspense>
  );
}
