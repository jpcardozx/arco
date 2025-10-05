import { MainLayout } from '../components/layout/MainLayout';
import { PremiumHeroSection } from '../components/sections/PremiumHeroSection';
import { TransitionBridge } from '../components/sections/TransitionBridge';
import { UnifiedValueProposition } from '../components/sections/UnifiedValueProposition';
import { OptimizedClientStories } from '../components/sections/OptimizedClientStories';
import { EnhancedROICalculator } from '../components/sections/EnhancedROICalculator';
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

            {/* Transition: Hero → ROI */}
            <TransitionBridge
                question="Quanto você está deixando de ganhar sem um sistema profissional de captação?"
                context="A maioria dos prestadores de serviços locais perde 60-80% dos leads potenciais"
                variant="question"
            />

            {/* ROI Calculator - Lead magnet */}
            <div id="roi-calculator">
                <EnhancedROICalculator />
            </div>

            {/* Transition: ROI → Value Prop */}
            <TransitionBridge
                statement="Agora que você viu o potencial, veja como entregamos esses resultados"
                variant="statement"
                showArrow={true}
            />

            {/* Value Proposition */}
            <UnifiedValueProposition />

            {/* Transition: Value Prop → Cases */}
            <TransitionBridge
                question="Mas isso funciona de verdade?"
                context="Veja empresas que já alcançaram +350% em leads qualificados"
                variant="question"
            />

            {/* Client Stories - Social Proof */}
            <div id="cases">
                <OptimizedClientStories />
            </div>

            {/* Strategic Velocity Framework - Productized packages + retainer ladder */}
            <StrategicVelocitySection />

            {/* Final CTA */}
            <FigmaFinalCTA />
        </MainLayout>
    );
}
