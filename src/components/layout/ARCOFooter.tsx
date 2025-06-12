'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Twitter, ArrowRight } from 'lucide-react'

export function ARCOFooter() {
  const footerSections = {
    services: {
      title: 'Services',
      links: [
        { label: 'Performance Assessment', href: '/assessment' },
        { label: 'Implementation Projects', href: '/implementation' },
        { label: 'Strategic Partnership', href: '/partnership' },
        { label: 'IMPACT Framework', href: '/methodology' }
      ]
    },
    solutions: {
      title: 'Solutions',
      links: [
        { label: 'Self-Funding Projects', href: '/solutions/self-funding' },
        { label: 'Performance Optimization', href: '/solutions/performance' },
        { label: 'Stack Consolidation', href: '/solutions/consolidation' },
        { label: 'Digital Transformation', href: '/solutions/transformation' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { label: 'About ARCO', href: '/about' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { label: 'ROI Calculator', href: '/calculator' },
        { label: 'Performance Audit', href: '/audit' },
        { label: 'White Papers', href: '/resources' },
        { label: 'Documentation', href: '/docs' }
      ]
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@arco-performance.com',
      href: 'mailto:contact@arco-performance.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+55 (21) 99999-9999',
      href: 'tel:+5521999999999'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Rio de Janeiro, Brazil',
      href: '#'
    }
  ]

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-tight">ARCO</span>
                <span className="text-sm text-cyan-400 font-medium -mt-1">
                  Digital Performance
                </span>
              </div>
            </Link>

            <p className="text-slate-300 leading-relaxed mb-6">
              Convertendo desperdício operacional em vantagem competitiva através de
              projetos de transformação digital auto-financiados. ROI garantido,
              entrega rápida, excelência técnica.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <contact.icon className="w-5 h-5 text-cyan-400" />
                  {contact.href !== '#' ? (
                    <a
                      href={contact.href}
                      className="text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <span className="text-slate-300">{contact.value}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-12 border-t border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Stay Updated on Performance Optimization
              </h3>
              <p className="text-slate-400">
                Get weekly insights on digital performance, self-funding project strategies,
                and industry best practices.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 whitespace-nowrap"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-slate-400 text-sm">
                © {currentYear} ARCO Digital Performance Engineering. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}