'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Check, ArrowRight, CheckCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import React from "react";

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    value: number;
    feedback?: string;
  }[];
  weight: number;
}

interface Result {
  range: [number, number];
  title: string;
  description: string;
  recommendation: string;
  cta: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  lossEstimate: string;
}

// Dados estratégicos para o diagnóstico
const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: 'pricing_perception',
    text: 'Com que frequência seus clientes potenciais questionam seus preços como sendo "muito altos"?',
    options: [
      {
        id: 'pp1',
        text: 'Raramente ou nunca',
        value: 0,
        feedback: 'Excelente posicionamento de valor',
      },
      {
        id: 'pp2',
        text: 'Ocasionalmente',
        value: 1,
        feedback: 'Alinhamento de valor geralmente bom',
      },
      { id: 'pp3', text: 'Frequentemente', value: 2, feedback: 'Possível desalinhamento de valor' },
      {
        id: 'pp4',
        text: 'Na maioria das interações',
        value: 3,
        feedback: 'Desalinhamento crítico de valor',
      },
    ],
    weight: 1.5,
  },
  {
    id: 'decision_time',
    text: 'Qual é o tempo típico para seus clientes tomarem uma decisão de compra?',
    options: [
      {
        id: 'dt1',
        text: 'Decisão rápida, geralmente na primeira interação',
        value: 0,
        feedback: 'Excelente clareza de valor',
      },
      {
        id: 'dt2',
        text: '1-2 semanas de consideração',
        value: 1,
        feedback: 'Processo de decisão saudável',
      },
      {
        id: 'dt3',
        text: '1-2 meses de consideração',
        value: 2,
        feedback: 'Possível incerteza de valor',
      },
      {
        id: 'dt4',
        text: 'Mais de 2 meses ou frequentes adiamentos',
        value: 3,
        feedback: 'Alta incerteza de valor',
      },
    ],
    weight: 1.2,
  },
  {
    id: 'premium_conversion',
    text: 'Qual a taxa de conversão para seus serviços/produtos premium (de maior valor)?',
    options: [
      {
        id: 'pc1',
        text: 'Alta (>25% dos clientes escolhem premium)',
        value: 0,
        feedback: 'Diferenciação de valor premium excelente',
      },
      {
        id: 'pc2',
        text: 'Moderada (10-25% escolhem premium)',
        value: 1,
        feedback: 'Diferenciação de valor premium adequada',
      },
      {
        id: 'pc3',
        text: 'Baixa (5-10% escolhem premium)',
        value: 2,
        feedback: 'Diferenciação de valor premium fraca',
      },
      {
        id: 'pc4',
        text: 'Muito baixa (<5% escolhem premium)',
        value: 3,
        feedback: 'Diferenciação de valor premium crítica',
      },
    ],
    weight: 1.8,
  },
  {
    id: 'discount_pressure',
    text: 'Com que frequência você precisa oferecer descontos para fechar vendas?',
    options: [
      { id: 'dp1', text: 'Raramente ou nunca', value: 0, feedback: 'Excelente percepção de valor' },
      {
        id: 'dp2',
        text: 'Ocasionalmente em casos específicos',
        value: 1,
        feedback: 'Boa percepção de valor geral',
      },
      {
        id: 'dp3',
        text: 'Frequentemente',
        value: 2,
        feedback: 'Problemas significativos de percepção de valor',
      },
      {
        id: 'dp4',
        text: 'Quase sempre ou sempre',
        value: 3,
        feedback: 'Problema crítico de percepção de valor',
      },
    ],
    weight: 1.4,
  },
  {
    id: 'unique_value',
    text: 'Os clientes conseguem articular claramente o valor único da sua oferta?',
    options: [
      {
        id: 'uv1',
        text: 'Sim, eles explicam nosso valor único com precisão',
        value: 0,
        feedback: 'Comunicação de valor excelente',
      },
      {
        id: 'uv2',
        text: 'Parcialmente, identificam alguns diferenciais',
        value: 1,
        feedback: 'Comunicação de valor adequada',
      },
      {
        id: 'uv3',
        text: 'Raramente, geralmente nos comparam por preço',
        value: 2,
        feedback: 'Comunicação de valor deficiente',
      },
      {
        id: 'uv4',
        text: 'Não, somos vistos como commodity',
        value: 3,
        feedback: 'Falha crítica de comunicação de valor',
      },
    ],
    weight: 1.6,
  },
];

