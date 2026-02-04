#!/bin/bash

# Apply Mercado Pago migration directly via psql
# Bypasses Supabase CLI migration tracking

set -e

source .env.local

# Connection string
SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL}"
PROJECT_REF=$(echo "$SUPABASE_URL" | grep -oP '//\K[^.]+')

echo "🔗 Connecting to Supabase project: $PROJECT_REF"

# Install psql if needed (skip if already installed)
if ! command -v psql &> /dev/null; then
    echo "⚠️  psql not found. Install with: sudo apt install postgresql-client"
    exit 1
fi

# Apply migration
echo "📄 Applying: supabase/migrations/20251006000012_mercadopago_bricks_system.sql"

PGPASSWORD="$SUPABASE_SERVICE_ROLE_KEY" psql \
    -h "aws-0-us-east-1.pooler.supabase.com" \
    -p 5432 \
    -U "postgres.${PROJECT_REF}" \
    -d "postgres" \
    -f "supabase/migrations/20251006000012_mercadopago_bricks_system.sql"

echo "✅ Migration applied"

# Validate
echo ""
echo "🔍 Validating tables..."

PGPASSWORD="$SUPABASE_SERVICE_ROLE_KEY" psql \
    -h "aws-0-us-east-1.pooler.supabase.com" \
    -p 5432 \
    -U "postgres.${PROJECT_REF}" \
    -d "postgres" \
    -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('subscription_plans','payment_methods','subscriptions','payment_transactions','webhook_events');"

echo ""
echo "🎉 Done! Verify in dashboard: ${SUPABASE_URL}"
