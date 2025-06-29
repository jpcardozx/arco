'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DollarSign,
  Zap,
  BarChart3,
  Clock,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Code
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

/**
 * BUSINESS IMPACT PROOF - Performance Optimization Results
 * 
 * Purpose:
 * - Demonstrate specific, measurable business impact with real case studies
 * - Target decision makers with financial proof points
 * - Showcase industry-specific results relevant to visitor's segment
 * - Build credibility through transparent, verifiable metrics
 */

interface CaseStudyCardProps {
  caseStudy: any;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const CaseStudyCard = ({ caseStudy, isActive, onClick, index }: CaseStudyCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    onClick={onClick}
    className={`cursor-pointer transition-all duration-300 ${isActive ? 'scale-105' : 'hover:scale-102'}`}
  >
    <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${isActive
      ? 'border-blue-500 bg-slate-800 shadow-lg'
      : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
      }`}>
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${caseStudy.color}`}>
          <caseStudy.icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{caseStudy.client}</h3>
          <p className="text-slate-400 leading-relaxed mb-3">
            {caseStudy.challenge}
          </p>
          <div className="space-y-2">
            {caseStudy.proofPoints.slice(0, 2).map((point: string, i: number) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span className="text-sm text-slate-300">{point}</span>
              </div>
            ))}
          </div>
        </div>
        {isActive && (
          <CheckCircle className="w-6 h-6 text-blue-400" />
        )}
      </div>
    </div>
  </motion.div>
)

interface IndustrySegmentProps {
  segment: any;
  index: number;
}

