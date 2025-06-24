'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'import { createHref } from '@/utils/navigation';
import Image from 'next/image'
import { LanguageSelector } from '../ui/LanguageSelector'

interface NavigationItem {
    label: string
    href: string
    description?: string
}

export function SophisticatedNavigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navigationItems: NavigationItem[] = [
        {
            label: 'Approach',
            href: '#value-proposition',
            description: 'Our methodology'
        },
        {
            label: 'Results',
            href: '#social-proof',
            description: 'Client outcomes'
        },
        {
            label: 'Assessment',
            href: '#assessment',
            description: 'Get started'
        }
    ]

    return (<motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-white/98 backdrop-blur-xl border-b border-slate-200/60 shadow-lg'
            : 'bg-slate-900/80 backdrop-blur-sm border-b border-white/10'
            }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >                    <Link href={createHref("/")} className="flex items-center">
                        <Image
                            src="/logo-v2.svg"
                            alt="ARCO"
                            width={120}
                            height={40}
                            style={{ height: 'auto' }}
                            className={`transition-all duration-300 ${isScrolled ? 'opacity-100' : 'brightness-0 invert opacity-90'
                                }`}
                        />
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8">
                    {navigationItems.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        >
                            <Link
                                href={createHref(item.href)}
                                className={`group px-3 py-2 rounded-lg font-medium transition-all duration-300 ${isScrolled
                                    ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                                    : 'text-white/90 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </motion.div>
                    ))}                    {/* Language Selector */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <LanguageSelector />
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <Link
                            href="#assessment"
                            className={`group inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${isScrolled
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                : 'bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            Get Assessment
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`p-2 rounded-lg transition-colors ${isScrolled
                            ? 'text-slate-700 hover:bg-slate-100'
                            : 'text-white hover:bg-white/10'
                            }`}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden border-t border-slate-200/20 bg-white/95 backdrop-blur-xl"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={createHref(item.href)}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href="#assessment"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                            >
                                Get Assessment
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </motion.nav>
    )
}


