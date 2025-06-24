import NextAuth from "next-auth";
import { authOptions } from "../auth-options";

/**
 * NextAuth route handler
 * Implements secure authentication and session management for Next.js App Router
 * 
 * For custom API routes in Next.js App Router, export specific HTTP methods
 * See: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
 */

// Create handler for authentication routes
const handler = NextAuth(authOptions);

// Export all HTTP method handlers that NextAuth uses
export { handler as GET, handler as POST, handler as PUT, handler as DELETE };

// The following line fixes common NextAuth issues in development
// It ensures NextAuth can handle all HTTP methods properly
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Security Note:
 * This implementation has been fixed to work with Next.js App Router by:
 * 1. Using the correct export syntax for route handlers
 * 2. Setting runtime to nodejs to ensure proper server execution
 * 3. Setting dynamic to force-dynamic to ensure auth state is always fresh
 */