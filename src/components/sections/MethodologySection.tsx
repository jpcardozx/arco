/**
 * ARCO Methodology Section
 * Three-pillar approach section with cards
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface MethodologyPillar {
  id: string;
  category: string;
  title: string;
  description: string;
  ctaText: string;
  backgroundImage?: string;
}

const methodologyPillars: MethodologyPillar[] = [
  {
    id: 'web',
    category: 'Web',
    title: 'Captação inteligente',
    description: 'Landing pages modulares com análise de conversão em tempo real.',
    ctaText: 'Saiba mais',
    backgroundImage: 'https://placehold.co/400x630'
  },
  {
    id: 'traffic',
    category: 'Tráfego',
    title: 'Intenção qualificada',
    description: 'Campanhas direcionadas com remarketing estratégico e baixo custo por lead.',
    ctaText: 'Detalhes',
    backgroundImage: 'https://placehold.co/400x630'
  },
  {
    id: 'operation',
    category: 'Operação',
    title: 'Atendimento eficiente',
    description: 'SLA menor que 3 minutos e redução significativa de no-shows.',
    ctaText: 'Explorar',
    backgroundImage: 'https://placehold.co/400x630'
  }
];

export function MethodologySection() {
  return (
    <section className="self-stretch px-16 py-28 bg-Color-Scheme-3-Background flex flex-col justify-start items-center gap-20 overflow-hidden">
      <div className="w-full max-w-[1280px] flex flex-col justify-start items-center gap-20">
        
        {/* Section Header */}
        <div className="w-full max-w-[768px] flex flex-col justify-start items-center gap-4">
          <div className="inline-flex justify-start items-center">
            <span className="text-center text-Color-Scheme-3-Text text-base font-semibold font-['Barlow'] leading-normal">
              Pilares
            </span>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-6">
            <h2 className="self-stretch text-center text-Color-Scheme-3-Text text-5xl font-normal font-['Arsenal_SC'] uppercase leading-[52px]">
              Como trabalhamos
            </h2>
            <p className="self-stretch text-center text-Color-Scheme-3-Text text-lg font-normal font-['Barlow'] leading-relaxed">
              Três estratégias fundamentais para aumentar seus orçamentos.
            </p>
          </div>
        </div>

        {/* Methodology Cards */}
        <div className="self-stretch inline-flex justify-start items-start gap-8 overflow-hidden">
          {methodologyPillars.map((pillar) => (
            <Card 
              key={pillar.id}
              className="flex-1 h-[630px] p-8 relative overflow-hidden border-0 bg-transparent"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={pillar.backgroundImage || 'https://placehold.co/400x630'}
                  alt={pillar.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <CardContent className="relative z-10 h-full p-0 flex flex-col justify-end gap-6">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="inline-flex justify-start items-center">
                    <span className="text-Color-White text-base font-semibold font-['Barlow'] leading-normal">
                      {pillar.category}
                    </span>
                  </div>
                  <h3 className="self-stretch text-Color-White text-4xl font-normal font-['Arsenal_SC'] uppercase leading-9">
                    {pillar.title}
                  </h3>
                </div>

                <div className="self-stretch flex flex-col justify-start items-start gap-8">
                  <p className="self-stretch text-Color-White text-base font-normal font-['Barlow'] leading-normal">
                    {pillar.description}
                  </p>
                  
                  <Button 
                    variant="link" 
                    className="self-stretch justify-start items-center gap-6 p-0 h-auto text-Color-White hover:text-Color-White/80"
                  >
                    <span className="text-Color-White text-base font-medium font-['Barlow'] leading-normal">
                      {pillar.ctaText}
                    </span>
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}