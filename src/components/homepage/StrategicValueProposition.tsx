'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DollarSign, Layers, ArrowRight, Database } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export function StrategicValueProposition() {
  const [activePattern, setActivePattern] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleCTAClick = () => {
    trackEvent({
      event: 'cta_click',
      category: 'conversion',
      action: 'recovery_plan',
      label: 'digital-inefficiency'
    })
    alert('48-Hour Recovery Plan form would open here')
  }

  const patterns = [
    {
      id: 'performance-revenue-gap',
      name: 'Performance Revenue Correlation Gap',
      description: 'Your site speed directly impacts conversion rates, with each 1s delay reducing conversions by ~7%',
      impact: '$127,500 annual revenue loss',
      icon: DollarSign
    },
    {
      id: 'technical-debt',
      name: 'Digital Inefficiency Waste',
      description: 'On average, 28% of digital operations are inefficient, creating exponential technical debt',
      impact: '35% infrastructure cost reduction potential',
      icon: Layers
    },
    {
      id: 'market-timing',
      name: 'Market Window Compression',
      description: 'Only 6-12 months before performance optimization becomes automated by competitors',
      impact: 'First-mover advantage opportunity',
      icon: Database
    }
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-700 text-sm font-medium mb-6">
            <DollarSign className="w-4 h-4 mr-2 text-red-500" />
            Digital Inefficiency Compression System
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Your business loses <span className="text-red-600">$92,000+ annually</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Due to checkout friction, slow loading, and analytics conflicts. Our 48-hour recovery system stops this bleeding immediately.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Digital Inefficiency Patterns</h3>
            {patterns.map((pattern, index) => (
              <motion.div 
                key={pattern.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition-all duration-300 hover:border-blue-100"
              >
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 border border-slate-200">
                    <pattern.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{pattern.name}</h3>
                    <p className="text-slate-600 mb-3">{pattern.description}</p>
                    <div className="flex items-center text-red-600 font-semibold">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {pattern.impact}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              onClick={handleCTAClick}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Database className="w-5 h-5" />
              Get 48-Hour Recovery Plan
              <ArrowRight className="w-5 h-5 ml-1" />
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Digital Waste Recovery</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-700 font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-1">48-Hour Diagnosis</h4>
                  <p className="text-slate-600">Complete technical assessment with quantified revenue impact metrics and prioritized recovery plan.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-700 font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-1">Surgical Implementation</h4>
                  <p className="text-slate-600">Targeted fixes for highest-impact issues with zero disruption to your business operations.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-700 font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-1">Verified Results</h4>
                  <p className="text-slate-600">Measurable performance improvements with direct revenue impact tracking and ongoing monitoring.</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">Average Recovery Time</span>
                  <span className="text-sm font-bold text-blue-800">48 hours</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-blue-600">ARCO</span>
                  <span className="text-xs text-blue-600">Agencies (weeks)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
