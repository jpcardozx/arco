#!/bin/bash

# 🎯 ARCO Payment System - Daily Planning Script
# Executa planejamento diário e tracking de progresso

set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo "${BLUE}║        ARCO Payment System - Daily Planning            ║${NC}"
echo "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Read planning file
PLANNING_FILE="PLANEJAMENTO_EXECUTIVO.md"

if [ ! -f "$PLANNING_FILE" ]; then
    echo "${RED}❌ Planning file not found: $PLANNING_FILE${NC}"
    exit 1
fi

echo "${YELLOW}📋 Current Planning Status:${NC}"
echo ""

# Check Phase 1 status
echo "${YELLOW}🔴 FASE 1: VALIDAÇÃO LOCAL (1h)${NC}"
echo "   Task 1.1: Manual Testing Completo (30min)"
echo "   Task 1.2: Automated Tests (15min)"
echo "   Task 1.3: Analytics & Logs Validation (15min)"
echo ""

# Check if dev server is running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "${GREEN}   ✅ Dev server running on port 3000${NC}"
else
    echo "${RED}   ❌ Dev server not running${NC}"
    echo "${YELLOW}   → Start with: pnpm dev${NC}"
fi

# Check test page accessibility
if curl -s http://localhost:3000/checkout/test >/dev/null 2>&1; then
    echo "${GREEN}   ✅ Test page accessible${NC}"
else
    echo "${RED}   ❌ Test page not accessible${NC}"
fi

# Check if automated tests pass
echo ""
echo "${YELLOW}Running automated tests...${NC}"
if bash scripts/run-tests.sh > /dev/null 2>&1; then
    echo "${GREEN}   ✅ Automated tests passing${NC}"
else
    echo "${RED}   ❌ Some automated tests failing${NC}"
    echo "${YELLOW}   → Run: bash scripts/run-tests.sh${NC}"
fi

# Check Phase 2 readiness
echo ""
echo "${YELLOW}🟡 FASE 2: WEBHOOK TESTING (1h)${NC}"
if command -v ngrok &> /dev/null; then
    echo "${GREEN}   ✅ ngrok installed${NC}"
else
    echo "${RED}   ❌ ngrok not installed${NC}"
    echo "${YELLOW}   → Install: npm install -g ngrok${NC}"
fi

# Check Phase 3 readiness
echo ""
echo "${YELLOW}🟢 FASE 3: DEPLOY PRODUÇÃO (1h)${NC}"

# Check if build works
echo "${YELLOW}Checking build...${NC}"
if pnpm build > /dev/null 2>&1; then
    echo "${GREEN}   ✅ Production build successful${NC}"
else
    echo "${RED}   ❌ Build has errors${NC}"
    echo "${YELLOW}   → Run: pnpm build${NC}"
fi

# Environment variables check
echo ""
echo "${YELLOW}🔐 Environment Variables:${NC}"

required_vars=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "SUPABASE_SERVICE_ROLE_KEY"
    "MERCADOPAGO_ACCESS_TOKEN"
    "MERCADOPAGO_PUBLIC_KEY"
    "MERCADOPAGO_WEBHOOK_SECRET"
)

all_vars_present=true
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "${RED}   ❌ $var not set${NC}"
        all_vars_present=false
    else
        echo "${GREEN}   ✅ $var set${NC}"
    fi
done

# Progress summary
echo ""
echo "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo "${YELLOW}📊 Progress Summary:${NC}"
echo ""

# Calculate progress
progress=0
total_tasks=12

# Phase 1
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    ((progress++))
fi

if curl -s http://localhost:3000/checkout/test >/dev/null 2>&1; then
    ((progress++))
fi

if bash scripts/run-tests.sh > /dev/null 2>&1; then
    progress=$((progress + 3))
fi

# Phase 2
if command -v ngrok &> /dev/null; then
    ((progress++))
fi

# Phase 3
if pnpm build > /dev/null 2>&1; then
    progress=$((progress + 2))
fi

if [ "$all_vars_present" = true ]; then
    progress=$((progress + 2))
fi

percentage=$((progress * 100 / total_tasks))

echo "${YELLOW}Overall Progress: ${percentage}%${NC}"
echo ""

# Progress bar
bar_length=50
filled=$((percentage * bar_length / 100))
empty=$((bar_length - filled))

printf "${GREEN}"
for ((i=0; i<filled; i++)); do printf "█"; done
printf "${NC}"
for ((i=0; i<empty; i++)); do printf "░"; done
printf " ${percentage}%%\n"

echo ""
echo "${BLUE}═══════════════════════════════════════════════════════════${NC}"

# Next steps
echo ""
echo "${YELLOW}🚀 Next Steps:${NC}"
echo ""

if [ "$percentage" -lt 50 ]; then
    echo "1. ${YELLOW}Start dev server:${NC} pnpm dev"
    echo "2. ${YELLOW}Open test page:${NC} http://localhost:3000/checkout/test"
    echo "3. ${YELLOW}Follow manual testing checklist${NC} in Task 1.1"
elif [ "$percentage" -lt 75 ]; then
    echo "1. ${YELLOW}Install ngrok:${NC} npm install -g ngrok"
    echo "2. ${YELLOW}Run ngrok:${NC} ngrok http 3000"
    echo "3. ${YELLOW}Configure webhook${NC} in MP Dashboard"
    echo "4. ${YELLOW}Test real webhook flow${NC}"
else
    echo "1. ${YELLOW}Verify all env vars${NC} for production"
    echo "2. ${YELLOW}Run final build:${NC} pnpm build"
    echo "3. ${YELLOW}Deploy to production${NC}"
    echo "4. ${YELLOW}Configure production webhook${NC}"
    echo "5. ${YELLOW}Run smoke tests${NC}"
fi

echo ""
echo "${GREEN}📖 Full planning: $PLANNING_FILE${NC}"
echo "${GREEN}🧪 Test guide: TESTING_GUIDE.md${NC}"
echo ""

exit 0
