'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import React, { useState, useRef } from 'react';

interface MoodCardProps {
    type: string;
    imageUrl: string;
    color: string;
    description?: string;
    selected?: boolean;
    onClick?: () => void;
}

export const MoodCard: React.FC<MoodCardProps> = ({
    type,
    imageUrl,
    color,
    description,
    selected = false,
    onClick,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const cardRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    React.useEffect(() => {
        if (imgRef.current?.complete) {
            setIsLoading(false);
        }
    }, []);

    // 3D tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div style={{ perspective: '1000px' }} className="h-full">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                whileTap={{ scale: 0.98 }}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className={`cursor-pointer h-full bg-white border ${selected ? 'border-gold shadow-2xl ring-2 ring-gold/20' : 'border-gray-100 shadow-sm'} transition-all duration-300 relative group overflow-hidden`}
            >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden">
                    {isLoading && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        ref={imgRef}
                        src={imageUrl}
                        alt={type}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-transform duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'} group-hover:scale-110`}
                        style={{
                            objectPosition: type === 'Excited' ? 'center 20%' : 'center'
                        }}
                        onLoad={() => setIsLoading(false)}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                    {selected && (
                        <div className="absolute top-4 right-4 bg-gold text-white w-8 h-8 flex items-center justify-center font-bold">
                            ✓
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                    <h3 className={`text-lg font-black tracking-widest uppercase mb-2 ${selected ? 'text-gold' : 'text-[#364d59]'}`}>
                        {type}
                    </h3>
                    {description && (
                        <p className="text-xs text-[#6c757d] leading-relaxed line-clamp-2">
                            {description}
                        </p>
                    )}
                </div>

                {/* Selected Bottom Bar */}
                {selected && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />}
            </motion.div>
        </div>
    );
};
