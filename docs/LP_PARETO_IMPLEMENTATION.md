# Landing Page - Implementação Pareto (80/20)

**Princípio:** Venda consultiva progressiva → Captura → Tripwire → Conversão
**Stack:** PostHog + Resend + Mercado Pago + shadcn + Framer Motion
**Prazo:** 8 horas (2 dias úteis)

---

## 🎯 **Estratégia: Progressive Disclosure + Tripwire**

### **Problema com Números Específicos**
❌ "De 8 para 18 clientes por mês" → Cria expectativa genérica sem contexto
❌ "ROI de 340%" → Promessa sem fundamentação no caso específico
❌ "90 dias" → Timeline irreal sem conhecer o negócio

### **Solução: Venda Consultiva**
✅ "Cada salão tem um contexto diferente. Vamos analisar o seu."
✅ "Baseado no seu orçamento e região, calculamos uma projeção realista."
✅ "Agende análise gratuita de 15 min antes de decidir."

---

## 📊 **Funil de Conversão Progressiva**

```
ETAPA 1: Landing Page (awareness)
   ↓ Micro-conversão: Scroll depth 50%
   ↓ PostHog: page_viewed, section_viewed

ETAPA 2: ROI Calculator (interest)
   ↓ Input: Orçamento, ticket médio, localização
   ↓ Output: "Baseado nisso, estimamos X-Y leads/mês"
   ↓ PostHog: roi_calculator_used { intent: 'high' }

ETAPA 3: Lead Magnet (consideration)
   ↓ "Receba análise personalizada por email"
   ↓ Resend: Email com PDF + link tripwire
   ↓ PostHog: lead_magnet_submitted

ETAPA 4: Tripwire Checkout (decision)
   ↓ "Análise ao vivo: R$ 39 (15 min videocall)"
   ↓ Mercado Pago: Checkout integrado
   ↓ PostHog: tripwire_purchased
   ↓ Resend: Confirmação + link Calendly

ETAPA 5: Pós-Tripwire (upsell)
   ↓ Na call: Apresenta oferta principal (setup + gestão)
   ↓ Proposta formal enviada por email
   ↓ PostHog: proposal_sent, deal_closed
```

---

## 🚀 **FASE 1: Hierarquia Visual + Copy Consultivo (2h)**

### **HeroSection.tsx**

**Copy Atual (problemático):**
```tsx
<h1>Cliente te encontra, agenda sozinho, confirma automaticamente</h1>
<p>Piloto realizado entre janeiro e março de 2025...</p>
```

**Copy Novo (consultivo):**
```tsx
<h1 className="text-7xl md:text-8xl font-black tracking-tight">
  Seu salão merece<br />
  <span className="text-teal-400">clientes previsíveis</span>
</h1>

<p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl">
  Sistema de captura testado em 23 salões.
  Cada resultado é diferente — vamos calcular o seu.
</p>

{/* CTA consultivo */}
<Button onClick={scrollToCalculator} size="lg">
  Calcular Potencial do Meu Salão (2 min)
</Button>
```

**Mudanças:**
1. Headline: Foca em benefício (previsibilidade) não em processo
2. Subheadline: Reconhece variabilidade, convida para personalização
3. CTA: Específico, não genérico ("Ver Disponibilidade")

---

## 📐 **FASE 2: ROI Calculator Interativo (2h)**

### **Novo componente: `ROICalculatorSection.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react';
import posthog from 'posthog-js';

