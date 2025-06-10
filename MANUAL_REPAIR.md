# ARCO Project - Manual Repair Guide

Este guia fornece instruções passo a passo para corrigir os problemas no projeto ARCO relacionados aos componentes que não estão carregando corretamente e ao Tailwind CSS que não está funcionando adequadamente.

## 1. Problemas Identificados

1. **Inconsistência de Estrutura de Diretórios**: Componentes duplicados em `/components` e `/src/components`
2. **Caminhos de Importação Incorretos**: Referências inconsistentes para componentes
3. **Problemas com Tailwind CSS**: Classes não estão sendo aplicadas corretamente
4. **Problemas de Execução de Scripts**: Os scripts PowerShell não estão executando adequadamente

## 2. Correções Manuais Necessárias

### Passo 1: Corrigir o Arquivo page.tsx

Abra o arquivo `src/app/page.tsx` e faça as seguintes alterações:

1. Corrigir a importação do NavBarEnhanced:

   ```tsx
   // Alterar:
   import NavBarEnhanced from '@/components/features/NavBarEnhanced';

   // Para:
   import NavBarEnhanced from '@/components/layout/NavBarEnhanced';
   ```

2. Certifique-se que os imports dinâmicos estão apontando para os locais corretos:
   ```tsx
   const HeroARCOEnhanced = dynamic(() => import('@/components/sections/HeroARCOEnhanced'));
   const ProcessEnhanced = dynamic(() => import('@/components/sections/ProcessEnhanced'));
   const CaseStudiesEnhanced = dynamic(() => import('@/components/features/CaseStudiesEnhanced'));
   ```

### Passo 2: Corrigir o Arquivo globals.css

Certifique-se de que o arquivo `src/app/globals.css` contém as diretivas do Tailwind corretamente:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Somente então incluir as importações de estilos externos */
@import '../../styles/premium-styles.css';
@import '../../styles/premium.css';
@import '../../styles/portfolio-enhanced.css';
```

### Passo 3: Mover Componentes para os Diretórios Corretos

Para cada componente que não está sendo encontrado:

1. **NavBarEnhanced**: Se estiver em `components/features`, copie-o para `src/components/layout`:

   ```
   copy "components\NavBarEnhanced.tsx" "src\components\layout\NavBarEnhanced.tsx"
   ```

2. **HeroARCOEnhanced**: Se estiver em `components`, copie-o para `src/components/sections`:

   ```
   copy "components\HeroARCOEnhanced.tsx" "src\components\sections\HeroARCOEnhanced.tsx"
   ```

3. **ProcessEnhanced**: Se estiver em `components`, copie-o para `src/components/sections`:
   ```
   copy "components\ProcessEnhanced.tsx" "src\components\sections\ProcessEnhanced.tsx"
   ```

### Passo 4: Verificar e Corrigir o tailwind.config.ts

Certifique-se de que o arquivo `tailwind.config.ts` está configurado corretamente:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Inclua esta linha para garantir que os componentes da raiz sejam processados
  ],
  theme: {
    extend: {
      // Suas extensões de tema aqui...
    },
  },
  plugins: [],
};

export default config;
```

### Passo 5: Limpar o Cache do Next.js

Execute os comandos abaixo para limpar o cache do Next.js:

```bash
rmdir /s /q .next
rmdir /s /q node_modules\.cache
```

### Passo 6: Reinstalar as Dependências (Opcional)

Se os problemas persistirem, tente reinstalar as dependências:

```bash
npm i
```

### Passo 7: Iniciar o Servidor de Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 3. Verificação Pós-Correção

Depois de aplicar as correções acima:

1. Verifique se todos os componentes estão carregando corretamente na página
2. Verifique se as classes do Tailwind estão sendo aplicadas adequadamente
3. Verifique se não há erros no console do navegador

## 4. Problemas Comuns e Soluções

### Classes do Tailwind não funcionam:

- Verifique as diretivas no globals.css
- Verifique se postcss.config.mjs está correto
- Tente adicionar `NODE_ENV=development` antes do comando npm run dev

### Componentes não encontrados:

- Verifique o caminho de importação (use `@/components/...`)
- Verifique se o componente existe no diretório correto
- Verifique a capitalização dos nomes de arquivos e importações

### Erros nos scripts PowerShell:

- Verifique a política de execução (`Set-ExecutionPolicy -Scope Process Bypass`)
- Execute PowerShell como administrador
- Verifique a codificação do arquivo (deve ser UTF-8)

## 5. Estrutura de Diretórios Recomendada

Para evitar problemas futuros, recomendamos organizar seu projeto conforme abaixo:

```
src/
  ├── app/
  │   ├── layout.tsx
  │   ├── page.tsx
  │   └── globals.css
  ├── components/
  │   ├── features/     (componentes complexos e interativos)
  │   ├── layout/       (componentes de layout como NavBar, Footer)
  │   ├── sections/     (seções maiores de página como Hero, CTA)
  │   └── ui/           (componentes UI reutilizáveis)
  └── lib/
      └── utils/
          └── analytics.ts
```

Eventualmente, você pode remover a pasta `components` da raiz após garantir que tudo funciona corretamente com os componentes em `src/components`.
