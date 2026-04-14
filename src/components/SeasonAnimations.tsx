'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export const RainAnimation: React.FC = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-400 opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            width: '2px',
            height: '10px',
            borderRadius: '50%',
          }}
          animate={{
            y: [-(Math.random() * 100), height + 100],
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export const SnowAnimation: React.FC = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            opacity: 0.8,
          }}
          animate={{
            y: [-(Math.random() * 100), height + 100],
            x: Math.sin(Math.random() * Math.PI) * 100,
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export const SunnyGlowAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export const FlowersAnimation: React.FC = () => {
  const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷'];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          {flowers[Math.floor(Math.random() * flowers.length)]}
        </motion.div>
      ))}
    </div>
  );
};
