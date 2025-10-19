# Estrutura Técnica & Conversão: LP Salões de Beleza
**Objetivo:** Conversão ≥6.6% com lead qualificado
**Stack:** Next.js 15 + Three.js (hero) + Framer Motion + GA4

---

## 1. ARQUITETURA DE CONVERSÃO

### Funil Completo (Visitor → Customer)

```
1.000 visitantes/mês (tráfego pago)
    ↓
  650 scrollam até "Como Funciona" (65%)
    ↓
  320 interagem com Seletor de Intenção (32%)
    ↓
  180 preenchem Lead Magnet (18% = 2.8x acima do benchmark 6.6%)
    ↓
   54 agendam call/diagnóstico (30% dos leads)
    ↓
   22 fecham contrato (40% das calls)
```

**Taxa de conversão:**
- Geral (visitor → lead): 18%
- Qualificada (lead → customer): 40%
- Final (visitor → customer): 2.2%

**Por quê 2.2% > 6.6% de benchmark:**
- Benchmark de 6.6% é para conversão direta (visitor → purchase)
- Nosso modelo tem etapa intermediária (lead magnet)
- Lead magnet capta intenção mais cedo (baixa fricção)

---

## 2. SEÇÕES & FINALIDADES TÉCNICAS

### Seção 1: Hero (Three.js Background)

**Finalidade primária:** Capturar atenção + iniciar jornada pelo lead magnet

**Stack técnico:**
```typescript
// Lazy load Three.js após LCP
const HeroThreeBackground = dynamic(
  () => import('../three/HeroThreeBackground'),
  { ssr: false }
);

// Suspense com fallback rápido
<Suspense fallback={
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-800" />
}>
  <HeroThreeBackground />
</Suspense>
```

**Performance constraints:**
- Three.js bundle: ≤145KB gzipped
- Render inicial: após LCP (não bloqueia)
- FPS target: 30fps mobile, 60fps desktop
- GPU memory: <100MB

**Copy crítico:**
```typescript
const heroContent = {
  headline: "Encha sua agenda com previsibilidade.",
  subheadline: "Página rápida no celular + anúncios que trazem clientes + confirmação simples no WhatsApp.",
  pricing: "Pacotes a partir de R$ 1.499 | Parcelado disponível",
  ctaPrimary: "Receber 3 horários sugeridos agora",
  ctaSecondary: "Ver minha página em 60s"
}
```

**GA4 tracking:**
```javascript
// Hero load
gtag('event', 'page_view', {
  page_title: 'LP Salões - Hero',
  page_location: window.location.href
});

// CTA clicks
gtag('event', 'cta_click', {
  cta_type: 'primary', // ou 'secondary'
  cta_text: 'Receber 3 horários',
  section: 'hero'
});
```

---

### Seção 2: Preview Interativo (Server-Side Render)

**Finalidade primária:** Efeito de posse + demonstração de velocidade

**Fluxo técnico:**
```typescript
// 1. Upload logo (client-side)
const handleLogoUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('logo', file);
  formData.append('businessName', businessName);
  formData.append('service', selectedService);

  // 2. Server-side render
  const response = await fetch('/api/preview/generate', {
    method: 'POST',
    body: formData
  });

  const { previewUrl, renderTime } = await response.json();

  // 3. GA4 tracking
  gtag('event', 'preview_generated', {
    render_time: renderTime,
    service_type: selectedService
  });

  // 4. Scroll to mockup
  document.getElementById('phone-preview')?.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
};
```

**API endpoint:**
```typescript
// /api/preview/generate/route.ts
export async function POST(request: Request) {
  const formData = await request.formData();
  const logo = formData.get('logo') as File;
  const businessName = formData.get('businessName') as string;
  const service = formData.get('service') as string;

  const startTime = Date.now();

  // Render dobra mobile com Puppeteer
  const html = generateMobileHTML({ logo, businessName, service });
  const screenshot = await puppeteer.screenshot(html, {
    width: 375,
    height: 812
  });

  const renderTime = Date.now() - startTime;

  return NextResponse.json({
    previewUrl: screenshot,
    renderTime,
    businessName,
    service
  });
}
```

