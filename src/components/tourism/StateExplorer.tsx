'use client';

import React, { useState, useMemo } from 'react';
import { Destination } from '@/data/indiaDestinations';
import { groupDestinationsByState } from '@/lib/groupByState';
import { DestinationCard } from './DestinationCard';
import { Filters } from './Filters';
import { Info } from 'lucide-react';

interface Props {
  initialDestinations: Destination[];
}

export const StateExplorer: React.FC<Props> = ({ initialDestinations }) => {
  const [activeState, setActiveState] = useState('');
  const [activeMood, setActiveMood] = useState('');
  const [activePopularity, setActivePopularity] = useState('');

  // Memoize states list extracted from raw data
  const allStates = useMemo(() => {
    const statesSet = new Set(initialDestinations.map(d => d.state));
    return Array.from(statesSet).sort();
  }, [initialDestinations]);

  // Client-side filtering implementation matching API rules
  const filteredDestinations = useMemo(() => {
    return initialDestinations.filter(d => {
      if (activeState && d.state !== activeState) return false;
      if (activeMood && !d.moods.includes(activeMood)) return false;
      if (activePopularity && d.popularity !== activePopularity) return false;
      return true;
    });
  }, [initialDestinations, activeState, activeMood, activePopularity]);

  const grouped = useMemo(() => groupDestinationsByState(filteredDestinations), [filteredDestinations]);
  const displayStates = Object.keys(grouped).sort();

  return (
    <div className="w-full">
      <Filters 
        states={allStates}
        activeState={activeState}
        onStateChange={setActiveState}
        activeMood={activeMood}
        onMoodChange={setActiveMood}
        activePopularity={activePopularity}
        onPopularityChange={setActivePopularity}
      />

      {displayStates.length === 0 ? (
        <div className="bg-white/50 backdrop-blur border border-dashed border-gray-300 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4"><Info className="w-8 h-8" /></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Destinations Found</h3>
          <p className="text-gray-500 max-w-sm">Try adjusting your filters to discover more beautiful places in India.</p>
          <button 
            onClick={() => { setActiveState(''); setActiveMood(''); setActivePopularity(''); }}
            className="mt-6 text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          {displayStates.map(stateName => (
            <div key={stateName}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-black text-gray-900">{stateName}</h2>
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{grouped[stateName].length} Destinations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {grouped[stateName].map(dest => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
