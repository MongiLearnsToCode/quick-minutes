import { betterAuth } from "better-auth";
import { Pool } from "pg";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const databaseUrl = process.env.DATABASE_URL;

const vercelURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;
const baseURL = process.env.BETTER_AUTH_URL || vercelURL || "http://localhost:3000";

console.log("Auth Config:", {
  googleClientId: googleClientId ? "Set" : "Not set",
  googleClientSecret: googleClientSecret ? "Set" : "Not set",
  databaseUrl: databaseUrl ? "Set" : "Not set",
  baseUrl: baseURL,
  isVercel: !!process.env.VERCEL,
});

// Create PostgreSQL connection pool
const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      // Neon requires SSL connection
      ssl: { rejectUnauthorized: false },
    })
  : null;

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders:
    googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : {},
  trustedOrigins: [
    "https://accounts.google.com",
    "https://oauth2.googleapis.com",
  ],
  baseURL: baseURL,
});
