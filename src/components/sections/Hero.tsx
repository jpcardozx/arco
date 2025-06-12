'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from '@/lib/i18n/context'

/**
 * Hero Section - Direta e focada em resultados reais
 * 
 * Remove o jargão corporativo e foca no que importa:
 * - Problema claro: custos altos de infraestrutura
 * - Solução direta: encontramos onde economizar
 * - Prova social: casos reais com resultados
 */

interface TrustIndicator {
    icon: React.ComponentType<{ className?: string }>
    label: string
    description: string
}

export function Hero() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const trustIndicators: TrustIndicator[] = [
        {
            icon: Clock,
            label: 'Entrega Rápida',
            description: 'Implementação em 15 dias'
        },
        {
            icon: TrendingUp,
            label: 'ROI Garantido',
            description: 'Resultados mensuráveis'
        },
        {
            icon: DollarSign,
            label: 'Economia Comprovada',
            description: 'Redução de custos imediata'
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.15
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Background simples */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-100/30 rounded-full blur-2xl" />
            </div>

            {/* Conteúdo principal */}
            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-6 text-center"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >                {/* Badge autoridade */}
                <motion.div variants={itemVariants}>
                    <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-8 shadow-sm">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-slate-700">
                            {'badge'}
                        </span>
                    </div>
                </motion.div>

                {/* Headline principal */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-8 leading-none"
                >
                    {'title'}
                </motion.h1>

                {/* Texto de apoio */}
                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
                >
                    {'subtitle'}
                </motion.p>

                {/* Indicadores de confiança */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-slate-600"
                >                    {trustIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <indicator.icon className="w-5 h-5 text-blue-600" />
                        <div className="text-left">
                            <div className="font-semibold text-slate-800">{indicator.label}</div>
                            <div className="text-slate-600 text-xs">{indicator.description}</div>
                        </div>
                    </div>
                ))}
                </motion.div>                {/* CTAs principais */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href="/diagnose"
                            className="group inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {'cta'}
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href="/cases"
                            className="group inline-flex items-center border-2 border-slate-300 hover:border-slate-400 bg-white/80 backdrop-blur-sm text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
                        >
                            {'view Cases'}
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Métricas de performance simplificadas */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                >
                    <div className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{'value'}</div>
                        <div className="text-sm font-semibold text-slate-800 mb-1">{'label'}</div>
                        <div className="text-xs text-slate-600">{'description'}</div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-emerald-600 mb-2">{'value'}</div>
                        <div className="text-sm font-semibold text-slate-800 mb-1">{'label'}</div>
                        <div className="text-xs text-slate-600">{'description'}</div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">{'value'}</div>
                        <div className="text-sm font-semibold text-slate-800 mb-1">{'label'}</div>
                        <div className="text-xs text-slate-600">{'description'}</div>
                    </div>
                </motion.div>

                {/* Prova social rápida */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 flex items-center justify-center gap-8 text-slate-500"
                >
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm">{'projects Completed'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm">{'average R O I'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm">{'zero Complaints'}</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
