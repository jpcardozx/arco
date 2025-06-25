'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, DollarSign, Zap, Target, BarChart3, Clock, Calculator } from 'lucide-react'
import { trackPageView, trackFunnelStep } from "../lib/analytics"

/**
 * ARCO HOMEPAGE - Focused Blueprint Implementation
 * 
 * REAL VALUE PROPOSITION:
 * "Eliminar desperdício de SaaS + destravar receita escondida em performance web"
 * 
 * TARGET: E-commerce 3-20M USD, SaaS B2B Series A-B, DTC Health & Beauty
 * 
 * OFFER LADDER:
 * T1: Insight Report ($197) → T2: Sprint ($1997) → T3: Retainer ($2-4k/month)
 */

export default function FocusedHomepage() {
  useEffect(() => {
    trackPageView('homepage_focused')
    trackFunnelStep('landing', 'focused_funnel', {
      page: 'home',
      strategy: 'blueprint_tactic',
      timestamp: Date.now()
    })
  }, [])

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section - Direct Value Proposition */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            
            {/* Problem + Solution Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                <span className="text-red-600">Stop Wasting</span> $5,607/FTE on
                <span className="block bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Unused SaaS + Slow Sites
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Prove ROI in <strong>60 days</strong>: Cut 12% SaaS burn + recover 50% conversion loss from slow loading.
              </p>
            </motion.div>

            {/* Social Proof Numbers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 text-sm text-slate-500"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>49% SaaS licenses unused</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span>LCP 4-5s = 50% less conversion</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span>ROI proven in 60 days</span>
              </div>
            </motion.div>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <button className="group inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <Calculator className="w-5 h-5 mr-3" />
                Get Your Waste Report ($197)
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-sm text-slate-500">
                5-day delivery • ROI estimate included • No long-term commitment
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Segments - Who We Help */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Perfect Fit For
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "E-commerce 3-20M GMV",
                  pain: "ROAS dropping, LCP > 3.5s",
                  persona: "CFO, Head of Growth",
                  hook: "Recover margin before Q4"
                },
                {
                  title: "SaaS B2B Series A-B",
                  pain: "Runway ↓, burn > 18 months",
                  persona: "COO",
                  hook: "Cut 12% burn without layoffs"
                },
                {
                  title: "DTC Health & Beauty",
                  pain: "Pay for tools, use <60%",
                  persona: "Operations Director",
                  hook: "Reduce licenses, keep SLAs"
                }
              ].map((segment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="p-6 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{segment.title}</h3>
                  <p className="text-red-600 mb-2">Pain: {segment.pain}</p>
                  <p className="text-slate-600 mb-3">Decision maker: {segment.persona}</p>
                  <p className="text-blue-600 font-semibold">"{segment.hook}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Ladder - Clear Path */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Simple, Predictable Process
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  phase: "T1",
                  title: "No-Brainer Insight",
                  time: "5 days",
                  price: "$197",
                  deliverables: ["5-min Loom video", "Waste vs LCP spreadsheet", "12-month ROI estimate"],
                  gate: "ROI projected ≥ 5x"
                },
                {
                  phase: "T2", 
                  title: "Sprint Execution",
                  time: "25 days",
                  price: "20% savings OR $1,997",
                  deliverables: ["Choose: SaaS rightsize OR performance fix", "Measurable results", "Implementation complete"],
                  gate: "Savings or revenue increase measured"
                },
                {
                  phase: "T3",
                  title: "Growth Retainer", 
                  time: "3-6 months",
                  price: "$2-4k + 10% new savings",
                  deliverables: ["Automation roadmap", "Micro-apps", "Ongoing optimization"],
                  gate: "Payback ≤ 60 days"
                }
              ].map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-blue-500 transition-colors"
                >
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                    {tier.phase}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">{tier.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        {tier.time}
                      </span>
                      <span className="font-bold text-blue-600">{tier.price}</span>
                    </div>
                    
                    <ul className="space-y-2 text-sm text-slate-600">
                      {tier.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-3 border-t border-slate-200">
                      <p className="text-xs text-green-600 font-medium">
                        Gate: {tier.gate}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <p className="text-center text-slate-600">
              <strong>Average 6-month value:</strong> ~$12k • <strong>Typical ROI:</strong> 300-500%
            </p>
          </div>
        </div>
      </section>

      {/* Proof Points - Real Results */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Real Results, Real Clients
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4">SaaS Rightsizing: Health & Beauty DTC</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monthly SaaS spend:</span>
                    <span className="font-bold text-red-600">$23k → $16k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tools consolidated:</span>
                    <span className="font-bold">Zendesk + Gorgias + 3 others</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Annual savings:</span>
                    <span className="font-bold text-green-600">$84k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">ROI:</span>
                    <span className="font-bold text-blue-600">420%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4">Performance Fix: E-commerce Platform</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">LCP improvement:</span>
                    <span className="font-bold text-blue-600">4.2s → 1.1s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Conversion lift:</span>
                    <span className="font-bold text-green-600">+31%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monthly revenue impact:</span>
                    <span className="font-bold text-green-600">+$73k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Implementation time:</span>
                    <span className="font-bold">18 days</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal - Why Now */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl font-bold">
            Why Companies Choose ARCO
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-400">vs. Traditional Agencies</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• 5-day insight vs 4-week proposals</li>
                <li>• Pay for results vs pay for time</li>
                <li>• Measurable ROI vs vanity metrics</li>
                <li>• Specialized tooling vs generic advice</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-emerald-400">vs. In-house Teams</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Immediate execution vs hiring delays</li>
                <li>• Proven methodology vs trial-and-error</li>
                <li>• External perspective vs internal blindness</li>
                <li>• Project-based vs full-time overhead</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8">
            <button className="group inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
              <BarChart3 className="w-5 h-5 mr-3" />
              Start With Insight Report
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="mt-4 text-sm text-slate-400">
              $197 • 5-day delivery • ROI estimate included
            </p>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-600">
              <strong>ARCO</strong> - Tactical Business Optimization
            </div>
            
            <div className="flex space-x-6 text-sm text-slate-500">
              <a href="/methodology" className="hover:text-slate-700">Methodology</a>
              <a href="/case-studies" className="hover:text-slate-700">Case Studies</a>
              <a href="/contact" className="hover:text-slate-700">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}