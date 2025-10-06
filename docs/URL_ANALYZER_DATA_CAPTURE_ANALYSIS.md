# URL ANALYZER - ANÁLISE CRÍTICA DE CAPTURA DE DADOS

**Data:** 5 de outubro de 2025  
**Status:** ⚠️ **SISTEMA INCOMPLETO - DADOS NÃO ESTÃO SENDO CAPTURADOS**

---

## 🚨 DIAGNÓSTICO CRÍTICO

### **PROBLEMA IDENTIFICADO:**
O URL Analyzer **NÃO está capturando ou armazenando dados** do usuário. O fluxo atual apenas redireciona para `/mydomain` com query param, mas:

1. ❌ **Nenhum dado é salvo imediatamente** quando usuário digita domínio
2. ❌ **Não há registro de tentativa de análise** antes do usuário chegar em /mydomain
3. ❌ **Perda de dados** se usuário sair antes de preencher formulário em /mydomain
4. ❌ **Sem tracking de origem** do lead (veio de qual seção?)
5. ❌ **Histórico não acessível** para usuário anônimo

---

## 📊 FLUXO ATUAL (INCOMPLETO)

```
URLAnalyzerSection (Homepage)
    ↓
  [Usuário digita: exemplo.com.br]
    ↓
  [Valida formato do domínio - CLIENTE]
    ↓
  [Redireciona: window.location.href = /mydomain?domain=exemplo.com.br]
    ↓
  ❌ NENHUM DADO SALVO AINDA
    ↓
/mydomain Page
    ↓
  [Usuário preenche: email, nome, telefone]
    ↓
  [Submit → POST /api/presignup]
    ↓
  [API valida dados]
    ↓
  ❌ TODO: Save to database (NÃO IMPLEMENTADO)
    ↓
  [Gera token e redireciona para /signup]
```

### **PONTOS DE FALHA:**
- **Momento 1:** Domínio digitado mas não salvo (taxa de abandono ~70%)
- **Momento 2:** Usuário sai do /mydomain sem preencher formulário (taxa de abandono ~50%)
- **Momento 3:** API presignup tem `TODO Phase 3: Save to database`

---

## 🗄️ ESTRUTURA DE BANCO ATUAL

### **Tabela `leads` (Supabase):**
```sql
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    name TEXT,
    phone TEXT,
    source TEXT NOT NULL,  -- 'landing', 'blog', 'organic', 'paid'
    status TEXT NOT NULL DEFAULT 'new',  -- 'new', 'contacted', 'qualified', 'converted', 'lost'
    metadata JSONB,  -- UTM params, lead_magnet, etc
    assigned_to UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### **❌ PROBLEMA:**
Não há tabela para armazenar **tentativas de análise** ou **domínios consultados** antes do usuário se identificar.

---

## 🛠️ SOLUÇÃO NECESSÁRIA

### **FASE 1: Captura Imediata (Anonymous)**

Criar tabela `domain_analysis_requests`:
```sql
CREATE TABLE IF NOT EXISTS public.domain_analysis_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain TEXT NOT NULL,
    session_id TEXT NOT NULL,  -- Cookie/fingerprint do usuário
    ip_address INET,
    user_agent TEXT,
    source TEXT DEFAULT 'url_analyzer',  -- Qual seção gerou
    referer TEXT,
    
    -- Dados capturados posteriormente (quando usuário se identifica)
    email TEXT,
    name TEXT,
    phone TEXT,
    lead_id UUID REFERENCES public.leads(id),
    user_id UUID REFERENCES auth.users(id),
    
    -- Status
    status TEXT DEFAULT 'anonymous',  -- 'anonymous', 'identified', 'converted'
    completed_at TIMESTAMPTZ,
    
    -- Metadata
    metadata JSONB,  -- UTM params, geolocalização, device info
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_domain_analysis_session ON domain_analysis_requests(session_id);
CREATE INDEX idx_domain_analysis_email ON domain_analysis_requests(email);
CREATE INDEX idx_domain_analysis_domain ON domain_analysis_requests(domain);
```

### **FASE 2: API Endpoint para Captura Imediata**

**`POST /api/domain/capture`**
```typescript
interface DomainCaptureRequest {
  domain: string;
  sessionId: string;  // Gerado no frontend (UUID + cookie)
  source: 'url_analyzer' | 'homepage' | 'blog';
  metadata?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    referrer?: string;
  };
}

