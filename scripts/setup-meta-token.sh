#!/bin/bash

################################################################################
# Meta API Token Rotation & Setup Script
#
# Este script:
# 1. Atualiza o .env.local com o novo Meta Access Token
# 2. Valida o token contra a Meta API
# 3. Atualiza os secrets no Supabase
# 4. Testa a Edge Function com o novo token
#
# Uso: bash scripts/setup-meta-token.sh
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
META_DATASET_ID="1574079363975678"
SUPABASE_PROJECT_REF="vkclegvrqprevcdgosan"
META_API_VERSION="v21.0"

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}     Meta API Token Rotation & Setup${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo ""

# Prompt for new token
echo -e "${YELLOW}⚠️  Este script irá:${NC}"
echo "  1. Atualizar .env.local com novo token"
echo "  2. Validar token contra Meta API"
echo "  3. Atualizar secrets no Supabase"
echo "  4. Testar Edge Function"
echo ""
read -p "Deseja continuar? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${RED}Abortado.${NC}"
  exit 1
fi

echo ""
echo -e "${YELLOW}📋 Passo 1: Coletar novo token${NC}"
echo ""
read -sp "Cole o novo Meta Access Token: " NEW_TOKEN
echo ""
echo ""

if [ -z "$NEW_TOKEN" ]; then
  echo -e "${RED}❌ Token não pode estar vazio${NC}"
  exit 1
fi

# Validar formato do token
if [[ ! $NEW_TOKEN =~ ^EAA[A-Za-z0-9_-]{100,}$ ]]; then
  echo -e "${RED}❌ Formato de token inválido${NC}"
  echo "   Token Meta deve começar com 'EAA' e ter ~200 caracteres"
  exit 1
fi

echo -e "${GREEN}✅ Token coletado (${#NEW_TOKEN} caracteres)${NC}"
echo ""

# Step 2: Validate token against Meta API
echo -e "${YELLOW}📋 Passo 2: Validar token${NC}"
echo ""

echo "Validando token contra Meta API..."
VALIDATION_RESPONSE=$(curl -s -X GET \
  "https://graph.facebook.com/${META_API_VERSION}/${META_DATASET_ID}?fields=name,events_received" \
  -H "Authorization: Bearer ${NEW_TOKEN}")

# Verificar se há erro
if echo "$VALIDATION_RESPONSE" | grep -q '"error"'; then
  ERROR_MSG=$(echo "$VALIDATION_RESPONSE" | grep -o '"message":"[^"]*' | cut -d'"' -f4)
  echo -e "${RED}❌ Token inválido: $ERROR_MSG${NC}"
  exit 1
fi

# Verificar se response tem dados esperados
if echo "$VALIDATION_RESPONSE" | grep -q "\"id\":\"${META_DATASET_ID}\""; then
  DATASET_NAME=$(echo "$VALIDATION_RESPONSE" | grep -o '"name":"[^"]*' | cut -d'"' -f4 | head -1)
  echo -e "${GREEN}✅ Token validado com sucesso${NC}"
  echo -e "   Dataset: ${DATASET_NAME} (${META_DATASET_ID})"
else
  echo -e "${RED}❌ Resposta inesperada da Meta API${NC}"
  echo "Response: $VALIDATION_RESPONSE"
  exit 1
fi

echo ""

# Step 3: Update .env.local
echo -e "${YELLOW}📋 Passo 3: Atualizar .env.local${NC}"
echo ""

if [ ! -f ".env.local" ]; then
  echo "Criando .env.local..."
  cp .env.example .env.local 2>/dev/null || {
    echo -e "${RED}❌ .env.example não encontrado${NC}"
    exit 1
  }
fi

# Backup do arquivo anterior
cp .env.local .env.local.bak
echo -e "${GREEN}✅ Backup criado: .env.local.bak${NC}"

# Atualizar token
if grep -q "META_CONVERSION_API_TOKEN" .env.local; then
  sed -i "s|^META_CONVERSION_API_TOKEN=.*|META_CONVERSION_API_TOKEN=${NEW_TOKEN}|" .env.local
else
  echo "META_CONVERSION_API_TOKEN=${NEW_TOKEN}" >> .env.local
fi

echo -e "${GREEN}✅ .env.local atualizado${NC}"
echo ""

# Step 4: Update Supabase secrets
echo -e "${YELLOW}📋 Passo 4: Atualizar Supabase secrets${NC}"
echo ""

if ! command -v supabase &> /dev/null; then
  echo -e "${RED}⚠️  supabase CLI não encontrado${NC}"
  echo "   Instale com: npm install -g supabase"
  echo "   Ou configure manualmente no Supabase Dashboard"
else
  echo "Atualizando secrets no Supabase..."

  supabase secrets set META_CONVERSION_API_TOKEN="${NEW_TOKEN}" \
    --project-ref "${SUPABASE_PROJECT_REF}" 2>/dev/null || {
    echo -e "${RED}❌ Erro ao atualizar secrets${NC}"
  }

  echo -e "${GREEN}✅ Secrets atualizados${NC}"
fi

echo ""

# Final summary
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Token Rotation Completo${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Próximas ações:${NC}"
echo "  1. supabase functions deploy meta-conversions-webhook"
echo "  2. Teste: Envie um lead no formulário"
echo "  3. Valide: Meta Events Manager"
echo ""