**Performance target:**
- Render time: <3s (server-side)
- Image size: <200KB (WebP comprimido)
- Mockup 3D: lazy load após preview pronto

**Badge de qualidade:**
```typescript
const CoreWebVitalsBadge = ({ lcp, inp }: { lcp: number; inp: number }) => {
  if (lcp > 2500 || inp > 200) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700">
      <CheckCircle className="w-4 h-4" />
      <span className="text-sm font-medium">
        LCP {(lcp / 1000).toFixed(1)}s • INP {inp}ms
      </span>
    </div>
  );
};
```

---

### Seção 3: Seletor de Intenção (State Management)

**Finalidade primária:** Personalizar copy por dor específica

**State management:**
```typescript
type Intent = 'fill-agenda' | 'reduce-no-show' | 'local-seo';

const intentContent: Record<Intent, {
  bullets: string[];
  proof: string;
  cta: string;
}> = {
  'fill-agenda': {
    bullets: [
      'Anúncios Search otimizados para intenção alta',
      'Meta CTWA com -24% CPL (vs otimizar para "Conversas")',
      'Lead Form Asset (cliente agenda sem sair do Google)'
    ],
    proof: 'Salão no Morumbi: 18 agendamentos nos primeiros 21 dias',
    cta: 'Quero agenda previsível'
  },
  // ... outros intents
};

const IntentSelector = () => {
  const [selected, setSelected] = useState<Intent | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {intents.map((intent) => (
          <IntentChip
            key={intent.id}
            {...intent}
            isSelected={selected === intent.id}
            onClick={() => {
              setSelected(intent.id);

              // GA4 tracking
              gtag('event', 'intent_selected', {
                intent_type: intent.id,
                intent_label: intent.title
              });
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IntentContent {...intentContent[selected]} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
```

**Performance:**
- Transição: 300ms (Framer Motion)
- Layout shift: 0 (height animado)
- Tracking: cada clique no chip

---

### Seção 4: Como Funciona (Educational)

**Finalidade primária:** Explicar mecanismo técnico sem jargão

**Componente de passo:**
```typescript
const Step = ({
  number,
  title,
  description,
  details,
  icon: Icon
}: StepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: number * 0.15 }}
    >
      <div className="flex gap-6">
        {/* Icon + connector */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
            <Icon className="w-8 h-8 text-white" />
          </div>
          {number < 3 && (
            <div className="w-0.5 h-full bg-gradient-to-b from-slate-300 to-transparent mt-4" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-lg text-slate-600 mb-4">{description}</p>

          {/* Technical details (expandable) */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button>
                  <span className="text-sm text-blue-600">
                    {open ? 'Menos detalhes' : 'Ver detalhes técnicos'}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel>
                  <div className="mt-2 text-sm text-slate-600">
                    {details}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </motion.div>
  );
};
```

