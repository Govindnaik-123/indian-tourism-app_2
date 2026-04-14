'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DestinationCard } from './DestinationCard';
import { DESTINATIONS } from '@/data/destinations';

interface RecommendationSectionProps {
  selectedMood: string;
  searchQuery?: string;
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  selectedMood,
  searchQuery = '',
}) => {
  const filtered = DESTINATIONS.filter(d => {
    const matchesMood = selectedMood === 'all' || d.moodMatch?.includes(selectedMood);
    const matchesSearch =
      !searchQuery ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMood && matchesSearch;
  }).slice(0, 6);

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-black text-gray-900">
            {selectedMood === 'all' ? '🌟 Recommended For You' : `✨ ${selectedMood} Destinations`}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : selectedMood === 'all'
              ? 'Curated picks based on India\'s top experiences'
              : `Best spots for a ${selectedMood.toLowerCase()} journey`}
          </p>
        </div>
        <a
          href="/destinations"
          className="text-xs font-black text-blue-600 hover:text-blue-700 transition tracking-widest border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50"
        >
          VIEW ALL →
        </a>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((dest, i) => (
            <DestinationCard
              key={dest.id}
              id={dest.id}
              name={dest.name}
              slug={dest.slug}
              state={dest.state}
              heroImage={dest.heroImage}
              description={dest.description}
              rating={4.2 + (i % 5) * 0.15}
              moodMatch={dest.moodMatch}
              variant="default"
              index={i}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-gray-400"
        >
          <span className="text-5xl block mb-3">🔍</span>
          <p className="font-bold text-sm">No destinations found</p>
          <p className="text-xs mt-1">Try a different mood or search term</p>
        </motion.div>
      )}
    </section>
  );
};
