'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const ShowcaseCard = ({
    title = "BALI ISLAND",
    image = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=800&q=80&fit=crop",
    description = "Experience the breathtaking beauty of Bali Island, where pristine beaches meet lush tropical forests."
}: {
    title?: string,
    image?: string,
    description?: string
}) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className='flex items-center justify-center p-3'>
            <motion.div
                className='h-[420px] w-[240px] bg-[#1a1a1a] backdrop-blur-md rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] flex flex-col p-5 gap-3 overflow-hidden border border-white/5'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{
                    scale: 1.02,
                    boxShadow: "0 35px 60px -15px rgba(0,0,0,0.9)",
                    borderColor: "rgba(255,255,255,0.1)"
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <div className='flex justify-between items-center mb-1'>
                    <motion.svg
                        width="32px"
                        height="32px"
                        fill="white"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <g>
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M4 10.4V4a1 1 0 0 1 1-1h5V1h4v2h5a1 1 0 0 1 1 1v6.4l1.086.326a1 1 0 0 1 .682 1.2l-1.516 6.068A4.992 4.992 0 0 1 16 16 4.992 4.992 0 0 1 12 18a4.992 4.992 0 0 1-4-2 4.992 4.992 0 0 1-4.252 1.994l-1.516-6.068a1 1 0 0 1 .682-1.2L4 10.4zm2-.6L12 8l2.754.826 1.809.543L18 9.8V5H6v4.8zM4 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 12 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 20 20h2v2h-2a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 12 22a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 4 22H2v-2h2z" />
                        </g>
                    </motion.svg>
                    <motion.div
                        className='w-10 h-10 bg-[#60a5fa] rounded-full flex items-center justify-center cursor-pointer shadow-lg'
                        whileHover={{
                            scale: 1.1,
                            backgroundColor: "#3b82f6",
                            boxShadow: "0 0 15px rgba(96, 165, 250, 0.5)"
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                        </svg>
                    </motion.div>
                </div>

                <div className='flex flex-col gap-4 flex-1'>
                    <motion.div
                        className="title text-3xl text-center font-black tracking-tight leading-tight uppercase bg-gradient-to-b from-blue-300 to-purple-400 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <span className="block">{title.split(' ')[0]}</span>
                        {title.split(' ').length > 1 && <span className="block">{title.split(' ').slice(1).join(' ')}</span>}
                    </motion.div>

                    <motion.div
                        className="image relative h-[160px] w-full"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <motion.div
                            className="relative z-10 w-full h-full overflow-hidden rounded-[1.5rem]"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Image
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover"
                                width={400}
                                height={240}
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-blue-500/10 blur-3xl -z-10 rounded-full opacity-40" />
                    </motion.div>

                    <motion.div
                        className="desc text-[0.75rem] text-center max-w-[200px] mx-auto text-white/60 font-medium px-1 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.7 }}
                    >
                        {description}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
