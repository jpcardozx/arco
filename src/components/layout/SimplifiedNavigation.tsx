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
import { Menu, X, Target, Briefcase, Calendar, User } from 'lucide-react';
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
            className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-500 ${
                scrolled 
                    ? 'bg-slate-950/95 border-white/10 shadow-lg shadow-black/20' 
                    : 'bg-white/95 border-slate-200/50 shadow-sm'
            }`}
        >
            <Container>
                <div className="flex items-center justify-between h-20">
                    
                    {/* Logo with Elegant Transition */}
                    <Link 
                        href="/" 
                        className="relative flex items-center group"
                        onClick={() => trackEvent('nav_logo_clicked')}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-[140px] h-[45px] flex items-center"
                        >
                            <Image 
                                src={scrolled ? "/logos/horizontal/white.png" : "/logos/horizontal/black.png"}
                                alt="ARCO" 
                                width={140} 
                                height={45}
                                className="h-10 w-auto object-contain transition-opacity duration-500"
                                priority
                                unoptimized
                            />
                        </motion.div>
                    </Link>

                    {/* Professional Navigation Links - Enhanced Elegance */}
                    <div className="hidden md:flex items-center gap-10">
                        <Link 
                            href="/metodologia" 
                            className={`flex items-center gap-2.5 font-medium transition-all duration-300 group relative py-1 ${
                                scrolled ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                            }`}
                            onClick={() => handleLinkClick('nav_methodology_clicked', '/metodologia')}
                        >
                            <Target className="w-4 h-4 text-teal-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                            <span className="relative">
                                Metodologia
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-400 group-hover:w-full transition-all duration-300 rounded-full" />
                            </span>
                        </Link>
                        
                        <Link 
                            href="/services" 
                            className={`flex items-center gap-2.5 font-medium transition-all duration-300 group relative py-1 ${
                                scrolled ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                            }`}
                            onClick={() => handleLinkClick('nav_services_clicked', '/services')}
                        >
                            <Briefcase className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-all duration-300" />
                            <span className="relative">
                                Serviços
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 group-hover:w-full transition-all duration-300 rounded-full" />
                            </span>
                        </Link>
                        
                        <Link 
                            href="/agendamentos" 
                            className={`flex items-center gap-2.5 font-medium transition-all duration-300 group relative py-1 ${
                                scrolled ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                            }`}
                            onClick={() => handleLinkClick('nav_booking_clicked', '/agendamentos')}
                        >
                            <Calendar className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-all duration-300" />
                            <span className="relative">
                                Agendamentos
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400 group-hover:w-full transition-all duration-300 rounded-full" />
                            </span>
                        </Link>
                        
                        <Link 
                            href="/jpcardozo" 
                            className="flex items-center gap-2.5 text-teal-500 hover:text-teal-600 font-medium transition-all duration-300 group relative py-1"
                            onClick={() => handleLinkClick('nav_developer_clicked', '/jpcardozo')}
                        >
                            <User className="w-4 h-4 group-hover:scale-110 transition-all duration-300" />
                            <span className="relative">
                                Desenvolvedor
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-400 group-hover:w-full transition-all duration-300 rounded-full" />
                            </span>
                        </Link>
                    </div>

                    {/* Premium CTA - Refined */}
                    <div className="hidden md:flex items-center gap-4">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                variant="primary"
                                size="md"
                                onClick={handleCtaClick}
                                className={`font-semibold transition-all duration-300 ${
                                    scrolled
                                        ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/40'
                                        : 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/35'
                                }`}
                            >
                                Fale Conosco
                            </Button>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Button - Enhanced */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
                            scrolled
                                ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
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

                {/* Mobile Menu - Enhanced Elegance */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className={`md:hidden overflow-hidden border-t ${
                                scrolled ? 'border-white/10' : 'border-slate-200'
                            }`}
                        >
                            <div className="flex flex-col gap-2 py-6 px-2">
                                <Link 
                                    href="/metodologia" 
                                    className={`flex items-center gap-3.5 font-medium px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                                        scrolled
                                            ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                                    onClick={() => handleLinkClick('nav_methodology_mobile', '/metodologia')}
                                >
                                    <Target className="w-5 h-5 text-teal-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                                    <span>Metodologia</span>
                                </Link>
                                
                                <Link 
                                    href="/services" 
                                    className={`flex items-center gap-3.5 font-medium px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                                        scrolled
                                            ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                                    onClick={() => handleLinkClick('nav_services_mobile', '/services')}
                                >
                                    <Briefcase className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-all duration-300" />
                                    <span>Serviços</span>
                                </Link>
                                
                                <Link 
                                    href="/agendamentos" 
                                    className={`flex items-center gap-3.5 font-medium px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                                        scrolled
                                            ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                                    onClick={() => handleLinkClick('nav_booking_mobile', '/agendamentos')}
                                >
                                    <Calendar className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-all duration-300" />
                                    <span>Agendamentos</span>
                                </Link>
                                
                                <Link 
                                    href="/jpcardozo" 
                                    className={`flex items-center gap-3.5 font-medium px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                                        scrolled
                                            ? 'text-teal-400 hover:text-teal-300 hover:bg-slate-800/50'
                                            : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50'
                                    }`}
                                    onClick={() => handleLinkClick('nav_developer_mobile', '/jpcardozo')}
                                >
                                    <User className="w-5 h-5 group-hover:scale-110 transition-all duration-300" />
                                    <span>Desenvolvedor</span>
                                </Link>
                                
                                <div className={`px-2 pt-4 mt-2 border-t ${
                                    scrolled ? 'border-white/10' : 'border-slate-200'
                                }`}>
                                    <motion.div
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            onClick={handleCtaClick}
                                            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/35 transition-all duration-300"
                                        >
                                            Fale Conosco
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </motion.nav>
    );
};

export default SimplifiedNavigation;