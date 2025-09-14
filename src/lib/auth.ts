import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

// Use /tmp directory for Vercel deployment
const dbPath = process.env.VERCEL ? "/tmp/sqlite.db" : "./sqlite.db";

console.log("Auth Config:", {
  googleClientId: googleClientId ? "Set" : "Not set",
  googleClientSecret: googleClientSecret ? "Set" : "Not set",
  baseUrl: process.env.BETTER_AUTH_URL,
  dbPath,
  isVercel: !!process.env.VERCEL,
});

export const auth = betterAuth({
  database: new Database(dbPath),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: googleClientId && googleClientSecret ? {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  } : {},
  trustedOrigins: [
    "https://accounts.google.com",
    "https://oauth2.googleapis.com",
  ],
  baseURL: process.env.BETTER_AUTH_URL,
});
