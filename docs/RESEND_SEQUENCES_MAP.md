# 📧 RESEND SEQUENCES MAP

**Referência única:** Mapa macro/micro de sequências de email  
**Complementa:** RESEND_AUDIT_REPORT.md  
**Última atualização:** 26 out 2025

---

## 🗺️ MAPA MACRO - TODAS SEQUÊNCIAS

```
┌─────────────────────────────────────────────────────────┐
│                    ENTRY POINTS                          │
├─────────────────────────────────────────────────────────┤
│ 1. Domain Analyzer (Lead Magnet)                        │
│ 2. Lead Scoring (Hot/Warm/Cold)                         │
│ 3. Booking Confirmation (Agendamentos)                  │
│ 4. Auth Events (Welcome/Reset)                          │
└─────────────────────────────────────────────────────────┘
```

---

## 1. DOMAIN ANALYZER SEQUENCE

### Macro

```
User submits domain
  ↓
E0: Resultado (0h) → "Análise de {domain} concluída"
  ↓
E1: Interpretação (24h) → "Métricas técnicas - {domain}"
  ↓
E2: Benchmark (72h) → "Performance relativa - setor"
```

### Micro (cada email)

#### E0: Entrega de Resultado

- **Trigger:** Form submit + análise completa
- **Subject:** `Análise de {domain} concluída`
- **Preview:** `Score geral: {score}/100 - {issues} oportunidades`
- **Conteúdo:**
  - Score geral + 3 métricas principais
  - 1-2 insights objetivos (dados, não opinião)
  - CTA: "Ver relatório completo" (link para dashboard)
- **Tom:** Técnico, factual, impessoal
- **Status:** ❌ Não implementado

#### E1: Interpretação Técnica

- **Trigger:** E0 enviado + não clicou CTA (24h)
- **Subject:** `Interpretação de métricas - {domain}`
- **Conteúdo:**
  - Deep dive em 1 métrica específica
  - Explicação técnica clara
  - CTA: "Agendar discussão técnica" (soft, opcional)
- **Status:** ❌ Não implementado

#### E2: Benchmark Setorial

- **Trigger:** E1 enviado + não converteu (72h)
- **Subject:** `{domain} vs. média do setor`
- **Conteúdo:**
  - Comparativo impessoal
  - Dados de mercado relevantes
  - CTA: "Discutir otimização" (direto)
- **Status:** ❌ Não implementado

---

## 2. LEAD SCORING SEQUENCE

### Macro

```
Lead qualificado (score 0-100)
  ↓
Hot (80-100) → Email imediato
Warm (50-79) → Nurture 3 steps
Cold (0-49) → Re-engagement
```

### Micro

#### HOT (80-100 pts)

**E0: Contato Direto (5min)**

- **Subject:** `Análise de {empresa} - oportunidades mapeadas`
- **Conteúdo:**
  - Contextualização impessoal
  - Mapeamento objetivo de oportunidades
  - CTA: "Agendar 20min de diagnóstico"
- **Tom:** Consultivo, direto, funcional
- **Status:** 🟡 Implementado, copy precisa fix (muito promocional)

#### WARM (50-79 pts)

**E0: Casos Similares (24h)**

- **Subject:** `Aplicações em contexto similar - {setor}`
- **Conteúdo:**
  - Estudos de caso impessoais
  - Dados de implementação
  - CTA: "Explorar aplicabilidade"
- **Status:** 🟡 Implementado, copy OK

**E1: Recurso Educacional (48h)**

- **Subject:** `Recurso técnico - {tópico relevante}`
- **Conteúdo:**
  - Material educacional
  - Aplicação prática
  - CTA: "Avaliar implementação"
- **Status:** 🟡 Implementado, copy OK

**E2: Diagnóstico (72h)**

- **Subject:** `Disponibilidade para diagnóstico - {empresa}`
- **Conteúdo:**
  - Oferta de análise técnica
  - Escopo claro
  - CTA: "Agendar diagnóstico"
- **Status:** 🟡 Implementado, copy RUIM (tom casual)

#### COLD (0-49 pts)

**E0: Conteúdo Relevante (7d)**

- **Subject:** `Dados atualizados - {tópico de interesse}`
- **Conteúdo:**
  - Novo insight baseado em interesse demonstrado
  - Sem pitch de venda
  - CTA: "Acessar dados"
- **Status:** 🟡 Código pronto, copy PÉSSIMO ("Você desistiu cedo")

**E1: Recurso Sem Compromisso (14d)**

- **Subject:** `Ferramenta disponível - {categoria}`
- **Conteúdo:**
  - Oferta de recurso útil
  - Zero compromisso
  - CTA: "Acessar ferramenta"
