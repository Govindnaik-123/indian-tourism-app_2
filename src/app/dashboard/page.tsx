'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { TOURISM_SPOTS } from '@/data/tourismData';
import { STATES } from '@/data/statesData';
import { DESTINATIONS } from '@/data/destinations';
import { Heart, MapPin, Star, TrendingUp, Calendar, Compass, Bookmark } from 'lucide-react';

/**
 * Senior Developer Refactor: 
 * Pure helper function to dynamically select recommendations based on ratings and user mood.
 * Follows DRY principles and ensures a single source of truth from destinations.ts.
 */
/**
 * Senior Developer Fix (Robust Edition): 
 * Ensures recommendations always display by:
 * 1. Handling case-insensitive mood matches (e.g. "happy" vs "Happy")
 * 2. Safely handles saved items whether they are strings or objects
 * 3. Provides an absolute fallback to ensure a non-empty UI
 */
function getRecommendedPlaces(
  allPlaces: any[] = [], 
  savedSlugs: any[] = [], 
  preferredMood: string | null = null
): any[] {
  // 1. Core safety check
  if (!allPlaces || allPlaces.length === 0) return [];

  // 2. Normalize saved items - handle mix of strings and objects from DB
  const normalizedSaved = savedSlugs.map(s => (typeof s === 'string' ? s : s?.slug)).filter(Boolean);
  
  // 3. Normalize preferred mood for case-insensitive comparison
  const targetMood = preferredMood?.toLowerCase();

  // 4. Create pool of available destinations (not already saved)
  const pool = allPlaces.filter(d => !normalizedSaved.includes(d.slug));
  
  // 5. Identify matches for the user's mood (Case-Insensitive)
  // Support both 'moodMatch' (Landmarks) and 'moods' (States)
  const moodMatches = targetMood 
    ? pool.filter(d => {
        const moods = d.moodMatch || d.moods || [];
        return moods.some((m: string) => m.toLowerCase() === targetMood);
      })
    : [];

  // 6. Subtract mood matches from pool to get the "others"
  const others = pool.filter(p => !moodMatches.find(m => m.slug === p.slug));

  // 7. Combine results, prioritizing mood
  const finalResults = [...moodMatches, ...others].slice(0, 4);
  
  // 8. ABSOLUTE FALLBACK: If pool was empty (user saved everything), return first 4 of all destinations
  return finalResults.length > 0 ? finalResults : allPlaces.slice(0, 4);
}

export default function DashboardPage() {
  const { user, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real-time states
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only fetch auth if we don't have a user and aren't already loading
    if (!user && !isLoading) {
      checkAuth();
    }
  }, [user]); // Only depend on user presence

  useEffect(() => {
    // Only redirect if explicitly not loading and user is definitely null after check
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm font-bold text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const firstName = user.name?.split(' ')[0] || 'Traveler';

  // Compute real data

  // Senior Developer Refactor: Dynamic Recommendations aligned with 'Destinations' (STATES)
  const savedSlugs = user.favoriteDestinations || [];
  const recommended = getRecommendedPlaces(STATES, savedSlugs, user.preferredMood);

  // Get Saved Destinations (Both States and specific spots)
  const savedStates = STATES.filter(s => savedSlugs.includes(s.slug));
  const savedLandmarks = DESTINATIONS.filter(d => savedSlugs.includes(d.slug));
  
  // Combine for display (States first)
  const allSaved = [
    ...savedStates.map(s => ({ ...s, type: 'state' })),
    ...savedLandmarks.map(d => ({ ...d, type: 'destination' }))
  ];

  const travelStats = {
    visited: user.travelJournal?.length || 0,
    saved: user.favoriteDestinations?.length || 0,
    reviews: user.travelJournal?.filter(j => j.entry?.trim()).length || 0,
    rating: user.travelJournal && user.travelJournal.length > 0
      ? (user.travelJournal.reduce((acc: number, curr: any) => acc + curr.rating, 0) / user.travelJournal.length).toFixed(1)
      : 'N/A'
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-shrink-0 z-30">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto pb-12">
          {/* Welcome Header */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-6"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
                  {firstName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-3xl font-black mb-2">Welcome back, {firstName}! 👋</h1>
                  <p className="text-blue-100">Ready to discover your next adventure?</p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* User Profile Card */}
          <section className="py-8 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>India</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Joined recently</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                    Edit Profile
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Travel Statistics */}
          <section className="py-8 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h2 className="text-2xl font-black text-gray-900 mb-6">Your Travel Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{travelStats.visited}</p>
                        <p className="text-sm text-gray-600">Destinations Visited</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{travelStats.saved}</p>
                        <p className="text-sm text-gray-600">Saved Places</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{travelStats.rating}</p>
                        <p className="text-sm text-gray-600">Average Rating</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{travelStats.reviews}</p>
                        <p className="text-sm text-gray-600">Reviews Written</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>          {/* Saved Destinations */}
          <section className="py-8 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    <Bookmark className="w-6 h-6 text-black fill-current" />
                    Saved Destinations
                  </h2>
                </div>
                
                {allSaved.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {allSaved.map((item: any, index) => (
                      <motion.div
                        key={item.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-md transition-shadow"
                        onClick={() => router.push(`/destinations/${item.slug}`)}
                      >
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                          <img 
                            src={item.image || item.heroImage} 
                            alt={item.name} 
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                          <div className="absolute top-3 left-3">
                            <div className="bg-black/80 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              {item.type === 'state' ? 'State' : 'Landmark'}
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {item.state || 'Indian State'}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border text-center border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
                      <Bookmark className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Save your favorite spots</h3>
                    <p className="text-gray-500 max-w-md">Click the bookmark icon on any destination to keep track of where you want to go next.</p>
                  </div>
                )}
              </motion.div>
            </div>
          </section>




          <section className="py-8 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-gray-900">Recommended For You</h2>
                </div>
                
                {recommended.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recommended.map((item, index) => (
                      <motion.div
                        key={item.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-md transition-shadow"
                        onClick={() => router.push(`/destinations/${item.slug}`)}
                      >
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                          <img 
                            src={item.image || item.heroImage} 
                            alt={item.name} 
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                          <div className="absolute top-3 left-3">
                            <div className="bg-blue-600/90 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              State
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border text-center border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center">
                    <p className="text-gray-500">Update your travel preferences to get personalized recommendations.</p>
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="py-8 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
              >
                <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Ready for your next adventure?</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => router.push('/destinations')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
                  >
                    Discover New Places
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
