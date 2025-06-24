/**
 * ARCO PATCH 2: Domain Intelligence Page
 * Dedicated page for showcasing the Domain Intelligence Engine
 */

import { DomainIntelligenceEngine } from '@/components/tools/DomainIntelligenceEngine'
import ProfessionalNavigation from '@/components/layout/ProfessionalNavigation'
import { ProfessionalFooter } from '@/components/layout/ProfessionalFooter'

export default function DomainIntelligencePage() {
    return (
        <div className="min-h-screen bg-slate-900">
            <ProfessionalNavigation />
            <main className="pt-20">
                <DomainIntelligenceEngine />
            </main>
            <ProfessionalFooter />
        </div>
    )
}

export const metadata = {
    title: 'Domain Intelligence Engine | ARCO',
    description: 'Real-time domain analysis with business intelligence. Get comprehensive insights into your website\'s performance, security, and revenue optimization opportunities.',
}
