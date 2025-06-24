'use client';

import { SessionProvider } from 'next-auth/react';

/**
 * AuthProvider component
 * 
 * Wraps the application with NextAuth SessionProvider to provide authentication context
 * Fixed to avoid NextAuth session errors in Next.js App Router
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider
            refetchInterval={0}
            refetchOnWindowFocus={false}
            refetchWhenOffline={false}
            basePath="/api/auth"
        >
            {children}
        </SessionProvider>
    );
}
