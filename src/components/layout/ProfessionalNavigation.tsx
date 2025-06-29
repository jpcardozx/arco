'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, LogIn, Briefcase, FileText, Users, Mail, Calculator, Cpu, Code } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

/**
 * PROFESSIONAL NAVIGATION - Enterprise Tech Authority
 * 
 * Purpose:
 * - Clean, minimal UI following enterprise SaaS patterns
 * - Optimized for technical audience with clear CTAs
 * - Improved information architecture with simple hierarchy
 * - Performance and accessibility focused
 */

type NavigationItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  subItems?: {label: string; href: string}[];
  highlight?: boolean;
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  { 
    label: 'Digital Inefficiency', 
    href: '/inefficiency', 
    icon: Briefcase,
    highlight: true,
    subItems: [
      { label: 'Performance Revenue Gap', href: '/inefficiency#revenue-gap' },
      { label: 'Technical Debt Analysis', href: '/inefficiency#technical-debt' },
      { label: 'Efficiency Recovery', href: '/inefficiency#recovery' }
    ]
  },
  { label: '48h Recovery', href: '/recovery', icon: Cpu, highlight: true },
  { label: 'ROI Calculator', href: '/roi-calculator', icon: Calculator },
  { label: 'Case Studies', href: '/case-studies', icon: FileText },
  { label: 'About', href: '/about', icon: Users },
  { label: 'Contact', href: '/contact', icon: Mail }
];

