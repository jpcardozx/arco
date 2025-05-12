'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Quote, Star, BarChart2, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function MarketLeadershipProof() {
    // Animation refs
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    // Testimonial carousel state
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    // Testimonial data
    const testimonials = [
        {
            quote: "The perception gap ARCO identified was costing us millions without us even realizing it. Their methodology transformed how our enterprise customers perceive our value, leading to a 127% increase in our premium tier adoption in just 90 days.",
            author: "Alexandra Chen",
            position: "Chief Marketing Officer",
            company: "NexusCloud",
            industry: "Enterprise SaaS",
            logo: "/logoXora.svg",
            metrics: [
                { label: "Premium tier adoption", before: "12%", after: "27%" },
                { label: "Decision cycle length", before: "68 days", after: "31 days" }
            ]
        },
        {
            quote: "After three failed redesigns with traditional agencies, ARCO's approach finally solved our conversion problem. It wasn't about how our website looked—it was about how our value was being perceived. We now convert at nearly triple our previous rate.",
            author: "Marcus Johnson",
            position: "VP of Growth",
            company: "CapitalWave",
            industry: "Financial Technology",
            logo: "/darkIpeLogo.png",
            metrics: [
                { label: "Conversion rate", before: "2.3%", after: "6.7%" },
                { label: "Customer LTV", before: "$2,450", after: "$3,890" }
            ]
        },
        {
            quote: "The perception gap diagnosis was eye-opening. We had no idea how much our technical expertise was being lost in our market positioning. The realigned strategy created a clear path to premium perception that directly reflected our capabilities.",
            author: "Elena Rodriguez",
            position: "Founder & CEO",
            company: "Artisana Collections",
            industry: "Premium E-commerce",
            logo: "/ipeLogo.png",
            metrics: [
                { label: "Avg. order value", before: "$94", after: "$187" },
                { label: "Cart abandonment", before: "74%", after: "42%" }
            ]
        }
    ];

    // Navigation handlers
    const prevTestimonial = () => {
        setActiveTestimonial((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    const nextTestimonial = () => {
        setActiveTestimonial((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-white text-neutral-900"
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
                            MARKET LEADERSHIP
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-serif font-medium mb-6 tracking-tight">
                            Trusted by Industry Leaders to Transform Value Perception
                        </h3>
                        <p className="text-lg text-neutral-600 portfolio-text-balance">
                            See how we've helped companies across industries correct perception gaps
                            and unlock significant revenue growth.
                        </p>
                    </motion.div>
                </div>

                {/* Market proof metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    <div className="portfolio-metric-card">
                        <div className="flex items-center mb-4">
                            <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
                            <h4 className="font-medium">Average Revenue Impact</h4>
                        </div>
                        <p className="text-4xl font-bold text-blue-600">
                            +43.2%
                        </p>
                        <p className="text-neutral-500 text-sm mt-1">
                            Across 50+ engagements
                        </p>
                    </div>

                    <div className="portfolio-metric-card">
                        <div className="flex items-center mb-4">
                            <Clock className="h-5 w-5 text-blue-500 mr-2" />
                            <h4 className="font-medium">Implementation Time</h4>
                        </div>
                        <p className="text-4xl font-bold text-blue-600">
                            30-60
                            <span className="text-lg ml-1">days</span>
                        </p>
                        <p className="text-neutral-500 text-sm mt-1">
                            From diagnosis to results
                        </p>
                    </div>

                    <div className="portfolio-metric-card">
                        <div className="flex items-center mb-4">
                            <Users className="h-5 w-5 text-blue-500 mr-2" />
                            <h4 className="font-medium">Client Success Rate</h4>
                        </div>
                        <p className="text-4xl font-bold text-blue-600">
                            97%
                        </p>
                        <p className="text-neutral-500 text-sm mt-1">
                            Meet or exceed targets
                        </p>
                    </div>
                </motion.div>

                {/* Testimonial carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative"
                >
                    <div className="relative bg-neutral-50 rounded-2xl p-8 md:p-12 shadow-sm border border-neutral-100">
                        <div className="absolute top-4 right-4 flex items-center space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-colors ${index === activeTestimonial ? 'bg-blue-500' : 'bg-neutral-300'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                            <div className="lg:w-2/3">
                                <Quote className="h-12 w-12 text-blue-100 mb-6" />

                                <blockquote className="text-xl md:text-2xl font-serif leading-relaxed mb-8 text-neutral-800">
                                    "{testimonials[activeTestimonial].quote}"
                                </blockquote>

                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center">
                                            <span className="text-neutral-600 font-medium">
                                                {testimonials[activeTestimonial].author.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            {testimonials[activeTestimonial].author}
                                        </div>
                                        <div className="text-neutral-500 text-sm">
                                            {testimonials[activeTestimonial].position}, {testimonials[activeTestimonial].company}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/3 bg-white rounded-xl p-6 border border-neutral-100 self-center">
                                <div className="flex items-center justify-between mb-6">
                                    {testimonials[activeTestimonial].logo && (
                                        <div className="h-8 w-auto relative">
                                            <Image
                                                src={testimonials[activeTestimonial].logo}
                                                alt={testimonials[activeTestimonial].company}
                                                width={100}
                                                height={32}
                                                className="h-8 w-auto object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="text-xs text-neutral-500 font-medium">
                                        {testimonials[activeTestimonial].industry}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {testimonials[activeTestimonial].metrics.map((metric, index) => (
                                        <div key={index}>
                                            <div className="text-sm text-neutral-500 mb-1">
                                                {metric.label}
                                            </div>
                                            <div className="flex items-center">
                                                <div className="text-neutral-400 line-through mr-3">
                                                    {metric.before}
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-blue-500 mx-1" />
                                                <div className="text-blue-600 font-medium">
                                                    {metric.after}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6">
                            <button
                                onClick={prevTestimonial}
                                className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-neutral-600 hover:text-blue-600 transition-colors"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
                            </button>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6">
                            <button
                                onClick={nextTestimonial}
                                className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-neutral-600 hover:text-blue-600 transition-colors"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
