/**
 * ARCO Demo Page - Complete Implementation
 * Demonstrates how to use organized sections WITH original navbar/hero
 */

import { MainLayout } from '@/components/layout/MainLayout';
import {
  ServicesHero,
  CaseStudyShowcase,
  MetricsGuide,
  ServiceComparison,
  FigmaTestimonials,
  ContactSection
} from '@/components/sections/figma';

export default function DemoPage() {
    return (
        <MainLayout>
            {/* Hero: Veja resultados reais */}
            <ServicesHero />

            {/* 3 casos com ROI detalhado */}
            <CaseStudyShowcase />

            {/* KPIs antes/depois */}
            <MetricsGuide />

            {/* Nós vs concorrência */}
            <ServiceComparison />

            {/* Depoimentos mantidos */}
            <FigmaTestimonials />

            {/* CTA qualificado para demo */}
            <ContactSection />
        </MainLayout>
    );
}