'use client'

import React, { Suspense, useState } from 'react'
import { ArrowRight, Clock, CheckCircle, Calculator, Play, Globe } from 'lucide-react'
import { LazyMotion, domAnimation, motion } from 'framer-motion'

// Lazy load motion for better performance
const LazyMotionWrapper = ({ children }: { children: React.ReactNode }) => (
  <LazyMotion features={domAnimation}>{children}</LazyMotion>
)

export function SimpleTechnicalHero() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleSpeedAnalysis = () => {
    setIsAnalyzing(true)
    // Simulate analysis process
    setTimeout(() => setIsAnalyzing(false), 3000)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Honest Value Proposition */}
          <div className="space-y-8">
            <LazyMotionWrapper>
              <Suspense fallback={<div className="space-y-6 animate-pulse">Loading...</div>}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    <span className="block bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-4">
                      Your Website Loads in 4+ Seconds.
                    </span>
                    <span className="text-white block text-3xl md:text-4xl mb-4">
                      You're Losing $12,000+ Monthly.
                    </span>
                    <span className="text-slate-300 text-xl md:text-2xl font-normal">
                      We make sites load in &lt;1.5s and recover lost revenue.
                    </span>
                  </h1>

                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                      <span className="text-lg font-semibold text-white">Real Case: IPE Imóveis</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Before</div>
                        <div className="text-red-400 font-semibold">4.2s load time</div>
                        <div className="text-red-400">2.1% conversion</div>
                      </div>
                      <div>
                        <div className="text-slate-400">After (4 weeks)</div>
                        <div className="text-emerald-400 font-semibold">1.8s load time</div>
                        <div className="text-emerald-400">3.4% conversion</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Business Impact</div>
                        <div className="text-yellow-400 font-semibold">+62% leads</div>
                        <div className="text-yellow-400">$18,500 investment</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={handleSpeedAnalysis}
                      disabled={isAnalyzing}
                      className="group inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-5 h-5 mr-3" />
                          Get Your Speed & Revenue Analysis
                          <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <div className="text-center sm:text-left">
                      <div className="text-emerald-400 font-semibold text-lg">$997</div>
                      <div className="text-sm text-slate-400">5-day delivery</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>5-day delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      <span>ROI projection included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Money-back guarantee</span>
                    </div>
                  </div>
                </motion.div>
              </Suspense>
            </LazyMotionWrapper>
          </div>

          {/* Right Column: Real Results Terminal */}
          <div className="relative">
            <LazyMotionWrapper>
              <Suspense fallback={<div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 animate-pulse">Loading terminal...</div>}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-slate-800 border border-slate-700 rounded-2xl p-0 shadow-2xl overflow-hidden"
                >
                  {/* Terminal Header */}
                  <div className="bg-slate-900 px-6 py-4 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                      <span className="ml-4 text-slate-400 text-sm font-mono">
                        arco-waste-analyzer
                      </span>
                    </div>
                  </div>

                  {/* Terminal Content - Real Client Results */}
                  <div className="p-6 font-mono text-sm min-h-[300px]">
                    <div className="text-emerald-400 mb-4">
                      $ arco analyze --saas-waste --performance
                    </div>
                    <div className="text-slate-300 mb-2">🔍 Scanning SaaS subscriptions...</div>
                    <div className="text-yellow-400 mb-2">⚠️  Found 23 licenses, 11 unused (47%)</div>
                    <div className="text-slate-300 mb-2">💰 Monthly waste: $7,234</div>
                    <div className="text-emerald-400 mb-4">✅ Consolidation plan generated</div>

                    <div className="text-blue-400 mb-2">$ arco analyze --web-performance</div>
                    <div className="text-slate-300 mb-2">⚡ Scanning Core Web Vitals...</div>
                    <div className="text-red-400 mb-2">🐌 LCP: 4.2s (target: &lt;2.5s)</div>
                    <div className="text-yellow-400 mb-2">📉 Est. conversion loss: 31%</div>
                    <div className="text-slate-300 mb-2">🎯 Quick wins identified: 8</div>
                    <div className="text-emerald-400 mb-4">✅ Optimization roadmap ready</div>

                    <div className="text-purple-400 mb-2">📊 COMBINED IMPACT:</div>
                    <div className="text-green-400 mb-1">💵 SaaS savings: $86k/year</div>
                    <div className="text-green-400 mb-1">🚀 Revenue recovery: +$127k/year</div>
                    <div className="text-yellow-400">💡 Total ROI: 1,040% (first year)</div>
                  </div>
                </motion.div>
              </Suspense>
            </LazyMotionWrapper>

            {/* Quick Stats */}
            <LazyMotionWrapper>
              <Suspense fallback={<div className="mt-6 bg-slate-800/50 rounded-xl p-4 animate-pulse">Loading stats...</div>}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4"
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-400">$213k</div>
                      <div className="text-xs text-slate-400">Avg. Annual Recovery</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-400">18 days</div>
                      <div className="text-xs text-slate-400">Implementation Time</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-400">970%</div>
                      <div className="text-xs text-slate-400">Average ROI</div>
                    </div>
                  </div>
                </motion.div>
              </Suspense>
            </LazyMotionWrapper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SimpleTechnicalHero;
