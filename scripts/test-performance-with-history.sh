#!/bin/bash

echo "🧪 Testing Performance API with save_history=true"
echo "Target: https://example.com"
echo "⏱️  Expected: 15-25 seconds..."
echo ""

START_TIME=$(date +%s)

curl -X POST http://localhost:3000/api/performance/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "strategy": "mobile",
    "save_history": true
  }' \
  --max-time 60 \
  --silent | jq . > /tmp/perf-with-history.json

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

echo "⏱️  Request completed in ${ELAPSED}s"
echo ""

# Extract analysis_id
ANALYSIS_ID=$(cat /tmp/perf-with-history.json | jq -r '.data.analysis_id // "null"')

echo "📊 RESULTS:"
cat /tmp/perf-with-history.json | jq '{
  success,
  analysis_id: .data.analysis_id,
  arco_index: .data.arco_index,
  lighthouse: .data.lighthouse
}'

echo ""

if [ "$ANALYSIS_ID" != "null" ]; then
  echo "✅ Analysis saved to database!"
  echo "Analysis ID: $ANALYSIS_ID"
  echo ""
  echo "🔍 Verifying in database..."
  
  # Check analysis_requests table
  npx supabase db execute "
    SELECT 
      id, 
      url, 
      status, 
      arco_index,
      created_at 
    FROM analysis_requests 
    WHERE id = '$ANALYSIS_ID';
  " 2>/dev/null
  
  echo ""
  echo "🔍 Checking analysis_results..."
  
  # Check analysis_results table
  npx supabase db execute "
    SELECT 
      request_id,
      lcp,
      fid,
      cls,
      lighthouse_performance,
      lighthouse_seo
    FROM analysis_results 
    WHERE request_id = '$ANALYSIS_ID';
  " 2>/dev/null
  
else
  echo "❌ Analysis was NOT saved (analysis_id is null)"
  echo ""
  echo "Error details:"
  cat /tmp/perf-with-history.json | jq '.error, .message'
fi

echo ""
echo "Full response: /tmp/perf-with-history.json"
