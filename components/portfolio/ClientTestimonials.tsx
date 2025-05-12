"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Testimonial interface
interface Testimonial {
    id: string;
    quote: string;
    author: string;
    position: string;
    company: string;
    companyLogo?: string;
    industry: string;
    result: string;
    imageUrl?: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: "testimonial-1",
        quote: "Working with this perception engineering methodology transformed how our customers perceive our product. We're now correctly positioned as the premium solution in our category and can command pricing that reflects our actual value.",
        author: "Alexandra Chen",
        position: "Chief Marketing Officer",
        company: "NexusCloud",
        companyLogo: "/logoXora.svg",
        industry: "Enterprise SaaS",
        result: "+127% premium tier adoption",
        imageUrl: "/profile.webp"
    },
    {
        id: "testimonial-2",
        quote: "After three failed redesigns with other agencies, this methodology finally solved our conversion problem. It wasn't about how our product looked—it was about how its value was being perceived. We now convert at nearly triple our previous rate.",
        author: "Marcus Johnson",
        position: "VP of Growth",
        company: "CapitalWave",
        companyLogo: "/darkIpeLogo.png",
        industry: "Financial Technology",
        result: "+184% conversion rate improvement",
        imageUrl: "/profile.webp"
    },
    {
        id: "testimonial-3",
        quote: "The perception gap diagnosis was eye-opening. We had no idea how much our technical expertise was being lost in our market positioning. The aligned strategy created a clear path to premium perception that reflected our capabilities.",
        author: "Elena Rodriguez",
        position: "Founder & CEO",
        company: "Artisana Collections",
        companyLogo: "/ipeLogo.png",
        industry: "Premium E-commerce",
        result: "76% reduction in price objections",
        imageUrl: "/profile.webp"
    }
];

export default function ClientTestimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const nextTestimonial = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    const currentTestimonial = TESTIMONIALS[activeIndex];

    return (
        <section
            id="testimonials"
            ref={containerRef}
            className="py-24 bg-neutral-900 overflow-hidden"
        >
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">Client Success</span>
                    <h2 className="text-4xl font-serif text-white mt-2 mb-4">
                        Transformation Stories
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                        Hear directly from clients who have seen measurable improvements in their market perception and business outcomes.
                    </p>
                </motion.div>

                {/* Testimonial slider */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-neutral-800/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-700 shadow-xl"
                        >
                            <div className="grid md:grid-cols-5 gap-0">
                                {/* Testimonial content */}
                                <div className="md:col-span-3 p-10 md:p-12 flex flex-col justify-between">
                                    <div>
                                        <div className="text-blue-400 mb-6">
                                            <Quote className="h-10 w-10 opacity-50" />
                                        </div>
                                        <blockquote className="text-xl text-white font-serif leading-relaxed mb-8">
                                            "{currentTestimonial.quote}"
                                        </blockquote>

                                        <div className="flex items-center">
                                            <div>
                                                <p className="text-white font-medium">{currentTestimonial.author}</p>
                                                <p className="text-neutral-400 text-sm">{currentTestimonial.position}, {currentTestimonial.company}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        <div className="inline-flex items-center bg-neutral-700/60 px-4 py-2 rounded-full">
                                            <span className="text-neutral-400 text-sm mr-2">Result:</span>
                                            <span className="text-green-400 font-mono font-medium">{currentTestimonial.result}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Visual element */}
                                <div className="md:col-span-2 relative h-64 md:h-auto">
                                    <div className="h-full bg-gradient-to-br from-blue-900/20 to-indigo-900/20">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                            <div className="mb-6">
                                                {currentTestimonial.companyLogo ? (
                                                    <div className="w-32 h-32 relative mx-auto">
                                                        <Image
                                                            src={currentTestimonial.companyLogo}
                                                            alt={currentTestimonial.company}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="text-2xl font-bold text-white">{currentTestimonial.company}</div>
                                                )}
                                            </div>

                                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                                <span className="text-white text-sm">{currentTestimonial.industry}</span>
                                            </div>

                                            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
                                                {TESTIMONIALS.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setActiveIndex(index)}
                                                        className={`w-2 h-2 rounded-full transition-all ${activeIndex === index ? 'bg-blue-400 w-8' : 'bg-neutral-600 hover:bg-neutral-500'
                                                            }`}
                                                        aria-label={`Go to testimonial ${index + 1}`}
                                                    ></button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={prevTestimonial}
                            className="bg-neutral-800 hover:bg-neutral-700 text-white rounded-full p-3 transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="bg-neutral-800 hover:bg-neutral-700 text-white rounded-full p-3 transition-colors"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20"
                >
                    <div className="text-center">
                        <h3 className="text-xl font-medium text-white mb-8">Trusted by forward-thinking businesses</h3>
                        <div className="flex flex-wrap justify-center items-center gap-12">
                            {['/ipeLogo.png', '/darkIpeLogo.png', '/logoXora.svg'].map((logo, index) => (
                                <div key={index} className="relative h-12 w-32 opacity-70 hover:opacity-100 transition-opacity">
                                    <Image
                                        src={logo}
                                        alt={`Client logo ${index + 1}`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
