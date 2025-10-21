# Como Adicionar Imagens Reais aos Assets

## 📸 Imagens Necessárias

### Para funcionar corretamente, adicione as seguintes imagens em `public/images/salon-examples/`:

```bash
public/images/salon-examples/
├── hero-ambient.webp           # Background sutil do Hero (1920x1080)
├── example-1.webp              # Ambiente moderno (800x600)
├── example-2.webp              # Serviço profissional (800x600)
└── example-3.webp              # Infraestrutura completa (800x600)
```

## 🚀 Passo a Passo

### 1. Obter Imagens de Stock (Temporário)

Você pode usar imagens de stock temporariamente de:
- [Unsplash](https://unsplash.com/s/photos/hair-salon)
- [Pexels](https://www.pexels.com/search/beauty-salon/)
- [Pixabay](https://pixabay.com/images/search/hair-salon/)

**Termos de busca sugeridos:**
- "modern hair salon interior"
- "professional hairstylist working"
- "beauty salon stations"
- "salon equipment"

### 2. Download das Imagens

Baixe 4 imagens de alta qualidade (mínimo 1920x1080 para hero, 800x600 para examples).

Renomeie-as temporariamente:
```bash
# Coloque em public/images/salon-examples/
hero-ambient.jpg
example-1.jpg
example-2.jpg
example-3.jpg
```

### 3. Otimizar Automaticamente

Execute o otimizador para converter para WebP:

```bash
pnpm images:optimize
```

O script vai:
- ✅ Converter JPG/PNG → WebP
- ✅ Redimensionar para dimensões otimizadas
- ✅ Comprimir com qualidade 85%
- ✅ Manter originais como fallback
- ✅ Mostrar economia de tamanho

### 4. Verificar Resultados

Após otimização, você terá:

```bash
public/images/salon-examples/
├── hero-ambient.jpg            # Original (pode deletar depois)
├── hero-ambient.webp           # ✅ Otimizado
├── example-1.jpg
├── example-1.webp              # ✅ Otimizado
├── example-2.jpg
├── example-2.webp              # ✅ Otimizado
├── example-3.jpg
└── example-3.webp              # ✅ Otimizado
```

### 5. Testar no Navegador

```bash
pnpm dev
```

Visite `http://localhost:3000` e verifique:
- ✅ Hero Section tem background sutil
- ✅ ProofSection mostra galeria de 3 imagens
- ✅ Placeholders SVG aparecem enquanto carrega
- ✅ Imagens fazem fade-in suave
- ✅ Disclaimer aparece abaixo da galeria

## 🎨 Critérios de Seleção de Imagens

### Hero Background (`hero-ambient.webp`)
- **Tipo:** Ambiente de salão moderno (desfocado)
- **Uso:** Background sutil com opacity 3%
- **Dimensões:** 1920x1080px
- **Características:**
  - Luminoso, clean
  - Cores neutras (branco, cinza, madeira)
  - Pode ser levemente desfocado
  - Sem textos ou logos visíveis

### Example 1 (`example-1.webp`) - Design Moderno
- **Tipo:** Interior de salão com design contemporâneo
- **Dimensões:** 800x600px
- **Características:**
  - Espelhos grandes
  - Iluminação moderna (LED, pendentes)
  - Cores neutras com acentos
  - Espaço amplo e organizado

### Example 2 (`example-2.webp`) - Serviço Premium
- **Tipo:** Profissional realizando serviço
- **Dimensões:** 800x600px
- **Características:**
  - Mãos do profissional visíveis
  - Equipamento profissional (secador, escova)
  - Cliente satisfeito (opcional)
  - Foco na técnica/qualidade

### Example 3 (`example-3.webp`) - Infraestrutura
- **Tipo:** Múltiplas estações de trabalho
- **Dimensões:** 800x600px
- **Características:**
  - Vista panorâmica do salão
  - Múltiplas cadeiras/estações
  - Organização profissional
  - Áreas bem definidas (corte, lavagem, espera)

## ⚠️ Importante - Disclaimers

As seções já incluem disclaimers automáticos:

```tsx
<p className="text-xs text-slate-500 text-center mt-6">
  * Imagens ilustrativas de ambientes de referência. 
  Não representam clientes específicos do ARCO.
</p>
```

Isso garante transparência com visitantes.

## 🔄 Alternativa: Usar Placeholders Temporariamente

Se não quiser adicionar imagens agora, os **placeholders SVG inline** já funcionam:

```tsx
<OptimizedImage
  src="/images/salon-examples/example-1.webp"  // Não existe ainda
  alt="Design Moderno"
  placeholderType="salonInterior"  // ✅ Mostra SVG bonito
/>
```

Os placeholders são:
- ✅ Inline (zero requests HTTP)
- ✅ Bonitos e temáticos
- ✅ Lightweight (~1KB cada)
- ✅ Sem dependências externas

## 📊 Performance Esperada

### Antes da Otimização
- Hero Background: ~500KB (JPG)
- 3 Examples: ~1.5MB total
- **Total: ~2MB**

### Depois da Otimização
- Hero Background: ~120KB (WebP)
- 3 Examples: ~240KB total
- **Total: ~360KB (-82%)**

### Lighthouse Scores
- Performance: 90+
- LCP: < 2.5s
- CLS: < 0.1

## 🛠️ Comandos Úteis

```bash
# Otimizar todas as imagens
pnpm images:optimize

# Otimizar pasta específica
node scripts/image-optimizer.js public/images/salon-examples

# Verificar tamanhos
du -sh public/images/salon-examples/*

# Limpar .next cache
pnpm clean

# Rebuild
pnpm build
```

## 📝 Checklist Final

- [ ] 4 imagens adicionadas em `public/images/salon-examples/`
- [ ] Otimizador executado (`pnpm images:optimize`)
- [ ] Arquivos .webp gerados
- [ ] Servidor dev rodando (`pnpm dev`)
- [ ] Hero Section com background sutil visível
- [ ] ProofSection com galeria de 3 imagens
- [ ] Disclaimer de referência visível
- [ ] Performance testada (Lighthouse)
- [ ] Imagens carregando com fade-in
- [ ] Lazy loading funcionando

## 🎯 Próximos Passos

1. **Curto Prazo:** Usar imagens de stock (Unsplash/Pexels)
2. **Médio Prazo:** Fotografar salões parceiros (com permissão)
3. **Longo Prazo:** Ter galeria própria de cases de sucesso

---

**Status Atual:** ✅ Código implementado, aguardando imagens reais  
**Fallback:** Placeholders SVG funcionando perfeitamente
