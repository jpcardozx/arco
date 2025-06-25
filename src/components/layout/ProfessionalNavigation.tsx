'use client';

import { memo, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Zap, LogIn, Briefcase, FileText, Users, Mail, Calculator, Workflow } from 'lucide-react';

const NAVIGATION_ITEMS = [
    { label: 'Services', href: '/services', icon: Briefcase },
    { label: 'Assessment', href: '/assessment', icon: Workflow },
    { label: 'ROI Calculator', href: '/roi-calculator', icon: Calculator },
    { label: 'Case Studies', href: '/case-studies', icon: FileText },
    { label: 'About', href: '/about', icon: Users },
    { label: 'Contact', href: '/contact', icon: Mail }
] as const;

const SCROLL_THRESHOLD = 80;

interface NavigationLinkProps {
    href: string;
    label: string;
    isActive: boolean;
    onClick?: () => void;
    isMobile?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
}

const NavigationLink = memo(({ href, label, isActive, onClick, isMobile = false, icon: Icon }: NavigationLinkProps) => (
    <Link
        href={href as any}
        onClick={onClick}
        className={`
            group relative overflow-hidden transition-all duration-300 ease-out
            ${isMobile
                ? 'block px-6 py-4 text-lg font-medium rounded-2xl'
                : 'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl'
            }
            ${isActive
                ? 'text-white bg-gradient-to-r from-primary-600 to-primary-700 shadow-medium border border-primary-500'
                : 'text-neutral-700 hover:text-primary-700 hover:bg-white/90 hover:shadow-soft hover:border-primary-200 border border-transparent'
            }
        `}
        aria-current={isActive ? 'page' : undefined}
    >
        {Icon && !isMobile && (
            <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-white' : 'text-primary-600 group-hover:scale-110'}`} />
        )}
        <span className="relative z-10">{label}</span>
        {!isMobile && !isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary-50/0 via-primary-50/80 to-accent-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
    </Link>
));

NavigationLink.displayName = 'NavigationLink';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);
    useEffect(() => { if (isMobileMenuOpen) { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; } }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const isActiveRoute = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

    return (
        <>
            {/* Glassmorphism overlay premium */}
            <div
                className="fixed top-0 left-0 right-0 h-24 z-50 pointer-events-none"
                style={{
                    background: isScrolled
                        ? 'rgba(255,255,255,0.96)'
                        : 'linear-gradient(120deg,rgba(255,255,255,0.90) 60%,rgba(245,247,250,0.82) 100%)',
                    backdropFilter: 'blur(28px) saturate(2.2)',
                    WebkitBackdropFilter: 'blur(28px) saturate(2.2)',
                    borderBottom: '1.5px solid rgba(200,200,200,0.10)',
                    boxShadow: isScrolled
                        ? '0 8px 32px 0 rgba(16,40,80,0.10), 0 1.5px 0 0 rgba(0,0,0,0.04)'
                        : '0 2px 16px 0 rgba(16,40,80,0.04)',
                    transition: 'background 0.5s, box-shadow 0.5s',
                    opacity: 0.98,
                }}
            />

            <header
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled ? 'translate-y-0' : 'translate-y-2'}`}
                style={{ pointerEvents: 'auto' }}
            >
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className={`flex items-center justify-between transition-all duration-500 ease-out ${isScrolled ? 'h-16' : 'h-20'}`}>
                        {/* Logo com sombra adaptativa */}
                        <Link href="/" className="group flex-shrink-0 focus:outline-none rounded-xl transition-transform duration-200 hover:scale-105" aria-label="Arco Digital Performance - Home">
                            <div className="relative">
                                <Image
                                    src="/logo-v2.png"
                                    alt="Arco Digital Performance"
                                    width={isScrolled ? 140 : 160}
                                    height={isScrolled ? 42 : 48}
                                    className={`relative transition-all duration-500 ease-out ${isScrolled ? 'h-8' : 'h-10'} w-auto`}
                                    priority
                                    style={{
                                        filter: isScrolled
                                            ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.13))'
                                            : 'drop-shadow(0 1px 0 white)',
                                        transition: 'filter 0.4s',
                                    }}
                                />
                            </div>
                        </Link>
                        {/* Navegação centralizada premium */}
                        <nav className="hidden lg:flex flex-1 justify-center" role="navigation">
                            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/30 shadow-lg">
                                {NAVIGATION_ITEMS.map(({ label, href, icon }) => (
                                    <NavigationLink
                                        key={href}
                                        href={href}
                                        label={label}
                                        isActive={isActiveRoute(href)}
                                        icon={icon}
                                    />
                                ))}
                            </div>
                        </nav>
                        {/* CTA destacado e login */}
                        <div className="flex items-center gap-3">
                            <Link href={"/login" as any} className="hidden md:flex items-center gap-2 text-neutral-700 hover:text-primary-700 px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/90 hover:shadow-soft transition-all duration-300 border border-transparent hover:border-primary-200 group">
                                <LogIn className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                                <span>Login</span>
                            </Link>
                            <Link
                                href={"/audit" as any}
                                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 via-blue-600 to-emerald-600 text-white px-8 py-3 text-base font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 overflow-hidden"
                                style={{ boxShadow: '0 6px 32px 0 rgba(16,185,129,0.18), 0 1.5px 0 0 rgba(0,0,0,0.04)' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Zap className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
                                <span className="relative z-10">Request Your Free Audit</span>
                                <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Link>
                            {/* Mobile menu button */}
                            <button type="button" onClick={toggleMobileMenu} className="lg:hidden p-3 text-neutral-600 hover:text-neutral-900 bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 border border-neutral-200/50 shadow-sm hover:shadow-md">
                                <div className="relative w-5 h-5">
                                    <div className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}>
                                        <Menu className="w-5 h-5" />
                                    </div>
                                    <div className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`}>
                                        <X className="w-5 h-5" />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>            {/* Mobile Menu */}
            <div className={`
                fixed top-20 left-4 right-4 z-40 lg:hidden transition-all duration-300 ease-out
                ${isMobileMenuOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                }
            `}>
                <div className="bg-white/98 backdrop-blur-xl rounded-3xl shadow-xl border border-neutral-200/50 overflow-hidden">
                    <nav className="p-6" role="navigation">
                        <div className="space-y-3">
                            {NAVIGATION_ITEMS.map(({ label, href }, index) => (
                                <div
                                    key={href}
                                    className="transition-all duration-300 ease-out"
                                    style={{
                                        transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                                    }}
                                >
                                    <NavigationLink
                                        href={href}
                                        label={label}
                                        isActive={isActiveRoute(href)}
                                        onClick={toggleMobileMenu}
                                        isMobile
                                    />
                                </div>
                            ))}

                            {/* Mobile Login Button */}
                            <div
                                className="pt-2 transition-all duration-300 ease-out"
                                style={{
                                    transitionDelay: isMobileMenuOpen ? `${NAVIGATION_ITEMS.length * 50}ms` : '0ms'
                                }}
                            >
                                <Link
                                    href={"/login" as any}
                                    onClick={toggleMobileMenu}
                                    className="
                                        group flex items-center justify-center gap-2 w-full
                                        text-neutral-700 hover:text-primary-700 
                                        px-6 py-4 text-lg font-medium rounded-2xl
                                        hover:bg-white/90 border border-neutral-200/50
                                        transition-all duration-300 ease-out
                                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                                    "
                                >
                                    <LogIn className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                                    <span>Login</span>
                                </Link>
                            </div>

                            {/* Mobile CTA */}
                            <div
                                className="pt-2 transition-all duration-300 ease-out"
                                style={{
                                    transitionDelay: isMobileMenuOpen ? `${(NAVIGATION_ITEMS.length + 1) * 50}ms` : '0ms'
                                }}
                            >
                                <Link
                                    href={"/audit" as any}
                                    onClick={toggleMobileMenu}
                                    className="
                                        group flex items-center justify-center space-x-2 w-full
                                        bg-gradient-to-r from-primary-600 to-primary-700 text-white 
                                        px-6 py-4 text-lg font-semibold rounded-2xl
                                        hover:shadow-lg hover:shadow-primary-600/25
                                        transition-all duration-300 ease-out
                                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                                    "
                                >
                                    <Zap className="w-5 h-5" />
                                    <span>Request Free Audit</span>
                                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Backdrop */}
            <div
                className={`
                    fixed inset-0 bg-neutral-900/20 backdrop-blur-sm z-30 lg:hidden
                    transition-opacity duration-300 ease-out
                    ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                onClick={toggleMobileMenu}
                aria-hidden="true"
            />

            {/* Header spacer */}
            <div className={`transition-all duration-500 ease-out ${isScrolled ? 'h-16' : 'h-20'}`} />
        </>
    );
}