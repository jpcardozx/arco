'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, ArrowRight, Clock, DollarSign, BarChart3, Zap } from 'lucide-react'
import Link from 'next/link'import { createHref } from '@/utils/navigation';

// Strategic services aligned with business plan pricing
export function StrategicServices() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    const services = [{
        tier: 'AUDIT',
        name: 'Digital Performance Analysis',
        price: '$8,500',
        priceNote: 'Full credit applicable to subsequent services',
        timeframe: '5-10 business days',
        description: 'Precise identification of revenue loss points in your digital experience, with complete mapping of technical and usability bottlenecks.',
        deliverables: [
            'Complete digital performance assessment',
            'Detailed report with quantified opportunities',
            'Personalized video explanation of analysis',
            'Data export for internal system integration',
            'Impact vs effort prioritized roadmap'
        ],
        creditableToward: 'Full value credited toward subsequent projects',
        icon: BarChart3,
        popular: false, cta: 'Request Audit',
        href: '/contact'
    }, {
        tier: 'PILOT',
        name: 'Pilot Project - Strategic Correction',
        price: '$45,000',
        priceNote: '$8,500 discount with prior audit',
        timeframe: '15-30 business days',
        description: 'Focused implementation on the 3 main friction points identified, with guarantee of measurable results in conversions and performance.',
        deliverables: [
            'Replacement of critical low-performance elements',
            'Advanced conversion optimization at key points',
            'Cache implementation and speed optimizations',
            'Secure deployment with automatic rollback',
            'A/B testing for improvement validation'
        ],
        guarantee: 'Guaranteed 15% improvement or full refund',
        icon: Zap,
        popular: true,
        cta: 'Start Pilot Project',
        href: '/contact'
    }, {
        tier: 'SCALE',
        name: 'Complete Digital Transformation',
        price: '$125,000',
        priceNote: '$8,500 discount with prior audit',
        timeframe: '60-90 business days',
        description: 'Complete digital experience rebuild focused on maximum performance, conversion and scalability for sustainable growth.',
        deliverables: [
            'Complete digital architecture rebuild',
            'Technical SEO and search engine optimization',
            'Performance optimized for Core Web Vitals',
            'Complete internal team training',
            'Maintenance and update plan'
        ],
        guarantee: 'Guaranteed positive ROI in 90 days or refund',
        icon: DollarSign,
        popular: false,
        cta: 'Plan Transformation',
        href: '/contact'
    }, {
        tier: 'RETAINER',
        name: 'Continuous Performance Management',
        price: '$18,000/month',
        priceNote: '6-month minimum contract',
        timeframe: 'Ongoing service',
        description: 'Monitoring, optimization and continuous improvements to keep your digital performance always at peak, with monthly ROI reports.',
        deliverables: [
            'Monthly data-driven optimizations',
            'CRO (Conversion Rate Optimization) testing',
            '24/7 performance monitoring',
            'Monthly executive reports',
            'Priority technical support'
        ],
        guarantee: 'Guaranteed monthly continuous improvement or cancellation',
        icon: Clock,
        popular: false,
        cta: 'Hire Retainer',
        href: '/contact'
    }
    ]

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>                        <span className="text-sm font-semibold text-blue-700">
                            Strategic Services
                        </span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        ROI-Driven{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Service Tiers
                        </span>
                    </h2>                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Custom ROI-driven solutions to transform your digital performance into measurable financial results.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className={`relative bg-white rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${service.popular
                                ? 'border-blue-500 ring-4 ring-blue-100'
                                : 'border-gray-200 hover:border-blue-300'
                                }`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            {service.popular && (
                                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Most Popular
                                </div>
                            )}

                            <div className="p-8">
                                {/* Service Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                        {React.createElement(service.icon, { className: "w-8 h-8 text-white" })}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-blue-600 mb-1">
                                            {service.tier}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {service.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="mb-6">
                                    <div className="text-3xl font-bold text-gray-900 mb-1">
                                        {service.price}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {service.priceNote} • {service.timeframe}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Deliverables */}
                                <div className="mb-8">
                                    <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                                    <ul className="space-y-3">
                                        {service.deliverables.map((deliverable, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">{deliverable}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Guarantee */}
                                {service.guarantee && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <span className="font-semibold text-green-800">Guarantee</span>
                                        </div>
                                        <p className="text-green-700 text-sm">{service.guarantee}</p>
                                    </div>
                                )}

                                {/* CTA */}
                                <Link
                                    href={createHref(service.href)}
                                    className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${service.popular
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                                        }`}
                                >
                                    {service.cta}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Design System CTA */}
                <motion.div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >                    <h3 className="text-2xl font-bold mb-4">
                        Need a Custom Design System?
                    </h3>
                    <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                        We create scalable design systems that accelerate development and ensure visual consistency across all touchpoints.
                    </p>
                    <Link
                        href={createHref("/design-system")}
                        className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300"
                    >
                        Explore Design Systems
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}


