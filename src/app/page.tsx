
import { ARCONavigation } from '@/components/layout/ARCONavigation';
import { ARCOFooter } from '@/components/layout/ARCOFooter';
import { SophisticatedHero } from '@/components/sections/SophisticatedHeroNew';
import { MaturedValueProposition } from '@/components/sections/MaturedValuePropositionNew';
import { BusinessMetrics } from '@/components/sections/BusinessMetrics';
import { ProofLattice } from '@/components/sections/ProofLattice';
import { IMPACTFramework } from '@/components/sections/IMPACTFramework';
import { ExecutiveIntelligenceHub } from '@/components/sections/ExecutiveIntelligenceHub';
import { ROICalculatorSectionExecutive } from '@/components/sections/ROICalculatorSectionExecutive';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { IntelligentLeadCapture } from '@/components/sections/IntelligentLeadCapture';

export default function ComprehensiveHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ARCONavigation />
      <main className="flex-grow">
        <SophisticatedHero />
        <MaturedValueProposition />
        <BusinessMetrics />
        <ProofLattice />
        <IMPACTFramework />
        <ExecutiveIntelligenceHub />
        <ROICalculatorSectionExecutive />
        <CaseStudies />
        <IntelligentLeadCapture />
      </main>
      <ARCOFooter />
    </div>
  );
}
