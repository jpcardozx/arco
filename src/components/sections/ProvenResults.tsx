'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, DollarSign, TrendingUp, Zap, ExternalLink, CheckCircle, Target, Clock, Users } from 'lucide-react'
import { useState } from 'react'
import {
    Heading2,
    BodyLarge,
    Heading3,
    BodyRegular,
    Card,
    MotionContainer,
    Section,
    Grid,
    Button
} from '../../design-system/components'
import { SectionHeader, MetricCard } from '../shared'
import { useContent } from '../../lib/content'

interface CaseStudyResults {
    [key: string]: string
}

interface CaseStudy {
    title: string
    industry: string
    challenge: string
    solution: string
    methodology: string
    results: CaseStudyResults
    roi: string
    testimonial: string
    color: string
    caseStudyUrl: string
    timeframe: string
}

export function ProvenResults() {
    const [activeCase, setActiveCase] = useState(0)
    const content = useContent('en')

    const caseStudies: CaseStudy[] = [
        {
            title: "TechFlow Solutions",
            industry: "SaaS Enterprise",
            challenge: "78% drop in conversion rates due to 8.2s page load times. Legacy infrastructure was throttling $2.3M ARR growth.",
            solution: "Complete infrastructure overhaul with performance-first architecture and real-time monitoring.",
            methodology: "ARCO Performance Framework: Technical audit → Bottleneck analysis → Staged implementation → Continuous optimization", results: {
                "Revenue Recovery": "+$1.8M ARR",
                "Page Load Time": "-58%",
                "Conversion Rate": "+145%",
                "Infrastructure Cost": "-25%"
            },
            roi: "320% in 4 months",
            testimonial: "ARCO didn't just fix our tech debt - they unlocked revenue we didn't know we were losing. The performance gains translated directly to bottom line impact.",
            color: "from-emerald-600 to-emerald-700",
            caseStudyUrl: "/cases/techflow",
            timeframe: "4 months"
        },
        {
            title: "FinanceCore",
            industry: "Financial Services",
            challenge: "Compliance bottlenecks causing 15-day deployment cycles. Missing $400K quarterly targets due to slow feature delivery.",
            solution: "Automated compliance pipeline with security-first DevOps and real-time monitoring.",
            methodology: "ARCO Compliance Framework: Security audit → Automated pipelines → Compliance integration → Accelerated delivery", results: {
                "Deployment Speed": "+280%",
                "Quarterly Revenue": "+$650K",
                "Compliance Time": "-55%",
                "Security Incidents": "-90%"
            },
            roi: "185% in 6 months",
            testimonial: "They transformed our compliance from a revenue blocker into a competitive advantage. We're now the fastest in our market.",
            color: "from-blue-600 to-blue-700",
            caseStudyUrl: "/cases/financecore",
            timeframe: "6 months"
        },
        {
            title: "LogiStack",
            industry: "Logistics Tech",
            challenge: "System failures during peak seasons causing $800K revenue loss. 40% customer churn due to reliability issues.",
            solution: "Bulletproof infrastructure with predictive scaling and zero-downtime architecture.",
            methodology: "ARCO Reliability Framework: Failure analysis → Predictive systems → Auto-scaling → Performance monitoring", results: {
                "Revenue Recovery": "+$1.4M",
                "System Uptime": "99.8%",
                "Customer Retention": "+42%",
                "Peak Load Capacity": "+180%"
            },
            roi: "285% in 5 months",
            testimonial: "ARCO built us infrastructure that scales with demand and protects revenue during our most critical periods.",
            color: "from-purple-600 to-purple-700",
            caseStudyUrl: "/cases/logistack",
            timeframe: "5 months"
        }
    ]

    const impactMetrics = [
        {
            icon: DollarSign,
            label: "Revenue Impact",
            value: "$4.2M+",
            description: "Generated for clients",
            highlight: "Average client ROI: 265%"
        },
        {
            icon: TrendingUp,
            label: "Performance Gains",
            value: "185%",
            description: "Average improvement",
            highlight: "Load times, conversions, uptime"
        },
        {
            icon: Target,
            label: "Projects Delivered",
            value: "29",
            description: "Enterprise transformations",
            highlight: "94% success rate"
        },
        {
            icon: Clock,
            label: "Time to ROI",
            value: "5.1 months",
            description: "Average payback period",
            highlight: "Fastest: 3.2 months"
        }
    ]

    return (
        <Section background="white" id="proven-results">
            {/* Section Header */}            <SectionHeader
                title="Documented Impact for Mid-Market Leaders"
                subtitle="Real transformations of mid-market companies that captured hidden revenue through systematic improvements. All results audited by third parties."
                className="mb-16"
            />

            {/* Impact Metrics */}
            <MotionContainer delay={0.2} duration={0.8} className="mb-20">
                <Grid cols={4} gap="lg">
                    {impactMetrics.map((metric, index) => (
                        <MetricCard
                            key={index}
                            icon={metric.icon}
                            value={metric.value}
                            label={metric.label}
                            description={metric.description}
                            iconBgColor="bg-blue-100"
                            iconColor="text-blue-600"
                            delay={0.3 + index * 0.1}
                            className="h-full hover:scale-105"
                        />
                    ))}
                </Grid>
            </MotionContainer>

            {/* Case Studies Navigation */}
            <MotionContainer delay={0.4} duration={0.8} className="mb-12">
                <div className="flex flex-wrap justify-center gap-4">
                    {caseStudies.map((study, index) => (
                        <Button
                            key={index}
                            variant={activeCase === index ? "primary" : "outline"}
                            onClick={() => setActiveCase(index)}
                            className="transition-all duration-300 hover:scale-105"
                        >
                            {study.title.split(' ')[0]}
                        </Button>
                    ))}
                </div>
            </MotionContainer>

            {/* Active Case Study */}
            <MotionContainer delay={0.6} duration={0.5}>
                <motion.div
                    key={activeCase}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card variant="elevated" className="p-8 lg:p-12">
                        <Grid cols={2} gap="lg">                            {/* Case Details */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${caseStudies[activeCase].color} rounded-xl flex items-center justify-center`}>
                                        <BarChart3 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <Heading3 className="text-2xl">{caseStudies[activeCase].title}</Heading3>
                                        <BodyRegular className="text-slate-600">{caseStudies[activeCase].industry}</BodyRegular>
                                    </div>
                                </div>                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-2">Strategic Challenge:</h4>
                                        <BodyRegular className="text-slate-700">{caseStudies[activeCase].challenge}</BodyRegular>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-2">ARCO Methodology:</h4>
                                        <BodyRegular className="mb-3 text-slate-700">{caseStudies[activeCase].solution}</BodyRegular>
                                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Users className="w-4 h-4 text-blue-600" />
                                                <span className="font-semibold text-blue-800">Framework Applied:</span>
                                            </div>
                                            <p className="text-blue-800 text-sm">{caseStudies[activeCase].methodology}</p>
                                        </div>
                                    </div>

                                    <Card className="bg-emerald-50 border-l-4 border-emerald-500 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                                            <span className="font-semibold text-emerald-800">ROI: {caseStudies[activeCase].roi}</span>
                                        </div>
                                        <p className="text-emerald-700 text-sm">
                                            Delivered in {caseStudies[activeCase].timeframe}
                                        </p>
                                    </Card>

                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                        <div className="flex items-start gap-2 mb-2">
                                            <div className="w-1 h-8 bg-blue-500 rounded-full mt-1"></div>
                                            <div>
                                                <p className="text-slate-700 italic text-sm leading-relaxed">
                                                    {caseStudies[activeCase].testimonial}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            {/* Results */}                            <div>
                                <Heading3 className="mb-6">Measurable Results:</Heading3>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {Object.entries(caseStudies[activeCase].results).map(([key, value], index) => (
                                        <Card key={key} className="text-center p-4 border border-slate-200/50 hover:shadow-md transition-shadow duration-300">
                                            <div className="text-lg font-bold text-slate-900 mb-1">{value}</div>
                                            <div className="text-sm text-slate-600">{key}</div>
                                        </Card>
                                    ))}
                                </div>                                <Card className="bg-blue-50 border border-blue-200/50 p-6">
                                    <h5 className="font-semibold text-blue-900 mb-3">Applied Methodology:</h5>
                                    <ul className="space-y-2 text-blue-800 text-sm">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Comprehensive technical audit (infrastructure + performance)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Critical bottleneck identification with revenue impact analysis</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Prioritized implementation by ROI and execution speed</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Continuous monitoring and iterative optimization</span>
                                        </li>
                                    </ul>
                                </Card>

                                <div className="mt-6">
                                    <Button
                                        variant="outline"
                                        className="w-full hover:scale-105 transition-transform duration-300"
                                        onClick={() => window.open(caseStudies[activeCase].caseStudyUrl, '_blank')}
                                    >
                                        <span>View Complete Case Study</span>
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Card>
                </motion.div>
            </MotionContainer>            {/* Strategic CTA */}
            <MotionContainer delay={0.8} duration={0.8} className="mt-16 text-center">
                <Card className="bg-gradient-to-r from-blue-50 via-emerald-50 to-blue-50 border-2 border-blue-200/50 p-8 hover:shadow-xl transition-shadow duration-300">
                    <Grid cols={2} gap="lg" className="items-center">                        <div className="text-left">
                        <Heading3 className="mb-3">
                            Ready to Capture Your Hidden Digital Revenue?
                        </Heading3>
                        <BodyRegular className="text-slate-600 mb-4">
                            Start with a free 30-minute analysis. Identify hidden revenue opportunities in your current infrastructure.
                        </BodyRegular>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>No commitment</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>Results in 24h</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>Senior executives only</span>
                            </div>
                        </div>
                    </div>
                        <div className="text-center">
                            <Button
                                size="lg"
                                variant="primary"
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                onClick={() => window.open('/insight', '_blank')}
                            >
                                <span>Request ARCO Insight (Free)</span>
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>                            <p className="text-xs text-slate-500 mt-2">
                                Next available slots: Jan 15-20
                            </p>
                        </div>
                    </Grid>
                </Card>
            </MotionContainer>
        </Section>
    )
}
