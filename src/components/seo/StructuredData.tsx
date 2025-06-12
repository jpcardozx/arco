'use client'

export function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ARCO Digital Performance Engineering",
        "url": "https://arco.digital",
        "logo": "https://arco.digital/logo-v2.png",
        "description": "Self-funding digital transformation projects with guaranteed ROI. We eliminate digital waste and convert operational inefficiencies into competitive advantages.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-ARCO-HELP",
            "contactType": "customer service",
            "areaServed": "US",
            "availableLanguage": "English"
        },
        "sameAs": [
            "https://linkedin.com/company/arco-digital",
            "https://twitter.com/ARCODigital"
        ]
    }

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Self-Funding Digital Transformation",
        "description": "Digital transformation projects that pay for themselves through eliminated waste and improved efficiency.",
        "provider": {
            "@type": "Organization",
            "name": "ARCO Digital Performance Engineering"
        },
        "offers": {
            "@type": "Offer",
            "name": "Performance Assessment",
            "description": "72-hour comprehensive analysis of digital waste and optimization opportunities",
            "price": "0",
            "priceCurrency": "USD"
        }
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How can digital transformation projects be self-funding?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our projects identify and eliminate existing digital waste (redundant tools, inefficient processes, failed initiatives) and redirect those savings to fund improvements. Most clients see ROI within 47 days."
                }
            },
            {
                "@type": "Question",
                "name": "What if the project doesn't deliver the promised ROI?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer a money-back guarantee. If our project doesn't deliver the promised ROI within 90 days, we refund 100% of your investment."
                }
            },
            {
                "@type": "Question",
                "name": "How quickly can you start?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer emergency intervention with 2-hour response time for critical situations. Standard engagements begin within 5 business days of the free assessment."
                }
            }
        ]
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    )
}
