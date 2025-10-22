'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  FileText,
  Clock,
  ArrowRight,
  ChevronDown,
  AlertCircle,
  Zap,
  Target,
} from 'lucide-react';
import type { Tables } from '@/types/supabase';

type Campaign = Tables<'campaigns'>;

interface SuccessPageClientProps {
  campaign: Partial<Campaign>;
  whatsappNumber: string;
  primaryColor: string;
}

// FAQ component
function FAQItem({
  question,
  answer,
  icon: Icon,
  isOpen,
  onToggle
}: {
  question: string;
  answer: string;
  icon: React.ComponentType<{ className: string }>;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="border border-slate-200 rounded-lg overflow-hidden"
      initial={false}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors text-left"
      >
        <Icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900">{question}</p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden bg-slate-50 border-t border-slate-200"
      >
        <p className="p-4 text-gray-700 text-sm leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export function SuccessPageClient({
  campaign,
  whatsappNumber,
  primaryColor
}: SuccessPageClientProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs = [
    {
      id: 'timeline',
      icon: Clock,
      question: 'O que acontece agora? Qual é o próximo passo?',
      answer: 'Você receberá um guia inicial via WhatsApp mostrando como é o processo do sistema ARCO (quanto custa, quanto tempo leva, e como funciona). Depois, marcamos uma conversa breve (10min) para confirmar se faz sentido para seu negócio — sem pressão, apenas diálogo. Se for sim, iniciamos o processo no início do mês seguinte.'
    },
    {
      id: 'investment',
      icon: Target,
      question: 'Preciso investir em anúncios desde já?',
      answer: 'Não. Os guias que enviamos mostram o que precisa estar pronto (landing page, integrações, públicos). Você investe em anúncios apenas quando tudo estiver testado e validado — normalmente 2-3 semanas após início. Começar caro sem base é desperdício.'
    },
    {
      id: 'results',
      icon: Zap,
      question: 'Quanto tempo até ver resultados?',
      answer: 'Os primeiros clientes chegam normalmente em 7-14 dias, mas em volume baixo (fase de calibragem do algoritmo). A maioria dos dados sólidos aparecem após 3-5 semanas. Se você tem muita pressa por volume alto, este pode não ser o timing ideal — aguardar 2-3 meses é mais estratégico.'
    },
    {
      id: 'commitment',
      icon: AlertCircle,
      question: 'E se não funcionar para mim? Há garantias?',
      answer: 'Não oferecemos garantia de volume porque há muitas variáveis (mercado, posicionamento, ticket, capacidade operacional). Oferecemos transparência: testamos o sistema, você vê os dados, e decide se continua. Se percebermos que não vai funcionar, avisamos cedo — honestidade acima de tudo.'
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      question: 'Perdi a mensagem do WhatsApp. Como recebo o guia?',
      answer: 'Clique no botão "Chamar no WhatsApp" abaixo e peça: "Oi, me inscrevi em uma landing page e gostaria de receber o guia inicial." Reenviamos na hora.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <motion.div
        className="pt-12 pb-8 px-4 text-center border-b border-slate-200/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Tudo pronto!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Recebemos suas informações. Agora vem a parte boa.
          </p>
          <p className="text-sm text-gray-500">
            Verificamos sua região e estamos preparando o guia personalizado para seu negócio.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Immediate Actions */}
        <motion.section
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Próximos minutos</h2>
            <p className="text-gray-600">O que você precisa fazer agora para acelerar o processo:</p>
          </div>

          <motion.div variants={itemVariants} className="mb-4">
            <div
              className="rounded-xl p-6 backdrop-blur-sm border-2 border-blue-200/50"
              style={{ backgroundColor: `${primaryColor}08` }}
            >
              <div className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${primaryColor}20` }}
                >
                  <MessageCircle className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Verifique seu WhatsApp</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Enviamos um guia inicial com: como o sistema funciona, quanto custa, e quanto tempo leva. Deve chegar em alguns segundos.
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Olá! Me inscrevi em "${campaign.name}" e não recebi o guia. Pode reenviar?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    style={{ color: primaryColor }}
                  >
                    Não recebeu? Clique aqui <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-4">
            <div className="rounded-xl p-6 bg-amber-50 border-2 border-amber-200/50">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Salve o contato</h3>
                  <p className="text-sm text-gray-700">
                    Depois que ler o guia, aguarde nosso contato (pode ser hoje ou amanhã). Salvando nosso número, não perde nenhuma mensagem.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="rounded-xl p-6 bg-green-50 border-2 border-green-200/50">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-100">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Prepare as informações</h3>
                  <p className="text-sm text-gray-700">
                    Tenha à mão: fotos dos seus melhores trabalhos, lista de serviços com preços, e uma breve descrição do que você oferece. Facilita a conversa.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Próximas semanas</h2>
            <p className="text-gray-600">Cronograma realista do que esperar:</p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Dia 1-2: Análise inicial',
                description: 'Você recebe guia + marcamos conversa de 10 min. Sem choro, sem drama — apenas conversa de adulto.'
              },
              {
                title: 'Dia 3-7: Decisão',
                description: 'Você decide se quer prosseguir. Se sim, ajustamos contract, você prepara materiais (fotos, descrição, preços).'
              },
              {
                title: 'Semana 2-3: Setup técnico',
                description: 'Construímos landing page, configuramos integrações (WhatsApp, calendário, confirmações). Você testa end-to-end.'
              },
              {
                title: 'Semana 3-4: Calibragem',
                description: 'Iniciamos campanhas em volume baixo. Algoritmos aprendem seu público. Primeiros clientes chegam aqui.'
              },
              {
                title: 'Semana 5+: Otimização',
                description: 'Volume cresce com dados. Custo por cliente cai. Você tem previsibilidade de quanto investir para ganhar X clientes.'
              },
            ].map((phase, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex gap-4 p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{phase.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQs */}
        <motion.section
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Dúvidas comuns</h2>
            <p className="text-gray-600">Respondemos as 5 principais preocupações que você pode ter agora:</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
              >
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  icon={faq.icon}
                  isOpen={expandedFAQ === faq.id}
                  onToggle={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Resources */}
        <motion.section
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recursos & Materiais</h2>
            <p className="text-gray-600">Conteúdo que vai ajudar você a entender melhor:</p>
          </div>

          <motion.div variants={itemVariants} className="p-6 rounded-xl bg-white border border-slate-200">
            <div className="flex gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Guia: Como o Sistema ARCO Funciona</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Explicação passo-a-passo de cada fase, com exemplos reais e expectativas realistas.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 ml-14">
              Enviado via WhatsApp — acompanha o primeiro guia que você recebeu.
            </p>
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-3">Pronto para conversar?</h2>
          <p className="text-blue-100 mb-6">
            Se tiver dúvidas sobre o guia ou quiser começar logo, é só chamar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Oi! Recebi o guia e gostaria de iniciar o processo.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chamar no WhatsApp
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors border border-blue-500"
            >
              Voltar ao site
            </a>
          </div>
        </motion.section>

        {/* Credibility Footer */}
        <motion.div
          className="text-center text-sm text-gray-600 border-t border-slate-200 pt-8"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="mb-2">
            <strong>Sem pressão, sem compromisso.</strong> O guia é para você entender como funciona. Se não for o momento certo, a gente entende — melhor do que forçar.
          </p>
          <p className="text-xs text-gray-500">
            Qualquer dúvida: <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">chame a gente</a>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
