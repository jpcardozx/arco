'use client'

import React from 'react'
import Image from 'next/image'
import SectionContainer from '@/components/animation/SectionContainer'
import { IMAGES } from '@/lib/asset-manifest'

/**
 * Social Proof Section
 * Testimonials com imagem real + dados quantitativos
 */

const testimonials = [
  {
    id: '1',
    quote: 'Desde a primeira visita, me sinto como uma rainha! O atendimento é impecável e os resultados são absolutamente transformadores. Voltei para apresentações importantes e todos comentaram sobre minha aparência!',
    author: 'Marina Santos',
    role: 'Diretora de Marketing',
    image: 'MS',
    rating: 5
  },
  {
    id: '2',
    quote: 'Procurava um salão que entendesse sobre qualidade premium. Encontrei aqui! As profissionais são especializadas, os produtos são realmente importados e os resultados duram muito mais.',
    author: 'Carolina Oliveira',
    role: 'Empresária',
    image: 'CO',
    rating: 5
  },
  {
    id: '3',
    quote: 'Fiz extensão de cílios aqui e a diferença foi imediata. Voltei para fazer as unhas também. A qualidade e a dedicação das profissionais é o que mais me impressiona!',
    author: 'Juliana Costa',
    role: 'Influenciadora',
    image: 'JC',
    rating: 5
  }
]

const stats = [
  { number: '+500', label: 'Clientes Satisfeitos' },
  { number: '98%', label: 'Taxa de Recomendação' },
  { number: '+8 Anos', label: 'Experiência Acumulada' },
  { number: '12', label: 'Especialidades' }
]

export function ProofSection() {
  return (
    <SectionContainer className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Clientes Transformadas
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Histórias reais de beleza e confiança. Veja por que nos escolhem.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="p-6 rounded-xl bg-gradient-to-br from-slate-800/30 to-slate-900/20 border border-slate-700/30 hover:border-amber-500/30 transition-all"
            >
              <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="group p-6 md:p-8 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/30 to-slate-900/20 hover:from-slate-800/50 hover:to-slate-900/30 transition-all duration-300 hover:border-amber-500/40"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-300 mb-6 leading-relaxed text-sm md:text-base">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-700/30">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{testimonial.image}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Section - Before/After or Showcase */}
        <div className="mt-16 md:mt-20">
          <div className="relative rounded-xl overflow-hidden shadow-2xl h-80 md:h-96 lg:h-[450px]">
            <Image
              src={IMAGES.optimized.testimonialsManicure.srcJpg}
              alt="Manicure Premium"
              fill
              quality={85}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
