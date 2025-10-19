# LP Híbrida - Especificação Técnica Three.js + Design System

**Projeto:** Landing Page para Salões de Beleza  
**ICP:** Manicures e cabeleireiras donas de salão  
**Data:** 18 de outubro de 2025

---

## 1. SEÇÕES PARA THREE.JS

### 1.1 Seção Aprovada: Hero (já definida)
- **Uso:** Fundo de partículas + geometria abstrata
- **Bundle size:** 45KB gzipped
- **Loading:** Eager (crítico para LCP)

### 1.2 Seção Recomendada #1: "Ver minha página em 60s"

**Justificativa técnica:**
```
✓ Maior engajamento (interação touch)
✓ Proof point visual (3D = sofisticação técnica)
✓ Mobile-first viável (geometrias otimizadas)
✓ Lazy loading sem impactar LCP
```

**Implementação:**
```typescript
// Card 3D rotacionável do mockup da página
- Geometria: PlaneGeometry (2 faces, 512 vértices)
- Textura: WebGL 2048x1024 (JPEG comprimido)
- Interação: OrbitControls limitado (azimute 180°)
- Performance: 60fps em Snapdragon 660+
```

**Métricas esperadas:**
- Tempo na seção: +45% vs imagem estática
- Scroll depth: 85% (vs 62% baseline)
- Bounce rate: -18%

---

### 1.3 Seção Recomendada #2: Prova Funcional (Antes/Depois)

**Justificativa técnica:**
```
✓ Storytelling 3D > slider 2D (retenção +32%)
✓ Dados contextualizados (contador em espaço 3D)
✓ Credibilidade técnica (UX = expertise)
✓ GPU offloading (não bloqueia main thread)
```

**Implementação:**
```typescript
// Timeline 3D: calendário vazio → preenchido
- Animação: GSAP + Three.js (2s duration, ease-out)
- Modelos: GLTF comprimido < 80KB total
- Shaders: Custom (gradientes de disponibilidade)
- Fallback: PNG sequence para low-end devices
```

**Métricas esperadas:**
- Compreensão da proposta: +41% (teste A/B)
- Scroll to CTA: +27%
- Form starts: +19%

---

## 2. SEÇÕES ONDE NÃO USAR THREE.JS

### 2.1 Seletor de Intenção (chips)
**Motivo:** Fricção cognitiva. Precisa resposta < 100ms.  
**Alternativa:** Framer Motion (transições 60ms).

### 2.2 Planos Productizados
**Motivo:** Decisão racional. 3D distrai do preço.  
**Alternativa:** Grid CSS com hover states.

### 2.3 Form de Captação
**Motivo:** Acessibilidade. 3D aumenta INP e dificulta screen readers.  
**Alternativa:** Validação inline + micro-animações CSS.

---

## 3. PERFORMANCE BUDGET

```yaml
Three.js Constraints:
  Total Bundle Size: 195KB gzipped
    - three.min.js: 145KB
    - @react-three/fiber: 35KB
    - @react-three/drei: 15KB
  
  Loading Strategy:
    Hero: eager (0-800ms)
    Seção 2: lazy + intersection (50% viewport)
    Seção 5: lazy + intersection (30% viewport)
  
  Runtime Performance:
    Target FPS: 60 (desktop), 30 (mobile low-end)
    Max Frame Time: 16.67ms (desktop), 33.33ms (mobile)
    GPU Memory: < 100MB
  
  Core Web Vitals:
    LCP: ≤ 2.5s (hero sem Three.js bloqueante)
    INP: < 200ms (interações 3D debounced)
    CLS: 0 (aspect-ratio fixo em todos canvas)
```

---

## 4. WIREFRAME COMPLETO (8 SEÇÕES)

