'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { Calendar, Plus, Map, Navigation, Loader2, X, ChevronRight, MapPin } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { TOURISM_SPOTS } from '@/data/tourismData';

export default function PlannerPage() {
  const { user, checkAuth } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom states
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [trips, setTrips] = useState<any[]>([]);

  // Form states
  const [tripTitle, setTripTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedSpots, setSelectedSpots] = useState<string[]>([]);
  const [spotSearch, setSpotSearch] = useState('');
  
  // Available spots for a user to select (filtered by search or default to saved)
  const filteredSpots = TOURISM_SPOTS.filter(spot => {
    if (spotSearch.trim() !== '') {
      const q = spotSearch.toLowerCase();
      return spot.name.toLowerCase().includes(q) || spot.state.toLowerCase().includes(q);
    }
    // If no search, show saved spots or a mix if none saved
    if (user?.favoriteDestinations && user.favoriteDestinations.length > 0) {
      return user.favoriteDestinations.includes(spot.id) || selectedSpots.includes(spot.id);
    }
    return selectedSpots.includes(spot.id) || TOURISM_SPOTS.indexOf(spot) < 15;
  });

  useEffect(() => {
    if (user && user.plannedTrips) {
      setTrips(user.plannedTrips || []);
    }
  }, [user]);

  const toggleSpot = (id: string) => {
    if (selectedSpots.includes(id)) {
      setSelectedSpots(selectedSpots.filter(s => s !== id));
    } else {
      setSelectedSpots([...selectedSpots, id]);
    }
  };

  const saveTrip = async () => {
    if (!tripTitle || !startDate || !endDate) return alert('Please enter trip details');
    
    try {
      setIsSaving(true);
      
      const newTrip = {
        title: tripTitle,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        destinations: selectedSpots,
      };

      const updatedTrips = [...trips, newTrip];

      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plannedTrips: updatedTrips })
      });

      if (res.ok) {
        await checkAuth();
        setIsCreating(false);
        setTripTitle('');
        setStartDate('');
        setEndDate('');
        setSelectedSpots([]);
      }
    } catch (error) {
      console.error('Failed to create trip', error);
    } finally {
      setIsSaving(false);
    }
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

        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <section className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-6"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
                  📅
                </div>
                <div>
                  <h1 className="text-3xl font-black mb-2">Travel Planner</h1>
                  <p className="text-teal-100">Organize your upcoming trips and itineraries.</p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Planner UI */}
          <section className="py-12 px-6 relative">
            <div className="max-w-6xl mx-auto">
              {isCreating ? (
                /* Trip Creation Form */
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                    <h2 className="text-2xl font-black text-gray-900">Create New Trip</h2>
                    <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Trip Name</label>
                        <input type="text" value={tripTitle} onChange={e => setTripTitle(e.target.value)} placeholder="e.g. Summer in Goa" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-gray-100 h-80 flex flex-col">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Search & Add Destinations ({selectedSpots.length} selected)</label>
                      <input 
                        type="text" 
                        value={spotSearch}
                        onChange={e => setSpotSearch(e.target.value)}
                        placeholder="Search any place or state in India..."
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 mb-3"
                      />
                      <div className="overflow-y-auto flex-1 space-y-2 pr-2">
                        {filteredSpots.length === 0 && spotSearch !== '' && (
                          <div className="text-sm text-gray-500 text-center mt-4">No places found matching "{spotSearch}"</div>
                        )}
                        {filteredSpots.map(spot => (
                          <div 
                            key={spot.id} 
                            onClick={() => toggleSpot(spot.id)}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedSpots.includes(spot.id) ? 'bg-teal-50 border-teal-200' : 'bg-white border-gray-200 hover:border-teal-200'}`}
                          >
                            <img src={spot.image} alt={spot.name} loading="lazy" className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1 overflow-hidden">
                              <h4 className="font-bold text-sm text-gray-900 truncate">{spot.name}</h4>
                              <p className="text-xs text-gray-500">{spot.state}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSpots.includes(spot.id) ? 'bg-teal-500 border-teal-500' : 'border-gray-300'}`}>
                              {selectedSpots.includes(spot.id) && <div className="w-2 h-2 bg-white rounded-full"/>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button 
                      onClick={saveTrip}
                      disabled={isSaving}
                      className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-70"
                    >
                      {isSaving ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Save Trip Itinerary'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Trips List */
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-gray-900">Your Travel Plans</h2>
                    <button onClick={() => setIsCreating(true)} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-bold transition-colors">
                      <Plus className="w-5 h-5" />
                      Plan New Trip
                    </button>
                  </div>

                  {trips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {trips.map((trip, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                          <div className="bg-gradient-to-br from-teal-500 to-blue-500 h-32 relative">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h3 className="text-xl font-black line-clamp-1">{trip.title}</h3>
                              <p className="text-sm font-medium opacity-90 flex items-center gap-1 mt-1">
                                <Calendar className="w-4 h-4" /> 
                                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="p-6">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                              <MapPin className="w-4 h-4"/> Exploring {trip.destinations?.length || 0} Places
                            </h4>
                            <div className="space-y-3 mb-6">
                              {trip.destinations?.slice(0, 3).map((spotId: string) => {
                                const spot = TOURISM_SPOTS.find(s => s.id === spotId);
                                return spot ? (
                                  <div key={spot.id} className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg">
                                    <img src={spot.image} loading="lazy" className="w-8 h-8 rounded-md object-cover" alt="" />
                                    <span className="text-sm font-bold text-gray-700">{spot.name}</span>
                                  </div>
                                ) : null;
                              })}
                              {trip.destinations?.length > 3 && (
                                <div className="text-xs text-center text-gray-400 font-bold bg-slate-50 p-2 rounded-lg">
                                  +{trip.destinations.length - 3} more destinations
                                </div>
                              )}
                            </div>
                            <button className="w-full flex justify-between items-center text-teal-600 font-bold bg-teal-50 hover:bg-teal-100 px-4 py-3 rounded-xl transition-colors">
                              View Full Itinerary <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white border text-center border-dashed border-gray-300 rounded-2xl p-16 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-6">
                        <Map className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-3">No trips planned yet</h3>
                      <p className="text-gray-500 mb-8 max-w-md">
                        Start combining your saved destinations into a seamless daily itinerary using our advanced Travel Planner!
                      </p>
                      <button onClick={() => setIsCreating(true)} className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:shadow-lg text-white font-black uppercase tracking-widest text-sm rounded-xl transition-all active:scale-95">
                        Start Planning
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
