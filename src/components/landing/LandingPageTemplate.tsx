'use client';

import type { Tables } from '@/types/supabase';
import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, AlertCircle, TrendingUp, Calendar, GitBranch, Zap } from 'lucide-react';
import SectionContainer from '@/components/animation/SectionContainer';
import SectionDivider from '@/components/animation/SectionDivider';
import { useMetaTracking } from '@/hooks/useMetaTracking';

// Hero: Eager load (above the fold, critical for LCP)
import { HeroSection } from './sections/HeroSection';
import { ROICalculatorSection } from './sections/ROICalculatorSection';
import { LeadMagnetSection } from './sections/LeadMagnetSection';

// Core sections - Eager load
import { TransitionBridge } from './TransitionBridge';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { ImplementationGuideSection } from './sections/ImplementationGuideSection';
import { PoliciesSection } from './sections/PoliciesSection';

// Below the fold: Lazy load progressively
const ProofSection = dynamic<{ campaign: Campaign }>(
  () => import('./sections/ProofSection').then(mod => ({ default: mod.ProofSection })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

const ValueInvestmentSection = dynamic<{ campaign: Campaign }>(
  () => import('./sections/ValueInvestmentSection').then(mod => ({ default: mod.ValueInvestmentSection })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

const CaptureSection = dynamic<{ campaign: Campaign; prefilledChallenge?: string | null }>(
  () => import('./sections/CaptureSection').then(mod => ({ default: mod.CaptureSection })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

// Loading skeleton component
function SectionSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-slate-200 rounded-lg w-3/4 mx-auto" />
      <div className="h-6 bg-slate-200 rounded w-full" />
      <div className="h-6 bg-slate-200 rounded w-5/6 mx-auto" />
    </div>
  );
}

type Campaign = Tables<'campaigns'>;

interface LandingPageTemplateProps {
  campaign: Campaign;
}

export function LandingPageTemplate({ campaign }: LandingPageTemplateProps) {

  // Track PageView + ViewContent on mount
  useEffect(() => {
    // PageView (automático via Pixel)
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: campaign.name,
        content_category: 'landing_page',
        content_ids: [campaign.id],
        content_type: 'product',
      });
    }
  }, [campaign.id, campaign.name]);

  return (
    <main className="min-h-screen">
      {/* 1. Hero */}
      <HeroSection campaign={campaign} />

      <SectionDivider variant="gradient" />

      {/* 2. How It Works - EDUCAR primeiro (processo detalhado) */}
      <HowItWorksSection campaign={campaign} />

      <SectionDivider variant="depth" />

      <TransitionBridge
        campaign={campaign}
        text="Transparência: veja a distribuição real de resultados"
        icon={TrendingUp}
        variant="icon"
      />

      {/* 3. Proof - PROVAR com dados (4 tiers transparentes) */}
      <Suspense fallback={<SectionSkeleton />}>
        <ProofSection campaign={campaign} />
      </Suspense>

      <SectionDivider variant="gradient" />

      {/* 4. ROI Calculator - CALCULAR (agora faz sentido) */}
      <ROICalculatorSection campaignId={campaign.id} />

      <TransitionBridge
        campaign={campaign}
        text="Entenda como os melhores implementaram"
        icon={Calendar}
        variant="icon"
      />

      {/* 5. Implementation Guide - Timeline 90 dias */}
      <ImplementationGuideSection campaign={campaign} />

      <SectionDivider variant="gradient" />

      {/* 6. Value Investment - Pricing transparente */}
      <Suspense fallback={<SectionSkeleton />}>
        <ValueInvestmentSection campaign={campaign} />
      </Suspense>

      <TransitionBridge
        campaign={campaign}
        text="Quer dados específicos do seu caso?"
        icon={Zap}
        variant="icon"
      />

      {/* 7. Lead Magnet - Oferta de VALOR (PDF com benchmarks) */}
      <LeadMagnetSection campaignId={campaign.id} />

      <SectionDivider variant="fade" />

      {/* 9. Policies & Guarantees */}
      <PoliciesSection campaign={campaign} />
    </main>
  );
}
