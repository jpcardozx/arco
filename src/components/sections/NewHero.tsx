'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Sparkles, Rocket, TrendingUp } from 'lucide-react'

export function NewHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleGetStarted = () => {
    // Add confetti effect
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    })
    
    // Scroll to next section
    document.getElementById('revolution-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  return (
    <motion.section 
      ref={containerRef}
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900"
    >
      {/* Dynamic gradient overlay */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(139, 92, 246, 0.1) 50%, 
            transparent 100%)`
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        
        {/* Floating badge */}
        <motion.div 
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-full px-6 py-3 border border-blue-400/30 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span className="text-blue-300 font-medium">The Future of Digital Transformation</span>
          <motion.div 
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>

        {/* Main headline with dramatic reveal */}
        <div className="space-y-4 mb-8">
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-none"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <div className="overflow-hidden">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Stop Burning
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="text-white">Money on</span>
            </div>
            <div className="overflow-hidden">
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Digital Disasters
              </span>
            </div>
          </motion.h1>
        </div>

        {/* Revolutionary subtitle */}
        <motion.p 
          className="text-xl lg:text-3xl text-slate-300 mb-12 max-w-5xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          We turn your worst tech nightmares into{' '}
          <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text font-semibold">
            profit-generating machines
          </span>
          . No consultants. No endless meetings. Just{' '}
          <span className="text-yellow-400 font-semibold">
            results that pay for themselves
          </span>
          .
        </motion.p>

        {/* Revolutionary CTA */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <motion.button
            onClick={handleGetStarted}
            className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl overflow-hidden"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            
            <span className="relative flex items-center space-x-3">
              <Rocket className="w-6 h-6" />
              <span>Start The Revolution</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            className="group text-blue-400 font-semibold text-lg flex items-center space-x-2 hover:text-blue-300 transition-colors"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            whileHover={{ x: 10 }}
          >
            <Zap className="w-5 h-5" />
            <span>See The Damage (Case Studies)</span>
          </motion.button>
        </div>

        {/* Impressive stats with animation */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
        >
          {[
            { number: '94%', label: 'Projects Self-Fund', icon: TrendingUp },
            { number: '2.1M', label: 'Waste Eliminated', icon: Zap },
            { number: '47 Days', label: 'Average Payback', icon: Rocket },
            { number: '0%', label: 'Failed Projects', icon: Sparkles }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-black text-white mb-1">{stat.number}</div>
              <div className="text-slate-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-blue-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
