#!/bin/bash

# ARCO Chrome DevTools MCP - Setup Script
# Installs and configures Chrome DevTools MCP integration

set -e

echo "🚀 ARCO Chrome DevTools MCP Setup"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js version
echo "📋 Checking prerequisites..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo -e "${RED}❌ Node.js 20 or higher is required${NC}"
    echo "Current version: $(node -v)"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v) detected${NC}"

# Check if Chrome is installed
if command -v google-chrome &> /dev/null; then
    CHROME_VERSION=$(google-chrome --version)
    echo -e "${GREEN}✅ $CHROME_VERSION detected${NC}"
elif command -v chromium &> /dev/null; then
    CHROME_VERSION=$(chromium --version)
    echo -e "${GREEN}✅ $CHROME_VERSION detected${NC}"
else
    echo -e "${YELLOW}⚠️  Chrome/Chromium not detected. Installation recommended.${NC}"
fi

echo ""
echo "📦 Installing Chrome DevTools MCP..."
npm install -g chrome-devtools-mcp@latest

echo ""
echo "🔨 Building ARCO integration..."
cd "$(dirname "$0")/.."
npx tsc servers/chrome-devtools-mcp-integration.ts --outDir servers/

if [ -f "servers/chrome-devtools-mcp-integration.js" ]; then
    echo -e "${GREEN}✅ Integration built successfully${NC}"
else
    echo -e "${RED}❌ Failed to build integration${NC}"
    exit 1
fi

echo ""
echo "⚙️  Configuration Examples"
echo "=========================="
echo ""
echo "For Claude Desktop (~/.config/Claude/claude_desktop_config.json):"
echo ""
cat << 'EOF'
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    },
    "arco-chrome-devtools": {
      "command": "node",
      "args": ["/home/jpcardozx/projetos/arco/mcp/servers/chrome-devtools-mcp-integration.js"]
    }
  }
}
EOF

echo ""
echo "For Cursor/VS Code Copilot (.vscode/settings.json):"
echo ""
cat << 'EOF'
{
  "mcp.servers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "--headless=false"]
    },
    "arco-chrome-devtools": {
      "command": "node",
      "args": ["${workspaceFolder}/mcp/servers/chrome-devtools-mcp-integration.js"]
    }
  }
}
EOF

echo ""
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "📚 Next Steps:"
echo "1. Add the configuration to your MCP client"
echo "2. Restart your MCP client"
echo "3. Test with: 'Check the performance of http://localhost:3000'"
echo ""
echo "📖 Full documentation: mcp/integrations/chrome-devtools-mcp.md"
echo ""
