#!/bin/bash
# Quick Push - Landing Page Test Setup
# Pushes migration with test campaign to Supabase

set -e

echo "🚀 ARCO - Landing Page Test Setup"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if supabase CLI is available
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI not found${NC}"
    echo "Install: npm install -g supabase"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "supabase/config.toml" ]; then
    echo -e "${RED}❌ Not in project root (supabase/config.toml not found)${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Steps:${NC}"
echo "1. Push migration to Supabase"
echo "2. Verify campaign creation"
echo "3. Display access URL"
echo ""

# Ask for confirmation
read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo -e "${YELLOW}⏳ Pushing migration...${NC}"

# Push migrations
if supabase db push; then
    echo -e "${GREEN}✅ Migration pushed successfully${NC}"
else
    echo -e "${RED}❌ Migration push failed${NC}"
    echo ""
    echo "Troubleshooting:"
    echo "1. Check if Supabase is linked: supabase link"
    echo "2. Check credentials in .env"
    echo "3. Try: supabase db reset (WARNING: resets all data)"
    exit 1
fi

echo ""
echo -e "${YELLOW}⏳ Verifying campaign...${NC}"

# Verify campaign (requires psql or supabase db query)
if supabase db query "SELECT slug, is_active, hero_title FROM campaigns WHERE slug = 'salao-beleza-2024'" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Campaign verified${NC}"
    supabase db query "SELECT slug, is_active, hero_title FROM campaigns WHERE slug = 'salao-beleza-2024'"
else
    echo -e "${YELLOW}⚠️  Could not verify (but might exist)${NC}"
fi

echo ""
echo -e "${GREEN}=================================="
echo "✅ Setup Complete!"
echo "==================================${NC}"
echo ""
echo "🌐 Access your landing page at:"
echo -e "${GREEN}http://localhost:3000/lp/salao-beleza-2024${NC}"
echo ""
echo "📊 Test Performance:"
echo "1. Open Chrome DevTools → Network tab"
echo "2. Throttling → Fast 3G"
echo "3. Refresh and observe lazy loading"
echo "4. Run Lighthouse audit (target: 95+)"
echo ""
echo "📚 Documentation:"
echo "- Test Guide: docs/LP_TEST_GUIDE.md"
echo "- Implementation: docs/LP_IMPLEMENTATION_COMPLETE.md"
echo "- Optimization: docs/LP_PROGRESSIVE_ENHANCEMENT.md"
echo ""
