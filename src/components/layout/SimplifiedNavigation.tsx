'use client';

/**
 * PROFESSIONAL NAVIGATION - Premium UX
 * 
 * Navigation with real sitemap links, contextual icons, and polished interactions
 * Elegant logo transition on scroll with optimized performance
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../primitives/Container/Container';
import { Button } from '../primitives/Button/Button';
import { useTracking } from '../../lib/useTracking';
import { Menu, X, Target, Briefcase, Calendar, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SimplifiedNavigation: React.FC = () => {
    const { trackEvent } = useTracking();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        
        // Debounced scroll handler for performance
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Dynamic theme-color: match nav background on Android status bar
    useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', scrolled ? '#0f172a' : '#ffffff');
        }
    }, [scrolled]);

    const handleCtaClick = () => {
        trackEvent('nav_cta_clicked');
        setIsMobileMenuOpen(false);
        window.location.href = '/contato';
    };

    const handleLinkClick = (event: string, href: string) => {
        trackEvent(event);
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-4 left-4 right-4 z-50 safe-area-top"
        >
            <div className={`backdrop-blur-xl border transition-all duration-700 ease-out rounded-2xl shadow-2xl ${
                scrolled
                    ? 'bg-slate-900/90 border-slate-700/30 shadow-slate-900/40'
                    : 'bg-white/85 border-slate-200/40 shadow-slate-900/10'
            }`}>
                <Container>
                    <div className="flex items-center justify-between h-16 px-6">
                    
                        {/* Logo */}
                        <Link
                            href="/"
                            className="relative flex items-center group"
                            onClick={() => trackEvent('nav_logo_clicked')}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                className="relative w-[120px] h-[35px] flex items-center"
                            >
                                <Image
                                    src={scrolled ? "/logos/horizontal/white.png" : "/logos/horizontal/black.png"}
                                    alt="ARCO"
                                    width={120}
                                    height={35}
                                    className="h-8 w-auto object-contain transition-all duration-700"
                                    priority
                                    unoptimized
                                />
                            </motion.div>
                        </Link>

                        {/* Navigation Links - Refined Professional Design */}
                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                href="/metodologia"
                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:backdrop-blur-sm relative group ${
                                    scrolled
                                        ? 'text-slate-200 hover:text-white hover:bg-slate-800/30'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                                }`}
                                onClick={() => handleLinkClick('nav_methodology_clicked', '/metodologia')}
                            >
                                <span className="relative z-10">Metodologia</span>
                            </Link>

                            <Link
                                href="/services"
                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:backdrop-blur-sm relative group ${
                                    scrolled
                                        ? 'text-slate-200 hover:text-white hover:bg-slate-800/30'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                                }`}
                                onClick={() => handleLinkClick('nav_services_clicked', '/services')}
                            >
                                <span className="relative z-10">Serviços</span>
                            </Link>

                            <Link
                                href="/agendamentos"
                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:backdrop-blur-sm relative group ${
                                    scrolled
                                        ? 'text-slate-200 hover:text-white hover:bg-slate-800/30'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                                }`}
                                onClick={() => handleLinkClick('nav_booking_clicked', '/agendamentos')}
                            >
                                <span className="relative z-10">Agendamentos</span>
                            </Link>

                            <div className={`w-px h-6 mx-2 ${scrolled ? 'bg-slate-600' : 'bg-slate-300'}`} />

                            <Link
                                href="/jpcardozx"
                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 relative group ${
                                    scrolled
                                        ? 'text-teal-300 hover:text-teal-200 hover:bg-teal-900/20'
                                        : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50/80'
                                }`}
                                onClick={() => handleLinkClick('nav_developer_clicked', '/jpcardozx')}
                            >
                                <span className="relative z-10">Portfolio</span>
                            </Link>
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:flex items-center">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={handleCtaClick}
                                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                                    scrolled
                                        ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-600/20'
                                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20'
                                }`}
                            >
                                Fale Conosco
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className={`md:hidden p-3 rounded-xl transition-all duration-300 ${
                                scrolled
                                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                            }`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={24} strokeWidth={2.5} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={24} strokeWidth={2.5} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>

                </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                className={`md:hidden overflow-hidden border-t ${
                                    scrolled ? 'border-slate-700/30' : 'border-slate-200/40'
                                }`}
                            >
                                <div className="flex flex-col gap-1 py-6 px-6">
                                    <Link
                                        href="/metodologia"
                                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                            scrolled
                                                ? 'text-slate-200 hover:text-white hover:bg-slate-800/30'
                                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                                        }`}
                                        onClick={() => handleLinkClick('nav_methodology_mobile', '/metodologia')}
                                    >
                                        Metodologia
                                    </Link>

                                    <Link
                                        href="/services"
                                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                            scrolled
                                                ? 'text-slate-200 hover:text-white hover:bg-slate-800/30'
                                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                                        }`}
                                        onClick={() => handleLinkClick('nav_services_mobile', '/services')}
                                    >
                                        Serviços
                                    </Link>

                                    <Link
                                        href="/agendamentos"
                                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                            scrolled
                                                ? 'text-slate-200 hover:text-white hover:bg-slate-800/30'
                                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                                        }`}
                                        onClick={() => handleLinkClick('nav_booking_mobile', '/agendamentos')}
                                    >
                                        Agendamentos
                                    </Link>

                                    <Link
                                        href="/jpcardozx"
                                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                            scrolled
                                                ? 'text-teal-300 hover:text-teal-200 hover:bg-teal-900/20'
                                                : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50/80'
                                        }`}
                                        onClick={() => handleLinkClick('nav_developer_mobile', '/jpcardozx')}
                                    >
                                        Portfolio
                                    </Link>

                                    <div className={`pt-4 mt-3 border-t ${
                                        scrolled ? 'border-slate-700/30' : 'border-slate-200/40'
                                    }`}>
                                        <motion.button
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleCtaClick}
                                            className={`w-full px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                                scrolled
                                                    ? 'bg-teal-600 hover:bg-teal-500 text-white'
                                                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                                            }`}
                                        >
                                            Fale Conosco
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Container>
            </div>
        </motion.nav>
    );
};

export default SimplifiedNavigation;