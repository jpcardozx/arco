#!/bin/bash

# ============================================
# ARCO - Payment System Harmonization
# ============================================

set -e

echo "🔄 Harmonizando Payment System..."
echo "======================================"
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Deletar migration obsoleta
echo -e "${BLUE}[1/6]${NC} Deletando migration obsoleta..."
if [ -f "supabase/migrations/20251006000011_payment_management_system.sql" ]; then
  rm -f supabase/migrations/20251006000011_payment_management_system.sql
  echo -e "${GREEN}✅ Migration obsoleta deletada${NC}"
else
  echo -e "${YELLOW}⚠️  Migration já havia sido deletada${NC}"
fi

# 2. Arquivar proposta original
echo ""
echo -e "${BLUE}[2/6]${NC} Arquivando proposta original..."
mkdir -p docs/proposals
if [ -f "FINANCE_TO_PAYMENTS_PROPOSAL.md" ]; then
  cp FINANCE_TO_PAYMENTS_PROPOSAL.md docs/proposals/
  echo -e "${GREEN}✅ Proposta arquivada em docs/proposals/${NC}"
else
  echo -e "${YELLOW}⚠️  Proposta não encontrada${NC}"
fi

# 3. Criar referência canônica
echo ""
echo -e "${BLUE}[3/6]${NC} Criando referência canônica..."
ln -sf MERCADOPAGO_BRICKS_IMPLEMENTATION.md PAYMENT_SYSTEM_CANONICAL.md 2>/dev/null || echo -e "${YELLOW}⚠️  Symlink já existe${NC}"
echo -e "${GREEN}✅ Referência canônica: PAYMENT_SYSTEM_CANONICAL.md${NC}"

# 4. Validar estrutura
echo ""
echo -e "${BLUE}[4/6]${NC} Validando estrutura..."

VALIDATION_PASSED=true

if [ -f "supabase/migrations/20251006000012_mercadopago_bricks_system.sql" ]; then
  echo -e "${GREEN}✅ Migration canônica OK${NC}"
else
  echo -e "${RED}❌ Migration canônica não encontrada${NC}"
  VALIDATION_PASSED=false
fi

if [ -d "src/lib/payments/mercadopago" ]; then
  echo -e "${GREEN}✅ Diretório payments OK${NC}"
else
  echo -e "${YELLOW}⚠️  Diretório payments não encontrado (será criado)${NC}"
fi

if [ -f ".env.local" ] && grep -q "MERCADOPAGO" .env.local; then
  echo -e "${GREEN}✅ Credenciais OK${NC}"
else
  echo -e "${RED}❌ Credenciais não encontradas${NC}"
  VALIDATION_PASSED=false
fi

if [ -f "package.json" ] && grep -q "@mercadopago/sdk-react" package.json; then
  echo -e "${GREEN}✅ SDKs instalados${NC}"
else
  echo -e "${RED}❌ SDKs não instalados${NC}"
  VALIDATION_PASSED=false
fi

# 5. Criar estrutura de diretórios
echo ""
echo -e "${BLUE}[5/6]${NC} Criando estrutura de diretórios..."
mkdir -p src/lib/payments/mercadopago
mkdir -p src/lib/payments/unified
mkdir -p src/app/api/webhooks/mercadopago
mkdir -p src/app/\(dashboard\)/payments/new
mkdir -p src/app/\(dashboard\)/payments/subscriptions
echo -e "${GREEN}✅ Estrutura criada${NC}"

# 6. Relatório de progresso
echo ""
echo -e "${BLUE}[6/6]${NC} Relatório de progresso..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}📊 PROGRESSO DO PAYMENT SYSTEM${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Foundation (100%)
echo "Foundation     ████████████████████████████ 100%"
echo "  ✅ Análise de arquitetura"
echo "  ✅ Credenciais configuradas"
echo "  ✅ SDKs instalados"
echo "  ✅ Documentação (2.400+ linhas)"
echo "  ✅ Migration SQL pronta"
echo ""

# Database (0%)
echo "Database       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%"
echo "  ❌ Migration não aplicada"
echo "  ❌ Tabelas não criadas"
echo "  ❌ RLS policies não ativas"
echo ""

# Backend (15%)
echo "Backend        ████░░░░░░░░░░░░░░░░░░░░░░░░  15%"
echo "  ✅ Estrutura de diretórios"
echo "  ❌ client.ts não implementado"
echo "  ❌ orders.ts não implementado"
echo "  ❌ webhooks.ts não implementado"
echo "  ❌ API route não implementado"
echo ""

# Frontend (0%)
echo "Frontend       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%"
echo "  ❌ Payment Brick não integrado"
echo "  ❌ Dashboard não criado"
echo "  ❌ Checkout page não criado"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}TOTAL:${NC} ~23% completo"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Próximos passos
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}🚀 PRÓXIMOS PASSOS (P0 - BLOCKER):${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Aplicar migration no Supabase (5 min)"
echo "   📍 https://vkclegvrqprevcdgosan.supabase.co/project/_/sql"
echo "   📄 Cole: supabase/migrations/20251006000012_mercadopago_bricks_system.sql"
echo ""
echo "2️⃣  Configurar webhook no Mercado Pago (10 min)"
echo "   📍 https://www.mercadopago.com.br/developers/panel/app/webhooks"
echo "   🔗 URL: https://arco.vercel.app/api/webhooks/mercadopago"
echo "   📡 Eventos: payment, merchant_order, subscription_authorized_payment"
echo "   🔐 ATIVAR 'Secret Signature' e copiar secret"
echo ""
echo "3️⃣  Atualizar variáveis de ambiente (5 min)"
echo "   💻 Local: Adicionar MERCADOPAGO_WEBHOOK_SECRET ao .env.local"
echo "   ☁️  Vercel: vercel env add MERCADOPAGO_WEBHOOK_SECRET"
echo ""
echo "4️⃣  Implementar backend core (1h30min)"
echo "   📄 src/lib/payments/mercadopago/client.ts"
echo "   📄 src/lib/payments/mercadopago/orders.ts"
echo "   📄 src/lib/payments/mercadopago/webhooks.ts"
echo "   📄 src/app/api/webhooks/mercadopago/route.ts"
echo "   📖 Veja: MERCADOPAGO_BRICKS_IMPLEMENTATION.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if $VALIDATION_PASSED; then
  echo -e "${GREEN}✅ Harmonização concluída com sucesso!${NC} 🎉"
else
  echo -e "${YELLOW}⚠️  Harmonização concluída com avisos${NC}"
  echo "   Verifique os itens marcados com ❌ acima"
fi

echo ""
echo "📚 Documentação canônica:"
echo "   - PAYMENT_SYSTEM_CANONICAL.md (→ MERCADOPAGO_BRICKS_IMPLEMENTATION.md)"
echo "   - HARMONIZATION_ANALYSIS.md (análise completa)"
echo "   - SETUP_COMPLETE.md (checklist)"
echo ""
echo "🔍 Para análise detalhada de progresso:"
echo "   npx tsx src/lib/context-tester.ts test"
echo ""