// Resultados baseados na pontuação
const DIAGNOSTIC_RESULTS: Result[] = [
  {
    range: [0, 4],
    title: 'Arquitetura de Decisão Otimizada',
    description:
      'Sua empresa possui um excelente alinhamento simbólico. Sua comunicação de valor está bem calibrada, permitindo decisões financeiras favoráveis e rápidas.',
    recommendation:
      'Mantenha sua estratégia atual e considere refinamentos para aumentar ainda mais a eficiência de conversão premium.',
    cta: 'Descubra como elevar ainda mais seu desempenho',
    urgencyLevel: 'low',
    lossEstimate: '< 10% do potencial de receita',
  },
  {
    range: [5, 10],
    title: 'Arquitetura de Decisão com Oportunidades',
    description:
      'Sua empresa tem um bom alinhamento, mas existem oportunidades significativas para otimização que estão impactando suas métricas financeiras.',
    recommendation:
      'Identifique e corrija os desalinhamentos específicos nas etapas-chave da jornada de decisão do cliente.',
    cta: 'Ver diagnóstico detalhado com pontos de correção',
    urgencyLevel: 'medium',
    lossEstimate: '15-30% of revenue potential',
  },
  {
    range: [11, 18],
    title: 'Compromised Decision Architecture',
    description:
      'Your company is facing significant symbolic misalignments that are causing substantial losses in revenue and perceived value.',
    recommendation:
      'A strategic intervention is necessary to recalibrate your financial decision architecture.',
    cta: 'Schedule priority strategic intervention',
    urgencyLevel: 'high',
    lossEstimate: '30-50% of revenue potential',
  },
  {
    range: [19, 27],
    title: 'Critically Failed Decision Architecture',
    description:
      'Your company is operating with critical misalignments that are causing severe revenue and opportunity losses.',
    recommendation:
      'A complete reconstruction of your financial decision architecture is urgent and necessary.',
    cta: 'Schedule emergency consultation',
    urgencyLevel: 'critical',
    lossEstimate: '> 50% of revenue potential',
  },
];

