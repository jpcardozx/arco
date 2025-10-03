/**
 * Figma Testimonials Section - Client Success Stories
 * Real results from local service providers
 */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/primitives/Container/Container';
import { Star, Quote, TrendingUp, Users } from 'lucide-react';

// Design tokens unificados
const tokens = {
  colors: { text: 'gray-900', textMuted: 'gray-600', surface: 'gray-50' },
  spacing: { section: 'py-16 sm:py-20 lg:py-28', container: 'max-w-7xl', containerMd: 'max-w-4xl' },
  typography: { section: 'text-4xl sm:text-5xl font-normal uppercase leading-tight', body: 'text-lg leading-relaxed' }
};

export function FigmaTestimonials() {
  const testimonials = [
    {
      name: "Carlos Mendes",
      company: "Mendes Reformas",
      location: "São Paulo, SP",
      service: "Reformas residenciais",
      avatar: "CM",
      rating: 5,
      result: "+420% leads/mês",
      quote: "Em 15 dias já estava recebendo mais orçamentos do que conseguia atender. O sistema de qualificação é impressionante.",
      metrics: {
        leadsBefore: 8,
        leadsAfter: 42,
        conversionRate: "78%"
      }
    },
    {
      name: "Ana Rodrigues",
      company: "Studio Ana Hair",
      location: "Rio de Janeiro, RJ", 
      service: "Salão de beleza",
      avatar: "AR",
      rating: 5,
      result: "+300% faturamento",
      quote: "Saí de 20 clientes/mês para 80 clientes fixos. O remarketing trouxe muitas clientes que não agendavam na primeira visita.",
      metrics: {
        leadsBefore: 20,
        leadsAfter: 80,
        conversionRate: "85%"
      }
    },
    {
      name: "Roberto Silva",
      company: "Silva Climatização",
      location: "Belo Horizonte, MG",
      service: "Ar condicionado", 
      avatar: "RS",
      rating: 5,
      result: "+250% ticket médio",
      quote: "Os leads chegam muito mais qualificados. Antes perdia tempo com orçamentos de R$ 200, agora médio é R$ 1.500.",
      metrics: {
        leadsBefore: 15,
        leadsAfter: 35,
        conversionRate: "92%"
      }
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "200+",
      label: "Prestadores atendidos",
      description: "Em todo Brasil"
    },
    {
      icon: TrendingUp,
      number: "350%",
      label: "Aumento médio de leads",
      description: "Primeiros 90 dias"
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Satisfação dos clientes",
      description: "Baseado em 150+ avaliações"
    }
  ];

  return (
        <section className="bg-gradient-to-br from-arco-50 via-white to-arco-100/30 py-16 sm:py-20 lg:py-28">
      <Container size="xl" className="max-w-7xl">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Depoimentos
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl font-normal uppercase leading-tight mb-6 text-neutral-900 font-arsenal">
            Resultados Reais
          </h2>
          
          <p className="text-lg text-neutral-600 leading-relaxed font-barlow">
            Prestadores de serviços locais que transformaram seus negócios com nossa estratégia.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-arco-600" />
                </div>
                
                <div className="text-3xl font-bold text-neutral-900 mb-1 font-arsenal">
                  {stat.number}
                </div>
                
                <h3 className="text-lg font-medium text-neutral-900 mb-2 font-barlow">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-gray-600 font-barlow">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white relative overflow-hidden hover:-translate-y-2">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-8 relative z-10">
                
                {/* Quote Icon with enhanced design */}
                <div className="mb-6 relative">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                    <Quote className="w-6 h-6 text-arco-500 group-hover:text-arco-600 transition-colors duration-300" />
                  </div>
                  <div className="absolute -top-1 -left-1 w-12 h-12 rounded-full border-2 border-blue-200 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed font-barlow">
                  "{testimonial.quote}"
                </blockquote>

                {/* Result Badge */}
                <div className="mb-6">
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {testimonial.result}
                  </Badge>
                </div>

                {/* Metrics */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-500 font-barlow">Antes</div>
                      <div className="text-lg font-bold text-gray-900 font-arsenal">
                        {testimonial.metrics.leadsBefore}
                      </div>
                      <div className="text-xs text-gray-500 font-barlow">leads/mês</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-barlow">Depois</div>
                      <div className="text-lg font-bold text-green-600 font-arsenal">
                        {testimonial.metrics.leadsAfter}
                      </div>
                      <div className="text-xs text-gray-500 font-barlow">leads/mês</div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-xs text-gray-500 font-barlow">Taxa de conversão</div>
                    <div className="text-sm font-bold text-blue-600 font-arsenal">
                      {testimonial.metrics.conversionRate}
                    </div>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold font-arsenal">
                    {testimonial.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 font-barlow">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 font-barlow">
                      {testimonial.company}
                    </div>
                    <div className="text-xs text-gray-500 font-barlow">
                      {testimonial.service} • {testimonial.location}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-normal uppercase mb-4 text-gray-900 font-arsenal">
            Seja o próximo caso de sucesso
          </h3>
          <p className="text-gray-600 mb-6 font-barlow">
            Mais de 200 prestadores de serviços já aumentaram seus leads conosco
          </p>
          <Badge variant="outline" className="border-blue-200 text-blue-700">
            Resultados garantidos em 30 dias ou devolvemos seu dinheiro
          </Badge>
        </div>

      </Container>
    </section>
  );
}