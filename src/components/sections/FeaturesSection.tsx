/**
 * ARCO Features Section
 * Highlight key service features with visual emphasis
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturesSectionProps {
  badge?: string;
  title: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  featureImage?: string;
  variant?: 'default' | 'speed' | 'quality';
}

export function FeaturesSection({ 
  badge = "Velocidade",
  title = "SLA menor que 3 minutos",
  description = "Atendimento rápido e eficiente para garantir mais conversões e satisfação do cliente.",
  primaryCta = { text: "Ver planos", href: "/planos" },
  secondaryCta = { text: "Metodologia", href: "/metodologia" },
  featureImage = "https://placehold.co/720x720",
  variant = "speed"
}: FeaturesSectionProps) {
  return (
    <section className="self-stretch bg-Color-Scheme-1-Background flex flex-col justify-start items-center gap-20 overflow-hidden">
      <div className="self-stretch inline-flex justify-start items-start">
        
        {/* Content Side */}
        <div className="flex-1 self-stretch pl-16 pr-20 py-28 inline-flex flex-col justify-center items-end gap-8">
          <div className="w-full max-w-[560px] flex flex-col justify-start items-start gap-8">
            
            {/* Content Header */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <div className="inline-flex justify-start items-center">
                <span className="text-Color-Scheme-1-Text text-base font-semibold font-['Roboto'] leading-normal">
                  {badge}
                </span>
              </div>
              
              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <h2 className="self-stretch text-Color-Scheme-1-Text text-5xl font-bold font-['Roboto'] leading-[57.60px]">
                  {title}
                </h2>
                <p className="self-stretch text-Color-Scheme-1-Text text-lg font-normal font-['Roboto'] leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="inline-flex justify-start items-center gap-6">
              <Button
                variant="outline"
                size="lg"
                className="px-6 py-3 border-Color-Neutral-Darkest text-Color-Neutral-Darkest hover:bg-Color-Neutral-Darkest hover:text-white"
                asChild
              >
                <a href={primaryCta.href}>{primaryCta.text}</a>
              </Button>
              
              <Button
                variant="link"
                className="p-0 h-auto text-Color-Neutral-Darkest hover:text-Color-Neutral-Darkest/80"
                asChild
              >
                <a href={secondaryCta.href} className="flex items-center gap-2">
                  <span className="text-Color-Neutral-Darkest text-base font-normal font-['Roboto'] leading-normal">
                    {secondaryCta.text}
                  </span>
                  <ArrowRight className="w-6 h-6" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="flex-1 self-stretch min-h-[720px] relative overflow-hidden">
          <Image
            src={featureImage}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}