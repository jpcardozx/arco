"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    ShieldCheck,
    ExternalLink,
    Quote,
    ArrowRight,
    CheckCircle,
    LockKeyhole
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/*                           TYPOGRAPHY SYSTEM                                */
/* -------------------------------------------------------------------------- */

interface TypographyProps {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}

const Typography = {
    Editorial: ({ children, className = "", ...props }: TypographyProps) => (
        <span className={`font-serif ${className}`} {...props}>{children}</span>
    ),

    Technical: ({ children, className = "", ...props }: TypographyProps) => (
        <span className={`font-sans ${className}`} {...props}>{children}</span>
    ),

    Data: ({ children, className = "", ...props }: TypographyProps) => (
        <span className={`font-mono ${className}`} {...props}>{children}</span>
    )
};

/* -------------------------------------------------------------------------- */
/*                         STRATEGIC CONTENT                                  */
/* -------------------------------------------------------------------------- */

// Core differentiators aligned with ARCO's perception framework
const STRATEGIC_DIFFERENTIATORS = [
    {
        icon: <CheckCircle className="w-5 h-5 text-gray-300" />,
        text: "Individual, precise diagnosis: real analysis of your perception-value gaps, not generic presentations."
    },
    {
        icon: <LockKeyhole className="w-5 h-5 text-gray-300" />,
        text: "Complete confidentiality: operational NDA and rigorous professional ethics."
    },
    {
        icon: <ArrowRight className="w-5 h-5 text-gray-300" />,
        text: "Actionable recommendations — practical insights prioritized by economic impact, without sales pressure."
    },
];

