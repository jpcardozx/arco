'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

export default function EnhancedCTA() {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const testimonialQuotes = [
        { text: "Revenue increased 47% in 90 days", company: "TechFlow" },
        { text: "Cut deployment time by 65%", company: "FinanceCore" },
        { text: "System uptime now 99.8%", company: "LogiStack" }
    ];

    return (
        <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800 text-white py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Unlock Hidden Revenue?
                        </h2>
                        <p className="text-xl mb-6 text-blue-100">
                            Get a free 30-minute revenue audit and discover exactly where you're losing money
                        </p>

                        {/* Value Props */}
                        <div className="flex flex-wrap justify-center gap-6 mb-10">
                            {[
                                "Free 30-min audit",
                                "ROI guarantee",
                                "Results in 60 days"
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="flex items-center gap-2 text-blue-100"
                                >
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span>{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <motion.a
                            href="#contact"
                            className="group bg-white text-blue-900 px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-50 transition-all duration-300 flex items-center gap-2"
                            onMouseEnter={() => setHoveredButton('primary')}
                            onMouseLeave={() => setHoveredButton(null)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Free Revenue Audit
                            <ArrowRight className={`w-5 h-5 transition-transform ${hoveredButton === 'primary' ? 'translate-x-1' : ''}`} />
                        </motion.a>

                        <motion.a
                            href="#proven-results"
                            className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/10 transition-all duration-300"
                            onMouseEnter={() => setHoveredButton('secondary')}
                            onMouseLeave={() => setHoveredButton(null)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Case Studies
                        </motion.a>
                    </div>

                    {/* Social Proof Quotes */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-12"
                    >
                        <p className="text-blue-200 mb-6">What clients achieved in 90 days:</p>
                        <div className="grid md:grid-cols-3 gap-4">
                            {testimonialQuotes.map((quote, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                                >
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-sm font-medium">"{quote.text}"</p>
                                    <p className="text-xs text-blue-300 mt-2">— {quote.company}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Trust Signals */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <p className="text-blue-200 mb-4 text-sm">Trusted by mid-market leaders</p>
                        <div className="flex flex-wrap justify-center gap-8 opacity-60">
                            {[1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    className="h-12 w-24 bg-white/20 rounded flex items-center justify-center"
                                    whileHover={{ opacity: 0.8, scale: 1.05 }}
                                >
                                    <span className="text-xs">Logo {i}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
