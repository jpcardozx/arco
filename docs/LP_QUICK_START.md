# Landing Page - Quick Start Guide

## ⚠️ Pré-requisitos

Antes de testar a landing page, você precisa:

1. **Rodar migrations do Supabase:**
```bash
# Se usando Supabase local
supabase db reset

# Ou aplicar migrations manualmente
supabase db push

# Regenerar types TypeScript
supabase gen types typescript --local > src/types/supabase.ts
```

2. **Verificar variáveis de ambiente:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
RESEND_API_KEY=re_xxx...
```

---

## 🚀 Testando a Landing Page

### 1. Criar campanha de teste

```sql
-- No Supabase SQL Editor
INSERT INTO campaigns (
  id,
  slug,
  name,
  hero_title,
  hero_subtitle,
  hero_description,
  meta_title,
  meta_description,
  is_active,
  client_id,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'studio-bia-test',
  'Studio Bia Manicure',
  'Sua Agenda 100% Cheia em 30 Dias',
  'Sistema completo de agendamento + marketing digital que atrai clientes novos todos os dias',
  'Transforme seu salão de beleza com tecnologia',
  'Studio Bia - Agenda Cheia | ARCO',
  'Sistema completo de agendamento e marketing digital para salões de beleza',
  true,
  (SELECT id FROM clients LIMIT 1), -- Usar client existente
  NOW(),
  NOW()
);
```

### 2. Acessar landing page

```
http://localhost:3000/lp/studio-bia-test
```

### 3. Testar interações

- ✅ Scroll através das seções (verificar animations Framer Motion)
- ✅ Three.js background no Hero (particles + geometry)
- ✅ Input no Preview Section → "Gerar" (loading 2s)
- ✅ Click nos chips de Intenção (estados visuais)
- ✅ Hover nos Pricing cards (scale transform)
- ✅ Expand FAQ accordion items
- ✅ Preencher formulário de captura
- ✅ Submit form → redirect para `/lp/studio-bia-test/success`

### 4. Verificar dados salvos

```sql
-- Verificar lead criado
SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;

-- Verificar contador da campanha
SELECT slug, total_leads FROM campaigns WHERE slug = 'studio-bia-test';
```

### 5. Verificar emails

- Inbox do lead (confirmation email)
- contato@consultingarco.com (internal notification)

---

## 🐛 Troubleshooting

### Erro: "column 'meta_title' does not exist"

**Causa:** Migrations não foram aplicadas.

**Solução:**
```bash
# Resetar database local
supabase db reset

# Ou aplicar manualmente
cd supabase/migrations
# Execute 20251018000002_create_campaigns_table.sql no SQL Editor
```

### Erro: TypeScript "Property 'hero_title' does not exist"

**Causa:** Types do Supabase desatualizados.

**Solução:**
```bash
# Regenerar types
supabase gen types typescript --local > src/types/supabase.ts

# Ou para projeto remoto
supabase gen types typescript --project-id xxx > src/types/supabase.ts

# Reiniciar TypeScript server no VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Erro: "Cannot find module './sections/HeroSection'"

**Causa:** Cache do TypeScript ou build anterior.

**Solução:**
```bash
# Limpar cache Next.js
rm -rf .next

# Reinstalar dependências
pnpm install

# Rebuild
pnpm dev
```

### Three.js não carrega

**Causa:** Dynamic import falhando ou dependências faltando.

**Solução:**
```bash
# Verificar instalação
pnpm list @react-three/fiber @react-three/drei

# Reinstalar se necessário
pnpm add @react-three/fiber@9.3.0 @react-three/drei@10.7.6
```

### Email não chega

**Causa:** RESEND_API_KEY inválida ou não configurada.

**Solução:**
```bash
# Verificar logs do servidor
# Procurar por "[Lead Capture] Failed to send email"

# Testar Resend manualmente
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "ARCO <arco@consultingarco.com>",
    "to": ["seu-email@example.com"],
    "subject": "Test",
    "html": "<p>Test email</p>"
  }'
```

---

## 📝 Checklist de Validação

### Funcionalidade
- [ ] Landing page carrega sem erros
- [ ] Three.js particles visíveis no Hero
- [ ] PhoneMockup3D rotaciona com mouse
- [ ] Section animations triggeram no scroll
- [ ] Intent selector chips mudam de estado
- [ ] Pricing cards têm hover effect
- [ ] FAQ accordion expande/colapsa
- [ ] Form validation funciona
- [ ] Submit cria lead no Supabase
- [ ] Redirect para success page funciona
- [ ] Email de confirmação chega
- [ ] Email de notificação interna chega

### Performance
- [ ] LCP < 2.5s (lighthouse)
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] No console errors
- [ ] Three.js não causa jank
- [ ] Animations 60fps desktop

### Responsividade
- [ ] Mobile (375px - iPhone SE)
- [ ] Tablet (768px - iPad)
- [ ] Desktop (1440px)
- [ ] Touch interactions funcionam
- [ ] Text legível em todas telas
- [ ] CTAs acessíveis

### SEO
- [ ] Meta tags presentes
- [ ] OG image definido
- [ ] Title descriptivo
- [ ] Description < 160 chars
- [ ] Canonical URL correto
- [ ] No broken links

### Accessibility
- [ ] ARIA labels corretos
- [ ] Keyboard navigation funciona
- [ ] Focus states visíveis
- [ ] Color contrast >= 4.5:1
- [ ] Reduced motion respeitado
- [ ] Screen reader friendly

---

## 🎯 Próximos Passos

### Immediate (Hoje)
1. ✅ Rodar migrations
2. ✅ Criar campanha de teste
3. ✅ Testar fluxo completo
4. ✅ Validar emails
5. ✅ Fix TypeScript errors

### Short-term (Esta semana)
1. Deploy para staging
2. Testar em dispositivos reais
3. Lighthouse audit
4. Fix accessibility issues
5. Add GA4 tracking

### Long-term (Próximo mês)
1. A/B testing framework
2. Analytics dashboard
3. CRM webhooks
4. Lead scoring
5. WhatsApp Business API

---

## 📚 Documentação Relacionada

- **LP_THREEJS_DESIGN_SPEC.md** - Especificação técnica completa
- **LP_IMPLEMENTATION_COMPLETE.md** - Relatório de implementação
- **BACKEND_ARCHITECTURE_COMPLETE_2025.md** - Schemas Supabase

---

## 🆘 Suporte

Se encontrar problemas:

1. Verificar logs do servidor (`pnpm dev`)
2. Verificar Supabase logs (Dashboard → Logs)
3. Verificar Resend logs (resend.com/logs)
4. Criar issue com:
   - Erro exato
   - Steps to reproduce
   - Screenshots/logs
   - Environment (OS, Node version, etc)

**Contato:** João Paulo Cardoso (@jpcardozx)
