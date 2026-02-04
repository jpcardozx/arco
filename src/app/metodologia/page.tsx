export const dynamic = 'force-dynamic';

import { MainLayout } from '@/components/layout/MainLayout';
import {
  MethodologyHero,
  ProcessStandards,
  FunnelAllocation,
  ImplementationProcess,
  DataEvidence,
  FigmaFinalCTA
} from '@/components/sections/figma';

export default function MethodologyPage() {
    return (
        <MainLayout>
            {/* Hero: Como funciona na prática */}
            <MethodologyHero />

            {/* Processo step-by-step transparente */}
            <ProcessStandards />

            {/* Onde seu investimento vai */}
            <FunnelAllocation />

            {/* Timeline de 48h detalhado */}
            <ImplementationProcess />

            {/* Benchmarks e métricas */}
            <DataEvidence />

            {/* CTA: Agendar análise técnica */}
            <FigmaFinalCTA />
        </MainLayout>
    );
}