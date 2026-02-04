#!/bin/bash

# ============================================
# SCRIPT: Apply Dashboard Migrations
# Descrição: Aplica migrations das functions do dashboard no Supabase
# ============================================

set -e

echo "🚀 APLICANDO MIGRATIONS DO DASHBOARD NO SUPABASE"
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se supabase CLI está instalado
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI não encontrado${NC}"
    echo "Instale com: npm install -g supabase"
    exit 1
fi

echo -e "${BLUE}📦 Verificando status da conexão...${NC}"
if ! supabase db remote list &> /dev/null; then
    echo -e "${RED}❌ Erro ao conectar ao Supabase${NC}"
    echo "Execute: supabase link --project-ref [SEU_PROJECT_ID]"
    exit 1
fi

echo -e "${GREEN}✅ Conectado ao Supabase${NC}"
echo ""

# Push das migrations
echo -e "${BLUE}📤 Aplicando migrations...${NC}"
supabase db push

echo ""
echo -e "${GREEN}✅ Migrations aplicadas com sucesso!${NC}"
echo ""

# Validar functions criadas
echo -e "${BLUE}🔍 Validando functions criadas...${NC}"
VALIDATION_QUERY="
SELECT 
    routine_name,
    routine_type,
    security_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
    'get_user_stats',
    'get_user_tasks',
    'get_user_leads',
    'get_client_metrics',
    'get_client_domain',
    'get_client_timeline'
)
ORDER BY routine_name;
"

# Executar validação
RESULT=$(supabase db remote exec "$VALIDATION_QUERY" 2>&1)

if echo "$RESULT" | grep -q "get_user_stats"; then
    echo -e "${GREEN}✅ Functions do User Dashboard criadas${NC}"
else
    echo -e "${RED}❌ Functions do User Dashboard não encontradas${NC}"
fi

if echo "$RESULT" | grep -q "get_client_metrics"; then
    echo -e "${GREEN}✅ Functions do Client Dashboard criadas${NC}"
else
    echo -e "${RED}❌ Functions do Client Dashboard não encontradas${NC}"
fi

echo ""
echo -e "${BLUE}📊 Lista completa de functions:${NC}"
echo "$RESULT"

echo ""
echo -e "${GREEN}🎉 PROCESSO CONCLUÍDO!${NC}"
echo ""
echo -e "${YELLOW}📝 Próximos passos:${NC}"
echo "1. Gerar types: npm run supabase:types"
echo "2. Integrar hooks nos dashboards"
echo "3. Testar em desenvolvimento"
echo ""
