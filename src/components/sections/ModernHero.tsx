'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, DollarSign, TrendingUp, Shield } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Heading1, BodyLarge, Button, MotionContainer, Section } from '../../design-system/components'

export function ModernHero() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const trustMetrics = [
        {
            icon: DollarSign,
            value: 'R$ 2.4M',
            label: 'Receita Média Capturada',
            description: 'Por projeto de transformação digital'
        },
        {
            icon: Clock,
            value: '< 45 dias',
            label: 'Tempo para Primeiro ROI',
            description: 'Resultados mensuráveis em tempo recorde'
        },
        {
            icon: TrendingUp,
            value: '340%',
            label: 'ROI Médio Comprovado',
            description: 'Retorno documentado em 12 meses'
        },
        {
            icon: Shield,
            value: '96%',
            label: 'Taxa de Sucesso',
            description: 'Projetos que excedem expectativas'
        }
    ]

    const guarantees = [
        'ROI documentado em 90 dias ou reembolso total',
        'Implementação em prazo fixo com penalidades',
        'Resultados mensuráveis ou continuamos sem custo'
    ]

    return (
        <Section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-100/40 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 w-full">
                <MotionContainer
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, staggerChildren: 0.15 }}
                >
                    {/* Authority Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-3 shadow-sm">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />                            <span className="text-sm font-medium text-slate-700">
                                Especialistas em Performance Empresarial Mid-Market
                            </span>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8"
                    >                        <Heading1 className="leading-none mb-4">
                            Transforme Métricas em
                            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent"> Resultados Financeiros</span>
                        </Heading1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mb-12"
                    >
                        <BodyLarge className="max-w-4xl mx-auto">
                            {'Para empresas que perdem receita devido a problemas técnicos invisíveis, oferecemos análises precisas e correções estratégicas que geram resultados imediatos.'}
                        </BodyLarge>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-wrap justify-center items-center gap-6 mb-12"
                    >
                        {guarantees.map((guarantee, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                <span className="text-sm text-slate-700">{guarantee}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                    >                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link href="/insight">
                                <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                                    Solicitar ARCO Insight (Grátis)
                                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link href="/pov">
                                <Button variant="outline" size="lg" className="group border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                                    Agendar Sprint PoV (45 dias)
                                    <Clock className="ml-3 w-5 h-5 group-hover:scale-110 transition-transform" />
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Trust Metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
                    >
                        {trustMetrics.map(({ icon: Icon, value, label, description }, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300"
                                whileHover={{ y: -2 }}
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                                    <Icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                    {value}
                                </div>
                                <div className="text-sm font-semibold text-slate-800 mb-1">
                                    {label}
                                </div>
                                <div className="text-xs text-slate-600 leading-tight">
                                    {description}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Social Proof */}                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="mt-16 text-center"
                    >
                        <p className="text-slate-500 text-sm mb-4">
                            Confiança Comprovada por Empresas Mid-Market
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-6 text-slate-400">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm">47+ projetos executados</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm">Zero reclamações</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm">340% ROI médio</span>
                            </div>
                        </div>
                    </motion.div>
                </MotionContainer>
            </div>
        </Section>
    )
}