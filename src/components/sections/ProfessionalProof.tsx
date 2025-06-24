'use client'

import { motion } from 'framer-motion'
import { Quote, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'import { createHref } from '@/utils/navigation';
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeader } from '@/components/layout/SectionHeader'

export function ProfessionalProof() {
    const caseStudies = [
        {
            company: 'B2B SaaS Platform',
            industry: 'Software',
            challenge: 'Dashboard performance issues affecting 15,000+ daily active users',
            approach: 'Code splitting, lazy loading, and query optimization',
            results: [
                { metric: 'Load time', before: '3.2s', after: '1.1s', improvement: '66%' },
                { metric: 'User retention', improvement: '+23%' },
                { metric: 'Support tickets', improvement: '-41%' }
            ],
            testimonial: {
                quote: "The performance improvements directly translated to better user engagement and measurably reduced churn.",
                author: "Sarah Kim",
                role: "VP of Product"
            }
        },
        {
            company: 'E-commerce Platform',
            industry: 'Retail',
            challenge: 'Mobile bounce rate of 68% due to slow page loads',
            approach: 'Mobile-first optimization and progressive image loading',
            results: [
                { metric: 'Mobile speed', before: '4.1s', after: '1.8s', improvement: '56%' },
                { metric: 'Bounce rate', improvement: '-31%' },
                { metric: 'Mobile conversions', improvement: '+15%' }
            ],
            testimonial: {
                quote: "Our mobile revenue increased by $180k in the first quarter after optimization.",
                author: "Mike Chen",
                role: "Head of E-commerce"
            }
        }
    ]

    const metrics = [
        { value: '47%', label: 'Average performance improvement' },
        { value: '12+', label: 'Enterprise clients served' },
        { value: '2.1s', label: 'Average load time achieved' },
        { value: '98%', label: 'Client satisfaction rate' }
    ]

    return (
        <SectionWrapper background="white" spacing="normal" id="results">
            <SectionHeader
                eyebrow="Proven Results"
                title="Real performance improvements for real businesses"
                description="We measure success through measurable business outcomes, not just technical metrics."
                align="center"
                size="md"
            />

            {/* Key Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            >
                {metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                        <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                            {metric.value}
                        </div>
                        <div className="text-sm text-gray-600 leading-tight">
                            {metric.label}
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Case Studies */}
            <div className="space-y-16">
                {caseStudies.map((study, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className="grid lg:grid-cols-2 gap-12 items-start"
                    >
                        {/* Study Content */}
                        <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-sm font-medium text-blue-600">{study.industry}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-sm text-gray-600">{study.company}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {study.challenge}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    <strong>Approach:</strong> {study.approach}
                                </p>
                            </div>

                            {/* Results */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Key Results:</h4>
                                {study.results.map((result, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm text-gray-700">{result.metric}</span>
                                        <div className="text-right">
                                            {result.before && result.after ? (
                                                <div>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {result.before} → {result.after}
                                                    </span>
                                                    <div className="text-xs text-green-600">
                                                        {result.improvement} improvement
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-sm font-medium text-green-600">
                                                    {result.improvement}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Testimonial */}
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <Quote className="w-6 h-6 text-gray-400 mb-3" />
                                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                                    "{study.testimonial.quote}"
                                </blockquote>
                                <cite className="text-sm font-medium text-gray-900">
                                    {study.testimonial.author}, {study.testimonial.role}
                                </cite>
                            </div>
                        </div>

                        {/* Visual Element */}
                        <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                                <div className="flex items-center space-x-3 mb-6">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                    <span className="text-sm font-medium text-gray-900">Performance Impact</span>
                                </div>

                                <div className="space-y-4">
                                    {study.results.filter(r => r.before && r.after).map((result, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">{result.metric}</span>
                                                <span className="font-medium text-gray-900">{result.improvement}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000"
                                                    style={{ width: `${parseInt(result.improvement)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mt-20 pt-16 border-t border-gray-200"
            >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Ready to see similar results for your application?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Every business is different. Let's discuss your specific performance challenges and create a custom strategy.
                </p>
                <Link
                    href={createHref("/contact")}
                    className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-lg"
                >
                    Get your performance audit
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
            </motion.div>
        </SectionWrapper>
    )
}


