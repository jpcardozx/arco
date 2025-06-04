'use client'

import React, { useEffect } from 'react'
import NavBarEnhanced from '../../../components/NavBarEnhanced'
import FooterARCORevised from '../../../components/FooterARCORevised'
import { trackPageView, trackFunnelStep } from '../../../lib/analytics'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BarChart2, TrendingUp, Clock } from 'lucide-react'

export default function CaseStudiesPage() {
    useEffect(() => {
        // Track page view and funnel step
        trackPageView('case-studies-page', {
            version: 'enhanced',
            designSystem: 'arco-design-v3'
        });

        trackFunnelStep('case-studies', 'view', 1, {
            entryPoint: document.referrer || 'direct'
        });
    }, []);

    const caseStudies = [{
        id: 'techzone',
        title: 'TechZone Brasil',
        industry: 'Electronics E-commerce',
        challenge: '27% abandonment rate at final checkout due to form validation issues and slow payment processing.',
        solution: 'Checkout process optimization with real-time validation and payment data pre-loading.',
        results: [
            { metric: '+39%', label: 'Increase in checkout completion rate' },
            { metric: '2.8s', label: 'Reduction in checkout time' },
            { metric: '$43k', label: 'Monthly revenue increase' }
        ],
        image: '/case-thumb-ipe.png',
        testimonial: {
            quote: "In just 3 weeks, ARCO's optimizations recovered 27% of the sales we were losing at checkout. It was like hiring an entire optimization team, but with much faster and more objective results.",
            author: "Ricardo Mendes",
            role: "E-commerce Director"
        }
    }, {
        id: 'cursosja',
        title: 'CursosJá',
        industry: 'Online Education Platform',
        challenge: 'High dropout rates during course enrollment process due to a complex and slow-to-fill form.',
        solution: 'Redesign of enrollment flow with multi-step form and automatic progress saving.',
        results: [
            { metric: '+52%', label: 'Increase in completed enrollments' },
            { metric: '-76%', label: 'Reduction in support tickets' },
            { metric: '428', label: 'New monthly enrollments' }
        ],
        image: '/case-thumb-api.png',
        testimonial: {
            quote: "We had no idea how much money we were leaving on the table. ARCO's diagnostic showed that 42% of our visitors were giving up on the last step due to a simple technical problem that was fixed in two days.",
            author: "Fernanda Oliveira",
            role: "CMO"
        }
    },
    {
        id: 'softexpert', title: 'SoftExpert',
        industry: 'SaaS B2B',
        challenge: 'Low conversion on product demonstration page with users abandoning before completing the request.',
        solution: 'Implementation of progressive form and proactive chat based on user behavior.',
        results: [
            { metric: '+31%', label: 'Increase in requested demonstrations' },
            { metric: '+18%', label: 'Improvement in marketing ROI' },
            { metric: '-1.9s', label: 'Reduction in loading time' }
        ],
        image: '/case-thumb-xora.png',
        testimonial: {
            quote: "My development team always prioritized new features, never optimization. ARCO showed us, with concrete data, that small technical adjustments generated a revenue increase greater than the last 3 releases combined.",
            author: "Thiago Almeida",
            role: "CEO"
        }
    }
    ];

    return (
        <>
            <NavBarEnhanced />

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-neutral-900 to-blue-900 text-white py-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-blue-800 text-blue-300 text-sm font-medium mb-6">
                            Proven Results
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Transformation and Growth Stories</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            See how we've helped companies like yours eliminate obstacles and recover lost revenue with strategic technical optimizations.
                        </p>
                    </div>

                    {/* Overview metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                            <TrendingUp className="h-8 w-8 text-blue-400 mb-3" />
                            <p className="text-3xl font-bold text-white">+35%</p>
                            <p className="text-sm text-blue-200">Average increase in conversions</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                            <BarChart2 className="h-8 w-8 text-green-400 mb-3" />
                            <p className="text-3xl font-bold text-white">$2.4M+</p>
                            <p className="text-sm text-blue-200">Additional revenue generated</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                            <Clock className="h-8 w-8 text-purple-400 mb-3" />
                            <p className="text-3xl font-bold text-white">14 days</p>
                            <p className="text-sm text-blue-200">Average time to results</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                            <svg viewBox="0 0 24 24" className="h-8 w-8 text-yellow-400 mb-3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2554 20.3766 17.7644 20.3766 18.295C20.3766 18.8256 20.1656 19.3346 19.79 19.71C19.4146 20.0856 18.9055 20.2966 18.375 20.2966C17.8445 20.2966 17.3354 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4785 19.5791 14.0986 20.1724 14.1 20.82V21C14.1 21.5304 13.8893 22.0391 13.5142 22.4142C13.1391 22.7893 12.6304 23 12.1 23C11.5695 23 11.0608 22.7893 10.6857 22.4142C10.3107 22.0391 10.1 21.5304 10.1 21V20.91C10.0903 20.2495 9.68825 19.6532 9.06 19.4C8.44288 19.1277 7.72225 19.2583 7.23999 19.73L7.17999 19.79C6.80458 20.1656 6.29557 20.3766 5.76499 20.3766C5.2344 20.3766 4.7254 20.1656 4.34999 19.79C3.97438 19.4146 3.76339 18.9055 3.76339 18.375C3.76339 17.8445 3.97438 17.3354 4.34999 16.96L4.40999 16.9C4.88168 16.4178 5.01227 15.6971 4.73999 15.08C4.48091 14.4785 3.8876 14.0986 3.23999 14.1H3.09999C2.5695 14.1 2.06079 13.8893 1.68571 13.5142C1.31064 13.1391 1.09999 12.6304 1.09999 12.1C1.09999 11.5695 1.31064 11.0608 1.68571 10.6857C2.06079 10.3107 2.5695 10.1 3.09999 10.1H3.18999C3.85045 10.0903 4.44679 9.68825 4.69999 9.06C4.97227 8.44288 4.84168 7.72225 4.36999 7.24L4.30999 7.18C3.93438 6.80458 3.72339 6.29557 3.72339 5.76499C3.72339 5.2344 3.93438 4.7254 4.30999 4.34999C4.6854 3.97438 5.1944 3.76339 5.72499 3.76339C6.25557 3.76339 6.76458 3.97438 7.13999 4.34999L7.19999 4.41C7.68225 4.88168 8.40288 5.01227 9.01999 4.74C9.62148 4.48092 10.0014 3.8876 9.99999 3.24V3.1C9.99999 2.56951 10.2107 2.06081 10.5857 1.68573C10.9608 1.31065 11.4695 1.1 12 1.1C12.5304 1.1 13.0391 1.31065 13.4142 1.68573C13.7893 2.06081 14 2.56951 14 3.1V3.19C13.9986 3.8376 14.3785 4.43086 14.98 4.69C15.5971 4.96227 16.3178 4.83168 16.8 4.36L16.86 4.3C17.2354 3.92438 17.7444 3.71339 18.275 3.71339C18.8055 3.71339 19.3146 3.92438 19.69 4.3C20.0656 4.67541 20.2766 5.18442 20.2766 5.715C20.2766 6.24558 20.0656 6.75459 19.69 7.13L19.63 7.19C19.1583 7.67225 19.0277 8.39288 19.3 9.01C19.5591 9.61148 20.1524 9.99139 20.8 9.99V10.09C20.8 10.6205 20.5893 11.1292 20.2142 11.5043C19.8391 11.8793 19.3304 12.09 18.8 12.09H18.71C18.0496 12.0997 17.4532 12.5017 17.2 13.13C16.9277 13.7471 17.0583 14.4678 17.53 14.95L17.59 15.01C17.9656 15.3854 18.1766 15.8944 18.1766 16.425C18.1766 16.9556 17.9656 17.4646 17.59 17.84C17.2146 18.2156 16.7055 18.4266 16.175 18.4266C15.6445 18.4266 15.1354 18.2156 14.76 17.84L14.7 17.78C14.2178 17.3083 13.4971 17.1777 12.88 17.45C12.2785 17.7091 11.8986 18.3024 11.9 18.95V19C11.9 19.5304 11.6893 20.0391 11.3142 20.4142C10.9391 20.7893 10.4304 21 9.89999 21C9.3695 21 8.86079 20.7893 8.48571 20.4142C8.11064 20.0391 7.89999 19.5304 7.89999 19V18.91C7.91016 18.2516 7.5303 17.6583 6.92999 17.4C6.31288 17.1277 5.59225 17.2583 5.10999 17.73L5.04999 17.79C4.67458 18.1656 4.16557 18.3766 3.63499 18.3766C3.1044 18.3766 2.5954 18.1656 2.21999 17.79C1.84438 17.4146 1.63339 16.9055 1.63339 16.375C1.63339 15.8445 1.84438 15.3354 2.21999 14.96L2.27999 14.9C2.75168 14.4178 2.88227 13.6971 2.60999 13.08C2.35091 12.4785 1.7576 12.0986 1.10999 12.1H0.999988C0.469501 12.1 -0.0392075 11.8893 -0.414284 11.5142C-0.789361 11.1391 -1 10.6304 -1 10.1C-1 9.56951 -0.789361 9.06081 -0.414284 8.68573C-0.0392075 8.31065 0.469501 8.1 0.999988 8.1H1.08999C1.7576 8.10139 2.35091 7.72148 2.60999 7.12C2.88227 6.50288 2.75168 5.78225 2.27999 5.3L2.21999 5.24C1.84438 4.86458 1.63339 4.35558 1.63339 3.82499C1.63339 3.29441 1.84438 2.7854 2.21999 2.40999C2.5954 2.03438 3.1044 1.82339 3.63499 1.82339C4.16557 1.82339 4.67458 2.03438 5.04999 2.40999L5.10999 2.47C5.59225 2.94168 6.31288 3.07227 6.92999 2.8H6.99999C7.6015 2.54091 7.98139 1.94761 7.97999 1.29999V1.09999C7.97999 0.569501 8.19064 0.0607925 8.56571 -0.313787C8.94079 -0.688363 9.4495 -0.899994 9.97999 -0.899994C10.5105 -0.899994 11.0192 -0.688363 11.3943 -0.313787C11.7693 0.0607925 11.98 0.569501 11.98 1.09999V1.19C11.9786 1.83761 12.3585 2.43087 12.96 2.69C13.5771 2.96227 14.2978 2.83168 14.78 2.36L14.84 2.29999C15.2154 1.92438 15.7244 1.71339 16.255 1.71339C16.7855 1.71339 17.2946 1.92438 17.67 2.29999C18.0456 2.67541 18.2566 3.18441 18.2566 3.71499C18.2566 4.24558 18.0456 4.75458 17.67 5.12999L17.61 5.18999C17.1383 5.67225 17.0077 6.39288 17.28 6.99999C17.5391 7.60148 18.1324 7.98139 18.78 7.97999H18.9C19.4305 7.97999 19.9392 8.19064 20.3143 8.56572C20.6893 8.9408 20.9 9.4495 20.9 9.97999C20.9 10.5105 20.6893 11.0192 20.3143 11.3943C19.9392 11.7693 19.4305 11.98 18.9 11.98H18.81C18.1524 11.9814 17.5591 12.3613 17.3 12.96C17.0277 13.5771 17.1583 14.2978 17.63 14.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-3xl font-bold text-white">127+</p>
                            <p className="text-sm text-blue-200">Completed projects</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    {caseStudies.map((caseStudy, index) => (
                        <div key={caseStudy.id} className={`mb-20 ${index !== caseStudies.length - 1 ? 'border-b border-neutral-200 pb-20' : ''}`}>
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                    <div className="inline-flex items-center justify-center h-8 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-6">
                                        {caseStudy.industry}
                                    </div>
                                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">{caseStudy.title}</h2>

                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-neutral-800 mb-2">The Challenge</h3>
                                        <p className="text-neutral-600">{caseStudy.challenge}</p>
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-neutral-800 mb-2">Our Solution</h3>
                                        <p className="text-neutral-600">{caseStudy.solution}</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        {caseStudy.results.map((result, i) => (
                                            <div key={i} className="bg-blue-50 rounded-lg p-4 text-center">
                                                <p className="text-2xl font-bold text-blue-700">{result.metric}</p>
                                                <p className="text-xs text-neutral-600">{result.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                    <div className="relative rounded-xl overflow-hidden shadow-xl">
                                        <Image
                                            src={caseStudy.image}
                                            alt={caseStudy.title}
                                            width={600}
                                            height={400}
                                            className="object-cover w-full"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                            <div className="p-6">
                                                <blockquote className="text-white text-lg font-medium mb-4">
                                                    "{caseStudy.testimonial.quote.substring(0, 100)}..."
                                                </blockquote>
                                                <div className="text-white/80">
                                                    <p className="font-medium">{caseStudy.testimonial.author}</p>
                                                    <p className="text-sm">{caseStudy.testimonial.role}, {caseStudy.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Want results like these for your company?
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
                        Discover how we can transform your platform's technical issues into revenue growth opportunities.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="bg-white text-blue-900 hover:bg-blue-50 transition-colors py-4 px-8 rounded-lg font-medium">
                            Implement similar solution
                        </Link>
                        <Link href="/diagnose" className="bg-blue-800 hover:bg-blue-700 text-white transition-colors py-4 px-8 rounded-lg font-medium">
                            Get free diagnostic
                        </Link>
                    </div>
                </div>
            </section>

            <FooterARCORevised />
        </>
    )
}
