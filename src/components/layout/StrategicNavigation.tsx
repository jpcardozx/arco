'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight, Zap, Target, TrendingUp, Shield, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface NavigationItem {
    label: string
    href: string
    description?: string
    icon?: React.ComponentType<{ className?: string }>
    badge?: string
    dropdown?: {
        label: string
        href: string
        description: string
        icon: React.ComponentType<{ className?: string }>
        badge?: string
    }[]
}

// Strategic navigation aligned with our "systematic infrastructure optimization" positioning
export function StrategicNavigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [showAssessmentCTA, setShowAssessmentCTA] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

    const navigationItems: NavigationItem[] = [{
        label: 'Auditorias',
        href: '/diagnose',
        description: 'Revenue leak detection',
        icon: Target,
        dropdown: [
            {
                label: 'Revenue Hemorrhage Audit™',
                href: '/diagnose',
                description: '48h para identificar exatamente onde você perde $4,680/mês',
                icon: Zap,
                badge: '48h'
            },
            {
                label: 'Mobile Conversion Surgery',
                href: '/conversion-rescue',
                description: 'Friction analysis: de 1.9% para 8.2% conversão mobile',
                icon: TrendingUp
            },
            {
                label: 'Performance Death Audit',
                href: '/performance-audit',
                description: 'Load time killing revenue: mapeamento + ROI projetado',
                icon: Shield
            }
        ]
    },
    {
        label: 'Intervenções',
        href: '/solutions',
        description: 'Emergency & strategic fixes',
        icon: Shield,
        dropdown: [
            {
                label: 'T1: Revenue Hemorrhage Audit™',
                href: '/solutions/audit',
                description: 'Mapeamento completo: $4,680/mês waste + action plan (48h)',
                icon: Target,
                badge: '$497-997'
            },
            {
                label: 'T2: Emergency Surgery™',
                href: '/solutions/emergency',
                description: 'Rescue crítico: cortar tools, fix flows (7-14 dias)',
                icon: Zap,
                badge: '$1,997-2,997'
            },
            {
                label: 'T3: Rebuild Completo™',
                href: '/solutions/rebuild',
                description: 'Foundation nova: SSR + performance guarantee (4-8 weeks)',
                icon: TrendingUp,
                badge: '$4,997-7,997'
            }
        ]
    }, {
        label: 'Case Studies',
        href: '/case-studies',
        description: 'Resultados comprovados'
    },
    {
        label: 'Metodologia',
        href: '/methodology',
        description: 'Como eliminamos waste'
    }
    ]

    const handleDropdownToggle = (label: string) => {
        setActiveDropdown(activeDropdown === label ? null : label)
    }

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-lg'
                    : 'bg-transparent'
                    }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* Strategic Logo */}
                        <motion.div
                            className="flex items-center space-x-4"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link href="/" className="flex items-center space-x-3 group">                                <motion.div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isScrolled
                                    ? 'bg-red-600 text-white'
                                    : 'bg-red-500/30 backdrop-blur-sm border border-red-500/50 text-white'
                                    }`}
                                whileHover={{ rotate: 180, scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <AlertTriangle className="w-5 h-5" />
                            </motion.div>
                                <div className="flex flex-col">
                                    <span className={`font-bold text-xl tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'
                                        }`}>
                                        ARCO
                                    </span>
                                    <span className={`text-xs font-medium -mt-1 transition-colors ${isScrolled ? 'text-red-600' : 'text-red-300'
                                        }`}>
                                        Revenue Recovery
                                    </span>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
                            {navigationItems.map((item) => (
                                <div key={item.label} className="relative">
                                    {item.dropdown ? (
                                        <div className="relative">
                                            <button
                                                onClick={() => handleDropdownToggle(item.label)}
                                                className={`group flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isScrolled
                                                    ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                                                    : 'text-white/90 hover:text-white hover:bg-white/10'
                                                    } ${activeDropdown === item.label ? 'bg-slate-100' : ''}`}
                                            >
                                                {item.icon && <item.icon className="w-4 h-4" />}
                                                <span>{item.label}</span>
                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>

                                            <AnimatePresence>
                                                {activeDropdown === item.label && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                                        className="absolute left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-200/50 overflow-hidden z-50"
                                                    >
                                                        <div className="p-2">
                                                            {item.dropdown.map((subItem) => (
                                                                <Link
                                                                    key={subItem.href}
                                                                    href={subItem.href}
                                                                    className="flex items-start space-x-3 p-4 rounded-lg hover:bg-slate-50 transition-colors group"
                                                                    onClick={() => setActiveDropdown(null)}
                                                                >
                                                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                                                        <subItem.icon className="w-5 h-5 text-blue-600" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center space-x-2 mb-1">
                                                                            <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                                                                                {subItem.label}
                                                                            </h4>
                                                                            {subItem.badge && (
                                                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                                                                    {subItem.badge}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <p className="text-sm text-slate-600 leading-relaxed">
                                                                            {subItem.description}
                                                                        </p>
                                                                    </div>
                                                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`group flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isScrolled
                                                ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            {item.icon && <item.icon className="w-4 h-4" />}
                                            <span>{item.label}</span>
                                        </Link>
                                    )}
                                </div>
                            ))}

                            {/* Strategic CTA */}
                            <motion.div className="ml-6">
                                <Link
                                    href="/diagnose"
                                    className={`group inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${isScrolled
                                        ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl'
                                        : 'bg-white text-slate-900 hover:bg-white/95 shadow-lg hover:shadow-xl'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Zap className="w-4 h-4" />
                                    <span>Get Efficiency Snapshot</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile menu button */}
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`lg:hidden p-3 rounded-lg transition-colors ${isScrolled
                                ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                                : 'text-white hover:text-white/80 hover:bg-white/10'
                                }`}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 lg:hidden"
                        >
                            <div className="p-6 border-b border-slate-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">ARCO</div>
                                            <div className="text-xs text-blue-600">Efficiency Catalyst</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 text-slate-500 hover:text-slate-700"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 space-y-4 overflow-y-auto">
                                {navigationItems.map((item) => (
                                    <div key={item.label}>
                                        {item.dropdown ? (
                                            <div>
                                                <button
                                                    onClick={() => handleDropdownToggle(item.label)}
                                                    className="flex items-center justify-between w-full text-left py-3 text-slate-900 font-semibold hover:text-blue-700 transition-colors"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        {item.icon && <item.icon className="w-5 h-5" />}
                                                        <span>{item.label}</span>
                                                    </div>
                                                    <ChevronDown
                                                        className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''
                                                            }`}
                                                    />
                                                </button>

                                                <AnimatePresence>
                                                    {activeDropdown === item.label && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="ml-8 mt-2 space-y-3"
                                                        >
                                                            {item.dropdown.map((subItem) => (
                                                                <Link
                                                                    key={subItem.href}
                                                                    href={subItem.href}
                                                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                                                                    onClick={() => {
                                                                        setIsMobileMenuOpen(false)
                                                                        setActiveDropdown(null)
                                                                    }}
                                                                >
                                                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                        <subItem.icon className="w-4 h-4 text-blue-600" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="flex items-center space-x-2 mb-1">
                                                                            <h4 className="font-medium text-slate-900">
                                                                                {subItem.label}
                                                                            </h4>
                                                                            {subItem.badge && (
                                                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                                                                    {subItem.badge}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <p className="text-sm text-slate-600">
                                                                            {subItem.description}
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="flex items-center space-x-3 py-3 text-slate-900 font-semibold hover:text-blue-700 transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.icon && <item.icon className="w-5 h-5" />}
                                                <span>{item.label}</span>
                                            </Link>
                                        )}
                                    </div>
                                ))}

                                <div className="pt-6 border-t border-slate-200">
                                    <Link
                                        href="/diagnose"
                                        className="flex items-center justify-center space-x-2 w-full px-6 py-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Zap className="w-4 h-4" />
                                        <span>Get Efficiency Snapshot</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
