'use client';

/**
 * Services page - Página comercial completa
 * Transparência total de investimento e pacotes
 */

import { MainLayout } from '@/components/layout/MainLayout';
import {
    ServicesHero,
    ServiceComparison, 
    PricingTable,
    RemunerationModel,
    FeaturesShowcase,
    ImplementationProcess,
    ContactSection
} from '@/components/sections/figma';

export default function ServicesPage() {
    return (
        <MainLayout>
            {/* Overview de serviços */}
            <ServicesHero />

            {/* Pacotes: Essencial/Pro/Enterprise */}
            <ServiceComparison />

            {/* Transparência total */}
            <PricingTable />

            {/* Modelo de remuneração */}
            <RemunerationModel />

            {/* Features por pacote */}
            <FeaturesShowcase />

            {/* Como implementamos */}
            <ImplementationProcess />

            {/* Agendamento comercial */}
            <ContactSection />
        </MainLayout>
    );
}