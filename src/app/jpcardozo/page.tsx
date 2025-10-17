/**
 * PORTFOLIO PAGE - /jpcardozo
 * 
 * ESTRUTURA COMPLETA EM 9 SEÇÕES PREMIUM
 * 
 * Tom: Impessoal, maduro, factual
 * Copy: Métricas reais, stack específico, cases factuais
 * Visual: Three.js subtle + glassmorphism premium + dark theme
 * Performance: < 2s LCP, lazy loading, otimizado
 * 
 * Estrutura COMPLETA:
 * 
 * 1. Hero Integrado (1.5x) - Hero + Stack badges com ícones react-icons ✅
 * 2. Hard Skills + Expertise (1x) - Expertise Matrix com Three.js ✅
 * 3. Technical Stack (0.75x) - Ferramentas detalhadas com níveis ✅
 * 4. Work Experience (1x) - Collapsible profundo com achievements ✅
 * 5. Projects (1x) - Collapsible com tech details ✅
 * 6. Case Study IPE (1x) - Case study único detalhado ✅ REAL
 * 7. Process + Approach (1x) - Delivery framework + Metodologia
 * 8. Experience + Philosophy (1x) - Timeline + Princípios (PENÚLTIMA)
 * 9. Contact + Certifications (0.5x) - Form + Badges (ÚLTIMA)
 */

'use client';

export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic';
import { WhatsAppButton } from '@/components/primitives/WhatsAppButton';

// Lazy load components (ssr: false)
const HeroThreeScene = dynamicImport(() => import('@/components/portfolio/HeroThreeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-slate-950" />
});

const ProcessMethodology = dynamicImport(() => import('@/components/portfolio/ProcessMethodology'));
const ContactInformation = dynamicImport(() => import('@/components/portfolio/ContactInformation'));
const TechnicalStack = dynamicImport(() => import('@/components/portfolio/TechnicalStack'));
const ExpertiseMatrix = dynamicImport(() => import('@/components/portfolio/ExpertiseMatrix'));
const FeaturedCaseStudy = dynamicImport(() => import('@/components/portfolio/FeaturedCaseStudy'));

export default function PortfolioPage() {
  return (
    <div className="relative bg-slate-950 overflow-hidden">
      {/* Seção 1: Hero Integrado (1.5x) - Hero + Expertise + Métricas ✅ */}
      <div id="hero">
        <HeroThreeScene />
      </div>

      {/* Seção 2: Hard Skills + Stack (1x) - Expertise Matrix + Technical Stack */}
      <div id="skills">
        <ExpertiseMatrix />
      </div>

      {/* Seção 3: Technical Stack (0.75x) - Ferramentas e tecnologias detalhadas */}
      <div id="stack">
        <TechnicalStack />
      </div>

      {/* Seção 4: Case Study (1x) - IPE Imóveis projeto detalhado */}
      <div id="case-study">
        <FeaturedCaseStudy />
      </div>

      {/* Seção 5: Process + Approach (1x) - Delivery + Metodologia */}
      <div id="process">
        <ProcessMethodology />
      </div>

      {/* Seção 6: Contact + Certifications (0.5x) - Form + Badges (ÚLTIMA) */}
      <div id="contact">
        <ContactInformation />
      </div>

      {/* WhatsApp Button - Personal Number */}
      <WhatsAppButton 
        phoneNumber="21990051961"
        message="Olá JP! Gostaria de conversar sobre um projeto."
        variant="floating"
        size="md"
      />
    </div>
  );
}
