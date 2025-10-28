# Resend DNS Configuration - consultingarco.com

**Status:** ⚠️ Pending DNS Configuration  
**Domain ID:** 31c2405e-e938-4d50-b5fd-4d8e388ef557  
**Region:** us-east-1  
**DNS Provider:** ✅ **Vercel DNS** (ns1.vercel-dns.com, ns2.vercel-dns.com)

## 🚀 Quick Start - Adicionar no Vercel Dashboard

1. Acesse: https://vercel.com/dashboard
2. Vá em: **Domains** → **consultingarco.com** → **DNS Records**
3. Clique em **Add Record** e adicione os 3 registros abaixo

## Required DNS Records

Para verificar o domínio `consultingarco.com` e permitir envio de emails, adicione os seguintes registros DNS:

### 1. DKIM Record (Authentication)
```
Type: TXT
Name: resend._domainkey.consultingarco.com
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDVC0pRcXT/rmowNcMa1IFw4d8oDYIgU2RNjwtWS2iPQUY41Jtda6N+UXa3B6DjCbRziPiFHP4gyQM0uXCeFbgtbnMfv3a35TFOLNe4JMup080luphIF44him3zfNKxcLpGel9DBx0mnq36OGj0VGR4J3SuwOr34/HuyPj5shz+GQIDAQAB
TTL: Auto
```

### 2. SPF MX Record
```
Type: MX
Name: send.consultingarco.com
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10
TTL: 60
```

### 3. SPF TXT Record
```
Type: TXT
Name: send.consultingarco.com
Value: v=spf1 include:amazonses.com ~all
TTL: 60
```

## ⏱️ Tempo de Propagação

- **Vercel DNS:** 5-30 minutos (muito rápido!)
- **Verificação automática:** Resend verifica a cada 10 minutos

## ✅ Verificar Status

### Opção 1: Resend Dashboard
https://resend.com/domains/31c2405e-e938-4d50-b5fd-4d8e388ef557

### Opção 2: Via API
```bash
curl -X GET 'https://api.resend.com/domains/31c2405e-e938-4d50-b5fd-4d8e388ef557' \
  -H "Authorization: Bearer $RESEND_API_KEY" | jq '.status'
```

### Opção 3: Verificar DNS diretamente
```bash
# DKIM
dig resend._domainkey.consultingarco.com TXT +short

# SPF MX
dig send.consultingarco.com MX +short

# SPF TXT
dig send.consultingarco.com TXT +short
```

## 📬 Emails de Teste

### Antes da Verificação (Modo de Teste)
- **From:** `onboarding@resend.dev`
- **To:** `delivered@resend.dev` (email especial de teste)
- **Status:** ✅ Funcionando (emails enviados com sucesso!)

### Após Verificação (Produção)
- **From:** `arco@consultingarco.com`, `contato@consultingarco.com`, etc.
- **To:** Qualquer destinatário (incluindo `jpcardozo@imobiliariaipe.com.br`)
- **Status:** ⏳ Aguardando DNS

## 🎯 Próximos Passos

1. ✅ Domínio adicionado no Resend
2. ✅ Emails de teste enviados (delivered@resend.dev)
3. ⏳ **VOCÊ:** Adicionar 3 registros DNS no Vercel (5 minutos)
4. ⏳ Aguardar propagação (5-30 min)
5. ⏳ Resend verifica automaticamente
6. ✅ Enviar emails reais para seu email!
