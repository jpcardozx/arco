# Chrome DevTools MCP - Instalação Completa ARCO

## ✅ Status da Instalação

- **Pacote:** chrome-devtools-mcp@0.6.0
- **Instalado em:** 1 de outubro de 2025
- **Tipo:** Implementação oficial completa (sem customizações)
- **Status:** ✅ Pronto para uso

---

## 🚀 Configuração Rápida

### 1. Instalar no Sistema (Já feito)

```bash
cd /home/jpcardozx/projetos/arco
pnpm add -D chrome-devtools-mcp
```

### 2. Configurar Claude Desktop

#### Linux:
```bash
nano ~/.config/Claude/claude_desktop_config.json
```

#### Adicionar configuração:
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

**Para modo desenvolvimento ARCO** (com logs):
```json
{
  "mcpServers": {
    "chrome-devtools-arco": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--headless=false",
        "--isolated=false",
        "--viewport=1920x1080",
        "--log-file=/home/jpcardozx/projetos/arco/logs/chrome-mcp.log"
      ],
      "env": {
        "DEBUG": "*"
      }
    }
  }
}
```

### 3. Reiniciar Claude Desktop

```bash
# Fechar todas as janelas do Claude
# Reabrir Claude Desktop
```

---

## 🎯 Testando a Instalação

### Teste 1: Via CLI
```bash
npx chrome-devtools-mcp@latest --help
```

**Saída esperada:**
```
Options:
  --browserUrl, -u       Connect to a running Chrome instance
  --headless            Whether to run in headless mode
  --executablePath, -e  Path to custom Chrome executable
  ...
```

### Teste 2: Via MCP Inspector
```bash
npx @modelcontextprotocol/inspector npx -y chrome-devtools-mcp@latest
```

Abrirá interface web em `http://localhost:6274`

### Teste 3: Com Claude Desktop

Após reiniciar Claude, testar prompt:

```
List all available tools from the chrome-devtools server
```

**Resposta esperada:** Lista de 26 tools

---

## 📋 26 Tools Disponíveis

### Input Automation (7)
- `click` - Clica em elemento por UID
- `drag` - Drag and drop entre elementos
- `fill` - Preenche input/textarea
- `fill_form` - Preenche múltiplos campos
- `handle_dialog` - Aceita/rejeita dialogs
- `hover` - Hover sobre elemento
- `upload_file` - Upload de arquivo

### Navigation Automation (7)
- `close_page` - Fecha página
- `list_pages` - Lista páginas abertas
- `navigate_page` - Navega para URL
- `navigate_page_history` - Back/forward
- `new_page` - Abre nova página
- `select_page` - Seleciona página ativa
- `wait_for` - Aguarda condições

### Emulation (3)
- `emulate_cpu` - CPU throttling
- `emulate_network` - Network throttling
- `resize_page` - Redimensiona viewport

### Performance (3)
- `performance_start_trace` - Inicia trace
- `performance_stop_trace` - Para trace
- `performance_analyze_insight` - Análise de insights

### Network (2)
- `get_network_request` - Detalhes de request
- `list_network_requests` - Lista requests

### Debugging (4)
- `evaluate_script` - Executa JavaScript
- `list_console_messages` - Lista mensagens console
- `take_screenshot` - Captura screenshot
- `take_snapshot` - Snapshot DOM com UIDs

---

## 💡 Casos de Uso ARCO

### 1. Análise de Hero Section
```
Prompt para Claude:

Navigate to http://localhost:3000 and analyze the hero section centering.
Take a screenshot and evaluate the CSS flexbox properties of elements 
with class "hero" or "premium-hero".
```

### 2. Performance Audit
```
Prompt para Claude:

Start a performance trace on http://localhost:3000, wait for network idle,
stop the trace, and analyze the insights. Focus on LCP, FID, and CLS metrics.
```

### 3. Console Error Detection
```
Prompt para Claude:

Navigate to http://localhost:3000, wait 3 seconds, and list all console 
messages. Highlight any errors or warnings.
```

### 4. Visual Regression
```
Prompt para Claude:

Take screenshots of http://localhost:3000 at these viewports:
- 1920x1080 (desktop)
- 1024x768 (tablet)
- 375x667 (mobile)

Compare the hero section layout across these sizes.
```

