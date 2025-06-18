'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Shield, TrendingUp, Zap, Target, CheckCircle } from 'lucide-react'
import {
    Heading2,
    Heading3,
    BodyLarge,
    BodyRegular,
    MotionContainer
} from '../../design-system/components'
import { PremiumSection, SectionHeader } from '../ui/PremiumSection'

export function MaturedValueProposition() {
    const [activeService, setActiveService] = useState(0)

    const services = [
        {
            title: "Architecture Assessment",
            timeline: "2-3 weeks",
            investment: "Fixed scope",
            description: "Deep technical audit of scaling bottlenecks and architectural debt.",
            outcome: "Detailed roadmap with engineering effort estimates",
            icon: Target,
            features: [
                "Database performance analysis",
                "API scalability review",
                "Infrastructure cost optimization",
                "Security vulnerability assessment"
            ]
        },
        {
            title: "Scaling Transformation",
            timeline: "6-18 months",
            investment: "Milestone-based",
            description: "Systematic re-architecture while maintaining business continuity.",
            outcome: "10x capacity improvements without downtime",
            icon: Shield,
            features: [
                "Incremental migration strategy",
                "Zero-downtime deployments",
                "Performance monitoring",
                "Team knowledge transfer"
            ]
        },
        {
            title: "Ongoing Partnership",
            timeline: "Retainer basis",
            investment: "Monthly commitment", description: "Continuous architecture optimization as you scale beyond Series B.",
            outcome: "Sustained technical excellence through hypergrowth",
            icon: Zap,
            features: [
                "Strategic technical advisory",
                "Architecture governance",
                "Performance optimization",
                "Scaling best practices"
            ]
        }
    ]

    const differentiators = [
        {
            title: "Technical Leadership",
            description: "Former CTOs who've scaled companies through Series A→IPO",
            icon: Clock
        },
        {
            title: "Systematic Approach",
            description: "Proven methodology refined across 47+ transformations",
            icon: Zap
        },
        {
            title: "Long-term Partnership",
            description: "6-18 month engagements, not quick fixes",
            icon: Shield
        }
    ]

    return (<PremiumSection background="neutral" spacing="spacious">
        <SectionHeader
            badge={{
                icon: Shield,
                text: "Enterprise Engineering • 47+ Transformations • $180M+ Generated"
            }}
            headline='Our Systematic Approach Transforms Architecture Into <span class="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Revenue Multipliers</span>'
            description="Beyond fixing technical debt, we engineer scalable systems that become your competitive moat—driving sustainable growth and operational excellence."
        />

        {/* Service Navigation */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
        >                    <div className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Enterprise Engineering • 47+ Transformations • $180M+ Generated
            </div><Heading2 className="mb-6 max-w-4xl mx-auto">
                Our Systematic Approach Transforms Architecture Into
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Revenue Multipliers</span>
            </Heading2>
            <BodyLarge className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Beyond fixing technical debt, we engineer scalable systems that become
                your competitive moat—driving sustainable growth and operational excellence.
            </BodyLarge>
        </motion.div>

        {/* Service Navigation */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-12"
        >
            <div className="flex bg-white p-2 rounded-xl border border-gray-200 shadow-lg">
                {services.map((service, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveService(index)}
                        className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeService === index
                            ? 'text-emerald-700 bg-emerald-50'
                            : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        {activeService === index && (
                            <motion.div
                                layoutId="activeService"
                                className="absolute inset-0 bg-emerald-50 rounded-lg border border-emerald-200"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center space-x-2">
                            {React.createElement(service.icon, { className: "w-4 h-4" })}
                            <span className="hidden sm:inline">{service.title}</span>
                            <span className="sm:hidden">Phase {index + 1}</span>
                        </span>
                    </button>
                ))}
            </div>
        </motion.div>

        {/* Active Service Detail */}
        <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-16"
        >
            <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600">
                                {React.createElement(services[activeService].icon, { className: "w-8 h-8 text-white" })}
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                                    Phase {activeService + 1}
                                </div>
                                <Heading3 className="text-gray-900">
                                    {services[activeService].title}
                                </Heading3>
                            </div>
                        </div>

                        <BodyLarge className="text-gray-700">
                            {services[activeService].description}
                        </BodyLarge>

                        <div className="space-y-3">
                            {services[activeService].features.map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center p-4 bg-slate-50 rounded-lg">
                                <Clock className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                <div className="text-sm font-medium text-slate-600 mb-1">Timeline</div>
                                <div className="text-lg font-bold text-slate-900">
                                    {services[activeService].timeline}
                                </div>
                            </div>
                            <div className="text-center p-4 bg-emerald-50 rounded-lg">
                                <Target className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                                <div className="text-sm font-medium text-emerald-600 mb-1">Investment</div>
                                <div className="text-lg font-bold text-emerald-700">
                                    {services[activeService].investment}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200">
                            <div className="text-sm font-medium text-emerald-700 mb-2">Expected Outcome</div>
                            <div className="text-gray-800 font-medium">
                                {services[activeService].outcome}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full group relative bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative flex items-center justify-center space-x-2">
                                <span>Begin {services[activeService].title}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Enhanced Differentiators */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
        >                    <Heading3 className="text-gray-900 mb-4">Engineering Excellence Meets Growth Strategy</Heading3>
            <BodyRegular className="text-gray-600 mb-12 max-w-2xl mx-auto">
                We don't just fix problems—we engineer systematic advantages that compound into sustainable competitive moats.
            </BodyRegular>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {differentiators.map((diff, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group p-8 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {React.createElement(diff.icon, { className: "w-7 h-7 text-emerald-600" })}
                            </div>
                            <h4 className="font-bold text-xl text-gray-900 mb-3">
                                {diff.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                {diff.description}
                            </p>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                        </div>                            </motion.div>
                ))}
            </div>
        </motion.div>
    </PremiumSection>
    )
}
