#!/bin/bash

# ============================================================================
# Meta Conversions API - Smart Deploy
# ============================================================================
# Detecta ambiente automaticamente e deploya para Supabase cloud
# Suporta: staging (teste) e production
# ============================================================================

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================================
# STEP 0: Check Dependencies
# ============================================================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  🚀 Meta Conversions API - Smart Deploy${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${BLUE}ℹ️  Step 0/5: Verificando dependências...${NC}"

# Check Supabase CLI
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI não encontrado${NC}"
    echo -e "${YELLOW}   Instale: npm install -g supabase${NC}"
    exit 1
fi

# Check if logged in
if ! supabase projects list &> /dev/null; then
    echo -e "${RED}❌ Você não está logado no Supabase${NC}"
    echo -e "${YELLOW}   Execute: supabase login${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Supabase CLI OK${NC}"

# Check jq
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  jq não encontrado (opcional, mas recomendado)${NC}"
    echo -e "${YELLOW}   Instale: sudo apt install jq${NC}"
fi

# ============================================================================
# STEP 1: Detect Linked Project
# ============================================================================

echo ""
echo -e "${BLUE}ℹ️  Step 1/5: Detectando projeto Supabase linkado...${NC}"

# Get linked project (marked with ●)
# Parse output removing pipes and extracting columns
PROJECT_LINE=$(supabase projects list 2>/dev/null | grep "●" | sed 's/|/ /g')
PROJECT_REF=$(echo "$PROJECT_LINE" | awk '{print $3}')
LINKED_PROJECT=$(echo "$PROJECT_LINE" | awk '{print $4}')

if [ -z "$PROJECT_REF" ] || [ "$PROJECT_REF" == "●" ]; then
    echo -e "${RED}❌ Nenhum projeto Supabase linkado${NC}"
    echo -e "${YELLOW}   Execute: supabase link --project-ref YOUR_PROJECT_REF${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Projeto detectado: ${LINKED_PROJECT}${NC}"
echo -e "${GREEN}   Project Ref: ${PROJECT_REF}${NC}"

# ============================================================================
# STEP 2: Choose Environment
# ============================================================================

echo ""
echo -e "${BLUE}ℹ️  Step 2/5: Escolha o ambiente de deploy...${NC}"
echo ""
echo -e "${YELLOW}   1) 🧪 STAGING (recomendado para primeiro deploy)${NC}"
echo -e "${YELLOW}      - Testa eventos reais para Meta${NC}"
echo -e "${YELLOW}      - Não afeta produção${NC}"
echo -e "${YELLOW}      - Use META_TEST_EVENT_CODE para validar${NC}"
echo ""
echo -e "${YELLOW}   2) 🚀 PRODUCTION (apenas após validar staging)${NC}"
echo -e "${YELLOW}      - Eventos reais em campanha ativa${NC}"
echo -e "${YELLOW}      - Monitore EMQ > 60%${NC}"
echo ""
read -p "$(echo -e ${BLUE}Escolha [1 ou 2]:${NC} )" ENV_CHOICE

case $ENV_CHOICE in
    1)
        DEPLOY_ENV="staging"
        echo -e "${GREEN}✅ Ambiente: STAGING${NC}"
        ;;
    2)
        DEPLOY_ENV="production"
        echo -e "${GREEN}✅ Ambiente: PRODUCTION${NC}"
        ;;
    *)
        echo -e "${RED}❌ Opção inválida. Use 1 ou 2.${NC}"
        exit 1
        ;;
esac

# ============================================================================
# STEP 3: Validate .env.local
# ============================================================================

echo ""
echo -e "${BLUE}ℹ️  Step 3/5: Validando credenciais em .env.local...${NC}"

if [ ! -f .env.local ]; then
    echo -e "${RED}❌ Arquivo .env.local não encontrado${NC}"
    exit 1
fi

# Source .env.local
source .env.local

# Validate META_DATASET_ID
if [ -z "$META_DATASET_ID" ]; then
    echo -e "${RED}❌ META_DATASET_ID não encontrado em .env.local${NC}"
    exit 1
fi
echo -e "${GREEN}✅ META_DATASET_ID encontrado: ${META_DATASET_ID}${NC}"

# Validate META_CONVERSION_API_TOKEN
if [ -z "$META_CONVERSION_API_TOKEN" ]; then
    echo -e "${RED}❌ META_CONVERSION_API_TOKEN não encontrado em .env.local${NC}"
    exit 1
fi
TOKEN_PREVIEW="${META_CONVERSION_API_TOKEN:0:10}...${META_CONVERSION_API_TOKEN: -4}"
echo -e "${GREEN}✅ META_CONVERSION_API_TOKEN encontrado: ${TOKEN_PREVIEW}${NC}"

