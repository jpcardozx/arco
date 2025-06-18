'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

/**
 * SophisticatedCapture - Clean, professional lead capture form
 */
export function SophisticatedCapture() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        businessType: '',
        monthlyVisitors: '',
        currentConversion: '',
        name: '',
        email: '',
        company: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    })

    const steps = [
        {
            title: 'What type of business?',
            subtitle: 'We\'ll customize our analysis for your industry',
            field: 'businessType',
            options: [
                { value: 'saas', label: 'B2B SaaS', description: 'Software as a service' },
                { value: 'ecommerce', label: 'E-commerce', description: 'Online retail' },
                { value: 'leadgen', label: 'Lead Generation', description: 'Service-based business' },
                { value: 'education', label: 'Education', description: 'Courses & training' }
            ]
        },
        {
            title: 'Monthly website visitors?',
            subtitle: 'This helps us calculate your potential ROI',
            field: 'monthlyVisitors',
            options: [
                { value: '1k-10k', label: '1K - 10K', description: 'Up to $50K potential/month' },
                { value: '10k-50k', label: '10K - 50K', description: 'Up to $250K potential/month' },
                { value: '50k-100k', label: '50K - 100K', description: 'Up to $500K potential/month' },
                { value: '100k+', label: '100K+', description: '$1M+ potential/month' }
            ]
        },
        {
            title: 'Current conversion rate?',
            subtitle: 'Our system will calculate specific improvement potential',
            field: 'currentConversion',
            options: [
                { value: '0-1', label: '0% - 1%', description: 'High improvement potential' },
                { value: '1-3', label: '1% - 3%', description: 'Good optimization opportunity' },
                { value: '3-5', label: '3% - 5%', description: 'Performance refinement' },
                { value: '5+', label: '5%+', description: 'Elite optimization' }
            ]
        }
    ]

    const calculatePotential = () => {
        const visitors = {
            '1k-10k': 5000,
            '10k-50k': 25000,
            '50k-100k': 75000,
            '100k+': 150000
        }[formData.monthlyVisitors] || 5000

        const currentRate = {
            '0-1': 0.5,
            '1-3': 2,
            '3-5': 4,
            '5+': 6
        }[formData.currentConversion] || 1

        const improvement = currentRate < 2 ? 3.5 : 2.2
        const newRate = currentRate * improvement
        const additionalConversions = visitors * (newRate - currentRate) / 100
        const revenue = additionalConversions * 150

        return {
            improvement: improvement.toFixed(1),
            additionalConversions: Math.round(additionalConversions),
            monthlyRevenue: Math.round(revenue / 1000)
        }
    }

    const handleOptionSelect = (value: string) => {
        setFormData(prev => ({
            ...prev,
            [steps[currentStep].field]: value
        }))

        setTimeout(() => {
            if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1)
            } else {
                setCurrentStep(steps.length)
            }
        }, 300)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
    }

    const potential = calculatePotential()

    return (
        <section ref={ref} className="py-24 bg-slate-900">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                        Discover your potential
                    </h2>

                    <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
                        In 3 questions, our AI will calculate exactly how much you can gain
                        with behavioral optimization.
                    </p>
                </motion.div>

                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-400 text-sm">
                            {currentStep < steps.length ? `Question ${currentStep + 1} of ${steps.length}` : 'Your Details'}
                        </span>
                        <span className="text-slate-400 text-sm">
                            {Math.round(((currentStep + 1) / (steps.length + 1)) * 100)}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / (steps.length + 1)) * 100}%` }}
                            transition={{ duration: 0.5 }}
                            className="bg-white h-1 rounded-full"
                        />
                    </div>
                </div>

                {/* Form Steps */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <>
                                {currentStep < steps.length ? (
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="bg-white p-12 rounded-xl">
                                            <h3 className="text-2xl font-light text-slate-900 mb-4 text-center">
                                                {steps[currentStep].title}
                                            </h3>
                                            <p className="text-slate-600 text-center mb-12">
                                                {steps[currentStep].subtitle}
                                            </p>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                {steps[currentStep].options.map((option, index) => (
                                                    <motion.button
                                                        key={option.value}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                                        onClick={() => handleOptionSelect(option.value)}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="p-6 border border-slate-200 hover:border-slate-900 rounded-lg transition-all duration-300 text-left group"
                                                    >
                                                        <div className="text-slate-900 font-medium group-hover:text-slate-900 mb-2">
                                                            {option.label}
                                                        </div>
                                                        <div className="text-slate-500 text-sm">
                                                            {option.description}
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="contact"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="bg-white p-12 rounded-xl">
                                            <div className="grid md:grid-cols-2 gap-12">

                                                {/* Potential Results */}
                                                <div>
                                                    <h3 className="text-2xl font-light text-slate-900 mb-6">
                                                        Your calculated potential
                                                    </h3>

                                                    <div className="space-y-6 mb-8">
                                                        <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                                                            <div className="text-3xl font-light text-green-600 mb-2">
                                                                {potential.improvement}x
                                                            </div>
                                                            <div className="text-slate-600">Conversion improvement</div>
                                                        </div>

                                                        <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                                                            <div className="text-3xl font-light text-blue-600 mb-2">
                                                                +{potential.additionalConversions}
                                                            </div>
                                                            <div className="text-slate-600">Additional conversions/month</div>
                                                        </div>

                                                        <div className="p-6 bg-purple-50 rounded-lg border border-purple-100">
                                                            <div className="text-3xl font-light text-purple-600 mb-2">
                                                                ${potential.monthlyRevenue}K
                                                            </div>
                                                            <div className="text-slate-600">Additional revenue/month</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Contact Form */}
                                                <div>
                                                    <h3 className="text-2xl font-light text-slate-900 mb-6">
                                                        Get your detailed analysis
                                                    </h3>

                                                    <form onSubmit={handleSubmit} className="space-y-4">
                                                        <input
                                                            type="text"
                                                            placeholder="Your name"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 transition-colors"
                                                            required
                                                        />

                                                        <input
                                                            type="email"
                                                            placeholder="Business email"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 transition-colors"
                                                            required
                                                        />

                                                        <input
                                                            type="text"
                                                            placeholder="Company name"
                                                            value={formData.company}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 transition-colors"
                                                            required
                                                        />

                                                        <button
                                                            type="submit"
                                                            className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                                                        >
                                                            Get Free Analysis
                                                        </button>

                                                        <p className="text-xs text-slate-500 text-center">
                                                            Free analysis • No commitment • Results in 24h
                                                        </p>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="bg-white p-12 rounded-xl text-center">
                                    <div className="text-4xl mb-6">✓</div>
                                    <h3 className="text-3xl font-light text-slate-900 mb-6">
                                        Analysis initiated
                                    </h3>
                                    <p className="text-xl text-slate-600 mb-8">
                                        Our AI is processing your data. You'll receive your personalized
                                        analysis in <strong>24 hours</strong>.
                                    </p>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        {[
                                            { title: 'AI Analysis', desc: 'Neural processing' },
                                            { title: 'Custom Report', desc: 'Personalized metrics' },
                                            { title: 'Implementation Plan', desc: 'Step-by-step strategy' }
                                        ].map((item, index) => (
                                            <div key={index} className="p-4 bg-slate-50 rounded-lg">
                                                <div className="text-slate-900 font-medium mb-1">{item.title}</div>
                                                <div className="text-slate-500 text-sm">{item.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
