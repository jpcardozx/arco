#!/bin/bash

# Script para verificar e corrigir role de admin
set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 ARCO - Verificar e Corrigir Admin Role${NC}"
echo "========================================"
echo ""

# Carregar variáveis de ambiente
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

# Validar variáveis necessárias
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo -e "${RED}❌ Erro: Variáveis de ambiente não encontradas${NC}"
    echo "Certifique-se de que .env.local existe e contém:"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - SUPABASE_SERVICE_ROLE_KEY"
    exit 1
fi

echo -e "${GREEN}✅ Variáveis de ambiente carregadas${NC}"
echo ""

# Pedir email do usuário
read -p "Email do usuário para verificar/atualizar: " USER_EMAIL

if [ -z "$USER_EMAIL" ]; then
    echo -e "${RED}❌ Email não pode ser vazio${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🔍 Buscando usuário...${NC}"

# Buscar usuário via Admin API
RESPONSE=$(curl -s "${NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}")

# Extrair user_id do usuário (usando jq se disponível, senão grep/sed)
if command -v jq &> /dev/null; then
    USER_ID=$(echo "$RESPONSE" | jq -r ".users[] | select(.email == \"$USER_EMAIL\") | .id")
    CURRENT_ROLE=$(echo "$RESPONSE" | jq -r ".users[] | select(.email == \"$USER_EMAIL\") | .user_metadata.role // \"none\"")
else
    # Fallback sem jq (menos confiável)
    USER_ID=$(echo "$RESPONSE" | grep -oP "\"email\":\"$USER_EMAIL\".*?\"id\":\"[^\"]+\"" | grep -oP "\"id\":\"[^\"]+\"" | cut -d'"' -f4 | head -1)
    CURRENT_ROLE="unknown"
fi

if [ -z "$USER_ID" ] || [ "$USER_ID" == "null" ]; then
    echo -e "${RED}❌ Usuário não encontrado com email: $USER_EMAIL${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Usuário encontrado!${NC}"
echo -e "   ID: ${BLUE}$USER_ID${NC}"
echo -e "   Email: ${BLUE}$USER_EMAIL${NC}"
echo -e "   Role atual: ${YELLOW}$CURRENT_ROLE${NC}"
echo ""

# Perguntar se deseja atualizar para admin
if [ "$CURRENT_ROLE" == "admin" ]; then
    echo -e "${GREEN}✅ Usuário já possui role 'admin'${NC}"
    read -p "Deseja atualizar mesmo assim? (s/N): " FORCE_UPDATE
    if [ "$FORCE_UPDATE" != "s" ] && [ "$FORCE_UPDATE" != "S" ]; then
        echo -e "${BLUE}ℹ️  Nenhuma alteração realizada${NC}"
        exit 0
    fi
fi

echo -e "${YELLOW}🔧 Atualizando role para 'admin'...${NC}"

# Atualizar user_metadata para incluir role: admin
UPDATE_RESPONSE=$(curl -s -X PUT \
  "${NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users/${USER_ID}" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"user_metadata\": {
      \"role\": \"admin\",
      \"full_name\": \"João Pedro Cardozo\"
    }
  }")

# Verificar se atualização foi bem-sucedida
if echo "$UPDATE_RESPONSE" | grep -q "\"id\":\"$USER_ID\""; then
    echo -e "${GREEN}✅ Role atualizada com sucesso!${NC}"
    echo ""
    echo -e "${BLUE}📋 Próximos passos:${NC}"
    echo "1. Faça logout e login novamente no app"
    echo "2. Acesse: http://localhost:3000/dashboard/admin"
    echo "3. Você deve ter acesso total como admin"
    echo ""
    
    # Verificar se entrada existe na tabela public.users
    echo -e "${BLUE}🔍 Verificando entrada na tabela public.users...${NC}"
    
    CHECK_PUBLIC_USER=$(curl -s \
      "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users?id=eq.${USER_ID}" \
      -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
      -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}")
    
    if [ "$CHECK_PUBLIC_USER" == "[]" ]; then
        echo -e "${YELLOW}⚠️  Usuário não encontrado na tabela public.users${NC}"
        echo "Criando entrada..."
        
        curl -s -X POST \
          "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users" \
          -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
          -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
          -H "Content-Type: application/json" \
          -H "Prefer: return=minimal" \
          -d "{
            \"id\": \"$USER_ID\",
            \"email\": \"$USER_EMAIL\",
            \"full_name\": \"João Pedro Cardozo\",
            \"role\": \"admin\"
          }"
        
        echo -e "${GREEN}✅ Entrada criada na tabela public.users${NC}"
    else
        echo -e "${GREEN}✅ Entrada já existe na tabela public.users${NC}"
    fi
else
    echo -e "${RED}❌ Erro ao atualizar role:${NC}"
    echo "$UPDATE_RESPONSE"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Setup completo!${NC}"
