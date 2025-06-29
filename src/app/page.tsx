'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import PersonalNavigation from "../components/layout/PersonalNavigation"
import { ProfessionalFooter } from "../components/layout/ProfessionalFooter"
import { trackPageView, trackFunnelStep } from "../lib/analytics"

// Import homepage hero components
import { PersonalBrandHero } from "@/components/partners/PersonalBrandHero"

// Lazy load non-critical components
import dynamic from 'next/dynamic'

const SmartEngagementTrigger = dynamic(() =>
  import("../components/engagement/SmartEngagementTrigger").then(mod => ({ default: mod.SmartEngagementTrigger })), {
  ssr: false
})

const WebVitalsMonitor = dynamic(() =>
  import("../components/performance/WebVitalsMonitor").then(mod => ({ default: mod.WebVitalsMonitor })), {
  ssr: false
})

/**
 * ANÁLISE CRÍTICA (2025-06-27)
 *
 * Propósito: Homepage principal, orquestração inteligente, tracking, fallback de erro, lazy loading de componentes não críticos.
 * Pontos Fortes: Estrutura robusta, tratamento de erro, integração de analytics, arquitetura adaptativa.
 * Pontos Fracos: Não explora seções detalhadas (hero, provas sociais, etc) como outras versões; pode se beneficiar de componentes de outras páginas.
 * Recomendações: Manter como base principal. Revisar componentes de outras páginas para enriquecer a experiência e modularidade.
 */

/**
 * ARCO HOMEPAGE - Refactored Strategic Value Communication
 * 
 * NEW PROGRESSIVE EXPERIENCE STRATEGY:
 * 1. FocusedHero: Real-time technical analysis demonstration
 * 2. StrategicValue: Clear quantified value presentation
 * 3. DomainIntelligence: Interactive domain analysis tools
 * 4. ROICalculator: Tangible ROI calculation
 * 
 * ORCHESTRATION LAYER:
 * - Intelligent progression based on user interests
 * - Personalized returning user experience
 * - Adaptive content disclosure
 * - Engagement-based recommendations
 */

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    trackPageView('homepage_strategic_refactored')

    trackFunnelStep('value_journey_entry', 'strategic_value_funnel', {
      page: 'home',
      strategy: 'progressive_value',
      user_tier: user?.tier || 'anonymous',
      timestamp: Date.now()
    })
  }, [user, isAuthenticated])

  // Pass user data to initialize the orchestrator with context
  const initialUserProfile = user ? {
    industry: 'unknown', // User type doesn't have industry property
    companySize: 'unknown', // User type doesn't have companySize property
    technicalFocus: [], // User type doesn't have interests property
    conversionStage: determineConversionStage(user)
  } : undefined

  // Error boundary for graceful component failure handling
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Handle global errors
    const handleError = (event: any) => {
      // Extract meaningful error information
      const errorInfo = {
        message: event.message || event.reason?.message || 'Unknown error',
        filename: event.filename || 'Unknown file',
        lineno: event.lineno || 'Unknown line',
        colno: event.colno || 'Unknown column',
        stack: event.error?.stack || event.reason?.stack || 'No stack trace',
        timestamp: new Date().toISOString()
      }

      console.error('Global error caught:', errorInfo)

      // Only set error state for critical errors, not analytics failures
      if (!errorInfo.message.includes('analytics') && !errorInfo.message.includes('fetch')) {
        setHasError(true)
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Extract meaningful error information from promise rejections
      const errorInfo = {
        reason: event.reason?.message || event.reason || 'Unknown promise rejection',
        stack: event.reason?.stack || 'No stack trace',
        timestamp: new Date().toISOString()
      }

      console.error('Unhandled promise rejection:', errorInfo)

      // Prevent analytics failures from crashing the app
      if (typeof errorInfo.reason === 'string' &&
        (errorInfo.reason.includes('analytics') ||
          errorInfo.reason.includes('fetch') ||
          errorInfo.reason.includes('/api/'))) {
        // Prevent default behavior for analytics errors
        event.preventDefault()
        return
      }

      // Only set error state for critical errors
      setHasError(true)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  // Fallback UI in case of errors
  if (hasError) {
    return (
      <>
        <PersonalNavigation />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
          <div className="max-w-2xl mx-auto text-center bg-white p-8 rounded-xl shadow-lg border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">We're experiencing technical difficulties</h2>
            <p className="text-lg text-slate-600 mb-6">
              Our team has been notified and is working on resolving this issue. Please try refreshing the page or come back later.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
              >
                Refresh Page
              </button>
              <a
                href="/contact"
                className="px-6 py-3 bg-white text-slate-800 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
        <ProfessionalFooter />
      </>
    )
  }

  return (
    <>
      <PersonalNavigation />

      {/* Hero avançado */}
      <PersonalBrandHero />

      {/* Seção de valor estratégico (placeholder) */}
      <StrategicValueSection />

      {/* Seção de inteligência de domínio (placeholder) */}
      <DomainIntelligenceSection />

      {/* Seção de ROI (placeholder) */}
      <ROICalculatorSection />

      {/* Provas sociais / Depoimentos (placeholder) */}
      <SocialProofSection />

      {/* Logos de clientes (placeholder) */}
      {/* <ClientLogosSection /> */}

      {/* Cases de sucesso (placeholder) */}
      {/* <CaseStudiesSection /> */}

      {/* CTA forte (placeholder) */}
      <StrongCTASection />

      <ProfessionalFooter />

      {/* Componentes auxiliares */}
      <SmartEngagementTrigger />
      <WebVitalsMonitor />
    </>
  )
}

// Placeholders para seções estratégicas
function StrategicValueSection() {
  return <section className="py-24 text-center text-slate-700 bg-white border-b">Seção de Valor Estratégico (placeholder)</section>;
}
function DomainIntelligenceSection() {
  return <section className="py-24 text-center text-slate-700 bg-slate-50 border-b">Seção de Inteligência de Domínio (placeholder)</section>;
}
function ROICalculatorSection() {
  return <section className="py-24 text-center text-slate-700 bg-white border-b">Seção de ROI (placeholder)</section>;
}
function SocialProofSection() {
  return <section className="py-24 text-center text-slate-700 bg-slate-50 border-b">Provas Sociais / Depoimentos (placeholder)</section>;
}
function StrongCTASection() {
  return <section className="py-24 text-center text-white bg-gradient-to-r from-emerald-600 to-teal-600">CTA Forte (placeholder)</section>;
}

// Helper function to determine conversion stage from user data
function determineConversionStage(user: any) {
  if (!user) return 'awareness'

  if (user.subscription?.tier === 'enterprise' || user.subscription?.tier === 'premium') {
    return 'converted'
  }

  if (user.demo_requested || user.consultation_scheduled) {
    return 'decision'
  }

  if (user.tool_usage_count > 2 || user.login_count > 3) {
    return 'consideration'
  }

  return 'awareness'
}
