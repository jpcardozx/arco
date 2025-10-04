#!/bin/bash
# Script de teste rápido do Chrome DevTools MCP
# Uso: ./test-chrome-mcp.sh

set -e

echo "🧪 Testando Chrome DevTools MCP..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Teste 1: Verificar instalação
echo -e "${YELLOW}Teste 1: Verificando instalação...${NC}"
if npx chrome-devtools-mcp@latest --version > /dev/null 2>&1; then
    VERSION=$(npx chrome-devtools-mcp@latest --version 2>&1 | grep -oP '\d+\.\d+\.\d+' | head -1)
    echo -e "${GREEN}✓ chrome-devtools-mcp instalado: v${VERSION}${NC}"
else
    echo -e "${RED}✗ Erro ao verificar instalação${NC}"
    exit 1
fi
echo ""

# Teste 2: Verificar dependências do Chrome (Linux)
echo -e "${YELLOW}Teste 2: Verificando dependências do Chrome...${NC}"
if command -v google-chrome &> /dev/null; then
    CHROME_VERSION=$(google-chrome --version)
    echo -e "${GREEN}✓ Chrome instalado: ${CHROME_VERSION}${NC}"
elif command -v chromium &> /dev/null; then
    CHROMIUM_VERSION=$(chromium --version)
    echo -e "${GREEN}✓ Chromium instalado: ${CHROMIUM_VERSION}${NC}"
else
    echo -e "${RED}✗ Chrome/Chromium não encontrado${NC}"
    echo -e "${YELLOW}  Instale com: sudo apt-get install google-chrome-stable${NC}"
fi
echo ""

# Teste 3: Verificar Node.js
echo -e "${YELLOW}Teste 3: Verificando Node.js...${NC}"
NODE_VERSION=$(node --version)
if [[ "${NODE_VERSION}" =~ ^v(2[0-9]|[3-9][0-9]) ]]; then
    echo -e "${GREEN}✓ Node.js compatível: ${NODE_VERSION}${NC}"
else
    echo -e "${RED}✗ Node.js < 20. Versão atual: ${NODE_VERSION}${NC}"
    echo -e "${YELLOW}  Atualize para Node.js 20 ou superior${NC}"
fi
echo ""

# Teste 4: Verificar cache directory
echo -e "${YELLOW}Teste 4: Verificando diretório de cache...${NC}"
CACHE_DIR="$HOME/.cache/chrome-devtools-mcp"
if [ -d "$CACHE_DIR" ]; then
    echo -e "${GREEN}✓ Cache dir existe: ${CACHE_DIR}${NC}"
else
    echo -e "${YELLOW}  Criando cache dir...${NC}"
    mkdir -p "$CACHE_DIR"
    chmod 755 "$CACHE_DIR"
    echo -e "${GREEN}✓ Cache dir criado${NC}"
fi
echo ""

# Teste 5: Verificar logs directory
echo -e "${YELLOW}Teste 5: Verificando diretório de logs...${NC}"
LOGS_DIR="/home/jpcardozx/projetos/arco/logs"
if [ -d "$LOGS_DIR" ]; then
    echo -e "${GREEN}✓ Logs dir existe: ${LOGS_DIR}${NC}"
else
    echo -e "${YELLOW}  Criando logs dir...${NC}"
    mkdir -p "$LOGS_DIR"
    echo -e "${GREEN}✓ Logs dir criado${NC}"
fi
echo ""

# Teste 6: Verificar config MCP
echo -e "${YELLOW}Teste 6: Verificando configuração MCP...${NC}"
MCP_CONFIG="$HOME/.config/Claude/claude_desktop_config.json"
if [ -f "$MCP_CONFIG" ]; then
    if grep -q "chrome-devtools" "$MCP_CONFIG"; then
        echo -e "${GREEN}✓ chrome-devtools configurado em Claude Desktop${NC}"
    else
        echo -e "${YELLOW}  chrome-devtools não encontrado na config${NC}"
        echo -e "${YELLOW}  Adicione manualmente: nano ${MCP_CONFIG}${NC}"
    fi
else
    echo -e "${YELLOW}  Config do Claude Desktop não encontrada${NC}"
    echo -e "${YELLOW}  Localização esperada: ${MCP_CONFIG}${NC}"
fi
echo ""

# Sumário
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}✓ Testes concluídos!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo "Próximos passos:"
echo "1. Configure Claude Desktop (se ainda não fez)"
echo "2. Reinicie Claude Desktop"
echo "3. Teste com prompt: 'List all available tools from chrome-devtools server'"
echo ""
echo "Documentação: /home/jpcardozx/projetos/arco/mcp/README_CHROME_DEVTOOLS.md"
