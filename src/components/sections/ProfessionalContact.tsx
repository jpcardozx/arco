'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { trackEvent, trackFunnelStep } from '../../lib/analytics'
import {
    ArrowRight,
    Mail,
    MessageSquare,
    Clock,
    Calendar,
    CheckCircle,
    ChevronRight,
    Users,
    Shield,
    Target,
    Award,
    Building2
} from 'lucide-react'

export function ProfessionalContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        projectType: '',
        timeline: '',
        message: ''
    });

    const projectTypes = [
        'Performance Optimization',
        'Digital Transformation',
        'Enterprise Development',
        'Technical Assessment',
        'Strategic Partnership',
        'Other Initiative'
    ]

    const timelines = [
        'Immediate (1-2 weeks)',
        'Short-term (1-2 months)',
        'Medium-term (3-6 months)',
        'Long-term (6+ months)',
        'Strategic planning phase'
    ]

    const availableSlots = [
        'Wednesday, 10:30 AM EST',
        'Thursday, 2:15 PM EST',
        'Friday, 11:00 AM EST'
    ]

    const consultationDetails = [
        {
            title: "Executive Discovery Session",
            steps: [
                "Strategic discussion of your current digital operations and business objectives", "Initial assessment of performance optimization opportunities and potential impact",
                "Detailed explanation of our methodology and validation framework",
                "Clear roadmap and next steps with no-pressure recommendations"
            ]
        }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Track form submission
        trackEvent({
            event: 'form_submit',
            category: 'conversion',
            action: 'contact_form_submit',
            label: 'main_contact',
            value: 1,
            custom_parameters: {
                company: formData.company,
                project_type: formData.projectType,
                timeline: formData.timeline
            }
        })

        // Track conversion funnel completion
        trackFunnelStep('contact_form_submit', 'conversion_funnel', {
            form_data: {
                project_type: formData.projectType,
                timeline: formData.timeline,
                has_company: !!formData.company
            },
            timestamp: Date.now()
        })

        console.log('Form submitted:', formData)
        // Here you would typically send to an API
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden" id="contact" data-section="contact">
            {/* Premium background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
                <div className="absolute top-1/4 left-1/4 w-px h-1/2 bg-gradient-to-b from-blue-400/30 via-transparent to-blue-400/30" />
                <div className="absolute top-1/3 right-1/3 w-px h-1/3 bg-gradient-to-b from-purple-400/20 via-transparent to-purple-400/20" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    {/* Premium Contact Information */}
                    <div className="text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold mb-8">
                                <Calendar className="w-4 h-4 mr-2" />
                                Executive Strategy Session
                            </div>

                            <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                                Transform Your
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                                    Digital Performance
                                </span>
                            </h2>

                            <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-xl">
                                Schedule a confidential 30-minute strategic discussion to explore how we can
                                architect measurable performance improvements for your enterprise.
                            </p>
                        </motion.div>

                        {/* Premium Contact Methods */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6 mb-12"
                        >
                            <div className="flex items-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-white text-lg">Available Time Slots</div>
                                    <div className="text-blue-300">Real-time availability from executive calendar</div>
                                </div>
                            </div>

                            {availableSlots.map((slot, index) => (
                                <motion.div
                                    key={index}
                                    className="group flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-400/50 hover:bg-blue-500/10 cursor-pointer transition-all duration-300"
                                    whileHover={{ x: 4 }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Clock className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="font-semibold text-white text-lg">{slot}</div>
                                    </div>
                                    <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Premium What to Expect */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
                        >
                            <h3 className="font-bold text-white mb-6 text-2xl flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mr-3 flex items-center justify-center">
                                    <Target className="w-4 h-4 text-white" />
                                </div>
                                Executive Session Agenda
                            </h3>
                            <div className="space-y-4 text-slate-300">
                                {consultationDetails[0].steps.map((step, idx) => (
                                    <div key={idx} className="flex items-start space-x-4">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold flex items-center justify-center mt-1 flex-shrink-0">
                                            {idx + 1}
                                        </div>
                                        <span className="leading-relaxed">{step}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/20">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h5 className="font-bold text-white mb-3 flex items-center">
                                            <Users className="w-5 h-5 mr-2" />
                                            Who You'll Meet
                                        </h5>
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            Senior strategy professionals with 15+ years of enterprise digital transformation experience.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-white mb-3 flex items-center">
                                            <Shield className="w-5 h-5 mr-2" />
                                            Confidentiality
                                        </h5>
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            All discussions protected by enterprise-grade NDA from first contact.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>                    {/* Premium Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50 overflow-hidden">
                            {/* Premium background glow */}
                            <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />

                            <div className="relative">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl shadow-lg">
                                        <MessageSquare className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-slate-900">Start Strategic Discussion</h3>
                                        <p className="text-slate-600 font-medium">Confidential enterprise consultation</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-lg font-bold text-slate-900 mb-3">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-lg font-bold text-slate-900 mb-3">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                                                placeholder="executive@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="company" className="block text-lg font-bold text-slate-900 mb-3">
                                            Company *
                                        </label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" />
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                required
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full pl-14 pr-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                                                placeholder="Your organization name"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="projectType" className="block text-lg font-bold text-slate-900 mb-3">
                                                Initiative Type *
                                            </label>
                                            <select
                                                id="projectType"
                                                name="projectType"
                                                required
                                                value={formData.projectType}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                                            >
                                                <option value="">Select initiative type</option>
                                                {projectTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="timeline" className="block text-lg font-bold text-slate-900 mb-3">
                                                Timeline *
                                            </label>
                                            <select
                                                id="timeline"
                                                name="timeline"
                                                required
                                                value={formData.timeline}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                                            >
                                                <option value="">Select timeline</option>
                                                {timelines.map((timeline) => (
                                                    <option key={timeline} value={timeline}>{timeline}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-lg font-bold text-slate-900 mb-3">
                                            Strategic Context *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={6}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none text-lg"
                                            placeholder="Describe your current digital challenges, business objectives, and what you're hoping to achieve through performance optimization..."
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <motion.button
                                            type="submit"
                                            className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-2xl flex items-center justify-center overflow-hidden"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <span className="relative flex items-center">
                                                Schedule Executive Consultation
                                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                                            </span>
                                        </motion.button>

                                        <p className="text-center text-blue-600 font-bold">
                                            Priority scheduling for enterprise clients
                                        </p>

                                        <div className="flex items-center justify-center space-x-6 pt-4 border-t border-slate-200">
                                            <div className="flex items-center text-sm text-slate-600">
                                                <Shield className="w-4 h-4 mr-2" />
                                                Enterprise NDA Protected
                                            </div>
                                            <div className="flex items-center text-sm text-slate-600">
                                                <Award className="w-4 h-4 mr-2" />
                                                C-Suite Focused
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
