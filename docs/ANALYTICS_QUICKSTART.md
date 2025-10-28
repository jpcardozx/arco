# Analytics Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Get PostHog API Key

1. Sign up at [posthog.com](https://posthog.com) (free tier available)
2. Create a new project
3. Go to **Project Settings** → **API Keys**
4. Copy your **Project API Key** (starts with `phc_`)

### 2. Add to Environment

```bash
# .env.local
NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 3. Already Integrated!

The system is already integrated in the main layout. Just add your API key and restart the dev server:

```bash
pnpm dev
```

## ✅ Verify Installation

1. Open your app in the browser
2. Open DevTools Console
3. Look for: `✅ PostHog initialized`
4. In PostHog dashboard, go to **Live Events**
5. You should see events appearing in real-time

## 📝 Basic Usage Examples

### Track Button Click

```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

function MyButton() {
  const { trackInteraction } = useAnalytics();

  return (
    <button onClick={() => trackInteraction('Submit Button', 'click')}>
      Submit
    </button>
  );
}
```

### Track Form Submission

```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

function ContactForm() {
  const { trackConversion } = useAnalytics();

  const handleSubmit = async (data) => {
    await trackConversion('lead_submit', 'Contact Form', 100, {
      email: data.email,
      source: 'homepage'
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Use Trackable Components

```tsx
import { TrackableButton } from '@/components/analytics/TrackableButton';
import { TrackableLink } from '@/components/analytics/TrackableLink';
import { TrackableSection } from '@/components/analytics/TrackableSection';

function MyComponent() {
  return (
    <TrackableSection sectionName="hero">
      <TrackableButton
        trackLabel="Get Started CTA"
        trackCategory="cta"
        onClick={handleClick}
      >
        Get Started
      </TrackableButton>

      <TrackableLink
        href="/pricing"
        trackLabel="Pricing Link"
      >
        See Pricing
      </TrackableLink>
    </TrackableSection>
  );
}
```

## 🎯 What's Tracked Automatically

The following events are tracked automatically (no code needed):

✅ **Page Views** - Every route change
✅ **Scroll Depth** - 25%, 50%, 75%, 90%, 100% milestones
✅ **Time on Page** - 10s, 30s, 1m, 2m, 5m intervals
✅ **Session Info** - Session ID, duration, user info
✅ **Errors** - Runtime errors with stack traces

## 🔒 Privacy Compliance

The privacy consent banner automatically shows on first visit. Users can:
- Accept all cookies
- Reject all cookies
- Customize preferences (analytics, marketing, etc)
- Change preferences anytime

Consent is saved for 6 months and complies with LGPD/GDPR.

## 🐛 Debug Mode

Enable debug mode to see all events in the console:

```bash
# .env.local
NEXT_PUBLIC_ANALYTICS_DEBUG=true
```

Then restart dev server. You'll see:

```
📊 Analytics Event: {
  category: 'engagement',
  action: 'scroll_depth',
  label: '50%',
  value: 50,
  sessionId: 'session_1234567890_abc'
}
```

## 📊 View Your Data

### PostHog Dashboard

1. Go to [app.posthog.com](https://app.posthog.com)
2. Click **Live Events** to see real-time events
3. Click **Insights** to create charts and funnels
4. Click **Session Recordings** to watch user sessions

### Analytics Dashboard (Dev Only)

In development mode, a floating dashboard shows:
- Session ID
- Time on page
- Scroll depth
- Interactions count
- Engagement score

## 🚀 Next Steps

- Read the [full documentation](./ANALYTICS_IMPLEMENTATION.md)
- Check [example implementations](../src/components/landing/sections/HeroSectionEnhanced.tsx)
- Set up conversion goals in PostHog
- Create custom dashboards
- Set up A/B tests with feature flags

## 🆘 Troubleshooting

**Events not showing in PostHog?**
1. Check API key is correct
2. Check consent is granted (Privacy Banner)
3. Enable debug mode to see events in console
4. Check PostHog Live Events (may take 10-30 seconds)

**PostHog not initializing?**
```bash
# Check your API key starts with "phc_"
echo $NEXT_PUBLIC_POSTHOG_KEY

# Restart dev server
pnpm dev
```

**Privacy banner not showing?**
- Clear localStorage: `localStorage.clear()`
- Refresh page
- Should show on first visit

## 📚 Resources

- [PostHog Docs](https://posthog.com/docs)
- [Full Analytics Guide](./ANALYTICS_IMPLEMENTATION.md)
- [Event Types Reference](../src/lib/analytics/types.ts)
- [Example Implementation](../src/components/landing/sections/HeroSectionEnhanced.tsx)

---

**Need help?** Open an issue or check the [FAQ](./FAQ.md)
