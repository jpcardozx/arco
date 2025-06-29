'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin,
  Route,
  CheckCircle,
  ArrowRight,
  Calendar,
  Target,
  TrendingUp,
  Users,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { useOrchestration } from './IntelligentHomepageOrchestrator'

/**
 * PERSONALIZED ROADMAP - Intelligent Next Steps
 * 
 * This final section creates a personalized roadmap based on:
 * - User's detected industry from hero interaction
 * - Engagement patterns throughout the page
 * - Specific business context provided
 * 
 * Focus is on consultative next steps, not aggressive sales
 */

interface RoadmapStep {
  id: string
  title: string
  description: string
  timeframe: string
  outcome: string
  priority: 'high' | 'medium' | 'low'
}

interface IndustryRoadmap {
  industry: string
  context: string
  keyOpportunities: string[]
  customSteps: RoadmapStep[]
  timeToValue: string
  firstWin: string
}

const INDUSTRY_ROADMAPS: Record<string, IndustryRoadmap> = {
  fashion: {
    industry: 'Fashion E-commerce',
    context: 'Fashion businesses often struggle with seasonal traffic fluctuations and mobile conversion optimization',
    keyOpportunities: [
      'Mobile experience optimization (typical 0.7% conversion lift)',
      'Peak season competitive monitoring',
      'Visual search and product discovery improvements'
    ],
    customSteps: [
      {
        id: 'mobile-audit',
        title: 'Mobile Conversion Analysis',
        description: 'Compare your mobile performance against fashion industry leaders',
        timeframe: 'Week 1',
        outcome: 'Identify mobile-specific conversion barriers',
        priority: 'high'
      },
      {
        id: 'seasonal-prep',
        title: 'Seasonal Performance Preparation',
        description: 'Set up monitoring for Black Friday/holiday competition patterns',
        timeframe: 'Week 2',
        outcome: 'Competitive readiness for peak seasons',
        priority: 'high'
      },
      {
        id: 'visual-optimization',
        title: 'Product Discovery Enhancement',
        description: 'Optimize product pages based on fashion industry best practices',
        timeframe: 'Week 3-4',
        outcome: 'Improved product page conversion rates',
        priority: 'medium'
      }
    ],
    timeToValue: '2-3 weeks',
    firstWin: 'Mobile conversion rate improvement'
  },
  electronics: {
    industry: 'Electronics Retail',
    context: 'Electronics businesses face complex comparison shopping behaviors and technical specification challenges',
    keyOpportunities: [
      'Comparison feature optimization',
      'Technical content presentation improvements',
      'Cross-selling and upselling optimization'
    ],
    customSteps: [
      {
        id: 'comparison-analysis',
        title: 'Product Comparison Optimization',
        description: 'Analyze how competitors present technical specifications and comparisons',
        timeframe: 'Week 1',
        outcome: 'Streamlined comparison experience',
        priority: 'high'
      },
      {
        id: 'content-strategy',
        title: 'Technical Content Review',
        description: 'Optimize technical content for both experts and mainstream buyers',
        timeframe: 'Week 2-3',
        outcome: 'Broader audience appeal without losing expertise',
        priority: 'medium'
      },
      {
        id: 'upsell-optimization',
        title: 'Revenue Per Visitor Enhancement',
        description: 'Implement competitive cross-selling strategies',
        timeframe: 'Week 4',
        outcome: 'Increased average order value',
        priority: 'medium'
      }
    ],
    timeToValue: '3-4 weeks',
    firstWin: 'Improved product comparison experience'
  },
  home: {
    industry: 'Home & Garden',
    context: 'Home goods businesses benefit from lifestyle-focused content and seasonal optimization',
    keyOpportunities: [
      'Lifestyle content integration',
      'Room visualization improvements',
      'Seasonal category optimization'
    ],
    customSteps: [
      {
        id: 'lifestyle-content',
        title: 'Lifestyle Content Strategy',
        description: 'Analyze competitor content strategies and room visualization approaches',
        timeframe: 'Week 1-2',
        outcome: 'More engaging product presentation',
        priority: 'high'
      },
      {
        id: 'visualization-tools',
        title: 'Product Visualization Enhancement',
        description: 'Implement competitive visualization and styling tools',
        timeframe: 'Week 3',
        outcome: 'Reduced uncertainty in purchase decisions',
        priority: 'medium'
      },
      {
        id: 'seasonal-categories',
        title: 'Seasonal Category Optimization',
        description: 'Optimize category navigation for seasonal shopping patterns',
        timeframe: 'Week 4',
        outcome: 'Better seasonal traffic conversion',
        priority: 'medium'
      }
    ],
    timeToValue: '2-4 weeks',
    firstWin: 'Enhanced product visualization'
  },
  general: {
    industry: 'E-commerce',
    context: 'Every e-commerce business can benefit from systematic competitive intelligence',
    keyOpportunities: [
      'Competitive conversion rate analysis',
      'Customer journey optimization',
      'Performance monitoring setup'
    ],
    customSteps: [
      {
        id: 'competitive-baseline',
        title: 'Competitive Performance Baseline',
        description: 'Establish your current position vs industry benchmarks',
        timeframe: 'Week 1',
        outcome: 'Clear competitive positioning understanding',
        priority: 'high'
      },
      {
        id: 'journey-optimization',
        title: 'Customer Journey Analysis',
        description: 'Compare your funnel against top industry performers',
        timeframe: 'Week 2',
        outcome: 'Optimized conversion funnel',
        priority: 'high'
      },
      {
        id: 'monitoring-setup',
        title: 'Ongoing Competitive Monitoring',
        description: 'Set up systems to track competitive changes',
        timeframe: 'Week 3',
        outcome: 'Proactive competitive intelligence',
        priority: 'medium'
      }
    ],
    timeToValue: '2-3 weeks',
    firstWin: 'Competitive position clarity'
  }
}

