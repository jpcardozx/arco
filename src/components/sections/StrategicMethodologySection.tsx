'use client'

import { motion } from 'framer-motion'
import {
    TrendingUp,
    AlertTriangle,
    Clock,
    Target,
    DollarSign,
    Zap,
    Eye,
    ArrowRight
} from 'lucide-react'

interface ProblemItem {
    title: string
    description: string
    impact: string
    icon: React.ComponentType<{ className?: string }>
}

interface SolutionItem {
    title: string
    description: string
    benefit: string
    timeline: string
    icon: React.ComponentType<{ className?: string }>
}

export function StrategicMethodologySection() {
    const problems: ProblemItem[] = [
        {
            title: "Revenue Hemorrhaging",
            description: "Failed digital initiatives bleeding budget with no accountability",
            impact: "$2.4M average annual waste",
            icon: AlertTriangle
        },
        {
            title: "Technical Debt Crisis",
            description: "Legacy systems creating operational bottlenecks and team inefficiency",
            impact: "40% slower time-to-market",
            icon: Clock
        },
        {
            title: "ROI Blindness",
            description: "No clear visibility into digital investment performance",
            impact: "67% of projects fail to meet goals",
            icon: Eye
        }
    ]

    const solutions: SolutionItem[] = [
        {
            title: "Self-Funding Optimization",
            description: "Revenue-generating improvements that pay for themselves through performance gains",
            benefit: "Average 300% ROI",
            timeline: "Within 90 days",
            icon: TrendingUp
        },
        {
            title: "Emergency Revenue Rescue",
            description: "Rapid identification and fixing of critical revenue leaks in your digital infrastructure",
            benefit: "Stop money bleeding",
            timeline: "Within 30 days",
            icon: Zap
        },
        {
            title: "Executive Dashboard Intelligence",
            description: "Real-time visibility into digital performance with actionable business insights",
            benefit: "Complete ROI clarity",
            timeline: "Instant visibility",
            icon: Target
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    return (
        <section className="section bg-neutral-50">
            <div className="container-custom">
                <motion.div
                    className="text-center mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants}>
                        <h2 className="heading-lg text-neutral-900 mb-6">
                            Strategic <span className="text-gradient">Methodology</span>
                        </h2>
                        <h3 className="text-3xl font-bold text-neutral-800 mb-4">
                            Stop Wasting Money on Digital
                        </h3>
                        <h4 className="text-2xl font-semibold text-primary-600 mb-6">
                            Start Making Money From It
                        </h4>
                        <p className="text-xl text-neutral-600 max-w-4xl mx-auto">
                            Our proven approach transforms digital cost centers into profit centers,
                            delivering measurable results that directly impact your bottom line.
                        </p>
                    </motion.div>
                </motion.div>

                {/* What's Costing You Money */}
                <motion.div
                    className="mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div className="text-center mb-12" variants={itemVariants}>
                        <h3 className="heading-md text-neutral-900 mb-4">
                            What's Costing You Money
                        </h3>
                        <p className="text-lg text-neutral-600">
                            Common enterprise challenges we eliminate
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {problems.map((problem, index) => (
                            <motion.div
                                key={index}
                                className="card-feature bg-white border border-red-100 hover:border-red-200"
                                variants={itemVariants}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                                        <problem.icon className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-neutral-900">
                                        {problem.title}
                                    </h4>
                                </div>
                                <p className="text-neutral-600 mb-4 leading-relaxed">
                                    {problem.description}
                                </p>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-red-500" />
                                    <span className="font-semibold text-red-600">
                                        {problem.impact}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* How We Make You Money */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div className="text-center mb-12" variants={itemVariants}>
                        <h3 className="heading-md text-neutral-900 mb-4">
                            How We Make You Money
                        </h3>
                        <p className="text-lg text-neutral-600">
                            Proven solutions with guaranteed ROI
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {solutions.map((solution, index) => (
                            <motion.div
                                key={index}
                                className="card-feature bg-gradient-to-br from-white to-accent-50 border border-accent-100 hover:border-accent-200"
                                variants={itemVariants}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center">
                                        <solution.icon className="w-6 h-6 text-accent-600" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-neutral-900">
                                        {solution.title}
                                    </h4>
                                </div>
                                <p className="text-neutral-600 mb-6 leading-relaxed">
                                    {solution.description}
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-accent-600 text-lg">
                                            {solution.benefit}
                                        </span>
                                    </div>
                                    <div className="text-sm text-neutral-500">
                                        {solution.timeline}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-16"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                        Ready to Stop the Bleeding?
                    </h3>
                    <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
                        Get a free 15-minute digital audit to identify your biggest revenue leaks
                    </p>
                    <button className="btn btn-primary btn-lg">
                        Start Revenue Recovery
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </div>
        </section>
    )
}
