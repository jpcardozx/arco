'use client'

import { motion } from 'framer-motion'
import { Calculator, DollarSign, Target, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react'
import { useState } from 'react'
import {
    Heading2,
    BodyLarge,
    Heading3,
    BodyRegular,
    Card,
    MotionContainer,
    Section,
    Grid
} from '../../design-system/components'
import { useContent } from '../../lib/content'

export function BusinessMetrics() {
    const content = useContent('en')
    const [selectedMetric, setSelectedMetric] = useState(0)

    const kpiTargets = [
        {
            icon: DollarSign,
            metric: "Customer Acquisition Cost",
            current: "$420",
            target: "$285",
            improvement: "+47% efficiency",
            driver: "Performance optimization",
            description: "Reduced CAC through faster load times and improved user experience"
        },
        {
            icon: Target,
            metric: "Average Order Value",
            current: "$89",
            target: "$125",
            improvement: "+40% increase",
            driver: "Conversion optimization",
            description: "Higher AOV through streamlined checkout and performance improvements"
        },
        {
            icon: TrendingUp,
            metric: "Conversion Rate",
            current: "2.1%",
            target: "3.2%",
            improvement: "+52% lift",
            driver: "Technical optimization",
            description: "Conversion improvements through page speed and user experience optimization"
        }, {
            icon: Calculator,
            metric: "LTV:CAC Ratio",
            current: "3.2:1",
            target: "4.8:1",
            improvement: "+50% efficiency",
            driver: "Technical performance",
            description: "Better LTV:CAC through reduced acquisition costs and improved retention"
        }
    ]

    const performanceMetrics = [
        { label: 'Client Revenue Impact', value: '+$3.2M', color: 'emerald', trend: 'up' },
        { label: 'Project Success Rate', value: '94%', color: 'blue', trend: 'up' },
        { label: 'Average Client ROI', value: '185%', color: 'purple', trend: 'up' },
        { label: 'Time to First Results', value: '<60 days', color: 'amber', trend: 'up' }
    ]

    const projectionScenarios = {
        'Conservative': {
            clients: '3-5 projects',
            revenue: '$650K impact',
            margin: 'Low-risk approach',
            ebitda: '150% ROI'
        },
        'Realistic': {
            clients: '6-8 projects',
            revenue: '$1.2M impact',
            margin: 'Balanced growth',
            ebitda: '185% ROI'
        }, 'Optimistic': {
            clients: '10+ projects',
            revenue: '$2.1M impact',
            margin: 'Aggressive scale',
            ebitda: '240% ROI'
        }
    }

    return (
        <Section background="slate" id="business-metrics" className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
            {/* Section Header */}            <MotionContainer className="text-center mb-16">
                <Heading2 className="text-white mb-6">
                    Business <span className="text-blue-400">Performance</span>
                </Heading2>
                <BodyLarge className="text-slate-300 max-w-3xl mx-auto">
                    Proven results in digital performance and revenue growth
                </BodyLarge>
            </MotionContainer>            {/* KPI Targets */}
            <MotionContainer delay={0.2} duration={0.8} className="mb-20">
                <Heading3 className="text-center mb-12 text-white">
                    Strategic <span className="text-blue-400">KPIs</span>
                </Heading3>

                <Grid cols={4} gap="md" className="mb-8">
                    {kpiTargets.map((kpi, index) => (
                        <MotionContainer
                            key={index}
                            delay={0.3 + index * 0.1}
                            duration={0.6}
                        >
                            <Card
                                className={`bg-white/10 backdrop-blur-sm border cursor-pointer transition-all duration-300 p-6 hover:scale-105 hover:shadow-2xl ${selectedMetric === index
                                    ? 'border-blue-400 bg-white/15 shadow-xl ring-2 ring-blue-400/50'
                                    : 'border-white/20 hover:border-white/40'
                                    }`}
                                onClick={() => setSelectedMetric(index)}
                            >
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        {(() => {
                                            const IconComponent = kpi.icon;
                                            return <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <IconComponent className="w-8 h-8 text-blue-400" />
                                            </motion.div>;
                                        })()}
                                        <motion.div
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${kpi.improvement.startsWith('+')
                                                ? 'bg-emerald-500/20 text-emerald-300'
                                                : 'bg-blue-500/20 text-blue-300'
                                                }`}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {kpi.improvement}
                                        </motion.div>
                                    </div>

                                    <h4 className="font-bold text-lg mb-2 text-white">{kpi.metric}</h4>

                                    <div className="flex items-center justify-between text-sm mb-3">
                                        <span className="text-slate-400">Current: {kpi.current}</span>
                                        <span className="text-blue-300 font-semibold">Target: {kpi.target}</span>
                                    </div>

                                    <div className="text-xs text-slate-400 leading-relaxed">
                                        {kpi.driver}
                                    </div>
                                </motion.div>
                            </Card>
                        </MotionContainer>
                    ))}
                </Grid>

                {/* Selected Metric Details */}
                <MotionContainer delay={0.6} duration={0.4}>
                    <Card className="bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 p-6">
                        <div className="flex items-start gap-4">
                            {(() => {
                                const IconComponent = kpiTargets[selectedMetric].icon;
                                return <IconComponent className="w-6 h-6 text-blue-400 mt-1" />;
                            })()}
                            <div>
                                <h4 className="text-xl font-bold mb-2 text-white">
                                    {kpiTargets[selectedMetric].metric}
                                </h4>
                                <p className="text-slate-300 leading-relaxed">
                                    {kpiTargets[selectedMetric].description}
                                </p>                                <div className="mt-3 text-sm text-blue-300">
                                    <strong>Driver:</strong> {kpiTargets[selectedMetric].driver}
                                </div>
                            </div>
                        </div>
                    </Card>
                </MotionContainer>
            </MotionContainer>

            {/* Performance Metrics */}
            <MotionContainer delay={0.4} duration={0.8} className="mb-20">
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">                    <Heading3 className="text-center mb-8 text-white">
                    Growth <span className="text-emerald-400">Metrics</span>
                </Heading3>

                    <Grid cols={4} gap="md">
                        {performanceMetrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 bg-${metric.color}-500/20`}>
                                    {metric.trend === 'up' ? (
                                        <ArrowUp className={`w-8 h-8 text-${metric.color}-400`} />
                                    ) : (
                                        <ArrowDown className={`w-8 h-8 text-${metric.color}-400`} />
                                    )}
                                </div>
                                <div className="text-2xl font-bold mb-1 text-white">{metric.value}</div>
                                <div className="text-slate-400 text-sm">{metric.label}</div>
                            </motion.div>
                        ))}
                    </Grid>
                </Card>
            </MotionContainer>

            {/* Financial Projections */}
            <MotionContainer delay={0.6} duration={0.8}>
                <Card className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 backdrop-blur-sm border border-emerald-400/30 p-8">
                    <Heading3 className="text-center mb-8 text-white">
                        Projeções Financeiras <span className="text-emerald-400">2025-2026</span>
                    </Heading3>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="text-left py-4 px-4 font-semibold text-white">Cenário</th>
                                    <th className="text-center py-4 px-4 font-semibold text-white">Clientes</th>
                                    <th className="text-center py-4 px-4 font-semibold text-white">Revenue</th>
                                    <th className="text-center py-4 px-4 font-semibold text-white">Margem</th>
                                    <th className="text-center py-4 px-4 font-semibold text-white">EBITDA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(projectionScenarios).map(([scenario, data], index) => (
                                    <motion.tr
                                        key={scenario}
                                        className="border-b border-white/10"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                    >
                                        <td className="py-4 px-4 font-semibold text-white">{scenario}</td>
                                        <td className="py-4 px-4 text-center text-slate-300">{data.clients}</td>
                                        <td className="py-4 px-4 text-center text-emerald-400 font-semibold">{data.revenue}</td>
                                        <td className="py-4 px-4 text-center text-blue-400">{data.margin}</td>
                                        <td className="py-4 px-4 text-center text-purple-400 font-semibold">{data.ebitda}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </MotionContainer>
        </Section>
    )
}
