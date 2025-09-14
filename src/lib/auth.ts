import { betterAuth } from "better-auth";

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

export const auth = betterAuth({
  database: databaseUrl,
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
