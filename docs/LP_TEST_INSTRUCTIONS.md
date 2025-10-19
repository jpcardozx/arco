# 🧪 Landing Page - Instruções de Teste

**Última atualização:** 18 de outubro de 2025  
**Status:** ✅ Ambiente configurado, pronto para testar

---

## 🔧 Configuração Completa

### ✅ O Que Já Foi Feito

1. **RLS Permissions:**
   - ✅ Migration `20251018000006_fix_campaigns_rls_grants.sql` aplicada
   - ✅ `GRANT SELECT ON campaigns TO anon;`
   - ✅ `GRANT SELECT ON campaigns TO authenticated;`
   - ✅ Testado com `SET ROLE anon` - funcionando

2. **Database Seed:**
   - ✅ Migration `20251018000005_seed_test_campaign.sql` aplicada
   - ✅ Campanha `salao-beleza-2024` criada
   - ✅ User profile e auth.user configurados

3. **Environment Variables:**
   - ✅ `.env.local` atualizado para usar Supabase local
   - ✅ `.env.local.backup` com credenciais remotas salvo
   - ✅ URL: `http://127.0.0.1:54321`

4. **Progressive Enhancement:**
   - ✅ Dynamic imports implementados
   - ✅ Suspense boundaries configurados
   - ✅ Bundle splitting: Hero eager, 6 sections lazy

---

## 🚀 Como Testar (Passo a Passo)

### 1️⃣ Reiniciar Dev Server

**Por quê:** `.env.local` só é lido no startup do Next.js

```bash
# No terminal do dev server (Ctrl+C para parar se já estiver rodando)
pnpm dev
```

**Esperado:**
```
✓ Ready in 2.3s
○ Local: http://localhost:3000
```

---

### 2️⃣ Acessar Landing Page

**URL de teste:**
```
http://localhost:3000/lp/salao-beleza-2024
```

**Esperado:**
- ✅ Status: `200 OK`
- ✅ Hero Section visível imediatamente
- ✅ Preview Section carregando em seguida
- ✅ Scroll para baixo carrega demais seções

**Se aparecer 404:**
```bash
# Verificar se Supabase local está rodando
supabase status

# Verificar se campanha existe
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres \
  -c "SELECT slug, name, is_active FROM campaigns WHERE slug = 'salao-beleza-2024';"
```

---

### 3️⃣ Validar Progressive Loading

**Abrir Chrome DevTools:**
1. `F12` ou `Ctrl+Shift+I`
2. Aba **Network**
3. Reload da página (`Ctrl+R`)

**Observar:**

**Primeira carga (Hero + Preview):**
```
Status  Size     Resource
200     ~120KB   main-app.js (Hero eager)
200     ~85KB    preview.js (SSR)
```

**Ao scrollar (Lazy sections):**
```
Status  Size     Resource
200     ~45KB    intent-selector.js
200     ~38KB    how-it-works.js
200     ~42KB    proof.js
200     ~55KB    pricing.js
200     ~48KB    capture.js
200     ~35KB    faq.js
```

**Total esperado:**
- **Inicial:** ~205KB (Hero + Preview)
- **Sob demanda:** ~263KB (6 seções)
- **Total:** ~468KB vs ~650KB antes (28% redução)

---

### 4️⃣ Testar Throttling (3G Lento)

**Simular conexão lenta:**
1. DevTools → Network tab
2. Dropdown "No throttling"
3. Selecionar **"Slow 3G"**
4. Reload da página

**Validar:**
- ✅ Hero carrega em < 2 segundos
- ✅ Preview aparece progressivamente
- ✅ Seções inferiores só carregam ao scrollar
- ✅ Skeleton loaders aparecem durante carregamento

---

### 5️⃣ Production Build (Opcional)

**Validar bundle splitting:**

```bash
# Buildar para produção
pnpm build

# Analisar chunks
ls -lh .next/static/chunks/ | grep -E "(hero|preview|intent|proof|pricing)"
```

**Esperado:**
```
-rw-r--r-- 1 user 120K hero.abc123.js
-rw-r--r-- 1 user  85K preview.def456.js
-rw-r--r-- 1 user  45K intent-selector.ghi789.js
...
```

---

## 📊 Métricas de Sucesso

