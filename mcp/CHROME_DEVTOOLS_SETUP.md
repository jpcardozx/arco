# 🔧 Chrome DevTools MCP - Guia de Configuração

## 📋 **Visão Geral**

O **Chrome DevTools MCP** permite automatizar inspeção, debugging e análise de aplicações web diretamente via MCP, integrando o poder do Chrome DevTools no seu workflow.

---

## 🎯 **O Que Você Pode Fazer**

### ✅ **Capacidades Implementadas:**

1. **DOM Inspection**
   - Analisar estrutura de elementos
   - Verificar estilos computados
   - Identificar problemas de layout

2. **Performance Analysis**
   - Medir tempos de carregamento
   - Analisar Web Vitals (LCP, FID, CLS)
   - Identificar bottlenecks

3. **Network Monitoring**
   - Inspecionar requests/responses
   - Analisar headers e payloads
   - Detectar problemas de cache

4. **Console Integration**
   - Executar código JavaScript
   - Capturar logs e erros
   - Debugging interativo

5. **Accessibility Audits**
   - Verificar ARIA labels
   - Detectar problemas de contraste
   - Validar navegação por teclado

---

## 📦 **Instalação**

### **1. Instalar Chrome DevTools MCP Server**

```bash
# Via NPM (global)
npm install -g chrome-devtools-mcp

# Via PNPM (global)
pnpm add -g chrome-devtools-mcp

# Ou localmente no projeto
cd /home/jpcardozx/projetos/arco/mcp/servers
pnpm add chrome-devtools-mcp puppeteer
```

### **2. Verificar Instalação**

```bash
# Verificar se está instalado
which chrome-devtools-mcp

# Ou testar diretamente
npx chrome-devtools-mcp --version
```

---

## ⚙️ **Configuração no Claude Desktop**

### **Editar `claude_desktop_config.json`**

**Localização:**
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

