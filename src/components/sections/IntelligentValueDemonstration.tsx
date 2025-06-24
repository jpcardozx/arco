'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
    MagnifyingGlassIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    CogIcon,
    LightBulbIcon,
    ArrowRightIcon,
    PlayIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    StarIcon,
    ClockIcon,
    BoltIcon,
    TrophyIcon
} from '@heroicons/react/24/outline'

interface IntelligentValueDemonstrationProps {
    isAuthenticated: boolean
    userTier: 'free' | 'premium' | 'enterprise'
}

interface DomainAnalysisDemo {
    domain: string
    status: 'analyzing' | 'complete'
    findings: {
        performance: {
            score: number
            issues: string[]
            recommendations: string[]
        }
        security: {
            score: number
            vulnerabilities: string[]
            improvements: string[]
        }
        competitive: {
            position: string
            opportunities: string[]
            threats: string[]
        }
        technical: {
            architecture: string
            optimizations: string[]
            modernization: string[]
        }
    }
}

interface ValueFramework {
    id: string
    title: string
    description: string
    metrics: string[]
    icon: React.ElementType
    premium: boolean
    demoAvailable: boolean
}

interface CompetitiveIntelligence {
    competitor: string
    weakness: string
    opportunity: string
    actionable: string
    confidence: number
}

const valueFrameworks: ValueFramework[] = [
    {
        id: 'technical-authority',
        title: 'Technical Authority Framework',
        description: 'Establish unquestionable expertise through systematic technical demonstration',
        metrics: ['340% credibility increase', '67% faster trust building', '180% expert positioning'],
        icon: ShieldCheckIcon,
        premium: false,
        demoAvailable: true
    },
    {
        id: 'competitive-intelligence',
        title: 'Real-time Competitive Intelligence',
        description: 'Live analysis of competitor technical infrastructure, performance, and positioning gaps',
        metrics: ['247% opportunity identification', '89% faster market response', '156% strategic advantage'],
        icon: MagnifyingGlassIcon,
        premium: true,
        demoAvailable: true
    },
    {
        id: 'conversion-psychology',
        title: 'Conversion Psychology Engine',
        description: 'Behavioral engineering for technical buyers and decision-making optimization',
        metrics: ['423% conversion improvement', '78% sales cycle reduction', '234% deal size increase'],
        icon: LightBulbIcon,
        premium: true,
        demoAvailable: false
    },
    {
        id: 'performance-optimization',
        title: 'Performance Intelligence System',
        description: 'Real-time technical performance monitoring with strategic recommendations',
        metrics: ['312% performance gains', '45% cost reduction', '167% efficiency improvement'],
        icon: BoltIcon,
        premium: false,
        demoAvailable: true
    }
]

const competitiveIntelligence: CompetitiveIntelligence[] = [
    {
        competitor: "Traditional Marketing Agencies",
        weakness: "Surface-level technical understanding",
        opportunity: "Deep technical credibility positioning",
        actionable: "Demonstrate real technical analysis vs. marketing fluff",
        confidence: 94
    },
    {
        competitor: "Management Consultancies",
        weakness: "Slow implementation cycles",
        opportunity: "Rapid technical deployment capability",
        actionable: "Show 90-day vs 18-month delivery timelines",
        confidence: 87
    },
    {
        competitor: "In-house Marketing Teams",
        weakness: "Limited strategic perspective",
        opportunity: "External strategic intelligence",
        actionable: "Provide competitive insights they can't see internally",
        confidence: 91
    }
]

