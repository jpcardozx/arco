'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import confetti from 'canvas-confetti'
import toast, { Toaster } from 'react-hot-toast'
import { useInView } from 'react-intersection-observer'
import { useReward } from 'react-rewards'
import CountUp from 'react-countup'
// Removed react-spring import - using framer-motion instead
import Lottie from 'lottie-react'
import { useWindowSize, useInterval } from 'react-use'
import {
    Shield,
    Eye,
    Brain,
    TrendingDown,
    AlertTriangle,
    ChevronRight,
    Sparkles,
    Target,
    MousePointer,
    ArrowRight,
    Check,
    X
} from 'lucide-react'

// Type declarations
declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void
    }
}

// Type definitions
interface SymbolicMisalignment {
    id: string
    element: string
    intendedMessage: string
    actualPerception: string
    businessImpact: {
        metric: string
        value: number
        trend: 'loss' | 'gain'
    }
    visualCue: {
        icon: React.ComponentType<any>
        color: string
        animation: string
    }
    discovered: boolean
}

interface UserInsight {
    phase: 'awareness' | 'discovery' | 'realization' | 'conversion'
    engagementScore: number
    misalignmentsFound: number
    timeInvested: number
    conversionProbability: number
    painPoints: string[]
}

// Utility Components
const GlassCard = ({ children, className = '', ...props }: unknown) => (
    <motion.div
        className={`backdrop-blur-xl bg-white/10 border border-white/20 ${className}`}
        style={{
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            WebkitBackdropFilter: 'blur(20px)',
            backdropFilter: 'blur(20px)',
        }}
        {...props}
    >
        {children}
    </motion.div>
)

const AnimatedCounter = ({ value, prefix = '', suffix = '', className = '' }: unknown) => (
    <span className={className}>
        {prefix}
        <CountUp
            end={value}
            duration={2.5}
            separator=","
            decimals={value % 1 !== 0 ? 1 : 0}
        />
        {suffix}
    </span>
)

