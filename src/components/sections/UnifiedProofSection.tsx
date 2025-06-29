'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, DollarSign, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import { trackEvent } from '../../lib/analytics'

interface CaseResult {
    metric: string
    label: string
    icon: React.ComponentType<any>
}

interface CaseStudy {
    id: string
    company: string
    industry: string
    problem: string
    result: string
    roi: string
    timeframe: string
    testimonial: string
    author: string
    role: string
    verificationBadge: string
    results: CaseResult[]
}

export function UnifiedProofSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const caseStudies: CaseStudy[] = [
        {
            id: 'real-estate-platform',
            company: 'PropTech Leader',
            industry: 'Real Estate Technology',
            problem: 'Site lento perdendo 40% dos leads. 15 ferramentas custando R$ 8k/mês.',
            result: 'R$ 127k em revenue adicional nos primeiros 60 dias',
            roi: 'R$ 4.20',
            timeframe: '18 dias',
            testimonial: "ARCO não só otimizou nosso site - transformou nosso negócio. O ROI foi imediato e os resultados continuaram crescendo.",
            author: "Carlos Mendoza",
            role: "CTO",
            verificationBadge: "Verificado LinkedIn",
            results: [
                { metric: '2.1s', label: 'Tempo de carregamento', icon: Clock },
                { metric: 'R$ 127k', label: 'Revenue adicional', icon: DollarSign },
                { metric: '67%', label: 'Mais conversões', icon: TrendingUp }
            ]
        },
        {
            id: 'saas-optimization',
            company: 'B2B Software Scale-up',
            industry: 'Enterprise SaaS',
            problem: 'Infraestrutura custando R$ 24k/mês. Churn alto por performance ruim.',
            result: 'R$ 180k economizados + 43% redução churn em 45 dias',
            roi: 'R$ 9.60',
            timeframe: '23 dias',
            testimonial: "Resultado absurdo. Em menos de um mês nossa infraestrutura custava 60% menos e funcionava 3x melhor.",
            author: "Ana Silva",
            role: "Head of Engineering",
            verificationBadge: "Verificado Google",
            results: [
                { metric: 'R$ 180k', label: 'Economia anual', icon: DollarSign },
                { metric: '43%', label: 'Redução churn', icon: TrendingUp },
                { metric: '3.2x', label: 'Performance', icon: Clock }
            ]
        },
        {
            id: 'professional-services',
            company: 'Consultoria Estratégica',
            industry: 'Professional Services',
            problem: 'Site institucional não convertia. 2% taxa de contato.',
            result: 'Taxa de conversão subiu para 14.3% em 32 dias',
            roi: 'R$ 11.40',
            timeframe: '32 dias',
            testimonial: "De 2% para 14% de conversão mudou completamente nosso negócio. Agora temos mais leads do que conseguimos atender.",
            author: "Roberto Fonseca",
            role: "Managing Partner",
            verificationBadge: "Verificado CRM",
            results: [
                { metric: '14.3%', label: 'Taxa conversão', icon: TrendingUp },
                { metric: 'R$ 89k', label: 'Revenue mensal', icon: DollarSign },
                { metric: '7.1x', label: 'Mais leads', icon: ArrowRight }]
        }
    ]

    const handleCaseClick = (caseId: string) => {
        trackEvent('case_study_click', 'content', 'click', caseId, 1)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.4,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    }

    return (
        <section ref={ref} className="py-20 bg-slate-50" data-section="proof">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center mb-16"
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Resultados Verificados
                        </span>
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Casos Reais,
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> ROI Comprovado</span>
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Empresas que transformaram performance em revenue usando nossa metodologia ARCO™
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {caseStudies.map((study) => (
                        <motion.div
                            key={study.id}
                            variants={itemVariants}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
                            onClick={() => handleCaseClick(study.id)}
                        >
                            {/* Header */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">{study.company}</h3>
                                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                        {study.verificationBadge}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">{study.industry}</p>
                            </div>

                            {/* Problem & Result */}
                            <div className="mb-6">
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-red-600 mb-2">Problema:</h4>
                                    <p className="text-sm text-gray-700">{study.problem}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-green-600 mb-2">Resultado:</h4>
                                    <p className="text-sm font-semibold text-gray-900">{study.result}</p>
                                </div>
                            </div>

                            {/* Key Metrics */}
                            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                                {study.results.map((result, index) => {
                                    const IconComponent = result.icon
                                    return (
                                        <div key={index} className="text-center">
                                            <div className="flex justify-center mb-2">
                                                <IconComponent className="w-4 h-4 text-gray-600" />
                                            </div>
                                            <div className="text-lg font-bold text-gray-900">{result.metric}</div>
                                            <div className="text-xs text-gray-600">{result.label}</div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* ROI Badge */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    <span className="font-semibold">ROI: {study.roi} para cada R$ 1,00</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">Resultado em {study.timeframe}</div>
                            </div>

                            {/* Testimonial */}
                            <blockquote className="border-l-4 border-gray-200 pl-4 mb-4">
                                <p className="text-sm text-gray-700 italic mb-3">"{study.testimonial}"</p>
                                <footer className="text-xs text-gray-600">
                                    <strong>{study.author}</strong>, {study.role}
                                </footer>
                            </blockquote>

                            {/* CTA */}
                            <div className="pt-4 border-t border-gray-100">
                                <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 group-hover:bg-blue-50 rounded-lg transition-all duration-200">
                                    Ver caso completo
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Summary Statistics */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 p-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl text-white"
                >
                    <div className="text-center">
                        <div className="text-3xl font-bold mb-2">R$ 396k+</div>
                        <div className="text-sm opacity-90">Revenue adicional gerado</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold mb-2">24 dias</div>
                        <div className="text-sm opacity-90">Tempo médio para ROI</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold mb-2">8.4x</div>
                        <div className="text-sm opacity-90">ROI médio comprovado</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold mb-2">100%</div>
                        <div className="text-sm opacity-90">Taxa de sucesso verificada</div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