export default function ProfessionalNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
    trackEvent({
      event: mobileMenuOpen ? 'mobile_menu_close' : 'mobile_menu_open',
      category: 'navigation',
      action: mobileMenuOpen ? 'close' : 'open'
    });
  };

  const isActiveRoute = (href: string) => 
    pathname === href || (href !== '/' && pathname?.startsWith(href));

  const handleSubMenuToggle = (index: number) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <>
      {/* Fixed background with subtle gradient and blur */}
      <div 
        className="fixed top-0 left-0 right-0 h-20 z-40 pointer-events-none"
        style={{
          background: isScrolled 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.94) 100%)',
          boxShadow: isScrolled 
            ? '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)' 
            : '0 1px 3px rgba(0, 0, 0, 0.02)',
          backdropFilter: isScrolled ? 'blur(12px) saturate(1.1)' : 'blur(8px)',
          WebkitBackdropFilter: isScrolled ? 'blur(12px) saturate(1.1)' : 'blur(8px)',
          borderBottom: isScrolled ? '1px solid rgba(226,232,240,0.6)' : '1px solid rgba(226,232,240,0.2)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Header content */}
      <header 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled ? 'transform translate-y-0' : 'transform translate-y-1'
        }`}
        style={{ pointerEvents: 'auto' }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className={`flex items-center justify-between transition-all duration-500 ease-out ${
            isScrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo */}
            <Link 
              href="/" 
              className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md transition-transform duration-200 hover:scale-105"
              aria-label="Arco Digital Performance - Home"
            >
              <div className="relative flex items-center">
                <Image
                  src="/logo-v2.png"
                  alt="Arco Digital Performance"
                  width={isScrolled ? 140 : 160}
                  height={isScrolled ? 40 : 48}
                  className={`transition-all duration-500 ease-out ${
                    isScrolled ? 'h-8' : 'h-10'
                  } w-auto`}
                  style={{
                    filter: isScrolled 
                      ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.08))' 
                      : 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.04))'
                  }}
                  priority
                />
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center space-x-3">
              {NAVIGATION_ITEMS.map((item, index) => (
                <div key={item.href} className="relative group">
                  <button
                    onClick={() => item.subItems && handleSubMenuToggle(index)}
                    onMouseEnter={() => item.subItems && setActiveSubmenu(index)}
                    onMouseLeave={() => item.subItems && setTimeout(() => setActiveSubmenu(null), 200)}
                    className={`
                      flex items-center px-4 py-2.5 text-sm font-medium rounded-md
                      ${isActiveRoute(item.href) 
                        ? 'text-white bg-blue-600 shadow-md' 
                        : item.highlight
                          ? 'text-slate-800 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-blue-700'}
                      transition-all duration-200 ease-in-out
                    `}
                  >
                    {React.createElement(item.icon, { className: `w-4 h-4 mr-2 flex-shrink-0 ${item.highlight ? 'text-blue-600' : ''}` })}
                    <span className={item.highlight ? 'font-semibold' : ''}>{item.label}</span>
                    {item.subItems && (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="ml-2"
                      >
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    )}
                  </button>

                  {/* Submenu */}
                  {item.subItems && (
                    <div
                      className={`
                        absolute left-0 mt-2 w-64 rounded-xl shadow-xl bg-white border border-slate-100
                        transform origin-top-left transition-all duration-200 ease-in-out
                        ${activeSubmenu === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                      `}
                      onMouseEnter={() => setActiveSubmenu(index)}
                      onMouseLeave={() => setActiveSubmenu(null)}
                    >
                      <div className="py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href as any}
                            className="flex items-center px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2.5"></span>
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Action buttons */}
            <div className="flex items-center space-x-3">
              <Link
                href={("/login" as any)}
                className="hidden md:flex items-center text-sm font-medium text-slate-700 hover:text-blue-700"
              >
                <LogIn className="w-4 h-4 mr-1.5" />
                Client Login
              </Link>

              <Link
                href={("/assessment" as any)}
                className="flex items-center px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-sm font-semibold rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                <Code className="w-4 h-4 mr-2" />
                48-Hour Recovery Plan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="lg:hidden p-1.5 rounded-md text-slate-700 hover:text-blue-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`
            lg:hidden fixed inset-0 z-40 bg-white transform transition-transform ease-in-out duration-300
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          style={{ top: '64px', height: 'calc(100vh - 64px)' }}
        >
          <div className="pt-4 pb-6 px-4 space-y-2 sm:px-5 overflow-y-auto max-h-full">
            {NAVIGATION_ITEMS.map((item, index) => (
              <div key={item.href} className="mb-2">
                <button
                  onClick={() => item.subItems ? handleSubMenuToggle(index) : window.location.href = item.href}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium
                    ${isActiveRoute(item.href) 
                      ? 'text-white bg-blue-600 shadow-sm' 
                      : item.highlight
                        ? 'text-slate-800 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-blue-700'}
                    transition-all duration-200 ease-in-out
                  `}
                >
                  <div className="flex items-center">
                    {React.createElement(item.icon, { className: `w-5 h-5 mr-3 flex-shrink-0 ${item.highlight ? 'text-blue-600' : ''}` })}
                    <span className={item.highlight ? 'font-semibold' : ''}>{item.label}</span>
                  </div>
                  {item.subItems && (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className={`transition-transform duration-200 ${activeSubmenu === index ? 'rotate-180' : ''}`}
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  )}
                </button>

                {/* Mobile submenu */}
                {item.subItems && activeSubmenu === index && (
                  <div className="pl-10 pr-4 py-2 mt-2 space-y-2 bg-slate-50 rounded-lg border-l-2 border-blue-500">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href as any}
                        className="flex items-center px-4 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-white hover:text-blue-700 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="w-2 h-2 rounded-full bg-slate-400 mr-3"></span>
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile action buttons */}
          <div className="border-t border-slate-200 pt-4 pb-6 px-5">
            <div className="flex flex-col space-y-3">
              <Link
                href={("/login" as any)}
                className="flex items-center px-4 py-2 text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="w-5 h-5 mr-3" />
                Client Login
              </Link>

              <Link
                href={("/assessment" as any)}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Code className="w-5 h-5 mr-2" />
                Get 48-Hour Recovery Plan
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden"
          aria-hidden="true"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Page content spacing */}
      <div className="h-16" />
    </>
  );
}
