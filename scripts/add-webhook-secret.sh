#!/bin/bash

# =====================================================
# Quick Add: Mercado Pago Webhook Secret
# =====================================================

set -e

echo "🔐 Adding MERCADOPAGO_WEBHOOK_SECRET"
echo ""

# Prompt for secret
read -p "Paste webhook secret from Mercado Pago panel: " WEBHOOK_SECRET

if [ -z "$WEBHOOK_SECRET" ]; then
  echo "❌ Error: Secret cannot be empty"
  exit 1
fi

# Validate format (basic check)
if [ ${#WEBHOOK_SECRET} -lt 20 ]; then
  echo "⚠️  Warning: Secret seems too short. Continue anyway? (y/n)"
  read -p "> " CONTINUE
  if [ "$CONTINUE" != "y" ]; then
    exit 1
  fi
fi

# Add to .env.local
if grep -q "MERCADOPAGO_WEBHOOK_SECRET" .env.local 2>/dev/null; then
  echo "⚠️  MERCADOPAGO_WEBHOOK_SECRET already exists in .env.local"
  read -p "Replace? (y/n): " REPLACE
  if [ "$REPLACE" = "y" ]; then
    sed -i "/MERCADOPAGO_WEBHOOK_SECRET/d" .env.local
    echo "MERCADOPAGO_WEBHOOK_SECRET=\"$WEBHOOK_SECRET\"" >> .env.local
    echo "✅ Updated in .env.local"
  fi
else
  echo "" >> .env.local
  echo "# Mercado Pago Webhook" >> .env.local
  echo "MERCADOPAGO_WEBHOOK_SECRET=\"$WEBHOOK_SECRET\"" >> .env.local
  echo "✅ Added to .env.local"
fi

echo ""
echo "📝 Next steps:"
echo "1. Add to Vercel:"
echo "   npx vercel env add MERCADOPAGO_WEBHOOK_SECRET production"
echo ""
echo "2. Or via dashboard:"
echo "   https://vercel.com/jpcardozx/arco/settings/environment-variables"
echo ""
echo "3. Implement webhook handler:"
echo "   src/app/api/webhooks/mercadopago/route.ts"
echo ""
