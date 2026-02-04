#!/bin/bash

# 🧪 Test Analytics Logging System

echo "🔍 Testing Analytics API with detailed logging..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Valid request
echo "${YELLOW}Test 1: Valid analytics event${NC}"
response=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{
    "event": "begin_checkout",
    "planId": "essencial",
    "planName": "Essencial",
    "value": 249700,
    "currency": "BRL",
    "userId": "test-user-123",
    "metadata": {
      "testMode": true,
      "source": "debug-script"
    }
  }')

http_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | head -n -1)

if [ "$http_code" = "200" ]; then
  echo "${GREEN}✅ Status: $http_code${NC}"
  echo "Response: $body"
else
  echo "${RED}❌ Status: $http_code${NC}"
  echo "Response: $body"
fi
echo ""

# Test 2: Missing required field
echo "${YELLOW}Test 2: Missing planId (should fail validation)${NC}"
response=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{
    "event": "test_event",
    "userId": "test-user"
  }')

http_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | head -n -1)

if [ "$http_code" = "400" ]; then
  echo "${GREEN}✅ Status: $http_code (expected)${NC}"
  echo "Response: $body"
else
  echo "${RED}❌ Status: $http_code (expected 400)${NC}"
  echo "Response: $body"
fi
echo ""

# Test 3: CORS preflight
echo "${YELLOW}Test 3: CORS preflight (OPTIONS)${NC}"
response=$(curl -s -w "\n%{http_code}" -X OPTIONS http://localhost:3000/api/analytics/track \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST")

http_code=$(echo "$response" | tail -n 1)

if [ "$http_code" = "200" ]; then
  echo "${GREEN}✅ Status: $http_code${NC}"
  echo "CORS preflight passed"
else
  echo "${RED}❌ Status: $http_code${NC}"
fi
echo ""

# Test 4: Multiple events (rate limit test)
echo "${YELLOW}Test 4: Rate limiting (10 requests)${NC}"
success=0
failed=0

for i in {1..10}; do
  http_code=$(curl -s -w "%{http_code}" -o /dev/null -X POST http://localhost:3000/api/analytics/track \
    -H "Content-Type: application/json" \
    -d "{
      \"event\": \"test_event_$i\",
      \"planId\": \"essencial\",
      \"timestamp\": $(date +%s)
    }")
  
  if [ "$http_code" = "200" ]; then
    success=$((success + 1))
    echo -n "."
  elif [ "$http_code" = "429" ]; then
    failed=$((failed + 1))
    echo -n "x"
  else
    echo -n "?"
  fi
done
echo ""
echo "${GREEN}✅ Success: $success${NC} | ${RED}❌ Rate limited: $failed${NC}"
echo ""

echo "📊 Summary:"
echo "- Check server logs for detailed tracking info"
echo "- Look for [Analytics API] and [Analytics] prefixes"
echo "- Verify structured logging with context"
echo ""
echo "🚀 Tests complete!"
