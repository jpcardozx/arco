# ✨ CATÁLOGO DE ADORNOS UI/UX - FOOTER PREMIUM

**Referência:** FOOTER_CRITICAL_ANALYSIS_REPORT.md - Seção 3  
**Objetivo:** Implementações práticas dos 5 adornos de elegância  
**Nível:** Design de Ponta (Cutting-Edge)

---

## 🌟 ADORNO #1: Shimmer Effect no Logo

### Conceito Visual
```
Estado Normal:     [========LOGO========]
Hover Iniciado:   [>-------LOGO--------]
Shimmer Passando: [---->>--LOGO--<<----]
Hover Completo:   [--------LOGO-------<]
```

### Implementação Completa

```tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const LogoWithShimmer = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href="/" 
      className="inline-block mb-8 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative p-4 rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Base border animada */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/20 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Neon border */}
        <div className="absolute inset-0 rounded-2xl border border-teal-400/0 group-hover:border-teal-400/30 group-hover:shadow-[0_0_30px_-5px_rgba(20,184,166,0.3)] transition-all duration-500" />
        
        {/* Logo */}
        <img 
          src="/logos/vertical/white.png" 
          alt="ARCO" 
          className="h-28 w-auto relative z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* ✨ SHIMMER EFFECT ✨ */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          initial={{ x: '-100%', opacity: 0 }}
          animate={isHovered ? { x: '100%', opacity: [0, 1, 1, 0] } : { x: '-100%', opacity: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier
            times: [0, 0.2, 0.8, 1]
          }}
          style={{
            background: `linear-gradient(
              90deg, 
              transparent 0%, 
              rgba(255, 255, 255, 0.1) 30%,
              rgba(255, 255, 255, 0.4) 50%,
              rgba(255, 255, 255, 0.1) 70%,
              transparent 100%
            )`,
            maskImage: 'linear-gradient(to right, transparent, white, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, white, transparent)',
          }}
        />

        {/* Secondary shimmer (delayed, mais sutil) */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          initial={{ x: '-100%', opacity: 0 }}
          animate={isHovered ? { x: '100%', opacity: [0, 0.6, 0.6, 0] } : { x: '-100%', opacity: 0 }}
          transition={{ 
            duration: 1.2,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.2, 0.8, 1]
          }}
          style={{
            background: `linear-gradient(
              90deg, 
              transparent 0%, 
              rgba(20, 184, 166, 0.2) 50%,
              transparent 100%
            )`,
            filter: 'blur(10px)',
          }}
        />
      </motion.div>
    </Link>
  );
};
```

### Variações de Shimmer

**Variação 1: Rainbow Shimmer (Colorido)**
```tsx
background: `linear-gradient(
  90deg,
  transparent,
  rgba(20, 184, 166, 0.4) 20%,
  rgba(251, 146, 60, 0.4) 40%,
  rgba(251, 146, 60, 0.4) 60%,
  rgba(20, 184, 166, 0.4) 80%,
  transparent
)`
```

**Variação 2: Dual Shimmer (Duas direções)**
```tsx
// Shimmer 1: Left to Right
animate={{ x: ['-100%', '100%'] }}

// Shimmer 2: Right to Left (simultaneamente)
animate={{ x: ['100%', '-100%'] }}
transition={{ delay: 0.2 }}
```

---

## 🧲 ADORNO #2: Magnetic Cursor Effect

### Conceito Visual
```
Cursor Longe:     •         [Botão]
Cursor Próximo:   •     [Botão>>]
Cursor Sobre:       [•Botão>>]
Cursor Saindo:    •     [<<Botão]
```

### Implementação Completa

```tsx
'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0-1, força da atração
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '',
  strength = 0.3 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Motion values para posição
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics para movimento suave
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calcular distância do cursor ao centro
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Aplicar força magnética (mais próximo = mais forte)
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// Uso no Newsletter Button
<MagneticButton
  strength={0.25}
  className="px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg"
  style={{
    background: `linear-gradient(135deg, ${designTokens.colors.teal[500]} 0%, ${designTokens.colors.teal[600]} 100%)`,
  }}
>
  Inscrever-se
</MagneticButton>
```

### Variações Magnéticas

