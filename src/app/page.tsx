'use client'

import { ProfessionalNavigation } from "../components/layout/ProfessionalNavigation";
import { ProfessionalHero } from "../components/sections/ProfessionalHero";
import { ICPTargetingSection } from "../components/sections/ICPTargetingSection";
import { ROICalculatorSection } from "../components/sections/ROICalculatorSection";
import { OfferSection } from "../components/sections/OfferSection";
import { TechnologyPipelineSection } from "../components/sections/TechnologyPipelineSection";
import { ResultsSection } from "../components/sections/ResultsSection";
import { SocialProofUrgencySection } from "../components/sections/SocialProofUrgencySection";
import { FlashAuditSection } from "../components/sections/FlashAuditSection";
import { ProfessionalContact } from "../components/sections/ProfessionalContact";
import { ProfessionalFooter } from "../components/layout/ProfessionalFooter";

export default function Home() {
  return (
    <>
      <ProfessionalNavigation />
      <ProfessionalHero />
      <ICPTargetingSection />
      <ROICalculatorSection />
      <OfferSection />
      <TechnologyPipelineSection />
      <ResultsSection />
      <SocialProofUrgencySection />
      <FlashAuditSection />
      <ProfessionalContact />
      <ProfessionalFooter />
    </>
  );
}
