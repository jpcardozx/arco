# 🔧 Relatório de Backend - Funcionalidades Pendentes

**Data:** 6 de outubro de 2025  
**Análise:** Backend ARCO - Status de Implementação

---

## 📊 Status Geral

### ✅ **Backend Funcional (80%)**
- Supabase configurado e funcionando
- RLS (Row Level Security) implementado
- Migrations aplicadas (16 migrations)
- Server Actions funcionais
- Autenticação implementada

### ⚠️ **Integrações Pendentes (20%)**
- APIs externas não integradas
- Serviços de email mock
- WhatsApp Business API stub
- Python lead scoring não conectado
- PDF generation mock

---

## 🚨 APIs com TODOs (Prioridade P0-P1)

### 1. **`/api/presignup` - Lead Capture** ⚠️ CRÍTICO
**Arquivo:** `src/app/api/presignup/route.ts`

#### Funcionalidades MOCK:
```typescript
// TODO Phase 3: Call Python script for lead qualification
const leadScore = calculateMockLeadScore(data);

// TODO Phase 3: Check if email/domain already exists
const existingLead = false; // Mock

// TODO Phase 3: Save to database (presignups table)
// Currently: apenas console.log

// TODO Phase 3: Send confirmation email
// await sendConfirmationEmail(data.email, data.name, token);

// TODO Phase 3: Track analytics event
// await trackEvent('presignup_completed', { ...data, leadScore });

// TODO Phase 3: Update domain_analysis_requests table
// SET email = data.email, name = data.name WHERE id = requestId
```

#### O que funciona:
- ✅ Validação de dados (Zod)
- ✅ Geração de token
- ✅ Response structure

#### O que falta:
- ❌ Integração com Python (lead scoring)
- ❌ Salvar no Supabase (presignups table)
- ❌ Envio de email de confirmação
- ❌ Analytics tracking
- ❌ Update de domain_analysis_requests

---

### 2. **`/api/presignup/[token]` - Token Validation** ⚠️
**Arquivo:** `src/app/api/presignup/[token]/route.ts`

```typescript
// TODO Phase 3: Query database for presignup by token
// Mock response for now
const presignup = {
  email: 'user@example.com',
  name: 'Usuario Teste',
  domain: 'example.com',
  // ...
};
```

#### O que falta:
- ❌ Query real no Supabase
- ❌ Validação de expiração do token
- ❌ Cleanup de tokens expirados

---

### 3. **`/api/lead-magnet` - Lead Magnet Download** ⚠️
**Arquivo:** `src/app/api/lead-magnet/route.ts`

```typescript
// TODO: Integrate with your email service
// Examples:
// - ConvertKit: https://developers.convertkit.com
// - Mailchimp: https://mailchimp.com/developer
// - SendGrid: https://docs.sendgrid.com
// - Resend: https://resend.com/docs

// TODO: Send download link via email
// TODO: Add to CRM/Email list
// TODO: Track conversion in analytics

return {
  downloadUrl: '/downloads/checklist-performance.pdf' // TODO: Real URL
}
```

#### O que funciona:
- ✅ Validação de dados
- ✅ Response structure

#### O que falta:
- ❌ Integração com serviço de email
- ❌ Envio do PDF por email
- ❌ Adicionar a lista de CRM
- ❌ Analytics de conversão
- ❌ URL real do download

---

### 4. **`/api/domain/capture` - Domain Analysis** ✅ FUNCIONAL
**Arquivo:** `src/app/api/domain/capture/route.ts`

**Status:** ✅ **IMPLEMENTADO**
- Salva no Supabase (domain_analysis_requests)
- Validação completa
- Session tracking
- Metadata capture

---

### 5. **`/api/domain/validate` - Domain Validation** ✅ FUNCIONAL
**Arquivo:** `src/app/api/domain/validate/route.ts`

**Status:** ✅ **IMPLEMENTADO**
- Validação de domínio
- Response estruturada

---

## 🔌 Serviços Stub/Mock

### 1. **WhatsApp Business API** ⚠️ STUB
**Arquivo:** `src/lib/services/whatsapp-business-api.ts`

```typescript
export const WhatsAppBusinessAPI = {
  sendMessage: async () => {},
  getTemplates: async () => [],
  healthCheck: async () => ({ 
    status: 'disconnected',
    api: false,
    credentials: false 
  }),
  isConfigured: () => false,
  Templates: {} as Record<string, Template>,
}
```

#### O que falta:
- ❌ Integração com WhatsApp Business API
- ❌ Configuração de credenciais
- ❌ Templates de mensagens
- ❌ Envio real de mensagens
- ❌ Webhook handling

**Prioridade:** P1 (Dashboard WhatsApp depende disso)

---

### 2. **PDF Aliquotas Service** ⚠️ MOCK
**Arquivo:** `src/lib/services/pdf-aliquotas-service.ts`

