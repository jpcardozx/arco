/**
 * Contact Hero Section - Mobile First Premium Design
 */
'use client';

import { Container } from '@/components/primitives/Container/Container';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';

export function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      <Container className="relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Disponível para novos projetos
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Vamos Conversar?
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transforme sua ideia em realidade digital. Entre em contato e vamos 
            construir algo extraordinário juntos.
          </p>

          {/* Quick Contact Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold min-w-[180px]"
            >
              <Phone className="w-4 h-4 mr-2" />
              Ligar Agora
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 min-w-[180px]"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Direto
            </Button>
          </div>

          {/* Location Hint */}
          <div className="flex items-center justify-center gap-2 text-blue-200 text-sm">
            <MapPin className="w-4 h-4" />
            <span>São Paulo, Brasil • Atendimento Global</span>
          </div>
        </div>
      </Container>
    </section>
  );
}