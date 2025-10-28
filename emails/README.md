# ARCO Email System v3.0

**Production-Ready Email Templates**

Clean, professional, token-based design system with zero overengineering.

---

## 📁 Structure

```
emails/
├── _tokens.ts                      # Design system (single source of truth)
├── components/
│   ├── Container.simple.tsx        # Responsive layout wrapper
│   ├── Card.simple.tsx            # Content cards with variants
│   ├── Button.simple.tsx          # CTA buttons
│   ├── Header.simple.tsx          # Logo header
│   ├── Footer.simple.tsx          # Legal footer
│   └── index.ts                   # Exports
├── templates/
│   ├── BaseEmail.tsx              # Base template wrapper
│   ├── WeeklyDigestSimple.tsx     # Analytics summary
│   └── index.ts                   # Exports
├── EMAIL_DESIGN_SYSTEM.md         # Complete documentation
└── CHANGELOG_V3.md                # Version history
```

---

## 🚀 Quick Start

### 1. Import Template
```typescript
import { WeeklyDigestSimple } from '@/emails/templates'
import { emailTokens } from '@/emails/_tokens'
```

### 2. Use in API Route
```typescript
import { render } from '@react-email/render'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const html = render(WeeklyDigestSimple({
  userName: 'João Pedro',
  userEmail: 'user@example.com',
  metrics: {
    visits: '1.247',
    conversions: '38',
    revenue: 'R$ 15.420'
  },
  weekRange: '18-24 OUT 2025'
}))

await resend.emails.send({
  from: emailTokens.company.from,
  to: 'user@example.com',
  subject: 'Seu resumo semanal',
  html
})
```

### 3. Test Locally
```bash
export RESEND_API_KEY="your_key"
export TEST_EMAIL="your@email.com"
npx tsx scripts/test-professional-email.ts
```

---

## 🎨 Design Tokens

All design values are centralized in `_tokens.ts`:

- **URLs:** Base, dashboard, unsubscribe, etc.
- **Assets:** Logo paths (light/dark)
- **Icons:** 8 Heroicons (base64 inline)
- **Colors:** 21 WCAG AA+ compliant colors
- **Typography:** Complete scale (sizes, weights, line-heights)
- **Spacing:** 8px base unit (12 values)
- **Layout:** Max-width, shadows, border-radius

**Usage:**
```typescript
import { emailTokens } from '../_tokens'

<p style={{ 
  fontSize: emailTokens.typography.size.lg,
  color: emailTokens.colors.primary,
  margin: `${emailTokens.spacing[3]} 0`
}}>
  Text
</p>
```

---

## 🧩 Components

### Container
Responsive layout wrapper with 4 sizes.

```tsx
<Container size="comfortable" background="gray">
  {children}
</Container>
```

### Card
Content wrapper with 3 variants (default/elevated/primary).

```tsx
<Card variant="elevated" padding="comfortable">
  {children}
</Card>
```

### Button
Professional CTA with 3 variants.

```tsx
<Button 
  href={emailTokens.urls.dashboard}
  variant="primary"
  size="large"
>
  Ver Dashboard
</Button>
```

### Header
Logo with optional tagline.

```tsx
<Header />
```

### Footer
Legal footer with compliance.

```tsx
<Footer unsubscribeUrl={emailTokens.urls.unsubscribe(email)} />
```

---

## 🎯 Icons (Heroicons v2)

8 inline base64 icons available:

- `emailTokens.icons.eye` - Analytics
- `emailTokens.icons.checkCircle` - Success
- `emailTokens.icons.currencyDollar` - Revenue
- `emailTokens.icons.chartBar` - Reports
- `emailTokens.icons.arrowRight` - Navigation
- `emailTokens.icons.calendar` - Events
- `emailTokens.icons.envelope` - Messages
- `emailTokens.icons.informationCircle` - Info

**Usage:**
```tsx
import { Img } from '@react-email/components'

<Img 
  src={emailTokens.icons.checkCircle} 
  width="24" 
  height="24" 
  alt=""
/>
```

---

## 📊 Metrics

- **Code:** ~600 lines (-60% vs v2.0)
- **Components:** 5 (vs 12 in v2.0)
- **Interfaces:** 5 (vs 42 in v2.0)
- **Template size:** ~19KB
- **Email client support:** 99%+

---

## 📖 Documentation

- **EMAIL_DESIGN_SYSTEM.md** - Complete design system reference
- **CHANGELOG_V3.md** - Version history and changes

---

## 🔧 Development

### Add New Template
1. Create file in `templates/`
2. Import components from `components/`
3. Use tokens from `_tokens.ts`
4. Export in `templates/index.ts`

### Add New Icon
1. Get SVG from [Heroicons](https://heroicons.com)
2. Convert to base64: `echo '<svg>...</svg>' | base64 -w 0`
3. Add to `_tokens.ts` icons object

---

**Version:** 3.0  
**Last Updated:** 26 Oct 2025  
**Status:** ✅ Production Ready
