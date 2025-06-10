"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

// Helper para caminhos de assets
const getAssetPath = (src: string): string => src.startsWith("/") ? src : `/${src}`;

/* -------------------------------------------------------------------------- */
/*                           INTERFACES E DADOS                               */
/* -------------------------------------------------------------------------- */

interface MetricItem {
    id: string;
    value: string;
    label: string;
    icon: React.ReactNode;
    description: string;
    color: string;
}

interface CaseItem {
    id: string;
    client: string;
    title: string;
    description: string;
    result: string;
    tags: string[];
    image: string;
    logo: string;
    color: string;
}

// More readable and impactful metric data
const METRICS: MetricItem[] = [
    {
        id: "m1",
        value: "285%",
        label: "B2B Lead Growth",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
        ),
        description: "B2B funnel optimization for NovaIpê",
        color: "from-blue-500 to-indigo-600"
    },
    {
        id: "m2",
        value: "8.2%",
        label: "Mobile Conversion Rate",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
                <path fillRule="evenodd" d="M8.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h6.75c1.035 0 1.875-.84 1.875-1.875V3.375c0-1.036-.84-1.875-1.875-1.875h-6.75zM7.5 3.375c0-.207.168-.375.375-.375h8.25c.207 0 .375.168.375.375v17.25c0 .207-.168.375-.375.375h-8.25a.375.375 0 01-.375-.375V3.375z" clipRule="evenodd" />
            </svg>
        ),
        description: "Increased from 1.9% to 8.2% in 60 days",
        color: "from-emerald-500 to-teal-600"
    },
    {
        id: "m3",
        value: "0.4s",
        label: "Loading Time",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
            </svg>
        ),
        description: "Core Web Vitals 100/100",
        color: "from-amber-500 to-orange-600"
    },
    {
        id: "m4",
        value: "42%",
        label: "CAC Reduction",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
            </svg>
        ),
        description: "Acquisition campaign optimization",
        color: "from-purple-500 to-violet-600"
    }
];

// Simplified case studies for better readability
const CASE_STUDIES: CaseItem[] = [
    {
        id: "case1",
        client: "Ipê",
        title: "Conversion Funnel Optimization",
        description: "Mobile journey redesign focused on reducing friction and increasing qualified conversions.",
        result: "180% revenue growth in 45 days",
        tags: ["E-commerce", "UX Design", "CRO"],
        image: "/case-thumb-ipe.jpg",
        logo: "/logo-novaipe.svg",
        color: "emerald"
    },
    {
        id: "case2",
        client: "Xora",
        title: "SaaS Performance Re-engineering",
        description: "Implementation of headless architecture with complete Core Web Vitals optimization.",
        result: "62% increase in trial conversions",
        tags: ["SaaS", "Performance", "Front-end"],
        image: "/case-xora-full.jpg",
        logo: "/logo-xora.svg",
        color: "blue"
    }
];

/* -------------------------------------------------------------------------- */
/*                       COMPONENTES AUXILIARES                               */
/* -------------------------------------------------------------------------- */

// Card de métrica com layout simplificado e mais legível
const MetricCard = ({ metric }: { metric: MetricItem }) => {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
        >
            <div className="flex items-center mb-4">
                <div className={clsx(
                    "flex items-center justify-center p-2 rounded-xl",
                    `bg-gradient-to-r ${metric.color} text-white`
                )}>
                    {metric.icon}
                </div>
                <div className="ml-3">
                    <span className={clsx(
                        "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r",
                        metric.color
                    )}>
                        {metric.value}
                    </span>
                </div>
            </div>

            <h3 className="text-base font-semibold text-slate-900 mb-2">
                {metric.label}
            </h3>

            <p className="text-sm text-slate-600">
                {metric.description}
            </p>
        </motion.div>
    );
};

