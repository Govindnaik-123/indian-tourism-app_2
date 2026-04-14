'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface MoodExplanationProps {
  mood: string;
  explanation: string;
  benefits: string[];
  color?: string; // Kept for logic but overridden by Culture style
}

export default function MoodExplanation({ mood, explanation, benefits }: MoodExplanationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto px-4 py-8 relative z-10"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Main Mood Card - Optimized for Visibility */}
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 md:p-8 shadow-xl border border-orange-100 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-orange-200/20 rounded-full blur-2xl"></div>
          <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-yellow-200/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
            {/* Title & Narrative Column */}
            <div className="lg:col-span-3 text-left">
              <h2 className="text-3xl font-black text-gray-800 mb-4 tracking-tight uppercase underline decoration-orange-400 decoration-4 underline-offset-4">
                Why <span className="text-orange-600">{mood}</span> fits these Journeys
              </h2>
              
              <p className="text-xl text-gray-700 leading-relaxed font-semibold italic whitespace-pre-line">
                "{explanation}"
              </p>
            </div>

            {/* Benefits Column - Now on the side on large screens to save height */}
            <div className="lg:col-span-1 flex flex-col gap-3 justify-center border-l border-orange-200/50 pl-8">
               <h3 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-1">Key Benefits</h3>
               {benefits.map((benefit, index) => (
                 <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">{benefit}</span>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
