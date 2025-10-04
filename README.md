# ARCO

Modern React application with clean architecture.

## Build Status

✅ **All build errors fixed!** The application is ready to deploy.

## Structure

```
src/
├── app/            # Next.js app directory
├── components/     # UI components (4 categories)
├── design-system/  # Design system
├── lib/           # Utilities
├── types/         # TypeScript types
└── styles/        # Global styles
```

## Development

```bash
pnpm install        # Install dependencies
pnpm dev            # Start development server
pnpm build          # Build for production
pnpm test           # Run tests
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy to Vercel:
```bash
vercel --prod
```
