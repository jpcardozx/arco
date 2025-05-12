"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/*                          ARCO STRATEGIC FRAMEWORK                          */
/* -------------------------------------------------------------------------- */

// Real ARCO product structure based on May 2025 strategy
const ARCO_PRODUCTS = [
    {
        id: "snapshot",
        tier: "T1",
        name: "ArcSight Snapshot™",
        price: "$147",
        scope: "10-page PDF + 60s Loom + 3 prioritized recommendations (no-code)",
        impact: "3 actionable insights within 24 hours",
        timeframe: "24 hours",
        for: ["SaaS with Trial→Paid < 10%", "DTC with checkout abandonment > 75%"],
        description: "Diagnostic that identifies perception gaps with one applied correction example.",
        isEntry: true,
        color: "neutral",
        iconPath: "/icon-snapshot.svg"
    },
    {
        id: "sprint",
        tier: "T2",
        name: "ArcLift Sprint™",
        price: "$897",
        scope: "1 Quick-Win implemented + live A/B test in 14 days",
        impact: "≥ +8% conversion (guarantee: $300 credit toward Booster if target not met)",
        timeframe: "14 days",
        for: ["SaaS seeking conversion lift", "DTC reducing abandonment"],
        description: "Implementation with A/B testing and results guarantee.",
        isEntry: false,
        color: "primary",
        iconPath: "/icon-sprint.svg"
    },
    {
        id: "booster",
        tier: "T3",
        name: "ArcBooster™",
        price: "$1,497",
        scope: "Key section redesign + 3 activation emails + analytics/heatmap setup",
        impact: "+15% qualified leads",
        timeframe: "30 days",
        for: ["Companies ready to scale conversion", "Teams needing advanced analysis"],
        description: "Strategic redesign with full implementation and analytics integration.",
        isEntry: false,
        color: "advanced",
        iconPath: "/icon-booster.svg"
    }
];

// ARCO's specific ICPs from acquisition strategy
const ARCO_ICPS = [
    {
        id: "saas",
        name: "SaaS Dev-Tools",
        painPoint: "Trial → Paid < 10%",
        industryAvg: "Industry average ≈ 18%",
        iconPath: "/icon-saas.svg",
        examples: ["Development platforms", "APIs as service", "Analytics tools"],
        targetedAt: "snapshot",
        metricsToTrack: ["Trial→Paid conversion rate", "Average time in trial", "User activations"],
        description: "SaaS companies with technical excellence but conversion below benchmark due to inadequate symbolic representation."
    },
    {
        id: "dtc",
        name: "DTC High-Ticket",
        painPoint: "Checkout abandonment > 75% + mobile PSI < 50",
        industryAvg: "Global average abandonment = 70%",
        iconPath: "/icon-dtc.svg",
        examples: ["Premium e-commerce", "Subscription services", "Custom products"],
        targetedAt: "sprint",
        metricsToTrack: ["Checkout abandonment rate", "Average Order Value", "ROAS"],
        description: "Premium e-commerce businesses facing high abandonment rates due to inadequate value signals."
    }
];

// Real transformation results
const ARCO_RESULTS = [
    {
        client: "Nova Ipê",
        clientLogo: "/logo-novaipe.svg",
        industry: "Premium E-commerce",
        productUsed: "sprint",
        problemStatement: "Product excellence filtered through mid-tier visual signaling",
        solution: "Information hierarchy realignment for precise value signal transmission",
        keyResults: [
            { metric: "Mobile Conversion", before: "1.9%", after: "8.2%", timeframe: "45 days" },
            { metric: "Price Objections", before: "72%", after: "18%", timeframe: "30 days" },
            { metric: "Average Order Value", before: "$67", after: "$110", timeframe: "60 days" }
        ],
        visualPath: "/case-thumb-ipe.jpg"
    },
    {
        client: "Project Xora",
        clientLogo: "/logo-xora.svg",
        industry: "Enterprise SaaS",
        productUsed: "booster",
        problemStatement: "Complex technical excellence obscuring strategic value",
        solution: "Narrative reconstruction and decision-path simplification",
        keyResults: [
            { metric: "Trial → Paid", before: "4.3%", after: "16.7%", timeframe: "60 days" },
            { metric: "C-level Engagement", before: "12%", after: "87%", timeframe: "30 days" },
            { metric: "Technical Objections", before: "63%", after: "7%", timeframe: "45 days" }
        ],
        visualPath: "/case-xora-full.jpg"
    }
];

