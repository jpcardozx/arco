#!/bin/bash

echo "🔍 Verifying Meta Pixel Integration..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

checks_passed=0
checks_total=0

# Check 1: MetaPixelProvider exists
checks_total=$((checks_total + 1))
if [ -f "src/providers/MetaPixelProvider.tsx" ]; then
  echo -e "${GREEN}✅${NC} MetaPixelProvider exists"
  checks_passed=$((checks_passed + 1))
else
  echo -e "${RED}❌${NC} MetaPixelProvider not found"
fi

# Check 2: meta-pixel library exists
checks_total=$((checks_total + 1))
if [ -f "src/lib/meta-pixel.ts" ]; then
  echo -e "${GREEN}✅${NC} Meta Pixel library exists"
  checks_passed=$((checks_passed + 1))
else
  echo -e "${RED}❌${NC} Meta Pixel library not found"
fi

# Check 3: useMetaTracking hook updated
checks_total=$((checks_total + 1))
if grep -q "window.fbq" src/hooks/useMetaTracking.ts; then
  echo -e "${GREEN}✅${NC} useMetaTracking hook has Pixel integration"
  checks_passed=$((checks_passed + 1))
else
  echo -e "${RED}❌${NC} useMetaTracking hook missing Pixel code"
fi

# Check 4: Layout wrapped with MetaPixelProvider
checks_total=$((checks_total + 1))
if grep -q "MetaPixelProvider" src/app/layout.tsx; then
  echo -e "${GREEN}✅${NC} Layout wrapped with MetaPixelProvider"
  checks_passed=$((checks_passed + 1))
else
  echo -e "${RED}❌${NC} Layout not wrapped with MetaPixelProvider"
fi

# Check 5: Pixel ID in code
checks_total=$((checks_total + 1))
if grep -q "1677581716961792" src/lib/meta-pixel.ts; then
  echo -e "${GREEN}✅${NC} Correct Pixel ID configured"
  checks_passed=$((checks_passed + 1))
else
  echo -e "${RED}❌${NC} Pixel ID not found or incorrect"
fi

# Check 6: Event ID generation in hook
checks_total=$((checks_total + 1))
if grep -q "generateEventId" src/hooks/useMetaTracking.ts; then
  echo -e "${GREEN}✅${NC} Event ID generation implemented"
  checks_passed=$((checks_passed + 1))
else
  echo -e "${RED}❌${NC} Event ID generation missing"
fi

# Check 7: FBP/FBC collection
checks_total=$((checks_total + 1))
if grep -q "getFBP\|getFBC" src/hooks/useMetaTracking.ts; then
  echo -e "${GREEN}✅${NC} FBP/FBC collection implemented"
  checks_passed=$((checks_passed + 1))
else
  echo -e "${RED}❌${NC} FBP/FBC collection missing"
fi

# Check 8: Documentation guide exists
checks_total=$((checks_total + 1))
if [ -f "docs/PIXEL_INTEGRATION_GUIDE.md" ]; then
  echo -e "${GREEN}✅${NC} Integration guide created"
  checks_passed=$((checks_passed + 1))
else
  echo -e "${RED}❌${NC} Integration guide not found"
fi

# Check 9: tsconfig excludes tests
checks_total=$((checks_total + 1))
if grep -q '"src/__tests__' tsconfig.json; then
  echo -e "${GREEN}✅${NC} Test files excluded from typecheck"
  checks_passed=$((checks_passed + 1))
else
  echo -e "${RED}❌${NC} Test exclusion missing from tsconfig"
fi

# Check 10: Dedup cache in hook
checks_total=$((checks_total + 1))
if grep -q "eventIdCacheRef\|3600000" src/hooks/useMetaTracking.ts; then
  echo -e "${GREEN}✅${NC} Dedup cache (1h TTL) implemented"
  checks_passed=$((checks_passed + 1))
else
  echo -e "${RED}❌${NC} Dedup cache missing"
fi

echo ""
echo "================================================"
echo -e "Results: ${GREEN}$checks_passed/$checks_total${NC} checks passed"
echo "================================================"

if [ $checks_passed -eq $checks_total ]; then
  echo -e "${GREEN}✅ All integration checks passed!${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Run: pnpm typecheck (should pass)"
  echo "2. Run: pnpm dev"
  echo "3. Test form submission in browser"
  echo "4. Check DevTools console for logs"
  echo "5. Verify events in Meta Events Manager"
  exit 0
else
  echo -e "${RED}❌ Some checks failed. Please review the implementation.${NC}"
  exit 1
fi
