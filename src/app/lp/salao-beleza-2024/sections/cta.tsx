'use client'

import React from 'react'
import Image from 'next/image'
import SectionContainer from '@/components/animation/SectionContainer'
import { IMAGES } from '@/lib/asset-manifest'

/**
 * Final CTA Section
 * Call-to-action com produtos showcase
 */

const features = [
  {
    icon: '✓',
    title: 'Agendamento Online',
    description: 'Reserve seu horário com facilidade através de nosso site'
  },
  {
    icon: '✓',
    title: 'Produtos Premium Importados',
    description: 'Usamos apenas marcas internacionais reconhecidas'
  },
  {
    icon: '✓',
    title: 'Garantia de Satisfação',
    description: 'Se não gostar, oferecemos reembolso ou novo serviço'
  },
  {
    icon: '✓',
    title: 'Consultoria Gratuita',
    description: 'Primeira consulta para definir seus objetivos de beleza'
  }
]

export function CTASection() {
  return (
    <SectionContainer className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl h-80 md:h-96 lg:h-[500px] order-2 lg:order-1">
            <Image
              src={IMAGES.optimized.beautyProducts.srcJpg}
              alt="Premium Beauty Products"
              fill
              quality={85}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Por que Escolher Nossa Clínica?
              </h2>
              <p className="text-lg text-slate-300">
                Mais de 500 clientes transformadas com satisfação garantida. Somos referência em qualidade premium e resultados duradouros.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                    <span className="text-amber-400 font-bold text-sm">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-lg transition-all shadow-lg hover:shadow-xl">
              Começar Transformação Agora
            </button>

            {/* Trust Badge */}
            <div className="flex gap-4 text-sm text-slate-400">
              <span>✓ Primeira Consulta Grátis</span>
              <span>✓ Sem Compromisso</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/30 to-slate-900/20 p-8 md:p-12 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Pronto para sua Transformação?
          </h3>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Agende sua consulta gratuita hoje. Nossas profissionais certificadas estão prontas para ajudá-la a alcançar seus objetivos de beleza.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold transition-all">
              Agendar Agora
            </button>
            <button className="px-8 py-3 rounded-lg border border-amber-500/40 text-amber-400 font-semibold hover:bg-amber-500/10 transition-all">
              Fale Conosco
            </button>
          </div>

          {/* Info */}
          <div className="text-sm text-slate-400 pt-4">
            <p>📍 Localizado no coração de São Paulo</p>
            <p>📞 Atendimento de seg-dom, 8h às 21h</p>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