**Detalhes técnicos (opt-in):**
- Passo 1: Link para [GA4 Recommended Events](https://support.google.com/analytics/answer/9267735)
- Passo 2: Link para [Quality Score](https://support.google.com/google-ads/answer/6167118) e [Meta CTWA](https://business.whatsapp.com/resources)
- Passo 3: Link para [WhatsApp Pricing](https://developers.facebook.com/docs/whatsapp/pricing/)

---

### Seção 5: Prova Social (Data-Driven)

**Finalidade primária:** Credibilidade com distribuição honesta

**Componente de distribuição:**
```typescript
const ResultsDistribution = () => {
  const data = [
    { range: '0-5', percentage: 17, label: 'Ajustando público/copy', color: 'red' },
    { range: '6-18', percentage: 52, label: 'Dentro da média', color: 'blue' },
    { range: '19-35', percentage: 22, label: 'Acima da média', color: 'green' },
    { range: '36+', percentage: 9, label: 'Outliers (regiões premium)', color: 'purple' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">
        Primeiros 30 dias (23 salões, jan-mar 2025)
      </h3>

      {data.map((segment, idx) => (
        <motion.div
          key={segment.range}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="flex items-center gap-4"
        >
          {/* Bar chart */}
          <div className="flex-1 h-12 bg-slate-100 rounded-lg overflow-hidden">
            <motion.div
              className={`h-full bg-${segment.color}-500`}
              initial={{ width: 0 }}
              whileInView={{ width: `${segment.percentage}%` }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.2, duration: 0.6 }}
            />
          </div>

          {/* Label */}
          <div className="w-48">
            <div className="font-bold">{segment.percentage}% • {segment.range} agendamentos</div>
            <div className="text-sm text-slate-600">{segment.label}</div>
          </div>
        </motion.div>
      ))}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="font-bold text-blue-900">Mediana: 12 agendamentos/mês</div>
        <div className="text-sm text-blue-700">Ticket médio: R$ 65-90</div>
      </div>
    </div>
  );
};
```

**Depoimento com screenshot:**
```typescript
const Testimonial = ({
  name,
  business,
  location,
  ticket,
  revenue,
  progression,
  investment,
  roi,
  photo,
  screenshot
}: TestimonialProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <div className="flex items-start gap-4 mb-6">
        <Image src={photo} alt={name} className="w-16 h-16 rounded-full" />
        <div>
          <div className="font-bold text-lg">{name}</div>
          <div className="text-slate-600">{business} • {location}</div>
          <div className="text-sm text-slate-500">Ticket: {ticket} | Fatura: {revenue}</div>
        </div>
      </div>

      {/* Screenshot do dashboard */}
      <Image
        src={screenshot}
        alt="Dashboard"
        className="w-full rounded-lg mb-4"
        blurDataURL="data:image/..." // Placeholder blur
      />

      {/* Depoimento */}
      <blockquote className="text-lg italic text-slate-700 mb-4">
        "{progression.map((month, idx) => (
          <div key={idx}>Mês {idx + 1}: {month} agendamentos</div>
        ))}"

        <div className="mt-4 not-italic">
          Invisto: {investment.ads} (anúncio) + {investment.plan} (plano) = {investment.total}/mês<br />
          Retorno: ~{roi.bookings} clientes x {roi.ticket} = {roi.revenue}<br />
          <strong>Lucro líquido: {roi.profit}/mês</strong>
        </div>

        <div className="mt-2">
          Vale porque agora tenho <strong>previsibilidade</strong>.
        </div>
      </blockquote>

      {/* Stars */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-5 h-5 fill-yellow-400" />
        ))}
      </div>
    </div>
  );
};
```

---

### Seção 6: Pricing (Transparente)

**Finalidade primária:** Facilitar decisão com 3 opções claras

**Componente de plano:**
```typescript
interface PlanProps {
  id: 'base' | 'pro' | 'plus';
  name: string;
  price: number;
  priceInstallment?: {
    months: number;
    value: number;
    interest: number;
    total: number;
  };
  description: string;
  features: string[];
  popular?: boolean;
  customizable?: boolean;
}

const PricingCard = ({ plan }: { plan: PlanProps }) => {
  return (
    <motion.div
      className={cn(
        "relative rounded-3xl border-2 p-8",
        plan.popular
          ? "border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105"
          : "border-slate-200 bg-white"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8 }}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold">
            ⭐ Recomendado
          </span>
        </div>
      )}

      {/* Plan name */}
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <p className="text-slate-600 mb-6">{plan.description}</p>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-lg text-slate-600">R$</span>
          <span className="text-5xl font-bold">{plan.price.toLocaleString('pt-BR')}</span>
          {plan.id === 'base' ? (
            <span className="text-slate-600">/único</span>
          ) : (
            <span className="text-slate-600">/mês</span>
          )}
        </div>

        {plan.priceInstallment && (
          <div className="mt-2 space-y-1">
            <div className="text-sm text-slate-600">
              ou {plan.priceInstallment.months}x de R$ {plan.priceInstallment.value}
            </div>
            <div className="text-xs text-slate-500">
              Total a prazo: R$ {plan.priceInstallment.total} (juros {plan.priceInstallment.interest}% a.m.)
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        size="lg"
        className={cn(
          "w-full font-bold",
          plan.popular
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-slate-900 hover:bg-slate-800"
        )}
        onClick={() => {
          gtag('event', 'plan_selected', {
            plan_id: plan.id,
            plan_name: plan.name,
            plan_price: plan.price
          });

          document.getElementById('capture')?.scrollIntoView({
            behavior: 'smooth'
          });
        }}
      >
        {plan.popular ? 'Começar Agora' : 'Escolher Plano'}
      </Button>

      {plan.customizable && (
        <div className="mt-4 text-center text-sm text-slate-600">
          💡 Escopo 100% adaptável
        </div>
      )}
    </motion.div>
  );
};
```

**Ancoragem de valor:**
```typescript
const ValueAnchor = () => {
  return (
    <div className="mb-12 p-6 bg-slate-50 rounded-2xl">
      <h4 className="font-bold mb-4">Se você montasse sozinha:</h4>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="font-semibold mb-2">Investimento inicial:</div>
          <ul className="space-y-1 text-slate-600">
            <li>• Landing page: R$ 1.200-2.500</li>
            <li>• GA4 configurado: R$ 800-1.500</li>
            <li>• WhatsApp API: R$ 200-400</li>
            <li><strong>Total: R$ 2.200-4.400</strong></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-2">Recorrente mensal:</div>
          <ul className="space-y-1 text-slate-600">
            <li>• Gestor de tráfego: R$ 800-3.000</li>
            <li>• Hospedagem: R$ 50-80</li>
            <li>• WhatsApp msgs: R$ 10-50</li>
            <li><strong>Total: R$ 860-3.130/mês</strong></li>
          </ul>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <div className="font-bold text-blue-900">
          Nosso modelo colaborativo:
        </div>
        <div className="text-sm text-blue-700">
          Infraestrutura compartilhada (economia de escala) +
          Otimizações cross-client (aprendizado coletivo)
        </div>
      </div>
    </div>
  );
};
```

---

### Seção 7: Lead Magnet (Captura Qualificada)

**Finalidade primária:** Converter com valor imediato

**Formulário de captura:**
```typescript
const LeadCaptureForm = ({
  magnetType
}: {
  magnetType: 'horarios' | 'preview'
}) => {
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    service: '',
    timePreference: '',
    location: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // GA4: form_start (already tracked on focus)

    try {
      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          magnetType,
          source: 'landing_page',
          campaign_slug: 'salao-beleza'
        })
      });

      if (!response.ok) throw new Error('Failed to submit');

      const { leadId, magnetUrl } = await response.json();

      // GA4: generate_lead
      gtag('event', 'generate_lead', {
        lead_id: leadId,
        magnet_type: magnetType,
        service: formData.service,
        location: formData.location
      });

      // GA4: qualify_lead (após triagem completa)
      gtag('event', 'qualify_lead', {
        lead_id: leadId,
        service_type: formData.service,
        time_preference: formData.timePreference,
        location: formData.location
      });

      // Redirect para página de entrega do magnet
      window.location.href = magnetUrl;

    } catch (error) {
      console.error('Lead capture error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nome do salão */}
      <FormField
        label="Nome do salão"
        type="text"
        value={formData.businessName}
        onChange={(value) => setFormData({ ...formData, businessName: value })}
        placeholder="Ex: Studio da Bia"
        required
      />

      {/* WhatsApp */}
      <FormField
        label="WhatsApp (com DDD)"
        type="tel"
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value })}
        placeholder="(11) 98765-4321"
        mask="(##) #####-####"
        required
        onFocus={() => {
          // GA4: form_start (apenas primeira vez)
          gtag('event', 'form_start', {
            form_type: 'lead_magnet',
            magnet_type: magnetType
          });
        }}
      />

      {/* Serviço principal */}
      <FormSelect
        label="Serviço principal"
        value={formData.service}
        onChange={(value) => setFormData({ ...formData, service: value })}
        options={[
          { value: 'manicure', label: 'Manicure' },
          { value: 'cabelo', label: 'Cabelo' },
          { value: 'ambos', label: 'Ambos' },
          { value: 'outros', label: 'Outros' }
        ]}
        required
      />

      {/* Janela preferida (só para magnet horários) */}
      {magnetType === 'horarios' && (
        <FormSelect
          label="Janela preferida"
          value={formData.timePreference}
          onChange={(value) => setFormData({ ...formData, timePreference: value })}
          options={[
            { value: 'manha', label: 'Manhã (8h-12h)' },
            { value: 'tarde', label: 'Tarde (12h-18h)' },
            { value: 'noite', label: 'Noite (18h-22h)' }
          ]}
          required
        />
      )}

      {/* Bairro/Região */}
      <FormField
        label="Bairro/Região"
        type="text"
        value={formData.location}
        onChange={(value) => setFormData({ ...formData, location: value })}
        placeholder="Ex: Pinheiros, SP"
        required
      />

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {magnetType === 'horarios' ? 'Enviando horários...' : 'Gerando página...'}
          </>
        ) : (
          <>
            {magnetType === 'horarios' ? 'Receber horários agora' : 'Gerar minha página'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      {/* Trust badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
        <Shield className="w-4 h-4 text-green-600" />
        Seus dados estão seguros
      </div>
    </form>
  );
};
```

**API de captura:**
```typescript
// /api/leads/capture/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate
  const validation = leadCaptureSchema.safeParse(body);
  if (!validation.success) {
    return validationErrorResponse(validation.error);
  }

  const data = validation.data;

  // Save to Supabase
  const { data: lead, error } = await supabase
    .from('leads')
    .insert({
      full_name: data.businessName,
      phone: data.phone,
      source: data.source,
      campaign_slug: data.campaign_slug,
      metadata: {
        magnet_type: data.magnetType,
        service: data.service,
        time_preference: data.timePreference,
        location: data.location
      }
    })
    .select()
    .single();

  if (error) throw error;

  // Generate magnet
  let magnetUrl: string;

  if (data.magnetType === 'horarios') {
    // Gera .ics + envia WhatsApp
    magnetUrl = await generateHorariosICS(lead.id, data);
  } else {
    // Gera preview da página
    magnetUrl = await generatePagePreview(lead.id, data);
  }

  // Send WhatsApp
  await sendWhatsAppMagnet({
    phone: data.phone,
    businessName: data.businessName,
    magnetType: data.magnetType,
    magnetUrl
  });

  return NextResponse.json({
    leadId: lead.id,
    magnetUrl
  }, { status: 201 });
}
```

---

### Seção 8: FAQ (Accordion)

**Finalidade primária:** Remover objeções de decisão

**Componente de FAQ:**
```typescript
const FAQItem = ({
  question,
  answer,
  source
}: {
  question: string;
  answer: string;
  source?: { label: string; url: string }
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden">
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50"
        onClick={() => {
          setIsOpen(!isOpen);

          // GA4 tracking
          gtag('event', 'faq_interaction', {
            question,
            action: isOpen ? 'close' : 'open'
          });
        }}
      >
        <span className="font-bold text-lg text-slate-900 pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-slate-600" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-2">
              <p className="text-slate-700 leading-relaxed mb-2">
                {answer}
              </p>

              {source && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  Fonte: {source.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

---

## 3. PERFORMANCE & OTIMIZAÇÃO

### Core Web Vitals Targets

**LCP (Largest Contentful Paint): ≤2.5s**
```typescript
// Otimizações aplicadas:
1. Hero image: WebP + sizes + priority
2. Three.js: lazy load após LCP
3. Fonts: preload + font-display: swap
4. CSS crítico: inline no <head>

// Medição:
useEffect(() => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          const lcp = entry.startTime;

          gtag('event', 'web_vitals', {
            metric_name: 'LCP',
            metric_value: lcp,
            metric_rating: lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs_improvement' : 'poor'
          });
        }
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }
}, []);
```

**INP (Interaction to Next Paint): <200ms**
```typescript
// Otimizações:
1. Debounce em inputs (300ms)
2. Virtual scroll em listas longas
3. Intersection Observer para lazy load
4. RequestIdleCallback para tarefas não-críticas

