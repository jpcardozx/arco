/**
 * Contact CTA - Final Call to Action
 */
'use client';

import { Container } from '@/components/primitives/Container/Container';
import { Button } from '@/components/ui/button';
import { 
  Star,
  Zap,
  CheckCircle,
  Phone,
  MessageCircle,
  Calendar,
  Award
} from 'lucide-react';

export function ContactCTA() {
  const achievements = [
    { icon: Star, text: '50+ Projetos Entregues' },
    { icon: Award, text: '98% Satisfação Cliente' },
    { icon: Zap, text: 'Resposta em 24h' },
    { icon: CheckCircle, text: '3 Meses Garantia' }
  ];

  const quickActions = [
    {
      icon: Phone,
      label: 'Ligar Agora',
      description: 'Fale diretamente conosco',
      action: 'tel:+5511999999999',
      variant: 'default' as const,
      primary: true
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      description: 'Conversa rápida',
      action: 'https://wa.me/5511999999999',
      variant: 'outline' as const,
      primary: false
    },
    {
      icon: Calendar,
      label: 'Agendar Call',
      description: 'Reunião online',
      action: '#',
      variant: 'outline' as const,
      primary: false
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
      
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Pronto para começar seu projeto?
          </div>

          {/* Main Content */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Transforme Sua
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              Visão em Realidade
            </span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Junte-se a mais de 50 empresas que já transformaram seus negócios conosco. 
            Vamos criar algo extraordinário juntos!
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  size="lg"
                  variant={action.variant}
                  className={`min-w-[180px] h-14 text-base font-semibold ${
                    action.primary 
                      ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-2xl' 
                      : 'border-white/30 text-white hover:bg-white/10 backdrop-blur-sm'
                  }`}
                  onClick={() => {
                    if (action.action.startsWith('http')) {
                      window.open(action.action, '_blank');
                    } else if (action.action !== '#') {
                      window.location.href = action.action;
                    }
                  }}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <div>{action.label}</div>
                    <div className="text-xs opacity-75">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-blue-100">
                    {achievement.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-blue-200 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Sem compromisso inicial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Consultoria gratuita</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Orçamento transparente</span>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
    </section>
  );
}