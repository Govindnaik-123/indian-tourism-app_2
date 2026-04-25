'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { STATES } from '@/data/statesData';
import { Heart, MapPin, Star, TrendingUp, Calendar, Bookmark } from 'lucide-react';

/**
 * Helper to shuffle and pick 4 states from the 31 states pool.
 */
function getShuffledRecommendations(allStates: any[] = []): any[] {
  if (!allStates || allStates.length === 0) return [];
  const pool = [...allStates];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 4);
}

export default function DashboardPage() {
  const { user, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!user && !isLoading) {
      checkAuth();
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Shuffle every time the user enters (on mount/user change)
  const recommended = useMemo(() => {
    return getShuffledRecommendations(STATES);
  }, [user?.id]); 

  if (isLoading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm font-bold text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const firstName = user.name?.split(' ')[0] || 'Traveler';

  // Dynamic travel statistics updated from journal
  const travelStats = {
    visited: user.travelJournal?.length || 0,
    saved: user.favoriteDestinations?.length || 0,
    reviews: user.travelJournal?.filter(j => j.entry?.trim()).length || 0,
    rating: user.travelJournal && user.travelJournal.length > 0
      ? (user.travelJournal.reduce((acc: number, curr: any) => acc + curr.rating, 0) / user.travelJournal.length).toFixed(1)
      : 'N/A'
  };

  const savedSlugs = user.favoriteDestinations || [];
  const savedStates = STATES.filter(s => savedSlugs.includes(s.slug));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <div className="hidden lg:flex flex-shrink-0 z-30">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto pb-12">
          {/* Welcome Section */}
          <section className="bg-gradient-to-br from-indigo-700 via-blue-600 to-violet-600 text-white py-16 px-8 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-lg rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Explorer Central</span>
                </div>
                <h1 className="text-6xl font-black mb-2 tracking-tighter">Namaste, {firstName}! 🌿</h1>
                <p className="text-xl text-blue-100 font-medium max-w-2xl opacity-90">
                  Your Indian travel journey is unique. Track visits, rate experiences, and plan more.
                </p>
              </motion.div>
            </div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20"></div>
          </section>

          {/* User Profile Overview */}
          <section className="py-10 px-6 -mt-12">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-10"
              >
                <div className="relative group">
                  <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl rotate-6 flex items-center justify-center text-white text-4xl font-black shadow-xl transition-transform group-hover:rotate-0">
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">{user.name}</h2>
                  <p className="text-gray-500 font-semibold mb-4 tracking-wide">{user.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl text-xs font-black uppercase tracking-wider">
                      <MapPin className="w-4 h-4" /> INDIA
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-black uppercase tracking-wider">
                      <Calendar className="w-4 h-4" /> ACTIVE SINCE 2024
                    </div>
                  </div>
                </div>
                <button className="px-10 py-5 bg-gray-900 text-white font-black rounded-3xl hover:bg-black transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest text-sm">
                  User Profile
                </button>
              </motion.div>
            </div>
          </section>

          {/* Updated Stats with Journal Logic */}
          <section className="py-6 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Destinations Visited', value: travelStats.visited, icon: MapPin, color: 'blue' },
                  { label: 'Saved Places', value: travelStats.saved, icon: Heart, color: 'rose' },
                  { label: 'Average Rating', value: travelStats.rating, icon: Star, color: 'amber' },
                  { label: 'Reviews Written', value: travelStats.reviews, icon: TrendingUp, color: 'emerald' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 group hover:bg-slate-50 transition-all border-b-4 border-b-transparent hover:border-b-blue-600"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center mb-6 transition-all group-hover:scale-110`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                    </div>
                    <p className="text-4xl font-black text-gray-900 mb-1 tracking-tighter">{stat.value}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Recommended Section (Pulling only 4 from 31 States) */}
          <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Recommended For You</h2>
                  <div className="h-1.5 w-32 bg-blue-600 rounded-full mt-2"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {recommended.map((item, index) => (
                  <motion.div
                    key={item.slug + index}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-2xl transition-all duration-500"
                    onClick={() => router.push(`/destinations/${item.slug}`)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={item.image || item.heroImage} 
                        alt={item.name} 
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      />
                      <div className="absolute top-5 left-5">
                        <span className="bg-white text-blue-600 px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">STATE</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                        <span className="text-white font-black text-sm uppercase tracking-widest border-b-2 border-white pb-1">Explore State</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-black text-gray-900 text-xl mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors tracking-tighter uppercase">{item.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Saved Destinations */}
          <section className="py-12 px-6 bg-slate-50">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-black p-3 rounded-2xl">
                    <Bookmark className="w-6 h-6 text-white fill-current" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Saved Escapes</h2>
              </div>
              
              {savedStates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {savedStates.map((item: any, index) => (
                    <motion.div
                      key={item.slug}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl transition-all group"
                      onClick={() => router.push(`/destinations/${item.slug}`)}
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img 
                          src={item.image || item.heroImage} 
                          alt={item.name} 
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 font-sans" 
                        />
                         <div className="absolute top-3 right-3">
                            <div className="bg-white/90 backdrop-blur text-black p-2.5 rounded-2xl shadow-lg">
                                <Bookmark className="w-4 h-4 fill-black" />
                            </div>
                         </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-black text-gray-900 line-clamp-1 uppercase tracking-tighter">{item.name}</h3>
                        <p className="text-[10px] text-blue-600 font-black mt-1 uppercase tracking-[0.2em]">VIEW SAVED DETAILS</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border-4 border-dashed border-gray-200 rounded-[3rem] p-20 text-center">
                  <Bookmark className="w-16 h-16 text-gray-200 mx-auto mb-8" />
                  <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tighter uppercase">No Saved Journeys</h3>
                  <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto">Unlock the secrets of India. Bookmark your dream states to begin your collection.</p>
                  <button onClick={() => router.push('/destinations')} className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl hover:-translate-y-1 uppercase tracking-widest text-xs">Browse States</button>
                </div>
              )}
            </div>
          </section>

          {/* Final Call to Action */}
          <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="bg-blue-900 rounded-[4rem] p-16 text-center relative overflow-hidden group shadow-3xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                
                <h2 className="text-5xl font-black text-white mb-8 tracking-tighter uppercase relative z-10 leading-none">The map is yours. <br/><span className="text-blue-400">Mark your territory.</span></h2>
                <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
                  <button
                    onClick={() => router.push('/destinations')}
                    className="px-12 py-6 bg-white text-gray-900 font-black rounded-3xl hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-2 uppercase tracking-widest text-sm"
                  >
                    Explore 31 States
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
