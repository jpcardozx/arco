'use client'

import { ModernNavigation } from "../components/layout/ModernNavigation";
import { ModernHero } from "../components/sections/ModernHero";
import { ValueProposition } from "../components/sections/ValuePropositionNew";
import { ProvenResults } from "../components/sections/ProvenResults";
import { BusinessMetrics } from "../components/sections/BusinessMetrics";
import { StrategicServices } from "../components/sections/StrategicServices";
import { ModernFooter } from "../components/layout/ModernFooter";
import { StructuredData } from "../components/seo/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <ModernNavigation />      <ModernHero />
      <ValueProposition />
      <ProvenResults />
      <BusinessMetrics />
      <StrategicServices />
      <ModernFooter />
    </>
  );
}
