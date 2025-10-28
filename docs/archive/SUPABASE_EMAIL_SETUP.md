# 📧 Supabase Email Setup com Resend

## ⚠️ IMPORTANTE: Configuração Production

Este documento explica como configurar emails transacionais via Resend no **Supabase Production** (dashboard).

---

## 🎯 1. Acesse o Supabase Dashboard

1. Vá para: https://supabase.com/dashboard
2. Selecione seu projeto: `vkclegvrqprevcdgosan`
3. Navegue para: **Authentication → Email Templates**

---

## 📨 2. Configure SMTP Resend

### **2.1 Settings → SMTP**

No dashboard Supabase:

1. **Authentication** → **Settings** → **SMTP Settings**
2. **Enable Custom SMTP**: ✅ ON
3. Preencha:

```yaml
SMTP Host: smtp.resend.com
SMTP Port: 587
SMTP Username: resend
SMTP Password: re_XXXXXXXXXXXXXXXXXXXXXXXX
Sender Email: arco@consultingarco.com
Sender Name: ARCO Consulting
```

4. **Save** e **Test Connection**

---

## 🎨 3. Customizar Email Templates

### **3.1 Confirmation Email (Signup)**

**Path:** Authentication → Email Templates → Confirm signup

**Subject:**
```
Confirme seu email - ARCO Consulting
```

**HTML Template:**
```html
<!-- Use o template em src/lib/email/templates/confirmation.tsx -->
<!-- Copie o HTML gerado pela função ConfirmationEmailHTML() -->
```

**Variables disponíveis:**
- `{{ .ConfirmationURL }}` - Link de confirmação
- `{{ .Email }}` - Email do usuário
- `{{ .SiteURL }}` - URL do site
- `{{ .TokenHash }}` - Token de confirmação

### **3.2 Password Reset Email**

**Subject:**
```
Redefinição de senha - ARCO Consulting
```

### **3.3 Email Change Confirmation**

**Subject:**
```
Confirme a mudança de email - ARCO Consulting
```

---

## ✅ 4. Habilitar Email Confirmation

**Path:** Authentication → Settings → Email Auth

- ✅ **Enable email confirmations**: ON
- ✅ **Enable email change confirmations**: ON
- ✅ **Secure email change**: ON

---

## 🔐 5. Configurar Redirect URLs

**Path:** Authentication → URL Configuration

**Site URL:**
```
https://arco.consultingarco.com
```

**Redirect URLs (whitelist):**
```
https://arco.consultingarco.com/auth/callback
https://arco.consultingarco.com/dashboard
http://localhost:3000/auth/callback
http://127.0.0.1:3000/auth/callback
```

---

## 🧪 6. Testar Configuração

### **Teste Local (Development):**

```bash
# 1. Start Supabase local
npx supabase start

# 2. Emails locais vão para Inbucket (Mailpit)
open http://127.0.0.1:54324

# 3. Criar conta de teste
# Signup → Check Inbucket → Clicar link confirmação
```

### **Teste Production:**

```bash
# 1. Deploy para production
git push

# 2. Criar conta com email real
# 3. Verificar inbox do Resend Dashboard
https://resend.com/emails

# 4. Confirmar email recebido
```

---

## 📊 7. Monitoramento

### **Resend Dashboard:**
- Emails enviados: https://resend.com/emails
- Logs de erro: https://resend.com/logs
- Analytics: https://resend.com/analytics

### **Supabase Dashboard:**
- Auth logs: Authentication → Logs
- SMTP status: Authentication → Settings → SMTP

---

## 🚨 8. Troubleshooting

### **Emails não estão sendo enviados:**

1. **Verificar SMTP:**
   ```bash
   # No dashboard Supabase:
   Authentication → Settings → SMTP → Test Connection
   ```

2. **Verificar Resend API Key:**
   ```bash
   # Testar via cURL:
   curl -X POST https://api.resend.com/emails \
     -H "Authorization: Bearer re_XXXXXXXXXXXXXXXXXXXXXXXX" \
     -H "Content-Type: application/json" \
     -d '{
       "from": "arco@consultingarco.com",
       "to": "seu-email@example.com",
       "subject": "Test",
       "html": "<h1>Test</h1>"
     }'
   ```

3. **Verificar DNS:**
   - SPF: ✅ `v=spf1 include:_spf.resend.com ~all`
   - DKIM: ✅ Configurado no Resend
   - DMARC: ✅ `v=DMARC1; p=none;`

### **Emails indo para SPAM:**

1. **Aquecer domínio (Domain Warm-up):**
   - Primeiros dias: 10-20 emails/dia
   - Depois de 1 semana: 100+ emails/dia
   - Evitar bursts repentinos

2. **Verificar reputação:**
   - https://www.mail-tester.com
   - https://mxtoolbox.com/blacklists.aspx

3. **Melhorar conteúdo:**
   - Evitar palavras spam: "free", "click here", "urgent"
   - Ratio texto/HTML balanceado
   - Link de unsubscribe visível

---

## 📝 9. Checklist de Implementação

- [x] Validação de emails temporários (local)
- [x] Callback handler (`/auth/callback`)
- [x] Template HTML profissional
- [x] Email confirmation habilitado (config.toml)
- [ ] SMTP Resend configurado (production dashboard)
- [ ] Templates customizados (production dashboard)
- [ ] Redirect URLs configuradas (production dashboard)
- [ ] DNS records verificados
- [ ] Teste end-to-end (signup → email → confirmação)

---

## 🔗 10. Links Úteis

- **Supabase Auth Docs:** https://supabase.com/docs/guides/auth
- **Resend Docs:** https://resend.com/docs
- **SMTP Setup:** https://resend.com/docs/send-with-smtp
- **Email Templates:** https://supabase.com/docs/guides/auth/auth-email-templates

---

## 📞 Suporte

**Problemas com Resend:**
- Email: support@resend.com
- Discord: https://discord.gg/resend

**Problemas com Supabase:**
- Discord: https://discord.supabase.com
- GitHub Issues: https://github.com/supabase/supabase/issues

---

**Última atualização:** 2025-10-05
**Responsável:** Development Team
