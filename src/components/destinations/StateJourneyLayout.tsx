'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StateCard } from './StateCard';
import { getCardPosition } from '@/lib/cardPositions';
import { useRouter } from 'next/navigation';
import { StateInfo } from '@/data/statesData';
import { slugifyState } from '@/lib/slugify';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  states: StateInfo[];
  mood?: string | null;
}

interface CardRef {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const StateJourneyLayout: React.FC<Props> = ({ states, mood }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardsContainerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Columns for different screen sizes
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-10 px-4 scroll-mt-20 flex justify-center">
      {/* Cards Container */}
      <div 
        ref={cardsContainerRef}
        className={cn(
          "w-full max-w-6xl grid gap-y-24 relative z-10",
          mood ? "flex flex-wrap justify-center gap-x-8 md:gap-x-12 lg:gap-x-16" : [
            "grid gap-x-16",
            columns === 4 && "grid-cols-4",
            columns === 2 && "grid-cols-2",
            columns === 1 && "grid-cols-1"
          ]
        )}
      >
        {states.map((state, index) => {
          const { row, col, isReverse } = getCardPosition(index, columns);
          const isLast = index === states.length - 1;
          const isLastRowAlone = isLast && (states.length % columns === 1);
          
          return (
            <motion.div
              key={state.name}
              data-state-node={state.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05 }}
              style={!mood ? {
                gridRow: row + 1,
                gridColumn: isLastRowAlone ? (columns === 4 ? "2 / span 2" : (columns === 2 ? "1 / span 2" : "1")) : col + 1,
              } : {}}
              className="flex justify-center"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  rotateZ: isReverse ? -1 : 1,
                  boxShadow: "0 25px 50px -12px rgba(255, 77, 77, 0.4)"
                }}
                onClick={() => router.push(mood ? `/destinations/${state.slug}?mood=${mood}` : `/destinations/${state.slug}`)}
                className="relative group cursor-pointer w-full max-w-[320px]"
              >
                {/* Glow Background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                
                {/* Wrapped StateCard */}
                <div className="relative transform-gpu transition-all duration-300">
                   <StateCard 
                     state={state}
                     index={index}
                   />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StateJourneyLayout;
