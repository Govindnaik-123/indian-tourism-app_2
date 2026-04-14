'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { useAuthStore } from '@/store/authStore';
import { User, Bell, Shield, LogOut, Settings as SettingsIcon, Check, Loader2 } from 'lucide-react';
import { MOODS } from '@/data/tourismData';

export default function SettingsPage() {
  const { user, logout, checkAuth } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form States
  const [name, setName] = useState(user?.name || '');
  const [preferredMood, setPreferredMood] = useState(user?.preferredMood || '');
  const [preferredSeason, setPreferredSeason] = useState(user?.preferredSeason || '');
  const [preferredBudget, setPreferredBudget] = useState(user?.preferredBudget || 'Medium');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPreferredMood(user.preferredMood || '');
      setPreferredSeason(user.preferredSeason || '');
      setPreferredBudget(user.preferredBudget || 'Medium');
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveSuccess(false);
      
      const updates: any = {};
      if (activeTab === 'profile') {
        updates.name = name;
      } else if (activeTab === 'preferences') {
        updates.preferredMood = preferredMood || null;
        updates.preferredSeason = preferredSeason || null;
        updates.preferredBudget = preferredBudget;
      }

      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (res.ok) {
        await checkAuth(); // Refresh global user state
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save settings', error);
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
          <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12 px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-6"
              >
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold border border-white/20">
                  ⚙️
                </div>
                <div>
                  <h1 className="text-3xl font-black mb-2">Account Settings</h1>
                  <p className="text-slate-300">Manage your profile, preferences, and account security.</p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Settings UI */}
          <section className="py-12 px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100 min-h-[500px]">
                  {/* Settings Nav */}
                  <div className="w-full md:w-64 p-6 bg-slate-50/50">
                    <nav className="space-y-2">
                      <button 
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                          activeTab === 'profile' ? 'bg-white text-blue-600 shadow-sm border border-gray-100' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <User className="w-4 h-4" /> Edit Profile
                      </button>
                      <button 
                        onClick={() => setActiveTab('preferences')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                          activeTab === 'preferences' ? 'bg-white text-blue-600 shadow-sm border border-gray-100' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <SettingsIcon className="w-4 h-4" /> Preferences
                      </button>
                      <button 
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                          activeTab === 'notifications' ? 'bg-white text-blue-600 shadow-sm border border-gray-100' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Bell className="w-4 h-4" /> Notifications
                      </button>
                      <button 
                        onClick={() => setActiveTab('security')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                          activeTab === 'security' ? 'bg-white text-blue-600 shadow-sm border border-gray-100' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Shield className="w-4 h-4" /> Security
                      </button>
                      <div className="pt-4 mt-4 border-t border-gray-200">
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm transition-all">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </nav>
                  </div>

                  {/* Settings Content */}
                  <div className="flex-1 p-8">
                    {activeTab === 'profile' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h3 className="text-xl font-black text-gray-900 mb-6">Profile Information</h3>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                            <input 
                              type="text" 
                              value={name} 
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                            <input 
                              type="email" 
                              value={user?.email || ''} 
                              disabled
                              className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 font-medium cursor-not-allowed" 
                            />
                            <p className="text-xs text-gray-400 mt-1">To change your email, please contact support.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'preferences' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h3 className="text-xl font-black text-gray-900 mb-6">Travel Preferences</h3>
                        <p className="text-sm text-gray-500 mb-6">We use these preferences to recommend the best personalized destinations for you.</p>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Preferred Travel Mood</label>
                            <select 
                              value={preferredMood} 
                              onChange={(e) => setPreferredMood(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900 appearance-none" 
                            >
                              <option value="">No preference</option>
                              {MOODS.map(mood => (
                                <option key={mood.id} value={mood.id}>{mood.emoji} {mood.label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Favorite Season</label>
                              <select 
                                value={preferredSeason} 
                                onChange={(e) => setPreferredSeason(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none transition-all font-medium text-gray-900" 
                              >
                                <option value="">Any</option>
                                <option value="Summer">Summer</option>
                                <option value="Winter">Winter</option>
                                <option value="Monsoon">Monsoon</option>
                                <option value="Spring">Spring</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Travel Budget</label>
                              <select 
                                value={preferredBudget} 
                                onChange={(e) => setPreferredBudget(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none transition-all font-medium text-gray-900" 
                              >
                                <option value="Low">Economic</option>
                                <option value="Medium">Standard</option>
                                <option value="Luxury">Luxury</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'notifications' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 text-center">
                        <Bell className="w-12 h-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">Push Notifications</h3>
                        <p className="text-gray-500 max-w-sm mt-2">Notification settings are currently managed by your browser natively.</p>
                      </motion.div>
                    )}

                    {activeTab === 'security' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 text-center">
                        <Shield className="w-12 h-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">Account Security</h3>
                        <p className="text-gray-500 max-w-sm mt-2">Your account is secured via standard OAuth and encrypted token protocols. To reset your password, please use the login page.</p>
                      </motion.div>
                    )}
                    
                    {/* Action Bar */}
                    {(activeTab === 'profile' || activeTab === 'preferences') && (
                      <>
                        <hr className="border-gray-100 my-8" />
                        <div className="flex items-center justify-end gap-4">
                          {saveSuccess && (
                            <span className="flex items-center text-green-600 font-bold text-sm bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                              <Check className="w-4 h-4 mr-1" /> Saved!
                            </span>
                          )}
                          <button 
                            type="button" 
                            disabled={isSaving}
                            onClick={handleSave}
                            className="flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-70"
                          >
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
