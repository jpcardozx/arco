/* ───────────────── ArcoPortfolioAdvanced.tsx ───────────────── */
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useSpring, useInView } from "framer-motion";
import clsx from "clsx";
import { Rocket, Stars, GaugeCircle, BadgeCheck, Github, Linkedin, Twitter } from "lucide-react";
/* -------------------------------------------------------------------------- */
/* 1 · TOKENS DE DESIGN                                                       */
/* -------------------------------------------------------------------------- */
const TOKENS = {
    color: {
        emerald: { grad: "from-emerald-600 to-teal-500", text: "text-emerald-400", shadow: "shadow-emerald-600/20" },
        blue: { grad: "from-blue-600 to-indigo-500", text: "text-blue-400", shadow: "shadow-blue-600/20" },
        purple: { grad: "from-purple-600 to-pink-500", text: "text-purple-400", shadow: "shadow-purple-600/20" },
        amber: { grad: "from-amber-600 to-orange-500", text: "text-amber-400", shadow: "shadow-amber-600/20" },
    },
    radius: "rounded-2xl",
    spacing: { Y: "py-20 md:py-32", X: "px-4 md:px-10" },
};

/* -------------------------------------------------------------------------- */
/* 2 · COPY & DADOS                                                           */
/* -------------------------------------------------------------------------- */
const COPY = {
    hero: {
        name: "Pedro Cardozo",
        headline: "Arquitetura de Conversão & Performance",
        sub: "I scale your pipeline in 90 days — without inflating CAC. We deliver strategic digital presence development for elite businesses.",
        desc: "We prove the value of our work through metrics and KPIs. I scale funnels, increase ticket value, and deliver measurable performance.",
    },
    metrics: [
        { id: "clients", label: "Satisfied Clients", value: 27, prefix: "+" },
        { id: "awards", label: "International Certifications", value: 12 },
        { id: "roi", label: "Initial ROI Expected", value: 65, suffix: "%", tint: "amber" as const },
        { id: "ret", label: "Annual Renewals - Churn Reversal", value: 95, suffix: "%", tint: "emerald" as const },
    ],
    expertise: [
        {
            id: "conv",
            title: "Arquitetura de Conversão",
            desc: "Audited funnels and 3× LTV — visitors become $100k contracts.",
            color: "emerald",
            Icon: Rocket,
            mini: "Mobile conversion 1.9% → 8.2% (45d).",
        },
        {
            id: "ux",
            title: "Persuasive UX",
            desc: "Interfaces that break objections in 6 clicks and increase average ticket +37%.",
            color: "purple",
            Icon: Stars,
            mini: "+37% avg. ticket in 60d (SaaS).",
        },
        {
            id: "perf",
            title: "Performance 100/100",
            desc: "Green Core Web Vitals: +27% sales after LCP < 1s.",
            color: "blue",
            Icon: GaugeCircle,
            mini: "LCP 3.8s → 0.9s (e-commerce).",
        },
    ],
    clients: [
        { id: "ipe", name: "Ipê Digital", seg: "E-commerce", logo: "/darkIpeLogo.png", color: "emerald", case: "+180% revenue in 6m" },
        { id: "xora", name: "Xora", seg: "SaaS", logo: "/logoXora.svg", color: "blue", case: "Lighthouse 97/100" },
        { id: "fin", name: "Finmark", seg: "Fintech", logo: "/logo-finmark.svg", color: "purple", case: "+$2.8M pipeline" },
    ],
    timeline: [
        { y: "2023", t: "Finmark Case Study", d: "+$2.8M in 60d (ROI 11:1).", h: "ABComm Award Winner", color: "purple" },
        { y: "2022", t: "Framework Arquitetura de Conversão™", d: "Aplicado a 14 projetos premium — 100% de taxa de sucesso.", h: "Lançamento v2.0", color: "emerald" },
        { y: "2020", t: "Premium Pivot", d: "Focus exclusively on high-ticket contracts.", h: "95% Retention", color: "amber" },
    ],
};

