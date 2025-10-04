/**
 * ObjectionHandlingFAQ - Professional Objection Resolution
 * Institutional tone, structured responses, credibility-focused
 * Focus: Remove barriers systematically, not casually
 */
'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  DollarSign,
  Clock,
  Shield,
  TrendingUp,
  FileCheck,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/primitives/Container/Container';
import { cn } from '@/design-system/tokens';

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

interface Question {
  q: string;
  a: string;
}

interface Category {
  title: string;
  icon: typeof Search | typeof DollarSign | typeof Clock | typeof Shield | typeof FileCheck | typeof MessageCircle;
  color: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  questions: Question[];
}

export function ObjectionHandlingFAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItem, setOpenItem] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Institutional objection categories
  const categories = useMemo<Category[]>(() => [
    {
      title: 'Investimento & Viabilidade Financeira',
      icon: DollarSign,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-600',
      questions: [
        {
          q: 'Como é estruturado o modelo de investimento?',
          a: 'Trabalhamos com percentual variável entre 8% e 15% sobre o lucro incremental estimado (LIE), com teto máximo de 1,8x o valor do pró-labore para garantir alinhamento sustentável de interesses. A primeira consulta estratégica é gratuita e inclui projeção detalhada de ROI para validação de viabilidade antes de qualquer compromisso contratual.'
        },
        {
          q: 'Existem garantias contratuais de resultado?',
          a: 'Oferecemos garantia de 60 dias com métricas específicas acordadas em contrato (CPA máximo, volume mínimo de leads qualificados, ROI mínimo). Caso as metas não sejam atingidas dentro do período, o cliente pode rescindir sem custos adicionais. Histórico: 94% dos clientes renovam após primeiro trimestre.'
        },
        {
          q: 'Qual o investimento mínimo para iniciar operação?',
          a: 'Investimento inicial compreende: (1) Budget em mídia paga (€1.500-3.000/mês recomendado para prestadores de serviço local), (2) Fee de gestão (calculado sobre performance), (3) Setup técnico (incluso no primeiro mês). Investimento total médio: €2.500-5.000/mês nos primeiros 90 dias.'
        }
      ]
    },
    {
      title: 'Cronograma & Prazos de Implementação',
      icon: Clock,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      questions: [
        {
          q: 'Qual o prazo para início de operação após aprovação?',
          a: 'Kick-off em até 48 horas após assinatura contratual. Setup completo (landing page, campanhas Google Ads, tracking, analytics) em 72 horas. Primeiros leads qualificados esperados em 48-96h após ativação das campanhas, dependendo do volume de busca do mercado local.'
        },
        {
          q: 'Quanto tempo de dedicação é necessário da equipe interna?',
          a: 'Setup inicial: 2 horas para briefing estratégico e alinhamento de processos. Operação contínua: 30 minutos quinzenais para reuniões de revisão de métricas. Todo o operacional de campanhas, otimização e reporting é executado pela ARCO sem necessidade de envolvimento diário do cliente.'
        },
        {
          q: 'Qual o prazo mínimo de contrato recomendado?',
          a: 'Recomendamos mínimo de 90 dias para validação completa da metodologia e otimização de performance. Primeiros 60 dias são cobertos por garantia. Após período inicial, renovação mensal sem fidelização obrigatória, com aviso prévio de 30 dias para rescisão.'
        }
      ]
    },
    {
      title: 'Processo & Metodologia',
      icon: FileCheck,
      color: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      questions: [
        {
          q: 'Como funciona o processo de diagnóstico preliminar?',
          a: 'Diagnóstico em 4 etapas: (1) Análise competitiva do mercado local, (2) Benchmark de volume de busca e CPA médio do setor, (3) Auditoria de presença digital atual, (4) Projeção de ROI com cenários conservador, realista e otimista. Entrega em formato de relatório executivo em até 48h após consulta inicial.'
        },
        {
          q: 'Quais métricas são acompanhadas e reportadas?',
          a: 'Dashboard em tempo real com: (1) Volume e qualidade de leads (scoring automatizado), (2) CPA (Custo por Aquisição), (3) Taxa de conversão em cada etapa do funil, (4) ROI consolidado, (5) LTV (Lifetime Value) projetado. Relatórios semanais automatizados + reuniões quinzenais de análise estratégica.'
        },
        {
          q: 'Como garantem a qualidade dos leads entregues?',
          a: 'Sistema de scoring em 4 critérios: (1) Geografia adequada (raio de atendimento), (2) Horário viável de contato, (3) Serviço específico identificado, (4) Urgência/intenção de compra declarada. Leads são pré-qualificados antes de entrar no CRM. Taxa média de qualificação: 68% vs 35-40% do mercado tradicional.'
        }
      ]
    },
    {
      title: 'Continuidade & Suporte Operacional',
      icon: Shield,
      color: 'text-teal-700',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      iconColor: 'text-teal-600',
      questions: [
        {
          q: 'Como é estruturado o suporte pós-implantação?',
          a: 'Suporte em 3 camadas: (1) Gestor dedicado com contato direto via WhatsApp Business (resposta em até 2h úteis), (2) Reuniões quinzenais de 45min para revisão estratégica, (3) Dashboard 24/7 com dados em tempo real. Operação 80% automatizada garante continuidade mesmo em feriados ou imprevistos.'
        },
        {
          q: 'Quais são as condições de rescisão contratual?',
          a: 'Primeiros 60 dias: rescisão sem custos se metas não forem atingidas. Após período de garantia: aviso prévio de 30 dias, sem multas rescisórias. Cliente mantém propriedade total de todos os ativos criados (campanhas, landing pages, dados, relatórios). Transição assistida sem custos adicionais.'
        },
        {
          q: 'Como lidam com escalonamento de volume acima do previsto?',
          a: 'Infraestrutura preparada para crescimento exponencial. Já entregamos 340 leads qualificados/mês para reforma premium (ticket €25k). Escalonamento é via aumento de budget em mídia paga, sem necessidade de expansão de equipe. Limitação típica não é nossa capacidade operacional, mas capacidade do time comercial do cliente processar volume.'
        }
      ]
    }
  ], []);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    if (!debouncedSearch.trim()) return categories;

    return categories
      .map(category => ({
        ...category,
        questions: category.questions.filter(
          q =>
            q.q.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            q.a.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      }))
      .filter(category => category.questions.length > 0);
  }, [categories, debouncedSearch]);

  const totalResults = useMemo(
    () => filteredCategories.reduce((acc, cat) => acc + cat.questions.length, 0),
    [filteredCategories]
  );

  const handleToggle = useCallback((itemId: string) => {
    setOpenItem(prev => prev === itemId ? null : itemId);
  }, []);

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-32">
      <Container size="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <Badge className="mb-6 border-slate-300 bg-white px-4 py-2 text-slate-700 shadow-sm">
            Esclarecimentos Técnicos
          </Badge>

          <h2 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            Dúvidas{' '}
            <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Frequentes
            </span>
          </h2>

          <p className="text-xl leading-relaxed text-slate-600">
            Respostas detalhadas sobre investimento, cronograma, metodologia e suporte operacional.
            Transparência completa em cada aspecto do processo.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Buscar questão específica..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-14 border-slate-200 bg-white pl-12 pr-20 shadow-sm focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
            {debouncedSearch && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700"
              >
                {totalResults}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Categories */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, categoryIndex) => {
                const CategoryIcon = category.icon;

                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="space-y-4"
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-4">
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", category.bgColor)}>
                        <CategoryIcon className={cn("h-6 w-6", category.iconColor)} />
                      </div>
                      <h3 className={cn("text-2xl font-bold", category.color)}>
                        {category.title}
                      </h3>
                    </div>

                    {/* Questions */}
                    <div className="space-y-3">
                      {category.questions.map((question, qIndex) => {
                        const itemId = `${categoryIndex}-${qIndex}`;
                        const isOpen = openItem === itemId;

                        return (
                          <motion.div
                            key={qIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: qIndex * 0.05 }}
                          >
                            <Card className={cn(
                              "overflow-hidden border-2 bg-white transition-all hover:shadow-lg",
                              category.borderColor,
                              isOpen && `${category.bgColor} shadow-xl`
                            )}>
                              <CardContent className="p-0">
                                {/* Question */}
                                <button
                                  onClick={() => handleToggle(itemId)}
                                  className="flex w-full items-start gap-4 p-6 text-left"
                                >
                                  <div className="flex-1">
                                    <h4 className="pr-8 text-lg font-bold leading-tight text-slate-900">
                                      {question.q}
                                    </h4>
                                  </div>

                                  <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                  >
                                    <ChevronDown className={cn("h-6 w-6", category.iconColor)} />
                                  </motion.div>
                                </button>

                                {/* Answer */}
                                <AnimatePresence>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="border-t-2 px-6 pb-6 pt-5" style={{ borderColor: `var(--${category.borderColor})` }}>
                                        <p className="leading-relaxed text-slate-700">
                                          {question.a}
                                        </p>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center"
              >
                <Search className="mx-auto mb-4 h-16 w-16 text-slate-300" />
                <h3 className="mb-2 text-2xl font-bold text-slate-600">
                  Nenhum resultado encontrado
                </h3>
                <p className="mb-6 text-slate-500">
                  Não localizamos essa questão específica
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-sm font-medium text-teal-600 hover:underline"
                >
                  Limpar pesquisa
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Card className="mx-auto max-w-2xl overflow-hidden border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white shadow-xl">
            <CardContent className="p-10">
              <MessageCircle className="mx-auto mb-4 h-12 w-12 text-teal-600" />
              <h3 className="mb-3 text-2xl font-bold text-slate-900">
                Não encontrou a resposta?
              </h3>
              <p className="mb-6 text-slate-600">
                Nossa equipe responde questões específicas em até 2 horas úteis via canal de sua preferência.
              </p>
              <button className="rounded-lg bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                Entrar em contato
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
