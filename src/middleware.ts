import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

/**
 * Enhanced secure authentication middleware with robust security controls
 * 
 * Features:
 * - Security headers
 * - API route handling
 * - Auth endpoints support
 * - Role-based access control
 */
export async function middleware(req: NextRequest) {
  // Special handling for auth API routes to prevent 405 errors
  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    const response = NextResponse.next();
    
    // Add essential CORS headers for auth endpoints
    response.headers.set('Access-Control-Allow-Origin', req.headers.get('origin') || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    
    // Handle OPTIONS requests (preflight requests)
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, { 
        status: 200,
        headers: response.headers
      });
    }
    
    return response;
  }
  
  // Start with default response for non-auth routes
  const response = NextResponse.next();
    
  // ------------------------------------------------------------
  // Security Headers Implementation - Enterprise Grade
  // ------------------------------------------------------------
    
  // Prevent clickjacking attacks
  response.headers.set('X-Frame-Options', 'DENY');
    
  // Prevent MIME type sniffing security risks
  response.headers.set('X-Content-Type-Options', 'nosniff');
    
  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
  // Restrict browser features
  response.headers.set(
    'Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
    
  // Prevent XSS attacks with Content-Security-Policy
  // Note: 'unsafe-eval' is required for Next.js development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${isDevelopment ? "'unsafe-eval'" : ''} https://analytics.arco.com https://vercel.live`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://*.arco.com https://images.unsplash.com blob:",
    "connect-src 'self' https://api.arco.com https://analytics.arco.com wss://localhost:* ws://localhost:*",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
    
  response.headers.set('Content-Security-Policy', cspDirectives);
    
  // Add HSTS header in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security', 
      'max-age=63072000; includeSubDomains; preload'
    );
  }
    
  // Add cache control for authenticated routes
  response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
    
  // ------------------------------------------------------------
  // Role-Based Access Control for Admin Routes
  // ------------------------------------------------------------
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('__Secure-next-auth.session-token');
  
  // Validar acesso a rotas de admin
  if (pathname.startsWith('/dashboard/admin') || pathname.startsWith('/api/admin')) {
    try {
      // Criar cliente Supabase para middleware
      let supabaseResponse = NextResponse.next({ request: req })
      
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return req.cookies.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
              supabaseResponse.cookies.set({ name, value, ...options })
            },
            remove(name: string, options: CookieOptions) {
              supabaseResponse.cookies.set({ name, value: '', ...options })
            },
          },
        }
      )
      
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user || user.user_metadata?.role !== 'admin') {
        // Redirecionar não-admins de volta ao dashboard
        if (pathname.startsWith('/dashboard/admin')) {
          return NextResponse.redirect(new URL('/dashboard', req.url))
        }
        // Retornar 403 para APIs
        return new NextResponse(
          JSON.stringify({ error: 'Acesso negado. Apenas administradores.' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        )
      }
    } catch (error) {
      console.error('[Middleware] Error checking admin access:', error)
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
    
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Middleware] Access to ${pathname} ${token ? '(Authenticated)' : '(Unauthenticated)'}`);
  }
    
  // In production: log access patterns, unusual behavior, etc.
    
  return response;
}

/**
 * Apply this middleware to protected routes
 */
export const config = {
  matcher: [
    // Dashboard and admin pages
    '/dashboard/:path*',
    
    // Auth API endpoints
    '/api/auth/:path*',
    
    // Protected API endpoints
    '/api/protected/:path*',
    '/api/dashboard/:path*',
    '/api/admin/:path*',
    
    // User profile pages
    '/profile/:path*',
  ],
};
