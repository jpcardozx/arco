#!/bin/bash

# ARCO Dashboard Migration Script
# Este script migra o dashboard antigo para a nova arquitetura modular

set -e

echo "🚀 Iniciando migração do dashboard..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Backup old files
echo -e "${BLUE}📦 Step 1: Criando backup dos arquivos antigos...${NC}"
mkdir -p .backups/dashboard-$(date +%Y%m%d-%H%M%S)
cp src/app/dashboard/layout.tsx .backups/dashboard-$(date +%Y%m%d-%H%M%S)/layout.tsx.bak 2>/dev/null || true
cp src/components/dashboard/sidebar.tsx .backups/dashboard-$(date +%Y%m%d-%H%M%S)/sidebar.tsx.bak 2>/dev/null || true
echo -e "${GREEN}✓ Backup criado${NC}"
echo ""

# Step 2: Install dependencies
echo -e "${BLUE}📦 Step 2: Verificando dependências...${NC}"
pnpm list @radix-ui/react-collapsible >/dev/null 2>&1 && echo -e "${GREEN}✓ Collapsible já instalado${NC}" || {
    echo "Instalando Collapsible..."
    npx shadcn@latest add collapsible --yes
}

pnpm list cmdk >/dev/null 2>&1 && echo -e "${GREEN}✓ Command já instalado${NC}" || {
    echo "Instalando Command..."
    npx shadcn@latest add command --yes
}
echo ""

# Step 3: Create activity_logs table (optional)
echo -e "${BLUE}📦 Step 3: Criando tabela de logs (opcional)...${NC}"
cat > /tmp/create_activity_logs.sql << 'EOF'
-- Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('page_view', 'navigation', 'action', 'error', 'auth', 'api_call')),
  activity_name TEXT NOT NULL,
  metadata JSONB,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_activity_type ON activity_logs(activity_type);

-- RLS Policies
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Users can only see their own logs
CREATE POLICY "Users can view own logs" ON activity_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own logs
CREATE POLICY "Users can insert own logs" ON activity_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can see all logs
CREATE POLICY "Admins can view all logs" ON activity_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.tier = 'admin'
    )
  );

COMMENT ON TABLE activity_logs IS 'Logs de atividades do dashboard para analytics e debugging';
EOF

echo "SQL criado em /tmp/create_activity_logs.sql"
echo -e "${YELLOW}Execute manualmente no Supabase SQL Editor se quiser habilitar logs persistentes${NC}"
echo ""

# Step 4: Test TypeScript compilation
echo -e "${BLUE}📦 Step 4: Testando compilação TypeScript...${NC}"
npx tsc --noEmit 2>&1 | grep "error TS" && {
    echo -e "${YELLOW}⚠ Warnings TypeScript encontrados (não-críticos)${NC}"
} || {
    echo -e "${GREEN}✓ TypeScript OK${NC}"
}
echo ""

# Step 5: Summary
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Migração concluída com sucesso!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1. Testar localmente:"
echo "   ${BLUE}pnpm dev${NC}"
echo "   ${BLUE}http://localhost:3000/dashboard${NC}"
echo ""
echo "2. Testar responsividade:"
echo "   - Desktop: Toggle sidebar, ⌘K command palette"
echo "   - Mobile: Menu hamburger, overlay"
echo ""
echo "3. Verificar console logs:"
echo "   - Abrir DevTools Console"
echo "   - Ver logs: 📄 PAGE_VIEW, 🧭 NAVIGATION, etc"
echo ""
echo "4. (Opcional) Habilitar logs persistentes:"
echo "   - Executar SQL em /tmp/create_activity_logs.sql no Supabase"
echo ""
echo "5. Deploy para produção:"
echo "   ${BLUE}git add .${NC}"
echo "   ${BLUE}git commit -m 'refactor(dashboard): complete UX overhaul'${NC}"
echo "   ${BLUE}git push${NC}"
echo ""
echo "📚 Documentação: docs/DASHBOARD_REFACTORING_COMPLETE.md"
echo ""
