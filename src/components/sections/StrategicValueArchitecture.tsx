'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { PremiumSection, PremiumCard } from '../experience/PremiumComponents'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

/**
 * StrategicValueArchitecture - Value proposition com arquitetura premium
 * Demonstra valor através de métricas reais e benefícios específicos
 */
export function StrategicValueArchitecture() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    })

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    })

    const problems = [
        {
            icon: '🩸',
            title: 'Taxa de Conversão Estagnada',
            description: 'Suas campanhas trazem tráfego, mas 97% dos visitantes abandonam sem converter.',
            impact: 'R$ 2.3M em receita perdida anualmente'
        },
        {
            icon: '🎯',
            title: 'Decisões Baseadas em Intuição',
            description: 'Mudanças no site são feitas por "achismo", sem dados comportamentais reais.',
            impact: '68% de redução na eficiência do time'
        },
        {
            icon: '⏰',
            title: 'Otimização Manual Lenta',
            description: 'Testes A/B tradicionais demoram meses para gerar insights acionáveis.',
            impact: '4-6 meses para cada ciclo de otimização'
        }
    ]

    const solutions = [
        {
            icon: '🧠',
            title: 'IA Comportamental em Tempo Real',
            description: 'Nossa IA analisa micro-comportamentos e otimiza elementos instantaneamente para cada visitante.',
            results: '+340% conversão média',
            tech: 'Machine Learning, Behavioral Analytics'
        },
        {
            icon: '🎨',
            title: 'Personalização Dinâmica',
            description: 'Cada visitante vê uma versão otimizada da página baseada em seu perfil e intenção.',
            results: '+127% engajamento',
            tech: 'Real-time Personalization Engine'
        },
        {
            icon: '📊',
            title: 'Otimização Contínua Automatizada',
            description: 'Sistema neural que testa milhares de variações simultaneamente, sem intervenção manual.',
            results: '+89% velocidade de otimização',
            tech: 'Multi-Armed Bandit, Neural Networks'
        }
    ]

    const metrics = [
        { value: 847, suffix: '%', label: 'Aumento médio em ROI', duration: 2.5 },
        { value: 3.2, suffix: 's', label: 'Tempo de otimização', duration: 2 },
        { value: 99.7, suffix: '%', label: 'Precisão de previsões', duration: 3 },
        { value: 24, suffix: 'h', label: 'Para implementação completa', duration: 2.2 }
    ]

    return (
        <PremiumSection className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            <div ref={containerRef} className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6"
                    >
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        Diagnóstico e Solução Arquitetural
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        O Problema é Arquitetural,
                        <motion.span
                            initial={{ backgroundPosition: '0% 50%' }}
                            animate={{ backgroundPosition: '100% 50%' }}
                            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                            className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] block"
                        >
                            Não Operacional
                        </motion.span>
                    </h2>

                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Enquanto você otimiza elementos isolados, nós reconstruímos toda a arquitetura
                        de conversão com inteligência artificial.
                    </p>
                </motion.div>

                {/* Problems Section */}
                <motion.div
                    ref={ref}
                    style={{ y }}
                    className="mb-24"
                >
                    <h3 className="text-2xl font-bold text-white mb-12 text-center">
                        Por que 97% dos visitantes não convertem?
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8">
                        {problems.map((problem, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <PremiumCard glowColor="purple" className="p-6 h-full">
                                    <div className="text-4xl mb-4">{problem.icon}</div>
                                    <h4 className="text-xl font-bold text-white mb-3">{problem.title}</h4>
                                    <p className="text-slate-300 mb-4">{problem.description}</p>
                                    <div className="text-red-400 font-semibold text-sm">
                                        💸 {problem.impact}
                                    </div>
                                </PremiumCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Solutions Section */}
                <div className="mb-24">
                    <h3 className="text-2xl font-bold text-white mb-12 text-center">
                        Nossa Arquitetura Neural de Conversão
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8">
                        {solutions.map((solution, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <PremiumCard glowColor="blue" className="p-6 h-full">
                                    <div className="text-4xl mb-4">{solution.icon}</div>
                                    <h4 className="text-xl font-bold text-white mb-3">{solution.title}</h4>
                                    <p className="text-slate-300 mb-4">{solution.description}</p>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-400 font-bold">{solution.results}</span>
                                        </div>
                                        <div className="text-blue-400 text-xs font-mono bg-blue-500/10 px-2 py-1 rounded">
                                            {solution.tech}
                                        </div>
                                    </div>
                                </PremiumCard>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Premium Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
                >
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">
                        Resultados Comprovados em Produção
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {inView && (
                                        <CountUp
                                            end={metric.value}
                                            duration={metric.duration}
                                            decimals={metric.value < 10 ? 1 : 0}
                                            suffix={metric.suffix}
                                        />
                                    )}
                                </div>
                                <div className="text-slate-400 text-sm">{metric.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Technical Architecture Diagram */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <h3 className="text-2xl font-bold text-white mb-8">
                        Arquitetura de Sistema Neural
                    </h3>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="grid md:grid-cols-4 gap-4 items-center">
                            {[
                                { label: 'Coleta de Dados', icon: '📊' },
                                { label: 'Processamento IA', icon: '🧠' },
                                { label: 'Otimização Real-time', icon: '⚡' },
                                { label: 'Conversão +847%', icon: '🚀' }
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="text-3xl mb-2">{step.icon}</div>
                                    <div className="text-white font-medium">{step.label}</div>
                                    {index < 3 && (
                                        <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
                                            <div className="text-blue-400">→</div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </PremiumSection>
    )
}
