'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DashboardNavbarProps {
  onMenuToggle: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  onMenuToggle,
  searchQuery,
  onSearchChange,
}) => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  const notifications = [
    { id: 1, icon: '🎉', text: 'Your Goa trip plan is ready!', time: '2 min ago' },
    { id: 2, icon: '🌟', text: 'New destinations added for Monsoon', time: '1 hr ago' },
    { id: 3, icon: '❤️', text: 'Check our new spiritual retreats', time: '3 hr ago' },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-20 px-4 md:px-6 h-16 flex items-center justify-between gap-4">
      {/* Left: Hamburger */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Back to Home Button */}
        <Link 
          href="/"
          className="flex flex-shrink-0 items-center gap-2 px-3 py-2 text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 bg-gray-50 border border-gray-200 rounded-xl transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Back to Home</span>
        </Link>

        {/* Search bar */}
        <div className="relative hidden sm:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search destinations..."
            className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3" ref={profileRef}>
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
            className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <AnimatePresence>
            {isNotifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100">
                  <p className="font-black text-sm text-gray-800">Notifications</p>
                </div>
                {notifications.map(n => (
                  <div key={n.id} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition cursor-pointer border-b border-gray-50 last:border-0">
                    <span className="text-xl mt-0.5">{n.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-gray-700">{n.text}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black">
              {user ? getInitials(user.name) : 'U'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-black text-gray-800 leading-tight">{user?.name?.split(' ')[0] || 'Traveler'}</p>
              <p className="text-[10px] text-gray-400">Traveler</p>
            </div>
            <svg className={`w-3 h-3 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black">
                      {user ? getInitials(user.name) : 'U'}
                    </div>
                    <div>
                      <p className="font-black text-sm">{user?.name}</p>
                      <p className="text-xs text-blue-200">{user?.email}</p>
                      <span className="text-[10px] text-green-300 font-bold">✓ Active</span>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition" onClick={() => setIsProfileOpen(false)}>
                    🏠 Dashboard
                  </Link>
                  <Link href="/destinations" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition" onClick={() => setIsProfileOpen(false)}>
                    🗺️ Explore
                  </Link>
                </div>
                <div className="p-2 border-t border-gray-100">
                  <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-bold text-red-500 hover:bg-red-50 transition">
                    🚪 Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
