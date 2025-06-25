'use client'

import { useEffect } from 'react'
import ProfessionalNavigation from "../components/layout/ProfessionalNavigation";
import { UnifiedHeroSection } from "../components/sections/UnifiedHeroSection";
import { UnifiedValueProposition } from "../components/sections/UnifiedValueProposition";
import { OptimizedClientStories } from "../components/sections/OptimizedClientStories";
import { ProfessionalFooter } from "../components/layout/ProfessionalFooter";
import { trackPageView, trackFunnelStep } from "../lib/analytics";

// Lazy load non-critical components with optimized loading
import dynamic from 'next/dynamic'

const ProfessionalContact = dynamic(() =>
    import("../components/sections/ProfessionalContact").then(mod => ({ default: mod.ProfessionalContact })), {
    loading: () => <div className="h-96 bg-slate-900 animate-pulse" />,
    ssr: true // Contact form should be indexed
})

const SmartEngagementTrigger = dynamic(() =>
    import("../components/engagement/SmartEngagementTrigger").then(mod => ({ default: mod.SmartEngagementTrigger })), {
    ssr: false
});

// Extend window interface for simplified tracking
declare global {
    interface Window {
        scroll50Tracked?: boolean
        scroll90Tracked?: boolean
        exitIntentTracked?: boolean
    }
}

/**
 * OPTIMIZED HOMEPAGE
 * 
 * Estrutura simplificada e otimizada:
 * 1. Hero unificado (conversão focada)
 * 2. Value proposition consolidada  
 * 3. Case studies otimizados
 * 4. Contact section
 * 5. Footer profissional
 * 
 * Performance targets:
 * - LCP < 1.8s
 * - CLS < 0.05  
 * - FID < 45ms
 */

export default function OptimizedHomePage() {
    useEffect(() => {
        // Essential analytics only
        trackPageView('homepage_optimized')
        trackFunnelStep('homepage_load', 'conversion_funnel', {
            page: 'home_unified',
            timestamp: Date.now()
        })

        // Simplified engagement tracking
        const startTime = Date.now()
        let maxScroll = 0

        const handleScroll = () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent

                // Only track critical scroll milestones
                if (scrollPercent >= 50 && !window.scroll50Tracked) {
                    window.scroll50Tracked = true
                    trackFunnelStep('scroll_50_percent', 'engagement_funnel', { scroll_depth: 50 })
                }
                if (scrollPercent >= 90 && !window.scroll90Tracked) {
                    window.scroll90Tracked = true
                    trackFunnelStep('scroll_90_percent', 'engagement_funnel', { scroll_depth: 90 })
                }
            }
        }

        // Exit intent detection (simplified)
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 50 && !window.exitIntentTracked) {
                window.exitIntentTracked = true
                trackFunnelStep('exit_intent', 'retention_funnel', {
                    time_spent: Date.now() - startTime,
                    max_scroll: maxScroll
                })
            }
        }

        // Essential tracking only
        window.addEventListener('scroll', handleScroll, { passive: true })
        document.addEventListener('mouseleave', handleMouseLeave)

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <>
            <ProfessionalNavigation />
            <UnifiedHeroSection />
            <UnifiedValueProposition />
            <OptimizedClientStories />
            <ProfessionalContact />
            <ProfessionalFooter />

            {/* Smart Engagement - Non-blocking */}
            <SmartEngagementTrigger />
        </>
    );
}
