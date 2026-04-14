import React from 'react';
import { Metadata } from 'next';
import { Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Using Mongoose to fetch the entire dataset dynamically
import { connectDB } from '@/lib/mongodb';
import Destination from '@/models/Destination';
import { StateExplorer } from '@/components/tourism/StateExplorer';

export const revalidate = 86400; // Cache the MongoDB query results for 24 hours

export const metadata: Metadata = {
  title: 'Explore India | Indian Tourism',
  description: 'Discover popular destinations and hidden gems across all states of India.',
};

export default async function ExplorePage() {
  await connectDB();
  const rawDestinations = await Destination.find().lean();
  
  // Adapt to the Destination interface required by StateExplorer
  const initialDestinations = rawDestinations.map((d: any) => ({
    id: d.slug,
    name: d.name,
    state: d.state,
    type: d.landscape || [],
    popularity: d.rating >= 4.5 ? 'Popular' : 'Hidden',
    moods: d.moodMatch || [],
    seasons: d.season || [],
    budget: 'Medium',
    description: d.description,
    image: d.heroImage || ''
  }));
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-200">
      {/* Navbar (Isolated specifically for Explore Page to not mess up global UI) */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gray-100 group-hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </div>
            <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Back Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇮🇳</span>
            <span className="text-lg font-black tracking-tight">TRIPS<span className="text-yellow-400">.</span></span>
          </div>
          <div className="w-24"></div> {/* Balance spacer */}
        </div>
      </nav>

      <main className="pb-24">
        {/* Dynamic Hero Section */}
        <div className="relative pt-16 pb-20 px-6 sm:px-12 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
          {/* Abstract Patterns */}
          <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
              Tourism Dataset System
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Explore Every Corner <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">of Incredible India</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10 opacity-90 leading-relaxed">
              From popular landmarks to untouched hidden gems, filter by state, mood, and popularity to find your perfect getaway.
            </p>
          </div>
        </div>

        {/* State Explorer Module Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <StateExplorer initialDestinations={initialDestinations as any} />
        </div>
      </main>
    </div>
  );
}
