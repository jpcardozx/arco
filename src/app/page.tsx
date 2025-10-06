import { MainLayout } from '../components/layout/MainLayout';
import { PremiumHeroSection } from '../components/sections/PremiumHeroSection';
import { URLAnalyzerSection } from '../components/sections/URLAnalyzerSection';
import { TransitionBridge } from '../components/sections/TransitionBridge';
import { UnifiedValueProposition } from '../components/sections/UnifiedValueProposition';
import { OptimizedClientStories } from '../components/sections/OptimizedClientStories';
import { ExecutionShowcase } from '../components/sections/ExecutionShowcase';
import { TechStackSection } from '../components/sections/TechStackSection';
import { StrategicVelocitySection } from '../components/sections/StrategicVelocity';
import { FigmaFinalCTA } from '../components/sections';

/**
 * HOMEPAGE - Hero premium original + funil otimizado + storytelling
 */

export default function HomePage() {
    return (
        <MainLayout>
            {/* Hero Premium com macOS window */}
            <PremiumHeroSection
                badge={{
                    text: "Analise de Performance"
                }}
                title="Prestadores de Serviços Locais: +350% em Leads Qualificados"
                subtitle="Sistema completo de captação web + tráfego qualificado em 48h. Metodologia comprovada em 200+ empresas com ROI médio de 420%."
                primaryCta={{
                    text: "Descobrir Meu Potencial",
                    href: "#roi-calculator"
                }}
                secondaryCta={{
                    text: "Ver Casos de Sucesso",
                    href: "#cases"
                }}
                showParticles={true}
                variant="premium"
            />

            {/* URL Analyzer - Lead magnet com redirect para /mydomain */}
            <URLAnalyzerSection />

            {/* Transition: Analyzer → Value Prop */}
            <TransitionBridge
                statement="Nossa abordagem integra estratégia, tecnologia e execução"
                variant="minimal"
            />

            {/* Value Proposition */}
            <UnifiedValueProposition />

            {/* Transition: Value Prop → Cases */}
            <TransitionBridge
                statement="Resultados de implementações anteriores"
                variant="minimal"
            />

            {/* Execution Showcase - Technical excellence demonstration */}
            <ExecutionShowcase />

            {/* Tech Stack - Infrastructure showcase */}
            <TechStackSection />

            {/* Strategic Velocity Framework - Productized packages + retainer ladder */}
            <StrategicVelocitySection />

            {/* Final CTA */}
            <FigmaFinalCTA />
        </MainLayout>
    );
}
