# 🗄️ ARCO MVP V1.0 - DATABASE ARCHITECTURE COMPLETE

## 📊 OVERVIEW

**Total Tables:** 21  
**Total Indexes:** 70+  
**Total RLS Policies:** 60+  
**Total Triggers:** 10  
**Blueprint Source:** Open Source Navigation & Features Draft

---

## 🎯 TABELAS POR CAMADA

### **CAMADA 1: Portal de Diagnóstico (Free User)**

| # | Tabela | Propósito | Features Relacionadas |
|---|--------|-----------|----------------------|
| 1 | `user_profiles` | Sistema de tiers (free/paid) + perfil estendido | Todas as features |
| 2 | `analysis_requests` | Submissões de análise de URL | Relatório Consolidado |
| 3 | `analysis_results` | Resultados do Lighthouse + ARCO Index | Análise de Performance |
| 4 | `playbooks` | Recomendações de otimização (MDX) | Sumário de Otimizações |

**Features Implementadas:**
- ✅ Relatório Consolidado (`/diagnostico/[id]`)
- ✅ Análise de Performance (`/diagnostico/[id]/performance`)
- ✅ Análise de Segurança (`/diagnostico/[id]/seguranca`)
- ✅ Sumário de Otimizações (`/plano-de-acao`)
- ✅ Comparativo de Planos (`/planos`)

---

### **CAMADA 2: Central do Cliente (Paid Client)**

| # | Tabela | Propósito | Features Relacionadas |
|---|--------|-----------|----------------------|
| 5 | `projects` | Projetos dos clientes | Gestão de Projetos |
| 6 | `project_milestones` | Cronograma e entregas | Gestão de Projetos |
| 7 | `performance_metrics` | Core Web Vitals diários | Performance Contínua |
| 8 | `uptime_checks` | Monitoramento de uptime 24/7 | Saúde de Domínio & Uptime |
| 9 | `domain_monitoring` | DNS, SSL, Blacklists | Saúde de Domínio & Uptime |
| 10 | `campaigns` | Campanhas de marketing | Performance de Mídia Paga |
| 11 | `campaign_metrics` | Métricas de ads (manual V1 🎩) | Performance de Mídia Paga |
| 12 | `analytics_data` | Dados de analytics (manual V1 🎩) | Análise de Tráfego Web |
| 13 | `support_tickets` | Sistema de tickets | Central de Suporte |
| 14 | `support_ticket_messages` | Conversas dos tickets | Central de Suporte |
| 15 | `storage_items` | Repositório de arquivos | Repositório de Arquivos |
| 16 | `agency_insights` | Análises publicadas pela agência | Painel Estratégico |
| 17 | `integrations` | Hub de integrações | Conexões (Integrações) |
| 18 | `team_members` | Gestão de equipe do cliente | Gestão de Equipe |

**Features Implementadas:**
- ✅ Painel Estratégico (`/overview`)
- ✅ Performance Contínua (`/saude?tab=performance`)
- ✅ Segurança Ativa (`/saude?tab=seguranca`)
- ✅ Saúde de Domínio & Uptime (`/saude?tab=dominio`)
- ✅ Análise de Tráfego Web (`/crescimento?tab=website`)
- ✅ Performance de Mídia Paga (`/crescimento?tab=ads`)
- ✅ Gestão de Projetos (`/operacoes?tab=projetos`)
- ✅ Central de Suporte (`/operacoes?tab=suporte`)
- ✅ Repositório de Arquivos (`/operacoes?tab=arquivos`)
- ✅ Portal de Faturamento (`/faturamento`)
- ✅ Gestão de Equipe (`/equipe`)
- ✅ Conexões (Integrações) (`/integracoes`)

---

### **CAMADA 3: Painel de Controle (Admin)**

| # | Tabela | Propósito | Features Relacionadas |
|---|--------|-----------|----------------------|
| 19 | `leads` | Pipeline de vendas | Pipeline de Vendas |
| 20 | `proposals` | Propostas geradas (AI) | Gerador de Propostas |
| 21 | `platform_settings` | Configurações globais | Configurações da Plataforma |