/* -------------------------------------------------------------------------- */
/*                      EDITORIAL TYPOGRAPHY SYSTEM                           */
/* -------------------------------------------------------------------------- */

// Typography system aligned with ARCO editorial hierarchy
const Typography = {
    Editorial: ({
        children,
        element = "p",
        className = "",
        ...props
    }: {
        children: React.ReactNode;
        element?: keyof React.JSX.IntrinsicElements;
        className?: string;
        [key: string]: any;
    }) => {
        const Element = element as any;
        return (
            <Element className={`font-serif ${className}`} {...props}>
                {children}
            </Element>
        );
    },

    Technical: ({
        children,
        element = "p",
        className = "",
        ...props
    }: {
        children: React.ReactNode;
        element?: keyof React.JSX.IntrinsicElements;
        className?: string;
        [key: string]: any;
    }) => {
        const Element = element as any;
        return (
            <Element className={`font-sans ${className}`} {...props}>
                {children}
            </Element>
        );
    },

    Data: ({
        children,
        element = "span",
        className = "",
        ...props
    }: {
        children: React.ReactNode;
        element?: keyof React.JSX.IntrinsicElements;
        className?: string;
        [key: string]: any;
    }) => {
        const Element = element as any;
        return (
            <Element className={`font-mono tabular-nums tracking-tight ${className}`} {...props}>
                {children}
            </Element>
        );
    }
};

/* -------------------------------------------------------------------------- */
/*                           SECTION COMPONENTS                              */
/* -------------------------------------------------------------------------- */

// Editorial section title
const SectionTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <Typography.Editorial
        element="h2"
        className={`text-3xl md:text-4xl font-light text-gray-900 mb-10 max-w-3xl leading-tight ${className}`}
    >
        {children}
    </Typography.Editorial>
);

// Conceptual grouping label
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <Typography.Technical
        element="div"
        className="text-xs uppercase tracking-wider text-gray-500 mb-4"
    >
        {children}
    </Typography.Technical>
);

