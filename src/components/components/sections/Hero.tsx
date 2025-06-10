'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Section } from '../../layout/Section';
import { cn } from '@/lib/utils/cn';

export default function Hero() {
    // Usando o melhor componente de Hero (HeroARCORevised)
    return (
        <Section className="pt-20 md:pt-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                                Uma abordagem estratégica para transformar problemas técnicos em{' '}
                                <span className="text-blue-600">ganhos financeiros</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-xl text-gray-600 max-w-2xl"
                        >
                            Identificamos e resolvemos ineficiências invisíveis que impactam diretamente seu resultado.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link
                                href="/diagnose"
                                className={cn(
                                    "inline-flex items-center px-6 py-3 rounded-lg",
                                    "bg-blue-600 text-white font-medium",
                                    "hover:bg-blue-700 transition duration-200",
                                    "shadow-lg shadow-blue-500/20"
                                )}
                            >
                                Start Your Journey
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>

                            <Link
                                href="/case-studies"
                                className={cn(
                                    "inline-flex items-center px-6 py-3 rounded-lg",
                                    "bg-white text-gray-800 font-medium border border-gray-200",
                                    "hover:bg-gray-50 transition duration-200"
                                )}
                            >
                                Ver estudos de caso
                            </Link>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-6">
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-white rounded-2xl shadow-xl p-8 relative z-10"
                            >
                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-4xl font-bold text-blue-600">01</span>
                                        <p className="mt-2 text-gray-600">
                                            Identificamos problemas técnicos invisíveis que estão impactando sua receita.
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-4xl font-bold text-blue-600">02</span>
                                        <p className="mt-2 text-gray-600">
                                            Desenvolvemos um plano de ação para resolver os problemas identificados.
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-4xl font-bold text-blue-600">03</span>
                                        <p className="mt-2 text-gray-600">
                                            Aplicamos as correções necessárias com foco em resultados rápidos.
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-4xl font-bold text-blue-600">04</span>
                                        <p className="mt-2 text-gray-600">
                                            Monitoramos os indicadores financeiros para comprovar o impacto das correções.
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 pt-6">
                                    <p className="text-center text-gray-500">
                                        Resultados reais de empresas que transformaram sua performance digital
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}