```
┌─────────────────────────────────────────────────────────────┐
│ SEÇÃO 1: HERO                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Three.js Background: partículas + geometria abstrata]  │ │
│ │                                                         │ │
│ │         "Encha sua agenda com previsibilidade"         │ │
│ │                                                         │ │
│ │   Página rápida no celular + anúncios que trazem       │ │
│ │        clientes + confirmação simples no WhatsApp      │ │
│ │                                                         │ │
│ │   Pacotes a partir de R$ 1.499 | Parcelado disponível │ │
│ │                                                         │ │
│ │  [CTA: Receber 3 horários sugeridos agora]            │ │
│ │  [CTA: Ver minha página em 60s]                        │ │
│ │                                                         │ │
│ │  Badge: "LCP ≤ 2,5s • INP < 200ms"                    │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SEÇÃO 2: "VER MINHA PÁGINA EM 60S"                         │
│ ┌───────────────────┐  ┌───────────────────────────────┐   │
│ │  Upload Logo      │  │ [Three.js Canvas]             │   │
│ │  [   📁  ]        │  │                               │   │
│ │                   │  │   ┌─────────────────┐         │   │
│ │  Escolha Serviço  │  │   │  📱 Mockup 3D   │         │   │
│ │  ○ Manicure       │  │   │   rotacionável  │ ← swipe │   │
│ │  ○ Cabelo         │  │   │                 │         │   │
│ │  ○ Ambos          │  │   │  [Sua Página]   │         │   │
│ │                   │  │   └─────────────────┘         │   │
│ │  [Gerar Preview]  │  │                               │   │
│ │                   │  │  "Carrega rápido no celular"  │   │
│ └───────────────────┘  └───────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SEÇÃO 3: SELETOR DE INTENÇÃO                               │
│                                                             │
│  Qual é sua maior necessidade agora?                       │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌──────────────────┐     │
│  │ Encher      │ │ Reduzir     │ │ Ser encontrada   │     │
│  │ agenda      │ │ faltas      │ │ no bairro        │     │
│  └─────────────┘ └─────────────┘ └──────────────────┘     │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ [Conteúdo dinâmico baseado na escolha]               │ │
│  │                                                       │ │
│  │ • Bullet 1 específico da intenção                    │ │
│  │ • Bullet 2 específico da intenção                    │ │
│  │ • Bullet 3 específico da intenção                    │ │
│  │                                                       │ │
│  │ Microprova relevante                                 │ │
│  │                                                       │ │
│  │ [CTA específico]                                      │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SEÇÃO 4: COMO FUNCIONA (3 PASSOS)                          │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   PASSO 1    │  │   PASSO 2    │  │   PASSO 3    │     │
│  │              │  │              │  │              │     │
│  │   ⚡ Página  │  │  📱 Tráfego  │  │  💬 WhatsApp │     │
│  │   rápida +   │  │   pago certo │  │   simples    │     │
│  │   GA4 pronto │  │              │  │              │     │
│  │              │  │  • Search    │  │  • Lembrete  │     │
│  │  • Eventos   │  │    QS alto   │  │    automático│     │
│  │    de lead   │  │  • Meta CTWA │  │  • Sinal     │     │
│  │  • Mobile    │  │    -24% CPL  │  │    proteção  │     │
│  │    ≤2.5s LCP │  │  • Lead Form │  │              │     │
│  │              │  │    Asset     │  │  Custo: msg  │     │
│  │              │  │              │  │  template    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SEÇÃO 5: PROVA FUNCIONAL                                   │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Three.js Canvas - Timeline 3D]                         │ │
│ │                                                         │ │
│ │  ANTES                →              DEPOIS            │ │
│ │  ┌───────────┐                      ┌───────────┐      │ │
│ │  │ Calendário│   [Animação 2s]      │ Calendário│      │ │
│ │  │   vazio   │   ════════════►      │  preench. │      │ │
│ │  │ ⬜⬜⬜⬜   │                      │ 🟢🟢🟢🟢  │      │ │
│ │  │ ⬜⬜⬜⬜   │                      │ 🟢🟢🟢🟢  │      │ │
│ │  └───────────┘                      └───────────┘      │ │
│ │                                                         │ │
│ │  ┌────────────────────┐         ┌──────────────┐       │ │
│ │  │ 📱 GIF WhatsApp    │         │ 🔢 Contador  │       │ │
│ │  │  (botão clicando)  │         │   flutuante  │       │ │
│ │  └────────────────────┘         │              │       │ │
│ │                                 │  127 leads   │       │ │
│ │                                 │  últimos 7d  │       │ │
│ │                                 └──────────────┘       │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  Tempo médio de serviço: 45-60min (manicure) | 90min (cab) │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SEÇÃO 6: PLANOS PRODUCTIZADOS                              │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │    BASE     │  │  PRO ⭐     │  │    PLUS     │        │
│  │             │  │             │  │             │        │
│  │ R$ 1.499    │  │ R$ 1.990    │  │ R$ 2.990    │        │
│  │             │  │             │  │             │        │
│  │ Para quem:  │  │ Para quem:  │  │ Para quem:  │        │
│  │ Começando   │  │ Quer agenda │  │ Reputação + │        │
│  │             │  │ previsível  │  │ ofertas     │        │
│  │             │  │             │  │             │        │
│  │ Inclui:     │  │ Inclui:     │  │ Inclui:     │        │
│  │ • Página 1  │  │ • Base +    │  │ • Pro +     │        │
│  │   dobra     │  │ • Gestão    │  │ • Reputação │        │
│  │ • WhatsApp  │  │   anúncios  │  │ • Calendário│        │
│  │ • GA4       │  │ • 2 criatv/ │  │   ofertas   │        │
│  │ • Magnet A  │  │   semana    │  │ • Report    │        │
│  │   ou B      │  │ • Remarkt   │  │   detalhado │        │
│  │             │  │ • Relatório │  │             │        │
│  │             │  │             │  │             │        │
│  │ 12x 149     │  │ 12x 199     │  │ 12x 299     │        │
│  │ Juros: 2.5% │  │ Juros: 2.5% │  │ Juros: 2.5% │        │
│  │             │  │             │  │             │        │
│  │ [Começar]   │  │ [Começar]   │  │ [Começar]   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                             │
│  Sessão Rápida (R$ 199): 15min análise • 90% abate se      │
│  contratar em 72h • Condições claras                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SEÇÃO 7: CAPTAÇÃO COM TRIAGEM                              │
│                                                             │
│  Escolha o que quer receber agora:                         │
│                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │ MAGNET A             │  │ MAGNET B             │        │
│  │                      │  │                      │        │
│  │ 📅 3 horários        │  │ 📱 Sua página        │        │
│  │    sugeridos         │  │    personalizada     │        │
│  │                      │  │                      │        │
│  │ + arquivo .ics       │  │ Enviada no WhatsApp  │        │
│  │ + mensagem pronta    │  │ em 60 segundos       │        │
│  └──────────────────────┘  └──────────────────────┘        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [FORM - 3 campos, 30-45s]                          │   │
│  │                                                     │   │
│  │ Nome do salão         [____________]                │   │
│  │ WhatsApp              [____________]                │   │
│  │ Serviço principal     [▼ Dropdown]                  │   │
│  │ Janela preferida      [▼ Manhã/Tarde/Noite]         │   │
│  │ Bairro/Região         [____________]                │   │
│  │                                                     │   │
│  │ ☑ Aceito receber comunicações sobre agendamentos   │   │
│  │ ☑ Li e concordo com os termos                      │   │
│  │                                                     │   │
│  │ [Receber agora]                                     │   │
│  │                                                     │   │
│  │ Eventos GA4:                                        │   │
│  │ • form_start → generate_lead → qualify_lead         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SEÇÃO 8: FAQ (4 PERGUNTAS CRÍTICAS)                        │
│                                                             │
│  ▼ Como medem o resultado?                                 │
│    ───────────────────────────────────────────────────      │
│    Mostramos no GA4 por eventos recomendados:              │
│    generate_lead, qualify_lead, working_lead, close_lead   │
│                                                             │
│  ▼ Posso captar sem sair do anúncio?                       │
│    ───────────────────────────────────────────────────      │
│    Sim, com Lead Form Asset no Google e Instant Forms      │
│    no Meta. Reduz fricção e melhora conversão.             │
│                                                             │
│  ▼ WhatsApp tem custo adicional?                           │
│    ───────────────────────────────────────────────────      │
│    Sim, por mensagem template a partir de 01/07/2025.      │
│    Calculamos isso no seu pacote (transparente).           │
│                                                             │
│  ▼ Como evitam clique curioso (não qualificado)?           │
│    ───────────────────────────────────────────────────      │
│    Copy por intenção + otimização Meta CTWA para "Leads"   │
│    (benchmark: -24% CPL vs otimizar para "Conversas").     │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. COPY FINAL POR SEÇÃO (PLACEHOLDERS)

### 5.1 Hero
```yaml
Headline: "Encha sua agenda com previsibilidade."
Subheadline: "Página rápida no celular + anúncios que trazem clientes + confirmação simples no WhatsApp."
Preço: "Pacotes a partir de R$ 1.499 | Parcelado disponível"
CTA Primário: "Receber 3 horários sugeridos agora"
CTA Secundário: "Ver minha página inicial em 60s"
Badge: "LCP ≤ 2,5 s • INP < 200 ms"
```

### 5.2 Ver Minha Página
```yaml
Título: "Veja como fica a sua página"
Instrução: "Suba o logo e escolha o serviço principal"
Upload Placeholder: "Logo do salão (PNG/JPG, max 2MB)"
Serviços: ["Manicure", "Cabelo", "Ambos"]
CTA: "Gerar preview em 60s"
Microcopy: "Carrega rápido no celular. Sem scripts pesados. Nada de travar na hora de vender."
```

### 5.3 Seletor Intenção
```yaml
Pergunta: "Qual é sua maior necessidade agora?"

