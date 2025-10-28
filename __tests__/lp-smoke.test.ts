/**
 * LP Smoke Tests - Validação rápida de componentes críticos
 * 
 * Execute: pnpm test:lp
 */

import { describe, it, expect } from '@jest/globals';

describe('Landing Page - Critical Components', () => {
  
  describe('Campaign Data Validation', () => {
    it('should have valid pricing structure', () => {
      const { salaoBeleza2024Campaign } = require('../src/app/lp/salao-beleza-2024/campaign-data');
      
      expect(salaoBeleza2024Campaign.pricing).toBeDefined();
      expect(salaoBeleza2024Campaign.pricing.setup_full).toBeGreaterThan(0);
      expect(salaoBeleza2024Campaign.pricing.plans.length).toBeGreaterThanOrEqual(3);
    });

    it('should have FAQ for objection handling', () => {
      const { salaoBeleza2024Campaign } = require('../src/app/lp/salao-beleza-2024/campaign-data');
      
      expect(salaoBeleza2024Campaign.faqs).toBeDefined();
      expect(salaoBeleza2024Campaign.faqs.length).toBeGreaterThanOrEqual(5);
    });

    it('should have real cases with context', () => {
      const { salaoBeleza2024Campaign } = require('../src/app/lp/salao-beleza-2024/campaign-data');
      
      expect(salaoBeleza2024Campaign.cases).toBeDefined();
      expect(salaoBeleza2024Campaign.cases.length).toBeGreaterThanOrEqual(3);
      
      salaoBeleza2024Campaign.cases.forEach((caseItem: any) => {
        expect(caseItem.name).toBeTruthy();
        expect(caseItem.business).toBeTruthy();
        expect(caseItem.location).toBeTruthy();
        expect(caseItem.context).toBeTruthy(); // FTC compliance
      });
    });
  });

  describe('Meta Pixel Integration', () => {
    it('should export MetaPixelScript component', () => {
      const { MetaPixelScript } = require('../src/components/meta-pixel');
      expect(MetaPixelScript).toBeDefined();
      expect(typeof MetaPixelScript).toBe('function');
    });

    it('should export MetaPixel tracking component', () => {
      const { MetaPixel } = require('../src/components/meta-pixel');
      expect(MetaPixel).toBeDefined();
      expect(typeof MetaPixel).toBe('function');
    });
  });

  describe('Conversion Architecture', () => {
    it('should have correct section order in template', () => {
      const fs = require('fs');
      const templateContent = fs.readFileSync(
        'src/components/landing/LandingPageTemplate.tsx',
        'utf-8'
      );

      // Verificar ordem: HERO → HOW IT WORKS → PROOF → ROI → PRICING → LEAD MAGNET
      const heroIndex = templateContent.indexOf('<HeroSection');
      const howItWorksIndex = templateContent.indexOf('<HowItWorksSection');
      const proofIndex = templateContent.indexOf('<ProofSection');
      const roiIndex = templateContent.indexOf('<ROICalculatorSection');
      const pricingIndex = templateContent.indexOf('<ValueInvestmentSection');
      const leadMagnetIndex = templateContent.indexOf('<LeadMagnetSection');

      expect(heroIndex).toBeLessThan(howItWorksIndex);
      expect(howItWorksIndex).toBeLessThan(proofIndex);
      expect(proofIndex).toBeLessThan(roiIndex);
      expect(roiIndex).toBeLessThan(pricingIndex);
      expect(pricingIndex).toBeLessThan(leadMagnetIndex);
    });
  });

  describe('Credibility Compliance (FTC)', () => {
    it('should not have generic promises without attribution', () => {
      const { salaoBeleza2024Campaign } = require('../src/app/lp/salao-beleza-2024/campaign-data');
      
      // Hero não pode ter promessas genéricas tipo "R$ 10k/mês garantido"
      const hero = salaoBeleza2024Campaign.hero_subtitle.toLowerCase();
      const forbiddenWords = ['garantido', 'certeza de', 'sempre', 'nunca falha'];
      
      forbiddenWords.forEach(word => {
        expect(hero).not.toContain(word);
      });
    });

    it('should have transparent distribution in proof section', () => {
      const fs = require('fs');
      const proofContent = fs.readFileSync(
        'src/components/landing/sections/ProofSection.tsx',
        'utf-8'
      );

      // Deve ter 4 tiers de distribuição
      expect(proofContent).toContain('Excepcional');
      expect(proofContent).toContain('Objetivo alcançado');
      expect(proofContent).toContain('Em desenvolvimento');
      expect(proofContent).toContain('Abaixo do esperado');
    });
  });

  describe('Performance Optimization', () => {
    it('should lazy load below-fold sections', () => {
      const fs = require('fs');
      const templateContent = fs.readFileSync(
        'src/components/landing/LandingPageTemplate.tsx',
        'utf-8'
      );

      // ProofSection deve ser lazy loaded
      expect(templateContent).toContain('dynamic<{ campaign: Campaign }>(');
      expect(templateContent).toContain('ProofSection');
    });
  });
});

export {};