export function PersonalizedRoadmap() {
  const { userProfile, recordInteraction } = useOrchestration()
  const [selectedStep, setSelectedStep] = useState(0)
  const [showFullRoadmap, setShowFullRoadmap] = useState(false)
  const [userContext, setUserContext] = useState('')
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Determine user's industry and create personalized roadmap
  const getPersonalizedRoadmap = (): IndustryRoadmap => {
    const detectedIndustry = userProfile.primaryInterests.includes('competitive_intelligence') 
      ? 'general' // Default if we have engagement but no specific industry
      : 'general'
    
    // In a real implementation, this would use more sophisticated detection
    // based on the hero interaction and user input
    return INDUSTRY_ROADMAPS[detectedIndustry] || INDUSTRY_ROADMAPS.general
  }

  const roadmap = getPersonalizedRoadmap()

  const handleStepSelect = (index: number) => {
    setSelectedStep(index)
    recordInteraction({
      timestamp: new Date(),
      sectionId: 'personalized_roadmap',
      actionType: 'roadmap_step_view',
      details: { step: roadmap.customSteps[index].id }
    })
  }

  const handleStartRoadmap = () => {
    trackEvent({
      event: 'cta_click',
      category: 'conversion',
      action: 'start_personalized_roadmap',
      label: roadmap.industry.toLowerCase().replace(' ', '_')
    })
    
    // In real implementation, would open consultation booking with pre-filled context
    alert('Personalized roadmap consultation would open here')
  }

  const handleScheduleDiscussion = () => {
    trackEvent({
      event: 'cta_click',
      category: 'conversion',
      action: 'schedule_roadmap_discussion',
      label: 'consultation_request'
    })
    
    alert('30-minute roadmap discussion booking would open here')
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-50 to-slate-100">
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
              <Route className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-800 tracking-wide uppercase">
                Personalized Strategy · {roadmap.industry} · Next Steps
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Your personalized roadmap
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                based on what we've learned
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {roadmap.context}. Here's a specific action plan 
              tailored for businesses like yours.
            </p>
          </motion.div>

          {/* Key Opportunities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl border border-slate-200 p-8 mb-16 shadow-lg"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              Key Opportunities for {roadmap.industry}
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {roadmap.keyOpportunities.map((opportunity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{opportunity}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Roadmap Steps */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Steps List */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Recommended Implementation Plan
              </h3>
              <p className="text-slate-600 mb-8">
                Time to first value: <span className="font-semibold text-emerald-600">{roadmap.timeToValue}</span>
              </p>
              
              <div className="space-y-4">
                {roadmap.customSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      selectedStep === index 
                        ? 'border-emerald-500 bg-emerald-50 shadow-lg' 
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                    onClick={() => handleStepSelect(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            selectedStep === index 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {index + 1}
                          </div>
                          <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
                          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            step.priority === 'high' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {step.priority} priority
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm mb-2">{step.description}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span className="text-slate-500">{step.timeframe}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-medium">{step.outcome}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform ${
                        selectedStep === index ? 'rotate-90 text-emerald-600' : 'text-slate-400'
                      }`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Selected Step Details */}
            <motion.div
              key={selectedStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900 rounded-xl p-8 text-white sticky top-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-500 rounded-lg p-3">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{roadmap.customSteps[selectedStep].title}</h3>
                  <p className="text-emerald-400 text-sm">{roadmap.customSteps[selectedStep].timeframe}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-emerald-400 font-semibold mb-2">What we'll do:</h4>
                  <p className="text-slate-300">{roadmap.customSteps[selectedStep].description}</p>
                </div>
                
                <div>
                  <h4 className="text-blue-400 font-semibold mb-2">Expected outcome:</h4>
                  <p className="text-slate-300">{roadmap.customSteps[selectedStep].outcome}</p>
                </div>
                
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">First Win:</h4>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">{roadmap.firstWin}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Context Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-xl border border-slate-200 p-8 mb-16"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Help us personalize this further
            </h3>
            <p className="text-slate-600 mb-6">
              Share any specific challenges or goals, and we'll refine this roadmap for your situation.
            </p>
            
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="e.g., struggling with mobile conversions, preparing for holiday season..."
                value={userContext}
                onChange={(e) => setUserContext(e.target.value)}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:border-emerald-500 focus:outline-none"
              />
              <button
                onClick={() => setShowFullRoadmap(true)}
                className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Refine Plan
              </button>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Ready to start your competitive intelligence journey?
            </h3>
            
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
              Let's discuss this roadmap and see how it fits your specific situation. 
              Most businesses find value in the first conversation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartRoadmap}
                className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-lg"
              >
                Start This Roadmap
              </button>
              
              <button
                onClick={handleScheduleDiscussion}
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white/10 transition-all"
              >
                Schedule 30-min Discussion
              </button>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}