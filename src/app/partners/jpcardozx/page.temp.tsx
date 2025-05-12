'use client'

import React, { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/../components/NavBar'
import FooterARCO from '@/../components/FooterARCO'

// Import scroll-to-top component
const ScrollToTop = dynamic(() => import('@/../components/portfolio/ScrollToTop'), {
    ssr: false
})

// Strategic components for premium portfolio
const EnhancedPortfolioHero = dynamic(() => import('@/../components/portfolio/EnhancedPortfolioHero'), {
    loading: () => <div className="min-h-[90vh] bg-neutral-900 animate-pulse" />
})

const PortfolioCaseStudies = dynamic(() => import('@/../components/portfolio/PortfolioCaseStudies'), {
    loading: () => <div className="min-h-[600px] bg-white animate-pulse" id="case-studies" />
})

const PortfolioExpertise = dynamic(() => import('@/../components/portfolio/PortfolioExpertise'), {
    loading: () => <div className="min-h-[600px] bg-neutral-900 animate-pulse" />
})

const PortfolioMethodology = dynamic(() => import('@/../components/portfolio/PortfolioMethodology'), {
    loading: () => <div className="min-h-[500px] bg-neutral-900 animate-pulse" />
})

const PortfolioImpact = dynamic(() => import('@/../components/portfolio/PortfolioImpact'), {
    loading: () => <div className="min-h-[500px] bg-white animate-pulse" />
})

const ClientTestimonials = dynamic(() => import('@/../components/portfolio/ClientTestimonials'), {
    loading: () => <div className="min-h-[500px] bg-neutral-900 animate-pulse" />
})

const PortfolioCollaboration = dynamic(() => import('@/../components/portfolio/PortfolioCollaboration'), {
    loading: () => <div className="min-h-[500px] bg-neutral-50 animate-pulse" id="contact" />
})

// Strategic component organization to maximize the conversion journey:
// 1. Impactful hero with clear value proposition
// 2. Case studies to provide social proof and results
// 3. Expertise areas to demonstrate specialized knowledge
// 4. Methodology to showcase proprietary approach
// 5. Impact metrics to create desire and urgency
// 6. Client testimonials to build trust
// 7. Collaboration process to capture qualified leads

const PortfolioPage = () => {
    const [isAnalyticsInitialized, setIsAnalyticsInitialized] = useState(false);

    // SEO page title in the browser tab (client-side only)
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.title = 'Financial Decision Architecture | Transform Value Perception | JP Cardozo';
        }
    }, []);

    useEffect(() => {
        // Dynamically import analytics to avoid server-side issues
        import('@/../lib/portfolioAnalytics').then(({ initPortfolioTracking }) => {
            if (!isAnalyticsInitialized) {
                initPortfolioTracking();
                setIsAnalyticsInitialized(true);
            }
        }).catch(err => {
            console.error('Failed to load analytics:', err);
        });
    }, [isAnalyticsInitialized]);

    return (
        <>
            <Navbar />
            <ScrollToTop threshold={500} />
            <main id="portfolio-content" aria-label="Professional Portfolio">
                {/* Hero section with clear value proposition */}
                <EnhancedPortfolioHero />

                {/* Case studies with measurable results */}
                <Suspense>
                    <section id="portfolio-sections">
                        <PortfolioCaseStudies />

                        {/* Expertise and specialization areas */}
                        <PortfolioExpertise />

                        {/* Methodology and approach */}
                        <PortfolioMethodology />

                        {/* Business impact metrics */}
                        <PortfolioImpact />

                        {/* Client testimonials */}
                        <ClientTestimonials />

                        {/* Collaboration process */}
                        <PortfolioCollaboration />
                    </section>
                </Suspense>
            </main>
            <FooterARCO />
        </>
    )
}

export default PortfolioPage
