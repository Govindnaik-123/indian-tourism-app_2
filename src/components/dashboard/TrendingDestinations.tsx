'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { DestinationCard } from './DestinationCard';
import { DESTINATIONS } from '@/data/destinations';

interface TrendingDestinationsProps {
  searchQuery?: string;
}

const TRENDING_IDS = [1, 5, 8, 12, 15, 18, 20, 2]; // Handpicked trending spots

export const TrendingDestinations: React.FC<TrendingDestinationsProps> = ({ searchQuery = '' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const trending = DESTINATIONS.filter(d =>
    TRENDING_IDS.includes(d.id) ||
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.state.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 12);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -220 : 220, behavior: 'smooth' });
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-black text-gray-900">🔥 Trending Now</h2>
          <p className="text-sm text-gray-500 mt-0.5">Most visited destinations this season</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {trending.map((dest, i) => (
          <DestinationCard
            key={dest.id}
            id={dest.id}
            name={dest.name}
            slug={dest.slug}
            state={dest.state}
            heroImage={dest.heroImage}
            description={dest.description}
            rating={4.2 + (i % 4) * 0.2}
            moodMatch={dest.moodMatch}
            variant="trending"
            index={i}
          />
        ))}
      </div>
    </section>
  );
};
