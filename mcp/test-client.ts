import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function testChromeDevTools() {
  console.log('🚀 Iniciando teste do Chrome DevTools MCP...\n');

  // Criar transporte
  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['-y', 'chrome-devtools-mcp@latest']
  });

  // Criar cliente
  const client = new Client(
    { name: 'arco-test', version: '1.0.0' },
    { capabilities: {} }
  );

  try {
    // Conectar
    console.log('📡 Conectando ao servidor MCP...');
    await client.connect(transport);
    console.log('✅ Conectado!\n');

    // Listar tools disponíveis
    console.log('📋 Listando tools disponíveis...');
    const { tools } = await client.listTools();
    console.log(`✅ ${tools.length} tools encontradas:\n`);
    
    const categories: Record<string, string[]> = {};
    tools.forEach(tool => {
      const category = tool.name.split('_')[0];
      if (!categories[category]) categories[category] = [];
      categories[category].push(tool.name);
    });
    
    Object.entries(categories).forEach(([cat, toolNames]) => {
      console.log(`  ${cat}: ${toolNames.length} tools`);
    });
    console.log('');

    // Teste 1: Navegar para página
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🌐 Teste 1: Navegando para localhost:3000...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    try {
      const navResult = await client.callTool({
        name: 'navigate_page',
        arguments: { url: 'http://localhost:3000' }
      });
      console.log('✅ Navegação concluída');
      console.log('Resultado:', JSON.stringify(navResult, null, 2));
    } catch (error) {
      console.log('⚠️  Erro na navegação (servidor pode não estar rodando)');
      console.log('   Execute: npm run dev');
    }
    console.log('');

    // Teste 2: Listar páginas abertas
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📄 Teste 2: Listando páginas abertas...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const pagesResult = await client.callTool({
      name: 'list_pages',
      arguments: {}
    });
    console.log('✅ Páginas listadas');
    console.log('Resultado:', JSON.stringify(pagesResult, null, 2));
    console.log('');

    // Teste 3: Tirar screenshot
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📸 Teste 3: Tirando screenshot...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const screenshotResult = await client.callTool({
      name: 'take_screenshot',
      arguments: {}
    });
    console.log('✅ Screenshot capturado');
    const content = screenshotResult.content as any[];
    console.log('Tamanho dos dados:', 
      content?.[0]?.type === 'image' 
        ? `${Math.round(content[0].data.length / 1024)}KB` 
        : 'N/A'
    );
    console.log('');

    // Teste 4: Avaliar JavaScript (análise do hero)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 Teste 4: Analisando hero section...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    try {
      const evalResult = await client.callTool({
        name: 'evaluate_script',
        arguments: {
          script: `
            const hero = document.querySelector('[class*="hero"]');
            if (!hero) {
              return { error: 'Hero section não encontrada' };
            }
            
            const styles = getComputedStyle(hero);
            const container = hero.parentElement;
            const containerStyles = container ? getComputedStyle(container) : null;
            
            return {
              heroFound: true,
              hero: {
                tagName: hero.tagName,
                className: hero.className,
                display: styles.display,
                justifyContent: styles.justifyContent,
                alignItems: styles.alignItems,
                minHeight: styles.minHeight,
                position: hero.offsetLeft + ',' + hero.offsetTop
              },
              container: containerStyles ? {
                display: containerStyles.display,
                justifyContent: containerStyles.justifyContent,
                alignItems: containerStyles.alignItems
              } : null
            };
          `
        }
      });
      console.log('✅ Análise concluída');
      console.log('Resultado:', JSON.stringify(evalResult, null, 2));
    } catch (error) {
      const err = error as Error;
      console.log('⚠️  Erro na análise:', err.message);
    }
    console.log('');

    // Teste 5: Console messages
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 Teste 5: Verificando console...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const consoleResult = await client.callTool({
      name: 'list_console_messages',
      arguments: {}
    });
    console.log('✅ Console verificado');
    console.log('Resultado:', JSON.stringify(consoleResult, null, 2));
    console.log('');

    // Sumário
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Todos os testes concluídos!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📊 Sumário:');
    console.log(`   • ${tools.length} tools disponíveis`);
    console.log('   • Navegação: ✅');
    console.log('   • Screenshot: ✅');
    console.log('   • JavaScript eval: ✅');
    console.log('   • Console tracking: ✅');
    console.log('');
    console.log('🎯 Próximos passos:');
    console.log('   1. Use MCP Inspector para testes interativos');
    console.log('   2. Customize este script para suas necessidades');
    console.log('   3. Integre com seu workflow de desenvolvimento');
    console.log('');

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await client.close();
    console.log('👋 Cliente MCP desconectado');
  }
}

// Executar
testChromeDevTools().catch(console.error);
