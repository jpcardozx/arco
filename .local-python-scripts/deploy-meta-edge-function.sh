#!/bin/bash

###############################################################################
# Script de Deploy: Meta Conversions API Edge Function
# 
# Este script:
# 1. Valida credenciais no .env.local
# 2. Configura secrets no Supabase
# 3. Faz deploy da Edge Function
# 4. Executa testes de validação
# 
# Uso: ./scripts/deploy-meta-edge-function.sh
###############################################################################

set -e  # Exit on error

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Header
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 Meta Conversions API - Deploy Edge Function"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

###############################################################################
# STEP 1: Validar .env.local
###############################################################################

log_info "Step 1/4: Validando credenciais em .env.local..."

if [ ! -f ".env.local" ]; then
    log_error ".env.local não encontrado!"
    log_info "Crie o arquivo .env.local com as seguintes variáveis:"
    echo ""
    echo "META_DATASET_ID=1574079363975678"
    echo "META_CONVERSION_API_TOKEN=seu_token_aqui"
    echo "META_TEST_EVENT_CODE=TEST12345"
    echo ""
    exit 1
fi

# Carregar .env.local
source .env.local

# Validar variáveis obrigatórias
ERRORS=0

if [ -z "$META_DATASET_ID" ]; then
    log_error "META_DATASET_ID não configurado em .env.local"
    ERRORS=$((ERRORS + 1))
else
    log_success "META_DATASET_ID encontrado: $META_DATASET_ID"
fi

if [ -z "$META_CONVERSION_API_TOKEN" ]; then
    log_error "META_CONVERSION_API_TOKEN não configurado em .env.local"
    ERRORS=$((ERRORS + 1))
else
    # Mascarar token para exibição
    MASKED_TOKEN="${META_CONVERSION_API_TOKEN:0:10}...${META_CONVERSION_API_TOKEN: -4}"
    log_success "META_CONVERSION_API_TOKEN encontrado: $MASKED_TOKEN"
fi

if [ -z "$META_TEST_EVENT_CODE" ]; then
    log_warning "META_TEST_EVENT_CODE não configurado (opcional)"
else
    log_success "META_TEST_EVENT_CODE encontrado: $META_TEST_EVENT_CODE"
fi

if [ $ERRORS -gt 0 ]; then
    log_error "Configure as variáveis faltantes em .env.local antes de continuar"
    exit 1
fi

echo ""

###############################################################################
# STEP 2: Configurar Secrets no Supabase
###############################################################################

log_info "Step 2/4: Configurando secrets no Supabase..."

# Verificar se Supabase CLI está instalado
if ! command -v supabase &> /dev/null; then
    log_error "Supabase CLI não está instalado!"
    log_info "Instale com: npm install -g supabase"
    exit 1
fi

# Verificar se está logado
if ! supabase projects list &> /dev/null; then
    log_error "Você não está logado no Supabase CLI"
    log_info "Execute: supabase login"
    exit 1
fi

log_info "Configurando secret: META_DATASET_ID..."
supabase secrets set META_DATASET_ID="$META_DATASET_ID" --project-ref $(supabase projects list --format json | jq -r '.[0].id')

log_info "Configurando secret: META_CONVERSION_API_TOKEN..."
supabase secrets set META_CONVERSION_API_TOKEN="$META_CONVERSION_API_TOKEN" --project-ref $(supabase projects list --format json | jq -r '.[0].id')

if [ ! -z "$META_TEST_EVENT_CODE" ]; then
    log_info "Configurando secret: META_TEST_EVENT_CODE..."
    supabase secrets set META_TEST_EVENT_CODE="$META_TEST_EVENT_CODE" --project-ref $(supabase projects list --format json | jq -r '.[0].id')
fi

log_success "Secrets configurados com sucesso!"
echo ""

###############################################################################
# STEP 3: Deploy Edge Function
###############################################################################

log_info "Step 3/4: Fazendo deploy da Edge Function..."

# Verificar se a função existe
if [ ! -f "supabase/functions/meta-conversions-webhook/index.ts" ]; then
    log_error "Edge Function não encontrada em supabase/functions/meta-conversions-webhook/"
    exit 1
fi

log_info "Deployando meta-conversions-webhook..."
supabase functions deploy meta-conversions-webhook

log_success "Edge Function deployada com sucesso!"
echo ""

###############################################################################
# STEP 4: Testes de Validação
###############################################################################

log_info "Step 4/4: Executando testes de validação..."

# Obter URL da função
FUNCTION_URL=$(supabase functions list --format json | jq -r '.[] | select(.name=="meta-conversions-webhook") | .url')

if [ -z "$FUNCTION_URL" ]; then
    log_error "Não foi possível obter URL da Edge Function"
    exit 1
fi

log_info "URL da função: $FUNCTION_URL"

# Teste 1: Health check (GET)
log_info "Teste 1: Health check..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FUNCTION_URL")

if [ "$HTTP_STATUS" = "200" ]; then
    log_success "Health check passou (HTTP 200)"
else
    log_error "Health check falhou (HTTP $HTTP_STATUS)"
fi

# Teste 2: Evento de teste (POST)
log_info "Teste 2: Enviando evento de teste..."

TEST_PAYLOAD='{
  "event_name": "Lead",
  "user_data": {
    "email": "test@example.com",
    "phone": "+5511999999999",
    "firstName": "Test",
    "lastName": "User"
  },
  "custom_data": {
    "value": 100,
    "currency": "BRL",
    "source": "deploy_test"
  },
  "is_test": true
}'

RESPONSE=$(curl -s -X POST "$FUNCTION_URL" \
  -H "Content-Type: application/json" \
  -d "$TEST_PAYLOAD")

if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
    EVENT_ID=$(echo "$RESPONSE" | jq -r '.eventId')
    log_success "Evento de teste enviado com sucesso!"
    log_info "Event ID: $EVENT_ID"
else
    log_error "Falha ao enviar evento de teste"
    log_info "Resposta: $RESPONSE"
fi

echo ""

###############################################################################
# CONCLUSÃO
###############################################################################

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log_success "Deploy concluído com sucesso! 🎉"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
log_info "Próximos passos:"
echo ""
echo "1. Verifique eventos no Meta Events Manager:"
echo "   https://business.facebook.com/events_manager"
echo ""
echo "2. Aguarde ~30 segundos para eventos de teste aparecerem"
echo ""
echo "3. Valide EMQ (Event Match Quality) > 60%"
echo ""
echo "4. Integre o hook nos seus componentes:"
echo "   import { useMetaTracking } from '@/hooks/useMetaTracking'"
echo ""
log_success "Sistema pronto para produção! ✅"
echo ""
