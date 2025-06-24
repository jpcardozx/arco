'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight, LogOut, User } from 'lucide-react'
import Link from 'next/link'import { createHref } from '@/utils/navigation';
import { useAuth } from '@/hooks/useAuth'

// Professional navigation bar
export function PremiumNavigation() {
    const { user, isAuthenticated, signOut } = useAuth()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navigationItems = [
        {
            label: 'Services',
            href: '/services',
            dropdown: [
                { label: 'Diagnostic Assessment', href: '/diagnose', description: 'Identify technical debt patterns' },
                { label: 'Pilot Implementation', href: '/pilot', description: 'Targeted intervention with guarantee' },
                { label: 'Scale & Growth', href: '/scale', description: 'Complete optimization suite' },
                { label: 'Ongoing Optimization', href: '/retainer', description: 'Continuous improvement program' }
            ]
        },
        {
            label: 'Solutions',
            href: '/solutions',
            dropdown: [
                { label: 'Mid-Market Companies', href: '/solutions/mid-market', description: 'Tailored for 100-999 employees' },
                { label: 'E-commerce Platforms', href: '/solutions/ecommerce', description: 'Conversion optimization focus' },
                { label: 'SaaS Applications', href: '/solutions/saas', description: 'Trial-to-paid improvement' },
                { label: 'Professional Services', href: '/solutions/professional', description: 'Authority positioning' }
            ]
        },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Methodology', href: '/methodology' },
        { label: 'About', href: '/about' }
    ]

    const handleDropdownToggle = (label: string) => {
        setActiveDropdown(activeDropdown === label ? null : label)
    }

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
                : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href={createHref("/")} className="flex items-center space-x-3">
                            <div className="text-2xl font-light text-slate-900">
                                ARCO
                            </div>
                            <div className="hidden sm:block text-xs text-slate-500 font-medium">
                                Technical Solutions
                            </div>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navigationItems.map((item, index) => (
                            <div key={item.label} className="relative">
                                {item.dropdown ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => handleDropdownToggle(item.label)}
                                            className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${isScrolled
                                                ? 'text-slate-700 hover:text-slate-900'
                                                : 'text-white hover:text-white/80'
                                                }`}
                                        >
                                            {item.label}
                                            <ChevronDown
                                                className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>

                                        <AnimatePresence>
                                            {activeDropdown === item.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 5 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50"
                                                    onMouseLeave={() => setActiveDropdown(null)}
                                                >
                                                    {item.dropdown.map((subItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            href={createHref(subItem.href)}
                                                            className="block px-4 py-3 hover:bg-slate-50 transition-colors"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            <div className="font-medium text-slate-900 mb-1">
                                                                {subItem.label}
                                                            </div>
                                                            <div className="text-sm text-slate-600">
                                                                {subItem.description}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        href={createHref(item.href)}
                                        className={`px-3 py-2 text-sm font-medium transition-colors ${isScrolled
                                            ? 'text-slate-700 hover:text-slate-900'
                                            : 'text-white hover:text-white/80'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}                        {/* User menu or login link */}
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg font-medium transition-colors ${isScrolled
                                            ? 'text-slate-700 hover:text-slate-900'
                                            : 'text-white/90 hover:text-white'
                                        }`}
                                >
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isScrolled
                                            ? 'bg-slate-900 text-white'
                                            : 'bg-white text-slate-900'
                                        }`}>
                                        <span className="font-semibold text-sm">{user?.name?.[0] || user?.email?.[0] || 'A'}</span>
                                    </div>
                                    <span>{user?.name || 'Account'}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>

                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50"
                                            onMouseLeave={() => setIsUserMenuOpen(false)}
                                        >
                                            <Link
                                                href={createHref("/dashboard")}
                                                className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                                            >
                                                <User className="h-4 w-4" />
                                                <span>Dashboard</span>
                                            </Link>

                                            <button
                                                onClick={() => signOut({ callbackUrl: '/' })}
                                                className="flex items-center space-x-2 w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Sign out</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                href={createHref("/auth/login")}
                                className={`inline-flex items-center px-4 py-1.5 rounded-lg font-medium transition-colors ${isScrolled
                                        ? 'text-slate-700 hover:text-slate-900'
                                        : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                Login
                            </Link>
                        )}

                        {/* CTA Button */}
                        {!isAuthenticated && (
                            <Link
                                href={createHref("/diagnose")}
                                className={`inline-flex items-center px-6 py-2 rounded-lg font-medium transition-all duration-300 ${isScrolled
                                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                                    : 'bg-white text-slate-900 hover:bg-slate-100'
                                    }`}
                            >
                                Start assessment
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden p-2 rounded-md transition-colors ${isScrolled
                            ? 'text-slate-700 hover:text-slate-900'
                            : 'text-white hover:text-white/80'
                            }`}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-white border-t border-slate-200 shadow-lg"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navigationItems.map((item, index) => (
                                <div key={item.label}>
                                    {item.dropdown ? (
                                        <div>
                                            <button
                                                onClick={() => handleDropdownToggle(item.label)}
                                                className="flex items-center justify-between w-full text-left py-2 text-slate-900 font-medium"
                                            >
                                                {item.label}
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>

                                            <AnimatePresence>
                                                {activeDropdown === item.label && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="ml-4 mt-2 space-y-2"
                                                    >
                                                        {item.dropdown.map((subItem, subIndex) => (
                                                            <Link
                                                                key={subIndex}
                                                                href={createHref(subItem.href)}
                                                                className="block py-2 text-slate-700 hover:text-slate-900"
                                                                onClick={() => {
                                                                    setIsMobileMenuOpen(false)
                                                                    setActiveDropdown(null)
                                                                }}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            href={createHref(item.href)}
                                            className="block py-2 text-slate-900 font-medium hover:text-slate-700"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}                            <div className="pt-4 border-t border-slate-200 space-y-4">
                                {isAuthenticated ? (
                                    <>
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                                                <span className="font-semibold">{user?.name?.[0] || user?.email?.[0] || 'A'}</span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900">{user?.name || 'User'}</div>
                                                <div className="text-slate-500 text-sm">{user?.email || ''}</div>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <Link
                                                href={createHref("/dashboard")}
                                                className="flex items-center space-x-2 w-full text-slate-700 font-medium hover:text-slate-900 py-2 transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <User className="h-4 w-4" />
                                                <span>Dashboard</span>
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    signOut({ callbackUrl: '/' });
                                                }}
                                                className="flex items-center space-x-2 w-full text-slate-700 font-medium hover:text-slate-900 py-2 transition-colors"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Sign out</span>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={createHref("/auth/login")}
                                            className="inline-block w-full text-slate-700 font-medium hover:text-slate-900 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            href={createHref("/diagnose")}
                                            className="inline-flex items-center w-full justify-center px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Start assessment
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}


