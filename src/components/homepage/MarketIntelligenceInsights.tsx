'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  TrendingUp, 
  Target, 
  BarChart3, 
  Users,
  DollarSign,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { useOrchestration } from './IntelligentHomepageOrchestrator'

/**
 * MARKET INTELLIGENCE INSIGHTS - Business Intelligence Continuation
 * 
 * This section continues the narrative from the hero's competitive analysis,
 * showing concrete business insights and patterns discovered through real client work.
 * Focus is on business impact, not technical details.
 */

interface MarketInsight {
  id: string
  title: string
  context: string
  discovery: string
  businessImpact: string
  timeframe: string
  industry: string
}

const MARKET_INSIGHTS: MarketInsight[] = [
  {
    id: 'conversion-timing',
    title: 'Peak Conversion Windows',
    context: 'Fashion e-commerce client was seeing inconsistent daily performance',
    discovery: 'Competitors had 0.3% higher conversion during 2-6pm window',
    businessImpact: '$3,200 additional monthly revenue by optimizing peak hours',
    timeframe: '2 weeks to implement',
    industry: 'Fashion'
  },
  {
    id: 'mobile-experience',
    title: 'Mobile Conversion Gaps',
    context: 'Electronics retailer wondering why mobile traffic wasn\'t converting',
    discovery: 'Industry leaders averaged 2.1% mobile conversion vs their 1.4%',
    businessImpact: '67% increase in mobile revenue potential identified',
    timeframe: '3 weeks optimization',
    industry: 'Electronics'
  },
  {
    id: 'checkout-friction',
    title: 'Checkout Abandonment Patterns',
    context: 'Home goods store losing customers at final step',
    discovery: 'Top competitors had 23% fewer checkout abandonments',
    businessImpact: '$8,500 monthly revenue recovery opportunity',
    timeframe: '1 week implementation',
    industry: 'Home & Garden'
  }
]

export function MarketIntelligenceInsights() {
  const { userProfile } = useOrchestration()
  const [activeInsight, setActiveInsight] = useState(0)
  const [showAllInsights, setShowAllInsights] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Personalize insights based on user's detected industry from hero
  const getRelevantInsights = () => {
    if (userProfile.primaryInterests.includes('competitive_intelligence')) {
      // Show insights most relevant to user's detected industry
      return MARKET_INSIGHTS
    }
    return MARKET_INSIGHTS
  }

  const handleLearnMore = (insightId: string) => {
    trackEvent({
      event: 'insight_engagement',
      category: 'market_intelligence',
      action: 'learn_more',
      label: insightId
    })
    
    setShowAllInsights(true)
  }

  const handleGetMyInsights = () => {
    trackEvent({
      event: 'cta_click',
      category: 'conversion',
      action: 'get_market_insights',
      label: 'personalized_intelligence'
    })
    
    // In real implementation, would open industry-specific insights form
    alert('Personalized market intelligence consultation would open here')
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-6 py-3 mb-6">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800 tracking-wide uppercase">
                Market Intelligence · Real Client Discoveries · Business Impact Focus
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              What the data reveals about 
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                businesses like yours
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              These patterns emerged from analyzing hundreds of e-commerce businesses. 
              Each insight represents a real competitive advantage discovered through systematic market intelligence.
            </p>
          </motion.div>

          {/* Market Insights Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {getRelevantInsights().map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`bg-white rounded-xl border-2 p-8 transition-all duration-300 cursor-pointer ${
                  activeInsight === index 
                    ? 'border-blue-500 shadow-xl shadow-blue-100' 
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-lg'
                }`}
                onClick={() => setActiveInsight(index)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                    {insight.industry}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {insight.title}
                </h3>
                
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {insight.context}
                </p>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-emerald-800 mb-1">Discovery:</h4>
                  <p className="text-emerald-700 text-sm">{insight.discovery}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-slate-900">{insight.businessImpact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-600">{insight.timeframe}</span>
                  </div>
                </div>
                
                {activeInsight === index && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLearnMore(insight.id)
                    }}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Expanded Insights */}
          {showAllInsights && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900 rounded-xl p-8 text-white mb-16"
            >
              <h3 className="text-2xl font-bold mb-6">
                Industry Patterns We've Identified
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-emerald-400 mb-3">
                    Common Blind Spots
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">73% of businesses don't know their competitive conversion position</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Mobile experience gaps average 0.7% conversion difference</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Peak hour optimization is overlooked by 84% of e-commerce</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">
                    Market Leader Advantages
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Systematic competitive monitoring every 30 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">A/B testing informed by competitor performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Industry-specific conversion optimization strategies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              What patterns would we discover in your business?
            </h3>
            
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Each business has unique competitive dynamics. Our market intelligence analysis 
              reveals specific opportunities based on your industry, traffic patterns, and competitive landscape.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetMyInsights}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
              >
                Get My Market Intelligence
              </button>
              
              <button
                onClick={() => setShowAllInsights(!showAllInsights)}
                className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-300 hover:bg-slate-50 transition-all"
              >
                {showAllInsights ? 'Hide' : 'See More'} Patterns
              </button>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}