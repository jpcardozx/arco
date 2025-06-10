"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

// Helper para assets estáticos com tipo seguro
const getAssetPath = (src: string): string => src.startsWith("/") ? src : `/${src}`;

/* -------------------------------------------------------------------------- */
/*                                DATA MODELS                                 */
/* -------------------------------------------------------------------------- */

export interface CaseStudy {
    id: string;
    label: string;
    kpi: string;
    img: string;
    desc: string;
    color: string; // Nova propriedade para personalização de cores
}

// Enhanced data with custom colors and high-impact metrics
const CASE_STUDIES: CaseStudy[] = [
    {
        id: "ipe",
        label: "Ipê Real Estate Agency",
        kpi: "+180% ROI",
        img: "/case-thumb-ipe.png",
        desc: "Mobile conversion 1.9% → 8.2% in 45 days",
        color: "from-emerald-500 to-teal-600"
    },
    {
        id: "xora",
        label: "Project Xora - AI Consultancy",
        kpi: "2.1s → 0.4s",
        img: "/case-thumb-xora.png",
        desc: "Core Web Vitals 100/100 • +62% retention",
        color: "from-blue-500 to-indigo-600"
    },
    {
        id: "api",
        label: "API Framework",
        kpi: "+75% requests",
        img: "/case-thumb-api.png",
        desc: "Interactive docs • -40% support tickets",
        color: "from-purple-500 to-violet-600"
    }
];

/* -------------------------------------------------------------------------- */
/*                               ANIMATION VARIANTS                           */
/* -------------------------------------------------------------------------- */

const fadeUp = (delay = 0): Variants => ({
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
    }
});

const fadeScale = (delay = 0): Variants => ({
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }
    }
});

const staggerChildren: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.35
        }
    }
};

/* -------------------------------------------------------------------------- */
/*                               CUSTOM HOOKS                                 */
/* -------------------------------------------------------------------------- */

function useAccessibleTooltip(
    activeId: string | null,
    setActiveId: (id: string | null) => void
) {
    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setActiveId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setActiveId]);

    return ref;
}

/* -------------------------------------------------------------------------- */
/*                              SUB‑COMPONENTS                                */
/* -------------------------------------------------------------------------- */

interface KpiBadgeProps {
    study: CaseStudy;
    isActive: boolean;
    toggle: (id: string) => void;
    onKey: (e: KeyboardEvent, id: string) => void;
}

const KpiBadge = ({ study, isActive, toggle, onKey }: KpiBadgeProps) => {
    return (
        <li className="relative">
            <button
                type="button"
                aria-expanded={isActive}
                aria-controls={isActive ? `${study.id}-tip` : undefined}
                aria-label={`${study.label}: ${study.kpi}. ${study.desc}`}
                onClick={() => toggle(study.id)}
                onKeyDown={(e) => onKey(e, study.id)}
                className={clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-full text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    "bg-white backdrop-blur-sm ring-1 shadow-lg transition-all duration-300 hover:shadow-xl",
                    isActive
                        ? `ring-2 ring-offset-2 ring-offset-white ring-${study.color.split(' ')[0]}`
                        : "ring-slate-200/80"
                )}
            >
                <div className={clsx(
                    "flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br",
                    study.color
                )}>
                    <Image
                        src={getAssetPath(study.img)}
                        alt=""
                        width={24}
                        height={24}
                        className="rounded-full"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-slate-800">
                        {study.label}
                    </span>
                    <span className={clsx(
                        "font-bold text-transparent bg-clip-text bg-gradient-to-r",
                        study.color
                    )}>
                        {study.kpi}
                    </span>
                </div>
            </button>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    id={`${study.id}-tip`}
                    role="tooltip"
                    className={clsx(
                        "absolute top-full left-0 mt-3 z-10 w-64 rounded-lg bg-white p-4 text-sm shadow-xl",
                        "ring-1 ring-slate-200 before:absolute before:-top-2 before:left-6 before:h-4 before:w-4",
                        "before:rotate-45 before:bg-white before:rounded-sm"
                    )}
                >
                    <div className="font-medium text-slate-900 mb-1">Resultado comprovado:</div>
                    <div className="text-slate-700">{study.desc}</div>
                </motion.div>
            )}
        </li>
    );
};

interface CaseCardProps {
    src: string;
    alt: string;
    large?: boolean;
    gradient?: string;
}

