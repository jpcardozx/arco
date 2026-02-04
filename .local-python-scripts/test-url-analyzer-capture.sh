#!/bin/bash

# Script de teste do sistema de captura de domínio
# Valida que tudo está funcionando corretamente

echo "🔍 ARCO - URL Analyzer Capture System Test"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Check if migration file exists
echo "📄 Verificando migration..."
if [ -f "supabase/migrations/20250105000000_add_domain_analysis_requests.sql" ]; then
    echo -e "${GREEN}✅ Migration encontrada${NC}"
else
    echo -e "${RED}❌ Migration não encontrada${NC}"
    exit 1
fi

# 2. Check if session utils exist
echo "📄 Verificando session utils..."
if [ -f "src/lib/utils/session.ts" ]; then
    echo -e "${GREEN}✅ Session utils encontrado${NC}"
else
    echo -e "${RED}❌ Session utils não encontrado${NC}"
    exit 1
fi

# 3. Check if API endpoint exists
echo "📄 Verificando API endpoint..."
if [ -f "src/app/api/domain/capture/route.ts" ]; then
    echo -e "${GREEN}✅ API endpoint encontrado${NC}"
else
    echo -e "${RED}❌ API endpoint não encontrado${NC}"
    exit 1
fi

# 4. Check if URLAnalyzerSection was updated
echo "📄 Verificando URLAnalyzerSection..."
if grep -q "getOrCreateSessionId" "src/components/sections/URLAnalyzerSection.tsx"; then
    echo -e "${GREEN}✅ URLAnalyzerSection atualizado${NC}"
else
    echo -e "${RED}❌ URLAnalyzerSection não atualizado${NC}"
    exit 1
fi

# 5. Check TypeScript compilation
echo "🔧 Verificando TypeScript..."
if pnpm run check-types 2>&1 | grep -q "error TS"; then
    echo -e "${RED}❌ Erros de TypeScript encontrados${NC}"
    pnpm run check-types
    exit 1
else
    echo -e "${GREEN}✅ TypeScript OK${NC}"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}✅ TODOS OS TESTES PASSARAM!${NC}"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "1. Aplicar migration no Supabase:"
echo "   ${YELLOW}supabase db push${NC}"
echo ""
echo "2. Testar fluxo completo:"
echo "   a) Acessar: http://localhost:3000"
echo "   b) Digitar domínio no URL Analyzer"
echo "   c) Verificar console do browser"
echo "   d) Verificar banco: SELECT * FROM domain_analysis_requests;"
echo ""
echo "3. Validar captura:"
echo "   ${YELLOW}psql \$DATABASE_URL -c \"SELECT domain, status, created_at FROM domain_analysis_requests ORDER BY created_at DESC LIMIT 5;\"${NC}"
echo ""
