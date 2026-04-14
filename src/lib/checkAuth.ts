import { useAuthStore } from '@/store/authStore';

/**
 * Checks if the user is currently authenticated using the Zustand auth store.
 * This is primarily for client-side usage in event handlers.
 * 
 * @returns boolean - True if the user is authenticated, false otherwise.
 */
export function checkUserAuth(): boolean {
  return useAuthStore.getState().isAuthenticated;
}
