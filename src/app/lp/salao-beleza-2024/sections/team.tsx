'use client'

import React from 'react'
import Image from 'next/image'
import SectionContainer from '@/components/animation/SectionContainer'
import { IMAGES } from '@/lib/asset-manifest'

/**
 * Team Section
 * Profissionais especializados
 */

const team = [
  {
    id: '1',
    name: 'Marina Rocha',
    title: 'Hair Designer Senior',
    specialty: 'Especialista em Cabelos',
    bio: 'Certificação internacional em técnicas de corte e coloração. 12 anos de experiência em salões premium.'
  },
  {
    id: '2',
    name: 'Beatriz Lima',
    title: 'Nail Technician Expert',
    specialty: 'Manicure e Pedicure',
    bio: 'Certificada em gel profissional e nail art. 8 anos transformando unhas em obras de arte.'
  },
  {
    id: '3',
    name: 'Fernanda Costa',
    title: 'Master Beautician',
    specialty: 'Esteticista Avançada',
    bio: 'Dermatologia estética e tratamentos faciais. 10 anos especializando-se em rejuvenescimento.'
  },
  {
    id: '4',
    name: 'Sofia Pereira',
    title: 'Lash & Makeup Artist',
    specialty: 'Extensão de Cílios',
    bio: 'Certificada em volume russo e eyelash lifting. Trabalha com maquiagem profissional há 7 anos.'
  }
]

export function TeamSection() {
  return (
    <SectionContainer className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Nossos Profissionais
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Equipe altamente qualificada e certificada internacionalmente. Cada profissional dedica-se à excelência.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl h-80 md:h-96 lg:h-[500px] mb-16 md:mb-20">
          <Image
            src={IMAGES.optimized.teamProfessionals.srcJpg}
            alt="Professional Beauty Team"
            fill
            quality={85}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map(member => (
            <div
              key={member.id}
              className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/30 to-slate-900/20 hover:border-amber-500/40 transition-all duration-300"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative p-6 md:p-8 space-y-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {member.name.substring(0, 2)}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-amber-400 font-semibold">
                    {member.title}
                  </p>
                </div>

                {/* Specialty */}
                <p className="text-sm text-slate-300 font-medium">
                  {member.specialty}
                </p>

                {/* Bio */}
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  {member.bio}
                </p>

                {/* Certifications Badge */}
                <div className="pt-4 border-t border-slate-700/30">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400">
                    ✓ Certificada Internacionalmente
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-slate-300 mb-6 text-lg">
            Conheça a especialista ideal para seus serviços
          </p>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold transition-all">
            Agende sua Consulta
          </button>
        </div>
      </div>
    </SectionContainer>
  )
}
