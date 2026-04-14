import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Destination } from '@/data/indiaDestinations';
import Link from 'next/link';
import Image from 'next/image';
import { getSmartImage } from '@/lib/getSmartImage';

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
    <Link href={`/destinations/${destination.id}`} className="block h-full group">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
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
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8Xw8AAmoBf9/V960AAAAASUVORK5CYII="
        />
        {/* Elegant visual depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {destination.popularity === 'Popular' && (
            <span className="bg-orange-500 text-white px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider shadow-lg">
              Popular
            </span>
          )}
          <span className={`px-2 py-1 text-xs font-bold rounded-full backdrop-blur-md text-white ${destination.popularity === 'Hidden' ? 'bg-purple-600/80 shadow-purple-500/50' : 'bg-blue-600/80 shadow-blue-500/50'} shadow-lg`}>
            {destination.popularity === 'Hidden' ? '💎 Hidden Gem' : '🔥 Popular'}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-1 flex-wrap justify-end max-w-[50%]">
          {destination.moods.slice(0, 2).map(mood => (
            <span key={mood} className="px-2 py-1 bg-white/90 text-gray-800 text-[10px] font-bold rounded-full uppercase tracking-wider">
              {mood}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-black text-gray-900 leading-tight">{destination.name}</h3>
            <p className="text-sm font-medium text-gray-500 flex items-center gap-1">📍 {destination.state}</p>
          </div>
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">{destination.budget} Budget</span>
        </div>
        
        <p className="text-sm text-gray-600 mt-2 flex-1 line-clamp-3 leading-relaxed">{destination.description}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-500">
          <div className="flex items-center gap-1">
            <span>🌦️</span> {destination.seasons.slice(0, 2).join(', ')}
          </div>
          <div className="flex gap-1">
            {destination.type.slice(0, 2).map((t, idx) => (
              <span key={idx} className="bg-gray-100 px-2 py-1 rounded capitalize">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  );
};
