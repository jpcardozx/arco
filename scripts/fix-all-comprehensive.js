/**
 * Script para unificar as correções do ESLint e do Tailwind
 * Combina todas as soluções em uma única sequência de comandos
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Função para executar comandos com log
const runCommand = (command, message) => {
  console.log(chalk.blue(`🔄 ${message}...`));
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(chalk.green(`✅ ${message} concluído com sucesso!`));
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Erro ao executar ${message}: ${error.message}`));
    return false;
  }
};

// Configuração de ESLint corrigida
const setupESLintConfig = () => {
  console.log(chalk.blue('🛠️ Configurando ESLint corretamente...'));
  
  const eslintConfig = `import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "@next/next": nextPlugin
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off", // React 17+ não precisa de import do React
      "react/prop-types": "off", // Usando TypeScript para tipagem
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_", 
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }],
      "@next/next/no-html-link-for-pages": "off"
    }
  }
]);`;

  try {
    fs.writeFileSync(path.join(process.cwd(), 'eslint.config.mjs'), eslintConfig, 'utf8');
    console.log(chalk.green('✅ Configuração do ESLint atualizada com sucesso!'));
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Erro ao configurar ESLint: ${error.message}`));
    return false;
  }
};

// Configuração corrigida do Tailwind
const setupTailwindConfig = () => {
  console.log(chalk.blue('🛠️ Configurando corretamente o Tailwind CSS...'));
  
  // Verificar se a pasta src/styles existe, se não, criar
  const stylesDir = path.join(process.cwd(), 'src', 'styles');
  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }
  
  // Criar arquivo globals.css
  const globalsCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Estilos globais personalizados */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;

    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
  }
  
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
  
  try {
    fs.writeFileSync(path.join(stylesDir, 'globals.css'), globalsCssContent, 'utf8');
    console.log(chalk.green('✅ Arquivo globals.css criado/atualizado!'));
  } catch (error) {
    console.error(chalk.red(`❌ Erro ao criar globals.css: ${error.message}`));
    return false;
  }
  
  // Criar configuração unificada do Tailwind
  const tailwindConfigContent = `import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.grid-center': {
          display: 'grid',
          placeItems: 'center',
        },
      });
    }),
  ],
};

export default config;`;
  
  try {
    fs.writeFileSync(path.join(process.cwd(), 'tailwind.config.ts'), tailwindConfigContent, 'utf8');
    
    // Remover tailwind.config.js se existir
    if (fs.existsSync(path.join(process.cwd(), 'tailwind.config.js'))) {
      fs.unlinkSync(path.join(process.cwd(), 'tailwind.config.js'));
    }
    
    console.log(chalk.green('✅ Configuração do Tailwind atualizada com sucesso!'));
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Erro ao configurar Tailwind: ${error.message}`));
    return false;
  }
};

// Função principal
const main = async () => {
  console.log(chalk.yellow.bold('🚀 Iniciando correção completa do projeto ARCO...'));
  
  // 1. Configurar ESLint
  if (!setupESLintConfig()) {
    console.error(chalk.red('❌ Falha na configuração do ESLint. Abortando...'));
    return;
  }
  
  // 2. Configurar Tailwind
  if (!setupTailwindConfig()) {
    console.error(chalk.red('❌ Falha na configuração do Tailwind. Abortando...'));
    return;
  }
  
  // 3. Garantir que a estrutura de diretórios existe
  const dirs = [
    'src/components/ui',
    'src/components/layout',
    'src/components/features',
    'src/components/sections',
    'src/lib/utils',
    'src/lib/hooks',
    'src/lib/config',
  ];
  
  dirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
  
  // 4. Executar o script de consolidação de componentes
  runCommand('node scripts/consolidate-components-v2.js', 'Consolidação de componentes');
  
  // 5. Executar script de organização do projeto
  runCommand('node scripts/reorganize-project.js', 'Reorganização do projeto');
  
  // 6. Executar script de atualização de importações
  runCommand('node scripts/update-component-imports.js', 'Atualização de importações');
  
  // 6. Atualizar imports do Design System
  runCommand('node scripts/update-design-system-imports.js', 'Atualização de importações do Design System');
  
  // 7. Executar ESLint para corrigir problemas automaticamente
  runCommand('npx eslint --fix --ext .js,.jsx,.ts,.tsx .', 'Correção automática de problemas com ESLint');
  
  // 8. Executar Prettier para formatação
  runCommand('npx prettier --write "**/*.{js,jsx,ts,tsx,json,md}"', 'Formatação do código com Prettier');
  
  // 9. Limpar cache
  runCommand('npx rimraf .next node_modules/.cache', 'Limpeza de cache');
  
  console.log(chalk.green.bold('✨ Correção do projeto concluída com sucesso!'));
  console.log(chalk.yellow('⚠️ Recomendação: Execute "npm run dev" para verificar se tudo está funcionando corretamente.'));
};

// Executar o script
main().catch(error => {
  console.error(chalk.red(`❌ Erro inesperado: ${error.message}`));
  process.exit(1);
});
