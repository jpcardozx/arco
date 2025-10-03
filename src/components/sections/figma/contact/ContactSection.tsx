/**
 * ContactSection - Seção de contato premium
 * Design elegante com formulário otimizado usando react-hook-form + zod
 */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Send, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Container } from '@/components/primitives/Container/Container';
import { contactFormSchema, type ContactFormData, successMessages, errorMessages } from '@/lib/validations/contact';

export function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');

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

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contato@arco.com',
      description: 'Resposta em até 2 horas',
      color: 'text-arco-600',
      bgColor: 'bg-arco-50',
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+55 (11) 99999-9999',
      description: 'Atendimento direto',
      color: 'text-success-600',
      bgColor: 'bg-success-50',
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'São Paulo, Brasil',
      description: 'Atendimento nacional',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Clock,
      label: 'Horário',
      value: 'Seg-Sex: 8h-18h',
      description: 'Emergências: 24/7',
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
    },
  ];

  const segments = [
    'Emergências Casa',
    'Auto Rápido',
    'Casa & Reformas',
    'Saúde & Estética',
    'Serviços Técnicos',
    'Pet Services',
    'Outros',
  ];

  const budgetRanges = [
    'R$ 2.000 - R$ 5.000',
    'R$ 5.000 - R$ 10.000',
    'R$ 10.000 - R$ 20.000',
    'R$ 20.000 - R$ 50.000',
    'R$ 50.000+',
  ];

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus('idle');

      toast.loading('Enviando formulário...', {
        id: 'contact-form',
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Form submitted with validated data:', data);

      toast.success(successMessages.form, {
        id: 'contact-form',
        duration: 5000,
      });

      form.reset();
      setSubmitStatus('idle');
    } catch (error) {
      console.error('Form submission error:', error);

      toast.error(errorMessages.form, {
        id: 'contact-form',
        duration: 5000,
      });

      setSubmitStatus('error');
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-24">
      <Container>
        <div className="space-y-16">
          {/* Header */}
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <Badge variant="outline" className="border-slate-300 bg-white/80 font-barlow text-slate-700 backdrop-blur-sm">
              Entre em contato
            </Badge>

            <div className="space-y-4">
              <h2 className="font-arsenal text-5xl font-normal uppercase leading-tight text-slate-900 lg:text-6xl">
                Pronto para crescer
                <span className="block text-slate-600">350% em leads?</span>
              </h2>
              <p className="font-barlow text-xl leading-relaxed text-slate-600">
                Agende uma análise gratuita e descubra como nossa metodologia pode transformar seu negócio
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact info */}
            <div className="space-y-8">
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-2 border-slate-200 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 rounded-xl p-3 ${info.bgColor}`}>
                          <info.icon className={`h-6 w-6 ${info.color}`} />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-arsenal text-lg font-normal uppercase text-slate-900">{info.label}</h3>
                          <p className="font-barlow font-medium text-slate-900">{info.value}</p>
                          <p className="font-barlow text-sm text-slate-600">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick stats */}
              <Card className="border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white">
                <CardHeader>
                  <CardTitle className="font-arsenal text-xl font-normal uppercase text-slate-900">
                    Por que escolher a ARCO?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="font-arsenal text-2xl text-arco-600">350%</div>
                      <div className="font-barlow text-xs text-slate-600">Aumento médio</div>
                    </div>
                    <div className="text-center">
                      <div className="font-arsenal text-2xl text-green-600">72h</div>
                      <div className="font-barlow text-xs text-slate-600">Primeiros leads</div>
                    </div>
                    <div className="text-center">
                      <div className="font-arsenal text-2xl text-purple-600">200+</div>
                      <div className="font-barlow text-xs text-slate-600">Clientes ativos</div>
                    </div>
                    <div className="text-center">
                      <div className="font-arsenal text-2xl text-orange-600">420%</div>
                      <div className="font-barlow text-xs text-slate-600">ROI médio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <Card className="border-2 border-slate-200 bg-white/80 shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-arsenal text-2xl font-normal uppercase text-slate-900">Análise gratuita</CardTitle>
                  <CardDescription className="font-barlow text-base text-slate-600">
                    Preencha o formulário e receba uma análise personalizada do seu negócio
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {submitStatus === 'error' && (
                        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                          <p className="font-barlow text-sm text-red-700">{errorMessages.form}</p>
                        </div>
                      )}

                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-barlow text-sm font-medium text-slate-900">Nome completo *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Seu nome"
                                  className="font-barlow border-slate-200 bg-white/80 focus:border-slate-400"
                                  {...field}
                                />
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
                              <FormLabel className="font-barlow text-sm font-medium text-slate-900">Email *</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="seu@email.com"
                                  className="font-barlow border-slate-200 bg-white/80 focus:border-slate-400"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
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
                              <FormLabel className="font-barlow text-sm font-medium text-slate-900">WhatsApp *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="(11) 99999-9999"
                                  className="font-barlow border-slate-200 bg-white/80 focus:border-slate-400"
                                  {...field}
                                />
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
                              <FormLabel className="font-barlow text-sm font-medium text-slate-900">Empresa</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nome da empresa"
                                  className="font-barlow border-slate-200 bg-white/80 focus:border-slate-400"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
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
                              <FormLabel className="font-barlow text-sm font-medium text-slate-900">Segmento *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="font-barlow border-slate-200 bg-white/80">
                                    <SelectValue placeholder="Selecione seu segmento" />
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
                          name="currentLeads"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-barlow text-sm font-medium text-slate-900">Leads atuais/mês</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ex: 50"
                                  className="font-barlow border-slate-200 bg-white/80 focus:border-slate-400"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-barlow text-sm font-medium text-slate-900">
                              Orçamento mensal para marketing
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="font-barlow border-slate-200 bg-white/80">
                                  <SelectValue placeholder="Selecione a faixa de orçamento" />
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

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-barlow text-sm font-medium text-slate-900">Mensagem</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Conte-nos mais sobre seu negócio e objetivos..."
                                rows={4}
                                className="font-barlow resize-none border-slate-200 bg-white/80 focus:border-slate-400"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="font-barlow group w-full font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800 disabled:opacity-50 bg-slate-900"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Solicitar análise gratuita
                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>

                      <p className="font-barlow text-center text-xs text-slate-500">
                        Seus dados estão seguros. Não compartilhamos informações com terceiros.
                      </p>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
