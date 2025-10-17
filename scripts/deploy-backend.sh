#!/bin/bash
# =====================================================
# ARCO - Backend Deployment Script
# Data: 2025-10-08
# =====================================================

set -e

echo "🚀 ARCO Backend Deployment Script"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check environment
echo "📋 Step 1: Checking environment..."
if [ ! -f .env.local ]; then
    echo -e "${RED}❌ .env.local not found${NC}"
    exit 1
fi

# Check required env vars
required_vars=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "SUPABASE_SERVICE_ROLE_KEY"
    "NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY"
    "MERCADOPAGO_ACCESS_TOKEN"
)

for var in "${required_vars[@]}"; do
    if ! grep -q "^$var=" .env.local; then
        echo -e "${RED}❌ Missing $var in .env.local${NC}"
        exit 1
    fi
done

echo -e "${GREEN}✅ Environment variables OK${NC}"
echo ""

# Step 2: Install dependencies
echo "📦 Step 2: Installing dependencies..."
pnpm install
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 3: Type check
echo "🔍 Step 3: Running TypeScript check..."
npx tsc --noEmit
echo -e "${GREEN}✅ Type check passed${NC}"
echo ""

# Step 4: Build
echo "🏗️  Step 4: Building application..."
pnpm build
echo -e "${GREEN}✅ Build successful${NC}"
echo ""

# Step 5: Migrations info
echo "🗄️  Step 5: Database Migrations"
echo -e "${YELLOW}⚠️  Manual step required:${NC}"
echo ""
echo "1. Access Supabase Dashboard SQL Editor:"
echo "   https://supabase.com/dashboard/project/YOUR_PROJECT/database"
echo ""
echo "2. Apply migrations (if not already applied):"
echo "   - supabase/migrations/20251006000012_mercadopago_bricks_system.sql"
echo "   - supabase/migrations/20251008000001_webhook_processing_functions.sql"
echo ""
echo "3. Verify tables exist:"
echo "   SELECT * FROM subscription_plans;"
echo "   SELECT * FROM subscriptions LIMIT 1;"
echo ""
read -p "Press ENTER when migrations are applied..."
echo -e "${GREEN}✅ Migrations confirmed${NC}"
echo ""

# Step 6: Webhook config
echo "🔗 Step 6: Webhook Configuration"
echo -e "${YELLOW}⚠️  Manual step required:${NC}"
echo ""
echo "1. Access Mercado Pago Dashboard:"
echo "   https://www.mercadopago.com.br/developers/panel"
echo ""
echo "2. Configure webhook URL:"
echo "   URL: https://your-domain.com/api/webhooks/mercadopago/v2"
echo "   Events: ☑️ payment, ☑️ merchant_order"
echo ""
read -p "Press ENTER when webhook is configured..."
echo -e "${GREEN}✅ Webhook confirmed${NC}"
echo ""

# Step 7: Test webhook (optional)
echo "🧪 Step 7: Test webhook (optional)"
echo ""
echo "Send a test webhook from MP Dashboard and check:"
echo ""
echo "  SELECT * FROM webhook_events ORDER BY created_at DESC LIMIT 5;"
echo ""
read -p "Skip test? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Waiting for webhook test..."
    echo "Check logs: tail -f logs/app.log"
    echo ""
    read -p "Press ENTER when test is complete..."
fi
echo ""

# Step 8: Deploy
echo "🚀 Step 8: Deploy"
echo ""
echo "Choose deployment method:"
echo "1. Vercel (recommended)"
echo "2. Manual/Docker"
echo ""
read -p "Enter choice (1 or 2): " deploy_choice
echo ""

if [ "$deploy_choice" = "1" ]; then
    echo "Deploying to Vercel..."
    if ! command -v vercel &> /dev/null; then
        echo -e "${RED}❌ Vercel CLI not installed${NC}"
        echo "Install with: npm i -g vercel"
        exit 1
    fi
    vercel --prod
    echo -e "${GREEN}✅ Deployed to Vercel${NC}"
elif [ "$deploy_choice" = "2" ]; then
    echo "Manual deployment:"
    echo "1. Upload .next/ folder to server"
    echo "2. Copy package.json and pnpm-lock.yaml"
    echo "3. Run: pnpm install --prod"
    echo "4. Run: pnpm start"
    echo ""
    read -p "Press ENTER when deployment is complete..."
else
    echo -e "${RED}❌ Invalid choice${NC}"
    exit 1
fi
echo ""

# Step 9: Verify
echo "✅ Step 9: Post-deployment verification"
echo ""
echo "1. Check health endpoint:"
echo "   curl -I https://your-domain.com/api/webhooks/mercadopago/v2"
echo ""
echo "2. Verify Supabase connection:"
echo "   SELECT COUNT(*) FROM subscription_plans;"
echo ""
echo "3. Test payment flow:"
echo "   - Visit: https://your-domain.com/checkout/pro"
echo "   - Complete payment"
echo "   - Verify redirect to /success"
echo ""
echo "4. Check metrics:"
echo "   SELECT public.calculate_mrr();"
echo ""
read -p "Press ENTER to finish..."
echo ""

echo "=================================="
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Monitor logs for errors"
echo "2. Test complete payment flow"
echo "3. Configure monitoring (optional)"
echo "4. Setup N8N workflows (optional)"
echo ""
echo "📚 Documentation: BACKEND_SUPABASE_COMPLETE.md"
echo ""
