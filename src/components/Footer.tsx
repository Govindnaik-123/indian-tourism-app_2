'use client';

import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore();

    return (
        <footer className="bg-[#f8f9fa] text-[#364d59] py-24 border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-4 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-3xl">🇮🇳</span>
                            <span className="text-2xl font-black tracking-tighter">
                                TRIPS<span className="text-gold">.</span>
                            </span>
                        </Link>
                        <p className="text-[#6c757d] text-sm leading-relaxed max-w-xs">
                            Five years of experience in creating the most memorable journeys across India. We believe in travel that touches the soul.
                        </p>
                        <div className="flex gap-4">
                            {['𝕏', 'f', '@', '▶'].map((icon, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ y: -3, color: '#efba6c' }}
                                    href="#"
                                    className="w-10 h-10 border border-gray-200 flex items-center justify-center text-sm transition-colors rounded-none"
                                >
                                    {icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-black tracking-[0.2em] mb-8 uppercase">Quick Links</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {['Home', 'Destinations', 'Dashboard'].map((item) => {
                                const href = item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`;
                                return (
                                    <li key={item}>
                                        <Link 
                                            href={href} 
                                            onClick={(e) => {
                                                if (href === '/destinations' && !isAuthenticated) {
                                                    e.preventDefault();
                                                    router.push('/login?redirect=/destinations');
                                                }
                                            }}
                                            className="text-[#6c757d] hover:text-gold transition"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-black tracking-[0.2em] mb-8 uppercase">Contact Info</h4>
                        <ul className="space-y-4 text-sm text-[#6c757d]">
                            <li>Agra, Uttar Pradesh, India</li>
                            <li>+91 123 456 7890</li>
                            <li>explore@indiantravel.com</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-black tracking-[0.2em] mb-8 uppercase">Newsletter</h4>
                        <p className="text-sm text-[#6c757d] mb-6">Subscribe to get travel tips and exclusive offers.</p>
                        <div className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gold"
                            />
                            <button className="bg-[#364d59] text-white px-4 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gold transition-colors">
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[#6c757d]">
                    <p>© {currentYear} IndianTravel. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-gold transition">Privacy Policy</a>
                        <a href="#" className="hover:text-gold transition">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
