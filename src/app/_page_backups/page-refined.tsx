'use client'

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Import optimized components
import NavBarEnhanced from "../../components/NavBarEnhanced";
import HeroARCOEnhanced from "../../components/HeroARCOEnhanced";
import ProcessEnhanced from "../../components/ProcessEnhanced";
import CaseStudiesEnhanced from "../../components/CaseStudiesEnhanced";
import EnhancedCTA from "../../components/EnhancedCTA";
import FooterARCORevised from "../../components/FooterARCORevised";
import HomepageLayout from "../../components/HomepageLayout";

// Dynamically import the design compare component to improve initial load time
const DesignCompareRefined = dynamic(() => import("../../components/DesignCompareRefined"), {
    ssr: false,
    loading: () => null
});

// Import analytics
import { trackPageView, trackComponentPerformance, trackFunnelStep, trackEvent } from "../../lib/analytics";

// Custom hook for optimized animations
import { useOptimizedAnimation } from "../../hooks/useOptimizedAnimation";

export default function Home() {
    // Track page view for analytics
    useEffect(() => {
        // Track page view with additional data
        trackPageView('homepage-refined', {
            version: 'refined',
            designSystem: 'arco-design-v3'
        });

        // Track page load performance
        const pageLoadTime = performance.now();
        trackComponentPerformance('full-page', pageLoadTime, {
            page: 'homepage-refined'
        });
    }, []);

    // Get optimized animations based on device capabilities
    const { shouldAnimate, animationIntensity } = useOptimizedAnimation();

    // Load state with performance tracking
    const [isLoaded, setIsLoaded] = useState(false);
    const componentLoadStart = useRef(performance.now());

    useEffect(() => {
        // Add a slight delay to ensure smooth animations
        const timer = setTimeout(() => {
            setIsLoaded(true);

            // Track time to interactive
            const loadTime = performance.now() - componentLoadStart.current;
            trackComponentPerformance('time-to-interactive', loadTime, {
                page: 'homepage-refined'
            });
        }, 100);
        return () => clearTimeout(timer);
    }, []); return (
        <HomepageLayout
            metadata={{
                title: 'ARCO Performance | Versão Refinada',
                description: 'Versão otimizada com nova estrutura de navegação e métricas aprimoradas para maximizar impacto de conversão.',
                openGraph: {
                    title: 'ARCO Performance | Refined Version',
                    images: ['/hero-case-mosaic-2.png']
                }
            }}
        >
            <NavBarEnhanced />

            {/* Page content wrapper with preload animation */}
            <main
                className={`overflow-x-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onScroll={() => {
                    // Track engagement when user scrolls
                    trackEvent('page_scroll', {
                        page: 'homepage-refined'
                    });
                }}
            >
                {/* Hero section with enhanced impact metrics */}
                <section id="hero" onMouseEnter={() => trackFunnelStep('homepage', 'hero_view', 1)}>
                    <HeroARCOEnhanced />
                </section>

                {/* Process section with interactive framework explainer */}
                <section id="process" onMouseEnter={() => trackFunnelStep('homepage', 'process_view', 2)}>
                    <ProcessEnhanced />
                </section>

                {/* Case studies with enhanced result metrics */}
                <section id="case-studies" onMouseEnter={() => trackFunnelStep('homepage', 'case_studies_view', 3)}>
                    <CaseStudiesEnhanced />
                </section>

                {/* Call to action with clear value proposition */}
                <section id="cta" onMouseEnter={() => trackFunnelStep('homepage', 'cta_view', 4)}>
                    <EnhancedCTA />
                </section>

                {/* Footer with improved navigation and contact options */}
                <FooterARCORevised />
            </main>

            {/* Design comparison tool with metrics dashboard */}
            <DesignCompareRefined />
        </HomepageLayout>
    );
}
