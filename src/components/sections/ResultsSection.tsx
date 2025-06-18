'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Clock, DollarSign, Users, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeader } from '@/components/layout/SectionHeader'

export function ResultsSection() {
    const metrics = [
        {
            value: '< 1.4s',
            label: 'Mobile LCP Target',
            description: 'Lab-tested guarantee',
            trend: '+60% conversion',
            color: 'blue'
        },
        {
            value: '+40 pts',
            label: 'PSI Score Increase',
            description: 'Minimum guaranteed',
            trend: '95% success rate',
            color: 'green'
        },
        {
            value: '$400+',
            label: 'Annual Savings',
            description: 'Builder cost reduction',
            trend: 'ROI in 9 months',
            color: 'purple'
        },
        {
            value: '110%',
            label: 'Money-Back Guarantee',
            description: 'Risk-free investment',
            trend: '<5% refund rate',
            color: 'orange'
        }
    ]

    const caseStudies = [
        {
            industry: 'Dental Clinics',
            location: 'Canada',
            problem: 'Slow Wix sites losing leads on mobile',
            solution: 'Complete mobile optimization + Core Web Vitals',
            results: {
                before: '2.8s LCP',
                after: '1.1s LCP',
                improvement: '61% faster',
                business: '+40% lead quality',
                cost: '$480/year saved'
            },
            testimonial: {
                quote: "Our mobile booking rate increased by 40% after the optimization. The investment paid for itself in 6 months through reduced advertising costs alone.",
                author: "Dr. Sarah Chen",
                role: "Practice Owner, Toronto Dental"
            },
            metrics: [
                { label: 'Mobile bookings', change: '+40%' },
                { label: 'Page abandonment', change: '-55%' },
                { label: 'Google Ads CPC', change: '-25%' }
            ]
        },
        {
            industry: 'Boutique Hotels',
            location: 'Portugal',
            problem: 'High bounce rate on mobile, losing direct bookings to OTAs',
            solution: 'Speed optimization + booking flow improvements',
            results: {
                before: '3.5s LCP',
                after: '1.3s LCP',
                improvement: '63% faster',
                business: '+15% direct bookings',
                cost: '$600/year saved'
            },
            testimonial: {
                quote: "Direct bookings increased 15% in the first quarter. We're saving thousands on Booking.com commissions.",
                author: "Miguel Santos",
                role: "Owner, Quinta do Sol"
            },
            metrics: [
                { label: 'Direct bookings', change: '+15%' },
                { label: 'Booking.com dependency', change: '-20%' },
                { label: 'Commission savings', change: '$3,200/year' }
            ]
        }
    ]

    const pipeline = [
        { step: 'Clay Lead Generation', description: '2×25 batches targeting dental clinics & hotels' },
        { step: 'BuiltWith API Analysis', description: 'Identify Wix/WordPress sites with PSI < 50' },
        { step: 'Lighthouse CI Testing', description: 'Local testing to avoid PSI throttling' },
        { step: 'n8n Scoring', description: 'Automated threshold scoring (≥70 points)' },
        { step: 'Multi-channel Outreach', description: 'Email → WhatsApp → LinkedIn sequence' },
        { step: 'Stripe/PayPal Integration', description: 'BNPL payment processing' },
        { step: 'Vercel Deployment', description: 'Optimized site delivery' },
        { step: 'Looker Studio Dashboard', description: 'Public ROI tracking' }
    ]

    return (
        <SectionWrapper background="gray" spacing="normal" id="results">
            <SectionHeader
                eyebrow="Proven Results"
                title="Real performance data from recent projects"
                description="Every metric is lab-tested and verified. No vanity numbers, just business impact."
                align="center"
                size="md"
            />

            {/* Key Metrics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white rounded-xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow"
                    >
                        <div className={`text-4xl font-bold mb-2 ${metric.color === 'blue' ? 'text-blue-600' :
                                metric.color === 'green' ? 'text-green-600' :
                                    metric.color === 'purple' ? 'text-purple-600' :
                                        'text-orange-600'
                            }`}>
                            {metric.value}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{metric.label}</h3>
                        <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${metric.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                                metric.color === 'green' ? 'bg-green-100 text-green-700' :
                                    metric.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                                        'bg-orange-100 text-orange-700'
                            }`}>
                            {metric.trend}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Detailed Case Studies */}
            <div className="space-y-16 mb-20">
                {caseStudies.map((study, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
                    >
                        <div className="grid lg:grid-cols-2 gap-12 items-start">

                            {/* Case Study Content */}
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {study.industry}
                                        </span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-600">{study.location}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {study.problem}
                                    </h3>

                                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Solution Applied:</h4>
                                        <p className="text-gray-700">{study.solution}</p>
                                    </div>
                                </div>

                                {/* Results Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-red-50 rounded-lg">
                                        <div className="text-2xl font-bold text-red-600 mb-1">
                                            {study.results.before}
                                        </div>
                                        <div className="text-sm text-red-700">Before</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600 mb-1">
                                            {study.results.after}
                                        </div>
                                        <div className="text-sm text-green-700">After</div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-blue-900">Performance Improvement</span>
                                        <span className="text-2xl font-bold text-blue-600">{study.results.improvement}</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-blue-800">Business Impact</span>
                                        <span className="font-semibold text-blue-600">{study.results.business}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-800">Annual Savings</span>
                                        <span className="font-semibold text-green-600">{study.results.cost}</span>
                                    </div>
                                </div>

                                {/* Business Metrics */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900">Additional Business Metrics:</h4>
                                    {study.metrics.map((metric, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700">{metric.label}</span>
                                            <span className="font-semibold text-green-600">{metric.change}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial & Visual */}
                            <div className="space-y-6">
                                {/* Testimonial */}
                                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <div className="flex space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">5.0 rating</span>
                                    </div>

                                    <blockquote className="text-gray-800 mb-4 leading-relaxed">
                                        "{study.testimonial.quote}"
                                    </blockquote>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">
                                                {study.testimonial.author.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{study.testimonial.author}</div>
                                            <div className="text-sm text-gray-600">{study.testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Performance Chart Visualization */}
                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                        <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                                        Performance Timeline
                                    </h4>

                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Week 1</span>
                                            <span className="text-gray-600">Week 4</span>
                                        </div>

                                        <div className="relative">
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <motion.div
                                                    initial={{ width: '20%' }}
                                                    whileInView={{ width: '100%' }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 2, delay: 0.5 }}
                                                    className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full"
                                                />
                                            </div>
                                            <div className="flex justify-between mt-2 text-xs">
                                                <span className="text-red-600 font-medium">{study.results.before}</span>
                                                <span className="text-green-600 font-medium">{study.results.after}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Technology Pipeline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 border border-gray-200"
            >
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Automated Performance Pipeline
                    </h3>
                    <p className="text-gray-600">
                        Our proprietary technology stack ensures consistent, repeatable results
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pipeline.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 h-full">
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                                        {index + 1}
                                    </div>
                                    <h4 className="font-semibold text-gray-900 text-sm">{step.step}</h4>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
                            </div>

                            {index < pipeline.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mt-16"
            >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to see similar results for your business?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Join our proven system. Get the same results or receive 110% of your money back.
                </p>
                <Link
                    href="#reserve"
                    className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                    <DollarSign className="w-5 h-5 mr-2" />
                    Reserve Your Slot Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
            </motion.div>
        </SectionWrapper>
    )
}
