# 🔴 Meta Token - Missing Permission

**Problema**: Token não tem permissão para acessar o dataset 1574079363975678

**Erro**: `(#100) Missing Permission`

---

## 🔧 Como Gerar Token Correto

### **Opção 1: Dataset Quality API Token (Recomendado)**

1. **Abrir Meta Events Manager**
   - URL: https://business.facebook.com/events_manager2/list/dataset/1574079363975678
   
2. **Ir em "Settings" → "API Token"**
   - Clicar em "Generate Token"
   - Copiar o token gerado
   - **NÃO é o System User Token!**

3. **Atualizar .env.local**
   ```env
   META_CONVERSION_API_TOKEN="NOVO_TOKEN_AQUI"
   ```

4. **Re-configurar secrets**
   ```bash
   source .env.local
   supabase secrets set META_CONVERSION_API_TOKEN="$META_CONVERSION_API_TOKEN" --project-ref vkclegvrqprevcdgosan
   ```

---

### **Opção 2: System User Token (Alternativa)**

Se não conseguir gerar Dataset Quality Token, use System User Token:

1. **Criar System User**
   - Business Settings → Users → System Users
   - Criar novo System User
   
2. **Adicionar Assets**
   - Adicionar Dataset (1574079363975678)
   - Permissões: "Manage" ou "Advertise"
   
3. **Gerar Token**
   - Generate New Token
   - Selecionar permissões:
     - `ads_management`
     - `business_management`
   - Copiar token

4. **Atualizar .env.local**
   ```env
   META_CONVERSION_API_TOKEN="NOVO_TOKEN_AQUI"
   ```

5. **Re-configurar secrets**
   ```bash
   source .env.local
   supabase secrets set META_CONVERSION_API_TOKEN="$META_CONVERSION_API_TOKEN" --project-ref vkclegvrqprevcdgosan
   ```

---

## ✅ Validar Token

Após gerar novo token, teste:

```bash
# Substituir YOUR_NEW_TOKEN pelo token real
curl -X GET "https://graph.facebook.com/v21.0/1574079363975678?fields=name,description" \
  -H "Authorization: Bearer YOUR_NEW_TOKEN"

# Resposta esperada:
# {"id":"1574079363975678","name":"Nome do Dataset"}
```

Se retornar erro 100 (Missing Permission), significa que o token **não está associado ao dataset** ou **não tem permissões**.

---

## 🎯 Próximos Passos

1. **Gerar novo token** (Opção 1 ou 2 acima)
2. **Validar token** (curl acima)
3. **Atualizar secrets no Supabase**
4. **Testar novamente**:
   ```bash
   curl -X POST 'https://vkclegvrqprevcdgosan.supabase.co/functions/v1/meta-conversions-webhook' \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer YOUR_SUPABASE_ANON_KEY_HERE' \
     -d '{
       "event_name": "Lead",
       "user_data": {
         "email": "test@example.com",
         "phone": "+5511999999999"
       },
       "custom_data": {
         "value": 50.00,
         "currency": "BRL"
       },
       "test_event_code": "TEST12345"
     }'
   ```

---

## 📸 Prints para Ajudar

### **Dataset Quality API Token (Recomendado)**

```
Meta Events Manager
  → Dataset (1574079363975678)
  → Settings (ícone engrenagem)
  → API Token
  → Generate Token
  → [Copiar token gerado]
```

### **System User Token (Alternativa)**

```
Business Settings
  → Users → System Users
  → Add
  → Nome: "ARCO Meta CAPI"
  → Add Assets → Dataset
  → Selecionar dataset 1574079363975678
  → Permissões: Manage
  → Generate New Token
  → Selecionar:
    ✅ ads_management
    ✅ business_management
  → Generate Token
  → [Copiar token]
```

---

## ⚠️ Importante

- **NÃO compartilhe o token** (é como senha)
- Token expira em **60 dias** (System User) ou **nunca expira** (Dataset Quality)
- Se erro persistir, verificar se **conta tem acesso ao dataset** no Business Manager

---

**Status Atual**: Edge Function deployada ✅, mas token sem permissão ❌

**Próximo passo**: Gerar novo token com permissões corretas
