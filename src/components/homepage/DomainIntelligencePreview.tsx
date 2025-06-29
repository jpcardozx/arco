'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { 
  Globe,
  Search,
  AlertTriangle,
  CheckCircle,
  Code,
  Server,
  Database,
  BarChart3,
  RefreshCw,
  ArrowRight,
  Lock,
  ChevronRight,
  Zap,
  RotateCw,
  ShieldCheck,
  DollarSign,
  TrendingUp
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

/**
 * DOMAIN INTELLIGENCE PREVIEW - Interactive Domain Analysis
 * 
 * Purpose:
 * - Demonstrate technical expertise through a real working tool
 * - Provide immediate value to visitors
 * - Drive engagement and data collection
 * - Preview more advanced capabilities available in paid tiers
 */

interface DomainAnalysisState {
  isAnalyzing: boolean
  domain: string
  results: DomainAnalysisResults | null
  error: string | null
  tier: 'free' | 'premium' | 'enterprise'
}

interface TechnologyStack {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'infrastructure' | 'analytics'
  icon: any
}

interface DomainAnalysisResults {
  domain: string
  technologies: TechnologyStack[]
  performance: {
    score: number
    metrics: {
      name: string
      value: string
      rating: 'good' | 'needs-improvement' | 'poor'
    }[]
  }
  security: {
    score: number
    findings: {
      severity: 'low' | 'medium' | 'high' | 'critical'
      issue: string
      impact: string
      isPremium: boolean
    }[]
  }
  seo: {
    score: number
    issues: {
      description: string
      isPremium: boolean
    }[]
  }
  recommendations: {
    title: string
    description: string
    impact: string
    difficulty: 'easy' | 'moderate' | 'complex'
    isPremium: boolean
  }[]
}

