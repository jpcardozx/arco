# Revisão de Tabelas do Supabase

## Status das Correções TypeScript
Data: 6 de outubro de 2025

### Progresso das Correções
- **Antes**: 123 erros TypeScript
- **Após `supabase typegen`**: 92 erros (-31 erros)
- **Após correções manuais**: ~50 erros (-42 erros adicionais)
- **Total de melhorias**: ~73 erros corrigidos (59% de redução)

## Tabelas que Funcionam Corretamente ✅

Estas tabelas foram geradas pelo `supabase typegen` e estão funcionando:

1. **`commissions`** - Comissões de vendas
2. **`whatsapp_messages`** - Mensagens do WhatsApp
3. **`whatsapp_contacts`** - Contatos do WhatsApp
4. **`transactions`** - Transações financeiras
5. **`invoices`** - Faturas
6. **`leads`** - Leads de vendas
7. **`analysis_requests`** - Requisições de análise
8. **`analysis_results`** - Resultados de análise
9. **`user_profiles`** - Perfis de usuário
10. **`client_profiles`** - Perfis de clientes

## Tabelas com Problemas Identificados ⚠️

### 1. **`financial_categories`** - AUSENTE
**Status**: Tabela não existe no banco
**Impacto**: Funcionalidade de categorização financeira não funciona
**Correção necessária**: 
- Criar tabela no banco de dados
- Implementar migration
- Campos sugeridos: `id`, `user_id`, `name`, `type`, `created_at`

### 2. **`support_tickets`** - CAMPOS INCORRETOS
**Status**: Campos não coincidem com o código
**Problemas**:
- Campo `user_id` não existe (código espera, banco tem `client_id`)
- Campo `sender_id` não existe (código espera `author_id`)
**Correção necessária**:
- Atualizar schema da tabela ou corrigir código para usar campos corretos

### 3. **`client_profiles`** - CAMPOS AUSENTES
**Status**: Campos obrigatórios ausentes
**Problemas**:
- `status` (active/inactive)
- `priority_level` (high/medium/low)  
- `name` (nome do contato)
- `contact_name` (nome do contato principal)
- `business_name` (nome da empresa)
**Correção necessária**:
- Adicionar campos ausentes à tabela
- Atualizar migration

### 4. **`client_interactions`** - CAMPO INCORRETO
**Status**: Campo incorreto
**Problemas**:
- Código usa `client_profile_id`, tabela espera `client_id`
**Correção necessária**:
- Padronizar nomenclatura (usar `client_id`)

### 5. **`checklist_items`** - CAMPOS AUSENTES
**Status**: Campos para funcionalidades avançadas ausentes
**Problemas**:
- `estimated_minutes` (tempo estimado)
**Correção necessária**:
- Adicionar campo para estimativa de tempo

## RPC Functions Ausentes 🔧

### 1. **`get_financial_summary`** - AUSENTE
**Função**: Resumo financeiro otimizado
**Parâmetros esperados**: `p_user_id`, `p_period`
**Retorno esperado**: `total_income`, `total_expenses`, `total_commissions`, `net_profit`, `pending_payments`, `transaction_count`
**Status**: Implementado como mock temporário

### 2. **`seed_default_financial_categories`** - AUSENTE  
**Função**: Criar categorias financeiras padrão
**Parâmetros esperados**: `p_user_id`
**Status**: Comentado temporariamente

### 3. **`get_user_leads`** - EXISTE
**Status**: ✅ Função existe e funciona

## Enums Ausentes 📋

O arquivo de tipos atual não exporta os enums individualmente. Precisam ser adicionados:

```typescript
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'
export type AnalysisStatus = 'pending' | 'running' | 'completed' | 'failed'
export type UserTier = 'free' | 'paid'
export type UserType = 'client' | 'admin'
// ... outros enums necessários
```

## Componentes com Problemas de Tipos 🎨

### 1. **`ProgressRing`** - Props Incorretos
**Problemas**:
- `strokeWidth` → deve ser `thickness`
- `showLabel` → deve ser `showValue`  
- `showAnimation` → deve ser `animated`

### 2. **`PremiumButton`** - Props Obrigatórios
**Problemas**:
- `children` é obrigatório mas não está sendo passado em alguns lugares

### 3. **`ChecklistItem`** - Interface Incompatível
**Problemas**:
- Interface local não coincide com tipos do banco
- `description` permite `null` no banco, mas interface espera `string`

## Próximos Passos 🚀

### Prioridade Alta
1. ✅ Executar `supabase typegen` para gerar tipos atualizados
2. ⚠️ Criar tabela `financial_categories`
3. ⚠️ Adicionar campos ausentes em `client_profiles`
4. ⚠️ Corrigir campos em `support_tickets`

### Prioridade Média  
1. ⚠️ Implementar RPC `get_financial_summary`
2. ⚠️ Implementar RPC `seed_default_financial_categories`
3. ⚠️ Adicionar exports de enums individuais
4. ⚠️ Corrigir interfaces de componentes

### Prioridade Baixa
1. ⚠️ Padronizar nomenclatura de campos entre tabelas
2. ⚠️ Adicionar campos opcionais para funcionalidades futuras
3. ⚠️ Revisar e otimizar queries existentes

## Migrations Sugeridas

```sql
-- 1. Adicionar campos em client_profiles
ALTER TABLE client_profiles 
ADD COLUMN status VARCHAR(20) DEFAULT 'active',
ADD COLUMN priority_level VARCHAR(20) DEFAULT 'medium',
ADD COLUMN contact_name VARCHAR(255),
ADD COLUMN business_name VARCHAR(255);

-- 2. Criar tabela financial_categories
CREATE TABLE financial_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) CHECK (type IN ('income', 'expense')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Adicionar campo em checklist_items
ALTER TABLE checklist_items 
ADD COLUMN estimated_minutes INTEGER;

-- 4. Corrigir support_tickets (se necessário)
-- Verificar se é melhor adicionar user_id ou atualizar código
```

## Conclusão

O `supabase typegen` foi extremamente útil e resolveu a maioria dos problemas de tipos. Os erros restantes são principalmente:

1. **Tabelas ausentes** (principalmente `financial_categories`)
2. **Campos ausentes** em tabelas existentes  
3. **Incompatibilidades entre interface local e schema do banco**
4. **Props incorretos** em componentes UI

A maioria das correções são simples migrations de banco de dados ou ajustes de interface.