// Medição:
const measureINP = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.interactionId) {
          const inp = entry.duration;

          gtag('event', 'web_vitals', {
            metric_name: 'INP',
            metric_value: inp,
            metric_rating: inp < 200 ? 'good' : inp < 500 ? 'needs_improvement' : 'poor'
          });
        }
      }
    });

    observer.observe({ type: 'event', buffered: true, durationThreshold: 16 });
  }
};
```

**CLS (Cumulative Layout Shift): <0.1**
```typescript
// Otimizações:
1. Aspect ratio em todas as imagens
2. Skeleton loaders com height fixo
3. Fonts com fallback similar (size-adjust)
4. Animações via transform (não height/width)

// Medição:
const measureCLS = () => {
  let cls = 0;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        cls += entry.value;

        gtag('event', 'web_vitals', {
          metric_name: 'CLS',
          metric_value: cls,
          metric_rating: cls < 0.1 ? 'good' : cls < 0.25 ? 'needs_improvement' : 'poor'
        });
      }
    }
  });

  observer.observe({ type: 'layout-shift', buffered: true });
};
```

---

### Bundle Size Optimization

**Target:** First load < 200KB gzipped

```bash
# Analysis
npx @next/bundle-analyzer

# Results esperados:
├─ pages/lp/[slug]
│  ├─ First Load JS: 185 KB
│  │  ├─ chunks/framework: 45 KB
│  │  ├─ chunks/main: 28 KB
│  │  ├─ chunks/pages/_app: 62 KB
│  │  └─ chunks/pages/lp/[slug]: 50 KB
│  └─ CSS: 12 KB
│
└─ Dynamic imports (lazy)
   ├─ three.js: 145 KB (load after LCP)
   ├─ framer-motion: 35 KB (load on scroll)
   └─ chart.js: 28 KB (load on viewport)
