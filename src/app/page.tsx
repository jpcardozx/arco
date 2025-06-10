'use client'

import { ARCONavigation } from "../components/layout/ARCONavigation";
import { ARCOHero } from "../components/sections/ARCOHero";
import { ValueProposition } from "../components/sections/ValueProposition";
import { IMPACTFramework } from "../components/sections/IMPACTFramework";
import { CaseStudies } from "../components/sections/CaseStudies";
import { ARCOFooter } from "../components/layout/ARCOFooter";

export default function Home() {
  return (
    <>
      <ARCONavigation />
      <ARCOHero />
      <ValueProposition />
      <IMPACTFramework />
      <CaseStudies />
      <ARCOFooter />
    </>
  );
}
