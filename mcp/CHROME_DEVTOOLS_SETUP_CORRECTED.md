# Chrome DevTools MCP - Setup Correto (OFICIAL)

## ⚠️ CORREÇÃO IMPORTANTE

**Nossa documentação anterior estava incorreta.** O Chrome DevTools MCP **EXISTE** e é um projeto oficial do Google Chrome DevTools!

- ❌ **Documento anterior:** CHROME_DEVTOOLS_SETUP.md (baseado em suposições)
- ✅ **Este documento:** Setup correto usando pacote oficial

---

## 📦 Instalação Oficial

### Requisitos
- Node.js 20+ (ou versão LTS mais recente)
- Chrome stable (versão atual ou mais recente)
- npm

### Instalação via npx (Recomendado)
```bash
# Não requer instalação, sempre usa última versão
npx -y chrome-devtools-mcp@latest
```

### Instalação Global
```bash
npm install -g chrome-devtools-mcp
```

### Para Desenvolvimento/Customização
```bash
git clone https://github.com/ChromeDevTools/chrome-devtools-mcp.git
cd chrome-devtools-mcp
npm ci
npm run build
```

---

## ⚙️ Configuração

### 1. Configuração Básica (Claude Desktop)

Edite o arquivo de configuração:
```bash
# Linux
nano ~/.config/Claude/claude_desktop_config.json

# macOS
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Adicione:
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

### 2. Configuração com Opções Avançadas

```json
{
  "mcpServers": {
    "chrome-devtools": {
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

### 3. Configuração para ARCO (Desenvolvimento)

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
        "--viewport=1440x900",
        "--log-file=/home/jpcardozx/projetos/arco/logs/chrome-mcp.log"
      ],
      "env": {
        "DEBUG": "*"
      }
    }
  }
}
```

---

## 🎯 Opções CLI Disponíveis

```bash
npx chrome-devtools-mcp@latest --help
```

### Opções Principais

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `--browserUrl`, `-u` | string | - | Conectar a Chrome já em execução |
| `--headless` | boolean | false | Modo headless (sem UI) |
| `--executablePath`, `-e` | string | - | Caminho para Chrome customizado |
| `--isolated` | boolean | false | User data dir temporário |
| `--channel` | string | stable | Channel: stable, canary, beta, dev |
| `--viewport` | string | - | Viewport inicial (ex: 1280x720) |
| `--proxyServer` | string | - | Configuração de proxy |
| `--acceptInsecureCerts` | boolean | false | Ignorar erros de certificado |
| `--logFile` | string | - | Arquivo de log (use DEBUG=* para verbose) |

---

## 🔧 Tools Disponíveis (26 no total)

### Input Automation (7 tools)
- `click` - Clica em elemento
- `drag` - Drag and drop
- `fill` - Preenche input
- `fill_form` - Preenche múltiplos campos
- `handle_dialog` - Gerencia dialogs
- `hover` - Hover sobre elemento
- `upload_file` - Upload de arquivo

### Navigation Automation (7 tools)
- `close_page` - Fecha página
- `list_pages` - Lista páginas abertas
- `navigate_page` - Navega para URL
- `navigate_page_history` - Back/forward
- `new_page` - Nova página
- `select_page` - Seleciona página ativa
- `wait_for` - Aguarda condições

### Emulation (3 tools)
- `emulate_cpu` - CPU throttling
- `emulate_network` - Network throttling
- `resize_page` - Redimensiona viewport

### Performance (3 tools)
- `performance_start_trace` - Inicia trace
- `performance_stop_trace` - Para trace
- `performance_analyze_insight` - Análise de performance

### Network (2 tools)
- `get_network_request` - Detalhes de request
- `list_network_requests` - Lista requests

### Debugging (4 tools)
- `evaluate_script` - Executa JavaScript
- `list_console_messages` - Mensagens do console
- `take_screenshot` - Screenshot
- `take_snapshot` - Snapshot DOM

---

## 🚀 Exemplos de Uso

### 1. Análise de Performance
```
Prompt para Claude:

Check the performance of https://arco.dev and identify any bottlenecks
```

### 2. Análise de Layout
```
Prompt para Claude:

Navigate to http://localhost:3000 and analyze the hero section centering. 
Take a screenshot and evaluate the CSS flexbox properties.
```

### 3. Debugging Interativo
```
Prompt para Claude:

Open https://arco.dev, list all network requests for JavaScript files,
and show me any console errors.
```

### 4. Visual Regression
```
Prompt para Claude:

Take screenshots of https://arco.dev at 1920x1080, 1024x768, and 375x667.
Compare the hero section layout across these viewports.
```

---

## 🎯 Integração com ARCO

### Opção 1: Uso Direto (Recomendado)

Configurar Claude Desktop e usar prompts naturais:

```bash
# 1. Configurar
code ~/.config/Claude/claude_desktop_config.json

# 2. Reiniciar Claude Desktop

