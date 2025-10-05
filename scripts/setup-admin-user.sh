#!/bin/bash

# ARCO - Setup Admin User Script
# Cria usuário admin via Supabase CLI
# Data: 5 de outubro de 2025

set -e

echo "🔐 ARCO - Admin User Setup"
echo "================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se Supabase CLI está instalado
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI não encontrado${NC}"
    echo "Instale com: npm install -g supabase"
    exit 1
fi

echo -e "${GREEN}✅ Supabase CLI encontrado${NC}"
echo ""

# Verificar se está linkado ao projeto
if [ ! -f ".supabase/config.toml" ]; then
    echo -e "${YELLOW}⚠️  Projeto não linkado ao Supabase${NC}"
    echo ""
    read -p "Project Ref ID (vkclegvrqprevcdgosan): " PROJECT_REF
    PROJECT_REF=${PROJECT_REF:-vkclegvrqprevcdgosan}
    
    echo "Linkando ao projeto..."
    npx supabase link --project-ref $PROJECT_REF
fi

echo -e "${GREEN}✅ Projeto linkado${NC}"
echo ""

# Pedir credenciais do admin
echo "📝 Dados do Usuário Admin:"
echo "-------------------------"
read -p "Email: " ADMIN_EMAIL
read -sp "Senha (mínimo 6 caracteres): " ADMIN_PASSWORD
echo ""
read -p "Nome completo: " ADMIN_NAME

echo ""
echo "🚀 Criando usuário admin..."
echo ""

# Criar arquivo SQL temporário
TMP_SQL=$(mktemp)

cat > $TMP_SQL << EOF
-- Criar usuário admin via SQL
DO \$\$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Inserir na tabela auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    '${ADMIN_EMAIL}',
    crypt('${ADMIN_PASSWORD}', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"${ADMIN_NAME}","role":"admin"}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO admin_user_id;

  -- Inserir na tabela auth.identities
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    admin_user_id,
    format('{"sub":"%s","email":"%s"}', admin_user_id::text, '${ADMIN_EMAIL}')::jsonb,
    'email',
    NOW(),
    NOW(),
    NOW()
  );

  -- Inserir na tabela public.users se existir
  INSERT INTO public.users (
    id,
    email,
    role,
    created_at,
    updated_at
  ) VALUES (
    admin_user_id,
    '${ADMIN_EMAIL}',
    'admin',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;

  RAISE NOTICE 'Admin user created with ID: %', admin_user_id;
END \$\$;
EOF

# Executar SQL via Supabase CLI
echo "Executando SQL..."
npx supabase db execute --file $TMP_SQL

# Limpar arquivo temporário
rm $TMP_SQL

echo ""
echo -e "${GREEN}✅ Usuário admin criado com sucesso!${NC}"
echo ""
echo "📋 Próximos passos:"
echo "==================="
echo ""
echo "1. ✅ Usuário criado no banco de dados"
echo "2. ⚠️  IMPORTANTE: Vá até o Supabase Dashboard e:"
echo ""
echo -e "   ${YELLOW}Authentication → Users → Buscar: ${ADMIN_EMAIL}${NC}"
echo -e "   ${YELLOW}Clicar no usuário → User Meta Data → Adicionar:${NC}"
echo ""
echo '   {"role": "admin", "full_name": "'"${ADMIN_NAME}"'"}'
echo ""
echo "3. 🔐 Faça login em: http://localhost:3000/auth/login"
echo "   Email: ${ADMIN_EMAIL}"
echo "   Senha: ********"
echo ""
echo "4. 🎯 Acesse: http://localhost:3000/dashboard/admin"
echo ""
echo -e "${GREEN}Setup completo!${NC}"
