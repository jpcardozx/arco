# Guia de Análise: Dashboards de Usuário e Cliente

**Data:** 5 de outubro de 2025  
**Objetivo:** Analisar e implementar dados reais nos dashboards mais sensíveis  
**Prioridade:** 🔴 P0 CRÍTICO

---

## 🎯 Por Que Estes São os Mais Delicados?

### 1. **Segurança de Dados**
- Usuários só devem ver **SEUS** dados
- Clientes só devem ver dados do **SEU** projeto
- RLS (Row Level Security) deve ser rigoroso
- Nenhum vazamento de dados entre contas

### 2. **Privacidade e Compliance**
- Dados podem incluir informações sensíveis
- LGPD/GDPR compliance necessário
- Logs de auditoria obrigatórios
- Consentimento de compartilhamento

### 3. **Performance Crítica**
- Queries devem ser otimizadas
- Dados devem carregar rápido
- Cache inteligente necessário
- Não podem travar UI

---

## 🔍 MÉTODO DE ANÁLISE SEGURA

### Passo 1: Análise Estática do Código

```bash
# 1. Verificar quais dados estão mockados
grep -n "Mock data\|TODO\|FIXME" src/app/dashboard/components/UserDashboard.tsx
grep -n "Mock data\|TODO\|FIXME" src/app/dashboard/components/ClientDashboard.tsx

# 2. Verificar uso de APIs
grep -n "supabase\|fetch\|axios" src/app/dashboard/components/UserDashboard.tsx
grep -n "supabase\|fetch\|axios" src/app/dashboard/components/ClientDashboard.tsx

# 3. Verificar uso de hooks
grep -n "use[A-Z]" src/app/dashboard/components/UserDashboard.tsx
grep -n "use[A-Z]" src/app/dashboard/components/ClientDashboard.tsx

# 4. Verificar segurança/autenticação
grep -n "useCurrentUser\|auth\|role\|permission" src/app/dashboard/components/*.tsx
```

### Passo 2: Análise de Estrutura de Dados

```bash
# Verificar tipos TypeScript
cat src/app/dashboard/components/UserDashboard.tsx | grep -A 20 "interface.*Props\|type.*="

# Verificar constantes e dados hardcoded
cat src/app/dashboard/components/UserDashboard.tsx | grep -B 2 -A 10 "const.*Stats\|const.*Data"
```

### Passo 3: Análise de Segurança do Banco

```bash
# Verificar policies RLS existentes
grep -r "CREATE POLICY\|ALTER TABLE.*ENABLE ROW LEVEL SECURITY" supabase/migrations/

# Verificar funções SQL que podem ser usadas
grep -r "CREATE FUNCTION.*get_user\|CREATE FUNCTION.*get_client" supabase/migrations/
```

### Passo 4: Teste de Segurança Manual

**⚠️ NUNCA FAÇA EM PRODUÇÃO - USE AMBIENTE DE TESTE**

```sql
-- Teste 1: Verificar se RLS está ativo
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('leads', 'tasks', 'clients');

-- Teste 2: Tentar acessar dados de outro usuário (DEVE FALHAR)
-- Logar como user1
SELECT * FROM leads WHERE user_id != auth.uid();
-- Resultado esperado: 0 rows (política RLS bloqueou)

-- Teste 3: Verificar policies ativas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('leads', 'tasks', 'clients');
```

---

## 📊 ANÁLISE: UserDashboard

### Dados Mockados Identificados

```tsx
// LINHA 31-68: Stats hardcoded
const userStats = [
  {
    id: 'my-leads',
    value: '32',  // ❌ MOCK
    change: '+8 hoje',  // ❌ MOCK
  },
  // ... todos mockados
]

// LINHA 70-100: Tasks hardcoded
const todayTasks = [
  {
    id: '1',
    title: 'Follow-up João Silva',  // ❌ MOCK
    time: '10:00',  // ❌ MOCK
  },
  // ... todos mockados
]
```

### Dados Reais Necessários

1. **Leads do Usuário**
   - Total de leads atribuídos
   - Leads novos hoje
   - Taxa de conversão pessoal
   - Lead mais quente

2. **Tasks do Usuário**
   - Tasks pendentes (hoje)
   - Tasks atrasadas
   - Tasks completadas (semana)
   - Próxima task urgente

3. **Agendamentos**
   - Reuniões hoje
   - Próximas 3 reuniões
   - Taxa de comparecimento

4. **Performance Pessoal**
   - Conversões do mês
   - Ranking vs. equipe
   - Meta de conversões

### SQL Functions Necessárias