const CaseCard = ({ src, alt, large = false, gradient = "from-black/75 via-black/25 to-transparent" }: CaseCardProps) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative group overflow-hidden rounded-2xl shadow-lg aspect-[4/3]"
        >
            <Image
                src={getAssetPath(src)}
                alt={alt}
                fill
                sizes={large ? "(min-width:1024px) 460px, 92vw" : "(min-width:768px) 280px, 68vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={90}
                loading={large ? "eager" : "lazy"}
                priority={large}
            />
            <div
                className={clsx(
                    "absolute inset-0 pointer-events-none bg-gradient-to-t opacity-60 group-hover:opacity-50 transition-opacity",
                    gradient
                )}
            />
        </motion.div>
    );
};

interface StatBadgeProps {
    value: string;
    label: string;
}

const StatBadge = ({ value, label }: StatBadgeProps) => (
    <div className="flex flex-col items-center bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg">
        <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            {value}
        </span>
        <span className="text-xs font-medium text-slate-600 text-center mt-1">
            {label}
        </span>
    </div>
);

/* -------------------------------------------------------------------------- */
/*                             CONTEÚDO PRINCIPAL                            */
/* -------------------------------------------------------------------------- */

interface HeroContentProps {
    inView: boolean;
    activeCase: string | null;
    setActiveCase: (id: string | null) => void;
    badgeListRef: React.RefObject<HTMLUListElement | null>;
    handleBadgeKey: (e: KeyboardEvent, id: string) => void;
}