/* -------------------------------------------------------------------------- */
/* 3 · ATÔMICOS                                                               */
/* -------------------------------------------------------------------------- */
const Badge = ({ color, children }: { color: keyof typeof TOKENS.color; children: string }) => (
    <span className={clsx("px-3 py-1 text-xs font-semibold text-white rounded-full",
        `bg-gradient-to-r ${TOKENS.color[color].grad}`)}>
        {children}
    </span>
);

/* Social icons */
const Social = ({ href, label, Icon }: { href: string; label: string; Icon: typeof Github }) => (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
        className="p-2 rounded-full bg-slate-800/90 hover:bg-emerald-500 transition-colors">
        <Icon className="w-5 h-5 text-white" />
    </a>
);

/* Metric counter (spring) */
function Metric({ value, suffix, label, tint }: {
    value: number; suffix?: string; label: string; tint?: keyof typeof TOKENS.color;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const spring = useSpring(isInView ? value : 0, { stiffness: 160, damping: 22 });
    const [v, setV] = useState(0);
    useEffect(() => spring.on("change", n => setV(Math.round(n))), [spring]);

    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 14 }}
            transition={{ duration: .45 }} className="text-center">
            <span className={clsx("text-3xl md:text-4xl font-extrabold",
                tint ? TOKENS.color[tint].text : "text-white")}>
                {v}{suffix}
            </span>
            <div className="text-xs uppercase tracking-wide text-slate-400 mt-1">{label}</div>
        </motion.div>
    );
}

/* -------------------------------------------------------------------------- */
/* 4 · SEÇÕES                                                                 */
/* -------------------------------------------------------------------------- */
const Background = () => (
    <>
        <div className="hidden md:block absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px]
                    rounded-full blur-3xl opacity-50 bg-gradient-to-br from-emerald-600/20 to-teal-500/5" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px]
                    rounded-full blur-3xl opacity-40 bg-gradient-to-br from-blue-600/20 to-indigo-500/5" />
    </>
);

/* ---- Hero / Profile ---- */
function Hero() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {/* Avatar responsivo */}
            <div className={clsx("relative overflow-hidden border-4 border-slate-800 shadow-2xl",
                TOKENS.radius, "w-[clamp(8rem,20vw,13rem)] aspect-[3/4]")}>
                <Image
                    src="/profile.png"
                    alt={COPY.hero.name}
                    fill
                    sizes="(max-width:768px) 40vw, (max-width:1024px) 25vw, 13rem"
                    className="object-cover"
                />
                <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-slate-900/90 to-transparent flex gap-2">
                    <Social href="https://github.com/jpcardozx" label="GitHub" Icon={Github} />
                    <Social href="https://linkedin.com/in/joaopedrocardozo" label="LinkedIn" Icon={Linkedin} />
                    <Social href="https://twitter.com/jpcardozx" label="Twitter" Icon={Twitter} />
                </div>
            </div>

            {/* Texto */}
            <div className="md:col-span-2 flex flex-col justify-center">
                <h1 className="text-4xl font-extrabold text-white mb-2">{COPY.hero.headline}</h1>
                <h2 className="text-emerald-400 text-xl font-semibold mb-3">{COPY.hero.sub}</h2>
                <p className="text-slate-300 max-w-xl mb-4">
                    Consultoria que comprova valor com números. Escalo funis, elevo ticket e entrego performance mensurável.
                </p>
                <div className="flex flex-wrap gap-2">
                    <Badge color="emerald">Conversão estratégica</Badge>
                    <Badge color="purple">UX persuasivo</Badge>
                    <Badge color="blue">Performance 100/100</Badge>
                </div>
            </div>
        </div>
    );
}

/* ---- Metrics ---- */
const Metrics = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
        {COPY.metrics.map(m => <Metric key={m.id} {...m} />)}
    </div>
);