```sql
-- Function 1: get_user_stats(user_id)
CREATE OR REPLACE FUNCTION get_user_stats(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'my_leads', (SELECT COUNT(*) FROM leads WHERE assigned_to = p_user_id),
    'new_today', (SELECT COUNT(*) FROM leads 
                  WHERE assigned_to = p_user_id 
                  AND DATE(created_at) = CURRENT_DATE),
    'my_tasks', (SELECT COUNT(*) FROM tasks 
                 WHERE assigned_to = p_user_id 
                 AND status = 'pending'),
    'urgent_tasks', (SELECT COUNT(*) FROM tasks 
                     WHERE assigned_to = p_user_id 
                     AND priority = 'high' 
                     AND status = 'pending'),
    'appointments_today', (SELECT COUNT(*) FROM tasks 
                           WHERE assigned_to = p_user_id 
                           AND task_type = 'meeting'
                           AND DATE(due_date) = CURRENT_DATE),
    'conversions_month', (SELECT COUNT(*) FROM leads 
                          WHERE assigned_to = p_user_id 
                          AND status = 'converted'
                          AND DATE_TRUNC('month', updated_at) = DATE_TRUNC('month', CURRENT_DATE))
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS: Usuário só pode ver seus próprios stats
CREATE POLICY "Users can view own stats"
  ON leads FOR SELECT
  USING (assigned_to = auth.uid());
```

---

## 📊 ANÁLISE: ClientDashboard

### Dados Mockados Identificados

```tsx
// LINHA 43-82: Métricas hardcoded
const clientMetrics = [
  {
    id: 'leads',
    value: '247',  // ❌ MOCK
    change: '+42%',  // ❌ MOCK
  },
  // ... todos mockados
]

// LINHA 84-92: Progresso do projeto hardcoded
const projectProgress = {
  current: 65,  // ❌ MOCK
  milestones: [...]  // ❌ MOCK
}
```

### Dados Reais Necessários

1. **Métricas do Cliente**
   - Leads gerados (campanha do cliente)
   - Conversões reais
   - ROI calculado
   - Visualizações de página

2. **Progresso do Projeto**
   - % real de conclusão
   - Milestones atingidos
   - Próximas entregas
   - Status de cada etapa

3. **Performance de Campanhas**
   - Campanhas ativas
   - CTR médio
   - Custo por lead
   - Budget utilizado

4. **Dados de Domínio/DNS**
   - Status do domínio
   - Certificado SSL
   - Uptime
   - Page speed score

### SQL Functions Necessárias

```sql
-- Function 1: get_client_metrics(client_id)
CREATE OR REPLACE FUNCTION get_client_metrics(p_client_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
  period_start TIMESTAMP := NOW() - INTERVAL '30 days';
BEGIN
  SELECT json_build_object(
    'leads_generated', (SELECT COUNT(*) FROM leads 
                        WHERE client_id = p_client_id 
                        AND created_at >= period_start),
    'conversions', (SELECT COUNT(*) FROM leads 
                    WHERE client_id = p_client_id 
                    AND status = 'converted'
                    AND updated_at >= period_start),
    'roi', (SELECT COALESCE(
              (SUM(conversion_value) / NULLIF(SUM(investment), 0) * 100),
              0
            ) FROM client_campaigns 
            WHERE client_id = p_client_id),
    'page_views', (SELECT COALESCE(SUM(views), 0) FROM client_analytics 
                   WHERE client_id = p_client_id 
                   AND date >= CURRENT_DATE - 30),
    'conversion_rate', (SELECT CASE 
                          WHEN COUNT(*) > 0 
                          THEN ROUND((COUNT(*) FILTER (WHERE status = 'converted')::NUMERIC / COUNT(*) * 100), 2)
                          ELSE 0 
                        END
                        FROM leads 
                        WHERE client_id = p_client_id 
                        AND created_at >= period_start)
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS: Cliente só pode ver seus próprios dados
CREATE POLICY "Clients can view own metrics"
  ON leads FOR SELECT
  USING (client_id = auth.uid());
```

---

## 🛡️ CHECKLIST DE SEGURANÇA

Antes de implementar, validar:

### Autenticação
- [ ] `useCurrentUser()` está sendo chamado
- [ ] Loading state enquanto busca usuário
- [ ] Redirect se não autenticado
- [ ] Token JWT válido

### Autorização (RLS)
- [ ] Policies RLS ativas em todas as tabelas
- [ ] `auth.uid()` usado nas policies
- [ ] SECURITY DEFINER nas functions
- [ ] Test: usuário A não vê dados do usuário B

