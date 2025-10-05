/**
 * Professional Contact Section
 * 
 * Design minimalista e elegante:
 * - Layout limpo sem sobreposições forçadas
 * - Tipografia profissional
 * - Elementos sutis e harmoniosos
 * - Sem stats apelativos
 * - Foco na experiência do usuário
 */
'use client';

import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  User,
  Building2,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Container } from '@/components/primitives/Container/Container';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { cn } from '@/design-system/tokens';

// ============ COMPONENTS ============

/** Contact Info Card - Minimalista */
const ContactInfoCard = ({ icon: Icon, label, value, href }: {
  icon: any;
  label: string;
  value: string;
  href?: string;
}) => {
  const content = (
    <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-200/80 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:bg-white/80 hover:shadow-md">
      <div className="flex-shrink-0 mt-0.5">
        <div className="p-2.5 rounded-lg bg-slate-100">
          <Icon className="w-5 h-5 text-slate-700" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-500 mb-0.5">{label}</div>
        <div className="text-base font-semibold text-slate-900 break-words">{value}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ x: 4 }}
        className="block"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {content}
    </motion.div>
  );
};

// ============ MAIN COMPONENT ============

export function ProfessionalContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = useCallback(async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      toast.loading('Enviando sua mensagem...', { id: 'contact-form' });
      
      // Simular envio
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', data);
      toast.success('Mensagem enviada com sucesso. Retornaremos em breve.', { 
        id: 'contact-form', 
        duration: 5000 
      });
      form.reset();
    } catch (error) {
      console.error('Form error:', error);
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente.', { 
        id: 'contact-form', 
        duration: 5000 
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [form]);

  const segments = useMemo(() => [
    'Emergências Residenciais',
    'Serviços Automotivos',
    'Reformas e Construção',
    'Saúde e Bem-estar',
    'Serviços Técnicos',
    'Pet Services',
    'Outros'
  ], []);

  const budgetRanges = useMemo(() => [
    'Até R$ 5.000',
    'R$ 5.000 - R$ 10.000',
    'R$ 10.000 - R$ 20.000',
    'R$ 20.000 - R$ 50.000',
    'Acima de R$ 50.000'
  ], []);

  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Textura sutil */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />

      <Container className="relative">
        <div className="max-w-6xl mx-auto">
          {/* Header - Minimalista e Profissional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center max-w-2xl mx-auto"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200">
              <span className="text-sm font-medium text-slate-700">Entre em Contato</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Vamos Conversar
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Estamos aqui para ajudar seu negócio a crescer. Entre em contato e descubra como podemos trabalhar juntos.
            </p>
          </motion.div>

          {/* Layout Horizontal - Clean & Professional */}
          <div className="grid lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start">
            
            {/* Sidebar - Informações de Contato */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="lg:sticky lg:top-24 space-y-4">
                <ContactInfoCard
                  icon={Mail}
                  label="Email"
                  value="contato@arco.digital"
                  href="mailto:contato@arco.digital"
                />
                
                <ContactInfoCard
                  icon={Phone}
                  label="Telefone"
                  value="+55 (11) 99999-9999"
                  href="tel:+5511999999999"
                />
                
                <ContactInfoCard
                  icon={MapPin}
                  label="Localização"
                  value="São Paulo, SP"
                />

                {/* Horário de Atendimento */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    Horário de Atendimento
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Segunda a Sexta</span>
                      <span className="font-medium text-slate-900">9h - 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Sábado</span>
                      <span className="font-medium text-slate-900">9h - 13h</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Formulário - Clean Design */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-slate-200 shadow-lg shadow-slate-200/50 bg-white">
                <CardContent className="p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      
                      {/* Nome e Email */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700">
                                Nome completo *
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                  <Input
                                    {...field}
                                    placeholder="Seu nome"
                                    className="pl-10 h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700">
                                Email *
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                  <Input
                                    {...field}
                                    type="email"
                                    placeholder="seu@email.com"
                                    className="pl-10 h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Telefone e Empresa */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700">
                                Telefone
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                  <Input
                                    {...field}
                                    placeholder="(00) 00000-0000"
                                    className="pl-10 h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700">
                                Empresa
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                  <Input
                                    {...field}
                                    placeholder="Nome da empresa"
                                    className="pl-10 h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Segmento e Orçamento */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="segment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700">
                                Segmento
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20">
                                    <SelectValue placeholder="Selecione o segmento" />
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
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-slate-700">
                                Orçamento Estimado
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20">
                                    <SelectValue placeholder="Faixa de investimento" />
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
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Mensagem */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-slate-700">
                              Mensagem *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Conte-nos sobre seu projeto e como podemos ajudar..."
                                className="min-h-[120px] resize-none border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          "w-full h-12 text-base font-semibold",
                          "bg-gradient-to-r from-teal-600 to-teal-700",
                          "hover:from-teal-700 hover:to-teal-800",
                          "shadow-lg shadow-teal-600/25",
                          "transition-all duration-200"
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Enviar Mensagem
                          </>
                        )}
                      </Button>

                      <p className="text-sm text-slate-500 text-center">
                        Responderemos sua mensagem em até 24 horas úteis
                      </p>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
