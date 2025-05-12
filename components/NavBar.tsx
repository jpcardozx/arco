'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CTAButton from './CTAButton';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { label: 'Methodology', href: '#methodology' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Results', href: '#results' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState('');
    const [scrolled, setScrolled] = useState(false);

    // Detecta rolagem para estilização condicional
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Detecta seção atual baseada na rolagem
    useEffect(() => {
        const handleSectionDetection = () => {
            const sections = navItems.map(item => item.href.replace('#', ''));

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setCurrentSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleSectionDetection);
        return () => window.removeEventListener('scroll', handleSectionDetection);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => setIsMenuOpen(false);

    type NavItem = { label: string; href: string };

    const NavLink = ({ item }: { item: NavItem }) => {
        const isActive = currentSection === item.href.replace('#', '');

        return (
            <Link
                key={item.href}
                href={item.href}
                aria-label={`Navigate to ${item.label}`}
                aria-current={isActive ? 'page' : undefined}
                className="relative group transition-all duration-300"
            >
                <span className={`${isActive ? 'font-medium' : ''}`}>{item.label}</span>
                <span className={`absolute left-0 -bottom-1 h-px bg-neutral-800 transition-all duration-300 ease-in-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
        );
    };

    return (
        <header
            className={`fixed top-0 z-50 w-full bg-neutral-50 border-b border-neutral-200 transition-all duration-900 backdrop-blur-sm ${scrolled ? 'shadow-xl py-4' : 'shadow-2xl py-8'}`}
        >
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    aria-label="Go to homepage"
                    className="flex items-center"
                >
                    <Image
                        src="/logo-v2.png"
                        alt="ARCO Logo"
                        width={96}
                        height={40}
                        className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav
                    role="navigation"
                    aria-label="Main"
                    className="hidden md:flex items-center gap-8 font-garamond text-sm tracking-wide text-neutral-900"
                >
                    {navItems.map((item) => (
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
                    className="md:hidden p-2 text-neutral-800 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200 rounded-md"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`md:hidden absolute w-full bg-neutral-50 border-b border-neutral-200 shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
                <div className="px-4 pt-2 pb-4 space-y-3">
                    {navItems.map((item) => (
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
                            className="w-full flex justify-center"
                            onClick={closeMenu}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}