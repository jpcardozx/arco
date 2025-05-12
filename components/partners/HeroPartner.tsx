"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Typography components with proper TypeScript support
interface TypographyProps {
    children: ReactNode;
    className?: string;
    element?: keyof React.JSX.IntrinsicElements;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const Typography = {
    Editorial: ({
        children,
        className = "",
        element = "span",
        size = "md",
        ...props
    }: TypographyProps) => {
        const Element = element as any; // Required for dynamic element
        const sizeClasses: Record<string, string> = {
            xs: "text-sm font-normal leading-snug",
            sm: "text-base font-normal leading-snug",
            md: "text-lg font-normal leading-tight",
            lg: "text-2xl font-normal leading-tight",
            xl: "text-3xl font-light leading-tight",
            "2xl": "text-4xl font-light leading-tight",
            "3xl": "text-5xl font-light leading-tight",
        };

        return (
            <Element
                className={`font-serif ${sizeClasses[size]} ${className}`}
                {...props}
            >
                {children}
            </Element>
        );
    },
    Technical: ({
        children,
        className = "",
        element = "span",
        size = "md",
        ...props
    }: TypographyProps) => {
        const Element = element as any;
        const sizeClasses: Record<string, string> = {
            xs: "text-sm font-normal leading-normal",
            sm: "text-base font-normal leading-normal",
            md: "text-lg font-normal leading-normal",
            lg: "text-xl font-normal leading-normal",
            xl: "text-2xl font-normal leading-normal",
        };

        return (
            <Element
                className={`font-sans ${sizeClasses[size]} ${className}`}
                {...props}
            >
                {children}
            </Element>
        );
    },
    Data: ({
        children,
        className = "",
        element = "span",
        size = "md",
        ...props
    }: TypographyProps) => {
        const Element = element as any;
        const sizeClasses: Record<string, string> = {
            xs: "text-xs font-normal",
            sm: "text-sm font-normal",
            md: "text-base font-normal",
            lg: "text-lg font-normal",
            xl: "text-xl font-normal",
        };

        return (
            <Element
                className={`font-mono tabular-nums tracking-tight ${sizeClasses[size]} ${className}`}
                {...props}
            >
                {children}
            </Element>
        );
    }
};

// Container components with proper TypeScript support
interface AsymmetricContainerProps {
    children: ReactNode;
    className?: string;
    reversed?: boolean;
}

const AsymmetricContainer: React.FC<AsymmetricContainerProps> = ({
    children,
    className = "",
    reversed = false
}) => (
    <div className={`grid grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 ${className}`}>
        <div className={`col-span-12 md:col-span-5 ${reversed ? 'md:col-start-7' : ''}`}>
            {Array.isArray(children) ? children[0] : children}
        </div>
        <div className={`col-span-12 md:col-span-6 ${reversed ? 'md:col-start-1' : 'md:col-start-6'}`}>
            {Array.isArray(children) ? children[1] : null}
        </div>
    </div>
);

interface EditorialRevealProps {
    children: ReactNode;
    delay?: number;
    staggerItems?: number;
}

const EditorialReveal: React.FC<EditorialRevealProps> = ({
    children,
    delay = 0,
    staggerItems = 0.15
}) => {
    const prefersReducedMotion = useReducedMotion();

    const variants: Variants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay,
                staggerChildren: staggerItems
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            {React.Children.map(children, child => (
                <motion.div variants={itemVariants}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};

interface ComparisonSliderProps {
    beforeSrc: string;
    afterSrc: string;
    label: string;
    alt: string;
    className?: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
    beforeSrc,
    afterSrc,
    label,
    alt,
    className = ""
}) => {
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent | React.Touch) => {
        if (!containerRef.current) return;
        const box = containerRef.current.getBoundingClientRect();
        const x = e.clientX - box.left;
        const percent = Math.max(0, Math.min(100, (x / box.width) * 100));
        setPosition(percent);
    };

    return (
        <div className={`relative overflow-hidden rounded-lg shadow-lg ${className}`}>
            <div
                ref={containerRef}
                className="aspect-w-16 aspect-h-10 relative cursor-ew-resize touch-none"
                onMouseMove={(e) => handleMove(e)}
                onTouchMove={(e) => {
                    const touch = e.touches[0];
                    handleMove(touch);
                }}
            >
                <div className="absolute inset-0">
                    <Image
                        src={afterSrc}
                        fill
                        alt={`${alt} - After perception alignment`}
                        className="object-cover"
                    />
                </div>
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${position}%` }}
                >
                    <Image
                        src={beforeSrc}
                        fill
                        alt={`${alt} - Before perception alignment`}
                        className="object-cover"
                    />
                </div>

                <div
                    className="absolute inset-y-0 w-0.5 bg-white shadow-lg"
                    style={{ left: `${position}%` }}
                >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 17V3M10 3L4 9M10 3L16 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/80 text-white text-xs rounded-full">
                    {label}
                </div>
            </div>
        </div>
    );
};

interface MetricCardProps {
    label: string;
    value: string;
    context: string;
    className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, context, className = "" }) => (
    <div className={`bg-white border border-gray-100 rounded-lg p-4 shadow-sm ${className}`}>
        <Typography.Data element="div" size="lg" className="mb-1 text-gray-900">
            {value}
        </Typography.Data>
        <Typography.Technical element="div" size="xs" className="font-medium text-gray-600 mb-2">
            {label}
        </Typography.Technical>
        <Typography.Technical element="div" size="xs" className="text-gray-500">
            {context}
        </Typography.Technical>
    </div>
);

// Data interfaces
interface PerceptionGapItem {
    id: string;
    label: string;
    statistic: string;
    description: string;
}

interface EconomicImpact {
    label: string;
    value: string;
    context: string;
}

interface CaseStudy {
    id: string;
    client: string;
    industry: string;
    beforeSrc: string;
    afterSrc: string;
    perceptionGap: string;
    correction: string;
    economicImpact: EconomicImpact[];
}

// Core data with actual values
const valueGapData: PerceptionGapItem[] = [
    {
        id: "perception-value-gap",
        label: "Perception-Value Gap",
        statistic: "43%",
        description: "Real value vs. perceived value in technically excellent companies"
    },
    {
        id: "decision-friction",
        label: "Decision Friction",
        statistic: "4.2×",
        description: "Extended decision time due to perception misalignment"
    },
    {
        id: "conversion-loss",
        label: "Conversion Loss",
        statistic: "62%",
        description: "Abandonment rate during value assessment"
    }
];

// Case studies with real economic impact data
const caseStudies: CaseStudy[] = [
    {
        id: "case-nova-ipe",
        client: "Nova Ipê",
        industry: "Premium E-commerce",
        beforeSrc: "/case-ipe-before.jpg",
        afterSrc: "/case-ipe-after.jpg",
        perceptionGap: "Digital presence signaling mid-tier despite premium product quality",
        correction: "Realignment of information hierarchy and typographic framework for value signaling",
        economicImpact: [
            {
                label: "Average order value",
                value: "+64%",
                context: "Increase without changing products or prices"
            },
            {
                label: "Discount requests",
                value: "-87%",
                context: "Reduction in negotiation attempts"
            },
            {
                label: "Decision time",
                value: "5.3d → 1.7d",
                context: "Reduction in conversion cycle"
            }
        ]
    },
    {
        id: "case-project-xora",
        client: "Project Xora",
        industry: "Enterprise SaaS",
        beforeSrc: "/case-xora-before.jpg",
        afterSrc: "/case-xora-after.jpg",
        perceptionGap: "Technical signaling obscuring strategic value for C-level decision makers",
        correction: "Narrative reconstruction and value presentation realignment",
        economicImpact: [
            {
                label: "Executive engagement",
                value: "+210%",
                context: "Increase in board-level evaluations"
            },
            {
                label: "Price positioning",
                value: "2.3× higher",
                context: "Sustainable price tier elevation"
            },
            {
                label: "Commercial objections",
                value: "-68%",
                context: "Reduction in value questioning"
            }
        ]
    }
];

// Main component with clear narrative progression
const PartnerShowcase: React.FC = () => {
    const [activeCase, setActiveCase] = useState<string>(caseStudies[0].id);
    const [readingStage, setReadingStage] = useState<number>(0);
    const showcaseRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: showcaseRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Advance reading stages as scrolling progresses
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(v => {
            if (v < 0.3) setReadingStage(0);
            else if (v < 0.6) setReadingStage(1);
            else setReadingStage(2);
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    const currentCase = caseStudies.find(c => c.id === activeCase);

    // Ensure currentCase exists before rendering
    if (!currentCase) return null;

    return (
        <section
            ref={showcaseRef}
            className="relative bg-gray-50 py-16 md:py-24 lg:py-32 overflow-hidden"
        >
            {/* Editorial background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-gray-100 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-gray-100 to-transparent opacity-70" />
                <div className="absolute inset-0 bg-[url('/subtle-grid.svg')] opacity-[0.03]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section 1: Establish the Problem */}
                <div className="mb-24 md:mb-32">
                    <AsymmetricContainer>
                        <EditorialReveal>
                            <Typography.Editorial
                                element="h2"
                                size="3xl"
                                className="text-gray-900 mb-8"
                            >
                                Technical excellence<br />
                                <span className="inline-block mt-1">remains undervalued.</span>
                            </Typography.Editorial>

                            <Typography.Technical
                                element="p"
                                size="lg"
                                className="text-gray-700 mb-6"
                            >
                                The gap between <em>delivered value</em> and <em>perceived value</em> creates quantifiable financial loss that can be corrected through precise perception alignment.
                            </Typography.Technical>

                            <Typography.Technical
                                element="p"
                                size="md"
                                className="text-gray-600 mb-12"
                            >
                                This is not an aesthetic problem, but an economic one. Inadequate perception creates decision friction, reduces conversions, and suppresses value recognition.
                            </Typography.Technical>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                {valueGapData.map(item => (
                                    <div key={item.id} className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                                        <Typography.Data element="div" size="xl" className="text-gray-900 mb-1">
                                            {item.statistic}
                                        </Typography.Data>
                                        <Typography.Technical element="div" size="xs" className="font-medium text-gray-700 mb-2">
                                            {item.label}
                                        </Typography.Technical>
                                        <Typography.Technical element="div" size="xs" className="text-gray-500">
                                            {item.description}
                                        </Typography.Technical>
                                    </div>
                                ))}
                            </div>
                        </EditorialReveal>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="relative"
                        >
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-gray-200 to-white rounded-full opacity-80" />

                            <div className="relative bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <Typography.Editorial element="h3" size="lg" className="text-gray-900 mb-4">
                                    Perception-Value<br />Assessment
                                </Typography.Editorial>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">1</div>
                                        <Typography.Technical size="sm" className="text-gray-700">
                                            Reading of current presence
                                        </Typography.Technical>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">2</div>
                                        <Typography.Technical size="sm" className="text-gray-700">
                                            Identification of misalignments
                                        </Typography.Technical>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">3</div>
                                        <Typography.Technical size="sm" className="text-gray-700">
                                            Quantification of economic impact
                                        </Typography.Technical>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <Typography.Data size="lg" className="text-gray-900">
                                        $147
                                    </Typography.Data>
                                    <Link
                                        href="/diagnose"
                                        className="text-sm bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg transition duration-200"
                                    >
                                        Request Assessment
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AsymmetricContainer>
                </div>

                {/* Section 2: Demonstrate Transformation */}
                <div className="mb-24 md:mb-32">
                    <div className="mb-16 md:text-center">
                        <Typography.Editorial element="h2" size="2xl" className="text-gray-900 mb-5">
                            Documented Perception Corrections
                        </Typography.Editorial>
                        <Typography.Technical element="p" size="lg" className="text-gray-600 max-w-3xl md:mx-auto">
                            Each case demonstrates the alignment process and its direct financial impact.
                        </Typography.Technical>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {caseStudies.map(c => (
                            <button
                                key={c.id}
                                className={`text-left p-4 rounded-lg transition duration-200 ${activeCase === c.id
                                    ? "bg-gray-800 text-white ring-2 ring-gray-800"
                                    : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
                                    }`}
                                onClick={() => setActiveCase(c.id)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <Typography.Editorial size="lg" className={activeCase === c.id ? "text-white" : "text-gray-900"}>
                                        {c.client}
                                    </Typography.Editorial>
                                    <span className={`px-2 py-0.5 rounded text-xs ${activeCase === c.id
                                        ? "bg-white/20 text-white"
                                        : "bg-gray-100 text-gray-700"
                                        }`}>
                                        {c.industry}
                                    </span>
                                </div>
                                <Typography.Technical size="sm" className={activeCase === c.id ? "text-gray-200" : "text-gray-600"}>
                                    {c.perceptionGap}
                                </Typography.Technical>
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCase}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <AsymmetricContainer reversed>
                                <div>
                                    <ComparisonSlider
                                        beforeSrc={currentCase.beforeSrc}
                                        afterSrc={currentCase.afterSrc}
                                        label="Slide to compare"
                                        alt={currentCase.client}
                                    />
                                </div>

                                <div className="flex flex-col h-full justify-center">
                                    <div className="mb-8">
                                        <Typography.Editorial element="h3" size="xl" className="text-gray-900 mb-4">
                                            Perception Gap Analysis
                                        </Typography.Editorial>
                                        <Typography.Technical element="p" size="md" className="text-gray-700">
                                            {currentCase.perceptionGap}
                                        </Typography.Technical>
                                    </div>

                                    <div className="mb-8">
                                        <Typography.Editorial element="h3" size="xl" className="text-gray-900 mb-4">
                                            Applied Correction
                                        </Typography.Editorial>
                                        <Typography.Technical element="p" size="md" className="text-gray-700">
                                            {currentCase.correction}
                                        </Typography.Technical>
                                    </div>

                                    <div>
                                        <Typography.Editorial element="h3" size="xl" className="text-gray-900 mb-4">
                                            Economic Impact
                                        </Typography.Editorial>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {currentCase.economicImpact.map((impact, i) => (
                                                <MetricCard
                                                    key={i}
                                                    label={impact.label}
                                                    value={impact.value}
                                                    context={impact.context}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </AsymmetricContainer>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Section 3: Path to Resolution */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <Typography.Editorial element="h2" size="2xl" className="text-gray-900 mb-5">
                            The Correction Process
                        </Typography.Editorial>
                        <Typography.Technical element="p" size="lg" className="text-gray-600">
                            The ARCO methodology transforms perception into economic value.
                        </Typography.Technical>
                    </div>

                    <div className="relative">
                        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gray-200" />

                        <div className="relative grid grid-cols-1 gap-12">
                            <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                                <div className="md:text-right">
                                    <Typography.Editorial element="h3" size="lg" className="text-gray-900 mb-3">
                                        Reading & Diagnosis
                                    </Typography.Editorial>
                                    <Typography.Technical element="p" size="md" className="text-gray-700">
                                        Precise identification of perception-value gaps and quantification of current financial impact.
                                    </Typography.Technical>
                                </div>

                                <div className="absolute md:relative top-0 left-0 md:left-auto">
                                    <div className="absolute md:relative -left-6 md:left-0 top-0 md:top-auto md:-ml-4 h-12 w-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                                        <span className="text-gray-800 font-serif text-lg">1</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                                <div className="md:col-start-2">
                                    <Typography.Editorial element="h3" size="lg" className="text-gray-900 mb-3">
                                        Perception Alignment
                                    </Typography.Editorial>
                                    <Typography.Technical element="p" size="md" className="text-gray-700">
                                        Precise correction of elements that create conversion friction and value suppression.
                                    </Typography.Technical>
                                </div>

                                <div className="absolute md:relative top-0 left-0 md:left-auto md:col-start-1 md:text-right">
                                    <div className="absolute md:relative -left-6 md:left-auto md:right-0 top-0 md:top-auto md:-mr-4 h-12 w-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                                        <span className="text-gray-800 font-serif text-lg">2</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                                <div className="md:text-right">
                                    <Typography.Editorial element="h3" size="lg" className="text-gray-900 mb-3">
                                        Implementation & Measurement
                                    </Typography.Editorial>
                                    <Typography.Technical element="p" size="md" className="text-gray-700">
                                        Application of corrections through focused sprints and continuous economic impact measurement.
                                    </Typography.Technical>
                                </div>

                                <div className="absolute md:relative top-0 left-0 md:left-auto">
                                    <div className="absolute md:relative -left-6 md:left-0 top-0 md:top-auto md:-ml-4 h-12 w-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                                        <span className="text-gray-800 font-serif text-lg">3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 md:mt-24 text-center">
                        <Link
                            href="/diagnose"
                            className="inline-flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                        >
                            <Typography.Technical element="span" className="font-medium">
                                Request Perception Snapshot™
                            </Typography.Technical>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>

                        <div className="mt-4">
                            <Typography.Technical element="p" size="sm" className="text-gray-500">
                                Perception Snapshot™ ($147) — Diagnostic analysis with identification of perception gaps
                            </Typography.Technical>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnerShowcase;