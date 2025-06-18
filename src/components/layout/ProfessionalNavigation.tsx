'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Globe, Menu, X, Zap, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ProfessionalNavigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [language, setLanguage] = useState('EN')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { label: 'Site Reboot', href: '#services', highlight: '$1,200', description: 'Speed optimization for hotels & clinics' },
        { label: 'Case Studies', href: '#results', highlight: '< 1.4s LCP', description: 'Real performance improvements' },
        { label: 'ROI Calculator', href: '#calculator', highlight: '$400+ saved', description: 'See your potential savings' },
        { label: 'Free Audit', href: '#audit', highlight: 'Instant', description: 'Get immediate site analysis' }
    ]

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg shadow-black/5'
                        : 'bg-white'
                    }`}
            >
                <nav className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* Premium Logo */}
                        <Link
                            href="/"
                            className="flex items-center space-x-3 group"
                        >
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 p-2 group-hover:shadow-lg transition-all duration-300">
                                <Image
                                    src="/logo-v2.svg"
                                    alt="Arco"
                                    fill
                                    className="object-contain filter invert"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-gray-900 tracking-tight leading-none">
                                    Arco
                                </span>
                                <span className="text-xs text-gray-500 font-medium tracking-wide">
                                    PERFORMANCE LABS
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Premium */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative group px-4 py-3 rounded-lg transition-all duration-300 hover:bg-gray-50"
                                >
                                    <div className="flex flex-col items-center space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">
                                                {item.label}
                                            </span>
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                                {item.highlight}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500 text-center leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {item.description}
                                        </span>
                                    </div>
                                    <span className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                                </Link>
                            ))}
                        </div>

                        {/* Right side - Premium */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {/* Language Selector */}
                            <button
                                className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
                                onClick={() => setLanguage(language === 'EN' ? 'PT' : 'EN')}
                            >
                                <Globe className="w-4 h-4" />
                                <span>{language}</span>
                            </button>

                            {/* Premium CTA */}
                            <Link
                                href="#audit"
                                className="relative group bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className="flex items-center space-x-2">
                                    <Zap className="w-4 h-4" />
                                    <span>Free Speed Audit</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white border-t border-gray-100"
                        >
                            <div className="px-6 py-4 space-y-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-900">{item.label}</span>
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                                {item.highlight}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                    </Link>
                                ))}
                                <Link
                                    href="#audit"
                                    className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg font-semibold"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Free Speed Audit
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    )
}
