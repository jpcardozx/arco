'use client';

import { Menu, X } from 'lucide-react';
import { type Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import CTAButton from '../components/sections/CTAButton';
import { useTranslation } from '@/lib/i18n/context';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

interface NavItem {
  label: string;
  href: Route;
  icon?: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' as Route },
  { label: 'Diagnose', href: '/diagnose' as Route },
  { label: 'Solutions', href: '/solutions' as Route },
  { label: 'Case Studies', href: '/case-studies' as Route },
  { label: 'Contact', href: '/contact' as Route },
];

export function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`hover:text-primary flex items-center text-sm font-medium transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'
        }`}
    >
      {item.label}
    </Link>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detecta rolagem para estilização condicional
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`duration-900 fixed top-0 z-50 w-full border-b border-neutral-200 bg-neutral-50 backdrop-blur-sm transition-all ${scrolled ? 'py-4 shadow-xl' : 'py-8 shadow-2xl'
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" aria-label="Go to homepage" className="flex items-center">
          <Image
            src="/logo-v2.png"
            alt="ARCO Logo"
            width={96}
            height={40}
            className="object-contain opacity-90 transition-opacity duration-200 hover:opacity-100"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          role="navigation"
          aria-label="Main"
          className="font-garamond hidden items-center gap-8 text-sm tracking-wide text-neutral-900 md:flex"
        >
          {navItems.map(item => (
            <NavLink key={item.href} item={item} />
          ))}
          <CTAButton
            href="#apply"
            label="Request Entry"
            intent="secondary"
            size="sm"
            className="ml-6"
          />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="rounded-md p-2 text-neutral-800 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200 md:hidden"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`absolute w-full border-b border-neutral-200 bg-neutral-50 shadow-lg transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
          }`}
      >
        <div className="space-y-3 px-4 pb-4 pt-2">
          {navItems.map(item => (
            <div key={item.href} className="block py-2">
              <NavLink item={item} />
            </div>
          ))}
          <div className="pt-2">
            <CTAButton
              href="#apply"
              label="Request Entry"
              intent="secondary"
              size="sm"
              className="flex w-full justify-center"
              onClick={closeMenu}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
