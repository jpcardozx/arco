# ARCO Claude Code Configuration

Sistema avançado de contexto e agents para desenvolvimento do projeto ARCO.

---

## 🤖 Agents Instalados

### 1. **context-manager** (Opus)
**Uso:** Gestão de contexto em workflows multi-agent e tarefas longas

**Quando usar:**
- Projetos complexos que precisam coordenação entre múltiplos agents
- Preservação de contexto entre sessões
- Extração de decisões e padrões reutilizáveis

**Capabilities:**
- Context capture: extrai decisões-chave e rationale
- Context distribution: prepara contexto mínimo relevante para cada agent
- Memory management: armazena decisões críticas
- Context indexing: acesso rápido a informações

**Formatos de contexto:**
- Quick Context (< 500 tokens): tarefa atual, decisões recentes, blockers
- Full Context (< 2000 tokens): arquitetura, design decisions, integrações
- Archived Context: histórico, padrões, benchmarks

### 2. **backend-architect**
**Uso:** Arquitetura de backend, APIs, integrações

**Quando usar:**
- Design de APIs (REST, GraphQL)
- Arquitetura de microserviços
- Integrações com serviços externos
- Otimização de performance backend

### 3. **typescript-pro**
**Uso:** TypeScript especialista, type safety, patterns

**Quando usar:**
- Design de tipos complexos
- Refatoração TypeScript
- Performance optimization
- Generic programming

### 4. **database-architect**
**Uso:** Design de schemas, queries, otimizações

**Quando usar:**
- Schema design (Supabase/PostgreSQL)
- Query optimization
- Índices e performance
- Data modeling

### 5. **task-decomposition-expert** (Sonnet)
**Uso:** Breakdown de tarefas complexas em workflows executáveis

**Quando usar PROATIVAMENTE:**
- Projetos multi-step com diferentes capabilities
- Workflow architecture
- Tool selection
- ChromaDB integration

**Framework de análise:**
1. Goal Analysis: entende objetivo, constraints, critérios de sucesso
2. ChromaDB Assessment: avalia se precisa storage/search/retrieval
3. Task Decomposition: hierarquia (objetivos → tarefas → ações)
4. Resource Identification: agents, tools, APIs necessárias
5. Workflow Architecture: sequencial/paralelo/condicional
6. Implementation Roadmap: steps priorizados
7. Optimization: eficiência, riscos, escalabilidade

**ChromaDB Priority:**
- Sempre usar ChromaDB tools PRIMEIRO para:
  - Document storage e semantic search
  - Knowledge base creation/querying
  - Information retrieval
  - Context management
  - Searchable collections

---

## ⚡ Commands Instalados

### 1. **ultra-think**
**Uso:** `[problem or question to analyze]`

**Deep analysis com multi-dimensional thinking:**

1. Parse the Problem
2. Multi-Dimensional Analysis:
   - Technical Perspective (feasibility, scalability, security)
   - Business Perspective (ROI, time-to-market, competitive)
   - User Perspective (UX, accessibility, edge cases)
   - System Perspective (impacts, integrations, dependencies)
