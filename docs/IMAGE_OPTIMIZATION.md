# Guia de Otimização de Imagens AVIF

## ✅ Implementado

### 1. **Imports Corrigidos na Homepage**
- Convertidos de imports relativos (`../components/`) para absolutos (`@/components/`)
- Melhor manutenibilidade e consistência com o resto do projeto

### 2. **OptimizedImage Component - Suporte AVIF**
Localização: `src/components/ui/optimized-image.tsx`

**Ordem de Fallback (do melhor para mais compatível):**
```html
<picture>
  <!-- AVIF - até 50% menor que WebP -->
  <source srcSet="image.avif" type="image/avif" />
  
  <!-- WebP - até 30% menor que JPG -->
  <source srcSet="image.webp" type="image/webp" />
  
  <!-- JPG/PNG - Fallback universal -->
  <img src="image.jpg" alt="..." />
</picture>
```

**Features:**
- ✅ Lazy loading nativo (exceto `priority`)
- ✅ Blur placeholder durante carregamento
- ✅ Fade-in animation suave
- ✅ `fetchpriority="high"` para LCP
- ✅ `decoding="async"` para não bloquear renderização
- ✅ Fallback automático para navegadores antigos

## 📊 Comparação de Tamanho

| Formato | Tamanho Relativo | Qualidade |
|---------|------------------|-----------|
| **AVIF** | 100% (menor) | Excelente |
| **WebP** | ~200% (+100%) | Muito Boa |
| **JPG** | ~300% (+200%) | Boa |

**Exemplo Real:**
- JPG original: 300KB
- WebP: ~210KB (-30%)
- AVIF: ~150KB (-50%)

## 🌐 Suporte de Navegadores

### AVIF
- ✅ Chrome 85+ (Set 2020)
- ✅ Edge 85+ (Set 2020)
- ✅ Firefox 93+ (Out 2021)
- ✅ Safari 16+ (macOS 13+, Out 2022)
- ✅ Opera 71+ (Set 2020)
- ❌ IE11 (fallback automático)

### WebP (Fallback)
- ✅ Chrome 23+ (2012)
- ✅ Firefox 65+ (2019)
- ✅ Safari 14+ (2020)
- ✅ Edge 18+ (2018)

### JPG/PNG (Fallback Universal)
- ✅ Todos os navegadores

## 🎯 Como Usar

### Next.js Image (Recomendado para imagens estáticas)
```tsx
import Image from 'next/image';

// Next.js gera AVIF e WebP automaticamente
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority  // Para LCP (hero images)
  quality={85}  // Padrão: 75
/>
```

**Configuração já ativa em `next.config.mjs`:**
```javascript
images: {
  formats: ['image/avif', 'image/webp'],  // ✅ AVIF primeiro
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### OptimizedImage (Para imagens dinâmicas)
```tsx
import { OptimizedImage } from '@/components/ui/optimized-image';

<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority  // Para LCP
  objectFit="cover"
  placeholderType="blur"
/>
```

## 🚀 Melhores Práticas

### 1. **Priorize Above-the-Fold (LCP)**
```tsx
// Hero images - SEMPRE priority
<Image src="/hero.jpg" priority />

// Imagens abaixo da dobra - lazy loading
<Image src="/feature.jpg" loading="lazy" />
```

### 2. **Tamanhos Responsivos**
```tsx
<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  priority
/>
```

### 3. **Otimize Antes de Deploy**
```bash
# Converter para AVIF (usando squoosh-cli)
npx @squoosh/cli --avif '{quality:85}' image.jpg

# Ou use o script do projeto
pnpm images:optimize
```

### 4. **Use Placeholders**
```tsx
// Blur placeholder para melhor UX
<Image
  src="/hero.jpg"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## 📁 Estrutura de Arquivos Recomendada

```
public/images/
├── hero.avif      # Versão AVIF
├── hero.webp      # Fallback WebP
├── hero.jpg       # Fallback JPG
└── thumbnails/
    ├── product-1.avif
    ├── product-1.webp
    └── product-1.jpg
```

## 🛠️ Ferramentas de Conversão

### Online
- [Squoosh](https://squoosh.app/) - Google (Recomendado)
- [avif.io](https://avif.io/) - Batch converter

### CLI
```bash
# Squoosh CLI (Recomendado)
npx @squoosh/cli --avif '{quality:85}' *.jpg

# ImageMagick
convert input.jpg -quality 85 output.avif

# Sharp (Node.js)
sharp('input.jpg').avif({ quality: 85 }).toFile('output.avif')
```

## 📈 Core Web Vitals Impact

### Largest Contentful Paint (LCP)
- ✅ AVIF reduz tempo de download em ~50%
- ✅ `priority` images carregam primeiro
- ✅ `fetchpriority="high"` para navegadores modernos

### Cumulative Layout Shift (CLS)
- ✅ `width` e `height` sempre definidos
- ✅ Placeholder blur evita shifts

### First Contentful Paint (FCP)
- ✅ Lazy loading para imagens abaixo da dobra
- ✅ Menor payload inicial

## ⚠️ Limitações Conhecidas

1. **AVIF é CPU-intensive para encoding**
   - Solução: Pre-gere AVIF no build ou use CDN com conversão automática

2. **Safari 16+ apenas**
   - Solução: Fallback WebP/JPG sempre presente

3. **Tamanho de arquivos AVIF podem ser maiores em baixa qualidade (<50)**
   - Solução: Use quality 75-85 para melhor custo-benefício

## 🔄 Workflow Recomendado

### Desenvolvimento
```bash
# 1. Adicione JPG/PNG original
cp image.jpg public/images/

# 2. O Next.js gera AVIF/WebP automaticamente em dev
pnpm dev

# 3. Para produção, pre-gere AVIF
pnpm images:optimize
```

### Build/Deploy
```bash
# Next.js otimiza automaticamente
pnpm build

# Vercel/Netlify fazem conversão on-the-fly
# Não precisa commitar AVIF/WebP
```

## 📚 Referências

- [AVIF Spec](https://aomediacodec.github.io/av1-avif/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Can I Use AVIF](https://caniuse.com/avif)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)

---

**Última atualização:** 1 de fevereiro de 2026
**Status:** ✅ Implementado e testado
