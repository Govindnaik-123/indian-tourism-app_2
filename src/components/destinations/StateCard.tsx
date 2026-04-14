'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { StateInfo } from '@/data/statesData';

interface StateCardProps {
  state: StateInfo;
  index?: number;
}

export const StateCard: React.FC<StateCardProps> = ({ state, index = 0 }) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fallbackImage =
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&h=500&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer group transition-shadow duration-300 border border-gray-100"
      onClick={() => router.push(`/destinations/${state.slug}`)}
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        {/* Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
        )}

        <Image
          src={imgError ? fallbackImage : state.image}
          alt={state.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setImgError(true);
            setIsLoaded(true);
          }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8Xw8AAmoBf9/V960AAAAASUVORK5CYII="
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />




        {/* State name on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg font-black leading-tight drop-shadow-lg">
            {state.name}
          </h3>
          <p className="text-white/80 text-xs mt-0.5 line-clamp-1 drop-shadow">
            {state.description}
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-3">
          {state.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5">
          {state.highlights.map((h) => (
            <span
              key={h}
              className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100"
            >
              📍 {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
