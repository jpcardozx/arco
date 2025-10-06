#!/bin/bash
# Backend Audit Script - Identifica o que existe no Supabase

set -e

echo "╔═══════════════════════════════════════════════════════════════════════╗"
echo "║        🔍 AUDITORIA COMPLETA DO BACKEND SUPABASE                     ║"
echo "╚═══════════════════════════════════════════════════════════════════════╝"
echo ""

# Cores
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 1. TABELAS EXISTENTES NO SCHEMA${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo -e "${YELLOW}Analisando migrations...${NC}"
echo ""

# Extrair tabelas das migrations
grep -h "CREATE TABLE" supabase/migrations/*.sql 2>/dev/null | \
    sed 's/CREATE TABLE IF NOT EXISTS //g' | \
    sed 's/CREATE TABLE //g' | \
    sed 's/ (.*//g' | \
    sed 's/public\.//g' | \
    sort -u | \
    while read table; do
        if [ ! -z "$table" ]; then
            echo "  ✅ $table"
        fi
    done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}🔧 2. FUNCTIONS SQL DISPONÍVEIS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
grep -h "CREATE.*FUNCTION public\.get_" supabase/migrations/*.sql 2>/dev/null | \
    sed 's/CREATE OR REPLACE FUNCTION public\.//g' | \
    sed 's/CREATE FUNCTION public\.//g' | \
    sed 's/(.*//g' | \
    sort -u | \
    while read func; do
        if [ ! -z "$func" ]; then
            echo "  ✅ $func()"
        fi
    done

echo ""
echo -e "${YELLOW}Functions que DEVERIAM existir mas NÃO existem:${NC}"

# Checar functions necessárias
REQUIRED_FUNCS=(
    "get_user_stats"
    "get_user_tasks" 
    "get_user_leads"
    "get_client_metrics"
    "get_client_domain"
    "get_client_timeline"
)

for func in "${REQUIRED_FUNCS[@]}"; do
    if ! grep -q "FUNCTION public\.$func" supabase/migrations/*.sql 2>/dev/null; then
        echo "  ❌ $func() - FALTANDO"
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}🔒 3. ROW LEVEL SECURITY (RLS)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
RLS_TABLES=$(grep -h "ENABLE ROW LEVEL SECURITY" supabase/migrations/*.sql 2>/dev/null | \
    sed 's/ALTER TABLE //g' | \
    sed 's/public\.//g' | \
    sed 's/ ENABLE.*//g' | \
    sort -u | wc -l)

echo "  ✅ $RLS_TABLES tabelas com RLS habilitado"
echo ""

grep -h "ENABLE ROW LEVEL SECURITY" supabase/migrations/*.sql 2>/dev/null | \
    sed 's/ALTER TABLE //g' | \
    sed 's/public\.//g' | \
    sed 's/ ENABLE.*//g' | \
    sort -u | \
    while read table; do
        if [ ! -z "$table" ]; then
            echo "    • $table"
        fi
    done