```typescript
static async generatePDF(data: AliquotaData): Promise<AliquotaPDF> {
  // Simulate PDF generation
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock PDF response
  return {
    url: `/api/pdf/aliquotas/${Date.now()}.pdf`,
    filename: `aliquotas_${data.clientInfo.name}_${Date.now()}.pdf`,
    size: 245632,
    createdAt: new Date(),
  };
}
```

#### O que falta:
- ❌ Geração real de PDF (PDFKit ou similar)
- ❌ Template de PDF profissional
- ❌ Upload para Supabase Storage
- ❌ URL de download real

**Prioridade:** P2 (Feature específica)

---

## 📋 Tabelas do Supabase

### ✅ Tabelas Implementadas (16+)
```
✓ user_profiles
✓ analysis_requests
✓ analysis_results
✓ domain_analysis_requests
✓ interactive_checklists
✓ checklist_items
✓ checklist_activity_logs
✓ client_profiles
✓ client_interactions
✓ whatsapp_contacts
✓ whatsapp_messages
✓ clients
✓ tasks
✓ leads
✓ audit_log
✓ security_scans
```

### ⚠️ Tabela Faltando
```
❌ presignups (mencionada em TODO mas não criada)
```

---

## 🎯 Plano de Ação Recomendado

### **FASE 1: Funcionalidades Críticas (P0)**

#### 1.1 Criar tabela `presignups`
```sql
CREATE TABLE public.presignups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  phone TEXT,
  lead_score INTEGER,
  token TEXT UNIQUE NOT NULL,
  request_id UUID REFERENCES domain_analysis_requests(id),
  session_id UUID,
  expires_at TIMESTAMP WITH TIME ZONE,
  converted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_presignups_token ON presignups(token);
CREATE INDEX idx_presignups_email ON presignups(email);
```

#### 1.2 Implementar `/api/presignup` completo
- [ ] Conectar com Supabase (salvar presignup)
- [ ] Integrar serviço de email (Resend recomendado)
- [ ] Implementar lead scoring (Python ou TypeScript)
- [ ] Adicionar analytics tracking

#### 1.3 Implementar `/api/lead-magnet` completo
- [ ] Integrar Resend ou SendGrid
- [ ] Criar template de email profissional
- [ ] Upload PDF para Supabase Storage
- [ ] Tracking de conversões

---

### **FASE 2: Integrações Importantes (P1)**

#### 2.1 WhatsApp Business API
- [ ] Configurar conta WhatsApp Business
- [ ] Implementar envio de mensagens
- [ ] Criar templates aprovados
- [ ] Implementar webhook para recebimento

#### 2.2 Email Service
**Recomendação:** Resend.com (mais moderno e fácil)

```typescript
// Exemplo de integração Resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'ARCO <onboarding@arco.com.br>',
  to: [email],
  subject: 'Bem-vindo ao ARCO',
  react: WelcomeEmailTemplate({ name, token }),
});
```

---

### **FASE 3: Features Adicionais (P2)**

#### 3.1 PDF Generation
- [ ] Implementar PDFKit ou Puppeteer
- [ ] Criar templates profissionais
- [ ] Upload para Supabase Storage
- [ ] Sistema de cache de PDFs

#### 3.2 Lead Scoring Python
- [ ] Criar endpoint Python/FastAPI
- [ ] Deploy no Railway ou Render
- [ ] Integrar com API route

---

## 💰 Estimativa de Custos Mensais

### Serviços Necessários:

| Serviço | Plano | Custo/mês |
|---------|-------|-----------|
| **Supabase** | Pro | $25 ✅ (já ativo) |
| **Resend** | Free → Paid | $0 → $20 |
| **WhatsApp Business** | Meta | ~$50-100 |
| **Python API** (Railway) | Hobby | $5 |
| **Total** | | **$80-145/mês** |

---

## 📝 Recomendações Imediatas

### 1. **Email Service (URGENTE)**
```bash
# Instalar Resend
pnpm add resend

# Ou SendGrid
pnpm add @sendgrid/mail
```

### 2. **Migration presignups**
```bash
# Criar migration
supabase migration new create_presignups_table

# Aplicar
supabase db push
```

### 3. **Environment Variables**
```env
# .env.local
RESEND_API_KEY=re_xxxxx
WHATSAPP_API_TOKEN=xxxxx
PYTHON_API_URL=https://scoring.arco.com
```

---

## 🎯 Conclusão

### ✅ **O que está pronto:**
- 80% do backend core funcional
- Supabase + RLS implementado
- Server Actions operacionais
- Domain capture funcionando

### ⚠️ **O que precisa de atenção:**
- APIs de terceiros (email, WhatsApp)
- Lead scoring (Python integration)
- Presignups table + flow completo
- PDF generation real

### 🚀 **Próximo passo:**
**Implementar email service (Resend) + criar tabela presignups**

**Tempo estimado:** 2-4 horas  
**Prioridade:** P0 - CRÍTICO para conversão de leads

---

**Status:** Backend está funcional mas precisa de integrações de terceiros para ser production-ready! 🚀
