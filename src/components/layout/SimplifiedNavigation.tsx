'use client'

import { memo, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight, Zap, Brain, Calculator, TrendingUp, FileText, Users, LogIn, Shield } from 'lucide-react'

/**
 * STRATEGIC ENTERPRISE NAVIGATION
 * 
 * VALUE-FIRST PROGRESSION:
 * 1. Free Resources → Framework → Assessment → Cases → Services
 * 2. Designed for $10M+ ARR decision makers (CTOs/COOs)
 * 3. Technical authority positioning
 * 4. Sophisticated design language
 */

const SIMPLIFIED_NAV_ITEMS = [
    { label: 'Framework', href: '/methodology', icon: Brain, category: 'value', isCTA: false },
    { label: 'ROI Calculator', href: '/roi-calculator', icon: Calculator, category: 'tools', isCTA: false },
    { label: 'Assessment', href: '/assessment', icon: TrendingUp, category: 'evaluation', isCTA: false },
    { label: 'Case Studies', href: '/case-studies', icon: FileText, category: 'proof', isCTA: false },
    { label: 'Services', href: '/services', icon: Shield, category: 'services', isCTA: false }
] as const

const SCROLL_THRESHOLD = 80

interface NavigationLinkProps {
    href: string
    label: string
    isActive: boolean
    category?: string
    onClick?: () => void
    isMobile?: boolean
    icon?: React.ComponentType<{ className?: string }>
}

const NavigationLink = memo(({
    href,
    label,
    isActive,
    category = 'default',
    onClick,
    isMobile = false,
    icon: Icon
}: NavigationLinkProps) => {

    // Enterprise-grade styling with category-based visual hierarchy
    const getCategoryStyles = (cat: string, active: boolean) => {
        const baseStyles = `
            group relative overflow-hidden transition-all duration-300 ease-out
            ${isMobile
                ? 'block px-6 py-4 text-lg font-medium rounded-2xl'
                : 'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl'
            }
        `

        if (active) {
            return `${baseStyles} text-white bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg border border-slate-700`
        }

        switch (cat) {
            case 'value':
                return `${baseStyles} text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 hover:border-emerald-200 border border-transparent`
            case 'tools':
                return `${baseStyles} text-blue-700 hover:text-blue-800 hover:bg-blue-50 hover:border-blue-200 border border-transparent`
            case 'evaluation':
                return `${baseStyles} text-purple-700 hover:text-purple-800 hover:bg-purple-50 hover:border-purple-200 border border-transparent`
            case 'proof':
                return `${baseStyles} text-orange-700 hover:text-orange-800 hover:bg-orange-50 hover:border-orange-200 border border-transparent`
            case 'services':
                return `${baseStyles} text-slate-700 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-200 border border-transparent`
            default:
                return `${baseStyles} text-neutral-700 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-200 border border-transparent`
        }
    }

    const getIconStyles = (cat: string, active: boolean) => {
        if (active) return 'text-white'

        switch (cat) {
            case 'value': return 'text-emerald-600 group-hover:scale-110'
            case 'tools': return 'text-blue-600 group-hover:scale-110'
            case 'evaluation': return 'text-purple-600 group-hover:scale-110'
            case 'proof': return 'text-orange-600 group-hover:scale-110'
            case 'services': return 'text-slate-600 group-hover:scale-110'
            default: return 'text-slate-600 group-hover:scale-110'
        }
    }

    return (
        <Link
            href={href as any}
            onClick={onClick}
            className={getCategoryStyles(category, isActive)}
            aria-current={isActive ? 'page' : undefined}
        >
            {Icon && !isMobile && (
                <Icon className={`w-4 h-4 transition-transform duration-300 ${getIconStyles(category, isActive)}`} />
            )}
            <span className="relative z-10 font-semibold">{label}</span>
            {/* Subtle hover indicator */}
            {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
        </Link>
    )
})

NavigationLink.displayName = 'NavigationLink'

export default function StrategicEnterpriseNavigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navRef = useRef<HTMLElement>(null)
    const pathname = usePathname()

    // Performance-optimized scroll handler
    useEffect(() => {
        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
            return () => { document.body.style.overflow = '' }
        }
    }, [isMobileMenuOpen])

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)

    const isActiveRoute = (href: string) => {
        return pathname === href || (href !== '/' && pathname?.startsWith(href)) || false
    }

    return (
        <>
            {/* Backdrop Blur */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/95 via-white/90 to-white/70 backdrop-blur-xl z-40 pointer-events-none border-b border-neutral-200/20" />

            {/* Main Navigation */}
            <nav
                ref={navRef}
                className={`
                    fixed top-0 left-0 right-0 z-50 transition-all duration-300
                    ${isScrolled
                        ? 'py-3 bg-white/95 backdrop-blur-xl shadow-lg border-b border-neutral-200/50'
                        : 'py-4 bg-transparent'
                    }
                `}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
                            aria-label="ARCO - Homepage"
                        >
                            <div className="relative w-10 h-10">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl" />
                                <div className="absolute inset-0.5 bg-white rounded-lg flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-primary-600" />
                                </div>
                            </div>
                            <span className="text-xl font-bold text-neutral-900">ARCO</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-2">
                            {SIMPLIFIED_NAV_ITEMS.map((item) => (
                                <NavigationLink
                                    key={item.href}
                                    href={item.href}
                                    label={item.label}
                                    icon={item.icon}
                                    isActive={isActiveRoute(item.href)}
                                />
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 rounded-xl border border-neutral-200 bg-white/90 backdrop-blur-sm hover:bg-neutral-50 transition-colors duration-200"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-neutral-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-neutral-700" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={toggleMobileMenu}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Menu Panel */}
            <div className={`
                fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50 
                bg-white/95 backdrop-blur-xl border-l border-neutral-200/50 shadow-2xl
                transform transition-transform duration-300 ease-out md:hidden
                ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="p-6 pt-20">
                    <div className="space-y-3">
                        {SIMPLIFIED_NAV_ITEMS.map((item) => (
                            <NavigationLink
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                isActive={isActiveRoute(item.href)}
                                onClick={toggleMobileMenu}
                                isMobile={true}
                            />
                        ))}
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="mt-8 pt-6 border-t border-neutral-200">
                        <p className="text-sm text-neutral-500 text-center">
                            Transform your performance.<br />
                            Guaranteed results in 47 days.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
