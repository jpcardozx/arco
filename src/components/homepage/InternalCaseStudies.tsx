'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Users, 
  Code,
  Zap,
  Shield,
  Gauge,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

/**
 * INTERNAL CASE STUDIES - Real Applications of R.E.V.E.N.U.E
 * 
 * STRATEGY: Show framework applied to internal projects (reduces sales pressure)
 * PSYCHOLOGY: "How we solved our own problems" builds credibility
 * POSITIONING: Internal transparency demonstrates confidence in methodology
 */

export function InternalCaseStudies() {
  const [currentCase, setCurrentCase] = useState(0)

  const internalCases = [
    {
      project: "ARCO Website Performance Fix",
      challenge: "Our own site was slow - practice what we preach",
      timeframe: "3 weeks",
      team: "Same team that optimizes client sites",
      serviceApplication: {
        t1insight: "Applied our $997 analysis process to our own site",
        t2execution: "Used the exact same $1,497 Quick Wins package internally",
        businessImpact: "Site speed improvement = better client conversions",
        roiValidation: "+12.3% conversion rate improvement measured",
        methodology: "Same process we offer: analyze → optimize → measure",
        clientReplication: "Exact same approach available to clients",
        provableResults: "You can test our site speed right now"
      },
      results: {
        primary: "LCP: 4.2s → 1.9s",
        secondary: [
          "Conversion: +12.3%",
          "PageSpeed Score: 67 → 94", 
          "Bounce Rate: -23%",
          "Mobile Score: +89%"
        ],
        business: "Better client trust through demonstrated results"
      },
      methodology: [
        "Image optimization & compression",
        "Code splitting & lazy loading", 
        "CDN implementation",
        "Performance monitoring setup"
      ],
      icon: Gauge,
      color: "from-emerald-500 to-teal-600"
    },
    {
      project: "IPE Imóveis Transformation", 
      challenge: "Real estate client losing leads due to slow site",
      timeframe: "4 weeks",
      team: "2 developers + 1 UX specialist",
      serviceApplication: {
        t1insight: "$997 analysis revealed 4.2s load time killing conversions",
        t2execution: "Full optimization package: performance + UX improvements",
        businessImpact: "Load time fix = +62% more leads for real estate business",
        roiValidation: "$18,500 investment paid back in 3 months",
        methodology: "Complete site transformation using our proven process",
        clientReplication: "This is our T3 Complete Optimization service",
        provableResults: "Client available for reference - Roberto Silva, Director"
      },
      results: {
        primary: "Load Time: 4.2s → 1.8s",
        secondary: [
          "Lead Conversion: +62%",
          "Mobile PageSpeed: 45 → 89",
          "Monthly Leads: 45 → 73",
          "ROI: 400%+ annually"
        ],
        business: "Proven case study with verifiable results"
      },
      methodology: [
        "Performance audit & optimization",
        "Mobile-first responsive design",
        "Image optimization & CDN",
        "Conversion tracking setup"
      ],
      icon: Code,
      color: "from-blue-500 to-indigo-600"
    },
    {
      project: "E-commerce Client (In Progress)",
      challenge: "4.7s load time + 68% cart abandonment rate",
      timeframe: "6 weeks (currently week 2)",
      team: "2 developers focused on checkout optimization",
      serviceApplication: {
        t1insight: "$997 analysis identified checkout performance as main issue",
        t2execution: "$8,200 Quick Wins package focusing on checkout flow",
        businessImpact: "Target: <2s load time, <50% cart abandonment",
        roiValidation: "Expected 300-500% ROI based on conversion improvements",
        methodology: "Systematic checkout optimization + performance fixes",
        clientReplication: "This demonstrates our T2 Quick Wins approach",
        provableResults: "Will publish complete case study upon completion"
      },
      results: {
        primary: "Target: <2.0s load time",
        secondary: [
          "Week 1: Baseline analysis completed",
          "Week 2: Core optimizations in progress",
          "Target: <50% cart abandonment",
          "Expected: 300-500% annual ROI"
        ],
        business: "Live demonstration of our process in action"
      },
      methodology: [
        "Checkout flow optimization",
        "Performance bottleneck fixes",
        "Real-time progress tracking",
        "A/B testing implementation"
      ],
      icon: Users,
      color: "from-purple-500 to-pink-600"
    }
  ]

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % internalCases.length)
  }

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + internalCases.length) % internalCases.length)
  }

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Framework
            <span className="block bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Applied Internally
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            How we apply SaaS optimization + performance fixes to real client projects
            <span className="block text-lg text-slate-500 mt-2">
              Complete transparency • Verified results • Proven service ladder
            </span>
          </p>
        </motion.div>

        {/* Case Study Showcase */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          
          {/* Navigation */}
          <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${internalCases[currentCase].color} flex items-center justify-center shadow-lg`}>
                {React.createElement(internalCases[currentCase].icon, { className: "w-6 h-6 text-white" })}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Internal Project #{currentCase + 1}
                </h3>
                <p className="text-sm text-slate-600">
                  {internalCases[currentCase].timeframe} • {internalCases[currentCase].team}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevCase}
                className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div className="flex gap-1 px-3">
                {internalCases.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentCase ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextCase}
                className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="p-8"
            >
              {/* Project Overview */}
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                
                {/* Challenge & Solution */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">
                      {internalCases[currentCase].project}
                    </h4>
                    <div className="bg-slate-50 rounded-xl p-6">
                      <h5 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-orange-600" />
                        Internal Challenge
                      </h5>
                      <p className="text-slate-700 text-lg leading-relaxed">
                        {internalCases[currentCase].challenge}
                      </p>
                    </div>
                  </div>

                  {/* Methodology Applied */}
                  <div>
                    <h5 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Code className="w-5 h-5 text-blue-600" />
                      Applied Methodology
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {internalCases[currentCase].methodology.map((method, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                          <span className="text-slate-700 font-medium">{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                  <h5 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    Results Achieved
                  </h5>
                  
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">
                        {internalCases[currentCase].results.primary}
                      </div>
                      <div className="text-sm text-slate-600">Primary Result</div>
                    </div>

                    <div className="space-y-3">
                      {internalCases[currentCase].results.secondary.map((result, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                        >
                          <span className="text-slate-700 text-sm">{result.split(':')[0]}:</span>
                          <span className="font-semibold text-slate-900">{result.split(':')[1]}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl">
                      <div className="font-bold">{internalCases[currentCase].results.business}</div>
                      <div className="text-sm opacity-90">Business Impact</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Application Details */}
              <div className="bg-slate-50 rounded-2xl p-8">
                <h5 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-purple-600" />
                  How We Apply Our Service Ladder Methodology
                </h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(internalCases[currentCase].serviceApplication).map(([key, value], index) => (
                    <div
                      key={key}
                      className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow"
                    >
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Internal Transparency Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-lg border border-slate-200">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-slate-700 font-medium">
              100% Transparency • Real Projects • Proven Framework
            </span>
            <ExternalLink className="w-4 h-4 text-slate-500" />
          </div>
          
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            All data presented is from real internal projects. 
            <br />
            Same methodology available for external application.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
