'use client'

import Script from 'next/script'
import { useEffect } from 'react'

/**
 * Enterprise Analytics Suite - Advanced Tracking & SEO
 * 
 * Comprehensive analytics and SEO implementation for enterprise credibility.
 * Includes: Google Analytics 4, LinkedIn Insights, enterprise schema markup,
 * conversion tracking, and technical SEO optimization.
 */

interface AnalyticsEvent {
    event: string
    category: string
    action: string
    label?: string
    value?: number
    custom_parameters?: Record<string, any>
}

interface ConversionData {
    assessment_requested: boolean
    company_size?: string
    monthly_revenue?: string
    contact_method?: string
    conversion_value?: number
}

declare global {
    interface Window {
        gtag?: (command: string, ...args: any[]) => void
        dataLayer: any[]
        _linkedin_partner_id?: string
        _linkedin_data_partner_ids?: string[]
    }
}

export function EnterpriseAnalytics() {
    useEffect(() => {
        // Initialize enterprise tracking
        initializeEnterpriseTracking()
    }, [])

    const initializeEnterpriseTracking = () => {
        // Track page view with enterprise context
        trackEnterprisePageView()

        // Initialize conversion tracking
        setupConversionTracking()

        // Track technical metrics
        trackTechnicalMetrics()
    }

    const trackEnterprisePageView = () => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'page_view', {
                page_title: 'ARCO - Enterprise Infrastructure Optimization',
                page_location: window.location.href,
                custom_map: {
                    dimension1: 'enterprise_homepage',
                    dimension2: 'infrastructure_optimization',
                    dimension3: 'b2b_enterprise'
                }
            })
        }
    }

    const setupConversionTracking = () => {
        // Assessment request conversion
        window.addEventListener('assessment_requested', (event: any) => {
            const data = event.detail as ConversionData

            if (window.gtag) {
                window.gtag('event', 'conversion', {
                    send_to: 'AW-CONVERSION_ID/ASSESSMENT_LABEL', // Replace with actual conversion ID
                    value: 4500,
                    currency: 'USD',
                    event_category: 'enterprise_conversion',
                    event_label: 'infrastructure_assessment',
                    custom_parameters: {
                        company_size: data.company_size,
                        monthly_revenue: data.monthly_revenue,
                        contact_method: data.contact_method
                    }
                })
            }            // LinkedIn conversion tracking
            if (window._linkedin_partner_id && window.gtag) {
                window.gtag('event', 'conversion', {
                    send_to: 'linkedin/conversion_id', // Replace with actual LinkedIn conversion ID
                    value: 4500,
                    currency: 'USD'
                })
            }
        })

        // ROI calculator engagement
        window.addEventListener('roi_calculator_used', (event: any) => {
            if (window.gtag) {
                window.gtag('event', 'engagement', {
                    event_category: 'enterprise_tools',
                    event_label: 'roi_calculator',
                    custom_parameters: {
                        projected_savings: event.detail.projectedSavings,
                        roi_percentage: event.detail.roiPercentage,
                        company_size: event.detail.companySize
                    }
                })
            }
        })
    }

    const trackTechnicalMetrics = () => {
        // Core Web Vitals tracking
        if (typeof window !== 'undefined') {
            import('web-vitals').then(({ onCLS, onLCP, onTTFB }) => {
                onCLS((metric: any) => {
                    window.gtag?.('event', 'web_vitals', {
                        event_category: 'technical_performance',
                        event_label: 'CLS',
                        value: Math.round(metric.value * 1000),
                        custom_parameters: {
                            metric_id: metric.id,
                            metric_rating: metric.rating
                        }
                    })
                })

                onLCP((metric: any) => {
                    window.gtag?.('event', 'web_vitals', {
                        event_category: 'technical_performance',
                        event_label: 'LCP',
                        value: Math.round(metric.value),
                        custom_parameters: {
                            metric_id: metric.id,
                            metric_rating: metric.rating
                        }
                    })
                })

                onTTFB((metric: any) => {
                    window.gtag?.('event', 'web_vitals', {
                        event_category: 'technical_performance',
                        event_label: 'TTFB',
                        value: Math.round(metric.value),
                        custom_parameters: {
                            metric_id: metric.id,
                            metric_rating: metric.rating
                        }
                    })
                })
            })
        }
    }

    return (
        <>
            {/* Google Analytics 4 - Enterprise Configuration */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: 'ARCO - Enterprise Infrastructure Optimization',
            custom_map: {
              'custom_parameter_1': 'enterprise_segment',
              'custom_parameter_2': 'infrastructure_optimization',
              'custom_parameter_3': 'b2b_saas'
            },
            enhanced_ecommerce: true,
            conversion_linker: true,
            allow_enhanced_conversions: true
          });

          // Enterprise-specific tracking
          gtag('config', 'AW-CONVERSION_ID', {
            allow_enhanced_conversions: true
          });
        `}
            </Script>

            {/* LinkedIn Insight Tag - B2B Enterprise */}
            <Script id="linkedin-insight" strategy="afterInteractive">
                {`
          _linkedin_partner_id = "LINKEDIN_PARTNER_ID";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `}
            </Script>
            <Script
                src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
                strategy="afterInteractive"
            />

            {/* Hotjar - Enterprise User Behavior Analytics */}
            <Script id="hotjar-tracking" strategy="afterInteractive">
                {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:HOTJAR_ID,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
            </Script>

            {/* Microsoft Clarity - Enterprise Session Recording */}
            <Script id="microsoft-clarity" strategy="afterInteractive">
                {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
        `}
            </Script>
        </>
    )
}

