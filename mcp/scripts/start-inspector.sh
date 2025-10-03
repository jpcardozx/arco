#!/bin/bash
# Inicia MCP Inspector com Chrome DevTools MCP
# Uso: ./start-inspector.sh

echo "🚀 Iniciando MCP Inspector com Chrome DevTools..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Interface Web: http://localhost:6274"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Tools Disponíveis (26):"
echo "   Input: click, drag, fill, fill_form, hover, upload_file"
echo "   Navigation: navigate_page, list_pages, new_page, wait_for"
echo "   Performance: performance_start_trace, performance_stop_trace"
echo "   Debugging: evaluate_script, take_screenshot, list_console_messages"
echo ""
echo "🎯 Exemplos de Teste:"
echo "   1. navigate_page → url: http://localhost:3000"
echo "   2. take_screenshot"
echo "   3. evaluate_script → script: document.title"
echo ""
echo "⚠️  Pressione Ctrl+C para sair"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Iniciar inspector
npx @modelcontextprotocol/inspector npx -y chrome-devtools-mcp@latest
