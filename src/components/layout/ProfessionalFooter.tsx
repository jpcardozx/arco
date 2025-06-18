'use client'

import Link from 'next/link'
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'

export function ProfessionalFooter() {
    const currentYear = new Date().getFullYear()

    const navigation = {
        services: [
            { name: 'Performance Optimization', href: '/services/performance' },
            { name: 'React Architecture', href: '/services/architecture' },
            { name: 'Development Partnership', href: '/services/partnership' },
            { name: 'Technical Audit', href: '/services/audit' }
        ],
        company: [
            { name: 'About', href: '/about' },
            { name: 'Case Studies', href: '/case-studies' },
            { name: 'Blog', href: '/blog' },
            { name: 'Contact', href: '/contact' }
        ],
        resources: [
            { name: 'Performance Guide', href: '/resources/performance' },
            { name: 'React Best Practices', href: '/resources/react' },
            { name: 'Technical Articles', href: '/blog' },
            { name: 'Free Audit Tool', href: '/tools/audit' }
        ],
        legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' }
        ]
    }

    const socialLinks = [
        { name: 'GitHub', icon: Github, href: 'https://github.com/arco-dev' },
        { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/arco-dev' },
        { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/arco_dev' }
    ]

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">

                    {/* Company Info */}
                    <div className="md:col-span-2">
                        <Link href="/" className="text-xl font-bold text-white tracking-tight">
                            Arco
                        </Link>
                        <p className="mt-4 text-gray-300 leading-relaxed max-w-md">
                            Performance-focused React development consultancy helping
                            companies build faster, more efficient web applications.
                        </p>
                        
                        {/* Contact */}
                        <div className="mt-6">
                            <a
                                href="mailto:hello@arco.dev"
                                className="inline-flex items-center text-gray-300 hover:text-white transition-colors group"
                            >
                                <Mail className="w-4 h-4 mr-2" />
                                hello@arco.dev
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="mt-6 flex space-x-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <span className="sr-only">{social.name}</span>
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Services
                        </h3>
                        <ul className="space-y-3">
                            {navigation.services.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {navigation.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            {navigation.resources.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                        <p className="text-sm text-gray-400">
                            © {currentYear} Arco. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            {navigation.legal.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                        <p className="text-sm text-gray-400">
                            Built with React, Next.js & TypeScript
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
