'use client'

import React from 'react'
import Head from 'next/head'
import { StrategicNavigation } from '@/components/layout/StrategicNavigation'
import { PremiumFooter } from '@/components/layout/PremiumFooter'
import { StrategicPartnerHero } from '@/components/partners/StrategicPartnerHero'
import { StrategicContentSection } from '@/components/partners/StrategicContentSection'
import { StrategicAboutSectionNew } from '@/components/partners/StrategicAboutSectionNew'
import FechamentoArco from '../../../components/partners/FechamentoArco'

const JPCardozxPartnerPage = () => {
    return (
        <>            <Head>
            <title>João Pedro Cardozo + ARCO | Strategic Partnership in Revenue Engineering</title>
            <meta name="description" content="Where 10+ years of conversion engineering expertise meets ARCO's systematic methodology. Real results: $380k revenue in 6 weeks, 287% conversion improvements." />
            <meta name="keywords" content="conversion engineering, ARCO methodology, revenue optimization, performance engineering, symbolic alignment, business transformation" />
            <meta property="og:title" content="Professional Intersection | Experience + Systematic Methodology" />
            <meta property="og:description" content="How personal expertise enhances ARCO's systematic approach to revenue recovery and business optimization." />
            <meta property="og:type" content="website" />
        </Head>            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "João Pedro Cardozo + ARCO Strategic Partnership",
                        "description": "Professional intersection where conversion engineering expertise meets systematic business methodology",
                        "provider": {
                            "@type": "Person",
                            "name": "João Pedro Cardozo",
                            "jobTitle": "Conversion Engineering Specialist + ARCO Methodology Partner"
                        },
                        "serviceType": "Strategic Business Optimization",
                        "areaServed": "Global",
                        "offers": [
                            {
                                "@type": "Offer",
                                "name": "Professional Intersection Analysis",
                                "price": "147",
                                "priceCurrency": "USD",
                                "description": "48h analysis combining personal expertise with ARCO methodology"
                            },
                            {
                                "@type": "Offer",
                                "name": "Strategic Implementation",
                                "price": "1197-4997",
                                "priceCurrency": "USD",
                                "description": "Full implementation of intersection methodology for measurable revenue recovery"
                            }
                        ]
                    })
                }}
            />

            <StrategicNavigation />
            <StrategicPartnerHero />
            <StrategicAboutSectionNew />
            <StrategicContentSection />
            <FechamentoArco />
            <PremiumFooter />
        </>
    )
}

export default JPCardozxPartnerPage