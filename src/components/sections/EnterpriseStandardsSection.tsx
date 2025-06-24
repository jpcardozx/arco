'use client'

import { motion } from 'framer-motion'
import {
    BarChart3,
    Shield,
    Target,
    FileText,
    CheckCircle,
    Clock,
    Award,
    Users
} from 'lucide-react'

interface StandardItem {
    title: string
    description: string
    details: string
    icon: React.ComponentType<{ className?: string }>
}

interface DeliveryStandard {
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
}

export function EnterpriseStandardsSection() {
    const standards: StandardItem[] = [
        {
            title: "Evidence-Based Results",
            description: "Every recommendation backed by quantifiable data and statistical validation",
            details: "Pre/post performance comparisons with ROI measurement",
            icon: BarChart3
        },
        {
            title: "Risk-Managed Implementation",
            description: "Structured approach minimizes business disruption while ensuring results",
            details: "Staged deployment with clear success criteria and rollback procedures",
            icon: Shield
        },
        {
            title: "Business Outcome Alignment",
            description: "Technical optimizations directly tied to revenue and conversion improvements",
            details: "Revenue attribution analysis and conversion impact measurement",
            icon: Target
        },
        {
            title: "Transparent Accountability",
            description: "Comprehensive reporting with executive summaries and actionable insights",
            details: "Regular performance reviews with stakeholder reporting protocols",
            icon: FileText
        }
    ]

    const deliveryStandards: DeliveryStandard[] = [
        {
            title: "Delivery Predictability",
            description: "Structured timelines with clear milestones",
            icon: Clock
        },
        {
            title: "Quality Assurance",
            description: "Multi-stage validation checkpoints",
            icon: Award
        },
        {
            title: "Outcome Accountability",
            description: "Success metrics defined and measured",
            icon: Users
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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
        <section className="section bg-white">
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
                            Enterprise <span className="text-gradient">Standards</span>
                        </h2>
                        <h3 className="text-2xl font-semibold text-neutral-800 mb-6">
                            Operational Excellence You Can Trust
                        </h3>
                        <p className="text-xl text-neutral-600 max-w-5xl mx-auto">
                            Four fundamental principles that ensure predictable, measurable and sustainable
                            business transformation for executive stakeholders.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Main Standards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {standards.map((standard, index) => (
                        <motion.div
                            key={index}
                            className="card-feature bg-gradient-to-br from-white to-primary-50 border border-primary-100"
                            variants={itemVariants}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <standard.icon className="w-7 h-7 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                                        {standard.title}
                                    </h3>
                                    <p className="text-neutral-600 leading-relaxed mb-4">
                                        {standard.description}
                                    </p>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-accent-500 mt-1 flex-shrink-0" />
                                        <p className="text-sm text-neutral-500">
                                            {standard.details}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Enterprise Service Delivery Standards */}
                <motion.div
                    className="bg-gradient-to-br from-neutral-50 to-accent-50 rounded-2xl p-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div className="text-center mb-12" variants={itemVariants}>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                            Enterprise Service Delivery Standards
                        </h3>
                        <p className="text-lg text-neutral-600">
                            Consistent execution framework that ensures enterprise-grade delivery
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {deliveryStandards.map((deliveryStandard, index) => (
                            <motion.div
                                key={index}
                                className="text-center group"
                                variants={itemVariants}
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-white to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-accent-100 group-hover:to-accent-200 transition-all duration-300 shadow-soft">
                                    <deliveryStandard.icon className="w-10 h-10 text-accent-600" />
                                </div>
                                <h4 className="text-xl font-semibold text-neutral-900 mb-3">
                                    {deliveryStandard.title}
                                </h4>
                                <p className="text-neutral-600 leading-relaxed">
                                    {deliveryStandard.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
