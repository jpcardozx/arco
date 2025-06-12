'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, ArrowRight, Zap } from 'lucide-react'
import { Button } from '../../design-system/components'

export function ModernFooter() {
    const currentYear = new Date().getFullYear()

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    }

    const quickLinks = [
        { label: 'Insights', href: '/insight' },
        { label: 'POV', href: '/pov' },
        { label: 'Retainers', href: '/retainers' },
        { label: 'Metodologia', href: '/methodology' }
    ]

    const solutions = [
        { label: 'Auditoria', href: '/audit' },
        { label: 'Replatforming', href: '/replatforming' },
        { label: 'Transformação', href: '/transformation' },
        { label: 'Calculadora', href: '/calculator' }
    ]

    const company = [
        { label: 'Sobre', href: '/about' },
        { label: 'Casos', href: '/cases' },
        { label: 'Blog', href: '/blog' },
        { label: 'Carreiras', href: '/careers' }
    ]

    const socialLinks = [
        { icon: Linkedin, href: 'https://linkedin.com/company/arco', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://twitter.com/arco_digital', label: 'Twitter' },
        { icon: Github, href: 'https://github.com/arco', label: 'GitHub' },
    ]

    return (
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <Image
                                    src="/logo-v2.svg"
                                    alt="ARCO"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8"
                                />
                            </div>
                            <span className="text-2xl font-bold">ARCO</span>
                        </div>

                        <p className="text-slate-300 leading-relaxed">
                            Transformamos problemas digitais em soluções que geram receita. Performance otimizada e resultados garantidos.
                        </p>

                        <div className="flex items-center gap-2 text-emerald-400">
                            <Zap className="w-5 h-5 text-emerald-400 mr-2" />
                            <span className="text-sm font-semibold">ROI médio de 340% em 90 dias</span>
                        </div>

                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h4 className="text-lg font-bold">Links Rápidos</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h4 className="text-lg font-bold">Soluções</h4>
                        <ul className="space-y-3">
                            {solutions.map((solution, index) => (
                                <li key={index}>
                                    <Link
                                        href={solution.href}
                                        className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span>{solution.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h4 className="text-lg font-bold">Empresa</h4>
                        <ul className="space-y-3">
                            {company.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact & Newsletter */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        <h4 className="text-lg font-bold">Contato</h4>

                        <div className="space-y-4">
                            <a
                                href="mailto:contato@arco.com.br"
                                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300"
                            >
                                <Mail className="w-5 h-5" />
                                <span>contato@arco.com.br</span>
                            </a>

                            <a
                                href="tel:+5511999999999"
                                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300"
                            >
                                <Phone className="w-5 h-5" />
                                <span>+55 11 9999-9999</span>
                            </a>

                            <div className="flex items-center gap-3 text-slate-300">
                                <MapPin className="w-5 h-5" />
                                <span>São Paulo, Brasil</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h5 className="font-semibold">Newsletter</h5>
                            <p className="text-sm text-slate-400">
                                Receba insights semanais sobre performance digital e casos de sucesso
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Seu email"
                                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Button size="sm" variant="primary">
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    variants={itemVariants}
                    className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <div className="text-slate-400 text-sm">
                        © {currentYear} ARCO Digital Solutions. Todos os direitos reservados.
                    </div>

                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors duration-300">
                            Privacidade
                        </Link>
                        <Link href="/terms" className="text-slate-400 hover:text-white transition-colors duration-300">
                            Termos
                        </Link>
                        <Link href="/cookies" className="text-slate-400 hover:text-white transition-colors duration-300">
                            Cookies
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    )
}

export default ModernFooter
