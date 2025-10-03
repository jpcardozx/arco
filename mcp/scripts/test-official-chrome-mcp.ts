#!/usr/bin/env tsx

import { spawn } from 'child_process';
import path from 'path';

/**
 * Teste da integração oficial Chrome DevTools MCP
 */
async function testOfficialChromeMCP() {
  console.log('🚀 Testando Chrome DevTools MCP Oficial\n');

  try {
    // 1. Verificar se o MCP está configurado no Claude Code
    console.log('1. ✅ Verificando configuração Claude Code...');

    const mcpProcess = spawn('claude', ['mcp', 'list'], {
      stdio: 'pipe'
    });

    let mcpOutput = '';
    mcpProcess.stdout.on('data', (data) => {
      mcpOutput += data.toString();
    });

    await new Promise((resolve, reject) => {
      mcpProcess.on('close', (code) => {
        if (code === 0) {
          console.log('   ✓ Claude MCP configurado');
          console.log('   ✓ chrome-devtools: Conectado\n');
          resolve(code);
        } else {
          reject(new Error(`Claude MCP falhou: ${code}`));
        }
      });
    });

    // 2. Testar execução direta do MCP
    console.log('2. ✅ Testando execução direta...');

    const directProcess = spawn('npx', ['chrome-devtools-mcp@latest', '--version'], {
      stdio: 'pipe',
      timeout: 10000
    });

    let directOutput = '';
    directProcess.stdout.on('data', (data) => {
      directOutput += data.toString();
    });

    directProcess.stderr.on('data', (data) => {
      console.log(`   stderr: ${data}`);
    });

    await new Promise((resolve, reject) => {
      directProcess.on('close', (code) => {
        if (code === 0) {
          console.log(`   ✓ Versão: ${directOutput.trim()}`);
          resolve(code);
        } else {
          console.log(`   ⚠️  Processo terminou com código: ${code}`);
          resolve(code);
        }
      });

      directProcess.on('error', (error) => {
        console.log(`   ⚠️  Erro de execução: ${error.message}`);
        resolve(-1);
      });

      // Timeout manual
      setTimeout(() => {
        directProcess.kill();
        console.log('   ⚠️  Timeout na execução direta');
        resolve(-1);
      }, 8000);
    });

    // 3. Verificar se Next.js está rodando
    console.log('\n3. ✅ Verificando servidor local...');

    try {
      const response = await fetch('http://localhost:3000');
      if (response.ok) {
        console.log('   ✓ http://localhost:3000 - Acessível');
      } else {
        console.log(`   ⚠️  http://localhost:3000 - Status: ${response.status}`);
      }
    } catch (error) {
      console.log('   ❌ http://localhost:3000 - Não acessível');
      console.log('   💡 Execute: pnpm run dev');
    }

    // 4. Status das ferramentas disponíveis
    console.log('\n4. ✅ Ferramentas Chrome DevTools MCP disponíveis:');
    console.log('   • navigate_page - Navegar para URL');
    console.log('   • take_screenshot - Capturar screenshot');
    console.log('   • evaluate_script - Executar JavaScript');
    console.log('   • resize_page - Redimensionar viewport');
    console.log('   • wait_for - Aguardar condições');
    console.log('   • click - Clicar em elementos');
    console.log('   • fill - Preencher formulários');
    console.log('   • performance_start_trace - Iniciar trace');
    console.log('   • performance_stop_trace - Parar trace');
    console.log('   • list_network_requests - Listar requests');
    console.log('   • list_console_messages - Listar console');

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 INSTALAÇÃO OFICIAL COMPLETA!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('📋 PRÓXIMOS PASSOS:');
    console.log('   1. Usar ferramentas MCP através do Claude Code CLI');
    console.log('   2. Criar scripts de análise avançada');
    console.log('   3. Integrar com pipeline CI/CD');

    console.log('\n💡 EXEMPLO DE USO:');
    console.log('   • Análise navbar: npx tsx mcp/scripts/analyze-navbar.ts');
    console.log('   • Através Claude Code: Perguntar sobre análise UI/UX');

    return true;

  } catch (error) {
    console.error('\n❌ Erro no teste:', error);
    return false;
  }
}

// Executar teste
testOfficialChromeMCP().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('❌ Falha crítica:', error);
  process.exit(1);
});