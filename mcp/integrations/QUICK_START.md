# 🚀 Chrome DevTools MCP - Quick Start Guide

## ⚡ 1-Minute Setup

### Step 1: Install Chrome DevTools MCP
```bash
npm install -g chrome-devtools-mcp@latest
```

### Step 2: Run Setup Script
```bash
cd /home/jpcardozx/projetos/arco/mcp
./scripts/setup-chrome-devtools.sh
```

### Step 3: Configure Your AI Assistant

#### For Claude Desktop:
Add to `~/.config/Claude/claude_desktop_config.json`:

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

#### For Cursor/VS Code:
Add to `.vscode/settings.json`:

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

### Step 4: Restart Your AI Assistant

### Step 5: Test It!
Ask your AI assistant:
```
Check the performance of http://localhost:3000
```

---

## 🎯 Common Use Cases

### Performance Analysis
```
"Analyze ARCO homepage performance on mobile and desktop"
```

### Visual Testing
```
"Run visual regression tests on the PremiumHeroSection component"
```

### Accessibility
```
"Run accessibility scan for WCAG AA compliance"
```

### E2E Testing
```
"Test the contact form submission flow"
```

### Network Debugging
```
"Analyze network requests and identify slow ones"
```

---

## 📚 Full Documentation

- **Complete Guide:** `mcp/integrations/chrome-devtools-mcp.md`
- **Examples:** `mcp/integrations/chrome-devtools-examples.ts`
- **Summary:** `mcp/integrations/CHROME_DEVTOOLS_SUMMARY.md`

---

## 🆘 Troubleshooting

**Chrome not starting?**
```bash
# Use explicit path
"args": ["chrome-devtools-mcp@latest", "--executablePath=/usr/bin/google-chrome"]
```

**Permissions error?**
```bash
# Use isolated mode
"args": ["chrome-devtools-mcp@latest", "--isolated=true"]
```

**Need debug logs?**
```bash
# Enable verbose logging
"args": ["chrome-devtools-mcp@latest", "--logFile=./chrome-debug.log"]
export DEBUG=*
```

---

## ✅ You're Ready!

Chrome DevTools MCP is now integrated with ARCO. Your AI assistant can now:

- ✅ Analyze performance automatically
- ✅ Run visual regression tests
- ✅ Check accessibility compliance
- ✅ Test user flows end-to-end
- ✅ Monitor for errors
- ✅ Optimize bundles and network

**Happy testing!** 🎉