const Sparkle = ({ count = 12 }: { count?: number }) => {
    // Use useMemo to generate consistent values between server and client
    const sparklePositions = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            x: Math.floor(Math.random() * 100),
            y: Math.floor(Math.random() * 100),
            duration: 2 + Math.floor(Math.random() * 3),
            delay: Math.floor(Math.random() * 5)
        }));
    }, [count]);

    return (
        <div className="absolute inset-0 pointer-events-none opacity-30">
            {sparklePositions.map((spark, i) => (
                <motion.div
                    key={i}
                    className="absolute w-px h-px bg-white rounded-full"
                    style={{
                        transform: `translateX(${spark.x}%) translateY(${spark.y}%) scale(0)`,
                        opacity: 0
                    }}
                    animate={{
                        scale: [0, 0.8, 0],
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{
                        duration: spark.duration,
                        repeat: Infinity,
                        delay: spark.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}

const PulsingDot = ({ color = 'blue', size = 'md' }: { color?: string; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
        sm: 'w-1 h-1',
        md: 'w-1.5 h-1.5',
        lg: 'w-2 h-2'
    }

    return (
        <div className="relative inline-flex">
            <motion.div
                className={`${sizeClasses[size]} rounded-full`}
                style={{
                    backgroundColor: color === 'blue' ? '#3b82f6' :
                        color === 'green' ? '#10b981' :
                            color === 'red' ? '#ef4444' : '#3b82f6'
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.4, 0.7]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    )
}

// Custom hook for mouse position
const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return mousePosition
}

export function HeroARCO() {
    // Core state
    const [currentPhase, setCurrentPhase] = useState<'intro' | 'diagnosis' | 'revelation' | 'solution'>('intro')
    const [userInsight, setUserInsight] = useState<UserInsight>({
        phase: 'awareness',
        engagementScore: 0,
        misalignmentsFound: 0,
        timeInvested: 0,
        conversionProbability: 0,
        painPoints: []
    })

    const [activeElement, setActiveElement] = useState<string | null>(null)
    const [discoveredMisalignments, setDiscoveredMisalignments] = useState<string[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    // Refs and hooks
    const containerRef = useRef<HTMLDivElement>(null)
    const startTime = useRef(Date.now())
    const { ref: heroRef, inView } = useInView({ threshold: 0.3 })
    const mousePosition = useMousePosition()
    const { width: windowWidth } = useWindowSize()
    const { scrollYProgress } = useScroll()

    // Animation rewards
    const { reward: confettiReward } = useReward('confetti-trigger', 'confetti', {
        spread: 90,
        elementCount: 50,
        lifetime: 300,
    })

    const { reward: sparklesReward } = useReward('sparkles-trigger', 'emoji', {
        emoji: ['✨', '💎', '🎯', '🔥'],
        spread: 100,
        elementCount: 30,
    })

    // Motion values for 3D effects
    const rotateX = useTransform(
        useMotionValue(mousePosition.y),
        [0, windowWidth || 1000],
        [20, -20]
    )
    const rotateY = useTransform(
        useMotionValue(mousePosition.x),
        [0, windowWidth || 1000],
        [-20, 20]
    )

    // Enhanced misalignments data with more sophisticated descriptions
    const symbolicMisalignments: SymbolicMisalignment[] = [
        {
            id: 'typography',
            element: 'Typography Hierarchy',
            intendedMessage: 'Market Leadership & Authority',
            actualPerception: 'Inconsistent Brand Voice',
            businessImpact: {
                metric: 'Brand Recognition',
                value: 43,
                trend: 'loss'
            },
            visualCue: {
                icon: Eye,
                color: 'red',
                animation: 'pulse'
            },
            discovered: false
        },
        {
            id: 'color-psychology',
            element: 'Visual Identity System',
            intendedMessage: 'Premium Market Positioning',
            actualPerception: 'Undifferentiated Visual Language',
            businessImpact: {
                metric: 'Conversion Efficiency',
                value: 67,
                trend: 'loss'
            },
            visualCue: {
                icon: AlertTriangle,
                color: 'amber',
                animation: 'bounce'
            },
            discovered: false
        },
        {
            id: 'messaging',
            element: 'Value Articulation',
            intendedMessage: 'Category Innovation Leadership',
            actualPerception: 'Feature-Focused Positioning',
            businessImpact: {
                metric: 'Client Acquisition Cost',
                value: 2.3,
                trend: 'loss'
            },
            visualCue: {
                icon: TrendingDown,
                color: 'rose',
                animation: 'shake'
            },
            discovered: false
        },
        {
            id: 'social-proof',
            element: 'Credibility Framework',
            intendedMessage: 'Established Industry Authority',
            actualPerception: 'Insufficient Trust Architecture',
            businessImpact: {
                metric: 'Customer Retention',
                value: 31,
                trend: 'loss'
            },
            visualCue: {
                icon: Shield,
                color: 'purple',
                animation: 'rotate'
            },
            discovered: false
        }
    ]

    // Track user engagement
    const trackEngagement = useCallback((action: string, data?: unknown) => {
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000)

        setUserInsight(prev => ({
            ...prev,
            timeInvested: timeSpent,
            engagementScore: Math.min(100, prev.engagementScore + 10),
            conversionProbability: Math.min(100, prev.conversionProbability +
                (action.includes('discover') ? 15 : 5))
        }))

        // Analytics
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', action, {
                event_category: 'hero_engagement',
                event_label: currentPhase,
                value: data,
                engagement_time: timeSpent
            })
        }

        // Show toast feedback
        if (action.includes('discover')) {
            toast.success('Insight unlocked!', {
                icon: '💡',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        }
    }, [currentPhase])    // Discover misalignment with subtle feedback
    const discoverMisalignment = useCallback((id: string) => {
        if (discoveredMisalignments.includes(id)) return

        setDiscoveredMisalignments(prev => [...prev, id])
        setUserInsight(prev => ({
            ...prev,
            misalignmentsFound: prev.misalignmentsFound + 1,
            painPoints: [...prev.painPoints, id]
        }))

        // Subtle toast notification instead of confetti
        toast.success('Element analyzed', {
            duration: 2000,
            style: {
                background: 'rgba(31, 41, 55, 0.95)',
                color: '#fff',
                fontSize: '14px',
                border: '1px solid rgba(59, 130, 246, 0.2)'
            }
        })

        trackEngagement('element_analyzed', id)

        // Auto-progress to next phase with less theatrics
        if (discoveredMisalignments.length >= 2) {
            setTimeout(() => setCurrentPhase('revelation'), 2000)
        }
    }, [discoveredMisalignments, trackEngagement])

    // Time tracking
    useInterval(() => {
        setUserInsight(prev => ({
            ...prev,
            timeInvested: Math.floor((Date.now() - startTime.current) / 1000)
        }))
    }, 1000)

    // Motion values for smooth phase transitions
    const fadeIn = {
        opacity: currentPhase === 'intro' ? 1 : 0,
        y: currentPhase === 'intro' ? 0 : 20
    }

    const diagnosisAnimation = {
        opacity: currentPhase === 'diagnosis' ? 1 : 0,
        scale: currentPhase === 'diagnosis' ? 1 : 0.9
    }

    // Progressive content based on engagement - improved copywriting
    const getDynamicContent = () => {
        const { misalignmentsFound, timeInvested } = userInsight

        if (misalignmentsFound === 0 && currentPhase === 'diagnosis') {
            return {
                headline: "Brand Perception Analysis",
                subheadline: "Identify gaps between intention and market perception",
                cta: "Begin Assessment",
                hint: "Interactive analysis of key brand elements"
            }
        } else if (misalignmentsFound > 0 && misalignmentsFound < 3) {
            return {
                headline: "Insights Emerging",
                subheadline: `${3 - misalignmentsFound} key elements remain to be analyzed`,
                cta: "Continue Assessment",
                hint: "Each element analysis builds a more complete picture"
            }
        } else if (misalignmentsFound >= 3) {
            return {
                headline: "Comprehensive Analysis Complete",
                subheadline: "Strategic opportunities identified for brand alignment",
                cta: "View Strategic Recommendations",
                hint: `Analysis completed in ${timeInvested}s`
            }
        }

        return {
            headline: "Brand Perception Analysis",
            subheadline: "Identify strategic opportunities for market positioning",
            cta: "Begin Assessment",
            hint: "Interactive brand alignment diagnostic"
        }
    }

    const content = getDynamicContent()

    return (<section
        ref={containerRef}
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-black pt-24"
    >
        {/* Animated background layers */}
        <div className="absolute inset-0">
            {/* Dynamic gradient mesh - refined */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)',
                        'radial-gradient(circle at 70% 30%, rgba(109, 40, 217, 0.05) 0%, transparent 60%)'
                    ]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Subtle depth elements */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
                style={{
                    transform: `translate(${scrollYProgress.get() * 20}px, ${-scrollYProgress.get() * 20}px)`
                }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                style={{
                    transform: `translate(${-scrollYProgress.get() * 20}px, ${scrollYProgress.get() * 20}px)`
                }}
            />
        </div>

        {/* Reduced particle count */}
        <Sparkle count={12} />

        {/* Progress indicator */}
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
            style={{
                scaleX: scrollYProgress,
                transformOrigin: '0%'
            }}
        />

        {/* Phase: Intro */}
        <AnimatePresence mode="wait">
            {currentPhase === 'intro' && (
                <motion.div
                    initial={fadeIn}
                    animate={fadeIn}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-10 min-h-screen flex items-center justify-center px-6"
                >
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Logo animation - refined */}
                            <motion.div
                                className="mb-12 inline-block"
                                animate={{
                                    scale: [1, 1.03, 1]
                                }}
                                transition={{
                                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                }}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-50" />
                                    <h1 className="relative text-7xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                        ARCO
                                    </h1>
                                </div>
                            </motion.div>

                            <motion.p
                                className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {content.headline}
                            </motion.p>

                            <motion.p
                                className="text-xl text-gray-500 mb-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {content.subheadline}
                            </motion.p>

                            <motion.button
                                onClick={() => {
                                    setCurrentPhase('diagnosis')
                                    trackEngagement('started_diagnosis')
                                    confetti({
                                        particleCount: 100,
                                        spread: 70,
                                        origin: { y: 0.6 }
                                    })
                                }}
                                className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <GlassCard className="absolute inset-0 group-hover:bg-white/20 transition-all duration-300" />
                                <span className="relative text-white group-hover:text-blue-400 transition-colors">
                                    {content.cta}
                                </span>
                                <ChevronRight className="relative w-5 h-5 text-white group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                            </motion.button>

                            <motion.p
                                className="text-sm text-gray-600 mt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                {content.hint}
                            </motion.p>
                        </motion.div>
                    </div>
                </motion.div>
            )}

            {/* Phase: Interactive Diagnosis */}
            {currentPhase === 'diagnosis' && (
                <motion.div
                    initial={diagnosisAnimation}
                    animate={diagnosisAnimation}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-10 min-h-screen px-6"
                >
                    {/* Header with live metrics - refined */}
                    <div className="fixed top-0 left-0 right-0 z-40 p-4">
                        <GlassCard className="max-w-5xl mx-auto rounded-md p-3 border border-gray-800/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Brain className="w-4 h-4 text-blue-400 opacity-80" />
                                        <span className="text-xs text-gray-300">Brand Analysis</span>
                                    </div>
                                    <div className="h-3 w-px bg-gray-800" />
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                        <span className="text-xs text-gray-300">
                                            <AnimatedCounter value={userInsight.misalignmentsFound} /> of 4 Elements Analyzed
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">Engagement</p>
                                        <p className="text-sm font-medium text-blue-400">
                                            <AnimatedCounter value={userInsight.engagementScore} suffix="%" />
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">Time</p>
                                        <p className="text-sm font-medium text-gray-300">
                                            <AnimatedCounter value={userInsight.timeInvested} suffix="s" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Main interaction area */}
                    <div className="pt-32 pb-20">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                ref={heroRef}
                                initial={{ opacity: 0, y: 10 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
                                    Brand Perception Analysis
                                </h2>
                                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                                    Evaluate alignment between intended messaging and market perception.
                                    <span className="text-blue-400"> Select each element</span> for detailed analysis.
                                </p>
                            </motion.div>

                            {/* Interactive symbolic elements grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {symbolicMisalignments.map((misalignment, index) => {
                                    const isDiscovered = discoveredMisalignments.includes(misalignment.id)
                                    const Icon = misalignment.visualCue.icon

                                    return (
                                        <motion.div
                                            key={misalignment.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 + 0.2 }}
                                            className="relative"
                                        >
                                            <motion.div
                                                whileHover={{ y: -2 }}
                                                onClick={() => discoverMisalignment(misalignment.id)}
                                                onMouseEnter={() => setActiveElement(misalignment.id)}
                                                onMouseLeave={() => setActiveElement(null)}
                                                className={`
                                                        cursor-pointer transition-all duration-300 group
                                                        ${isDiscovered ? 'opacity-100' : 'opacity-95 hover:opacity-100'}
                                                    `}
                                            >
                                                <GlassCard className={`
                                                        p-6 rounded-lg border transition-all duration-300
                                                        ${isDiscovered
                                                        ? 'border-red-500/20 bg-red-500/5'
                                                        : 'border-gray-700/40 hover:border-blue-500/20'
                                                    }
                                                    `}>
                                                    {/* Subtle highlight for undiscovered items */}
                                                    {!isDiscovered && (
                                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/3 to-purple-500/3" />
                                                    )}

                                                    <div className="relative z-10">
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div>
                                                                <h3 className="text-lg font-medium text-white mb-1">
                                                                    {misalignment.element}
                                                                </h3>
                                                                <div className="flex items-center gap-2">
                                                                    <Icon className={`w-4 h-4 ${isDiscovered ? 'text-red-400' : 'text-blue-400'}`} />
                                                                    <span className="text-xs text-gray-400">
                                                                        {isDiscovered ? 'Analysis Complete' : 'Available for Analysis'}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {isDiscovered && (
                                                                <div className="p-1 bg-red-500/20 rounded-md">
                                                                    <X className="w-4 h-4 text-red-400" />
                                                                </div>
                                                            )}
                                                        </div>

                                                        <AnimatePresence mode="wait">
                                                            {!isDiscovered ? (
                                                                <motion.div
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    exit={{ opacity: 0 }}
                                                                    className="space-y-4"
                                                                >
                                                                    <div className="p-3 bg-gray-800/30 rounded-md">
                                                                        <p className="text-xs text-gray-400 mb-1">Current Positioning:</p>
                                                                        <p className="text-sm text-white">
                                                                            {misalignment.intendedMessage}
                                                                        </p>
                                                                    </div>

                                                                    <div className="text-center py-2">
                                                                        <p className="text-xs text-gray-500">Select to analyze perception alignment</p>
                                                                    </div>
                                                                </motion.div>
                                                            ) : (
                                                                <motion.div
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    className="space-y-4 mt-2"
                                                                >
                                                                    <div className="grid grid-cols-2 gap-3">
                                                                        <div className="p-3 bg-blue-900/10 border border-blue-700/20 rounded-md">
                                                                            <p className="text-xs text-blue-400 mb-1">Intended:</p>
                                                                            <p className="text-sm text-white">
                                                                                {misalignment.intendedMessage}
                                                                            </p>
                                                                        </div>
                                                                        <div className="p-3 bg-red-900/10 border border-red-700/20 rounded-md">
                                                                            <p className="text-xs text-red-400 mb-1">Perceived:</p>
                                                                            <p className="text-sm text-white">
                                                                                {misalignment.actualPerception}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="p-3 bg-gradient-to-r from-neutral-900 to-neutral-800 border border-neutral-700/30 rounded-md">
                                                                        <div className="flex items-center justify-between">
                                                                            <div>
                                                                                <p className="text-xs text-gray-400 mb-1">Business Impact:</p>
                                                                                <p className="text-sm text-white">
                                                                                    {misalignment.businessImpact.metric}: <span className="text-red-400">{misalignment.businessImpact.value}% {misalignment.businessImpact.trend}</span>
                                                                                </p>
                                                                            </div>
                                                                            <TrendingDown className="w-5 h-5 text-red-400 opacity-80" />
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </GlassCard>
                                            </motion.div>
                                        </motion.div>
                                    )
                                })}
                            </div>

                            {/* Progress indicator - refined */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-12"
                            >
                                <div className="max-w-2xl mx-auto">
                                    <div className="mb-3 flex justify-between items-center">
                                        <h4 className="text-xs font-medium text-gray-400">
                                            Analysis Progress
                                        </h4>
                                        <span className="text-xs text-gray-500">
                                            {userInsight.misalignmentsFound}/4 elements analyzed
                                        </span>
                                    </div>

                                    <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-blue-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(userInsight.misalignmentsFound / 4) * 100}%` }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    </div>

                                    {userInsight.misalignmentsFound >= 2 && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-center text-xs text-blue-400 mt-3"
                                        >
                                            Sufficient data collected. Preparing analysis...
                                        </motion.p>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Phase: Revelation - refined */}
            {currentPhase === 'revelation' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12"
                >
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="mb-6 flex justify-center"
                        >
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                                <Check className="w-4 h-4 text-blue-400 mr-2" />
                                <span className="text-sm text-gray-300">Analysis Complete</span>
                            </div>
                        </motion.div>

                        <motion.h2
                            className="text-3xl md:text-4xl font-medium text-white text-center mb-6"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Brand Perception Analysis Report
                        </motion.h2>

                        <motion.p
                            className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Analysis completed in <span className="text-blue-400">{userInsight.timeInvested} seconds</span>,
                            identifying <span className="text-blue-400">{userInsight.misalignmentsFound} key areas</span> for
                            brand alignment optimization.
                        </motion.p>

                        {/* Impact visualization - refined */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                            {[
                                {
                                    icon: Eye,
                                    metric: '68%',
                                    label: 'Message Clarity',
                                    color: 'blue',
                                    delay: 0.4
                                },
                                {
                                    icon: TrendingDown,
                                    metric: '22%',
                                    label: 'Conversion Efficiency',
                                    color: 'indigo',
                                    delay: 0.5
                                },
                                {
                                    icon: Shield,
                                    metric: '53%',
                                    label: 'Brand Authority',
                                    color: 'purple',
                                    delay: 0.6
                                },
                                {
                                    icon: Target,
                                    metric: '30-45 days',
                                    label: 'Implementation Timeline',
                                    color: 'emerald',
                                    delay: 0.7
                                }
                            ].map((stat, index) => {
                                const Icon = stat.icon
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: stat.delay }}
                                    >
                                        <div className="p-5 rounded-md bg-gray-800/30 border border-gray-700/50 hover:border-gray-600/50 transition-colors">
                                            <div className="flex items-center mb-3">
                                                <Icon className="w-4 h-4 text-blue-400 opacity-70 mr-2" />
                                                <div className="text-sm text-gray-400">
                                                    {stat.label}
                                                </div>
                                            </div>
                                            <div className="text-2xl font-medium text-white">
                                                {stat.metric}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Personalized recommendation - refined */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="mb-10"
                        >
                            <div className="p-6 rounded-md border border-blue-500/20 bg-gradient-to-b from-blue-900/10 to-gray-900">
                                <h3 className="text-xl font-medium text-white mb-4">
                                    Strategic Recommendations
                                </h3>
                                <p className="text-gray-300 mb-6">
                                    Based on the {userInsight.misalignmentsFound} analyzed brand elements,
                                    our assessment indicates opportunities to improve perception alignment
                                    in key areas affecting conversion rates and market positioning.
                                </p>

                                <div className="flex flex-wrap gap-2 justify-start mb-6">
                                    {userInsight.painPoints.map((point, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-xs text-blue-400"
                                        >
                                            {symbolicMisalignments.find(m => m.id === point)?.element}
                                        </span>
                                    ))}
                                </div>

                                <motion.button
                                    onClick={() => {
                                        trackEngagement('conversion_clicked', {
                                            misalignments: userInsight.misalignmentsFound,
                                            time_spent: userInsight.timeInvested,
                                            engagement_score: userInsight.engagementScore
                                        })
                                        window.location.href = '/strategy'
                                    }}
                                    className="group relative inline-flex items-center gap-2 px-6 py-2 text-sm font-medium bg-blue-500/80 hover:bg-blue-500 text-white rounded-md transition-colors"
                                >
                                    <span>View Complete Analysis</span>
                                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                                </motion.button>

                                <p className="text-xs text-gray-500 mt-4">
                                    Includes detailed recommendations, implementation guidelines, and market positioning strategy
                                </p>
                            </div>
                        </motion.div>

                        {/* Trust indicators - refined */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0 }}
                            className="flex items-center justify-center gap-6 text-xs text-gray-500"
                        >
                            <div className="flex items-center gap-1">
                                <Check className="w-3 h-3 text-blue-400" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Check className="w-3 h-3 text-blue-400" />
                                <span>Implementation roadmap included</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Check className="w-3 h-3 text-blue-400" />
                                <span>Customized to your brand</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Floating achievement notifications - refined */}
        <AnimatePresence>
            {userInsight.misalignmentsFound > 0 && (
                <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 30, opacity: 0 }}
                    className="fixed bottom-6 right-6 z-40"
                >
                    <div className="p-3 rounded-md bg-gray-900/90 border border-gray-700/50 shadow-lg backdrop-blur-sm max-w-xs">
                        <div className="flex items-start gap-3">
                            <div className="p-1 rounded-md bg-blue-500/20">
                                <Check className="w-3 h-3 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-200 mb-0.5">
                                    Analysis in progress
                                </h4>
                                <p className="text-xs text-gray-400">
                                    {userInsight.misalignmentsFound} elements analyzed.
                                    {userInsight.misalignmentsFound < 4 ? ' Continue to complete the assessment.' : ' Assessment complete.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Subtle trigger points instead of confetti */}
        <span id="confetti-trigger" className="hidden" />
        <span id="sparkles-trigger" className="hidden" />

        {/* Toast notifications */}
        <Toaster
            position="top-center"
            toastOptions={{
                style: {
                    background: '#1f2937',
                    color: '#fff',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                },
            }}
        />

        {/* Analytics */}
        <Analytics />
    </section>
    )
}