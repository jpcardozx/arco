'use client';

import { motion, useInView } from 'framer-motion';
import {
  Quote,
  BarChart2,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { useState } from 'react';
import React from "react";

export default function MarketLeadershipProof() {
  // Animation refs
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Testimonial carousel state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Testimonial data
  const testimonials = [
    {
      quote:
        'The perception gap ARCO identified was costing us millions without us even realizing it. Their methodology transformed how our enterprise customers perceive our value, leading to a 127% increase in our premium tier adoption in just 90 days.',
      author: 'Alexandra Chen',
      position: 'Chief Marketing Officer',
      company: 'NexusCloud',
      industry: 'Enterprise SaaS',
      logo: '/logoXora.svg',
      metrics: [
        { label: 'Premium tier adoption', before: '12%', after: '27%' },
        { label: 'Decision cycle length', before: '68 days', after: '31 days' },
      ],
    },
    {
      quote:
        "After three failed redesigns with traditional agencies, ARCO's approach finally solved our conversion problem. It wasn't about how our website looked—it was about how our value was being perceived. We now convert at nearly triple our previous rate.",
      author: 'Marcus Johnson',
      position: 'VP of Growth',
      company: 'CapitalWave',
      industry: 'Financial Technology',
      logo: '/darkIpeLogo.png',
      metrics: [
        { label: 'Conversion rate', before: '2.3%', after: '6.7%' },
        { label: 'Customer LTV', before: '$2,450', after: '$3,890' },
      ],
    },
    {
      quote:
        'The perception gap diagnosis was eye-opening. We had no idea how much our technical expertise was being lost in our market positioning. The realigned strategy created a clear path to premium perception that directly reflected our capabilities.',
      author: 'Elena Rodriguez',
      position: 'Founder & CEO',
      company: 'Artisana Collections',
      industry: 'Premium E-commerce',
      logo: '/ipeLogo.png',
      metrics: [
        { label: 'Avg. order value', before: '$94', after: '$187' },
        { label: 'Cart abandonment', before: '74%', after: '42%' },
      ],
    },
  ];

  // Navigation handlers
  const prevTestimonial = () => {
    setActiveTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={sectionRef} className="bg-white py-24 text-neutral-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
              LIDERANÇA DE MERCADO
            </h2>
            <h3 className="mb-6 font-serif text-3xl font-medium tracking-tight md:text-4xl">
              Confiado por Líderes da Indústria para Transformar a Percepção de Valor
            </h3>
            <p className="portfolio-text-balance text-lg text-neutral-600">
              Veja como ajudamos empresas de várias indústrias a corrigir lacunas de percepção e
              desbloquear crescimento significativo de receita.
            </p>
          </motion.div>
        </div>

        {/* Market proof metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          <div className="portfolio-metric-card">
            <div className="mb-4 flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-blue-500" />
              <h4 className="font-medium">Impacto Médio na Receita</h4>
            </div>
            <p className="text-4xl font-bold text-blue-600">+43.2%</p>
            <p className="mt-1 text-sm text-neutral-500">Em mais de 50 projetos</p>
          </div>

          <div className="portfolio-metric-card">
            <div className="mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-blue-500" />
              <h4 className="font-medium">Tempo de Implementação</h4>
            </div>
            <p className="text-4xl font-bold text-blue-600">
              30-60
              <span className="ml-1 text-lg">dias</span>
            </p>
            <p className="mt-1 text-sm text-neutral-500">Do diagnóstico aos resultados</p>
          </div>

          <div className="portfolio-metric-card">
            <div className="mb-4 flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-500" />
              <h4 className="font-medium">Taxa de Sucesso do Cliente</h4>
            </div>
            <p className="text-4xl font-bold text-blue-600">97%</p>
            <p className="mt-1 text-sm text-neutral-500">Atingem ou excedem metas</p>
          </div>
        </motion.div>

        {/* Testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-neutral-100 bg-neutral-50 p-8 shadow-sm md:p-12">
            <div className="absolute right-4 top-4 flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${index === activeTestimonial ? 'bg-blue-500' : 'bg-neutral-300'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              <div className="lg:w-2/3">
                <Quote className="mb-6 h-12 w-12 text-blue-100" />

                <blockquote className="mb-8 font-serif text-xl leading-relaxed text-neutral-800 md:text-2xl">
                  "{testimonials[activeTestimonial].quote}"
                </blockquote>

                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200">
                      <span className="font-medium text-neutral-600">
                        {testimonials[activeTestimonial].author.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{testimonials[activeTestimonial].author}</div>
                    <div className="text-sm text-neutral-500">
                      {testimonials[activeTestimonial].position},{' '}
                      {testimonials[activeTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>

              <div className="self-center rounded-xl border border-neutral-100 bg-white p-6 lg:w-1/3">
                <div className="mb-6 flex items-center justify-between">
                  {testimonials[activeTestimonial].logo && (
                    <div className="relative h-8 w-auto">
                      <Image
                        src={testimonials[activeTestimonial].logo}
                        alt={testimonials[activeTestimonial].company}
                        width={100}
                        height={32}
                        className="h-8 w-auto object-contain"
                      />
                    </div>
                  )}
                  <div className="text-xs font-medium text-neutral-500">
                    {testimonials[activeTestimonial].industry}
                  </div>
                </div>

                <div className="space-y-4">
                  {testimonials[activeTestimonial].metrics.map((metric, index) => (
                    <div key={index}>
                      <div className="mb-1 text-sm text-neutral-500">{metric.label}</div>
                      <div className="flex items-center">
                        <div className="mr-3 text-neutral-400 line-through">{metric.before}</div>
                        <ArrowRight className="mx-1 h-4 w-4 text-blue-500" />
                        <div className="font-medium text-blue-600">{metric.after}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 md:-left-6">
              <button
                onClick={prevTestimonial}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-600 shadow-md transition-colors hover:text-blue-600 md:h-12 md:w-12"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
              </button>
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 md:-right-6">
              <button
                onClick={nextTestimonial}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-600 shadow-md transition-colors hover:text-blue-600 md:h-12 md:w-12"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
