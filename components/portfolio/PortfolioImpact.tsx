"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, ArrowUp, Clock, DollarSign, BarChart, TrendingUp, Users } from 'lucide-react';

// Impact metrics interface
interface ImpactMetric {
    id: string;
    title: string;
    icon: React.ReactNode;
    beforeLabel: string;
    afterLabel: string;
    change: string;
    positiveChange: boolean;
    description: string;
}

const IMPACT_METRICS: ImpactMetric[] = [
    {
        id: "conversion",
        title: "Conversion Rate",
        icon: <Users className="h-6 w-6" />,
        beforeLabel: "5.3%",
        afterLabel: "14.7%",
        change: "+177%",
        positiveChange: true,
        description: "Higher conversion rates as value perception aligns with actual delivered quality."
    },
    {
        id: "pricing",
        title: "Price Positioning",
        icon: <DollarSign className="h-6 w-6" />,
        beforeLabel: "Market avg.",
        afterLabel: "Premium tier",
        change: "+127%",
        positiveChange: true,
        description: "Increased pricing power as value is properly recognized before price consideration."
    },
    {
        id: "sales-cycle",
        title: "Sales Cycle",
        icon: <Clock className="h-6 w-6" />,
        beforeLabel: "47 days",
        afterLabel: "19 days",
        change: "-60%",
        positiveChange: true,
        description: "Accelerated decision making as value is communicated more efficiently from the start."
    },
    {
        id: "objections",
        title: "Pricing Objections",
        icon: <BarChart className="h-6 w-6" />,
        beforeLabel: "73% of leads",
        afterLabel: "18% of leads",
        change: "-75%",
        positiveChange: true,
        description: "Fewer pricing objections as perception properly sets value expectations."
    }
];

// Industry case study interface
interface IndustryImpact {
    id: string;
    industry: string;
    challenge: string;
    averageImprovement: string;
    metrics: {
        label: string;
        value: string;
    }[];
}

const INDUSTRY_IMPACTS: IndustryImpact[] = [
    {
        id: "saas",
        industry: "Enterprise SaaS",
        challenge: "Technical excellence not translating to premium positioning",
        averageImprovement: "+118% conversion to premium tiers",
        metrics: [
            { label: "Trial-to-paid conversion", value: "+83%" },
            { label: "Enterprise deal size", value: "+67%" },
            { label: "Sales objections", value: "-72%" }
        ]
    },
    {
        id: "ecommerce",
        industry: "Premium E-commerce",
        challenge: "High-quality products undermined by perception barriers",
        averageImprovement: "-58% cart abandonment rate",
        metrics: [
            { label: "Average order value", value: "+92%" },
            { label: "Return rate", value: "-47%" },
            { label: "Repeat purchases", value: "+76%" }
        ]
    },
    {
        id: "consulting",
        industry: "Professional Services",
        challenge: "Expertise not fully recognized in market positioning",
        averageImprovement: "+143% premium client acquisition",
        metrics: [
            { label: "Proposal acceptance rate", value: "+107%" },
            { label: "Client retention", value: "+38%" },
            { label: "Price positioning", value: "+87%" }
        ]
    },
    {
        id: "fintech",
        industry: "Financial Technology",
        challenge: "Complex value propositions creating friction",
        averageImprovement: "+95% user activation",
        metrics: [
            { label: "User upgrade rate", value: "+124%" },
            { label: "Feature adoption", value: "+78%" },
            { label: "Customer lifetime value", value: "+167%" }
        ]
    }
];

export default function PortfolioImpact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
        <section
            id="impact"
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
                    <span className="text-blue-600 text-sm font-medium uppercase tracking-wider">Measurable Results</span>
                    <h2 className="text-4xl font-serif text-neutral-900 mt-2 mb-4">
                        Economic Impact of Perception Engineering
                    </h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
                        Perception-value alignment creates predictable economic outcomes across diverse industries
                        and business models. These are the average results achieved for clients.
                    </p>
                </motion.div>

                {/* Impact metrics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {IMPACT_METRICS.map((metric, index) => (
                        <motion.div
                            key={metric.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-neutral-50 rounded-xl border border-neutral-100 p-6 shadow-sm"
                        >
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mr-3">
                                    {metric.icon}
                                </div>
                                <h3 className="text-xl font-medium text-neutral-900">{metric.title}</h3>
                            </div>

                            <div className="flex justify-between items-end mb-4">
                                <div className="text-center">
                                    <span className="block text-neutral-500 text-sm mb-1">Before</span>
                                    <span className="block text-neutral-700 font-mono text-lg">{metric.beforeLabel}</span>
                                </div>
                                <div className="flex flex-col items-center justify-center px-4">
                                    <div className={`flex items-center ${metric.positiveChange ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {metric.positiveChange ?
                                            <ArrowUp className="h-4 w-4 mr-1" /> :
                                            <ArrowDown className="h-4 w-4 mr-1" />
                                        }
                                        <span className="font-mono font-bold">{metric.change}</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <span className="block text-neutral-500 text-sm mb-1">After</span>
                                    <span className="block text-neutral-900 font-mono text-lg font-medium">{metric.afterLabel}</span>
                                </div>
                            </div>

                            <p className="text-neutral-600 text-sm">
                                {metric.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Industry impacts */}
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-2xl font-medium text-neutral-900 mb-8 text-center"
                >
                    Industry-Specific Impacts
                </motion.h3>

                <div className="grid md:grid-cols-2 gap-6">
                    {INDUSTRY_IMPACTS.map((impact, index) => (
                        <motion.div
                            key={impact.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                            className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <h4 className="text-xl font-medium text-neutral-900 mb-2">{impact.industry}</h4>
                            <p className="text-neutral-600 mb-3">{impact.challenge}</p>

                            <div className="bg-green-50 text-green-800 py-2 px-4 rounded-lg inline-flex items-center mb-5">
                                <TrendingUp className="h-4 w-4 mr-2" />
                                <span className="font-medium">{impact.averageImprovement}</span>
                            </div>

                            <div className="space-y-3">
                                {impact.metrics.map((metric, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-neutral-700">{metric.label}</span>
                                        <span className="text-neutral-900 font-mono font-bold">{metric.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mt-16 text-center"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-colors font-medium"
                    >
                        Discuss Your Potential Impact
                        <ArrowUp className="ml-2 h-5 w-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