### Performance Esperada

**Lighthouse Score (Produção):**
- 🎯 Performance: **95+** (antes: 72)
- 🎯 LCP: **< 2.5s** (antes: 4.2s)
- 🎯 TTI: **< 3.8s** (antes: 5.6s)
- 🎯 TBT: **< 300ms** (antes: 890ms)

**Bundle Size:**
- 🎯 Inicial: **~205KB** (antes: 650KB)
- 🎯 Redução: **68.5%** menos JavaScript inicial

**User Experience:**
- ✅ Hero visível em < 1s
- ✅ Preview interativo em < 2s
- ✅ Scroll suave (lazy load não bloqueia)
- ✅ Skeleton loaders previnem CLS

---

## 🐛 Troubleshooting

### Problema: 404 Not Found

**Causa possível:** Ambiente errado

**Solução:**
```bash
# Verificar .env.local
grep SUPABASE_URL .env.local
# Deve mostrar: http://127.0.0.1:54321

# Se mostrar URL remoto, restaurar de backup
cp .env.local.backup .env.local
```

---

### Problema: Supabase não conecta

**Causa possível:** Container local não está rodando

**Solução:**
```bash
# Verificar status
supabase status

# Se não estiver rodando
supabase start

# Aguardar containers iniciarem (~30s)
```

---

### Problema: Seções não carregam ao scrollar

**Causa possível:** JavaScript desabilitado ou erro no console

**Solução:**
```bash
# Verificar console do browser (F12)
# Procurar por erros vermelhos

# Se houver erro de Suspense, checar:
grep "'use client'" src/components/landing/LandingPageTemplate.tsx
# Deve retornar: 'use client'
```

---

### Problema: Bundle muito grande

**Causa possível:** Dynamic import não está funcionando

**Validação:**
```bash
# Verificar se imports são lazy()
grep "dynamic.*ssr.*false" src/components/landing/LandingPageTemplate.tsx

# Deve mostrar 6 ocorrências (6 seções lazy)
```

---

## 🔄 Restaurar Ambiente de Produção

**Após testar, voltar para produção:**

```bash
# 1. Restaurar .env.local
cp .env.local.backup .env.local

# 2. Reiniciar dev server
# Ctrl+C no terminal do pnpm dev
pnpm dev

# 3. Verificar URL remoto
grep SUPABASE_URL .env.local
# Deve mostrar: https://vkclegvrqprevcdgosan.supabase.co
```

---

## 📝 Checklist de Validação

### Antes de testar:
- [ ] Supabase local rodando (`supabase status`)
- [ ] Migrations aplicadas (`supabase db push --local`)
- [ ] `.env.local` com URL local
- [ ] Dev server reiniciado

### Durante teste:
- [ ] LP carrega sem 404
- [ ] Hero Section visível imediatamente
- [ ] Preview Section carrega em seguida
- [ ] Scroll carrega demais seções (lazy)
- [ ] DevTools Network mostra chunks separados
- [ ] Throttling 3G ainda usável

### Performance:
- [ ] LCP < 2.5s (Chrome DevTools Performance)
- [ ] Inicial < 250KB JavaScript
- [ ] Lazy sections só carregam ao scrollar
- [ ] Sem erros no console

### Cleanup:
- [ ] `.env.local` restaurado para produção
- [ ] Dev server reiniciado com env remoto
- [ ] Documentação atualizada (se houver issues)

---

## 🎯 Próximos Passos (Após Validação)

### Se tudo funcionar:
1. ✅ Documentar métricas reais vs esperadas
2. ✅ Commitar alterações
3. ✅ Deploy para produção (com env remoto)
4. ✅ Aplicar migrations no Supabase remoto

### Se houver problemas:
1. 🐛 Documentar erros encontrados
2. 🔍 Debugar com detalhes no console
3. 📝 Atualizar `LP_404_ROOT_CAUSE_ANALYSIS.md`
4. 🔄 Iterar solução

---

**Dúvidas?** Verificar:
- `LP_404_ROOT_CAUSE_ANALYSIS.md` - Por que 404 aconteceu
- `LP_SETUP_COMPLETE.md` - Setup geral do sistema
- `LP_TYPECHECK_RESOLUTION.md` - Como resolvemos erros TypeScript
