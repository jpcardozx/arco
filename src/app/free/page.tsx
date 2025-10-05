/**
 * /free - Lead Magnet Page
 * High-converting landing page for free resource download
 * Design System: Glassmorphic + Gradient + Premium UX
 */

import type { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import { LeadMagnetHero } from '@/components/sections/leadmagnet/LeadMagnetHero';
import { PersonalizationSection } from '@/components/sections/leadmagnet/PersonalizationSection';
import { URLAnalyzerSection } from '@/components/sections/free';
import { LeadMagnetForm } from '@/components/sections/leadmagnet/LeadMagnetForm';
import { LeadMagnetBenefits } from '@/components/sections/leadmagnet/LeadMagnetBenefits';
import { DirectContactEscapeValve } from '@/components/sections/leadmagnet/DirectContactEscapeValve';
import { ImplementationRoadmap } from '@/components/sections/leadmagnet/ImplementationRoadmap';
import { LeadMagnetSocialProof } from '@/components/sections/leadmagnet/LeadMagnetSocialProof';

/**
 * /free - Lead Magnet Page v2.0
 * Com escape valve para contato direto (GAP #3 corrigido)
 */

export const metadata: Metadata = {
  title: 'Checklist Gratuito: 15 Pontos de Otimização de Funil | ARCO',
  description: 'Baixe gratuitamente o checklist completo com 15 pontos críticos para otimizar seu funil de leads. Inclui benchmarks do setor e autoavaliação guiada.',
  openGraph: {
    title: 'Checklist Gratuito: 15 Pontos de Otimização de Funil',
    description: 'Material exclusivo para prestadores de serviços locais aumentarem seus leads qualificados',
    type: 'website',
  },
};

export default function FreePage() {
  return (
    <MainLayout showHeader={true} showFooter={true}>
      {/* Hero Section - Above the fold (FunnelProgress removido - composição limpa) */}
      <LeadMagnetHero />

      {/* NOVA: Personalization Quiz - Interactive engagement */}
      <PersonalizationSection />

      {/* NOVA: URL Analyzer - S-Tier Interactive Tool */}
      <URLAnalyzerSection />

      {/* Form Section - Primary conversion point */}
      <LeadMagnetForm />

      {/* Benefits Section - Value reinforcement */}
      <LeadMagnetBenefits />

      {/* NOVO: Escape Valve para Contato Direto - GAP #3 */}
      <DirectContactEscapeValve />

      {/* NOVA: Implementation Roadmap - Progression visual */}
      <ImplementationRoadmap />

      {/* Social Proof Section - Trust building + FAQ */}
      <LeadMagnetSocialProof />
    </MainLayout>
  );
}