// Strategic perception problem card
const PerceptionProblemCard = ({
    icp,
    isActive,
    onSelect
}: {
    icp: typeof ARCO_ICPS[0];
    isActive: boolean;
    onSelect: () => void;
}) => {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
                "group cursor-pointer rounded-lg border transition-all duration-300",
                isActive
                    ? "bg-gray-900 text-white border-gray-700 shadow-lg transform scale-[1.02]"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:shadow"
            )}
            onClick={onSelect}
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-5">
                    <div>
                        <Typography.Technical
                            element="div"
                            className={clsx(
                                "mb-2",
                                isActive ? "text-gray-300" : "text-gray-500"
                            )}
                        >
                            {icp.name}
                        </Typography.Technical>

                        <Typography.Editorial
                            element="h3"
                            className={clsx(
                                "text-xl",
                                isActive ? "text-white" : "text-gray-900"
                            )}
                        >
                            {icp.painPoint}
                        </Typography.Editorial>
                    </div>

                    {icp.iconPath && (
                        <div className={clsx(
                            "p-2 rounded-full transition-colors duration-300",
                            isActive ? "bg-gray-700" : "bg-gray-100 group-hover:bg-gray-200"
                        )}>
                            <Image
                                src={icp.iconPath}
                                alt={icp.name}
                                width={24}
                                height={24}
                                className={isActive ? "text-white" : "text-gray-500"}
                            />
                        </div>
                    )}
                </div>

                <Typography.Technical
                    element="p"
                    className={clsx(
                        "text-sm mb-6",
                        isActive ? "text-gray-300" : "text-gray-600"
                    )}
                >
                    {icp.description}
                </Typography.Technical>

                <div className={clsx(
                    "text-sm p-4 rounded-md transition-colors duration-300",
                    isActive ? "bg-gray-800" : "bg-gray-50 group-hover:bg-gray-100"
                )}>
                    <Typography.Technical element="div" className={isActive ? "text-gray-300" : "text-gray-600"}>
                        <strong>Industry Benchmark:</strong> {icp.industryAvg}
                    </Typography.Technical>
                </div>

                {isActive && (
                    <div className="mt-6 pt-5 border-t border-gray-700">
                        <Typography.Technical
                            element="div"
                            className="text-gray-300 text-xs uppercase tracking-wider mb-3"
                        >
                            Critical Metrics
                        </Typography.Technical>

                        <ul className="space-y-2">
                            {icp.metricsToTrack.map((metric, index) => (
                                <li key={index} className="flex items-center text-sm text-gray-300">
                                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-3"></div>
                                    {metric}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// Product card with sophisticated design
const ProductCard = ({
    product,
    isActive,
    onSelect
}: {
    product: typeof ARCO_PRODUCTS[0];
    isActive: boolean;
    onSelect: () => void;
}) => {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
                "relative group cursor-pointer rounded-lg border transition-all duration-300",
                isActive
                    ? "bg-gray-900 text-white border-gray-700 shadow-lg transform scale-[1.02]"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:shadow"
            )}
            onClick={onSelect}
        >
            {/* Tier indicator */}
            <div className={clsx(
                "absolute top-0 right-6 px-2 py-1 text-xs uppercase font-medium rounded-b-md transition-colors",
                isActive ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
            )}>
                {product.tier}
            </div>

            <div className="p-6 pt-8">
                <div className="flex justify-between items-start mb-4">
                    <Typography.Editorial
                        element="h3"
                        className={clsx(
                            "text-xl transition-colors duration-300",
                            isActive ? "text-white" : "text-gray-900"
                        )}
                    >
                        {product.name}
                    </Typography.Editorial>

                    <Typography.Data
                        element="div"
                        className={clsx(
                            "text-lg transition-colors duration-300",
                            isActive ? "text-white" : "text-gray-900"
                        )}
                    >
                        {product.price}
                    </Typography.Data>
                </div>

                <Typography.Technical
                    element="p"
                    className={clsx(
                        "text-sm mb-6 transition-colors duration-300",
                        isActive ? "text-gray-300" : "text-gray-600"
                    )}
                >
                    {product.description}
                </Typography.Technical>

                <div className={clsx(
                    "flex items-center gap-2 mb-6 text-sm p-4 rounded-md transition-colors duration-300",
                    isActive ? "bg-gray-800" : "bg-gray-50 group-hover:bg-gray-100"
                )}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className={clsx("w-4 h-4 transition-colors duration-300", isActive ? "text-gray-300" : "text-gray-500")}>
                        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <Typography.Technical element="span" className={clsx("transition-colors duration-300", isActive ? "text-gray-300" : "text-gray-600")}>
                        {product.impact}
                    </Typography.Technical>
                </div>

                {isActive && (
                    <div className="mt-6 pt-5 border-t border-gray-700">
                        <Typography.Technical
                            element="div"
                            className="text-gray-300 text-xs uppercase tracking-wider mb-3"
                        >
                            Deliverables
                        </Typography.Technical>

                        <Typography.Technical element="p" className="text-sm text-gray-300 mb-6">
                            {product.scope}
                        </Typography.Technical>

                        <div className="flex justify-between items-center">
                            <Typography.Technical
                                element="div"
                                className="text-xs text-gray-400"
                            >
                                {product.timeframe}
                            </Typography.Technical>

                            <Link
                                href={`/diagnose?product=${product.id}`}
                                className={clsx(
                                    "px-4 py-2 rounded-md transition-colors duration-200",
                                    product.isEntry
                                        ? "bg-white text-gray-900 hover:bg-gray-100"
                                        : "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700"
                                )}
                            >
                                {product.isEntry ? 'Request Assessment' : 'Learn More'}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// Transformation case study with visual sophistication
const TransformationCaseCard = ({
    result,
    isActive
}: {
    result: typeof ARCO_RESULTS[0];
    isActive: boolean;
}) => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

    // Get product name for display
    const productName = ARCO_PRODUCTS.find(p => p.id === result.productUsed)?.name || result.productUsed;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
                "rounded-lg overflow-hidden transition-all duration-300",
                isActive
                    ? "bg-white border border-gray-300 shadow-xl"
                    : "bg-white border border-gray-200 shadow"
            )}
        >
            <div className="grid md:grid-cols-2 gap-0">
                {/* Case image with visual overlay */}
                <div className="relative h-64 md:h-auto">
                    <Image
                        src={result.visualPath}
                        alt={`${result.client} case study`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-gray-900/90 via-gray-900/50 to-transparent" />

                    <div className="absolute left-5 bottom-5">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex items-center mb-2 shadow-md">
                            <Image
                                src={result.clientLogo}
                                alt={result.client}
                                width={24}
                                height={24}
                                className="rounded-sm"
                            />
                            <Typography.Technical element="span" className="ml-2 font-medium text-gray-900">
                                {result.client}
                            </Typography.Technical>
                        </div>
                        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow">
                            <Typography.Technical element="span" className="text-xs text-white">
                                {result.industry}
                            </Typography.Technical>
                        </div>
                    </div>
                </div>

                {/* Case content with editorial structure */}
                <div className="p-7">
                    <div className="mb-5 flex justify-between items-start">
                        <Typography.Editorial element="h3" className="text-xl text-gray-900">
                            {result.client}
                        </Typography.Editorial>

                        <div className="bg-gray-100 rounded-full px-3 py-1 shadow-sm">
                            <Typography.Technical element="span" className="text-xs text-gray-700">
                                {productName}
                            </Typography.Technical>
                        </div>
                    </div>

                    <div className="space-y-5 mb-7">
                        <div>
                            <Typography.Technical element="div" className="text-xs uppercase tracking-wider text-gray-500 mb-1.5">
                                Perception Gap
                            </Typography.Technical>
                            <Typography.Technical element="p" className="text-sm text-gray-700">
                                {result.problemStatement}
                            </Typography.Technical>
                        </div>

                        <div>
                            <Typography.Technical element="div" className="text-xs uppercase tracking-wider text-gray-500 mb-1.5">
                                Applied Solution
                            </Typography.Technical>
                            <Typography.Technical element="p" className="text-sm text-gray-700">
                                {result.solution}
                            </Typography.Technical>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-5">
                        <Typography.Technical element="div" className="text-xs uppercase tracking-wider text-gray-500 mb-4">
                            Economic Impact
                        </Typography.Technical>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {result.keyResults.map((impact, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-100">
                                    <Typography.Technical element="div" className="text-xs text-gray-600 mb-1.5">
                                        {impact.metric}
                                    </Typography.Technical>

                                    <div className="flex items-center space-x-2">
                                        <Typography.Data element="span" className="text-xs text-gray-500">
                                            {impact.before}
                                        </Typography.Data>

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-gray-400">
                                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                        </svg>

                                        <Typography.Data element="span" className="text-xs text-gray-900 font-bold">
                                            {impact.after}
                                        </Typography.Data>
                                    </div>

                                    <Typography.Technical element="div" className="text-xs text-gray-500 mt-1.5">
                                        {impact.timeframe}
                                    </Typography.Technical>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/*                             MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */

export function ContentSection() {
    // Interactive component state
    const [activeProductId, setActiveProductId] = useState("snapshot");
    const [activeIcpId, setActiveIcpId] = useState("saas");

    // Update ICP when product changes
    useEffect(() => {
        const product = ARCO_PRODUCTS.find(p => p.id === activeProductId);
        if (product && product.id === "sprint") {
            setActiveIcpId("dtc");
        } else if (product && product.id === "snapshot") {
            setActiveIcpId("saas");
        }
    }, [activeProductId]);    // Viewing tracking refs
    const { ref: introInViewRef, inView: introInView } = useInView({ threshold: 0.1, triggerOnce: true });
    const { ref: ctaInViewRef, inView: ctaInView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className="py-20 px-6 md:py-32 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto max-w-6xl">
                {/* Editorial Introduction */}
                <motion.div
                    ref={introInViewRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-3xl mb-24"
                >
                    <SectionLabel>The Perception-Value Framework</SectionLabel>

                    <SectionTitle>
                        Technical excellence remains financially undervalued when filtered through inadequate symbolic representation.
                    </SectionTitle>

                    <Typography.Technical
                        element="p"
                        className="text-lg text-gray-700 mb-7 max-w-2xl"
                    >
                        This misalignment creates quantifiable gaps between actual value delivery and market perception, resulting in systematic underpricing, inappropriate market categorization, and reduced conversion rates.
                    </Typography.Technical>

                    <Typography.Technical
                        element="p"
                        className="text-base text-gray-600 mb-8"
                    >
                        ARCO has identified specific perception-value gap patterns in two primary verticals: <strong>SaaS with low trial conversion</strong> and <strong>e-commerce with high checkout abandonment</strong> — both problems that can be corrected with precise symbolic alignment.
                    </Typography.Technical>
                </motion.div>

                {/* Specific Perception Problems by ICP */}
                <div className="mb-24">
                    <SectionLabel>Documented Perception Problems</SectionLabel>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {ARCO_ICPS.map(icp => (
                            <PerceptionProblemCard
                                key={icp.id}
                                icp={icp}
                                isActive={icp.id === activeIcpId}
                                onSelect={() => setActiveIcpId(icp.id)}
                            />
                        ))}
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-7 shadow-sm">
                        <Typography.Editorial element="h3" className="text-lg text-gray-800 mb-3">
                            The Economics of Perception
                        </Typography.Editorial>

                        <Typography.Technical element="p" className="text-gray-700">
                            Precisely identifying these perception-value gaps is the first step toward correcting them. Our methodology develops specific corrections for each vertical, with measurable economic outcomes.
                        </Typography.Technical>
                    </div>
                </div>

                {/* Perception Correction Products */}
                <div className="mb-24">
                    <SectionLabel>Perception Correction System</SectionLabel>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {ARCO_PRODUCTS.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isActive={product.id === activeProductId}
                                onSelect={() => setActiveProductId(product.id)}
                            />
                        ))}
                    </div>

                    <div className="bg-gray-900 text-white rounded-lg p-7 shadow-lg">
                        <div className="flex items-start gap-5">
                            <div className="p-2 bg-gray-800 rounded-full shadow-inner">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                            </div>

                            <div>
                                <Typography.Editorial element="h3" className="text-lg text-white mb-2">
                                    Conditional Guarantee on All Sprint Services
                                </Typography.Editorial>

                                <Typography.Technical element="p" className="text-gray-300">
                                    If your Sprint doesn't achieve at least +8% conversion improvement, you receive a $300 credit applicable toward ArcBooster. Our commitment to measurable results.
                                </Typography.Technical>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transformation Cases */}
                <div className="mb-24">
                    <SectionLabel>Documented Perception-Value Transformations</SectionLabel>

                    <div className="space-y-12">
                        {ARCO_RESULTS.map((result) => (
                            <TransformationCaseCard
                                key={result.client}
                                result={result}
                                isActive={result.productUsed === activeProductId || ARCO_ICPS.find(icp => icp.id === activeIcpId)?.targetedAt === result.productUsed}
                            />
                        ))}
                    </div>
                </div>

                {/* Strategic CTA */}
                <motion.div
                    ref={ctaInViewRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white rounded-lg p-8 shadow-lg border border-gray-200"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <Typography.Editorial
                                element="h3"
                                className="text-2xl text-gray-900 mb-3"
                            >
                                Begin with a Precise Diagnosis
                            </Typography.Editorial>

                            <Typography.Technical
                                element="p"
                                className="text-gray-700 max-w-xl"
                            >
                                Each day of misalignment represents quantifiable financial loss. The ArcSight Snapshot™ provides immediate visibility into specific perception-value gaps and actionable first steps.
                            </Typography.Technical>
                        </div>

                        <div className="flex flex-col items-center">
                            <Link
                                href="/diagnose"
                                className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 transition-colors px-7 py-3 rounded-md text-white font-medium mb-2 shadow-md"
                            >
                                Request ArcSight Snapshot™
                            </Link>
                            <Typography.Data element="div" className="text-gray-700">
                                $147 • 24 hours
                            </Typography.Data>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default function IntegratedPage() {
    return (
        <main>
            <ContentSection />
        </main>
    );
}