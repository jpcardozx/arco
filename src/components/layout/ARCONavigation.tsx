'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react'

export function ARCONavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    {
      label: 'Services',
      href: '/services',
      dropdown: [
        { label: 'Performance Assessment', href: '/assessment', description: '72-hour comprehensive analysis' },
        { label: 'Implementation Projects', href: '/implementation', description: '4-8 week transformation' },
        { label: 'Strategic Partnership', href: '/partnership', description: 'Ongoing optimization' }
      ]
    },
    {
      label: 'Solutions',
      href: '/solutions',
      dropdown: [
        { label: 'Self-Funding Projects', href: '/solutions/self-funding' },
        { label: 'Performance Optimization', href: '/solutions/performance' },
        { label: 'Stack Consolidation', href: '/solutions/consolidation' },
        { label: 'Digital Transformation', href: '/solutions/transformation' }
      ]
    },
    {
      label: 'Case Studies',
      href: '/case-studies'
    },
    {
      label: 'About',
      href: '/about'
    },
    {
      label: 'Blog',
      href: '/blog'
    }
  ]

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-slate-950/95 backdrop-blur-xl border-b border-blue-500/20 shadow-2xl shadow-blue-500/10'
          : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Revolutionary gradient border */}
      {isScrolled && (
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-white font-bold text-lg">A</span>
              </motion.div>
              <div>
                <div className="text-xl font-black text-white">ARCO</div>
                <div className="text-blue-400 text-xs font-medium -mt-1">Revolution</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <motion.div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <motion.button
                      className="flex items-center space-x-1 text-slate-300 hover:text-blue-400 font-medium transition-all duration-300 group"
                      whileHover={{ y: -2 }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </motion.button>

                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl shadow-blue-500/10 overflow-hidden"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 space-y-2">
                            {item.dropdown.map((dropdownItem, dropdownIndex) => (
                              <motion.div
                                key={dropdownItem.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: dropdownIndex * 0.05 }}
                              >
                                <Link
                                  href={dropdownItem.href}
                                  className="block p-3 rounded-xl bg-white/5 hover:bg-blue-500/20 transition-all duration-300 group"
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                        {dropdownItem.label}
                                      </div>
                                      {(dropdownItem as any).description && (
                                        <div className="text-slate-400 text-sm mt-1">
                                          {(dropdownItem as any).description}
                                        </div>
                                      )}
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ y: -2 }}>
                    <Link
                      href={item.href}
                      className="text-slate-300 hover:text-blue-400 font-medium transition-all duration-300 relative group"
                    >
                      {item.label}
                      <motion.div
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"
                      />
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Revolutionary CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              className="text-slate-300 hover:text-blue-400 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Login
            </motion.button>

            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Revolution</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-slate-950/98 backdrop-blur-xl border-t border-blue-500/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <Link
                    href={item.href}
                    className="block text-white hover:text-blue-400 font-medium py-2 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>

                  {item.dropdown && (
                    <div className="pl-4 space-y-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block text-slate-400 hover:text-blue-400 py-1 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.div
                className="pt-4 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button className="w-full text-left text-slate-300 hover:text-blue-400 font-medium py-2 transition-colors">
                  Login
                </button>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg">
                  Start Revolution
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}