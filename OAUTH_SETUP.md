# ARCO OAuth Setup Guide

## Setting Up OAuth Authentication

To enable OAuth login for the dashboard, you need to configure the appropriate environment variables:

### 1. Set up NextAuth Secret

Generate a secure random string for NextAuth's secret key and add it to `.env.local`:

```bash
# You can generate a secure string with this command
openssl rand -base64 32
```

### 2. GitHub OAuth Setup

1. Go to GitHub Developer settings: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the following:
   - Application name: ARCO Dashboard
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github
4. Register the application
5. Copy the Client ID and generate a new Client Secret
6. Add these to `.env.local`:
   ```
   GITHUB_ID=your_client_id
   GITHUB_SECRET=your_client_secret
   ```

### 3. Google OAuth Setup

1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Create a new project
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Set up the consent screen if prompted
6. For Application Type, select "Web application"
7. Add http://localhost:3000 to Authorized JavaScript origins
8. Add http://localhost:3000/api/auth/callback/google to Authorized redirect URIs
9. Create the client ID
10. Add the credentials to `.env.local`:
    ```
    GOOGLE_CLIENT_ID=your_client_id
    GOOGLE_CLIENT_SECRET=your_client_secret
    ```

### 4. Default Credentials for Testing

For testing purposes, you can use the following credentials:

- Email: admin@arco.com
- Password: admin

## Running the Application

1. Start the development server:

   ```bash
   pnpm run dev
   ```

2. Navigate to http://localhost:3000/auth/login to access the login page
3. After successful authentication, you'll be redirected to the dashboard at http://localhost:3000/dashboard

## Security Notes

- The default credentials and NextAuth secret in this setup are not suitable for production
- For a production environment, use a strong, unique secret key
- Store credentials securely and consider using a service like Vault or environment variables in your deployment platform
- Implement proper user management and database integration for user authentication
