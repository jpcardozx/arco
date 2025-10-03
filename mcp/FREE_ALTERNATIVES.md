# Chrome DevTools MCP - Alternativas Gratuitas ao Claude Desktop

## 🎯 Problema

Claude Desktop é caro e não é viável para desenvolvimento. Precisamos de alternativas gratuitas para usar o Chrome DevTools MCP.

---

## ✅ Solução 1: MCP Inspector (Recomendado)

Interface web **gratuita** para testar e usar servidores MCP.

### Instalação e Uso

```bash
# Iniciar inspector com Chrome DevTools MCP
npx @modelcontextprotocol/inspector npx -y chrome-devtools-mcp@latest
```

**Interface web abrirá em:** `http://localhost:6274`

### Recursos
- ✅ 100% gratuito
- ✅ Interface gráfica
- ✅ Testa todas as 26 tools
- ✅ Vê resultados em tempo real
- ✅ Perfeito para desenvolvimento

### Screenshot de uso:
```
1. Abre http://localhost:6274 no browser
2. Vê lista de tools disponíveis
3. Clica em uma tool (ex: navigate_page)
4. Preenche parâmetros (ex: url: "http://localhost:3000")
5. Clica "Call Tool"
6. Vê resultado instantaneamente
```

---

## ✅ Solução 2: Cliente MCP Programático

Criar um cliente Node.js simples para usar as tools.

### Criar arquivo de teste:

```bash
touch /home/jpcardozx/projetos/arco/mcp/test-client.ts
```

### Código:

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function testChromeDevTools() {
  // Criar transporte
  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['-y', 'chrome-devtools-mcp@latest']
  });

  // Criar cliente
  const client = new Client(
    { name: 'arco-test', version: '1.0.0' },
    { capabilities: {} }
  );

  try {
    // Conectar
    await client.connect(transport);
    console.log('✓ Conectado ao Chrome DevTools MCP');

    // Listar tools disponíveis
    const { tools } = await client.listTools();
    console.log(`\n✓ ${tools.length} tools disponíveis:\n`);
    tools.forEach(tool => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });

    // Exemplo 1: Navegar para página
    console.log('\n\n🌐 Navegando para localhost:3000...');
    const navResult = await client.callTool('navigate_page', {
      url: 'http://localhost:3000'
    });
    console.log('✓ Navegação concluída');

    // Exemplo 2: Tirar screenshot
    console.log('\n📸 Tirando screenshot...');
    const screenshotResult = await client.callTool('take_screenshot', {});
    console.log('✓ Screenshot capturado');
    console.log(screenshotResult);

    // Exemplo 3: Avaliar JavaScript
    console.log('\n🔍 Analisando hero section...');
    const evalResult = await client.callTool('evaluate_script', {
      script: `
        const hero = document.querySelector('[class*="hero"]');
        return {
          exists: !!hero,
          display: hero ? getComputedStyle(hero).display : null,
          justifyContent: hero ? getComputedStyle(hero).justifyContent : null,
          alignItems: hero ? getComputedStyle(hero).alignItems : null
        };
      `
    });
    console.log('✓ Análise concluída:');
    console.log(evalResult);

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await client.close();
  }
}

// Executar
testChromeDevTools().catch(console.error);
```

### Executar:

```bash
npx tsx /home/jpcardozx/projetos/arco/mcp/test-client.ts
```

---

## ✅ Solução 3: Script Shell Simples

Para testes rápidos sem programação.

### Criar script:

```bash
cat > /home/jpcardozx/projetos/arco/mcp/scripts/chrome-quick-test.sh << 'EOF'
#!/bin/bash

echo "🚀 Iniciando MCP Inspector..."
echo ""
echo "Interface web estará disponível em: http://localhost:6274"
echo ""
echo "Teste estas tools:"
echo "  1. navigate_page - url: http://localhost:3000"
echo "  2. take_screenshot"
echo "  3. list_pages"
echo "  4. evaluate_script"
echo ""
echo "Pressione Ctrl+C para sair"
echo ""

npx @modelcontextprotocol/inspector npx -y chrome-devtools-mcp@latest
EOF

