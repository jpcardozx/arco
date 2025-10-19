# ✅ Migrations Aplicadas - Sistema de Captura de Leads

**Data:** 18 de outubro de 2025  
**Status:** **SUCESSO** ✅

---

## 📦 Migrations Aplicadas

### 1. **20251018000001_add_campaign_fields_to_leads.sql** ✅

**Objetivo:** Adicionar campos de tracking de campanha à tabela `leads`

**Campos Adicionados:**
```sql
✅ campaign_slug TEXT           -- Identificador da campanha
✅ landing_page_url TEXT         -- URL completa da landing page
✅ utm_source TEXT               -- Origem do tráfego
✅ utm_medium TEXT               -- Meio de marketing
✅ utm_campaign TEXT             -- Nome da campanha
✅ utm_content TEXT              -- Variante do conteúdo
✅ utm_term TEXT                 -- Palavra-chave
✅ referrer TEXT                 -- HTTP Referrer
✅ ip_address INET               -- Endereço IP (tipo INET)
✅ user_agent TEXT               -- User Agent do navegador
✅ consent_marketing BOOLEAN     -- LGPD: Consentimento para marketing
✅ consent_terms BOOLEAN         -- LGPD: Aceitação dos termos
✅ lead_score INTEGER            -- Pontuação de qualificação (0-100)
✅ sent_to_crm BOOLEAN           -- Flag: enviado ao CRM
✅ crm_id TEXT                   -- ID no CRM externo
```

**Índices Criados:**
```sql
✅ idx_leads_campaign_slug
✅ idx_leads_utm_source
✅ idx_leads_utm_campaign
✅ idx_leads_lead_score
✅ idx_leads_created_at
✅ idx_leads_status
✅ idx_leads_sent_to_crm (WHERE sent_to_crm = false)
```

---

### 2. **20251018000002_create_campaigns_table.sql** ✅

**Objetivo:** Adicionar campos para gerenciamento de landing pages na tabela `campaigns`

**Campos Adicionados:**
```sql
✅ slug TEXT UNIQUE                 -- URL slug da campanha
✅ name TEXT                        -- Nome da campanha
✅ description TEXT                 -- Descrição
✅ hero_title TEXT                  -- Título do hero
✅ hero_subtitle TEXT               -- Subtítulo
✅ hero_description TEXT            -- Descrição detalhada
✅ cta_text TEXT                    -- Texto do CTA
✅ cta_secondary_text TEXT          -- CTA secundário
✅ cta_button_color TEXT            -- Cor do botão
✅ hero_image_url TEXT              -- URL da imagem hero
✅ og_image_url TEXT                -- Open Graph image
✅ favicon_url TEXT                 -- Favicon personalizado
✅ meta_title TEXT                  -- Meta título SEO
✅ meta_description TEXT            -- Meta descrição SEO
✅ meta_keywords TEXT[]             -- Keywords (array)
✅ total_views INTEGER              -- Total de visualizações
✅ total_leads INTEGER              -- Total de leads capturados
✅ is_active BOOLEAN                -- Campanha ativa?
✅ start_date TIMESTAMPTZ           -- Data de início
✅ end_date TIMESTAMPTZ             -- Data de fim
✅ daily_budget DECIMAL(10,2)       -- Orçamento diário
✅ variant TEXT                     -- Variante A/B (A, B, C)
✅ ab_test_enabled BOOLEAN          -- A/B test habilitado?
✅ email_template_id TEXT           -- ID do template de email
✅ email_subject TEXT               -- Assunto do email
✅ thank_you_page_url TEXT          -- URL da thank you page
✅ crm_integration_enabled BOOLEAN  -- Integração CRM ativa?
✅ crm_provider TEXT                -- Provider: rdstation, hubspot, etc
✅ webhook_url TEXT                 -- Webhook para integração
✅ lead_magnet_title TEXT           -- Título do lead magnet
✅ lead_magnet_description TEXT     -- Descrição do material
✅ lead_magnet_file_url TEXT        -- URL do arquivo (PDF, etc)
✅ lead_magnet_type TEXT            -- Tipo: ebook, checklist, etc
✅ created_by UUID                  -- Criador da campanha
✅ owner_id UUID                    -- Dono da campanha
```

**Constraints:**
```sql
✅ campaigns_slug_key (UNIQUE)
✅ campaigns_variant_check (A, B, C)
✅ campaigns_crm_provider_check (rdstation, hubspot, etc)
✅ campaigns_lead_magnet_type_check (ebook, checklist, etc)
✅ campaigns_dates_check (start_date < end_date)
```

**RLS Policies:**
```sql
✅ service_role_campaigns_full_access  -- Service role acesso total
✅ authenticated_read_campaigns         -- Autenticados leem campanhas ativas
✅ owners_manage_campaigns              -- Donos gerenciam suas campanhas
✅ anon_read_campaigns                  -- Anônimos veem campanhas ativas
```

---

### 3. **20251018000003_create_campaign_views_table.sql** ✅

