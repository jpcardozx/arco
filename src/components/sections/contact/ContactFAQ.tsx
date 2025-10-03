/**
 * Contact FAQ - Mobile First Premium Design
 */
'use client';

import { useState } from 'react';
import { Container } from '@/components/primitives/Container/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Clock,
  DollarSign,
  Rocket,
  Shield,
  Zap,
  Users
} from 'lucide-react';

export function ContactFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      icon: Clock,
      category: 'Processo',
      question: 'Qual é o prazo médio para desenvolvimento?',
      answer: 'O prazo varia conforme a complexidade do projeto. Landing pages simples levam 1-2 semanas, sistemas completos podem levar 2-3 meses. Sempre trabalhamos com cronogramas realistas e entregas parciais.',
      popular: true
    },
    {
      icon: DollarSign,
      category: 'Investimento',
      question: 'Como funciona o orçamento e pagamento?',
      answer: 'Oferecemos orçamentos personalizados baseados no escopo do projeto. Trabalhamos com pagamento parcelado: 50% no início, 30% na entrega da primeira versão e 20% na finalização.',
      popular: true
    },
    {
      icon: Rocket,
      category: 'Tecnologia',
      question: 'Quais tecnologias vocês utilizam?',
      answer: 'Utilizamos as tecnologias mais modernas: Next.js, React, TypeScript, Tailwind CSS, Node.js, e integrações com APIs. Sempre escolhemos a melhor stack para cada projeto.',
      popular: false
    },
    {
      icon: Shield,
      category: 'Garantia',
      question: 'Vocês oferecem suporte pós-entrega?',
      answer: 'Sim! Oferecemos 3 meses de suporte gratuito para correções e pequenos ajustes. Também temos planos de manutenção mensal para atualizações e melhorias contínuas.',
      popular: true
    },
    {
      icon: Users,
      category: 'Processo',
      question: 'Como é o processo de desenvolvimento?',
      answer: 'Seguimos um processo estruturado: 1) Briefing detalhado, 2) Prototipagem e design, 3) Desenvolvimento com entregas parciais, 4) Testes e refinamentos, 5) Entrega e treinamento.',
      popular: false
    },
    {
      icon: Zap,
      category: 'Urgência',
      question: 'Fazem projetos urgentes/expressos?',
      answer: 'Sim, oferecemos serviço expresso com sobrepreço de 50%. Para projetos urgentes, priorizamos o cronograma e trabalhamos com equipe dedicada para cumprir prazos apertados.',
      popular: false
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <Container>
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              Perguntas Frequentes
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tire Suas Dúvidas
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Respondemos às perguntas mais comuns sobre nossos serviços. 
              Não encontrou sua resposta? Entre em contato conosco!
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="text-xs px-3 py-1">
                {category}
              </Badge>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              const isOpen = openItems.includes(index);
              
              return (
                <Card 
                  key={index}
                  className="border-0 shadow-lg bg-white/80 dark:bg-black/40 backdrop-blur-sm overflow-hidden transition-all duration-200 hover:shadow-xl"
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <div className="flex items-start gap-4">
                        
                        {/* Icon & Category */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="text-xs">
                                  {faq.category}
                                </Badge>
                                {faq.popular && (
                                  <Badge variant="default" className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {faq.question}
                              </h3>
                              
                              {isOpen && (
                                <div className="text-gray-600 dark:text-gray-300 leading-relaxed animate-in slide-in-from-top-2 duration-200">
                                  {faq.answer}
                                </div>
                              )}
                            </div>
                            
                            {/* Toggle Icon */}
                            <div className="flex-shrink-0 ml-4">
                              {isOpen ? (
                                <ChevronUp className="w-5 h-5 text-gray-500 transition-transform" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500 transition-transform" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2">
                  Não encontrou sua resposta?
                </h3>
                <p className="text-blue-100 mb-6">
                  Nossa equipe está pronta para esclarecer todas as suas dúvidas
                </p>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Falar com Especialista
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}