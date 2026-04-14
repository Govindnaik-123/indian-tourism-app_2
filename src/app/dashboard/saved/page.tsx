'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { TOURISM_SPOTS } from '@/data/tourismData';
import { Heart, Star } from 'lucide-react';

export default function SavedDestinationsPage() {
  const { user, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!user) {
      checkAuth();
    }
  }, [user, checkAuth]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm font-bold text-gray-500">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const savedDestinations = TOURISM_SPOTS.filter(spot => 
    user.favoriteDestinations?.includes(spot.id)
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-shrink-0 z-30">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto pb-12">
          {/* Header */}
          <section className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-2">
                   <Heart className="w-8 h-8 fill-current" />
                   <h1 className="text-3xl font-black">Saved Destinations</h1>
                </div>
                <p className="text-red-100">All the places you want to visit, in one place.</p>
              </motion.div>
            </div>
          </section>

          {/* Grid Section */}
          <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
              {savedDestinations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {savedDestinations.map((spot, index) => (
                    <motion.div
                      key={spot.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-md transition-shadow"
                      onClick={() => router.push(`/destinations/${spot.id}`)}
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-red-400 to-pink-600">
                        <img 
                          src={spot.image} 
                          alt={spot.name} 
                          className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute top-3 right-3 bg-white/30 backdrop-blur-md p-1.5 rounded-full">
                          <Heart className="w-5 h-5 text-red-500 fill-current" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{spot.name}</h3>
                        <p className="text-sm text-gray-600">{spot.state}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{spot.rating}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border text-center border-dashed border-gray-300 rounded-2xl p-20 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No saved destinations yet</h3>
                  <p className="text-gray-500 mb-8 max-w-md">When you explore our catalog, click the heart icon on places you love to save them here for later.</p>
                  <button 
                    onClick={() => router.push('/destinations')}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Explore Destinations
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
