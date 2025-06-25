'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DollarSign,
  Building,
  Zap,
  Award,
  Brain,
  Users,
  Target,
  ChevronRight,
  Play,
  Code,
  BarChart3,
  Settings
} from 'lucide-react'

/**
 * SERVICE LADDER - T1/T2/T3 Clear Path to Results
 * 
 * STRATEGY: Simple, predictable process with escalating value
 * PSYCHOLOGY: Remove decision fatigue with clear progression
 * POSITIONING: "Start small, prove value, scale up"
 */

// Substitua a função analyzeWithMCP pelo uso real da API route
async function analyzeWithMCP(step: any) {
  const response = await fetch('/api/domain-intelligence-new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      change: {
        type: 'optimization',
        description: step.description,
        scope: 'page',
        context: { businessGoals: [step.focus] }
      }
    })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao consultar MCP');
  }
  return await response.json();
}

export function FrameworkBreakdown() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mcpResult, setMcpResult] = useState<any>(null)
  const [mcpLoading, setMcpLoading] = useState(false)

  const serviceTiers = [
    {
      tier: 'T1',
      title: 'No-Brainer Insight',
      price: '$197',
      time: '5 days',
      description: 'Quick assessment to identify biggest waste + performance wins',
      icon: BarChart3,
      color: 'from-emerald-500 to-emerald-700',
      details: {
        approach: 'Rapid Assessment & ROI Projection',
        deliverables: [
          '5-minute Loom video walkthrough',
          'SaaS waste vs LCP impact spreadsheet',
          '12-month ROI estimate with confidence intervals',
          'Priority ranking of quick wins'
        ],
        tools: ['ARCO Waste Scanner', 'Performance Analyzer', 'ROI Calculator'],
        gate: 'ROI projected ≥ 5x investment',
        outcome: 'Clear roadmap with quantified business impact'
      }
    },
    {
      tier: 'T2',
      title: 'Sprint Execution',
      price: '20% of savings OR $1,997',
      time: '25 days',
      description: 'Choose ONE: SaaS rightsizing OR performance optimization sprint',
      icon: Zap,
      color: 'from-blue-500 to-blue-700',
      details: {
        approach: 'Focused Implementation Sprint',
        deliverables: [
          'Option A: SaaS consolidation + license optimization',
          'Option B: Core Web Vitals optimization + mobile performance',
          'Measurable results with before/after metrics',
          'Implementation complete with handover'
        ],
        tools: ['Implementation Automation', 'Progress Tracking', 'Results Validation'],
        gate: 'Savings or revenue increase measured and verified',
        outcome: 'Immediate, measurable business impact in chosen area'
      }
    },
    {
      tier: 'T3',
      title: 'Growth Retainer',
      price: '$2-4k/month + 10% of new savings',
      time: '3-6 months',
      description: 'Ongoing optimization across both SaaS + performance with automation',
      icon: Target,
      color: 'from-purple-500 to-purple-700',
      details: {
        approach: 'Continuous Optimization Engine',
        deliverables: [
          'Monthly optimization sprints (alternating SaaS/performance)',
          'Custom automation tools and monitoring',
          'Micro-apps for ongoing efficiency',
          'Quarterly strategy reviews and roadmap updates'
        ],
        tools: ['Custom Automation Suite', 'Monitoring Dashboard', 'Optimization Engine'],
        gate: 'New optimizations pay back ≤ 60 days',
        outcome: 'Self-sustaining optimization with predictable ROI'
      }
    }
  ]

  const startDemo = () => {
    setIsPlaying(true)
    setActiveStep(0)

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= serviceTiers.length - 1) {
          setIsPlaying(false)
          clearInterval(interval)
          return 0
        }
        return prev + 1
      })
    }, 2000)
  }

  const Icon = serviceTiers[activeStep].icon;

  return (
    <section className="py-24 bg-white">
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
            Simple
            <span className="block bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Predictable Process
            </span>
            <span className="block text-2xl md:text-3xl font-normal text-slate-600 mt-2">
              T1 → T2 → T3 Service Ladder
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Start small, prove value, scale up. No long-term commitments, just results.
          </p>

          {/* Demo Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={startDemo}
              disabled={isPlaying}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <Play className="w-5 h-5 mr-3" />
              {isPlaying ? 'Running Demo...' : 'See Service Ladder in Action'}
            </button>
            <button
              onClick={async () => {
                setMcpLoading(true)
                setMcpResult(null)
                const result = await analyzeWithMCP(serviceTiers[activeStep])
                setMcpResult(result)
                setMcpLoading(false)
              }}
              disabled={mcpLoading}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-600 text-white font-semibold rounded-xl hover:from-slate-900 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <BarChart3 className="w-5 h-5 mr-3" />
              {mcpLoading ? 'Analyzing...' : 'Analyze with MCP'}
            </button>
          </div>
        </motion.div>

        {/* Framework Visualization */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Service Tiers */}
          <div className="space-y-4">
            {serviceTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`cursor-pointer transition-all duration-300 ${index === activeStep
                  ? 'scale-105'
                  : 'hover:scale-102'
                  }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${index === activeStep
                  ? 'border-blue-200 bg-gradient-to-r from-blue-50 to-emerald-50 shadow-lg'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                  }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl transition-all duration-300 ${index === activeStep
                      ? `bg-gradient-to-r ${tier.color} text-white shadow-lg`
                      : 'bg-slate-100 text-slate-600'
                      }`}>
                      {tier.tier}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{tier.title}</h3>
                        <span className="text-sm text-slate-500">• {tier.price}</span>
                        <ChevronRight className={`w-5 h-5 transition-all duration-300 ${index === activeStep ? 'text-blue-600 translate-x-1' : 'text-slate-400'
                          }`} />
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {tier.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Step Details */}
          <div className="sticky top-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-50 rounded-2xl p-8 shadow-xl border border-slate-200"
              >
                {/* Tier Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${serviceTiers[activeStep].color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {serviceTiers[activeStep].title}
                    </h3>
                    <p className="text-slate-600">{serviceTiers[activeStep].price} • {serviceTiers[activeStep].time}</p>
                  </div>
                </div>

                {/* Tier Details */}
                <div className="space-y-6">

                  {/* Approach */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="w-5 h-5 text-slate-700" />
                      <h4 className="font-semibold text-slate-900">Approach</h4>
                    </div>
                    <p className="text-slate-700 font-medium">
                      {serviceTiers[activeStep].details.approach}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-5 h-5 text-slate-700" />
                      <h4 className="font-semibold text-slate-900">Deliverables</h4>
                    </div>
                    <ul className="space-y-2">
                      {serviceTiers[activeStep].details.deliverables.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                          <span className="text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="w-5 h-5 text-slate-700" />
                      <h4 className="font-semibold text-slate-900">Tools</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {serviceTiers[activeStep].details.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white rounded-lg text-sm text-slate-700 border border-slate-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Success Gate & Outcome */}
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <h4 className="font-semibold text-amber-900 mb-2">Success Gate</h4>
                      <p className="text-amber-800 leading-relaxed">
                        {serviceTiers[activeStep].details.gate}
                      </p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                      <h4 className="font-semibold text-emerald-900 mb-2">Expected Outcome</h4>
                      <p className="text-emerald-800 leading-relaxed">
                        {serviceTiers[activeStep].details.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Framework Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-white"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6">
              Start with T1 Insight
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Get immediate ROI estimate and roadmap for just $197. No commitment, 5-day delivery.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">5</div>
                <div className="text-slate-300">Days to Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">$197</div>
                <div className="text-slate-300">Fixed Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">5x</div>
                <div className="text-slate-300">Minimum ROI Target</div>
              </div>
            </div>

            <button className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Your Waste Report ($197)
              <ChevronRight className="w-5 h-5 ml-3" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
