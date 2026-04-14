'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStatesForMood, getMoodConfig, StateInfo, MoodId } from '@/data/tourismData';
import { useMoodStore } from '@/store/moodStore';

interface StateRecommendationsProps {
  states?: StateInfo[];
  moodId?: MoodId;
}

export const StateRecommendations: React.FC<StateRecommendationsProps> = ({
  states: propStates,
  moodId: propMoodId
}) => {
  const { selectedMood, selectedStateId, setState } = useMoodStore();

  const moodId = propMoodId || selectedMood;
  const states = propStates || (moodId ? getStatesForMood(moodId) : []);

  if (!moodId || states.length === 0) return null;

  const moodConfig = getMoodConfig(moodId);

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={selectedMood}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.45 }}
      >
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${moodConfig?.gradient} flex items-center justify-center text-xl shadow-md`}>
            {moodConfig?.emoji}
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              Best States for Your{' '}
              <span className={`bg-gradient-to-r ${moodConfig?.gradient} bg-clip-text text-transparent`}>
                {moodConfig?.label}
              </span>{' '}
              Mood
            </h2>
            <p className="text-sm text-gray-500">Select a state to discover top destinations</p>
          </div>
        </div>

        {/* State Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {states.map((state, i) => {
            const isSelected = selectedStateId === state.id;

            return (
              <motion.div
                key={state.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                onClick={() => setState(isSelected ? null : state.id)}
                className={`cursor-pointer rounded-2xl overflow-hidden group border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-blue-500 shadow-xl shadow-blue-500/20'
                    : 'border-transparent shadow-md hover:shadow-lg'
                }`}
              >
                {/* State Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={state.image}
                    alt={state.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://source.unsplash.com/600x400/?india,${state.name}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Selected overlay */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-blue-600/20 flex items-center justify-center"
                    >
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-blue-600 text-lg">✓</span>
                      </div>
                    </motion.div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-white font-black text-lg">{state.name}</h3>
                    <p className="text-white/70 text-xs">{state.tagline}</p>
                  </div>
                </div>

                {/* State Info */}
                <div className="p-4 bg-white">
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{state.tourismHighlight}</p>
                  <button
                    className={`w-full py-2 text-xs font-black rounded-xl transition-all tracking-widest ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected ? '✓ SELECTED' : 'EXPLORE →'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </AnimatePresence>
  );
};
