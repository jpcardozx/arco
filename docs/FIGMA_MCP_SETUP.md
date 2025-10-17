# Configuração do Servidor MCP Figma

## Visão Geral
Este documento descreve como conectar o projeto ARCO ao servidor MCP (Model Context Protocol) do Figma para integração de design-to-code.

## Pré-requisitos

1. **Token de Acesso Pessoal do Figma**
   - Acesse: https://www.figma.com/developers/api#access-tokens
   - Clique em "Get personal access token"
   - Copie o token gerado

2. **Variável de Ambiente**
   - Adicione ao `.env.local`:
   ```bash
   FIGMA_PERSONAL_ACCESS_TOKEN=seu_token_aqui
   ```

## Configuração

### 1. Arquivo de Configuração MCP
O arquivo `.vscode/mcp-config.json` já está configurado com:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "@figma/mcp-server-figma"
      ],
      "env": {
        "FIGMA_PERSONAL_ACCESS_TOKEN": "${env:FIGMA_PERSONAL_ACCESS_TOKEN}"
      }
    }
  }
}
```

### 2. Instalação do Servidor
O servidor será instalado automaticamente via `npx` quando necessário. Não requer instalação manual.

## Funcionalidades Disponíveis

### 1. `mcp_figma_get_code`
Gera código UI a partir de um node do Figma.

**Parâmetros:**
- `fileKey`: ID do arquivo Figma (extraído da URL)
- `nodeId`: ID do node/componente (formato `123:456`)
- `clientLanguages`: Linguagens do projeto (ex: `typescript,react`)
- `clientFrameworks`: Frameworks usados (ex: `next.js,tailwind`)

**Exemplo de URL:**
```
https://figma.com/design/ABC123XYZ/MyDesign?node-id=1-2
```
- `fileKey`: `ABC123XYZ`
- `nodeId`: `1:2`

### 2. `mcp_figma_get_metadata`
Obtém metadados e estrutura de um node em formato XML.

**Uso:** Ideal para entender a hierarquia antes de gerar código.

### 3. `mcp_figma_get_screenshot`
Gera captura de tela de um node específico.

### 4. `mcp_figma_create_design_system_rules`
Cria regras de design system baseadas em um node.

## Workflow Recomendado

### Para Implementar um Design do Figma:

1. **Obter Metadados**
   ```
   Use mcp_figma_get_metadata para ver a estrutura
   ```

2. **Gerar Código**
   ```
   Use mcp_figma_get_code com:
   - nodeId: ID do componente
   - fileKey: ID do arquivo
   - clientLanguages: "typescript"
   - clientFrameworks: "react,next.js,tailwind"
   ```

3. **Refinar e Integrar**
   - Revisar código gerado
   - Ajustar para padrões do projeto
   - Integrar com tipos existentes

## Exemplo de Uso

```typescript
// Extrair de URL: https://figma.com/design/pqrs/ExampleFile?node-id=1-2

const fileKey = "pqrs"
const nodeId = "1:2"

// O MCP retornará:
// - Código React/TypeScript
// - URLs de assets para download
// - Estrutura do componente
```

## Melhorias UX Implementadas

As seguintes melhorias foram aplicadas às páginas do portfolio (`/jpcardozx`):

### 1. **HeroThreeScene**
- ✅ Removida foto de profile
- ✅ Copy mais profissional e neutro
- ✅ Foco em capacidades técnicas objetivas

### 2. **ExpertiseMatrix**
- ✅ Descrições mais factuais e menos arrogantes
- ✅ Métricas realistas e verificáveis
- ✅ Tom profissional e informativo

### 3. **TechnicalPhilosophy**
- ✅ Princípios descritos de forma neutra
- ✅ Remoção de linguagem superlativa
- ✅ Foco em práticas e processos

### 4. **ProcessMethodology**
- ✅ Implementação de collapsibles com Framer Motion
- ✅ Navegação facilitada com seções expansíveis
- ✅ Copy mais claro e objetivo
- ✅ Primeira seção aberta por padrão
- ✅ Rastreamento de comportamento (via onOpenChange)

## Componente Collapsible

Criado componente reutilizável em `/src/components/ui/collapsible-section.tsx`:

**Features:**
- Animações suaves com Framer Motion
- Estados de hover e foco acessíveis
- Variantes: `default` e `featured`
- Rastreamento de estado (callbacks)
- Layout responsivo
- Suporte a ícones customizados

**Uso:**
```tsx
<CollapsibleSection
  title="Título"
  description="Descrição"
  icon={<IconComponent />}
  defaultOpen={false}
  variant="default"
  onOpenChange={(open) => trackEvent('section_opened')}
>
  {/* Conteúdo */}
</CollapsibleSection>
```

## Próximos Passos

1. Adicionar token do Figma ao `.env.local`
2. Testar conexão com arquivo de design
3. Implementar workflow de design-to-code
4. Documentar componentes gerados

## Troubleshooting

### Token Inválido
```bash
Error: Invalid Figma token
```
**Solução:** Verifique se o token está correto no `.env.local`

### Node ID Inválido
```bash
Error: Node not found
```
**Solução:** Verifique o formato do nodeId (deve ser `123:456` não `123-456`)

### Servidor Não Conecta
```bash
Error: Failed to connect to MCP server
```
**Solução:** 
- Verifique conexão internet
- Confirme que o npx pode instalar pacotes
- Reinicie o VS Code

## Recursos

- [Figma MCP Server](https://github.com/figma/mcp-server-figma)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Figma API Docs](https://www.figma.com/developers/api)
