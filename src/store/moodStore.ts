import { create } from 'zustand';
import { MoodId } from '@/data/tourismData';

interface MoodState {
  selectedMood: MoodId | null;
  selectedStateId: string | null;
  setMood: (mood: MoodId | null) => void;
  setState: (stateId: string | null) => void;
  reset: () => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  selectedMood: null,
  selectedStateId: null,
  setMood: (mood) => set({ selectedMood: mood, selectedStateId: null }),
  setState: (stateId) => set({ selectedStateId: stateId }),
  reset: () => set({ selectedMood: null, selectedStateId: null }),
}));
