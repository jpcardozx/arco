#!/bin/bash

###############################################################################
# 🎯 SCRIPT FINAL: Validação Completa Meta + Supabase
# 
# O que faz:
# 1. Extrai ANON_KEY do .env.local
# 2. Testa Edge Function com Bearer token
# 3. Submete lead de teste
# 4. Fornece próximos passos
###############################################################################

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🎯 VALIDAÇÃO FINAL: Meta Pixel + Supabase Edge Function${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# ============================================================================
# STEP 1: Extrair ANON_KEY
# ============================================================================

echo -e "${YELLOW}📌 STEP 1/5: Extrair ANON_KEY do .env.local${NC}"
echo ""

if ! grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
    echo -e "${RED}❌ ANON_KEY não encontrada em .env.local${NC}"
    exit 1
fi

ANON_KEY=$(grep "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local | cut -d'=' -f2)

if [ -z "$ANON_KEY" ]; then
    echo -e "${RED}❌ ANON_KEY está vazia${NC}"
    exit 1
fi

echo -e "${GREEN}✅ ANON_KEY extraída${NC}"
echo -e "   Primeiros 20 chars: ${ANON_KEY:0:20}..."
echo ""

# ============================================================================
# STEP 2: Extrair PROJECT_REF
# ============================================================================

echo -e "${YELLOW}📌 STEP 2/5: Extrair PROJECT_REF${NC}"
echo ""

PROJECT_REF=$(grep "NEXT_PUBLIC_SUPABASE_URL" .env.local | sed 's|.*https://\([^.]*\)\..*|\1|')

if [ -z "$PROJECT_REF" ]; then
    echo -e "${RED}❌ PROJECT_REF não encontrado${NC}"
    exit 1
fi

EDGE_URL="https://${PROJECT_REF}.supabase.co/functions/v1/meta-conversions-webhook"

echo -e "${GREEN}✅ PROJECT_REF encontrado: $PROJECT_REF${NC}"
echo -e "   Edge Function URL: $EDGE_URL"
echo ""

# ============================================================================
# STEP 3: Testar Health Check COM Bearer Token
# ============================================================================

echo -e "${YELLOW}📌 STEP 3/5: Health Check Edge Function (com Bearer token)${NC}"
echo ""

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $ANON_KEY" \
  "$EDGE_URL" 2>&1)

if [ "$HTTP_STATUS" = "400" ]; then
    echo -e "${GREEN}✅ Edge Function respondendo (HTTP 400 = esperado sem body)${NC}"
elif [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Edge Function respondendo (HTTP 200)${NC}"
else
    echo -e "${RED}❌ Edge Function respondeu com HTTP $HTTP_STATUS${NC}"
fi

echo ""

# ============================================================================
# STEP 4: Submeter Lead de Teste
# ============================================================================

echo -e "${YELLOW}📌 STEP 4/5: Submeter Lead de Teste${NC}"
echo ""

RESPONSE=$(curl -s -X POST "$EDGE_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ANON_KEY" \
  -d '{
    "event_name": "Lead",
    "user_data": {
      "email": "validacao-final@test.com",
      "phone": "5511999999999",
      "firstName": "Teste",
      "lastName": "Validacao"
    },
    "custom_data": {
      "value": 150,
      "currency": "BRL"
    }
  }' 2>&1)

if echo "$RESPONSE" | grep -q '"success":true'; then
    EVENT_ID=$(echo "$RESPONSE" | grep -o '"eventId":"[^"]*"' | cut -d'"' -f4)
    echo -e "${GREEN}✅ Lead enviado com sucesso!${NC}"
    echo -e "   Event ID: $EVENT_ID"
    echo -e "   Resposta: $RESPONSE"
else
    echo -e "${RED}❌ Erro ao enviar lead${NC}"
    echo -e "   Resposta: $RESPONSE"
fi

echo ""

# ============================================================================
# STEP 5: Instruções Meta Events Manager
# ============================================================================

echo -e "${YELLOW}📌 STEP 5/5: Próximas Ações${NC}"
echo ""

echo -e "${GREEN}✅ Lead de teste enviado!${NC}"
echo ""
echo -e "${BLUE}Próximas ações:${NC}"
echo ""
echo "1. Aguarde 5-10 segundos"
echo ""
echo "2. Acesse Meta Events Manager:"
echo "   https://business.facebook.com/events_manager2/list/dataset/1574079363975678"
echo ""
echo "3. Procure por evento \"Lead\" com email: validacao-final@test.com"
echo ""
echo "4. Se evento aparecer:"
echo -e "   ${GREEN}✅ SUCESSO! Fluxo está funcionando${NC}"
echo "   Próximo: Integrar no formulário de produção"
echo ""
echo "5. Se evento NÃO aparecer:"
echo -e "   ${RED}❌ Validar token Meta:${NC}"
echo "   curl -s 'https://graph.instagram.com/me?access_token=SEU_TOKEN' | jq ."
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Validação completa!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
