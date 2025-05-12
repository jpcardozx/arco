'use client'

import { useState } from 'react';
import NavBarEnhanced from "../../components/NavBarEnhanced";
import DesignCompare from "../../components/DesignCompare";

// Enhanced components with improved UI/UX and business-focused narrative
import HeroARCOEnhanced from "../../components/HeroARCOEnhanced";
import CaseStudiesEnhanced from "../../components/CaseStudiesEnhanced";
import ProcessEnhanced from "../../components/ProcessEnhanced";
import EnhancedCTA from "../../components/EnhancedCTA";
import FooterARCORevised from "../../components/FooterARCORevised";

// Component that integrates all the enhanced sections
export default function Home() {
    return (
        <>
            <NavBarEnhanced />
            <main className="overflow-x-hidden">
                <HeroARCOEnhanced />
                <ProcessEnhanced />
                <CaseStudiesEnhanced />
                <EnhancedCTA />
                <FooterARCORevised />
            </main>
            <DesignCompare />
        </>
    );
}
