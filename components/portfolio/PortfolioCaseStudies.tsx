"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight, ArrowRight, Eye, Clock, DollarSign, Zap, BarChart } from 'lucide-react';

// Case study interface
interface CaseStudy {
    id: string;
    client: string;
    industry: string;
    challenge: string;
    approach: string;
    results: {
        metric: string;
        before: string;
        after: string;
        improvement: string;
        timeframe: string;
    }[];
    testimonial?: {
        quote: string;
        author: string;
        position: string;
    };
    imageBefore: string;
    imageAfter: string;
}

// Case studies data
const CASE_STUDIES: CaseStudy[] = [
    {
        id: "saas-premium-positioning",
        client: "TechVantage",
        industry: "Enterprise SaaS",
        challenge: "Despite superior features and technology, the company struggled with lower pricing power and longer sales cycles compared to less capable competitors.",
        approach: "Restructured the perception framework by realigning symbolic elements that signal premium positioning and crafted a strategic narrative that highlighted their unique value proposition.",
        results: [
            {
                metric: "Premium Tier Adoption",
                before: "12%",
                after: "47%",
                improvement: "+292%",
                timeframe: "90 days"
            },
            {
                metric: "Sales Cycle Length",
                before: "68 days",
                after: "31 days",
                improvement: "-54%",
                timeframe: "60 days"
            },
            {
                metric: "Price Point",
                before: "$1,200/mo",
                after: "$2,750/mo",
                improvement: "+129%",
                timeframe: "6 months"
            }
        ],
        testimonial: {
            quote: "Our technical excellence was finally recognized in the market. We're now positioned as the premium solution we've always been, with pricing that reflects our true value.",
            author: "Michael Torres",
            position: "CRO, TechVantage"
        },
        imageBefore: "/case-xora-before.jpg",
        imageAfter: "/case-xora-after.jpg"
    },
    {
        id: "ecommerce-premium-conversion",
        client: "Artisana",
        industry: "Premium E-commerce",
        challenge: "High-quality products were being perceived as overpriced, resulting in excessive discount requests and abandoned carts despite superior craftsmanship.",
        approach: "Implemented perception-value alignment through visual hierarchy reconstruction and strategic information sequencing to properly signal quality justification.",
        results: [
            {
                metric: "Average Order Value",
                before: "$89",
                after: "$157",
                improvement: "+76%",
                timeframe: "45 days"
            },
            {
                metric: "Discount Requests",
                before: "47% of carts",
                after: "8% of carts",
                improvement: "-83%",
                timeframe: "30 days"
            },
            {
                metric: "Cart Abandonment",
                before: "78%",
                after: "42%",
                improvement: "-46%",
                timeframe: "60 days"
            }
        ],
        testimonial: {
            quote: "We've finally solved our pricing perception problem. Customers now recognize our quality before seeing the price, completely changing their purchasing behavior.",
            author: "Elena Kim",
            position: "Founder, Artisana"
        },
        imageBefore: "/case-ipe-before.jpg",
        imageAfter: "/case-ipe-after.jpg"
    },
    {
        id: "consulting-authority-positioning",
        client: "StratCore Advisors",
        industry: "Management Consulting",
        challenge: "Despite deep expertise and exceptional client outcomes, the firm struggled to differentiate from competitors and command premium rates.",
        approach: "Developed a comprehensive authority positioning framework that properly signaled their intellectual capital and restructured their client journey.",
        results: [
            {
                metric: "Proposal Acceptance Rate",
                before: "23%",
                after: "64%",
                improvement: "+178%",
                timeframe: "90 days"
            },
            {
                metric: "Average Project Value",
                before: "$45K",
                after: "$87K",
                improvement: "+93%",
                timeframe: "6 months"
            },
            {
                metric: "Inbound Lead Quality",
                before: "17% qualified",
                after: "58% qualified",
                improvement: "+241%",
                timeframe: "4 months"
            }
        ],
        testimonial: {
            quote: "The transformation in how prospects perceive us has been remarkable. We're no longer competing on price but instead are sought out specifically for our expertise.",
            author: "Jonathan Mercer",
            position: "Managing Partner, StratCore"
        },
        imageBefore: "/case-thumb-api.png",
        imageAfter: "/case-thumb-xora.png"
    }
];