**Features Implementadas:**
- ✅ Painel da Agência (`/admin/overview`)
- ✅ Gestão de Clientes (`/admin/clientes`)
- ✅ Perfil do Cliente + Impersonation (`/admin/clientes/[id]`)
- ✅ Pipeline de Vendas (`/admin/vendas`)
- ✅ Gerador de Propostas (`/admin/propostas`)
- ✅ Operações Globais (`/admin/operacoes`)
- ✅ Gestão de Conteúdo (`/admin/conteudo`)
- ✅ Configurações da Plataforma (`/admin/configuracoes`)

---

## 🔐 ROW LEVEL SECURITY (RLS) - ESTRATÉGIA

### **Princípios de Acesso**

1. **Free Users**: Acesso apenas às próprias análises (`analysis_requests`, `analysis_results`)
2. **Paid Clients**: Acesso a todos os recursos do tier + dados do próprio negócio
3. **Team Members**: Acesso baseado em role e permissões granulares
4. **Admins**: Acesso total a todas as tabelas

### **Políticas Principais**

| Tabela | Free User | Paid Client | Team Member | Admin |
|--------|-----------|-------------|-------------|-------|
| `user_profiles` | Own profile | Own profile | View only | Full access |
| `analysis_requests` | Own analyses | Own analyses | - | Full access |
| `projects` | - | Own projects | Based on role | Full access |
| `support_tickets` | - | Own tickets | Based on role | Full access |
| `storage_items` | - | Own files (10GB) | Based on role | Full access |
| `team_members` | - | Own team | View only | Full access |
| `integrations` | - | Request & view | View only | Full access |
| `leads` | - | - | - | Full access |
| `proposals` | View if recipient | View if recipient | - | Full access |
| `platform_settings` | - | - | - | Full access |

---

## 🎩 "MÁGICO DE OZ" V1 (Manual Input)

**Tabelas com input manual:**

1. **`campaign_metrics`**
   - Flag: `manually_entered = true`
   - Campo: `entered_by` (UUID do admin)
   - Propósito: Alimentar dashboard de Ads antes das integrações automáticas

2. **`analytics_data`**
   - Flag: `manually_entered = true`
   - Campo: `entered_by` (UUID do admin)
   - Propósito: Alimentar dashboard de Analytics antes das integrações automáticas

**Fluxo:**
1. Admin acessa `/admin/clientes/[id]` (Perfil do Cliente)
2. Usa formulários de input manual para inserir métricas
3. Dados aparecem instantaneamente no dashboard do cliente
4. Em V1.1+, substituir por integrações automáticas via APIs

---

## 📈 SCHEMA HIGHLIGHTS

