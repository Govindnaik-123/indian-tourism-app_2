'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Destination } from '@/data/indiaDestinations';
import Link from 'next/link';
import { slugifyDestination } from '@/lib/slugify';

import Image from 'next/image';
import { getSmartImage } from '@/lib/getSmartImage';
import { getImageByPlace, FALLBACK_IMAGE } from '@/lib/getImage';

interface Props {
  destination: Destination;
}

export const DestinationCard: React.FC<Props> = ({ destination }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const imageUrl = useMemo(
    () => getSmartImage(destination.name, destination.state),
    [destination.name, destination.state]
  );

  return (
    <Link href={`/destinations/${slugifyDestination(destination.name)}`} className="block h-full group">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col h-full group"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {/* Skeleton Loader Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10 animate-pulse bg-gray-200" />
        )}
        
        <Image
          src={imageUrl} 
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8Xw8AAmoBf9/V960AAAAASUVORK5CYII=" // Light gray placeholder
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          {/* Popular Badge for dynamic highlighting */}
          {destination.popularity === 'Popular' && (
            <span className="bg-orange-500 text-white px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider shadow-lg">
              Popular
            </span>
          )}
          <span className={`px-2 py-1 text-[10px] font-black rounded-full uppercase tracking-wider text-white ${destination.popularity === 'Hidden' ? 'bg-purple-600/80 shadow-purple-500/50' : 'bg-blue-600/80 shadow-blue-500/50'} backdrop-blur-sm`}>
            {destination.popularity === 'Hidden' ? '💎 Hidden Gem' : '🔥 Trending'}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-1">
          {destination.type.slice(0, 1).map(type => (
            <span key={type} className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold rounded-md uppercase tracking-wider border border-white/20">
              {type}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-black text-gray-900 leading-tight mb-2">{destination.name}</h3>
        <p className="text-sm text-gray-600 flex-1 line-clamp-3 leading-relaxed">{destination.description}</p>
      </div>
    </motion.div>
    </Link>
  );
};
