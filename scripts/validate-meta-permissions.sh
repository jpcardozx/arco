#!/bin/bash

# Meta Permissions Validator
# Valida token Meta, env vars, Supabase secrets e Edge Function

echo "🔐 Meta Conversions API - Permission Validator"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_count=0
pass_count=0

# Helper functions
check_var() {
  local var_name=$1
  local var_value=${!var_name}

  if [ -z "$var_value" ]; then
    echo -e "${RED}✗${NC} $var_name: ${RED}NOT SET${NC}"
    ((check_count++))
    return 1
  else
    echo -e "${GREEN}✓${NC} $var_name: ${GREEN}OK${NC}"
    ((check_count++))
    ((pass_count++))
    return 0
  fi
}

echo "📋 Step 1: Environment Variables"
echo "================================"
source .env.local 2>/dev/null || true

check_var "META_DATASET_ID"
check_var "META_CONVERSION_API_TOKEN"
check_var "NEXT_PUBLIC_SUPABASE_URL"

echo ""
echo "🔑 Step 2: Meta Token Validation"
echo "================================"

if [ -z "$META_CONVERSION_API_TOKEN" ]; then
  echo -e "${RED}✗ Cannot validate token (not set)${NC}"
else
  echo "Testing token with Graph API..."
  response=$(curl -s -G https://graph.facebook.com/v24.0/me \
    -d "fields=id,name" \
    -d "access_token=$META_CONVERSION_API_TOKEN")

  if echo "$response" | grep -q '"id"'; then
    account_name=$(echo "$response" | grep -o '"name":"[^"]*' | cut -d'"' -f4)
    echo -e "${GREEN}✓ Token valid${NC}"
    echo "  Account: $account_name"
    ((check_count++))
    ((pass_count++))
  else
    echo -e "${RED}✗ Token invalid or expired${NC}"
    echo "  Response: $response"
    ((check_count++))
  fi
fi

echo ""
echo "📦 Step 3: Supabase Configuration"
echo "================================="

if command -v supabase &> /dev/null; then
  echo -e "${GREEN}✓${NC} Supabase CLI installed"
  ((check_count++))
  ((pass_count++))

  # Check if linked
  if [ -f ".supabase/config.toml" ]; then
    echo -e "${GREEN}✓${NC} Project linked"
    project_ref=$(grep "project_id" .supabase/config.toml 2>/dev/null | cut -d'"' -f2)
    echo "  Project: $project_ref"
    ((check_count++))
    ((pass_count++))
  else
    echo -e "${YELLOW}⚠${NC} Project not linked (run: supabase link)"
    ((check_count++))
  fi
else
  echo -e "${RED}✗${NC} Supabase CLI not installed"
  echo "  Install: npm install -g supabase"
  ((check_count++))
fi

echo ""
echo "🔐 Step 4: Supabase Secrets"
echo "=========================="

if command -v supabase &> /dev/null; then
  secrets=$(supabase secrets list 2>/dev/null)

  if echo "$secrets" | grep -q "META_DATASET_ID"; then
    echo -e "${GREEN}✓${NC} META_DATASET_ID secret set"
    ((check_count++))
    ((pass_count++))
  else
    echo -e "${YELLOW}⚠${NC} META_DATASET_ID secret not set"
    ((check_count++))
  fi

  if echo "$secrets" | grep -q "META_CONVERSION_API_TOKEN"; then
    echo -e "${GREEN}✓${NC} META_CONVERSION_API_TOKEN secret set"
    ((check_count++))
    ((pass_count++))
  else
    echo -e "${YELLOW}⚠${NC} META_CONVERSION_API_TOKEN secret not set"
    ((check_count++))
  fi
else
  echo -e "${YELLOW}⚠${NC} Cannot check secrets (Supabase CLI not installed)"
  ((check_count++))
fi

echo ""
echo "🚀 Step 5: Edge Function"
echo "======================="

edge_function_file="supabase/functions/meta-conversions-webhook/index.ts"

if [ -f "$edge_function_file" ]; then
  echo -e "${GREEN}✓${NC} Edge Function file exists"
  ((check_count++))
  ((pass_count++))

  if command -v supabase &> /dev/null; then
    functions=$(supabase functions list 2>/dev/null)
    if echo "$functions" | grep -q "meta-conversions-webhook"; then
      echo -e "${GREEN}✓${NC} Edge Function deployed"
      ((check_count++))
      ((pass_count++))
    else
      echo -e "${YELLOW}⚠${NC} Edge Function not deployed"
      echo "  Deploy: supabase functions deploy meta-conversions-webhook"
      ((check_count++))
    fi
  fi
else
  echo -e "${RED}✗${NC} Edge Function file not found"
  ((check_count++))
fi

echo ""
echo "🪝 Step 6: Hook Configuration"
echo "============================="

hook_file="src/hooks/useMetaTracking.ts"

if [ -f "$hook_file" ]; then
  echo -e "${GREEN}✓${NC} Hook file exists"
  ((check_count++))
  ((pass_count++))

  if grep -q "useMetaTracking" "$hook_file"; then
    echo -e "${GREEN}✓${NC} Hook exports useMetaTracking"
    ((check_count++))
    ((pass_count++))
  fi
else
  echo -e "${RED}✗${NC} Hook file not found"
  ((check_count++))
fi

echo ""
echo "📊 Summary"
echo "=========="
echo -e "Checks: ${GREEN}$pass_count passed${NC}, $((check_count - pass_count)) warnings/failed"

if [ $pass_count -eq $check_count ]; then
  echo -e "${GREEN}✅ All checks passed! Ready for testing.${NC}"
  exit 0
else
  echo -e "${YELLOW}⚠️  Some checks need attention. See above.${NC}"
  exit 1
fi
