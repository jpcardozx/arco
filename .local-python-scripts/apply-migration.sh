#!/bin/bash

# =====================================================
# Apply Supabase Migration via REST API
# =====================================================

set -e

# Load environment
if [ ! -f .env.local ]; then
  echo "❌ .env.local not found"
  exit 1
fi

export $(grep -v '^#' .env.local | xargs)

# Validate credentials
if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "❌ SUPABASE_SERVICE_ROLE_KEY not found in .env.local"
  exit 1
fi

# Read migration SQL
MIGRATION_FILE="supabase/migrations/20251006000012_mercadopago_bricks_system.sql"

if [ ! -f "$MIGRATION_FILE" ]; then
  echo "❌ Migration file not found: $MIGRATION_FILE"
  exit 1
fi

echo "📄 Reading migration: $MIGRATION_FILE"

# Apply migration
echo "🚀 Applying migration to Supabase..."

RESPONSE=$(curl -s -X POST \
  "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"sql\": $(jq -Rs . < "$MIGRATION_FILE")}")

if echo "$RESPONSE" | grep -q "error"; then
  echo "❌ Migration failed:"
  echo "$RESPONSE" | jq .
  exit 1
fi

echo "✅ Migration applied successfully"

# Validate tables
echo ""
echo "🔍 Validating tables..."

TABLES=$(curl -s -X GET \
  "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/subscription_plans?select=count" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}")

if echo "$TABLES" | grep -q "error"; then
  echo "⚠️  Validation warning (tables may not be created yet)"
else
  echo "✅ Tables accessible"
fi

echo ""
echo "📊 Next steps:"
echo "1. Verify in Supabase Dashboard: ${NEXT_PUBLIC_SUPABASE_URL}"
echo "2. Configure webhook in Mercado Pago"
echo "3. Add MERCADOPAGO_WEBHOOK_SECRET to .env.local"
