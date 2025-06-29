'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle,
  Terminal,
  Code,
  Search,
  Server,
  RefreshCw,
  Database,
  Zap,
  ExternalLink,
  Globe,
  AlertTriangle,
  TrendingUp
} from 'lucide-react'
import { trackEvent, trackFunnelStep } from '@/lib/analytics'
import { useOrchestration } from './IntelligentHomepageOrchestrator'

/**
 * TECHNICAL ANALYSIS SECTION - Deep Technical Demonstration
 * 
 * Refactored from the previous FocusedHeroSection to work as a second section
 * Maintains all the sophisticated features:
 * - Real-time domain analysis with mock results
 * - Progressive disclosure of technical insights
 * - Advanced form validation and UX patterns
 * - Live technical demonstration terminal
 * - Sophisticated animations and micro-interactions
 */

const DOMAIN_PATTERNS = [
  'example.com',
  'yourdomain.com',
  'company.io',
  'saas-app.com',
  'ecommerce-store.com'
]

interface DomainAnalysisState {
  isAnalyzing: boolean
  domain: string
  results: DomainAnalysisResults | null
  error: string | null
  progress: number
}

interface DomainAnalysisResults {
  performance: {
    score: number
    lcp: number
    cls: number
    fid: number
    issues: string[]
    rating: 'poor' | 'needs-improvement' | 'good'
  }
  seo: {
    score: number
    issues: string[]
  }
  technical: {
    stack: string[]
    frameworks: string[]
    serverType: string
    responseTime: number
    requestCount: number
    totalSize: number
    compression: boolean
  }
  business: {
    estimatedLostRevenue: number
    conversionImpact: number
    recommendedFixes: {
      title: string
      impact: string
      difficulty: 'low' | 'medium' | 'high'
    }[]
  }
}

