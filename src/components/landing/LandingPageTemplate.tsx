'use client';

import type { Tables } from '@/types/supabase';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import SectionContainer from '@/components/animation/SectionContainer';
import SectionDivider from '@/components/animation/SectionDivider';

// Hero: Eager load (above the fold, critical for LCP)
import { HeroSection } from './sections/HeroSection';

// Below the fold: Lazy load progressively
const IntentSelectorSection = dynamic<{ campaign: Campaign }>(
  () => import('./sections/IntentSelectorSection').then(mod => ({ default: mod.IntentSelectorSection })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

const HowItWorksSection = dynamic<{ campaign: Campaign }>(
  () => import('./sections/HowItWorksSection').then(mod => ({ default: mod.HowItWorksSection })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

const ProofSection = dynamic<{ campaign: Campaign }>(
  () => import('./sections/ProofSection').then(mod => ({ default: mod.ProofSection })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

const PricingSection = dynamic<{ campaign: Campaign }>(
  () => import('./sections/PricingSection').then(mod => ({ default: mod.PricingSection })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

const CaptureSection = dynamic<{ campaign: Campaign }>(
  () => import('./sections/CaptureSection').then(mod => ({ default: mod.CaptureSection })),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

const FAQSection = dynamic<{ campaign: Campaign }>(
  () => import('./sections/FAQSection').then(mod => ({ default: mod.FAQSection })),
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
  return (
    <main className="min-h-screen">
      {/* Seção 1: Hero - EAGER (Above the fold, critical for LCP) - FULL WIDTH SEM CONTAINER */}
      <HeroSection campaign={campaign} />

      <SectionDivider variant="wave" />

      {/* Seção 2: How It Works - LAZY (Educação do prospect) */}
      <Suspense fallback={<SectionSkeleton />}>
        <HowItWorksSection campaign={campaign} />
      </Suspense>

      <SectionDivider variant="wave" />

      {/* Seção 3: Proof - LAZY (Social proof com dados reais) */}
      <Suspense fallback={<SectionSkeleton />}>
        <ProofSection campaign={campaign} />
      </Suspense>

      <SectionDivider variant="fade" />

      {/* Seção 4: Pricing - LAZY (Decisão de investimento) */}
      <Suspense fallback={<SectionSkeleton />}>
        <PricingSection campaign={campaign} />
      </Suspense>

      {/* Seção 5: Capture Form - LAZY (Primary CTA) - FULL WIDTH DARK MODE */}
      <Suspense fallback={<SectionSkeleton />}>
        <CaptureSection campaign={campaign} />
      </Suspense>

      <SectionDivider variant="fade" />

      {/* Seção 6: FAQ - LAZY (Lowest priority) - FULL WIDTH DARK MODE */}
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection campaign={campaign} />
      </Suspense>
    </main>
  );
}
