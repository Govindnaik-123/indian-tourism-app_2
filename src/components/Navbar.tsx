'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setIsProfileOpen(false);
        await logout();
        router.push('/');
    };

    const navLinks = [
        { href: '/', label: 'HOME' },
        { href: '/destinations', label: 'DESTINATIONS' },
        ...(user ? [{ href: '/dashboard', label: 'DASHBOARD' }] : []),
    ];

    // Get initials from user name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
            }`}
        >
            <div className="mx-auto px-4 md:px-10 flex justify-between items-center max-w-7xl relative">
                {/* Logo - Left */}
                <Link href="/" className="flex items-center gap-2 group z-10">
                    <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-[#364d59]' : 'text-white'}`}>
                        TRIPS<span className="text-gold">.</span>
                    </span>
                </Link>

                {/* Desktop links - Center */}
                <div className="hidden md:flex items-center justify-center gap-10 absolute left-1/2 -translate-x-1/2 w-full pointer-events-none">
                    <div className="flex gap-10 pointer-events-auto">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={(e) => {
                                    if (link.href === '/destinations' && !isAuthenticated) {
                                        e.preventDefault();
                                        router.push('/login?redirect=/destinations');
                                    }
                                }}
                                className={`text-xs font-bold tracking-[0.2em] transition-colors ${
                                    isScrolled ? 'text-[#364d59] hover:text-gold' : 'text-white/80 hover:text-white'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right side - Login */}
                <div className="flex items-center gap-6 z-10">
                    {user ? (
                        <div className="hidden sm:flex items-center gap-3 relative" ref={profileRef}>
                            {/* Profile Avatar Button */}
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 group"
                            >
                                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-black shadow-lg ring-2 ring-blue-300/50 group-hover:ring-blue-400 transition-all">
                                    {getInitials(user.name)}
                                </div>
                                <div className="text-left">
                                    <p className={`text-xs font-black leading-tight ${isScrolled ? 'text-[#364d59]' : 'text-white'}`}>
                                        {user.name.split(' ')[0].toUpperCase()}
                                    </p>
                                    <p className={`text-[10px] font-medium ${isScrolled ? 'text-gray-400' : 'text-white/60'}`}>
                                        ● Online
                                    </p>
                                </div>
                                <svg
                                    className={`w-3 h-3 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''} ${isScrolled ? 'text-gray-400' : 'text-white/60'}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Account Details Dropdown */}
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: 'easeOut' }}
                                        className="absolute top-12 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                                    >
                                        {/* Profile Header */}
                                        <div className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-lg font-black ring-2 ring-white/30">
                                                    {getInitials(user.name)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm">{user.name}</p>
                                                    <p className="text-xs text-blue-200 font-medium">{user.email}</p>
                                                    <span className="mt-1 inline-block px-2 py-0.5 rounded-full bg-green-400/20 text-green-300 text-[10px] font-bold border border-green-400/30">
                                                        ✓ Logged In
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="p-2">
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            >
                                                <span className="text-lg">🏠</span>
                                                <div>
                                                    <p className="text-xs font-black">Dashboard</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">Your personalized travel hub</p>
                                                </div>
                                            </Link>
                                            <Link
                                                href="/destinations"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            >
                                                <span className="text-lg">🗺️</span>
                                                <div>
                                                    <p className="text-xs font-black">Explore India</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">Browse top destinations</p>
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Divider + Logout */}
                                        <div className="border-t border-gray-100 p-2">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                <span className="text-lg">🚪</span>
                                                <div className="text-left">
                                                    <p className="text-xs font-black">Logout</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">Sign out of your account</p>
                                                </div>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="hidden sm:flex gap-4 items-center">
                            <Link
                                href="/login"
                                className={`text-xs font-bold tracking-widest ${isScrolled ? 'text-[#364d59]' : 'text-white'}`}
                            >
                                LOGIN
                            </Link>
                        </div>
                    )}

                    {/* Mobile hamburger */}
                    <button
                        className={`md:hidden text-2xl ${isScrolled ? 'text-[#364d59]' : 'text-white'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-6">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-bold tracking-widest text-[#364d59]"
                                    onClick={(e) => {
                                        setIsOpen(false);
                                        if (link.href === '/destinations' && !isAuthenticated) {
                                            e.preventDefault();
                                            router.push('/login?redirect=/destinations');
                                        }
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {user && (
                                <>
                                    <div className="flex items-center gap-3 py-3 border-t border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black">
                                            {getInitials(user.name)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-[#364d59]">{user.name}</p>
                                            <p className="text-xs text-gray-400">{user.email}</p>
                                            <span className="text-[10px] text-green-500 font-bold">✓ Logged In</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm font-bold text-red-500 tracking-widest text-left"
                                    >
                                        🚪 LOGOUT
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
