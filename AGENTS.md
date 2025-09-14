# Quick Minutes - Agent Guidelines

## Commands
- **Build**: `npm run build` (Next.js with Turbopack)
- **Dev**: `npm run dev` (Next.js dev server with Turbopack)
- **Lint**: `npm run lint` (ESLint with Next.js config)
- **Start**: `npm run start` (Production server)
- **Test**: No test framework configured

## Code Style
- **Language**: TypeScript with strict mode enabled
- **Framework**: Next.js 15 with App Router
- **Imports**: Use path aliases `@/*` for `./src/*`
- **Components**: PascalCase naming, functional components
- **Styling**: Tailwind CSS with `cn()` utility for class merging
- **UI**: Radix UI primitives with class-variance-authority variants
- **Types**: Explicit typing, prefer interfaces over types
- **Error Handling**: Use try/catch for async operations
- **Naming**: camelCase for variables/functions, PascalCase for components/types

## Project Structure
- `src/app/`: Next.js app router pages
- `src/components/ui/`: Reusable UI components (shadcn/ui)
- `src/lib/`: Utilities and shared logic
- `src/hooks/`: Custom React hooks

## Dependencies
- React 19, Next.js 15
- Radix UI for primitives
- Tailwind CSS for styling
- React Hook Form with Zod validation
- Better Auth for authentication (Email/Password + Google OAuth)

## Google OAuth Setup
To enable Google login, set up OAuth credentials in Google Cloud Console:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` as authorized redirect URI
6. Add credentials to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```