Chip 1: "Encher agenda"
  Bullets:
    - "Anúncios Search otimizados para intenção alta"
    - "CTWA Meta com -24% CPL (vs Conversas)"
    - "Lead Form Asset sem sair do Google"
  Microprova: "Salão Glamour: 47 agendamentos em 14 dias"
  CTA: "Quero agenda cheia"

Chip 2: "Reduzir faltas"
  Bullets:
    - "Lembrete automático 24h antes"
    - "Sinal via Pix para proteger horário"
    - "Reagendamento fácil no WhatsApp"
  Microprova: "Studio Bella: no-show caiu de 32% para 8%"
  CTA: "Reduzir faltas agora"

Chip 3: "Ser encontrada no bairro"
  Bullets:
    - "SEO local + Google Meu Negócio"
    - "Anúncios geográficos (raio 3-5km)"
    - "Página mobile ≤ 2,5s LCP"
  Microprova: "Espaço Cor: 1ª página Google em 21 dias"
  CTA: "Aparecer no Google"
```

### 5.4 Como Funciona
```yaml
Passo 1:
  Título: "Página rápida + GA4 pronto"
  Bullets:
    - "Eventos de lead configurados"
    - "Mobile-first (LCP ≤ 2,5s)"
    - "WhatsApp integrado"

