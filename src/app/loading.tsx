'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="inline-block"
        >
          <div className="text-6xl">🇮🇳</div>
        </motion.div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">India Travel</h1>
          <p className="text-gray-600 font-medium">Loading your adventure...</p>
        </div>

        {/* Loading Skeleton Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-12 px-4 max-w-7xl mx-auto">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl"
            />
          ))}
        </div>

        {/* Loading Bar */}
        <motion.div
          className="w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden"
        >
          <motion.div
            animate={{ x: [-200, 200] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
