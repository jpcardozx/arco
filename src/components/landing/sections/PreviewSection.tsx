'use client';

import React, { useState } from 'react';
import type { Tables } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Smartphone, Zap, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCampaignColors } from '@/hooks/useCampaignColors';
import dynamic from 'next/dynamic';

const PhoneMockup3D = dynamic(
  () => import('../three/PhoneMockup3D'),
  { ssr: false, loading: () => <PhoneMockupFallback /> }
);

type Campaign = Tables<'campaigns'>;

interface PreviewSectionProps {
  campaign: Campaign;
}

function PhoneMockupFallback() {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/19] rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-slate-700 shadow-2xl animate-pulse" />
  );
}

export function PreviewSection({ campaign }: PreviewSectionProps) {
  const colors = useCampaignColors(campaign);
  const [businessName, setBusinessName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!businessName.trim()) return;
    setIsGenerating(true);
    
    // Simulate generation for 2s
    setTimeout(() => {
      setIsGenerating(false);
      // Scroll to mockup
      document.getElementById('phone-preview')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 2000);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium tracking-wide mb-6">
              <Zap className="w-4 h-4" />
              Preview Instantâneo
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-slate-900 mb-4">
              Veja sua página em{' '}
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
                }}
              >
                60 segundos
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
              Digite o nome do seu salão e veja como sua página ficaria. 
              Sem compromisso, sem cartão de crédito.
            </p>

            {/* Form */}
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Ex: Studio da Bia Manicure"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  className="h-14 px-5 text-base border-2 border-slate-300 focus:border-slate-400 rounded-xl transition-colors duration-300"
                  disabled={isGenerating}
                />
              </div>

              <Button
                size="lg"
                className="w-full h-14 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary.solid} 0%, ${colors.secondary.solid} 100%)`
                }}
                onClick={handleGenerate}
                disabled={!businessName.trim() || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Gerando sua página...
                  </>
                ) : (
                  <>
                    <Smartphone className="mr-2 w-5 h-5" />
                    Ver Minha Página Agora
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Leva menos de 60 segundos</span>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { text: 'Sem cadastro' },
                { text: 'Sem cartão' },
                { text: '100% grátis' },
                { text: 'Instantâneo' },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex items-center gap-2.5 text-slate-700"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (idx + 1), ease: [0.22, 1, 0.36, 1] }}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        {/* Right: 3D Phone Mockup */}
        <motion.div
          id="phone-preview"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full max-w-md mx-auto">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full" />
            
            {/* Three.js Phone Mockup */}
            <div className="relative z-10">
              <PhoneMockup3D businessName={businessName || 'Seu Salão'} />
            </div>
          </div>

          {/* Floating Stats */}
          <motion.div
            className="absolute top-10 -left-4 bg-white rounded-xl shadow-xl p-4 border border-slate-200"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-2xl font-bold text-blue-600">+48%</div>
            <div className="text-sm text-slate-600">Conversão média</div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 -right-4 bg-white rounded-xl shadow-xl p-4 border border-slate-200"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-2xl font-bold text-green-600">2.8x</div>
            <div className="text-sm text-slate-600">Mais clientes</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </div>
  );
}
