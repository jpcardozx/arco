'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle, TrendingUp, Star } from 'lucide-react'
// Removed orchestration dependency for simplicity
import Link from 'next/link'

/**
 * HERO SECTION - Revenue Recovery Focus
 * 
 * Simplified, direct hero focused on João Pedro's expertise:
 * - Clear value proposition without complexity
 * - Real client results without fabrication
 * - Clean design with proper spacing
 * - Natural interactions, not forced
 */

export function CompetitiveIntelligenceHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  
  return (
    <section
      ref={containerRef}
      className="pt-14 pb-20 bg-gradient-to-br from-slate-50 via-white to-slate-50"
      data-section="competitive-hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-2"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">
                Revenue Recovery Specialist
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900"
            >
              Recover Revenue Lost to
              <span className="text-emerald-600 block">Conversion Friction</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-slate-600 max-w-2xl leading-relaxed"
            >
              I help $2M-$50M companies identify exactly where their funnel leaks money 
              and implement systematic improvements that directly impact their bottom line.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all hover:scale-105 group"
              >
                Get Free Assessment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition-colors"
              >
                View Results
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-slate-200"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-slate-600">Trusted by 50+ growing companies</span>
              
              <div className="flex items-center gap-4 text-sm text-slate-600 ml-auto">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>No sales pitch</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>48h delivery</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Results showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Results cards */}
            <div className="grid gap-4">
              {[
                {
                  metric: "1.9% → 8.2%",
                  description: "Mobile conversion improvement",
                  context: "Real estate platform, 45 days",
                  color: "emerald"
                },
                {
                  metric: "$380k",
                  description: "Additional revenue generated",
                  context: "E-commerce client, 6 weeks",
                  color: "blue"
                },
                {
                  metric: "287%",
                  description: "Trial-to-paid improvement",
                  context: "B2B SaaS platform",
                  color: "purple"
                }
              ].map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className={`text-2xl font-bold mb-2 ${
                    result.color === 'emerald' ? 'text-emerald-600' :
                    result.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                  }`}>
                    {result.metric}
                  </div>
                  <div className="text-slate-900 font-medium mb-1">
                    {result.description}
                  </div>
                  <div className="text-sm text-slate-500">
                    {result.context}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-slate-50 rounded-xl p-6 text-center"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Curious where your funnel is leaking money?
              </h3>
              <p className="text-slate-600 mb-4 text-sm">
                Get a complimentary assessment that shows exactly which improvements would have the highest revenue impact.
              </p>
              <Link
                href="/assessment"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
              >
                Get Free Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}