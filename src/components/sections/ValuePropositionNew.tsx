'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, DollarSign, Target, TrendingUp, Zap, ArrowRight } from 'lucide-react'
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

export function ValueProposition() {
    const content = useContent('en')

    const frameworks = [{
        icon: Target,
        title: "Revenue Audit",
        duration: "5 business days",
        price: "$4,900",
        description: "Complete performance audit revealing exactly where revenue is being lost and how to capture it",
        deliverable: "Executive report with prioritized $$ impact roadmap",
        color: 'from-emerald-500 to-teal-600',
        features: [
            "Technical infrastructure deep-dive",
            "Revenue leak quantification",
            "Growth bottleneck analysis",
            "ROI-ranked implementation plan"
        ]
    }, {
        icon: Zap,
        title: "Proof of Value",
        duration: "30-45 days",
        price: "$24,900",
        description: "We implement the highest-impact fix and prove ROI before any larger engagement",
        deliverable: "Working solution with documented revenue impact",
        color: 'from-blue-500 to-blue-600',
        features: [
            "Single highest-ROI implementation",
            "Real-time performance tracking",
            "Revenue impact measurement",
            "Success-based pricing model"
        ]
    }, {
        icon: TrendingUp,
        title: "Scale Partnership",
        duration: "Ongoing",
        price: "Performance-based",
        description: "Full optimization partnership with shared upside on every revenue gain",
        deliverable: "Continuous growth with aligned incentives",
        color: 'from-purple-500 to-indigo-600',
        features: [
            "Monthly optimization cycles",
            "Performance bonus structure",
            "Dedicated growth team",
            "Quarterly strategy reviews"
        ]
    }]

    const differentiators = [{
        icon: Clock,
        title: "48-Hour Audit Delivery",
        description: "We move fast. Your audit lands in your inbox within 48 hours, not weeks.",
        metric: "8x Faster"
    }, {
        icon: DollarSign,
        title: "ROI-First Approach",
        description: "Every recommendation includes projected revenue impact. No vanity metrics.",
        metric: "340% Avg ROI"
    }, {
        icon: CheckCircle,
        title: "Implementation Guarantee",
        description: "We don't just advise—we implement and guarantee results or refund your investment.",
        metric: "100% Guarantee"
    }]

    return (
        <Section background="slate" id="value-proposition" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* Professional Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/3 to-emerald-600/5" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -translate-x-48 -translate-y-48" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 rounded-full blur-3xl translate-x-48 translate-y-48" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <MotionContainer className="relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full border border-blue-200/30 mb-6"
                    >
                        <Target className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-blue-700">Revenue-First Solutions</span>
                    </motion.div>

                    <Heading2 className="text-slate-900 mb-6">
                        Choose Your Revenue
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"> Growth Path</span>
                    </Heading2>

                    <BodyLarge className="text-slate-600 max-w-3xl mx-auto">
                        Three proven frameworks to transform your business. Start with a low-risk audit,
                        prove value with a single implementation, or scale with ongoing optimization.
                    </BodyLarge>
                </motion.div>

                {/* Frameworks Grid */}
                <Grid cols={3} gap="lg" className="mb-20">
                    {frameworks.map((framework, index) => (
                        <motion.div
                            key={framework.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group"
                        >
                            <Card className="h-full bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:border-blue-300/50 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                {/* Card Header */}
                                <div className="relative p-8 pb-6">
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${framework.color}`} />

                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-3 rounded-xl bg-gradient-to-r ${framework.color} shadow-lg`}>
                                            <framework.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-slate-900">{framework.price}</div>
                                            <div className="text-sm text-slate-500">{framework.duration}</div>
                                        </div>
                                    </div>

                                    <Heading3 className="text-slate-900 mb-3">
                                        {framework.title}
                                    </Heading3>

                                    <BodyRegular className="text-slate-600 mb-4">
                                        {framework.description}
                                    </BodyRegular>

                                    <div className="bg-slate-50 rounded-lg p-4 mb-6">
                                        <div className="text-sm font-medium text-slate-700 mb-1">Deliverable:</div>
                                        <div className="text-sm text-slate-600">{framework.deliverable}</div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="px-8 pb-8">
                                    <div className="space-y-3">
                                        {framework.features.map((feature, featureIndex) => (
                                            <motion.div
                                                key={featureIndex}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: (index * 0.2) + (featureIndex * 0.1) }}
                                                viewport={{ once: true }}
                                                className="flex items-center space-x-3"
                                            >
                                                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                <span className="text-sm text-slate-700">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full mt-6 bg-gradient-to-r ${framework.color} text-white rounded-lg py-3 px-6 font-medium hover:shadow-lg transition-all duration-300 group`}
                                    >
                                        <span className="flex items-center justify-center">
                                            Get Started
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </motion.button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </Grid>

                {/* Differentiators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <Heading3 className="text-slate-900 mb-12">
                        Why Choose ARCO
                    </Heading3>

                    <Grid cols={3} gap="lg">
                        {differentiators.map((diff, index) => (
                            <motion.div
                                key={diff.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <diff.icon className="w-8 h-8 text-white" />
                                </div>
                                <Heading3 className="text-slate-900 mb-3 text-lg">
                                    {diff.title}
                                </Heading3>
                                <div className="text-lg font-bold text-blue-600 mb-2">{diff.metric}</div>
                                <BodyRegular className="text-slate-600">
                                    {diff.description}
                                </BodyRegular>
                            </motion.div>
                        ))}
                    </Grid>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white p-12 border-0">
                        <Heading3 className="text-white mb-4">
                            Ready to Unlock Hidden Revenue?
                        </Heading3>
                        <BodyLarge className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            Start with our comprehensive Revenue Audit. Discover exactly where money is being left on the table and how to capture it.
                        </BodyLarge>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center"
                        >
                            Start Free Revenue Audit
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </motion.button>
                    </Card>
                </motion.div>
            </MotionContainer>
        </Section>
    )
}
