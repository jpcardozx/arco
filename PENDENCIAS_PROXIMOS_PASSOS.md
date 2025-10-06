# 📋 PENDÊNCIAS & PRÓXIMOS PASSOS - ARCO v2.1

**Data:** 5 de outubro de 2025  
**Status Atual:** 12/44 páginas integradas (27%)  
**Build:** ✅ Clean (0 erros TypeScript)

---

## 🎯 VISÃO GERAL

### Status do Projeto
```
✅ Concluído:
├── Database schema (29 tables)
├── RLS policies (116+ policies)
├── Core features (Finance, Campaigns, Users, WhatsApp, Funil)
├── Type generation
└── Build system

🟡 Em Progresso:
├── Dashboard integration (27%)
└── Mock data elimination (47 occorrences)

❌ Pendente:
├── Analytics integration (0%)
├── External APIs (0%)
├── Storage features (30%)
├── Email features (20%)
└── Advanced features (0%)
```

---

## 📊 PENDÊNCIAS POR CATEGORIA

### 🔴 ALTA PRIORIDADE (Bloqueiam funcionalidades core)

#### 1. **Analytics & Crescimento** (4-5h)
**Página:** `/dashboard/crescimento`  
**Status:** 24 ocorrências de mock data  
**Impacto:** 🔴 ALTO - Funcionalidade principal de tracking

**Pendências:**
- [ ] Integração Google Analytics 4 API
  - OAuth setup
  - Service account configuration
  - Real-time metrics fetching
  - Historical data aggregation
  
- [ ] Integração Google Ads API
  - API credentials setup
  - Campaign performance tracking
  - Click/conversion metrics
  - ROI calculation
  
- [ ] Integração Meta Business API
  - Facebook Ads metrics
  - Instagram Ads metrics
  - Social media performance
  - Audience insights
  
- [ ] Criar tabelas auxiliares:
  ```sql
  - page_views (website analytics)
  - traffic_sources (origem do tráfego)
  - conversion_events (tracking de conversões)
  ```

**Server Actions Necessárias:**
```typescript
// src/app/dashboard/crescimento/actions.ts
- getWebsiteAnalytics(period)
- getTopPages(period)
- getTrafficSources(period)
- getGoogleAdsPerformance(period)
- getMetaAdsPerformance(period)
- getConversionFunnel()
```

**APIs Externas:**
- Google Analytics 4 Data API
- Google Ads API v14
- Meta Marketing API v18
- Google Search Console API (SEO)

**Estimativa:** 5 horas

---

#### 2. **Cloud Storage & Upload** (2-3h)
**Página:** `/dashboard/cloud`  
**Status:** Parcialmente integrado (70%)  
**Impacto:** 🟡 MÉDIO - Upload e compartilhamento faltando

**Pendências:**
- [ ] Implementar upload de arquivos
  - Drag & drop interface (já existe UI)
  - Supabase Storage integration
  - Progress tracking
  - Error handling
  
- [ ] Sistema de favoritos
  - Toggle favorite on files
  - Filter by favorites
  - Persistence no DB
  
- [ ] Compartilhamento de arquivos
  - Gerar link compartilhável
  - Permissões (view/edit)
  - Expiração de links
  - Tracking de acessos

**Server Actions:**
```typescript
// src/app/dashboard/cloud/actions.ts
- uploadFile(file, metadata) ✅ EXISTE (CloudStorageService)
- deleteFile(id) ✅ EXISTE
- toggleFavorite(id)
- shareFile(id, permissions, expiration)
- getSharedLink(id)
- revokeShare(id)
```

