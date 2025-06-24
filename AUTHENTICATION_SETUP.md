# ARCO Authentication System Setup Guide

This document provides instructions for configuring and extending the authentication system for your ARCO application.

## Current Implementation

The current authentication setup uses NextAuth.js with the following providers:

- GitHub OAuth
- Google OAuth
- Credentials (email/password)

The system currently has a simple in-memory user database with a hardcoded admin user for testing purposes.

## Setting Up Real User Database

To implement a real user database, follow these steps:

### 1. Choose a Database Provider

You can use any of the following database providers:

- **MongoDB**: Flexible document database
- **PostgreSQL**: Robust relational database
- **MySQL/MariaDB**: Open-source relational database
- **Prisma**: Type-safe ORM that works with various databases

### 2. Install Required Dependencies

```bash
# For MongoDB
npm install @next-auth/mongodb-adapter mongodb

# For PostgreSQL with Prisma
npm install @prisma/client @next-auth/prisma-adapter
npm install -D prisma
```

### 3. Configure the Database Adapter

Update your NextAuth configuration in `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
// For MongoDB
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

// For Prisma
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions = {
  // Your existing config...
  adapter: MongoDBAdapter(clientPromise), // or PrismaAdapter(prisma)
  // ...
};
```

### 4. Create Database Connection Helper

For MongoDB:

```typescript
// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

For Prisma:

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };
```

### 5. Update Credentials Provider

Enhance the credentials provider to check against your database:

```typescript
// src/app/api/auth/[...nextauth]/route.ts
CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) return null;

    try {
      // For MongoDB
      const client = await clientPromise;
      const usersCollection = client.db('arco').collection('users');
      const user = await usersCollection.findOne({ email: credentials.email });

      // For Prisma
      // const user = await prisma.user.findUnique({
      //   where: { email: credentials.email }
      // });

      if (!user) return null;

      // Use a proper password hashing library like bcrypt
      // Example: const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
      const isValid = user.password === credentials.password; // REPLACE WITH SECURE VERSION

      if (!isValid) return null;

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      };
    } catch (error) {
      console.error('Auth error:', error);
      return null;
    }
  },
});
```

### 6. Implement User Management API Routes

Create API endpoints for user management:

- `src/app/api/auth/register/route.ts`: User registration
- `src/app/api/auth/reset-password/route.ts`: Password reset
- `src/app/api/users/route.ts`: User CRUD operations

### 7. Update Environment Variables

Add these variables to your `.env.local` file:

```
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/your-database?retryWrites=true&w=majority

# PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/arco?schema=public"
```

## Implementing User Management

To build a complete user management system:

1. Create a registration page at `src/app/auth/register/page.tsx`
2. Add password reset functionality
3. Create a user profile page at `src/app/dashboard/profile/page.tsx`
4. Implement role-based access control

## Security Best Practices

1. **Password Hashing**: Use bcrypt to hash passwords before storing them

   ```bash
   npm install bcryptjs
   npm install -D @types/bcryptjs
   ```

2. **Environment Variables**: Keep all sensitive information in `.env.local`

3. **Rate Limiting**: Implement rate limiting for login attempts

4. **CSRF Protection**: NextAuth.js handles this, but ensure it's configured properly

5. **Session Management**: Use secure, HTTP-only cookies (default in NextAuth)

## Testing Authentication

1. Create test accounts with different roles
2. Verify protected routes redirect unauthenticated users
3. Test OAuth providers in development
4. Confirm that sessions expire appropriately

## Role-Based Access Control

To implement RBAC:

1. Add a `role` field to your user model
2. Create a custom middleware for role checks
3. Create component wrappers that render conditionally based on roles

Example role check in React component:

```tsx
const AdminPanel = () => {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <p>Access denied</p>;
  }

  return <div>Admin content here</div>;
};
```

## Next Steps

1. Implement email verification for registered users
2. Add two-factor authentication
3. Set up audit logging for authentication events
4. Implement account lockout after failed attempts