export default function StrategicDiagnosticTool() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Calcular a pontuação e determinar o resultado
  const calculateResult = () => {
    let totalScore = 0;

    Object.entries(answers).forEach(([questionId, optionId]) => {
      const question = DIAGNOSTIC_QUESTIONS.find(q => q.id === questionId);
      if (!question) return;

      const option = question.options.find(o => o.id === optionId);
      if (!option) return;

      totalScore += option.value * question.weight;
    });

    const roundedScore = Math.round(totalScore);
    setScore(roundedScore);

    const matchedResult = DIAGNOSTIC_RESULTS.find(
      r => roundedScore >= r.range[0] && roundedScore <= r.range[1]
    );

    setResult(matchedResult || DIAGNOSTIC_RESULTS[0]);
  };

  // Quando todas as perguntas são respondidas
  useEffect(() => {
    if (Object.keys(answers).length === DIAGNOSTIC_QUESTIONS.length && !showResults) {
      calculateResult();
      setShowResults(true);
    }
  }, [answers]);

  // Manipular a seleção de resposta
  const handleOptionSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));

    // Avançar para próxima pergunta se não for a última
    if (currentQuestionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 500);
    }
  };

  // Obter feedback para uma resposta selecionada
  const getOptionFeedback = (questionId: string) => {
    const selectedOptionId = answers[questionId];
    if (!selectedOptionId) return null;

    const question = DIAGNOSTIC_QUESTIONS.find(q => q.id === questionId);
    if (!question) return null;

    const option = question.options.find(o => o.id === selectedOptionId);
    return option?.feedback || null;
  };

  // Obter cor baseada no nível de urgência
  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <section id="diagnostic" className="bg-gradient-to-br from-neutral-100 to-white py-20">
      <div className="mx-auto max-w-4xl px-6" ref={containerRef}>
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl text-neutral-900 md:text-4xl">
            Diagnóstico de Arquitetura de Decisão Financeira
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            Descubra exatamente onde sua empresa está perdendo dinheiro devido a desalinhamentos
            simbólicos na jornada de decisão do cliente
          </p>
        </div>

        {!showResults ? (
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
            {/* Progresso */}
            <div className="h-2 bg-neutral-100">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + (Object.keys(answers).length === currentQuestionIndex + 1 ? 1 : 0)) / DIAGNOSTIC_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>

            <div className="p-8 md:p-10">
              {/* Contador de progresso */}
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm text-neutral-500">
                  {currentQuestionIndex + 1} de {DIAGNOSTIC_QUESTIONS.length}
                </span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round(((currentQuestionIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100)}%
                  completo
                </span>
              </div>

              {/* Pergunta atual */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-8">
                    <h3 className="mb-2 text-xl text-neutral-800 md:text-2xl">
                      {DIAGNOSTIC_QUESTIONS[currentQuestionIndex].text}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      Selecione a opção que melhor reflete sua situação atual
                    </p>
                  </div>

                  {/* Opções */}
                  <div className="space-y-3">
                    {DIAGNOSTIC_QUESTIONS[currentQuestionIndex].options.map(option => {
                      const isSelected =
                        answers[DIAGNOSTIC_QUESTIONS[currentQuestionIndex].id] === option.id;
                      const feedback = isSelected
                        ? getOptionFeedback(DIAGNOSTIC_QUESTIONS[currentQuestionIndex].id)
                        : null;

                      return (
                        <div key={option.id}>
                          <button
                            onClick={() =>
                              handleOptionSelect(
                                DIAGNOSTIC_QUESTIONS[currentQuestionIndex].id,
                                option.id
                              )
                            }
                            className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition-all ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50 text-blue-900'
                                : 'border-neutral-300 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                          >
                            <span>{option.text}</span>
                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                                isSelected ? 'bg-blue-600 text-white' : 'bg-neutral-200'
                              }`}
                            >
                              {isSelected && <Check className="h-4 w-4" />}
                            </div>
                          </button>

                          {feedback && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-2 border-l-2 border-blue-300 pl-4"
                            >
                              <p className="py-1 text-sm text-blue-800">{feedback}</p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
          >
            <div className="p-8 md:p-10">
              {/* Resultado do diagnóstico */}
              {result && (
                <>
                  {/* Cabeçalho do resultado */}
                  <div className="mb-10 text-center">
                    <div
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${getUrgencyColor(result.urgencyLevel)} mb-4 text-white`}
                    >
                      {result.urgencyLevel === 'low' ? (
                        <CheckCircle className="h-8 w-8" />
                      ) : (
                        <AlertCircle className="h-8 w-8" />
                      )}
                    </div>

                    <h3 className="mb-3 text-2xl font-medium text-neutral-900 md:text-3xl">
                      {result.title}
                    </h3>

                    <p className="mx-auto mb-4 max-w-lg text-lg text-neutral-600">
                      {result.description}
                    </p>

                    <div className="inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-red-800">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      <span className="font-medium">
                        Perda financeira estimada: {result.lossEstimate}
                      </span>
                    </div>
                  </div>

                  {/* Detalhes e análise */}
                  <div className="mb-10 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
                    <h4 className="mb-4 text-lg font-medium text-neutral-800">
                      Análise Detalhada por Dimensão
                    </h4>

                    <div className="space-y-6">
                      {DIAGNOSTIC_QUESTIONS.map(question => {
                        const answerKey = answers[question.id];
                        if (!answerKey) return null;

                        const selectedOption = question.options.find(o => o.id === answerKey);
                        if (!selectedOption) return null;

                        // Determinar a cor baseada no valor da resposta
                        let statusColor = 'bg-green-500';
                        if (selectedOption.value === 1) statusColor = 'bg-yellow-500';
                        if (selectedOption.value === 2) statusColor = 'bg-orange-500';
                        if (selectedOption.value === 3) statusColor = 'bg-red-500';

                        return (
                          <div key={question.id} className="border-b border-neutral-200 pb-4">
                            <div className="mb-2 flex items-start justify-between">
                              <div>
                                <p className="font-medium text-neutral-800">{question.text}</p>
                                <p className="text-neutral-500">{selectedOption.text}</p>
                              </div>
                              <div className={`mt-1.5 h-3 w-3 rounded-full ${statusColor}`} />
                            </div>
                            {selectedOption.feedback && (
                              <p className="mt-1 text-sm text-neutral-600">
                                {selectedOption.feedback}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recomendação e CTA */}
                  <div className="text-center">
                    <h4 className="mb-3 text-xl font-medium text-neutral-900">
                      Recomendação Estratégica
                    </h4>

                    <p className="mb-8 text-neutral-700">{result.recommendation}</p>

                    <a
                      href="/consult"
                      className="group inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
                    >
                      <span>{result.cta}</span>
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>

                    <p className="mt-4 text-sm text-neutral-500">
                      *Este diagnóstico é baseado em uma análise de mais de 150 casos empresariais e
                      identifica padrões de desalinhamento simbólico
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Observação sobre privacidade e uso dos dados */}
        <div className="mt-6 text-center text-sm text-neutral-500">
          <p>
            Seus dados são confidenciais e não serão compartilhados. Este diagnóstico é gratuito e
            sem compromisso.
          </p>
        </div>
      </div>
    </section>
  );
}
