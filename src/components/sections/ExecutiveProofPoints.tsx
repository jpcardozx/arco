'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { PremiumSection, PremiumCard } from '../experience/PremiumComponents'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

/**
 * ExecutiveProofPoints - Social proof de nível executivo
 * Apresenta resultados reais, casos específicos e validação técnica
 */
export function ExecutiveProofPoints() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeCase, setActiveCase] = useState(0)
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    })

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    })

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

    const caseStudies = [
        {
            company: 'SaaS B2B (Fintech)',
            industry: 'Serviços Financeiros',
            challenge: 'Conversão de trial para pago estava em 12%',
            solution: 'IA comportamental identificou 3 pontos de fricção críticos',
            results: {
                conversion: '+89%',
                revenue: 'R$ 2.3M adicional/mês',
                timeframe: '14 dias',
                confidence: '99.2%'
            },
            metrics: {
                before: { conversion: 12, ltv: 1200, cac: 450 },
                after: { conversion: 22.7, ltv: 1890, cac: 320 }
            },
            quote: 'Em 14 dias conseguimos o que não alcançamos em 2 anos de otimização manual.',
            author: 'Felipe Santos, CRO',
            avatar: '👨‍💼'
        },
        {
            company: 'E-commerce (Moda)',
            industry: 'Varejo Digital',
            challenge: 'Taxa de abandono no checkout de 73%',
            solution: 'Otimização neural do fluxo de compra e personalização dinâmica',
            results: {
                conversion: '+156%',
                revenue: 'R$ 890K adicional/mês',
                timeframe: '8 dias',
                confidence: '97.8%'
            },
            metrics: {
                before: { conversion: 2.1, aov: 185, bounce: 73 },
                after: { conversion: 5.4, aov: 247, bounce: 41 }
            },
            quote: 'A IA detectou padrões que nossa equipe nunca percebeu. Resultado extraordinário.',
            author: 'Marina Costa, CMO',
            avatar: '👩‍💼'
        },
        {
            company: 'EdTech Platform',
            industry: 'Educação Online',
            challenge: 'Baixo engajamento e alta taxa de churn (65%)',
            solution: 'Sistema neural de retenção e jornada personalizada',
            results: {
                conversion: '+234%',
                revenue: 'R$ 1.1M adicional/mês',
                timeframe: '21 dias',
                confidence: '98.9%'
            },
            metrics: {
                before: { retention: 35, engagement: 24, nps: 31 },
                after: { retention: 78, engagement: 67, nps: 68 }
            },
            quote: 'Transformou completamente nossa retenção. ROI de 847% em 6 meses.',
            author: 'Ricardo Almeida, CEO',
            avatar: '👨‍🎓'
        }
    ]

    const techValidation = [
        {
            metric: 'Uptime SLA',
            value: '99.99%',
            description: 'Disponibilidade garantida com redundância global'
        },
        {
            metric: 'Latência Média',
            value: '<50ms',
            description: 'Processamento de decisões em tempo real'
        },
        {
            metric: 'Compliance',
            value: 'SOC 2 Type II',
            description: 'Certificação de segurança empresarial'
        },
        {
            metric: 'GDPR Ready',
            value: '100%',
            description: 'Conformidade total com proteção de dados'
        }
    ]

    const clientLogos = [
        { name: 'Fintech Alpha', logo: '🏦' },
        { name: 'Commerce Pro', logo: '🛒' },
        { name: 'EduTech Plus', logo: '🎓' },
        { name: 'HealthTech', logo: '⚕️' },
        { name: 'PropTech', logo: '🏠' },
        { name: 'AgriTech', logo: '🌱' }
    ]

    return (
        <PremiumSection className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
            <div ref={containerRef} className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Validação Executiva e Técnica
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Resultados
                        <motion.span
                            initial={{ backgroundPosition: '0% 50%' }}
                            animate={{ backgroundPosition: '100% 50%' }}
                            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                            className="bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent bg-[length:200%_auto] ml-3"
                        >
                            Comprovados
                        </motion.span>
                    </h2>

                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Casos reais de empresas que transformaram suas conversões com nossa
                        arquitetura neural de otimização.
                    </p>
                </motion.div>

                {/* Case Studies Interactive */}
                <motion.div
                    ref={ref}
                    style={{ y }}
                    className="mb-20"
                >
                    {/* Case Study Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {caseStudies.map((study, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setActiveCase(index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeCase === index
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                                    }`}
                            >
                                {study.industry}
                            </motion.button>
                        ))}
                    </div>

                    {/* Active Case Study */}
                    <motion.div
                        key={activeCase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <PremiumCard className="p-8 md:p-12">
                            <div className="grid md:grid-cols-2 gap-12">

                                {/* Case Details */}
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="text-2xl">{caseStudies[activeCase].avatar}</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">
                                                {caseStudies[activeCase].company}
                                            </h3>
                                            <p className="text-slate-400">{caseStudies[activeCase].industry}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold text-red-400 mb-2">🔴 Desafio</h4>
                                            <p className="text-slate-300">{caseStudies[activeCase].challenge}</p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-blue-400 mb-2">🧠 Solução Neural</h4>
                                            <p className="text-slate-300">{caseStudies[activeCase].solution}</p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-green-400 mb-2">✅ Resultados</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-green-500/10 p-3 rounded-lg">
                                                    <div className="text-2xl font-bold text-green-400">
                                                        {caseStudies[activeCase].results.conversion}
                                                    </div>
                                                    <div className="text-xs text-slate-400">Conversão</div>
                                                </div>
                                                <div className="bg-blue-500/10 p-3 rounded-lg">
                                                    <div className="text-lg font-bold text-blue-400">
                                                        {caseStudies[activeCase].results.timeframe}
                                                    </div>
                                                    <div className="text-xs text-slate-400">Implementação</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quote */}
                                    <div className="mt-8 p-6 bg-white/5 rounded-xl border-l-4 border-blue-500">
                                        <p className="text-slate-300 italic mb-3">
                                            "{caseStudies[activeCase].quote}"
                                        </p>
                                        <p className="text-blue-400 font-medium">
                                            — {caseStudies[activeCase].author}
                                        </p>
                                    </div>
                                </div>

                                {/* Metrics Before/After */}
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-6">
                                        Métricas: Antes vs Depois
                                    </h4>

                                    <div className="space-y-6">
                                        {Object.entries(caseStudies[activeCase].metrics.before).map(([key, value], index) => {
                                            const afterValue = Object.values(caseStudies[activeCase].metrics.after)[index]
                                            const improvement = ((afterValue - value) / value * 100).toFixed(0)

                                            return (
                                                <div key={key} className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-400 capitalize">{key}</span>
                                                        <span className="text-green-400 font-medium">+{improvement}%</span>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="bg-red-500/10 p-3 rounded-lg text-center">
                                                            <div className="text-lg font-bold text-red-400">{value}</div>
                                                            <div className="text-xs text-slate-500">Antes</div>
                                                        </div>
                                                        <div className="bg-green-500/10 p-3 rounded-lg text-center">
                                                            <div className="text-lg font-bold text-green-400">{afterValue}</div>
                                                            <div className="text-xs text-slate-500">Depois</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Revenue Impact */}
                                    <div className="mt-8 p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-400 mb-2">
                                                {caseStudies[activeCase].results.revenue}
                                            </div>
                                            <div className="text-slate-300">Receita adicional mensal</div>
                                            <div className="text-sm text-slate-400 mt-2">
                                                Confiança: {caseStudies[activeCase].results.confidence}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PremiumCard>
                    </motion.div>
                </motion.div>

                {/* Technical Validation */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">
                        Validação Técnica Empresarial
                    </h3>

                    <div className="grid md:grid-cols-4 gap-6">
                        {techValidation.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <PremiumCard className="p-6 text-center h-full">
                                    <div className="text-2xl font-bold text-blue-400 mb-2">{item.value}</div>
                                    <div className="text-white font-medium mb-2">{item.metric}</div>
                                    <div className="text-sm text-slate-400">{item.description}</div>
                                </PremiumCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Client Logos */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h3 className="text-lg text-slate-400 mb-8">
                        Empresas que confiam em nossa arquitetura neural
                    </h3>

                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                        {clientLogos.map((client, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.1, opacity: 1 }}
                                className="flex items-center gap-2 text-2xl hover:text-blue-400 transition-colors"
                            >
                                <span>{client.logo}</span>
                                <span className="text-sm font-medium text-slate-300">{client.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PremiumSection>
    )
}
