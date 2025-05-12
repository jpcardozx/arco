"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers, Aperture, LineChart, ShieldCheck, Zap, BadgeCheck } from 'lucide-react';

interface ExpertiseArea {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    capabilities: string[];
}

const EXPERTISE_AREAS: ExpertiseArea[] = [
    {
        id: "perception-engineering",
        title: "Perception Engineering",
        icon: <Aperture className="h-6 w-6" />,
        description: "Strategic reconfiguration of how your value is perceived through structural symbolic alignment.",
        capabilities: [
            "Perception-value gap analysis",
            "Symbolic misalignment identification",
            "Visual hierarchy restructuring",
            "Information architecture optimization"
        ]
    },
    {
        id: "premium-positioning",
        title: "Premium Positioning",
        icon: <BadgeCheck className="h-6 w-6" />,
        description: "Establishing proper market positioning that reflects your actual expertise and quality.",
        capabilities: [
            "Authority signaling framework",
            "Strategic narrative development",
            "Pricing psychology alignment",
            "Competitive differentiation"
        ]
    },
    {
        id: "conversion-architecture",
        title: "Conversion Architecture",
        icon: <LineChart className="h-6 w-6" />,
        description: "Designing decision pathways that remove friction and accelerate value recognition.",
        capabilities: [
            "Decision sequence mapping",
            "Objection preemption",
            "Value-first information flow",
            "Cognitive friction elimination"
        ]
    },
    {
        id: "results-measurement",
        title: "Results Measurement",
        icon: <Zap className="h-6 w-6" />,
        description: "Quantifiable measurement of perception-value improvements and economic impact.",
        capabilities: [
            "Conversion rate optimization",
            "Sales cycle acceleration",
            "Average order value increase",
            "Premium tier adoption"
        ]
    }
];

export default function PortfolioExpertise() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
        <section
            id="expertise"
            ref={containerRef}
            className="py-24 bg-neutral-50"
        >
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:max-w-3xl"
                >
                    <span className="text-blue-600 text-sm font-medium uppercase tracking-wider">Specialized Expertise</span>
                    <h2 className="text-4xl font-serif text-neutral-900 mt-2 mb-4">
                        Strategic Value Translation
                    </h2>
                    <p className="text-neutral-700 text-lg mb-6">
                        I specialize in correcting the misalignment between technical excellence and market perception.
                        This expertise has been developed through years of analyzing how perception impacts economic outcomes
                        across industries.
                    </p>
                    <p className="text-neutral-600">
                        Unlike general marketing or design approaches that focus on aesthetics or broad messaging,
                        my methodology targets the specific symbolic elements that directly impact how your value is perceived
                        and evaluated by decision makers.
                    </p>
                </motion.div>

                {/* Expertise areas */}
                <div className="grid md:grid-cols-2 gap-8">
                    {EXPERTISE_AREAS.map((area, index) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-xl border border-neutral-200 p-8 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-50 p-3 rounded-lg text-blue-600 mr-4">
                                    {area.icon}
                                </div>
                                <h3 className="text-2xl font-medium text-neutral-900">{area.title}</h3>
                            </div>

                            <p className="text-neutral-700 mb-6">
                                {area.description}
                            </p>

                            <div className="space-y-3">
                                {area.capabilities.map((capability, i) => (
                                    <div key={i} className="flex items-start">
                                        <div className="bg-green-50 p-1 rounded-full mr-3 mt-1">
                                            <ShieldCheck className="h-3 w-3 text-green-600" />
                                        </div>
                                        <span className="text-neutral-800">{capability}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Value proposition */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 bg-blue-50 rounded-xl p-8 border border-blue-100"
                >
                    <div className="md:flex items-center">
                        <div className="md:w-2/3 md:pr-8">
                            <h3 className="text-2xl font-medium text-neutral-900 mb-4">
                                Why Perception-Value Alignment Matters
                            </h3>
                            <p className="text-neutral-700 mb-4">
                                When your market perception doesn't match your actual value, you face specific business challenges:
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <div className="bg-red-50 p-1 rounded-full mr-3 mt-1">
                                        <span className="block h-3 w-3 bg-red-500 rounded-full"></span>
                                    </div>
                                    <span className="text-neutral-800">Constant price resistance despite superior quality</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-red-50 p-1 rounded-full mr-3 mt-1">
                                        <span className="block h-3 w-3 bg-red-500 rounded-full"></span>
                                    </div>
                                    <span className="text-neutral-800">Longer sales cycles as value takes too long to demonstrate</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-red-50 p-1 rounded-full mr-3 mt-1">
                                        <span className="block h-3 w-3 bg-red-500 rounded-full"></span>
                                    </div>
                                    <span className="text-neutral-800">Improper comparison with less capable competitors</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-red-50 p-1 rounded-full mr-3 mt-1">
                                        <span className="block h-3 w-3 bg-red-500 rounded-full"></span>
                                    </div>
                                    <span className="text-neutral-800">Expertise that remains invisible to key decision makers</span>
                                </li>
                            </ul>
                        </div>
                        <div className="md:w-1/3 mt-8 md:mt-0">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-100">
                                <h4 className="text-xl font-medium text-neutral-900 mb-4">
                                    Expert Diagnosis
                                </h4>
                                <p className="text-neutral-700 mb-6">
                                    Find out exactly where your perception-value gaps are creating friction in your customer journey.
                                </p>
                                <a
                                    href="#contact"
                                    className="block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg transition-colors font-medium"
                                >
                                    Request Analysis
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
