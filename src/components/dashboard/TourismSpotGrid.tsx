'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getSpotsForMoodAndState,
  getSpotsForMood,
  getMoodConfig,
  STATES,
  TourismSpot,
  MoodId
} from '@/data/tourismData';
import { useMoodStore } from '@/store/moodStore';
import { useRouter } from 'next/navigation';

interface TourismSpotGridProps {
  spots?: TourismSpot[];
  moodId?: MoodId;
  stateId?: string;
  maxSpots?: number;
}

export const TourismSpotGrid: React.FC<TourismSpotGridProps> = ({
  spots: propSpots,
  moodId: propMoodId,
  stateId: propStateId,
  maxSpots = 9
}) => {
  const { selectedMood, selectedStateId } = useMoodStore();
  const router = useRouter();

  const moodId = propMoodId || selectedMood;
  const stateId = propStateId || selectedStateId;

  if (!moodId) return null;

  const spots = propSpots || (
    stateId
      ? getSpotsForMoodAndState(moodId, stateId)
      : getSpotsForMood(moodId).slice(0, maxSpots)
  );

  const moodConfig = getMoodConfig(moodId);
  const stateName = stateId
    ? STATES.find(s => s.id === stateId)?.name
    : null;

  const moodColors: Record<string, string> = {
    happy: 'bg-yellow-100 text-yellow-700',
    sad: 'bg-blue-100 text-blue-700',
    lonely: 'bg-purple-100 text-purple-700',
    romantic: 'bg-pink-100 text-pink-700',
    adventurous: 'bg-orange-100 text-orange-700',
    stressed: 'bg-teal-100 text-teal-700',
    calm: 'bg-emerald-100 text-emerald-700',
    excited: 'bg-fuchsia-100 text-fuchsia-700',
    spiritual: 'bg-amber-100 text-amber-700',
  };

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={`${selectedMood}-${selectedStateId}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              {stateName
                ? `🏛️ Top Destinations in ${stateName}`
                : `🌟 ${moodConfig?.label} Destinations Across India`}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {spots.length} destinations found for{' '}
              <span className="font-bold">{moodConfig?.label}</span> mood
              {stateName && ` in ${stateName}`}
            </p>
          </div>
          <a
            href="/destinations"
            className="text-xs font-black text-blue-600 hover:text-blue-700 px-4 py-2 border border-blue-200 rounded-xl hover:bg-blue-50 transition tracking-widest"
          >
            VIEW ALL →
          </a>
        </div>

        {spots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {spots.map((spot, i) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/destinations/${spot.id}`)}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://source.unsplash.com/600x400/?india,${spot.name}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1.5 rounded-xl">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-white text-xs font-black">{spot.rating.toFixed(1)}</span>
                    <span className="text-white/60 text-[10px]">({(spot.reviews / 1000).toFixed(1)}k)</span>
                  </div>

                  {/* Price Range */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                    <span className="text-xs font-black text-gray-800">{spot.priceRange}</span>
                  </div>

                  {/* Location */}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/30">
                      📍 {spot.state}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-black text-base text-gray-900">{spot.name}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-xs whitespace-nowrap">
                      🕒 {spot.duration}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{spot.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {spot.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                        {tag}
                      </span>
                    ))}
                    {spot.moods.map(m => (
                      <span key={m} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${moodColors[m] || 'bg-gray-100 text-gray-600'}`}>
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </span>
                    ))}
                  </div>

                  {/* Best Time + CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-medium">
                      🌤 {spot.bestTime}
                    </span>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl transition tracking-widest">
                      EXPLORE →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-gray-400"
          >
            <span className="text-6xl block mb-4">🔍</span>
            <p className="font-black text-lg text-gray-600">No destinations found</p>
            <p className="text-sm mt-2">Try selecting a different state or mood</p>
          </motion.div>
        )}
      </motion.section>
    </AnimatePresence>
  );
};