/* ---- Expertise Selector ---- */
function Expertise() {
    const [active, setActive] = useState(COPY.expertise[0].id);
    return (
        <section className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8">Expertise central</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" role="tablist">
                {COPY.expertise.map(({ id, title, desc, color, Icon, mini }) => {
                    const act = id === active; const tok = TOKENS.color[color as keyof typeof TOKENS.color];
                    return (
                        <button key={id} role="tab" aria-selected={act}
                            onClick={() => setActive(id)} onKeyDown={e => ["Enter", " "].includes(e.key) && setActive(id)}
                            className={clsx("p-6 flex flex-col gap-3 border-2 transition-all focus:outline-none focus:ring-2 ring-offset-2 ring-offset-slate-900",
                                TOKENS.radius,
                                act ? `bg-gradient-to-br ${tok.grad} border-transparent ${tok.shadow}`
                                    : "bg-slate-800/60 border-slate-700 hover:bg-slate-700")}>
                            <span className={clsx("p-3", TOKENS.radius,
                                act ? "bg-white/20" : `bg-gradient-to-br ${tok.grad} bg-opacity-10`)}>
                                <Icon className="w-6 h-6 text-white" />
                            </span>
                            <span className={clsx("text-lg font-bold", act ? "text-white" : "text-slate-100")}>{title}</span>
                            <span className={clsx(act ? "text-slate-200" : "text-slate-400")}>{desc}</span>
                            {act && <span className="text-xs mt-2 text-slate-200 flex items-center gap-1"><BadgeCheck className="w-3 h-3" />{mini}</span>}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

/* ---- Clients ---- */
function Clients() {
    return (
        <section className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8">Clientes de elite</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {COPY.clients.map(({ id, name, seg, logo, color, case: caseTxt }) => {
                    const tok = TOKENS.color[color as keyof typeof TOKENS.color];
                    return (
                        <div key={id} className="group relative p-4 bg-slate-800/70 border border-slate-700 rounded-xl flex items-center justify-between">
                            <div className="flex items-center">
                                <Image src={logo} alt={name} width={40} height={40} className="object-contain" />
                                <div className="ml-4">
                                    <span className="font-bold text-white">{name}</span>
                                    <span className={clsx("block text-xs", tok.text)}>{seg}</span>
                                </div>
                            </div>
                            <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center bg-slate-900 text-slate-400 group-hover:bg-gradient-to-r", tok.grad)}>
                                <Rocket className="w-4 h-4" />
                            </div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-all">
                                {caseTxt}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

/* ---- Timeline ---- */
function Timeline() {
    return (
        <section>
            <h3 className="text-2xl font-bold text-white mb-8">Highlights da trajetória</h3>
            <div className="flex flex-col gap-10">
                {COPY.timeline.map(({ y, t, d, h, color }, idx) => {
                    const tok = TOKENS.color[color as keyof typeof TOKENS.color];
                    return (
                        <motion.div key={y} initial={{ opacity: 0, x: idx % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} transition={{ duration: .55, delay: idx * 0.06 }}
                            className={clsx("bg-slate-800/70 border border-slate-700 p-6 shadow-lg", TOKENS.radius)}>
                            <span className="text-xs bg-slate-900 px-2 py-0.5 rounded-full text-slate-300 mb-2 inline-block">{y}</span>
                            <h4 className="text-lg font-bold text-white">{t}</h4>
                            <p className="text-slate-300 mb-3">{d}</p>
                            <div className={clsx("inline-flex items-center gap-2 text-sm p-2",
                                `bg-gradient-to-r ${tok.grad} bg-opacity-20`, TOKENS.radius)}>
                                <BadgeCheck className={clsx("w-4 h-4", tok.text)} />
                                <span className={tok.text}>{h}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* 5 · EXPORT                                                                 */
/* -------------------------------------------------------------------------- */
export default function AboutMe() {
    return (
        <section className={clsx("relative", TOKENS.spacing.Y, TOKENS.spacing.X, "bg-slate-900 overflow-hidden")}>
            <Background />
            <div className="max-w-7xl mx-auto relative z-10">
                <Hero />
                <Metrics />
                <Expertise />
                <Clients />
                <Timeline />
            </div>
        </section>
    );
}
