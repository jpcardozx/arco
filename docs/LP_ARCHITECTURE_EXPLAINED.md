# 📚 Arquitetura LP: `/lp/[slug]` vs Rota Estática

**Data:** 18 de outubro de 2025  
**Objetivo:** Explicar didaticamente a escolha arquitetural

---

## 🎯 Comparação Direta

### Arquitetura 1: `/lp/[slug]` (Implementada)

```
URL: /lp/salao-beleza-2024
Código: src/app/lp/[slug]/page.tsx (1 arquivo)
Dados: Supabase campaigns table
```

### Arquitetura 2: `/salao-de-beleza` (Alternativa)

```
URL: /salao-de-beleza
Código: src/app/salao-de-beleza/page.tsx (1 arquivo por campanha)
Dados: Hardcoded no código
```

---

## 📊 Tabela Comparativa

| Aspecto | `/lp/[slug]` | `/salao-de-beleza` |
|---------|--------------|-------------------|
| **Escalabilidade** | ✅ Infinitas campanhas (1 código) | ❌ N campanhas = N arquivos |
| **Edição** | ✅ Banco (sem deploy) | ❌ Código (com deploy) |
| **Analytics** | ✅ Por campanha (slug) | ⚠️ Manual (UTMs) |
| **Multi-tenant** | ✅ RLS nativo | ❌ Precisa instâncias |
| **A/B Testing** | ✅ Variantes no banco | ❌ Duplicar página |
| **Performance** | ⚠️ Query banco (cache) | ✅ Estático (ISR) |
| **SEO** | ⚠️ Slug dinâmico | ✅ URL específica |
| **Complexidade** | ⚠️ Supabase + RLS | ✅ Simples |

---

## 🔍 Análise Profunda

### 1. Escalabilidade

**`/lp/[slug]`:**
```tsx
// 1 arquivo serve TODAS as campanhas
export default async function LandingPage({ params }) {
  const { slug } = await params;
  const campaign = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', slug)
    .single();
    
  return <LandingPageTemplate campaign={campaign} />;
}

// 10 campanhas = 0 arquivos novos
// 100 campanhas = 0 arquivos novos
```

**`/salao-de-beleza`:**
```tsx
// Campanha 1
// src/app/salao-de-beleza/page.tsx
export default function SalaoLP() {
  return <div>Salão content...</div>;
}

// Campanha 2
// src/app/academia-premium/page.tsx
export default function AcademiaLP() {
  return <div>Academia content...</div>;
}

// 10 campanhas = 10 arquivos duplicados
// 100 campanhas = 100 arquivos duplicados
```

**Vencedor:** `/lp/[slug]` (escala linear)

---

### 2. Edição de Conteúdo

**`/lp/[slug]`:**
```sql
-- Cliente pede mudança na headline
UPDATE campaigns 
SET hero_title = 'Nova Headline Matadora'
WHERE slug = 'salao-beleza-2024';

-- Tempo: 100ms
-- Deploy: Não precisa
-- Risco: Zero
```

**`/salao-de-beleza`:**
```tsx
// Cliente pede mudança
// 1. Abrir VS Code
// 2. Editar src/app/salao-de-beleza/page.tsx
// 3. git add, commit, push
// 4. Vercel deploy (3-5min)
// 5. Validar em produção

// Tempo: 5-10min
// Deploy: Obrigatório
// Risco: Quebrar outras páginas
```

**Vencedor:** `/lp/[slug]` (instantâneo)

---

### 3. Analytics Granular

**`/lp/[slug]`:**
```sql
-- Dashboard automático
SELECT 
  slug,
  name,
  total_views,
  total_leads,
  (total_leads::float / NULLIF(total_views, 0)) * 100 as conversion_rate
FROM campaigns
WHERE is_active = true
ORDER BY conversion_rate DESC;

-- Resultado:
slug                    | views | leads | conversion
------------------------|-------|-------|------------
salao-beleza-2024      | 1000  | 45    | 4.5%
academia-premium       | 500   | 30    | 6.0%  ⭐ Winner
dentista-implantes     | 800   | 20    | 2.5%
```