### 5. Network Analysis
```
Prompt para Claude:

Navigate to http://localhost:3000, wait for network idle, then list all 
network requests. Show:
- Total JavaScript bundle size
- Number of requests
- Slowest resources
- Failed requests
```

### 6. Interactive Debugging
```
Prompt para Claude:

Navigate to http://localhost:3000, take a snapshot, and evaluate this script:

document.querySelectorAll('[class*="hero"]').forEach(el => {
  console.log({
    element: el.tagName,
    classes: el.className,
    display: getComputedStyle(el).display,
    justifyContent: getComputedStyle(el).justifyContent,
    alignItems: getComputedStyle(el).alignItems
  });
});

Then show me the console messages.
```

---

## 🔧 Configurações Avançadas

### Headless Mode (CI/CD)
```json
{
  "mcpServers": {
    "chrome-devtools-ci": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--headless=true",
        "--isolated=true",
        "--viewport=1920x1080"
      ]
    }
  }
}
```

### Conectar a Chrome Existente
```json
{
  "mcpServers": {
    "chrome-devtools-remote": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--browserUrl=http://localhost:9222"
      ]
    }
  }
}
```

Iniciar Chrome com remote debugging:
```bash
google-chrome --remote-debugging-port=9222
```

### Proxy Configuration
```json
{
  "mcpServers": {
    "chrome-devtools-proxy": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--proxyServer=http://proxy.example.com:8080"
      ]
    }
  }
}
```

---

## 📂 Estrutura de Arquivos ARCO

```
/home/jpcardozx/projetos/arco/
├── mcp/
│   ├── config/
│   │   └── chrome-devtools-config.json    # Config de exemplo
│   ├── README_CHROME_DEVTOOLS.md          # Este arquivo
│   ├── CHROME_DEVTOOLS_OFFICIAL_ANALYSIS.md
│   └── CHROME_DEVTOOLS_SETUP_CORRECTED.md
├── logs/
│   └── chrome-mcp.log                     # Logs do MCP (quando DEBUG=*)
└── package.json                           # chrome-devtools-mcp instalado
```

---

## 🐛 Troubleshooting

### Problema: Chrome não inicia

**Solução (Linux):**
```bash
sudo apt-get update
sudo apt-get install -y \
  libgbm1 \
  libnss3 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libasound2
```

### Problema: Permissão negada no cache

**Solução:**
```bash
mkdir -p ~/.cache/chrome-devtools-mcp
chmod 755 ~/.cache/chrome-devtools-mcp
```

### Problema: Claude não reconhece servidor

**Verificar logs:**
```bash
# Linux
tail -f ~/.config/Claude/logs/mcp*.log

# Ver log do Chrome MCP
tail -f /home/jpcardozx/projetos/arco/logs/chrome-mcp.log
```

**Verificar sintaxe JSON:**
```bash
cat ~/.config/Claude/claude_desktop_config.json | python -m json.tool
```

### Problema: Timeout ao iniciar

**Aumentar timeout na config:**
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"],
      "timeout": 30000
    }
  }
}
```

---

## 📚 Documentação Oficial

- **GitHub:** https://github.com/ChromeDevTools/chrome-devtools-mcp
- **npm:** https://www.npmjs.com/package/chrome-devtools-mcp
- **Tool Reference:** https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md
- **Troubleshooting:** https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/troubleshooting.md
- **Changelog:** https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/CHANGELOG.md

---

## 🎓 Próximos Passos

1. **Configurar Claude Desktop** com uma das configs acima
2. **Testar com prompts** dos casos de uso ARCO
3. **Criar scripts auxiliares** (opcional):
   ```bash
   # scripts/chrome-debug.sh
   npx chrome-devtools-mcp@latest \
     --log-file=./logs/chrome-mcp.log \
     --viewport=1920x1080
   ```
4. **Documentar workflows** específicos ARCO
5. **Integrar com CI/CD** (futuro)

---

**Instalado em:** 1 de outubro de 2025  
**Versão:** 0.6.0  
**Status:** ✅ Pronto para uso  
**Customizações:** Nenhuma (implementação oficial completa)
