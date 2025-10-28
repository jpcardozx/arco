# Analytics Components

Professional analytics tracking components for the ARCO platform.

## 📦 Components

### `AnalyticsProvider`
Global provider that initializes analytics services (PostHog, Meta Pixel, etc).

```tsx
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';

<AnalyticsProvider autoInit={true}>
  {children}
</AnalyticsProvider>
```

### `PrivacyConsentBanner`
LGPD/GDPR compliant cookie consent banner.

```tsx
import { PrivacyConsentBanner } from '@/components/analytics/PrivacyConsentBanner';

<PrivacyConsentBanner />
```

Features:
- Granular cookie control (necessary, analytics, marketing, preferences)
- Remembers choice for 6 months
- Beautiful, accessible UI
- Mobile responsive

### `TrackableButton`
Button that automatically tracks clicks.

```tsx
import { TrackableButton } from '@/components/analytics/TrackableButton';

<TrackableButton
  trackLabel="Get Started CTA"
  trackCategory="cta"
  trackProperties={{ location: 'hero' }}
  showFeedback={true}
  onClick={handleClick}
>
  Get Started
</TrackableButton>
```

Props:
- `trackLabel` - Event label (required)
- `trackCategory` - Event category (cta | navigation | form | action)
- `trackProperties` - Additional event properties
- `showFeedback` - Show success feedback on click
- `feedbackDuration` - Duration of feedback (ms)

### `TrackableLink`
Link that automatically tracks navigation.

```tsx
import { TrackableLink } from '@/components/analytics/TrackableLink';

<TrackableLink
  href="/pricing"
  trackLabel="Pricing Link"
  trackProperties={{ source: 'navbar' }}
>
  See Pricing
</TrackableLink>
```

Props:
- `href` - Link destination (required)
- `trackLabel` - Event label
- `trackProperties` - Additional properties
- `external` - Is external link

### `TrackableSection`
Section that tracks viewport visibility.

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

Props:
- `sectionName` - Section identifier (required)
- `trackOnce` - Only track first view
- `threshold` - Visibility threshold (0-1)

### `AnalyticsDashboard`
Real-time analytics dashboard (dev only).

```tsx
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

<AnalyticsDashboard />
```

Displays:
- Session ID
- Time on page
- Scroll depth
- Interactions count
- Engagement score

Only visible in development mode.

## 🎯 Usage Examples

### Basic Tracking

```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

function MyComponent() {
  const { trackInteraction, trackConversion } = useAnalytics();

  const handleClick = () => {
    trackInteraction('Button', 'click', {
      location: 'sidebar'
    });
  };

  const handleSubmit = async (data) => {
    await trackConversion('lead_submit', 'Contact Form', 100, {
      email: data.email
    });
  };

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

### Enhanced Hero Section

See [HeroSectionEnhanced.tsx](../landing/sections/HeroSectionEnhanced.tsx) for a complete example.

## 📚 Documentation

- [Full Implementation Guide](../../../docs/ANALYTICS_IMPLEMENTATION.md)
- [Quick Start Guide](../../../docs/ANALYTICS_QUICKSTART.md)
- [Event Types Reference](../../../src/lib/analytics/types.ts)

## 🔧 Configuration

### Environment Variables

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_ANALYTICS_DEBUG=true  # Enable debug mode
```

### Features

The analytics system includes:
- ✅ Auto-tracking (scroll, time, page views)
- ✅ Event queue with retry
- ✅ Offline support
- ✅ Privacy compliance (LGPD/GDPR)
- ✅ Session recording
- ✅ Error tracking
- ✅ Performance monitoring

## 🐛 Debugging

Enable debug mode:

```bash
NEXT_PUBLIC_ANALYTICS_DEBUG=true pnpm dev
```

Check console for:
```
📊 Analytics Event: {...}
✅ PostHog initialized
```

## 🆘 Troubleshooting

**Events not tracking?**
1. Check API key is set
2. Check consent is granted
3. Enable debug mode
4. Check browser console

**PostHog not loading?**
1. Verify API key starts with `phc_`
2. Check network tab for requests
3. Disable ad blockers
4. Test in incognito mode

## 📝 License

Part of the ARCO platform.