**Tabelas Necessárias:**
```sql
CREATE TABLE file_shares (
    id UUID PRIMARY KEY,
    file_id UUID REFERENCES storage_items,
    shared_by UUID REFERENCES auth.users,
    shared_with TEXT, -- email ou 'public'
    permissions TEXT, -- view, edit
    expires_at TIMESTAMPTZ,
    access_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Estimativa:** 2-3 horas

---

#### 3. **Documents System** (2h)
**Página:** `/dashboard/documents`  
**Status:** Parcialmente integrado (80%)  
**Impacto:** 🟡 MÉDIO - Favoritos e tracking faltando

**Pendências:**
- [ ] Sistema de favoritos
  - Toggle favorite on documents
  - Filter by favorites
  - Persistence no storage_items
  
- [ ] Usage tracking
  - Track document views
  - Track downloads
  - Analytics por documento
  - Popular documents ranking

**Server Actions:**
```typescript
// src/app/dashboard/documents/actions.ts
- toggleDocumentFavorite(id)
- trackDocumentView(id)
- trackDocumentDownload(id)
- getDocumentAnalytics(id)
- getMostUsedDocuments()
```

**Campos Adicionais em storage_items:**
```sql
ALTER TABLE storage_items ADD COLUMN IF NOT EXISTS is_favorite BOOLEAN DEFAULT false;
ALTER TABLE storage_items ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE storage_items ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;
ALTER TABLE storage_items ADD COLUMN IF NOT EXISTS last_accessed_at TIMESTAMPTZ;
```

**Estimativa:** 2 horas

---

#### 4. **Mail Integration** (3-4h)
**Página:** `/dashboard/mail`  
**Status:** UI completa, sem integração  
**Impacto:** 🟡 MÉDIO - Email marketing e comunicação

**Pendências:**
- [ ] Integração Gmail API
  - OAuth 2.0 setup
  - List messages
  - Send emails
  - Read/unread status
  - Labels/folders
  
- [ ] Integração Outlook API (Microsoft Graph)
  - OAuth setup
  - Sync inbox
  - Send emails
  - Calendar integration
  
- [ ] Sistema de templates
  - CRUD templates no DB
  - Variables system
  - Preview functionality
  
- [ ] Email tracking
  - Open tracking
  - Click tracking
  - Reply tracking

**Tabelas Necessárias:**
```sql
CREATE TABLE email_accounts (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users,
    provider TEXT, -- gmail, outlook
    email TEXT NOT NULL,
    access_token TEXT ENCRYPTED,
    refresh_token TEXT ENCRYPTED,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE email_messages (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users,
    account_id UUID REFERENCES email_accounts,
    message_id TEXT UNIQUE, -- Provider ID
    subject TEXT,
    from_address TEXT,
    to_addresses TEXT[],
    body TEXT,
    html_body TEXT,
    is_read BOOLEAN DEFAULT false,
    is_starred BOOLEAN DEFAULT false,
    has_attachments BOOLEAN DEFAULT false,
    labels TEXT[],
    received_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE email_templates (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users,
    name TEXT NOT NULL,
    subject TEXT,
    content TEXT,
    variables TEXT[], -- {CLIENT_NAME}, etc
    category TEXT,
    is_favorite BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Server Actions:**
```typescript
// src/app/dashboard/mail/actions.ts
- connectEmailAccount(provider, code)
- getEmails(accountId, filters)
- sendEmail(accountId, to, subject, body)
- markAsRead(messageId)
- toggleStar(messageId)
- getEmailTemplates()
- createEmailTemplate(data)
- useTemplate(templateId, variables)
```

**APIs Externas:**
- Gmail API (Google)
- Microsoft Graph API (Outlook)
- SendGrid (transactional)
- Resend (transactional)

**Estimativa:** 4 horas

---

### 🟡 MÉDIA PRIORIDADE (Melhorias importantes)

#### 5. **Commissions System** (1-2h)
**Página:** `/dashboard/commissions`  
**Status:** UI completa, mock data  
**Impacto:** 🟡 MÉDIO - Gestão de comissões

**Pendências:**
- [ ] Integrar com finance/actions.ts (já existem)
  - getCommissions() ✅ EXISTE
  - createCommission() ✅ EXISTE
  - updateCommissionStatus() ✅ EXISTE
  
- [ ] Implementar metas (goals)
  - Criar tabela commission_goals
  - CRUD de metas
  - Tracking de progresso
  - Dashboard de performance

**Tabela Necessária:**
```sql
CREATE TABLE commission_goals (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users,
    agent_id UUID REFERENCES user_profiles,
    period_type TEXT, -- monthly, quarterly, yearly
    period_start DATE,
    period_end DATE,
    target_amount DECIMAL(12,2),
    current_amount DECIMAL(12,2) DEFAULT 0,
    achieved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Estimativa:** 1-2 horas

---

#### 6. **Analytics Dashboard** (2-3h)
**Página:** `/dashboard/analytics`  
**Status:** Estrutura básica, sem dados  
**Impacto:** 🟡 MÉDIO - Insights e relatórios

**Pendências:**
- [ ] Criar analytics_service.ts
  - Aggregate data from multiple sources
  - Generate insights
  - Trend analysis
  - Predictive analytics
  
- [ ] Implementar dashboards
  - KPIs overview
  - Time-series charts
  - Comparison charts
  - Export reports (PDF/Excel)

**Server Actions:**
```typescript
// src/app/dashboard/analytics/actions.ts
- getKPISummary(period)
- getPerformanceTrends(metric, period)
- getComparativeAnalysis(periods)
- generateReport(type, filters)
- exportReport(reportId, format)
```

**Estimativa:** 3 horas

---

#### 7. **Appointments System** (2h)
**Página:** `/dashboard/appointments`  
**Status:** UI básica, sem integração  
**Impacto:** 🟢 BAIXO - Feature complementar

**Pendências:**
- [ ] Criar tabela appointments
- [ ] Integração com Google Calendar
- [ ] Sistema de notificações
- [ ] Confirmação por email/WhatsApp

**Tabela:**
```sql
CREATE TABLE appointments (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users,
    client_id UUID REFERENCES clients,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    location TEXT,
    status TEXT DEFAULT 'scheduled', -- scheduled, confirmed, completed, cancelled
    reminder_sent BOOLEAN DEFAULT false,
    google_calendar_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Estimativa:** 2 horas

---

#### 8. **Tasks Collaborative** (2-3h)
**Página:** `/dashboard/tasks/collaborative`  
**Status:** UI existe, tabela tasks criada  
**Impacto:** 🟡 MÉDIO - Gestão de tarefas em equipe

**Pendências:**
- [ ] Integrar com tabela tasks (já existe)
- [ ] Sistema de atribuição (assigned_to)
- [ ] Comentários em tarefas
- [ ] Anexos em tarefas
- [ ] Notificações real-time

**Tabelas Adicionais:**
```sql
CREATE TABLE task_comments (
    id UUID PRIMARY KEY,
    task_id UUID REFERENCES tasks,
    user_id UUID REFERENCES auth.users,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE task_attachments (
    id UUID PRIMARY KEY,
    task_id UUID REFERENCES tasks,
    file_id UUID REFERENCES storage_items,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Server Actions:**
```typescript
// src/app/dashboard/tasks/actions.ts
- getTasks(filters)
- createTask(data)
- updateTask(id, data)
- assignTask(taskId, userId)
- addComment(taskId, content)
- attachFile(taskId, fileId)
```

**Estimativa:** 2-3 horas

---

### 🟢 BAIXA PRIORIDADE (Nice to have)

#### 9. **Real-time Features** (3-4h)
**Status:** Não implementado  
**Impacto:** 🟢 BAIXO - UX enhancement

**Pendências:**
- [ ] Supabase Realtime subscriptions
  - New leads notification
  - Task updates
  - WhatsApp messages
  - Comments and mentions
  
- [ ] Toast notifications system
  - Success/error messages
  - Real-time alerts
  - Persistent notifications

**Implementação:**
```typescript
// src/lib/hooks/useRealtime.ts
export function useRealtimeLeads() {
  useEffect(() => {
    const subscription = supabase
      .channel('leads')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'leads'
      }, (payload) => {
        toast.success('Novo lead recebido!')
      })
      .subscribe()
    
    return () => subscription.unsubscribe()
  }, [])
}
```

**Estimativa:** 3-4 horas

---

#### 10. **Advanced Filtering** (2h)
**Status:** Filtros básicos implementados  
**Impacto:** 🟢 BAIXO - UX enhancement

**Pendências:**
- [ ] Filtros avançados com múltiplas condições
- [ ] Saved filters (favoritos)
- [ ] Filter presets
- [ ] Export filtered data

**Estimativa:** 2 horas

---

#### 11. **Stripe Integration** (3-4h)
**Status:** Webhook estrutura existe  
**Impacto:** 🟡 MÉDIO - Pagamentos e assinaturas

**Pendências:**
- [ ] Stripe Checkout integration
- [ ] Subscription management
- [ ] Payment processing
- [ ] Webhook handlers
- [ ] Invoice generation

**Edge Functions:**
```typescript
// supabase/functions/stripe-webhook/index.ts
- Handle payment_intent.succeeded
- Handle customer.subscription.created
- Handle invoice.paid
- Update user tier on payment
```

**Estimativa:** 4 horas

---

#### 12. **SEO & Performance** (2-3h)
**Status:** Básico implementado  
**Impacto:** 🟢 BAIXO - Otimização

**Pendências:**
- [ ] Metadata otimizada em todas as páginas
- [ ] Open Graph tags
- [ ] Structured data (JSON-LD)
- [ ] Sitemap dinâmico
- [ ] Robots.txt
- [ ] Image optimization
- [ ] Code splitting optimization
- [ ] Bundle analysis

**Estimativa:** 2-3 horas

---

#### 13. **Testing** (5-8h)
**Status:** Não implementado  
**Impacto:** 🟢 BAIXO - Qualidade

**Pendências:**
- [ ] Unit tests (Vitest)
- [ ] Integration tests
- [ ] E2E tests (Playwright)
- [ ] API tests
- [ ] Performance tests

**Coverage Target:** 80%

**Estimativa:** 8 horas

---

#### 14. **Documentation** (3-4h)
**Status:** Parcial  
**Impacto:** 🟢 BAIXO - Manutenção

**Pendências:**
- [ ] API documentation
- [ ] Component documentation (Storybook)
- [ ] User guide
- [ ] Admin guide
- [ ] Deployment guide
- [ ] Contributing guide

**Estimativa:** 4 horas

---

## 🗺️ ROADMAP SUGERIDO

### Sprint 6: Analytics & Growth (Semana 1)
**Foco:** Dashboard de crescimento funcional  
**Tempo:** 5-7 horas  
**Prioridade:** 🔴 ALTA

**Tasks:**
1. Setup Google Analytics 4 API (2h)
2. Setup Google Ads API (2h)
3. Setup Meta Business API (2h)
4. Criar server actions (1h)
5. Integrar crescimento page (1h)

**Resultado:** Analytics 100% real-time

---

### Sprint 7: Storage & Email (Semana 1-2)
**Foco:** Comunicação e arquivos  
**Tempo:** 6-8 horas  
**Prioridade:** 🟡 MÉDIA

**Tasks:**
1. Upload implementation (2h)
2. File sharing system (1h)
3. Gmail API integration (2h)
4. Outlook API integration (2h)
5. Email templates CRUD (1h)

**Resultado:** Storage e Email 100% funcionais

---

### Sprint 8: Advanced Features (Semana 2)
**Foco:** Completar funcionalidades  
**Tempo:** 5-7 horas  
**Prioridade:** 🟡 MÉDIA

**Tasks:**
1. Commissions goals (1h)
2. Analytics dashboard (3h)
3. Appointments system (2h)
4. Tasks collaborative (2h)

**Resultado:** 25/44 páginas integradas (57%)

---

### Sprint 9: Real-time & Polish (Semana 3)
**Foco:** UX e otimização  
**Tempo:** 5-7 horas  
**Prioridade:** 🟢 BAIXA

**Tasks:**
1. Real-time subscriptions (3h)
2. Advanced filtering (2h)
3. Performance optimization (2h)

**Resultado:** UX de ponta

---

### Sprint 10: Payments & Production (Semana 3-4)
**Foco:** Monetização e deploy  
**Tempo:** 6-8 horas  
**Prioridade:** 🟡 MÉDIA

**Tasks:**
1. Stripe integration (4h)
2. SEO optimization (2h)
3. Testing basics (2h)
4. Production deployment (1h)

**Resultado:** Sistema pronto para clientes pagantes

---

## 📊 MÉTRICAS DE PROGRESSO

### Atual (Sprint 5 Completo)
```
Dashboard Pages: 12/44 (27%)
Mock Data: 47 occorrences
TypeScript Errors: 0 ✅
Database Tables: 29 ✅
RLS Policies: 116+ ✅
Server Actions: 50+ ✅
External APIs: 0/7 (0%)
```

### Meta Sprint 6 (Analytics)
```
Dashboard Pages: 13/44 (30%)
Mock Data: 23 occorrences (-51%)
External APIs: 3/7 (43%) ← Google Analytics, Ads, Meta
```

### Meta Sprint 7 (Storage & Email)
```
Dashboard Pages: 15/44 (34%)
Mock Data: 19 occorrences (-60%)
External APIs: 5/7 (71%) ← + Gmail, Outlook
```

### Meta Sprint 8 (Advanced)
```
Dashboard Pages: 19/44 (43%)
Mock Data: 5 occorrences (-89%)
External APIs: 5/7 (71%)
```

### Meta Sprint 10 (Production)
```
Dashboard Pages: 25/44 (57%)
Mock Data: 0 occorrences ✅
External APIs: 7/7 (100%) ✅
Test Coverage: 60%+ ✅
```

---

## 🎯 ESTIMATIVAS TOTAIS

### Por Prioridade
```
🔴 Alta Prioridade:    15-19 horas
🟡 Média Prioridade:   15-20 horas
🟢 Baixa Prioridade:   20-27 horas

TOTAL: 50-66 horas (~6-8 semanas part-time)
```

### Por Categoria
```
Analytics & APIs:      12-15 horas
Storage & Files:       4-5 horas
Email Integration:     4-5 horas
Advanced Features:     8-10 horas
Real-time & UX:        5-7 horas
Payments:              4-5 horas
Testing & Docs:        12-15 horas
SEO & Performance:     2-3 horas

TOTAL: 51-65 horas
```

---

## 💡 RECOMENDAÇÕES

### Priorização Imediata
1. **Analytics Integration** (Sprint 6) - Desbloqueia insights
2. **Storage Upload** (Sprint 7) - Completa feature existente
3. **Email Integration** (Sprint 7) - Comunicação essencial

### Pode Esperar
- Real-time features (UX nice-to-have)
- Advanced filtering (não bloqueante)
- Testing completo (importante mas não urgente)
- Documentation (fazer incrementalmente)

### Decisões Técnicas

#### APIs Externas: Fazer ou Não?
**Fazer agora:** ✅
- Google Analytics 4 (essencial para métricas)
- Gmail API (comunicação core)
- Stripe (monetização)

**Fazer depois:** 🟡
- Meta Business API (ads não são core)
- Outlook API (Gmail já cobre 80%)
- Google Ads API (pode usar GA4 como proxy)

**Não fazer:** ❌
- Integrações secundárias sem demanda

#### Padrão de Implementação
```typescript
// 1. Create migration
npx supabase migration new feature_name

// 2. Write SQL (tables + RLS + indexes)

// 3. Apply migration
npx supabase db reset

// 4. Regenerate types
npx supabase gen types typescript --local

// 5. Create server actions
// src/app/dashboard/feature/actions.ts

// 6. Integrate page
// src/app/dashboard/feature/page.tsx
```

---

## 🏆 PRÓXIMO MILESTONE

**Target:** Dashboard 57% integrado (25/44 páginas)  
**ETA:** 4-5 semanas (part-time)  
**Prioridade:** Analytics → Storage → Email → Advanced

**Success Criteria:**
- ✅ 0 mock data em features core
- ✅ Google Analytics integration
- ✅ Storage upload completo
- ✅ Email basic integration
- ✅ 0 TypeScript errors
- ✅ RLS em 100% das tabelas

---

## 📝 NOTAS TÉCNICAS

### Dependências Externas
```json
{
  "@google-analytics/data": "^4.0.0",
  "@google-cloud/storage": "^7.0.0",
  "googleapis": "^126.0.0",
  "@microsoft/microsoft-graph-client": "^3.0.0",
  "stripe": "^14.0.0",
  "resend": "^3.0.0"
}
```

### Environment Variables Necessárias
```bash
# Google APIs
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_ANALYTICS_PROPERTY_ID=
GOOGLE_ADS_CUSTOMER_ID=

# Microsoft
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
RESEND_API_KEY=
```

### Edge Functions Necessárias
```
supabase/functions/
├── google-analytics/     (fetch analytics)
├── google-ads/           (fetch ads metrics)
├── meta-ads/             (fetch meta metrics)
├── stripe-webhook/       (process payments)
├── email-webhook/        (process email events)
└── notification-sender/  (send notifications)
```

---

**Status:** 📋 DOCUMENTO VIVO  
**Última Atualização:** 5 de outubro de 2025  
**Próxima Revisão:** Após Sprint 6
