'use client';

import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface DestinationCardProps {
  name: string;
  slug: string;
  image: string;
  landscape: string[];
  season: string[];
  description: string;
  rating: number;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  name,
  slug,
  image,
  landscape,
  season,
  description,
  rating,
  isFavorite = false,
  onToggleFavorite,
}) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group h-full"
    >
      <Link href={`/destinations/${slug}`}>
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col cursor-pointer border border-gray-100">
          {/* Image Section */}
          <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3C/svg%3E"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
            

            {/* Rating Badge */}
            <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="font-bold text-gray-800">{rating.toFixed(1)}</span>
            </div>

            {/* Season Tags */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {season.slice(0, 2).map((s) => (
                <span key={s} className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-bold text-2xl text-gray-900 mb-2 group-hover:text-blue-600 transition">
              {name}
            </h3>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1 leading-relaxed">
              {description}
            </p>

            {/* Landscape Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {landscape.map((l) => (
                <motion.span
                  key={l}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200"
                >
                  {l}
                </motion.span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Explore →
              </div>
              <div className="flex items-center gap-2">
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
