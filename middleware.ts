import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const path = request.nextUrl.pathname;
  
  // Check if we're on the home page
  if (path === '/') {
    // Get query parameters to control A/B testing behavior
    const searchParams = request.nextUrl.searchParams;
    const testGroup = searchParams.get('view');
    const forceIntegrated = searchParams.get('integrated') === 'true';
    
    // Create a new URL for the redirect
    const url = request.nextUrl.clone();
    
    // A/B testing logic - default to integrated version
    if (forceIntegrated || !testGroup) {
      url.pathname = '/page-integrated';
    } else if (testGroup === 'performance') {
      url.pathname = '/page-refined';
    } else if (testGroup === 'market') {
      // Custom path for market positioning view
      url.pathname = '/page-integrated';
      url.searchParams.set('view_control', 'true');
      url.searchParams.set('default', 'market-focused');
    } else {
      // Fallback to integrated view
      url.pathname = '/page-integrated';
    }
    
    // Return the rewritten URL
    return NextResponse.rewrite(url);
  }
  
  // Continue with the request for all other routes
  return NextResponse.next();
}

// Match only the root path
export const config = {
  matcher: '/',
};
