'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, TrendingUp, Star, AlertCircle, CheckCircle, Calendar, ArrowRight } from 'lucide-react'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeader } from '@/components/layout/SectionHeader'

export function SocialProofUrgencySection() {
    const [currentSlot, setCurrentSlot] = useState(7)
    const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 14, minutes: 32 })

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes } = prev
                if (minutes > 0) {
                    minutes--
                } else if (hours > 0) {
                    minutes = 59
                    hours--
                } else if (days > 0) {
                    minutes = 59
                    hours = 23
                    days--
                }
                return { days, hours, minutes }
            })
        }, 60000) // Update every minute

        return () => clearInterval(interval)
    }, [])

    const liveMetrics = [
        {
            label: 'Applications This Week',
            value: '23',
            change: '+8 since Monday',
            trend: 'up',
            color: 'blue'
        },
        {
            label: 'Slots Remaining',
            value: `${currentSlot}`,
            change: 'Out of 10 total',
            trend: 'down',
            color: 'orange'
        },
        {
            label: 'Average LCP Improvement',
            value: '58%',
            change: 'From recent projects',
            trend: 'up',
            color: 'green'
        },
        {
            label: 'Client Satisfaction',
            value: '4.9/5',
            change: 'Based on 47 reviews',
            trend: 'up',
            color: 'purple'
        }
    ]

    const recentActivity = [
        {
            action: 'Dental clinic in Toronto',
            detail: 'Reserved slot #3',
            time: '2 hours ago',
            industry: 'dental'
        },
        {
            action: 'Boutique hotel in Lisbon',
            detail: 'Completed audit call',
            time: '5 hours ago',
            industry: 'hotel'
        },
        {
            action: 'Dental practice in Vancouver',
            detail: 'Paid deposit, project approved',
            time: '1 day ago',
            industry: 'dental'
        },
        {
            action: 'Hotel in Porto',
            detail: 'Site delivered, 1.2s LCP achieved',
            time: '2 days ago',
            industry: 'hotel'
        },
        {
            action: 'Orthodontist in Montreal',
            detail: 'Flash audit completed',
            time: '3 days ago',
            industry: 'dental'
        }
    ]

    const testimonialSpotlight = {
        quote: "The speed improvement was immediate and dramatic. Our mobile booking rate increased 40% in the first month, and we're saving $400+ annually on the old WordPress hosting.",
        author: "Dr. Sarah Chen",
        role: "Practice Owner",
        company: "Toronto Dental Wellness",
        industry: "Dental Clinic, Canada",
        results: {
            before: "2.8s LCP",
            after: "1.1s LCP",
            improvement: "61% faster"
        }
    }

    const urgencyFactors = [
        {
            factor: 'Q1 2025 Capacity',
            status: 'Limited to 10 clients',
            urgency: 'high'
        },
        {
            factor: 'Peak Season Timing',
            status: 'Ideal for hotels before summer',
            urgency: 'medium'
        },
        {
            factor: 'Tax Benefits',
            status: 'Business expense for Q1',
            urgency: 'low'
        }
    ]

    return (
        <SectionWrapper background="gray" spacing="normal" id="social-proof">
            <SectionHeader
                eyebrow="Live Activity & Social Proof"
                title="Join 200+ businesses we've optimized"
                description="Real-time updates from our current 37-day optimization cycle"
                align="center"
                size="md"
            />

            {/* Live Metrics Dashboard */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-4 gap-6 mb-12"
            >
                {liveMetrics.map((metric, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                            <div className={`p-1 rounded-full ${metric.trend === 'up' ? 'bg-green-100' : 'bg-orange-100'
                                }`}>
                                <TrendingUp className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-600' : 'text-orange-600 rotate-180'
                                    }`} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                            {metric.value}
                        </div>
                        <div className="text-xs text-gray-500">
                            {metric.change}
                        </div>
                    </div>
                ))}
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">

                {/* Live Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h3 className="text-xl font-bold text-gray-900">Live Activity</h3>
                        <span className="text-sm text-gray-500">Last 3 days</span>
                    </div>

                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.industry === 'dental'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-purple-100 text-purple-600'
                                    }`}>
                                    {activity.industry === 'dental' ? '🦷' : '🏨'}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900 text-sm">
                                        {activity.action}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {activity.detail}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                    {activity.time}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Urgency Timer */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl">
                        <div className="flex items-center space-x-2 mb-4">
                            <Clock className="w-5 h-5 text-orange-600" />
                            <span className="font-bold text-orange-900">Current Cycle Deadline</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">{timeLeft.days}</div>
                                <div className="text-xs text-orange-800">Days</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">{timeLeft.hours}</div>
                                <div className="text-xs text-orange-800">Hours</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">{timeLeft.minutes}</div>
                                <div className="text-xs text-orange-800">Minutes</div>
                            </div>
                        </div>
                        <p className="text-sm text-orange-800 text-center">
                            Until we close applications for the current optimization cycle
                        </p>
                    </div>
                </motion.div>

                {/* Testimonial Spotlight */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-6"
                >
                    {/* Featured Testimonial */}
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">Verified Result</span>
                        </div>

                        <blockquote className="text-lg text-gray-900 mb-6 leading-relaxed">
                            "{testimonialSpotlight.quote}"
                        </blockquote>

                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-lg">
                                    {testimonialSpotlight.author.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">
                                    {testimonialSpotlight.author}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {testimonialSpotlight.role}, {testimonialSpotlight.company}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {testimonialSpotlight.industry}
                                </div>
                            </div>
                        </div>

                        {/* Results Metrics */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-lg font-bold text-red-600">
                                        {testimonialSpotlight.results.before}
                                    </div>
                                    <div className="text-xs text-gray-600">Before</div>
                                </div>
                                <div>
                                    <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-green-600">
                                        {testimonialSpotlight.results.after}
                                    </div>
                                    <div className="text-xs text-gray-600">After</div>
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <span className="text-sm font-semibold text-green-800">
                                    {testimonialSpotlight.results.improvement}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Urgency Factors */}
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            Why Act Now?
                        </h3>
                        <div className="space-y-4">
                            {urgencyFactors.map((factor, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className={`p-1 rounded-full mt-1 ${factor.urgency === 'high' ? 'bg-red-100' :
                                            factor.urgency === 'medium' ? 'bg-orange-100' :
                                                'bg-gray-100'
                                        }`}>
                                        <AlertCircle className={`w-4 h-4 ${factor.urgency === 'high' ? 'text-red-600' :
                                                factor.urgency === 'medium' ? 'text-orange-600' :
                                                    'text-gray-600'
                                            }`} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 text-sm">
                                            {factor.factor}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {factor.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                <span className="font-semibold text-blue-900">Priority Queue Available</span>
                            </div>
                            <p className="text-sm text-blue-800">
                                Reserve your slot with $300 deposit. If we can't deliver results,
                                you get 110% back - we're that confident.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    )
}
