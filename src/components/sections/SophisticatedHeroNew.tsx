'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Target } from 'lucide-react'
import { PremiumSection, SectionHeader } from '../ui/PremiumSection'

export function SophisticatedHero() {
    const [isHovered, setIsHovered] = useState(false)

    const trustedByLogos = [
        { name: "TechCorp", width: "120px" },
        { name: "GrowthLabs", width: "140px" },
        { name: "ScaleVentures", width: "130px" },
        { name: "InnovateGroup", width: "110px" }
    ]

    return (
        <PremiumSection
            background="enterprise"
            spacing="spacious"
            className="min-h-screen flex items-center"
            maxWidth="wide"
        >            <div className="text-center">                <SectionHeader
            badge={{
                icon: Target,
                text: "Enterprise Architecture • Series A+ Specialists • Zero Downtime Transitions"
            }}
            headline='Your Architecture <span class="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Scales Revenue</span> or Kills It'
            description="The difference between companies that scale from $5M to $50M ARR and those that plateau at $10M isn't product-market fit. It's architectural decisions made 18 months ago that are now costing you $2M+ annually in lost velocity, team productivity, and competitive advantage."
        />                {/* Enhanced Metrics with Specific Business Impact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-12"
                >
                    <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                47 Deployments
                            </div>
                            <div className="text-sm font-semibold text-slate-700 mb-1">
                                Zero-Downtime Migrations
                            </div>
                            <div className="text-xs text-slate-500">
                                While maintaining 99.99% uptime
                            </div>
                        </div>
                        <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                $2.3M Avg
                            </div>
                            <div className="text-sm font-semibold text-slate-700 mb-1">
                                Technical Debt ROI
                            </div>
                            <div className="text-xs text-slate-500">
                                18-month measured impact
                            </div>
                        </div>
                        <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                6x Faster
                            </div>
                            <div className="text-sm font-semibold text-slate-700 mb-1">
                                Developer Velocity
                            </div>
                            <div className="text-xs text-slate-500">
                                Deployment to production
                            </div>
                        </div>
                    </div>
                </motion.div>                {/* Premium CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                        className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center">
                            Get Technical Debt Assessment
                            <ArrowRight className={`ml-2 w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                        </span>
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
                    </motion.button>

                    <button className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200 underline decoration-slate-300 hover:decoration-slate-600 underline-offset-4">
                        Review Transformation Case Studies
                    </button>
                </motion.div>                {/* Enhanced Trust Section with Specific Credentials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="border-t border-slate-200 pt-12"
                >
                    <div className="flex items-center justify-center gap-8 mb-8">
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>Ex-Uber/Stripe/Airbnb Engineers</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>SOC 2 Type II Certified</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>Vetted by Series B+ CTOs</span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-6 font-medium tracking-wide uppercase text-center">
                        Architecture Partners to High-Growth Companies
                    </p>
                    <div className="flex items-center justify-center gap-12 opacity-50">
                        {trustedByLogos.map((logo, index) => (
                            <div
                                key={index}
                                className="h-8 bg-slate-400 rounded opacity-60 hover:opacity-100 transition-opacity duration-300"
                                style={{ width: logo.width }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </PremiumSection>
    )
}
