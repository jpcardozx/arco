#!/bin/bash
echo "🧪 ARCO Integration Test Suite"
echo "================================"
echo ""

echo "1️⃣ Validando Resend..."
npx tsx scripts/verify-resend.ts 2>&1 | grep -E "(✅|❌|📧)"
echo ""

echo "2️⃣ Verificando Meta Pixel config..."
grep -q "META_DATASET_ID" .env.local && echo "✅ META_DATASET_ID found" || echo "❌ META_DATASET_ID missing"
grep -q "META_CONVERSION_API_TOKEN" .env.local && echo "✅ META_CONVERSION_API_TOKEN found" || echo "❌ Missing"
echo ""

echo "3️⃣ Verificando arquivos modificados..."
ls -lh src/components/sections/URLAnalyzerSection.tsx 2>/dev/null && echo "✅ URLAnalyzerSection exists" || echo "❌ Missing"
ls -lh src/components/sections/PremiumHeroSection.tsx 2>/dev/null && echo "✅ PremiumHeroSection exists" || echo "❌ Missing"
ls -lh src/app/api/email/domain-analysis/route.ts 2>/dev/null && echo "✅ Email API created" || echo "❌ Missing"
echo ""

echo "4️⃣ Documentação gerada..."
ls -lh INTEGRATION_COMPLETE_SUMMARY.md 2>/dev/null && echo "✅ Summary created" || echo "❌ Missing"
ls -lh LANDING_PAGE_TRACKING_IMPLEMENTATION.md 2>/dev/null && echo "✅ Tracking docs created" || echo "❌ Missing"
ls -lh RESEND_EMAIL_STATUS_REPORT.md 2>/dev/null && echo "✅ Email docs created" || echo "❌ Missing"
echo ""

echo "🎉 Integration test complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Review docs: INTEGRATION_COMPLETE_SUMMARY.md"
echo "  2. Test locally: pnpm dev"
echo "  3. Deploy: git push origin main"