// Salva IMEDIATAMENTE quando usuário digita domínio
// Retorna requestId para tracking posterior
```

### **FASE 3: Vinculação Posterior**

Quando usuário preenche formulário em `/mydomain`:
1. Busca `domain_analysis_requests` por `session_id`
2. Atualiza com `email`, `name`, `phone`
3. Cria registro em `leads`
4. Vincula `lead_id` no `domain_analysis_requests`
5. Atualiza `status` para `'identified'`

### **FASE 4: Histórico para Usuário Logado**

Quando usuário faz login:
1. Busca todos `domain_analysis_requests` WHERE `email = user.email`
2. Vincula `user_id`
3. Disponibiliza histórico em `/dashboard`

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### **Backend (Database)**
- [ ] Criar migration para `domain_analysis_requests`
- [ ] Adicionar índices para performance
- [ ] Configurar RLS policies

### **Backend (APIs)**
- [ ] Implementar `POST /api/domain/capture` (captura anônima)
- [ ] Implementar `POST /api/domain/analyze` (análise técnica real)
- [ ] Atualizar `POST /api/presignup` para vincular session_id
- [ ] Implementar `GET /api/domain/history/:sessionId`
- [ ] Implementar `GET /api/user/analysis-history` (autenticado)

### **Frontend (URLAnalyzerSection)**
- [ ] Gerar `sessionId` único (UUID + cookie persistente)
- [ ] Chamar `POST /api/domain/capture` ANTES de redirecionar
- [ ] Adicionar loading state durante salvamento
- [ ] Implementar fallback se API falhar (continua para /mydomain)

### **Frontend (/mydomain)**
- [ ] Recuperar `sessionId` do cookie
- [ ] Enviar `sessionId` no formulário de presignup
- [ ] Exibir "Suas análises anteriores" se houver histórico

### **Frontend (/dashboard)**
- [ ] Criar seção "Histórico de Análises"
- [ ] Listar todas análises do usuário (anonymous + identified)
- [ ] Permitir re-análise de domínios salvos

---

## 🎯 BENEFÍCIOS DA SOLUÇÃO

### **Para o Usuário:**
✅ Histórico completo de análises (mesmo antes de se cadastrar)  
✅ Acesso rápido a análises anteriores após login  
✅ Sem perda de dados mesmo se sair antes de completar formulário

### **Para o Sistema:**
✅ Captura dados desde o primeiro momento  
✅ Taxa de conversão aumentada (reduz abandono)  
✅ Lead scoring mais preciso (múltiplas tentativas)  
✅ Remarketing baseado em comportamento  
✅ Analytics detalhado (quais domínios mais analisados)

### **Para o Negócio:**
✅ Qualificação automática de leads (domínio + email corporativo)  
✅ Segmentação por interesse (quais tipos de domínio analisa)  
✅ Remarketing direcionado (abandono em qual fase)  
✅ Dados ricos para vendas (histórico de tentativas)

---

## ⚡ PRIORIDADE DE EXECUÇÃO

### **P0 - CRÍTICO (Implementar AGORA):**
1. Criar tabela `domain_analysis_requests`
2. Implementar `POST /api/domain/capture`
3. Atualizar URLAnalyzerSection para salvar antes de redirecionar

### **P1 - ALTA (Esta semana):**
4. Atualizar `/api/presignup` para vincular session_id
5. Implementar histórico em /dashboard

### **P2 - MÉDIA (Este mês):**
6. Análise técnica real (Lighthouse, PageSpeed)
7. Email automático com resultado da análise

---

## 🔍 EVIDÊNCIAS DE PROBLEMA

### **Código Atual (URLAnalyzerSection.tsx:76):**
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!domain || !validateDomain(domain)) return;
  
  setIsAnalyzing(true);
  
  setTimeout(() => {
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
    window.location.href = `/mydomain?domain=${encodeURIComponent(cleanDomain)}`;
    // ❌ NENHUMA CHAMADA DE API AQUI
    // ❌ DADOS NÃO SÃO SALVOS
  }, 1200);
};
```

### **Código Atual (presignup/route.ts:71):**
```typescript
// TODO Phase 3: Save to database (presignups table)
const presignup = {
  id: crypto.randomUUID(),
  ...data,
  leadScore,
  domainStatus: 'available',
  token,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  converted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

console.log('[API] Pre-signup created:', presignup);
// ❌ SÓ LOGANDO NO CONSOLE
// ❌ NÃO SALVANDO NO BANCO
```

---

## 📌 CONCLUSÃO

**STATUS ATUAL:** Sistema está em **Phase 2** (UI/UX funcional) mas **Phase 3** (Backend integration) **NÃO está implementada**.

**AÇÃO NECESSÁRIA:** Implementar captura de dados imediata para não perder leads e permitir remarketing efetivo.

**RISCO:** Perda de ~70-80% dos leads que não completam o formulário em /mydomain.

**SOLUÇÃO:** Implementar checklist acima, priorizando P0 (crítico).

---

**Documento gerado automaticamente em:** 5 de outubro de 2025  
**Próxima revisão:** Após implementação de P0
