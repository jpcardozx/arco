#!/bin/bash
# 🚀 ARCO Node.js Upgrade Script
# Atualiza Node.js 18 → 20 LTS para suporte Gemini CLI

echo "📦 Carregando NVM..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "🔍 Versão atual do Node.js:"
node -v

echo ""
echo "📥 Instalando Node.js 20 LTS..."
nvm install 20

echo ""
echo "✅ Ativando Node.js 20 como padrão..."
nvm use 20
nvm alias default 20

echo ""
echo "🎯 Versões atualizadas:"
echo "Node.js: $(node -v)"
echo "NPM: $(npm -v)"

echo ""
echo "🔧 Reinstalando dependências globais no Node 20..."
npm install -g pnpm@latest

echo ""
echo "📊 Verificando compatibilidade com Gemini CLI..."
if command -v pnpm &> /dev/null; then
    echo "✅ pnpm: $(pnpm -v)"
else
    echo "⚠️ pnpm não encontrado, instalando..."
    npm install -g pnpm
fi

echo ""
echo "🎉 CONCLUÍDO!"
echo "Node.js $(node -v) está pronto para Gemini CLI"
echo ""
echo "Para usar em novos terminais, execute:"
echo "  source ~/.bashrc"
