# 📋 Chrome DevTools MCP - Referência Rápida

## 🎯 Comandos Rápidos

### Instalação
```bash
./mcp/scripts/setup-chrome-devtools.sh
```

### Testes Interativos
```bash
./mcp/scripts/test-chrome-devtools.sh
```

---

## 🛠️ Ferramentas Disponíveis

| Ferramenta | Uso | Exemplo |
|-----------|-----|---------|
| `arco_analyze_performance` | Performance + Core Web Vitals | "Analyze homepage performance" |
| `arco_visual_regression` | Testes de regressão visual | "Test PremiumHeroSection visually" |
| `arco_lighthouse_audit` | Auditoria Lighthouse | "Run Lighthouse on homepage" |
| `arco_test_user_flow` | Testes E2E de fluxos | "Test contact form flow" |
| `arco_analyze_network` | Análise de rede | "Analyze network requests" |
| `arco_analyze_bundle` | Análise de bundles | "Check bundle sizes" |
| `arco_accessibility_scan` | Verificação WCAG | "Check accessibility" |
| `arco_monitor_console_errors` | Monitor de erros | "Monitor console errors" |

---

## 💬 Prompts Prontos

### Performance
```
Analyze ARCO homepage performance on mobile and desktop
```

### Testes Visuais
```
Run visual regression tests on all major components
```

### Acessibilidade
```
Run comprehensive accessibility scan for WCAG AA compliance
```

### E2E
```
Test the complete user flow from homepage to contact form submission
```

### Debugging
```
Monitor console errors for 2 minutes and report any issues found
```

### Pré-Deploy
```
Run complete pre-deployment checks:
- Performance analysis
- Visual regression
- Accessibility scan
- E2E tests
- Error monitoring
Provide GO/NO-GO recommendation
```

---

## 📁 Arquivos Importantes

```
mcp/
├── servers/
│   └── chrome-devtools-mcp-integration.ts    # Servidor principal
│
├── integrations/
│   ├── QUICK_START.md                        # Start em 1 min
│   ├── chrome-devtools-mcp.md                # Guia completo
│   ├── CHROME_DEVTOOLS_SUMMARY.md            # Resumo executivo
│   ├── chrome-devtools-examples.ts           # Exemplos código
│   └── IMPLEMENTATION_COMPLETE.md            # Status implementação
│
└── scripts/
    ├── setup-chrome-devtools.sh              # Setup automático
    └── test-chrome-devtools.sh               # Testes interativos
```

---

## ⚙️ Configuração MCP Client

### Claude Desktop
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

### Cursor / VS Code
```json
{
  "mcp.servers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

---

## 🐛 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Chrome não inicia | `--executablePath=/usr/bin/google-chrome` |
| Timeout | `export DEBUG=*` |
| Permissões | `--isolated=true` |
| Logs | `--logFile=./debug.log` |

---

## 📊 Métricas Alvo

| Métrica | Meta | Como Medir |
|---------|------|------------|
| Performance | >90 | Lighthouse |
| LCP | <2.5s | Core Web Vitals |
| FID | <100ms | Core Web Vitals |
| CLS | <0.1 | Core Web Vitals |
| Acessibilidade | 0 críticos | axe-core |
| Bundle | <500KB | Análise |

---

## 🔗 Links Úteis

- [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Puppeteer](https://pptr.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)

---

## ✅ Status: PRONTO PARA USO! 🚀