### Validação de Dados
- [ ] Input sanitization
- [ ] Type checking (Zod schemas)
- [ ] Rate limiting nas APIs
- [ ] CSRF protection

### Privacidade
- [ ] Dados sensíveis mascarados
- [ ] Logs não contêm PII
- [ ] Consentimento de tracking
- [ ] Data retention policies

---

## 🚀 IMPLEMENTAÇÃO PASSO A PASSO

### Para UserDashboard:

```bash
# 1. Criar migration SQL
supabase/migrations/20250105000001_add_user_dashboard_functions.sql

# 2. Criar hook React Query
src/lib/hooks/use-user-stats.ts

# 3. Integrar no componente
src/app/dashboard/components/UserDashboard.tsx

# 4. Testar com múltiplos usuários
# - Criar 2 usuários teste
# - Atribuir leads diferentes
# - Verificar isolamento de dados
```

### Para ClientDashboard:

```bash
# 1. Criar migration SQL
supabase/migrations/20250105000002_add_client_dashboard_functions.sql

# 2. Criar hook React Query
src/lib/hooks/use-client-metrics.ts

# 3. Integrar no componente
src/app/dashboard/components/ClientDashboard.tsx

# 4. Testar com múltiplos clientes
# - Criar 2 clientes teste
# - Criar leads/campanhas
# - Verificar isolamento
```

---

## 🧪 TESTES DE SEGURANÇA OBRIGATÓRIOS

### Teste 1: Isolamento de Dados
```typescript
// UserA loga e vê N leads
// UserB loga e vê M leads diferentes
// Nenhum lead em comum (a menos que seja admin)
```

### Teste 2: Tentativa de Bypass
```typescript
// Usuário tenta mudar user_id na query
// Deve ser bloqueado pelo RLS
```

### Teste 3: SQL Injection
```typescript
// Tentar injetar SQL nos parâmetros
// Deve ser sanitizado pela função
```

### Teste 4: Rate Limiting
```typescript
// Fazer 100 requests em 1 segundo
// Deve ser bloqueado após N requests
```

---

## 📋 COMANDO DE ANÁLISE RÁPIDA

Execute este script para análise completa:

```bash
#!/bin/bash
# dashboard-analysis.sh

echo "🔍 Analisando UserDashboard..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "1. Dados mockados:"
grep -n "value: '" src/app/dashboard/components/UserDashboard.tsx | head -10

echo -e "\n2. Uso de hooks:"
grep -n "use[A-Z]" src/app/dashboard/components/UserDashboard.tsx

echo -e "\n3. Segurança:"
grep -n "useCurrentUser\|auth" src/app/dashboard/components/UserDashboard.tsx

echo -e "\n\n🔍 Analisando ClientDashboard..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "1. Dados mockados:"
grep -n "value: '" src/app/dashboard/components/ClientDashboard.tsx | head -10

echo -e "\n2. Uso de hooks:"
grep -n "use[A-Z]" src/app/dashboard/components/ClientDashboard.tsx

echo -e "\n3. Segurança:"
grep -n "useCurrentUser\|auth" src/app/dashboard/components/ClientDashboard.tsx

echo -e "\n\n🔒 Verificando RLS no banco..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
grep -r "ROW LEVEL SECURITY" supabase/migrations/ | wc -l
echo "Tabelas com RLS encontradas: ^^^"

echo -e "\n✅ Análise completa!"
```

---

## 🎯 PRIORIDADE DE IMPLEMENTAÇÃO

### Fase 1 - UserDashboard (2-3 horas)
1. ✅ Análise estática completa
2. 🔴 Criar SQL functions
3. 🔴 Criar hooks React Query
4. 🔴 Integrar no componente
5. 🔴 Testar segurança

### Fase 2 - ClientDashboard (2-3 horas)
1. ✅ Análise estática completa
2. 🔴 Criar SQL functions
3. 🔴 Criar hooks React Query
4. 🔴 Integrar no componente
5. 🔴 Testar segurança

### Fase 3 - Validação Final (1 hora)
1. Testes de penetração básicos
2. Auditoria de logs
3. Performance testing
4. Code review de segurança

---

## 📞 PRÓXIMO PASSO

Execute o comando de análise rápida:

```bash
chmod +x dashboard-analysis.sh
./dashboard-analysis.sh > dashboard-analysis-report.txt
cat dashboard-analysis-report.txt
```

Ou use Copilot para análise interativa:
- "Analisar UserDashboard linha por linha"
- "Identificar dados mockados em ClientDashboard"
- "Verificar segurança RLS em todas as queries"

---

**FIM DO GUIA**

*Este é um guia vivo - atualize conforme descobre novos padrões ou vulnerabilidades.*
