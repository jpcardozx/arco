# 🎯 SUPABASE - ACESSO RÁPIDO

## ✅ STATUS: ONLINE E PRONTO!

**Supabase CLI Versão:** 2.48.3  
**Status:** 🟢 RODANDO LOCAL  
**Migrations:** ✅ 15/15 aplicadas (local + remote)

---

## 🌐 URLs DE ACESSO

### 🎨 Supabase Studio (Interface Visual)
**URL:** http://127.0.0.1:54323  
**Uso:** Visualizar tabelas, RLS, Auth, Storage, SQL Editor

### 🔌 API REST
**URL:** http://127.0.0.1:54321  
**Uso:** API REST auto-gerada das tabelas

### 📊 GraphQL API
**URL:** http://127.0.0.1:54321/graphql/v1  
**Uso:** Queries GraphQL (alternativa ao REST)

### 📦 Storage S3
**URL:** http://127.0.0.1:54321/storage/v1/s3  
**Uso:** Upload/download de arquivos

### 📧 Mailpit (Email Testing)
**URL:** http://127.0.0.1:54324  
**Uso:** Ver emails enviados em desenvolvimento

---

## 🔑 CREDENCIAIS DE ACESSO

### Database Connection
```bash
postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

### API Keys
```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH
SUPABASE_SERVICE_ROLE_KEY=sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz
```

### S3 Storage (Local)
```env
S3_ACCESS_KEY=625729a08b95bf1b7ff351a663f3a23c
S3_SECRET_KEY=850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907
S3_REGION=local
```

---

## 🛠️ COMANDOS ÚTEIS

### Ver Status
```bash
npx supabase status
```

### Parar Supabase
```bash
npx supabase stop
```

### Iniciar Supabase
```bash
npx supabase start
```

### Ver Migrations
```bash
npx supabase migration list
```

### Aplicar Novas Migrations
```bash
npx supabase db push
```

### Reset Database (⚠️ APAGA TUDO!)
```bash
npx supabase db reset
```

### Gerar Types TypeScript
```bash
pnpm run types
# ou
npx supabase gen types typescript --linked > src/types/supabase.ts
```

---

## 📊 TABELAS DISPONÍVEIS (21 tabelas)

### Core System
- ✅ `user_profiles` - Perfis de usuário (tier, type, subscription)
- ✅ `audit_log` - Log de auditoria

### Analysis & Monitoring
- ✅ `analysis_requests` - Solicitações de análise
- ✅ `analysis_results` - Resultados Lighthouse
- ✅ `performance_metrics` - Métricas históricas
- ✅ `uptime_checks` - Checks de uptime
- ✅ `domain_monitoring` - SSL, DNS, segurança
- ✅ `playbooks` - Planos de ação

### Projects & Support
- ✅ `projects` - Projetos do cliente
- ✅ `project_milestones` - Marcos dos projetos
- ✅ `support_tickets` - Tickets de suporte
- ✅ `support_ticket_messages` - Mensagens dos tickets
- ✅ `storage_items` - Arquivos do usuário

### CRM
- ✅ `clients` - Clientes
- ✅ `leads` - Leads
- ✅ `tasks` - Tarefas

### Marketing
- ✅ `email_campaigns` - Campanhas de email
- ✅ `campaign_analytics` - Analytics das campanhas
- ✅ `whatsapp_contacts` - Contatos WhatsApp
- ✅ `whatsapp_messages` - Mensagens WhatsApp
- ✅ `agency_insights` - Insights compartilhados

---

## 🎯 NAVEGAÇÃO NO STUDIO

### 1. Table Editor
- Ver/editar dados das tabelas
- Adicionar/remover linhas
- Filtrar e buscar

### 2. Authentication
- Ver usuários cadastrados
- Editar user metadata
- Configurar provedores OAuth

### 3. Storage
- Ver buckets
- Upload de arquivos
- Configurar RLS para storage

### 4. SQL Editor
- Executar queries SQL direto
- Salvar queries favoritas
- Ver histórico

### 5. Database
- Ver schema visual
- Migrations aplicadas
- Functions e triggers

### 6. API Docs
- Documentação auto-gerada
- Exemplos de queries
- PostgREST API reference

---

## 🔐 RLS POLICIES (Row Level Security)

### Verificar RLS no Studio:
1. Authentication > Policies
2. Ver policies por tabela
3. Testar com diferentes usuários

### Policies Ativas:
- ✅ Users veem apenas seus próprios dados
- ✅ Admins veem todos os dados
- ✅ Tier gating (free vs paid)
- ✅ Cascade delete (deletar user = deletar dados)

---

## 💡 DICAS RÁPIDAS

### Executar SQL no Studio:
1. Abra http://127.0.0.1:54323
2. Menu lateral > SQL Editor
3. Cole sua query
4. Clique em "Run"

### Ver Dados de uma Tabela:
1. Menu lateral > Table Editor
2. Selecione a tabela
3. Ver/editar dados

### Testar API REST:
```bash
# Exemplo: listar análises
curl http://127.0.0.1:54321/rest/v1/analysis_requests \
  -H "apikey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH"
```

### Ver Logs em Tempo Real:
```bash
# Terminal separado
npx supabase logs
```

---

## ⚠️ IMPORTANTE

### NÃO instalar psql localmente
- Studio é mais visual e produtivo
- API REST já está disponível
- SQL Editor no Studio é suficiente

### Sempre usar via npx
```bash
npx supabase [comando]
```

### Backup antes de reset
```bash
# Fazer dump antes de reset
npx supabase db dump -f backup.sql
```

---

## 🚀 PRÓXIMOS PASSOS

1. ✅ Supabase instalado e rodando
2. ✅ Migrations aplicadas (15/15)
3. ✅ Studio disponível
4. 🔄 **AGORA:** Conectar páginas pendentes ao DB
5. ⏭️ Implementar uploads
6. ⏭️ Background jobs

---

**Última atualização:** 5 de outubro de 2025  
**Status:** 🟢 TUDO PRONTO PARA DESENVOLVIMENTO