export function TechnicalAnalysisSection() {
  const { recordInteraction } = useOrchestration()
  const containerRef = useRef<HTMLDivElement>(null)
  const domainInputRef = useRef<HTMLInputElement>(null)
  const isInView = useInView(containerRef, { once: true })

  const [domainAnalysis, setDomainAnalysis] = useState<DomainAnalysisState>({
    isAnalyzing: false,
    domain: '',
    results: null,
    error: null,
    progress: 0
  })

  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  // Handle domain input change
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomainAnalysis({
      ...domainAnalysis,
      domain: e.target.value,
      error: null
    })
  }

  // Cycle through domain pattern placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % DOMAIN_PATTERNS.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Track visibility
  useEffect(() => {
    if (isInView) {
      trackFunnelStep('technical_analysis_view', 'technical_funnel', {
        section: 'technical_analysis',
        version: 'domain_analyzer_v2',
        timestamp: Date.now()
      })
    }
  }, [isInView])

  // Analyze domain handler
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
      progress: 0,
      results: null,
      error: null
    })

    // Record interaction
    recordInteraction({
      timestamp: new Date(),
      sectionId: 'technical_analysis',
      actionType: 'analyze_start',
      details: { domain }
    })

    // Track analysis start
    trackEvent({
      event: 'domain_analysis',
      category: 'tool_usage',
      action: 'analyze_start',
      label: domain
    })

    try {
      // Simulate analysis progress
      const progressInterval = setInterval(() => {
        setDomainAnalysis(prev => ({
          ...prev,
          progress: Math.min(prev.progress + Math.random() * 15, 95)
        }))
      }, 300)

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2500))

      // Clear progress interval
      clearInterval(progressInterval)

      // Generate mock results based on domain
      const mockResults = generateMockResults(domain)

      // Set results
      setDomainAnalysis({
        ...domainAnalysis,
        isAnalyzing: false,
        progress: 100,
        results: mockResults
      })

      // Track analysis complete
      trackEvent({
        event: 'domain_analysis',
        category: 'tool_usage',
        action: 'analyze_complete',
        label: domain,
        custom_parameters: {
          performance_score: mockResults.performance.score,
          estimated_impact: mockResults.business.estimatedLostRevenue
        }
      })

    } catch (error) {
      console.error('Domain analysis failed:', error)

      setDomainAnalysis({
        ...domainAnalysis,
        isAnalyzing: false,
        error: 'Analysis failed. Please try again.'
      })

      trackEvent({
        event: 'domain_analysis',
        category: 'tool_usage',
        action: 'analyze_error',
        label: domain
      })
    }
  }

  // Reset analysis
  const handleReset = () => {
    setDomainAnalysis({
      isAnalyzing: false,
      domain: '',
      results: null,
      error: null,
      progress: 0
    })

    domainInputRef.current?.focus()

    trackEvent({
      event: 'domain_analysis',
      category: 'tool_usage',
      action: 'reset_analysis'
    })
  }

  // Get full analysis handler
  const handleGetFullAnalysis = () => {
    trackEvent({
      event: 'cta_click',
      category: 'conversion',
      action: 'get_full_analysis',
      label: domainAnalysis.domain
    })

    // In real implementation, would open lead capture
    alert('Full analysis lead capture would open here')
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-slate-50 to-white py-20"
      data-section="technical-analysis"
    >
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
              <Terminal className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800 tracking-wide uppercase">
                Technical Health Scanner · Real-Time Analysis · No Setup Required
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              See Exactly What's Costing You Revenue
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Automated technical audit reveals performance gaps, conversion killers, and revenue leaks. 
              Get instant insights into your site's technical health with our founder-led analysis engine.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left Column - Domain Analyzer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Domain Analysis Form */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Free Technical Health Audit
                  <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full border border-emerald-200 font-semibold">
                    No Email Required
                  </span>
                </h3>

                <form onSubmit={handleAnalyzeDomain} className="space-y-6">
                  <div>
                    <div className="relative">
                      <input
                        ref={domainInputRef}
                        type="text"
                        value={domainAnalysis.domain}
                        onChange={handleDomainChange}
                        placeholder={DOMAIN_PATTERNS[placeholderIndex]}
                        disabled={domainAnalysis.isAnalyzing}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-5 py-4 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {domainAnalysis.isAnalyzing ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            Analyzing... ({Math.round(domainAnalysis.progress)}%)
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            Analyze Technical Health
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-slate-600 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all duration-300"
                      >
                        <RefreshCw className="w-5 h-5" />
                        Analyze Another Domain
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Key Benefits - shown when no analysis is running */}
              {!domainAnalysis.results && (
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Automated, code-level technical scan—no setup, no sales pitch",
                    "Quantified revenue impact and prioritized fixes, not generic advice",
                    "Founder-reviewed recommendations, tailored to your stack and business",
                    "Full transparency: see exactly what's costing you and how to fix it—fast"
                  ].map((benefit, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-6 flex items-center gap-4"
              >
                <img src="/logo-ipe-imoveis.png" alt="Ipê Imóveis" className="w-12 h-12 rounded-full border-2 border-emerald-500" />
                <div>
                  <p className="text-slate-800 font-semibold mb-1">"ARCO's automated audit found a $4,000/mo leak in our checkout. Fixed in 72h."</p>
                  <span className="text-emerald-700 text-xs font-bold uppercase tracking-wide">Verified Client Result · Ipê Imóveis</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Results or Technical Demo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              {domainAnalysis.results ? (
                // Analysis Results Display
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl"
                >
                  {/* Results Header */}
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Server className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-bold text-slate-900">
                          {domainAnalysis.domain}
                        </h3>
                        <span className="px-2 py-0.5 bg-blue-100 rounded-full text-xs text-blue-700">
                          Free Analysis
                        </span>
                      </div>
                      <span className="text-sm text-slate-500">
                        Analyzed {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Results Content */}
                  <div className="p-6 space-y-6">
                    {/* Performance Overview */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-50 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-slate-900 mb-1">
                          {domainAnalysis.results.performance.score}/100
                        </div>
                        <div className="text-sm text-slate-600">
                          Performance Score
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-slate-900 mb-1">
                          {domainAnalysis.results.performance.lcp.toFixed(1)}s
                        </div>
                        <div className="text-sm text-slate-600">
                          Largest Contentful Paint
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-slate-900 mb-1">
                          {domainAnalysis.results.technical.responseTime}ms
                        </div>
                        <div className="text-sm text-slate-600">
                          Server Response Time
                        </div>
                      </div>
                    </div>

                    {/* Business Impact */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-red-600" />
                        Estimated Revenue Impact
                      </h4>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-3xl font-bold text-red-600 mb-1">
                            ${domainAnalysis.results.business.estimatedLostRevenue.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-700">
                            Annual Revenue at Risk
                          </div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-red-600 mb-1">
                            {domainAnalysis.results.business.conversionImpact}%
                          </div>
                          <div className="text-sm text-slate-700">
                            Conversion Rate Impact
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Technical Stack */}
                    <div className="bg-slate-50 rounded-xl p-5">
                      <h4 className="text-md font-semibold text-slate-900 mb-3">
                        Technology Stack Detected
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {domainAnalysis.results.technical.stack.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Issues & Recommendations */}
                    <div>
                      <h4 className="text-md font-semibold text-slate-900 mb-3">
                        Critical Issues ({domainAnalysis.results.performance.issues.length})
                      </h4>
                      <div className="space-y-2">
                        {domainAnalysis.results.performance.issues.slice(0, 3).map((issue, index) => (
                          <div key={index} className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{issue}</span>
                          </div>
                        ))}

                        {domainAnalysis.results.performance.issues.length > 3 && (
                          <div className="text-sm text-slate-500 text-center pt-1">
                            + {domainAnalysis.results.performance.issues.length - 3} more issues in complete report
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-slate-900 mb-3">
                        Get a Complete Technical Assessment
                      </h4>
                      <p className="text-slate-700 mb-4 text-sm">
                        This free analysis reveals only surface-level issues. Our complete assessment includes:
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {[
                          "Code-level analysis",
                          "Complete performance optimization plan",
                          "Implementation roadmap with priorities",
                          "ROI calculation for each improvement"
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleGetFullAnalysis}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                      >
                        <Database className="w-5 h-5" />
                        Get My Complete Diagnosis
                        <ArrowRight className="w-5 h-5 ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Technical Demo Terminal
                <>
                  <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                    {/* Terminal Header */}
                    <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                      <span className="ml-2 text-slate-400 text-xs font-mono">
                        arco-analyzer ~ technical-health-scan
                      </span>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[300px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
                      <div className="mb-1 text-green-400">$ npm run analyze-domain example.com</div>
                      <div className="mb-1 text-slate-400">Initializing technical health scanner...</div>
                      <div className="mb-1 text-blue-400">Fetching domain information...</div>
                      <div className="mb-1 text-slate-400">→ DNS: example.com (93.184.216.34)</div>
                      <div className="mb-1 text-slate-400">→ Server: nginx/1.19.2</div>
                      <div className="mb-1 text-slate-400">→ Technologies: HTML5, CSS3, jQuery 3.5.1</div>

                      <div className="mb-1 text-green-400 mt-2">$ lighthouse --performance-audit</div>
                      <div className="mb-1 text-slate-400">Running performance audit...</div>
                      <div className="mb-1 text-red-400">❌ LCP: 4.2s (mobile) - 2.5s target</div>
                      <div className="mb-1 text-red-400">❌ CLS: 0.28 (mobile) - 0.1 target</div>
                      <div className="mb-1 text-yellow-400">⚠️ FID: 120ms (mobile) - 100ms target</div>

                      <div className="mb-1 text-green-400 mt-2">$ analyze-revenue-impact --domain example.com</div>
                      <div className="mb-1 text-slate-400">Analyzing business impact...</div>
                      <div className="mb-1 text-red-400">❌ Estimated conversion loss: 24.7%</div>
                      <div className="mb-1 text-red-400">❌ Projected annual revenue impact: -$127,500</div>

                      <div className="mb-1 text-blue-400 mt-2">📋 QUICK RECOMMENDATIONS:</div>
                      <div className="mb-1 text-slate-300">1. Optimize LCP element (hero image: 1.7MB)</div>
                      <div className="mb-1 text-slate-300">2. Fix mobile layout shifts in product cards</div>
                      <div className="mb-1 text-slate-300">3. Reduce JavaScript bundle size (currently 2.3MB)</div>
                      <div className="mb-1 text-slate-300">4. Implement CDN for static assets</div>

                      <div className="text-emerald-400 mt-2">📈 EXPECTED IMPROVEMENTS: 68% faster LCP, $73,500 revenue recovery</div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Average Performance Score", value: "57/100", desc: "Sites analyzed" },
                      { label: "Revenue Impact", value: "$92k+", desc: "Average annual loss" },
                      { label: "Analysis Time", value: "2 min", desc: "To first insights" },
                      { label: "Improvement Potential", value: "68%", desc: "Average performance gain" }
                    ].map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                        className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-2xl font-bold text-slate-900 mb-1">
                          {metric.value}
                        </div>
                        <div className="text-sm text-slate-700 font-medium mb-1">
                          {metric.label}
                        </div>
                        <div className="text-xs text-slate-500">
                          {metric.desc}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper function to generate mock results (same as before but updated for new styling)
function generateMockResults(domain: string): DomainAnalysisResults {
  const hash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)

  const perfScore = 35 + (hash % 50)
  const seoScore = 50 + (hash % 40)
  const lcp = 2.5 + (hash % 40) / 10
  const cls = 0.05 + (hash % 30) / 100
  const fid = 70 + (hash % 130)
  const responseTime = 150 + (hash % 300)
  const totalSize = 1.2 + (hash % 72) / 10
  const requestCount = 45 + (hash % 105)
  const revenueLoss = 45000 + (hash * 1000) % 190000

  let perfRating: 'poor' | 'needs-improvement' | 'good' = 'poor'
  if (perfScore >= 70) perfRating = 'good'
  else if (perfScore >= 50) perfRating = 'needs-improvement'

  const stacks = [
    ['React', 'Next.js', 'Node.js', 'AWS', 'GraphQL'],
    ['WordPress', 'PHP', 'MySQL', 'jQuery', 'Apache'],
    ['Vue.js', 'Express', 'MongoDB', 'Nginx', 'DigitalOcean'],
    ['Angular', 'ASP.NET', 'SQL Server', 'Azure', 'Redux'],
    ['Shopify', 'Liquid', 'Ruby', 'Cloudflare', 'Algolia']
  ]

  const selectedStack = stacks[hash % stacks.length]

  const potentialIssues = [
    'Unoptimized images increasing page size',
    'Render-blocking JavaScript affecting load time',
    'Excessive DOM size (3500+ elements)',
    'Multiple layout shifts during page load',
    'Insufficient text compression',
    'Long server response times (TTFB)',
    'Unused CSS affecting performance',
    'Critical resources loading with low priority',
    'Large JavaScript bundle size',
    'Non-optimized font loading',
    'Excessive third-party scripts',
    'Inefficient cache policy'
  ]

  const issueCount = perfScore < 50 ? 6 : perfScore < 70 ? 4 : 3
  const shuffledIssues = [...potentialIssues].sort(() => 0.5 - Math.random())
  const selectedIssues = shuffledIssues.slice(0, issueCount)

  const recommendations = [
    {
      title: 'Optimize images and implement WebP format',
      impact: '+25% page speed',
      difficulty: 'low' as const
    },
    {
      title: 'Implement code splitting for JavaScript bundles',
      impact: '+40% initial load time',
      difficulty: 'medium' as const
    },
    {
      title: 'Configure proper caching headers',
      impact: '+35% repeat visits speed',
      difficulty: 'low' as const
    }
  ]

  const conversionImpact = Math.round((lcp - 2.5) * 7)

  return {
    performance: {
      score: perfScore,
      lcp: lcp,
      cls: cls,
      fid: fid,
      issues: selectedIssues,
      rating: perfRating
    },
    seo: {
      score: seoScore,
      issues: ['Meta descriptions missing on 12 pages', 'Duplicate title tags on 4 pages']
    },
    technical: {
      stack: selectedStack,
      frameworks: selectedStack.slice(0, 2),
      serverType: hash % 2 === 0 ? 'Nginx' : 'Apache',
      responseTime: responseTime,
      requestCount: requestCount,
      totalSize: totalSize,
      compression: hash % 3 !== 0
    },
    business: {
      estimatedLostRevenue: revenueLoss,
      conversionImpact: conversionImpact,
      recommendedFixes: recommendations
    }
  }
}