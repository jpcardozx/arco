#!/bin/bash

# 🔍 Debug Build Script - Senior Level
# Usage: ./scripts/debug-build.sh

echo "🔍 Starting Next.js Build Debug..."
echo "=================================="

# Clean old artifacts
echo ""
echo "🧹 Cleaning..."
pnpm clean

# Check for common issues
echo ""
echo "📊 Checking for common SSR issues..."

# 1. Check for window/document usage
echo "1️⃣  Checking for unsafe browser globals..."
grep -r "window\." src --include="*.tsx" --include="*.ts" | grep -v "typeof window" | grep -v "// " | head -20

echo ""
echo "2️⃣  Checking for unsafe document usage..."
grep -r "document\." src --include="*.tsx" --include="*.ts" | grep -v "typeof document" | grep -v "// " | head -20

echo ""
echo "3️⃣  Checking for 'use client' directives..."
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "'use client'" | wc -l
echo "Total client components found"

echo ""
echo "4️⃣  Checking for dynamic imports without ssr: false..."
grep -r "dynamic(" src --include="*.tsx" --include="*.ts" -A 2 | grep -v "ssr: false" | head -20

# Build with verbose logging
echo ""
echo "🏗️  Starting build with verbose logging..."
echo "=================================="

# Run build and capture output
NODE_OPTIONS='--trace-warnings --max-old-space-size=4096' \
NEXT_DEBUG=1 \
pnpm build 2>&1 | tee build-debug.log

# Check exit code
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo "📄 Full log saved to: build-debug.log"
else
    echo ""
    echo "❌ Build failed!"
    echo ""
    echo "🔍 Analyzing errors..."
    echo "=================================="
    
    # Extract error information
    echo ""
    echo "📍 Error locations:"
    grep -i "error" build-debug.log | head -10
    
    echo ""
    echo "📍 Failed pages:"
    grep "Error occurred prerendering" build-debug.log
    
    echo ""
    echo "📍 TypeErrors:"
    grep -A 5 "TypeError" build-debug.log | head -20
    
    echo ""
    echo "💡 Common fixes:"
    echo "- Add 'use client' to components using browser APIs"
    echo "- Use dynamic imports with ssr: false for Three.js/Canvas"
    echo "- Check for window/document without typeof checks"
    echo "- Wrap browser-only code in useEffect"
    
    echo ""
    echo "📄 Full log saved to: build-debug.log"
    exit 1
fi
