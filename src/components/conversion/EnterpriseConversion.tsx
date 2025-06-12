'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { Calendar, CheckCircle, FileText, Users, X } from 'lucide-react'

/**
 * Enterprise Conversion System - Strategic Lead Capture
 * 
 * Sophisticated multi-step conversion flow for enterprise prospects.
 * Designed for CFOs and CTOs managing $50M+ digital operations.
 * Focus: Professional qualification, not aggressive sales tactics.
 */

interface ConversionStep {
    id: string
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    fields: FormField[]
}

interface FormField {
    name: string
    label: string
    type: 'text' | 'email' | 'select' | 'number' | 'textarea'
    required: boolean
    options?: string[]
    placeholder?: string
}

const conversionSteps: ConversionStep[] = [
    {
        id: 'qualification',
        title: 'Infrastructure Assessment Request',
        description: 'Professional evaluation of digital infrastructure optimization opportunities',
        icon: FileText,
        fields: [
            {
                name: 'companyName',
                label: 'Organization',
                type: 'text',
                required: true,
                placeholder: 'Company name'
            },
            {
                name: 'contactEmail',
                label: 'Executive Email',
                type: 'email',
                required: true,
                placeholder: 'cto@company.com'
            },
            {
                name: 'monthlyRevenue',
                label: 'Monthly Digital Revenue',
                type: 'select',
                required: true,
                options: [
                    '$1M - $5M',
                    '$5M - $15M',
                    '$15M - $50M',
                    '$50M+'
                ]
            }
        ]
    },
    {
        id: 'technical',
        title: 'Technical Context',
        description: 'Infrastructure scope and current optimization priorities',
        icon: Users,
        fields: [
            {
                name: 'techStack',
                label: 'Primary Technology Stack',
                type: 'select',
                required: true,
                options: [
                    'React/Next.js + AWS',
                    'React/Next.js + Vercel',
                    'Vue/Nuxt + Google Cloud',
                    'Angular + Azure',
                    'Other Enterprise Stack'
                ]
            },
            {
                name: 'teamSize',
                label: 'Engineering Team Size',
                type: 'select',
                required: true,
                options: [
                    '5-15 engineers',
                    '15-50 engineers',
                    '50-150 engineers',
                    '150+ engineers'
                ]
            },
            {
                name: 'currentChallenges',
                label: 'Current Infrastructure Challenges',
                type: 'textarea',
                required: false,
                placeholder: 'Describe performance bottlenecks, scaling issues, or cost optimization needs...'
            }
        ]
    },
    {
        id: 'scheduling',
        title: 'Assessment Scheduling',
        description: 'Coordinate professional infrastructure evaluation timeline',
        icon: Calendar,
        fields: [
            {
                name: 'preferredTimeline',
                label: 'Assessment Timeline',
                type: 'select',
                required: true,
                options: [
                    'Immediate (this week)',
                    'Within 2 weeks',
                    'Within 30 days',
                    'Planning phase (30+ days)'
                ]
            },
            {
                name: 'stakeholders',
                label: 'Key Stakeholders',
                type: 'textarea',
                required: false,
                placeholder: 'Who should be involved in the assessment discussion?'
            }
        ]
    }
]

interface EnterpriseConversionProps {
    trigger?: React.ReactNode
}

export function EnterpriseConversion({ trigger }: EnterpriseConversionProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    const currentStepData = conversionSteps[currentStep]
    const isLastStep = currentStep === conversionSteps.length - 1

    const handleFieldChange = (fieldName: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }

    const handleNextStep = () => {
        if (isLastStep) {
            handleSubmit()
        } else {
            setCurrentStep(prev => prev + 1)
        }
    }

    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)

        // Simulate API call - replace with actual submission
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Here you would send to your CRM/analytics system
        console.log('Enterprise Assessment Request:', formData)

        setIsSubmitting(false)
        setIsCompleted(true)
    }

    const renderField = (field: FormField) => {
        const value = formData[field.name] || ''

        switch (field.type) {
            case 'select':
                return (
                    <select
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required={field.required}
                    >
                        <option value="">Select {field.label}</option>
                        {field.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                )

            case 'textarea':
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        required={field.required}
                    />
                )

            default:
                return (
                    <input
                        type={field.type}
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required={field.required}
                    />
                )
        }
    }

    if (isCompleted) {
        return (
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Assessment Request Submitted
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Our technical team will contact you within 24 hours to schedule your infrastructure assessment.
                            </p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Continue
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }

    return (
        <>
            {trigger && (
                <div onClick={() => setIsOpen(true)}>
                    {trigger}
                </div>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <currentStepData.icon className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {currentStepData.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {currentStepData.description}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    {conversionSteps.map((step, index) => (
                                        <div
                                            key={step.id}
                                            className={`flex items-center ${index <= currentStep ? 'text-blue-600' : 'text-gray-300'
                                                }`}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index <= currentStep
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-200 text-gray-500'
                                                    }`}
                                            >
                                                {index + 1}
                                            </div>
                                            {index < conversionSteps.length - 1 && (
                                                <div
                                                    className={`w-12 h-0.5 ml-2 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                                                        }`}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-4">
                                        {currentStepData.fields.map(field => (
                                            <div key={field.name}>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {field.label}
                                                    {field.required && <span className="text-red-500 ml-1">*</span>}
                                                </label>
                                                {renderField(field)}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between mt-8">
                                        <button
                                            type="button"
                                            onClick={handlePrevStep}
                                            disabled={currentStep === 0}
                                            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                            disabled={isSubmitting}
                                            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : isLastStep ? (
                                                'Submit Request'
                                            ) : (
                                                'Continue'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

// Quick CTA trigger component
export function EnterpriseAssessmentCTA() {
    return (
        <EnterpriseConversion
            trigger={
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 text-lg">
                    Request Infrastructure Assessment
                    <CheckCircle className="w-5 h-5" />
                </button>
            }
        />
    )
}
