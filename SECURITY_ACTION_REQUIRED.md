# 🚨 AÇÃO IMEDIATA NECESSÁRIA - Tokens Expostos

**Data**: 21 de outubro de 2025  
**Severidade**: 🔴 CRÍTICA  
**Status**: Tokens sanitizados no código, MAS tokens antigos ainda são válidos

---

## ⚠️ O QUE ACONTECEU

No commit `a7b4ca0`, os seguintes tokens foram **expostos publicamente** no GitHub:

### 1. **Meta Access Token** (CRÍTICO)
```
Token: EAALqEBN5Xe8...AZDZD
Arquivo: docs/DEPLOY_SUCCESS.md
Risco: CRÍTICO - Acesso total ao Meta Dataset 1574079363975678
```

### 2. **Supabase Anon Key** (MÉDIO)
```
Token: eyJhbGciOiJI...SdwA
Arquivos: docs/META_TOKEN_FIX.md, STATUS_ATUAL.md
Risco: MÉDIO - Limitado por RLS, mas pode chamar Edge Functions
```

---

## 🔥 AÇÕES IMEDIATAS (FAÇA AGORA)

### **Passo 1: Revogar Meta Token (5 min) - CRÍTICO**

1. **Abrir Meta Events Manager**
   ```
   https://business.facebook.com/events_manager2/list/dataset/1574079363975678
   ```

2. **Revogar o token antigo**
   - Settings → API Access
   - Localizar token ativo
   - Clicar "Revoke"

3. **Gerar novo token**
   - Settings → API Token
   - "Generate New Token"
   - Copiar o novo token

4. **Atualizar .env.local**
   ```bash
   nano .env.local
   # Substituir META_CONVERSION_API_TOKEN pelo novo token
   ```

5. **Re-configurar no Supabase**
   ```bash
   source .env.local
   supabase secrets set META_CONVERSION_API_TOKEN="$META_CONVERSION_API_TOKEN" \
     --project-ref vkclegvrqprevcdgosan
   ```

6. **Validar novo token**
   ```bash
   curl -X GET "https://graph.facebook.com/v21.0/1574079363975678?fields=name" \
     -H "Authorization: Bearer SEU_NOVO_TOKEN"
   
   # Deve retornar: {"id":"1574079363975678","name":"..."}
   ```

---

### **Passo 2: Rotacionar Supabase Keys (10 min) - OPCIONAL**

**Nota**: Supabase Anon Key é pública por design (aparece no frontend), mas rotacionar é boa prática de segurança.

1. **Abrir Supabase Dashboard**
   ```
   https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/settings/api
   ```

2. **Reset Project API Keys**
   - Settings → API
   - "Reset Project API Keys"
   - Confirmar ação

3. **Copiar novas keys**
   - Anon Key (public)
   - Service Role Key (private)

4. **Atualizar todos os arquivos .env**
   ```bash
   # .env.local
   NEXT_PUBLIC_SUPABASE_ANON_KEY="nova_anon_key"
   SUPABASE_SERVICE_ROLE_KEY="nova_service_role_key"
   
   # .env.production
   NEXT_PUBLIC_SUPABASE_ANON_KEY="nova_anon_key"
   SUPABASE_SERVICE_ROLE_KEY="nova_service_role_key"
   ```

5. **Re-deploy aplicação**
   ```bash
   # Se estiver em produção
   vercel --prod
   # ou
   git push  # Se auto-deploy está configurado
   ```

---

## ✅ CORREÇÕES JÁ APLICADAS

- ✅ Tokens sanitizados nos arquivos de documentação
- ✅ Commit de segurança criado (`d6269d2`)
- ✅ Push feito para GitHub
- ✅ Placeholders substituindo tokens reais

---

## 📋 CHECKLIST DE SEGURANÇA

- [ ] Meta Access Token revogado
- [ ] Novo Meta token gerado
- [ ] Novo token validado (curl test)
- [ ] .env.local atualizado
- [ ] Supabase secrets atualizados
- [ ] Edge Function testada com novo token
- [ ] (Opcional) Supabase keys rotacionadas
- [ ] (Opcional) Aplicação re-deployada

---

## 🎯 POR QUE ISSO IMPORTA

### **Meta Access Token**
Com este token, alguém pode:
- ✅ Enviar eventos falsos para seu dataset
- ✅ Consumir seu budget de ads indiretamente
- ✅ Poluir seus dados de conversão
- ✅ Impactar negativamente seu CAC/CPC

### **Supabase Anon Key**
Com esta key, alguém pode:
- ⚠️ Chamar suas Edge Functions (se públicas)
- ⚠️ Ler dados públicos (limitado por RLS)
- ❌ NÃO pode acessar dados privados (RLS protege)
- ❌ NÃO pode fazer admin operations (precisa service_role)

---

## 🔒 PREVENÇÃO FUTURA

### **1. Adicionar .gitignore para docs sensíveis**

```bash
# Adicionar ao .gitignore
echo "docs/*_SECURE.md" >> .gitignore
echo "docs/tokens/*.md" >> .gitignore
```

### **2. Usar variáveis de ambiente em docs**

Em vez de:
```bash
curl -H "Authorization: Bearer EAALqEBN5Xe8..."
```

Use:
```bash
curl -H "Authorization: Bearer $META_CONVERSION_API_TOKEN"
```

### **3. Verificar antes de commitar**

```bash
# Script para detectar tokens antes do commit
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

# Buscar tokens Meta
if git diff --cached | grep -E "EAA[A-Za-z0-9_-]{100,}"; then
  echo "❌ ERRO: Meta Access Token detectado!"
  echo "Remova o token antes de commitar."
  exit 1
fi

# Buscar tokens JWT longos (Supabase)
if git diff --cached | grep -E "eyJ[A-Za-z0-9_-]{100,}"; then
  echo "⚠️  AVISO: Token JWT detectado!"
  echo "Verifique se é um token sensível."
  exit 1
fi

exit 0
EOF

chmod +x .git/hooks/pre-commit
```

---

## 🆘 SUPORTE

Se não conseguir revogar o token ou tiver dúvidas:

1. **Meta Support**: https://business.facebook.com/help
2. **Supabase Support**: https://supabase.com/dashboard/support
3. **Documentação**: Ver `docs/META_TOKEN_FIX.md`

---

## 📊 TIMELINE

| Hora | Ação | Status |
|------|------|--------|
| 15:30 | Tokens expostos no commit `a7b4ca0` | ❌ Exposto |
| 16:45 | Detecção da exposição | ✅ Detectado |
| 16:50 | Sanitização dos arquivos | ✅ Corrigido |
| 16:52 | Push do fix para GitHub | ✅ Publicado |
| **AGORA** | **Revogar tokens antigos** | ⏳ **PENDENTE** |

---

**AÇÃO CRÍTICA**: Revogue o Meta Access Token AGORA (5 minutos)

**Risco atual**: ALTO - Token válido por tempo indeterminado até ser revogado

**Próximo passo**: Abrir Meta Events Manager e revogar token