**Adicionar ao arquivo:**

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp"
      ],
      "env": {
        "CHROME_PATH": "/usr/bin/google-chrome",
        "HEADLESS": "true",
        "DEBUG": "false"
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
```

### **Variáveis de Ambiente Disponíveis:**

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `CHROME_PATH` | Caminho do Chrome | Auto-detect |
| `HEADLESS` | Modo headless | `true` |
| `DEBUG` | Habilitar logs debug | `false` |
| `VIEWPORT_WIDTH` | Largura viewport | `1920` |
| `VIEWPORT_HEIGHT` | Altura viewport | `1080` |
| `USER_AGENT` | User agent customizado | Chrome padrão |

---

## 🚀 **Uso Prático**

### **1. Diagnosticar Problema de Layout**

```typescript
// Via MCP Tool Call
{
  "tool": "chrome_inspect_element",
  "params": {
    "url": "http://localhost:3000",
    "selector": ".hero-section",
    "properties": ["layout", "computed-styles", "box-model"]
  }
}
```

**Resposta Esperada:**
```json
{
  "element": ".hero-section",
  "computedStyles": {
    "display": "flex",
    "alignItems": "center",
    "minHeight": "100vh"
  },
  "boxModel": {
    "width": 1920,
    "height": 1080,
    "margin": [0, 0, 0, 0],
    "padding": [0, 0, 0, 0]
  },
  "issues": []
}
```

---

### **2. Analisar Performance**

```typescript
{
  "tool": "chrome_performance_audit",
  "params": {
    "url": "http://localhost:3000",
    "metrics": ["LCP", "FID", "CLS", "TTFB"],
    "iterations": 3
  }
}
```

**Resposta Esperada:**
```json
{
  "metrics": {
    "LCP": 1.2,
    "FID": 0.05,
    "CLS": 0.01,
    "TTFB": 0.3
  },
  "grade": "A",
  "suggestions": [
    "LCP excellent (< 2.5s)",
    "CLS excellent (< 0.1)"
  ]
}
```

---

### **3. Capturar Console Errors**

```typescript
{
  "tool": "chrome_console_capture",
  "params": {
    "url": "http://localhost:3000",
    "types": ["error", "warning"],
    "duration": 10000
  }
}
```

---

### **4. Teste de Responsividade**

```typescript
{
  "tool": "chrome_responsive_test",
  "params": {
    "url": "http://localhost:3000",
    "viewports": [
      { "width": 375, "height": 667, "name": "iPhone SE" },
      { "width": 768, "height": 1024, "name": "iPad" },
      { "width": 1920, "height": 1080, "name": "Desktop" }
    ],
    "captureScreenshots": true
  }
}
```

---

## 🛠️ **Ferramentas Disponíveis**

### **Core Tools (Chrome DevTools MCP):**

1. `chrome_navigate` - Navegar para URL
2. `chrome_click` - Clicar em elemento
3. `chrome_screenshot` - Capturar screenshot
4. `chrome_console_evaluate` - Executar JavaScript
5. `chrome_get_computed_styles` - Obter estilos computados
6. `chrome_network_capture` - Capturar tráfego de rede

### **ARCO Custom Tools (Nosso Wrapper):**

1. `arco_layout_diagnostic` - Diagnóstico completo de layout
2. `arco_performance_audit` - Auditoria de performance
3. `arco_accessibility_scan` - Scan de acessibilidade
4. `arco_visual_regression` - Teste de regressão visual
5. `arco_seo_analysis` - Análise de SEO técnico

---

## 📝 **Exemplo Completo: Case do Hero**

### **Problema:** Hero não centralizado verticalmente

### **Solução via MCP:**

```bash
# 1. Iniciar servidor (se não rodando)
cd /home/jpcardozx/projetos/arco/mcp/servers
npx tsx chrome-devtools-mcp-integration.ts

# 2. No Claude, usar o tool:
```

**Prompt para Claude:**
```
Use o Chrome DevTools MCP para diagnosticar por que o hero 
em http://localhost:3000 não está centralizado verticalmente.

Analise:
1. Estilos computados da section
2. Flex context dos wrappers
3. Height constraints
4. Possíveis conflitos de CSS
```

**Claude executará automaticamente:**
```typescript
// 1. Navegar
chrome_navigate({ url: "http://localhost:3000" })

// 2. Inspecionar section
chrome_get_computed_styles({ 
  selector: ".hero-section",
  properties: ["display", "alignItems", "minHeight", "height"]
})

// 3. Inspecionar wrappers
chrome_console_evaluate({
  expression: `
    document.querySelectorAll('.hero-section > div').forEach((el, i) => {
      console.log('Level', i, {
        display: getComputedStyle(el).display,
        alignItems: getComputedStyle(el).alignItems,
        minHeight: getComputedStyle(el).minHeight
      });
    });
  `
})

// 4. Gerar diagnóstico
arco_layout_diagnostic({
  url: "http://localhost:3000",
  component: "PremiumHeroSection",
  issue: "vertical-centering"
})
```

**Resultado:**
```json
{
  "diagnosis": {
    "issue": "Conflicting flex contexts",
    "root_cause": "Nested flex containers with duplicate min-h-screen",
    "affected_elements": [
      ".hero-section > div:nth-child(1)", 
      ".hero-section > div:nth-child(2)"
    ]
  },
  "recommendation": {
    "action": "Remove redundant flex + min-h-screen from inner wrapper",
    "changes": [
      {
        "file": "PremiumHeroSection.tsx",
        "line": 391,
        "from": "flex items-center justify-center min-h-screen",
        "to": "w-full"
      }
    ]
  },
  "confidence": "high"
}
```

---

## 🔄 **Reiniciar Servidor**

Se você fizer mudanças na configuração:

```bash
# 1. Fechar Claude Desktop completamente
pkill -9 Claude

# 2. Reabrir Claude Desktop
# O MCP será reiniciado automaticamente
```

---

## 🐛 **Troubleshooting**

### **Problema: "MCP server not found"**

```bash
# Verificar se está instalado globalmente
npm list -g chrome-devtools-mcp

# Se não, instalar
npm install -g chrome-devtools-mcp
```

### **Problema: "Chrome not found"**

```bash
# Verificar onde está o Chrome
which google-chrome
# ou
which chromium-browser

# Adicionar ao config:
"CHROME_PATH": "/usr/bin/google-chrome"
```

### **Problema: "Permission denied"**

```bash
# Dar permissões de execução
chmod +x /home/jpcardozx/projetos/arco/mcp/servers/chrome-devtools-mcp-integration.ts

# Ou usar npx tsx
"command": "npx",
"args": ["tsx", "caminho/para/arquivo.ts"]
```

### **Problema: "Port already in use"**

```bash
# Matar processos Chrome/Puppeteer
pkill -9 chrome
pkill -9 chromium

# Reiniciar MCP
```

---

## 📊 **Verificar Status**

### **No Claude Desktop:**

Digite no chat:
```
Liste os MCP servers disponíveis
```

Deve aparecer:
- ✅ `chrome-devtools` (status: connected)
- ✅ `arco-chrome-integration` (status: connected)

### **Via Terminal:**

```bash
# Testar servidor ARCO
cd /home/jpcardozx/projetos/arco/mcp/servers
npx tsx chrome-devtools-mcp-integration.ts

# Deve iniciar sem erros e aguardar conexão
```

---

## 🎯 **Próximos Passos**

1. ✅ Instalar dependências
2. ✅ Configurar `claude_desktop_config.json`
3. ✅ Reiniciar Claude Desktop
4. ✅ Testar com comando simples
5. 🚀 Usar para diagnosticar/corrigir bugs

---

## 📚 **Recursos**

- **Repo Oficial:** https://github.com/ChromeDevTools/chrome-devtools-mcp
- **Puppeteer Docs:** https://pptr.dev
- **Chrome DevTools Protocol:** https://chromedevtools.github.io/devtools-protocol/

---

## ✨ **Dica Pro**

Crie aliases para comandos comuns:

```bash
# ~/.bashrc ou ~/.zshrc
alias arco-chrome-mcp="cd /home/jpcardozx/projetos/arco/mcp/servers && npx tsx chrome-devtools-mcp-integration.ts"
alias arco-inspect="curl -X POST http://localhost:3000/_mcp/inspect"
```

---

**Qualquer dúvida, é só chamar!** 🚀
