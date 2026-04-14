'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getSmartImage } from '@/lib/getSmartImage';

interface DestinationCardProps {
  id: number | string;
  name: string;
  slug: string;
  state: string;
  region?: string;
  heroImage: string;
  description: string;
  rating?: number;
  moodMatch?: string[];
  tags?: string[];
  variant?: 'default' | 'compact' | 'trending';
  index?: number;
}

const moodColors: Record<string, string> = {
  Happy: 'bg-yellow-100 text-yellow-700',
  Romantic: 'bg-pink-100 text-pink-700',
  Adventurous: 'bg-red-100 text-red-700',
  Peaceful: 'bg-green-100 text-green-700',
  Spiritual: 'bg-orange-100 text-orange-700',
  Calm: 'bg-blue-100 text-blue-700',
  Nature: 'bg-emerald-100 text-emerald-700',
  Cultural: 'bg-purple-100 text-purple-700',
};

export const DestinationCard: React.FC<DestinationCardProps> = ({
  id,
  name,
  slug,
  state,
  region,
  heroImage,
  description,
  rating = 4.5,
  moodMatch = [],
  variant = 'default',
  index = 0,
}) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const imageUrl = useMemo(
    () => getSmartImage(name, state),
    [name, state]
  );

  if (variant === 'trending') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="flex-shrink-0 w-52 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 cursor-pointer group"
        onClick={() => router.push(`/destinations/${slug}`)}
      >
        <div className="relative h-32 w-full overflow-hidden bg-gray-100">
          {!isLoaded && (
            <div className="absolute inset-0 z-10 animate-pulse bg-gray-200" />
          )}
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
            onLoad={() => setIsLoaded(true)}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8Xw8AAmoBf9/V960AAAAASUVORK5CYII="
          />
          {/* Visual depth overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-3 right-3">
            <p className="text-white font-black text-sm truncate">{name}</p>
            <p className="text-white/70 text-[10px]">{state}</p>
          </div>

          <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
              <span className="text-yellow-400 text-[10px]">★</span>
              <span className="text-white text-[10px] font-bold">{rating}</span>
            </div>
          </div>
          <div className="absolute top-2 left-2 z-10">
            {rating >= 4.8 && (
              <span className="bg-orange-500 text-white px-2 py-0.5 text-[10px] font-black rounded uppercase tracking-wider shadow-lg">
                Popular
              </span>
            )}
          </div>
        </div>
        <div className="p-3">
          <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
        </div>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ y: -2 }}
        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all"
        onClick={() => router.push(`/destinations/${slug}`)}
      >
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <Image 
            src={imageUrl} 
            alt={name} 
            fill 
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-sm text-gray-800 truncate">{name}</p>
          <p className="text-xs text-gray-500">{state}</p>
        </div>
        <span className="text-xs text-blue-600 font-bold">→</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 cursor-pointer group"
      onClick={() => router.push(`/destinations/${slug}`)}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {!isLoaded && (
          <div className="absolute inset-0 z-10 animate-pulse bg-gray-200" />
        )}
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
          onLoad={() => setIsLoaded(true)}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8Xw8AAmoBf9/V960AAAAASUVORK5CYII="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 z-10">
          <span className="text-yellow-400 text-[10px]">★</span>
          <span className="text-white text-[10px] font-black">{rating}</span>
        </div>

        {/* State badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full border border-white/30">
            📍 {state}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-black text-base text-gray-900 mb-1">{name}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{description}</p>

        {/* Mood tags */}
        {moodMatch.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {moodMatch.slice(0, 3).map(mood => (
              <span
                key={mood}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${moodColors[mood] || 'bg-gray-100 text-gray-600'}`}
              >
                {mood}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-colors tracking-widest">
          EXPLORE →
        </button>
      </div>
    </motion.div>
  );
};
