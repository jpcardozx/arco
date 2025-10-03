# 🚀 ARCO Chrome DevTools MCP - Quick Start

## ✅ Status da Instalação

```
✓ Pacote: chrome-devtools-mcp@0.6.0
✓ Tipo: Implementação oficial completa
✓ Custo: 100% GRATUITO
✓ Status: Pronto para uso
```

---

## 🎯 Como Usar (3 Opções)

### 1️⃣ MCP Inspector (RECOMENDADO)

Interface gráfica web para testar todas as 26 tools.

```bash
# Iniciar
./mcp/scripts/start-inspector.sh
```

**Abre:** http://localhost:6274

**Primeiro teste:**
1. Click em `navigate_page`
2. Adicionar parâmetro `url`: `http://localhost:3000`
3. Click "Call Tool"
4. Ver resultado ✨

---

### 2️⃣ Cliente Node.js

Script automatizado para testes completos.

```bash
# Executar
npx tsx mcp/test-client.ts
```

**Executa automaticamente:**
- Lista 26 tools
- Navega para localhost:3000
- Tira screenshot
- Analisa hero section
- Verifica console

---

### 3️⃣ Linha de Comando

```bash
# Ver opções
npx chrome-devtools-mcp@latest --help

# Ver versão
npx chrome-devtools-mcp@latest --version
```

---

## 📋 26 Tools Disponíveis

| Categoria | Tools | Exemplos |
|-----------|-------|----------|
| **Input** | 7 | click, drag, fill, hover |
| **Navigation** | 7 | navigate_page, list_pages |
| **Performance** | 3 | start_trace, analyze_insight |
| **Debugging** | 4 | evaluate_script, screenshot |
| **Emulation** | 3 | emulate_cpu, emulate_network |
| **Network** | 2 | list_requests, get_request |

---

## 🎯 Exemplos Práticos

### Analisar Hero Section

```bash
# Via Inspector (http://localhost:6274)
Tool: evaluate_script
Args: {
  "script": "const hero = document.querySelector('[class*=\"hero\"]'); return getComputedStyle(hero)"
}
```

### Performance Audit

```bash
1. navigate_page → http://localhost:3000
2. performance_start_trace
3. wait_for → networkidle
4. performance_stop_trace
5. performance_analyze_insight
```

### Screenshot Multi-Viewport

```bash
1. resize_page → 1920x1080
2. take_screenshot
3. resize_page → 375x667
4. take_screenshot
```

---

## 🛠️ Scripts Prontos

```bash
# Testar instalação
./mcp/scripts/test-chrome-mcp.sh

# Iniciar inspector
./mcp/scripts/start-inspector.sh

# Cliente automatizado
npx tsx mcp/test-client.ts
```

---

## 📂 Arquivos Importantes

```
mcp/
├── QUICK_START.md                    ← Você está aqui
├── FREE_ALTERNATIVES.md              ← Outras opções gratuitas
├── README_CHROME_DEVTOOLS.md         ← Docs completas
├── test-client.ts                    ← Cliente Node.js
└── scripts/
    ├── test-chrome-mcp.sh           ← Testar instalação
    └── start-inspector.sh           ← Iniciar interface
```

---

## 🚀 Começar AGORA (30 segundos)

```bash
# 1. Entrar no diretório
cd /home/jpcardozx/projetos/arco

# 2. Iniciar inspector
./mcp/scripts/start-inspector.sh

# 3. Abrir browser
# http://localhost:6274

# 4. Testar tool
# navigate_page → url: http://localhost:3000
```

---

## 🐛 Problemas?

```bash
# Chrome não inicia?
sudo apt-get install -y libgbm1 libnss3 libgtk-3-0

# Inspector não abre?
lsof -i :6274  # Ver se porta está ocupada

# Erro de módulo?
pnpm install
```

---

## 📚 Documentação

- **Quick Start:** Este arquivo
- **Docs Completas:** [README_CHROME_DEVTOOLS.md](./README_CHROME_DEVTOOLS.md)
- **Alternativas:** [FREE_ALTERNATIVES.md](./FREE_ALTERNATIVES.md)
- **GitHub Oficial:** https://github.com/ChromeDevTools/chrome-devtools-mcp

---

**Última atualização:** 1 de outubro de 2025  
**Versão:** 0.6.0  
**Status:** ✅ Pronto para uso  
**Custo:** 100% GRATUITO