**`/salao-de-beleza`:**
```javascript
// Google Analytics
Pageviews:
/salao-de-beleza: 1000
/academia-premium: 500
/dentista-implantes: 800

// Conversões???
// Precisa configurar UTMs manualmente
// Precisa eventos customizados
// Precisa cruzar dados no GA4
```

**Vencedor:** `/lp/[slug]` (analytics built-in)

---

### 4. Multi-tenant (Agência/SaaS)

**`/lp/[slug]` com RLS:**
```sql
-- Cliente A (Salão)
CREATE POLICY "client_a_campaigns" ON campaigns
FOR SELECT USING (client_id = 'uuid-cliente-a');

-- Cliente B (Academia)
CREATE POLICY "client_b_campaigns" ON campaigns
FOR SELECT USING (client_id = 'uuid-cliente-b');

-- Mesmo banco, dados isolados
-- 1 instância Supabase para todos
-- Segurança nativa
```

**`/salao-de-beleza`:**
```
Opção 1: Instâncias separadas
- Cliente A: app-salao.vercel.app
- Cliente B: app-academia.vercel.app
- Custo: 2x
- Manutenção: 2x

Opção 2: Dados misturados
- Tudo no mesmo código
- Sem isolamento
- Risco de vazamento
```

**Vencedor:** `/lp/[slug]` (multi-tenant nativo)

---

### 5. A/B Testing

**`/lp/[slug]`:**
```sql
-- Criar variantes
INSERT INTO campaigns (slug, variant, hero_title) VALUES
  ('salao-beleza-2024', 'A', 'Transforme Seu Salão'),
  ('salao-beleza-2024', 'B', 'Agenda Sempre Cheia');

-- Backend escolhe randomicamente
const variant = Math.random() > 0.5 ? 'A' : 'B';
const campaign = await getCampaign(slug, variant);

// 1 URL, 2 versões
```

**`/salao-de-beleza`:**
```tsx
// Duplicar página inteira
src/app/salao-de-beleza-v1/page.tsx
src/app/salao-de-beleza-v2/page.tsx

// ou usar feature flags
// mas código duplicado mesmo assim
```

**Vencedor:** `/lp/[slug]` (variantes elegantes)

---

### 6. Performance

**`/salao-de-beleza`:**
```tsx
// Next.js ISR (Incremental Static Regeneration)
export const revalidate = 3600; // 1h cache

// Build time: Gera HTML estático
// Runtime: Serve HTML pronto
// Performance: 🚀 Excelente
```

**`/lp/[slug]`:**
```tsx
// Dynamic route (SSR ou cache)
export default async function Page({ params }) {
  // Query Supabase toda request (sem cache)
  const campaign = await getCampaign(params.slug);
  
  // Pode adicionar cache:
  export const revalidate = 300; // 5min
}

// Performance: ⚠️ Depende de cache
```

**Estratégia Híbrida:**
```tsx
// Gerar estáticos em build
export async function generateStaticParams() {
  const campaigns = await supabase
    .from('campaigns')
    .select('slug');
    
  return campaigns.map(c => ({ slug: c.slug }));
}

// Melhor dos dois mundos:
// - Dinâmico (banco)
// - Estático (build)
```

**Empate** (com generateStaticParams)

---

### 7. SEO

**`/salao-de-beleza`:**
```
URL: /salao-de-beleza
- Keyword-rich ✅
- Specific ✅
- Clean ✅
- Crawlable ✅
```

**`/lp/[slug]`:**
```
URL: /lp/salao-beleza-2024
- /lp prefix ⚠️ (não semântico)
- Slug pode ser otimizado ✅
- Year suffix ⚠️ (expira)
```

**Solução:**
```tsx
// Redirect
/salao-de-beleza → /lp/salao-beleza-2024

// Best of both worlds:
- SEO-friendly URL (canonical)
- Dynamic backend (flexibilidade)
```

**Empate** (com redirect)

---

## 🎯 Quando Usar Cada Arquitetura?

