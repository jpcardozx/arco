'use client'

import { StrategicNavigation } from "../components/layout/StrategicNavigation";
import { Hero } from "../components/sections/Hero";
import { ProfessionalCaseStudies } from "../components/sections/ProfessionalCaseStudies";
import { RevolutionaryPricing } from "../components/sections/RevolutionaryPricing";
import { PremiumFooter } from "../components/layout/PremiumFooter";
import { StructuredData } from "../components/seo/StructuredData";

export default function Home() {
    return (
        <>
            <StructuredData />
            <StrategicNavigation />
            <Hero />
            <ProfessionalCaseStudies />
            <RevolutionaryPricing />
            <PremiumFooter />
        </>
    );
}