# 3. Usar prompts como:
"Analyze the performance of localhost:3000"
"Take a screenshot of the hero section"
"Check for console errors on arco.dev"
```

### Opção 2: Cliente MCP Customizado

```typescript
// arco-chrome-integration.ts
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

export class ARCOChromeDebugger {
  private client: Client;

  async connect() {
    const transport = new StdioClientTransport({
      command: 'npx',
      args: ['-y', 'chrome-devtools-mcp@latest']
    });

    this.client = new Client(
      { name: 'arco-debugger', version: '1.0.0' },
      { capabilities: {} }
    );

    await this.client.connect(transport);
  }

  async analyzeHeroSection(url: string) {
    // Navegar
    await this.client.callTool('navigate_page', { url });
    
    // Snapshot
    await this.client.callTool('take_snapshot', {});
    
    // Avaliar centering
    const result = await this.client.callTool('evaluate_script', {
      script: `
        const hero = document.querySelector('[class*="hero"]');
        const container = hero?.parentElement;
        
        return {
          hero: {
            display: getComputedStyle(hero).display,
            justifyContent: getComputedStyle(hero).justifyContent,
            alignItems: getComputedStyle(hero).alignItems,
            offsetLeft: hero.offsetLeft,
            offsetTop: hero.offsetTop
          },
          container: {
            display: getComputedStyle(container).display,
            justifyContent: getComputedStyle(container).justifyContent,
            alignItems: getComputedStyle(container).alignItems
          }
        };
      `
    });
    
    return result;
  }

  async performanceAudit(url: string) {
    await this.client.callTool('navigate_page', { url });
    await this.client.callTool('performance_start_trace', {});
    await this.client.callTool('wait_for', { 
      condition: 'networkidle',
      timeout: 10000 
    });
    
    const trace = await this.client.callTool('performance_stop_trace', {});
    const insights = await this.client.callTool(
      'performance_analyze_insight',
      { trace }
    );
    
    return insights;
  }
}
```

---

## 🧪 Testando a Instalação

### 1. Teste Rápido via CLI
```bash
# Verificar se funciona
npx chrome-devtools-mcp@latest --help

# Deve mostrar:
# Options:
#   --browserUrl, -u       Connect to a running Chrome instance
#   --headless            Whether to run in headless mode
#   ...
```

### 2. Teste com MCP Inspector
```bash
npx @modelcontextprotocol/inspector npx -y chrome-devtools-mcp@latest

# Abrirá interface web em http://localhost:6274
# Teste tools manualmente
```

### 3. Teste com Claude Desktop
```bash
# 1. Configurar claude_desktop_config.json
# 2. Reiniciar Claude Desktop
# 3. Novo chat:

Prompt: "List all available tools from chrome-devtools server"

# Deve retornar lista de 26 tools
```

---

## 🐛 Troubleshooting

### Problema: "command not found: npx"
```bash
# Instalar Node.js via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### Problema: "Chrome não inicia"
```bash
# Verificar dependências (Linux)
sudo apt-get install -y \
  libgbm1 \
  libnss3 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libx11-xcb1

# Testar manualmente
npx chrome-devtools-mcp@latest --headless=true --isolated=true
```

### Problema: "Permission denied"
```bash
# Dar permissão para cache dir
mkdir -p ~/.cache/chrome-devtools-mcp
chmod 755 ~/.cache/chrome-devtools-mcp
```

### Problema: "Claude não reconhece servidor"
```bash
# Verificar logs
tail -f ~/Library/Logs/Claude/mcp*.log  # macOS
tail -f ~/.config/Claude/logs/mcp*.log  # Linux

# Verificar sintaxe JSON
cat ~/.config/Claude/claude_desktop_config.json | python -m json.tool
```

---

## 📚 Recursos Oficiais

- **GitHub:** https://github.com/ChromeDevTools/chrome-devtools-mcp
- **npm:** https://www.npmjs.com/package/chrome-devtools-mcp
- **Tool Reference:** https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md
- **Troubleshooting:** https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/troubleshooting.md
- **Changelog:** https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/CHANGELOG.md
- **Contributing:** https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/CONTRIBUTING.md

---

## ✅ Próximos Passos para ARCO

1. **Instalar oficialmente:**
   ```bash
   cd ~/projetos/arco
   pnpm add -D chrome-devtools-mcp
   ```

2. **Configurar Claude Desktop** com config correto

3. **Criar wrapper ARCO-specific** (opcional):
   ```bash
   touch mcp/integrations/arco-chrome-wrapper.ts
   ```

4. **Documentar casos de uso ARCO:**
   - Hero section centering analysis
   - Performance audits
   - Visual regression testing
   - Accessibility scanning

5. **Arquivar docs incorretos:**
   ```bash
   mv mcp/CHROME_DEVTOOLS_SETUP.md mcp/archive/
   mv mcp/servers/chrome-devtools-mcp-integration.ts mcp/archive/
   ```

---

**Atualizado em:** 1 de outubro de 2025  
**Status:** ✅ Documentação oficial verificada  
**Próxima revisão:** Quando ARCO integrar oficialmente
