# ✅ Meta Conversions API - Implementação Completa

## 📦 O que foi implementado

Sistema completo de tracking server-side via Meta Conversions API, seguindo a documentação oficial da Meta para integração CRM.

---

## 📁 Arquivos Criados

### 1. **Core Library** (`src/lib/tracking/meta-conversions-api.ts`)
- ✅ Cliente TypeScript completo da API de Conversões da Meta
- ✅ Funções de hash SHA-256 para privacidade (email, telefone, dados pessoais)
- ✅ Helpers para eventos comuns (Lead, Schedule, Purchase)
- ✅ Suporte a eventos de teste
- ✅ Tipos TypeScript completos
- ✅ Singleton pattern para reutilização

**Features:**
- Normalização automática de dados (lowercase, remoção de caracteres especiais)
- Geração de Event ID único para deduplicação
- Suporte a batch de eventos
- Logging estruturado para debug

### 2. **API Route** (`src/app/api/tracking/meta/route.ts`)
- ✅ Endpoint server-side protegido (`POST /api/tracking/meta`)
- ✅ Validação de request
- ✅ Extração automática de IP e User Agent
- ✅ Health check endpoint (`GET /api/tracking/meta`)

**Segurança:**
- Access token nunca exposto ao frontend
- Validação de dados antes de enviar à Meta
- Error handling robusto

### 3. **React Hook** (`src/hooks/useMetaTracking.ts`)
- ✅ Hook `useMetaTracking()` para uso em componentes
- ✅ Coleta automática de FBC/FBP cookies
- ✅ Helpers específicos: `trackLead()`, `trackSchedule()`, `trackPurchase()`, `trackContact()`
- ✅ TypeScript completo

**Automações:**
- Detecta Facebook Click ID (fbclid) da URL
- Lê cookies _fbc e _fbp automaticamente
- Gera FBP se não existir

### 4. **Exemplo Completo** (`src/components/examples/LeadCaptureFormExample.tsx`)
- ✅ Formulário funcional de captura de lead
- ✅ Integração com Supabase + Meta tracking
- ✅ UI/UX profissional com feedback visual
- ✅ Error handling e estados de loading

### 5. **Documentação** (`docs/META_CONVERSIONS_API_SETUP.md`)
- ✅ Guia completo de configuração
- ✅ Exemplos de uso frontend e backend
- ✅ Troubleshooting detalhado
- ✅ Boas práticas

### 6. **Script de Teste** (`scripts/test-meta-api.ts`)
- ✅ Teste automatizado da integração
- ✅ Validação de configuração
- ✅ Diagnóstico de erros comuns

### 7. **Environment Variables** (`.env.example`)
- ✅ Variáveis documentadas:
  - `META_DATASET_ID`
  - `META_CONVERSION_API_TOKEN`
  - `META_TEST_EVENT_CODE`

---

## 🎯 Eventos Suportados

| Evento | Método Helper | Quando Usar |
|--------|---------------|-------------|
| **Lead** | `trackLead()` | Formulário preenchido |
| **Schedule** | `trackSchedule()` | Agendamento confirmado |
| **Purchase** | `trackPurchase()` | Pagamento concluído |
| **Contact** | `trackContact()` | Contato via WhatsApp/telefone |
| **CompleteRegistration** | `trackEvent()` | Cadastro completo |
| **SubmitApplication** | `trackEvent()` | Formulário detalhado |
| **Subscribe** | `trackEvent()` | Newsletter/assinatura |

---

## 🚀 Como Usar

### 1. Configurar Credenciais

```bash
# .env.local
META_DATASET_ID=1574079363975678
META_CONVERSION_API_TOKEN=seu_token_aqui
META_TEST_EVENT_CODE=TEST12345  # opcional
```

### 2. Uso no Frontend (React/Next.js)

