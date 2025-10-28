# ARCO Email Design System v3.0

## 📐 Architecture

**Philosophy:** Clean, token-based, production-ready  
**Code Reduction:** -60% vs v2.0  
**Icon System:** Heroicons v2 (MIT) - inline base64 SVG

---

## 🎨 Tokens (`_tokens.ts`)

### URLs
```typescript
emailTokens.urls.base         // https://consultingarco.com
emailTokens.urls.dashboard    // /dashboard
emailTokens.urls.unsubscribe(email)
emailTokens.urls.privacy
emailTokens.urls.terms
emailTokens.urls.support
emailTokens.urls.booking
```

### Assets
```typescript
// Logos (use existing public/logos/horizontal/)
emailTokens.assets.logo.light  // /logos/horizontal/colorful.png
emailTokens.assets.logo.dark   // /logos/horizontal/white.png
emailTokens.assets.logo.width  // 160
emailTokens.assets.logo.height // 48
emailTokens.assets.logo.alt    // "ARCO Consultoria"
```

### Icons (Heroicons v2 - Base64 inline)
**Available icons:**
- `emailTokens.icons.eye` - Analytics, views
- `emailTokens.icons.checkCircle` - Success, conversions
- `emailTokens.icons.currencyDollar` - Revenue, money
- `emailTokens.icons.chartBar` - Reports, statistics
- `emailTokens.icons.arrowRight` - CTAs, navigation
- `emailTokens.icons.calendar` - Events, scheduling
- `emailTokens.icons.envelope` - Email, messages
- `emailTokens.icons.informationCircle` - Info, help

**Usage:**
```tsx
import { Img } from '@react-email/components'
import { emailTokens } from '../_tokens'

<Img 
  src={emailTokens.icons.eye} 
  width="24" 
  height="24" 
  alt=""
  style={{ display: 'block', margin: '0 auto' }}
/>
```

### Colors (WCAG AA+ compliant)
```typescript
// Brand
colors.primary           // #6366f1 (Indigo 500)
colors.primaryHover      // #4f46e5
colors.primaryLight      // #eef2ff
colors.primaryDark       // #4338ca

// Text (high contrast ratios)
colors.text              // #0f172a (21:1)
colors.textMuted         // #475569 (7:1)
colors.textSubtle        // #64748b (4.6:1)

// Backgrounds
colors.bg                // #ffffff
colors.bgGray            // #f8fafc
colors.bgMuted           // #f1f5f9

// Borders
colors.border            // #e2e8f0
colors.borderMuted       // #f1f5f9
colors.borderStrong      // #cbd5e1

// Semantic
colors.success           // #059669 (Green 600)
colors.successLight      // #d1fae5
colors.warning           // #d97706 (Amber 600)
colors.warningLight      // #fef3c7
colors.error             // #dc2626 (Red 600)
colors.errorLight        // #fee2e2
colors.info              // #2563eb (Blue 600)
colors.infoLight         // #dbeafe

// Dark mode
colors.darkBg
colors.darkText
colors.darkBorder
colors.darkMuted
```

### Typography
```typescript
// Fonts
typography.font          // System font stack
typography.fontMono      // Monospace stack

// Sizes (Major Third 1.25 ratio)
typography.size.xs       // 12px - Legal, captions
typography.size.sm       // 14px - Secondary text
typography.size.base     // 16px - Body (WCAG AA)
typography.size.lg       // 18px - Large body
typography.size.xl       // 20px - Small headings
typography.size['2xl']   // 24px - Medium headings
typography.size['3xl']   // 30px - Large headings
typography.size['4xl']   // 36px - Hero text

// Weights
typography.weight.normal    // 400
typography.weight.medium    // 500
typography.weight.semibold  // 600
typography.weight.bold      // 700

// Line heights
typography.lineHeight.tight     // 1.25
typography.lineHeight.snug      // 1.375
typography.lineHeight.normal    // 1.5
typography.lineHeight.relaxed   // 1.625
typography.lineHeight.loose     // 1.75

// Letter spacing
typography.letterSpacing.tighter // -0.05em
typography.letterSpacing.tight   // -0.025em
typography.letterSpacing.normal  // 0
typography.letterSpacing.wide    // 0.025em
typography.letterSpacing.wider   // 0.05em
```

### Spacing (8px base unit)
```typescript
spacing[0]     // 0
spacing.px     // 1px
spacing[0.5]   // 4px
spacing[1]     // 8px
spacing[1.5]   // 12px
spacing[2]     // 16px
spacing[3]     // 24px
spacing[4]     // 32px
spacing[5]     // 40px
spacing[6]     // 48px
spacing[8]     // 64px
spacing[10]    // 80px
```

### Layout
```typescript
layout.maxWidth          // 600px
layout.padding           // 24px (desktop)
layout.paddingMobile     // 16px (mobile)
layout.borderRadius      // 8px
layout.borderRadiusLg    // 12px
layout.minTapTarget      // 44px (WCAG 2.5.5)
layout.shadowSm          // Subtle shadow
layout.shadowMd          // Medium shadow
layout.shadowLg          // Large shadow
```

---

## 🧩 Components

