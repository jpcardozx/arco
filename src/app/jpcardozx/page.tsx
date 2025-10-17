/**
 * PORTFOLIO PAGE - /jpcardozx
 * 
 * CONSOLIDADO EM 4 SEÇÕES PREMIUM (inspirado em /agendamentos)
 * 
 * Tom: Impessoal, maduro, factual
 * Copy: Métricas reais, stack específico, cases factuais
 * Visual: Three.js subtle + glassmorphism premium + dark theme
 * Performance: < 2s LCP, lazy loading, otimizado
 * 
 * Estrutura CONSOLIDADA:
 * 
 * 1. Hero Integrado (1.5x) - Hero + Expertise + Métricas inline ✅
 * 2. Experience + Philosophy (1x) - Timeline compacto + Princípios inline
 * 3. Process + Approach (1x) - Delivery framework + Metodologia consolidada
 * 4. Contact + Certifications (0.5x) - Form simples + Badges inline
 */

'use client';

export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic';

// Lazy load components (ssr: false)
const HeroThreeScene = dynamicImport(() => import('@/components/portfolio/HeroThreeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-slate-950" />
});

const ProcessMethodology = dynamicImport(() => import('@/components/portfolio/ProcessMethodology'));
const ContactInformation = dynamicImport(() => import('@/components/portfolio/ContactInformation'));

export default function PortfolioPage() {
  return (
    <div className="relative bg-slate-950 overflow-hidden">
      {/* Seção 1: Hero Integrado (1.5x) - Hero + Expertise + Métricas ✅ */}
      <div id="hero">
        <HeroThreeScene />
      </div>

      {/* Seção 2: Process + Approach (1x) - Delivery + Metodologia */}
      <div id="process">
        <ProcessMethodology />
      </div>

      {/* Seção 4: Contact + Certifications (0.5x) - Form + Badges */}
      <div id="contact">
        <ContactInformation />
      </div>
    </div>
  );
}