### **1. USER_PROFILES (Tier System)**

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  
  -- Tier & Type
  tier TEXT NOT NULL CHECK (tier IN ('free', 'paid')) DEFAULT 'free',
  user_type TEXT NOT NULL CHECK (user_type IN ('client', 'admin')),
  
  -- Subscription (Stripe)
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  subscription_status TEXT,
  
  -- Usage Limits
  monthly_analysis_count INT DEFAULT 0,
  storage_used_mb NUMERIC(10,2) DEFAULT 0,
  monthly_support_tickets INT DEFAULT 0
);
```

**Limites por Tier:**
- **Free**: 3 análises/mês, 0GB storage, 0 tickets
- **Paid**: Unlimited análises, 10GB storage, unlimited tickets

---

### **2. DOMAIN_MONITORING (DNS & SSL)**

```sql
CREATE TABLE domain_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id),
  
  -- DNS Records
  dns_a_record TEXT,
  dns_mx_record TEXT,
  dns_dmarc_record TEXT,
  dns_status TEXT CHECK (dns_status IN ('healthy', 'warning', 'critical')),
  
  -- SSL/TLS
  ssl_valid BOOLEAN,
  ssl_expiry_date DATE,
  ssl_status TEXT CHECK (ssl_status IN ('valid', 'expiring_soon', 'expired', 'invalid')),
  
  -- Blacklist Check
  is_blacklisted BOOLEAN DEFAULT false,
  blacklist_sources TEXT[]
);
```

**Features:**
- ✅ Monitora registros DNS críticos (A, MX, DMARC, SPF, DKIM)
- ✅ Valida SSL/TLS e alerta antes de expirar
- ✅ Verifica blacklists automaticamente

---

### **3. TEAM_MEMBERS (Collaboration)**

```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  
  -- Role & Permissions
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  
  -- Feature Flags
  can_view_analytics BOOLEAN DEFAULT true,
  can_view_campaigns BOOLEAN DEFAULT false,
  can_manage_projects BOOLEAN DEFAULT false,
  can_create_tickets BOOLEAN DEFAULT true,
  can_manage_billing BOOLEAN DEFAULT false
);
```

**Roles:**
- **Owner**: Full access (criador da conta)
- **Admin**: Tudo exceto billing
- **Member**: Visualização + tickets
- **Viewer**: Apenas visualização

---

### **4. INTEGRATIONS (API Connections)**

```sql
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES user_profiles(id),
  
  integration_type TEXT NOT NULL CHECK (integration_type IN ('crm', 'analytics', 'ads', 'email', 'storage', 'other')),
  provider TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('requested', 'pending_approval', 'active', 'paused', 'failed')),
  
  config_encrypted JSONB,
  last_sync_at TIMESTAMPTZ
);
```

**Providers Suportados (V1.1+):**
- **Analytics**: Google Analytics, Plausible, Fathom
- **Ads**: Google Ads, Meta Ads, LinkedIn Ads
- **CRM**: HubSpot, Salesforce, Pipedrive
- **Email**: SendGrid, Mailchimp
- **Storage**: Google Drive, Dropbox

---

### **5. PLATFORM_SETTINGS (Global Config)**

```sql
CREATE TABLE platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  category TEXT CHECK (category IN ('arco_algorithm', 'pricing', 'features', 'integrations', 'system'))
);
```

**Default Settings:**

```json
{
  "arco_algorithm_weights": {
    "performance": 0.35,
    "security": 0.25,
    "seo": 0.20,
    "accessibility": 0.20
  },
  "free_tier_limits": {
    "monthly_analyses": 3,
    "storage_mb": 0,
    "support_tickets": 0
  },
  "paid_tier_limits": {
    "monthly_analyses": -1,
    "storage_mb": 10240,
    "support_tickets": -1
  }
}
```

---

## 🚀 MIGRATION STATUS

### **Migration 001: Complete Schema**
- ✅ 21 tabelas criadas
- ✅ 70+ indexes otimizados
- ✅ 10 triggers (updated_at)
- ✅ 3 default settings inseridas
- **File:** `20250105000000_mvp_v1_complete_schema.sql`

### **Migration 002: RLS Policies**
- ✅ 60+ políticas de segurança
- ✅ 4 helper functions
- ✅ 1 storage bucket (`client-files`)
- ✅ Storage bucket policies
- **File:** `20250105000001_rls_policies.sql`

---

## 📊 RELACIONAMENTOS (ER DIAGRAM)

```
auth.users (Supabase Auth)
    ↓
user_profiles (tier, user_type)
    ↓
    ├── analysis_requests → analysis_results
    ├── projects → project_milestones
    │            → performance_metrics
    │            → uptime_checks
    │            → domain_monitoring
    │            → analytics_data
    ├── campaigns → campaign_metrics
    ├── support_tickets → support_ticket_messages
    ├── storage_items
    ├── agency_insights
    ├── integrations
    ├── team_members
    ├── leads → proposals
    └── (Stripe via stripe_customer_id)
