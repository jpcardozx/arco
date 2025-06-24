'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { ROICalculatorPreview } from '../previews/ROICalculatorPreview'
import { DomainIntelligencePreview } from '../previews/DomainIntelligencePreview'
import { AssessmentWorkflowPreview } from '../previews/AssessmentWorkflowPreview'
import {
    SparklesIcon,
    RocketLaunchIcon,
    ArrowRightIcon,
    ChartBarIcon,
    UserGroupIcon,
    BuildingOfficeIcon
} from '@heroicons/react/24/outline'

interface UserBehavior {
    timeOnPage: number
    scrollDepth: number
    interactionCount: number
    technicalIndicators: boolean
    returnVisitor: boolean
}

interface HomepageStrategy {
    type: 'technical_preview_focus' | 'upgrade_value_focus' | 'dashboard_style_access' | 'full_preview_showcase'
    primaryCTA: string
    sections: string[]
    personalizedMessage: string
}

export function IntelligentHomepageOrchestrator() {
    const { user, isAuthenticated } = useAuth()
    const [behavior, setBehavior] = useState<UserBehavior>({
        timeOnPage: 0,
        scrollDepth: 0,
        interactionCount: 0,
        technicalIndicators: false,
        returnVisitor: false
    })
    const [strategy, setStrategy] = useState<HomepageStrategy | null>(null)
    const [currentSection, setCurrentSection] = useState(0)

    // Behavior tracking
    useEffect(() => {
        const startTime = Date.now()
        let maxScroll = 0
        let interactions = 0

        // Check for technical indicators (dev tools, technical referrers, etc.)
        const checkTechnicalIndicators = () => {
            const technicalReferrers = ['github.com', 'stackoverflow.com', 'dev.to', 'hackernews.com']
            const referrer = document.referrer.toLowerCase()
            const hasTechnicalReferrer = technicalReferrers.some(site => referrer.includes(site))

            // Check for dev tools (basic detection)
            const devToolsOpen = window.outerHeight - window.innerHeight > 160

            return hasTechnicalReferrer || devToolsOpen
        }        // Check return visitor
        const checkReturnVisitor = () => {
            const visitCount = localStorage.getItem('arco_visit_count')
            return !!(visitCount && parseInt(visitCount) > 1)
        }

        // Scroll tracking
        const handleScroll = () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent
                setBehavior(prev => ({ ...prev, scrollDepth: maxScroll }))
            }
        }

        // Interaction tracking
        const handleInteraction = () => {
            interactions++
            setBehavior(prev => ({ ...prev, interactionCount: interactions }))
        }

        // Time tracking
        const timeInterval = setInterval(() => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000)
            setBehavior(prev => ({ ...prev, timeOnPage }))
        }, 1000)

        // Initial behavior assessment
        setBehavior({
            timeOnPage: 0,
            scrollDepth: 0,
            interactionCount: 0,
            technicalIndicators: checkTechnicalIndicators(),
            returnVisitor: checkReturnVisitor()
        })

        // Event listeners
        window.addEventListener('scroll', handleScroll, { passive: true })
        document.addEventListener('click', handleInteraction)
        document.addEventListener('keydown', handleInteraction)

        return () => {
            clearInterval(timeInterval)
            window.removeEventListener('scroll', handleScroll)
            document.removeEventListener('click', handleInteraction)
            document.removeEventListener('keydown', handleInteraction)
        }
    }, [])

    // Strategy determination
    useEffect(() => {
        const getHomepageStrategy = (): HomepageStrategy => {
            // Technical lead detection
            if (!isAuthenticated && behavior.technicalIndicators) {
                return {
                    type: 'technical_preview_focus',
                    primaryCTA: 'Experience Technical Intelligence',
                    sections: ['domain-intelligence', 'roi-calculator', 'assessment'],
                    personalizedMessage: 'Technical analysis tools for engineering leaders'
                }
            }

            // Return visitor with free account
            if (isAuthenticated && user?.tier === 'free' && behavior.returnVisitor) {
                return {
                    type: 'upgrade_value_focus',
                    primaryCTA: 'Upgrade to Premium',
                    sections: ['premium-features', 'roi-calculator', 'domain-intelligence'],
                    personalizedMessage: `Welcome back, ${user.name}. Ready to unlock advanced capabilities?`
                }
            }

            // Enterprise user - dashboard style
            if (isAuthenticated && user?.tier === 'enterprise') {
                return {
                    type: 'dashboard_style_access',
                    primaryCTA: 'Access Your Dashboard',
                    sections: ['quick-access', 'recent-analyses', 'assessment'],
                    personalizedMessage: `Welcome back, ${user.name}. Your enterprise tools are ready.`
                }
            }

            // Default exploration mode
            return {
                type: 'full_preview_showcase',
                primaryCTA: 'Start Free Analysis',
                sections: ['roi-calculator', 'domain-intelligence', 'assessment'],
                personalizedMessage: 'Discover technical intelligence tools that drive results'
            }
        }

        setStrategy(getHomepageStrategy())
    }, [isAuthenticated, user, behavior])

    // Auto-advance sections for engagement
    useEffect(() => {
        if (strategy?.type === 'full_preview_showcase' && behavior.timeOnPage > 30) {
            const interval = setInterval(() => {
                setCurrentSection(prev => (prev + 1) % 3)
            }, 10000) // Change section every 10 seconds

            return () => clearInterval(interval)
        }
    }, [strategy, behavior.timeOnPage])

    if (!strategy) return null

    const handlePrimaryCTA = () => {
        switch (strategy.type) {
            case 'technical_preview_focus':
                document.getElementById('domain-intelligence')?.scrollIntoView({ behavior: 'smooth' })
                break
            case 'upgrade_value_focus':
                window.dispatchEvent(new CustomEvent('openAuthModal'))
                break
            case 'dashboard_style_access':
                window.location.href = '/dashboard'
                break
            default:
                document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const getHeroStyle = () => {
        switch (strategy.type) {
            case 'technical_preview_focus':
                return 'from-slate-900 via-blue-950 to-purple-900'
            case 'upgrade_value_focus':
                return 'from-slate-900 via-green-950 to-blue-900'
            case 'dashboard_style_access':
                return 'from-slate-900 via-indigo-950 to-slate-900'
            default:
                return 'from-slate-900 via-purple-950 to-blue-900'
        }
    }

    const getHeroIcon = () => {
        switch (strategy.type) {
            case 'technical_preview_focus':
                return <ChartBarIcon className="w-8 h-8 text-blue-400" />
            case 'upgrade_value_focus':
                return <RocketLaunchIcon className="w-8 h-8 text-green-400" />
            case 'dashboard_style_access':
                return <BuildingOfficeIcon className="w-8 h-8 text-indigo-400" />
            default:
                return <SparklesIcon className="w-8 h-8 text-purple-400" />
        }
    }

    return (
        <div className="min-h-screen">
            {/* Intelligent Hero Section */}
            <section className={`relative min-h-screen bg-gradient-to-br ${getHeroStyle()} flex items-center justify-center overflow-hidden`}>
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Smart Badge */}
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
                            {getHeroIcon()}
                            <span className="text-white font-medium">
                                {strategy.personalizedMessage}
                            </span>
                        </div>

                        {/* Dynamic Title */}
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            {strategy.type === 'technical_preview_focus' && (
                                <>
                                    Technical Intelligence
                                    <span className="block text-blue-400">That Converts</span>
                                </>
                            )}
                            {strategy.type === 'upgrade_value_focus' && (
                                <>
                                    Ready for More?
                                    <span className="block text-green-400">Unlock Premium</span>
                                </>
                            )}
                            {strategy.type === 'dashboard_style_access' && (
                                <>
                                    Welcome Back
                                    <span className="block text-indigo-400">Your Tools Await</span>
                                </>
                            )}
                            {strategy.type === 'full_preview_showcase' && (
                                <>
                                    Intelligence Platform
                                    <span className="block text-purple-400">For Technical Leaders</span>
                                </>
                            )}
                        </h1>

                        {/* Contextual Description */}
                        <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                            {strategy.type === 'technical_preview_focus' &&
                                "Real technical analysis, competitive intelligence, and strategic frameworks. See our capabilities in action."
                            }
                            {strategy.type === 'upgrade_value_focus' &&
                                "You've experienced the basics. Unlock unlimited analysis, competitive intelligence, and enterprise features."
                            }
                            {strategy.type === 'dashboard_style_access' &&
                                "Access your enterprise tools, recent analyses, and team collaboration features."
                            }
                            {strategy.type === 'full_preview_showcase' &&
                                "Discover ROI calculators, domain intelligence, and assessment workflows. Real tools, not demos."
                            }
                        </p>

                        {/* Smart CTA */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <motion.button
                                onClick={handlePrimaryCTA}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-500/25"
                            >
                                {strategy.primaryCTA}
                            </motion.button>

                            {strategy.type !== 'dashboard_style_access' && (
                                <button className="flex items-center gap-2 px-6 py-4 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300">
                                    <SparklesIcon className="w-5 h-5" />
                                    See Live Demo
                                </button>
                            )}
                        </div>

                        {/* Engagement Indicators */}
                        {behavior.timeOnPage > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}
                                className="mt-8 text-sm text-slate-400"
                            >
                                {behavior.technicalIndicators && "Technical visitor detected • Showing advanced capabilities"}
                                {behavior.returnVisitor && !behavior.technicalIndicators && "Welcome back • Personalized experience"}
                                {!behavior.technicalIndicators && !behavior.returnVisitor && "Scroll to explore our intelligence platform"}
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ArrowRightIcon className="w-6 h-6 text-white/60 rotate-90" />
                </motion.div>
            </section>

            {/* Dynamic Tool Previews */}
            <div id="roi-calculator">
                <ROICalculatorPreview />
            </div>

            <div id="domain-intelligence">
                <DomainIntelligencePreview />
            </div>

            <div id="assessment">
                <AssessmentWorkflowPreview />
            </div>

            {/* Intelligence Footer */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-slate-900 py-16"
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready for Intelligence?
                    </h3>
                    <p className="text-xl text-slate-300 mb-8">
                        {isAuthenticated ?
                            'Access your full suite of technical intelligence tools' :
                            'Join technical leaders who choose substance over marketing'
                        }
                    </p>

                    <motion.button
                        onClick={handlePrimaryCTA}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                    >
                        {strategy.primaryCTA}
                    </motion.button>
                </div>
            </motion.section>
        </div>
    )
}