**Variação 1: Magnetic Area (Área de influência)**
```tsx
const handleMouseMove = (e: React.MouseEvent) => {
  if (!ref.current) return;

  const rect = ref.current.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distanceX = e.clientX - centerX;
  const distanceY = e.clientY - centerY;

  // Calcular distância total
  const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
  const maxDistance = 150; // Raio de influência

  if (distance < maxDistance) {
    // Força inversamente proporcional à distância
    const force = 1 - (distance / maxDistance);
    x.set(distanceX * strength * force);
    y.set(distanceY * strength * force);
  } else {
    x.set(0);
    y.set(0);
  }
};
```

**Variação 2: Magnetic with Rotation**
```tsx
const rotation = useMotionValue(0);
const springRotation = useSpring(rotation, springConfig);

const handleMouseMove = (e: React.MouseEvent) => {
  // ... código de posição ...
  
  // Adicionar rotação baseada na direção
  const angle = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
  rotation.set(angle * 0.05); // 5% da rotação real
};

<motion.button
  style={{
    x: springX,
    y: springY,
    rotate: springRotation
  }}
>
```

---

## 🌈 ADORNO #3: Gradient Border Animation

### Conceito Visual
```
Frame 1:  [═════●═════]  ← Gradiente começa em 0°
Frame 2:  [═══●═══════]  ← Gradiente rotaciona 90°
Frame 3:  [═●═════════]  ← Gradiente rotaciona 180°
Frame 4:  [═══════●═══]  ← Gradiente rotaciona 270°
Loop...   [═════●═════]  ← Volta ao início
```

### Implementação Completa

```tsx
'use client';

import { motion } from 'framer-motion';

interface GradientBorderProps {
  children: React.ReactNode;
  colors?: [string, string, string]; // 3 cores para o gradiente
  speed?: number; // Duração da rotação em segundos
  thickness?: number; // Espessura da borda em pixels
  className?: string;
}

const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  colors = ['#14b8a6', '#f97316', '#14b8a6'], // teal -> orange -> teal
  speed = 8,
  thickness = 2,
  className = ''
}) => {
  return (
    <div className={`relative p-[${thickness}px] rounded-2xl overflow-hidden ${className}`}>
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: `conic-gradient(
            from 0deg,
            ${colors[0]} 0deg,
            ${colors[1]} 120deg,
            ${colors[2]} 240deg,
            ${colors[0]} 360deg
          )`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Inner content container */}
      <div className="relative bg-slate-900 rounded-2xl p-8 lg:p-10 z-10">
        {children}
      </div>
    </div>
  );
};

// Uso no Newsletter Card
<GradientBorder
  colors={['#14b8a6', '#f97316', '#14b8a6']}
  speed={10}
  thickness={2}
  className="group"
>
  <div className="flex items-start gap-4 mb-6">
    <div className="p-3 rounded-xl bg-teal-500/20">
      <Send className="w-6 h-6 text-teal-300" strokeWidth={2} />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-white mb-2">
        Insights Semanais
      </h3>
      {/* ... resto do conteúdo ... */}
    </div>
  </div>
</GradientBorder>
```

### Variações de Gradient Border

**Variação 1: Pulsating Gradient**
```tsx
<motion.div
  className="absolute inset-0 -z-10"
  style={{
    background: `conic-gradient(
      from 0deg,
      ${colors[0]} 0deg,
      ${colors[1]} 120deg,
      ${colors[2]} 240deg,
      ${colors[0]} 360deg
    )`,
  }}
  animate={{ 
    rotate: 360,
    scale: [1, 1.05, 1]
  }}
  transition={{
    rotate: { duration: speed, repeat: Infinity, ease: "linear" },
    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }}
/>
```

**Variação 2: Glow Effect (Borda brilhante)**
```tsx
<motion.div
  className="absolute inset-0 -z-10 blur-xl opacity-70"
  style={{
    background: `conic-gradient(
      from 0deg,
      ${colors[0]} 0deg,
      ${colors[1]} 120deg,
      ${colors[2]} 240deg,
      ${colors[0]} 360deg
    )`,
  }}
  animate={{ rotate: 360 }}
  transition={{
    duration: speed,
    repeat: Infinity,
    ease: "linear"
  }}
/>
```

