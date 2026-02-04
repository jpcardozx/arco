#!/bin/bash

# ARCO - Setup Admin User (REST API Version)
# Cria usuário admin via Supabase REST API
# Data: 5 de outubro de 2025

set -e

echo "🔐 ARCO - Admin User Setup (REST API)"
echo "========================================"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Carregar variáveis de ambiente
if [ -f ".env.local" ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
else
    echo -e "${RED}❌ Arquivo .env.local não encontrado${NC}"
    exit 1
fi

# Verificar variáveis necessárias
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo -e "${RED}❌ Variáveis de ambiente faltando:${NC}"
    echo "   NEXT_PUBLIC_SUPABASE_URL"
    echo "   SUPABASE_SERVICE_ROLE_KEY"
    echo ""
    echo "Adicione ao .env.local:"
    echo "SUPABASE_SERVICE_ROLE_KEY=eyJ... (sua service role key)"
    exit 1
fi

echo -e "${GREEN}✅ Variáveis de ambiente carregadas${NC}"
echo ""

# Pedir credenciais
echo "📝 Dados do Usuário Admin:"
echo "-------------------------"
read -p "Email: " ADMIN_EMAIL
read -sp "Senha (mínimo 6 caracteres): " ADMIN_PASSWORD
echo ""
read -p "Nome completo: " ADMIN_NAME

echo ""
echo "🚀 Criando usuário admin..."

# Criar usuário via Supabase Auth Admin API
RESPONSE=$(curl -s -X POST "${NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"${ADMIN_EMAIL}\",
    \"password\": \"${ADMIN_PASSWORD}\",
    \"email_confirm\": true,
    \"user_metadata\": {
      \"full_name\": \"${ADMIN_NAME}\",
      \"role\": \"admin\"
    }
  }")

# Verificar se foi criado com sucesso
USER_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$USER_ID" ]; then
    echo -e "${RED}❌ Erro ao criar usuário:${NC}"
    echo $RESPONSE | jq '.' 2>/dev/null || echo $RESPONSE
    exit 1
fi

echo -e "${GREEN}✅ Usuário criado com sucesso!${NC}"
echo ""
echo "User ID: $USER_ID"
echo ""

# Criar entrada na tabela public.users
echo "📊 Criando entrada na tabela users..."

USERS_RESPONSE=$(curl -s -X POST "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=minimal" \
  -d "{
    \"id\": \"${USER_ID}\",
    \"email\": \"${ADMIN_EMAIL}\",
    \"role\": \"admin\"
  }")

echo -e "${GREEN}✅ Entrada na tabela users criada${NC}"
echo ""

# Resumo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 Setup Completo!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Credenciais do Admin:"
echo "   Email: ${ADMIN_EMAIL}"
echo "   Senha: ********"
echo "   Role: admin"
echo ""
echo "🔗 URLs para Teste:"
echo "   Login: http://localhost:3000/auth/login"
echo "   Dashboard: http://localhost:3000/dashboard"
echo "   Admin Panel: http://localhost:3000/dashboard/admin"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo "   Se o middleware bloquear o acesso ao /dashboard/admin,"
echo "   verifique se o user_metadata.role está como 'admin'"
echo "   no Supabase Dashboard → Authentication → Users"
echo ""
echo -e "${BLUE}💡 Dica:${NC} Use este comando para verificar:"
echo "   npx supabase db execute --sql \"SELECT id, email, raw_user_meta_data->'role' as role FROM auth.users WHERE email = '${ADMIN_EMAIL}';\""
echo ""
