'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import toast, { Toaster } from 'react-hot-toast'
import confetti from 'canvas-confetti'
import CountUp from 'react-countup'
import {
    Shield, Eye, EyeOff, TrendingDown, Lock, Unlock,
    ChevronRight, Building2, Briefcase, LineChart,
    AlertTriangle, Sparkles, Brain, Activity,
    Zap, Target, Scale, Gauge, DollarSign,
    AlertCircle, Award, Trophy
} from 'lucide-react'

// Advanced Types for Strategic Depth
interface PerceptionGap {
    id: string
    dimension: string
    marketAssumption: string
    internalReality: string
    dissonanceLevel: 'lethal' | 'severe' | 'critical'
    economicImpact: {
        immediateBleed: number // Monthly revenue loss
        compoundedLoss: number // 5-year projection
        marketShareErosion: number // Percentage points
        premiumCapture: number // Lost pricing power %
    }
    symptoms: string[]
    cascadeEffects: string[]
    revealed: boolean
    analysisDepth: number // 0-100 showing analysis completeness
}

interface DiagnosticLayer {
    id: string
    name: string
    question: string
    revealThreshold: number
    insights: {
        primary: string
        evidence: string[]
        implications: string[]
    }
    unlocked: boolean
    criticalFinding?: string
}

interface ExecutiveProfile {
    sector: string
    companySize: 'emerging' | 'growth' | 'enterprise'
    revenueRange: string
    marketPosition: number // 1-10 self-assessment
    perceivedAuthority: number // 0-100
    actualAuthority: number // 0-100 (calculated)
    gapMultiplier: number // How much the gap costs
    riskTolerance: 'conservative' | 'moderate' | 'aggressive'
    urgencyLevel: number // 0-100
    engagementQuality: number // 0-100
}

// Strategic Constants
const SECTOR_DYNAMICS = {
    'enterprise-saas': {
        icon: Building2,
        label: 'Enterprise SaaS',
        avgCAC: 15000,
        avgACV: 120000,
        churnImpact: 3.2, // Revenue multiple lost per % churn
        trustDecay: 8.5, // Months before authority erodes
        perceptionLag: 18, // Months market takes to recognize change
        criticalMetrics: ['NRR', 'Logo Retention', 'Expansion Rate']
    },
    'professional-services': {
        icon: Briefcase,
        label: 'Professional Services',
        avgCAC: 8000,
        avgACV: 450000,
        churnImpact: 5.7,
        trustDecay: 6.3,
        perceptionLag: 12,
        criticalMetrics: ['Partner Attrition', 'Project Success Rate', 'RFP Win Rate']
    },
    'wealth-management': {
        icon: LineChart,
        label: 'Wealth Management',
        avgCAC: 22000,
        avgACV: 580000,
        churnImpact: 7.8,
        trustDecay: 4.2,
        perceptionLag: 24,
        criticalMetrics: ['AUM Growth', 'Client LTV', 'Referral Rate']
    }
}

const PERCEPTION_GAPS: PerceptionGap[] = [
    {
        id: 'authority-paradox',
        dimension: 'Market Authority',
        marketAssumption: 'Established thought leadership with natural gravitas',
        internalReality: 'Desperate messaging that screams inexperience',
        dissonanceLevel: 'lethal',
        economicImpact: {
            immediateBleed: 385000,
            compoundedLoss: 42000000,
            marketShareErosion: 8.3,
            premiumCapture: 67
        },
        symptoms: [
            'Prospects question your pricing despite clear value',
            'Competitors with inferior products win on "trust"',
            'Sales cycles extend as buyers "need more validation"'
        ],
        cascadeEffects: [
            'Top talent refuses offers due to "perception concerns"',
            'Investors undervalue your multiple by 3-4x',
            'Strategic partnerships stall at executive approval'
        ],
        revealed: false,
        analysisDepth: 0
    },
    {
        id: 'value-translation',
        dimension: 'Value Architecture',
        marketAssumption: 'Premium solution worth 10x competitor price',
        internalReality: 'Feature list that sounds like everyone else',
        dissonanceLevel: 'severe',
        economicImpact: {
            immediateBleed: 275000,
            compoundedLoss: 28000000,
            marketShareErosion: 5.7,
            premiumCapture: 54
        },
        symptoms: [
            'Buyers see you as "just another vendor"',
            'Price negotiations always go downward',
            'POCs focus on features, not transformation'
        ],
        cascadeEffects: [
            'Sales team loses confidence in pricing model',
            'Marketing burns budget on ineffective campaigns',
            'Product roadmap drifts toward commoditization'
        ],
        revealed: false,
        analysisDepth: 0
    },
    {
        id: 'trust-architecture',
        dimension: 'Credibility Framework',
        marketAssumption: 'Proven expertise backed by undeniable results',
        internalReality: 'Claims without evidence, promises without proof',
        dissonanceLevel: 'critical',
        economicImpact: {
            immediateBleed: 195000,
            compoundedLoss: 18000000,
            marketShareErosion: 3.9,
            premiumCapture: 41
        },
        symptoms: [
            'Reference calls become deal-breakers',
            'Case studies feel generic and unconvincing',
            'Executive buyers delegate to procurement'
        ],
        cascadeEffects: [
            'Customer success struggles with adoption',
            'Renewal conversations start with skepticism',
            'Upsell opportunities consistently missed'
        ],
        revealed: false,
        analysisDepth: 0
    },
    {
        id: 'complexity-penalty',
        dimension: 'Message Clarity',
        marketAssumption: 'Sophisticated solution for sophisticated buyers',
        internalReality: 'Convoluted explanation that confuses everyone',
        dissonanceLevel: 'severe',
        economicImpact: {
            immediateBleed: 165000,
            compoundedLoss: 14000000,
            marketShareErosion: 2.8,
            premiumCapture: 38
        },
        symptoms: [
            'Prospects ask "but what do you actually do?"',
            'Elevator pitch takes 10 minutes',
            'Website bounce rate exceeds 70%'
        ],
        cascadeEffects: [
            'Sales onboarding takes 6+ months',
            'Partner channel can\'t sell effectively',
            'Analyst coverage remains superficial'
        ],
        revealed: false,
        analysisDepth: 0
    }
]