**Variação 3: Double Border (Borda dupla)**
```tsx
<div className="relative p-[3px] rounded-2xl overflow-hidden">
  {/* Outer border */}
  <motion.div
    className="absolute inset-0 -z-20"
    animate={{ rotate: 360 }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    style={{
      background: 'conic-gradient(from 0deg, #14b8a6, #f97316, #14b8a6)'
    }}
  />
  
  {/* Gap */}
  <div className="relative p-[2px] rounded-2xl bg-slate-950">
    {/* Inner border */}
    <motion.div
      className="absolute inset-0 -z-10"
      animate={{ rotate: -360 }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      style={{
        background: 'conic-gradient(from 0deg, #14b8a6, #f97316, #14b8a6)'
      }}
    />
    
    {/* Content */}
    <div className="relative bg-slate-900 rounded-2xl p-8">
      {children}
    </div>
  </div>
</div>
```

---

## 📝 ADORNO #4: Text Reveal Animation

### Conceito Visual
```
Estado Inicial:    [████████████]  ← Texto blur completo
Revelando (30%):   [abcd████████]  ← Primeiras letras claras
Revelando (60%):   [abcdefgh████]  ← Mais letras aparecem
Revelado (100%):   [abcdefghijkl]  ← Texto completamente visível
```

### Implementação Completa

```tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  staggerChildren?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  delay = 0,
  duration = 0.05,
  className = '',
  staggerChildren = 0.03
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ 
                opacity: 0, 
                filter: 'blur(10px)',
                y: 10
              }}
              animate={isInView ? { 
                opacity: 1, 
                filter: 'blur(0px)',
                y: 0
              } : {}}
              transition={{
                delay: delay + (wordIndex * words[0].length + charIndex) * staggerChildren,
                duration: duration,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

// Uso nos títulos
<h3 className="text-2xl font-bold text-white mb-2">
  <TextReveal 
    text="Insights Semanais"
    staggerChildren={0.04}
  />
</h3>
```

### Variações de Text Reveal

**Variação 1: Wave Effect**
```tsx
const TextRevealWave: React.FC<TextRevealProps> = ({ text }) => {
  const letters = text.split('');
  
  return (
    <span>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 50, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            transition: {
              delay: i * 0.05,
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};
```

**Variação 2: Typewriter Effect**
```tsx
const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 50); // 50ms por letra

      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span>
      {displayedText}
      {index < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-6 bg-teal-400 ml-1"
        />
      )}
    </span>
  );
};
```

**Variação 3: Glitch Reveal**
```tsx
const GlitchReveal: React.FC<{ text: string }> = ({ text }) => {
  return (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        animate={{
          x: [0, -2, 2, 0],
          textShadow: [
            '0 0 0 transparent',
            '2px 0 0 rgba(20,184,166,0.5), -2px 0 0 rgba(249,115,22,0.5)',
            '0 0 0 transparent'
          ]
        }}
        transition={{
          duration: 0.3,
          times: [0, 0.5, 1],
          repeat: 2
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
};
```

---

## 🎨 ADORNO #5: Glassmorphism Hover Card

### Conceito Visual
```
Estado Normal:     [Card Opaco]
Hover Iniciado:    [Card Semi-transparente]
Hover Completo:    [Card Vidro Fosco + Glow]
```

### Implementação Completa

```tsx
'use client';

import { motion } from 'framer-motion';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className = '',
  intensity = 'medium'
}) => {
  const intensityMap = {
    light: {
      blur: 'blur(12px)',
      saturation: '150%',
      opacity: 0.05,
      border: 'rgba(255, 255, 255, 0.1)'
    },
    medium: {
      blur: 'blur(20px)',
      saturation: '180%',
      opacity: 0.1,
      border: 'rgba(20, 184, 166, 0.3)'
    },
    strong: {
      blur: 'blur(30px)',
      saturation: '200%',
      opacity: 0.15,
      border: 'rgba(20, 184, 166, 0.4)'
    }
  };

  const config = intensityMap[intensity];

  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {/* Glassmorphism effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl -z-10 transition-all duration-500"
        variants={{
          initial: {
            backdropFilter: 'blur(0px) saturate(100%)',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
          hover: {
            backdropFilter: `${config.blur} saturate(${config.saturation})`,
            backgroundColor: `rgba(20, 184, 166, ${config.opacity})`,
            borderColor: config.border,
          }
        }}
        style={{
          border: '1px solid',
        }}
      />

      {/* Inner glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl -z-20"
        variants={{
          initial: {
            opacity: 0,
            scale: 0.95,
          },
          hover: {
            opacity: 1,
            scale: 1,
          }
        }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(20,184,166,0.2), transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl -z-5 pointer-events-none"
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%, rgba(20,184,166,0.05) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 }
        }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          variants={{
            hover: {
              x: ['0%', '100%'],
              transition: {
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2
              }
            }
          }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            width: '50%',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Uso no Footer (Trust Metrics Card)
<GlassmorphicCard intensity="medium" className="p-6 rounded-2xl">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
      <Users className="w-5 h-5 text-teal-400" />
    </div>
    <div>
      <div className="text-white font-bold text-lg">200+</div>
      <div className="text-white/60 text-xs">Empresas Atendidas</div>
    </div>
  </div>
</GlassmorphicCard>
```

