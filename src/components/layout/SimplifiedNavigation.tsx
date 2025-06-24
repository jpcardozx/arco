'use client'

import { memo, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight, Zap, Briefcase, Calculator, FileText, Mail } from 'lucide-react'

/**
 * SIMPLIFIED NAVIGATION
 * 
 * Redução estratégica de 6 para 4 itens principais
 * Performance otimizada com scroll throttling
 * CTA integrado na navegação
 */

const SIMPLIFIED_NAV_ITEMS = [
    { label: 'Services', href: '/services', icon: Briefcase, isCTA: false },
    { label: 'Case Studies', href: '/case-studies', icon: FileText, isCTA: false },
    { label: 'Free Audit', href: '/audit', icon: Calculator, isCTA: true },
    { label: 'Contact', href: '/contact', icon: Mail, isCTA: false }
] as const

const SCROLL_THRESHOLD = 80

interface NavigationLinkProps {
    href: string
    label: string
    isActive: boolean
    isCTA?: boolean
    onClick?: () => void
    isMobile?: boolean
    icon?: React.ComponentType<{ className?: string }>
}

const NavigationLink = memo(({
    href,
    label,
    isActive,
    isCTA = false,
    onClick,
    isMobile = false,
    icon: Icon
}: NavigationLinkProps) => {

    const baseClasses = `
        group relative overflow-hidden transition-all duration-300 ease-out
        ${isMobile
            ? 'block px-6 py-4 text-lg font-medium rounded-2xl'
            : 'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl'
        }
    `

    const ctaClasses = `
        ${baseClasses}
        bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg
        hover:shadow-xl hover:from-emerald-700 hover:to-blue-700
        border border-emerald-500
    `

    const regularClasses = `
        ${baseClasses}
        ${isActive
            ? 'text-white bg-gradient-to-r from-primary-600 to-primary-700 shadow-md border border-primary-500'
            : 'text-neutral-700 hover:text-primary-700 hover:bg-white/90 hover:shadow-sm hover:border-primary-200 border border-transparent'
        }
    `

    return (
        <Link
            href={href as any}
            onClick={onClick}
            className={isCTA ? ctaClasses : regularClasses}
            aria-current={isActive ? 'page' : undefined}
        >
            {Icon && !isMobile && (
                <Icon className={`w-4 h-4 transition-transform duration-300 ${isCTA
                        ? 'text-white'
                        : isActive
                            ? 'text-white'
                            : 'text-primary-600 group-hover:scale-110'
                    }`} />
            )}
            <span className="relative z-10">{label}</span>
            {isCTA && !isMobile && (
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            )}
        </Link>
    )
})

NavigationLink.displayName = 'NavigationLink'

export default function SimplifiedNavigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navRef = useRef<HTMLElement>(null)
    const pathname = usePathname()

    // Optimized scroll handler with throttling
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

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
            return () => { document.body.style.overflow = '' }
        }
    }, [isMobileMenuOpen])

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)

    const isActiveRoute = (href: string) => {
        return pathname === href || (href !== '/' && pathname.startsWith(href))
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
                                    isCTA={item.isCTA}
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
                                isCTA={item.isCTA}
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
