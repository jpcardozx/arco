'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Mail, MessageSquare, Clock } from 'lucide-react'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeader } from '@/components/layout/SectionHeader'

export function ProfessionalContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        projectType: '',
        timeline: '',
        message: ''
    })

    const projectTypes = [
        'Performance Optimization',
        'React Architecture',
        'Development Partnership',
        'Technical Audit',
        'Other'
    ]

    const timelines = [
        'ASAP',
        'Within 1 month',
        '1-3 months',
        '3-6 months',
        'Just exploring'
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <SectionWrapper background="gray" spacing="normal" id="contact">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

                {/* Contact Information */}
                <div>
                    <SectionHeader
                        eyebrow="Get In Touch"
                        title="Let's discuss your performance challenges"
                        description="Every project starts with understanding your specific goals and constraints. We'll provide honest feedback and a clear path forward."
                        size="md"
                        animated={true}
                    />

                    {/* Contact Methods */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                            <Mail className="w-6 h-6 text-gray-600" />
                            <div>
                                <div className="font-medium text-gray-900">Email</div>
                                <div className="text-sm text-gray-600">hello@arco.dev</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                            <MessageSquare className="w-6 h-6 text-gray-600" />
                            <div>
                                <div className="font-medium text-gray-900">Response Time</div>
                                <div className="text-sm text-gray-600">Within 24 hours</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                            <Clock className="w-6 h-6 text-gray-600" />
                            <div>
                                <div className="font-medium text-gray-900">Free Consultation</div>
                                <div className="text-sm text-gray-600">30-minute strategy call</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* What to Expect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-8 p-6 bg-white rounded-xl border border-gray-200"
                    >
                        <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-start space-x-3">
                                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex items-center justify-center mt-0.5">1</div>
                                <span>We'll review your project details and respond within 24 hours</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex items-center justify-center mt-0.5">2</div>
                                <span>Schedule a 30-minute strategy call to discuss your goals</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex items-center justify-center mt-0.5">3</div>
                                <span>Receive a custom proposal with timeline and deliverables</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">
                            Start a conversation
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                                    placeholder="Your company name"
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                                        Project Type *
                                    </label>
                                    <select
                                        id="projectType"
                                        name="projectType"
                                        required
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                                    >
                                        <option value="">Select project type</option>
                                        {projectTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                                        Timeline *
                                    </label>
                                    <select
                                        id="timeline"
                                        name="timeline"
                                        required
                                        value={formData.timeline}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                                    >
                                        <option value="">Select timeline</option>
                                        {timelines.map((timeline) => (
                                            <option key={timeline} value={timeline}>{timeline}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Details *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors resize-none"
                                    placeholder="Tell us about your project, current challenges, and what you're hoping to achieve..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center group"
                            >
                                Send message
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                We respect your privacy. Your information will only be used to respond to your inquiry.
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    )
}
