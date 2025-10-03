/**
 * Methodology Hero Section - Process-focused Hero
 * Emphasizes precision methodology and results
 */
'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { ArrowRight, Play } from 'lucide-react';

// Design tokens unificados
const tokens = {
  colors: { primary: 'blue-600', text: 'gray-900', textMuted: 'gray-600', surface: 'gray-50' },
  spacing: { section: 'py-16 sm:py-20 lg:py-28', container: 'max-w-7xl', containerMd: 'max-w-4xl' },
  typography: { hero: 'text-5xl sm:text-6xl lg:text-7xl font-normal uppercase leading-tight', body: 'text-lg leading-relaxed' }
};

export function MethodologyHero() {
  return (
    <section className={`bg-black/90 ${tokens.spacing.section} overflow-hidden relative`}>
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.15),transparent_70%)]" />
      
      <Container size="xl" className={tokens.spacing.container}>
        <div className="relative z-10">
          
          {/* Main Hero Content */}
          <div className={`${tokens.spacing.containerMd} mx-auto text-center mb-12`}>
            <Badge className="mb-6 bg-white/10 text-white border-white/20 px-4 py-2">
              🎯 Metodologia Comprovada
            </Badge>
            
            <h1 className={`${tokens.typography.hero} mb-6 text-white font-arsenal`}>
              Metodologia de precisão para{' '}
              <span className="text-arco-400">resultados concretos</span>
            </h1>
            
            <p className={`${tokens.typography.body} text-white/90 mb-8 max-w-3xl mx-auto font-barlow`}>
              Processo auditável com governança rigorosa que transforma leads em negócios. 
              Cada etapa é calculada para maximizar eficiência e reduzir desperdício.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-neutral-900 hover:bg-neutral-100 font-semibold px-8 py-4 rounded-full font-barlow"
              >
                Agendar consultoria
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg"
                className="text-white hover:bg-white/10 border border-white/20 px-8 py-4 rounded-full font-barlow"
              >
                <Play className="w-4 h-4 mr-2" />
                Ver metodologia
              </Button>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2 font-arsenal">98%</div>
              <div className="text-white/80 text-sm font-barlow">Taxa de precisão</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2 font-arsenal">7 dias</div>
              <div className="text-white/80 text-sm font-barlow">Primeiros resultados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2 font-arsenal">100%</div>
              <div className="text-white/80 text-sm font-barlow">Processo auditável</div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}