const DIAGNOSTIC_LAYERS: DiagnosticLayer[] = [
    {
        id: 'surface-symptoms',
        name: 'Symptom Recognition',
        question: 'What patterns destroy your revenue predictability?',
        revealThreshold: 1,
        insights: {
            primary: 'Your execution is flawless. Your perception is catastrophic.',
            evidence: [
                '87% of lost deals cite "trust concerns" despite superior product',
                'Sales cycle 3.7x longer than industry average for comparable ACVs',
                'Win rate against inferior competitors: 23%'
            ],
            implications: [
                'Board questions go-to-market strategy quarterly',
                'Fundraising valuations lag peer companies by 40%',
                'Key hires choose competitors citing "market position"'
            ]
        },
        unlocked: false,
        criticalFinding: 'The market has already decided who you are. They\'re wrong.'
    },
    {
        id: 'root-causes',
        name: 'Causality Mapping',
        question: 'Why does the market misread your authority?',
        revealThreshold: 2,
        insights: {
            primary: 'Your brilliance is buried under borrowed language.',
            evidence: [
                'Messaging matches 74% of competitor content verbatim',
                'Visual hierarchy contradicts premium positioning',
                'Social proof emphasizes quantity over strategic relevance'
            ],
            implications: [
                'Buyers lump you with commodity providers',
                'Pricing discussions start 43% below target',
                'Strategic accounts treat you as tactical vendor'
            ]
        },
        unlocked: false,
        criticalFinding: 'You\'re using the wrong symbols for your level of sophistication.'
    },
    {
        id: 'economic-model',
        name: 'Revenue Archaeology',
        question: 'How much does misperception actually cost?',
        revealThreshold: 3,
        insights: {
            primary: 'Every perception gap is a compound fracture in your P&L.',
            evidence: [
                'Direct revenue impact: -$1.2M monthly',
                'Indirect opportunity cost: $3.8M quarterly',
                'Market cap suppression: ~$127M'
            ],
            implications: [
                'Break-even pushes out 16 months',
                'Series B requires 2.3x more dilution',
                'Exit multiples compressed by 40-60%'
            ]
        },
        unlocked: false,
        criticalFinding: 'Perception isn\'t soft. It\'s your hardest financial metric.'
    },
    {
        id: 'strategic-prescription',
        name: 'The Index™ Prescription',
        question: 'What transforms perception into market dominance?',
        revealThreshold: 4,
        insights: {
            primary: 'Symbolic authority can be engineered with surgical precision.',
            evidence: [
                'Index™ clients see 312% average authority score increase',
                'Sales cycles compress by 67% within 90 days',
                'Win rates against incumbents rise to 78%'
            ],
            implications: [
                'Premium pricing accepted without negotiation',
                'Talent acquisition shifts from push to pull',
                'Strategic buyers approach you proactively'
            ]
        },
        unlocked: false,
        criticalFinding: 'Market perception is a system. We\'ve decoded its physics.'
    }
]

// Premium UI Components
const GlassPanel = ({ children, className = '', variant = 'default', ...props }: unknown) => {
    const variants = {
        default: 'backdrop-blur-xl bg-white/[0.02] border border-white/[0.05]',
        elevated: 'backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] shadow-2xl',
        critical: 'backdrop-blur-xl bg-red-950/20 border border-red-500/20',
        success: 'backdrop-blur-xl bg-emerald-950/20 border border-emerald-500/20',
        premium: 'backdrop-blur-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06]'
    }

    return (
        <motion.div className={`${variants[variant]} ${className}`} {...props}>
            {children}
        </motion.div>
    )
}

