'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

export default function ClientTestimonials() {
    const [activeTestimonial, setActiveTestimonial] = useState(0); const testimonials = [
        {
            id: 1,
            quote: "In just 3 weeks, ARCO's optimizations recovered 27% of sales we were losing at checkout. It was like hiring an entire optimization team, but with much faster and more targeted results.",
            name: "Richard Mendez",
            role: "E-commerce Director",
            company: "TechZone Global",
            image: "/profile.webp",
            stars: 5
        },
        {
            id: 2,
            quote: "We had no idea how much money we were leaving on the table. ARCO's diagnosis showed that 42% of our visitors were abandoning at the last step due to a simple technical issue that was fixed in two days.",
            name: "Fiona Oliver",
            role: "CMO",
            company: "LearnNow",
            image: "/profile.webp",
            stars: 5
        },
        {
            id: 3,
            quote: "My development team always prioritized new features, never optimization. ARCO showed us, with concrete data, that small technical adjustments generated a revenue increase greater than our last 3 launches combined.",
            name: "Thomas Almeida",
            role: "CEO",
            company: "SoftExpert",
            image: "/profile.webp",
            stars: 5
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -bottom-[10%] right-[10%] w-[50%] h-[50%] rounded-full opacity-[0.03] bg-gradient-radial from-blue-500 to-transparent blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section header */}                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
                        Proven Results
                    </div>
                    <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                        What Our Clients Are Saying
                    </h2>
                    <p className="text-xl text-neutral-600">
                        Companies that trusted our approach and transformed technical issues into revenue growth
                    </p>
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-12 gap-8">
                    {/* Main testimonial */}
                    <motion.div
                        className="md:col-span-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 md:p-12 shadow-xl shadow-blue-900/5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Quote className="h-10 w-10 text-blue-300 mb-6" />

                        <blockquote className="text-2xl md:text-3xl font-medium text-neutral-800 mb-8">
                            {testimonials[activeTestimonial].quote}
                        </blockquote>

                        <div className="flex items-center">
                            <div className="h-14 w-14 rounded-full overflow-hidden mr-4">
                                <Image
                                    src={testimonials[activeTestimonial].image}
                                    alt={testimonials[activeTestimonial].name}
                                    width={56}
                                    height={56}
                                    className="object-cover h-full w-full"
                                />
                            </div>
                            <div>
                                <div className="text-lg font-medium text-neutral-900">
                                    {testimonials[activeTestimonial].name}
                                </div>
                                <div className="text-neutral-600">
                                    {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Testimonial selector */}
                    <div className="md:col-span-4 flex flex-col justify-between">
                        {testimonials.map((testimonial, idx) => (
                            <button
                                key={testimonial.id}
                                onClick={() => setActiveTestimonial(idx)}
                                className={`p-4 rounded-xl text-left mb-4 transition-all ${activeTestimonial === idx
                                    ? "bg-white shadow-lg border border-blue-100"
                                    : "bg-transparent hover:bg-white/50"
                                    }`}
                            >
                                <div className="flex mb-2">
                                    {[...Array(testimonial.stars)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-neutral-700 line-clamp-2">
                                    {testimonial.quote.substring(0, 90)}...
                                </p>
                                <div className="mt-2 text-sm font-medium text-neutral-900">
                                    {testimonial.name} · {testimonial.company}
                                </div>
                            </button>
                        ))}

                        <div className="rounded-xl border border-blue-100 p-4 bg-blue-50">
                            <p className="text-blue-800 font-medium mb-2">
                                Satisfação garantida
                            </p>
                            <p className="text-sm text-blue-700">
                                Resultados tangíveis em 14 dias ou seu dinheiro de volta, sem perguntas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Results metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                    <div className="rounded-lg border border-blue-100 p-6 bg-white">
                        <div className="text-4xl font-bold text-blue-600 mb-1">94%</div>
                        <p className="text-sm text-neutral-600">dos clientes reportam ROI acima de 3x</p>
                    </div>
                    <div className="rounded-lg border border-blue-100 p-6 bg-white">
                        <div className="text-4xl font-bold text-blue-600 mb-1">14 dias</div>
                        <p className="text-sm text-neutral-600">tempo médio para ver resultados</p>
                    </div>
                    <div className="rounded-lg border border-blue-100 p-6 bg-white">
                        <div className="text-4xl font-bold text-blue-600 mb-1">+31%</div>
                        <p className="text-sm text-neutral-600">aumento médio nas conversões</p>
                    </div>
                    <div className="rounded-lg border border-blue-100 p-6 bg-white">
                        <div className="text-4xl font-bold text-blue-600 mb-1">127+</div>
                        <p className="text-sm text-neutral-600">projetos concluídos com sucesso</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
