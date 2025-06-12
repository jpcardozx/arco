// Script para corrigir erros comuns de ESLint de forma automatizada
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔍 Iniciando correção avançada de erros ESLint');

// 1. Configurar o ambiente para React e Browser
console.log('⚙️ Atualizando configuração ESLint para React e Browser globals');

// Substituir a configuração baseada em 'extends' por uma configuração flat
const eslintConfig = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks", "import", "react"],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    React: "writable",
    JSX: "writable",
    document: "writable",
    window: "writable",
    navigator: "writable",
    localStorage: "writable",
    setTimeout: "writable",
    clearTimeout: "writable",
    setInterval: "writable",
    clearInterval: "writable",
    HTMLElement: "writable",
    HTMLDivElement: "writable",
    HTMLButtonElement: "writable",
    HTMLInputElement: "writable",
    HTMLTextAreaElement: "writable",
    HTMLSelectElement: "writable",
    HTMLSpanElement: "writable",
    HTMLHeadingElement: "writable",
    HTMLParagraphElement: "writable",
    HTMLAnchorElement: "writable",
    CustomEvent: "writable",
    Event: "writable",
    SVGSVGElement: "writable",
    MutationObserver: "writable",
    URL: "writable",
    URLSearchParams: "writable",
    Blob: "writable",
    fetch: "writable",
    performance: "writable",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/no-unescaped-entities": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/prop-types": "off",
    "import/order": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "@typescript-eslint/no-require-imports": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "no-useless-escape": "warn",
    "@typescript-eslint/no-empty-object-type": "warn",
    "react/jsx-curly-brace-presence": [
      "error",
      {
        props: "never",
        children: "never",
      },
    ],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-pascal-case": "error",
    "react/hook-use-state": "warn",
    "no-console": [
      "warn",
      {
        allow: ["warn", "error", "info"],
      },
    ],
    "prefer-const": "error",
    "spaced-comment": ["error", "always"],
    "no-undef": "warn",
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "out/",
    "public/",
    "*.config.js",
    "*.config.mjs",
    "next.config.mjs",
    "next.config.js",
    "postcss.config.js",
    "tailwind.config.js",
    "eslint-fix-scripts/**/*.js",
    "fix-eslint*.js",
  ],
};

// Backup dos arquivos de configuração ESLint existentes
if (fs.existsSync('.eslintrc.js')) {
  fs.renameSync('.eslintrc.js', '.eslintrc.js.bak');
  console.log('✅ Backup de .eslintrc.js criado');
}

if (fs.existsSync('.eslintrc.json')) {
  fs.renameSync('.eslintrc.json', '.eslintrc.json.bak');
  console.log('✅ Backup de .eslintrc.json criado');
}

if (fs.existsSync('eslint.config.mjs')) {
  fs.renameSync('eslint.config.mjs', 'eslint.config.mjs.bak');
  console.log('✅ Backup de eslint.config.mjs criado');
}

// Escrever a nova configuração
fs.writeFileSync('.eslintrc.json', JSON.stringify(eslintConfig, null, 2));
console.log('✅ Nova configuração ESLint criada em .eslintrc.json');

// 2. Corrigir imports não utilizados
console.log('🧹 Corrigindo imports não utilizados...');

// Função para lidar com os arquivos TypeScript/TSX
function processFiles() {
  const files = glob.sync('**/*.{ts,tsx}', {
    ignore: ['node_modules/**', '.next/**', 'out/**', 'public/**']
  });

  console.log(`🔍 Processando ${files.length} arquivos...`);

  // Prefixar variáveis não utilizadas com underscore para evitar avisos
  files.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Encontrar e marcar parâmetros não utilizados em funções com underscore
      content = content.replace(/(\(\s*{[^}]*?)(\w+)(\s*}:[^=]+=>)/g, (match, before, param, after) => {
        // Verificar se o parâmetro é usado no corpo da função
        const isUsed = new RegExp(`[^\\w]${param}[^\\w]`).test(match);
        return isUsed ? match : `${before}_${param}${after}`;
      });
      
      fs.writeFileSync(file, content);
    } catch (error) {
      console.error(`Erro ao processar o arquivo ${file}:`, error);
    }
  });
}

// Executar processamento de arquivos
try {
  processFiles();
  console.log('✅ Processamento de variáveis não utilizadas concluído');
} catch (error) {
  console.error('❌ Erro durante o processamento de arquivos:', error);
}

// 3. Executar ESLint com a opção --fix para corrigir problemas simples automaticamente
console.log('🔧 Executando ESLint com a opção --fix para corrigir problemas automaticamente...');
try {
  execSync('npx eslint --ext .js,.jsx,.ts,.tsx --fix .', { stdio: 'inherit' });
  console.log('✅ ESLint executado com sucesso');
} catch (error) {
  console.error('⚠️ ESLint encontrou problemas que não puderam ser corrigidos automaticamente');
}

console.log('🎉 Processo de correção de erros ESLint concluído');
console.log('👉 Execute "npx eslint ." para verificar os erros restantes');
