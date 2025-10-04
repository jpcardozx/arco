# Chrome DevTools MCP - Guia de Configuração do Claude Desktop

## 📍 Localização do Arquivo de Configuração

### Linux
```bash
~/.config/Claude/claude_desktop_config.json
```

### macOS
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

### Windows
```
%APPDATA%\Claude\claude_desktop_config.json
```

---

## 🔧 Configuração Básica (Recomendada)

Crie ou edite o arquivo de configuração:

```bash
# Linux
mkdir -p ~/.config/Claude
nano ~/.config/Claude/claude_desktop_config.json
```

Adicione este conteúdo:

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

**Salve** (Ctrl+O, Enter, Ctrl+X no nano)

---

## 🎯 Configuração para Desenvolvimento ARCO

Para ter logs detalhados e Chrome visível:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--headless=false",
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

---

## 🚀 Configuração para CI/CD

Para testes automatizados (headless):

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

---

## 🔄 Múltiplos Perfis

Você pode ter várias configurações simultaneamente:

```json
{
  "mcpServers": {
    "chrome-dev": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--headless=false",
        "--log-file=/home/jpcardozx/projetos/arco/logs/chrome-dev.log"
      ],
      "env": {
        "DEBUG": "*"
      }
    },
    "chrome-prod": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--headless=true",
        "--isolated=true"
      ]
    }
  }
}
```

---

## ✅ Verificação da Configuração

### 1. Verificar sintaxe JSON
```bash
cat ~/.config/Claude/claude_desktop_config.json | python3 -m json.tool
```

Se não retornar erro, a sintaxe está correta.

### 2. Reiniciar Claude Desktop
```bash
# Fechar todas as janelas do Claude
# Reabrir Claude Desktop
```

### 3. Testar no Claude

Abra um novo chat e digite:

```
List all available tools from the chrome-devtools server
```

**Resposta esperada:** Lista de 26 tools divididas em categorias.

---

## 🐛 Troubleshooting

### Problema: "Config file not found"

**Solução:**
```bash
# Criar diretório e arquivo
mkdir -p ~/.config/Claude
touch ~/.config/Claude/claude_desktop_config.json

# Adicionar config básica
cat > ~/.config/Claude/claude_desktop_config.json << 'EOF'
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
EOF

# Verificar
cat ~/.config/Claude/claude_desktop_config.json
```

### Problema: "Claude não reconhece servidor"

**Verificar logs:**
```bash
# Linux
tail -f ~/.config/Claude/logs/mcp*.log

# Ver erros específicos
grep -i "error\|fail" ~/.config/Claude/logs/mcp*.log
```

### Problema: "Chrome não inicia"

**Instalar dependências (Linux):**
```bash
sudo apt-get update
sudo apt-get install -y \
  libgbm1 \
  libnss3 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libx11-xcb1
```

### Problema: "Permission denied"

**Corrigir permissões:**
```bash
chmod 644 ~/.config/Claude/claude_desktop_config.json
chmod 755 ~/.cache/chrome-devtools-mcp
```

---

## 📋 Checklist de Instalação

- [ ] Arquivo de configuração criado
- [ ] Sintaxe JSON verificada
- [ ] Claude Desktop reiniciado
- [ ] Servidor aparece na lista de tools
- [ ] Teste de navegação funciona
- [ ] Logs sendo gerados (se configurado)

---

## 🎓 Próximos Passos

1. **Testar navegação básica:**
   ```
   Navigate to https://google.com and take a screenshot
   ```

2. **Testar análise de performance:**
   ```
   Start a performance trace on http://localhost:3000, 
   wait for network idle, stop the trace, and show insights
   ```

3. **Testar com ARCO:**
   ```
   Navigate to http://localhost:3000 and analyze the hero 
   section centering using CSS evaluation
   ```

---

**Última atualização:** 1 de outubro de 2025  
**Versão testada:** chrome-devtools-mcp@0.6.0