chmod +x /home/jpcardozx/projetos/arco/mcp/scripts/chrome-quick-test.sh
```

### Usar:

```bash
./mcp/scripts/chrome-quick-test.sh
```

---

## ✅ Solução 4: VS Code Extension (Copilot)

Se você tem GitHub Copilot no VS Code, pode usar MCP gratuitamente.

### Configuração:

1. **Abrir settings:**
   ```
   Ctrl+Shift+P → "Preferences: Open User Settings (JSON)"
   ```

2. **Adicionar:**
   ```json
   {
     "github.copilot.advanced": {
       "mcp": {
         "servers": {
           "chrome-devtools": {
             "command": "npx",
             "args": ["-y", "chrome-devtools-mcp@latest"]
           }
         }
       }
     }
   }
   ```

3. **Usar no Copilot Chat:**
   ```
   @workspace /mcp navigate to http://localhost:3000 and analyze hero
   ```

---

## ✅ Solução 5: Cursor IDE (Free Tier)

Cursor tem tier gratuito com suporte a MCP.

### Configuração:

```bash
# Linux
nano ~/.cursor/mcp.json
```

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

### Usar:
```
Ctrl+L (abrir chat) → usar tools do Chrome DevTools
```

---

## ✅ Solução 6: API REST Wrapper

Criar API REST simples para usar via curl/Postman.

### Código:

```typescript
// mcp/servers/rest-wrapper.ts
import express from 'express';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const app = express();
app.use(express.json());

let client: Client;

// Inicializar cliente MCP
async function initMCP() {
  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['-y', 'chrome-devtools-mcp@latest']
  });

  client = new Client(
    { name: 'arco-rest', version: '1.0.0' },
    { capabilities: {} }
  );

  await client.connect(transport);
  console.log('✓ MCP Client conectado');
}

// Endpoint para listar tools
app.get('/tools', async (req, res) => {
  const { tools } = await client.listTools();
  res.json(tools);
});

// Endpoint para chamar tool
app.post('/tools/:name', async (req, res) => {
  try {
    const result = await client.callTool(req.params.name, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
initMCP().then(() => {
  app.listen(3001, () => {
    console.log('✓ REST API rodando em http://localhost:3001');
  });
});
```

### Usar:

```bash
# Iniciar servidor
npx tsx mcp/servers/rest-wrapper.ts

# Em outro terminal:
# Listar tools
curl http://localhost:3001/tools

# Navegar para página
curl -X POST http://localhost:3001/tools/navigate_page \
  -H "Content-Type: application/json" \
  -d '{"url": "http://localhost:3000"}'

# Tirar screenshot
curl -X POST http://localhost:3001/tools/take_screenshot
```

---

## 🎯 Comparação de Alternativas

| Solução | Custo | Facilidade | Interface | Melhor Para |
|---------|-------|------------|-----------|-------------|
| **MCP Inspector** | ✅ Grátis | ⭐⭐⭐⭐⭐ | Web GUI | Testes manuais |
| **Cliente Node.js** | ✅ Grátis | ⭐⭐⭐⭐ | CLI/Code | Automação |
| **Script Shell** | ✅ Grátis | ⭐⭐⭐⭐⭐ | CLI | Testes rápidos |
| **VS Code Copilot** | 💰 $10/mês | ⭐⭐⭐⭐ | IDE | Desenvolvimento |
| **Cursor Free** | ✅ Grátis* | ⭐⭐⭐⭐ | IDE | Desenvolvimento |
| **REST Wrapper** | ✅ Grátis | ⭐⭐⭐ | API | Integração |

*Cursor tem limite de requests no tier gratuito

---

## 🚀 Recomendação para ARCO

### Para Desenvolvimento Diário: **MCP Inspector**

```bash
# Criar alias para facilitar
echo 'alias chrome-mcp="npx @modelcontextprotocol/inspector npx -y chrome-devtools-mcp@latest"' >> ~/.bashrc
source ~/.bashrc

# Usar:
chrome-mcp
```

### Para Automação/CI: **Cliente Node.js**

```bash
# Criar script de teste
npx tsx mcp/test-client.ts
```

### Para Debugging Rápido: **Script Shell**

```bash
./mcp/scripts/chrome-quick-test.sh
```

---

## 📋 Setup Rápido (Escolha 1)

### Opção A: MCP Inspector (Mais Simples)

```bash
# Criar alias
echo 'alias chrome-inspect="npx @modelcontextprotocol/inspector npx -y chrome-devtools-mcp@latest"' >> ~/.bashrc
source ~/.bashrc

# Usar
chrome-inspect
# Abre http://localhost:6274 automaticamente
```

### Opção B: Cliente Node.js (Mais Poder)

Já criado em `/home/jpcardozx/projetos/arco/mcp/test-client.ts`

```bash
# Executar
npx tsx mcp/test-client.ts
```

---

## ✅ Próximos Passos

1. **Escolher solução** (recomendo MCP Inspector)
2. **Testar** com localhost:3000
3. **Criar workflows** específicos ARCO
4. **Integrar com CI/CD** se necessário

---

**Última atualização:** 1 de outubro de 2025  
**Status:** ✅ Alternativas gratuitas documentadas  
**Recomendação:** MCP Inspector para desenvolvimento
