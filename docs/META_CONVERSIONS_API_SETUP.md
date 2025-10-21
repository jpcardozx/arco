# Meta Conversions API - Guia de Implementação

## 📋 Índice

1. [Configuração Inicial](#configuração-inicial)
2. [Variáveis de Ambiente](#variáveis-de-ambiente)
3. [Uso no Frontend](#uso-no-frontend)
4. [Uso no Backend](#uso-no-backend)
5. [Eventos Disponíveis](#eventos-disponíveis)
6. [Testes](#testes)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Configuração Inicial

### 1. Obter Credenciais da Meta

1. Acesse o **Meta Events Manager**: https://business.facebook.com/events_manager
2. Selecione seu **Dataset** (Pixel)
3. Vá em **Configurações** → **API de Conversões**
4. Copie:
   - **Dataset ID**: `1574079363975678`
   - **Access Token**: Gere um novo token de acesso

### 2. Configurar Variáveis de Ambiente

Adicione ao arquivo `.env.local`:

```bash
# Meta Conversions API
META_DATASET_ID=1574079363975678
META_CONVERSION_API_TOKEN=seu_access_token_aqui

# Opcional: Código de teste (para eventos de teste)
META_TEST_EVENT_CODE=TEST12345
```

⚠️ **IMPORTANTE**: Nunca commite o arquivo `.env.local` ou exponha o access token!

---

## 🌐 Uso no Frontend

### Exemplo 1: Tracking de Lead Capturado

```tsx
'use client';

import { useMetaTracking } from '@/hooks/useMetaTracking';
import { useState } from 'react';

export function LeadCaptureForm() {
  const { trackLead } = useMetaTracking();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Salvar lead no banco de dados...
    const leadId = await saveLeadToDatabase({ email, phone });

    // Enviar evento para Meta
    await trackLead({
      email,
      phone,
      firstName: 'João',
      lastName: 'Silva',
      city: 'São Paulo',
      state: 'SP',
      value: 100, // Valor estimado do lead
      source: 'landing_page',
    });

    console.log('✅ Lead capturado e enviado para Meta');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        required 
      />
      <input 
        type="tel" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Exemplo 2: Tracking de Agendamento

```tsx
import { useMetaTracking } from '@/hooks/useMetaTracking';

export function ScheduleButton() {
  const { trackSchedule } = useMetaTracking();

  const handleSchedule = async () => {
    // Lógica de agendamento...
    
    // Enviar evento para Meta
    await trackSchedule({
      email: 'cliente@email.com',
      phone: '+5511999999999',
      value: 150,
      serviceType: 'Corte de Cabelo',
      scheduledDate: '2025-10-25T14:00:00Z',
    });
  };

  return (
    <button onClick={handleSchedule}>
      Agendar Serviço
    </button>
  );
}
```

### Exemplo 3: Tracking de Compra

```tsx
import { useMetaTracking } from '@/hooks/useMetaTracking';

export function CheckoutPage() {
  const { trackPurchase } = useMetaTracking();

  const handlePaymentSuccess = async (orderData: any) => {
    // Enviar evento de compra para Meta
    await trackPurchase({
      email: orderData.customerEmail,
      phone: orderData.customerPhone,
      value: orderData.totalAmount,
      currency: 'BRL',
      orderId: orderData.orderId,
    });

    console.log('✅ Compra rastreada na Meta');
  };

  return <div>Checkout...</div>;
}
```

---

## 🔧 Uso no Backend (Server-Side)

### Exemplo 1: API Route com Tracking

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getMetaConversionsAPI } from '@/lib/tracking/meta-conversions-api';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Processar lead...
  const lead = await createLead(body);

  // Enviar para Meta
  const metaAPI = getMetaConversionsAPI();
  await metaAPI.trackLead({
    email: lead.email,
    phone: lead.phone,
    leadId: lead.id, // ID do lead no seu CRM
    value: 100,
    ip: request.headers.get('x-forwarded-for') || undefined,
    userAgent: request.headers.get('user-agent') || undefined,
  });

  return NextResponse.json({ success: true });
}
```

### Exemplo 2: Webhook de Status de Lead

```typescript
import { getMetaConversionsAPI } from '@/lib/tracking/meta-conversions-api';

// Webhook que recebe mudanças de status do CRM
export async function POST(request: NextRequest) {
  const { leadId, newStatus, email, phone } = await request.json();

  const metaAPI = getMetaConversionsAPI();

  // Mapear status do CRM para evento Meta
  if (newStatus === 'qualified') {
    await metaAPI.sendEvent({
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        em: [email],
        ph: phone ? [phone] : undefined,
        lead_id: leadId,
      },
      custom_data: {
        lead_status: 'qualified',
      },
    });
  }

  if (newStatus === 'converted') {
    await metaAPI.trackPurchase({
      email,
      phone,
      leadId,
      value: 500,
      currency: 'BRL',
    });
  }

  return NextResponse.json({ success: true });
}
```

---

## 📊 Eventos Disponíveis

| Evento | Descrição | Quando Usar |
|--------|-----------|-------------|
| `Lead` | Lead capturado | Formulário preenchido |
| `CompleteRegistration` | Cadastro completo | Conta criada |
| `Schedule` | Agendamento realizado | Cliente agendou serviço |
| `Purchase` | Compra concluída | Pagamento confirmado |
| `Contact` | Contato iniciado | WhatsApp, telefone, etc. |
| `SubmitApplication` | Aplicação enviada | Formulário detalhado |
| `Subscribe` | Assinatura | Newsletter, plano recorrente |

---

## 🧪 Testes

### Enviar Evento de Teste

```typescript
import { getMetaConversionsAPI } from '@/lib/tracking/meta-conversions-api';

const metaAPI = getMetaConversionsAPI({
  testEventCode: 'TEST12345', // Configurar em .env
});

// Enviar evento de teste
await metaAPI.trackLead(
  {
    email: 'teste@example.com',
    phone: '+5511999999999',
    value: 100,
  },
  true // isTest = true
);
```

### Verificar Evento no Meta Events Manager

1. Acesse: https://business.facebook.com/events_manager
2. Selecione seu Dataset
3. Vá em **Eventos de Teste**
4. Verifique se o evento apareceu (leva ~30 segundos)

### Testar via cURL

```bash
curl -X POST http://localhost:3000/api/tracking/meta \
  -H "Content-Type: application/json" \
  -d '{
    "eventName": "Lead",
    "userData": {
      "email": "teste@example.com",
      "phone": "+5511999999999"
    },
    "customData": {
      "value": 100,
      "currency": "BRL"
    },
    "isTest": true
  }'
```

---

## 🔍 Troubleshooting

### Erro: "Access token não configurado"

**Solução**: Adicione `META_CONVERSION_API_TOKEN` ao `.env.local`

### Evento não aparece no Events Manager

1. Aguarde até 1 hora (eventos não são instantâneos)
2. Verifique se o Dataset ID está correto
3. Verifique logs no console para erros de API
4. Use eventos de teste primeiro para validar conexão

### Hash de dados incorreto

- Emails devem estar em **lowercase** antes do hash
- Telefones devem incluir código do país (ex: `55` para Brasil)
- Remova todos os caracteres especiais dos telefones

### Erro: "Invalid access token"

1. Gere um novo token no Events Manager
2. Verifique se o token tem permissões para o Dataset correto
3. Token pode expirar - configure renovação automática

---

## 📈 Monitoramento

### Ver Eventos no Console

Os eventos logam automaticamente:

```
✅ Meta Conversions API: Evento enviado com sucesso {
  events_received: 1,
  fbtrace_id: 'ABC123...',
  is_test: false
}
```

### Dashboard de Diagnóstico

1. Events Manager → Seu Dataset
2. **Diagnóstico** (menu lateral)
3. Verifique:
   - Taxa de correspondência (Match Rate)
   - Erros de eventos
   - Qualidade dos dados

---

## 🎯 Boas Práticas

### ✅ DO's

- Envie o máximo de informações do usuário possível (email, telefone, nome, etc.)
- Use `lead_id` quando disponível (aumenta precisão)
- Envie eventos em tempo real (não batch histórico)
- Hash dados sensíveis antes de enviar
- Use eventos de teste antes de produção

### ❌ DON'Ts

- Não envie dados sem hash (exceto lead_id)
- Não exponha access token no frontend
- Não envie eventos duplicados (use `event_id` para deduplicação)
- Não envie dados de teste para produção

---

## 📚 Referências

- [Meta Conversions API Docs](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [CRM Integration Guide](https://www.facebook.com/business/help/2041873402557161)
- [Event Parameters](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters)
- [Payload Helper](https://developers.facebook.com/docs/marketing-api/conversions-api/payload-helper)

---

## 🆘 Suporte

Para dúvidas ou problemas:

1. Verifique logs no console
2. Consulte diagnóstico no Events Manager
3. Revise esta documentação
4. Entre em contato com suporte Meta Business

---

**Última atualização**: 21 de outubro de 2025  
**API Version**: v24.0  
**Dataset ID**: 1574079363975678
