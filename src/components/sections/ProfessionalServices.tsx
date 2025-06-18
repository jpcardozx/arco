'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Code, Rocket } from 'lucide-react'
import Link from 'next/link'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeader } from '@/components/layout/SectionHeader'

export function ProfessionalServices() {
    const services = [
        {
            icon: Zap,
            title: 'Performance Optimization',
            description: 'Comprehensive audits and optimization strategies that measurably improve load times and Core Web Vitals.',
            deliverables: [
                'Performance audit report',
                'Optimization roadmap',
                'Implementation support',
                'Performance monitoring setup'
            ],
            link: '/services/performance',
            highlight: 'Up to 70% faster'
        },
        {
            icon: Code,
            title: 'React Architecture',
            description: 'Scalable, maintainable React applications built with modern patterns and enterprise-grade practices.',
            deliverables: [
                'Architecture design',
                'Component library',
                'State management setup',
                'Testing framework'
            ],
            link: '/services/architecture',
            highlight: 'Enterprise-ready'
        },
        {
            icon: Rocket,
            title: 'Development Partnership',
            description: 'End-to-end development partnership from planning to deployment and ongoing optimization.',
            deliverables: [
                'Project planning',
                'Full-stack development',
                'DevOps setup',
                'Ongoing maintenance'
            ],
            link: '/services/partnership',
            highlight: 'Full-service'
        }
    ]

    return (
        <SectionWrapper background="gray" spacing="normal" id="services">
            <SectionHeader
                eyebrow="Our Services"
                title="Focused expertise that delivers results"
                description="We specialize in three core areas where we can make the biggest impact on your business outcomes."
                align="center"
                size="md"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => {
                    const Icon = service.icon
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="bg-white p-8 rounded-xl border border-gray-200 h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

                                {/* Service Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                                            <Icon className="w-6 h-6 text-gray-700" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                {service.title}
                                            </h3>
                                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                                {service.highlight}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                                    {service.description}
                                </p>

                                {/* Deliverables */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Key deliverables:</h4>
                                    <ul className="space-y-2">
                                        {service.deliverables.map((deliverable, idx) => (
                                            <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></div>
                                                <span>{deliverable}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA */}
                                <Link
                                    href={service.link}
                                    className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors group/link mt-auto"
                                >
                                    Learn more
                                    <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mt-16 pt-12 border-t border-gray-200"
            >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Ready to improve your application performance?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Let's discuss your specific challenges and create a custom optimization strategy.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Start a conversation
                    <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
            </motion.div>
        </SectionWrapper>
    )
}