### Variações de Glassmorphism

**Variação 1: Frosted Glass com Noise**
```tsx
<motion.div
  className="absolute inset-0 rounded-2xl -z-10"
  style={{
    backdropFilter: 'blur(20px) saturate(180%)',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
  }}
/>
```

**Variação 2: Liquid Glass (Efeito líquido)**
```tsx
<motion.div
  className="absolute inset-0 rounded-2xl -z-10"
  animate={{
    background: [
      'radial-gradient(circle at 20% 30%, rgba(20,184,166,0.1), transparent 50%)',
      'radial-gradient(circle at 80% 70%, rgba(249,115,22,0.1), transparent 50%)',
      'radial-gradient(circle at 20% 30%, rgba(20,184,166,0.1), transparent 50%)',
    ]
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  style={{
    backdropFilter: 'blur(20px) saturate(180%)',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
  }}
/>
```

---

## 📊 TABELA COMPARATIVA DE PERFORMANCE

| Adorno | Bundle Impact | CPU Usage | GPU Usage | Mobile Safe | Recomendação |
|--------|---------------|-----------|-----------|-------------|--------------|
| Shimmer Effect | +2kb | Baixo | Médio | ✅ Sim | Usar com moderação (max 3 elementos) |
| Magnetic Cursor | +1.5kb | Médio | Baixo | ⚠️ Desktop only | Desabilitar em touch devices |
| Gradient Border | +0.5kb | Baixo | Alto | ⚠️ Cauteloso | Limitar a 2 elementos simultâneos |
| Text Reveal | +3kb | Alto | Baixo | ✅ Sim | OK para títulos principais |
| Glassmorphism | +1kb | Baixo | Alto | ⚠️ Cauteloso | Usar backdrop-filter com fallback |

---

## 🎯 GUIA DE APLICAÇÃO ESTRATÉGICA

### Onde Aplicar Cada Adorno

**Shimmer Effect:**
- ✅ Logo (hover)
- ✅ CTA buttons principais
- ❌ Links de navegação (muito sutil)
- ❌ Ícones pequenos (imperceptível)

**Magnetic Cursor:**
- ✅ Newsletter button
- ✅ Scroll to top button
- ❌ Links de texto (interfere com leitura)
- ❌ Mobile (não tem cursor)

**Gradient Border:**
- ✅ Newsletter card (destaque principal)
- ✅ Trust metrics section (opcional)
- ❌ Todos os cards (poluição visual)
- ❌ Navigation items (distração)

**Text Reveal:**
- ✅ Títulos principais (h2, h3)
- ✅ Frases de destaque
- ❌ Corpo de texto (dificulta leitura)
- ❌ Labels de formulário (acessibilidade)

**Glassmorphism:**
- ✅ Cards hover state
- ✅ Modal overlays
- ❌ Texto sobre vidro (contraste)
- ❌ Mobile old browsers (não suportado)

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

- [ ] Adorno escolhido tem fallback para navegadores antigos
- [ ] Performance testada em dispositivo low-end
- [ ] Animação respeita `prefers-reduced-motion`
- [ ] Não interfere com usabilidade (keyboard navigation, screen readers)
- [ ] Bundle size justificado pelo impacto visual
- [ ] Documentado para futura manutenção

---

**Próximo Passo:** Selecionar 2-3 adornos prioritários e implementar incrementalmente
