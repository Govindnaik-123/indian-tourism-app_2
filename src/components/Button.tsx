'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'gold';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', children, className = '', ...props }, ref) => {
        const baseStyles = 'font-bold transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 tracking-widest uppercase';

        const variants = {
            primary: 'bg-[#364d59] text-white hover:bg-[#203038] focus:ring-[#364d59]/30',
            secondary: 'bg-[#f8f9fa] text-[#364d59] hover:bg-gray-200 focus:ring-gray-300 border border-gray-200',
            outline: 'border-2 border-[#364d59] text-[#364d59] hover:bg-[#364d59] hover:text-white focus:ring-[#364d59]/30',
            gold: 'bg-[#efba6c] text-white hover:bg-[#d0a05b] focus:ring-[#efba6c]/30 shadow-lg',
        };

        const sizes = {
            sm: 'px-6 py-2.5 text-xs',
            md: 'px-8 py-3.5 text-sm',
            lg: 'px-10 py-4.5 text-base',
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                {...(props as any)}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';
