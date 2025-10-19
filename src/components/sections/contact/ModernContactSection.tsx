/**
 * Modern Contact Section - S-Tier HORIZONTAL Layout
 * Advanced React patterns: Custom hooks, useMemo, useCallback, Intersection Observer
 * Premium glassmorphic background with sophisticated interactions
 */
'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  Sparkles,
  Zap,
  ArrowRight,
  MapPin,
  TrendingUp,
  AlertCircle,
  Loader2,
  CheckCircle2,
  User,
  Building2,
  MessageSquare,
  DollarSign
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Container } from '@/components/primitives/Container/Container';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { cn } from '@/design-system/tokens';

// ============ CUSTOM HOOKS ============

/** Hook para animação de mouse parallax otimizada */
const useMouseParallax = (strength: number = 20) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setPosition({
            x: (e.clientX - window.innerWidth / 2) / strength,
            y: (e.clientY - window.innerHeight / 2) / strength
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return position;
};

/** Hook para detecção de visibility com Intersection Observer */
const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

// ============ COMPONENTS ============

/** Floating Chat Widget - Preparado para integração */
const FloatingChat = () => {
  const [isOnline] = useState(true);
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  return (
    <motion.button
      style={{ scale }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => scale.set(1.1)}
      onHoverEnd={() => scale.set(1)}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat 24h"
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 shadow-2xl transition-shadow hover:shadow-rose-500/50">
        <MessageCircle className="h-7 w-7 text-white" />

        {isOnline && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-full w-full rounded-full bg-green-400"
            />
          </motion.div>
        )}

        <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-teal-400 opacity-20" />

        <div className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
          Chat 24h Online
          <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-slate-900" />
        </div>
      </div>
    </motion.button>
  );
};

