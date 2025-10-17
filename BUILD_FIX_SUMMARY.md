# Build and Deploy Fixes Summary

This document summarizes the fixes applied to resolve build and deploy errors in the ARCO project.

## Problem Statement
The project had several build and deployment errors preventing successful CI/CD execution:
1. TypeScript compilation errors
2. Missing binaries (pnpm configuration issues)
3. GitHub workflow using wrong package manager
4. Build-time initialization errors with Supabase
5. Missing environment variable documentation

## Solutions Implemented

### 1. TypeScript Type Errors Fixed
**File:** `src/app/jpcardozo/applications/[id]/schedule/page.tsx`

**Problem:** Next.js 15 `useParams()` can return `string | string[]` for dynamic route parameters, causing type errors.

**Solution:**
```typescript
// Before
const params = useParams<{ id: string }>();
const applicationId = params?.id || '';

// After
const params = useParams();
const applicationId = typeof params?.id === 'string' ? params.id : '';
```

### 2. pnpm Binary Hoisting
**File:** `.npmrc`

**Problem:** With `shamefully-hoist=false` and `node-linker=isolated`, binaries like `next` were not accessible in `node_modules/.bin/`.

**Solution:**
```
# Before
shamefully-hoist=false
node-linker=isolated

# After
shamefully-hoist=true
# (removed node-linker=isolated)
```

### 3. GitHub Workflow Package Manager
**File:** `.github/workflows/tailwind-validation.yml`

**Problem:** Workflow was using `npm` while project requires `pnpm`.

**Solution:**
- Added `pnpm/action-setup@v2` step
- Changed `cache: 'npm'` to `cache: 'pnpm'`
- Changed `npm ci` to `pnpm install --frozen-lockfile`
- Changed `npm run build` to `pnpm build`
- Added `pnpm typecheck` step
- Added placeholder environment variables for build

### 4. Lazy Supabase Client Initialization
**Files:** 
- `src/lib/supabase/client.ts`
- `src/lib/payments/mercadopago/webhooks.ts`

**Problem:** Supabase admin client was initialized at module load time, causing errors during build when environment variables are not available.

**Solution:**

In `client.ts`:
```typescript
export function getSupabaseAdmin() {
  // Only throw error in production runtime
  if (!supabaseUrl || !supabaseServiceKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY não está configurado');
    }
    // During build, return placeholder client
    return createSupabaseClient<Database>(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseServiceKey || 'placeholder-key'
    );
  }
  // ...
}
```

In `webhooks.ts`:
```typescript
// Before - eager initialization
const supabase = getSupabaseAdmin();

// After - lazy initialization
let supabaseInstance: ReturnType<typeof getSupabaseAdmin> | null = null;
function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = getSupabaseAdmin();
  }
  return supabaseInstance;
}
```

### 5. Environment Variables Documentation
**File:** `.env.example`

**Problem:** Missing documentation for required environment variables.

**Solution:** Added all required variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=your_mercadopago_public_key
MERCADOPAGO_ACCESS_TOKEN=your_mercadopago_access_token
```

## Verification

All fixes have been tested and verified:

1. ✅ TypeScript compilation: `pnpm typecheck` - No errors
2. ✅ Build process: `pnpm build` - Completes successfully
3. ✅ Linting: `pnpm lint` - Only warnings (as configured)
4. ✅ Deploy scripts: All bash scripts have valid syntax

## CI/CD Configuration

The GitHub workflow now includes placeholder environment variables for build time:

```yaml
env:
  NEXT_PUBLIC_SUPABASE_URL: https://ci-build-placeholder.invalid
  NEXT_PUBLIC_SUPABASE_ANON_KEY: ci-build-placeholder-anon-key
  SUPABASE_SERVICE_ROLE_KEY: ci-build-placeholder-service-key
  NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY: ci-build-placeholder-mp-key
  MERCADOPAGO_ACCESS_TOKEN: ci-build-placeholder-mp-token
  PUPPETEER_SKIP_DOWNLOAD: true
```

Note: The `.invalid` TLD is used to ensure no accidental connections during build.

## Production Deployment

For production deployments, ensure real environment variables are configured:

1. In Vercel/hosting platform dashboard
2. Or in `.env.local` for local builds (never commit this file)

Refer to `.env.example` for the complete list of required variables.

## Next Steps

1. Configure real environment variables in your deployment platform
2. Test the deployment with actual Supabase and MercadoPago credentials
3. Verify webhook integrations work correctly in production
4. Monitor logs for any runtime issues

## Related Files

- `.github/workflows/tailwind-validation.yml` - CI/CD workflow
- `.npmrc` - pnpm configuration
- `.env.example` - Environment variables template
- `src/lib/supabase/client.ts` - Supabase client initialization
- `src/lib/payments/mercadopago/webhooks.ts` - Webhook handler
- `src/app/jpcardozo/applications/[id]/schedule/page.tsx` - TypeScript fixes
