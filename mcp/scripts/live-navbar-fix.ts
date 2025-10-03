#!/usr/bin/env tsx

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

interface LiveAnalysis {
  stickyBehavior: {
    currentBehavior: string;
    issue: string;
    fix: string;
  };
  ctaAndLinks: {
    currentState: string;
    issues: string[];
    fixes: string[];
  };
  logoSize: {
    currentSize: string;
    issue: string;
    fix: string;
  };
  mobileUX: {
    currentState: string;
    issues: string[];
    fixes: string[];
  };
}

async function liveNavbarAnalysis(url: string): Promise<LiveAnalysis> {
  console.log('🔍 MCP ANÁLISE AO VIVO - NAVBAR LOCALHOST:3001');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['chrome-devtools-mcp@latest']
  });

  const client = new Client(
    { name: 'live-navbar-fixer', version: '1.0.0' },
    { capabilities: {} }
  );

  await client.connect(transport);

  try {
    // 1. Navegar para página
    console.log('🌐 Navegando para localhost:3001...');
    await client.callTool({
      name: 'navigate_page',
      arguments: { url }
    });

    await client.callTool({
      name: 'wait_for',
      arguments: { text: 'networkidle', timeout: 3000 }
    });

    console.log('✅ Página carregada\n');

    // 2. Análise Desktop - Estado inicial
    console.log('📊 ANÁLISE DESKTOP - Estado Inicial');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await client.callTool({
      name: 'resize_page',
      arguments: { width: 1920, height: 1080 }
    });

    const initialState = await client.callTool({
      name: 'evaluate_script',
      arguments: {
        function: getNavbarAnalysisScript()
      }
    });

    const initial = parseResult(initialState);
    console.log('✅ Estado inicial capturado');

    // Screenshot estado inicial
    await client.callTool({
      name: 'take_screenshot',
      arguments: {}
    });
    console.log('✅ Screenshot inicial\n');

    // 3. Simular scroll para testar sticky behavior
    console.log('📊 TESTE SCROLL - Simulando comportamento sticky');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await client.callTool({
      name: 'evaluate_script',
      arguments: {
        function: 'window.scrollTo(0, 200);'
      }
    });

    // Aguardar animações
    await new Promise(resolve => setTimeout(resolve, 1000));

    const scrolledState = await client.callTool({
      name: 'evaluate_script',
      arguments: {
        function: getNavbarAnalysisScript()
      }
    });

    const scrolled = parseResult(scrolledState);
    console.log('✅ Estado após scroll capturado');

    // Screenshot após scroll
    await client.callTool({
      name: 'take_screenshot',
      arguments: {}
    });
    console.log('✅ Screenshot scroll\n');

    // 4. Análise Mobile
    console.log('📊 ANÁLISE MOBILE - Responsividade');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await client.callTool({
      name: 'resize_page',
      arguments: { width: 375, height: 667 }
    });

    // Reset scroll para mobile
    await client.callTool({
      name: 'evaluate_script',
      arguments: {
        function: 'window.scrollTo(0, 0);'
      }
    });

    const mobileState = await client.callTool({
      name: 'evaluate_script',
      arguments: {
        function: getNavbarAnalysisScript()
      }
    });

    const mobile = parseResult(mobileState);
    console.log('✅ Estado mobile capturado');

    // Screenshot mobile
    await client.callTool({
      name: 'take_screenshot',
      arguments: {}
    });
    console.log('✅ Screenshot mobile\n');

    // 5. Análise crítica dos problemas
    const analysis: LiveAnalysis = {
      stickyBehavior: analyzeStickyBehavior(initial, scrolled),
      ctaAndLinks: analyzeCTAAndLinks(initial, scrolled),
      logoSize: analyzeLogoSize(initial, scrolled),
      mobileUX: analyzeMobileUX(mobile)
    };

    // 6. Imprimir relatório
    printLiveReport(analysis);

    return analysis;

  } catch (error) {
    console.error('❌ Erro na análise ao vivo:', error);
    throw error;
  } finally {
    await client.close();
  }
}