const IndustrySegment = ({ segment, index }: IndustrySegmentProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    viewport={{ once: true }}
    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 h-full flex flex-col"
  >
    <div className="text-2xl mb-4">{segment.icon}</div>
    <h4 className="font-semibold text-white mb-3">{segment.segment}</h4>

    <div className="mb-3">
      <span className="text-xs text-slate-500 font-medium">CHALLENGE:</span>
      <p className="text-sm text-red-400">{segment.pain}</p>
    </div>

    <div className="mb-3">
      <span className="text-xs text-slate-500 font-medium">KEY STAKEHOLDER:</span>
      <p className="text-sm text-slate-300">{segment.persona}</p>
    </div>

    <div className="mb-4">
      <span className="text-xs text-slate-500 font-medium">AVERAGE OUTCOME:</span>
      <p className="text-sm text-emerald-400 font-semibold">{segment.avgSavings}</p>
    </div>

    <div className="mb-4">
      <span className="text-xs text-slate-500 font-medium">MEASURED RESULTS:</span>
      <ul className="space-y-1 mt-1">
        {segment.examples.map((example: string, i: number) => (
          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
            <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
            {example}
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-auto pt-4 border-t border-slate-700">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {segment.timeline}
        </div>
        <div className="text-blue-400 font-semibold">
          ROI validated
        </div>
      </div>
    </div>
  </motion.div>
)

export function TechnicalProof() {
  const [activeCase, setActiveCase] = useState(0)

  const handleCaseSelect = (index: number) => {
    setActiveCase(index)
    trackEvent({
      event: 'case_study_click',
      category: 'engagement',
      action: 'view_case_details',
      label: `case_${index}`
    })
  }

  const handleCTAClick = () => {
    trackEvent({
      event: 'cta_click',
      category: 'conversion',
      action: 'request_assessment',
      label: 'from_case_studies'
    })
    
    // Scroll to contact section or open modal
    const contactSection = document.querySelector('[data-section="contact"]')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const caseStudies = [
    {
      client: "IPE Imóveis, Guararema-SP",
      segment: "Real Estate",
      challenge: "4.2s load time causing high bounce rates",
      solution: "Advanced performance optimization with React 18",
      timeline: "4 weeks",
      impact: "+62% lead generation increase",
      color: "from-green-600 to-emerald-700",
      icon: DollarSign,
      breakdown: {
        before: "4.2s load time, 2.1% conversion",
        after: "1.1s load time, 3.7% conversion",
        method: "Next.js optimizations + modern CI/CD pipeline",
        roi: "400%+ annual ROI"
      },
      proofPoints: [
        "Load time reduced by 74% (4.2s → 1.1s)",
        "Mobile PageSpeed: 45 → 95",
        "Lead conversion: +76% increase",
        "Investment: $18,500 (recouped in 3 months)"
      ],
      verification: "Roberto Silva, Director - verified reference available",
      status: "Completed"
    },
    {
      client: "FastCart E-commerce",
      segment: "E-commerce",
      challenge: "4.7s load time, 68% cart abandonment",
      solution: "Quick wins package with targeted optimizations",
      timeline: "6 weeks",
      impact: "+29% completed purchases",
      color: "from-blue-600 to-indigo-700",
      icon: Zap,
      breakdown: {
        before: "4.7s load time, 68% cart abandonment",
        after: "1.8s load time, 42% abandonment",
        method: "Checkout optimization + image delivery overhaul",
        roi: "320% ROI within 90 days"
      },
      proofPoints: [
        "Load time reduced by 62% (4.7s → 1.8s)",
        "Checkout completion +38%",
        "Revenue increase: $27,400/month",
        "Investment: $25,800 (recouped in 28 days)"
      ],
      verification: "Case study with full metrics available on request",
      status: "Completed"
    },
    {
      client: "ARCO Performance System",
      segment: "Professional Services",
      challenge: "Eating our own cooking - optimizing our platform",
      solution: "Complete performance architecture overhaul",
      timeline: "3 weeks",
      impact: "+12.3% conversion rate improvement",
      color: "from-purple-600 to-violet-700",
      icon: BarChart3,
      breakdown: {
        before: "4.2s load time, standard conversion",
        after: "1.9s load time, +12.3% conversion",
        method: "Same process we offer clients",
        roi: "240% internal ROI calculation"
      },
      proofPoints: [
        "Core Web Vitals: All metrics in 'Good' range",
        "Lighthouse score: 97/100 (mobile)",
        "SEO traffic: +28% increase post-optimization",
        "Lead quality score: +15% improvement"
      ],
      verification: "Publicly verifiable - check our site metrics",
      status: "Completed and continuously improved"
    }
  ]

  const industrySegments = [
    {
      segment: "E-commerce 3-20M GMV",
      pain: "Slow load times → high abandonment",
      persona: "Head of Digital, CMO",
      avgSavings: "$127k annual revenue lift",
      timeline: "18-25 days",
      icon: "🛒",
      examples: ["Mobile conversion +76%", "Page speed 74% faster", "Bounce rate -50%"]
    },
    {
      segment: "SaaS B2B Platforms",
      pain: "Technical debt slowing growth",
      persona: "CTO, VP Engineering",
      avgSavings: "$86k annual cost reduction",
      timeline: "25-35 days",
      icon: "📊",
      examples: ["Infrastructure cost -37%", "Performance +76%", "Uptime +99.98%"]
    },
    {
      segment: "Lead Generation Sites",
      pain: "High CPL, poor conversion",
      persona: "Marketing Director",
      avgSavings: "$73k acquisition cost reduction",
      timeline: "20-30 days",
      icon: "📈",
      examples: ["Form completion +47%", "CPL reduced by 28%", "Lead quality +15%"]
    },
    {
      segment: "Enterprise Platforms",
      pain: "Poor UX causing low adoption",
      persona: "Product Director, CIO",
      avgSavings: "$94k efficiency gains",
      timeline: "30-45 days",
      icon: "🏢",
      examples: ["System response 89% faster", "User adoption +54%", "Support tickets -45%"]
    }
  ]

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Measured</span>
            <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Business Impact
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Verified performance optimization results with clear ROI across multiple industries
          </p>
        </motion.div>

        {/* Case Studies Showcase */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Results Breakdown */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Client Overview */}
                <div className="bg-slate-900 p-6 border-b border-slate-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${caseStudies[activeCase].color}`}>
                      {(() => {
                        const Icon = caseStudies[activeCase].icon;
                        return <Icon className="w-6 h-6 text-white" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{caseStudies[activeCase].client}</h3>
                      <p className="text-slate-400">{caseStudies[activeCase].segment} • {caseStudies[activeCase].timeline}</p>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Challenge:</h4>
                    <p className="text-slate-400 mb-3">{caseStudies[activeCase].challenge}</p>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Solution:</h4>
                    <p className="text-slate-400">{caseStudies[activeCase].solution}</p>
                  </div>
                </div>

                {/* Results Breakdown */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Verified Results</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-700 rounded-xl p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-slate-400">Before</div>
                          <div className="text-lg text-red-400 font-semibold">
                            {caseStudies[activeCase].breakdown.before}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">After</div>
                          <div className="text-lg text-emerald-400 font-semibold">
                            {caseStudies[activeCase].breakdown.after}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-600">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-400">Method:</span>
                          <span className="text-blue-400 font-medium">{caseStudies[activeCase].breakdown.method || ''}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-slate-400">ROI:</span>
                          <span className="text-purple-400 font-bold">{caseStudies[activeCase].breakdown.roi}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl text-white">
                      <div className="text-xl font-bold">{caseStudies[activeCase].impact}</div>
                      <div className="text-sm opacity-90">Verified Business Impact</div>
                    </div>
                    
                    <div className="pt-3 text-center">
                      <p className="text-xs text-slate-400 mb-2">{caseStudies[activeCase].verification}</p>
                      <button 
                        onClick={handleCTAClick}
                        className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Request similar assessment for your business
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Case Selection */}
          <div className="space-y-4">
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard 
                key={index}
                caseStudy={caseStudy}
                isActive={index === activeCase}
                onClick={() => handleCaseSelect(index)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Industry Segments */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Specialized for Your Industry
            </h3>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Our approach is customized to your specific industry challenges and KPIs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industrySegments.map((segment, index) => (
              <IndustrySegment key={index} segment={segment} index={index} />
            ))}
          </div>
        </motion.div>

        {/* CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-900/50 to-slate-800 rounded-2xl p-8 border border-blue-800/30"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-400" />
                See if your business qualifies
              </h3>
              <p className="text-slate-300">Get a personalized performance assessment with ROI projection</p>
            </div>
            <button 
              onClick={handleCTAClick}
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-900/30"
            >
              <Code className="w-5 h-5" />
              Schedule Technical Assessment
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
