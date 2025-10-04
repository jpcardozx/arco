# Guia de Autenticação - Figma MCP

## 🔐 Passo a Passo para Autenticação

### 1. Conectar ao Servidor Figma MCP

No terminal, execute:

```bash
claude mcp connect figma-remote-mcp
```

**O que vai acontecer:**
- Uma janela do navegador vai abrir automaticamente
- Você será direcionado para a página de login do Figma
- Faça login com sua conta Figma (precisa ter Dev seat ou Full seat em plano Pro/Organization/Enterprise)

### 2. Autorizar o Acesso

Na página do Figma:
1. Clique em **"Allow Access"** ou **"Permitir Acesso"**
2. Confirme as permissões solicitadas
3. Aguarde a mensagem de sucesso

### 3. Verificar Conexão

Volte ao terminal e você deve ver:
```
✅ Authentication successful. Connected to figma-remote-mcp.
```

Se aparecer esta mensagem, a autenticação foi bem-sucedida!

### 4. Verificar Ferramentas Disponíveis

Execute para ver as ferramentas MCP do Figma:

```bash
claude mcp list
```

Você deve ver algo como:
```
figma-remote-mcp: https://mcp.figma.com/mcp (HTTP) - ✅ Connected
```

---

## 🛠️ Ferramentas Figma MCP Disponíveis

Após autenticação, você terá acesso a:

1. **`get_file_info`** - Obter informações do arquivo Figma
2. **`get_node_info`** - Obter detalhes de um node/componente específico
3. **`get_styles`** - Extrair estilos (cores, tipografia, etc)
4. **`get_components`** - Listar componentes do arquivo
5. **`export_node`** - Exportar nodes como imagem
6. **`get_variables`** - Obter variáveis de design

---

## ✅ Após Autenticação

Quando você completar a autenticação, **me avise** e eu vou:

1. ✅ Listar todas as ferramentas MCP do Figma disponíveis
2. ✅ Extrair informações do arquivo Relume
3. ✅ Capturar componentes e estilos reais
4. ✅ Gerar código React preciso para cada seção
5. ✅ Completar a importação das 44 seções identificadas

---

## 🔧 Troubleshooting

### Erro: "Needs Dev Mode subscription"
- Você precisa de uma conta Figma com Dev Mode ativo
- Planos suportados: Pro, Organization, Enterprise
- Dev seat ou Full seat necessário

### Erro: "OAuth timeout"
- Tente novamente com: `claude mcp connect figma-remote-mcp`
- Certifique-se de permitir pop-ups no navegador

### Erro: "Already authenticated but can't access"
- Reconecte: `claude mcp disconnect figma-remote-mcp`
- Depois: `claude mcp connect figma-remote-mcp`

---

## 📝 O Que Vem Depois

Assim que você completar a autenticação e me avisar, eu vou:

### Fase 1: Extração de Dados (5min)
- Conectar ao arquivo Relume via MCP
- Extrair todos os componentes e estilos
- Mapear as 44 seções identificadas

### Fase 2: Geração de Componentes (30min)
- Gerar componentes React para cada seção
- Aplicar design tokens corretos
- Implementar responsividade

### Fase 3: Integração (15min)
- Integrar componentes nas páginas
- Validar TypeScript
- Testar build

**Tempo estimado total: ~50 minutos**

---

**Quando terminar a autenticação, digite:** `"Auth completa, pode prosseguir"`
