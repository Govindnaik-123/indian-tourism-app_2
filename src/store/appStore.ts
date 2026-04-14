import { create } from 'zustand';

interface Mood {
  type: 'Happy' | 'Sad' | 'Lonely' | 'Romantic' | 'Adventurous' | 'Stressed' | 'Calm' | 'Excited' | 'Spiritual';
  color: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  preferredMood: string | null;
  preferredSeason: string | null;
  preferredBudget: string;
  preferredTravelType: string | null;
  preferredLandscape: string | null;
  darkMode: boolean;
  favoriteDestinations: string[];
}

interface AppState {
  user: User | null;
  currentMood: Mood | null;
  currentSeason: string | null;
  loading: boolean;
  darkMode: boolean;
  selectedMood: string | null;
  setUser: (user: User | null) => void;
  setCurrentMood: (mood: Mood | null) => void;
  setCurrentSeason: (season: string | null) => void;
  setLoading: (loading: boolean) => void;
  setDarkMode: (darkMode: boolean) => void;
  setSelectedMood: (mood: string) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  currentMood: null,
  currentSeason: null,
  loading: false,
  darkMode: false,
  selectedMood: null,
  setUser: (user) => set({ user }),
  setCurrentMood: (mood) => set({ currentMood: mood }),
  setCurrentSeason: (season) => set({ currentSeason: season }),
  setLoading: (loading) => set({ loading }),
  setDarkMode: (darkMode) => set({ darkMode }),
  setSelectedMood: (mood) => set({ selectedMood: mood }),
  logout: () => set({ user: null, currentMood: null, currentSeason: null, selectedMood: null }),
}));