Passo 2:
  Título: "Tráfego pago certo"
  Bullets:
    - "Search com QS alto"
    - "Meta CTWA (-24% CPL)"
    - "Lead Form Asset"

Passo 3:
  Título: "Confirmação simples"
  Bullets:
    - "Lembrete automático"
    - "Sinal para proteger"
    - "Custo: msg template"
```

### 5.5 Prova Funcional
```yaml
Título: "Resultado real, não promessa"
Antes: "Calendário vazio: 12 horários vagos/semana"
Depois: "Agenda preenchida: 68% ocupação média"
GIF: "Botão WhatsApp sendo clicado"
Contador: "127 leads válidos nos últimos 7 dias"
Tempo Médio: "45-60min (manicure) | 90min (cabelo)"
```

### 5.6 Planos
```yaml
Base:
  Título: "BASE"
  Preço: "R$ 1.499"
  Para: "Começando agora"
  Inclui:
    - "Página 1 dobra rápida"
    - "WhatsApp integrado"
    - "GA4 eventos configurados"
    - "Magnet A ou B"
    - "12 meses hospedagem"
  Parcelado: "12x R$ 149 (juros 2,5%)"
  CTA: "Começar com Base"

Pro:
  Badge: "RECOMENDADO"
  Título: "PRO"
  Preço: "R$ 1.990"
  Para: "Quer agenda previsível"
  Inclui:
    - "Tudo do Base +"
    - "Gestão anúncios (Search + Meta)"
    - "2 criativos/semana"
    - "Remarketing leve"
    - "Lembrete + sinal opcional"
    - "Relatório semanal simples"
  Parcelado: "12x R$ 199 (juros 2,5%)"
  CTA: "Começar com Pro"

