/**
 * VARIATION COMPONENTS - Reduce repetition across pages
 * Professional, neutral design variations for common sections
 * 
 * STRATEGY:
 * - Different visual styles for same content type
 * - Context-specific messaging
 * - Reduced cognitive load
 * - Professional, trustworthy aesthetic
 */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/primitives/Container/Container'
import { TrendingUp, ArrowRight, Users, Target, CheckCircle, Star, Quote } from 'lucide-react'

// ============================================================================
// MINIMAL CASE STUDY - For pages where space/attention is limited
// ============================================================================

interface MinimalCaseProps {
  title?: string;
  showButton?: boolean;
  variant?: 'compact' | 'inline' | 'sidebar';
}

export function MinimalCaseStudy({ 
  title = "Resultados Comprovados", 
  showButton = true,
  variant = 'compact' 
}: MinimalCaseProps) {
  const compactCases = [
    {
      industry: "Emergências",
      result: "+247% leads",
      time: "6 meses",
      highlight: "R$ 67K/mês"
    },
    {
      industry: "Auto Rápido", 
      result: "+236% leads",
      time: "4 meses",
      highlight: "R$ 44K/mês"
    },
    {
      industry: "Casa & Reformas",
      result: "+189% leads", 
      time: "5 meses",
      highlight: "R$ 52K/mês"
    }
  ];

  if (variant === 'inline') {
    return (
      <div className="bg-gray-50 py-8 my-12">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">Casos Reais</Badge>
              <p className="text-sm text-gray-600">
                47+ clientes • +200% média de crescimento
              </p>
            </div>
            {showButton && (
              <Button variant="outline" size="sm">
                Ver Cases <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </Container>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <Card className="bg-gradient-to-b from-gray-50 to-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {compactCases.map((case_item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{case_item.industry}</span>
              <span className="font-semibold text-green-600">{case_item.result}</span>
            </div>
          ))}
          {showButton && (
            <Button variant="ghost" size="sm" className="w-full mt-4">
              Detalhes Completos
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="py-12">
      <Container>
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">{title}</Badge>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Crescimento Médio de +200%
          </h3>
          <p className="text-gray-600">Resultados em 6 meses ou menos</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {compactCases.map((case_item, idx) => (
            <Card key={idx} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {case_item.result}
                </div>
                <div className="text-gray-900 font-medium mb-1">
                  {case_item.industry}
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  {case_item.time}
                </div>
                <Badge variant="outline" className="text-xs">
                  {case_item.highlight}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {showButton && (
          <div className="text-center mt-8">
            <Button>
              Ver Casos Detalhados <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

// ============================================================================
// TESTIMONIAL VARIATIONS - Different styles for different contexts
// ============================================================================

interface TestimonialVariationProps {
  variant?: 'minimal' | 'featured' | 'sidebar' | 'inline';
  count?: number;
}

export function TestimonialVariation({ 
  variant = 'minimal',
  count = 3 
}: TestimonialVariationProps) {
  const testimonials = [
    {
      text: "Resultado impressionante. R$ 65K mensais a mais só com otimização.",
      author: "Carlos Silva",
      role: "TechCorp",
      rating: 5
    },
    {
      text: "ROI de 300% em 2 meses. Superou todas as expectativas.",
      author: "Roberto Lima", 
      role: "MegaRetail",
      rating: 5
    },
    {
      text: "Profissionais excepcionais. Processo transparente e resultados claros.",
      author: "Ana Costa",
      role: "HealthTech",
      rating: 5
    }
  ];

  if (variant === 'inline') {
    return (
      <div className="bg-white border-l-4 border-green-500 p-4 my-8">
        <div className="flex items-start">
          <Quote className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
          <div>
            <p className="text-gray-700 mb-2">"{testimonials[0].text}"</p>
            <div className="text-sm text-gray-500">
              — {testimonials[0].author}, {testimonials[0].role}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <CardTitle className="text-lg">Cliente Satisfeito</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <blockquote className="text-sm italic text-gray-700 mb-3">
            "{testimonials[0].text}"
          </blockquote>
          <div className="text-xs text-gray-500">
            — {testimonials[0].author}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Depoimentos</Badge>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              O Que Nossos Clientes Dizem
            </h3>
            <div className="flex justify-center items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
              ))}
              <span className="text-gray-600 ml-2">4.9/5 • 47+ avaliações</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.slice(0, count).map((testimonial, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-medium text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Minimal variant
  return (
    <div className="py-8">
      <Container>
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Cliente Verificado</span>
          </div>
          <blockquote className="text-gray-700 mb-3">
            "{testimonials[0].text}"
          </blockquote>
          <div className="text-sm text-gray-600">
            — {testimonials[0].author}, {testimonials[0].role}
          </div>
        </div>
      </Container>
    </div>
  );
}

// ============================================================================
// CTA VARIATIONS - Context-specific call-to-actions
// ============================================================================

interface CtaVariationProps {
  variant?: 'urgent' | 'professional' | 'minimal' | 'educational';
  context?: 'homepage' | 'methodology' | 'contact' | 'demo' | 'services';
}

export function CtaVariation({ 
  variant = 'professional',
  context = 'homepage' 
}: CtaVariationProps) {
  const ctaContent = {
    homepage: {
      title: "Pronto para Aumentar Seus Leads?",
      subtitle: "Análise gratuita do seu negócio em 24h",
      primaryText: "Solicitar Análise Gratuita",
      secondaryText: "Ver Casos de Sucesso"
    },
    methodology: {
      title: "Entendeu a Metodologia?",
      subtitle: "Veja como aplicamos na prática no seu negócio",
      primaryText: "Agendar Consultoria",
      secondaryText: "Falar com Especialista"
    },
    contact: {
      title: "Vamos Conversar?",
      subtitle: "Resposta garantida em até 2 horas",
      primaryText: "Enviar Mensagem",
      secondaryText: "WhatsApp Direto"
    },
    demo: {
      title: "Quer Resultados Similares?",
      subtitle: "Descubra o potencial do seu negócio",
      primaryText: "Análise do Meu Negócio",
      secondaryText: "Agendar Demonstração"
    },
    services: {
      title: "Qual Pacote é Ideal para Você?",
      subtitle: "Consultoria gratuita para escolher a melhor opção",
      primaryText: "Consultoria Gratuita",
      secondaryText: "Comparar Pacotes"
    }
  };

  const content = ctaContent[context];

  if (variant === 'minimal') {
    return (
      <div className="py-8 text-center">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {content.title}
            </h3>
            <Button size="lg">
              {content.primaryText}
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  if (variant === 'urgent') {
    return (
      <section className="py-16 bg-red-600 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-white text-red-600">
              Oferta Limitada
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              ⏱️ Últimas 48 Horas para Análise Gratuita
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Apenas 5 vagas restantes para análise completa sem custo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                {content.primaryText}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                {content.secondaryText}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (variant === 'educational') {
    return (
      <section className="py-16 bg-blue-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">Próximo Passo</Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {content.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {content.subtitle}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Análise técnica completa</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Relatório personalizado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Sem compromisso</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Button size="lg" className="mb-4">
                  {content.primaryText}
                </Button>
                <p className="text-sm text-gray-500">
                  ou {content.secondaryText.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Professional variant (default)
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              {content.primaryText}
            </Button>
            <Button size="lg" variant="outline">
              {content.secondaryText}
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ✓ Sem compromisso ✓ Resposta em 24h ✓ 100% gratuito
          </p>
        </div>
      </Container>
    </section>
  );
}