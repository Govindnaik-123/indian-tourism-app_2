'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  lat: number;
  lon: number;
  title: string;
}

export const LocationMap: React.FC<LocationMapProps> = ({ lat, lon, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Using a robust embed method that doesn't strictly depend on a valid API key for simple viewing
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lon}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-black text-xl text-gray-800">Location Details</h3>
          <p className="text-sm font-semibold text-gray-500">Explore {title} on the map</p>
        </div>
      </div>

      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        )}
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoading(false)}
          className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        ></iframe>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500 font-semibold bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="flex flex-col">
          <span className="uppercase tracking-widest text-[10px] text-gray-400 mb-1">Coordinates</span>
          <span>{lat.toFixed(4)}° N, {lon.toFixed(4)}° E</span>
        </div>
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
        >
          Open in Maps
        </a>
      </div>
    </motion.div>
  );
};
