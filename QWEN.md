# Project Context for Quick Minutes

This document provides essential context about the Quick Minutes project for Qwen Code to understand and assist with development tasks effectively.

## Project Overview

**Quick Minutes** is a Next.js web application that serves as a demonstration of authentication features using the [Better Auth](https://www.better-auth.com/) library. The application showcases user registration, login (both email/password and Google OAuth), and user profile management.

Key technologies used in this project include:
- **Next.js 15**: The React framework for building the web application.
- **TypeScript**: For type-safe JavaScript development.
- **Better Auth**: For handling authentication logic, including social logins and session management.
- **PostgreSQL**: As the primary database for storing user data.
- **Tailwind CSS**: For styling the UI components.
- **shadcn/ui**: A collection of accessible and customizable UI components built with Radix UI and Tailwind CSS.

## Project Structure

The project follows a standard Next.js App Router structure:
- `src/app/`: Contains the application's pages and layout files.
- `src/components/`: Houses reusable UI components, including authentication forms (login, signup, user profile) and shadcn/ui components.
- `src/lib/`: Contains utility functions and library configurations, including the setup for Better Auth (`auth.ts` and `auth-client.ts`).
- `public/`: Stores static assets.
- Configuration files like `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, and `components.json` are located in the root directory.

## Authentication

Authentication is implemented using Better Auth, configured in `src/lib/auth.ts` and `src/lib/auth-client.ts`. The application supports:
- Email and password authentication
- Google OAuth login
- Session management with client-side hooks (`useSession`)

The authentication pages (login, signup) are displayed on the home page (`src/app/page.tsx`) when a user is not authenticated. Once authenticated, the user profile is shown.

Environment variables (like `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`) are used for configuring authentication providers and database connections.

## Building and Running

Based on the `package.json` scripts:
1.  **Development Server**: Run `npm run dev` to start the development server with Turbopack. The application will be accessible at `http://localhost:3000`.
2.  **Build**: Run `npm run build` to create an optimized production build using Turbopack.
3.  **Start Production**: Run `npm run start` to start the production server (after building).
4.  **Linting**: Run `npm run lint` to check for code style issues using ESLint.

## Development Conventions

- **TypeScript**: The project uses TypeScript for type safety. Ensure new code is properly typed.
- **Components**: UI components are built using shadcn/ui primitives, which are based on Radix UI and styled with Tailwind CSS. Look at existing components like `LoginForm` and `UserProfile` for structure and styling patterns.
- **Styling**: Tailwind CSS is used extensively for styling. Utility classes are applied directly to HTML elements.
- **Authentication**: All authentication logic should be handled through the Better Auth library using the configured `auth` instance in `src/lib/auth.ts` and `authClient` in `src/lib/auth-client.ts`.