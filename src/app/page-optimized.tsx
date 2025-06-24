'use client'

import ProfessionalNavigation from "../components/layout/ProfessionalNavigation";
import { ModernHeroSection } from "../components/sections/ModernHeroSection";
import { StrategicMethodologySection } from "../components/sections/StrategicMethodologySection";
import { IndustryResultsSection } from "../components/sections/IndustryResultsSection";
import { ValueProgressionSection } from "../components/sections/ValueProgressionSection";
import { EnterpriseStandardsSection } from "../components/sections/EnterpriseStandardsSection";
import { ProfessionalFooter } from "../components/layout/ProfessionalFooter";

export default function Home() {
    return (
        <>
            <ProfessionalNavigation />
            <ModernHeroSection />
            <StrategicMethodologySection />
            <IndustryResultsSection />
            <ValueProgressionSection />
            <EnterpriseStandardsSection />
            <ProfessionalFooter />
        </>
    );
}
