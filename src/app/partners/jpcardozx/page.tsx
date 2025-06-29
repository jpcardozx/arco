'use client'

import React from 'react'
import Head from 'next/head'
import PersonalNavigation from '@/components/layout/PersonalNavigation'
import { PremiumFooter } from '@/components/layout/PremiumFooter'
import { PersonalBrandHero } from '@/components/partners/PersonalBrandHero'
import { ExpertiseMethodologySection } from '@/components/partners/ExpertiseMethodologySection'
import { PersonalBrandCredibilityWidget } from '@/components/partners/PersonalBrandCredibilityWidget'
import { TechnicalSpecificationsCard } from '@/components/partners/TechnicalSpecificationsCard'
import FechamentoArco from '../../../components/partners/FechamentoArco'

const JPCardozxPartnerPage = () => {
    return (
        <>            <Head>
            <title>Pedro Cardozo | Conversion Optimizing & Revenue Recovery</title>
            <meta name="description" content="Helping $2M-$50M companies recover revenue lost to conversion friction. Real results: 1.9% → 8.2% mobile conversion, $380k revenue in 6 weeks using ARCO methodology." />
            <meta name="keywords" content="conversion engineering, revenue recovery, performance optimization, mobile conversion, funnel optimization, ARCO methodology" />
            <meta property="og:title" content="João Pedro Cardozo | Revenue Recovery Specialist" />
            <meta property="og:description" content="Systematic conversion optimization that recovers revenue lost to funnel friction and performance issues." />
            <meta property="og:type" content="website" />
        </Head>            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "João Pedro Cardozo Revenue Recovery Services",
                        "description": "Conversion engineering specialist helping companies recover revenue lost to funnel friction and performance issues",
                        "provider": {
                            "@type": "Person",
                            "name": "João Pedro Cardozo",
                            "jobTitle": "Conversion Engineering & Revenue Recovery Specialist"
                        },
                        "serviceType": "Revenue Recovery & Conversion Optimization",
                        "areaServed": "Global",
                        "offers": [
                            {
                                "@type": "Offer",
                                "name": "Revenue Recovery Assessment",
                                "price": "0",
                                "priceCurrency": "USD",
                                "description": "Complimentary assessment identifying revenue leaks and optimization opportunities"
                            },
                            {
                                "@type": "Offer",
                                "name": "Conversion Optimization Implementation",
                                "description": "Systematic implementation of revenue recovery improvements using ARCO methodology"
                            }
                        ]
                    })
                }}
            />

            <PersonalNavigation />
            <PersonalBrandHero />
            <PersonalBrandCredibilityWidget />
            <ExpertiseMethodologySection />
            <TechnicalSpecificationsCard />
            <FechamentoArco />
            <PremiumFooter />
        </>
    )
}

export default JPCardozxPartnerPage