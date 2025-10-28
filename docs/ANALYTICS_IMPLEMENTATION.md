# Analytics Implementation Guide

## 📊 Overview

This document describes the comprehensive analytics system implemented in the ARCO platform. The system provides professional-grade tracking, privacy compliance, and real-time insights.

## 🎯 Features

### Core Analytics
- ✅ **PostHog** - Product analytics with session recording, heatmaps, and feature flags
- ✅ **Meta Pixel + CAPI** - Facebook/Instagram conversion tracking with deduplication
- ✅ **Vercel Analytics** - Performance and Web Vitals tracking
- ✅ **Custom Event Queue** - Offline support with retry mechanism
- ✅ **Privacy Consent** - LGPD/GDPR compliant cookie consent banner

### Auto-Tracking
- ✅ **Scroll Depth** - Tracks 25%, 50%, 75%, 90%, 100% milestones
- ✅ **Time on Page** - Tracks 10s, 30s, 1m, 2m, 5m intervals
- ✅ **Page Views** - Automatic page view tracking with UTM parameters
- ✅ **User Interactions** - Click, hover, focus tracking on elements
- ✅ **Section Views** - Viewport intersection tracking for sections
- ✅ **Form Events** - Start, progress, complete, abandon, errors
- ✅ **Error Tracking** - Runtime errors with stack traces

### Event Types
- 📄 **Page View** - View, exit, scroll events
- 🎯 **Engagement** - Scroll depth, time on page, section views, video plays
- 🖱️ **Interaction** - Clicks, hovers, focus, input, select
- 💰 **Conversion** - Lead submit, form complete, CTA click, contact, schedule, purchase
- 📝 **Form** - Start, progress, complete, abandon, field interactions
- 🧭 **Navigation** - Link clicks, menu interactions, tab switches
- ❌ **Error** - API errors, form errors, validation errors, runtime errors
- ⚡ **Performance** - Page load, resource load, API response, Web Vitals

## 🚀 Quick Start

### 1. Environment Setup

Add to your `.env.local`:

```bash
# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Optional
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ANALYTICS_DEBUG=true  # Enable in development
```

### 2. Provider Setup

Wrap your app with `AnalyticsProvider`:

```tsx
// src/app/layout.tsx
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { PrivacyConsentBanner } from '@/components/analytics/PrivacyConsentBanner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AnalyticsProvider>
          {children}
          <PrivacyConsentBanner />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
```

### 3. Using the Hook

```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

export function MyComponent() {
  const {
    trackPageView,
    trackInteraction,
    trackConversion,
    trackEngagement,
    trackForm,
    trackError
  } = useAnalytics();

  const handleClick = async () => {
    await trackInteraction('CTA Button', 'click', {
      location: 'hero-section',
      buttonText: 'Get Started'
    });
  };

  const handleFormSubmit = async (data) => {
    await trackConversion('lead_submit', 'Contact Form', 100, {
      email: data.email,
      source: 'landing_page'
    });
  };

  return (
    <button onClick={handleClick}>
      Get Started
    </button>
  );
}
```

### 4. Using Trackable Components

#### TrackableButton

```tsx
import { TrackableButton } from '@/components/analytics/TrackableButton';

<TrackableButton
  trackLabel="CTA: Get Started"
  trackCategory="cta"
  trackProperties={{ location: 'hero' }}
  showFeedback={true}
  onClick={handleClick}
>
  Get Started
</TrackableButton>
```

#### TrackableLink

```tsx
import { TrackableLink } from '@/components/analytics/TrackableLink';

<TrackableLink
  href="/pricing"
  trackLabel="Pricing Page"
  trackProperties={{ source: 'navbar' }}
>
  See Pricing
</TrackableLink>
```

#### TrackableSection

```tsx
import { TrackableSection } from '@/components/analytics/TrackableSection';

<TrackableSection
  sectionName="hero"
  trackOnce={true}
  threshold={0.5}
>
  <h1>Hero Content</h1>
</TrackableSection>
```

## 📈 Event Tracking Examples

### Page View

```tsx
// Automatic on page load, or manual:
await trackPageView('/pricing', {
  utm_source: 'google',
  utm_medium: 'cpc',
  utm_campaign: 'summer-2024'
});
```

### Engagement

```tsx
// Scroll depth (automatic)
await trackEngagement('scroll_depth', '50%', 50);

// Time on page (automatic)
await trackEngagement('time_on_page', '30s', 30);

// Section view (automatic with TrackableSection)
await trackEngagement('section_view', 'pricing-section');

// Video play
await trackEngagement('video_play', 'Product Demo', {
  video_duration: 120
});
```

### Interaction

```tsx
await trackInteraction('Download Button', 'click', {
  element_type: 'button',
  element_id: 'download-pdf',
  position: { x: 100, y: 200 }
});
```

### Conversion

```tsx
await trackConversion('lead_submit', 'Newsletter Signup', 0, {
  email: 'user@example.com',
  source: 'blog-post',
  lead_quality: 8
});

await trackConversion('purchase', 'Premium Plan', 99.90, {
  plan: 'premium-monthly',
  currency: 'BRL'
});
```

### Form Tracking

```tsx
// Form start
await trackForm('contact-form', 'start');

// Field interactions
await trackForm('contact-form', 'field_focus', {
  field_name: 'email'
});

// Form complete
await trackForm('contact-form', 'complete', {
  completion_rate: 100,
  time_to_complete: 45
});

// Form abandon
await trackForm('contact-form', 'abandon', {
  completion_rate: 60,
  last_field: 'phone'
});
```

### Error Tracking

