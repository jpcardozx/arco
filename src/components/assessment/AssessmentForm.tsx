'use client';

/**
 * ASSESSMENT FORM - MULTI-STEP WITH ADVANCED UX
 * Progressive disclosure, validation, and micro-interactions
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Mail,
  Building2,
  Globe,
  Users,
  Target,
  BarChart3,
  TrendingUp,
  Sparkles,
  Zap,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  businessType: string;
  currentLeads: string;
  desiredLeads: string;
  currentRevenue: string;
  challenges: string;
}

interface FormErrors {
  [key: string]: string;
}

export const AssessmentForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    businessType: '',
    currentLeads: '',
    desiredLeads: '',
    currentRevenue: '',
    challenges: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const totalSteps = 3;

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
      if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido';
      if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    }

    if (currentStep === 2) {
      if (!formData.company.trim()) newErrors.company = 'Nome da empresa é obrigatório';
      if (!formData.businessType.trim()) newErrors.businessType = 'Tipo de serviço é obrigatório';
    }

    if (currentStep === 3) {
      if (!formData.currentLeads.trim()) newErrors.currentLeads = 'Campo obrigatório';
      if (!formData.desiredLeads.trim()) newErrors.desiredLeads = 'Campo obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Show success state or redirect
  };

  const calculateGrowthProjection = () => {
    const current = parseInt(formData.currentLeads) || 0;
    const desired = parseInt(formData.desiredLeads) || 0;
    
    if (current === 0 || desired === 0) return null;
    
    const growth = ((desired - current) / current) * 100;
    const potentialRevenue = (desired - current) * 500; // Assuming R$500 per lead value
    
    return { growth: Math.round(growth), potentialRevenue };
  };

  const projection = calculateGrowthProjection();

  // Form field configuration
  const formFields = {
    step1: [
      {
        id: 'name',
        label: 'Nome Completo',
        placeholder: 'João Silva',
        type: 'text',
        icon: Users,
        required: true
      },
      {
        id: 'email',
        label: 'E-mail Profissional',
        placeholder: 'joao@empresa.com.br',
        type: 'email',
        icon: Mail,
        required: true
      },
      {
        id: 'phone',
        label: 'Telefone / WhatsApp',
        placeholder: '(11) 99999-9999',
        type: 'tel',
        icon: Phone,
        required: true
      }
    ],
    step2: [
      {
        id: 'company',
        label: 'Nome da Empresa',
        placeholder: 'Empresa Ltda',
        type: 'text',
        icon: Building2,
        required: true
      },
      {
        id: 'website',
        label: 'Website (opcional)',
        placeholder: 'www.empresa.com.br',
        type: 'url',
        icon: Globe,
        required: false
      },
      {
        id: 'businessType',
        label: 'Segmento de Atuação',
        placeholder: 'Ex: Advocacia, Consultoria, Medicina...',
        type: 'text',
        icon: Target,
        required: true
      }
    ],
    step3: [
      {
        id: 'currentLeads',
        label: 'Leads Mensais Atuais',
        placeholder: '20',
        type: 'number',
        icon: BarChart3,
        required: true
      },
      {
        id: 'desiredLeads',
        label: 'Meta de Leads Mensais',
        placeholder: '100',
        type: 'number',
        icon: TrendingUp,
        required: true
      },
      {
        id: 'currentRevenue',
        label: 'Faturamento Mensal Aproximado (opcional)',
        placeholder: 'R$ 50.000',
        type: 'text',
        icon: BarChart3,
        required: false
      }
    ]
  };

  const getCurrentFields = () => {
    switch(step) {
      case 1: return formFields.step1;
      case 2: return formFields.step2;
      case 3: return formFields.step3;
      default: return [];
    }
  };

  return (
    <section 
      ref={ref}
      className="py-32 bg-gradient-to-b from-slate-950 via-blue-950/50 to-slate-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 px-5 py-2 bg-blue-500/20 text-blue-300 border-blue-500/50">
                <Sparkles className="w-4 h-4 mr-2" />
                Processo Rápido e Seguro
              </Badge>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Receba Seu Diagnóstico
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Personalizado
              </span>
            </h2>
            
            <p className="text-xl text-blue-200/80 max-w-2xl mx-auto">
              Preencha as informações abaixo e nossa equipe irá preparar uma análise 
              estratégica completa do potencial do seu negócio.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center flex-1">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 relative ${
                      step >= num 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50' 
                        : 'bg-slate-800 text-slate-500 border-2 border-slate-700'
                    }`}
                    animate={{ 
                      scale: step === num ? 1.1 : 1,
                    }}
                    whileHover={{ scale: 1.15 }}
                  >
                    {step > num ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      num
                    )}
                    
                    {/* Active Step Pulse */}
                    {step === num && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-blue-500"
                        animate={{
                          scale: [1, 1.5],
                          opacity: [0.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </motion.div>
                  
                  {num < 3 && (
                    <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${
                      step > num 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
                        : 'bg-slate-800'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-blue-300 font-semibold text-lg">
                Etapa {step} de {totalSteps}
                <span className="text-blue-400/60 ml-2">
                  ({Math.round((step / totalSteps) * 100)}% completo)
                </span>
              </p>
            </div>
          </div>

          {/* Form Card */}
          <Card 
            className="border-2 border-white/10 shadow-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
            }}
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
            
            <CardHeader className="text-center pb-8 relative z-10">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                {step === 1 && "Informações de Contato"}
                {step === 2 && "Sobre Seu Negócio"}
                {step === 3 && "Objetivos e Situação Atual"}
              </CardTitle>
              <CardDescription className="text-lg text-blue-200/70">
                {step === 1 && "Como podemos entrar em contato com você"}
                {step === 2 && "Entenda melhor seu contexto empresarial"}
                {step === 3 && "Defina suas metas e expectativas"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {getCurrentFields().map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label 
                        htmlFor={field.id} 
                        className="text-sm font-bold text-blue-100 flex items-center gap-2"
                      >
                        {field.label}
                        {field.required && <span className="text-red-400">*</span>}
                      </Label>
                      
                      <div className="relative group">
                        <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/60 group-focus-within:text-blue-400 transition-colors" />
                        
                        <Input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.id as keyof FormData]}
                          onChange={(e) => updateField(field.id as keyof FormData, e.target.value)}
                          className={`pl-14 h-14 text-base bg-slate-900/50 border-2 transition-all duration-300 text-white placeholder:text-slate-500 ${
                            errors[field.id]
                              ? 'border-red-500/50 focus:border-red-500'
                              : 'border-slate-700 focus:border-blue-500 hover:border-slate-600'
                          }`}
                        />
                        
                        {/* Validation Icon */}
                        {formData[field.id as keyof FormData] && !errors[field.id] && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Error Message */}
                      <AnimatePresence>
                        {errors[field.id] && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors[field.id]}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Growth Projection Display */}
                  {step === 3 && projection && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30 relative overflow-hidden"
                    >
                      {/* Background Animation */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <Zap className="w-5 h-5 text-yellow-400" />
                          <p className="text-sm font-bold text-blue-100">
                            Projeção de Crescimento Personalizada:
                          </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                              +{projection.growth}%
                            </p>
                            <p className="text-blue-300 text-sm mt-1">Crescimento em leads</p>
                          </div>
                          
                          <div>
                            <p className="text-3xl font-black text-green-400">
                              +R$ {projection.potentialRevenue.toLocaleString('pt-BR')}
                            </p>
                            <p className="text-blue-300 text-sm mt-1">Potencial de receita mensal</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6">
                {step > 1 && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handlePrevious}
                    className="flex-1 h-14 text-base font-bold bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-white"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Voltar
                  </Button>
                )}
                
                <Button
                  size="lg"
                  onClick={step === totalSteps ? handleSubmit : handleNext}
                  disabled={isSubmitting}
                  className="flex-1 h-14 text-base font-bold relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 50%, #6366f1 100%)',
                    boxShadow: '0 10px 30px rgba(59,130,246,0.4)'
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Processando...
                      </>
                    ) : step === totalSteps ? (
                      <>
                        Receber Diagnóstico
                        <Sparkles className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        Próxima Etapa
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  
                  {/* Shimmer Effect */}
                  {!isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators Below Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-300"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Resposta em 24 horas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Dados protegidos</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
