/**
 * MOBILE OPTIMIZATION COMPONENT - MCP ENHANCED
 * 
 * Otimizações mobile baseadas na análise MCP para máxima conversão
 */

'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MobileOptimizationProps {
  userProfile: string;
  isMobile: boolean;
}

export function MobileOptimizedHomepage({ userProfile, isMobile }: MobileOptimizationProps) {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportHeight(window.innerHeight);
    }
  }, []);

  if (!isMobile) return null;

  return (
    <div className="mobile-optimized-container">
      {/* MCP OPTIMIZATION: Mobile-first hero section */}
      <motion.div
        className="min-h-screen flex flex-col justify-center px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Compact header for mobile */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Real-Time Business Intelligence
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Platform that evolves faster than competitors can analyze
          </p>
        </div>

        {/* Mobile-optimized intelligence preview */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 mb-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium">Your Profile</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">
              {userProfile}
            </span>
          </div>
          <div className="text-lg font-semibold mb-2">
            Instant competitive analysis ready
          </div>
          <div className="text-xs opacity-90">
            Platform intelligence personalized for your business
          </div>
        </div>

        {/* Mobile-first CTAs - Stack vertically */}
        <div className="space-y-3">
          <motion.button
            className="w-full bg-red-500 text-white py-4 px-6 rounded-lg font-semibold"
            whileTap={{ scale: 0.98 }}
          >
            Start Analysis Now
          </motion.button>
          
          <motion.button
            className="w-full border-2 border-blue-500 text-blue-500 py-3 px-6 rounded-lg font-medium"
            whileTap={{ scale: 0.98 }}
          >
            See Platform Demo
          </motion.button>
        </div>

        {/* Social proof - Mobile compact */}
        <div className="mt-8 text-center">
          <div className="text-xs text-gray-500 mb-2">
            Trusted by technical leaders
          </div>
          <div className="flex justify-center space-x-4">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">2000+ analyses</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">94% satisfaction</span>
          </div>
        </div>
      </motion.div>

      {/* Mobile performance indicators */}
      <style jsx>{`
        .mobile-optimized-container {
          /* MCP OPTIMIZATION: Mobile performance enhancements */
          -webkit-overflow-scrolling: touch;
          will-change: transform;
        }
        
        /* Optimize for touch interactions */
        button {
          min-height: 44px; /* iOS recommended touch target */
          touch-action: manipulation;
        }
        
        /* Reduce animation complexity on mobile */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}