# Validate META_TEST_EVENT_CODE (optional)
if [ -z "$META_TEST_EVENT_CODE" ]; then
    echo -e "${YELLOW}⚠️  META_TEST_EVENT_CODE não encontrado (opcional)${NC}"
    META_TEST_EVENT_CODE="TEST12345"
    echo -e "${YELLOW}   Usando default: ${META_TEST_EVENT_CODE}${NC}"
else
    echo -e "${GREEN}✅ META_TEST_EVENT_CODE encontrado: ${META_TEST_EVENT_CODE}${NC}"
fi

# ============================================================================
# STEP 4: Configure Supabase Secrets
# ============================================================================

echo ""
echo -e "${BLUE}ℹ️  Step 4/5: Configurando secrets no Supabase (${DEPLOY_ENV})...${NC}"

echo -e "${BLUE}   Configurando META_DATASET_ID...${NC}"
supabase secrets set META_DATASET_ID="$META_DATASET_ID" --project-ref "$PROJECT_REF"

echo -e "${BLUE}   Configurando META_CONVERSION_API_TOKEN...${NC}"
supabase secrets set META_CONVERSION_API_TOKEN="$META_CONVERSION_API_TOKEN" --project-ref "$PROJECT_REF"

echo -e "${BLUE}   Configurando META_TEST_EVENT_CODE...${NC}"
supabase secrets set META_TEST_EVENT_CODE="$META_TEST_EVENT_CODE" --project-ref "$PROJECT_REF"

echo -e "${GREEN}✅ Secrets configurados com sucesso${NC}"

# ============================================================================
# STEP 5: Deploy Edge Function
# ============================================================================

echo ""
echo -e "${BLUE}ℹ️  Step 5/5: Deployando Edge Function...${NC}"

supabase functions deploy meta-conversions-webhook --project-ref "$PROJECT_REF"

echo -e "${GREEN}✅ Edge Function deployada com sucesso!${NC}"

# ============================================================================
# VALIDATION & NEXT STEPS
# ============================================================================

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✅ Deploy Completo!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

EDGE_FUNCTION_URL="https://${PROJECT_REF}.supabase.co/functions/v1/meta-conversions-webhook"

echo -e "${BLUE}📍 Edge Function URL:${NC}"
echo -e "   ${EDGE_FUNCTION_URL}"
echo ""

echo -e "${BLUE}🔍 Próximos Passos:${NC}"
echo ""

if [ "$DEPLOY_ENV" == "staging" ]; then
    echo -e "${YELLOW}1. Teste a Edge Function:${NC}"
    echo ""
    echo -e "   curl -X POST '${EDGE_FUNCTION_URL}' \\"
    echo -e "     -H 'Content-Type: application/json' \\"
    echo -e "     -d '{"
    echo -e "       \"event_name\": \"Lead\","
    echo -e "       \"email\": \"test@example.com\","
    echo -e "       \"phone\": \"+5511999999999\","
    echo -e "       \"value\": 50.00,"
    echo -e "       \"currency\": \"BRL\","
    echo -e "       \"test_event_code\": \"${META_TEST_EVENT_CODE}\""
    echo -e "     }'"
    echo ""
    echo -e "${YELLOW}2. Verifique no Meta Events Manager:${NC}"
    echo -e "   https://business.facebook.com/events_manager2/list/dataset/${META_DATASET_ID}"
    echo ""
    echo -e "${YELLOW}3. Aguarde ~30 segundos e valide:${NC}"
    echo -e "   - Aba \"Test Events\" mostra evento com code ${META_TEST_EVENT_CODE}"
    echo -e "   - EMQ Parameters > 6/8 (objetivo: 8/8)"
    echo ""
    echo -e "${YELLOW}4. Após validar, atualize .env.local:${NC}"
    echo -e "   NEXT_PUBLIC_SUPABASE_URL=\"https://${PROJECT_REF}.supabase.co\""
    echo -e "   # Remova META_TEST_EVENT_CODE para produção"
    echo ""
    echo -e "${YELLOW}5. Teste no seu app:${NC}"
    echo -e "   - Abra sua aplicação"
    echo -e "   - Preencha formulário/clique CTWA"
    echo -e "   - Verifique console.log do eventId"
    echo -e "   - Confirme no Meta Events Manager"
else
    echo -e "${GREEN}1. Produção ativa! Monitore:${NC}"
    echo -e "   https://business.facebook.com/events_manager2/list/dataset/${META_DATASET_ID}"
    echo ""
    echo -e "${GREEN}2. Validações críticas:${NC}"
    echo -e "   - EMQ > 60% nas próximas 24h"
    echo -e "   - Deduplicação < 3%"
    echo -e "   - Volume: 50+ Contact/dia, 20+ Lead/dia"
    echo ""
    echo -e "${GREEN}3. Meta Learning Phase:${NC}"
    echo -e "   - 50 eventos/semana = sai de Learning"
    echo -e "   - CPL deve reduzir -30% em 7-14 dias"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
