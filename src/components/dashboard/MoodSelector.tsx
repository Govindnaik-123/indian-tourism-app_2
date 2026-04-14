'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MOODS, MoodId } from '@/data/tourismData';
import { useMoodStore } from '@/store/moodStore';

import { checkUserAuth } from '@/lib/checkAuth';

interface MoodSelectorProps {
  onMoodSelect?: (moodId: MoodId) => void;
  navigateToDiscovery?: boolean;
  showDescription?: boolean;
  title?: string;
  subtitle?: string;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  onMoodSelect,
  navigateToDiscovery = false,
  showDescription = true,
  title = "Choose Your Travel Mood",
  subtitle = "Tell us how you feel and we will find perfect destinations for you"
}) => {
  const { selectedMood, setMood } = useMoodStore();
  const router = useRouter();

  const handleMoodClick = async (moodId: MoodId) => {
    // 1. Check if user is authenticated
    const isLoggedIn = await checkUserAuth();

    if (!isLoggedIn) {
      // 2. Redirect to login with callback URL
      router.push(`/login?redirect=/recommendations?mood=${moodId}`);
      return;
    }

    // 3. Navigate to recommendations if logged in
    router.push(`/recommendations?mood=${moodId}`);
  };

  return (
    <section className="py-2">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
        {MOODS.map((mood, i) => {
          const isSelected = selectedMood === mood.id;
          return (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleMoodClick(mood.id as MoodId)}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 group ${
                isSelected
                  ? `bg-gradient-to-br ${mood.gradient} border-transparent text-white shadow-xl ${mood.glowColor} shadow-lg`
                  : `bg-white ${mood.bgLight} hover:shadow-md`
              }`}
            >
              {/* Glow ring when selected */}
              {isSelected && (
                <motion.div
                  layoutId="moodGlow"
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${mood.gradient} opacity-20 blur-md`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                />
              )}

              <span className="text-3xl relative z-10">{mood.emoji}</span>
              <span className={`text-xs font-black tracking-wide relative z-10 ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                {mood.label}
              </span>
              {showDescription && (
                <span className={`text-[9px] text-center leading-tight relative z-10 hidden sm:block ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                  {mood.description}
                </span>
              )}

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center"
                >
                  <span className="text-[8px]">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
