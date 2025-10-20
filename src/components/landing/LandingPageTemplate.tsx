'use client';

import type { Tables } from '@/types/supabase';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, AlertCircle, TrendingUp, Calendar, GitBranch, Zap } from 'lucide-react';
import SectionContainer from '@/components/animation/SectionContainer';
import SectionDivider from '@/components/animation/SectionDivider';

// Hero: Eager load (above the fold, critical for LCP)
import { HeroSection } from './sections/HeroSection';

// Bridges & Core sections - Eager load for good flow
import { TransitionBridge } from './TransitionBridge';
import { IntentCheckpoint } from './IntentCheckpoint';
import { ValuePropositionSection } from './sections/ValuePropositionSection';
import { ComparisonSection } from './sections/ComparisonSection';
import { ProcessBreakdownSection } from './sections/ProcessBreakdownSection';
import { ImplementationGuideSection } from './sections/ImplementationGuideSection';
import { PoliciesSection } from './sections/PoliciesSection';

// Below the fold: Lazy load progressively
const IntentSelectorSection = dynamic<{ campaign: Campaign }>(
  () => import('./sections/IntentSelectorSection').then(mod => ({ default: mod.IntentSelectorSection })),
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
      {/* 1. Hero - EAGER (Above the fold, critical for LCP) */}
      <HeroSection campaign={campaign} />

      <SectionDivider variant="wave" />

      {/* 2. Value Proposition - Solution intro */}
      <ValuePropositionSection campaign={campaign} />

      <SectionDivider variant="fade" />

      {/* 3. Comparison - Before/after visual */}
      <ComparisonSection campaign={campaign} />

      {/* Bridge 1: After Comparison */}
      <TransitionBridge
        campaign={campaign}
        text="Entenda cada passo do processo"
        icon={ArrowDown}
        variant="icon"
      />

      {/* 4. Process Breakdown - Detailed 5 steps */}
      <ProcessBreakdownSection campaign={campaign} />

      {/* Bridge 2: After ProcessBreakdown */}
      <TransitionBridge
        campaign={campaign}
        text="Qual é sua maior dor?"
        icon={AlertCircle}
        variant="icon"
      />

      {/* 5. Intent Selector - User chooses pain - LAZY */}
      <Suspense fallback={<SectionSkeleton />}>
        <IntentSelectorSection campaign={campaign} />
      </Suspense>

      {/* 5.5. Intent Checkpoint - Qualification gate (NEW) */}
      <IntentCheckpoint campaign={campaign} />

      {/* Bridge 3: After IntentSelector */}
      <TransitionBridge
        campaign={campaign}
        text="Veja como outros salões fizeram a mesma jornada"
        icon={TrendingUp}
        variant="icon"
      />

      <SectionDivider variant="fade" />

      {/* 6. Proof - Social proof com dados reais - LAZY */}
      <Suspense fallback={<SectionSkeleton />}>
        <ProofSection campaign={campaign} />
      </Suspense>

      {/* Bridge 4: After Proof */}
      <TransitionBridge
        campaign={campaign}
        text="Isto é realista. Veja seu calendário chegar a 90 dias"
        icon={Calendar}
        variant="icon"
      />

      {/* 7. Implementation Guide - 90-day timeline */}
      <ImplementationGuideSection campaign={campaign} />

      {/* Bridge 5: After ImplementationGuide */}
      <TransitionBridge
        campaign={campaign}
        text="Escolha o plano que combina com seu ritmo"
        icon={GitBranch}
        variant="icon"
      />

      <SectionDivider variant="wave" />

      {/* 8. FAQ - Objection handling PRE-PRICING (MOVED) */}
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection campaign={campaign} />
      </Suspense>

      {/* 9. Pricing - Decisão de investimento - LAZY */}
      <Suspense fallback={<SectionSkeleton />}>
        <PricingSection campaign={campaign} />
      </Suspense>

      {/* Bridge 6: After Pricing */}
      <TransitionBridge
        campaign={campaign}
        text="Pronto? Deixe seu contato. Te ligaremos em até 2h."
        icon={Zap}
        variant="icon"
      />

      {/* 10. Capture Form - Primary CTA - LAZY */}
      <Suspense fallback={<SectionSkeleton />}>
        <CaptureSection campaign={campaign} />
      </Suspense>

      <SectionDivider variant="fade" />

      {/* 11. Policies & Guarantees - Trust consolidation (NEW) */}
      <PoliciesSection campaign={campaign} />
    </main>
  );
}
