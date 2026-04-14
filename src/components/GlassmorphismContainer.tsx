'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface GlassmorphismContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassmorphismContainer: React.FC<GlassmorphismContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
      className={`rounded-2xl bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};
