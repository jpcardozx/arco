# TIER 1 - QUICK START GUIDE

## 🚀 Passo a Passo para Produção (30 min)

### 1. Dependências Python (5 min)

```bash
# Criar virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Testar script Python
python scripts/domain_validator.py google.com
```

**Vercel:** Adicione `requirements.txt` na raiz (Vercel auto-detecta)

---

### 2. Variáveis de Ambiente (5 min)

```bash
# .env.local (desenvolvimento)
RESEND_API_KEY=re_FfQAjozL_6GzKoCpiANzqmv5TxFRhg2ou
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://vkclegvrqprevcdgosan.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Vercel Dashboard → Settings → Environment Variables
# Adicionar todas as variáveis acima
```

---

### 3. Migration Database (5 min)

**Opção A - Supabase CLI:**
```bash
npx supabase db push
```

**Opção B - Supabase Dashboard:**
1. Acesse: https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/sql/new
2. Cole o conteúdo de: `supabase/migrations/20250108000000_add_domain_validations.sql`
3. Click "Run"

**Verificar:**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_name = 'domain_validations';
```

---

### 4. Testar Localmente (10 min)

```bash
# Terminal 1: Start dev server
pnpm dev

# Terminal 2: Run integration tests
bash scripts/test-tier1-integration.sh
```

**Verificações:**
- [ ] Python validator retorna JSON real
- [ ] API `/api/domain/validate` retorna dados reais (não mock)
- [ ] Cache funciona (segunda request mais rápida)
- [ ] API `/api/lead-magnet` salva no banco
- [ ] Email chega na caixa de entrada
- [ ] Rate limiting funciona (11ª request = 429)

---

### 5. Deploy Produção (5 min)

```bash
# Commit changes
git add .
git commit -m "feat: TIER 1 complete - real integrations, no mocks"
git push origin main

# Vercel auto-deploy
# Ou manual: vercel --prod
```

**Checklist Pós-Deploy:**
- [ ] Verificar env vars no Vercel
- [ ] Testar domain validator em produção
- [ ] Testar lead magnet em produção
- [ ] Verificar email delivery
- [ ] Verificar logs no Vercel

---

## ✅ Sucesso!

Você agora tem:
- ✅ Domain Analyzer com dados REAIS (DNS, WHOIS, SSL)
- ✅ Lead Magnet com email delivery REAL (Resend)
- ✅ Cache inteligente (1 hora TTL)
- ✅ Rate limiting ativo
- ✅ Zero mocks no sistema

---

## 🐛 Troubleshooting

### Python script não funciona

```bash
# Verificar Python instalado
python3 --version

# Reinstalar dependências
pip install --force-reinstall -r requirements.txt

# Testar manualmente
python3 scripts/domain_validator.py example.com
```

### Email não chega

1. Verificar Resend API key no Vercel
2. Verificar domínio verificado no Resend
3. Checar logs: `Vercel → Deployment → Logs`
4. Testar endpoint direto:
   ```bash
   curl -X POST https://seu-dominio.com/api/lead-magnet \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","company":"Test"}'
   ```

### Cache não funciona

1. Verificar migration aplicada:
   ```sql
   SELECT * FROM domain_validations LIMIT 1;
   ```
2. Verificar SERVICE_ROLE_KEY nas env vars
3. Checar logs da API

### Rate limiting muito agressivo

Ajustar em `src/app/api/domain/validate/route.ts`:
```typescript
if (limit.count >= 10) { // Mudar para 20 ou 50
```

---

## 📞 Suporte

- Documentação completa: `TIER1_IMPLEMENTATION_COMPLETE.md`
- System status: `SYSTEM_READINESS_REPORT.md`
- Relatório técnico: Todos os arquivos markdown na raiz
