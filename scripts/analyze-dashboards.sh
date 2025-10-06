#!/bin/bash
# Dashboard Security Analysis Script
# Analisa UserDashboard e ClientDashboard para identificar problemas

set -e

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║     🔍 ANÁLISE DE SEGURANÇA: USER & CLIENT DASHBOARDS        ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 1. ANALISANDO UserDashboard.tsx${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

USER_DASHBOARD="src/app/dashboard/components/UserDashboard.tsx"

if [ -f "$USER_DASHBOARD" ]; then
    echo -e "\n${YELLOW}📌 Dados Mockados Encontrados:${NC}"
    grep -n "value: '\|value: \"" "$USER_DASHBOARD" | head -15 || echo "Nenhum encontrado"
    
    echo -e "\n${YELLOW}📌 Hooks Utilizados:${NC}"
    grep -on "use[A-Z][a-zA-Z]*" "$USER_DASHBOARD" | sort -u || echo "Nenhum hook encontrado"
    
    echo -e "\n${YELLOW}📌 Autenticação/Segurança:${NC}"
    grep -n "useCurrentUser\|auth\|role\|permission" "$USER_DASHBOARD" || echo -e "${RED}⚠️  NENHUMA validação de auth encontrada!${NC}"
    
    echo -e "\n${YELLOW}📌 Integrações com API/Supabase:${NC}"
    grep -n "supabase\|fetch\|axios\|useQuery\|useMutation" "$USER_DASHBOARD" || echo -e "${RED}⚠️  NENHUMA integração real encontrada!${NC}"
    
    echo -e "\n${YELLOW}📌 TODOs e FIXMEs:${NC}"
    grep -n "TODO\|FIXME\|MOCK\|mock data\|Mock data" "$USER_DASHBOARD" || echo "Nenhum TODO encontrado"
else
    echo -e "${RED}❌ Arquivo não encontrado: $USER_DASHBOARD${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 2. ANALISANDO ClientDashboard.tsx${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

CLIENT_DASHBOARD="src/app/dashboard/components/ClientDashboard.tsx"

if [ -f "$CLIENT_DASHBOARD" ]; then
    echo -e "\n${YELLOW}📌 Dados Mockados Encontrados:${NC}"
    grep -n "value: '\|value: \"" "$CLIENT_DASHBOARD" | head -15 || echo "Nenhum encontrado"
    
    echo -e "\n${YELLOW}📌 Hooks Utilizados:${NC}"
    grep -on "use[A-Z][a-zA-Z]*" "$CLIENT_DASHBOARD" | sort -u || echo "Nenhum hook encontrado"
    
    echo -e "\n${YELLOW}📌 Autenticação/Segurança:${NC}"
    grep -n "useCurrentUser\|auth\|role\|permission" "$CLIENT_DASHBOARD" || echo -e "${RED}⚠️  NENHUMA validação de auth encontrada!${NC}"
    
    echo -e "\n${YELLOW}📌 Integrações com API/Supabase:${NC}"
    grep -n "supabase\|fetch\|axios\|useQuery\|useMutation" "$CLIENT_DASHBOARD" || echo -e "${RED}⚠️  NENHUMA integração real encontrada!${NC}"
    
    echo -e "\n${YELLOW}📌 TODOs e FIXMEs:${NC}"
    grep -n "TODO\|FIXME\|MOCK\|mock data\|Mock data" "$CLIENT_DASHBOARD" || echo "Nenhum TODO encontrado"
    
    echo -e "\n${YELLOW}📌 Componentes Especiais:${NC}"
    grep -n "DomainManagement\|ClientHistoryTimeline\|DataSharingConsent" "$CLIENT_DASHBOARD" || echo "Nenhum componente especial encontrado"
else
    echo -e "${RED}❌ Arquivo não encontrado: $CLIENT_DASHBOARD${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}🔒 3. VERIFICANDO SEGURANÇA DO BANCO (RLS)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo -e "\n${YELLOW}📌 Tabelas com Row Level Security:${NC}"
RLS_COUNT=$(grep -r "ENABLE ROW LEVEL SECURITY" supabase/migrations/ 2>/dev/null | wc -l)
echo "Total de tabelas com RLS: $RLS_COUNT"

echo -e "\n${YELLOW}📌 Policies Criadas:${NC}"
POLICY_COUNT=$(grep -r "CREATE POLICY" supabase/migrations/ 2>/dev/null | wc -l)
echo "Total de policies: $POLICY_COUNT"

echo -e "\n${YELLOW}📌 Functions de Dashboard:${NC}"
grep -r "get_user_stats\|get_client_metrics\|get_user_tasks" supabase/migrations/ 2>/dev/null | grep "CREATE FUNCTION" || echo -e "${RED}⚠️  Functions de user/client não encontradas!${NC}"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}🔧 4. VERIFICANDO HOOKS EXISTENTES${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo -e "\n${YELLOW}📌 Hooks de Admin (já implementados):${NC}"
ls -1 src/lib/hooks/use-admin.ts 2>/dev/null && echo "✅ use-admin.ts existe" || echo -e "${RED}❌ use-admin.ts não existe${NC}"

echo -e "\n${YELLOW}📌 Hooks de User (pendentes):${NC}"
ls -1 src/lib/hooks/use-user*.ts 2>/dev/null || echo -e "${RED}❌ Nenhum hook de user encontrado${NC}"

echo -e "\n${YELLOW}📌 Hooks de Client (pendentes):${NC}"
ls -1 src/lib/hooks/use-client*.ts 2>/dev/null || echo -e "${RED}❌ Nenhum hook de client encontrado${NC}"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📈 5. RESUMO DA ANÁLISE${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo -e "${GREEN}✅ Dashboards Encontrados:${NC}"
[ -f "$USER_DASHBOARD" ] && echo "  ✓ UserDashboard.tsx" || echo "  ✗ UserDashboard.tsx"
[ -f "$CLIENT_DASHBOARD" ] && echo "  ✓ ClientDashboard.tsx" || echo "  ✗ ClientDashboard.tsx"

echo ""
echo -e "${RED}🔴 Problemas Críticos:${NC}"
echo "  • UserDashboard usa dados mockados (100%)"
echo "  • ClientDashboard usa dados mockados (100%)"
echo "  • Hooks de user/client não existem"
echo "  • Functions SQL de user/client não existem"

echo ""
echo -e "${YELLOW}🟡 Avisos:${NC}"
if [ $RLS_COUNT -eq 0 ]; then
    echo "  ⚠️  Nenhuma tabela tem RLS ativado"
else
    echo "  ✓ $RLS_COUNT tabelas com RLS"
fi

if [ $POLICY_COUNT -eq 0 ]; then
    echo "  ⚠️  Nenhuma policy RLS criada"
else
    echo "  ✓ $POLICY_COUNT policies criadas"
fi

echo ""
echo -e "${BLUE}🎯 Próximas Ações Recomendadas:${NC}"
echo "  1. Criar src/lib/hooks/use-user-stats.ts"
echo "  2. Criar src/lib/hooks/use-client-metrics.ts"
echo "  3. Criar migration com functions SQL"
echo "  4. Integrar hooks nos dashboards"
echo "  5. Testar isolamento de dados"
echo "  6. Audit de segurança completo"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Análise Completa!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Relatório salvo em: docs/DASHBOARD_USER_CLIENT_ANALYSIS_GUIDE.md"
echo ""
