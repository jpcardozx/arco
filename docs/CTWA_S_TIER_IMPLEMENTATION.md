# Click-to-WhatsApp (CTWA) - S-Tier Implementation Guide

**Versão**: 1.0
**Data**: Outubro 2025
**Foco**: Dedup garantida + volume otimizado

---

## 📌 O que é CTWA S-Tier

```
ERRADO (Tier C):
- User clica anúncio CTWA
- Leva direto para WhatsApp (sem rastreamento)
- Meta não sabe que é conversão
- Sem sinal de qualidade

CORRETO (S-Tier):
- User clica anúncio CTWA
- Rastreia "Contact" event ANTES de redirecionar
- Meta recebe signal: user qualificado, pronto para conversa
- Event_id único para dedup
- Meta otimiza anúncio naquele padrão de user
```

---

## 🎯 Implementação Passo-a-Passo

### 1. Componente CTWA S-Tier

```typescript
// src/components/CtwaButton.tsx

'use client';

import { useMetaTracking } from '@/hooks/useMetaTracking';
import { useState } from 'react';

interface CtwaButtonProps {
  email: string;
  phone: string;
  message?: string;
  whatsappNumber: string; // +5511999999999
  buttonText?: string;
}

export function CtwaButton({
  email,
  phone,
  message = 'Olá, tenho interesse em conhecer mais',
  whatsappNumber,
  buttonText = '💬 Falar no WhatsApp',
}: CtwaButtonProps) {
  const { trackContact } = useMetaTracking();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCtwaClick = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Rastrear Contact event ANTES de redirecionar
      const response = await trackContact({
        email,
        phone,
        message,
      });

      console.log('📲 [CTWA] Contact rastreado', {
        eventId: response.eventId,
        success: response.success,
        isDuplicate: response.isDuplicate,
      });

      // Se duplicado, avisar mas deixar continuar
      if (response.isDuplicate) {
        console.warn('⚠️ [CTWA] Evento duplicado (dedup funcionando)');
      }

      // 2️⃣ Redirecionar para WhatsApp DEPOIS do rastreamento
      // Use target="_blank" para não perder contexto
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      console.error('❌ [CTWA] Erro ao rastrear contact', errorMsg);
      setError(errorMsg);

      // Fallback: abrir WhatsApp mesmo se rastreamento falhar
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCtwaClick}
        disabled={loading}
        className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 transition-colors"
      >
        {loading ? '⏳ Conectando...' : buttonText}
      </button>

      {error && (
        <p className="text-red-500 text-sm mt-2">
          Erro: {error} (redirecionando para WhatsApp mesmo assim)
        </p>
      )}
    </>
  );
}
```

### 2. Setup no Meta Ads Manager

```
1. Criar campanha "Click-to-WhatsApp"
   ↓
2. Objetivo: Conversões (ou Tráfego)
   ↓
3. Evento de conversão: Contact (Meta Conversions API)
   ↓
4. Setup de anúncio: Click to WhatsApp (nativo do Ads Manager)
   ↓
5. Salvar phone do salão: +5511999999999
```

### 3. Tracking Setup (Edge Function)

```typescript
// Edge Function recebe "Contact" event

// Input:
{
  event_name: "Contact",
  user_data: {
    email: "prospect@example.com",
    phone: "+5511987654321",
    fbp: "fb.1.123.456",
    fbc: "fb.1.123.456"
  },
  custom_data: {
    message: "Olá, tenho interesse"
  },
  event_id: "evt_contact_1729532400000_abc123"
}

// Processing:
1. Valida: event_name = "Contact" ✓
2. Dedup: event_id único? ✓
3. Enrichment:
   - Email hash: SHA-256
   - Phone hash: SHA-256
   - FBP: preserva
   - FBC: preserva

// Output para Meta:
{
  event_name: "Contact",
  event_id: "evt_contact_1729532400000_abc123",
  user_data: {
    em: ["sha256_email"],
    ph: ["sha256_phone"],
    fbp: "fb.1.123.456",
    fbc: "fb.1.123.456"
  },
  custom_data: {
    event_source: "crm",
    lead_event_source: "ARCO WebDev",
    message: "Olá, tenho interesse"
  },
  action_source: "system_generated"
}
```

