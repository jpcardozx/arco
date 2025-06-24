'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { createHref } from '../../utils/navigation'

interface NavigationItem {
    label: string
    href: string
    description?: string
    dropdown?: {
        label: string
        href: string
        description: string
    }[]
}

export function ModernNavigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (!event.target) return
            const target = event.target as Element
            if (!target.closest('.dropdown-container')) {
                setActiveDropdown(null)
            }
        }

        window.addEventListener('scroll', handleScroll)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const navigationItems: NavigationItem[] = [
        {
            label: 'Solutions',
            href: '#value-proposition',
            dropdown: [
                {
                    label: 'Revenue Audit',
                    href: '#revenue-audit',
                    description: 'Free $15K technical audit in 48 hours'
                },
                {
                    label: 'Proof of Value',
                    href: '#strategic-services',
                    description: 'Single high-impact implementation with guaranteed ROI'
                },
                {
                    label: 'Scale Partnership',
                    href: '#strategic-services',
                    description: 'Ongoing optimization with performance bonuses'
                }
            ]
        },
        {
            label: 'Results',
            href: '#proven-results'
        },
        {
            label: 'Process',
            href: '#business-metrics'
        },
        {
            label: 'Get Audit',
            href: '#revenue-audit'
        }
    ]

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-xl'
                : 'bg-transparent'
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
                    >                        <Link href={createHref("/")} className="flex items-center space-x-3">
                            <Image
                                src="/logo-v2.svg"
                                alt="ARCO"
                                width={120}
                                height={32}
                                style={{ height: 'auto' }}
                                className={`transition-all duration-300 ${isScrolled ? 'brightness-0' : 'brightness-0 invert'
                                    }`}
                                priority
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <div key={item.label} className="relative dropdown-container">
                                {item.dropdown ? (
                                    <div>
                                        <button
                                            onClick={() => setActiveDropdown(
                                                activeDropdown === item.label ? null : item.label
                                            )}
                                            className={`group flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${isScrolled
                                                ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            <span>{item.label}</span>
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''
                                                }`} />
                                        </button>

                                        <AnimatePresence>
                                            {activeDropdown === item.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200/50 overflow-hidden"
                                                >
                                                    <div className="p-2">
                                                        {item.dropdown.map((dropdownItem) => (<Link
                                                            key={dropdownItem.href}
                                                            href={createHref(dropdownItem.href)}
                                                            className="flex items-start space-x-3 p-4 rounded-lg hover:bg-slate-50 transition-colors group"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            <div className="flex-1">
                                                                <div className="font-semibold text-slate-900 group-hover:text-blue-600">
                                                                    {dropdownItem.label}
                                                                </div>
                                                                <div className="text-sm text-slate-600 mt-1">
                                                                    {dropdownItem.description}
                                                                </div>
                                                            </div>
                                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                                        </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (<Link
                                    href={createHref(item.href)}
                                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${isScrolled
                                        ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                                        : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >                            <Link
                            href={createHref("/insight")}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                                <span>Free Audit</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mobile menu button */}
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMobileMenuOpen ? (
                            <X className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />
                        ) : (
                            <Menu className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/50"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navigationItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >                                        <Link
                                    href={createHref(item.href)}
                                    className="block text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                        {item.label}
                                    </Link>
                                    {item.dropdown && (
                                        <div className="pl-4 mt-2 space-y-2">
                                            {item.dropdown.map((dropdownItem) => (<Link
                                                key={dropdownItem.label}
                                                href={createHref(dropdownItem.href)}
                                                className="block text-slate-600 hover:text-blue-600 py-1 text-sm transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {dropdownItem.label}
                                            </Link>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            <motion.div
                                className="pt-4 border-t border-slate-200"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >                                <Link
                                href={createHref("/insight")}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-center block"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                    Free Audit
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
