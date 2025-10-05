import { MainLayout } from '../components/layout/MainLayout';
import { UnifiedHeroSection } from '../components/sections/UnifiedHeroSection';
import { TransitionBridge } from '../components/sections/TransitionBridge';
import { UnifiedValueProposition } from '../components/sections/UnifiedValueProposition';
import { OptimizedClientStories } from '../components/sections/OptimizedClientStories';
import { ROICalculator } from '../components/sections/ROICalculator.original';
import { StrategicVelocitySection } from '../components/sections/StrategicVelocity';
import { FigmaFinalCTA } from '../components/sections';
import { WebVitalsMonitor } from '../components/performance/WebVitalsMonitor';

/**
 * HOMEPAGE - VERSÃO HÍBRIDA
 * 
 * Combina o melhor de duas épocas:
 * - UnifiedHeroSection: Hero interativo com audit tool (commit 9793ba9)
 * - ROICalculator Original: Cálculos sofisticados por indústria
 * - TransitionBridge: UX flow moderno
 * - WebVitalsMonitor: Performance tracking em tempo real
 */

export default function HomePage() {
    return (
        <MainLayout>
            {/* Hero INTERATIVO com website audit tool */}
            <UnifiedHeroSection />

            {/* Transition: Hero → ROI */}
            <TransitionBridge
                question="Quanto você está deixando de ganhar sem um sistema profissional de captação?"
                context="A maioria dos prestadores de serviços locais perde 60-80% dos leads potenciais"
                variant="question"
            />

            {/* ROI Calculator ORIGINAL - Lead magnet com cálculos sofisticados */}
            <div id="roi-calculator">
                <ROICalculator />
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

            {/* Web Vitals Monitor - Performance tracking (não invasivo) */}
            <WebVitalsMonitor />
        </MainLayout>
    );
}
