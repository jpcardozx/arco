/**
 * Figma Hero Section - Refined Design
 * Premium UI with modern animations and sophisticated                    <h3 className="mb-4 font-arsenal text-3xl font-normal uppercase tracking-wide text-neutral-900">
                    Sistema Completo
                  </h3>             <h3 className="mb-4 font-arsenal text-3xl font-normal uppercase tracking-wide text-neutral-900">
                    Sistema Completo
                  </h3>pywriting
 * 
 * @notes This component is now fully compliant with the new utility-first architecture.
 * - It relies on the central design system defined in `tailwind.config.mjs`.
 * - All styles are self-contained within the component via utility classes.
 * - No dependency on global custom CSS classes.
 */
'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/primitives/Container/Container';
import { Play, ArrowRight, Target, TrendingUp, Clock } from 'lucide-react';

export function FigmaHero() {
  const stats = [
    { icon: Target, value: '350%', label: 'Aumento em leads' },
    { icon: Clock, value: '7 dias', label: 'Para resultados' },
    { icon: TrendingUp, value: '200+', label: 'Clientes ativos' }
  ];

  return (
    <section className="relative flex min-h-[95vh] items-center overflow-hidden">
      {/* Refined background with multiple layers using theme colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-arco-50/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,theme(colors.blue.500/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,theme(colors.purple.500/0.05),transparent_50%)]" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      <Container size="xl" className="py-20">
        
        {/* Main Hero Content */}
        <div className="relative z-10 mx-auto mb-24 max-w-4xl text-center">
          {/* Badge de destaque using theme colors */}
          <Badge className="mb-6 border-arco-200 bg-arco-50 px-4 py-2 text-sm font-medium text-arco-700">
            ⚡ Implementação em 48h
          </Badge>
          
          <h1 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-6xl font-bold text-transparent">
            Leads qualificados em{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              7 dias
            </span>
          </h1>
          
                              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-neutral-600">
            Transforme sua empresa com automação inteligente que conecta dados, acelera vendas e gera resultados reais.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="border-amber-400 bg-amber-400 px-6 py-3 font-barlow font-medium text-neutral-900 hover:bg-amber-500 rounded-full border"
            >
              Agendar Consultoria
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-neutral-200 px-6 py-3 font-barlow text-neutral-900 hover:bg-neutral-50 rounded-full"
            >
              Ver Metodologia
            </Button>
          </div>
        </div>

        {/* Visual Element */}
        <div className="relative">
          {/* Demo/Preview - Enhanced */}
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 -rotate-1 transform rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
            
            <Card className="relative overflow-hidden rounded-3xl border-0 bg-white/90 shadow-2xl backdrop-blur-xl">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/80 p-12 aspect-video">
                <div className="max-w-2xl text-center">
                  {/* Play button with enhanced design */}
                  <div className="relative mb-8">
                    <div className="group mx-auto flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110">
                                            <Play className="ml-1 h-10 w-10 text-arco-600 transition-colors group-hover:text-arco-700" />
                    </div>
                    <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20" />
                  </div>
                  
                  <h3 className="mb-4 font-arsenal text-3xl font-normal uppercase tracking-wide text-gray-900">
                    Sistema completo
                  </h3>
                  
                                                      <p className="mb-8 font-barlow text-lg leading-relaxed text-neutral-600">
                    Plataforma integrada que une automação, CRM e analytics em um só lugar.
                  </p>
                  
                  {/* Feature highlights */}
                  <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                    <div className="rounded-xl border border-white/40 bg-white/60 p-4 backdrop-blur-sm">
                      <div className="mb-1 font-semibold text-arco-600">Analytics</div>
                      <div className="text-neutral-600">Tempo real</div>
                    </div>
                    <div className="rounded-xl border border-white/40 bg-white/60 p-4 backdrop-blur-sm">
                      <div className="mb-1 font-semibold text-green-600">Automação</div>
                      <div className="text-gray-600">WhatsApp + CRM</div>
                    </div>
                    <div className="rounded-xl border border-white/40 bg-white/60 p-4 backdrop-blur-sm">
                      <div className="mb-1 font-semibold text-purple-600">Integração</div>
                      <div className="text-gray-600">Google Ads</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

      </Container>
    </section>
  );
}
