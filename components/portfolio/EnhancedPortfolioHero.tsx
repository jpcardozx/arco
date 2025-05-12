"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function EnhancedPortfolioHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacityParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const yParallax = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
    const scaleParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <div ref={containerRef} className="relative min-h-[90vh] bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/texture3.png')] opacity-20 mix-blend-soft-light" />
                <div className="absolute inset-0 grid-pattern opacity-10" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />
                <div className="animated-bg" />
            </div>

            {/* Content */}
            <motion.div
                style={{ opacity: opacityParallax, y: yParallax, scale: scaleParallax }}
                className="relative z-10 container mx-auto px-6 py-32 flex flex-col justify-center min-h-[90vh]"
            >
                <div className="max-w-4xl">
                    {/* Pre-heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center mb-8 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-800/50"
                    >
                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-3"></span>
                        <span className="text-sm text-blue-300 font-medium">Strategic Perception Engineering</span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-serif font-medium leading-tight text-white mb-6"
                    >
                        Translating Technical Excellence into Market <span className="text-blue-400">Value Recognition</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-neutral-300 mb-12 max-w-2xl"
                    >
                        I specialize in correcting the misalignment between your delivered value and market perception to unlock premium pricing power, shorten sales cycles, and increase conversion rates.
                    </motion.p>

                    {/* Key metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        {[
                            { value: "+87%", label: "Average conversion lift" },
                            { value: "2.4×", label: "Price positioning increase" },
                            { value: "-63%", label: "Reduction in sales cycle time" }
                        ].map((metric, index) => (
                            <div key={index} className="bg-neutral-800/60 backdrop-blur border border-neutral-700 rounded-xl p-6">
                                <div className="text-3xl font-mono text-blue-400 font-medium mb-2">{metric.value}</div>
                                <div className="text-neutral-400 text-sm">{metric.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="#case-studies"
                            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium flex items-center justify-center"
                        >
                            View Case Studies
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            href="#contact"
                            className="px-8 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-all font-medium border border-neutral-700"
                        >
                            Schedule a Consultation
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex flex-col items-center"
                >
                    <span className="text-neutral-400 text-sm mb-2">Scroll to explore</span>
                    <ChevronDown className="h-5 w-5 text-neutral-400" />
                </motion.div>
            </motion.div>
        </div>
    );
}
