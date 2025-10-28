#!/usr/bin/env bash
# Deploy Email Backend Infrastructure
# This script deploys edge functions, applies migrations, and configures the email system

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ARCO Email Backend Deployment       ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}✗ Supabase CLI not found${NC}"
    echo "Install: npm install -g supabase"
    exit 1
fi
echo -e "${GREEN}✓ Supabase CLI found${NC}"

# Check if project is linked
if [ ! -f .supabase/config.toml ]; then
    echo -e "${RED}✗ Supabase project not linked${NC}"
    echo "Run: supabase link --project-ref <your-project-ref>"
    exit 1
fi
echo -e "${GREEN}✓ Supabase project linked${NC}"

# Step 1: Apply database migration
echo ""
echo -e "${YELLOW}[1/4] Applying database migration...${NC}"
supabase db push
echo -e "${GREEN}✓ Database migration applied${NC}"

# Step 2: Deploy edge functions
echo ""
echo -e "${YELLOW}[2/4] Deploying edge functions...${NC}"

echo "  → Deploying send-email..."
supabase functions deploy send-email --no-verify-jwt

echo "  → Deploying process-email-queue..."
supabase functions deploy process-email-queue --no-verify-jwt

echo "  → Deploying resend-webhook..."
supabase functions deploy resend-webhook --no-verify-jwt

echo -e "${GREEN}✓ Edge functions deployed${NC}"

# Step 3: Set environment variables
echo ""
echo -e "${YELLOW}[3/4] Configuring environment variables...${NC}"

if [ -z "$RESEND_API_KEY" ]; then
    echo -e "${RED}⚠ RESEND_API_KEY not set${NC}"
    echo "Set it with: export RESEND_API_KEY=your_api_key"
    echo "Then run: supabase secrets set RESEND_API_KEY=\$RESEND_API_KEY"
else
    supabase secrets set RESEND_API_KEY="$RESEND_API_KEY"
    echo -e "${GREEN}✓ RESEND_API_KEY configured${NC}"
fi

# Step 4: Verify deployment
echo ""
echo -e "${YELLOW}[4/4] Verifying deployment...${NC}"

# Check functions
FUNCTIONS=$(supabase functions list 2>&1 | grep -E "send-email|process-email-queue|resend-webhook" || true)
if [ -z "$FUNCTIONS" ]; then
    echo -e "${RED}✗ Functions not deployed correctly${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Edge functions verified${NC}"

# Summary
echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         Deployment Complete!          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. Configure Resend Webhook:"
echo "   URL: https://<project-ref>.supabase.co/functions/v1/resend-webhook"
echo "   Events: email.sent, email.delivered, email.bounced, email.opened, email.clicked"
echo ""
echo "2. Set up Cron Job (in Supabase SQL Editor):"
echo "   See: docs/EMAIL_BACKEND_DEPLOYMENT.md (Section 5)"
echo ""
echo "3. Test email sending:"
echo "   curl -X POST https://<project-ref>.supabase.co/functions/v1/send-email \\"
echo "     -H \"Content-Type: application/json\" \\"
echo "     -d '{\"to\":\"test@example.com\",\"subject\":\"Test\",\"html\":\"<h1>Hello</h1>\"}'"
echo ""
echo "Full documentation: docs/EMAIL_BACKEND_DEPLOYMENT.md"
echo ""
