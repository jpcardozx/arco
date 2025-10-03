import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import fs from 'fs';

interface NavbarIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'layout' | 'responsive' | 'accessibility' | 'performance' | 'ux';
  description: string;
  recommendation: string;
  affectedViewports?: string[];
}

interface NavbarAnalysis {
  timestamp: string;
  url: string;
  viewports: Record<string, any>;
  issues: NavbarIssue[];
  score: {
    layout: number;
    responsive: number;
    accessibility: number;
    performance: number;
    ux: number;
    overall: number;
  };
}

async function analyzeNavbar(url: string): Promise<NavbarAnalysis> {
  console.log('🚀 Iniciando análise crítica da navbar...\n');

  const transport = new StdioClientTransport({
    command: 'node',
    args: [
      '/home/jpcardozx/projetos/arco/node_modules/.pnpm/chrome-devtools-mcp@0.6.0/node_modules/chrome-devtools-mcp/build/src/index.js',
      '--headless=false'
    ]
  });

  const client = new Client(
    { name: 'navbar-analyzer', version: '1.0.0' },
    { capabilities: {} }
  );

  await client.connect(transport);
  
  const analysis: NavbarAnalysis = {
    timestamp: new Date().toISOString(),
    url,
    viewports: {},
    issues: [],
    score: {
      layout: 100,
      responsive: 100,
      accessibility: 100,
      performance: 100,
      ux: 100,
      overall: 100
    }
  };

  try {
    // 1. Navegar para página
    console.log(`🌐 Navegando para ${url}...`);
    await client.callTool({
      name: 'navigate_page',
      arguments: { url }
    });

    await client.callTool({
      name: 'wait_for',
      arguments: { text: 'networkidle', timeout: 5000 }
    });

    console.log('✅ Página carregada\n');

    // 2. Análise Desktop (1920x1080)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Analisando Desktop (1920x1080)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    await client.callTool({
      name: 'resize_page',
      arguments: { width: 1920, height: 1080 }
    });

    const desktopResult = await client.callTool({
      name: 'evaluate_script',
      arguments: {
        function: getAnalysisScript()
      }
    });

    const desktopData = parseResult(desktopResult);
    analysis.viewports.desktop = desktopData;
    console.log('✅ Dados coletados');

    // Screenshot desktop
    await client.callTool({
      name: 'take_screenshot',
      arguments: {}
    });
    console.log('✅ Screenshot capturado\n');

    // 3. Análise Tablet (1024x768)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Analisando Tablet (1024x768)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    await client.callTool({
      name: 'resize_page',
      arguments: { width: 1024, height: 768 }
    });

    const tabletResult = await client.callTool({
      name: 'evaluate_script',
      arguments: { function: getAnalysisScript() }
    });

    const tabletData = parseResult(tabletResult);
    analysis.viewports.tablet = tabletData;
    console.log('✅ Dados coletados');

    await client.callTool({
      name: 'take_screenshot',
      arguments: {}
    });
    console.log('✅ Screenshot capturado\n');

    // 4. Análise Mobile (375x667)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Analisando Mobile (375x667)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    await client.callTool({
      name: 'resize_page',
      arguments: { width: 375, height: 667 }
    });

    const mobileResult = await client.callTool({
      name: 'evaluate_script',
      arguments: { function: getAnalysisScript() }
    });

    const mobileData = parseResult(mobileResult);
    analysis.viewports.mobile = mobileData;
    console.log('✅ Dados coletados');

    await client.callTool({
      name: 'take_screenshot',
      arguments: {}
    });
    console.log('✅ Screenshot capturado\n');

    // 5. Análise Crítica
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 Análise Crítica e Issues');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Analisar cada viewport
    analyzeLayoutIssues(desktopData, 'desktop', analysis);
    analyzeResponsiveIssues(desktopData, tabletData, mobileData, analysis);
    analyzeAccessibilityIssues(desktopData, analysis);
    analyzeUXIssues(desktopData, analysis);

    // Calcular score
    calculateScore(analysis);

    // 6. Salvar relatório
    const reportPath = `/home/jpcardozx/projetos/arco/logs/navbar-analysis-${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📄 Relatório salvo:', reportPath);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Erro na análise:', error);
  } finally {
    await client.close();
  }

  return analysis;
}

function getAnalysisScript(): string {
  return `
    const navbar = document.querySelector('nav');
    if (!navbar) return { error: 'Navbar não encontrada' };
    
    const rect = navbar.getBoundingClientRect();
    const styles = getComputedStyle(navbar);
    const links = Array.from(navbar.querySelectorAll('a'));
    const buttons = Array.from(navbar.querySelectorAll('button'));
    
    return {
      found: true,
      dimensions: {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      },
      layout: {
        display: styles.display,
        flexDirection: styles.flexDirection,
        justifyContent: styles.justifyContent,
        alignItems: styles.alignItems,
        gap: styles.gap,
        padding: styles.padding,
        paddingTop: styles.paddingTop,
        paddingBottom: styles.paddingBottom
      },
      positioning: {
        position: styles.position,
        top: styles.top,
        zIndex: styles.zIndex,
        boxShadow: styles.boxShadow
      },
      typography: {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight,
        color: styles.color
      },
      accessibility: {
        role: navbar.getAttribute('role'),
        ariaLabel: navbar.getAttribute('aria-label'),
        hasSkipLink: !!document.querySelector('a[href="#main-content"], a[href="#content"]')
      },
      links: links.map(link => ({
        text: link.textContent?.trim(),
        href: link.href,
        ariaLabel: link.getAttribute('aria-label'),
        hasVisibleText: (link.textContent?.trim().length || 0) > 0,
        isHidden: getComputedStyle(link).display === 'none',
        dimensions: {
          width: link.getBoundingClientRect().width,
          height: link.getBoundingClientRect().height
        },
        styles: {
          color: getComputedStyle(link).color,
          fontSize: getComputedStyle(link).fontSize,
          padding: getComputedStyle(link).padding
        }
      })),
      buttons: buttons.map(btn => ({
        text: btn.textContent?.trim(),
        ariaLabel: btn.getAttribute('aria-label'),
        dimensions: {
          width: btn.getBoundingClientRect().width,
          height: btn.getBoundingClientRect().height
        }
      })),
      hasOverflow: navbar.scrollWidth > navbar.clientWidth,
      children: Array.from(navbar.children).map(child => ({
        tag: child.tagName,
        class: child.className,
        visible: getComputedStyle(child).display !== 'none'
      }))
    };
  `;
}

function parseResult(result: any): any {
  try {
    const content = result.content?.[0]?.text || result.content;
    return typeof content === 'string' ? JSON.parse(content) : content;
  } catch {
    return {};
  }
}

function analyzeLayoutIssues(data: any, viewport: string, analysis: NavbarAnalysis) {
  if (!data || data.error) return;

  // Issue 1: Altura excessiva
  if (data.dimensions?.height > 100) {
    analysis.issues.push({
      severity: 'high',
      category: 'layout',
      description: `Navbar muito alta (${Math.round(data.dimensions.height)}px) - reduz espaço útil da tela`,
      recommendation: 'Reduzir altura para 64-80px (ideal para desktop)',
      affectedViewports: [viewport]
    });
    analysis.score.layout -= 15;
  }

  // Issue 2: Padding inconsistente
  const paddingTop = parseInt(data.layout?.paddingTop || '0');
  const paddingBottom = parseInt(data.layout?.paddingBottom || '0');
  if (Math.abs(paddingTop - paddingBottom) > 4) {
    analysis.issues.push({
      severity: 'medium',
      category: 'layout',
      description: `Padding vertical inconsistente (top: ${paddingTop}px, bottom: ${paddingBottom}px)`,
      recommendation: 'Usar padding vertical simétrico para melhor alinhamento',
      affectedViewports: [viewport]
    });
    analysis.score.layout -= 5;
  }

  // Issue 3: Sem gap definido
  if (!data.layout?.gap || data.layout.gap === '0px') {
    analysis.issues.push({
      severity: 'low',
      category: 'layout',
      description: 'Navbar sem gap CSS - espaçamento pode estar inconsistente',
      recommendation: 'Usar propriedade gap para espaçamento uniforme entre items',
      affectedViewports: [viewport]
    });
    analysis.score.layout -= 3;
  }

  // Issue 4: Z-index baixo
  const zIndex = parseInt(data.positioning?.zIndex || '0');
  if (zIndex < 100) {
    analysis.issues.push({
      severity: 'medium',
      category: 'layout',
      description: `Z-index muito baixo (${zIndex}) - navbar pode ser sobreposta`,
      recommendation: 'Definir z-index: 1000 ou superior para garantir sobreposição',
      affectedViewports: [viewport]
    });
    analysis.score.layout -= 8;
  }
}

function analyzeResponsiveIssues(desktop: any, tablet: any, mobile: any, analysis: NavbarAnalysis) {
  // Issue 1: Overflow horizontal em mobile
  if (mobile?.hasOverflow) {
    analysis.issues.push({
      severity: 'critical',
      category: 'responsive',
      description: 'Navbar com overflow horizontal em mobile - conteúdo inacessível',
      recommendation: 'Implementar menu hamburger ou scroll horizontal controlado',
      affectedViewports: ['mobile']
    });
    analysis.score.responsive -= 25;
  }

  // Issue 2: Touch targets pequenos
  mobile?.links?.forEach((link: any, i: number) => {
    if (link.dimensions?.height < 44) {
      analysis.issues.push({
        severity: 'high',
        category: 'responsive',
        description: `Link "${link.text}" com touch target muito pequeno (${Math.round(link.dimensions.height)}px)`,
        recommendation: 'Touch targets devem ter mínimo 44x44px (recomendação WCAG)',
        affectedViewports: ['mobile']
      });
      analysis.score.responsive -= 10;
    }
  });

  // Issue 3: Mesma altura em todos viewports
  const desktopHeight = desktop?.dimensions?.height || 0;
  const mobileHeight = mobile?.dimensions?.height || 0;
  if (Math.abs(desktopHeight - mobileHeight) < 10 && desktopHeight > 0) {
    analysis.issues.push({
      severity: 'medium',
      category: 'responsive',
      description: 'Navbar com mesma altura em desktop e mobile',
      recommendation: 'Reduzir altura em mobile para economizar espaço (56-64px)',
      affectedViewports: ['mobile']
    });
    analysis.score.responsive -= 8;
  }
}

function analyzeAccessibilityIssues(data: any, analysis: NavbarAnalysis) {
  // Issue 1: Sem aria-label
  if (!data.accessibility?.ariaLabel) {
    analysis.issues.push({
      severity: 'high',
      category: 'accessibility',
      description: 'Navbar sem aria-label - dificulta navegação com screen readers',
      recommendation: 'Adicionar aria-label="Navegação principal" na tag <nav>',
      affectedViewports: ['all']
    });
    analysis.score.accessibility -= 15;
  }

  // Issue 2: Sem skip link
  if (!data.accessibility?.hasSkipLink) {
    analysis.issues.push({
      severity: 'high',
      category: 'accessibility',
      description: 'Sem link "pular para conteúdo" - má acessibilidade de teclado',
      recommendation: 'Adicionar <a href="#main-content">Pular para conteúdo</a> no início',
      affectedViewports: ['all']
    });
    analysis.score.accessibility -= 12;
  }

  // Issue 3: Links sem texto visível
  data.links?.forEach((link: any, i: number) => {
    if (!link.hasVisibleText && !link.ariaLabel) {
      analysis.issues.push({
        severity: 'critical',
        category: 'accessibility',
        description: `Link ${i + 1} sem texto visível nem aria-label`,
        recommendation: `Adicionar texto ou aria-label descritivo para "${link.href}"`,
        affectedViewports: ['all']
      });
      analysis.score.accessibility -= 20;
    }
  });
}

function analyzeUXIssues(data: any, analysis: NavbarAnalysis) {
  // Issue 1: Navbar não sticky
  if (data.positioning?.position !== 'fixed' && data.positioning?.position !== 'sticky') {
    analysis.issues.push({
      severity: 'high',
      category: 'ux',
      description: 'Navbar não é fixa/sticky - desaparece ao fazer scroll',
      recommendation: 'Implementar position: sticky ou fixed para melhor navegação',
      affectedViewports: ['all']
    });
    analysis.score.ux -= 18;
  }

  // Issue 2: Sem sombra/separação
  if (!data.positioning?.boxShadow || data.positioning.boxShadow === 'none') {
    analysis.issues.push({
      severity: 'low',
      category: 'ux',
      description: 'Navbar sem sombra - pode não se destacar do conteúdo',
      recommendation: 'Adicionar box-shadow sutil para criar profundidade visual',
      affectedViewports: ['all']
    });
    analysis.score.ux -= 5;
  }

  // Issue 3: Links muito próximos
  const links = data.links || [];
  for (let i = 0; i < links.length - 1; i++) {
    const link1 = links[i];
    const link2 = links[i + 1];
    // Heurística: se não há gap, links podem estar muito próximos
    if (!data.layout?.gap || data.layout.gap === '0px') {
      analysis.issues.push({
        severity: 'low',
        category: 'ux',
        description: 'Links podem estar muito próximos - dificulta clique preciso',
        recommendation: 'Adicionar espaçamento mínimo de 16-24px entre links',
        affectedViewports: ['all']
      });
      analysis.score.ux -= 5;
      break; // Não repetir o mesmo issue
    }
  }
}

function calculateScore(analysis: NavbarAnalysis) {
  // Garantir que scores não sejam negativos
  analysis.score.layout = Math.max(0, analysis.score.layout);
  analysis.score.responsive = Math.max(0, analysis.score.responsive);
  analysis.score.accessibility = Math.max(0, analysis.score.accessibility);
  analysis.score.performance = Math.max(0, analysis.score.performance);
  analysis.score.ux = Math.max(0, analysis.score.ux);

  // Calcular score overall (média ponderada)
  analysis.score.overall = Math.round(
    (analysis.score.layout * 0.2 +
     analysis.score.responsive * 0.25 +
     analysis.score.accessibility * 0.25 +
     analysis.score.performance * 0.15 +
     analysis.score.ux * 0.15)
  );
}

function printReport(analysis: NavbarAnalysis) {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║           📊 RELATÓRIO DE ANÁLISE DA NAVBAR                   ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  // Scores
  console.log('🎯 SCORES:\n');
  console.log(`   Layout:          ${getScoreEmoji(analysis.score.layout)} ${analysis.score.layout}/100`);
  console.log(`   Responsivo:      ${getScoreEmoji(analysis.score.responsive)} ${analysis.score.responsive}/100`);
  console.log(`   Acessibilidade:  ${getScoreEmoji(analysis.score.accessibility)} ${analysis.score.accessibility}/100`);
  console.log(`   Performance:     ${getScoreEmoji(analysis.score.performance)} ${analysis.score.performance}/100`);
  console.log(`   UX:              ${getScoreEmoji(analysis.score.ux)} ${analysis.score.ux}/100`);
  console.log(`\n   OVERALL:         ${getScoreEmoji(analysis.score.overall)} ${analysis.score.overall}/100\n`);

  // Issues por severidade
  const critical = analysis.issues.filter(i => i.severity === 'critical');
  const high = analysis.issues.filter(i => i.severity === 'high');
  const medium = analysis.issues.filter(i => i.severity === 'medium');
  const low = analysis.issues.filter(i => i.severity === 'low');

  console.log('🚨 ISSUES POR SEVERIDADE:\n');
  console.log(`   🔴 Critical: ${critical.length}`);
  console.log(`   🟠 High:     ${high.length}`);
  console.log(`   🟡 Medium:   ${medium.length}`);
  console.log(`   🟢 Low:      ${low.length}\n`);

  // Listar issues críticos e high
  if (critical.length > 0) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔴 ISSUES CRÍTICOS\n');
    critical.forEach((issue, i) => {
      console.log(`${i + 1}. [${issue.category.toUpperCase()}] ${issue.description}`);
      console.log(`   💡 ${issue.recommendation}\n`);
    });
  }

  if (high.length > 0) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🟠 ISSUES HIGH\n');
    high.forEach((issue, i) => {
      console.log(`${i + 1}. [${issue.category.toUpperCase()}] ${issue.description}`);
      console.log(`   💡 ${issue.recommendation}\n`);
    });
  }

  // Resumo de dimensões
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📐 DIMENSÕES POR VIEWPORT\n');
  
  Object.entries(analysis.viewports).forEach(([viewport, data]: [string, any]) => {
    if (data.dimensions) {
      console.log(`   ${viewport.toUpperCase()}:`);
      console.log(`      Altura: ${Math.round(data.dimensions.height)}px`);
      console.log(`      Largura: ${Math.round(data.dimensions.width)}px`);
      console.log(`      Items: ${data.links?.length || 0} links, ${data.buttons?.length || 0} buttons\n`);
    }
  });
}

function getScoreEmoji(score: number): string {
  if (score >= 90) return '🟢';
  if (score >= 70) return '🟡';
  if (score >= 50) return '🟠';
  return '🔴';
}

// Executar análise
const url = process.argv[2] || 'http://localhost:3000';

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║       🔍 ANÁLISE CRÍTICA DE NAVBAR - ARCO                     ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

analyzeNavbar(url).then(analysis => {
  printReport(analysis);
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('✅ Análise completa!');
  console.log(`📊 ${analysis.issues.length} issues encontrados`);
  console.log(`🎯 Score overall: ${analysis.score.overall}/100\n`);
}).catch(error => {
  console.error('❌ Erro na análise:', error);
  process.exit(1);
});