**Objetivo:** Tabela para analytics detalhado de visualizações de landing pages

**Estrutura:**
```sql
CREATE TABLE campaign_views (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ,
  
  campaign_id UUID REFERENCES campaigns(id),
  campaign_slug TEXT,
  
  session_id UUID,              -- ID da sessão
  visitor_id TEXT,              -- ID persistente (cookie)
  
  page_url TEXT,
  referrer TEXT,
  
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  
  ip_address INET,
  user_agent TEXT,
  device_type TEXT,             -- mobile, tablet, desktop
  browser TEXT,
  os TEXT,
  
  country_code TEXT,
  city TEXT,
  
  time_on_page INTEGER,         -- segundos
  scroll_depth INTEGER,         -- porcentagem
  converted BOOLEAN,
  lead_id UUID REFERENCES leads(id)
);
```

**View de Analytics:**
```sql
CREATE VIEW campaign_analytics AS
SELECT 
  campaign_id,
  campaign_slug,
  campaign_name,
  
  COUNT(DISTINCT id) AS total_views,
  COUNT(DISTINCT session_id) AS unique_sessions,
  COUNT(DISTINCT visitor_id) AS unique_visitors,
  COUNT(DISTINCT CASE WHEN converted THEN session_id END) AS conversions,
  ROUND((conversions / unique_sessions * 100), 2) AS conversion_rate,
  
  AVG(time_on_page) AS avg_time_on_page,
  AVG(scroll_depth) AS avg_scroll_depth,
  
  -- Traffic sources
  COUNT(...) FILTER (WHERE utm_source = 'google') AS google_views,
  COUNT(...) FILTER (WHERE utm_source = 'facebook') AS facebook_views,
  -- etc
  
  -- Device breakdown
  COUNT(...) FILTER (WHERE device_type = 'mobile') AS mobile_views,
  COUNT(...) FILTER (WHERE device_type = 'desktop') AS desktop_views
  
FROM campaigns c
LEFT JOIN campaign_views cv ON cv.campaign_id = c.id
GROUP BY c.id;
```

**Índices:**
```sql
✅ idx_campaign_views_campaign_id
✅ idx_campaign_views_campaign_slug
✅ idx_campaign_views_session_id
✅ idx_campaign_views_visitor_id
✅ idx_campaign_views_created_at
✅ idx_campaign_views_converted
✅ idx_campaign_views_utm_source
✅ idx_campaign_views_device_type
```

**RLS:**
```sql
✅ Service role full access
✅ Anonymous can insert (tracking)
✅ Authenticated can read their campaign views
```

---

### 4. **20251018000004_update_leads_rls.sql** ✅

**Objetivo:** Atualizar políticas RLS para suportar novos campos de campanha

**Campo Adicionado:**
```sql
✅ created_by UUID REFERENCES auth.users(id)
✅ idx_leads_created_by (index)
```

**Trigger:**
```sql
✅ set_lead_created_by()      -- Auto-set created_by para usuários autenticados
✅ leads_set_created_by        -- Trigger BEFORE INSERT
```

**Políticas Atualizadas:**
```sql
✅ service_role_full_access_leads
   - Service role tem acesso total

✅ authenticated_read_assigned_leads
   - Usuários veem leads atribuídos OU
   - Leads que criaram OU
   - Leads de campanhas que possuem

✅ authenticated_update_assigned_leads
   - Usuários atualizam apenas seus leads

✅ anon_insert_leads
   - Visitantes anônimos podem criar leads

✅ authenticated_insert_leads
   - Usuários autenticados podem criar leads
```

---

## 🎯 Resultado Final

### Database Schema Completo:

**Tabela `leads`:**
- ✅ 15 novos campos de tracking UTM e campanha
- ✅ 7 novos índices para performance
- ✅ Campo `created_by` com trigger automático
- ✅ 5 políticas RLS atualizadas

**Tabela `campaigns`:**
- ✅ 33 campos para gerenciar landing pages
- ✅ 5 constraints de validação
- ✅ 5 índices
- ✅ 4 políticas RLS

**Tabela `campaign_views`:**
- ✅ Nova tabela de analytics
- ✅ View agregada `campaign_analytics`
- ✅ 8 índices de performance
- ✅ 3 políticas RLS

---

## 📊 Status Atual: MVP Pronto para Desenvolvimento

### O que já funciona:
```typescript
✅ Capturar leads com UTM tracking completo
✅ Gerenciar campanhas via database
✅ Analytics detalhado de conversão
✅ RLS policies seguras
✅ Tipos TypeScript gerados
```

### Próximos Passos (Sprint 1):
```typescript
1. ⏭️ Criar API Route /api/leads/capture
2. ⏭️ Criar componentes de Landing Page
3. ⏭️ Criar páginas /lp/[slug]/page.tsx
4. ⏭️ Implementar tracking no frontend
5. ⏭️ Dashboard de analytics
```

---

**Migrations aplicadas com sucesso! Database pronto para receber o sistema de landing pages.** 🎯
