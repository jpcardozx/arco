'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Calendar, BookOpen, BarChart2, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ConversionPath() {
    // Animation refs
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    // Form state
    const [email, setEmail] = useState('');
    const [resourceType, setResourceType] = useState('guide');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Form handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setEmail('');

            // Track conversion in analytics
            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                window.gtag('event', 'resource_download', {
                    resource_type: resourceType
                });
            }
        }, 1500);
    };

    // Conversion path options
    const conversionOptions = [
        {
            title: "Free Strategy Guide",
            description: "Download our comprehensive guide to market perception engineering and financial decision architecture.",
            icon: <BookOpen className="h-5 w-5" />,
            value: 'guide',
            cta: "Get Instant Access"
        },
        {
            title: "Revenue Gap Calculator",
            description: "Use our interactive tool to calculate the financial impact of your perception gap.",
            icon: <BarChart2 className="h-5 w-5" />,
            value: 'calculator',
            cta: "Calculate My Gap"
        },
        {
            title: "Strategy Consultation",
            description: "Schedule a 30-minute call with our team to discuss your specific challenges and opportunities.",
            icon: <Calendar className="h-5 w-5" />,
            value: 'consultation',
            cta: "Book My Session"
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-neutral-50 text-neutral-900"
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <div className="mb-16 max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm uppercase tracking-wider text-blue-600 font-semibold mb-4">
                            NEXT STEPS
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-serif font-medium mb-6 tracking-tight">
                            Start Your Perception Transformation
                        </h3>
                        <p className="text-lg text-neutral-600 portfolio-text-balance">
                            Choose the path that best fits your current needs and start recovering
                            the revenue you're losing to perception gaps.
                        </p>
                    </motion.div>
                </div>

                {/* Conversion options */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    {conversionOptions.map((option, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-8 border border-neutral-200 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className={`w-10 h-10 rounded-lg mb-4 flex items-center justify-center bg-blue-500 text-white`}>
                                {option.icon}
                            </div>

                            <h4 className="text-xl font-medium mb-3">
                                {option.title}
                            </h4>

                            <p className="text-neutral-600 mb-6">
                                {option.description}
                            </p>

                            <button
                                onClick={() => setResourceType(option.value)}
                                className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-colors text-center
                                    ${resourceType === option.value ?
                                        'bg-blue-600 text-white' :
                                        'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
                            >
                                {option.cta}
                            </button>
                        </div>
                    ))}
                </motion.div>

                {/* Dynamic conversion form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="bg-white rounded-xl p-8 border border-blue-100 shadow-md">
                        {!isSubmitted ? (
                            <>
                                <div className="flex items-start mb-6">
                                    <div className="mr-4 mt-1">
                                        {resourceType === 'guide' && <BookOpen className="h-6 w-6 text-blue-500" />}
                                        {resourceType === 'calculator' && <BarChart2 className="h-6 w-6 text-blue-500" />}
                                        {resourceType === 'consultation' && <Calendar className="h-6 w-6 text-blue-500" />}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-medium mb-2">
                                            {resourceType === 'guide' && "Get Your Free Strategy Guide"}
                                            {resourceType === 'calculator' && "Access the Revenue Gap Calculator"}
                                            {resourceType === 'consultation' && "Book Your Strategy Session"}
                                        </h4>
                                        <p className="text-neutral-600">
                                            {resourceType === 'guide' && "Enter your email to receive immediate access to our comprehensive guide on perception engineering."}
                                            {resourceType === 'calculator' && "Enter your email to access our interactive calculator and discover your potential revenue gap."}
                                            {resourceType === 'consultation' && "Enter your email to schedule your complimentary 30-minute strategy session with our team."}
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <label htmlFor="email" className="sr-only">Email address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your business email"
                                                required
                                                className="portfolio-input w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full portfolio-button portfolio-button-primary group h-full"
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center justify-center">
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Processing...
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center justify-center">
                                                        Get Started
                                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-medium mb-3">Success!</h4>
                                <p className="text-neutral-600 mb-6">
                                    {resourceType === 'guide' && "Your strategy guide has been sent to your email. Check your inbox in the next few minutes."}
                                    {resourceType === 'calculator' && "You'll receive access to the calculator in your email inbox shortly."}
                                    {resourceType === 'consultation' && "We've received your request. Check your email for available scheduling times."}
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Request another resource
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Additional support option */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center text-neutral-600 border-t border-neutral-200 pt-6">
                        <PhoneCall className="h-4 w-4 mr-2" />
                        <span>Prefer to speak directly with a specialist? Call us at </span>
                        <a href="tel:+15551234567" className="text-blue-600 font-medium ml-1 hover:underline">+1 (555) 123-4567</a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
