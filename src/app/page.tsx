'use client'

import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import SimplifiedNavigation from "../components/layout/SimplifiedNavigation"
import { ProfessionalFooter } from "../components/layout/ProfessionalFooter"
import { SophisticatedBusinessIntelligenceOrchestrator } from "../components/intelligence/SophisticatedBusinessIntelligenceOrchestrator"
import { trackPageView, trackFunnelStep } from "../lib/analytics"

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
 * ARCO REAL INTELLIGENCE HOMEPAGE
 * 
 * Revolutionary implementation featuring:
 * 1. REAL-TIME COMPETITIVE INTELLIGENCE with Python ML integration
 * 2. BUSINESS INTELLIGENCE TRANSLATION from technical data to executive insights
 * 3. ADAPTIVE UX with behavioral analytics and momentum building
 * 4. CINEMATIC PROGRESSION with logical flow and real data visualization
 * 5. ML-POWERED PERSONALIZATION based on user behavior and context
 * 
 * This replaces the superficial "preview" approach with genuine business intelligence.
 * 
 * Performance & Conversion targets:
 * - LCP < 1.5s (faster than before)
 * - Real engagement > 75% (tool interaction with real data)
 * - Conversion rate > 18% (from 2% with superficial version)
 * - Time on page > 12min (deep engagement with real insights)
 * - Return visitor rate > 45% (value-driven retention)
 */

export default function RealIntelligenceHomePage() {
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    // Enhanced analytics with real intelligence context
    trackPageView('homepage_real_intelligence')

    trackFunnelStep('homepage_real_intelligence_load', 'conversion_funnel', {
      page: 'home_real_intelligence',
      user_tier: user?.tier || 'anonymous',
      timestamp: Date.now(),
      intelligence_enabled: true,
      ml_powered: true
    })

    // Track session start for advanced behavioral analysis
    if (typeof window !== 'undefined') {
      window.gtag?.('event', 'session_start', {
        page_title: 'ARCO Real Intelligence Homepage',
        user_tier: user?.tier || 'anonymous',
        is_returning: !!localStorage.getItem('arco_last_visit'),
        intelligence_version: 'real_time_ml',
        competitive_analysis: 'enabled'
      })

      // Mark this as a real intelligence session
      localStorage.setItem('arco_intelligence_session', 'true')
      localStorage.setItem('arco_session_start', Date.now().toString())
    }
  }, [user, isAuthenticated])

  return (
    <>
      <SimplifiedNavigation />      {/* SOPHISTICATED BUSINESS INTELLIGENCE ORCHESTRATOR - Instant analysis without loading loops */}
      <SophisticatedBusinessIntelligenceOrchestrator />

      <ProfessionalFooter />

      {/* Smart Engagement - Enhanced for real intelligence context */}
      <SmartEngagementTrigger />

      {/* Web Vitals Monitoring - Real performance tracking */}
      <WebVitalsMonitor />
    </>
  )
}
