#!/bin/bash

# ARCO Chrome DevTools MCP - Quick Test Script
# Tests the integration with sample scenarios

set -e

echo "🧪 Testing ARCO Chrome DevTools MCP Integration"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if dev server is running
echo -e "${BLUE}ℹ️  Checking if ARCO dev server is running...${NC}"
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✅ Dev server is running${NC}"
else
    echo -e "${YELLOW}⚠️  Dev server not detected. Starting it...${NC}"
    cd "$(dirname "$0")/../.."
    npm run dev &
    DEV_SERVER_PID=$!
    echo "Waiting for server to start..."
    sleep 5
fi

echo ""
echo -e "${BLUE}📋 Available Test Scenarios:${NC}"
echo "1. Performance Analysis"
echo "2. Visual Regression Test"
echo "3. Accessibility Scan"
echo "4. Network Analysis"
echo "5. Complete Pre-Deployment Check"
echo ""

read -p "Select test scenario (1-5): " SCENARIO

case $SCENARIO in
    1)
        echo ""
        echo -e "${BLUE}🚀 Testing Performance Analysis...${NC}"
        echo ""
        echo "Test Command: arco_analyze_performance"
        echo "Parameters:"
        echo "  - url: http://localhost:3000"
        echo "  - device: desktop"
        echo "  - captureScreenshots: true"
        echo ""
        echo "Expected Output:"
        echo "  - Performance metrics"
        echo "  - Core Web Vitals (LCP, FID, CLS)"
        echo "  - Optimization recommendations"
        echo ""
        ;;
    
    2)
        echo ""
        echo -e "${BLUE}📸 Testing Visual Regression...${NC}"
        echo ""
        echo "Test Command: arco_visual_regression"
        echo "Parameters:"
        echo "  - component: PremiumHeroSection"
        echo "  - threshold: 0.01"
        echo ""
        echo "Expected Output:"
        echo "  - Screenshot comparison"
        echo "  - Pixel difference percentage"
        echo "  - Pass/Fail status"
        echo ""
        ;;
    
    3)
        echo ""
        echo -e "${BLUE}♿ Testing Accessibility Scan...${NC}"
        echo ""
        echo "Test Command: arco_accessibility_scan"
        echo "Parameters:"
        echo "  - url: http://localhost:3000"
        echo "  - wcagLevel: AA"
        echo ""
        echo "Expected Output:"
        echo "  - WCAG violations by severity"
        echo "  - Accessibility score"
        echo "  - Fix recommendations"
        echo ""
        ;;
    
    4)
        echo ""
        echo -e "${BLUE}🌐 Testing Network Analysis...${NC}"
        echo ""
        echo "Test Command: arco_analyze_network"
        echo "Parameters:"
        echo "  - url: http://localhost:3000"
        echo "  - includeThirdParty: true"
        echo ""
        echo "Expected Output:"
        echo "  - Request count and sizes"
        echo "  - Slow requests (>1s)"
        echo "  - Large payloads (>1MB)"
        echo "  - Optimization opportunities"
        echo ""
        ;;
    
    5)
        echo ""
        echo -e "${BLUE}🎯 Testing Complete Pre-Deployment Check...${NC}"
        echo ""
        echo "Running all checks:"
        echo "  1. Performance Analysis"
        echo "  2. Lighthouse Audit"
        echo "  3. Accessibility Scan"
        echo "  4. Visual Regression"
        echo "  5. Network Analysis"
        echo "  6. Console Error Monitoring"
        echo ""
        echo "This will take approximately 2-3 minutes..."
        echo ""
        ;;
    
    *)
        echo -e "${YELLOW}Invalid selection${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Test scenario configured!${NC}"
echo ""
echo "To actually run this test with an AI assistant:"
echo ""
echo -e "${YELLOW}1. Ensure Chrome DevTools MCP is configured in your MCP client"
echo "2. Ask your AI assistant:"
echo ""

case $SCENARIO in
    1)
        echo "   \"Analyze the performance of http://localhost:3000 using ARCO Chrome DevTools\""
        ;;
    2)
        echo "   \"Run visual regression test on PremiumHeroSection\""
        ;;
    3)
        echo "   \"Run accessibility scan on ARCO homepage for WCAG AA compliance\""
        ;;
    4)
        echo "   \"Analyze network requests on ARCO homepage\""
        ;;
    5)
        echo "   \"Run complete pre-deployment checks on ARCO\""
        ;;
esac

echo -e "${NC}"
echo ""
echo "📚 Documentation: mcp/integrations/chrome-devtools-mcp.md"
echo ""

# Cleanup
if [ ! -z "$DEV_SERVER_PID" ]; then
    echo "Stopping dev server..."
    kill $DEV_SERVER_PID 2>/dev/null || true
fi