- **Status:** ❌ Não existe ainda

---

## 3. BOOKING SEQUENCE

### Macro

```
Booking criado
  ↓
E0: Confirmação (0h) ✅
  ↓
E1: Reminder 24h ✅
  ↓
E2: Reminder 1h ✅
  ↓
E3: Post-session (24h após) ❌
```

### Micro

#### E0: Confirmação

- **Subject:** `Consultoria confirmada - {tipo}`
- **Conteúdo:** Card com detalhes completos
- **Status:** ✅ S-tier

#### E1: Lembrete 24h

- **Subject:** `Sua consultoria é amanhã - {tipo}`
- **Conteúdo:** Detalhes + link de reunião
- **Status:** ✅ S-tier

#### E2: Lembrete 1h

- **Subject:** `Sua consultoria é em 1 hora`
- **Conteúdo:** Link direto + preparação
- **Status:** ✅ S-tier

#### E3: Follow-up Pós-Sessão

- **Subject:** `Próximos passos - Sessão de {data}`
- **Conteúdo:**
  - Resumo de discussão
  - Recursos mencionados
  - Próxima ação recomendada
- **Status:** ❌ Não implementado

---

## 4. AUTH SEQUENCE

### Macro

```
Auth event
  ↓
Welcome (signup) ✅
Reset password (request) ✅
Email change (request) ⚠️
```

### Micro

#### Welcome Email

- **Subject:** `Bem-vindo à ARCO Digital`
- **Conteúdo:** Onboarding profissional
- **Status:** ✅ S-tier

#### Password Reset

- **Subject:** `Redefinição de senha - ARCO Digital`
- **Conteúdo:** Link + contexto seguro
- **Status:** ✅ S-tier

#### Email Change

- **Subject:** `Confirmar mudança de email`
- **Conteúdo:** Validação de segurança
- **Status:** ⚠️ Usar Supabase default (OK)

---

## 📊 STATUS CONSOLIDADO

| Sequência | Emails | Implementado | Copy S-tier | Prioridade |
|-----------|--------|--------------|-------------|------------|
| Domain Analyzer | 3 | ❌ 0/3 | N/A | P1 |
| Lead Hot | 1 | 🟡 1/1 | ❌ | P1 |
| Lead Warm | 3 | 🟡 3/3 | 🟡 2/3 | P1 |
| Lead Cold | 2 | 🟡 1/2 | ❌ 0/2 | P2 |
| Booking | 4 | 🟡 3/4 | ✅ 3/3 | P2 |
| Auth | 3 | ✅ 2/2 | ✅ 2/2 | ✅ Done |

**Total:** 16 emails planejados  
**Implementados:** 9/16 (56%)  
**Copy S-tier:** 5/9 (56% dos implementados)  

---

## 🎯 PRIORIDADES DE AÇÃO

### P1: Copy Fixes (4-6h)

```
1. lead_hot_immediate - reescrever subject + tone
2. lead_warm_72h - remover casualidade
3. lead_cold_7d - profissionalizar completamente
```

### P2: Novos Emails (6-8h)

```
1. lead_cold_14d - criar do zero
2. booking_post_session - criar do zero
3. domain_analyzer_e0 - criar do zero
4. domain_analyzer_e1 - criar do zero
5. domain_analyzer_e2 - criar do zero
```

### P3: Ativação (2-3h)

```
1. Criar campaigns de teste
2. Popular templates no banco
3. Configurar cron job
4. Teste end-to-end
```

---

## 📖 COPY CHECKLIST (CADA EMAIL)

Antes de marcar como "S-tier", validar:

- [ ] Subject: Funcional, claro, máximo 1 emoji (✅📊📧)
- [ ] Preview: Complementa subject (15-25 chars)
- [ ] Tom: Impessoal, profissional, consultivo
- [ ] Estrutura: Contexto → Valor → CTA
- [ ] Linguagem: Zero coloquialismo, zero primeira pessoa
- [ ] CTA: Verbo claro + expectativa realista
- [ ] Plain text: Versão text-only funcional
- [ ] Mobile: Legível em telas pequenas

---

## 🔗 REFERÊNCIAS

- **Código principal:** `/src/lib/leads/email-automation.ts`
- **Templates agendamento:** `/src/app/api/emails/send-confirmation/route.ts`
- **Templates auth:** `/src/lib/email/resend-service.ts`
- **Auditoria completa:** `docs/RESEND_AUDIT_REPORT.md`
- **Schema DB:** `supabase/migrations/20251022000006_add_email_automation.sql`

---

**Este documento é a única fonte de verdade para sequências de email.**

Atualizar sempre que novos fluxos forem criados ou modificados.