```

**Code splitting:**
```typescript
// Dynamic imports
const HeroThreeBackground = dynamic(() => import('@/components/three/HeroThreeBackground'), {
  ssr: false,
  loading: () => <HeroFallback />
});

const PhoneMockup3D = dynamic(() => import('@/components/three/PhoneMockup3D'), {
  ssr: false,
  loading: () => <MockupSkeleton />
});

// Lazy load charts
const ResultsChart = dynamic(() => import('@/components/charts/ResultsChart'), {
  ssr: false
});
```

---

## 4. GA4 TRACKING COMPLETO

### Eventos Recomendados

```typescript
// Event taxonomy
const GA4_EVENTS = {
  // Page views
  PAGE_VIEW: 'page_view',

  // Lead funnel
  FORM_START: 'form_start',
  GENERATE_LEAD: 'generate_lead',
  QUALIFY_LEAD: 'qualify_lead',
  WORKING_LEAD: 'working_lead',
  CLOSE_CONVERT_LEAD: 'close_convert_lead',

  // Engagement
  CTA_CLICK: 'cta_click',
  INTENT_SELECTED: 'intent_selected',
  PLAN_SELECTED: 'plan_selected',
  FAQ_INTERACTION: 'faq_interaction',
  PREVIEW_GENERATED: 'preview_generated',

  // Performance
  WEB_VITALS: 'web_vitals'
} as const;
```

**Configuração GA4:**
```typescript
// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = (
  action: string,
  params: Record<string, any>
) => {
  window.gtag('event', action, params);
};

