'use client'

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Import core components
import NavBarEnhanced from "../../components/NavBarEnhanced";
import HomepageLayout from "../../components/HomepageLayout";
import FooterARCORevised from "../../components/FooterARCORevised";

// Import analytics
import { trackPageView, trackComponentPerformance, trackFunnelStep, trackEvent } from "../../lib/analytics";

// Custom hook for optimized animations
import { useOptimizedAnimation } from "../../hooks/useOptimizedAnimation";

// Dynamically import components to improve initial load time
// Performance-focused components
const HeroARCOEnhanced = dynamic(() => import("../../components/HeroARCOEnhanced"), {
    loading: () => <div className="min-h-[95vh] bg-neutral-900 animate-pulse" />
});

const ProcessEnhanced = dynamic(() => import("../../components/ProcessEnhanced"), {
    loading: () => <div className="min-h-[60vh] bg-white animate-pulse" id="process" />
});

const CaseStudiesEnhanced = dynamic(() => import("../../components/CaseStudiesEnhanced"), {
    loading: () => <div className="min-h-[80vh] bg-neutral-950 animate-pulse" id="case-studies" />
});

const EnhancedCTA = dynamic(() => import("../../components/EnhancedCTA"), {
    loading: () => <div className="min-h-[60vh] bg-gradient-to-br from-neutral-900 via-blue-900 to-indigo-900 animate-pulse" />
});

// Market positioning components
const MarketHero = dynamic(() => import("../../components/enhanced/MarketHero"), {
    loading: () => <div className="min-h-[90vh] bg-neutral-900 animate-pulse" />
});

const ValuePropositioning = dynamic(() => import("../../components/enhanced/ValuePropositioning"), {
    loading: () => <div className="min-h-[60vh] bg-white animate-pulse" />
});

const PerceptionGapAnalyzer = dynamic(() => import("../../components/enhanced/PerceptionGapAnalyzer"), {
    loading: () => <div className="min-h-[70vh] bg-neutral-950 animate-pulse" />
});

// UI elements
const DesignCompareRefined = dynamic(() => import("../../components/DesignCompareRefined"), {
    ssr: false,
    loading: () => null
});

// Integration controller component to switch between views
const IntegrationController = dynamic(() => import("../../components/IntegrationController"), {
    ssr: false,
    loading: () => null
});

export default function IntegratedHome() {
    // Track page view for analytics
    useEffect(() => {
        // Track page view with additional data
        trackPageView('homepage-integrated', {
            version: 'integrated',
            designSystem: 'arco-design-v4'
        });

        // Track page load performance
        const pageLoadTime = performance.now();
        trackComponentPerformance('full-page', pageLoadTime, {
            page: 'homepage-integrated'
        });
    }, []);

    // View state management
    const [activeView, setActiveView] = useState('market-focused'); // 'market-focused' or 'performance-focused'

    // Get optimized animations based on device capabilities
    const { shouldAnimate, animationIntensity } = useOptimizedAnimation();

    // Load state with performance tracking
    const [isLoaded, setIsLoaded] = useState(false);
    const componentLoadStart = useRef(performance.now());

    useEffect(() => {
        // Track which view the user selected
        if (isLoaded) {
            trackEvent('view_changed', { view: activeView });
        }
    }, [activeView, isLoaded]);

    useEffect(() => {
        // Add a slight delay to ensure smooth animations
        const timer = setTimeout(() => {
            setIsLoaded(true);

            // Track time to interactive
            const loadTime = performance.now() - componentLoadStart.current;
            trackComponentPerformance('time-to-interactive', loadTime, {
                page: 'homepage-integrated'
            });
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <HomepageLayout
            metadata={{
                title: 'ARCO Performance | Transformação Estratégica de Performance',
                description: 'Versão integrada que combina posicionamento de mercado premium e otimização técnica para maximizar resultados financeiros.',
                openGraph: {
                    title: 'ARCO Performance | Posicionamento Premium + Performance Técnica',
                    images: ['/hero-case-mosaic-3.png']
                }
            }}
        >
            <NavBarEnhanced />

            {/* View switcher - only visible to admin or when testing */}
            <IntegrationController
                activeView={activeView}
                onChange={setActiveView}
            />

            {/* Page content with intelligent view selection */}
            <main
                className={`overflow-x-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onScroll={() => {
                    // Track engagement when user scrolls
                    trackEvent('page_scroll', {
                        page: 'homepage-integrated',
                        view: activeView
                    });
                }}
            >
                {activeView === 'market-focused' ? (
                    // Market positioning view - focuses on business value and positioning
                    <>
                        <section id="hero" onMouseEnter={() => trackFunnelStep('homepage', 'market_hero_view', 1)}>
                            <MarketHero />
                        </section>

                        <section id="value-proposition" onMouseEnter={() => trackFunnelStep('homepage', 'value_prop_view', 2)}>
                            <ValuePropositioning />
                        </section>

                        <section id="gap-analyzer" onMouseEnter={() => trackFunnelStep('homepage', 'perception_gap_view', 3)}>
                            <PerceptionGapAnalyzer />
                        </section>

                        <section id="case-studies" onMouseEnter={() => trackFunnelStep('homepage', 'case_studies_view', 4)}>
                            <CaseStudiesEnhanced />
                        </section>

                        <section id="cta" onMouseEnter={() => trackFunnelStep('homepage', 'cta_view', 5)}>
                            <EnhancedCTA />
                        </section>
                    </>
                ) : (
                    // Performance optimization view - focuses on technical performance and ROI
                    <>
                        <section id="hero" onMouseEnter={() => trackFunnelStep('homepage', 'hero_view', 1)}>
                            <HeroARCOEnhanced />
                        </section>

                        <section id="process" onMouseEnter={() => trackFunnelStep('homepage', 'process_view', 2)}>
                            <ProcessEnhanced />
                        </section>

                        <section id="case-studies" onMouseEnter={() => trackFunnelStep('homepage', 'case_studies_view', 3)}>
                            <CaseStudiesEnhanced />
                        </section>

                        <section id="cta" onMouseEnter={() => trackFunnelStep('homepage', 'cta_view', 4)}>
                            <EnhancedCTA />
                        </section>
                    </>
                )}

                {/* Footer is shared between both views */}
                <FooterARCORevised />
            </main>

            {/* Design comparison tool with metrics dashboard */}
            <DesignCompareRefined />
        </HomepageLayout>
    );
}
