'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bookmark, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JournalModal } from '@/components/dashboard/JournalModal';
import { DESTINATIONS } from '@/data/destinations';
import { STATES } from '@/data/statesData';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function DestinationDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, isInitialized, toggleFavorite } = useAuthStore();
  const slug = params.slug as string;
  const mood = searchParams.get('mood');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedDestinations, setRelatedDestinations] = useState<any[]>([]);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);

  const { addJournalEntry } = useAuthStore();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace(`/login?redirect=/destinations/${slug}${mood ? `?mood=${mood}` : ''}`);
    }
  }, [isAuthenticated, isInitialized, router, slug, mood]);

  useEffect(() => {
    // 1. Check for state first (to handle state cards in journey)
    const state = STATES.find((s) => s.slug === slug);
    if (state) {
      // Find destinations in this state
      const stateDests = DESTINATIONS.filter(d => d.state === state.name || d.state.includes(state.name));

      setData({
        type: 'state',
        name: state.name,
        state: 'Indian State',
        heroImage: state.image,
        longDescription: state.description,
        highlights: state.highlights,
        safetyRating: 5,
        sustainabilityScore: 5,
        rating: '4.8',
        crowdLevel: 'Varied',
        landscape: ['Regional Hub', 'Cultural Center'],
        bestTimeToVisit: [state.bestTime],
        itinerary: state.itinerary,
        localFood: [
          { name: 'Regional Specialty', description: `Traditional cuisine of ${state.name}`, whereToTry: 'State capital' },
        ],
        packageAmount: state.packageAmount,
        culture: state.culture,
        culturalImages: state.culturalImages,
        isStateView: true,
        nearbyAttractions: [] // Keep empty as requested for removal
      });
      setLoading(false);
      return;
    }

    // 2. Check for specific destination
    const dest = DESTINATIONS.find((d) => d.slug === slug);
    if (dest) {
      setData({ ...dest, type: 'destination' });
      // Find other destinations in the same state
      setRelatedDestinations(DESTINATIONS.filter(d => d.state === dest.state && d.slug !== slug));
      setLoading(false);
      return;
    }

    setLoading(false);
  }, [slug]);

  const destination = data;

  if (loading || authLoading || !isInitialized || !isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#364d59] font-bold tracking-widest animate-pulse uppercase">Verifying Access...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!destination) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xl text-gray-600">Destination not found</p>
        </div>
        <Footer />
      </main>
    );
  }

  const handleJournalSubmit = async (rating: number, review: string) => {
    await addJournalEntry({
      destination: destination.name,
      entry: review,
      rating,
      visitDate: new Date().toISOString()
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] w-full overflow-hidden"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-30">
            <h1 className="text-5xl font-bold mb-2">{destination.name}</h1>
            <p className="text-lg opacity-90">{destination.state}</p>
          </div>
        </div>
      </motion.div>

      {/* Content Wrapper for Edge-to-Edge Sidebar Images */}
      <div className="relative w-full">
        {/* Left Side Images (Desktop 2xl+) */}
        <div className="hidden 2xl:flex absolute left-8 top-12 flex-col gap-8 w-72 h-full z-0 pointer-events-none">
          {destination.culturalImages?.slice(0, 2).map((img: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-64 w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white pointer-events-auto group"
            >
              <img 
                src={img.url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&h=400&q=80"} 
                alt={img.name || "Culture"} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-1" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-6 translate-y-4 group-hover:translate-y-0">
                <span className="text-white text-xl font-black text-center tracking-tighter uppercase drop-shadow-2xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{img.name}</span>
              </div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Right Side Images (Desktop 2xl+) */}
        <div className="hidden 2xl:flex absolute right-8 top-12 flex-col gap-8 w-72 h-full z-0 pointer-events-none">
          {destination.culturalImages?.slice(2, 4).map((img: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-64 w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white pointer-events-auto group"
            >
              <img 
                src={img.url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&h=400&q=80"} 
                alt={img.name || "Culture"} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-1" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-6 translate-y-4 group-hover:translate-y-0">
                <span className="text-white text-xl font-black text-center tracking-tighter uppercase drop-shadow-2xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{img.name}</span>
              </div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Main Center Column */}
        <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
          {/* Culture & Lifestyle Section */}
          <div className="mb-20">
            <div className="flex flex-col items-center justify-center gap-6">
              {/* Main Culture Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full bg-gradient-to-br from-white to-orange-50 rounded-3xl p-10 shadow-2xl border border-orange-100 relative overflow-hidden flex flex-col justify-center min-h-[400px]"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl"></div>
                <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-yellow-200/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <h2 className="text-4xl font-black text-gray-800 tracking-tight uppercase underline decoration-orange-400 decoration-8 underline-offset-8">
                      Culture & Lifestyle
                    </h2>
                    <motion.button
                      onClick={async (e) => {
                        e.preventDefault();
                        await toggleFavorite(slug);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        user?.favoriteDestinations?.includes(slug)
                          ? 'bg-black text-white shadow-xl hover:bg-gray-900 border border-black'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${user?.favoriteDestinations?.includes(slug) ? 'fill-current' : ''}`} />
                      <span className="font-bold uppercase tracking-widest text-[10px]">
                        {user?.favoriteDestinations?.includes(slug) ? 'Saved' : 'Save'}
                      </span>
                    </motion.button>

                    <motion.button
                      onClick={() => setIsJournalModalOpen(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-green-200 transition-all border border-green-400/20"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-bold uppercase tracking-widest text-[10px]">
                        Visited
                      </span>
                    </motion.button>
                  </div>
                  <p className="text-2xl text-gray-700 leading-relaxed font-semibold italic mx-auto max-w-2xl whitespace-pre-line">
                    "{destination.culture}"
                  </p>
                </div>
              </motion.div>

              {/* Grid visible on mobile/tablet/laptop (up to desktop 2xl) */}
              <div className="grid grid-cols-2 gap-4 2xl:hidden w-full">
                {destination.culturalImages?.map((src: string, idx: number) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="relative h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-white"
                  >
                    <img src={src} alt="Culture" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>


        {/* Best Time to Visit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Best Time to Visit</h2>
          <div className="flex flex-wrap gap-2">
            {destination.bestTimeToVisit.map((month: string) => (
              <span key={month} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {month}
              </span>
            ))}
          </div>
        </motion.div>


        {/* Itinerary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { day: 'Day 1', activity: destination.itinerary?.day1 },
              { day: 'Day 2', activity: destination.itinerary?.day2 },
              { day: 'Day 3', activity: destination.itinerary?.day3 },
            ].map((item) => (
              <div key={item.day} className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 group-hover:h-2 transition-all"></div>
                <p className="font-black text-2xl text-blue-600 mb-4 tracking-tighter uppercase italic">{item.day}</p>
                <p className="text-gray-700 leading-relaxed font-medium">{item.activity || 'Planning your exploration...'}</p>
                <div className="mt-4 flex justify-end">
                   <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-blue-500 text-xs">✨</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tour Package & Cost */}
        {destination.packageAmount ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-white to-[#364d59]/5 rounded-3xl p-8 shadow-2xl mb-12 border border-[#364d59]/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
               <span className="text-7xl">💎</span>
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-[#364d59] mb-6 tracking-tighter uppercase flex items-center gap-3">
                <div className="bg-[#364d59] text-white p-2 rounded-lg rotate-3 shadow-lg">
                  <span className="text-xl">₹</span>
                </div>
                Tour Package & Estimated Cost
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-1">
                  <p className="text-[#364d59]/60 font-bold uppercase tracking-widest text-xs mb-1">Estimated Range (3 Days / Person)</p>
                  <p className="text-3xl font-black text-[#364d59] tracking-tighter tabular-nums leading-none whitespace-nowrap">
                    {destination.packageAmount}
                  </p>
                  <div className="h-1.5 w-24 bg-gradient-to-r from-yellow-500 to-yellow-200 rounded-full mt-4"></div>
                </div>
                
                <div className="bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-inner">
                  <p className="text-[#364d59] font-semibold italic text-sm leading-relaxed">
                    "This estimate covers premium stays, local transfers, and curated cultural experiences for an unforgettable 3-day journey."
                  </p>
                  <p className="text-[10px] text-yellow-600/90 mt-3 font-bold uppercase tracking-tighter italic">* Final pricing may vary based on seasonal demand</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Local Food - Fallback for non-state destinations */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Local Food Recommendations 🍜</h2>
            <div className="space-y-4">
              {destination.localFood.map((food: any, idx: number) => (
                <div key={idx} className="border-b pb-4 last:border-b-0">
                  <p className="font-bold text-lg">{food.name}</p>
                  <p className="text-gray-600">{food.description}</p>
                  <p className="text-sm text-gray-500">Where to try: {food.whereToTry}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}


        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <Button
            size="md"
            variant="outline"
            onClick={() => window.history.back()}
          >
            ← Back
          </Button>
        </motion.div>
      </div>
    </div>

      <JournalModal
        isOpen={isJournalModalOpen}
        onClose={() => setIsJournalModalOpen(false)}
        destinationName={destination.name}
        onSubmit={handleJournalSubmit}
      />
      <Footer />
    </main>
  );
}
