"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
    threshold?: number;
    right?: number;
    bottom?: number;
}

export default function ScrollToTop({
    threshold = 300,
    right = 20,
    bottom = 20
}: ScrollToTopProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [threshold]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Track the event if analytics are available
        if (typeof window !== 'undefined') {
            try {
                const { trackPortfolioEvent } = require('../../lib/portfolioAnalytics');
                trackPortfolioEvent({
                    eventName: 'scroll_to_top',
                    section: 'navigation',
                    action: 'click'
                });
            } catch (e) {
                console.error('Could not track scroll event:', e);
            }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="portfolio-scroll-top-button fixed z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
                    style={{ bottom: `${bottom}px`, right: `${right}px` }}
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-5 w-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
