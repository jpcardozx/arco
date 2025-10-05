# 🔐 User Hooks Documentation

**Created:** 4 de outubro de 2025  
**Status:** ✅ IMPLEMENTED

---

## 📋 Overview

Two user authentication hooks created to support dashboard components:

1. **useCurrentUser-simple** - Básico, para componentes simples
2. **useCurrentUser** - Completo, com refetch e update

---

## 🎯 useCurrentUser-simple

### Purpose
Lightweight hook for simple components that only need basic user info.

### Usage
```typescript
import { useCurrentUser } from '@/lib/hooks/useCurrentUser-simple';

function MyComponent() {
  const { user, loading, error } = useCurrentUser();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>Not authenticated</div>;
  
  return <div>Welcome, {user.name}!</div>;
}
```

### Return Type
```typescript
{
  user: User | null;
  loading: boolean;
  error: Error | null;
}
```

### User Interface
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'client';
  avatar?: string;
  company?: string;
}
```

---

## 🎯 useCurrentUser (Extended)

### Purpose
Full-featured hook with additional methods for user updates and refetching.

### Usage
```typescript
import { useCurrentUser } from '@/lib/hooks/useCurrentUser';

function MyComponent() {
  const { user, loading, error, refetch, updateUser } = useCurrentUser();
  
  const handleUpdateName = async () => {
    try {
      await updateUser({ name: 'New Name' });
      console.log('User updated!');
    } catch (err) {
      console.error('Failed to update:', err);
    }
  };
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={handleUpdateName}>Update Name</button>
      <button onClick={refetch}>Refresh User</button>
    </div>
  );
}
```

### Return Type
```typescript
{
  user: User | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}
```

### User Interface (Extended)
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'client';
  avatar?: string;
  company?: string;
  phone?: string;
  createdAt?: Date;
  lastLogin?: Date;
}
```

---

## 🔄 Current Implementation

### Mock Data
Both hooks currently return **mock data** for development:

```typescript
const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@example.com',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
  company: 'ARCO',
  phone: '+55 11 99999-9999',
  createdAt: new Date('2024-01-01'),
  lastLogin: new Date(),
};
```

### API Delay
Simulates 500ms network delay for realistic loading states.

---

## 🚀 Production Integration

### TODO: Replace with Real Auth

#### Option 1: NextAuth
```typescript
import { useSession } from 'next-auth/react';

export function useCurrentUser() {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user || null,
    loading: status === 'loading',
    error: null,
  };
}
```

#### Option 2: Supabase Auth
```typescript
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export function useCurrentUser() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  
  // Fetch additional user data from database
  useEffect(() => {
    if (user) {
      fetchUserProfile(user.id);
    }
  }, [user]);
  
  return { user, loading, error: null };
}
```

#### Option 3: Custom API
```typescript
export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }, []);
  
  return { user, loading, error: null };
}
```

---

## 📁 File Structure

```
src/
└── lib/
    └── hooks/
        ├── useCurrentUser-simple.ts  (70 lines)
        └── useCurrentUser.ts         (100 lines)
```

---

## 🎯 Usage in Dashboard

### Components Using Hooks

#### Simple Version
- `DashboardHeader.tsx`
- `ProfessionalDashboard.tsx`
- `agenda/page.tsx`

#### Extended Version
- `clients/page.tsx`
- `leads/page-enhanced.tsx`
- `appointments/page.tsx`
- `PasswordChangeForm.tsx`

---

## 🔧 Migration Guide

### From Mock to Real Auth

1. **Install Auth Package**
```bash
# NextAuth
pnpm add next-auth

# OR Supabase
pnpm add @supabase/auth-helpers-nextjs @supabase/supabase-js
```

2. **Setup Auth Provider**
```typescript
// app/providers.tsx
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
```

3. **Update Hooks**
Replace mock logic with real auth calls in both hook files.

4. **Test**
```bash
# Test authentication flow
pnpm dev
# Navigate to /dashboard
# Verify user data loads correctly
```

---

## ⚠️ Important Notes

### Current Limitations (Mock)
- ❌ No real authentication
- ❌ No session persistence
- ❌ No role-based access control
- ❌ No user update to database

### Security Considerations (Production)
- ✅ Implement proper authentication (NextAuth/Supabase)
- ✅ Add CSRF protection
- ✅ Validate user sessions server-side
- ✅ Implement role-based access control (RBAC)
- ✅ Add rate limiting on auth endpoints
- ✅ Use secure cookies (httpOnly, secure, sameSite)

---

## 📊 Performance

### Mock Implementation
- Initial load: ~500ms (simulated)
- Memory: Minimal (single useState)
- Re-renders: Only on mount

### Production Recommendations
- Use SWR or React Query for caching
- Implement optimistic updates
- Add retry logic for failed requests
- Cache user data in localStorage (optional)

---

**Created by:** GitHub Copilot  
**Date:** 4 de outubro de 2025  
**Status:** ✅ HOOKS IMPLEMENTED - READY FOR PRODUCTION INTEGRATION