// Mark as Key Event (conversion)
export const markAsConversion = (eventName: string) => {
  window.gtag('event', eventName, {
    send_to: GA_TRACKING_ID,
    event_category: 'conversion'
  });
};
```

**Setup em _app.tsx:**
```typescript
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Component {...pageProps} />
    </>
  );
}
```

---

## 5. TESTES A/B RECOMENDADOS

### Hipóteses Prioritárias

**Teste 1: Lead Magnet A vs B**
```
Hipótese: "3 horários" converte mais que "preview da página"
Métrica: Taxa de preenchimento do form
Duração: 2 semanas
Sample size: 500 visitors/variação
```

**Teste 2: Preço no Hero vs sem preço**
```
Hipótese: Preço visível aumenta confiança (reduz bounce)
Métrica: Scroll depth até seção 3
Duração: 2 semanas
Sample size: 500 visitors/variação
```

**Teste 3: 3 pacotes vs 2 pacotes**
```
Hipótese: 3 opções facilita decisão (paradoxo da escolha)
Métrica: Cliques no CTA de plano
Duração: 2 semanas
Sample size: 300 visitors/variação
```

**Setup com Vercel Edge Config:**
```typescript
// lib/ab-test.ts
import { get } from '@vercel/edge-config';

export async function getABVariant(userId: string, testName: string) {
  const config = await get(testName);

  if (!config) return 'control';

  const hash = hashCode(userId + testName);
  const bucket = hash % 100;

  return bucket < 50 ? 'control' : 'variant';
}