3. Generate Multiple Solutions (3-5 approaches)
4. Deep Dive Analysis (implementation, risks, mitigation)
5. Cross-Domain Thinking (parallels de outras indústrias)
6. Challenge and Refine (devil's advocate, stress-test)

**Output:**
- Comprehensive analysis report
- Multiple solution options com pros/cons
- Implementation recommendations
- Risk assessment

### 2. **create-architecture-documentation**
**Uso:** Gera documentação de arquitetura do projeto

**Quando usar:**
- Nova feature que altera arquitetura
- Onboarding de novos devs
- Refactoring significativo
- Architecture reviews

---

## 🔌 MCPs (Model Context Protocol) Instalados

### 1. **context7** (Upstash)
**Uso:** Context management distribuído

**NPX Command:**
```bash
npx -y @upstash/context7-mcp
```

**Capabilities:**
- Distributed context storage
- Cross-session persistence
- Context retrieval
- Context indexing

**Use cases:**
- Manter contexto entre múltiplas sessões
- Compartilhar contexto entre agents
- Histórico de decisões

### 2. **supabase**
**Uso:** Acesso direto ao banco Supabase do projeto

**Configuration:**
```json
{
  "command": "npx",
  "args": ["-y", "@supabase/mcp-server-supabase@latest", "--read-only", "--project-ref=vkclegvrqprevcdgosan"],
  "env": {
    "SUPABASE_ACCESS_TOKEN": "<personal-access-token>"
  }
}
```

**Capabilities:**
- Read-only access ao DB
- Query tables
- Inspect schemas
- View data

**Use cases:**
- Debug de dados
- Schema inspection
- Query optimization
- Data analysis

**⚠️ Setup Required:**
1. Criar Personal Access Token no Supabase Dashboard
2. Atualizar `.mcp.json` com o token
3. Restart Claude Code

---

## 🚀 Workflows Recomendados

### Workflow 1: Feature Development Complexa

```
1. @task-decomposition-expert - Break down feature
2. @backend-architect - Design API/backend
3. @database-architect - Design schema
4. @typescript-pro - Implement with type safety
5. @context-manager - Document decisions
```

### Workflow 2: Architecture Review

```
1. /ultra-think "Should we refactor X?"
2. @backend-architect - Propose solutions
3. /create-architecture-documentation
4. @context-manager - Archive decision
```

### Workflow 3: Database Optimization

```
1. supabase MCP - Inspect current schema
2. @database-architect - Analyze queries
3. @typescript-pro - Update types
4. @context-manager - Document changes
```

### Workflow 4: Problem Solving Complexo

```
1. /ultra-think "Complex problem analysis"
2. @task-decomposition-expert - Break into tasks
3. Specialized agents por tarefa
4. @context-manager - Consolidate results
```

---

## 📊 Comparação: Antes vs Depois

### Antes (Sistema Pobre)
❌ Contexto limitado por sessão  
❌ Sem persistência entre conversas  
❌ Agents sem especialização  
❌ Sem framework de decomposição  
❌ Documentação manual  
❌ Sem acesso direto ao DB

### Depois (Sistema Avançado)
✅ Context management distribuído (context7)  
✅ Persistência via MCPs  
✅ 5 agents especializados  
✅ Task decomposition framework  
✅ Auto-documentação  
✅ Supabase MCP (read-only access)  
✅ ChromaDB integration ready  
✅ Multi-dimensional analysis (/ultra-think)

---

## 🎯 Casos de Uso Práticos

### Caso 1: Nova Feature de Analytics
```
@task-decomposition-expert "Implementar dashboard de analytics com filtros avançados"

→ Decompose em:
  1. Schema design (@database-architect)
  2. API endpoints (@backend-architect)
  3. Type definitions (@typescript-pro)
  4. Context storage (@context-manager)
```

### Caso 2: Otimização de Performance
```
/ultra-think "Nossa API de agendamentos está lenta (>2s)"

→ Análise multi-dimensional:
  - Technical: Query N+1, índices faltando
  - Business: Perda de conversões
  - User: Frustração, abandono
  - System: Load cascata

→ Solutions:
  1. Add indices (@database-architect)
  2. Implement caching (@backend-architect)
  3. Optimize types (@typescript-pro)
```

### Caso 3: Migration Planejamento
```
1. supabase MCP → Inspect current schema
2. /ultra-think "Migrar de X para Y, riscos?"
3. @database-architect → Migration plan
4. @backend-architect → API changes
5. /create-architecture-documentation
6. @context-manager → Archive plan
```

---

## 📝 Best Practices

### Context Management
1. **Use @context-manager proativamente** em projetos > 3 etapas
2. **Archive decisions** antes de mudar de contexto
3. **Create checkpoints** em milestones importantes

### Task Decomposition
1. **Start with @task-decomposition-expert** para features complexas
2. **Use ChromaDB** para armazenar patterns reutilizáveis
3. **Document workflows** para reuso futuro

### Deep Analysis
1. **Use /ultra-think** ANTES de decisões arquiteturais
2. **Gere 3-5 soluções** sempre
3. **Challenge assumptions** com devil's advocate

### MCP Usage
1. **Use supabase MCP** para debug antes de queries SQL manuais
2. **Use context7** para manter histórico de decisões
3. **Configure tokens** no .env.local (não commitar!)

---

## 🔧 Setup Completo

### 1. Configurar Supabase MCP
```bash
# 1. Criar Personal Access Token em https://supabase.com/dashboard/account/tokens
# 2. Adicionar ao .env.local
echo 'SUPABASE_ACCESS_TOKEN=seu_token_aqui' >> .env.local

# 3. Atualizar .mcp.json (já configurado)
```

### 2. Testar MCPs
```bash
# Testar context7
npx -y @upstash/context7-mcp

# Testar supabase (requer token)
npx -y @supabase/mcp-server-supabase@latest --read-only --project-ref=vkclegvrqprevcdgosan
```

### 3. Verificar Agents
```bash
# Listar agents instalados
npx claude-code-templates@latest --list-agents
```

---

## 📚 Recursos

- **Templates:** https://aitmpl.com
- **Documentação:** https://docs.aitmpl.com
- **Upstash Context7:** https://upstash.com/docs/vector/integrations/mcp
- **Supabase MCP:** https://github.com/supabase/mcp-server-supabase

---

**Última atualização:** 27 Out 2025  
**Status:** ✅ Configurado e pronto para uso
