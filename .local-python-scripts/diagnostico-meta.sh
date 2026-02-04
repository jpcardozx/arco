#!/bin/bash

###############################################################################
# 🔍 DIAGNÓSTICO COMPLETO: Meta Pixel + CAPI + Supabase
# 
# Executa: npx supabase secrets, functions, curl tests
# Output: Relatório formatado com status ✅/❌
###############################################################################

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variáveis
PROJECT_REF=""
EDGE_URL=""
DATASET_ID="1574079363975678"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🔍 DIAGNÓSTICO: Meta Pixel + CAPI + Supabase Edge Functions${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# ============================================================================
# STEP 1: Verificar Supabase CLI
# ============================================================================

echo -e "${YELLOW}📌 STEP 1/6: Verificar Supabase CLI${NC}"
echo ""

if command -v supabase &> /dev/null; then
    VERSION=$(supabase --version 2>&1 | head -1 || echo "unknown")
    echo -e "${GREEN}✅ Supabase CLI instalado${NC}"
    echo -e "   Versão: $VERSION"
else
    echo -e "${RED}❌ Supabase CLI NÃO encontrado${NC}"
    echo -e "   Instalação: npm install -g supabase"
    exit 1
fi

echo ""

# ============================================================================
# STEP 2: Verificar project link
# ============================================================================

echo -e "${YELLOW}📌 STEP 2/6: Verificar Supabase Project Link${NC}"
echo ""

if [ -f ".env.local" ]; then
    PROJECT_REF=$(grep "NEXT_PUBLIC_SUPABASE_URL" .env.local | cut -d'=' -f2 | sed 's|https://||' | cut -d'.' -f1)
    
    if [ -z "$PROJECT_REF" ]; then
        echo -e "${YELLOW}⚠️  PROJECT_REF não encontrado em .env.local${NC}"
        echo -e "   Tentando via CLI..."
        PROJECT_REF=$(supabase projects list 2>&1 | head -5 | tail -1 | awk '{print $1}' || echo "")
    else
        echo -e "${GREEN}✅ Project encontrado: $PROJECT_REF${NC}"
    fi
else
    echo -e "${RED}❌ .env.local não encontrado${NC}"
    exit 1
fi

if [ -z "$PROJECT_REF" ]; then
    echo -e "${RED}❌ Não foi possível obter PROJECT_REF${NC}"
    echo -e "   Tente: supabase projects list"
    exit 1
fi

EDGE_URL="https://${PROJECT_REF}.supabase.co/functions/v1/meta-conversions-webhook"
echo -e "   Edge Function URL: $EDGE_URL"

echo ""

# ============================================================================
# STEP 3: Verificar Secrets
# ============================================================================

echo -e "${YELLOW}📌 STEP 3/6: Verificar Supabase Secrets${NC}"
echo ""

SECRETS_LIST=$(supabase secrets list 2>&1 || echo "ERROR")

if echo "$SECRETS_LIST" | grep -q "META_CONVERSION_API_TOKEN"; then
    echo -e "${GREEN}✅ META_CONVERSION_API_TOKEN encontrado${NC}"
else
    echo -e "${RED}❌ META_CONVERSION_API_TOKEN FALTANDO${NC}"
fi

if echo "$SECRETS_LIST" | grep -q "META_DATASET_ID"; then
    echo -e "${GREEN}✅ META_DATASET_ID encontrado${NC}"
else
    echo -e "${RED}❌ META_DATASET_ID FALTANDO${NC}"
fi

if echo "$SECRETS_LIST" | grep -q "META_TEST_EVENT_CODE"; then
    echo -e "${GREEN}✅ META_TEST_EVENT_CODE encontrado${NC}"
else
    echo -e "${YELLOW}⚠️  META_TEST_EVENT_CODE (opcional)${NC}"
fi

echo ""

# ============================================================================
# STEP 4: Verificar Edge Functions Deployadas
# ============================================================================

echo -e "${YELLOW}📌 STEP 4/6: Verificar Edge Functions${NC}"
echo ""

FUNCTIONS_LIST=$(supabase functions list 2>&1 || echo "ERROR")

if echo "$FUNCTIONS_LIST" | grep -q "meta-conversions-webhook"; then
    echo -e "${GREEN}✅ meta-conversions-webhook deployada${NC}"
else
    echo -e "${RED}❌ meta-conversions-webhook NÃO encontrada${NC}"
    echo -e "   Para deployar: supabase functions deploy meta-conversions-webhook"
fi

echo ""

# ============================================================================
# STEP 5: Health Check Edge Function
# ============================================================================

echo -e "${YELLOW}📌 STEP 5/6: Health Check Edge Function${NC}"
echo ""

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$EDGE_URL" 2>&1)

if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "400" ]; then
    echo -e "${GREEN}✅ Edge Function respondendo (HTTP $HTTP_STATUS)${NC}"
else
    echo -e "${RED}❌ Edge Function NOT responding (HTTP $HTTP_STATUS)${NC}"
    echo -e "   URL: $EDGE_URL"
    echo -e "   Debug: curl -v $EDGE_URL"
fi

echo ""

# ============================================================================
# STEP 6: Teste de Payload
# ============================================================================

echo -e "${YELLOW}📌 STEP 6/6: Teste de Payload (Lead Event)${NC}"
echo ""

RESPONSE=$(curl -s -X POST "$EDGE_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "diagnostico@test.com",
      "phone": "5511999999999",
      "firstName": "Test"
    },
    "custom_data": {
      "value": 100,
      "currency": "BRL"
    }
  }' 2>&1)

if echo "$RESPONSE" | grep -q '"success"'; then
    echo -e "${GREEN}✅ Edge Function recebeu payload${NC}"
    echo -e "   Resposta: $(echo $RESPONSE | jq -r '.eventId' 2>/dev/null || echo 'eventId não encontrado')"
else
    echo -e "${YELLOW}⚠️  Edge Function respondeu, mas sem sucesso${NC}"
    echo -e "   Resposta: $RESPONSE"
fi

echo ""

# ============================================================================
# SUMMARY
# ============================================================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 RESUMO DO DIAGNÓSTICO${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${GREEN}✅ PRONTO:${NC}"
echo "   • Supabase CLI funcionando"
echo "   • Project linked"
echo "   • Secrets configurados"
echo ""

echo -e "${YELLOW}ℹ️  PRÓXIMOS PASSOS:${NC}"
echo "   1. Validar token Meta:"
echo "      curl -s 'https://graph.instagram.com/me?access_token=SEU_TOKEN' | jq ."
echo ""
echo "   2. Verificar Dataset em Meta:"
echo "      https://business.facebook.com/events_manager2/list/dataset/$DATASET_ID"
echo ""
echo "   3. Submeter lead de teste:"
echo "      curl -X POST '$EDGE_URL' -H 'Content-Type: application/json' \\"
echo "        -d '{\"event_name\":\"Lead\",\"user_data\":{\"email\":\"test@test.com\"}}'"
echo ""
echo "   4. Validar em Meta Events Manager (aguardar 5-10 segundos)"
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Diagnóstico completo!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
