# 🎨 GUIA RÁPIDO - COLOR SYSTEM ARCO

## ✨ QUICK REFERENCE

### Cores Principais
```css
/* Primary Brand */
teal-500:   #14b8a6
orange-500: #f97316

/* Backgrounds */
slate-950: #020617  (primary)
slate-900: #0f172a  (secondary)
slate-800: #1e293b  (tertiary)

/* Text */
white:       #ffffff      (21:1 - AAA)
slate-300:   #cbd5e1      (7.1:1 - AAA)
slate-400:   #94a3b8      (4.6:1 - AA)
```

---

## 🎯 USO POR ELEMENTO

### Botões

#### CTA Primário
```tsx
<Button className="bg-gradient-to-r from-arco-teal-600 to-arco-orange-500 hover:from-arco-teal-500 hover:to-arco-orange-400 text-white">
```

#### CTA Secundário
```tsx
<Button className="bg-arco-teal-600 hover:bg-arco-teal-500 text-white">
```

#### CTA Outline
```tsx
<Button className="border-2 border-arco-teal-500 text-arco-teal-300 hover:bg-arco-teal-500/10">
```

### Badges

#### Primary
```tsx
<Badge className="bg-arco-teal-500/10 border border-arco-teal-500/30 text-arco-teal-300">
```

#### Success
```tsx
<Badge className="bg-success-500/10 border border-success-500/30 text-success-400">
```

#### Warning
```tsx
<Badge className="bg-warning-500/10 border border-warning-500/30 text-warning-400">
```

### Títulos

#### H1 (Hero)
```tsx
<h1 className="text-5xl md:text-7xl font-bold text-white">
```

#### H2 (Section)
```tsx
<h2 className="text-4xl md:text-5xl font-bold text-white">
```

#### H3 (Card)
```tsx
<h3 className="text-2xl font-bold text-white">
```

### Texto

#### Parágrafo Principal
```tsx
<p className="text-lg text-slate-300">
```

#### Parágrafo Secundário
```tsx
<p className="text-base text-slate-400">
```

#### Label/Metadata
```tsx
<span className="text-sm text-slate-400">
```

### Cards

#### Card Principal
```tsx
<div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
```

#### Card Secundário
```tsx
<div className="bg-slate-800/50 border border-slate-700/30 rounded-xl p-4">
```

---

## ❌ NÃO FAZER

```tsx
// ❌ Gradient em títulos
<h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

// ❌ Text com baixo contraste
<p className="text-slate-200">  // 3.8:1 - FALHA

// ❌ Múltiplas cores em gradient
<div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">

// ❌ Cores não-brand
<Button className="bg-purple-600">
```

## ✅ FAZER

```tsx
// ✅ Títulos simples e claros
<h1 className="text-white">

// ✅ Text com alto contraste
<p className="text-slate-300">  // 7.1:1 - AAA

// ✅ Gradient brand consistente
<div className="bg-gradient-to-r from-arco-teal-600 to-arco-orange-500">

// ✅ Cores brand
<Button className="bg-arco-teal-600">
```

---

## 🔧 CSS VARIABLES

### Usar nos componentes:
```css
.custom-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border-default);
}
```

### Utility Classes disponíveis:
```css
.text-primary     /* white */
.text-secondary   /* slate-300 */
.text-tertiary    /* slate-400 */

.bg-primary       /* slate-950 */
.bg-secondary     /* slate-900 */
.bg-tertiary      /* slate-800 */

.gradient-primary       /* background gradient */
.gradient-text-primary  /* text gradient */
```

---

## 📊 CONTRASTE WCAG

| Cor | Sobre slate-950 | Nível |
|-----|----------------|-------|
| white | 21:1 | AAA |
| slate-300 | 7.1:1 | AAA |
| slate-400 | 4.6:1 | AA |
| slate-500 | 3.2:1 | - |

**Mínimos**:
- AA: 4.5:1 (texto normal)
- AAA: 7:1 (texto normal)

---

## 🎨 EXEMPLOS PRÁTICOS

### Hero Section
```tsx
<section className="bg-slate-950 py-20">
  <Badge className="bg-arco-teal-500/10 border border-arco-teal-500/30 text-arco-teal-300">
    Novo
  </Badge>
  
  <h1 className="text-6xl font-bold text-white">
    Título Principal
  </h1>
  
  <p className="text-xl text-slate-300">
    Descrição com alto contraste
  </p>
  
  <Button className="bg-gradient-to-r from-arco-teal-600 to-arco-orange-500 text-white">
    CTA Principal
  </Button>
</section>
```

### Card de Serviço
```tsx
<Card className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50">
  <CardHeader>
    <div className="p-4 bg-arco-teal-500/10 rounded-lg inline-flex">
      <Icon className="w-6 h-6 text-arco-teal-400" />
    </div>
    <CardTitle className="text-2xl font-bold text-white">
      Serviço
    </CardTitle>
  </CardHeader>
  
  <CardContent>
    <p className="text-slate-300">
      Descrição do serviço
    </p>
  </CardContent>
</Card>
```

---

**Última atualização**: 15 de outubro de 2025