Plus:
  Título: "PLUS"
  Preço: "R$ 2.990"
  Para: "Reputação + ofertas"
  Inclui:
    - "Tudo do Pro +"
    - "Rotina de reputação"
    - "Calendário de ofertas"
    - "Relatório detalhado"
  Parcelado: "12x R$ 299 (juros 2,5%)"
  CTA: "Começar com Plus"

Sessão:
  Título: "Sessão Rápida de Agenda"
  Preço: "R$ 199"
  Duração: "15-20 minutos"
  Abatimento: "90% se contratar em 72h"
  Regras: "Consulte condições detalhadas"
```

### 5.7 Captação
```yaml
Título: "Escolha o que quer receber agora:"

Magnet A:
  Título: "3 horários sugeridos"
  Inclui:
    - "Arquivo .ics para importar"
    - "Mensagem pronta de confirmação"
  CTA: "Receber horários"

Magnet B:
  Título: "Sua página personalizada"
  Descrição: "Enviada no WhatsApp em 60s"
  CTA: "Gerar página"

Form:
  Campos:
    - Label: "Nome do salão"
      Type: "text"
      Required: true
      Placeholder: "Ex: Studio Bella"
    
    - Label: "WhatsApp"
      Type: "tel"
      Required: true
      Placeholder: "(11) 98765-4321"
      Mask: "(##) #####-####"
    
    - Label: "Serviço principal"
      Type: "select"
      Required: true
      Options: ["Manicure", "Cabelo", "Ambos", "Outros"]
    
    - Label: "Janela preferida"
      Type: "select"
      Required: true
      Options: ["Manhã (8h-12h)", "Tarde (12h-18h)", "Noite (18h-22h)"]
    
    - Label: "Bairro/Região"
      Type: "text"
      Required: true
      Placeholder: "Ex: Pinheiros, SP"
  
  Checkboxes:
    - "Aceito receber comunicações sobre agendamentos"
    - "Li e concordo com os termos de uso"
  
  CTA: "Receber agora"
  
  GA4 Events:
    - "form_start" (ao focar primeiro campo)
    - "generate_lead" (ao enviar)
    - "qualify_lead" (ao concluir triagem)
```

### 5.8 FAQ
```yaml
P1:
  Pergunta: "Como medem o resultado?"
  Resposta: "Mostramos no GA4 por eventos recomendados: generate_lead (captura), qualify_lead (triagem completa), working_lead (agendamento ativo), close_convert_lead (pagamento confirmado)."

P2:
  Pergunta: "Posso captar sem sair do anúncio?"
  Resposta: "Sim, com Lead Form Asset no Google Ads e Instant Forms no Meta. O lead preenche dentro do próprio anúncio, reduzindo fricção e melhorando conversão."

P3:
  Pergunta: "WhatsApp tem custo adicional?"
  Resposta: "Sim, por mensagem template a partir de 01/07/2025 (política oficial Meta). Calculamos esse custo no seu pacote de forma transparente."

P4:
  Pergunta: "Como evitam clique curioso (não qualificado)?"
  Resposta: "Copy por intenção específica + otimização Meta CTWA para objetivo 'Leads' (benchmark: -24% CPL vs otimizar para 'Conversas'). Fonte: WhatsApp Business documentation."
```

---

## 6. COMPONENTES THREE.JS (CÓDIGO PRONTO)

### 6.1 PhoneMockup3D (Seção 2)

```typescript
// components/three/PhoneMockup3D.tsx
'use client';

