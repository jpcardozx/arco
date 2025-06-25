'use client'

import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import ProfessionalNavigation from "../components/layout/ProfessionalNavigation"
import { ProfessionalFooter } from "../components/layout/ProfessionalFooter"
import { trackPageView, trackFunnelStep } from "../lib/analytics"

// Import new strategic homepage components
import { SimpleTechnicalHero } from "../components/homepage/SimpleTechnicalHero"
import { TechnicalProof } from "../components/homepage/AuthorityProof"
import { FrameworkBreakdown } from "../components/homepage/FrameworkBreakdown"
import { InternalCaseStudies } from "../components/homepage/InternalCaseStudies"
import { ResourceAccess } from "../components/homepage/ResourceAccess"
import { TechnicalCredibility } from "../components/homepage/TechnicalCredibility"

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
 * ARCO HOMEPAGE - Strategic Inevitability Framework
 * 
 * TROJAN HORSE STRATEGY:
 * 1. Hero: "Internal framework we use" (authority + curiosity)
 * 2. Authority: Specific proof points and metrics
 * 3. Framework: Deep dive into R.E.V.E.N.U.E methodology
 * 4. Case Studies: Internal applications (not client work)
 * 5. Resources: Free access to tools/frameworks
 * 6. Technical: Demonstrate actual capabilities
 * 
 * PSYCHOLOGY: Position as thought leaders sharing internal tools
 * rather than service providers trying to sell
 */

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    trackPageView('homepage_strategic')

    trackFunnelStep('trojan_horse_entry', 'inevitability_funnel', {
      page: 'home',
      strategy: 'trojan_horse',
      user_tier: user?.tier || 'anonymous',
      timestamp: Date.now()
    })
  }, [user, isAuthenticated])

  return (
    <>
      <ProfessionalNavigation />

      {/* Technical Homepage Flow */}
      <SimpleTechnicalHero />
      <TechnicalProof />
      <FrameworkBreakdown />
      <InternalCaseStudies />
      <ResourceAccess />
      <TechnicalCredibility />

      <ProfessionalFooter />

      {/* Non-critical components */}
      <SmartEngagementTrigger />
      <WebVitalsMonitor />
    </>
  )
}
