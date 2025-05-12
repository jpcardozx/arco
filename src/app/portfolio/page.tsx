'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Navbar from '../../../components/NavBar'
import FooterARCO from '../../../components/FooterARCO'
import EnhancedPortfolioHero from '../../../components/portfolio/EnhancedPortfolioHero'
import PortfolioExpertise from '../../../components/portfolio/PortfolioExpertise'
import PortfolioCaseStudies from '../../../components/portfolio/PortfolioCaseStudies'
import PortfolioMethodology from '../../../components/portfolio/PortfolioMethodology'
import PortfolioImpact from '../../../components/portfolio/PortfolioImpact'
import PortfolioCollaboration from '../../../components/portfolio/PortfolioCollaboration'
import ClientTestimonials from '../../../components/portfolio/ClientTestimonials'

// Portfolio page with a focus on communicating professional value
// and addressing potential objections with a premium, consistent design
export default function PortfolioPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Hero section with clear value proposition and professional positioning */}
                <EnhancedPortfolioHero />

                {/* Case studies with measurable results */}
                <PortfolioCaseStudies />

                {/* Expertise and specialization areas */}
                <PortfolioExpertise />

                {/* Methodology and approach */}
                <PortfolioMethodology />

                {/* Business impact metrics */}
                <PortfolioImpact />

                {/* Client testimonials and success stories */}
                <ClientTestimonials />

                {/* Collaboration process and next steps */}
                <PortfolioCollaboration />
            </main>
            <FooterARCO />
        </>
    )
}
