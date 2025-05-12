'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from '../lib/i18n-context'

export default function CaseStudiesEnhanced() {
    const { t } = useTranslation()
    const [activeCase, setActiveCase] = useState(0)
    const cases = [
        {
            client: "TechSolutions",
            industry: "SaaS / B2B",
            logo: "/case-thumb-api.png",
            challenge: "Loss of 32% of conversions due to slow checkout",
            solution: "Front-end optimization and payment flow reengineering",
            results: [
                "47% reduction in loading time",
                "31% increase in conversion rate",
                "+$35,700 in monthly revenue"
            ],
            quote: "ARCO identified bottlenecks we didn't know existed. The implementation was quick and the financial impact immediate.",
            person: "Marina Silva, CTO",
            image: "/hero-funnel-heatmap-arco.png",
            color: "from-blue-600 to-indigo-600"
        },
        {
            client: "EduTech Plus",
            industry: "Online Education",
            logo: "/logoXora.svg",
            challenge: "62% abandonment during the enrollment process",
            solution: "Registration journey remapping and UX optimization",
            results: [
                "58% fewer funnel abandonments",
                "2.3s reduction in response time",
                "+$43,000 in quarterly revenue"
            ],
            quote: "We achieved results that no marketing campaign had ever achieved before. The ROI was exceptional.",
            person: "Robert Torres, CEO",
            image: "/hero-case-mosaic-3.png",
            color: "from-emerald-600 to-blue-600"
        },
        {
            client: "Global Retail",
            industry: "E-commerce",
            logo: "/case-thumb-ipe.png",
            challenge: "27% drop in mobile sales due to poor performance",
            solution: "Core Web Vitals fixes and mobile optimization",
            results: [
                "42% improvement in CLS and LCP",
                "3.1x increase in retention",
                "+$29,400 in monthly mobile revenue"
            ],
            quote: "ARCO's method transformed our mobile experience with minimal disruption to our operations.",
            person: "Juliana Lee, Digital Director",
            image: "/hero-case-mosaic-2.png",
            color: "from-purple-600 to-pink-600"
        }
    ];

    const goToNext = () => setActiveCase((prev) => (prev === cases.length - 1 ? 0 : prev + 1));
    const goToPrevious = () => setActiveCase((prev) => (prev === 0 ? cases.length - 1 : prev - 1));

    return (
        <section id="case-studies" className="relative bg-neutral-950 py-24 px-4 text-white overflow-hidden">
            {/* Abstract background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-[10%] left-[20%] h-64 w-64 rounded-full bg-blue-800/30 blur-3xl" />
                <div className="absolute bottom-[15%] right-[10%] h-80 w-80 rounded-full bg-purple-800/30 blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-sm uppercase font-bold tracking-wider text-blue-400 mb-2">
                        {t('homepage.caseStudies.title')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                        {t('homepage.caseStudies.subtitle')}
                    </h2>
                </div>

                {/* Case studies carousel */}
                <div className="relative">
                    {/* Navigation buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 sm:-ml-6 z-20">
                        <button
                            onClick={goToPrevious}
                            className="bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full backdrop-blur-sm"
                            aria-label="Previous case study"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 sm:-mr-6 z-20">
                        <button
                            onClick={goToNext}
                            className="bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full backdrop-blur-sm"
                            aria-label="Next case study"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    {/* Case study content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCase}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
                        >
                            {/* Left column - Content */}
                            <div className="flex flex-col h-full">
                                <div className="mb-8 flex items-center">
                                    <div className="h-14 w-14 sm:h-16 sm:w-16 bg-white rounded-lg flex items-center justify-center overflow-hidden mr-4">
                                        <Image
                                            src={cases[activeCase].logo}
                                            alt={`${cases[activeCase].client} logo`}
                                            width={64}
                                            height={64}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{cases[activeCase].client}</h3>
                                        <p className="text-neutral-400">{cases[activeCase].industry}</p>
                                    </div>
                                </div>

                                <div className="bg-neutral-900 rounded-xl p-6 sm:p-8 mb-8 flex-grow">
                                    <div className="mb-6">
                                        <h4 className="font-medium text-neutral-400 mb-2">Challenge:</h4>
                                        <p className="text-lg font-medium">{cases[activeCase].challenge}</p>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="font-medium text-neutral-400 mb-2">Solution:</h4>
                                        <p className="text-lg font-medium">{cases[activeCase].solution}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-neutral-400 mb-2">Results:</h4>
                                        <ul className="space-y-2">
                                            {cases[activeCase].results.map((result, i) => (
                                                <li key={i} className="flex items-baseline">
                                                    <span className="text-green-500 mr-2">•</span>
                                                    <span className="text-lg font-medium">{result}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <blockquote className="italic text-neutral-300 border-l-2 border-blue-500 pl-4 mb-4">
                                        "{cases[activeCase].quote}"
                                    </blockquote>
                                    <p className="text-sm font-medium">— {cases[activeCase].person}</p>
                                </div>

                                <div className="mt-8">
                                    <a
                                        href="#"
                                        className={`inline-flex items-center px-5 py-2 rounded-lg bg-gradient-to-r ${cases[activeCase].color} hover:shadow-lg transition-all`}
                                    >
                                        <span>{t('homepage.caseStudies.viewCase')}</span>
                                        <ArrowRight size={16} className="ml-2" />
                                    </a>
                                </div>
                            </div>

                            {/* Right column - Image */}
                            <div className="relative h-[400px] lg:h-auto rounded-xl overflow-hidden">
                                <Image
                                    src={cases[activeCase].image}
                                    alt={`${cases[activeCase].client} case study`}
                                    fill
                                    className="object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-br ${cases[activeCase].color} opacity-40`} />

                                {/* Case indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                    {cases.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveCase(i)}
                                            className={`w-2 h-2 rounded-full transition-all ${i === activeCase ? "w-6 bg-white" : "bg-white/50 hover:bg-white/80"
                                                }`}
                                            aria-label={`Go to case study ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