function getNavbarAnalysisScript(): string {
  return `
    const navbar = document.querySelector('nav, header, [role="navigation"]');
    if (!navbar) return { error: 'Navbar não encontrada' };

    const rect = navbar.getBoundingClientRect();
    const styles = getComputedStyle(navbar);
    const logo = navbar.querySelector('img, [class*="logo"]');
    const links = Array.from(navbar.querySelectorAll('a'));
    const buttons = Array.from(navbar.querySelectorAll('button'));
    const ctaButton = navbar.querySelector('[class*="gradient"], [class*="cta"], button[class*="primary"]');

    return {
      navbar: {
        visible: rect.height > 0 && styles.display !== 'none',
        position: styles.position,
        top: styles.top,
        transform: styles.transform,
        opacity: styles.opacity,
        zIndex: styles.zIndex,
        height: rect.height,
        width: rect.width,
        padding: styles.padding,
        paddingTop: styles.paddingTop,
        paddingBottom: styles.paddingBottom,
        background: styles.background,
        backdropFilter: styles.backdropFilter,
        boxShadow: styles.boxShadow
      },
      logo: logo ? {
        width: logo.getBoundingClientRect().width,
        height: logo.getBoundingClientRect().height,
        transform: getComputedStyle(logo).transform,
        opacity: getComputedStyle(logo).opacity,
        visible: getComputedStyle(logo).display !== 'none'
      } : null,
      links: links.map(link => ({
        text: link.textContent?.trim(),
        width: link.getBoundingClientRect().width,
        height: link.getBoundingClientRect().height,
        padding: getComputedStyle(link).padding,
        borderRadius: getComputedStyle(link).borderRadius,
        background: getComputedStyle(link).background,
        color: getComputedStyle(link).color,
        fontSize: getComputedStyle(link).fontSize,
        visible: getComputedStyle(link).display !== 'none'
      })),
      ctaButton: ctaButton ? {
        width: ctaButton.getBoundingClientRect().width,
        height: ctaButton.getBoundingClientRect().height,
        borderRadius: getComputedStyle(ctaButton).borderRadius,
        background: getComputedStyle(ctaButton).background,
        boxShadow: getComputedStyle(ctaButton).boxShadow,
        padding: getComputedStyle(ctaButton).padding,
        visible: getComputedStyle(ctaButton).display !== 'none'
      } : null,
      scrollY: window.scrollY,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
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

function analyzeStickyBehavior(initial: any, scrolled: any) {
  const initialVisible = initial?.navbar?.visible;
  const scrolledVisible = scrolled?.navbar?.visible;
  const scrolledOpacity = parseFloat(scrolled?.navbar?.opacity || '1');

  return {
    currentBehavior: scrolledVisible && scrolledOpacity > 0.5
      ? 'Navbar permanece visível'
      : 'Navbar está sumindo/oculta',
    issue: !scrolledVisible || scrolledOpacity <= 0.5
      ? 'CRÍTICO: Navbar sumindo em scroll - usuário perde navegação'
      : 'Comportamento sticky adequado',
    fix: !scrolledVisible || scrolledOpacity <= 0.5
      ? 'Remover hide behavior + manter opacity: 1 + position: fixed'
      : 'Manter comportamento atual'
  };
}

function analyzeCTAAndLinks(initial: any, scrolled: any) {
  const links = initial?.links || [];
  const cta = initial?.ctaButton;

  const issues = [];
  const fixes = [];

  // Verificar border-radius dos links
  const hasRoundedLinks = links.some((link: any) =>
    link.borderRadius && link.borderRadius !== '0px'
  );

  if (!hasRoundedLinks) {
    issues.push('Links sem border-radius - aparência áspera');
    fixes.push('Adicionar border-radius: 6px nos links');
  }

  // Verificar CTA button styling
  if (cta) {
    const hasRoundedCTA = cta.borderRadius && cta.borderRadius !== '0px';
    const hasProperShadow = cta.boxShadow && cta.boxShadow !== 'none';

    if (!hasRoundedCTA) {
      issues.push('CTA sem border-radius adequado');
      fixes.push('Adicionar border-radius: 8px no CTA');
    }

    if (!hasProperShadow) {
      issues.push('CTA sem shadow elevation');
      fixes.push('Adicionar box-shadow para depth visual');
    }
  }

  // Verificar padding dos links
  const linksPadding = links.map((link: any) => link.padding);
  const hasConsistentPadding = linksPadding.every((p: string) => p && p !== '0px');

  if (!hasConsistentPadding) {
    issues.push('Links com padding inconsistente');
    fixes.push('Padronizar padding: 8px 16px nos links');
  }

  return {
    currentState: `${links.length} links, CTA ${cta ? 'presente' : 'ausente'}`,
    issues: issues.length > 0 ? issues : ['UI/UX dos links e CTA adequados'],
    fixes: fixes.length > 0 ? fixes : ['Manter styling atual']
  };
}

function analyzeLogoSize(initial: any, scrolled: any) {
  const initialLogo = initial?.logo;
  const scrolledLogo = scrolled?.logo;

  if (!initialLogo || !scrolledLogo) {
    return {
      currentSize: 'Logo não encontrado',
      issue: 'CRÍTICO: Logo não detectado na análise',
      fix: 'Verificar seletor do logo'
    };
  }

  const reductionRatio = scrolledLogo.width / initialLogo.width;
  const tooSmall = reductionRatio < 0.8; // Menos que 80% é muito pequeno

  return {
    currentSize: `${Math.round(initialLogo.width)}px → ${Math.round(scrolledLogo.width)}px (${Math.round(reductionRatio * 100)}%)`,
    issue: tooSmall
      ? 'Logo fica muito pequeno em scroll - perde identidade visual'
      : 'Redução do logo adequada',
    fix: tooSmall
      ? 'Manter logo entre 85-95% do tamanho original'
      : 'Manter redução atual'
  };
}

function analyzeMobileUX(mobile: any) {
  const navbar = mobile?.navbar;
  const links = mobile?.links || [];
  const viewport = mobile?.viewport;

  const issues = [];
  const fixes = [];

  // Verificar altura da navbar em mobile
  if (navbar?.height > 80) {
    issues.push('Navbar muito alta em mobile - ocupa muito espaço');
    fixes.push('Reduzir altura para máximo 60-70px em mobile');
  }

  // Verificar se links são touch-friendly
  const smallLinks = links.filter((link: any) =>
    link.height < 44 || link.width < 44
  );

  if (smallLinks.length > 0) {
    issues.push(`${smallLinks.length} links com touch target pequeno`);
    fixes.push('Garantir mínimo 44x44px para todos os links');
  }

  // Verificar se há menu hamburger
  const hasHamburger = links.length < 3; // Se poucos links visíveis, provavelmente tem hamburger

  if (!hasHamburger && links.length > 4) {
    issues.push('Muitos links visíveis em mobile - overflow');
    fixes.push('Implementar menu hamburger para mobile');
  }

  return {
    currentState: `${navbar?.height}px altura, ${links.length} links visíveis`,
    issues: issues.length > 0 ? issues : ['Mobile UX adequado'],
    fixes: fixes.length > 0 ? fixes : ['Manter layout mobile atual']
  };
}

function printLiveReport(analysis: LiveAnalysis) {
  console.log('\n╔══════════════════════════════════════════════════════════════════╗');
  console.log('║                🔍 RELATÓRIO AO VIVO - MCP ANALYSIS               ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\n');

  // 1. Sticky Behavior
  console.log('📎 COMPORTAMENTO STICKY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Estado: ${analysis.stickyBehavior.currentBehavior}`);
  console.log(`Issue: ${analysis.stickyBehavior.issue}`);
  console.log(`Fix: ${analysis.stickyBehavior.fix}\n`);

  // 2. CTA e Links
  console.log('🎯 CTA E LINKS CENTRAIS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Estado: ${analysis.ctaAndLinks.currentState}`);
  analysis.ctaAndLinks.issues.forEach(issue => console.log(`Issue: ${issue}`));
  analysis.ctaAndLinks.fixes.forEach(fix => console.log(`Fix: ${fix}`));
  console.log('');

  // 3. Logo Size
  console.log('🏢 TAMANHO DO LOGO');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Tamanho: ${analysis.logoSize.currentSize}`);
  console.log(`Issue: ${analysis.logoSize.issue}`);
  console.log(`Fix: ${analysis.logoSize.fix}\n`);

  // 4. Mobile UX
  console.log('📱 MOBILE UX');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Estado: ${analysis.mobileUX.currentState}`);
  analysis.mobileUX.issues.forEach(issue => console.log(`Issue: ${issue}`));
  analysis.mobileUX.fixes.forEach(fix => console.log(`Fix: ${fix}`));
  console.log('');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('✅ Análise ao vivo completa!');
  console.log('📝 Screenshots capturados para referência');
  console.log('🔧 Implementando correções...\n');
}

// Executar análise ao vivo
const url = 'http://localhost:3001';

console.log('🚀 Iniciando análise MCP ao vivo da navbar...\n');

liveNavbarAnalysis(url)
  .then(analysis => {
    console.log('🎉 Análise ao vivo concluída!');
    console.log('📋 Relatório disponível acima');
    console.log('⚡ Implementando correções baseadas nos achados...');
  })
  .catch(error => {
    console.error('❌ Falha na análise ao vivo:', error);
    process.exit(1);
  });