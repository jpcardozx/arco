/**
 * ARCO - Página Sobre
 *
 * Seção única com parallax e Three.js
 * Foco: credibilidade, informação técnica, quebra de objeção
 * Tom: sóbrio, profissional, neutro, sem pitches
 */

'use client';

import React from 'react';
import { SobreHeroSection } from '@/components/sobre/SobreHeroSection';
import { SobreCapacidadeSection } from '@/components/sobre/SobreCapacidadeSection';
import { SobreProcessoSection } from '@/components/sobre/SobreProcessoSection';
import { SobreResultadosSection } from '@/components/sobre/SobreResultadosSection';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Hero com Three.js background */}
      <SobreHeroSection />

      {/* Seção 1: Capacidade Técnica */}
      <SobreCapacidadeSection />

      {/* Seção 2: Processo e Metodologia */}
      <SobreProcessoSection />

      {/* Seção 3: Resultados Reais */}
      <SobreResultadosSection />
    </div>
  );
}