---

## 📊 Monitoramento CTWA

### Métrica 1: Click Rate

```
Meta Events Manager → Campaign Performance
  Objetivo: Contact
  Taxa de conversão: 8-12% (bom para CTWA)
  CPC: R$ 2-5 (muito barato)
```

### Métrica 2: Event Quality

```
Dataset Quality → Seu Dataset
  Eventos Contact recebidos: 100+
  Taxa de correspondência (EMQ): > 60%
  Erros: < 1%
```

### Métrica 3: Escalonamento

```
Semana 1: Contact events estáveis
  → 50 eventos/dia
  → EMQ > 60%
  → CPC R$ 2-3

Semana 2: Pronto para escalar
  → Criar campanha Lead
  → Otimizar em Lead
  → Contact continua como source
```

---

## 🔄 Fluxo Completo (CTWA → Lead → Schedule)

### Fase 1: CTWA (Contact Event)

```
Landing Page
  ↓
[💬 Falar no WhatsApp Button]
  ↓
Hook trackContact()
  ↓
Edge Function (Contact event, dedup)
  ↓
Meta receives Contact + event_id
  ↓
User → WhatsApp
```

**Duração**: Semana 1-2
**Volume**: 50-100 conversões/dia
**CPC**: R$ 2-5
**Meta aprende**: "Usuários interessados em conversar"

### Fase 2: Lead (CRM Qualification)

```
WhatsApp Conversa
  ↓
[Salão qualifica lead] ← O que é lead?
  - Email + Nome + Serviço interessado
  - Seguro que não é bot
  - Mostrou interesse real
  ↓
Backend webhook: trackLead()
  ↓
Edge Function (Lead event, dedup)
  ↓
Meta receives Lead + event_id
  ↓
Meta refina targeting (conhece lead qualificado)
```

**Duração**: Semana 3-4
**Volume**: 20-40 conversões/dia (qualificado)
**CPC**: R$ 3-8 (começou a aprender)
**Meta aprende**: "Leads qualificados têm padrão X"

### Fase 3: Schedule (Conversion Event)

```
Salão envia proposta
  ↓
[Cliente agenda serviço]
  ↓
Backend webhook: trackSchedule()
  ↓
Edge Function (Schedule event, dedup)
  ↓
Meta receives Schedule + event_id
  ↓
Meta final targeting (sabe lead → agendamento)
```

**Duração**: Semana 5+
**Volume**: 5-15 conversões/dia (final)
**CPC**: R$ 8-15 (otimizado)
**Meta aprende**: "Padrão completo de buyer"

---

## 💡 S-Tier Details

### 1. Event ID Consistency

```
✅ CORRETO:
- Pixel (Contact event): eventId = 'evt_contact_...'
- CTWA Button POST: event_id = 'evt_contact_...'
- Edge Function: detecta mesmo event_id
- Result: 1 evento (dedup funcionando)

❌ ERRADO:
- Pixel gera: eventId_A
- POST gera: eventId_B
- Edge Function recebe 2 eventos diferentes
- Result: 2 eventos (sem dedup)
```

### 2. FBP/FBC Capture

```typescript
// Hook captura automaticamente:
const fbp = getCookie('_fbp');  // Browser ID
const fbc = getCookie('_fbc');  // Click ID

// POST envia com:
{
  user_data: {
    fbp: fbp,     // Necessário para correlação
    fbc: fbc      // Click tracking
  }
}

// Edge Function preserva:
user_data.fbp = fbp;
user_data.fbc = fbc;

// Result: Meta consegue correlacionar clique → conversão
```

### 3. Fallback Garantido