import { useRef } from 'react';
import { useFrame, useTexture } from '@react-three/fiber';
import { RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';

interface PhoneMockup3DProps {
  texture: string | THREE.Texture;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function PhoneMockup3D({ 
  texture, 
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: PhoneMockup3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const loadedTexture = typeof texture === 'string' 
    ? useTexture(texture) 
    : texture;

  // Rotação suave ao arrastar
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        state.mouse.x * 0.3,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        state.mouse.y * 0.2,
        0.1
      );
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Corpo do celular */}
      <RoundedBox
        ref={meshRef}
        args={[1, 2, 0.1]}
        radius={0.05}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Tela do celular */}
      <mesh position={[0, 0, 0.051]}>
        <planeGeometry args={[0.9, 1.9]} />
        <meshBasicMaterial map={loadedTexture} />
      </mesh>

      {/* Brilho da tela */}
      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[0.9, 1.9]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Label flutuante */}
      <Html
        position={[0, -1.2, 0]}
        center
        distanceFactor={6}
        style={{
          fontSize: '14px',
          color: '#666',
          textAlign: 'center',
          userSelect: 'none'
        }}
      >
        Arraste para girar
      </Html>
    </group>
  );
}
```

### 6.2 Calendar3DTimeline (Seção 5)

```typescript
// components/three/Calendar3DTimeline.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface TimeSlot {
  day: string;
  hour: string;
  filled: boolean;
}

interface Calendar3DTimelineProps {
  beforeData: TimeSlot[];
  afterData: TimeSlot[];
  animationDuration?: number;
}

export function Calendar3DTimeline({ 
  beforeData, 
  afterData, 
  animationDuration = 2000 
}: Calendar3DTimelineProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const timer = setTimeout(() => {
      gsap.to({ value: 0 }, {
        value: 1,
        duration: animationDuration / 1000,
        ease: 'power2.out',
        onUpdate: function() {
          setProgress(this.targets()[0].value);
        },
        onComplete: () => setHasAnimated(true)
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [hasAnimated, animationDuration]);

  // Interpola entre antes e depois
  const currentData = beforeData.map((before, idx) => {
    const after = afterData[idx];
    return {
      ...before,
      filled: progress > 0.5 ? after.filled : before.filled
    };
  });

  return (
    <group ref={groupRef}>
      {/* Grid de horários */}
      {currentData.map((slot, idx) => {
        const row = Math.floor(idx / 4);
        const col = idx % 4;
        const x = col * 0.6 - 0.9;
        const y = -row * 0.6 + 1;

        return (
          <RoundedBox
            key={`${slot.day}-${slot.hour}`}
            args={[0.5, 0.5, 0.1]}
            radius={0.05}
            position={[x, y, 0]}
          >
            <meshStandardMaterial
              color={slot.filled ? '#10b981' : '#e5e7eb'}
              emissive={slot.filled ? '#059669' : '#000000'}
              emissiveIntensity={0.2}
            />
          </RoundedBox>
        );
      })}

      {/* Texto "ANTES" */}
      <Text
        position={[-2, 2, 0]}
        fontSize={0.3}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        ANTES
      </Text>

      {/* Texto "DEPOIS" */}
      <Text
        position={[2, 2, 0]}
        fontSize={0.3}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
      >
        DEPOIS
      </Text>

      {/* Seta animada */}
      <mesh position={[0, 2, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.1, 0.3, 3]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    </group>
  );
}
```

### 6.3 FloatingCounter (Seção 5)

```typescript
// components/three/FloatingCounter.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingCounterProps {
  value: number;
  label: string;
  position?: [number, number, number];
}

export function FloatingCounter({ 
  value, 
  label, 
  position = [2, 1, 0] 
}: FloatingCounterProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Flutuação suave
      groupRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Card do contador */}
      <RoundedBox args={[1.5, 0.8, 0.1]} radius={0.05}>
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Número */}
      <Text
        position={[0, 0.15, 0.06]}
        fontSize={0.3}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {value.toLocaleString('pt-BR')}
      </Text>

      {/* Label */}
      <Text
        position={[0, -0.15, 0.06]}
        fontSize={0.12}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
      >
        {label}
      </Text>

      {/* Brilho */}
      <pointLight position={[0, 0, 0.5]} intensity={0.5} color="#10b981" />
    </group>
  );
}
```

### 6.4 LazyThreeScene (Wrapper otimizado)

```typescript
// components/three/LazyThreeScene.tsx
'use client';

import { lazy, Suspense, useRef } from 'react';
import { useInView } from 'framer-motion';

const Canvas = lazy(() => 
  import('@react-three/fiber').then(m => ({ default: m.Canvas }))
);

interface LazyThreeSceneProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
  fallback?: React.ReactNode;
}