// Testimonial component with strategic framing
function TestimonialModal({ open, onClose }: { open: boolean, onClose: () => void }) {
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
                    className="relative max-w-lg w-full bg-gray-900 border border-gray-800 rounded-lg shadow-xl px-8 py-10 flex flex-col items-center"
                    onClick={e => e.stopPropagation()}
                >
                    <Quote className="w-10 h-10 mb-4 text-gray-600" />
                    <Typography.Editorial className="text-lg md:text-xl text-gray-200 italic text-center mb-5 leading-relaxed">
                        "We chose ARCO for their direct approach and clarity in recommendations. There were no empty promises, just critical analysis of the points that needed improvement. The diagnosis helped our team prioritize what actually generated results."
                    </Typography.Editorial>

                    <div className="flex items-center gap-3 mt-2">
                        <Image
                            src="/logo-finmark.svg"
                            alt="Finmark"
                            width={32}
                            height={32}
                            className="rounded-full bg-gray-800 p-1 border border-gray-700"
                        />
                        <Typography.Technical className="text-sm text-gray-400">
                            CEO, Finmark
                        </Typography.Technical>
                        <Typography.Data className="ml-2 px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700">
                            ArcSight Snapshot™
                        </Typography.Data>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:bg-gray-800 transition-colors"
                        aria-label="Close testimonial"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 6 6 18M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function StrategicClosing() {
    const [showModal, setShowModal] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

    return (
        <section
            ref={sectionRef}
            className={clsx(
                "relative my-32 py-20 px-6 sm:px-8 max-w-5xl mx-auto",
                "overflow-hidden bg-gray-950 rounded-lg shadow-xl border border-gray-800"
            )}
        >
            {/* Strategic badge */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: -20 }}
                animate={isInView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.15 }}
                className={clsx(
                    "absolute -top-6 left-1/2 -translate-x-1/2 z-20 px-6 py-2 flex items-center gap-2",
                    "rounded-full bg-gray-900 border border-gray-700 text-gray-200 shadow-md"
                )}
            >
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <Typography.Technical className="font-medium">
                    Perception-Value Assessment
                </Typography.Technical>
            </motion.div>

            {/* Editorial headline and framework introduction */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-3xl mx-auto text-center mb-12"
            >
                <Typography.Editorial className="text-2xl md:text-3xl text-gray-100 mb-5 block leading-tight">
                    Technical excellence requires precise symbolic representation to achieve true market value.
                </Typography.Editorial>

                <Typography.Technical className="text-base md:text-lg text-gray-400 block">
                    Identify the specific gaps between your delivered value and market perception.
                    Our diagnostic provides a structured assessment with actionable corrections,
                    prioritized by economic impact and implementation feasibility.
                </Typography.Technical>
            </motion.div>

            {/* Strategic differentiators */}
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                {STRATEGIC_DIFFERENTIATORS.map(({ icon, text }, i) => (
                    <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, delay: 0.25 + (i * 0.1) }}
                        className={clsx(
                            "flex items-start gap-3 p-4 rounded-lg bg-gray-900 border border-gray-800",
                            "shadow-md"
                        )}
                    >
                        <div className="mt-0.5 p-1.5 rounded-full bg-gray-800 border border-gray-700">
                            {icon}
                        </div>
                        <Typography.Technical className="text-sm text-gray-300">
                            {text}
                        </Typography.Technical>
                    </motion.li>
                ))}
            </ul>

            {/* Strategic CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex flex-col items-center gap-3 mb-12"
            >
                <Link
                    href="/diagnose"
                    className={clsx(
                        "group inline-flex items-center justify-center px-8 py-3",
                        "rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-100 shadow-lg transition-all",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600"
                    )}
                >
                    <Typography.Technical className="font-medium mr-2">
                        Request ArcSight Snapshot™
                    </Typography.Technical>
                    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>

                <Typography.Data className="text-xs text-gray-500 uppercase tracking-wide mt-2">
                    $147 • 24-hour turnaround • No sales pressure
                </Typography.Data>
            </motion.div>

            {/* Testimonial with perception framework language */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={clsx(
                    "mt-8 mx-auto max-w-xl px-6 py-6 rounded-lg border border-gray-800 bg-gray-900 shadow-lg",
                    "relative"
                )}
            >
                <button
                    onClick={() => setShowModal(true)}
                    className="absolute top-3 right-3 p-2 rounded-full text-gray-400 bg-gray-800/80 hover:bg-gray-800 transition-colors"
                    aria-label="Expand testimonial"
                >
                    <Quote className="w-4 h-4" />
                </button>

                <Typography.Editorial className="text-base md:text-lg text-gray-300 italic mb-4 block">
                    "ARCO's analysis helped us make decisions based on data, not assumptions. Their focus on what truly mattered accelerated our results curve."
                </Typography.Editorial>

                <div className="flex items-center gap-3">
                    <Image
                        src="/logo-finmark.svg"
                        alt="Finmark"
                        width={28}
                        height={28}
                        className="rounded-full bg-gray-800 p-1 border border-gray-700"
                    />
                    <Typography.Technical className="text-sm text-gray-400">
                        CEO, Finmark
                    </Typography.Technical>
                    <Typography.Data className="ml-2 px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700">
                        ArcSight Snapshot™
                    </Typography.Data>
                </div>
            </motion.div>

            <TestimonialModal open={showModal} onClose={() => setShowModal(false)} />

            {/* Institutional commitment */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className={clsx(
                    "mt-12 px-6 md:px-14 py-6 bg-gray-900 border border-gray-800 rounded-lg shadow-lg text-center"
                )}
            >
                <Typography.Editorial className="text-base md:text-lg text-gray-300 mb-3 block">
                    <span className="block italic mb-2 text-gray-500">ARCO Commitment</span>
                    Honest, technical diagnosis free from commercial interests.
                    If there's no potential for significant impact, we state that at the outset —
                    delivering clarity, not illusion.
                </Typography.Editorial>

                <Typography.Technical className="text-gray-300 font-medium block mt-4">
                    J.P. Cardozo <span className="text-gray-500 ml-2 text-sm font-normal">/ ARCO Founder</span>
                </Typography.Technical>
            </motion.div>

            {/* Subtle background decoration */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="absolute left-[-15%] bottom-[-10%] w-96 h-96 rounded-full bg-gradient-to-br from-gray-800/30 to-gray-900/10 blur-3xl opacity-60" />
                <div className="absolute right-[-10%] top-[-5%] w-80 h-80 rounded-full bg-gradient-to-br from-gray-800/20 to-gray-900/5 blur-3xl opacity-40" />
            </div>
        </section>
    );
}