export function IntelligentValueDemonstration({
    isAuthenticated,
    userTier
}: IntelligentValueDemonstrationProps) {
    const [activeFramework, setActiveFramework] = useState(0)
    const [demoAnalysis, setDemoAnalysis] = useState<DomainAnalysisDemo | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [selectedCompetitor, setSelectedCompetitor] = useState(0)

    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    // Auto-cycle through frameworks
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFramework((prev) => (prev + 1) % valueFrameworks.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    // Auto-cycle through competitive intelligence
    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedCompetitor((prev) => (prev + 1) % competitiveIntelligence.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const runDemoAnalysis = async () => {
        setIsAnalyzing(true)

        // Simulate progressive analysis
        const demoData: DomainAnalysisDemo = {
            domain: "competitor-example.com",
            status: 'analyzing',
            findings: {
                performance: { score: 0, issues: [], recommendations: [] },
                security: { score: 0, vulnerabilities: [], improvements: [] },
                competitive: { position: '', opportunities: [], threats: [] },
                technical: { architecture: '', optimizations: [], modernization: [] }
            }
        }

        setDemoAnalysis(demoData)

        // Progressive data loading simulation
        setTimeout(() => {
            setDemoAnalysis(prev => prev ? {
                ...prev,
                findings: {
                    ...prev.findings,
                    performance: {
                        score: 67,
                        issues: ['Slow CDN response times', 'Unoptimized images', 'Blocking JavaScript'],
                        recommendations: ['Implement edge caching', 'WebP image format', 'Code splitting']
                    }
                }
            } : null)
        }, 1000)

        setTimeout(() => {
            setDemoAnalysis(prev => prev ? {
                ...prev,
                findings: {
                    ...prev.findings,
                    security: {
                        score: 84,
                        vulnerabilities: ['Missing HSTS headers', 'Weak CSP policy'],
                        improvements: ['Enhanced security headers', 'Regular security audits']
                    }
                }
            } : null)
        }, 2000)

        setTimeout(() => {
            setDemoAnalysis(prev => prev ? {
                ...prev,
                status: 'complete',
                findings: {
                    ...prev.findings,
                    competitive: {
                        position: 'Market follower with technical debt',
                        opportunities: ['Mobile optimization gap', 'Missing international markets'],
                        threats: ['Emerging competitors with better tech', 'Platform dependencies']
                    },
                    technical: {
                        architecture: 'Legacy monolith with scaling issues',
                        optimizations: ['Microservices migration', 'Database optimization'],
                        modernization: ['Cloud-native architecture', 'API-first approach']
                    }
                }
            } : null)
        }, 3500)

        setIsAnalyzing(false)
    }

    const hasAccess = (premium: boolean) => {
        if (!premium) return true
        if (!isAuthenticated) return false
        return userTier === 'premium' || userTier === 'enterprise'
    }

    return (
        <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-20">
            {/* Background Elements */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 opacity-5"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
            </motion.div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-3 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-3 mb-8">
                        <CogIcon className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-200 font-medium">Intelligent Value Demonstration</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6">
                        See The Intelligence
                        <br />
                        <span className="text-blue-400">In Action</span>
                    </h2>

                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Real-time technical analysis, competitive intelligence, and strategic frameworks
                        that deliver measurable business results.
                    </p>
                </motion.div>

                {/* Value Frameworks Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mb-20"
                >
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {valueFrameworks.map((framework, index) => {
                            const accessible = hasAccess(framework.premium)
                            return (
                                <motion.div
                                    key={framework.id}
                                    className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${activeFramework === index
                                            ? 'bg-blue-500/20 border-blue-400/50 scale-105'
                                            : accessible
                                                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                                                : 'bg-slate-800/30 border-slate-700/50'
                                        } ${!accessible ? 'opacity-60' : ''}`}
                                    onHoverStart={() => accessible && setActiveFramework(index)}
                                >
                                    {!accessible && (
                                        <div className="absolute top-3 right-3 bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full">
                                            Premium
                                        </div>
                                    )}
                                    {React.createElement(framework.icon, {
                                        className: `w-8 h-8 mb-4 ${activeFramework === index ? 'text-blue-400' :
                                                accessible ? 'text-slate-400' : 'text-slate-600'
                                            }`
                                    })}

                                    <h3 className={`text-lg font-bold mb-2 ${accessible ? 'text-white' : 'text-slate-500'
                                        }`}>
                                        {framework.title}
                                    </h3>

                                    <p className={`text-sm mb-4 ${accessible ? 'text-slate-300' : 'text-slate-600'
                                        }`}>
                                        {framework.description}
                                    </p>

                                    {activeFramework === index && accessible && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="space-y-2"
                                        >
                                            {framework.metrics.map((metric, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs">
                                                    <CheckCircleIcon className="w-3 h-3 text-green-400" />
                                                    <span className="text-green-300">{metric}</span>
                                                </div>
                                            ))}

                                            {framework.demoAvailable && (
                                                <button
                                                    onClick={runDemoAnalysis}
                                                    className="mt-3 flex items-center gap-2 text-blue-400 hover:text-blue-300 text-xs"
                                                >
                                                    <PlayIcon className="w-3 h-3" />
                                                    Live Demo
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Live Demo Section */}
                {demoAnalysis && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-20 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl">
                                    <MagnifyingGlassIcon className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Live Technical Analysis</h3>
                                    <p className="text-slate-400">Domain: {demoAnalysis.domain}</p>
                                </div>
                            </div>

                            <div className={`px-4 py-2 rounded-full text-sm font-medium ${demoAnalysis.status === 'analyzing'
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-green-500/20 text-green-400'
                                }`}>
                                {demoAnalysis.status === 'analyzing' ? 'Analyzing...' : 'Analysis Complete'}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Performance */}
                            <div className="bg-slate-900/40 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <BoltIcon className="w-5 h-5 text-yellow-400" />
                                    <span className="font-semibold text-white">Performance</span>
                                </div>

                                {demoAnalysis.findings.performance.score > 0 ? (
                                    <>
                                        <div className="text-2xl font-bold text-white mb-2">
                                            {demoAnalysis.findings.performance.score}/100
                                        </div>
                                        <div className="space-y-2">
                                            {demoAnalysis.findings.performance.issues.map((issue, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs">
                                                    <ExclamationTriangleIcon className="w-3 h-3 text-red-400" />
                                                    <span className="text-slate-300">{issue}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="animate-pulse">
                                        <div className="h-8 bg-slate-700 rounded mb-2"></div>
                                        <div className="space-y-1">
                                            <div className="h-3 bg-slate-700 rounded"></div>
                                            <div className="h-3 bg-slate-700 rounded"></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Security */}
                            <div className="bg-slate-900/40 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                                    <span className="font-semibold text-white">Security</span>
                                </div>

                                {demoAnalysis.findings.security.score > 0 ? (
                                    <>
                                        <div className="text-2xl font-bold text-white mb-2">
                                            {demoAnalysis.findings.security.score}/100
                                        </div>
                                        <div className="space-y-2">
                                            {demoAnalysis.findings.security.vulnerabilities.map((vuln, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs">
                                                    <ExclamationTriangleIcon className="w-3 h-3 text-amber-400" />
                                                    <span className="text-slate-300">{vuln}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="animate-pulse">
                                        <div className="h-8 bg-slate-700 rounded mb-2"></div>
                                        <div className="space-y-1">
                                            <div className="h-3 bg-slate-700 rounded"></div>
                                            <div className="h-3 bg-slate-700 rounded"></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Competitive Position */}
                            <div className="bg-slate-900/40 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <TrophyIcon className="w-5 h-5 text-purple-400" />
                                    <span className="font-semibold text-white">Competitive</span>
                                </div>

                                {demoAnalysis.findings.competitive.position ? (
                                    <>
                                        <div className="text-sm font-medium text-purple-400 mb-2">
                                            {demoAnalysis.findings.competitive.position}
                                        </div>
                                        <div className="space-y-2">
                                            {demoAnalysis.findings.competitive.opportunities.map((opp, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs">
                                                    <LightBulbIcon className="w-3 h-3 text-blue-400" />
                                                    <span className="text-slate-300">{opp}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="animate-pulse">
                                        <div className="h-6 bg-slate-700 rounded mb-2"></div>
                                        <div className="space-y-1">
                                            <div className="h-3 bg-slate-700 rounded"></div>
                                            <div className="h-3 bg-slate-700 rounded"></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Technical Architecture */}
                            <div className="bg-slate-900/40 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <CogIcon className="w-5 h-5 text-blue-400" />
                                    <span className="font-semibold text-white">Technical</span>
                                </div>

                                {demoAnalysis.findings.technical.architecture ? (
                                    <>
                                        <div className="text-sm font-medium text-blue-400 mb-2">
                                            {demoAnalysis.findings.technical.architecture}
                                        </div>
                                        <div className="space-y-2">
                                            {demoAnalysis.findings.technical.optimizations.map((opt, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs">
                                                    <ArrowRightIcon className="w-3 h-3 text-green-400" />
                                                    <span className="text-slate-300">{opt}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="animate-pulse">
                                        <div className="h-6 bg-slate-700 rounded mb-2"></div>
                                        <div className="space-y-1">
                                            <div className="h-3 bg-slate-700 rounded"></div>
                                            <div className="h-3 bg-slate-700 rounded"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {demoAnalysis.status === 'complete' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <InformationCircleIcon className="w-5 h-5 text-blue-400" />
                                    <span className="font-semibold text-blue-400">Strategic Recommendations</span>
                                </div>
                                <p className="text-slate-200 text-sm">
                                    This is a sample of our real-time technical intelligence.
                                    {isAuthenticated ?
                                        ' Access your full dashboard for comprehensive competitive analysis.' :
                                        ' Sign up to analyze your own domain and competitors in real-time.'
                                    }
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Competitive Intelligence */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Competitive Intelligence
                        </h3>
                        <p className="text-xl text-slate-300">
                            Real-time analysis of market positioning and strategic opportunities
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            {competitiveIntelligence.map((intel, index) => (
                                <motion.div
                                    key={intel.competitor}
                                    className={`p-6 rounded-xl transition-all duration-500 ${selectedCompetitor === index
                                            ? 'bg-blue-500/20 border-2 border-blue-400/50'
                                            : 'bg-slate-800/30 border border-slate-700/30'
                                        }`}
                                    onHoverStart={() => setSelectedCompetitor(index)}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-bold text-white">{intel.competitor}</h4>
                                        <div className="flex items-center gap-1">
                                            <StarIcon className="w-4 h-4 text-yellow-400" />
                                            <span className="text-sm text-yellow-400">{intel.confidence}%</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm font-medium text-red-400 mb-1">Weakness</div>
                                            <div className="text-sm text-slate-200">{intel.weakness}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm font-medium text-green-400 mb-1">Opportunity</div>
                                            <div className="text-sm text-slate-200">{intel.opportunity}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm font-medium text-blue-400 mb-1">Actionable</div>
                                            <div className="text-sm text-slate-200">{intel.actionable}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Call-to-Action */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-center"
                >
                    <div className="max-w-3xl mx-auto mb-8">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Experience The Difference
                        </h3>
                        <p className="text-xl text-slate-300">
                            {isAuthenticated ?
                                'Unlock advanced features and deeper competitive intelligence' :
                                'Start with a free technical analysis of your domain'
                            }
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <motion.button
                            onClick={runDemoAnalysis}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isAnalyzing}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-500/25 disabled:opacity-50"
                        >
                            {isAnalyzing ? 'Analyzing...' : 'Run Live Demo'}
                        </motion.button>

                        {!isAuthenticated && (
                            <button className="flex items-center gap-2 px-6 py-4 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300">
                                Start Free Analysis
                                <ArrowRightIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {!isAuthenticated && (
                        <p className="text-sm text-slate-400 mt-4">
                            Free analysis includes: Performance audit • Security scan • Basic competitive insights
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
