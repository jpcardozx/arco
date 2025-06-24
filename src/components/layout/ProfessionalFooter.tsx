'use client'

import Link from 'next/link'
import { createHref, createHtmlHref } from '@/utils/navigation';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'

export function ProfessionalFooter() {
    const currentYear = new Date().getFullYear()

    const navigation = {
        services: [
            { name: 'Performance Optimization', href: '/services/performance' },
            { name: 'Digital Strategy', href: '/services/strategy' },
            { name: 'Marketing Automation', href: '/services/automation' },
            { name: 'Digital Audit', href: '/services/audit' }
        ],
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Case Studies', href: '/cases' },
            { name: 'Insights', href: '/insights' },
            { name: 'Contact', href: '/contact' }
        ],
        resources: [
            { name: 'Performance Guide', href: '/resources/performance' },
            { name: 'Best Practices', href: '/resources/practices' },
            { name: 'Technical Articles', href: '/insights' },
            { name: 'Free Diagnosis', href: '/diagnosis' }
        ],
        legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Use', href: '/terms' }
        ]
    }

    const socialLinks = [
        { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/arco-digital' },
        { name: 'GitHub', icon: Github, href: 'https://github.com/arco-digital' },
        { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/arco_digital' }
    ]

    return (
        <footer className="bg-slate-900 text-white border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-20">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">

                    {/* Company Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <Link href={createHref("/")} className="text-2xl font-bold text-white tracking-tight">
                                ARCO
                            </Link>
                            <div className="mt-2 text-sm text-blue-400 font-medium">
                                Digital Performance • Measurable Results
                            </div>
                        </div>

                        <p className="text-slate-300 leading-relaxed max-w-md text-lg">
                            Specialized consultancy in <strong className="text-white">digital transformation</strong> and
                            <strong className="text-white"> performance optimization</strong> for B2B companies seeking
                            accelerated growth and measurable results.
                        </p>

                        {/* Contact */}
                        <div className="space-y-3">
                            <a
                                href="mailto:contact@arco.digital"
                                className="inline-flex items-center text-slate-300 hover:text-blue-400 transition-colors group"
                            >
                                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                                contact@arco.digital
                            </a>
                            <div className="text-slate-400 text-sm">
                                📞 Strategic consulting available
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.name} href={createHtmlHref(social.href)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-slate-800 hover:bg-blue-600 p-3 rounded-lg transition-all duration-300 text-slate-400 hover:text-white"
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
                        <h3 className="text-white font-bold text-lg mb-6 relative">
                            Services
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-400"></div>
                        </h3>
                        <ul className="space-y-4">
                            {navigation.services.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={createHref(item.href)}
                                        className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm block group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative">
                            Company
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-emerald-400"></div>
                        </h3>
                        <ul className="space-y-4">
                            {navigation.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={createHref(item.href)}
                                        className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm block group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative">
                            Resources
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-cyan-400"></div>
                        </h3>
                        <ul className="space-y-4">
                            {navigation.resources.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={createHref(item.href)}
                                        className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 text-sm block group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-slate-800 pt-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
                            <p className="text-slate-400 text-sm">
                                © {currentYear} ARCO Digital. All rights reserved.
                            </p>
                            <div className="flex space-x-6">
                                {navigation.legal.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={createHref(item.href)}
                                        className="text-slate-400 hover:text-slate-300 transition-colors text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 text-slate-400 text-sm">
                            <span>Built with</span>
                            <div className="flex items-center space-x-1">
                                <span className="text-blue-400">Next.js</span>
                                <span>•</span>
                                <span className="text-cyan-400">TypeScript</span>
                                <span>•</span>
                                <span className="text-emerald-400">Tailwind</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}


