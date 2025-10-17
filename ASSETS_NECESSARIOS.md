# 📸 LISTA DE MÍDIAS NECESSÁRIAS - Portfolio /jpcardozo

## 🎯 Assets Reais Necessários (SEM MOCKS/SIMULAÇÕES)

### 1️⃣ Work Experience Timeline (`WorkExperienceTimeline.tsx`)

**3 screenshots de projetos reais em formato retangular:**

- `/public/images/experience-1.jpg` 
  - **Descrição:** Screenshot do projeto mais recente como Freelancer/Contractor
  - **Contexto:** GA4 + CRO, Next.js, React 19
  - **Dimensões recomendadas:** 1200x800px (3:2 ratio)
  - **Formato:** JPG ou PNG otimizado

- `/public/images/experience-2.jpg`
  - **Descrição:** Screenshot de projeto em agência digital
  - **Contexto:** UI/UX design, CMS headless (Sanity)
  - **Dimensões recomendadas:** 1200x800px (3:2 ratio)
  - **Formato:** JPG ou PNG otimizado

- `/public/images/experience-3.jpg`
  - **Descrição:** Screenshot de projeto em startup SaaS
  - **Contexto:** React + TypeScript, Design System
  - **Dimensões recomendadas:** 1200x800px (3:2 ratio)
  - **Formato:** JPG ou PNG otimizado

---

### 2️⃣ Project Showcase (`ProjectShowcase.tsx`)

**4 screenshots de projetos reais em formato landscape:**

- `/public/images/project-dashboard.jpg`
  - **Descrição:** Dashboard Analytics SaaS com gráficos e métricas
  - **Tech:** Next.js 15, React 19, PostgreSQL, Vercel
  - **Dimensões recomendadas:** 1600x900px (16:9 ratio)
  - **Formato:** JPG otimizado
  - **Extras:** URLs para GitHub e site live (se disponível)

- `/public/images/project-ecommerce.jpg`
  - **Descrição:** E-commerce completo (homepage ou checkout)
  - **Tech:** Next.js, Stripe, Supabase, Tailwind
  - **Dimensões recomendadas:** 1600x900px (16:9 ratio)
  - **Formato:** JPG otimizado
  - **Extras:** URL do site live (se disponível)

- `/public/images/project-fitness.jpg`
  - **Descrição:** App mobile de fitness (screenshot de tela)
  - **Tech:** React Native, TypeScript, Firebase, Expo
  - **Dimensões recomendadas:** 1600x900px (16:9 ratio)
  - **Formato:** JPG otimizado
  - **Extras:** URL do site/app (se disponível)

- `/public/images/project-crm.jpg`
  - **Descrição:** CRM personalizado (dashboard ou lista de clientes)
  - **Tech:** .NET Core, Angular, PostgreSQL, Docker
  - **Dimensões recomendadas:** 1600x900px (16:9 ratio)
  - **Formato:** JPG otimizado
  - **Extras:** URL do site (se disponível)

---

### 3️⃣ Client Logos Showcase (`ClientLogosShowcase.tsx`)

**6 logos de clientes reais (ou 3 se preferir duplicar):**

- `/public/images/clients/empresa-a-logo.svg` (ou .png)
  - **Descrição:** Logo do cliente de e-commerce
  - **Formato:** SVG (preferencial) ou PNG com fundo transparente
  - **Dimensões:** Vetorial ou 400x200px mínimo
  - **Indústria:** E-commerce

- `/public/images/clients/startup-b-logo.svg` (ou .png)
  - **Descrição:** Logo do cliente SaaS
  - **Formato:** SVG ou PNG transparente
  - **Dimensões:** Vetorial ou 400x200px mínimo
  - **Indústria:** SaaS

- `/public/images/clients/agencia-c-logo.svg` (ou .png)
  - **Descrição:** Logo do cliente de marketing digital
  - **Formato:** SVG ou PNG transparente
  - **Dimensões:** Vetorial ou 400x200px mínimo
  - **Indústria:** Marketing Digital

- `/public/images/clients/techcorp-d-logo.svg` (ou .png)
  - **Descrição:** Logo do cliente de tecnologia
  - **Formato:** SVG ou PNG transparente
  - **Dimensões:** Vetorial ou 400x200px mínimo
  - **Indústria:** Tecnologia

- `/public/images/clients/retail-e-logo.svg` (ou .png)
  - **Descrição:** Logo do cliente de varejo
  - **Formato:** SVG ou PNG transparente
  - **Dimensões:** Vetorial ou 400x200px mínimo
  - **Indústria:** Varejo

- `/public/images/clients/fintech-f-logo.svg` (ou .png)
  - **Descrição:** Logo do cliente fintech
  - **Formato:** SVG ou PNG transparente
  - **Dimensões:** Vetorial ou 400x200px mínimo
  - **Indústria:** Fintech

---

## 📋 RESUMO EXECUTIVO

### Total de Assets Necessários:
- **13 imagens/logos reais** (3 experiences + 4 projects + 6 client logos)

### Estrutura de Diretórios:
```
/public/images/
├── experience-1.jpg
├── experience-2.jpg
├── experience-3.jpg
├── project-dashboard.jpg
├── project-ecommerce.jpg
├── project-fitness.jpg
├── project-crm.jpg
└── clients/
    ├── empresa-a-logo.svg (ou .png)
    ├── startup-b-logo.svg
    ├── agencia-c-logo.svg
    ├── techcorp-d-logo.svg
    ├── retail-e-logo.svg
    └── fintech-f-logo.svg
```

### Otimizações Recomendadas:
- **Screenshots de projetos:** Comprimir com TinyPNG ou similar (< 200KB)
- **Logos:** SVG otimizado com SVGO ou PNG transparente (< 50KB)
- **Next.js Image:** Todos usarão otimização automática do Next.js

### Observações Importantes:
1. **Não incluir nenhuma simulação ou mock** - apenas assets reais de projetos
2. Logos devem ter **fundo transparente** (PNG/SVG)
3. Screenshots devem mostrar **UI real dos projetos**
4. Se não tiver 6 clientes, pode usar **3 logos e duplicar** no código
5. URLs de GitHub e sites live são **opcionais** mas recomendados

---

## 🔄 Próximos Passos:

1. Coletar screenshots reais dos projetos
2. Exportar logos dos clientes (com permissão)
3. Criar estrutura de diretórios em `/public/images/`
4. Otimizar todas as imagens
5. Atualizar arrays nos componentes com dados reais:
   - `WorkExperienceTimeline.tsx` → linha 18-50
   - `ProjectShowcase.tsx` → linha 30-70
   - `ClientLogosShowcase.tsx` → linha 14-45

**Componentes já estão prontos e aguardando apenas os assets reais! 🚀**