```

---

## ✅ FEATURES vs DATABASE MAPPING

### **Portal de Diagnóstico (Free User)**

| Feature | Tabelas Usadas | Status |
|---------|----------------|--------|
| Relatório Consolidado | `analysis_requests`, `analysis_results` | ✅ Ready |
| Análise de Performance | `analysis_results` | ✅ Ready |
| Análise de Segurança | `analysis_results` | ✅ Ready |
| Análise de Domínio | `domain_monitoring` | ✅ Ready |
| Sumário de Otimizações | `analysis_results`, `playbooks` | ✅ Ready |
| Simulador de Impacto | `analysis_results` (client-side) | ✅ Ready |
| Comparativo de Planos | `platform_settings` (pricing) | ✅ Ready |
| Agendar Análise | `leads` | ✅ Ready |

### **Central do Cliente (Paid Client)**

| Feature | Tabelas Usadas | Status |
|---------|----------------|--------|
| Painel Estratégico | `performance_metrics`, `agency_insights` | ✅ Ready |
| Performance Contínua | `performance_metrics` | ✅ Ready |
| Segurança Ativa | `domain_monitoring`, `analysis_results` | ✅ Ready |
| Saúde de Domínio & Uptime | `domain_monitoring`, `uptime_checks` | ✅ Ready |
| Análise de Tráfego Web | `analytics_data` | ✅ Ready (Manual V1) |
| Performance de Mídia Paga | `campaigns`, `campaign_metrics` | ✅ Ready (Manual V1) |
| Gestão de Projetos | `projects`, `project_milestones` | ✅ Ready |
| Central de Suporte | `support_tickets`, `support_ticket_messages` | ✅ Ready |
| Repositório de Arquivos | `storage_items` | ✅ Ready |
| Portal de Faturamento | Stripe SDK (external) | ✅ Ready |
| Gestão de Equipe | `team_members` | ✅ Ready |
| Conexões (Integrações) | `integrations` | ✅ Ready |

### **Painel de Controle (Admin)**

| Feature | Tabelas Usadas | Status |
|---------|----------------|--------|
| Painel da Agência | `user_profiles`, Stripe API, PostgreSQL Functions | ✅ Ready |
| Gestão de Clientes | `user_profiles` | ✅ Ready |
| Perfil do Cliente | `user_profiles`, todas as tabelas do cliente | ✅ Ready |
| Pipeline de Vendas | `leads`, `proposals` | ✅ Ready |
| Gerador de Propostas | `leads`, `analysis_results`, `proposals` | ✅ Ready |
| Operações Globais | `projects`, `support_tickets` | ✅ Ready |
| Gestão de Conteúdo | `playbooks`, `agency_insights` | ✅ Ready |
| Configurações da Plataforma | `platform_settings` | ✅ Ready |

---

## 🎯 PRÓXIMOS PASSOS

### **1. Aplicar Migrations**
```bash
npx supabase db push
```

### **2. Gerar TypeScript Types**
```bash
npx supabase gen types typescript --local > src/types/database.types.ts
```

### **3. Criar Drizzle Schema**
```bash
# Arquivo: src/lib/db/schema.ts
# Usar migration SQL como referência
```

### **4. Implementar Features**
Seguir roadmap de 6 semanas do `MVP_V1_BLUEPRINT_FINAL.md`

---

## 📚 REFERÊNCIAS

- **Blueprint Source:** Open Source Navigation & Features Draft
- **Main Doc:** `docs/MVP_V1_BLUEPRINT_FINAL.md`
- **Tech Stack:** `docs/TECH_STACK_COMPLETE.md`
- **Work Plan:** `docs/FREE_TIER_ANALYSIS_WORK_PLAN.md`
- **Migrations:** `supabase/migrations/`

---

**Status:** ✅ Database Architecture Complete  
**Date:** 2025-01-05  
**Version:** 1.0  
**Total Tables:** 21  
**Total Features:** 24 (8 Free + 12 Paid + 8 Admin)
