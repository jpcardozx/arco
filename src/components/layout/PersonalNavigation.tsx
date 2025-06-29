'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight, Mail, Calculator, FileText, User } from 'lucide-react'

export default function PersonalNavigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    const navigationItems = [
        { label: 'About', href: '/about' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'ROI Calculator', href: '/roi-calculator' },
        { label: 'Contact', href: '/contact' }
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    const isActiveRoute = (href: string) => 
        pathname === href || (href !== '/' && pathname?.startsWith(href))

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/50' 
                    : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14">
                        
                        {/* Brand */}
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
                                <span className="text-white font-bold text-sm">JP</span>
                            </div>
                            <span className="font-medium text-slate-900">João Pedro</span>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center space-x-6">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-sm font-medium transition-colors ${
                                        isActiveRoute(item.href)
                                            ? 'text-emerald-600'
                                            : 'text-slate-700 hover:text-emerald-600'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA + Mobile button */}
                        <div className="flex items-center space-x-3">
                            <Link
                                href="/assessment"
                                className="hidden sm:flex items-center px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md transition-colors"
                            >
                                Get Assessment
                            </Link>

                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-1.5 rounded-md text-slate-700 hover:bg-slate-100"
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
                        <div className="px-4 py-3 space-y-1">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        isActiveRoute(item.href)
                                            ? 'text-emerald-600 bg-emerald-50'
                                            : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-2 border-t border-slate-200">
                                <Link
                                    href="/assessment"
                                    className="block px-3 py-2 bg-emerald-600 text-white font-medium rounded-md text-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Get Assessment
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}