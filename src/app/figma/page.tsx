/**
 * Figma Implementation Page
 * Sistema baseado no Figma com shadcn/ui e copywriting profissional
 */

import { MainLayout } from '@/components/layout/MainLayout';
import {
  FigmaHero,
  MethodologyHero,
  ServicesHero
} from '@/components/sections/figma/heroes';
import {
  FigmaPillars
} from '@/components/sections/figma/pillars';
import {
  FigmaVelocity
} from '@/components/sections/figma/velocity';
import {
  FigmaTestimonials
} from '@/components/sections/figma/social-proof';
import {
  FigmaResources
} from '@/components/sections/figma/resources';
import {
  FigmaFinalCTA
} from '@/components/sections/figma/cta';
import {
  SectionDivider
} from '@/components/sections/figma/core';
import {
  FunnelAllocation,
  ProcessStandards,
  ImplementationProcess
} from '@/components/sections/figma/process';
import {
  PricingTable,
  RemunerationModel
} from '@/components/sections/figma/pricing';
import {
  DataEvidence,
  CaseStudyShowcase,
  FeaturesShowcase
} from '@/components/sections/figma/showcase';
import {
  ServiceComparison,
  MetricsGuide
} from '@/components/sections/figma/services';
import {
  TeamSection
} from '@/components/sections/figma/company';
import {
  ContactSection
} from '@/components/sections/figma/contact';

export default function FigmaPage() {
  return (
    <MainLayout>
      {/* === SEÇÕES DE CONVERSÃO === */}
      <SectionDivider 
        title="Seções de Conversão"
        description="Componentes focados em captura e conversão de leads qualificados"
        variant="home"
        icon="🎯"
      />
      
      {/* Hero Section - Focused on qualified leads */}
      <FigmaHero />
      
      {/* Methodology Hero - Process focused */}
      <MethodologyHero />
      
      {/* Three Pillars Strategy */}
      <FigmaPillars />
      
      {/* Velocity Section */}
      <FigmaVelocity />
      
      {/* === SEÇÕES DE PROCESSO === */}
      <SectionDivider 
        title="Metodologia & Processo"
        description="Componentes que explicam metodologia e padrões de qualidade"
        variant="wireframe"
        icon="⚙️"
      />
      
      {/* Funnel Allocation Strategy */}
      <FunnelAllocation />
      
      {/* Process Standards */}
      <ProcessStandards />
      
      {/* === SEÇÕES DE INVESTIMENTO === */}
      <SectionDivider 
        title="Planos & Investimento"
        description="Componentes de pricing e evidências de resultados"
        variant="other"
        icon="💰"
      />
      
      {/* Pricing Table */}
      <PricingTable />
      
      {/* Data Evidence */}
      <DataEvidence />
      
      {/* === SEÇÕES REFINADAS === */}
      <SectionDivider 
        title="Design Refinado & UX Aprimorado"
        description="Seções com design premium e integração shadcn/ui otimizada"
        variant="wireframe"
        icon="✨"
      />
      
      {/* Services Hero - Refined */}
      <ServicesHero />
      
      {/* Service Comparison */}
      <ServiceComparison />
      
      {/* Metrics Guide */}
      <MetricsGuide />
      
      {/* Remuneration Model */}
      <RemunerationModel />
      
      {/* Implementation Process */}
      <ImplementationProcess />
      
      {/* === SEÇÕES DE CREDIBILIDADE === */}
      <SectionDivider 
        title="Seções de Credibilidade"
        description="Componentes que constroem confiança e autoridade na marca"
        variant="wireframe"
        icon="🏆"
      />
      
      {/* Social Proof Section */}
      <FigmaTestimonials />
      
      {/* Resources and Knowledge */}
      <FigmaResources />
      
      {/* === SEÇÕES DE FECHAMENTO === */}
      <SectionDivider 
        title="Seções de Fechamento"
        description="Componentes finais para conversão e call-to-action definitivo"
        variant="other"
        icon="🚀"
      />
      
      {/* Final CTA Section */}
      <FigmaFinalCTA />
      
      {/* === SEÇÕES COMPLEMENTARES === */}
      <SectionDivider 
        title="Biblioteca Completa"
        description="Seções adicionais para website completo de 5 páginas"
        variant="other"
        icon="📚"
      />
      
      {/* Features Showcase */}
      <FeaturesShowcase />
      
      {/* Case Study Showcase */}
      <CaseStudyShowcase />
      
      {/* Team Section */}
      <TeamSection />
      
      {/* Contact Section */}
      <ContactSection />
    </MainLayout>
  );
}
import type { Metadata } from 'next';



