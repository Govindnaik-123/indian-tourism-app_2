'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, MapPin, Send, Loader2 } from 'lucide-react';

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationName: string;
  onSubmit: (rating: number, review: string) => Promise<void>;
}

export function JournalModal({ isOpen, onClose, destinationName, onSubmit }: JournalModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    try {
      await onSubmit(rating, review);
      onClose();
      // Reset after close
      setRating(0);
      setReview('');
    } catch (error) {
      console.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest opacity-80">Mark as Visited</span>
              </div>
              <h2 className="text-2xl font-black">{destinationName}</h2>
            </div>

            {/* Body */}
            <div className="p-8">
              <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                How was your experience?
              </label>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    className="group transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-10 h-10 transition-all duration-300 ${
                        (hoveredRating || rating) >= star
                          ? 'text-yellow-400 fill-yellow-400 drop-shadow-md'
                          : 'text-gray-200 fill-transparent'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-4 text-xl font-black text-gray-900">
                  {rating > 0 ? `${rating}.0` : ''}
                </span>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Write a quick review (Optional)
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Tell us about your trip — the food, the views, the vibes..."
                  className="w-full h-32 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all resize-none text-gray-700"
                />
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 px-6 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button
                  disabled={rating === 0 || isSubmitting}
                  onClick={handleSubmit}
                  className={`flex-[2] py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl ${
                    rating > 0 && !isSubmitting
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-200'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Add to Travel Journal
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
