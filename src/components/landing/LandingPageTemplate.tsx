'use client';

import type { Tables } from '@/types/supabase';
import { Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, AlertCircle, TrendingUp, Calendar, GitBranch, Zap } from 'lucide-react';
import SectionContainer from '@/components/animation/SectionContainer';
import SectionDivider from '@/components/animation/SectionDivider';
import { useMetaTracking } from '@/hooks/useMetaTracking';

// Hero: Eager load (above the fold, critical for LCP)
import { HeroSection } from './sections/HeroSection';

// Core sections - Eager load
import { TransitionBridge } from './TransitionBridge';
import { IntentCheckpoint } from './IntentCheckpoint';
import { SystemOverviewSection } from './sections/SystemOverviewSection'; // NOVO - Fusão de SolutionArchitecture + MarketContext
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

const CaptureSection = dynamic<{ campaign: Campaign }>(
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

      <SectionDivider variant="wave" />

      {/* 2. System Overview - Pilares integrados + Before/After */}
      <SystemOverviewSection campaign={campaign} />

      <SectionDivider variant="fade" />

      {/* 3. How It Works - Processo detalhado com timeline */}
      <HowItWorksSection campaign={campaign} />

      <TransitionBridge
        campaign={campaign}
        text="Veja quem já validou este sistema"
        icon={TrendingUp}
        variant="icon"
      />

      {/* 4. Proof - Social proof + Carousel + Gallery */}
      <Suspense fallback={<SectionSkeleton />}>
        <ProofSection campaign={campaign} />
      </Suspense>

      <TransitionBridge
        campaign={campaign}
        text="Entenda a jornada de implementação"
        icon={Calendar}
        variant="icon"
      />

      {/* 5. Implementation Guide - Timeline 90 dias */}
      <ImplementationGuideSection campaign={campaign} />

      <SectionDivider variant="wave" />

      {/* 6. Value Investment - Pricing transparente */}
      <Suspense fallback={<SectionSkeleton />}>
        <ValueInvestmentSection campaign={campaign} />
      </Suspense>

      <TransitionBridge
        campaign={campaign}
        text="Pronto? Agende uma análise gratuita"
        icon={Zap}
        variant="icon"
      />

      {/* 7. Capture Form - CTA Principal */}
      <Suspense fallback={<SectionSkeleton />}>
        <CaptureSection campaign={campaign} />
      </Suspense>

      <SectionDivider variant="fade" />

      {/* 8. Policies & Guarantees */}
      <PoliciesSection campaign={campaign} />
    </main>
  );
}
