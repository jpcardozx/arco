'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../lib/i18n-context';
import { LanguageSwitcher } from './ui/language-switcher';

export default function NavBarEnhanced() {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Define nav items using translations
    const navItems = [
        { label: t('common.navigation.process'), href: '#process' },
        { label: t('common.navigation.results'), href: '#case-studies' },
        {
            label: t('common.navigation.solutions'),
            href: '#',
            dropdown: [
                { label: 'ArcSight Snapshot™', href: '/diagnose' },
                { label: 'Friction Removal Kit™', href: '/solutions' },
                { label: 'Strategic Repositioning™', href: '/solutions' },
            ]
        },
        { label: t('common.navigation.blog'), href: '/blog' },
    ];

    // Detect scroll for conditional styling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDropdownToggle = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 py-2'
                    : 'bg-transparent py-4'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex shrink-0 items-center">
                            <Image
                                src="/logo-v2.svg"
                                alt="ARCO"
                                width={110}
                                height={40}
                                className={`transition-all ${scrolled ? 'opacity-100' : 'opacity-95'
                                    }`}
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <div key={item.label} className="relative group">
                                    {item.dropdown ? (
                                        <button
                                            onClick={() => handleDropdownToggle(item.label)}
                                            className={`flex items-center px-3 py-2 text-sm font-medium ${scrolled
                                                    ? 'text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white'
                                                    : 'text-white hover:text-white/90'
                                                } rounded-md transition-colors`}
                                        >
                                            {item.label}
                                            <ChevronDown size={16} className={`ml-1 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''
                                                }`} />
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`px-3 py-2 text-sm font-medium ${scrolled
                                                    ? 'text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white'
                                                    : 'text-white hover:text-white/90'
                                                } rounded-md transition-colors`}
                                        >
                                            {item.label}
                                        </Link>
                                    )}

                                    {/* Dropdown */}
                                    {item.dropdown && (
                                        <AnimatePresence>
                                            {openDropdown === item.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 5 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute left-0 mt-1 w-56 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg overflow-hidden z-20"
                                                >
                                                    <div className="py-2">
                                                        {item.dropdown.map((subItem) => (
                                                            <Link
                                                                key={subItem.label}
                                                                href={subItem.href}
                                                                className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                                                onClick={() => setOpenDropdown(null)}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}

                            {/* Language switcher */}
                            <div className="ml-3 mr-4">
                                <LanguageSwitcher displayStyle="minimal" />
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="/diagnose"
                                className={`px-4 py-2 text-sm font-medium rounded-md ${scrolled
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-white hover:bg-neutral-100 text-neutral-900'
                                    } transition-colors`}
                            >
                                {t('common.buttons.getStarted')}
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            type="button"
                            className="md:hidden p-2 rounded-md"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X size={24} className={scrolled ? 'text-neutral-900 dark:text-white' : 'text-white'} />
                            ) : (
                                <Menu size={24} className={scrolled ? 'text-neutral-900 dark:text-white' : 'text-white'} />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-lg z-40"
                    >
                        <div className="px-4 py-6 space-y-4">
                            <div className="flex flex-col space-y-2">
                                {navItems.map((item) => (
                                    <div key={item.label} className="py-1">
                                        {item.dropdown ? (
                                            <div>
                                                <button
                                                    onClick={() => handleDropdownToggle(item.label)}
                                                    className="flex w-full items-center justify-between py-2 text-neutral-800 dark:text-white font-medium"
                                                >
                                                    <span>{item.label}</span>
                                                    <ChevronDown size={18} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''
                                                        }`} />
                                                </button>

                                                <AnimatePresence>
                                                    {openDropdown === item.label && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="pl-4 border-l-2 border-neutral-200 dark:border-neutral-700 ml-2 mt-2 space-y-2"
                                                        >
                                                            {item.dropdown.map((subItem) => (
                                                                <Link
                                                                    key={subItem.label}
                                                                    href={subItem.href}
                                                                    className="block py-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white"
                                                                    onClick={() => setIsMenuOpen(false)}
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
                                                href={item.href}
                                                className="block py-2 text-neutral-800 dark:text-white font-medium hover:text-neutral-900"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 pb-2">
                                <div className="mb-4">
                                    <LanguageSwitcher displayStyle="full" position="horizontal" />
                                </div>
                                <Link
                                    href="/diagnose"
                                    className="w-full block py-2 px-4 rounded-md text-center text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t('common.buttons.getStarted')}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
