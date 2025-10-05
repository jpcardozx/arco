# 🔐 ARCO - Guia Completo de Setup Admin

## 📋 O Que Você Precisa Fazer

### 1️⃣ Adicionar Service Role Key ao `.env.local`

```bash
# Abra o arquivo .env.local e adicione:
SUPABASE_SERVICE_ROLE_KEY=eyJ...sua-service-role-key-aqui...
```

**Onde encontrar:**
1. Acesse: https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/settings/api
2. Copie a chave **`service_role`** (não é a `anon` key)
3. Cole no `.env.local`

---

## 🚀 Executar Script Automatizado

### Opção A: Via REST API (Recomendado)

```bash
./scripts/create-admin-user.sh
```

O script vai:
- ✅ Validar as variáveis de ambiente
- ✅ Pedir email, senha e nome do admin
- ✅ Criar o usuário via Supabase Auth API
- ✅ Adicionar role "admin" no `user_metadata`
- ✅ Criar entrada na tabela `public.users`

### Opção B: Via Supabase CLI

```bash
./scripts/setup-admin-user.sh
```

---

## ✅ Verificação

### 1. Verificar se usuário foi criado:

```bash
npx supabase db execute --sql "
SELECT 
  id, 
  email, 
  raw_user_meta_data->'role' as role,
  email_confirmed_at
FROM auth.users 
WHERE email = 'seu-email@exemplo.com';
"
```

**Saída esperada:**
```
┌──────────────────────────────────────┬─────────────────────┬─────────┬────────────────────┐
│ id                                   │ email               │ role    │ email_confirmed_at │
├──────────────────────────────────────┼─────────────────────┼─────────┼────────────────────┤
│ abc123...                            │ admin@arco.com      │ "admin" │ 2025-10-05...      │
└──────────────────────────────────────┴─────────────────────┴─────────┴────────────────────┘
```

### 2. Testar Login:

```bash
# Inicie o servidor local
pnpm dev

# Acesse:
# http://localhost:3000/auth/login
```

**Credenciais:**
- Email: (o que você criou)
- Senha: (a que você criou)

### 3. Testar Acesso Admin:

Após login, acesse:
- http://localhost:3000/dashboard (deve funcionar)
- http://localhost:3000/dashboard/admin (deve funcionar se role = admin)

---

## ⚠️ Se Algo Der Errado

### Problema: "User already exists"

**Solução:** Deletar o usuário existente:

```bash
npx supabase db execute --sql "
DELETE FROM auth.users WHERE email = 'seu-email@exemplo.com';
"
```

Depois execute o script novamente.

### Problema: Middleware bloqueia `/dashboard/admin`

**Causa:** O `user_metadata.role` não está como "admin"

**Solução Manual via Dashboard:**

1. Acesse: https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/auth/users
2. Busque pelo email do usuário
3. Clique no usuário
4. Vá em **"User Meta Data"**
5. Adicione/Edite:
   ```json
   {
     "role": "admin",
     "full_name": "Seu Nome"
   }
   ```
6. Salve

**Ou via CLI:**

```bash
npx supabase db execute --sql "
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{\"role\": \"admin\"}'::jsonb
WHERE email = 'seu-email@exemplo.com';
"
```

### Problema: RLS bloqueia acesso aos dados

**Verificar políticas:**

```bash
npx supabase db execute --sql "
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('clients', 'tasks', 'leads', 'users')
ORDER BY tablename, policyname;
"
```

**Recriar políticas admin se necessário:**

```bash
npx supabase db reset
npx supabase db push
```

---

## 🎯 Checklist Final

Antes de considerar o setup completo:

- [ ] `.env.local` tem `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Script `create-admin-user.sh` executou sem erros
- [ ] Usuário aparece em `SELECT * FROM auth.users`
- [ ] `user_metadata.role` é `"admin"`
- [ ] Login funciona em `/auth/login`
- [ ] `/dashboard` carrega sem erros
- [ ] `/dashboard/admin` não redireciona (se admin)
- [ ] Dashboard mostra dados reais (não mock)
- [ ] RLS permite admin ver todos os dados

---

## 📚 Próximos Passos

Depois do setup básico funcionando:

1. **Deploy para Produção:**
   ```bash
   # Linkar ao projeto remoto
   npx supabase link --project-ref vkclegvrqprevcdgosan
   
   # Push das migrations
   npx supabase db push
   
   # Criar admin em produção
   # (execute create-admin-user.sh apontando para produção)
   ```

2. **Adicionar mais admins:**
   - Execute `create-admin-user.sh` novamente
   - Ou via Supabase Dashboard → Authentication → Add User

3. **Configurar permissões granulares:**
   - Editar migrations para roles: `admin`, `user`, `client`
   - Atualizar RLS policies conforme necessário

---

## 🆘 Suporte

Se continuar com problemas:

1. Verifique logs do Supabase:
   ```bash
   npx supabase logs
   ```

2. Teste a conexão:
   ```bash
   npx supabase db execute --sql "SELECT current_user, current_database();"
   ```

3. Valide o middleware:
   - Adicione `console.log` em `src/middleware.ts`
   - Verifique se `user?.user_metadata?.role` está correto

---

**Autor:** ARCO Development Team  
**Data:** 5 de outubro de 2025  
**Versão:** 1.0