// Card de caso de estudo com layout melhorado
const CaseCard = ({ caseItem }: { caseItem: CaseItem }) => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
        >
            <div className="grid md:grid-cols-2 gap-0">
                {/* Imagem */}
                <div className="relative h-60 md:h-full">
                    <Image
                        src={getAssetPath(caseItem.image)}
                        alt={`${caseItem.client} projeto`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div className={clsx(
                        "absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r",
                        caseItem.color === "emerald" ? "from-emerald-900/80 to-transparent" :
                            "from-blue-900/80 to-transparent"
                    )} />

                    <div className="absolute left-4 bottom-4 flex items-center bg-white/90 rounded-lg p-2 backdrop-blur-sm">
                        <Image
                            src={getAssetPath(caseItem.logo)}
                            alt={caseItem.client}
                            width={24}
                            height={24}
                        />
                        <span className="ml-2 font-medium text-slate-900">
                            {caseItem.client}
                        </span>
                    </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {caseItem.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className={clsx(
                                    "px-2 py-1 text-xs font-medium rounded-full",
                                    caseItem.color === "emerald" ? "bg-emerald-100 text-emerald-700" :
                                        "bg-blue-100 text-blue-700"
                                )}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {caseItem.title}
                    </h3>

                    <p className="text-slate-600 text-sm mb-4">
                        {caseItem.description}
                    </p>

                    <div className={clsx(
                        "p-3 rounded-lg mb-4",
                        caseItem.color === "emerald" ? "bg-emerald-50" : "bg-blue-50"
                    )}>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                className={clsx(
                                    "w-4 h-4 mr-2",
                                    caseItem.color === "emerald" ? "text-emerald-600" : "text-blue-600"
                                )}>
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                            <span className={clsx(
                                "text-sm font-bold",
                                caseItem.color === "emerald" ? "text-emerald-700" : "text-blue-700"
                            )}>
                                {caseItem.result}
                            </span>
                        </div>
                    </div>

                    <Link
                        href={`/cases/${caseItem.id}`}
                        className={clsx(
                            "inline-flex items-center text-sm font-medium",
                            caseItem.color === "emerald" ? "text-emerald-600" : "text-blue-600"
                        )}
                    >
                        Ver estudo completo
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                            <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/*                           COMPONENTE PRINCIPAL                             */
/* -------------------------------------------------------------------------- */

export function ContentSection() {
    const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className="py-16 px-4 md:py-24 lg:py-32 bg-slate-50">
            <div className="container mx-auto max-w-6xl">                {/* Simplified and more readable introduction */}
                <motion.div
                    ref={introRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center mb-3 bg-slate-100 px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-slate-700">Proven Results</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                        We Convert Visitors into{" "}
                        <span className="text-emerald-600">Loyal Clients</span>
                    </h2>

                    <p className="text-lg text-slate-600">
                        Our methodology focuses on <strong>measurable results</strong> that
                        directly impact your revenue.
                    </p>
                </motion.div>

                {/* Grid de métricas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {METRICS.map(metric => (
                        <MetricCard key={metric.id} metric={metric} />
                    ))}
                </div>                {/* Case studies */}
                <div className="space-y-8 mb-16">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                        Success Stories
                    </h3>

                    {CASE_STUDIES.map((caseItem) => (
                        <CaseCard key={caseItem.id} caseItem={caseItem} />
                    ))}
                </div>

                {/* Simplified final CTA */}
                <motion.div
                    ref={ctaRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-xl p-8 shadow-lg border border-slate-100"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                Ready to Increase Your Conversions?
                            </h3>
                            <p className="text-slate-600">
                                Schedule a free consultation and discover growth opportunities.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 transition-colors px-6 py-3 rounded-lg text-white font-medium"
                        >
                            Schedule Consultation
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-2">
                                <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/*                              INTEGRAÇÃO                                    */
/* -------------------------------------------------------------------------- */

export default function IntegratedPage() {
    return (
        <main>
            {/* Importar o HeroCaseShowcase */}
            {/* <HeroCaseShowcase /> */}

            {/* Componente ContentSection otimizado */}
            <ContentSection />
        </main>
    );
}