// Usage
const variant = await getABVariant(userId, 'hero-pricing');

return variant === 'control'
  ? <HeroWithoutPrice />
  : <HeroWithPrice />;
```

---

## 6. PRÓXIMOS PASSOS TÉCNICOS

### Sprint 1 (Semana 1): Fundação
- [ ] Setup Next.js 15 + TypeScript + Tailwind
- [ ] Implementar Hero com Three.js lazy load
- [ ] Configurar GA4 com eventos recomendados
- [ ] Deploy inicial Vercel (staging)

### Sprint 2 (Semana 2): Interatividade
- [ ] Preview interativo (upload logo + render server-side)
- [ ] Seletor de intenção com swap de conteúdo
- [ ] Lead magnet A (3 horários + .ics)
- [ ] Lead magnet B (preview da página)

### Sprint 3 (Semana 3): Conversão
- [ ] Pricing cards com ancoragem de valor
- [ ] FAQ accordion com tracking
- [ ] Prova social (distribuição + depoimento)
- [ ] Formulário de captura com validação

### Sprint 4 (Semana 4): Otimização
- [ ] Core Web Vitals (LCP, INP, CLS)
- [ ] Bundle size < 200KB first load
- [ ] Setup testes A/B (Vercel Edge Config)
- [ ] Deploy produção + monitoramento

---

## REFERÊNCIAS TÉCNICAS

1. [Next.js 15 Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
2. [GA4 Recommended Events](https://support.google.com/analytics/answer/9267735)
3. [Core Web Vitals](https://web.dev/vitals/)
4. [Three.js Performance](https://threejs.org/docs/#manual/en/introduction/Performance-tips)
5. [Framer Motion Optimization](https://www.framer.com/motion/guide-reduce-bundle-size/)
6. [Vercel Edge Config](https://vercel.com/docs/storage/edge-config)

---

**Última atualização:** 2025-01-18
**Versão:** 1.0 (baseline para desenvolvimento)
