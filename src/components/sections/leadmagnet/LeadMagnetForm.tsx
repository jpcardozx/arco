'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { 
  User, 
  Mail, 
  Building2, 
  Phone, 
  Download, 
  CheckCircle2, 
  Loader2,
  Lock,
  Shield,
  ArrowRight,
  TrendingUp,
  Target
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/primitives/Container/Container';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn, designTokens } from '@/design-system/tokens';

const leadMagnetSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().min(2, 'Nome da empresa deve ter pelo menos 2 caracteres'),
  phone: z.string().optional(),
});

type LeadMagnetFormData = z.infer<typeof leadMagnetSchema>;

const benefits = [
  { icon: Target, text: '15 pontos críticos de otimização' },
  { icon: TrendingUp, text: 'Benchmarks de conversão do seu setor' },
  { icon: CheckCircle2, text: 'Planilha de autoavaliação guiada' },
  { icon: ArrowRight, text: 'Guia de priorização de melhorias' },
];

// Loading steps for meaningful sequence
const loadingSteps = [
  { icon: Shield, text: 'Verificando email...', duration: 800 },
  { icon: Download, text: 'Gerando PDF personalizado...', duration: 1200 },
  { icon: Mail, text: 'Enviando para sua caixa...', duration: 600 },
];

export function LeadMagnetForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const form = useForm<LeadMagnetFormData>({
    resolver: zodResolver(leadMagnetSchema),
    defaultValues: { name: '', email: '', company: '', phone: '' },
  });

  const onSubmit = async (data: LeadMagnetFormData) => {
    setIsSubmitting(true);
    setLoadingStep(0);
    
    try {
      // Simulate loading steps for better UX
      for (let i = 0; i < loadingSteps.length; i++) {
        setLoadingStep(i);
        await new Promise(resolve => setTimeout(resolve, loadingSteps[i].duration));
      }
      
      const response = await fetch('/api/lead-magnet', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error('Falha no envio');
      setIsSuccess(true);
      toast.success('Checklist enviado para seu email!');
      form.reset();
    } catch (error) {
      toast.error('Erro ao enviar formulário');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 15%, #1a1a1a 35%, #1f1f1f 55%, #171717 75%, #0a0a0a 100%)` }} />
        <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)` }} />
      </div>

      <Container size="xl" className="relative z-10">
        <Card className="relative overflow-hidden border border-white/10 bg-slate-800/50 backdrop-blur-lg shadow-2xl">
          <div className="grid lg:grid-cols-2">
            {/* Left Column: Benefits */}
            <div className="p-8 md:p-12 border-r border-white/10">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">O que você vai dominar:</h2>
                <p className="text-slate-300 text-lg mb-8">Este não é um material genérico. É um guia prático para transformar seu funil em uma máquina de resultados.</p>
                <div className="space-y-6">
                  {benefits.map((item, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * (index + 1), duration: 0.5 }} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-teal-500/10 flex-shrink-0">
                        <item.icon className="h-5 w-5 text-teal-400" />
                      </div>
                      <span className="text-slate-200 text-lg pt-1">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-white">Acesso Imediato</h2>
                      <p className="text-slate-400">Preencha e receba o material em seu email.</p>
                    </div>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                                <Input {...field} placeholder="Nome Completo *" className="pl-11 h-12 bg-white/5 border-white/10 text-white focus:border-teal-400 focus:ring-teal-400" disabled={isSubmitting} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                                <Input {...field} type="email" placeholder="Email Profissional *" className="pl-11 h-12 bg-white/5 border-white/10 text-white focus:border-teal-400 focus:ring-teal-400" disabled={isSubmitting} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="company" render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                                <Input {...field} placeholder="Empresa *" className="pl-11 h-12 bg-white/5 border-white/10 text-white focus:border-teal-400 focus:ring-teal-400" disabled={isSubmitting} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <div className="pt-4">
                          <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg font-semibold shadow-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                            {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
                            {isSubmitting ? 'Enviando...' : 'Baixar Checklist Gratuito'}
                          </Button>
                        </div>
                        
                        {/* Loading Sequence Meaningful */}
                        <AnimatePresence>
                          {isSubmitting && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 overflow-hidden"
                            >
                              <div className="space-y-3 rounded-xl bg-white/5 p-4 border border-white/10">
                                {loadingSteps.map((step, i) => {
                                  const StepIcon = step.icon;
                                  return (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: loadingStep >= i ? 1 : 0.3, x: 0 }}
                                      transition={{ delay: i * 0.2 }}
                                      className="flex items-center gap-3 text-sm"
                                    >
                                      <StepIcon className="w-4 h-4 flex-shrink-0 text-teal-400" />
                                      <span className={cn(
                                        "flex-1",
                                        loadingStep === i && "text-white font-medium",
                                        loadingStep > i && "text-slate-400",
                                        loadingStep < i && "text-slate-500"
                                      )}>
                                        {step.text}
                                      </span>
                                      {loadingStep === i && <Loader2 className="w-4 h-4 animate-spin text-teal-400" />}
                                      {loadingStep > i && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <div className="flex items-center justify-center gap-2 pt-2 text-sm text-slate-500">
                          <Lock className="h-4 w-4" />
                          <span>Seus dados estão seguros.</span>
                        </div>
                      </form>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600">
                      <CheckCircle2 className="h-12 w-12 text-white" />
                    </motion.div>
                    <h3 className="mb-3 text-3xl font-bold text-white">Checklist Enviado! 🎉</h3>
                    <p className="mb-6 text-lg text-slate-300">Verifique seu email agora para acessar o material completo.</p>
                    <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
                      <Shield className="mx-auto mb-3 h-8 w-8 text-teal-400" />
                      <p className="text-sm text-slate-300">
                        <strong>Próximo passo:</strong> Agende um <a href="/contato" className="font-semibold text-teal-400 hover:text-teal-300 underline">diagnóstico gratuito</a> para aplicar o checklist na prática.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}