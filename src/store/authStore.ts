import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  preferredMood?: string;
  preferredSeason?: string;
  preferredBudget?: string;
  preferredTravelType?: string;
  preferredLandscape?: string;
  darkMode?: boolean;
  favoriteDestinations?: string[];
  plannedTrips?: any[];
  travelJournal?: {
    destination: string;
    entry: string;
    visitDate: string;
    rating: number;
    createdAt?: string;
  }[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  toggleFavorite: (slug: string) => Promise<boolean>;
  addJournalEntry: (entry: { destination: string; entry: string; rating: number; visitDate: string }) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,
      setUser: (user) => set({ user, isAuthenticated: !!user, isInitialized: true }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: async () => {
        try {
          await fetch('/api/auth/logout', { method: 'POST' });
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },
      toggleFavorite: async (slug: string) => {
        try {
          const response = await fetch('/api/user/favorite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug }),
          });

          if (response.ok) {
            const data = await response.json();
            const currentUser = get().user;
            if (currentUser) {
              set({
                user: {
                  ...currentUser,
                  favoriteDestinations: data.data.favoriteDestinations,
                },
              });
            }
            return data.data.isFavorite;
          }
          return false;
        } catch (error) {
          console.error('Toggle favorite error:', error);
          return false;
        }
      },
      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch('/api/user');
          if (response.ok) {
            const data = await response.json();
            set({ user: data.data?.user || data.user, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false, isInitialized: true });
        }
      },
      addJournalEntry: async (entry) => {
        try {
          const response = await fetch('/api/user/journal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry),
          });

          if (response.ok) {
            const data = await response.json();
            const currentUser = get().user;
            if (currentUser) {
              set({
                user: {
                  ...currentUser,
                  travelJournal: data.data.travelJournal,
                },
              });
            }
            return true;
          }
          return false;
        } catch (error) {
          console.error('Add journal entry error:', error);
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
