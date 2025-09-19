# ARCO - Projeto Restaurado

Este documento detalha as mudanças realizadas para resolver problemas críticos de ESLint e Tailwind CSS no projeto ARCO.

## Problemas Resolvidos

1. **Configuração do ESLint**

   - Corrigidos erros de duplicação de componentes
   - Resolvidos problemas com expressões regulares
   - Corrigida a renderização condicional dos hooks do React
   - Adicionada configuração apropriada para o ESLint

2. **Configuração do Tailwind CSS**

   - Corrigido o caminho de importação dos arquivos CSS no globals.css
   - Verificada a estrutura do projeto para garantir que o Tailwind seja aplicado corretamente
   - Adicionadas classes adequadas ao layout principal

3. **Internacionalização**

   - Migração do sistema de i18n para o middleware do Next.js 13+
   - Implementação adequada da detecção automática de idioma

4. **Problemas de TypeScript**

   - Corrigidos erros de tipagem em vários componentes
   - Resolvido o problema com as anotações @ts-ignore

5. **Estrutura de Diretórios**
   - Corrigido o problema de importação de componentes com caminhos incorretos
   - Ajustes na estrutura para melhor organização

## Scripts de Manutenção

Os seguintes scripts foram criados para ajudar na manutenção contínua:

1. **`eslint-fix-scripts/fix-all-comprehensive.js`**

   - Script abrangente para corrigir automaticamente problemas comuns do ESLint
   - Corrige variáveis não utilizadas, dependências de hooks, e mais

2. **`scripts/reset-and-rebuild.js`**
   - Limpa completamente o projeto e reinstala todas as dependências
   - Útil quando houver problemas graves com módulos ou configuração

## Como Usar os Scripts

Para executar o script de correção do ESLint:

```bash
node eslint-fix-scripts/fix-all-comprehensive.js
```

Para realizar uma reconstrução completa do projeto:

```bash
node scripts/reset-and-rebuild.js
```

## Boas Práticas para Manutenção

1. **Sempre use Tailwind com classes padrão**

   - Evite misturar CSS personalizado com Tailwind quando possível
   - Prefira usar `className="text-lg font-bold"` em vez de criar classes personalizadas

2. **Mantenha a estrutura de diretórios consistente**

   - Componentes compartilhados devem ficar em `components/`
   - Componentes específicos de página em `components/[página]/`
   - Hooks reutilizáveis em `hooks/`

3. **Padrões de código**

   - Use destructuring para hooks do React: `const [state, setState] = useState()`
   - Prefixe variáveis não utilizadas com underscore: `const [_value, setValue] = useState()`
   - Importe React apenas quando necessário (Next.js 13+ não precisa de import para JSX)

4. **Internacionalização**
   - Use o sistema de middleware baseado em rotas do Next.js 13+
   - Mantenha todas as strings em arquivos de tradução

## Próximos Passos

- Completar a migração para uma arquitetura baseada em componentes mais modular
- Implementar testes automatizados para garantir estabilidade
- Melhorar a performance com otimizações adicionais

---

Documento criado em 12 de maio de 2025 após a restauração do projeto ARCO.
