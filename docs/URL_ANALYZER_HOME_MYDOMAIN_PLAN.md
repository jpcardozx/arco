# 🎯 Plano de Implementação - URL Analyzer Home + MyDomain Flow

> **Data:** 03/10/2025  
> **Objetivo:** Substituir #cases por URL Analyzer na home + criar fluxo /mydomain → /signup
> **Status:** 📋 Planejamento Completo

---

## 📊 Análise da Situação Atual

### Homepage Flow Atual
```
Hero → ROI Calculator → Assessment Bridge → Value Prop → 
#cases (OptimizedClientStories) → ExecutionShowcase → MethodologyTeaser
```

### Problemas Identificados
1. **#cases vem tarde** - usuário já viu muito conteúdo
2. **Social proof passivo** - apenas leitura
3. **Sem interação** - falta engagement ativo
4. **Gap no funil** - URL Analyzer → ??? → signup

---

## 🎨 Nova Arquitetura Proposta

### 1. Homepage Flow Novo
```
Hero → ROI Calculator → URL ANALYZER (NEW) → 
Assessment Bridge → Value Prop → ExecutionShowcase → MethodologyTeaser
```

**Justificativa:**
- URL Analyzer logo após ROI = engajamento duplo
- Ferramenta interativa antes de pitch de venda
- User está "quente" após ver ROI potencial
- Análise da própria página = personalização

### 2. Novo Fluxo de Conversão
```
URL Analyzer → [Análise Completa] → 
CTA "Implementar Melhorias" → 
/mydomain (Pré-cadastro) → 
/signup (Cadastro Completo) → 
/login → /dashboard
```

---

## 🚀 Implementação Detalhada

### FASE 1: URL Analyzer na Home ✅

#### 1.1. Substituir OptimizedClientStories
**Arquivo:** `src/app/page.tsx`

```tsx
// ANTES
import { OptimizedClientStories } from '../components/sections/OptimizedClientStories';

<div id="cases">
  <OptimizedClientStories />
</div>

// DEPOIS
import { URLAnalyzerSection } from '@/components/sections/free/URLAnalyzerSection';

<div id="url-analyzer">
  <URLAnalyzerSection 
    variant="home"
    ctaOverride={{
      text: "Quero Implementar Essas Melhorias",
      href: "/mydomain"
    }}
  />
</div>
```

#### 1.2. Atualizar Navegação
```tsx
// Hero secondaryCta
secondaryCta={{
  text: "Analisar Minha Página",
  href: "#url-analyzer"
}}
```

#### 1.3. Adicionar Imagens Profissionais

**Assets Necessários:**
1. **Background hero analytics** (Unsplash)
   - Keywords: "website analytics dashboard dark"
   - Sugestão: Clean dashboard com métricas
   - Uso: Background sutil no URL Analyzer card

2. **Icon decorativos** (Lucide React)
   - Já incluído no componente
   - Adicionar glow effects

3. **Mockup screenshots** (opcional)
   - Before/After de landing pages
   - Uso: Results section enhancement

**Implementação:**
```tsx
// URL Analyzer com image enhancement
<div className="absolute inset-0 opacity-5">
  <img 
    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200" 
    alt=""
    className="w-full h-full object-cover"
  />
</div>
```

---

### FASE 2: Página /mydomain (Pré-cadastro) 🆕

#### 2.1. Estrutura da Página

**Arquivo:** `src/app/mydomain/page.tsx`

**Conceito:**
- **Single section** ultra-focused
- **Mesmo background** do /login (consistência)
- **Card glassmorphic** similar ao login
- **Coleta mínima** de dados (3-4 campos)
- **Copy persuasivo** focado em valor