const MetricPulse = ({ value, label, color = 'blue', size = 'md' }: unknown) => {
    return (
        <div className="relative">
            <motion.div
                className={`absolute inset-0 rounded-full bg-${color}-500/20`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <div className={`
        relative z-10 rounded-full bg-gradient-to-br from-${color}-500 to-${color}-600
        ${size === 'lg' ? 'p-8' : size === 'md' ? 'p-6' : 'p-4'}
      `}>
                <div className="text-center">
                    <p className={`font-bold text-white ${size === 'lg' ? 'text-3xl' : 'text-2xl'}`}>
                        {value}
                    </p>
                    <p className="text-xs text-white/80 mt-1">{label}</p>
                </div>
            </div>
        </div>
    )
}

// Main Component
export default function SymbolicAnchor() {
    const [profile, setProfile] = useState<ExecutiveProfile>({
        sector: '',
        companySize: 'growth',
        revenueRange: '$10-50M',
        marketPosition: 7,
        perceivedAuthority: 30,
        actualAuthority: 85,
        gapMultiplier: 3.4,
        riskTolerance: 'moderate',
        urgencyLevel: 0,
        engagementQuality: 0
    })

    const [gaps, setGaps] = useState(PERCEPTION_GAPS)
    const [layers, setLayers] = useState(DIAGNOSTIC_LAYERS)
    const [currentPhase, setCurrentPhase] = useState<'qualification' | 'diagnosis' | 'prescription'>('qualification')
    const [selectedGap, setSelectedGap] = useState<PerceptionGap | null>(null)
    const [revealedCount, setRevealedCount] = useState(0)
    const [interactionQuality, setInteractionQuality] = useState(0)

    const scrollRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: scrollRef })
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])
    const contentScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.95])

    // Strategic Calculations
    const diagnosticProgress = useMemo(() => {
        const revealed = gaps.filter(g => g.revealed).length
        return (revealed / gaps.length) * 100
    }, [gaps])

    const totalEconomicImpact = useMemo(() => {
        return gaps
            .filter(g => g.revealed)
            .reduce((sum, gap) => ({
                monthly: sum.monthly + gap.economicImpact.immediateBleed,
                total: sum.total + gap.economicImpact.compoundedLoss,
                marketShare: sum.marketShare + gap.economicImpact.marketShareErosion
            }), { monthly: 0, total: 0, marketShare: 0 })
    }, [gaps])

    const authorityGap = useMemo(() => {
        return profile.actualAuthority - profile.perceivedAuthority
    }, [profile])

    const recoveryTimeline = useMemo(() => {
        if (!profile.sector) return 0
        const sectorData = SECTOR_DYNAMICS[profile.sector as keyof typeof SECTOR_DYNAMICS]
        return Math.ceil(sectorData.perceptionLag * (1 - diagnosticProgress / 100))
    }, [profile.sector, diagnosticProgress])

    // Interaction Handlers
    const selectSector = useCallback((sectorKey: string) => {
        setProfile(prev => ({
            ...prev,
            sector: sectorKey,
            urgencyLevel: 25
        }))
        setCurrentPhase('diagnosis')

        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#3b82f6', '#8b5cf6']
        })

        toast.custom((t) => (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-neutral-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/10"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                        <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <p className="font-semibold">Diagnostic Initialized</p>
                        <p className="text-sm text-neutral-400">Analyzing perception gaps for {SECTOR_DYNAMICS[sectorKey as keyof typeof SECTOR_DYNAMICS].label}</p>
                    </div>
                </div>
            </motion.div>
        ), { duration: 4000 })
    }, [])

    const revealGap = useCallback((gapId: string) => {
        setGaps(prevGaps => {
            const updatedGaps = prevGaps.map(gap =>
                gap.id === gapId
                    ? { ...gap, revealed: true, analysisDepth: 100 }
                    : gap
            )

            const newRevealedCount = updatedGaps.filter(g => g.revealed).length
            setRevealedCount(newRevealedCount)

            // Check for layer unlocks
            setLayers(prevLayers =>
                prevLayers.map(layer => ({
                    ...layer,
                    unlocked: newRevealedCount >= layer.revealThreshold
                }))
            )

            // Update profile metrics
            setProfile(prev => ({
                ...prev,
                urgencyLevel: Math.min(100, prev.urgencyLevel + 20),
                engagementQuality: Math.min(100, prev.engagementQuality + 25),
                perceivedAuthority: Math.max(0, prev.perceivedAuthority - 8)
            }))

            // Trigger achievement if completing all
            if (newRevealedCount === PERCEPTION_GAPS.length) {
                setCurrentPhase('prescription')
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6']
                })
            }

            return updatedGaps
        })

        const gap = gaps.find(g => g.id === gapId)
        if (gap && !gap.revealed) {
            setSelectedGap(gap)
            toast.custom((t) => (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-950/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl border border-red-500/20"
                >
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-red-100">Critical Gap Revealed</p>
                            <p className="text-sm text-red-200 mt-1">{gap.economicImpact.immediateBleed.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} monthly revenue at risk</p>
                        </div>
                    </div>
                </motion.div>
            ))
        }
    }, [gaps])

    // Render Functions
    const renderQualification = () => {
        const [hoveredSector, setHoveredSector] = useState<string | null>(null)

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex items-center justify-center px-6"
            >
                <div className="max-w-4xl w-full">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-thin mb-6">
                            Your market sees
                            <span className="block text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                a fraction
                            </span>
                            of your true worth.
                        </h1>

                        <p className="text-2xl text-neutral-300 mb-4">
                            The perception gap costs you <span className="font-bold text-red-400">$4.7M annually</span>.
                        </p>

                        <p className="text-xl text-neutral-400">
                            Diagnose it precisely. Fix it permanently. <span className="font-semibold text-blue-400">In 45 days.</span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-center text-sm text-neutral-500 mb-8">
                            Select your sector to begin precision diagnostics:
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            {Object.entries(SECTOR_DYNAMICS).map(([key, sector], index) => {
                                const Icon = sector.icon
                                const isHovered = hoveredSector === key

                                return (
                                    <motion.button
                                        key={key}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        onClick={() => selectSector(key)}
                                        onMouseEnter={() => setHoveredSector(key)}
                                        onMouseLeave={() => setHoveredSector(null)}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative group"
                                    >
                                        <GlassPanel variant="elevated" className="p-8 rounded-2xl h-full">
                                            {/* Glow effect */}
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                style={{
                                                    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                                                }}
                                            />

                                            <div className="relative z-10">
                                                <div className="flex justify-center mb-6">
                                                    <motion.div
                                                        animate={isHovered ? { rotate: 360 } : {}}
                                                        transition={{ duration: 0.8 }}
                                                        className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl"
                                                    >
                                                        <Icon className="w-8 h-8 text-white" />
                                                    </motion.div>
                                                </div>

                                                <h3 className="text-xl font-bold mb-2">{sector.label}</h3>

                                                <div className="space-y-3 text-sm">
                                                    <div className="flex justify-between text-neutral-400">
                                                        <span>Avg CAC</span>
                                                        <span className="font-medium text-neutral-300">
                                                            ${(sector.avgCAC / 1000).toFixed(0)}k
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between text-neutral-400">
                                                        <span>Trust Decay</span>
                                                        <span className="font-medium text-amber-400">
                                                            {sector.trustDecay} months
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between text-neutral-400">
                                                        <span>Recovery Time</span>
                                                        <span className="font-medium text-green-400">
                                                            {sector.perceptionLag} months
                                                        </span>
                                                    </div>
                                                </div>

                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: isHovered ? 1 : 0 }}
                                                    className="mt-6 pt-6 border-t border-white/10"
                                                >
                                                    <p className="text-xs text-blue-400 font-medium">
                                                        Critical Metrics:
                                                    </p>
                                                    <p className="text-xs text-neutral-400 mt-1">
                                                        {sector.criticalMetrics.join(' • ')}
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </GlassPanel>
                                    </motion.button>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        )
    }

    const renderDiagnosis = () => {
        const [hoveredGap, setHoveredGap] = useState<string | null>(null)

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen px-6 py-20"
            >
                <div className="max-w-7xl mx-auto">
                    {/* Progress Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-16"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Perception Gap Analysis</h2>
                                <p className="text-neutral-400">
                                    Each gap compounds your market disadvantage exponentially.
                                </p>
                            </div>

                            <div className="flex items-center gap-6">
                                <MetricPulse
                                    value={`${Math.round(diagnosticProgress)}%`}
                                    label="Progress"
                                    color="blue"
                                    size="md"
                                />

                                {totalEconomicImpact.monthly > 0 && (
                                    <MetricPulse
                                        value={`-$${(totalEconomicImpact.monthly / 1000000).toFixed(1)}M`}
                                        label="Monthly"
                                        color="red"
                                        size="md"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="relative h-2 bg-neutral-800/50 rounded-full overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${diagnosticProgress}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />

                            {/* Milestone markers */}
                            {[25, 50, 75].map((milestone) => (
                                <div
                                    key={milestone}
                                    className={`
                    absolute top-1/2 -translate-y-1/2 w-0.5 h-4 
                    ${diagnosticProgress >= milestone ? 'bg-white/50' : 'bg-neutral-700'}
                  `}
                                    style={{ left: `${milestone}%` }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Gap Cards */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {gaps.map((gap, index) => (
                            <motion.div
                                key={gap.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredGap(gap.id)}
                                onMouseLeave={() => setHoveredGap(null)}
                                className="relative"
                            >
                                <motion.button
                                    onClick={() => revealGap(gap.id)}
                                    disabled={gap.revealed}
                                    whileHover={!gap.revealed ? { scale: 1.02 } : {}}
                                    whileTap={!gap.revealed ? { scale: 0.98 } : {}}
                                    className="w-full text-left"
                                >
                                    <GlassPanel
                                        variant={gap.revealed ? 'critical' : 'elevated'}
                                        className={`
                      p-8 rounded-2xl h-full transition-all duration-500
                      ${gap.revealed ? 'border-red-500/30' : 'hover:border-white/20'}
                    `}
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                                                    {gap.dimension}
                                                    {gap.revealed && (
                                                        <motion.span
                                                            initial={{ scale: 0, rotate: -180 }}
                                                            animate={{ scale: 1, rotate: 0 }}
                                                            className="text-red-400"
                                                        >
                                                            <Sparkles className="w-5 h-5" />
                                                        </motion.span>
                                                    )}
                                                </h3>

                                                <div className="flex items-center gap-3">
                                                    <span className={`
                            inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                            ${gap.dissonanceLevel === 'lethal'
                                                            ? 'bg-red-500/20 text-red-400'
                                                            : gap.dissonanceLevel === 'severe'
                                                                ? 'bg-orange-500/20 text-orange-400'
                                                                : 'bg-yellow-500/20 text-yellow-400'
                                                        }
                          `}>
                                                        <AlertTriangle className="w-3 h-3" />
                                                        {gap.dissonanceLevel.toUpperCase()}
                                                    </span>

                                                    {gap.revealed && (
                                                        <span className="text-xs text-red-400 font-medium">
                                                            -{gap.economicImpact.premiumCapture}% pricing power
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <motion.div
                                                animate={gap.revealed ? { rotate: 360 } : {}}
                                                transition={{ duration: 0.5 }}
                                                className={`
                          p-3 rounded-2xl
                          ${gap.revealed
                                                        ? 'bg-gradient-to-br from-red-500 to-rose-500'
                                                        : 'bg-neutral-800'
                                                    }
                        `}
                                            >
                                                {gap.revealed ? (
                                                    <Eye className="w-6 h-6 text-white" />
                                                ) : (
                                                    <EyeOff className="w-6 h-6 text-neutral-400" />
                                                )}
                                            </motion.div>
                                        </div>

                                        {/* Content */}
                                        <AnimatePresence mode="wait">
                                            {gap.revealed ? (
                                                <motion.div
                                                    key="revealed"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="space-y-6"
                                                >
                                                    {/* Perception vs Reality */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <GlassPanel className="p-5 rounded-xl">
                                                            <p className="text-xs font-medium text-blue-400 mb-2">
                                                                Market Assumes:
                                                            </p>
                                                            <p className="text-base font-semibold text-blue-100">
                                                                {gap.marketAssumption}
                                                            </p>
                                                        </GlassPanel>

                                                        <GlassPanel className="p-5 rounded-xl border-red-500/20">
                                                            <p className="text-xs font-medium text-red-400 mb-2">
                                                                Reality Is:
                                                            </p>
                                                            <p className="text-base font-semibold text-red-100">
                                                                {gap.internalReality}
                                                            </p>
                                                        </GlassPanel>
                                                    </div>

                                                    {/* Economic Impact */}
                                                    <motion.div
                                                        initial={{ scale: 0.95, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ delay: 0.2 }}
                                                        className="p-6 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl"
                                                    >
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                            <div className="text-center">
                                                                <p className="text-2xl font-bold text-red-400">
                                                                    <CountUp
                                                                        end={gap.economicImpact.immediateBleed}
                                                                        prefix="-$"
                                                                        separator=","
                                                                        duration={1.5}
                                                                    />
                                                                </p>
                                                                <p className="text-xs text-neutral-400 mt-1">Monthly Bleed</p>
                                                            </div>

                                                            <div className="text-center">
                                                                <p className="text-2xl font-bold text-red-400">
                                                                    <CountUp
                                                                        end={gap.economicImpact.compoundedLoss / 1000000}
                                                                        prefix="-$"
                                                                        suffix="M"
                                                                        decimals={1}
                                                                        duration={1.5}
                                                                    />
                                                                </p>
                                                                <p className="text-xs text-neutral-400 mt-1">5-Year Loss</p>
                                                            </div>

                                                            <div className="text-center">
                                                                <p className="text-2xl font-bold text-amber-400">
                                                                    <CountUp
                                                                        end={gap.economicImpact.marketShareErosion}
                                                                        prefix="-"
                                                                        suffix="%"
                                                                        decimals={1}
                                                                        duration={1.5}
                                                                    />
                                                                </p>
                                                                <p className="text-xs text-neutral-400 mt-1">Market Share</p>
                                                            </div>

                                                            <div className="text-center">
                                                                <p className="text-2xl font-bold text-amber-400">
                                                                    <CountUp
                                                                        end={gap.economicImpact.premiumCapture}
                                                                        prefix="-"
                                                                        suffix="%"
                                                                        duration={1.5}
                                                                    />
                                                                </p>
                                                                <p className="text-xs text-neutral-400 mt-1">Price Power</p>
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Symptoms */}
                                                    <div>
                                                        <p className="text-sm font-medium text-neutral-300 mb-3">
                                                            Observable Symptoms:
                                                        </p>
                                                        <div className="space-y-2">
                                                            {gap.symptoms.map((symptom, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -20 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.3 + i * 0.1 }}
                                                                    className="flex items-start gap-3"
                                                                >
                                                                    <TrendingDown className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                                                    <p className="text-sm text-neutral-300">{symptom}</p>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Cascade Effects */}
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.5 }}
                                                        className="pt-6 border-t border-white/10"
                                                    >
                                                        <p className="text-sm font-medium text-amber-400 mb-3">
                                                            Cascade Effects:
                                                        </p>
                                                        <div className="space-y-2">
                                                            {gap.cascadeEffects.map((effect, i) => (
                                                                <div key={i} className="flex items-start gap-3">
                                                                    <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                                                    <p className="text-sm text-neutral-400">{effect}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="hidden"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="text-center py-12"
                                                >
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.1, 1],
                                                            rotate: hoveredGap === gap.id ? [0, 5, -5, 0] : 0
                                                        }}
                                                        transition={{
                                                            scale: { duration: 2, repeat: Infinity },
                                                            rotate: { duration: 0.5, repeat: Infinity }
                                                        }}
                                                        className="inline-block"
                                                    >
                                                        <div className="p-6 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-full">
                                                            <EyeOff className="w-12 h-12 text-neutral-400" />
                                                        </div>
                                                    </motion.div>

                                                    <p className="mt-6 text-lg font-medium text-neutral-300">
                                                        Click to expose this gap
                                                    </p>
                                                    <p className="text-sm text-neutral-500 mt-2">
                                                        Discover the true cost of misperception
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </GlassPanel>
                                </motion.button>

                                {/* Analysis depth indicator */}
                                {gap.revealed && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute -top-3 -right-3 bg-gradient-to-br from-red-500 to-rose-500 rounded-full p-1"
                                    >
                                        <div className="bg-neutral-950 rounded-full p-2">
                                            <Target className="w-5 h-5 text-red-400" />
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Diagnostic Layers */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: diagnosticProgress > 0 ? 1 : 0 }}
                        className="space-y-8"
                    >
                        <h3 className="text-2xl font-bold text-center mb-8">
                            Strategic Analysis Layers
                        </h3>

                        {layers.map((layer, index) => (
                            <motion.div
                                key={layer.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: layer.unlocked || revealedCount >= layer.revealThreshold - 1 ? 1 : 0.3,
                                    y: 0
                                }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassPanel
                                    variant={layer.unlocked ? 'success' : 'default'}
                                    className={`
                    p-8 rounded-2xl transition-all duration-500
                    ${layer.unlocked ? 'border-emerald-500/30' : ''}
                  `}
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex-1">
                                            <h4 className="text-xl font-bold mb-2 flex items-center gap-3">
                                                {layer.name}
                                                {layer.unlocked && (
                                                    <motion.span
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="text-emerald-400"
                                                    >
                                                        <Award className="w-5 h-5" />
                                                    </motion.span>
                                                )}
                                            </h4>
                                            <p className="text-neutral-400">{layer.question}</p>
                                        </div>

                                        <div className={`
                      p-3 rounded-xl
                      ${layer.unlocked
                                                ? 'bg-gradient-to-br from-emerald-500 to-green-500'
                                                : 'bg-neutral-800'
                                            }
                    `}>
                                            {layer.unlocked ? (
                                                <Unlock className="w-5 h-5 text-white" />
                                            ) : (
                                                <Lock className="w-5 h-5 text-neutral-500" />
                                            )}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {layer.unlocked ? (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="space-y-6"
                                            >
                                                {/* Primary Insight */}
                                                <div className="p-6 bg-gradient-to-br from-emerald-900/20 to-green-900/20 rounded-xl border border-emerald-500/20">
                                                    <p className="text-lg font-semibold text-emerald-100">
                                                        {layer.insights.primary}
                                                    </p>
                                                </div>

                                                {/* Evidence */}
                                                <div>
                                                    <p className="text-sm font-medium text-neutral-300 mb-3">
                                                        Evidence:
                                                    </p>
                                                    <div className="space-y-2">
                                                        {layer.insights.evidence.map((evidence, i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.1 }}
                                                                className="flex items-start gap-3"
                                                            >
                                                                <Brain className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                                                <p className="text-sm text-neutral-300">{evidence}</p>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Implications */}
                                                <div>
                                                    <p className="text-sm font-medium text-neutral-300 mb-3">
                                                        Strategic Implications:
                                                    </p>
                                                    <div className="space-y-2">
                                                        {layer.insights.implications.map((implication, i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.3 + i * 0.1 }}
                                                                className="flex items-start gap-3"
                                                            >
                                                                <Scale className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                                                <p className="text-sm text-neutral-300">{implication}</p>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Critical Finding */}
                                                {layer.criticalFinding && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.5 }}
                                                        className="mt-6 p-6 bg-gradient-to-br from-red-900/20 to-rose-900/20 rounded-xl border border-red-500/20"
                                                    >
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <AlertCircle className="w-5 h-5 text-red-400" />
                                                            <p className="font-semibold text-red-100">Critical Finding</p>
                                                        </div>
                                                        <p className="text-red-100">{layer.criticalFinding}</p>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center py-8"
                                            >
                                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-neutral-800 rounded-full">
                                                    <Lock className="w-4 h-4 text-neutral-500" />
                                                    <span className="text-sm text-neutral-400">
                                                        Reveal {layer.revealThreshold - revealedCount} more gap{layer.revealThreshold - revealedCount !== 1 ? 's' : ''} to unlock
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </GlassPanel>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        )
    }

    const renderPrescription = () => {
        const totalMonthlyLoss = totalEconomicImpact.monthly
        const total5YearLoss = totalEconomicImpact.total
        const marketShareLoss = totalEconomicImpact.marketShare

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen px-6 py-20"
            >
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Your diagnosis is complete.
                        </h1>

                        <p className="text-2xl text-neutral-300 mb-4">
                            The verdict is{' '}
                            <span className="font-bold text-red-400">devastating</span>.
                        </p>

                        <p className="text-xl text-neutral-400">
                            But the solution is{' '}
                            <span className="font-bold text-emerald-400">surgical</span>.
                        </p>
                    </motion.div>

                    {/* Economic Impact Summary */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <GlassPanel variant="critical" className="p-10 rounded-3xl mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8">
                                Total Economic Impact
                            </h3>

                            <div className="grid md:grid-cols-3 gap-8 mb-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                    className="text-center"
                                >
                                    <p className="text-5xl font-bold text-red-400 mb-2">
                                        <CountUp
                                            end={totalMonthlyLoss}
                                            prefix="-$"
                                            separator=","
                                            duration={2}
                                        />
                                    </p>
                                    <p className="text-lg text-neutral-300">Monthly Revenue Loss</p>
                                    <p className="text-sm text-neutral-500 mt-1">
                                        Immediate cash flow impact
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4, type: "spring" }}
                                    className="text-center"
                                >
                                    <p className="text-5xl font-bold text-red-400 mb-2">
                                        <CountUp
                                            end={total5YearLoss / 1000000}
                                            prefix="-$"
                                            suffix="M"
                                            decimals={1}
                                            duration={2}
                                        />
                                    </p>
                                    <p className="text-lg text-neutral-300">5-Year Trajectory</p>
                                    <p className="text-sm text-neutral-500 mt-1">
                                        Compounded opportunity cost
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring" }}
                                    className="text-center"
                                >
                                    <p className="text-5xl font-bold text-amber-400 mb-2">
                                        <CountUp
                                            end={marketShareLoss}
                                            prefix="-"
                                            suffix="%"
                                            decimals={1}
                                            duration={2}
                                        />
                                    </p>
                                    <p className="text-lg text-neutral-300">Market Position</p>
                                    <p className="text-sm text-neutral-500 mt-1">
                                        Category leadership erosion
                                    </p>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="p-6 bg-red-950/30 rounded-xl border border-red-500/30"
                            >
                                <p className="text-center text-lg">
                                    <span className="font-bold text-red-400">{authorityGap}%</span> gap between your{' '}
                                    <span className="text-emerald-400">actual authority</span> and{' '}
                                    <span className="text-red-400">market perception</span>
                                </p>
                            </motion.div>
                        </GlassPanel>
                    </motion.div>

                    {/* The Index™ Solution */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <GlassPanel variant="premium" className="p-10 rounded-3xl mb-12">
                            <div className="text-center mb-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.8 }}
                                    className="inline-block p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-6"
                                >
                                    <Shield className="w-12 h-12 text-white" />
                                </motion.div>

                                <h2 className="text-4xl font-bold mb-4">
                                    The Index™ Framework
                                </h2>

                                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                                    Precision-engineered symbolic authority that transforms market perception
                                    in <span className="font-bold text-emerald-400">{recoveryTimeline} days</span>.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 mb-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="text-center"
                                >
                                    <div className="mb-4">
                                        <Target className="w-8 h-8 text-blue-400 mx-auto" />
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">Symbolic Precision</h4>
                                    <p className="text-sm text-neutral-400">
                                        Every element calibrated to trigger authority recognition
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.0 }}
                                    className="text-center"
                                >
                                    <div className="mb-4">
                                        <Brain className="w-8 h-8 text-purple-400 mx-auto" />
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">Cognitive Architecture</h4>
                                    <p className="text-sm text-neutral-400">
                                        Information hierarchy that mirrors executive decision-making
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.1 }}
                                    className="text-center"
                                >
                                    <div className="mb-4">
                                        <Scale className="w-8 h-8 text-emerald-400 mx-auto" />
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">Authority Mechanics</h4>
                                    <p className="text-sm text-neutral-400">
                                        Trust signals that compound rather than contradict
                                    </p>
                                </motion.div>
                            </div>

                            {/* Results */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="bg-gradient-to-br from-emerald-900/20 to-green-900/20 rounded-xl p-8 mb-10"
                            >
                                <h3 className="text-xl font-bold text-center mb-6 text-emerald-100">
                                    Expected Outcomes
                                </h3>

                                <div className="grid md:grid-cols-4 gap-6">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-emerald-400">
                                            <CountUp end={312} suffix="%" duration={2} />
                                        </p>
                                        <p className="text-sm text-neutral-400 mt-1">Authority Increase</p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-emerald-400">
                                            <CountUp end={67} suffix="%" duration={2} />
                                        </p>
                                        <p className="text-sm text-neutral-400 mt-1">Cycle Reduction</p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-emerald-400">
                                            <CountUp end={78} suffix="%" duration={2} />
                                        </p>
                                        <p className="text-sm text-neutral-400 mt-1">Win Rate vs Leaders</p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-emerald-400">
                                            <CountUp end={4.3} suffix="x" decimals={1} duration={2} />
                                        </p>
                                        <p className="text-sm text-neutral-400 mt-1">Value Multiple</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1.3, type: "spring" }}
                                className="text-center"
                            >
                                <motion.a
                                    href="/index"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-2xl group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Access The Index™ Framework</span>
                                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </motion.a>

                                <p className="text-sm text-neutral-500 mt-4">
                                    Limited access. Qualification required.
                                </p>
                            </motion.div>
                        </GlassPanel>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        className="text-center"
                    >
                        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-neutral-500">
                            <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-amber-400" />
                                <span>312% Average Authority Gain</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Gauge className="w-4 h-4 text-blue-400" />
                                <span>45-Day Implementation</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-emerald-400" />
                                <span>27x Average ROI</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        )
    }

    return (
        <section
            ref={scrollRef}
            className="relative min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white overflow-hidden"
        >
            {/* Sophisticated background */}
            <motion.div
                className="fixed inset-0 opacity-20"
                style={{ y: backgroundY }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5" />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
                        backgroundSize: '100px 100px'
                    }}
                />

                {/* Floating orbs */}
                <motion.div
                    className="absolute top-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>            {/* Section Title - Changed from header to div with top margin */}
            <div className="relative z-40 pt-24 backdrop-blur-xl bg-black/20 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Shield className="w-5 h-5 text-white" />
                            </motion.div>
                            <div>
                                <h1 className="font-bold">Perception Gap Diagnostic™</h1>
                                <p className="text-xs text-neutral-400">Enterprise Authority Analysis</p>
                            </div>
                        </div>

                        {currentPhase !== 'qualification' && (
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-xs text-neutral-400 mb-1">Authority Gap</p>
                                        <p className={`
                      text-2xl font-bold
                      ${authorityGap > 50 ? 'text-red-400' :
                                                authorityGap > 30 ? 'text-amber-400' : 'text-green-400'}
                    `}>
                                            {authorityGap}%
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-xs text-neutral-400 mb-1">At Risk</p>
                                        <p className="text-2xl font-bold text-red-400">
                                            ${(totalEconomicImpact.monthly / 1000000).toFixed(1)}M
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-xs text-neutral-400 mb-1">Recovery</p>
                                        <p className="text-2xl font-bold text-emerald-400">
                                            {recoveryTimeline} days
                                        </p>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={() => setCurrentPhase('prescription')}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Prescription →
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <main>
                <AnimatePresence mode="wait">
                    {currentPhase === 'qualification' && (
                        <motion.div key="qualification" exit={{ opacity: 0 }}>
                            {renderQualification()}
                        </motion.div>
                    )}

                    {currentPhase === 'diagnosis' && (
                        <motion.div key="diagnosis" exit={{ opacity: 0 }}>
                            {renderDiagnosis()}
                        </motion.div>
                    )}

                    {currentPhase === 'prescription' && (
                        <motion.div key="prescription" exit={{ opacity: 0 }}>
                            {renderPrescription()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Toast container */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                        boxShadow: 'none'
                    }
                }}
            />
        </section>
    )
}