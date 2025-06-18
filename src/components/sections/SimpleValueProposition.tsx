'use client'

import { motion } from 'framer-motion'
import {
    Clock,
    DollarSign,
    Code,
    Gauge,
    CheckCircle
} from 'lucide-react'

/**
 * SimpleValueProposition - Clean, direct value communication
 * No hype, just clear benefits and solutions
 */
export function SimpleValueProposition() {
    const problems = [
        {
            title: 'Slow websites hurt business',
            description: 'Poor performance leads to higher bounce rates and lost conversions',
            impact: '7% conversion loss per 100ms delay',
            icon: Gauge
        },
        {
            title: 'High hosting costs',
            description: 'Inefficient architecture and over-provisioned resources waste money',
            impact: 'Up to 70% unnecessary spending',
            icon: DollarSign
        },
        {
            title: 'Outdated development',
            description: 'Legacy code and old practices slow down your team',
            impact: '40% longer development cycles',
            icon: Code
        }
    ]

    const solutions = [
        {
            title: 'Performance optimization',
            description: 'Core Web Vitals improvement, code splitting, and smart caching',
            benefits: [
                'Faster load times',
                'Better SEO rankings',
                'Higher conversion rates',
                'Improved user experience'
            ],
            icon: Clock
        },
        {
            title: 'Cost optimization',
            description: 'Modern serverless architecture and efficient resource usage',
            benefits: [
                'Lower hosting bills',
                'Auto-scaling infrastructure',
                'Pay-per-use pricing',
                'Reduced maintenance'
            ],
            icon: DollarSign
        },
        {
            title: 'Modern development',
            description: 'TypeScript, React 18+, and best practices implementation',
            benefits: [
                'Faster development',
                'Fewer bugs',
                'Better maintainability',
                'Team productivity'
            ],
            icon: Code
        }
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">

                {/* Problems Section */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Common problems we solve
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Technical issues that impact your business
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {problems.map((problem, index) => {
                            const Icon = problem.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-red-100 rounded-lg">
                                            <Icon className="w-5 h-5 text-red-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {problem.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-3">
                                        {problem.description}
                                    </p>
                                    <p className="text-sm font-medium text-red-600">
                                        {problem.impact}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Solutions Section */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our solutions
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Proven approaches that deliver results
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {solutions.map((solution, index) => {
                            const Icon = solution.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {solution.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        {solution.description}
                                    </p>
                                    <div className="space-y-2">
                                        {solution.benefits.map((benefit, benefitIndex) => (
                                            <div key={benefitIndex} className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                <span className="text-sm text-gray-700">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
