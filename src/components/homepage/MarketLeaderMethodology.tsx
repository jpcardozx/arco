'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Target,
  TrendingUp,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Eye,
  Zap,
  Users,
  Calendar
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { useOrchestration } from './IntelligentHomepageOrchestrator'

/**
 * MARKET LEADER METHODOLOGY - How Top Performers Maintain Competitive Advantage
 * 
 * This section reveals the systematic approaches that market leaders use
 * to maintain their competitive edge. Focus on business process, not technical tools.
 */

interface MethodologyStep {
  id: string
  title: string
  description: string
  frequency: string
  businessOutcome: string
  example: string
  icon: any
}

const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    id: 'competitive-monitoring',
    title: 'Systematic Competitive Monitoring',
    description: 'Top performers monitor competitor conversion patterns every 30 days, not just pricing',
    frequency: 'Monthly',
    businessOutcome: 'Early detection of market shifts before they impact revenue',
    example: 'Fashion leader spotted competitor\'s new checkout flow 2 weeks before conversion drop',
    icon: Eye
  },
  {
    id: 'performance-correlation',
    title: 'Performance-Revenue Correlation Tracking',
    description: 'Market leaders measure how technical changes directly impact business metrics',
    frequency: 'Weekly',
    businessOutcome: 'Data-driven optimization decisions with predictable ROI',
    example: 'Electronics retailer linked 0.3s speed improvement to $12K monthly revenue increase',
    icon: TrendingUp
  },
  {
    id: 'industry-benchmarking',
    title: 'Industry Benchmark Intelligence',
    description: 'Leading businesses know exactly where they stand vs industry averages',
    frequency: 'Quarterly',
    businessOutcome: 'Strategic positioning and competitive advantage identification',
    example: 'Home goods store discovered 0.8% conversion opportunity vs market average',
    icon: BarChart3
  },
  {
    id: 'rapid-testing',
    title: 'Rapid Market Response Testing',
    description: 'When competitors make moves, leaders test counter-strategies within 1-2 weeks',
    frequency: 'As needed',
    businessOutcome: 'Maintain competitive position during market changes',
    example: 'Beauty brand tested mobile optimization after competitor launch, gained 15% mobile share',
    icon: Zap
  }
]

const SUCCESS_METRICS = [
  {
    metric: '2.8x',
    label: 'Faster revenue recovery',
    description: 'When market changes occur'
  },
  {
    metric: '67%',
    label: 'Higher conversion stability',
    description: 'During competitive pressure'
  },
  {
    metric: '34%',
    label: 'Better market position',
    description: 'Vs reactive competitors'
  }
]

export function MarketLeaderMethodology() {
  const { userProfile, recordInteraction } = useOrchestration()
  const [activeStep, setActiveStep] = useState(0)
  const [showMethodology, setShowMethodology] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleStepClick = (index: number) => {
    setActiveStep(index)
    recordInteraction({
      timestamp: new Date(),
      sectionId: 'market_leader_methodology',
      actionType: 'methodology_step_view',
      details: { step: METHODOLOGY_STEPS[index].id }
    })
  }

  const handleGetMethodology = () => {
    trackEvent({
      event: 'cta_click',
      category: 'conversion',
      action: 'get_methodology',
      label: 'market_leader_process'
    })
    
    setShowMethodology(true)
  }

  const handleImplementWithUs = () => {
    trackEvent({
      event: 'cta_click',
      category: 'conversion',
      action: 'implement_methodology',
      label: 'consultation_request'
    })
    
    // In real implementation, would open consultation booking
    alert('Methodology implementation consultation would open here')
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-6 py-3 mb-6">
              <Target className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-800 tracking-wide uppercase">
                Market Leader Intelligence · Proven Methodology · Competitive Advantage
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              How market leaders stay ahead
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                while others react
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Top-performing e-commerce businesses don't just optimize their own sites - 
              they systematically track and respond to competitive changes. Here's their playbook.
            </p>
          </motion.div>

          {/* Success Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {SUCCESS_METRICS.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">{item.metric}</div>
                <div className="text-lg font-semibold text-slate-900 mb-1">{item.label}</div>
                <div className="text-sm text-slate-600">{item.description}</div>
              </div>
            ))}
          </motion.div>

          {/* Methodology Steps */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            
            {/* Steps Navigation */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                The 4-Step Market Leader Methodology
              </h3>
              
              {METHODOLOGY_STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    activeStep === index 
                      ? 'border-emerald-500 bg-emerald-50 shadow-lg' 
                      : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`rounded-lg p-3 ${
                      activeStep === index ? 'bg-emerald-500' : 'bg-slate-100'
                    }`}>
                      <step.icon className={`w-6 h-6 ${
                        activeStep === index ? 'text-white' : 'text-slate-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                          {step.frequency}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Step Details */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900 rounded-xl p-8 text-white sticky top-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-500 rounded-lg p-3">
                  {React.createElement(METHODOLOGY_STEPS[activeStep].icon, { className: "w-6 h-6 text-white" })}
                </div>
                <h3 className="text-xl font-bold">{METHODOLOGY_STEPS[activeStep].title}</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-emerald-400 font-semibold mb-2">Business Outcome:</h4>
                  <p className="text-slate-300">{METHODOLOGY_STEPS[activeStep].businessOutcome}</p>
                </div>
                
                <div>
                  <h4 className="text-blue-400 font-semibold mb-2">Real Example:</h4>
                  <p className="text-slate-300 italic">"{METHODOLOGY_STEPS[activeStep].example}"</p>
                </div>
                
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Implementation Frequency:</h4>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">{METHODOLOGY_STEPS[activeStep].frequency}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Methodology Details */}
          {showMethodology && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-8 mb-16"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Complete Implementation Guide
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">What You'll Need:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Competitive monitoring setup (1-2 hours monthly)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Performance tracking dashboard (15 minutes weekly)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Industry benchmark access (quarterly reviews)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Rapid testing framework (as-needed deployment)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Expected Timeline:</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Initial setup</span>
                      <span className="font-semibold text-emerald-600">Week 1</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">First insights</span>
                      <span className="font-semibold text-emerald-600">Week 2-3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Competitive advantage</span>
                      <span className="font-semibold text-emerald-600">Month 2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Market leadership</span>
                      <span className="font-semibold text-emerald-600">Month 3+</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Ready to implement this methodology in your business?
            </h3>
            
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
              We can help you set up the same competitive intelligence systems that market leaders use. 
              Most businesses see actionable insights within the first week.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleImplementWithUs}
                className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-lg"
              >
                Implement With Our Help
              </button>
              
              <button
                onClick={handleGetMethodology}
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white/10 transition-all"
              >
                {showMethodology ? 'Hide' : 'Get'} Complete Guide
              </button>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}