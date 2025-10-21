# Guia de Implementação de Imagens

## 🎯 Objetivo

Usar imagens de referência para compor o design da landing page sem fingir que são nossos clientes. São **assets de exemplo** para ambientar e demonstrar o padrão de qualidade esperado.

## 📁 Estrutura de Pastas

```
public/images/
├── salon-examples/          # Imagens de exemplo (não são clientes reais)
│   ├── modern-interior-1.webp
│   ├── modern-interior-1.jpg (fallback)
│   ├── professional-service.webp
│   ├── salon-stations.webp
│   └── unique-design.webp
└── placeholders/            # Placeholders temporários
```

## 🚀 Como Usar

### 1. Adicionar Imagens

Coloque as imagens originais em `public/images/salon-examples/` nos formatos JPG ou PNG.

### 2. Otimizar Automaticamente

```bash
# Otimiza todas as imagens da pasta
node scripts/image-optimizer.js public/images/salon-examples

# O script vai:
# - Redimensionar para máximo 1920x1080
# - Converter para WebP com 85% de qualidade
# - Manter o original como fallback
# - Mostrar economia de tamanho
```

### 3. Usar no Código

```tsx
import { OptimizedImage } from '@/components/ui/optimized-image';

// Uso básico
<OptimizedImage
  src="/images/salon-examples/modern-interior-1.webp"
  alt="Exemplo de ambiente moderno de salão"
  className="w-full h-64 rounded-lg"
/>

// Com controle de loading
<OptimizedImage
  src="/images/salon-examples/professional-service.webp"
  alt="Profissional realizando serviço"
  priority={false}  // lazy loading
  objectFit="cover"
  width={800}
  height={600}
/>
```

## 📊 Especificações Técnicas

### Dimensões Recomendadas

| Uso | Largura | Altura | Peso Alvo (WebP) |
|-----|---------|--------|------------------|
| Hero/Full-width | 1920px | 1080px | 150-200KB |
| Cards/Grid | 800px | 600px | 50-80KB |
| Thumbnails | 400px | 300px | 20-30KB |
| Mobile Hero | 768px | 1024px | 80-120KB |

### Otimização

- **Formato:** WebP (fallback JPG)
- **Qualidade:** 85%
- **Compressão:** Lossy
- **Lazy Loading:** Ativo para imagens fora do viewport
- **Blur Placeholder:** Animação durante carregamento

## 🎨 Componente OptimizedImage

### Features

✅ **Lazy Loading Nativo** - Usa atributo `loading="lazy"`  
✅ **WebP com Fallback** - Suporta navegadores antigos  
✅ **Blur Placeholder** - Melhora perceived performance  
✅ **Fade-in Animation** - Transição suave ao carregar  
✅ **Error Handling** - Fallback visual se imagem falhar  

### Props

```typescript
interface OptimizedImageProps {
  src: string;              // Caminho da imagem
  alt: string;              // Texto alternativo (SEO)
  width?: number;           // Largura do container
  height?: number;          // Altura do container
  className?: string;       // Classes CSS
  priority?: boolean;       // true = eager loading
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;      // Callback quando carregar
}
```

## 📸 SalonShowcaseSection

Componente de carrossel/galeria pronto para usar:

```tsx
import { SalonShowcaseSection } from '@/components/landing/sections/SalonShowcaseSection';

// Em qualquer página
<SalonShowcaseSection />
```

### Features

- ✅ Carrossel responsivo com animações Framer Motion
- ✅ Swipe/Drag para navegar (mobile-friendly)
- ✅ Navegação por setas e indicadores
- ✅ Overlay com título e descrição
- ✅ Grid de estatísticas integrado
- ✅ Lazy loading automático

## 🔍 SEO & Acessibilidade

### Alt Text

❌ **Ruim:** `alt="imagem1"`  
❌ **Ruim:** `alt="Salão de beleza"`  
✅ **Bom:** `alt="Exemplo de ambiente moderno de salão com espelhos circulares e iluminação LED"`

### Structured Data

Adicionar schema.org para imagens de exemplo:

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://seusite.com/images/salon-examples/modern-interior-1.webp",
  "description": "Exemplo de ambiente moderno de salão de beleza",
  "name": "Ambiente Moderno - Exemplo",
  "isPartOf": {
    "@type": "WebPage",
    "name": "Landing Page ARCO"
  }
}
```

## 📈 Performance Checklist

- [ ] Todas as imagens convertidas para WebP
- [ ] Fallback JPG disponível
- [ ] Dimensões apropriadas para uso
- [ ] Lazy loading ativo (exceto hero)
- [ ] Alt text descritivo em todas
- [ ] Blur placeholder configurado
- [ ] Compressão 80-85%
- [ ] Peso total < 500KB por seção

## 🎯 Disclaimers Sugeridos

Adicionar em rodapé ou seções relevantes:

```tsx
<p className="text-xs text-slate-500 text-center mt-4">
  * Imagens ilustrativas de ambientes de referência. 
  Não representam clientes ou resultados específicos.
</p>
```

## 🛠️ Troubleshooting

### Imagem não aparece

1. Verifique se o arquivo existe em `public/images/...`
2. Confirme que o caminho começa com `/` (absoluto)
3. Limpe cache do navegador (Ctrl+Shift+R)
4. Verifique console para erros 404

### Performance ruim

1. Execute o otimizador: `node scripts/image-optimizer.js`
2. Verifique se lazy loading está ativo
3. Use DevTools → Network para ver tamanhos
4. Considere usar CDN (Cloudinary, Vercel Image, etc.)

### WebP não funciona

1. Verifique se fallback JPG existe
2. Confirme que `<picture>` está sendo usado
3. Teste em navegador compatível (Chrome, Firefox, Safari 14+)

## 📚 Recursos Adicionais

- [WebP Guide - Google Developers](https://developers.google.com/speed/webp)
- [Image Optimization - Next.js](https://nextjs.org/docs/basic-features/image-optimization)
- [Lazy Loading Images - MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)

---

**Última atualização:** 20 de outubro de 2025