export default function PortfolioCaseStudies() {
    const [activeCase, setActiveCase] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const currentCase = CASE_STUDIES[activeCase];

    return (
        <section
            id="case-studies"
            ref={containerRef}
            className="py-24 bg-white"
        >
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span className="text-blue-600 text-sm font-medium uppercase tracking-wider">Proven Results</span>
                    <h2 className="text-4xl font-serif text-neutral-900 mt-2 mb-4">
                        Perception-Value Alignment in Action
                    </h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
                        These case studies demonstrate how aligning market perception with actual value
                        creates measurable financial impact across different industries.
                    </p>
                </motion.div>

                {/* Case study navigation */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-3">
                        {CASE_STUDIES.map((study, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveCase(index)}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeCase === index
                                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-600 shadow-sm'
                                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                            >
                                {study.client}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Case study content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-xl"
                    >
                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Visual transformation */}
                            <div className="relative h-[400px] md:h-auto">
                                <div className="relative h-full overflow-hidden">
                                    <Image
                                        src={currentCase.imageBefore}
                                        alt={`${currentCase.client} - Before`}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-transparent flex items-center">
                                        <div className="px-6 py-3 max-w-xs">
                                            <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-xs font-medium inline-block mb-2">BEFORE</span>
                                            <h3 className="text-white text-xl font-medium mb-2">Perception Issue</h3>
                                            <p className="text-neutral-300 text-sm">
                                                Value not properly represented through symbolic elements
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-[400px] md:h-auto">
                                <div className="relative h-full overflow-hidden">
                                    <Image
                                        src={currentCase.imageAfter}
                                        alt={`${currentCase.client} - After`}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-transparent flex items-center">
                                        <div className="px-6 py-3 max-w-xs">
                                            <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-xs font-medium inline-block mb-2">AFTER</span>
                                            <h3 className="text-white text-xl font-medium mb-2">Value Alignment</h3>
                                            <p className="text-neutral-300 text-sm">
                                                Proper perception signaling of actual delivered value
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-10 bg-white">
                            <div className="flex flex-col md:flex-row gap-10">
                                {/* Case details */}
                                <div className="md:w-1/2">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="text-sm text-neutral-500">{currentCase.industry}</span>
                                            <h3 className="text-3xl font-serif text-neutral-900">{currentCase.client}</h3>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-lg font-medium text-neutral-900 mb-3">The Challenge</h4>
                                        <p className="text-neutral-700">{currentCase.challenge}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-medium text-neutral-900 mb-3">Strategic Approach</h4>
                                        <p className="text-neutral-700">{currentCase.approach}</p>
                                    </div>

                                    {currentCase.testimonial && (
                                        <div className="mt-8 bg-neutral-50 p-6 rounded-lg border border-neutral-100">
                                            <p className="text-neutral-700 italic mb-4">"{currentCase.testimonial.quote}"</p>
                                            <div className="flex items-center">
                                                <div>
                                                    <p className="text-neutral-900 font-medium">{currentCase.testimonial.author}</p>
                                                    <p className="text-neutral-500 text-sm">{currentCase.testimonial.position}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Results */}
                                <div className="md:w-1/2">
                                    <h4 className="text-lg font-medium text-neutral-900 mb-6">Measured Impact</h4>
                                    <div className="space-y-6">
                                        {currentCase.results.map((result, index) => (
                                            <div
                                                key={index}
                                                className="bg-neutral-50 rounded-xl border border-neutral-100 p-6"
                                            >
                                                <h5 className="text-neutral-900 font-medium mb-4">{result.metric}</h5>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <span className="text-neutral-500 text-sm block mb-1">Before</span>
                                                        <span className="text-neutral-700 text-xl font-mono">{result.before}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-neutral-500 text-sm block mb-1">After</span>
                                                        <span className="text-neutral-700 text-xl font-mono">{result.after}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <BarChart className="h-4 w-4 text-blue-600 mr-2" />
                                                        <span className="text-blue-600 font-medium">{result.improvement}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock className="h-4 w-4 text-neutral-500 mr-2" />
                                                        <span className="text-neutral-500 text-sm">{result.timeframe}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Call to action */}
                <div className="mt-16 text-center">
                    <a
                        href="#contact"
                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                        Discuss your project
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
