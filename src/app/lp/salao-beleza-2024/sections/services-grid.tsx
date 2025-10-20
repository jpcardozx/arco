'use client'

import React from 'react'
import SectionContainer from '@/components/animation/SectionContainer'
import { ICONS } from '@/lib/asset-manifest'

/**
 * Services Grid Section
 * 12 premium beauty services com SVG icons
 */

const services = [
  {
    id: 'hair-salon',
    icon: '✂️',
    title: 'Corte e Styling',
    description: 'Cortes profissionais com técnicas modernas. Consultoria de estilo personalizada para seu tipo de cabelo.'
  },
  {
    id: 'manicure',
    icon: '💅',
    title: 'Manicure Premium',
    description: 'Unhas impecáveis com esmaltação durável. Designs exclusivos e técnicas avançadas de gel.'
  },
  {
    id: 'nail-care',
    icon: '✨',
    title: 'Tratamento de Unhas',
    description: 'Fortalecimento e hidratação profunda. Recuperação de unhas danificadas com produtos premium.'
  },
  {
    id: 'beauty-spa',
    icon: '🧴',
    title: 'Spa Facial',
    description: 'Limpeza profunda de pele. Tratamentos anti-envelhecimento com cosméticos importados.'
  },
  {
    id: 'hair-color',
    icon: '🎨',
    title: 'Coloração Profissional',
    description: 'Tingimento seguro e duradouro. Técnicas de balayage e ombré com pós-tratamento.'
  },
  {
    id: 'spa-treatment',
    icon: '🧖',
    title: 'Spa Completo',
    description: 'Experiência de relaxamento total. Banho turco, sauna e massagens terapêuticas.'
  },
  {
    id: 'facial-care',
    icon: '💆',
    title: 'Cuidados Faciais',
    description: 'Limpeza e nutrição. Tratamentos contra acne e envelhecimento cutâneo.'
  },
  {
    id: 'waxing',
    icon: '✨',
    title: 'Depilação a Cera',
    description: 'Remoção segura e duradoura. Técnicas sem irritação com pós-tratamento calmante.'
  },
  {
    id: 'massage',
    icon: '💆‍♀️',
    title: 'Massagem Terapêutica',
    description: 'Alívio de tensão muscular. Técnicas de massagem relaxante e energética.'
  },
  {
    id: 'eyelash-extension',
    icon: '👁️',
    title: 'Extensão de Cílios',
    description: 'Cílios volumosos e naturais. Técnica profissional com fios premium importados.'
  },
  {
    id: 'makeup-artist',
    icon: '💄',
    title: 'Maquiagem Profissional',
    description: 'Maquiagem para eventos especiais. Consultoria de beleza e estilo personalizado.'
  },
  {
    id: 'hair-extension',
    icon: '💇',
    title: 'Extensão de Cabelo',
    description: 'Cabelo volumoso e comprido. Instalação segura com fios naturais e duradouros.'
  }
]

export function ServicesGridSection() {
  return (
    <SectionContainer className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Serviços Premium
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            12 especialidades para sua transformação completa. Cada serviço com equipe certificada e produtos de primeira qualidade.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map(service => (
            <div
              key={service.id}
              className="group relative p-6 md:p-8 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/30 to-slate-900/20 hover:from-slate-800/50 hover:to-slate-900/30 transition-all duration-300 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5"
            >
              {/* Icon */}
              <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                {service.description}
              </p>

              {/* Hover accent */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