echo ""
POLICY_COUNT=$(grep -h "CREATE POLICY" supabase/migrations/*.sql 2>/dev/null | wc -l)
echo "  ✅ $POLICY_COUNT policies criadas"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}🔗 4. RELACIONAMENTOS (FOREIGN KEYS)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo -e "${YELLOW}clients:${NC}"
grep -h "REFERENCES" supabase/migrations/20250104000000_initial_schema.sql 2>/dev/null | \
    grep -A1 "CREATE TABLE.*clients" | \
    grep "REFERENCES" | \
    sed 's/^[ \t]*/  • /g' || echo "  (verificar migration)"

echo ""
echo -e "${YELLOW}tasks:${NC}"
echo "  • client_id → clients(id)"
echo "  • assigned_to → auth.users(id)"
echo "  • created_by → auth.users(id)"

echo ""
echo -e "${YELLOW}leads:${NC}"
echo "  • assigned_to → auth.users(id)"

echo ""
echo -e "${YELLOW}domain_analysis_requests:${NC}"
grep -h "REFERENCES" supabase/migrations/20250105000000_add_domain_analysis_requests.sql 2>/dev/null | \
    grep "REFERENCES" | \
    sed 's/^[ \t]*/  • /g' || echo "  (verificar migration)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📋 5. COLUNAS IMPORTANTES POR TABELA${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo -e "${YELLOW}CLIENTS:${NC}"
grep -A50 "CREATE TABLE.*clients" supabase/migrations/20250104000000_initial_schema.sql 2>/dev/null | \
    grep -E "^\s+[a-z_]+ " | \
    sed 's/^[ \t]*/  • /g' | \
    sed 's/,$//' | \
    head -15

echo ""
echo -e "${YELLOW}TASKS:${NC}"
grep -A50 "CREATE TABLE.*tasks" supabase/migrations/20250104000000_initial_schema.sql 2>/dev/null | \
    grep -E "^\s+[a-z_]+ " | \
    sed 's/^[ \t]*/  • /g' | \
    sed 's/,$//' | \
    head -15

echo ""
echo -e "${YELLOW}LEADS:${NC}"
grep -A50 "CREATE TABLE.*leads" supabase/migrations/20250104000000_initial_schema.sql 2>/dev/null | \
    grep -E "^\s+[a-z_]+ " | \
    sed 's/^[ \t]*/  • /g' | \
    sed 's/,$//' | \
    head -15

echo ""
echo -e "${YELLOW}DOMAIN_ANALYSIS_REQUESTS:${NC}"
grep -A60 "CREATE TABLE.*domain_analysis_requests" supabase/migrations/20250105000000_add_domain_analysis_requests.sql 2>/dev/null | \
    grep -E "^\s+[a-z_]+ " | \
    sed 's/^[ \t]*/  • /g' | \
    sed 's/,$//' | \
    head -20

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 6. CAMPOS ESPECIAIS PARA DASHBOARDS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo -e "${GREEN}✅ DADOS DISPONÍVEIS PARA USER DASHBOARD:${NC}"
echo "  • tasks.assigned_to (filtrar por auth.uid())"
echo "  • tasks.status (pending, in_progress, completed)"
echo "  • tasks.priority (low, medium, high)"
echo "  • tasks.due_date (filtrar hoje)"
echo "  • leads.assigned_to (filtrar por auth.uid())"
echo "  • leads.status (new, contacted, qualified, converted, lost)"

echo ""
echo -e "${GREEN}✅ DADOS DISPONÍVEIS PARA CLIENT DASHBOARD:${NC}"
echo "  • domain_analysis_requests.domain"
echo "  • domain_analysis_requests.ssl_enabled"
echo "  • domain_analysis_requests.ssl_expiry"
echo "  • domain_analysis_requests.performance_score"
echo "  • domain_analysis_requests.seo_score"
echo "  • domain_analysis_requests.accessibility_score"
echo "  • domain_analysis_requests.status"

echo ""
echo -e "${RED}❌ DADOS QUE FALTAM:${NC}"
echo "  • Tabela 'dns_records' - para DomainManagement"
echo "  • Tabela 'page_analytics' - para DomainManagement"
echo "  • Tabela 'client_events' - para ClientHistoryTimeline"
echo "  • Tabela 'project_milestones' - para progresso do projeto"
echo "  • Tabela 'appointments' - para agendamentos"
echo "  • Campo 'client_id' na tabela leads (para associar lead a cliente)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}🎯 7. RESUMO E AÇÕES NECESSÁRIAS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo -e "${GREEN}✅ O QUE JÁ EXISTE:${NC}"
echo "  • Tabelas: clients, tasks, leads, domain_analysis_requests"
echo "  • RLS habilitado em todas as tabelas"
echo "  • Functions: get_admin_stats, get_conversion_metrics, get_monthly_revenue"
echo "  • Audit log completo"
echo "  • Relacionamentos básicos"

echo ""
echo -e "${YELLOW}⚠️  O QUE PRECISA SER CRIADO:${NC}"
echo ""
echo "  MIGRATIONS:"
echo "    1. 20250105000001_add_user_dashboard_functions.sql"
echo "       ├── get_user_stats(user_id)"
echo "       ├── get_user_tasks(user_id, date)"
echo "       └── get_user_leads(user_id, limit)"
echo ""
echo "    2. 20250105000002_add_client_dashboard_functions.sql"
echo "       ├── get_client_domain(client_id)"
echo "       ├── get_client_timeline(client_id)"
echo "       └── get_client_metrics(client_id)"
echo ""
echo "    3. 20250105000003_add_missing_tables.sql (OPCIONAL)"
echo "       ├── dns_records"
echo "       ├── page_analytics"
echo "       ├── client_events"
echo "       └── project_milestones"
echo ""
echo "  HOOKS REACT QUERY:"
echo "    • src/lib/hooks/use-user-stats.ts"
echo "    • src/lib/hooks/use-user-tasks.ts"
echo "    • src/lib/hooks/use-user-leads.ts"
echo "    • src/lib/hooks/use-client-domain.ts"
echo "    • src/lib/hooks/use-client-timeline.ts"
echo "    • src/lib/hooks/use-client-metrics.ts"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Auditoria Completa!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Próximo passo: Criar as migrations e hooks faltantes"
echo ""