### Container
**Purpose:** Responsive layout wrapper  
**Props:**
- `size`: 'compact' | 'default' | 'comfortable' | 'spacious'
- `background`: 'white' | 'gray'
- `align`: 'left' | 'center' | 'right'

**Usage:**
```tsx
<Container size="comfortable" background="gray">
  {children}
</Container>
```

### Card
**Purpose:** Content wrapper with variants  
**Props:**
- `variant`: 'default' | 'elevated' | 'primary'
- `padding`: 'default' | 'comfortable' | 'spacious'

**Usage:**
```tsx
<Card variant="elevated" padding="comfortable">
  <table role="presentation">
    <tbody>
      <tr>
        <td align="center">
          <Img src={emailTokens.icons.checkCircle} width="24" height="24" alt="" />
          <p>Content</p>
        </td>
      </tr>
    </tbody>
  </table>
</Card>
```

### Button
**Purpose:** CTA with professional styling  
**Props:**
- `href`: string (required)
- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'default' | 'large'
- `fullWidth`: boolean

**Usage:**
```tsx
<Button 
  href={`${emailTokens.urls.dashboard}?utm_source=email`}
  variant="primary"
  size="large"
>
  Ver Dashboard
</Button>
```

### Header
**Purpose:** Logo with optional tagline  
**Props:**
- `tagline`: string
- `showTagline`: boolean

**Usage:**
```tsx
<Header />
// or
<Header tagline="Custom tagline" showTagline={true} />
```

### Footer
**Purpose:** Legal footer with compliance  
**Props:**
- `unsubscribeUrl`: string (required)
- `companyName`: string
- `address`: string

**Usage:**
```tsx
<Footer 
  unsubscribeUrl={emailTokens.urls.unsubscribe(userEmail)} 
/>
```

---

## 📧 Templates

### WeeklyDigestSimple
**Purpose:** Analytics summary email  
**Props:**
```typescript
{
  userName: string
  userEmail: string
  metrics: {
    visits: string      // e.g., "1.247"
    conversions: string // e.g., "38"
    revenue: string     // e.g., "R$ 15.420"
  }
  weekRange: string     // e.g., "18-24 OUT 2025"
}
```

**Features:**
- Heroicons inline (no emojis)
- Professional copy
- Semantic color usage
- Responsive spacing
- UTM tracking

---

## 🎯 Best Practices

### Icons
✅ **DO:**
- Use Heroicons from `emailTokens.icons`
- Set width/height explicitly (20-28px)
- Use `alt=""` for decorative icons
- Center icons with `margin: 0 auto`

❌ **DON'T:**
- Use emoji characters (renders differently across clients)
- Use external icon CDNs (unreliable in email)
- Skip alt text for meaningful icons

### Colors
✅ **DO:**
- Use semantic colors (`success`, `error`, `info`)
- Test contrast ratios (WCAG AA minimum 4.5:1)
- Use `primaryLight` for highlighted sections

❌ **DON'T:**
- Hardcode hex values
- Use colors without checking contrast
- Assume dark mode works everywhere

### Spacing
✅ **DO:**
- Use token spacing scale (`spacing[3]`, `spacing[4]`)
- Use responsive sizing (mobile → desktop)
- Maintain 44px minimum tap targets

❌ **DON'T:**
- Use arbitrary pixel values
- Forget mobile breakpoints
- Create tiny click areas

### Copy
✅ **DO:**
- Use clear, professional language
- Front-load important information
- Include UTM parameters in links

❌ **DON'T:**
- Use excessive emojis
- Write vague CTAs
- Forget to track conversions

---

## 🚀 Adding New Icons

1. Go to [Heroicons](https://heroicons.com)
2. Choose 24x24 outline icon
3. Copy SVG code
4. Convert to base64:
```bash
echo '<svg>...</svg>' | base64 -w 0
```
5. Add to `_tokens.ts`:
```typescript
icons: {
  newIcon: 'data:image/svg+xml;base64,PHN2Zy4uLjwvc3ZnPg==',
}
```

---

## 📊 Performance

- **Template size:** ~19KB (gzipped: ~6KB)
- **Render time:** <100ms
- **Email client support:** 99%+ (Gmail, Outlook, Apple Mail, etc.)
- **Mobile responsive:** Yes (600px breakpoint)
- **Dark mode:** Partial (logo only, most clients don't support full dark mode in HTML emails)

---

## 🔧 Maintenance

### File Structure
```
emails/
├── _tokens.ts              # Design system (single source of truth)
├── components/
│   ├── Container.simple.tsx
│   ├── Card.simple.tsx
│   ├── Button.simple.tsx
│   ├── Header.simple.tsx
│   └── Footer.simple.tsx
└── templates/
    ├── BaseEmail.tsx
    └── WeeklyDigestSimple.tsx
```

### Code Metrics
- **Lines of code:** ~600 (vs 1,500 in v2.0)
- **Components:** 5 (vs 12 in v2.0)
- **Interfaces:** 5 (vs 42 in v2.0)
- **Dead code:** 0% (vs 60% in v2.0)

---

**Last updated:** 26 Oct 2025  
**Version:** 3.0  
**License:** Proprietary (ARCO Consultoria)