const HeroContent = ({
    inView,
    activeCase,
    setActiveCase,
    badgeListRef,
    handleBadgeKey
}: HeroContentProps) => {
    return (
        <motion.div
            className="max-w-xl lg:max-w-lg"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerChildren}
        >            {/* Trust badge */}
            <motion.div variants={fadeUp(0)}>
                <div className="inline-flex items-center gap-3 rounded-full border border-slate-200/60 bg-white/90 px-4 py-2 backdrop-blur-md shadow-md">
                    <Image src={getAssetPath("logo-v2.svg")} alt="ARCO Logo" width={24} height={24} />
                    <span className="text-xs font-semibold tracking-wide text-slate-700">
                        Award-Winning Agency 2024
                    </span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                            <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-amber-400">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                        ))}
                    </div>
                </div>
            </motion.div>{/* Main title */}
            <motion.h1
                id="hero-heading"
                className="mt-8 font-serif text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
                variants={fadeUp(0.1)}
            >
                We Transform
                <br />
                <span className="relative">
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                        Traffic into Revenue
                    </span>
                    <svg className="absolute -bottom-4 left-0 w-full h-3 text-emerald-500/60" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.5C36.8333 2.16667 93.6667 1.16667 171.5 2.5C187 3 199 4 199 4"
                            stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                    </svg>
                </span>
            </motion.h1>

            {/* Strategic subtext */}
            <motion.p
                className="mt-8 text-lg leading-relaxed text-slate-700"
                variants={fadeUp(0.2)}
            >
                We specialize in converting visitors into <strong className="font-bold text-emerald-700">high-value clients</strong>.
                Our data-driven approach increases conversion rates by <strong className="font-bold text-emerald-700">38-65%</strong> in
                just 90 days.
            </motion.p>            {/* Case study badges */}
            <motion.div variants={fadeUp(0.3)} className="mt-8">
                <div className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>Proven Results</span>
                </div>

                <ul
                    ref={badgeListRef}
                    className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
                >
                    {CASE_STUDIES.map((study) => (
                        <KpiBadge
                            key={study.id}
                            study={study}
                            isActive={activeCase === study.id}
                            toggle={setActiveCase}
                            onKey={handleBadgeKey}
                        />
                    ))}
                </ul>
            </motion.div>

            {/* Primary and secondary CTAs */}
            <motion.div className="mt-10 flex flex-col sm:flex-row gap-4" variants={fadeUp(0.4)}>
                <Link
                    href="https://github.com/jpcardozx"
                    className="group relative flex items-center justify-center gap-x-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-emerald-500/25 hover:shadow-2xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                    <span>Schedule Free Consultation</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>

                <Link
                    href="https://github.com/jpcardozx/portfolio"
                    className="group flex items-center justify-center gap-x-2 rounded-xl bg-white px-6 py-4 text-sm font-medium text-slate-700 shadow-md ring-1 ring-slate-200 transition-all duration-300 hover:shadow-lg hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                    <span>View Full Portfolio</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                </Link>
            </motion.div>
        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/*                              MOSAICO DE CASES                              */
/* -------------------------------------------------------------------------- */

interface CaseMosaicProps {
    prefersReducedMotion: boolean | undefined;
}

const CaseMosaic = ({ prefersReducedMotion }: CaseMosaicProps) => {
    return (
        <motion.div
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative grid grid-cols-12 gap-4 lg:ml-auto"
        >            {/* Add floating badge with impressive statistic */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -top-12 right-8 z-10"
            >
                <StatBadge value="+217%" label="Average ROI improvement" />
            </motion.div>

            <div className="relative col-span-8 row-span-2">
                <CaseCard
                    src="hero-case-mosaic-1.png"
                    alt="Visual do projeto Nova Ipê"
                    large
                    gradient="from-emerald-900/75 via-emerald-800/20 to-transparent"
                />

                {/* Badge de informação sobreposta */}                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-slate-900">Nova Ipê</h3>
                            <p className="text-sm text-emerald-700">+180% in qualified conversions</p>
                        </div>
                        <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">
                            E-commerce
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-4">
                <CaseCard
                    src="hero-case-mosaic-2.png"
                    alt="Visual do Project Xora"
                    gradient="from-indigo-900/75 via-indigo-800/20 to-transparent"
                />

                {/* Badge de categoria */}
                <div className="absolute top-3 right-3 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                    SaaS
                </div>
            </div>

            <div className="col-span-4">
                <CaseCard
                    src="hero-case-mosaic-3.png"
                    alt="Visual do API Showcase"
                    gradient="from-violet-900/75 via-violet-800/20 to-transparent"
                />

                {/* Badge de categoria */}
                <div className="absolute top-3 right-3 bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold">
                    DevTools
                </div>
            </div>

            <motion.div
                className="col-span-4 col-start-9 flex items-stretch"
                variants={fadeScale()}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.9 }}
            >                <div className="w-full flex flex-col justify-between rounded-2xl border border-slate-200/60 bg-gradient-to-br from-slate-50 to-white p-6 shadow-lg">
                    <div className="space-y-1">
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 md:text-4xl">
                            +25
                        </span>
                        <span className="block text-xs font-medium uppercase tracking-wider text-slate-500">
                            Success Stories
                        </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {["Fintech", "SaaS", "Retail", "Real Estate"].map(tag => (
                            <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <Link
                        href="https://github.com/jpcardozx"
                        className="mt-6 group inline-flex items-center text-xs font-medium text-emerald-600 hover:text-emerald-700"
                    >
                        View all projects
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </motion.div>            {/* Floating stat badge in the lower corner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute -bottom-14 left-12 z-10"
            >
                <StatBadge value="12 days" label="Average time to first results" />
            </motion.div>
        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/*                            COMPONENTE PRINCIPAL                            */
/* -------------------------------------------------------------------------- */

export function HeroCaseShowcase() {
    const prefersReducedMotionRaw = useReducedMotion();
    const prefersReducedMotion = prefersReducedMotionRaw === null ? undefined : prefersReducedMotionRaw;
    const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });
    const [activeCase, setActiveCase] = useState<string | null>(null);
    const badgeListRef = useAccessibleTooltip(activeCase, setActiveCase);

    // Gerenciamento de navegação por teclado
    const handleBadgeKey = (e: KeyboardEvent, id: string) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); // Evita rolagem com espaço
            setActiveCase(activeCase === id ? null : id);
        } else if (e.key === "Escape") {
            setActiveCase(null);
        }
    };

    return (
        <section
            ref={ref}
            aria-labelledby="hero-heading"
            className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 lg:py-32"
        >
            {/* Grade decorativa com padrão mais sutil */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"
            />

            {/* Efeito de gradiente difuso */}
            <div
                aria-hidden="true"
                className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-emerald-100 to-teal-100 opacity-40 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 opacity-30 blur-3xl"
            />

            <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    {/* Coluna de texto */}
                    <HeroContent
                        inView={inView}
                        activeCase={activeCase}
                        setActiveCase={setActiveCase}
                        badgeListRef={badgeListRef}
                        handleBadgeKey={handleBadgeKey}
                    />

                    {/* Coluna de mosaico */}
                    <CaseMosaic prefersReducedMotion={prefersReducedMotion} />
                </div>
            </div>            {/* Trust marker at the bottom */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="mt-20 flex justify-center"
            >
                <div className="flex items-center gap-8 flex-wrap justify-center">
                    <span className="text-sm font-medium text-slate-500">Trusted Partners:</span>
                    {['google.svg', 'aws.svg', 'salesforce.svg', 'hubspot.svg'].map((logo, i) => (
                        <Image
                            key={logo}
                            src={getAssetPath(`partner-${logo}`)}
                            alt="Partner logo"
                            width={i === 0 ? 80 : 120}
                            height={32}
                            className="h-8 w-auto grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

export default HeroCaseShowcase;