'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
    TrendingUp,
    Target,
    AlertTriangle,
    DollarSign,
    Clock,
    Users,
    Zap,
    ArrowRight,
    ChevronDown,
    CheckCircle,
    XCircle,
    Activity
} from 'lucide-react'

/**
 * EXECUTIVE INTELLIGENCE HUB
 * 
 * Dashboard executivo que conecta performance técnica a decisões de negócio:
 * - Business Impact Projector (Revenue scenarios)
 * - Competitive Advantage Calculator (Market positioning) 
 * - Risk Assessment Matrix (Opportunity cost)
 * - Strategic Roadmap Generator (Next 90 days)
 */

interface BusinessScenario {
    scenario: string
    currentState: number
    optimizedState: number
    impact: string
    timeline: string
    confidence: number
}

interface CompetitiveMetric {
    metric: string
    yourSite: number
    industry: number
    leader: number
    opportunity: string
}

interface RiskFactor {
    risk: string
    probability: 'high' | 'medium' | 'low'
    impact: 'critical' | 'significant' | 'moderate'
    monthlyCost: number
    mitigation: string
}

const ScenarioCard = ({ scenario, delay = 0 }: { scenario: BusinessScenario, delay?: number }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(cardRef, { once: true, margin: "-50px" })

    const impactValue = scenario.optimizedState - scenario.currentState
    const percentageIncrease = ((impactValue / scenario.currentState) * 100)

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
        >
            <h4 className="font-bold text-slate-900 mb-4">{scenario.scenario}</h4>

            <div className="space-y-4">
                {/* Current vs Optimized */}
                <div className="flex justify-between items-center">
                    <span className="text-slate-600">Estado Atual</span>
                    <span className="font-mono font-bold text-red-600">
                        {scenario.currentState.toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-slate-600">Pós-Otimização</span>
                    <span className="font-mono font-bold text-green-600">
                        {scenario.optimizedState.toLocaleString()}
                    </span>
                </div>

                {/* Impact Visualization */}
                <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Impacto</span>
                        <span className="text-lg font-bold text-green-600">
                            +{percentageIncrease.toFixed(0)}%
                        </span>
                    </div>
                    <div className="text-sm text-slate-600 mb-2">{scenario.impact}</div>

                    {/* Confidence Bar */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Confiança:</span>
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${scenario.confidence}%` }}
                            />
                        </div>
                        <span className="text-xs font-medium text-slate-700">{scenario.confidence}%</span>
                    </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2 text-sm">
                    <Clock size={14} className="text-blue-600" />
                    <span className="text-slate-600">Timeline: {scenario.timeline}</span>
                </div>
            </div>
        </motion.div>
    )
}

const CompetitiveAnalysis = () => {
    const [selectedMetric, setSelectedMetric] = useState(0)

    const competitiveData: CompetitiveMetric[] = [
        {
            metric: "LCP (Core Web Vitals)",
            yourSite: 3.2,
            industry: 2.8,
            leader: 1.4,
            opportunity: "56% faster que industry leader = 23% conversion advantage"
        },
        {
            metric: "Time to Interactive",
            yourSite: 4.1,
            industry: 3.5,
            leader: 2.1,
            opportunity: "49% improvement = 31% better engagement score"
        },
        {
            metric: "Conversion Rate",
            yourSite: 2.3,
            industry: 3.1,
            leader: 4.8,
            opportunity: "108% potential increase = $2.3M additional ARR"
        },
        {
            metric: "Mobile Performance Score",
            yourSite: 67,
            industry: 74,
            leader: 94,
            opportunity: "40% mobile traffic = massive opportunity cost"
        }
    ]

    const metric = competitiveData[selectedMetric]

    return (
        <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-6">Competitive Intelligence Analysis</h4>

            {/* Metric Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
                {competitiveData.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedMetric(index)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedMetric === index
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                    >
                        {item.metric}
                    </button>
                ))}
            </div>

            {/* Comparison Chart */}
            <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                    <span className="text-slate-600">Seu Site</span>
                    <div className="flex items-center gap-3">
                        <div className="w-32 bg-slate-200 rounded-full h-3">
                            <div
                                className="bg-red-500 h-3 rounded-full"
                                style={{ width: `${(metric.yourSite / Math.max(metric.yourSite, metric.industry, metric.leader)) * 100}%` }}
                            />
                        </div>
                        <span className="font-mono font-bold text-red-600 w-16">
                            {metric.yourSite}{metric.metric.includes('Score') ? '' : 's'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-slate-600">Média da Indústria</span>
                    <div className="flex items-center gap-3">
                        <div className="w-32 bg-slate-200 rounded-full h-3">
                            <div
                                className="bg-yellow-500 h-3 rounded-full"
                                style={{ width: `${(metric.industry / Math.max(metric.yourSite, metric.industry, metric.leader)) * 100}%` }}
                            />
                        </div>
                        <span className="font-mono font-bold text-yellow-600 w-16">
                            {metric.industry}{metric.metric.includes('Score') ? '' : 's'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-slate-600">Líder do Mercado</span>
                    <div className="flex items-center gap-3">
                        <div className="w-32 bg-slate-200 rounded-full h-3">
                            <div
                                className="bg-green-500 h-3 rounded-full"
                                style={{ width: `${(metric.leader / Math.max(metric.yourSite, metric.industry, metric.leader)) * 100}%` }}
                            />
                        </div>
                        <span className="font-mono font-bold text-green-600 w-16">
                            {metric.leader}{metric.metric.includes('Score') ? '' : 's'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Opportunity */}
            <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 mb-2">Strategic Opportunity:</h5>
                <p className="text-blue-800">{metric.opportunity}</p>
            </div>
        </div>
    )
}

const RiskMatrix = () => {
    const risks: RiskFactor[] = [
        {
            risk: "Mobile Performance Degradation",
            probability: 'high',
            impact: 'critical',
            monthlyCost: 47000,
            mitigation: "Emergency mobile optimization sprint (2 weeks)"
        },
        {
            risk: "Competitor Performance Advantage",
            probability: 'medium',
            impact: 'significant',
            monthlyCost: 23000,
            mitigation: "Aggressive performance optimization program"
        },
        {
            risk: "Core Web Vitals Penalty",
            probability: 'high',
            impact: 'significant',
            monthlyCost: 31000,
            mitigation: "Immediate CLS and LCP fixes implementation"
        },
        {
            risk: "User Experience Deterioration",
            probability: 'medium',
            impact: 'critical',
            monthlyCost: 52000,
            mitigation: "Comprehensive UX audit and optimization"
        }
    ]

    const getProbabilityColor = (prob: string) => {
        switch (prob) {
            case 'high': return 'text-red-600 bg-red-100'
            case 'medium': return 'text-yellow-600 bg-yellow-100'
            case 'low': return 'text-green-600 bg-green-100'
            default: return 'text-slate-600 bg-slate-100'
        }
    }

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'critical': return 'text-red-600 bg-red-100'
            case 'significant': return 'text-orange-600 bg-orange-100'
            case 'moderate': return 'text-yellow-600 bg-yellow-100'
            default: return 'text-slate-600 bg-slate-100'
        }
    }

    return (
        <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-6">Risk Assessment Matrix</h4>

            <div className="space-y-4">
                {risks.map((risk, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                            <h5 className="font-medium text-slate-900">{risk.risk}</h5>
                            <div className="text-right">
                                <div className="text-lg font-bold text-red-600">
                                    ${risk.monthlyCost.toLocaleString()}/mês
                                </div>
                                <div className="text-sm text-slate-500">Custo de oportunidade</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-600">Probabilidade:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProbabilityColor(risk.probability)}`}>
                                    {risk.probability}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-600">Impacto:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(risk.impact)}`}>
                                    {risk.impact}
                                </span>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-3">
                            <span className="text-sm font-medium text-slate-700">Mitigação: </span>
                            <span className="text-sm text-slate-600">{risk.mitigation}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const StrategicRoadmap = () => {
    const [timeframe, setTimeframe] = useState('30days')

    const roadmaps = {
        '30days': [
            { action: "Emergency performance audit", impact: "Identify critical bottlenecks", status: "immediate" },
            { action: "Core Web Vitals optimization", impact: "+23% user experience score", status: "week1" },
            { action: "Mobile performance sprint", impact: "+31% mobile conversion", status: "week2" },
            { action: "Conversion funnel optimization", impact: "+19% lead quality", status: "week3-4" }
        ],
        '60days': [
            { action: "Advanced A/B testing framework", impact: "Data-driven optimization", status: "month1" },
            { action: "Competitive advantage implementation", impact: "Market positioning", status: "month1-2" },
            { action: "Business intelligence integration", impact: "Strategic decision support", status: "month2" },
            { action: "Performance monitoring automation", impact: "Continuous optimization", status: "month2" }
        ],
        '90days': [
            { action: "Complete digital transformation", impact: "Industry leadership", status: "month1-3" },
            { action: "Advanced personalization engine", impact: "Customer experience", status: "month2-3" },
            { action: "Predictive performance analytics", impact: "Proactive optimization", status: "month3" },
            { action: "Strategic competitive moats", impact: "Sustainable advantage", status: "month3" }
        ]
    }

    return (
        <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-6">Strategic Implementation Roadmap</h4>

            {/* Timeframe Selector */}
            <div className="flex gap-2 mb-6">
                {Object.keys(roadmaps).map((period) => (
                    <button
                        key={period}
                        onClick={() => setTimeframe(period)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${timeframe === period
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                    >
                        {period === '30days' ? '30 Dias' : period === '60days' ? '60 Dias' : '90 Dias'}
                    </button>
                ))}
            </div>

            {/* Roadmap Items */}
            <div className="space-y-4">
                {roadmaps[timeframe as keyof typeof roadmaps].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                        </div>
                        <div className="flex-1">
                            <h5 className="font-medium text-slate-900 mb-1">{item.action}</h5>
                            <p className="text-slate-600 text-sm mb-2">{item.impact}</p>
                            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const ExecutiveIntelligenceHub = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    const businessScenarios: BusinessScenario[] = [
        {
            scenario: "Monthly Lead Generation",
            currentState: 127,
            optimizedState: 203,
            impact: "Performance optimization directly correlates to lead quality and quantity",
            timeline: "45 dias",
            confidence: 87
        },
        {
            scenario: "Average Deal Size",
            currentState: 14500,
            optimizedState: 19800,
            impact: "Faster, more professional experience increases perceived value",
            timeline: "60 dias",
            confidence: 92
        },
        {
            scenario: "Sales Cycle Length (days)",
            currentState: 67,
            optimizedState: 42,
            impact: "Optimized user experience accelerates decision-making process",
            timeline: "30 dias",
            confidence: 89
        },
        {
            scenario: "Monthly Recurring Revenue",
            currentState: 847000,
            optimizedState: 1240000,
            impact: "Compound effect of improved conversion, retention, and upselling",
            timeline: "90 dias",
            confidence: 94
        }
    ]

    return (
        <section ref={sectionRef} className="py-24 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-blue-900/50 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Activity size={16} />
                        <span>Executive Intelligence</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Business Impact Intelligence Hub
                    </h2>
                    <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                        Dashboard executivo que conecta performance técnica a resultados de negócio.
                        Veja como otimizações específicas se traduzem em competitive advantage e revenue growth.
                    </p>
                </motion.div>

                {/* Business Scenarios */}
                <div className="mb-16">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl font-bold mb-8 text-center"
                    >
                        Business Impact Projector
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {businessScenarios.map((scenario, index) => (
                            <ScenarioCard
                                key={index}
                                scenario={scenario}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>
                </div>

                {/* Competitive Analysis & Risk Matrix */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <CompetitiveAnalysis />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <RiskMatrix />
                    </motion.div>
                </div>

                {/* Strategic Roadmap */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-16"
                >
                    <StrategicRoadmap />
                </motion.div>

                {/* Executive Summary CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-3xl font-bold mb-4">
                            Ready to Transform Performance into Strategic Advantage?
                        </h3>
                        <p className="text-blue-100 mb-6 text-lg">
                            Cada dia de delay é opportunity cost. Esta inteligência está disponível agora.
                            A questão é: quando você vai começar a aplicá-la para gain competitive advantage?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2">
                                <span>Schedule Executive Briefing</span>
                                <ArrowRight size={20} />
                            </button>
                            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition-colors">
                                Download Intelligence Report
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