```tsx
import { useMetaTracking } from '@/hooks/useMetaTracking';

function MyForm() {
  const { trackLead } = useMetaTracking();

  const handleSubmit = async (data) => {
    // Salvar no banco...
    await saveToDatabase(data);

    // Enviar para Meta
    await trackLead({
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      value: 100,
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 3. Uso no Backend (API Routes)

```typescript
import { getMetaConversionsAPI } from '@/lib/tracking/meta-conversions-api';

export async function POST(request: Request) {
  const { email, phone } = await request.json();

  // Processar lead...
  const lead = await createLead({ email, phone });

  // Enviar para Meta
  const metaAPI = getMetaConversionsAPI();
  await metaAPI.trackLead({
    email,
    phone,
    leadId: lead.id,
    value: 100,
  });

  return Response.json({ success: true });
}
```

### 4. Testar Integração

```bash
# Teste automatizado
npx tsx scripts/test-meta-api.ts

# Ou via curl
curl -X POST http://localhost:3000/api/tracking/meta \
  -H "Content-Type: application/json" \
  -d '{
    "eventName": "Lead",
    "userData": { "email": "teste@example.com" },
    "isTest": true
  }'
```

---

## 🔒 Privacidade & Segurança

### ✅ Implementado

1. **Hash SHA-256** de todos os dados sensíveis:
   - Email
   - Telefone
   - Nome, sobrenome
   - Cidade, estado, CEP

2. **Server-side only**:
   - Access token nunca exposto ao frontend
   - Processamento de dados no servidor

3. **Normalização automática**:
   - Lowercase para emails
   - Remoção de caracteres especiais em telefones
   - Código do país adicionado automaticamente

4. **Conformidade LGPD**:
   - Dados convertidos em hash antes de envio
   - Não armazena dados não-hasheados na Meta

---

## 📊 Verificação

### No Meta Events Manager

1. Acesse: https://business.facebook.com/events_manager
2. Selecione seu Dataset (1574079363975678)
3. Verifique:
   - **Eventos de Teste**: Para eventos com `test_event_code`
   - **Visão Geral**: Para eventos de produção
   - **Diagnóstico**: Taxa de correspondência e erros

### Métricas Importantes

- **Match Rate**: % de eventos correspondidos com usuários Meta (ideal: >70%)
- **Events Received**: Total de eventos processados
- **Event Quality Score**: Qualidade dos dados enviados

---

## 🐛 Troubleshooting

### Erro: "Access token não configurado"
→ Configure `META_CONVERSION_API_TOKEN` em `.env.local`

### Evento não aparece no Events Manager
→ Aguarde até 1 hora (não é instantâneo)
→ Use eventos de teste primeiro para validar

### Match Rate baixo (<50%)
→ Envie mais informações do usuário (email + telefone + nome)
→ Inclua `lead_id` quando disponível
→ Verifique normalização de dados (hash correto)

---

## 📚 Documentação Completa

- **Setup Guide**: `docs/META_CONVERSIONS_API_SETUP.md`
- **Meta Docs**: https://developers.facebook.com/docs/marketing-api/conversions-api
- **CRM Integration**: https://www.facebook.com/business/help/2041873402557161

---

## ✨ Próximos Passos

1. **Configurar credenciais** em `.env.local`
2. **Executar teste**: `npx tsx scripts/test-meta-api.ts`
3. **Integrar em formulários** existentes usando `useMetaTracking()`
4. **Verificar eventos** no Meta Events Manager
5. **Monitorar match rate** e ajustar dados enviados

---

## 🎉 Resultado Esperado

Após implementação completa:

- ✅ Eventos de lead capturados em tempo real
- ✅ Dados enviados com privacidade (hash SHA-256)
- ✅ Match rate otimizado (>70%)
- ✅ ROI mensurável em campanhas Meta Ads
- ✅ Otimização automática de algoritmos Meta

---

**Implementado em**: 21/10/2025  
**API Version**: v24.0  
**Dataset ID**: 1574079363975678  
**Status**: ✅ Pronto para produção
