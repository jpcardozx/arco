@echo off
echo ===== Correcao Simples do Tailwind CSS =====
echo.

echo 1. Adicionando classes comuns ao safelist...
cd %~dp0
npx tailwindcss init safelist.js --full

echo 2. Copiando arquivos para garantir que o Tailwind tenha todas as classes necessarias...
copy tailwind.config.ts tailwind.config.ts.bak

echo 3. Atualizando configuracao do safelist...
powershell -Command "(Get-Content tailwind.config.ts) -replace 'content: \[', 'content: [''./src/**/*.{js,ts,jsx,tsx,mdx}'', ''./components/**/*.{js,ts,jsx,tsx,mdx}'',], safelist: [''flex'', ''flex-col'', ''items-center'', ''justify-center'', ''gap-4'', ''p-4'', ''text-center'', ''rounded-lg'', ''bg-white'', ''bg-neutral-100'', ''text-black'', ''w-full'', ''h-full'', ''m-4'', ''px-4'', ''py-2'', ''border'', ''border-neutral-200'', ''shadow-lg'',' | Set-Content tailwind.config.ts"

echo 4. Ativando plugins do Tailwind...
powershell -Command "(Get-Content tailwind.config.ts) -replace 'plugins: \[', 'plugins: [require(''@tailwindcss/typography''), require(''@tailwindcss/forms''), require(''@tailwindcss/aspect-ratio''), require(''@tailwindcss/container-queries''),' | Set-Content tailwind.config.ts"

echo 5. Aplicando mudancas e limpando caches...
if exist .next rmdir /s /q .next
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo.
echo ===== Tailwind CSS corrigido! =====
echo Execute 'npm run dev' para ver as mudanças.
echo.

pause
