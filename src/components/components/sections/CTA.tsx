'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineArrowRight, HiOutlineCalendar } from 'react-icons/hi';
import { cn } from '@/lib/utils/cn';

export default function CTA() {
    return (
        <div className="container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={cn(
                    "bg-gradient-to-br from-blue-600 to-blue-800",
                    "rounded-2xl p-8 md:p-12 shadow-xl",
                    "text-white overflow-hidden relative"
                )}
            >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/20"></div>
                    <div className="absolute -left-10 -bottom-10 w-64 h-64 rounded-full bg-white/20"></div>
                </div>

                <div className="relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Pronto para transformar desafios tecnológicos em ganhos financeiros?
                        </h2>

                        <p className="text-blue-100 text-lg mb-8 md:mb-10">
                            Agende uma consulta de diagnóstico gratuita e descubra como podemos otimizar a performance da sua presença digital.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/schedule"
                                className={cn(
                                    "inline-flex items-center px-6 py-3 rounded-lg",
                                    "bg-white text-blue-800 font-medium",
                                    "hover:bg-blue-50 transition duration-200",
                                    "shadow-lg shadow-blue-700/30"
                                )}
                            >
                                <HiOutlineCalendar className="mr-2 h-5 w-5" />
                                Agendar diagnóstico gratuito
                            </Link>

                            <Link
                                href="/case-studies"
                                className={cn(
                                    "inline-flex items-center px-6 py-3 rounded-lg",
                                    "bg-blue-700 text-white font-medium border border-blue-500",
                                    "hover:bg-blue-800 transition duration-200"
                                )}
                            >
                                Ver resultados
                                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>

                        <p className="text-blue-200 mt-6 text-sm">
                            100% gratuito • Sem compromisso • Diagnóstico personalizado
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
