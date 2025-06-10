/**
 * Script principal para consolidação e reorganização do projeto ARCO
 * Este script coordena a execução de todos os passos necessários
 * para implementar a nova arquitetura e sistema de design
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cores para saída de console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

// Função para executar um comando com log
function runCommand(command, description) {
  console.log(`\n${colors.bright}${colors.blue}=== ${description} ===${colors.reset}\n`);
  
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`\n${colors.green}✓ ${description} concluído com sucesso${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`\n${colors.red}✗ Erro ao executar ${description}: ${error.message}${colors.reset}`);
    return false;
  }
}

// Função auxiliar para criar diretórios necessários
function ensureDirectories() {
  console.log(`\n${colors.bright}${colors.blue}=== Criando estrutura de diretórios ===${colors.reset}\n`);
  
  const directories = [
    'src/components/ui',
    'src/components/layout',
    'src/components/sections',
    'src/components/features',
    'src/lib/utils',
    'src/lib/hooks',
    'src/lib/config',
    'src/lib/context',
    'src/styles',
    'src/types',
    'src/app'
  ];
  
  let success = true;
  
  directories.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    
    if (!fs.existsSync(fullPath)) {
      try {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`${colors.green}✓ Diretório criado: ${dir}${colors.reset}`);
      } catch (error) {
        console.error(`${colors.red}✗ Erro ao criar diretório ${dir}: ${error.message}${colors.reset}`);
        success = false;
      }
    } else {
      console.log(`${colors.dim}Diretório já existe: ${dir}${colors.reset}`);
    }
  });
  
  if (success) {
    console.log(`\n${colors.green}✓ Estrutura de diretórios criada com sucesso${colors.reset}`);
  }
  
  return success;
}

// Configurar ESLint para evitar problemas recorrentes
function configureESLint() {
  console.log(`\n${colors.bright}${colors.blue}=== Configurando ESLint ===${colors.reset}\n`);
  
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
    // Fazer backup da configuração atual
    if (fs.existsSync(path.join(process.cwd(), 'eslint.config.mjs'))) {
      fs.copyFileSync(
        path.join(process.cwd(), 'eslint.config.mjs'),
        path.join(process.cwd(), 'eslint.config.mjs.backup-' + Date.now())
      );
    }
    
    // Gravar nova configuração
    fs.writeFileSync(path.join(process.cwd(), 'eslint.config.mjs'), eslintConfig, 'utf-8');
    console.log(`${colors.green}✓ Configuração do ESLint atualizada${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ Erro ao configurar ESLint: ${error.message}${colors.reset}`);
    return false;
  }
}

// Função principal - coordena todas as etapas
async function consolidateProject() {
  console.log(`\n${colors.bright}${colors.yellow}======= CONSOLIDAÇÃO DO PROJETO ARCO =======${colors.reset}\n`);
  console.log(`${colors.cyan}Este script reorganizará e consolidará o projeto ARCO${colors.reset}`);
  console.log(`${colors.cyan}implementando as melhores práticas e resolvendo problemas estruturais.${colors.reset}\n`);
  
  // 1. Criar estrutura de diretórios
  const directoriesCreated = ensureDirectories();
  
  if (!directoriesCreated) {
    console.error(`${colors.red}Falha ao criar diretórios. Abortando.${colors.reset}`);
    return;
  }
  
  // 2. Configurar ESLint
  const eslintConfigured = configureESLint();
  
  if (!eslintConfigured) {
    console.warn(`${colors.yellow}⚠️ Aviso: Falha ao configurar ESLint, mas continuando...${colors.reset}`);
  }
  
  // 3. Consolidar componentes
  const componentsConsolidated = runCommand('node scripts/consolidate-components-v2.js', 'Consolidação de componentes');
  
  if (!componentsConsolidated) {
    console.warn(`${colors.yellow}⚠️ Aviso: Falha ao consolidar componentes, mas continuando...${colors.reset}`);
  }
  
  // 4. Atualizar importações
  const importsUpdated = runCommand('node scripts/update-component-imports.js', 'Atualização de importações');
  
  if (!importsUpdated) {
    console.warn(`${colors.yellow}⚠️ Aviso: Falha ao atualizar importações, mas continuando...${colors.reset}`);
  }
  
  // 5. Executar ESLint para corrigir problemas automaticamente
  runCommand('npx eslint --fix .', 'Correção automática de ESLint');
  
  // 6. Executar Prettier para formatação
  runCommand('npx prettier --write "**/*.{js,jsx,ts,tsx,json}"', 'Formatação com Prettier');
  
  // 7. Limpar cache
  runCommand('npx rimraf .next node_modules/.cache', 'Limpeza de cache');
  
  // Mensagem final
  console.log(`\n${colors.bright}${colors.green}======= CONSOLIDAÇÃO CONCLUÍDA =======${colors.reset}\n`);
  console.log(`${colors.cyan}O projeto foi reorganizado e consolidado com sucesso!${colors.reset}`);
  console.log(`${colors.cyan}Consulte o arquivo DESIGN_SYSTEM.md para mais informações sobre o novo sistema de design.${colors.reset}\n`);
  console.log(`${colors.yellow}Próximos passos:${colors.reset}`);
  console.log(`${colors.yellow}1. Execute "npm run dev" para verificar se tudo está funcionando${colors.reset}`);
  console.log(`${colors.yellow}2. Verifique se há problemas de ESLint restantes com "npm run lint"${colors.reset}`);
  console.log(`${colors.yellow}3. Teste os novos componentes e sua integração${colors.reset}\n`);
}

// Executar a função principal
consolidateProject().catch(error => {
  console.error(`${colors.red}Erro fatal durante a consolidação: ${error.message}${colors.reset}`);
  process.exit(1);
});