```tsx
try {
  await riskyOperation();
} catch (error) {
  await trackError(error, 'PaymentForm');
}
```

## 🔒 Privacy & Consent

### Consent Management

```tsx
const { hasConsent, grantConsent, revokeConsent } = useAnalytics();

// Check consent
if (hasConsent) {
  // Track event
}

// Grant consent
grantConsent();

// Revoke consent
revokeConsent();
```

### Privacy Banner

The `PrivacyConsentBanner` component automatically:
- Shows on first visit
- Remembers user choice for 6 months
- Provides granular control over cookie types
- Complies with LGPD/GDPR
- Integrates with PostHog's opt-in/opt-out

## 🎨 UI/UX Features

### Visual Feedback

```tsx
<TrackableButton
  showFeedback={true}
  feedbackDuration={1500}
  trackLabel="Submit Form"
>
  Submit
</TrackableButton>
```

### Analytics Dashboard (Dev Only)

```tsx
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

// Automatically shows in development mode
<AnalyticsDashboard />
```

Shows real-time:
- Session ID
- Time on page
- Scroll depth
- Interactions count
- Page views
- Engagement score

## 🏗️ Architecture

### Event Flow

```
User Action
    ↓
Tracking Hook/Component
    ↓
Event Queue (with retry)
    ↓
[PostHog] + [Meta Pixel] + [GA4]
    ↓
Analytics Platforms
```

### Event Queue Features

- **Offline Support** - Events queued when offline, sent when online
- **Retry Logic** - Exponential backoff (1s, 2s, 4s)
- **Batching** - Sends events in batches of 10
- **Priority Queue** - High/Normal/Low priority
- **Persistence** - Saves to localStorage
- **Auto-flush** - Every 5 seconds

### Type Safety

All events are fully typed:

```tsx
interface EngagementEvent {
  category: 'engagement';
  action: 'scroll_depth' | 'time_on_page' | 'section_view' | ...;
  label: string;
  value?: number;
  properties?: {
    scroll_depth?: number;
    time_spent?: number;
    section_name?: string;
  };
}
```

## 📊 Analytics Platforms

### PostHog

**Features Enabled:**
- Auto-capture (clicks, forms, page views)
- Session recording (with console logs and network)
- Rage click detection
- Dead click detection
- Performance tracking
- Feature flags
- A/B testing

**Configuration:**
```tsx
// src/lib/analytics/posthog-config.ts
export const POSTHOG_CONFIG = {
  autocapture: true,
  session_recording: {
    enabled: true,
    sampleRate: 1.0
  },
  capture_performance: true
};
```

### Meta Pixel + CAPI

**Events Sent:**
- PageView
- ViewContent
- Lead
- Contact
- Schedule
- Purchase
- CompleteRegistration

**Deduplication:**
- Same `event_id` sent to both Pixel and CAPI
- Meta automatically deduplicates server-side

### Vercel Analytics

Automatically tracks:
- Page views
- Web Vitals (LCP, FID, CLS, FCP, TTFB)
- Performance metrics

## 🧪 Testing

### Development Mode

```bash
NEXT_PUBLIC_ANALYTICS_DEBUG=true npm run dev
```

Shows detailed console logs:
```
📊 Analytics Event: {
  category: 'engagement',
  action: 'scroll_depth',
  label: '50%',
  value: 50,
  sessionId: 'session_1234567890_abc123'
}
```

### Event Validation

```tsx
// Check if event was tracked
const { track } = useAnalytics();

await track({
  category: 'conversion',
  action: 'lead_submit',
  label: 'Contact Form',
  value: 100
});
```

### PostHog Testing

1. Go to PostHog → Live Events
2. Perform action on your app
3. Event should appear within seconds

### Meta Pixel Testing

1. Install Meta Pixel Helper Chrome extension
2. Visit your page
3. Check events in extension popup

## 🚨 Troubleshooting

### Events Not Showing

1. Check consent is granted: `hasConsent === true`
2. Check PostHog is initialized: `posthog.__loaded === true`
3. Enable debug mode: `NEXT_PUBLIC_ANALYTICS_DEBUG=true`
4. Check browser console for errors
5. Verify API keys in `.env.local`

### PostHog Not Initializing

```bash
# Check environment variable
echo $NEXT_PUBLIC_POSTHOG_KEY

# Should start with "phc_"
```

### Meta Pixel Not Firing

1. Check Meta Pixel Helper extension
2. Verify `window.fbq` is defined
3. Check for ad blockers
4. Test in incognito mode

## 📚 Resources

- [PostHog Docs](https://posthog.com/docs)
- [Meta Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Web Vitals](https://web.dev/vitals/)
- [LGPD Compliance](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)
- [GDPR Compliance](https://gdpr.eu/)

## 🎯 Best Practices

1. **Always get consent** before tracking personal data
2. **Use meaningful labels** for events (not just "button-1")
3. **Add context** with properties
4. **Track funnel steps** to understand drop-off
5. **Monitor errors** to improve UX
6. **Respect DNT** (Do Not Track) headers
7. **Test events** in development before production
8. **Document custom events** for your team
9. **Review analytics** regularly to optimize
10. **Keep PII secure** - never log sensitive data

## 🔄 Migration from Old System

If migrating from the old tracking system:

```tsx
// Old
trackEvent('button_click', { button: 'submit' });

// New
trackInteraction('Submit Button', 'click', {
  element_type: 'button',
  location: 'contact-form'
});
```

## 📝 License

This analytics implementation is part of the ARCO platform and follows the same license.

---

**Questions?** Check the [FAQs](./FAQ.md) or open an issue.
