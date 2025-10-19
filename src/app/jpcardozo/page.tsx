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

import dynamicImport from 'next/dynamic';
import { WhatsAppButton } from '@/components/primitives/WhatsAppButton';
import { SectionParallax } from '@/components/portfolio/SectionParallax';

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
      <div id="hero" className='mt-[-120px]'>
        <HeroThreeScene />
      </div>

      {/* Seção 2: Hard Skills + Stack (1x) - Expertise Matrix + Technical Stack */}
      <SectionParallax
        id="skills"
        backgroundColor="bg-slate-900"
        showParticles={true}
        delay={0.1}
      >
        <ExpertiseMatrix />
      </SectionParallax>

      {/* Seção 3: Technical Stack (0.75x) - Ferramentas e tecnologias detalhadas */}
      <SectionParallax
        id="stack"
        backgroundColor="bg-slate-950"
        showParticles={true}
        delay={0.2}
      >
        <TechnicalStack />
      </SectionParallax>

      {/* Seção 4: Case Study (1x) - IPE Imóveis projeto detalhado */}
      <SectionParallax
        id="case-study"
        backgroundColor="bg-slate-900"
        showParticles={true}
        delay={0.1}
      >
        <FeaturedCaseStudy />
      </SectionParallax>

      {/* Seção 5: Process + Approach (1x) - Delivery + Metodologia */}
      <SectionParallax
        id="process"
        backgroundColor="bg-slate-950"
        showParticles={true}
        delay={0.2}
      >
        <ProcessMethodology />
      </SectionParallax>

      {/* Seção 6: Contact + Certifications (0.5x) - Form + Badges (ÚLTIMA) */}
      <SectionParallax
        id="contact"
        backgroundColor="bg-slate-900"
        showParticles={false}
        delay={0.1}
      >
        <ContactInformation />
      </SectionParallax>

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
