// Consolidated Page
'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Import core components
import NavBarEnhanced from "../../components/NavBarEnhanced";
import FooterARCORevised from "../../components/FooterARCORevised";
import HomepageLayout from "../../components/HomepageLayout";

// Import analytics
import { trackPageView, trackComponentPerformance } from "../../lib/analytics";

// Custom hook for optimized animations
import { useOptimizedAnimation } from "../../hooks/useOptimizedAnimation";

// Dynamically import components to improve initial load time
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

// Import the new client testimonials component
const ClientTestimonials = dynamic(() => import("../../components/enhanced/ClientTestimonials"), {
  loading: () => <div className="min-h-[50vh] bg-white animate-pulse" id="testimonials" />
});

export default function HomePage() {
  useEffect(() => {
    // Track page view for analytics
    trackPageView('homepage', {
      version: 'consolidated',
      designSystem: 'arco-design-v3'
    });

    // Track page load performance
    const pageLoadTime = performance.now();
    trackComponentPerformance('full-page', pageLoadTime, {
      page: 'homepage'
    });
  }, []);

  const { shouldAnimate } = useOptimizedAnimation();

  return (
    <HomepageLayout>
      <NavBarEnhanced />
      <HeroARCOEnhanced />
      <ProcessEnhanced />
      <ClientTestimonials />
      <CaseStudiesEnhanced />
      <EnhancedCTA />
      <FooterARCORevised />
    </HomepageLayout>
  );
}
