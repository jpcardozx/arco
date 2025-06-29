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
import { OperationsAutoScroll } from '@/components/OperationsAutoScroll'

/**
 * FOCUSED HERO SECTION - Technical Demonstration with Real Value
 * 
 * Purpose:
 * - Establish immediate technical credibility through real-time analysis
 * - Provide interactive domain analysis with actionable insights
 * - Demonstrate expertise through functional tools, not just claims
 * - Create engagement through a valuable interactive experience
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

export function FocusedHeroSection() {
  const [domainAnalysis, setDomainAnalysis] = useState<DomainAnalysisState>({
    isAnalyzing: false,
    domain: '',
    results: null,
    error: null,
    progress: 0
  })

  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const domainInputRef = useRef<HTMLInputElement>(null)
  const isInView = useInView(containerRef, { once: true })

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

  // Reset focus when visible
  useEffect(() => {
    if (isInView && domainInputRef.current) {
      setTimeout(() => {
        domainInputRef.current?.focus()
      }, 800)
    }
  }, [isInView])

  // Track visibility
  useEffect(() => {
    if (isInView) {
      trackFunnelStep('hero_view', 'technical_funnel', {
        section: 'focused_hero',
        version: 'domain_analyzer',
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
        error: 'Por favor, insira um domínio válido (ex: exemplo.com)'
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

      // In a real implementation, this would be an API call to:
      // const response = await fetch('/api/analyze-domain', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ domain })
      // })

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))

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
        error: 'A análise falhou. Por favor, tente novamente.'
      })

      // Track analysis error
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

    // Focus the input
    domainInputRef.current?.focus()

    // Track reset action
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

    // In a real implementation, this would redirect to a lead capture form
    // or open a modal dialog
    alert('Em uma implementação real, isso capturaria as informações do lead e agendaria uma análise completa.')
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center bg-[#10141a] overflow-hidden pt-32 md:pt-40"
      style={{
        background: 'linear-gradient(120deg, #10141a 0%, #181e26 100%)',
      }}
      data-section="hero"
    >
      {/* Sutil noise overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/bg-noise.png')] bg-repeat" />
      </div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">

          {/* Left Column - Value Proposition & Domain Analyzer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-white space-y-8"
          >
            {/* Technical Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-500/30 rounded-full px-6 py-3 shadow-2xl"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-100 tracking-wide uppercase">
                Automated Growth Engine · Founder-Led · Real Revenue Results
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white"
            >
              <span className="block">Your business loses USD X monthly</span>
              <span className="block text-slate-300 mt-2 font-normal">
                Due to checkout friction, slow loading, and analytics conflicts. ARCO stops this bleeding in 72 hours.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed font-normal mt-2"
            >
              Automated, founder-led technical due diligence for teams that want clarity, not clutter. See exactly what’s holding you back—and how to fix it, fast.
            </motion.p>

            {/* Domain Analysis Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-slate-900/80 border border-emerald-700 rounded-2xl p-6 hover:bg-slate-900/90 transition-all duration-300 shadow-xl"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                Free Business Revenue Recovery Audit
                <span className="ml-2 text-xs bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700 font-semibold">
                  No email required
                </span>
              </h3>

              <form onSubmit={handleAnalyzeDomain} className="space-y-4">
                <div>
                  <div className="relative">
                    <input
                      ref={domainInputRef}
                      type="text"
                      value={domainAnalysis.domain}
                      onChange={handleDomainChange}
                      placeholder={DOMAIN_PATTERNS[placeholderIndex]}
                      disabled={domainAnalysis.isAnalyzing}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Search className="w-5 h-5 text-slate-500" />
                    </div>
                  </div>
                  {domainAnalysis.error && (
                    <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
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
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      {domainAnalysis.isAnalyzing ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Analisando... ({Math.round(domainAnalysis.progress)}%)
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          Analisar Saúde Técnica
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-all duration-300"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Analisar Outro Domínio
                    </button>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Prova Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-gradient-to-r from-emerald-900/80 to-blue-900/70 border border-emerald-700 rounded-xl p-5 mt-6 flex items-center gap-4 shadow-lg"
            >
              <img src="/logo-ipe-imoveis.png" alt="Ipê Imóveis" className="w-14 h-14 rounded-full border-2 border-emerald-400 shadow" />
              <div>
                <p className="text-slate-100 text-base mb-1 font-semibold">“ARCO’s automated audit found a $4,000/mo leak in our checkout. Fixed in 72h.”</p>
                <span className="text-emerald-300 text-xs font-bold uppercase tracking-wide">Verified Client Result · Ipê Imóveis</span>
              </div>
            </motion.div>

            {/* Key Guarantees */}
            {!domainAnalysis.results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
              >
                {/*
                  "Automated, code-level technical scan—no setup, no sales pitch",
                  "Quantified revenue impact and prioritized fixes, not generic advice",
                  "Founder-reviewed recommendations, tailored to your stack and business",
                  "Full transparency: see exactly what’s costing you and how to fix it—fast"
                */}
                {[
                  "Automated, code-level technical scan—no setup, no sales pitch",
                  "Quantified revenue impact and prioritized fixes, not generic advice",
                  "Founder-reviewed recommendations, tailored to your stack and business",
                  "Full transparency: see exactly what’s costing you and how to fix it—fast"
                ].map((guarantee, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-base font-medium">{guarantee}</span>
                  </div>
                ))}
              </motion.div>
            )}
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
                className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Results Header */}
                <div className="bg-slate-900 px-6 py-4 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Server className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-bold text-white">
                        {domainAnalysis.domain}
                      </h3>
                      <span className="px-2 py-0.5 bg-slate-700 rounded-full text-xs text-slate-300">
                        Análise Gratuita
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-400">
                        Analisado em {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Results Content */}
                <div className="p-6 space-y-6">
                  {/* Performance Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-white mb-1">
                        {domainAnalysis.results.performance.score}/100
                      </div>
                      <div className="text-sm text-slate-400">
                        Performance Score
                      </div>
                    </div>
                    <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-white mb-1">
                        {domainAnalysis.results.performance.lcp.toFixed(1)}s
                      </div>
                      <div className="text-sm text-slate-400">
                        Largest Contentful Paint
                      </div>
                    </div>
                    <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-white mb-1">
                        {domainAnalysis.results.technical.responseTime}ms
                      </div>
                      <div className="text-sm text-slate-400">
                        Server Response Time
                      </div>
                    </div>
                  </div>

                  {/* Business Impact */}
                  <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-800/50 rounded-xl p-5">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-red-400" />
                      Impacto Estimado na Receita
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-3xl font-bold text-red-400 mb-1">
                          ${domainAnalysis.results.business.estimatedLostRevenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-300">
                          Perda Anual Estimada
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-red-400 mb-1">
                          {domainAnalysis.results.business.conversionImpact}%
                        </div>
                        <div className="text-sm text-slate-300">
                          Impacto na Taxa de Conversão
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Stack */}
                  <div className="bg-slate-700/30 rounded-xl p-5">
                    <h4 className="text-md font-semibold text-white mb-3">
                      Tecnologia Detectada
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {domainAnalysis.results.technical.stack.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Issues & Recommendations */}
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">
                      Problemas Críticos ({domainAnalysis.results.performance.issues.length})
                    </h4>
                    <div className="space-y-2">
                      {domainAnalysis.results.performance.issues.slice(0, 3).map((issue, index) => (
                        <div key={index} className="flex items-start gap-2 bg-slate-800 p-3 rounded-lg border border-slate-700">
                          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{issue}</span>
                        </div>
                      ))}

                      {domainAnalysis.results.performance.issues.length > 3 && (
                        <div className="text-sm text-slate-400 text-center pt-1">
                          + {domainAnalysis.results.performance.issues.length - 3} outros problemas no relatório completo
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-800/50 rounded-xl p-5">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Obtenha uma Avaliação Técnica Completa
                    </h4>
                    <p className="text-slate-300 mb-4 text-sm">
                      Esta análise gratuita revela apenas os problemas superficiais. Nossa avaliação completa inclui:
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {[
                        "Análise detalhada nível código",
                        "Plano completo de otimização de desempenho",
                        "Roteiro de implementação com prioridades",
                        "Cálculo de ROI por melhoria"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleGetFullAnalysis}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                    >
                      <Database className="w-5 h-5" />
                      Quero meu diagnóstico completo
                      <ArrowRight className="w-5 h-5 ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Technical Demonstration (shown when no analysis is running)
              <>
                {/* Technical Demo Terminal */}
                <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                  {/* Terminal Header */}
                  <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <span className="ml-2 text-slate-400 text-xs font-mono">
                      arco-analyzer ~ domain-assessment
                    </span>
                  </div>

                  {/* Terminal Content */}
                  <div className="p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[220px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
                    <div className="mb-1 text-green-400">$ npm run analyze-domain example.com</div>
                    <div className="mb-1 text-slate-400">Inicializando o analisador de domínio...</div>
                    <div className="mb-1 text-blue-400">Buscando informações do domínio...</div>
                    <div className="mb-1 text-slate-400">→ DNS: example.com (93.184.216.34)</div>
                    <div className="mb-1 text-slate-400">→ Servidor: nginx/1.19.2</div>
                    <div className="mb-1 text-slate-400">→ Tecnologias: HTML5, CSS3, jQuery 3.5.1</div>

                    <div className="mb-1 text-green-400 mt-2">$ lighthouse --performance-only example.com</div>
                    <div className="mb-1 text-slate-400">Executando auditoria de desempenho...</div>
                    <div className="mb-1 text-red-400">❌ LCP: 4.2s (mobile) - 2.5s limite</div>
                    <div className="mb-1 text-red-400">❌ CLS: 0.28 (mobile) - 0.1 limite</div>
                    <div className="mb-1 text-yellow-400">⚠️ FID: 120ms (mobile) - 100ms limite</div>

                    <div className="mb-1 text-green-400 mt-2">$ analyze-revenue-impact --domain example.com</div>
                    <div className="mb-1 text-slate-400">Analisando impacto nos negócios...</div>
                    <div className="mb-1 text-red-400">❌ Perda de conversão estimada: 24.7%</div>
                    <div className="mb-1 text-red-400">❌ Impacto na receita anual projetada: -$127,500</div>

                    <div className="mb-1 text-blue-400 mt-2">📋 RECOMENDAÇÕES RÁPIDAS:</div>
                    <div className="mb-1 text-slate-300">1. Otimize o elemento LCP (imagem do herói: 1.7MB)</div>
                    <div className="mb-1 text-slate-300">2. Corrija as mudanças de layout nos cartões de produtos mobile</div>
                    <div className="mb-1 text-slate-300">3. Reduza o tamanho do pacote JavaScript (atualmente 2.3MB)</div>
                    <div className="mb-1 text-slate-300">4. Implemente CDN para ativos estáticos</div>

                    <div className="text-emerald-400 mt-2">📈 MELHORIAS ESPERADAS: 68% mais rápido LCP, recuperação de receita de $73,500</div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Pontuação Média de Desempenho", value: "57/100", desc: "Sites analisados" },
                    { label: "Impacto na Receita", value: "$92k+", desc: "Perda anual média" },
                    { label: "Primeira Análise", value: "2 min", desc: "Tempo até os primeiros insights" },
                    { label: "Potencial de Melhoria", value: "68%", desc: "Ganho médio de desempenho" }
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-5 hover:bg-slate-800 transition-all duration-300"
                    >
                      <div className="text-2xl font-bold text-white mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-slate-400 font-medium mb-1">
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

        {/* --- Operations Tab/Slider --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-10"
        >
          <OperationsAutoScroll />
        </motion.div>
      </div>
    </section>
  )
}

// Helper function to generate mock results
function generateMockResults(domain: string): DomainAnalysisResults {
  // Create deterministic but different results based on domain string
  const hash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Generate a score between 35 and 85
  const perfScore = 35 + (hash % 50)
  const seoScore = 50 + (hash % 40)

  // Generate LCP between 2.5 and 6.5 seconds
  const lcp = 2.5 + (hash % 40) / 10

  // Generate CLS between 0.05 and 0.35
  const cls = 0.05 + (hash % 30) / 100

  // Generate FID between 70 and 200ms
  const fid = 70 + (hash % 130)

  // Generate response time between 150 and 450ms
  const responseTime = 150 + (hash % 300)

  // Generate size between 1.2 and 8.4 MB
  const totalSize = 1.2 + (hash % 72) / 10

  // Generate request count between 45 and 150
  const requestCount = 45 + (hash % 105)

  // Generate estimated revenue loss between $45k and $235k
  const revenueLoss = 45000 + (hash * 1000) % 190000

  // Get performance rating
  let perfRating: 'poor' | 'needs-improvement' | 'good' = 'poor'
  if (perfScore >= 70) perfRating = 'good'
  else if (perfScore >= 50) perfRating = 'needs-improvement'

  // Create technical stack based on domain
  const stacks = [
    ['React', 'Next.js', 'Node.js', 'AWS', 'GraphQL'],
    ['WordPress', 'PHP', 'MySQL', 'jQuery', 'Apache'],
    ['Vue.js', 'Express', 'MongoDB', 'Nginx', 'DigitalOcean'],
    ['Angular', 'ASP.NET', 'SQL Server', 'Azure', 'Redux'],
    ['Shopify', 'Liquid', 'Ruby', 'Cloudflare', 'Algolia']
  ]

  const selectedStack = stacks[hash % stacks.length]

  // Issues based on performance
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

  // Select 3-6 issues based on performance score
  const issueCount = perfScore < 50 ? 6 : perfScore < 70 ? 4 : 3
  const shuffledIssues = [...potentialIssues].sort(() => 0.5 - Math.random())
  const selectedIssues = shuffledIssues.slice(0, issueCount)

  // Generate mock recommendations
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
    },
    {
      title: 'Optimize CSS delivery and reduce unused styles',
      impact: '+15% render time',
      difficulty: 'medium' as const
    },
    {
      title: 'Implement server-side rendering for critical content',
      impact: '+45% perceived performance',
      difficulty: 'high' as const
    }
  ]

  // Calculate conversion impact based on LCP
  // Research shows each 1s delay reduces conversion by ~7%
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
      compression: hash % 3 !== 0 // 2/3 chance of having compression
    },
    business: {
      estimatedLostRevenue: revenueLoss,
      conversionImpact: conversionImpact,
      recommendedFixes: recommendations.slice(0, 3)
    }
  }
}
