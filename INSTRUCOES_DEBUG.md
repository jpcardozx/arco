# 🚨 INSTRUÇÕES PARA DEBUG - ERRO 500 PERSISTENTE

## Situação Atual

- ✅ Arquivos originais restaurados (page.tsx, layout.tsx, globals.css)
- ✅ Next.js 16.1.6 atualizado
- ✅ Configuração corrigida (lucide-react removido de modularizeImports)
- ❌ **ERRO 500 PERSISTE** - Página não carrega

## 🎯 O QUE PRECISO AGORA

### Copie e Envie os Logs do Terminal

No terminal onde está rodando `pnpm dev`, você deve ver mensagens de erro.

**Por favor, copie e envie:**

1. **Todo o output do servidor** quando você acessou localhost:3000
2. **Stack trace completo** do erro
3. **Qualquer mensagem em vermelho ou amarelo**

Exemplo do que procurar:
```
⨯ Error: ...
    at ...
    at ...

TypeError: ...

⚠ Warning: ...
```

## 🔧 Se Não Vê Logs Claros

Execute este comando para capturar logs detalhados:

```bash
# 1. Pare o servidor (Ctrl+C)

# 2. Limpe cache
pnpm clean:next

# 3. Inicie com logs verbosos
NODE_OPTIONS='--trace-warnings' pnpm dev 2>&1 | tee debug.log

# 4. Acesse localhost:3000 (ou porta que aparecer)

# 5. Copie TODO o conteúdo de debug.log e envie
cat debug.log
```

## 🔍 O Que Estou Procurando

Erros possíveis:
- `Cannot find module ...`
- `TypeError: Cannot destructure ...`
- `ReferenceError: ... is not defined`
- `Error: Invalid hook call ...`
- Qualquer stack trace do Next.js

## 📋 Checklist Antes de Enviar Logs

- [ ] Servidor está rodando (`pnpm dev`)
- [ ] Acessei a URL (localhost:3000 ou outra porta)
- [ ] Copiei **TODO** o output do terminal (não só uma linha)
- [ ] Incluí stack traces completos (linhas que começam com "at ...")

## 💡 Alternativa: Screenshot

Se preferir, tire um **screenshot do terminal** mostrando o erro completo.

## ⚡ Ação Rápida (Teste)

Enquanto isso, teste se páginas simples funcionam:

```bash
# No navegador, tente:
http://localhost:3000/api/health
```

Se API funciona mas páginas não, o problema é no frontend/rendering.

---

**SEM OS LOGS NÃO CONSIGO DIAGNOSTICAR** - O erro está acontecendo no servidor durante o render, e preciso ver a mensagem exata.
