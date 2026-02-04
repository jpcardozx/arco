#!/bin/bash

# ============================================
# ARCO - Mercado Pago Quick Setup
# ============================================

set -e

echo "🚀 ARCO Payment System - Quick Setup"
echo "======================================"
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar credenciais
echo -e "${BLUE}[1/5]${NC} Verificando credenciais do Mercado Pago..."

if ! grep -q "NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY" .env.local; then
  echo -e "${YELLOW}⚠️  Credenciais não encontradas!${NC}"
  echo ""
  echo "Adicione ao .env.local:"
  echo ""
  echo "NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-cdfb831a-f7c1-4c1b-bf3d-dd332726f709"
  echo "MERCADOPAGO_ACCESS_TOKEN=APP_USR-606605515420553-100616-2503df71f46095fa9bccc3736d3c5852-2907827980"
  echo "MERCADOPAGO_WEBHOOK_SECRET=your_webhook_secret_here"
  echo "MERCADOPAGO_ENV=test"
  echo ""
  exit 1
else
  echo -e "${GREEN}✅ Credenciais encontradas${NC}"
fi

# 2. Verificar SDKs
echo -e "${BLUE}[2/5]${NC} Verificando SDKs do Mercado Pago..."

if ! grep -q "@mercadopago/sdk-react" package.json; then
  echo -e "${YELLOW}⚠️  SDKs não encontrados. Instalando...${NC}"
  pnpm add @mercadopago/sdk-react mercadopago
else
  echo -e "${GREEN}✅ SDKs instalados${NC}"
fi

# 3. Verificar migration
echo -e "${BLUE}[3/5]${NC} Verificando migration SQL..."

if [ -f "supabase/migrations/20251006000012_mercadopago_bricks_system.sql" ]; then
  echo -e "${GREEN}✅ Migration encontrada${NC}"
  echo ""
  echo -e "${YELLOW}📋 Para aplicar a migration:${NC}"
  echo "   1. Acesse: https://supabase.com/dashboard/project/_/sql"
  echo "   2. Cole o conteúdo de: supabase/migrations/20251006000012_mercadopago_bricks_system.sql"
  echo "   3. Clique em 'Run'"
  echo ""
  echo "   OU via CLI: supabase db push"
  echo ""
else
  echo -e "${YELLOW}⚠️  Migration não encontrada${NC}"
  exit 1
fi

# 4. Verificar estrutura de pastas
echo -e "${BLUE}[4/5]${NC} Criando estrutura de pastas..."

mkdir -p src/lib/payments/mercadopago
mkdir -p src/app/api/webhooks/mercadopago

echo -e "${GREEN}✅ Estrutura criada${NC}"
echo "   - src/lib/payments/mercadopago/"
echo "   - src/app/api/webhooks/mercadopago/"

# 5. Próximos passos
echo ""
echo -e "${BLUE}[5/5]${NC} Setup concluído! 🎉"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ PRÓXIMOS PASSOS:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Aplicar migration no Supabase"
echo "   👉 Veja instruções acima"
echo ""
echo "2️⃣  Configurar webhook no Mercado Pago"
echo "   👉 https://www.mercadopago.com.br/developers/panel/app/webhooks"
echo "   URL (dev):  http://localhost:3000/api/webhooks/mercadopago"
echo "   URL (prod): https://arco.vercel.app/api/webhooks/mercadopago"
echo "   Eventos: payment, merchant_order, subscription_authorized_payment"
echo "   ⚠️  ATIVAR 'Secret Signature' e copiar o secret"
echo ""
echo "3️⃣  Adicionar variáveis na Vercel"
echo "   👉 https://vercel.com/jpcardozx/arco/settings/environment-variables"
echo "   Ou via CLI: vercel env add MERCADOPAGO_WEBHOOK_SECRET"
echo ""
echo "4️⃣  Criar primeira implementação"
echo "   📄 src/lib/payments/mercadopago/client.ts"
echo "   📖 Veja: MERCADOPAGO_BRICKS_IMPLEMENTATION.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}📚 DOCUMENTAÇÃO:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📖 Guia completo:"
echo "   - MERCADOPAGO_BRICKS_IMPLEMENTATION.md"
echo "   - VERCEL_ENV_SETUP.md"
echo "   - PAYMENT_SYSTEM_EXECUTIVE_SUMMARY.md"
echo "   - SETUP_COMPLETE.md"
echo ""
echo "🗄️  Migration SQL:"
echo "   - supabase/migrations/20251006000012_mercadopago_bricks_system.sql"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✅ Tudo pronto para começar a implementação!${NC} 🚀"
echo ""
