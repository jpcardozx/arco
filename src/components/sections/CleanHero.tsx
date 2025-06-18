'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

/**
 * CleanHero - Simple, professional hero section
 * Focus on clear communication and value
 */
export function CleanHero() {
    const metrics = [
        {
            value: '2.1s',
            label: 'Faster load times'
        },
        {
            value: '68%',
            label: 'Lower hosting costs'
        },
        {
            value: '45%',
            label: 'Faster development'
        }
    ]

    const benefits = [
        'Performance optimization',
        'Cost reduction strategies',
        'Modern React architecture',
        'Developer experience improvement'
    ]

    return (
        <section className="pt-24 pb-16 bg-white">
            <div className="max-w-6xl mx-auto px-6">

                {/* Main Content */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            React apps that perform
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            We help companies build faster, more efficient React applications
                            that reduce costs and improve user experience.
                        </p>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
                    >
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            Start a project
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            View our work
                        </button>
                    </motion.div>
                </div>

                {/* Simple Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                >
                    {metrics.map((metric, index) => (
                        <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                                {metric.value}
                            </div>
                            <div className="text-gray-600 text-sm">
                                {metric.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}