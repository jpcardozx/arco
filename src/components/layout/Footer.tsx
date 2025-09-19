/**
 * ARCO Footer Component
 * Professional footer with links and branding
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../primitives';
import { Container } from '../primitives';

interface FooterProps {
    variant?: 'default' | 'minimal';
    showSocial?: boolean;
}

const footerLinks = {
    services: [
        { label: 'Web Development', href: '/services/web-development' },
        { label: 'UI/UX Design', href: '/services/design' },
        { label: 'Consulting', href: '/services/consulting' }
    ],
    company: [
        { label: 'About', href: '/about' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Contact', href: '/contact' }
    ],
    legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' }
    ]
};

export const Footer: React.FC<FooterProps> = ({
    variant = 'default',
    showSocial = true
}) => {
    if (variant === 'minimal') {
        return (
            <footer className="border-t border-neutral-200 dark:border-neutral-800">
                <Container size="xl" padding="lg">
                    <div className="flex items-center justify-between py-6">
                        <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400">
                            © 2025 ARCO. All rights reserved.
                        </Typography>
                    </div>
                </Container>
            </footer>
        );
    }

    return (
        <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
            <Container size="xl" padding="lg">
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">A</span>
                                </div>
                                <Typography variant="h6" className="font-bold">ARCO</Typography>
                            </div>
                            <Typography variant="body" className="text-neutral-600 dark:text-neutral-400 max-w-xs">
                                Professional web development and design solutions for modern businesses.
                            </Typography>
                        </div>

                        {/* Services */}
                        <div className="space-y-4">
                            <Typography variant="subtitle" className="font-semibold">Services</Typography>
                            <ul className="space-y-2">
                                {footerLinks.services.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="space-y-4">
                            <Typography variant="subtitle" className="font-semibold">Company</Typography>
                            <ul className="space-y-2">
                                {footerLinks.company.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="space-y-4">
                            <Typography variant="subtitle" className="font-semibold">Legal</Typography>
                            <ul className="space-y-2">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400">
                                © 2025 ARCO. All rights reserved.
                            </Typography>
                            <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400">
                                Built with Next.js & TypeScript
                            </Typography>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export type { FooterProps };
