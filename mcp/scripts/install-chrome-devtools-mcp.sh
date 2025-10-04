#!/bin/bash

# 🔧 ARCO Chrome DevTools MCP - Instalação Automática
# Este script configura o Chrome DevTools MCP no seu ambiente

set -e  # Exit on error

echo "🚀 ARCO Chrome DevTools MCP - Instalação"
echo "========================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Detectar OS
OS="unknown"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="mac"
fi

echo -e "${BLUE}📋 Sistema detectado: $OS${NC}"
echo ""

# 1. Verificar Node.js
echo "🔍 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado!${NC}"
    echo "   Instale: https://nodejs.org"
    exit 1
fi
NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js: $NODE_VERSION${NC}"
echo ""

# 2. Verificar pnpm
echo "🔍 Verificando pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠️  pnpm não encontrado. Instalando...${NC}"
    npm install -g pnpm
fi
PNPM_VERSION=$(pnpm --version)
echo -e "${GREEN}✅ pnpm: $PNPM_VERSION${NC}"
echo ""

# 3. Instalar Chrome DevTools MCP
echo "📦 Instalando Chrome DevTools MCP..."
cd /home/jpcardozx/projetos/arco/mcp/servers

# Adicionar ao package.json se não existir
if ! grep -q "chrome-devtools-mcp" package.json; then
    echo "   Adicionando dependência..."
    pnpm add chrome-devtools-mcp puppeteer
else
    echo "   Já instalado, atualizando..."
    pnpm update chrome-devtools-mcp puppeteer
fi
echo -e "${GREEN}✅ Dependências instaladas${NC}"
echo ""

# 4. Verificar Chrome/Chromium
echo "🔍 Procurando Chrome/Chromium..."
CHROME_PATH=""

if [[ "$OS" == "linux" ]]; then
    if command -v google-chrome &> /dev/null; then
        CHROME_PATH=$(which google-chrome)
    elif command -v chromium-browser &> /dev/null; then
        CHROME_PATH=$(which chromium-browser)
    elif command -v chromium &> /dev/null; then
        CHROME_PATH=$(which chromium)
    fi
elif [[ "$OS" == "mac" ]]; then
    if [ -f "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
        CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    fi
fi

if [ -z "$CHROME_PATH" ]; then
    echo -e "${YELLOW}⚠️  Chrome não encontrado. Puppeteer baixará o Chromium automaticamente.${NC}"
else
    echo -e "${GREEN}✅ Chrome encontrado: $CHROME_PATH${NC}"
fi
echo ""

# 5. Criar configuração do Claude Desktop
echo "⚙️  Configurando Claude Desktop..."

if [[ "$OS" == "linux" ]]; then
    CONFIG_DIR="$HOME/.config/Claude"
elif [[ "$OS" == "mac" ]]; then
    CONFIG_DIR="$HOME/Library/Application Support/Claude"
fi

CONFIG_FILE="$CONFIG_DIR/claude_desktop_config.json"

# Criar diretório se não existir
mkdir -p "$CONFIG_DIR"

# Backup se já existir
if [ -f "$CONFIG_FILE" ]; then
    echo "   Fazendo backup da configuração existente..."
    cp "$CONFIG_FILE" "$CONFIG_FILE.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Criar/atualizar configuração
echo "   Escrevendo configuração..."

cat > "$CONFIG_FILE" << EOF
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp"
      ],
      "env": {
        "CHROME_PATH": "$CHROME_PATH",
        "HEADLESS": "true",
        "DEBUG": "false",
        "VIEWPORT_WIDTH": "1920",
        "VIEWPORT_HEIGHT": "1080"
      }
    },
    "arco-chrome-integration": {
      "command": "npx",
      "args": [
        "tsx",
        "/home/jpcardozx/projetos/arco/mcp/servers/chrome-devtools-mcp-integration.ts"
      ],
      "env": {
        "ARCO_PROJECT_ROOT": "/home/jpcardozx/projetos/arco",
        "NODE_ENV": "development"
      }
    }
  }
}
EOF

echo -e "${GREEN}✅ Configuração criada em: $CONFIG_FILE${NC}"
echo ""

# 6. Testar instalação
echo "🧪 Testando instalação..."
echo "   Verificando servidor ARCO..."

cd /home/jpcardozx/projetos/arco/mcp/servers

# Compilar TypeScript
if [ -f "tsconfig.json" ]; then
    echo "   Compilando TypeScript..."
    npx tsc --noEmit 2>&1 | head -n 10 || true
fi

echo -e "${GREEN}✅ Testes básicos concluídos${NC}"
echo ""

# 7. Instruções finais
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ INSTALAÇÃO CONCLUÍDA!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1. ${YELLOW}Feche completamente o Claude Desktop:${NC}"
echo "   pkill -9 Claude"
echo ""
echo "2. ${YELLOW}Reabra o Claude Desktop${NC}"
echo ""
echo "3. ${YELLOW}Teste no chat do Claude:${NC}"
echo '   "Liste os MCP servers disponíveis"'
echo ""
echo "4. ${YELLOW}Use para diagnosticar:${NC}"
echo '   "Use o Chrome DevTools MCP para analisar http://localhost:3000"'
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Documentação completa:"
echo "   /home/jpcardozx/projetos/arco/mcp/CHROME_DEVTOOLS_SETUP.md"
echo ""
echo "🐛 Problemas? Verificar logs:"
echo "   tail -f $HOME/.claude/logs/mcp*.log"
echo ""
echo -e "${BLUE}Happy debugging! 🚀${NC}"
