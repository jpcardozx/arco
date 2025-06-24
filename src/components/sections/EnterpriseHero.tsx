'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'import { createHref } from '@/utils/navigation';
import { useEffect, useRef, useState } from 'react'

/**
 * Enterprise Hero Component - Strategic Infrastructure Optimization
 * 
 * Implements the commercial maturity framework for mid-market enterprise positioning.
 * Focuses on technical authority, process rigor, and measurable outcomes.
 */

interface TrustIndicator {
    icon: React.ComponentType<{ className?: string }>
    label: string
    description: string
}

interface PerformanceMetric {
    value: string
    label: string
    context: string
}

const trustIndicators: TrustIndicator[] = [
    {
        icon: Clock,
        label: 'Entrega em 24h',
        description: 'Relatório completo com recomendações práticas'
    },
    {
        icon: TrendingUp,
        label: 'ROI em 2-4 meses',
        description: 'Economia real através de otimizações técnicas'
    },
    {
        icon: DollarSign,
        label: 'R$ 2.8M economia média',
        description: 'Resultado comprovado em 47 projetos'
    }
]

const performanceMetrics: PerformanceMetric[] = [
    {
        value: 'R$ 2.8M',
        label: 'Economia média identificada',
        context: 'Em análises de infraestrutura realizadas'
    },
    {
        value: '< 1.2s',
        label: 'Tempo de carregamento',
        context: 'Meta de performance garantida'
    },
    {
        value: '10 dias',
        label: 'Prazo de entrega',
        context: 'Da análise inicial ao plano de ação'
    }
]

export function EnterpriseHero() {
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100])
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    useEffect(() => {
        setIsVisible(true)
    }, [])

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
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
        >
            {/* Background Elements */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0"
            >
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

                {/* Geometric Elements */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-100/40 rounded-full blur-2xl" />
            </motion.div>

            {/* Main Content */}
            <motion.div
                style={{ opacity: contentOpacity }}
                className="relative z-10 max-w-7xl mx-auto px-6 text-center"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >                {/* Authority Badge */}
                <motion.div variants={itemVariants}>
                    <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-8 shadow-sm">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-slate-700">
                            Otimização de infraestrutura para empresas em crescimento
                        </span>
                    </div>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-8 leading-none"
                >
                    Reduza custos
                    <br />
                    <span className="text-blue-600">de infraestrutura</span>
                    <br />
                    <span className="text-slate-600">em 90 dias</span>
                </motion.h1>

                {/* Supporting Statement */}
                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
                >
                    Sua empresa cresce, mas os custos de tecnologia explodem?
                    <strong className="font-semibold text-slate-800"> Encontramos onde você está gastando dinheiro à toa</strong> e mostramos como otimizar sem prejudicar a performance.
                </motion.p>

                {/* Trust Indicators */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-slate-600"
                >
                    {trustIndicators.map((indicator, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <indicator.icon className="w-5 h-5 text-blue-600" />
                            <div className="text-left">
                                <div className="font-semibold text-slate-800">{indicator.label}</div>
                                <div className="text-slate-600 text-xs">{indicator.description}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Primary CTAs */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >                        <Link
                        href={createHref("/diagnose")}
                        className="group inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                            Quero uma análise gratuita
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href={createHref("/cases")}
                            className="group inline-flex items-center border-2 border-slate-300 hover:border-slate-400 bg-white/80 backdrop-blur-sm text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
                        >
                            Ver casos de sucesso
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Performance Metrics Preview */}
                <motion.div
                    variants={itemVariants}
                    className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                >
                    {performanceMetrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-sm"
                            whileHover={{ y: -4, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                                {metric.value}
                            </div>
                            <div className="text-lg font-semibold text-slate-800 mb-1">
                                {metric.label}
                            </div>
                            <div className="text-sm text-slate-600 leading-relaxed">
                                {metric.context}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Methodology Preview */}
                <motion.div
                    variants={itemVariants}
                    className="mt-20 bg-gradient-to-r from-blue-50 to-slate-50 rounded-3xl p-12 border border-slate-200/50"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
                        Our Systematic Approach
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Technical Discovery',
                                description: 'Comprehensive analysis of current infrastructure, performance baselines, and cost structures',
                                duration: 'Days 1-3'
                            },
                            {
                                step: '02',
                                title: 'Efficiency Analysis',
                                description: 'Systematic identification of redundancies, bottlenecks, and optimization opportunities',
                                duration: 'Days 4-6'
                            },
                            {
                                step: '03',
                                title: 'Strategic Roadmap',
                                description: 'Prioritized implementation plan with ROI projections and resource requirements',
                                duration: 'Days 7-10'
                            }
                        ].map((phase, index) => (
                            <div key={index} className="text-left">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-lg mb-4">
                                    {phase.step}
                                </div>
                                <h4 className="text-xl font-semibold text-slate-900 mb-2">
                                    {phase.title}
                                </h4>
                                <p className="text-slate-600 mb-2 leading-relaxed">
                                    {phase.description}
                                </p>
                                <div className="text-sm font-medium text-blue-600">
                                    {phase.duration}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-3 text-sm text-slate-500">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Performance guarantees with financial backing</span>
                        <span>•</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Client retains all IP and infrastructure control</span>
                    </div>
                </motion.div>
            </motion.div>            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 8, 0], opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                initial={{ opacity: 0 }}
            >
                <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
                </div>
            </motion.div>
        </section>
    )
}


