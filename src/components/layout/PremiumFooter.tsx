'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

// Premium professional footer
export function PremiumFooter() {
    const currentYear = new Date().getFullYear()

    const mainLinks = [
        { href: '/services', label: 'Services' },
        { href: '/methodology', label: 'Methodology' },
        { href: '/case-studies', label: 'Case Studies' },
        { href: '/about', label: 'About' }
    ]

    const serviceLinks = [
        { href: '/diagnose', label: 'Diagnostic Assessment' },
        { href: '/pilot', label: 'Pilot Implementation' },
        { href: '/scale', label: 'Scale & Growth' },
        { href: '/retainer', label: 'Ongoing Optimization' }
    ]

    const resourceLinks = [
        { href: '/technical-debt-calculator', label: 'Technical Debt Calculator' },
        { href: '/roi-framework', label: 'ROI Framework' },
        { href: '/efficiency-audit', label: 'Efficiency Audit' },
        { href: '/implementation-guide', label: 'Implementation Guide' }
    ]

    return (
        <footer className="bg-slate-900 text-white">
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-light text-white mb-3">ARCO</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Technical debt resolution specialists serving mid-market companies
                                    seeking sustainable growth through operational efficiency.
                                </p>
                            </div>

                            <div className="space-y-3 text-sm text-slate-400">
                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span>São Paulo, Brazil</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-4 h-4 flex-shrink-0" />
                                    <a href="mailto:contact@arco.com" className="hover:text-white transition-colors">
                                        contact@arco.com
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-4 h-4 flex-shrink-0" />
                                    <span>Available for consultation</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation links */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h4 className="text-lg font-medium text-white mb-6">Company</h4>
                            <ul className="space-y-3">
                                {mainLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-400 hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Services links */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h4 className="text-lg font-medium text-white mb-6">Services</h4>
                            <ul className="space-y-3">
                                {serviceLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-400 hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Resources & CTA */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h4 className="text-lg font-medium text-white mb-6">Resources</h4>
                            <ul className="space-y-3 mb-8">
                                {resourceLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-400 hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Newsletter signup */}
                            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                                <h5 className="text-white font-medium mb-3">
                                    Technical Efficiency Insights
                                </h5>
                                <p className="text-slate-400 text-sm mb-4">
                                    Monthly analysis of efficiency patterns and optimization opportunities.
                                </p>
                                <Link
                                    href="/insights"
                                    className="inline-flex items-center text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
                                >
                                    Subscribe to insights
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="text-sm text-slate-400">
                            © {currentYear} ARCO Technical Solutions. All rights reserved.
                        </div>

                        <div className="flex space-x-6 text-sm text-slate-400">
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/security" className="hover:text-white transition-colors">
                                Security
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
