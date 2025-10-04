'use client';

/**
 * TRUST & SOCIAL PROOF SECTION
 * Advanced testimonials, stats, and credibility indicators
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  CheckCircle2,
  Shield,
  Zap,
  Target,
  Award,
  TrendingUp,
  Users,
  Star,
  Quote,
  Building2,
  Clock,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const TrustSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const trustFactors = [
    {
      icon: Shield,
      title: "100% Gratuito",
      description: "Análise completa sem custos ocultos ou compromissos. Zero investimento inicial.",
      highlight: "Sem cartão de crédito",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Clock,
      title: "Resposta em 24h",
      description: "Diagnóstico personalizado entregue diretamente no seu e-mail em até 24 horas úteis.",
      highlight: "Garantido",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Target,
      title: "Análise Profunda",
      description: "Avaliação completa de posicionamento, conversão e oportunidades de crescimento.",
      highlight: "Metodologia comprovada",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Zap,
      title: "Sem Obrigação",
      description: "Receba insights valiosos sem pressão comercial ou contratos vinculantes.",
      highlight: "Total liberdade",
      color: "from-orange-500 to-red-600"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Roberto Almeida",
      role: "Cirurgião Plástico",
      company: "Clínica Almeida Estética",
      content: "Em 45 dias, saímos de 12 leads mensais para 87 leads qualificados. O ROI foi de 680% no primeiro trimestre. A metodologia é cirúrgica e os resultados são mensuráveis.",
      avatar: "RA",
      stats: { leads: "+625%", roi: "680%" },
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Dra. Mariana Costa",
      role: "Advogada Especialista",
      company: "Costa & Associados",
      content: "Transformamos nosso escritório. De 8 consultas/mês para 43 consultas qualificadas. O ticket médio aumentou 40% e a taxa de conversão subiu de 15% para 62%.",
      avatar: "MC",
      stats: { leads: "+437%", conversion: "62%" },
      color: "from-purple-500 to-pink-600"
    },
    {
      name: "Carlos Eduardo Silva",
      role: "Consultor Empresarial",
      company: "Silva Business Solutions",
      content: "Resultados desde a primeira semana. Leads qualificados aumentaram 380% e fechamos 4 contratos enterprise no primeiro mês. Sistema escalável e previsível.",
      avatar: "CS",
      stats: { leads: "+380%", contracts: "4 enterprise" },
      color: "from-green-500 to-emerald-600"
    }
  ];

  const certifications = [
    { icon: Award, label: "Google Partner Certificado" },
    { icon: Shield, label: "ISO 27001 Compliance" },
    { icon: Star, label: "4.9/5 Satisfação Cliente" },
    { icon: Users, label: "+127 Clientes Ativos" },
  ];

  return (
    <section 
      ref={ref}
      className="py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge className="mb-6 px-5 py-2 bg-blue-500/20 text-blue-300 border-blue-500/50">
            <Shield className="w-4 h-4 mr-2" />
            Compromisso com Excelência
          </Badge>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Metodologia Comprovada,
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Resultados Garantidos
            </span>
          </h2>

          <p className="text-xl text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
            Mais de 127 prestadores de serviços já transformaram seus negócios 
            com nossa metodologia. Veja os resultados reais.
          </p>
        </motion.div>

        {/* Trust Factors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {trustFactors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card 
                className="h-full border-2 border-white/10 group hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                }}
              >
                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${factor.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <CardContent className="p-6 text-center relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${factor.color} flex items-center justify-center shadow-lg`}
                    style={{
                      boxShadow: '0 10px 30px rgba(59,130,246,0.3)'
                    }}
                  >
                    <factor.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {factor.title}
                  </h3>

                  <p className="text-sm text-blue-200/70 mb-3 leading-relaxed">
                    {factor.description}
                  </p>

                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                    {factor.highlight}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              Casos de Sucesso Reais
            </h3>
            <p className="text-lg text-blue-200/70">
              Prestadores de serviços que escalaram seus negócios conosco
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onHoverStart={() => setActiveTestimonial(index)}
              >
                <Card 
                  className={`h-full border-2 transition-all duration-300 relative overflow-hidden ${
                    activeTestimonial === index 
                      ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20' 
                      : 'border-white/10'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 ${
                    activeTestimonial === index ? 'opacity-10' : ''
                  } transition-opacity duration-300`} />
                  
                  <CardContent className="p-8 relative z-10">
                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 text-blue-400/30 mb-4" />

                    {/* Testimonial Content */}
                    <p className="text-blue-100 leading-relaxed mb-6 text-base">
                      "{testimonial.content}"
                    </p>

                    {/* Stats */}
                    <div className="flex gap-4 mb-6">
                      {Object.entries(testimonial.stats).map(([key, value], i) => (
                        <div key={i} className="flex-1 text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <div className="text-2xl font-black text-blue-400">{value}</div>
                          <div className="text-xs text-blue-300/70 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                      <div 
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-white">{testimonial.name}</div>
                        <div className="text-sm text-blue-300/70">{testimonial.role}</div>
                        <div className="text-xs text-blue-400/60 flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, y: -3 }}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <cert.icon className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-blue-100">{cert.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <Badge 
            className="px-6 py-3 text-base font-bold"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(168,85,247,0.2) 100%)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(59,130,246,0.5)',
              boxShadow: '0 8px 32px rgba(59,130,246,0.3)'
            }}
          >
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-blue-100">Junte-se a mais de 127 empresas que já cresceram conosco</span>
          </Badge>
        </motion.div>
      </div>
    </section>
  );
};
