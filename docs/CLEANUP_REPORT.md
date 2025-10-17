# 🧹 Relatório de Limpeza do Projeto ARCO

**Data:** 6 de outubro de 2025
**Status:** Projeto poluído com múltiplos arquivos obsoletos

---

## 📊 Análise de Poluição

### 1. **Documentação Excessiva (69 arquivos .md no root)**
- ❌ **CRÍTICO:** 69 arquivos markdown no diretório raiz
- Dificulta navegação e entendimento do projeto
- Muitos são relatórios antigos/duplicados

### 2. **Páginas Demo/Test Não Utilizadas**
```
src/app/figma/page.tsx              → Demo do Figma (dev only)
src/app/demo/page.tsx               → Página de demo genérica
src/app/navbar-demo/page.tsx        → Demo da navbar
src/app/unified-demo/page.tsx       → Demo sistema unificado
src/app/test-checklist/page.tsx     → Teste de checklist
src/app/enhanced/page.tsx           → Enhanced demo
```

### 3. **Páginas Vazias/Redirect**
```
src/app/signup/page.tsx             → Apenas redirect (6 linhas)
src/app/(relume)/solucoes/page.tsx  → Stub "em desenvolvimento"
src/app/(relume)/provas/page.tsx    → Provavelmente vazio
```

### 4. **Hooks com TODO/Não Implementados**
```
src/lib/hooks/useUpdateLead.ts      → TODO: Implement real update logic
src/lib/hooks/use-zoho-user.ts      → TODO: Replace with real Zoho integration
```

### 5. **Services Não Implementados**
```
src/lib/services/aliquotas-pdf-service.ts → TODO: Implementar geração de PDF
```

### 6. **Arquivos de Backup Desnecessários**
```
.backup/          → 16KB
.temp-backup/     → 20KB
```

### 7. **Duplicação Auth**
```
/login/page.tsx       → 515 linhas (página completa)
/auth/login/page.tsx  → Duplicado?
/signup/page.tsx      → Redirect
/auth/signup/page.tsx → Página real
```

---

## 🎯 Plano de Ação

### FASE 1: Documentação
- [ ] Mover MDs para `/docs/archive/`
- [ ] Manter apenas: README.md, DEPLOYMENT.md, QUICK_START.md

### FASE 2: Páginas Demo
- [ ] Deletar: figma, demo, navbar-demo, unified-demo, enhanced, test-checklist
- [ ] Manter apenas ambientes de dev se necessário

### FASE 3: Páginas Vazias
- [ ] Deletar: signup (já tem redirect)
- [ ] Implementar ou deletar: solucoes, provas

### FASE 4: Hooks/Services
- [ ] Implementar ou deletar: useUpdateLead, use-zoho-user
- [ ] Implementar ou deletar: aliquotas-pdf-service

### FASE 5: Backups
- [ ] Deletar .backup/ e .temp-backup/

### FASE 6: Auth Unificação
- [ ] Decidir: manter /auth/* ou root login/signup
- [ ] Deletar duplicados

---

## 💾 Impacto Estimado

- **Arquivos removidos:** ~80+
- **Espaço liberado:** ~5-10MB (docs) + cache
- **Clareza do projeto:** +300%
- **Manutenibilidade:** Significativamente melhorada

---

## ⚠️ Riscos

1. **Baixo:** Páginas demo podem ser referenciadas em docs
2. **Médio:** Hooks stub podem estar em uso
3. **Baixo:** Backups podem ter código único

**Recomendação:** Criar branch de backup antes da limpeza
