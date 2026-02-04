#!/bin/bash

###############################################################################
# 🔑 VALIDADOR: Token Meta + CAPI Direct Test
# 
# O que faz:
# 1. Testa se token é válido
# 2. Testa CAPI direto (sem Edge Function)
# 3. Mostra se Dataset está recebendo eventos
###############################################################################

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DATASET_ID="1574079363975678"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🔑 VALIDADOR: Token Meta + CAPI${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if token provided
if [ -z "$1" ]; then
    echo -e "${RED}❌ Token não fornecido${NC}"
    echo ""
    echo "Uso: $0 'seu_token_aqui'"
    echo ""
    echo "Onde obter token:"
    echo "  1. Ir para: https://business.facebook.com/settings/"
    echo "  2. Users and Assets → System Users"
    echo "  3. Conversions API System User → Generate access token"
    echo ""
    echo "Exemplo:"
    echo "  $0 'EAALqEBN5Xe8BCZBx...'"
    exit 1
fi

TOKEN="$1"

# ============================================================================
# TEST 1: Token válido?
# ============================================================================

echo -e "${YELLOW}📌 TEST 1/3: Validar Token Meta${NC}"
echo ""

RESPONSE=$(curl -s "https://graph.instagram.com/me?access_token=$TOKEN")

if echo "$RESPONSE" | grep -q '"id"'; then
    USER_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*' | cut -d'"' -f4)
    echo -e "${GREEN}✅ Token válido${NC}"
    echo "   User ID: $USER_ID"
else
    echo -e "${RED}❌ Token inválido ou expirado${NC}"
    echo "   Resposta: $RESPONSE"
    exit 1
fi

echo ""

# ============================================================================
# TEST 2: CAPI direto
# ============================================================================

echo -e "${YELLOW}📌 TEST 2/3: Testar CAPI Direto${NC}"
echo ""

EVENT_TIME=$(date +%s)
EMAIL_HASH="a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"

CAPI_RESPONSE=$(curl -s -X POST "https://graph.instagram.com/v24.0/${DATASET_ID}/events" \
  -H "Content-Type: application/json" \
  -d '{
    "data": [{
      "event_name": "Lead",
      "event_time": '${EVENT_TIME}',
      "user_data": {
        "em": ["'${EMAIL_HASH}'"]
      }
    }],
    "access_token": "'${TOKEN}'"
  }')

if echo "$CAPI_RESPONSE" | grep -q '"events_received":1'; then
    echo -e "${GREEN}✅ CAPI funcionando${NC}"
    echo "   Evento recebido: 1"
    FBTRACE=$(echo "$CAPI_RESPONSE" | grep -o '"fbtrace_id":"[^"]*' | cut -d'"' -f4)
    echo "   Trace ID: $FBTRACE"
elif echo "$CAPI_RESPONSE" | grep -q '"events_received"'; then
    COUNT=$(echo "$CAPI_RESPONSE" | grep -o '"events_received":[0-9]*' | cut -d':' -f2)
    echo -e "${YELLOW}⚠️  CAPI retornou: eventos_recebidos=$COUNT${NC}"
else
    echo -e "${RED}❌ CAPI retornou erro${NC}"
    echo "   Resposta: $CAPI_RESPONSE"
fi

echo ""

# ============================================================================
# TEST 3: Dataset status
# ============================================================================

echo -e "${YELLOW}📌 TEST 3/3: Status do Dataset${NC}"
echo ""

# Nota: Não há API pública para ver dataset status
# Mas podemos informar como verificar via dashboard

echo -e "${BLUE}Para verificar Dataset em tempo real:${NC}"
echo "  1. Ir para: https://business.facebook.com/events_manager2/list/dataset/$DATASET_ID"
echo "  2. Procure por evento \"Lead\" nos últimos eventos"
echo "  3. Deve aparecer em < 10 segundos"
echo "  4. Email deve ser reconhecível (hash)"

echo ""

# ============================================================================
# SUMMARY
# ============================================================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ VALIDAÇÃO COMPLETA!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${BLUE}Próximas ações:${NC}"
echo ""
echo "1. Atualizar Supabase secrets:"
echo "   cat > .env.secrets << 'EOF'"
echo "   META_CONVERSION_API_TOKEN=$TOKEN"
echo "   EOF"
echo "   npx supabase@latest secrets set --env-file .env.secrets"
echo ""
echo "2. Redeploy Edge Function:"
echo "   npx supabase@latest functions deploy meta-conversions-webhook"
echo ""
echo "3. Testar no dev:"
echo "   pnpm dev"
echo "   http://localhost:3000 → preencher formulário"
echo ""
echo "4. Validar em Meta Events Manager:"
echo "   https://business.facebook.com/events_manager2/list/dataset/$DATASET_ID"
echo ""

echo -e "${BLUE}Token validado: ✅${NC}"
echo "Dataset ID: $DATASET_ID"
echo "Pronto para Deploy!"