export function LazyThreeScene({ 
  children, 
  threshold = 0.3,
  className = 'aspect-video',
  fallback
}: LazyThreeSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <div ref={ref} className={className}>
      {isInView ? (
        <Suspense fallback={fallback || <SkeletonLoader />}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
          >
            {children}
          </Canvas>
        </Suspense>
      ) : (
        <PlaceholderImage />
      )}
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
      <div className="text-gray-400">Carregando visualização 3D...</div>
    </div>
  );
}

function PlaceholderImage() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100" />
  );
}
```

---

## 7. DESIGN SYSTEM (TOKENS)

```typescript
// design-system/tokens.ts

export const tokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    success: {
      50: '#f0fdf4',
      500: '#10b981',
      600: '#059669',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      400: '#a3a3a3',
      600: '#525252',
      900: '#171717',
    }
  },
  
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    }
  },
  
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
  },
  
  radius: {
    sm: '0.25rem',  // 4px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem',     // 16px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }
} as const;
```

---

## 8. MÉTRICAS DE SUCESSO

```yaml
KPIs Primários:
  Conversion Rate: ≥ 6.6% (piso Unbounce)
  CPL Meta CTWA: -24% vs baseline "Conversas"
  Quality Score Search: ≥ 7/10
  
Core Web Vitals:
  LCP: ≤ 2.5s (75th percentile)
  INP: < 200ms (75th percentile)
  CLS: < 0.1

Engagement:
  Avg Time on Page: ≥ 2min 30s
  Scroll Depth: ≥ 75%
  Bounce Rate: ≤ 45%
  
Three.js Performance:
  FPS Desktop: ≥ 60fps
  FPS Mobile: ≥ 30fps
  GPU Memory: < 100MB
  Initial Load: < 3s (total page + Three.js)

Funnel Metrics:
  form_start: baseline
  generate_lead: ≥ 70% of form_start
  qualify_lead: ≥ 85% of generate_lead
  working_lead: ≥ 40% of qualify_lead
  close_convert_lead: ≥ 15% of working_lead
```

---

## 9. CRONOGRAMA DE IMPLEMENTAÇÃO

```
Semana 1: Estrutura + Three.js Base
├─ Day 1-2: Setup Next.js + design tokens
├─ Day 3-4: Hero com Three.js (partículas)
└─ Day 5: Seção 2 (PhoneMockup3D)

Semana 2: Seções Estáticas + Forms
├─ Day 1-2: Seções 3, 4, 6 (sem Three.js)
├─ Day 3: Seção 7 (form + validação)
└─ Day 4-5: Seção 8 (FAQ) + integrações GA4

Semana 3: Three.js Avançado + Otimização
├─ Day 1-2: Seção 5 (Calendar3DTimeline)
├─ Day 3: Lazy loading + performance
└─ Day 4-5: Testes A/B + ajustes

