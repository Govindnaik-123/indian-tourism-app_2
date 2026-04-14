import React from 'react';

interface FiltersProps {
  states: string[];
  activeState: string;
  onStateChange: (state: string) => void;
  activeMood: string;
  onMoodChange: (mood: string) => void;
  activePopularity: string;
  onPopularityChange: (pop: string) => void;
}

const MOODS = ['Happy', 'Sad', 'Lonely', 'Romantic', 'Adventurous', 'Stressed', 'Calm', 'Excited', 'Spiritual'];

export const Filters: React.FC<FiltersProps> = ({ 
  states, activeState, onStateChange, 
  activeMood, onMoodChange, 
  activePopularity, onPopularityChange 
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 z-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* State Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">Filter By State</label>
          <select 
            value={activeState} 
            onChange={e => onStateChange(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-gray-900 transition-all appearance-none"
          >
            <option value="">All Regions of India</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Mood Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">Travel Mood</label>
          <select 
            value={activeMood} 
            onChange={e => onMoodChange(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 font-medium text-gray-900 transition-all appearance-none"
          >
            <option value="">Any Mood</option>
            {MOODS.map(mood => (
              <option key={mood} value={mood}>{mood}</option>
            ))}
          </select>
        </div>

        {/* Popularity Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">Discovery Type</label>
          <div className="flex bg-gray-100 p-1 rounded-xl h-[46px]">
            <button 
              onClick={() => onPopularityChange('')}
              className={`flex-1 text-sm font-bold rounded-lg transition-all ${activePopularity === '' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              All
            </button>
            <button 
              onClick={() => onPopularityChange('Popular')}
              className={`flex-1 text-sm font-bold rounded-lg transition-all ${activePopularity === 'Popular' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Popular
            </button>
            <button 
              onClick={() => onPopularityChange('Hidden')}
              className={`flex-1 text-sm font-bold rounded-lg transition-all ${activePopularity === 'Hidden' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Hidden Gems
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