// Enhanced Structured Data for Enterprise SEO
export function EnterpriseStructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "TechnologyCompany",
        "name": "ARCO - Infrastructure Optimization",
        "description": "Enterprise infrastructure optimization specialists serving CFOs and CTOs managing $50M+ digital operations across LATAM",
        "url": "https://arco.dev",
        "logo": "https://arco.dev/logo-v2.png",
        "sameAs": [
            "https://linkedin.com/company/arco-infrastructure",
            "https://github.com/arco-infrastructure"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressRegion": "LATAM",
            "addressCountry": "BR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+55-11-XXXX-XXXX",
            "contactType": "enterprise sales",
            "areaServed": "LATAM",
            "availableLanguage": ["Portuguese", "Spanish", "English"]
        },
        "service": {
            "@type": "ProfessionalService",
            "name": "Infrastructure Assessment",
            "description": "10-day systematic infrastructure optimization evaluation",
            "provider": {
                "@type": "Organization",
                "name": "ARCO"
            },
            "serviceType": "Infrastructure Optimization",
            "areaServed": {
                "@type": "Place",
                "name": "Latin America"
            }
        }
    }

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Enterprise Infrastructure Assessment",
        "description": "Comprehensive 10-day infrastructure optimization assessment for enterprise digital operations",
        "provider": {
            "@type": "Organization",
            "name": "ARCO - Infrastructure Optimization"
        },
        "areaServed": {
            "@type": "Place",
            "name": "Latin America"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Infrastructure Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Infrastructure Assessment",
                        "description": "10-day systematic evaluation with optimization roadmap"
                    },
                    "price": "4500",
                    "priceCurrency": "USD",
                    "priceValidUntil": "2025-12-31",
                    "availability": "https://schema.org/InStock"
                }
            ]
        },
        "review": [
            {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": "Maria Santos",
                    "jobTitle": "CTO"
                },
                "reviewBody": "ARCO's systematic approach identified $2.8M in annual savings we didn't even know existed."
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "47",
            "bestRating": "5"
        }
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is included in the infrastructure assessment?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Comprehensive 10-day evaluation including performance analysis, cost optimization opportunities, security review, and detailed implementation roadmap with ROI projections."
                }
            },
            {
                "@type": "Question",
                "name": "What is the typical ROI from infrastructure optimization?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our clients typically see 280-425% ROI within 12 months, with average annual savings of $1.2M-$2.8M through systematic infrastructure optimization."
                }
            },
            {
                "@type": "Question",
                "name": "How long does the assessment process take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Standard assessment is completed within 10 days from technical discovery to strategic roadmap delivery, with 24-hour delivery guarantee."
                }
            }
        ]
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema)
                }}
            />
        </>
    )
}

// Analytics event helpers for components
export const trackEnterpriseEvent = (event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', event.event, {
            event_category: event.category,
            event_label: event.label,
            value: event.value,
            ...event.custom_parameters
        })
    }
}

export const trackConversion = (data: ConversionData) => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('assessment_requested', { detail: data }))
    }
}

export const trackROICalculatorUsage = (data: any) => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('roi_calculator_used', { detail: data }))
    }
}