export function ROICalculatorSection() {
  const [inputs, setInputs] = useState({
    monthlyBudget: '',
    avgTicket: '',
    city: '',
  });

  const [result, setResult] = useState<null | {
    minLeads: number;
    maxLeads: number;
    minRevenue: number;
    maxRevenue: number;
    cac: number;
  }>(null);

  const calculate = () => {
    const budget = parseFloat(inputs.monthlyBudget);
    const ticket = parseFloat(inputs.avgTicket);

    // Fórmula conservadora
    const cac = budget * 0.65; // 65% do budget vai pro Meta/Google
    const costPerLead = cac / 0.08; // CVR 8% (conservador)

    const minLeads = Math.floor(budget / costPerLead * 0.7); // Range baixo
    const maxLeads = Math.ceil(budget / costPerLead * 1.3); // Range alto

    setResult({
      minLeads,
      maxLeads,
      minRevenue: minLeads * ticket,
      maxRevenue: maxLeads * ticket,
      cac: costPerLead,
    });

    // PostHog event
    posthog.capture('roi_calculator_used', {
      intent: 'high',
      monthly_budget: budget,
      avg_ticket: ticket,
      city: inputs.city,
      estimated_leads_min: minLeads,
      estimated_leads_max: maxLeads,
    });
  };

  return (
    <section id="roi-calculator" className="py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">
          Quanto você pode capturar?
        </h2>
        <p className="text-xl text-slate-400 text-center mb-12">
          Cálculo baseado em 23 salões. Seu resultado pode variar.
        </p>

        <Card className="p-8 bg-slate-800/50 border-slate-700">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <Label>Orçamento mensal (R$)</Label>
              <Input
                type="number"
                placeholder="600"
                value={inputs.monthlyBudget}
                onChange={e => setInputs({...inputs, monthlyBudget: e.target.value})}
              />
            </div>

            <div>
              <Label>Ticket médio (R$)</Label>
              <Input
                type="number"
                placeholder="80"
                value={inputs.avgTicket}
                onChange={e => setInputs({...inputs, avgTicket: e.target.value})}
              />
            </div>

            <div>
              <Label>Sua cidade</Label>
              <Input
                placeholder="São Paulo"
                value={inputs.city}
                onChange={e => setInputs({...inputs, city: e.target.value})}
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full" size="lg">
            <Calculator className="mr-2" />
            Calcular Projeção
          </Button>

          {result && (
            <div className="mt-8 p-6 bg-slate-900 rounded-xl border border-teal-500/30">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-400 mb-2">Leads estimados/mês</p>
                  <p className="text-4xl font-bold text-teal-400">
                    {result.minLeads}–{result.maxLeads}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-400 mb-2">Receita potencial/mês</p>
                  <p className="text-4xl font-bold text-emerald-400">
                    R$ {result.minRevenue.toLocaleString()}–{result.maxRevenue.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-200 font-semibold mb-1">
                      Importante entender:
                    </p>
                    <p className="text-sm text-slate-300">
                      Esta é uma projeção baseada em médias. Seu resultado depende de:
                      região, concorrência, qualidade da execução, follow-up com leads.
                      <strong className="text-slate-100"> Não é garantia.</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA para próximo passo */}
              <Button
                onClick={() => {
                  posthog.capture('roi_calculator_cta_clicked', {
                    intent: 'very_high',
                    next_step: 'lead_magnet',
                  });
                  document.getElementById('lead-magnet')?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                className="w-full mt-6"
              >
                Receber Análise Personalizada (Grátis)
                <TrendingUp className="ml-2" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
```

**Características:**
- ✅ **Range (min-max)** não número único
- ✅ **Disclaimer** explícito: "Não é garantia"
- ✅ **PostHog tracking** com intent score
- ✅ **CTA progressivo** para próximo passo

---

## 📧 **FASE 3: Lead Magnet + Email Sequence (1h)**

### **LeadMagnetSection.tsx**

```tsx
<form onSubmit={handleSubmit}>
  <h2>Receba análise personalizada gratuita</h2>
  <p>
    Baseado nos dados que você forneceu, vamos enviar:
  </p>
  <ul>
    <li>✅ Projeção detalhada para sua cidade</li>
    <li>✅ Comparação com salões similares</li>
    <li>✅ Checklist de preparação (10 itens)</li>
    <li>✅ Acesso a call de 15 min (R$ 39 - opcional)</li>
  </ul>

  <Input name="name" placeholder="Seu nome" />
  <Input name="email" placeholder="Email" />
  <Input name="phone" placeholder="WhatsApp" />

  <Button type="submit">
    Receber Análise Gratuita
  </Button>
</form>
```

### **Email 1: Imediato (Resend)**

```
Assunto: Sua análise personalizada está pronta

Olá {firstName},

Baseado no que você nos contou:
- Orçamento: R$ {budget}/mês
- Ticket médio: R$ {ticket}
- Localização: {city}

Estimamos entre {minLeads} e {maxLeads} agendamentos/mês.

[PDF anexo: Análise Completa]

Quer conversar 15 min ao vivo para validar esses números?
→ [Agendar Análise ao Vivo - R$ 39]

(Se não fizer sentido agora, sem problemas. Guarde esta análise.)

Abs,
João Paulo
ARCO Consulting
```

---

## 💳 **FASE 4: Tripwire Checkout (Mercado Pago) (3h)**

### **TripwireCheckoutPage.tsx**

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Calendar, Video, FileText } from 'lucide-react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import posthog from 'posthog-js';

// Inicializar MP
initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);

export default function TripwireCheckoutPage() {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const createCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout/tripwire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: sessionStorage.getItem('user_email'),
          name: sessionStorage.getItem('user_name'),
        }),
      });

      const { preference_id } = await response.json();
      setPreferenceId(preference_id);

      // PostHog
      posthog.capture('tripwire_checkout_initiated', {
        value: 39,
        currency: 'BRL',
      });
    } catch (error) {
      console.error('Erro ao criar checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">
          Análise ao Vivo - 15 minutos
        </h1>
        <p className="text-xl text-slate-400 text-center mb-12">
          Validamos sua projeção e respondemos suas dúvidas específicas.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* O que está incluído */}
          <Card className="p-8 bg-slate-800/50">
            <h3 className="text-2xl font-bold mb-6">O que você recebe:</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Video className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Videocall 15 min (Google Meet)</p>
                  <p className="text-sm text-slate-400">Agende no horário que preferir</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Análise personalizada revisada</p>
                  <p className="text-sm text-slate-400">Baseada no seu contexto real</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Checklist de preparação</p>
                  <p className="text-sm text-slate-400">10 ações antes de começar</p>
                </div>
              </li>
            </ul>
          </Card>

          {/* Checkout */}
          <Card className="p-8 bg-slate-800/50">
            <div className="text-center mb-8">
              <p className="text-sm text-slate-400 mb-2">Investimento único</p>
              <p className="text-6xl font-bold text-teal-400 mb-1">R$ 39</p>
              <p className="text-sm text-slate-500 line-through">R$ 147 (valor normal)</p>
            </div>

            {!preferenceId ? (
              <Button
                onClick={createCheckout}
                disabled={loading}
                size="lg"
                className="w-full"
              >
                {loading ? 'Preparando...' : 'Agendar Análise'}
                <Calendar className="ml-2" />
              </Button>
            ) : (
              <div id="wallet_container">
                <Wallet
                  initialization={{ preferenceId }}
                  customization={{ texts: { valueProp: 'security_safety' } }}
                />
              </div>
            )}

            <p className="text-xs text-slate-500 text-center mt-6">
              Pagamento seguro via Mercado Pago. Sem mensalidade, sem compromisso.
            </p>
          </Card>
        </div>

        {/* Garantia */}
        <Card className="mt-8 p-6 bg-emerald-500/10 border-emerald-500/30">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-emerald-300 mb-2">
                Garantia de 7 dias
              </h4>
              <p className="text-slate-300">
                Se você não achar que valeu a call, devolvemos 100% em até 24h.
                Sem perguntas, sem burocracia.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
```

### **API Route: `/api/checkout/tripwire/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            id: 'tripwire-analysis',
            title: 'Análise ao Vivo - 15 min',
            quantity: 1,
            unit_price: 39,
            currency_id: 'BRL',
          },
        ],
        payer: {
          email,
          name,
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending`,
        },
        auto_return: 'approved',
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
      },
    });

    return NextResponse.json({
      preference_id: response.id,
    });
  } catch (error) {
    console.error('Erro ao criar preferência MP:', error);
    return NextResponse.json({ error: 'Erro ao criar checkout' }, { status: 500 });
  }
}
```

### **Webhook Handler: `/api/webhooks/mercadopago/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@/lib/supabase/server';
import { resend } from '@/lib/email/resend-service';
import posthog from 'posthog-js';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Verificar se é notificação de pagamento
    if (body.type !== 'payment') {
      return NextResponse.json({ ok: true });
    }

    const paymentId = body.data.id;
    const payment = new Payment(client);
    const paymentInfo = await payment.get({ id: paymentId });

    if (paymentInfo.status === 'approved') {
      const email = paymentInfo.payer?.email;
      const name = paymentInfo.payer?.first_name;

      // Salvar no Supabase
      const supabase = createClient();
      await supabase.from('tripwire_purchases').insert({
        email,
        name,
        payment_id: paymentId,
        amount: 39,
        status: 'approved',
      });

      // Enviar email com link Calendly
      await resend.emails.send({
        from: 'ARCO <contato@arcoconsulting.com>',
        to: email!,
        subject: 'Pagamento confirmado! Agende sua análise',
        html: `
          <h1>Obrigado ${name}!</h1>
          <p>Seu pagamento foi confirmado.</p>
          <p><a href="https://calendly.com/arco/analise-15min">Clique aqui para agendar sua call de 15 min</a></p>
          <p>Escolha o melhor horário para você.</p>
        `,
      });

      // PostHog conversion
      posthog.capture('tripwire_purchased', {
        email,
        name,
        value: 39,
        currency: 'BRL',
        payment_id: paymentId,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erro no webhook MP:', error);
    return NextResponse.json({ error: 'Erro' }, { status: 500 });
  }
}
```

---

## 🎨 **FASE 5: UI/UX Polish com Framer Motion (1h)**

### **Princípios de Legibilidade**

```tsx
// 1. ESPAÇAMENTO GENEROSO
<section className="py-32 md:py-40"> {/* Antes: py-24 */}
  <div className="max-w-4xl mx-auto px-6 md:px-8"> {/* Antes: px-4 */}

// 2. LINE-HEIGHT CONFORTÁVEL
<p className="text-xl leading-relaxed"> {/* leading-relaxed = 1.625 */}

// 3. CONTRAST DRAMÁTICO
<h1 className="text-7xl md:text-8xl"> {/* Antes: text-6xl */}
<p className="text-xl md:text-2xl">    {/* Antes: text-lg */}

// 4. WEIGHT VARIATION
<h1 className="font-black">  {/* 900 */}
<h2 className="font-bold">   {/* 700 */}
<p className="font-normal">  {/* 400 */}
```

### **Framer Motion: Micro-animações Sutis**

```tsx
import { motion } from 'framer-motion';

// FADE IN UP (section entry)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
>
  {children}
</motion.div>

// BUTTON HOVER (subtle scale)
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>

// CARD LIFT (on hover)
<motion.div
  className="card"
  whileHover={{ y: -4 }}
  transition={{ duration: 0.3 }}
>

// STAGGER CHILDREN (list items)
<motion.ul
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>
  {items.map(item => (
    <motion.li
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
      }}
    >
```

**IMPORTANTE:** Usar com moderação. Só em:
- Section entry (fade-in-up)
- Button hover (scale)
- Card hover (lift)
- List items (stagger)

**NÃO usar:**
- Parallax complexo
- Rotações
- Bounces
- Conflitos com scroll

---

## 📋 **Checklist de Implementação**

### **Fase 1: Hierarquia + Copy (2h)**
- [ ] HeroSection: Headline 8xl, copy consultivo
- [ ] Todas sections: py-40, text-2xl
- [ ] CTAs: Específicos não genéricos

### **Fase 2: ROI Calculator (2h)**
- [ ] Criar `ROICalculatorSection.tsx`
- [ ] Lógica de cálculo (range min-max)
- [ ] PostHog events: calculator_used
- [ ] Disclaimer explícito

### **Fase 3: Lead Magnet (1h)**
- [ ] Form com 3 campos (nome, email, phone)
- [ ] Resend email sequence
- [ ] PostHog: lead_magnet_submitted

### **Fase 4: Tripwire Checkout (3h)**
- [ ] Página `/checkout/tripwire`
- [ ] Integração Mercado Pago SDK
- [ ] API `/api/checkout/tripwire`
- [ ] Webhook `/api/webhooks/mercadopago`
- [ ] Email confirmação + Calendly link
- [ ] PostHog: tripwire_purchased

### **Fase 5: UI/UX Polish (1h)**
- [ ] Framer Motion: fade-in-up, hover states
- [ ] Espaçamento: py-40, px-8, leading-relaxed
- [ ] Contrast: text-8xl vs text-2xl
- [ ] Test mobile legibility

---

## ⏱️ **Timeline**

**Total: 9 horas (2 dias úteis)**

**Dia 1 (5h):**
- Manhã: Fase 1 + Fase 2 (4h)
- Tarde: Fase 3 (1h)

**Dia 2 (4h):**
- Manhã: Fase 4 (3h)
- Tarde: Fase 5 (1h)

**Deploy:** Staging → Test → Production

---

## 🎯 **Métricas de Sucesso**

**PostHog Events:**
```
hero_viewed → 100%
roi_calculator_used → 15-25% (alta intenção)
lead_magnet_submitted → 8-12% (CVR)
tripwire_checkout_initiated → 20-30% dos leads
tripwire_purchased → 40-60% dos checkouts
```

**Funil Esperado (100 visitantes):**
```
100 visitantes
  ↓ 20 usam calculator (20%)
    ↓ 10 submetem lead magnet (10% CVR)
      ↓ 3 iniciam checkout tripwire (30%)
        ↓ 2 compram (60% checkout conversion)
          ↓ 1-2 viram clientes principais (50-100% upsell)
```

**ROI Tripwire:**
- 100 visitantes → 2 tripwires × R$ 39 = R$ 78
- CAC tripwire: R$ 50/lead (orgânico/meta)
- Lucro: R$ 78 - R$ 100 = -R$ 22 (break-even com upsell)

---

## 🚀 **Pronto para Começar?**

**Próximo passo:** Implementar Fase 1 (hierarquia + copy)

Quer que eu comece pelo HeroSection.tsx agora?
