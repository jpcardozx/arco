import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, BadgeHelp, Quote, LockKeyhole, Sparkle, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

// Objective data on ARCO differentiators
const DIFFERENTIATORS = [
    { icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />, text: "100% personalized assessment: real analysis of your scenario, not generic presentations." },
    { icon: <LockKeyhole className="w-5 h-5 text-blue-400" />, text: "Complete confidentiality: operational NDA and rigorous professional ethics." },
    { icon: <Sparkles className="w-5 h-5 text-amber-400" />, text: "Delivery with practical recommendations — always actionable, no fluff or 'sales meetings'." },
];

// Depoimento institucional realista
function DepoimentoModal({ open, onClose }: { open: boolean, onClose: () => void }) {
    if (!open) return null;
    return (
        <AnimatePresence>
            <motion.div
                key="modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.98, y: 40 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.98, y: 40 }}
                    transition={{ type: "spring", bounce: 0.24, duration: 0.35 }}
                    className="relative max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center"
                    onClick={e => e.stopPropagation()}
                >
                    <Quote className="w-12 h-12 mb-3 text-emerald-400/70" />
                    <blockquote className="text-lg md:text-xl text-slate-200 italic text-center mb-4 leading-relaxed">
                        “Optamos pela ARCO pela abordagem direta e clareza nas recomendações. Não teve promessa vazia e, sim, análise crítica dos pontos que precisavam melhorar. O diagnóstico ajudou nosso time a priorizar o que realmente gerava resultado.”
                    </blockquote>
                    <figcaption className="flex items-center gap-3 mt-2">
                        <Image
                            src="/logo-finmark.svg"
                            alt="Finmark"
                            width={32}
                            height={32}
                            className="rounded-full bg-slate-800 p-1 border border-emerald-700"
                        />
                        <span className="text-sm text-slate-400">CEO Finmark</span>
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full">Diagnóstico ARCO</span>
                    </figcaption>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 p-2 rounded-full text-slate-400 hover:bg-slate-800 focus-visible:ring-2 ring-emerald-500 transition"
                        aria-label="Fechar depoimento"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6 6 18M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function FechamentoArco() {
    const [showModal, setShowModal] = useState(false);

    return (
        <section className={clsx(
            "relative mt-32 mb-8 py-20 px-4 sm:px-8 max-w-5xl mx-auto",
            "overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-900/60 rounded-3xl shadow-2xl border border-slate-800"
        )}>
            {/* Selo institucional */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: -22 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 180, delay: 0.15 }}
                className={clsx(
                    "absolute -top-8 left-1/2 -translate-x-1/2 z-20 px-6 py-2 flex items-center gap-2",
                    "rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold shadow-xl ring-2 ring-emerald-600/50"
                )}
            >                <ShieldCheck className="w-5 h-5" />
                ARCO Professional Assessment
            </motion.div>            {/* Headline and objective subcopy */}
            <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.21 }}
                className="text-2xl md:text-3xl font-bold text-white text-center mb-5 drop-shadow-lg"
            >
                Strategic Assessment for Business Decisions — Straight to the Point.
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.27 }}
                className="text-lg text-slate-300 text-center max-w-2xl mx-auto mb-8"
            >
                Identify the true growth limiters and priorities of your digital funnel. No forced sales. No superficial analysis. You receive a detailed assessment with practical recommendations, prioritized by impact and feasibility.
            </motion.p>            {/* List of technical and operational differentiators */}
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-5 mb-9">
                {DIFFERENTIATORS.map(({ icon, text }, i) => (
                    <li key={i} className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700",
                        "shadow-sm text-base text-slate-200 font-medium"
                    )}>
                        {icon} {text}
                    </li>
                ))}
            </ul>

            {/* CTA with visual feedback */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.32, type: "spring" }}
                className="flex flex-col items-center gap-3 mb-9"
            >
                <motion.a
                    href="https://calendly.com/jpcardozx/consultation"
                    target="_blank"
                    whileHover={{ scale: 1.045, boxShadow: "0px 0px 0 3px #2dd4bf44" }}
                    whileTap={{ scale: 0.97 }}
                    className={clsx(
                        "group inline-flex items-center justify-center px-10 py-4 font-bold text-lg",
                        "rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg transition-all",
                        "hover:brightness-105 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40"
                    )}
                >
                    Request Strategic Assessment
                    <BadgeHelp className="ml-2 w-5 h-5 group-hover:animate-bounce" />
                </motion.a>
                <span className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-medium uppercase tracking-wide">
                    Independent assessment — no commitment, no sales approach
                </span>
            </motion.div>

            {/* Depoimento institucional sóbrio */}
            <motion.figure
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.36 }}
                className={clsx(
                    "mt-8 mx-auto max-w-xl px-6 py-6 rounded-2xl border border-slate-700 bg-slate-900/85 shadow-lg",
                    "relative flex flex-col items-center"
                )}
            >
                <button
                    onClick={() => setShowModal(true)}
                    className="absolute top-3 right-3 p-2 rounded-full text-emerald-400 bg-slate-800/60 hover:bg-slate-900/80 hover:scale-105 transition"
                    aria-label="Expandir depoimento"
                >
                    <Quote className="w-6 h-6" />
                </button>
                <blockquote className="text-base md:text-lg text-slate-200 italic text-center mb-3 leading-relaxed">
                    “A análise da ARCO nos ajudou a tomar decisões com base em dados e não em achismo. O foco no que realmente importava acelerou nossa curva de resultado.”
                </blockquote>
                <figcaption className="flex items-center gap-3 mt-2">
                    <Image
                        src="/logo-finmark.svg"
                        alt="Finmark"
                        width={32}
                        height={32}
                        className="rounded-full bg-slate-800 p-1 border border-emerald-700"
                    />
                    <span className="text-sm text-slate-400">CEO Finmark</span>
                    <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full">Diagnóstico ARCO</span>
                </figcaption>
            </motion.figure>
            <DepoimentoModal open={showModal} onClose={() => setShowModal(false)} />

            {/* Manifesto institucional objetivo */}
            <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className={clsx(
                    "mt-10 px-5 md:px-14 py-6 bg-gradient-to-br from-slate-800/80 via-slate-900/70 to-slate-800/40 border border-slate-700 rounded-2xl shadow-lg text-center"
                )}
            >
                <p className="text-base md:text-lg text-slate-300 mb-2 font-medium" style={{ fontFamily: "serif" }}>
                    <span className="block italic mb-1 text-slate-400/80">Compromisso ARCO</span>
                    Diagnóstico honesto, técnico e livre de interesses comerciais.
                    Se não houver potencial de impacto relevante, dizemos isso logo no início — e entregamos clareza, não ilusão.
                </p>
                <span className="block text-emerald-400 font-extrabold text-base mt-2">
                    João Pedro Cardozo <span className="text-slate-400 font-medium ml-2 text-sm">/ Founder ARCO</span>
                </span>
            </motion.div>

            {/* Decoração de fundo editorial sutil */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute left-[-12%] bottom-[-8%] w-56 h-56 rounded-full bg-gradient-to-br from-emerald-600/25 to-teal-500/10 blur-3xl opacity-45" />
                <div className="absolute right-[-10%] top-[-8%] w-40 h-40 rounded-full bg-gradient-to-br from-amber-500/12 to-emerald-600/10 blur-3xl opacity-20" />
            </div>
        </section>
    );
}
