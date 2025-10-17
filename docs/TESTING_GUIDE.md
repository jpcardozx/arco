# 🧪 GUIA COMPLETO DE TESTES - Sistema de Pagamentos ARCO

**Data:** 08 de Outubro de 2025  
**Ambiente:** Mercado Pago Sandbox + Supabase Test Environment

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Cartões de Teste Oficiais](#cartões-de-teste-oficiais)
3. [Cenários de Teste](#cenários-de-teste)
4. [Interface de Testes](#interface-de-testes)
5. [Fluxo de Teste Completo](#fluxo-de-teste-completo)
6. [Verificação de Resultados](#verificação-de-resultados)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 VISÃO GERAL

O sistema de testes integrado permite testar **todos os cenários de pagamento** sem usar dados reais ou fazer cobranças reais. Utilizamos:

- ✅ **Cartões de Teste Oficiais** do Mercado Pago
- ✅ **Email de Teste:** `test@testuser.com` (único permitido)
- ✅ **Interface com shadcn/ui** integrada aos Bricks do MP
- ✅ **Cenários documentados** (aprovado, recusado, pendente, etc.)

---

## 💳 CARTÕES DE TESTE OFICIAIS

### **Cartão 1: Mastercard**
```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/30
Tipo: Crédito
```

### **Cartão 2: Visa**
```
Número: 4235 6477 2802 5682
CVV: 123
Validade: 11/30
Tipo: Crédito
```

### **Cartão 3: American Express**
```
Número: 3753 651535 56885
CVV: 1234
Validade: 11/30
Tipo: Crédito
```

### **Cartão 4: Elo (Débito)**
```
Número: 5067 7667 8388 8311
CVV: 123
Validade: 11/30
Tipo: Débito
```

---

## 🎭 CENÁRIOS DE TESTE

O **nome do titular do cartão** determina o resultado do pagamento:

### ✅ **APROVADO**
```
Nome: APRO
CPF: 12345678909
Resultado: Pagamento aprovado com sucesso
Status Final: approved
```

### ❌ **RECUSADO - Erro Geral**
```
Nome: OTHE
CPF: 12345678909
Resultado: Recusado por erro geral
Status Final: rejected
```

### ⏳ **PENDENTE**
```
Nome: CONT
CPF: 12345678909
Resultado: Pagamento pendente (aguardando processamento)
Status Final: pending
```

### 💰 **RECUSADO - Fundos Insuficientes**
```
Nome: FUND
CPF: 12345678909
Resultado: Cartão sem limite disponível
Status Final: rejected
Motivo: insufficient_funds
```

### 🔒 **RECUSADO - CVV Inválido**
```
Nome: SECU
CPF: 12345678909
Resultado: Código de segurança incorreto
Status Final: rejected
Motivo: invalid_cvv
```

### 📅 **RECUSADO - Cartão Expirado**
```
Nome: EXPI
CPF: 12345678909
Resultado: Data de validade vencida
Status Final: rejected
Motivo: card_expired
```

### 📝 **RECUSADO - Erro no Formulário**
```
Nome: FORM
CPF: 12345678909
Resultado: Dados do formulário inválidos
Status Final: rejected
Motivo: invalid_form_data
```

### 🚫 **RECUSADO - Cartão Desabilitado**
```
Nome: LOCK
CPF: 12345678909
Resultado: Cartão bloqueado pelo emissor
Status Final: rejected
Motivo: card_disabled
```

### 🔄 **RECUSADO - Pagamento Duplicado**
```
Nome: DUPL
CPF: 12345678909
Resultado: Tentativa de pagamento duplicado
Status Final: rejected
Motivo: duplicate_payment
```

---

## 🖥️ INTERFACE DE TESTES

### **Acessar Interface de Testes**
```
URL: http://localhost:3000/checkout/test
```

### **Componentes da Interface**

#### **1. TestCardSelector** (Seletor de Cartões)
- 📋 Lista de cartões de teste oficiais
- 🎭 Lista de cenários de teste
- 📋 Botões de copiar para área de transferência
- ✅ Indicador visual de seleção
- 🎨 Design com shadcn/ui

#### **2. Seletor de Planos**
- 💼 Essencial (R$ 24,97/mês para teste)
- 🚀 Profissional (R$ 49,97/mês para teste)
- 🏢 Empresarial (R$ 99,97/mês para teste)

#### **3. Wallet Brick** (Checkout MP)
- 🔄 Integrado com componente oficial do MP
- 🎨 Loading states personalizados
- ✅ Validação em tempo real
- 🔒 Secure connection indicator

#### **4. Histórico de Resultados**
- ✅ Testes aprovados (verde)
- ❌ Testes recusados (vermelho)
- ⏰ Timestamp de cada teste
- 📊 Status final da transação

---

## 🔄 FLUXO DE TESTE COMPLETO

### **Passo 1: Acessar Interface de Testes**
```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Acessar
http://localhost:3000/checkout/test
```

### **Passo 2: Selecionar Cartão de Teste**
1. Clique na aba **"Cartões de Teste"**
2. Escolha um cartão (ex: Mastercard)
3. Clique no card para selecionar
4. Use os botões de copiar para facilitar preenchimento

### **Passo 3: Selecionar Cenário de Teste**
1. Clique na aba **"Cenários de Teste"**
2. Escolha o resultado esperado (ex: "Pagamento Aprovado")
3. Anote o **Nome do Titular** (ex: APRO)

### **Passo 4: Criar Preferência de Pagamento**
1. Selecione um plano na seção "Selecione um Plano"
2. Clique em **"Iniciar Teste com [Plano]"**
3. Aguarde criação da preferência no Supabase + MP
4. Wallet Brick será exibido automaticamente

### **Passo 5: Preencher Checkout**
```
Email: test@testuser.com (OBRIGATÓRIO)
Número do Cartão: [Cole do seletor]
Nome no Cartão: [Nome do cenário, ex: APRO]
CVV: [Cole do seletor]
Validade: [Cole do seletor]
CPF: 12345678909
```

### **Passo 6: Processar Pagamento**
1. Clique em **"Pagar"** no Wallet Brick
2. MP processa o pagamento
3. Webhook é disparado automaticamente
4. Resultado aparece no histórico

### **Passo 7: Verificar Resultado**
- ✅ **Sucesso:** Redirect para `/checkout/success`
- ❌ **Erro:** Redirect para `/checkout/error`
- ⏳ **Pendente:** Redirect para `/checkout/pending`

---

## 🔍 VERIFICAÇÃO DE RESULTADOS

### **1. Verificar no Supabase**

#### **Verificar Subscription Criada**
```sql
-- No Supabase SQL Editor
SELECT 
  id,
  user_id,
  status,
  gateway_subscription_id,
  created_at
FROM subscriptions
ORDER BY created_at DESC
LIMIT 5;
```

**Resultado Esperado:**
- `status`: `incomplete` (antes do pagamento) → `active` (depois do pagamento)
- `gateway_subscription_id`: ID da preferência do MP

#### **Verificar Webhook Recebido**
```sql
SELECT 
  id,
  gateway_event_id,
  event_type,
  processed_at,
  payload
FROM webhook_events
ORDER BY created_at DESC
LIMIT 5;
```

**Resultado Esperado:**
- `gateway_event_id`: x-request-id do webhook
- `event_type`: `payment` ou `merchant_order`
- `processed_at`: timestamp do processamento

#### **Verificar Transaction Criada**
```sql
SELECT 
  id,
  subscription_id,
  gateway_payment_id,
  amount,
  status,
  created_at
FROM payment_transactions
ORDER BY created_at DESC
LIMIT 5;
```

**Resultado Esperado:**
- `status`: `approved` (se teste foi APRO)
- `amount`: valor do plano em centavos
- `gateway_payment_id`: ID do pagamento no MP

### **2. Verificar no Dashboard do Mercado Pago**

```
URL: https://www.mercadopago.com.br/developers/panel/app
```

1. Acesse **"Suas integrações"**
2. Selecione sua aplicação
3. Vá em **"Pagamentos de teste"**
4. Veja transações criadas com cartões de teste

### **3. Verificar Logs do Backend**

```bash
# Ver logs em tempo real
pnpm dev

# Logs esperados:
# ✅ Subscription created
# ✅ Preference created successfully
# ✅ Webhook received
# ✅ Webhook signature validated
# ✅ Webhook processed successfully
```

---

## 🧪 CASOS DE TESTE RECOMENDADOS

### **Teste 1: Fluxo Feliz (Happy Path)** ⭐
```
Cartão: Mastercard
Nome: APRO
Resultado Esperado: ✅ Aprovado
Verificar:
- Subscription status = active
- Transaction status = approved
- Webhook processado
- Redirect para /success
```

### **Teste 2: Pagamento Recusado**
```
Cartão: Visa
Nome: OTHE
Resultado Esperado: ❌ Recusado
Verificar:
- Subscription status = incomplete
- Webhook processado
- Redirect para /error
```

### **Teste 3: Pagamento Pendente**
```
Cartão: American Express
Nome: CONT
Resultado Esperado: ⏳ Pendente
Verificar:
- Subscription status = incomplete ou pending
- Webhook processado
- Redirect para /pending
```

### **Teste 4: Fundos Insuficientes**
```
Cartão: Mastercard
Nome: FUND
Resultado Esperado: ❌ Recusado (sem fundos)
Verificar:
- Error message: "Fundos insuficientes"
- Webhook com motivo: insufficient_funds
```

### **Teste 5: CVV Inválido**
```
Cartão: Visa
Nome: SECU
Resultado Esperado: ❌ Recusado (CVV inválido)
Verificar:
- Error message: "Código de segurança inválido"
- Webhook com motivo: invalid_cvv
```

### **Teste 6: Idempotência do Webhook**
```
Cenário: Mesmo webhook enviado 2x
Passo:
1. Processar pagamento normalmente
2. Reenviar mesmo webhook (mesma x-request-id)
Resultado Esperado:
- Segunda requisição retorna 200
- Resposta: { status: 'already_processed' }
- Não cria transaction duplicada
```

### **Teste 7: Webhook Signature Inválida**
```
Cenário: Webhook com signature falsa
Passo:
1. Enviar webhook com x-signature inválida
Resultado Esperado:
- Retorna 401 Unauthorized
- Webhook NÃO é processado
- Log: "Invalid webhook signature"
```

---

## 🐛 TROUBLESHOOTING

### **❌ Erro: "Preference creation failed"**
```
Causa: Supabase não conseguiu criar subscription
Solução:
1. Verificar se migrations foram aplicadas
2. Verificar SUPABASE_SERVICE_ROLE_KEY no .env
3. Checar logs do Supabase
```

### **❌ Erro: "Invalid email for testing"**
```
Causa: Email diferente de test@testuser.com
Solução:
- Usar APENAS test@testuser.com para testes
```

### **❌ Erro: "Webhook not received"**
```
Causa: URL do webhook não configurada no MP
Solução:
1. Acessar MP Dashboard
2. Configurar: https://yourdomain.com/api/webhooks/mercadopago/v2
3. Selecionar eventos: payment, merchant_order
```

### **❌ Erro: "Payment Brick not loading"**
```
Causa: Public key inválida ou expirada
Solução:
1. Verificar NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
2. Gerar nova chave de teste no MP Dashboard
```

### **❌ Erro: "Subscription not activated"**
```
Causa: Webhook não processou corretamente
Solução:
1. Verificar logs: webhook_events table
2. Checar se process_webhook_event() foi executada
3. Verificar se subscription_id estava no metadata
```

---

## 📊 CHECKLIST DE TESTES COMPLETO

### **Pré-Requisitos**
- [ ] Migrations aplicadas no Supabase
- [ ] Variáveis de ambiente configuradas
- [ ] Servidor de desenvolvimento rodando
- [ ] Chaves de teste do MP ativas

### **Testes Funcionais**
- [ ] Criar preferência (sucesso)
- [ ] Pagamento aprovado (APRO)
- [ ] Pagamento recusado (OTHE)
- [ ] Pagamento pendente (CONT)
- [ ] Fundos insuficientes (FUND)
- [ ] CVV inválido (SECU)
- [ ] Cartão expirado (EXPI)

### **Testes de Segurança**
- [ ] Webhook com signature válida (200)
- [ ] Webhook com signature inválida (401)
- [ ] Idempotência de webhooks (duplicatas)
- [ ] RLS protegendo dados por user_id

### **Testes de Integração**
- [ ] Subscription criada no Supabase
- [ ] Preference criada no MP
- [ ] Webhook recebido e processado
- [ ] Transaction inserida corretamente
- [ ] Status atualizado (incomplete → active)

### **Testes de UI/UX**
- [ ] Loading states funcionando
- [ ] Error messages claros
- [ ] Success page exibida
- [ ] Histórico de testes atualizado
- [ ] Copy to clipboard funcionando

---

## 🚀 PRÓXIMOS PASSOS

### **Após Testes Bem-Sucedidos:**

1. **Regenerar Types do Supabase** (5min)
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts
```

2. **Configurar Webhook URL em Produção** (5min)
```
URL: https://yourdomain.com/api/webhooks/mercadopago/v2
Events: ☑️ payment, ☑️ merchant_order
```

3. **Deploy para Produção** (10min)
```bash
pnpm build
vercel --prod
```

4. **Trocar para Chaves de Produção** (5min)
```env
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-xxxxxx-prod
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxx-prod
```

5. **Testar com Cartão Real** (15min)
- Fazer 1 transação real pequena (R$ 1,00)
- Verificar webhook recebido
- Confirmar subscription ativada
- Testar cancelamento/reembolso

---

## 📚 REFERÊNCIAS

- [Mercado Pago - Cartões de Teste](https://www.mercadopago.com.br/developers/pt/docs/checkout-api-v2/integration-test/cards)
- [Mercado Pago - Card Payment Brick](https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/card-payment-brick/introduction)
- [Supabase - RPC Functions](https://supabase.com/docs/guides/database/functions)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

---

## ✅ SISTEMA PRONTO PARA TESTES

**O sistema de testes está 100% funcional:**
- ✅ Cartões de teste documentados
- ✅ Cenários de teste mapeados
- ✅ Interface visual com shadcn/ui
- ✅ Integração com Bricks do MP
- ✅ Histórico de resultados
- ✅ Troubleshooting documentado

**Pode iniciar os testes definitivos agora! 🎉**