**Layout:**
```
┌─────────────────────────────────────┐
│   Background Premium (login.png)    │
│                                     │
│  ┌───────────────────────────────┐  │
│  │   GLASSMORPHIC CARD (center) │  │
│  │                               │  │
│  │  [Badge] Próximo Passo       │  │
│  │  [Title] Configure Seu       │  │
│  │          Domínio Premium     │  │
│  │                               │  │
│  │  ┌─────────────────────────┐ │  │
│  │  │ [Icon] Email            │ │  │
│  │  │ [Icon] Domínio          │ │  │
│  │  │ [Icon] Telefone (opt)   │ │  │
│  │  │ [Icon] Empresa          │ │  │
│  │  └─────────────────────────┘ │  │
│  │                               │  │
│  │  [Progress] 2 de 3 passos    │  │
│  │  [CTA] Continuar Cadastro    │  │
│  │                               │  │
│  │  [Trust] 🔒 Dados seguros    │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

#### 2.2. Campos do Formulário

**Obrigatórios (3):**
1. **Email** - validação
2. **Domínio desejado** - .arco.app
3. **Nome completo** - personalização

**Opcional (1):**
4. **Telefone** - contato rápido

**Justificativa:**
- Email = identificação única
- Domínio = comprometimento (já escolheu)
- Nome = personalização da experiência
- Telefone = urgency selling (opcional)

#### 2.3. Copy Strategy

**Badge:** "Passo 2 de 3 • Reserve Seu Espaço"

**Título:** 
```
Escolha Seu Domínio Premium
Configure seu espaço digital em 60 segundos
```

**Subtítulo:**
```
Você está a 2 passos de ter um sistema completo de captação.
Primeiro, vamos reservar seu domínio personalizado.
```

**Input Labels:**
- "Seu melhor email" (não "Email")
- "Domínio desejado" (não "URL")
- "Como prefere ser chamado?" (não "Nome")
- "WhatsApp para suporte rápido" (não "Telefone")

**Trust Indicators:**
- 🔒 Dados criptografados com SSL
- ⚡ Configuração em menos de 1 minuto
- 🎁 14 dias grátis garantidos

#### 2.4. Validações

```tsx
const myDomainSchema = z.object({
  email: z.string().email('Email inválido'),
  domain: z.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Apenas letras, números e hífen')
    .refine(async (domain) => {
      // Check availability
      const available = await checkDomainAvailability(domain);
      return available;
    }, 'Domínio não disponível'),
  name: z.string().min(2, 'Nome muito curto'),
  phone: z.string().optional(),
});
```

#### 2.5. Real-time Domain Check

```tsx
// Visual feedback durante digitação
const [domainStatus, setDomainStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

// Display
{domainStatus === 'checking' && <Loader2 className="animate-spin" />}
{domainStatus === 'available' && <CheckCircle2 className="text-green-400" />}
{domainStatus === 'taken' && <XCircle className="text-red-400" />}

// Preview
<div className="text-sm text-slate-400">
  Seu domínio será: <strong className="text-teal-400">{domain}.arco.app</strong>
</div>
```

---

### FASE 3: Refinamentos UI/UX do URL Analyzer 🎨

#### 3.1. Background Enhancement

**Adicionar imagem sutil:**
```tsx
<div className="absolute inset-0">
  {/* Base gradient */}
  <div className="absolute inset-0" style={{...}} />
  
  {/* Image overlay (NEW) */}
  <div className="absolute inset-0 opacity-3">
    <img 
      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80"
      alt=""
      className="w-full h-full object-cover mix-blend-luminosity"
    />
  </div>
  
  {/* Radial gradients */}
  <motion.div ... />
</div>
```

**Unsplash Suggestions:**
- `photo-1551288049-bebda4e38f71` - Analytics dashboard
- `photo-1460925895917-afdab827c52f` - Website metrics
- `photo-1504868584819-f8e8b4b6d7e3` - Code/development

#### 3.2. Input Field Polish

**Adicionar exemplos dinâmicos:**
```tsx
<Input
  placeholder="https://seusite.com"
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  className="..."
/>

{/* Example URLs (NEW) */}
{!url && (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="absolute top-full left-0 mt-2 text-xs text-slate-500"
  >
    Exemplo: https://suaempresa.com.br/servicos
  </motion.div>
)}
```

#### 3.3. Results Enhancement

**Adicionar screenshots (mock):**
```tsx
// Issues section
<Card className="...">
  <div className="flex gap-4">
    {/* Icon */}
    <div className="...">
      <issue.icon />
    </div>
    
    {/* Content */}
    <div className="flex-1">
      <h5>{issue.title}</h5>
      <p>{issue.description}</p>
      
      {/* Visual example (NEW) */}
      {issue.hasExample && (
        <div className="mt-3 p-3 rounded-lg bg-black/20 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">Como está:</span>
          </div>
          <div className="relative h-20 rounded border border-red-500/30 overflow-hidden">
            {/* Mock screenshot */}
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
              <span className="text-red-400 text-sm">CTA não visível</span>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</Card>
```

#### 3.4. Loading State Enhancement

**Adicionar progresso visual:**
```tsx
{isAnalyzing && (
  <div className="space-y-8">
    {/* Current step with icon */}
    <motion.div key={analysisStep} ...>
      <motion.div animate={{ rotate: 360 }}>
        <StepIcon />
      </motion.div>
      <p>{analysisSteps[analysisStep].text}</p>
    </motion.div>
    
    {/* Progress bar */}
    <div className="space-y-3">
      <Progress value={...} />
      <p className="text-sm text-center">
        Etapa {analysisStep + 1} de {analysisSteps.length}
      </p>
      
      {/* Time estimate (NEW) */}
      <p className="text-xs text-center text-slate-500">
        ⏱️ Estimativa: {remainingTime}s restantes
      </p>
    </div>
    
    {/* Steps checklist (NEW) */}
    <div className="grid grid-cols-2 gap-2">
      {analysisSteps.map((step, idx) => (
        <div 
          key={idx}
          className={cn(
            "flex items-center gap-2 p-2 rounded-lg",
            idx < analysisStep ? "bg-teal-500/10 border-teal-400/20" :
            idx === analysisStep ? "bg-orange-500/10 border-orange-400/20" :
            "bg-white/5 border-white/10"
          )}
        >
          {idx < analysisStep && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
          {idx === analysisStep && <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />}
          {idx > analysisStep && <Circle className="w-4 h-4 text-slate-600" />}
          <span className="text-xs">{step.label}</span>
        </div>
      ))}
    </div>
  </div>
)}
```

#### 3.5. CTA Footer Enhancement

**Versão Home (redireciona para /mydomain):**
```tsx
<div className="pt-6 border-t border-white/10 space-y-4">
  {/* Headline */}
  <div className="text-center space-y-3">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-orange-500/20 border border-teal-400/30"
    >
      <Sparkles className="w-4 h-4 text-teal-400" />
      <span className="text-sm font-medium text-teal-300">
        Resultados implementáveis em 48h
      </span>
    </motion.div>
    
    <p className="text-slate-300 text-base">
      <strong className="text-white">Pronto para implementar?</strong>
      <br />
      Configure seu domínio premium e comece hoje
    </p>
  </div>
  
  {/* CTAs */}
  <div className="flex flex-col sm:flex-row gap-3 justify-center">
    <Button
      onClick={handleReset}
      variant="outline"
      className="border-white/20 bg-white/5 hover:bg-white/10"
    >
      Analisar Outra Página
    </Button>
    
    <Button 
      onClick={() => router.push('/mydomain')}
      className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 group"
    >
      <span>Configurar Meu Domínio</span>
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
  
  {/* Trust bar */}
  <div className="flex items-center justify-center gap-6 pt-4">
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <Shield className="w-4 h-4 text-teal-400" />
      <span>Setup em 60s</span>
    </div>
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <Zap className="w-4 h-4 text-orange-400" />
      <span>14 dias grátis</span>
    </div>
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <Award className="w-4 h-4 text-purple-400" />
      <span>Sem cartão</span>
    </div>
  </div>
</div>
```

---

## 📐 Design System Specifications

### URL Analyzer Refinements

#### Colors
```scss
// Background
--bg-base: linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 100%);
--bg-overlay-img: opacity 3%, mix-blend-mode luminosity

// Cards
--card-glass: bg-white/5, backdrop-blur-xl, border-white/10
--card-hover: bg-white/8, border-white/15

// Accents
--accent-primary: teal-500 (#14b8a6)
--accent-secondary: orange-500 (#f97316)
--accent-tertiary: purple-500 (#a855f7)
```

#### Typography
```scss
// Badge
font-size: 0.875rem (14px)
font-weight: 500
text-transform: none

// Title
font-size: 2.25rem - 3rem (36-48px) responsive
font-weight: 700
line-height: 1.2
letter-spacing: -0.02em

// Body
font-size: 1rem - 1.125rem (16-18px)
line-height: 1.6
color: slate-400
```

#### Spacing
```scss
// Section
padding: 4rem 0 (mobile) → 7rem 0 (desktop)

// Card
padding: 1.5rem (mobile) → 3rem (desktop)

// Elements
gap: 1rem (tight) → 2rem (relaxed)
```

#### Animations
```tsx
// Entrance
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// Stagger
staggerChildren: 0.1

// Interactive
whileHover={{ scale: 1.02, y: -2 }}
whileTap={{ scale: 0.98 }}
```

---

## 🎯 /mydomain Page Specifications

### Complete Component Structure

```tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { z } from 'zod';
import {
  Mail,
  Globe,
  User,
  Phone,
  CheckCircle2,
  Loader2,
  Shield,
  Zap,
  Award,
  ArrowRight,
  AlertCircle,
  XCircle
} from 'lucide-react';
import Image from 'next/image';

// Layout & UI
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Schema
const myDomainSchema = z.object({
  email: z.string().email('Email inválido'),
  domain: z.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Apenas letras minúsculas, números e hífen')
    .transform(val => val.toLowerCase()),
  name: z.string().min(2, 'Nome muito curto').max(100),
  phone: z.string().optional(),
});

type MyDomainFormData = z.infer<typeof myDomainSchema>;

export default function MyDomainPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [domainStatus, setDomainStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  
  const form = useForm<MyDomainFormData>({
    resolver: zodResolver(myDomainSchema),
    defaultValues: {
      email: '',
      domain: '',
      name: '',
      phone: '',
    },
  });
  
  // Check domain availability
  const checkDomain = async (domain: string) => {
    if (domain.length < 3) return;
    
    setDomainStatus('checking');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation
      const taken = ['test', 'demo', 'admin'].includes(domain);
      setDomainStatus(taken ? 'taken' : 'available');
    } catch {
      setDomainStatus('idle');
    }
  };
  
  const onSubmit = async (data: MyDomainFormData) => {
    setIsSubmitting(true);
    
    try {
      // Save to localStorage for /signup
      localStorage.setItem('mydomain_data', JSON.stringify(data));
      
      // Simulate API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to signup
      router.push('/signup');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout showHeader={false} showFooter={false}>
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4">
        {/* Background - same as login */}
        <div className="absolute inset-0">
          <Image
            src="/login.png"
            alt=""
            fill
            className="object-cover"
            quality={95}
            priority
          />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>
        
        {/* Subtle glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal-500 rounded-full blur-3xl pointer-events-none"
        />
        
        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-2xl mx-auto"
        >
          <Card className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/[0.06] transition-all duration-500 shadow-2xl">
            {/* Glassmorphic layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              {/* Header */}
              <div className="text-center mb-8">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block mb-6"
                >
                  <Badge className="px-4 py-2 bg-gradient-to-r from-teal-500/20 to-orange-500/20 border-teal-400/30 text-teal-300 text-sm font-medium backdrop-blur-xl">
                    Passo 2 de 3 • Reserve Seu Espaço
                  </Badge>
                </motion.div>
                
                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
                >
                  Escolha Seu Domínio Premium
                </motion.h1>
                
                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto"
                >
                  Configure seu espaço digital em 60 segundos.
                  <br />
                  <strong className="text-slate-300">Você está a 1 passo</strong> de ter um sistema completo de captação.
                </motion.p>
              </div>
              
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">Seu melhor email</FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                              <Input
                                {...field}
                                type="email"
                                placeholder="voce@empresa.com"
                                className="pl-11 h-12 bg-white/5 backdrop-blur-xl border-white/10 text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-teal-500/20"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    {/* Domain */}
                    <FormField
                      control={form.control}
                      name="domain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">Domínio desejado</FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                              <Input
                                {...field}
                                placeholder="minhaempresa"
                                onChange={(e) => {
                                  field.onChange(e);
                                  checkDomain(e.target.value);
                                }}
                                className="pl-11 pr-24 h-12 bg-white/5 backdrop-blur-xl border-white/10 text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-teal-500/20"
                              />
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                {domainStatus === 'checking' && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
                                {domainStatus === 'available' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                                {domainStatus === 'taken' && <XCircle className="w-4 h-4 text-red-400" />}
                                <span className="text-sm text-slate-400">.arco.app</span>
                              </div>
                            </div>
                          </FormControl>
                          {field.value && domainStatus === 'available' && (
                            <p className="text-xs text-teal-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Domínio disponível: <strong>{field.value}.arco.app</strong>
                            </p>
                          )}
                          {domainStatus === 'taken' && (
                            <p className="text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Este domínio já está em uso. Tente outro.
                            </p>
                          )}
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">Como prefere ser chamado?</FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                              <Input
                                {...field}
                                placeholder="João Silva"
                                className="pl-11 h-12 bg-white/5 backdrop-blur-xl border-white/10 text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-teal-500/20"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    {/* Phone (optional) */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            WhatsApp para suporte rápido
                            <span className="text-slate-500 text-xs ml-2">(opcional)</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                              <Input
                                {...field}
                                type="tel"
                                placeholder="(11) 99999-9999"
                                className="pl-11 h-12 bg-white/5 backdrop-blur-xl border-white/10 text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-teal-500/20"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    {/* Progress */}
                    <div className="pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-400">Progresso</span>
                        <span className="text-sm text-teal-400 font-medium">67%</span>
                      </div>
                      <Progress value={67} className="h-2 bg-white/10" />
                    </div>
                    
                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting || domainStatus === 'taken'}
                      className="w-full h-14 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold text-lg shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Reservando seu domínio...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <span>Continuar Cadastro</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </Button>
                    
                    {/* Trust indicators */}
                    <div className="flex items-center justify-center gap-6 pt-4">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Shield className="w-4 h-4 text-teal-400" />
                        <span>Dados criptografados</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Zap className="w-4 h-4 text-orange-400" />
                        <span>Setup em 60s</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Award className="w-4 h-4 text-purple-400" />
                        <span>14 dias grátis</span>
                      </div>
                    </div>
                  </form>
                </Form>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
```

---

## ✅ Checklist de Implementação

### URL Analyzer Home Integration
- [ ] Mover URLAnalyzerSection para home
- [ ] Remover OptimizedClientStories
- [ ] Atualizar navegação (#url-analyzer)
- [ ] Adicionar background image
- [ ] Implementar CTA override (redirect /mydomain)
- [ ] Adicionar loading time estimate
- [ ] Adicionar steps checklist visual
- [ ] Testar mobile responsive

### MyDomain Page
- [ ] Criar arquivo `src/app/mydomain/page.tsx`
- [ ] Implementar form schema validation
- [ ] Add real-time domain checking
- [ ] Implementar localStorage persistence
- [ ] Adicionar progress indicator
- [ ] Trust indicators footer
- [ ] Mobile responsive
- [ ] Error handling
- [ ] Success redirect to /signup

### Design Refinements
- [ ] URL Analyzer background image (Unsplash)
- [ ] Input field examples
- [ ] Results visual enhancements
- [ ] Loading state improvements
- [ ] CTA footer redesign
- [ ] Domain preview real-time
- [ ] Icon animations
- [ ] Micro-interactions polish

### Testing
- [ ] Test URL Analyzer flow home
- [ ] Test domain validation
- [ ] Test form submission
- [ ] Test localStorage
- [ ] Test redirect /signup
- [ ] Cross-browser testing
- [ ] Mobile testing (3 devices)
- [ ] Performance audit

---

## 📊 Success Metrics

### User Engagement
- **Time on URL Analyzer**: Target 2-3 min
- **Analysis completion**: Target 70%+
- **CTA click-through**: Target 15%+

### Conversion Flow
- **Home → MyDomain**: Target 10%
- **MyDomain → Signup**: Target 60%+
- **Signup → Login**: Target 80%+

### Technical
- **Page load**: < 2s
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **FID**: < 100ms

---

## 🎯 Next Steps Post-Implementation

1. **A/B Testing**
   - URL Analyzer position (after ROI vs before)
   - CTA copy variations
   - Domain field placeholder

2. **Backend Integration**
   - Real domain availability check
   - Email validation API
   - Data persistence to DB

3. **Analytics**
   - Track analyzer usage
   - Funnel drop-off points
   - Domain chosen distribution

4. **Enhancements**
   - AI-powered URL suggestions
   - Live preview of analysis
   - Export PDF report

---

**Status:** 📋 Planejamento Completo  
**Ready for:** Implementation  
**Estimated Time:** 4-6 hours  
**Priority:** HIGH - Critical conversion flow
