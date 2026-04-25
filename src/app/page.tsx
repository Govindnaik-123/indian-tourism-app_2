'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { MoodCard } from '@/components/MoodCard';
import { MoodSelector } from '@/components/dashboard/MoodSelector';
import { MOODS, CURRENT_SEASON } from '@/data/destinations';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import dynamicImport from 'next/dynamic';
import Link from 'next/link';

// UI Components
import { ShowcaseCard } from '@/components/ui/showcase-card-1';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';

// Lazy load heavy 3D
export const dynamic = 'force-dynamic';

const DynamicSplineScene = dynamicImport(() => import('@/components/ui/splite').then(m => m.SplineScene), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center"><span className="loader"></span></div>
});

const GlobeScene = dynamicImport(() => import('@/components/3d/GlobeScene').then(m => m.GlobeScene), { ssr: false });

function InView({ children }: { children: React.ReactNode }) {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return <div ref={ref} className="w-full h-full min-h-[100px]">{inView ? children : <div className="w-full h-full bg-[#f8f9fa] animate-pulse" />}</div>;
}

export default function Home() {
    const [season] = useState(CURRENT_SEASON());
    const [splineAppBottom, setSplineAppBottom] = useState<any>(null);
    const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!splineAppBottom) return;

        // Normalize mouse coordinates to -1 to 1
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;

        // Try to find specific parts for more detailed interaction
        const head = splineAppBottom.findObjectByName('head') || splineAppBottom.findObjectByName('Head') || splineAppBottom.findObjectByName('Character');
        const rHand = splineAppBottom.findObjectByName('Hand/R') || splineAppBottom.findObjectByName('R_hand') || splineAppBottom.findObjectByName('Right Hand');
        const lHand = splineAppBottom.findObjectByName('Hand/L') || splineAppBottom.findObjectByName('L_hand') || splineAppBottom.findObjectByName('Left Hand');
        const target = splineAppBottom.findObjectByName('Target') || splineAppBottom.findObjectByName('lookAt');

        // Also try Spline variables if defined in the scene
        try {
            splineAppBottom.setVariable('mouse_x', x * 100);
            splineAppBottom.setVariable('mouse_y', y * 100);
        } catch (e) { }

        if (target) {
            target.position.x = x * 500;
            target.position.y = y * 500;
        } else if (head) {
            head.rotation.y = x * 0.5;
            head.rotation.x = -y * 0.3;
        }

        if (rHand) {
            rHand.rotation.y = x * 0.4;
            rHand.position.x += x * 10;
        }
        if (lHand) {
            lHand.rotation.y = x * 0.4;
            lHand.position.x += x * 10;
        }
    }, [splineAppBottom]);
    const { setCurrentMood, setSelectedMood, selectedMood } = useAppStore();
    const { user } = useAuthStore();
    const router = useRouter();

    const handleMoodSelect = useCallback((mood: string) => {
        if (!user) {
            router.push(`/login?redirect=/destinations?mood=${mood}`);
            return;
        }
        setSelectedMood(mood);
        setCurrentMood({ type: mood as any, color: '' });
        router.push(`/destinations?mood=${mood}`);
    }, [setCurrentMood, setSelectedMood, router, user]);


    return (
        <main className="min-h-screen bg-white font-sans text-[#364d59]">
            <Navbar />

            {/* ── HERO SECTION (Trips Inspired) ── */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80"
                        alt="Taj Mahal India"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    {/* Cinematic Overlay */}
                    <div className="absolute inset-0 hero-overlay z-10" />
                </div>

                <div className="relative z-20 text-center max-w-5xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <h1 className="hero-title mb-8">Experience the magic <br /> of  <span className="accent-gold">India</span></h1>
                        <p className="text-lg md:text-xl text-white/80 mb-12 font-medium max-w-2xl mx-auto leading-relaxed tracking-wide uppercase">
                            Explore the rich heritage, vibrant cultures, and breathtaking landscapes <br className="hidden md:block" /> of the Indian subcontinent.
                        </p>

                        <div className="flex items-center justify-center">
                            <Button
                                size="lg"
                                variant="gold"
                                className="px-12 h-16 text-lg tracking-[0.2em] font-black rounded-none shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                                onClick={() => document.getElementById('mood-selector')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                EXPLORE NOW
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Elements from Reference Image */}
                {/* Next.js / N Icon bottom left */}
                <div className="absolute bottom-10 left-10 z-20 pointer-events-none opacity-80">
                    <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-black text-xs">N</span>
                    </div>
                </div>

                {/* Hero Scroll Down Arrow (Single) */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/70 animate-bounce cursor-pointer" onClick={() => document.getElementById('mood-selector')?.scrollIntoView({ behavior: 'smooth' })}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 13l5 5 5-5" />
                    </svg>
                </div>
            </section>

            {/* ── OUR STORY / EXPERIENCE (With Tourism Pic) ── */}
            <section className="py-32 px-4 relative max-w-7xl mx-auto overflow-visible">
                <div className="section-watermark">India</div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="accent-gold font-bold tracking-[0.2em] text-sm mb-4 block underline decoration-gold underline-offset-8 w-fit">THE JOURNEY</span>
                        <h2 className="text-5xl font-black mb-8 leading-tight">Interactive Exploration of <br /> Indian Landmarks</h2>
                        <p className="text-xl text-[#6c757d] mb-12 leading-relaxed">
                            Our AI-powered platform helps you discover the perfect destinations tailored to your emotional state. Rotate the globe below and click on landmarks to begin your spiritual or adventurous quest.
                        </p>
                        <Button onClick={() => setIsLearnMoreOpen(true)} variant="outline" className="border-[#364d59] text-[#364d59] hover:bg-[#364d59] hover:text-white px-10 h-14 rounded-none font-bold">
                            LEARN MORE
                        </Button>
                    </motion.div>

                    <motion.div
                        className="relative group cursor-pointer"
                        initial={{ opacity: 0, x: 50, rotateY: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white p-4">
                            <img
                                src="https://media.istockphoto.com/id/547010832/vector/india-travel.jpg?s=170667a&w=0&k=20&c=7v_Eia6mhWPBAhRo3a-8q05U7yOv3jr5U7tSXD-LYrs="
                                alt="Indian Tourism Heritage"
                                loading="lazy"
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        {/* Offset background element for 'Trips' aesthetic */}
                        <div className="absolute -top-6 -right-6 w-full h-full border border-[#efba6c]/30 -z-10 rounded-2xl translate-x-3 translate-y-3" />
                    </motion.div>
                </div>
            </section>

            {/* ── MOOD SELECTOR (Integrating the original feature nicely) ── */}
            <section id="mood-selector" className="py-24 bg-[#f8f9fa] px-4">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <span className="accent-gold font-bold tracking-[0.2em] text-sm mb-4 block">EMOTIONS</span>
                    <h2 className="text-5xl font-black mb-6">How are you feeling today?</h2>
                    <div className="w-24 h-1 bg-gold mx-auto mb-10"></div>
                    <p className="max-w-2xl mx-auto text-[#6c757d]">
                        Select an emotion and we'll recommend the perfect Indian destination matching your mood and the current season ({season}).
                    </p>
                </div>

                <div className="flex justify-center px-4">
                    <div className="flex flex-wrap justify-center gap-6 max-w-[1250px]">
                        {MOODS.map((mood, index) => (
                            <motion.div
                                key={mood.type}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                className="w-[220px]"
                            >
                                <MoodCard
                                    type={mood.type}
                                    imageUrl={mood.imageUrl}
                                    color={mood.color}
                                    description={mood.description}
                                    selected={selectedMood === mood.type}
                                    onClick={() => handleMoodSelect(mood.type)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

            </section>

            {/* ── FEATURED TRIPS (ShowcaseCard Integration) ── */}
            <section id="featured-trips" className="py-44 px-4 relative max-w-7xl mx-auto">
                <div className="section-watermark right-0 left-auto text-right">Trips</div>

                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="accent-gold font-bold tracking-[0.2em] text-sm mb-4 block underline decoration-gold underline-offset-8">PROMOTED</span>
                        <h2 className="text-5xl font-black">Featured Journeys</h2>
                    </div>
                    <div className="hidden md:block">
                        <button 
                            onClick={() => {
                                if (!user) {
                                    router.push('/login?redirect=/destinations');
                                    return;
                                }
                                router.push('/destinations');
                            }}
                            className="text-sm font-bold tracking-widest text-[#6c757d] hover:text-gold transition-colors cursor-pointer"
                        >
                            VIEW ALL DESTINATIONS →
                        </button>
                    </div>
                </div>

                <div className="flex justify-center px-4">
                    <div className="flex flex-wrap justify-center gap-12 max-w-[920px]">
                        <ShowcaseCard
                            title="TAJ MAHAL"
                            image="https://www.postposmo.com/wp-content/uploads/2024/07/Tajmahalcolor.jpg"
                            description="A symbol of eternal love and breathtaking Mughal architecture in Agra."
                        />
                        <ShowcaseCard
                            title="VARANASI"
                            image="https://www.indiatravel.app/wp-content/uploads/2024/04/varanasi-climate-advice.jpg"
                            description="One of the world's oldest living cities, spiritual heart of the Ganges."
                        />
                        <ShowcaseCard
                            title="JAIPUR"
                            image="https://alumni.harvard.edu/sites/default/files/styles/trip_photo/public/trip/main_photo/Adobe_Hawa_Mahal_Palace_960x640.jpeg?itok=dOQi6Bqz"
                            description="The Pink City, home to majestic forts and royal Rajasthani heritage."
                        />
                        <ShowcaseCard
                            title="CHARMINAR"
                            image="https://media.tacdn.com/media/attractions-splice-spp-720x480/07/2d/52/bd.jpg"
                            description="A historical landmark in Hyderabad known for its stunning Indo-Islamic architecture."
                        />
                        <ShowcaseCard
                            title="OOTY"
                            image="https://i0.wp.com/savorytales.com/wp-content/uploads/2017/12/IMG_7130.jpg?w=2400&ssl=1"
                            description="Queen of Hill Stations with beautiful botanical gardens and Nilgiri Mountain Railway."
                        />
                    </div>
                </div>
            </section>

            {/* ── EXPERIENCE SECTION (Globe + Stats) ── */}
            <section className="py-32 bg-[#364d59] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <InView>
                        <GlobeScene />
                    </InView>
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-12 text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                        <div className="text-6xl font-black accent-gold mb-2">50+</div>
                        <div className="text-lg uppercase tracking-widest font-bold opacity-60">Destinations</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                        <div className="text-6xl font-black accent-gold mb-2">10K+</div>
                        <div className="text-lg uppercase tracking-widest font-bold opacity-60">Travelers</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                        <div className="text-6xl font-black accent-gold mb-2">15+</div>
                        <div className="text-lg uppercase tracking-widest font-bold opacity-60">Mood Types</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                        <div className="text-6xl font-black accent-gold mb-2">4.9★</div>
                        <div className="text-lg uppercase tracking-widest font-bold opacity-60">Avg Rating</div>
                    </motion.div>
                </div>
            </section>

            {/* ── CALL TO ACTION (Redesigned with Robot at Last) ── */}
            <section className="py-32 bg-white px-4 relative overflow-hidden" onMouseMove={handleMouseMove}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center overflow-visible">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <div className="section-watermark !static !translate-y-0 text-left mb-8">Join</div>
                        <h2 className="text-6xl font-black mb-8 leading-tight">Ready to rediscover yourself?</h2>
                        <p className="text-xl text-[#6c757d] mb-12 max-w-2xl leading-relaxed">
                            Join thousands of explorers who have found their perfect peace or adventure in the heart of India. Our AI is waiting to guide you.
                        </p>
                        <Button size="lg" variant="gold" className="px-12 h-16 text-xl font-bold rounded-none shadow-xl" onClick={() => document.getElementById('mood-selector')?.scrollIntoView({ behavior: 'smooth' })}>
                            GET STARTED NOW
                        </Button>
                    </motion.div>

                    <motion.div
                        className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl bg-[#f8f9fa]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                    >
                        <InView>
                            <DynamicSplineScene
                                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                className="w-full h-full"
                                onLoad={(app) => {
                                    setSplineAppBottom(app);
                                }}
                            />
                        </InView>
                    </motion.div>
                </div>
            </section>

            {/* ── LEARN MORE MODAL ── */}
            <AnimatePresence>
                {isLearnMoreOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                            onClick={() => setIsLearnMoreOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl z-10 p-8 md:p-12 custom-scrollbar"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsLearnMoreOpen(false)}
                                className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full flex items-center justify-center font-bold transition-colors z-20"
                            >
                                ✕
                            </button>

                            <div className="text-[#364d59] space-y-8">
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl md:text-4xl font-black mb-4">🌏 Discover India Beyond Destinations</h2>
                                    <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
                                </div>

                                <p className="text-lg leading-relaxed text-gray-700 font-medium">
                                    Step into a land where every corner tells a story. India is not just a place to visit — it’s an experience woven with centuries of history, diverse traditions, vibrant festivals, and breathtaking landscapes.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    From the snow-covered peaks of the Himalayas to the serene backwaters of Kerala, every region carries its own identity, language, cuisine, and cultural essence. As you explore through our AI-powered platform, you’re not just finding places — you’re uncovering the soul of India.
                                </p>

                                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                                    <h3 className="text-2xl font-black mb-4 text-blue-900 flex items-center gap-3">
                                        <span>🧭</span> Travel with Meaning
                                    </h3>
                                    <p className="mb-4 text-gray-700">
                                        Our intelligent recommendation system goes beyond generic travel suggestions. It understands your mood, preferences, and travel style, guiding you to destinations that truly resonate with your emotions.
                                    </p>
                                    <ul className="space-y-3 font-medium text-gray-800">
                                        <li className="flex gap-3"><span className="text-blue-500">Feeling peaceful?</span> Discover tranquil monasteries and hidden valleys.</li>
                                        <li className="flex gap-3"><span className="text-indigo-500">Seeking adventure?</span> Explore mountains, forests, and untouched trails.</li>
                                        <li className="flex gap-3"><span className="text-purple-500">Looking for spirituality?</span> Visit sacred temples and ancient pilgrimage sites.</li>
                                    </ul>
                                    <p className="mt-4 text-gray-700 italic border-l-4 border-blue-300 pl-4 py-1">
                                        Every recommendation is designed to create a deeper connection between you and the destination.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                                        <span>🎭</span> Experience Culture Like Never Before
                                    </h3>
                                    <p className="mb-4 text-gray-700">India’s culture is incredibly rich and diverse:</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 flex gap-3">
                                            <span className="text-2xl">🪔</span>
                                            <span className="text-gray-700 font-medium">Witness ancient rituals and spiritual traditions</span>
                                        </div>
                                        <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100 flex gap-3">
                                            <span className="text-2xl">🎉</span>
                                            <span className="text-gray-700 font-medium">Experience colorful festivals like Diwali, Holi, and Pongal</span>
                                        </div>
                                        <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 flex gap-3">
                                            <span className="text-2xl">🍛</span>
                                            <span className="text-gray-700 font-medium">Taste regional cuisines that vary every few hundred kilometers</span>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex gap-3">
                                            <span className="text-2xl">🏛️</span>
                                            <span className="text-gray-700 font-medium">Explore architectural wonders from different eras</span>
                                        </div>
                                    </div>
                                    <p className="mt-4 font-bold text-gray-600 text-center">Our platform helps you explore not just where to go, but what it means to be there.</p>
                                </div>

                                <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50">
                                    <h3 className="text-2xl font-black mb-4 text-emerald-900 flex items-center gap-3">
                                        <span>🌿</span> Hidden Gems & Untold Stories
                                    </h3>
                                    <p className="mb-4 text-gray-700">Beyond famous landmarks, India is filled with hidden treasures:</p>
                                    <ul className="grid grid-cols-2 gap-3 mb-4 text-gray-800 font-medium list-disc list-inside marker:text-emerald-400">
                                        <li>Quiet villages with untouched beauty</li>
                                        <li>Secret waterfalls and valleys</li>
                                        <li>Lesser-known heritage sites</li>
                                        <li>Unique local experiences</li>
                                    </ul>
                                    <p className="font-bold text-emerald-800">
                                        Our AI ensures you discover both popular destinations and hidden gems, giving you a complete and authentic journey.
                                    </p>
                                </div>

                                <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100/50 text-center">
                                    <h3 className="text-2xl font-black mb-4 text-amber-900 flex items-center justify-center gap-3">
                                        <span>✨</span> Your Journey, Personalized
                                    </h3>
                                    <p className="mb-6 text-gray-700 font-medium">Every traveler is different — and so is every journey. With our platform:</p>

                                    <div className="flex flex-col gap-3 mb-6 items-center">
                                        <div className="bg-white px-6 py-3 rounded-full shadow-sm text-sm font-bold text-gray-700 border border-gray-100">Your emotions shape your destinations</div>
                                        <div className="bg-white px-6 py-3 rounded-full shadow-sm text-sm font-bold text-gray-700 border border-gray-100">Your preferences refine your path</div>
                                        <div className="bg-white px-6 py-3 rounded-full shadow-sm text-sm font-bold text-gray-700 border border-gray-100">Your curiosity unlocks new experiences</div>
                                    </div>

                                    <p className="text-xl font-black text-amber-600 italic">
                                        Let the AI guide you, but let your heart explore.
                                    </p>
                                </div>

                                <div className="border-t border-gray-100 pt-8 mt-8 text-center">
                                    <h3 className="text-2xl font-black mb-4 flex justify-center items-center gap-3">
                                        <span>🚀</span> Start Exploring
                                    </h3>
                                    <p className="text-gray-600 font-medium mb-8 max-w-lg mx-auto">
                                        Rotate the globe, click on a destination, and begin your journey through India — where every place has a story, and every story is waiting for you.
                                    </p>
                                    <Button
                                        size="lg"
                                        variant="gold"
                                        className="h-14 px-10 text-lg rounded-full font-black shadow-xl"
                                        onClick={() => {
                                            setIsLearnMoreOpen(false);
                                            document.getElementById('mood-selector')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        I'M READY TO EXPLORE
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
