'use client'

import Image from "next/image";
import NavBar from "../../components/NavBar";
import HeroARCO from "../../components/HeroARCO";
import SymbolicAnchor from "../../components/SymbolicAnchor";
import TheMisalignment from "../../components/TheMisalignment";
import EditorialCTA from "../../components/EditorialCTA";
import HomepageFinalCoda from "../../components/HomePageFinalCoda";
import SymbolicVerdicts from "../../components/SymbolicVeredicts";
import FooterARCO from "../../components/FooterARCO";

export default function Home() {
  return (
    <>
      <NavBar />
      <HeroARCO />
      <SymbolicAnchor />
      <TheMisalignment />
      <EditorialCTA />
      <HomepageFinalCoda />
      <SymbolicVerdicts />
      <FooterARCO />
    </>
  );
}