### Use `/lp/[slug]` quando:

✅ **Agência de tráfego**
- Múltiplos clientes
- Campanhas simultâneas
- Precisa editar rápido

✅ **SaaS de Landing Pages**
- Self-service
- Multi-tenant
- White-label

✅ **E-commerce com promoções**
- Black Friday LP
- Natal LP
- Dia das Mães LP
- Todas temporárias

✅ **Testes constantes**
- A/B testing frequente
- Otimização contínua
- Analytics detalhado

---

### Use `/salao-de-beleza` quando:

✅ **Site institucional**
- Conteúdo permanente
- Sem mudanças frequentes
- SEO específico

✅ **Landing Page única**
- 1 produto
- 1 cliente
- 1 campanha longa

✅ **Performance crítica**
- Milhões de acessos
- Latência zero
- CDN global

✅ **Simplicidade**
- Sem banco
- Sem backend
- Deploy simples

---

## 💡 Nossa Escolha: `/lp/[slug]`

### Por quê?

1. **Escalabilidade:** 23 salões ativos, mais virão
2. **Agilidade:** Cliente muda copy sem deploy
3. **Analytics:** Dashboard automático por campanha
4. **Multi-tenant:** Preparado para agência
5. **Flexibilidade:** A/B test sem duplicar código

### Trade-offs Aceitos:

⚠️ **Performance:** Resolvido com `revalidate` + cache  
⚠️ **SEO:** Resolvido com redirects  
⚠️ **Complexidade:** Vale a pena pela flexibilidade

---

## 📈 Exemplo Real

### Cenário: 30 dias de campanha

**Com `/lp/[slug]`:**
```
Dia 1: Criar campanha (INSERT no banco)
Dia 5: Mudar headline (UPDATE)
Dia 10: A/B test variante (INSERT variant)
Dia 15: Ajustar cores (UPDATE)
Dia 20: Trocar foto (UPDATE)
Dia 30: Analisar (SELECT analytics)

Deploys: 0
Tempo total: ~30min setup
```

**Com `/salao-de-beleza`:**
```
Dia 1: Criar página (código + deploy)
Dia 5: Mudar headline (código + deploy)
Dia 10: A/B test (duplicar página + deploy)
Dia 15: Ajustar cores (código + deploy)
Dia 20: Trocar foto (código + deploy)
Dia 30: Analisar (GA4 manual)

Deploys: 5
Tempo total: ~3h dev time
```

**ROI:** `/lp/[slug]` economiza 2.5h a cada campanha

---

## 🔒 RLS Explained (Bonus)

### O que é RLS?

**Row Level Security** = Firewall no banco de dados

```sql
-- Sem RLS (perigoso)
SELECT * FROM campaigns;
-- Retorna: TODAS campanhas de TODOS clientes

-- Com RLS (seguro)
CREATE POLICY "user_own_campaigns" ON campaigns
FOR SELECT USING (client_id = auth.uid());

SELECT * FROM campaigns;
-- Retorna: Só campanhas do usuário logado
```

### Por que importa?

**Multi-tenant seguro:**
```
Cliente A faz login → Vê só campanhas dele
Cliente B faz login → Vê só campanhas dele

Mesmo SELECT, resultados diferentes
Banco decide, não código
= Impossível vazar dados
```

**Vantagem:**
- Segurança no banco (não confia em código)
- 1 query serve todos
- Sem if/else no backend

---

## ✅ Conclusão

**`/lp/[slug]` é superior quando:**
- Múltiplas campanhas ✅
- Edições frequentes ✅
- Multi-tenant ✅
- Analytics granular ✅

**`/salao-de-beleza` é superior quando:**
- Campanha única permanente
- SEO ultra-crítico
- Performance extrema
- Simplicidade máxima

**Para agência de tráfego:** `/lp/[slug]` é a escolha certa. ✅

---

**TL;DR:**
`/lp/[slug]` = Netflix (1 player, ∞ filmes)  
`/salao-de-beleza` = DVD (1 arquivo, 1 filme)

Para escala: Netflix wins. 🎯