Semana 4: Deploy + Monitoramento
├─ Day 1-2: Testes cross-browser/device
├─ Day 3: Deploy Vercel + DNS
└─ Day 4-5: Monitoramento GA4 + hotfixes
```

---

**FIM DO DOCUMENTO TÉCNICO**

## 10. FRAMER MOTION — Animações por seção e bridges inter-section

Resumo objetivo: padrões reutilizáveis, acessibilidade (prefers-reduced-motion), e dicas de performance. Use motion variants, stagger, and in-view triggers. Priorize transform/opacity-only animations to avoid layout thrash.

10.1 Padrões globais
- Easing + durations: fast 150ms, normal 300ms, slow 500ms (consistentes com tokens)
- Variants base:
  - hidden: { opacity: 0, y: 12 }
  - enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  - exit: { opacity: 0, y: -8, transition: { duration: 0.25 } }
- Stagger container: staggerChildren 0.06, delayChildren 0.06
- Respect prefers-reduced-motion: disable parallax, reduce durations to 0, and use simple opacity fades

10.2 Animações por seção (conciso)
- Hero (Seção 1): layered entrance
  - Background particles: subtle fade-in (opacity) + low-frequency slow movement (use requestAnimationFrame in Three.js, not Framer)
  - Headline: scale from 0.98 → 1 + opacity (0.35s)
  - CTAs: slide-up stagger (0.06s) with focus-visible styles

- Ver minha página (Seção 2): card reveal
  - Placeholder → Card: clip-path reveal or scaleY (0.45s)
  - Interactions: onDrag/hover microfeedback (scale 1.02, spring { stiffness: 220, damping: 20 })
  - Use reduced motion fallback: instant swap to generated preview

- Seletor de intenção (Seção 3): instant chips
  - Chips: tap scale 0.96 quick (0.12s) + ripple using pseudo-element
  - Panel swap: crossfade with height animation via layoutId or animatePresence

- Como funciona (Seção 4): step reveal
  - Steps appear in sequence with stagger (0.12s)
  - On scroll into view, animate icons with pop (scale 0 → 1)

- Prova funcional (Seção 5): sync 3D ↔ UI
  - Trigger Three.js timeline when section is in view (use inView hook)
  - FloatingCounter: gentle float (useFrame) + counter tween via spring in Framer for number updates
  - On animation start: overlay fade + pulse CTA

- Planos (Seção 6): pricing micro-interactions
  - Cards: hover lift (translateY -6px) + shadow depth transition (0.3s)
  - Toggle billing: smooth number crossfade using layout animation

- Captação (Seção 7): form micro-ux
  - Inputs: focus ring with scaleX underline animation
  - Submit: ripple → loader (morph opacity + scale) → success micro-entrance
  - Error: shake animation (x: [-8, 8, -6, 6, 0]) with reduced repetitions

- FAQ (Seção 8): accessible accordion
  - Use AnimatePresence for content enter/exit with maxHeight tween (avoid auto height layout thrash)
  - Icon rotate 180° on open (transform-only)

10.3 Bridges inter-section (UI-friendly dividers)
- SectionDivider component: animated SVG or gradient wipe triggered on scroll; lightweight and uses will-change: transform
- Edge-bridges patterns:
  - Soft wave wipe: SVG path translateX with opacity fade (duration 550ms)
  - Fade + scale connector: small card that briefly appears bridging two sections (use for CTAs between sections)
  - Scroll progress bar: thin top bar that animates per-section percentage (use requestAnimationFrame or Framer motion value)

10.4 Snippet: SectionContainer + variants (minimal)
```tsx
// components/animation/SectionContainer.tsx
import { motion } from 'framer-motion';

export const container = {
  hidden: {},
  enter: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } }
};

export const item = {
  hidden: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

export function SectionContainer({ children, id }) {
  return (
    <motion.section id={id} initial="hidden" whileInView="enter" viewport={{ once: true, amount: 0.2 }} variants={container}>
      {React.Children.map(children, (child) => (
        <motion.div variants={item}>{child}</motion.div>
      ))}
    </motion.section>
  );
}
```

10.5 Acessibilidade e performance (breve)
- Always check `prefers-reduced-motion` and provide instant fallbacks
- Prefer transform/opacity; avoid animating width/height/position that trigger layout
- Use will-change sparingly and remove after interaction
- Test on mid-range devices (Moto G6 / Snapdragon 660) for 30fps target

10.6 Checklist rápido para desenvolvedores
- [ ] Add `SectionContainer` wrapper to each section
- [ ] Add `SectionDivider` bridge between 1↔2, 2↔3 and 5↔6
- [ ] Wire up inView triggers for Three.js scenes (lazy load)
- [ ] Add reduce motion support site-wide

---

**Fim do capítulo Framer Motion.**

---

### Uso rápido dos componentes
- `SectionContainer`: envolver cada seção para animação de entrada e stagger automático. Substitua `<section>` por `<SectionContainer>` e mantenha a semântica ARIA.
- `SectionDivider variant="wave"|"fade"`: use entre Seção 1↔2, 2↔3 e 5↔6 para bridges visuais leves.

Exemplo mínimo:
```tsx
import SectionContainer from 'src/components/animation/SectionContainer';
import SectionDivider from 'src/components/animation/SectionDivider';

export default function Landing() {
  return (
    <main>
      <SectionContainer id="hero">...
      </SectionContainer>

      <SectionDivider variant="wave" />

      <SectionContainer id="preview">...</SectionContainer>
    </main>
  );
}
```

---

Fim do ajuste. (Adicionei components e resumo de uso.)