export function DomainIntelligencePreview() {
  const [domainAnalysis, setDomainAnalysis] = useState<DomainAnalysisState>({
    isAnalyzing: false,
    domain: '',
    results: null,
    error: null,
    tier: 'free'
  })

  const sectionRef = useRef<HTMLDivElement>(null)
  const domainInputRef = useRef<HTMLInputElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomainAnalysis({
      ...domainAnalysis,
      domain: e.target.value,
      error: null
    })
  }

  const handleTierSelect = (tier: 'free' | 'premium' | 'enterprise') => {
    setDomainAnalysis({
      ...domainAnalysis,
      tier
    })

    trackEvent({
      event: 'tier_selection',
      category: 'engagement',
      action: 'select_tier',
      label: tier
    })
  }

  const handleAnalyzeDomain = async (e: React.FormEvent) => {
    e.preventDefault()

    const domain = domainAnalysis.domain.trim()

    // Validate domain format
    if (!domain || !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(domain)) {
      setDomainAnalysis({
        ...domainAnalysis,
        error: 'Please enter a valid domain (e.g., example.com)'
      })
      return
    }

    // Start analysis
    setDomainAnalysis({
      ...domainAnalysis,
      isAnalyzing: true,
      results: null,
      error: null
    })

    // Track analysis start
    trackEvent({
      event: 'domain_intelligence',
      category: 'tool_usage',
      action: 'analyze_start',
      label: domain,
      custom_parameters: {
        tier: domainAnalysis.tier
      }
    })

    try {
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/domain-intelligence', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ domain, tier: domainAnalysis.tier })
      // })

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2500))

      // Generate mock results based on domain
      const mockResults = generateMockResults(domain, domainAnalysis.tier)

      // Set results
      setDomainAnalysis({
        ...domainAnalysis,
        isAnalyzing: false,
        results: mockResults
      })

      // Track analysis complete
      trackEvent({
        event: 'domain_intelligence',
        category: 'tool_usage',
        action: 'analyze_complete',
        label: domain,
        custom_parameters: {
          tier: domainAnalysis.tier,
          technologies: mockResults.technologies.map(t => t.name).join(','),
          performance_score: mockResults.performance.score
        }
      })

    } catch (error) {
      console.error('Domain analysis failed:', error)

      setDomainAnalysis({
        ...domainAnalysis,
        isAnalyzing: false,
        error: 'Analysis failed. Please try again.'
      })

      // Track analysis error
      trackEvent({
        event: 'domain_intelligence',
        category: 'tool_usage',
        action: 'analyze_error',
        label: domain
      })
    }
  }

  const handleUpgradeTier = () => {
    trackEvent({
      event: 'upgrade_intent',
      category: 'conversion',
      action: 'upgrade_tier_click',
      label: `from_${domainAnalysis.tier}`
    })

    // In a real implementation, this would redirect to pricing page
    // or open a subscription modal
    alert('In a real implementation, this would navigate to the pricing page or open a subscription modal')
  }

  const handleReset = () => {
    setDomainAnalysis({
      ...domainAnalysis,
      domain: '',
      results: null,
      error: null,
      isAnalyzing: false
    })

    // Focus the input
    domainInputRef.current?.focus()

    // Track reset action
    trackEvent({
      event: 'domain_intelligence',
      category: 'tool_usage',
      action: 'reset_analysis'
    })
  }

  const getTierFeatures = (tier: 'free' | 'premium' | 'enterprise') => {
    switch (tier) {
      case 'free':
        return [
          "Basic revenue leak detection",
          "Performance-revenue correlation",
          "Limited inefficiency analysis",
          "Basic implementation recommendations"
        ]
      case 'premium':
        return [
          "Complete revenue leak detection",
          "Detailed inefficiency quantification",
          "48-hour implementation plan",
          "ROI calculation and validation",
          "Performance-based pricing options"
        ]
      case 'enterprise':
        return [
          "Enterprise-grade inefficiency compression",
          "Full revenue recovery framework",
          "Guaranteed 48-hour implementation",
          "Competitive advantage analysis",
          "Digital waste elimination system",
          "Executive revenue impact reporting"
        ]
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-50 to-white"
      data-section="domain-intelligence"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2 text-blue-500" />
            Digital Inefficiency Detection System
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="text-slate-900">Uncover Hidden</span>
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Revenue Leaks in 48 Hours
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our intelligent scanner identifies exactly where your site is losing money through 
            performance gaps, security vulnerabilities, and technical inefficiencies.
          </p>
        </motion.div>

        {/* Tier Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex bg-slate-100 rounded-2xl p-2">
            {(['free', 'premium', 'enterprise'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => handleTierSelect(tier)}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  domainAnalysis.tier === tier
                    ? 'bg-white text-slate-900 shadow-lg'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tier === 'free' && <Globe className="w-5 h-5" />}
                {tier === 'premium' && <Zap className="w-5 h-5" />}
                {tier === 'enterprise' && <ShieldCheck className="w-5 h-5" />}
                <span className="capitalize">{tier}</span>
                {tier !== 'free' && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                    PRO
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Analysis Form + Results Grid */}
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left Column - Analysis Form */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Analyze Any Domain
              </h3>

              <form onSubmit={handleAnalyzeDomain} className="space-y-5">
                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-slate-700 mb-1">
                    Domain Name
                  </label>
                  <div className="relative">
                    <input
                      ref={domainInputRef}
                      id="domain"
                      type="text"
                      placeholder="example.com"
                      value={domainAnalysis.domain}
                      onChange={handleDomainChange}
                      disabled={domainAnalysis.isAnalyzing}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-5 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Search className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                  {domainAnalysis.error && (
                    <p className="mt-2 text-red-600 text-sm flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {domainAnalysis.error}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {!domainAnalysis.results ? (
                    <button
                      type="submit"
                      disabled={domainAnalysis.isAnalyzing || !domainAnalysis.domain}
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      {domainAnalysis.isAnalyzing ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          Detect Revenue Leaks
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-slate-200 text-slate-800 font-semibold rounded-xl hover:bg-slate-300 transition-all duration-300"
                    >
                      <RotateCw className="w-5 h-5" />
                      Analyze Another Domain
                    </button>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Tier Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  {domainAnalysis.tier === 'free' && <Globe className="w-5 h-5 text-blue-600" />}
                  {domainAnalysis.tier === 'premium' && <Zap className="w-5 h-5 text-blue-600" />}
                  {domainAnalysis.tier === 'enterprise' && <ShieldCheck className="w-5 h-5 text-blue-600" />}
                  <span className="capitalize">{domainAnalysis.tier} Tier</span>
                </h3>

                {domainAnalysis.tier !== 'enterprise' && (
                  <button 
                    onClick={handleUpgradeTier}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    Upgrade
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {getTierFeatures(domainAnalysis.tier).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}

                {domainAnalysis.tier === 'free' && (
                  <div className="pt-4">
                    <button
                      onClick={handleUpgradeTier}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white font-medium rounded-xl hover:from-slate-800 hover:to-black transition-all duration-300"
                    >
                      <Lock className="w-4 h-4" />
                      Unlock Premium Features
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Results Display */}
          <div className="lg:col-span-3">
            {!domainAnalysis.results && !domainAnalysis.isAnalyzing ? (
              // Empty state
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-10 h-full flex flex-col items-center justify-center text-center"
              >
                <Server className="w-16 h-16 text-slate-300 mb-6" />
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Revenue Leak Detection</h3>
                <p className="text-slate-500 max-w-md mb-6">
                  Enter your domain to uncover hidden revenue leaks and quantify their financial impact.
                  Get a 48-hour recovery plan in seconds.
                </p>
                <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
                  {[
                    { icon: DollarSign, label: "Revenue Impact" },
                    { icon: Zap, label: "48-Hour Recovery" },
                    { icon: TrendingUp, label: "Efficiency Gains" }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                        <feature.icon className="w-6 h-6 text-slate-500" />
                      </div>
                      <span className="text-sm text-slate-600">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : domainAnalysis.isAnalyzing ? (
              // Loading state
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-slate-200 p-10 h-full flex flex-col items-center justify-center text-center shadow-xl"
              >
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                  <RefreshCw className="w-10 h-10 text-blue-500 animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Analyzing Domain</h3>
                <p className="text-slate-500 max-w-md mb-6">
                  We're analyzing {domainAnalysis.domain} to uncover its technology stack,
                  performance metrics, and security posture.
                </p>
                <div className="w-full max-w-md h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </motion.div>
            ) : (
              // Results display
              <AnimatePresence mode="wait">
                <motion.div
                  key={domainAnalysis.domain}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl"
                >
                  {/* Results Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-white" />
                        <h3 className="text-lg font-bold text-white">
                          {domainAnalysis.results?.domain}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                          {new Date().toLocaleDateString()}
                        </span>
                        <span className="capitalize px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                          {domainAnalysis.tier} Analysis
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Results Content */}
                  <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-50">
                    {/* Score Overview */}
                    <div className="grid grid-cols-3 gap-4">
                      <ScoreCard 
                        title="Revenue Efficiency" 
                        score={domainAnalysis.results?.performance.score || 0} 
                        icon={DollarSign}
                        colorClass="from-emerald-500 to-emerald-600"
                      />
                      <ScoreCard 
                        title="Security Posture" 
                        score={domainAnalysis.results?.security.score || 0} 
                        icon={ShieldCheck}
                        colorClass="from-blue-500 to-blue-600"
                      />
                      <ScoreCard 
                        title="Visibility Score" 
                        score={domainAnalysis.results?.seo.score || 0} 
                        icon={Search}
                        colorClass="from-purple-500 to-purple-600"
                      />
                    </div>

                    {/* Technology Stack */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">
                        Technology Inefficiency Sources
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {domainAnalysis.results?.technologies.map((tech, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center gap-3 bg-slate-50 rounded-lg p-3 border border-slate-200"
                          >
                            <tech.icon className="w-5 h-5 text-slate-700" />
                            <div>
                              <div className="text-sm font-medium text-slate-900">{tech.name}</div>
                              <div className="text-xs text-slate-500 capitalize">{tech.category}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">
                        Revenue Impact Metrics
                      </h4>
                      <div className="space-y-3">
                        {domainAnalysis.results?.performance.metrics.map((metric, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center justify-between bg-slate-50 rounded-lg p-4 border border-slate-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${
                                metric.rating === 'good' ? 'bg-emerald-500' :
                                metric.rating === 'needs-improvement' ? 'bg-amber-500' :
                                'bg-red-500'
                              }`} />
                              <span className="text-slate-900">{metric.name}</span>
                            </div>
                            <div className="font-semibold">
                              {metric.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Security Findings */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">
                        Security Inefficiency Risks
                      </h4>
                      <div className="space-y-3">
                        {domainAnalysis.results?.security.findings.slice(0, domainAnalysis.tier === 'free' ? 2 : undefined).map((finding, idx) => (
                          <div 
                            key={idx} 
                            className={`bg-slate-50 rounded-lg p-4 border ${
                              finding.severity === 'critical' ? 'border-red-200 bg-red-50' :
                              finding.severity === 'high' ? 'border-orange-200 bg-orange-50' :
                              finding.severity === 'medium' ? 'border-amber-200 bg-amber-50' :
                              'border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-md capitalize ${
                                  finding.severity === 'critical' ? 'bg-red-100 text-red-800' :
                                  finding.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                                  finding.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
                                  'bg-slate-100 text-slate-800'
                                }`}>
                                  {finding.severity}
                                </span>
                                <h5 className="font-semibold text-slate-900">{finding.issue}</h5>
                              </div>
                              {finding.isPremium && domainAnalysis.tier === 'free' && (
                                <Lock className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <p className="text-sm text-slate-600">
                              {finding.isPremium && domainAnalysis.tier === 'free' 
                                ? 'Upgrade to Premium to view details of this security finding' 
                                : finding.impact}
                            </p>
                          </div>
                        ))}

                        {domainAnalysis.tier === 'free' && domainAnalysis.results?.security.findings && domainAnalysis.results.security.findings.length > 2 && (
                          <div className="text-center p-3 border border-slate-200 rounded-lg bg-slate-50">
                            <p className="text-slate-700 mb-2">
                              <Lock className="w-4 h-4 inline mr-1" />
                              {domainAnalysis.results.security.findings.length - 2} more security findings available in Premium
                            </p>
                            <button 
                              onClick={handleUpgradeTier}
                              className="text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                              Upgrade to view all
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">
                        48-Hour Recovery Actions
                      </h4>
                      <div className="space-y-4">
                        {domainAnalysis.results?.recommendations.slice(0, domainAnalysis.tier === 'free' ? 1 : undefined).map((rec, idx) => (
                          <div 
                            key={idx} 
                            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-semibold text-slate-900">{rec.title}</h5>
                              <span className={`px-2 py-0.5 text-xs font-semibold rounded-md capitalize ${
                                rec.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-800' :
                                rec.difficulty === 'moderate' ? 'bg-amber-100 text-amber-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {rec.difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 mb-2">
                              {rec.isPremium && domainAnalysis.tier === 'free'
                                ? 'Upgrade to Premium to view detailed recommendations'
                                : rec.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-medium text-blue-700">Impact:</span>
                              <span className="text-slate-700">
                                {rec.isPremium && domainAnalysis.tier === 'free'
                                  ? '[Premium Content]'
                                  : rec.impact}
                              </span>
                            </div>
                          </div>
                        ))}

                        {domainAnalysis.tier === 'free' && domainAnalysis.results?.recommendations && domainAnalysis.results.recommendations.length > 1 && (
                          <div className="text-center p-4 border border-slate-200 rounded-lg bg-slate-50">
                            <p className="text-slate-700 mb-2">
                              <Lock className="w-4 h-4 inline mr-1" />
                              {domainAnalysis.results.recommendations.length - 1} more recommendations available in Premium
                            </p>
                            <button 
                              onClick={handleUpgradeTier}
                              className="text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                              Upgrade to view all
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Get Full Report CTA */}
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-100">
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">
                        Ready to Recover Lost Revenue in 48 Hours?
                      </h4>
                      <p className="text-slate-600 mb-4">
                        Our Digital Inefficiency Compression System identifies and fixes revenue leaks with a guaranteed implementation in just 48 hours.
                      </p>
                      <div className="flex items-center gap-3 mb-4 bg-emerald-100/50 p-3 rounded-lg border border-emerald-200">
                        <span className="text-emerald-700 font-semibold">Average Recovery:</span>
                        <span className="text-emerald-700">$92,000+ annual revenue</span>
                      </div>
                      <button
                        onClick={handleUpgradeTier}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-md transform hover:scale-[1.02]"
                      >
                        <Zap className="w-5 h-5" />
                        Get 48-Hour Recovery Plan
                        <ArrowRight className="w-5 h-5 ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Benefit Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Revenue Correlation Framework",
              description: "Our proprietary models link Core Web Vitals to conversion data, quantifying exactly how much revenue you're losing.",
              icon: DollarSign,
              color: "bg-emerald-600"
            },
            {
              title: "48-Hour Implementation",
              description: "While agencies take weeks, our systematic delivery framework fixes your most critical revenue leaks in just 48 hours.",
              icon: Zap,
              color: "bg-blue-600"
            },
            {
              title: "Guaranteed Performance",
              description: "We offer what no one else does: performance-based pricing with measurable ROI and revenue impact validation.",
              icon: TrendingUp,
              color: "bg-purple-600"
            }
          ].map((benefit, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-xl p-6 shadow-lg border border-slate-100"
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${benefit.color} rounded-t-xl`} />
              <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                <benefit.icon className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h4>
              <p className="text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Score Card Component
function ScoreCard({ title, score, icon: Icon, colorClass }: { title: string, score: number, icon: any, colorClass: string }) {
  // Calculate the rating based on score
  let rating = 'Poor'
  let textColor = 'text-red-600'

  if (score >= 90) {
    rating = 'Excellent'
    textColor = 'text-emerald-600'
  } else if (score >= 70) {
    rating = 'Good'
    textColor = 'text-emerald-600'
  } else if (score >= 50) {
    rating = 'Average'
    textColor = 'text-amber-600'
  } else if (score >= 30) {
    rating = 'Poor'
    textColor = 'text-red-600'
  } else {
    rating = 'Critical'
    textColor = 'text-red-600'
  }

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-medium text-slate-700">{title}</h5>
        <Icon className="w-4 h-4 text-slate-500" />
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold">{score}</div>
        <div className={`text-sm font-medium ${textColor}`}>{rating}</div>
      </div>
      <div className="mt-2 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${colorClass}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

// Helper function to generate mock results
function generateMockResults(domain: string, tier: 'free' | 'premium' | 'enterprise'): DomainAnalysisResults {
  // Create deterministic but different results based on domain string
  const hash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Generate scores between 30 and 95
  const perfScore = 30 + (hash % 65)
  const secScore = 40 + (hash % 55)
  const seoScore = 45 + (hash % 50)

  // Technology stacks based on domain hash
  const frontendTechnologies: TechnologyStack[] = [
    { name: 'React', category: 'frontend', icon: Code },
    { name: 'Angular', category: 'frontend', icon: Code },
    { name: 'Vue.js', category: 'frontend', icon: Code },
    { name: 'Next.js', category: 'frontend', icon: Code },
    { name: 'jQuery', category: 'frontend', icon: Code },
    { name: 'Bootstrap', category: 'frontend', icon: Code },
    { name: 'Tailwind CSS', category: 'frontend', icon: Code }
  ]

  const backendTechnologies: TechnologyStack[] = [
    { name: 'Node.js', category: 'backend', icon: Server },
    { name: 'PHP', category: 'backend', icon: Server },
    { name: 'Python', category: 'backend', icon: Server },
    { name: 'Ruby on Rails', category: 'backend', icon: Server },
    { name: 'Java', category: 'backend', icon: Server },
    { name: 'ASP.NET', category: 'backend', icon: Server },
    { name: 'Laravel', category: 'backend', icon: Server }
  ]

  const databaseTechnologies: TechnologyStack[] = [
    { name: 'MySQL', category: 'database', icon: Database },
    { name: 'PostgreSQL', category: 'database', icon: Database },
    { name: 'MongoDB', category: 'database', icon: Database },
    { name: 'Redis', category: 'database', icon: Database },
    { name: 'SQL Server', category: 'database', icon: Database }
  ]

  const infrastructureTechnologies: TechnologyStack[] = [
    { name: 'AWS', category: 'infrastructure', icon: Server },
    { name: 'Azure', category: 'infrastructure', icon: Server },
    { name: 'Google Cloud', category: 'infrastructure', icon: Server },
    { name: 'Cloudflare', category: 'infrastructure', icon: Server },
    { name: 'Nginx', category: 'infrastructure', icon: Server },
    { name: 'Apache', category: 'infrastructure', icon: Server },
    { name: 'Docker', category: 'infrastructure', icon: Server }
  ]

  const analyticsTechnologies: TechnologyStack[] = [
    { name: 'Google Analytics', category: 'analytics', icon: BarChart3 },
    { name: 'Segment', category: 'analytics', icon: BarChart3 },
    { name: 'Mixpanel', category: 'analytics', icon: BarChart3 },
    { name: 'Hotjar', category: 'analytics', icon: BarChart3 }
  ]

  // Select a subset of technologies based on domain hash
  const selectedFrontend = frontendTechnologies[hash % frontendTechnologies.length]
  const selectedBackend = backendTechnologies[(hash + 3) % backendTechnologies.length]
  const selectedDatabase = databaseTechnologies[(hash + 7) % databaseTechnologies.length]
  const selectedInfrastructure = infrastructureTechnologies[(hash + 5) % infrastructureTechnologies.length]
  const selectedAnalytics = analyticsTechnologies[(hash + 2) % analyticsTechnologies.length]

  // Additional technologies for premium/enterprise tiers
  const additionalTechnologies = []
  if (tier !== 'free') {
    additionalTechnologies.push(
      frontendTechnologies[(hash + 11) % frontendTechnologies.length],
      infrastructureTechnologies[(hash + 13) % infrastructureTechnologies.length]
    )

    if (tier === 'enterprise') {
      additionalTechnologies.push(
        backendTechnologies[(hash + 17) % backendTechnologies.length],
        databaseTechnologies[(hash + 19) % databaseTechnologies.length]
      )
    }
  }

  // Create performance metrics
  const performanceMetrics: {
    name: string;
    value: string;
    rating: 'good' | 'needs-improvement' | 'poor';
  }[] = [
    {
      name: 'First Contentful Paint',
      value: `${(1 + (hash % 40) / 10).toFixed(1)}s`,
      rating: (perfScore > 70 ? 'good' : perfScore > 40 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor'
    },
    {
      name: 'Largest Contentful Paint',
      value: `${(2.1 + (hash % 50) / 10).toFixed(1)}s`,
      rating: (perfScore > 75 ? 'good' : perfScore > 45 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor'
    },
    {
      name: 'Cumulative Layout Shift',
      value: `${(0.05 + (hash % 30) / 100).toFixed(2)}`,
      rating: (perfScore > 80 ? 'good' : perfScore > 50 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor'
    },
    {
      name: 'Time to Interactive',
      value: `${(3.2 + (hash % 60) / 10).toFixed(1)}s`,
      rating: (perfScore > 65 ? 'good' : perfScore > 35 ? 'needs-improvement' : 'poor') as 'good' | 'needs-improvement' | 'poor'
    }
  ]

  // Security findings
  const securityFindings = [
    {
      severity: 'medium' as const,
      issue: 'Missing Content Security Policy',
      impact: 'Increases risk of XSS attacks and data theft',
      isPremium: false
    },
    {
      severity: 'low' as const,
      issue: 'Outdated SSL/TLS Configuration',
      impact: 'Vulnerable to known exploits in older protocol versions',
      isPremium: false
    },
    {
      severity: 'high' as const,
      issue: 'Exposed API Keys in Frontend Code',
      impact: 'Credentials may be extracted and misused by attackers',
      isPremium: true
    },
    {
      severity: 'critical' as const,
      issue: 'Cross-Site Scripting Vulnerability',
      impact: 'High risk of data theft and session hijacking',
      isPremium: true
    },
    {
      severity: 'medium' as const,
      issue: 'Insecure Cookie Configuration',
      impact: 'Cookies accessible via JavaScript and non-HTTPS connections',
      isPremium: true
    }
  ]

  // Randomize which ones to show based on domain
  const shuffledFindings = [...securityFindings].sort(() => 0.5 - Math.random())
  const selectedFindings = shuffledFindings.slice(0, 2 + (hash % 3))

  // SEO issues
  const seoIssues = [
    {
      description: 'Missing meta descriptions on key pages',
      isPremium: false
    },
    {
      description: 'Duplicate title tags found on multiple pages',
      isPremium: false
    },
    {
      description: 'Slow page load times affecting search rankings',
      isPremium: true
    },
    {
      description: 'Mobile usability issues detected',
      isPremium: true
    },
    {
      description: 'Missing alt text on 23 images',
      isPremium: true
    }
  ]

  // Randomize which ones to show based on domain
  const shuffledSEOIssues = [...seoIssues].sort(() => 0.5 - Math.random())
  const selectedSEOIssues = shuffledSEOIssues.slice(0, 2 + (hash % 3))

  // Recommendations
  const recommendations = [
    {
      title: 'Implement Content Delivery Network (CDN)',
      description: 'Deploy a CDN to cache static assets closer to users and reduce load times.',
      impact: 'Reduce page load time by 35-45%',
      difficulty: 'easy' as const,
      isPremium: false
    },
    {
      title: 'Optimize Images and Implement WebP Format',
      description: 'Compress images and convert to WebP format to reduce page weight.',
      impact: 'Reduce page size by 30-40%, improve LCP by 0.8s',
      difficulty: 'easy' as const,
      isPremium: true
    },
    {
      title: 'Implement Server-Side Rendering for Critical Content',
      description: 'Convert client-rendered components to server-rendered for faster initial load.',
      impact: 'Improve First Contentful Paint by 50-65%',
      difficulty: 'moderate' as const,
      isPremium: true
    },
    {
      title: 'Implement Proper Content Security Policy',
      description: 'Add robust CSP headers to prevent XSS attacks and improve security posture.',
      impact: 'Mitigate 75% of potential XSS vulnerabilities',
      difficulty: 'moderate' as const,
      isPremium: true
    }
  ]

  // Randomize recommendations based on domain
  const shuffledRecommendations = [...recommendations].sort(() => 0.5 - Math.random())
  const selectedRecommendations = shuffledRecommendations.slice(0, 3)

  return {
    domain,
    technologies: [
      selectedFrontend,
      selectedBackend,
      selectedDatabase,
      selectedInfrastructure,
      selectedAnalytics,
      ...additionalTechnologies
    ],
    performance: {
      score: perfScore,
      metrics: performanceMetrics
    },
    security: {
      score: secScore,
      findings: selectedFindings
    },
    seo: {
      score: seoScore,
      issues: selectedSEOIssues
    },
    recommendations: selectedRecommendations
  }
}
