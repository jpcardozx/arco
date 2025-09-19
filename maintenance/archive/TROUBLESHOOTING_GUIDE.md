# Guia de Solução de Problemas do Projeto ARCO

Este documento fornece soluções para os problemas mais comuns encontrados no projeto ARCO.

## Estrutura do Projeto

O projeto ARCO possui uma estrutura que mistura componentes em duas localizações:

1. `/components` (na raiz)
2. `/src/components` (na pasta src)

Esta duplicidade pode causar confusão e problemas de importação.

## Problemas Comuns e Soluções

### 1. Classes do Tailwind CSS não estão funcionando

**Sintomas:**

- Estilos não são aplicados
- Classes como `bg-blue-500`, `flex`, etc. não têm efeito

**Soluções:**

1. **Verificar as diretivas do Tailwind no globals.css**

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. **Verificar o tailwind.config.ts**

   - Certifique-se de que o `content` inclui todos os diretórios relevantes:

   ```typescript
   content: [
     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
     './components/**/*.{js,ts,jsx,tsx,mdx}',  // Incluir componentes da raiz
   ],
   ```

3. **Limpar o cache**

   ```bash
   rmdir /s /q .next
   rmdir /s /q node_modules\.cache
   ```

4. **Executar em modo de desenvolvimento explícito**
   ```bash
   set NODE_ENV=development && npm run dev
   ```

### 2. Componentes não são encontrados (Module not found)

**Sintomas:**

- Erro `Module not found: Can't resolve '@/components/...'`
- Páginas em branco sem erros no console
- Falha ao compilar

**Soluções:**

1. **Verificar o caminho correto do componente**

   - Use a estrutura de diretórios recomendada:
     - `/src/components/layout/` - Componentes de layout (NavBar, Footer)
     - `/src/components/sections/` - Seções de página (Hero, CTA)
     - `/src/components/features/` - Funcionalidades complexas
     - `/src/components/ui/` - Elementos UI básicos

2. **Copiar componentes para os diretórios corretos**

   ```powershell
   # Exemplo para NavBarEnhanced
   Copy-Item "components\NavBarEnhanced.tsx" "src\components\layout\NavBarEnhanced.tsx"
   ```

3. **Corrigir importações**

   - Substitua:

   ```typescript
   import Component from '@/components/features/Component';
   ```

   - Por:

   ```typescript
   import Component from '@/components/layout/Component';  # ou o diretório correto
   ```

4. **Verificar aliases no tsconfig.json**
   - Certifique-se de que os alias `@/` estão configurados corretamente:
   ```json
   "paths": {
     "@/*": ["./src/*"],
     "@/components/*": ["./src/components/*"],
     ...
   }
   ```

### 3. Erros de ESLint

**Sintomas:**

- Erros de sintaxe
- Warnings sobre regras de estilo
- Problemas com as importações

**Soluções:**

1. **Executar a correção automática**

   ```bash
   npx eslint --fix .
   ```

2. **Corrigir importações React**

   - Certifique-se de que o React está importado corretamente:

   ```typescript
   import React from 'react';
   ```

3. **Corrigir a ordem das importações**
   - Use esta ordem:
     1. Bibliotecas externas (React, Next.js)
     2. Componentes da aplicação
     3. Utilitários e hooks
     4. Estilos

### 4. Problemas com scripts PowerShell

**Sintomas:**

- Scripts não são executados
- Erros de permissão ou codificação

**Soluções:**

1. **Executar como administrador**

   - Abra PowerShell como administrador

2. **Alterar a política de execução**

   ```powershell
   Set-ExecutionPolicy -Scope Process Bypass
   ```

3. **Verificar a codificação do arquivo**

   - Salve os scripts como UTF-8 sem BOM

4. **Executar diretamente**
   ```powershell
   powershell.exe -ExecutionPolicy Bypass -File "caminho\para\script.ps1"
   ```

## Fluxo de Correção Recomendado

Se tudo falhar, siga este fluxo de correção:

1. **Limpar o projeto**

   ```bash
   rmdir /s /q .next
   rmdir /s /q node_modules\.cache
   ```

2. **Corrigir a estrutura de componentes**

   - Execute `.\scripts\start-dev.ps1` para copiar componentes para os lugares corretos

3. **Corrigir importações em page.tsx**

   - Certifique-se de que `NavBarEnhanced` está sendo importado de `@/components/layout`
   - Certifique-se de que `ProcessEnhanced` está sendo importado de `@/components/sections`

4. **Reiniciar o servidor**

   ```bash
   npm run dev
   ```

5. **Se ainda houver problemas**
   - Verifique o console do navegador para erros específicos
   - Conserte um componente de cada vez, começando pelos mais críticos

## Consolidação de Longo Prazo

Para evitar problemas futuros, recomendamos uma consolidação completa:

1. Mover todos os componentes para `/src/components/` com subpastas apropriadas
2. Atualizar todas as importações para usar `@/components/...`
3. Remover a pasta `/components` da raiz
4. Padronizar a organização de arquivos

---

Para assistência adicional, consulte a documentação NextJS sobre [importações absolutas](https://nextjs.org/docs/advanced-features/module-path-aliases) e [customização do Tailwind](https://tailwindcss.com/docs/configuration).
