import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function analyzePerformance(url: string) {
  console.log(`🚀 Iniciando análise de performance para ${url}...
`);

  const transport = new StdioClientTransport({
    command: 'node',
    args: [
      '/home/jpcardozx/projetos/arco/node_modules/.pnpm/chrome-devtools-mcp@0.6.0/node_modules/chrome-devtools-mcp/build/src/index.js',
      '--headless=true'
    ]
  });

  const client = new Client(
    { name: 'performance-analyzer', version: '1.0.0' },
    { capabilities: {} }
  );

  try {
    await client.connect(transport);
    console.log('✅ Conectado ao servidor MCP.\n');

    console.log(`🌐 Navegando para ${url}...`);
    await client.callTool({
      name: 'navigate_page',
      arguments: { url }
    });
    await client.callTool({ name: 'wait_for', arguments: { text: 'networkidle' } });
    console.log('✅ Página carregada.\n');

    console.log('🔍 Executando análise de performance (Lighthouse)...');
    const insightResult = await client.callTool({
      name: 'performance_analyze_insight',
      arguments: {}
    });

    console.log('✅ Análise concluída!\n');

    const insights = insightResult.content?.[0]?.text;
    if (insights) {
      const report = JSON.parse(insights);
      printReport(report);
    } else {
      console.error('❌ Não foi possível obter os resultados da análise.');
    }

  } catch (error) {
    console.error('❌ Erro durante a análise de performance:', error);
  } finally {
    await client.close();
    console.log('\n🔌 Desconectado do servidor MCP.');
  }
}

function printReport(report: any) {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║           📊 RELATÓRIO DE PERFORMANCE (LIGHTHOUSE)             ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  const categories = report.categories;

  console.log('🎯 SCORES POR CATEGORIA:\n');
  for (const key in categories) {
    const category = categories[key];
    const score = Math.round(category.score * 100);
    console.log(`   • ${getScoreEmoji(score)} ${category.title}: ${score}`);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('Metric | Value');
	console.log('---|---');

  const audits = report.audits;
  const metricsToShow = [
    'first-contentful-paint',
    'largest-contentful-paint',
    'speed-index',
    'total-blocking-time',
    'cumulative-layout-shift',
    'interactive'
  ];

  metricsToShow.forEach(metricId => {
    const audit = audits[metricId];
    if (audit) {
      console.log(`${audit.title} | ${audit.displayValue}`);
    }
  });

  console.log('\n');
}

function getScoreEmoji(score: number): string {
  if (score >= 90) return '🟢';
  if (score >= 50) return '🟠';
  return '🔴';
}

const url = process.argv[2] || 'http://localhost:3000/services';
analyzePerformance(url);
