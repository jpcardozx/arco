#!/bin/bash

echo "🚀 Testing Performance API"
echo "Target: https://google.com"
echo "⏱️  This will take 20-30 seconds..."
echo ""

START_TIME=$(date +%s)

curl -X POST http://localhost:3000/api/performance/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com","save_history":false}' \
  --max-time 60 \
  --silent | jq . > /tmp/perf-result.json

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

echo "⏱️  Request completed in ${ELAPSED}s"
echo ""
echo "📊 RESULTS:"
cat /tmp/perf-result.json | jq '{
  success,
  arco_index: .data.arco_index,
  lighthouse: .data.lighthouse,
  core_web_vitals: {
    lcp: .data.core_web_vitals.lcp,
    fid: .data.core_web_vitals.fid,
    cls: .data.core_web_vitals.cls
  },
  opportunities_count: (.data.opportunities | length),
  top_3_opportunities: [.data.opportunities[0:3][] | {title, savings_ms, impact}]
}'

echo ""
echo "Full response saved to: /tmp/perf-result.json"