```typescript
// Se Edge Function falhar:
try {
  await trackContact({ email, phone });
} catch (error) {
  // Mesmo assim: redireciona para WhatsApp
  window.open(whatsappUrl);
}

// USER SEMPRE chega no WhatsApp
// Meta talvez perca o evento, mas negócio continua
```

### 4. Dedup Guarantee

```
Click 1: trackContact() → Edge Function → Meta (Contact)
Click 2: trackContact() MESMO email/hora → Edge Function → 409 (Duplicate)

Result: Impossível contar mesmo clique 2x
```

---

## 📈 Performance Esperado

### Timeline 10 Semanas

```
Semana 1-2 (CTWA Phase):
- CPC: R$ 4
- Conversão/dia: 80
- CAC: R$ 40
- Learning: Alto (descobre padrão)

Semana 3-4 (Lead Phase):
- CPC: R$ 5
- Conversão/dia: 60 (filtro qualidade)
- CAC: R$ 83 (investimento em Lead)
- Learning: Médio (refina targeting)

Semana 5+ (Schedule Phase):
- CPC: R$ 10
- Conversão/dia: 20 (final)
- CAC: R$ 150 (investimento em Schedule)
- Learning: Baixo (modelo estável)

Total CAC: (40 + 83 + 150) / 3 = ~R$ 91 (excelente)
```

---

## 🔍 Debug & Validação

### Teste 1: Event ID Flow

```bash
# Console do navegador
const { trackContact } = useMetaTracking();
const response = await trackContact({
  email: 'test@example.com',
  phone: '5511999999999'
});

console.log(response.eventId);  // evt_contact_1729532400000_abc123
```

### Teste 2: Dedup Detection

```bash
# Enviar 2x com MESMO email
const res1 = await trackContact({ email: 'test@example.com', phone: '5511999999999' });
console.log('First:', res1.success);  // true

const res2 = await trackContact({ email: 'test@example.com', phone: '5511999999999' });
console.log('Second:', res2.isDuplicate);  // true (dedup funcionando)
```

### Teste 3: Meta Verification

```
Meta Events Manager → Seu Dataset → Eventos de Teste
  - Enviar Contact event
  - Verificar: "Contact" aparece em ~30s
  - EMQ: deve estar > 50%
```

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Rastrear DEPOIS de redirecionar

```typescript
// ERRADO:
window.open(whatsappUrl);
await trackContact(...);  // Muito tarde!

// CORRETO:
await trackContact(...);
window.open(whatsappUrl);  // Depois
```

### ❌ Mistake 2: Event ID diferente no Pixel vs. CTWA

```typescript
// ERRADO:
fbq('track', 'Contact', { eventID: 'id_a' });  // Pixel
trackContact(...);  // POST gera 'id_b'
// Result: 2 eventos (sem dedup)

// CORRETO:
const eventId = generateEventId('Contact');
fbq('track', 'Contact', { eventID: eventId });
trackContact({ eventId });  // MESMO eventId
```

### ❌ Mistake 3: Optimizar em Lead antes de Contact aprender

```
ERRADO: Semana 1 já mudar para Lead
- Contact: 15 eventos (muito pouco, Meta não treina)
- Lead: 5 eventos (muito raro)
- Result: CAC sobe

CORRETO: Esperar 50+ Contact/semana, DEPOIS escalar
- Contact: 50-100/dia
- Meta aprende padrão
- DEPOIS: escalar para Lead
```

---

## 📋 Checklist

- [ ] CTWA Button component criado
- [ ] Hook trackContact() chamado ANTES de redirect
- [ ] Event ID gerado e passado para trackContact()
- [ ] Fallback garantido (redireciona mesmo se rastreamento falhar)
- [ ] Edge Function recebendo Contact events
- [ ] Dedup testado (2º click = 409)
- [ ] Campaign criada no Meta (Conversões, evento Contact)
- [ ] 50+ Contact events/semana
- [ ] EMQ > 50%
- [ ] Pronto para escalar para Lead

---

**Versão**: 1.0
**Impacto**: Primeira etapa do funil, volume barato, model training