/** Enhanced Stats Card com animação */
const StatCard = ({ value, label, icon: Icon, color, delay = 0 }: {
  value: string;
  label: string;
  icon: any;
  color: string;
  delay?: number;
}) => {
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative"
    >
      <Card className="relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={cn("rounded-lg p-2", color)}>
              <Icon className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-white">{value}</div>
              <div className="text-xs text-white/60">{label}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/** Contact Method Card */
const ContactMethod = ({ icon: Icon, title, value, description, delay = 0 }: {
  icon: any;
  title: string;
  value: string;
  description: string;
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ x: 8 }}
      className="group cursor-pointer"
    >
      <Card className="border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 p-2">
              <Icon className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 space-y-0.5">
              <h4 className="text-sm font-semibold text-white">{title}</h4>
              <p className="text-sm text-white/90">{value}</p>
              <p className="text-xs text-white/60">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============ MAIN COMPONENT ============

export function ModernContactSection() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const mousePosition = useMouseParallax(50);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      segment: '',
      currentLeads: '',
      budget: '',
      message: '',
    },
  });

  const contactMethods = useMemo(() => [
    {
      icon: Mail,
      title: 'Email',
      value: 'contato@arco.digital',
      description: 'Respondemos em horário comercial',
    },
    {
      icon: Phone,
      title: 'WhatsApp',
      value: '+55 (21) 96727-7533',
      description: 'Envie uma mensagem',
    },
    {
      icon: MessageCircle,
      title: 'Chat',
      value: 'Online',
      description: 'Disponível no site',
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'Rio de Janeiro, RJ',
      description: 'Atendimento remoto',
    },
  ], []);

  // Stats - sem promessas exageradas
  const stats = useMemo(() => [
    { value: '2-3d', label: 'Prazo de resposta inicial', icon: Zap, color: 'bg-gradient-to-br from-cyan-500 to-blue-600', delay: 0.1 },
    { value: 'Full-stack', label: 'React, Next.js, PostgreSQL', icon: Building2, color: 'bg-gradient-to-br from-purple-500 to-purple-600', delay: 0.2 },
    { value: 'Tráfego', label: 'Google Ads, Meta Ads', icon: TrendingUp, color: 'bg-gradient-to-br from-fuchsia-500 to-pink-600', delay: 0.3 },
    { value: 'Performance', label: 'Core Web Vitals, Analytics', icon: MessageCircle, color: 'bg-gradient-to-br from-violet-500 to-purple-600', delay: 0.4 },
  ], []);

  const onSubmit = useCallback(async (data: ContactFormData) => {
    try {
      setSubmitStatus('idle');
      toast.loading('Enviando sua mensagem...', { id: 'contact-form' });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form submitted:', data);
      toast.success('Mensagem enviada! Retornaremos em breve.', { id: 'contact-form', duration: 5000 });
      form.reset();
    } catch (error) {
      console.error('Form error:', error);
      toast.error('Erro ao enviar. Tente novamente.', { id: 'contact-form', duration: 5000 });
      setSubmitStatus('error');
    }
  }, [form]);

  const handleFocus = useCallback((fieldName: string) => setFocusedField(fieldName), []);
  const handleBlur = useCallback(() => setFocusedField(null), []);

  const segments = useMemo(() => [
    'Emergências Casa', 'Auto Rápido', 'Casa & Reformas',
    'Saúde & Estética', 'Serviços Técnicos', 'Pet Services', 'Outros'
  ], []);

  const budgetRanges = useMemo(() => [
    'R$ 2.000 - R$ 5.000', 'R$ 5.000 - R$ 10.000', 'R$ 10.000 - R$ 20.000',
    'R$ 20.000 - R$ 50.000', 'R$ 50.000+'
  ], []);

  return (
    <section className="relative min-h-screen overflow-hidden py-20">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[10%] top-[20%] h-[600px] w-[600px] rounded-full bg-rose-500/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[10%] right-[15%] h-[700px] w-[700px] rounded-full bg-orange-500/15 blur-3xl"
        />
        <motion.div
          style={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(20, 184, 166, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.2) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60" />
      </div>

      <Container className="relative z-10">
        <div className="space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl space-y-6 text-center"
          >
            <Badge className="border-transparent bg-gradient-to-r from-rose-500/20 to-orange-500/20 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
              Desenvolvimento + Tráfego
            </Badge>
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Entre em contato
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80">
              Desenvolvimento de aplicações web e gestão de campanhas de tráfego pago. Preencha o formulário ou use um dos canais ao lado.
            </p>
          </motion.div>

          {/* Stats Grid - HORIZONTAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </motion.div>

          {/* HORIZONTAL Layout - Contact Info + Form */}
          <div className="grid gap-8 lg:grid-cols-[380px_1fr] xl:gap-12">
            {/* LEFT - Contact Methods */}
            <div className="space-y-6">
              <div className="space-y-3">
                {contactMethods.map((method, index) => (
                  <ContactMethod key={index} {...method} delay={0.1 * index} />
                ))}
              </div>


            </div>

            {/* RIGHT - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="overflow-hidden border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
                <CardContent className="p-8">
                  <div className="mb-6 space-y-2">
                    <h2 className="text-xl font-bold text-white">Formulário de contato</h2>
                    <p className="text-sm text-white/70">Preencha os campos abaixo e retornaremos em breve</p>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <AnimatePresence>
                        {submitStatus === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3"
                          >
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <p className="text-xs text-red-300">Erro ao enviar. Tente novamente.</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-white/90">Nome *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                                  <Input
                                    {...field}
                                    placeholder="Nome completo"
                                    onFocus={() => handleFocus('name')}
                                    onBlur={handleBlur}
                                    className={cn(
                                      "h-11 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/40 backdrop-blur-sm transition-all",
                                      "focus:border-rose-400/50 focus:bg-white/10 focus:ring-2 focus:ring-rose-400/20",
                                      focusedField === 'name' && "shadow-lg shadow-rose-500/10"
                                    )}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs text-red-400" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-white/90">Email *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                                  <Input
                                    {...field}
                                    type="email"
                                    placeholder="seu@email.com"
                                    onFocus={() => handleFocus('email')}
                                    onBlur={handleBlur}
                                    className={cn(
                                      "h-11 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/40 backdrop-blur-sm transition-all",
                                      "focus:border-rose-400/50 focus:bg-white/10 focus:ring-2 focus:ring-rose-400/20",
                                      focusedField === 'email' && "shadow-lg shadow-rose-500/10"
                                    )}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-white/90">WhatsApp *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                                  <Input
                                    {...field}
                                    placeholder="(11) 99999-9999"
                                    onFocus={() => handleFocus('phone')}
                                    onBlur={handleBlur}
                                    className={cn(
                                      "h-11 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/40 backdrop-blur-sm transition-all",
                                      "focus:border-rose-400/50 focus:bg-white/10 focus:ring-2 focus:ring-rose-400/20",
                                      focusedField === 'phone' && "shadow-lg shadow-rose-500/10"
                                    )}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs text-red-400" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-white/90">Empresa</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                                  <Input
                                    {...field}
                                    placeholder="Nome da empresa"
                                    onFocus={() => handleFocus('company')}
                                    onBlur={handleBlur}
                                    className={cn(
                                      "h-11 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/40 backdrop-blur-sm transition-all",
                                      "focus:border-rose-400/50 focus:bg-white/10 focus:ring-2 focus:ring-rose-400/20",
                                      focusedField === 'company' && "shadow-lg shadow-rose-500/10"
                                    )}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="segment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-white/90">Segmento *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11 border-white/10 bg-white/5 text-white backdrop-blur-sm focus:border-rose-400/50 focus:ring-2 focus:ring-rose-400/20">
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {segments.map((segment) => (
                                    <SelectItem key={segment} value={segment}>
                                      {segment}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-xs text-red-400" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-white/90">Orçamento mensal</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11 border-white/10 bg-white/5 text-white backdrop-blur-sm focus:border-rose-400/50 focus:ring-2 focus:ring-rose-400/20">
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {budgetRanges.map((range) => (
                                    <SelectItem key={range} value={range}>
                                      {range}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-xs text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium text-white/90">Mensagem</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                <Textarea
                                  {...field}
                                  placeholder="Descreva seus principais objetivos e desafios atuais..."
                                  rows={3}
                                  onFocus={() => handleFocus('message')}
                                  onBlur={handleBlur}
                                  className={cn(
                                    "resize-none border-white/10 bg-white/5 pl-10 pt-3 text-white placeholder:text-white/40 backdrop-blur-sm transition-all",
                                    "focus:border-rose-400/50 focus:bg-white/10 focus:ring-2 focus:ring-rose-400/20",
                                    focusedField === 'message' && "shadow-lg shadow-rose-500/10"
                                  )}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />

                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button
                          type="submit"
                          size="lg"
                          disabled={form.formState.isSubmitting}
                          className="group relative h-12 w-full overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 text-sm font-bold text-white shadow-xl transition-all hover:shadow-2xl hover:shadow-rose-500/50 disabled:opacity-50"
                        >
                          {form.formState.isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              Enviar mensagem
                              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                        </Button>
                      </motion.div>

                      <p className="text-center text-xs text-white/50">
                        🔒 Suas informações são 100% confidenciais e protegidas pela LGPD
                      </p>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Container>

      <FloatingChat />
    </section>
  );
}
