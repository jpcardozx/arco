'use client'

/**
 * ANÁLISE CRÍTICA (2025-06-27)
 *
 * Propósito: Estrutura tradicional de homepage, com seções bem separadas (hero, metodologia, resultados, etc).
 * Pontos Fortes: Modularidade, clareza de seções, fácil reaproveitamento de componentes.
 * Pontos Fracos: Não possui tracking, fallback de erro ou orquestração inteligente.
 * Recomendações: Reaproveitar componentes e seções para enriquecer a homepage principal. Não remover sem antes migrar o que for útil.
 */

import PersonalNavigation from "../components/layout/PersonalNavigation";
import { ModernHeroSection } from "../components/sections/ModernHeroSection";
import { StrategicMethodologySection } from "../components/sections/StrategicMethodologySection";
import { IndustryResultsSection } from "../components/sections/IndustryResultsSection";
import { ValueProgressionSection } from "../components/sections/ValueProgressionSection";
import { EnterpriseStandardsSection } from "../components/sections/EnterpriseStandardsSection";
import { ProfessionalFooter } from "../components/layout/ProfessionalFooter";

export default function Home() {
    return (
        <>
            <PersonalNavigation />
            <ModernHeroSection />
            <StrategicMethodologySection />
            <IndustryResultsSection />
            <ValueProgressionSection />
            <EnterpriseStandardsSection />
            <ProfessionalFooter />
        </>
    );
}
